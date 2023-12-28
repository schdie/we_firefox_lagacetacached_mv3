// global scope
var installing = 'false';

// only on install
function handleInstalled(details) {
  switch (details.reason) {
    case "install":
      {
				// set defaults in storage
        setDefaultValues();
				// onboarding page
        const url = browser.runtime.getURL("onboarding/installed.html");
        browser.tabs.create({ url, active: true });
        // needed to avoid re-onboarding at the same time
        installing = 'true';
      }
		break;
  }
}

browser.runtime.onInstalled.addListener(handleInstalled);

// on installation set options.dmToggle to follow system
async function setDefaultValues() {
	const options = {};
	browser.storage.local.get('options', (data) => {
		// Set options for the first time
		if (!options){
			Object.assign(options, data.options);
			// set default to system
			options.dmToggle = 'system';
			browser.storage.local.set({options});
		}
	});	
}

// permissions
async function reqPerm() {
	let challengeAllPerms = {
		origins: ["*://webcache.googleusercontent.com/*", "*://*.lagaceta.com.ar/*", "*://*.lavoz.com.ar/*", "*://*.scuore.com.ar/*"],
		permissions: ["storage", "webRequest", "webRequestBlocking"],
	};
	
	let challengeOriginsPerms = {
		origins: ["*://webcache.googleusercontent.com/*", "*://*.lagaceta.com.ar/*", "*://*.lavoz.com.ar/*", "*://*.scuore.com.ar/*"],
	};
	
	let challengeBasicPerms = {
		permissions: ["storage", "webRequest", "webRequestBlocking"],
	};
	
	const allperms = await browser.permissions.contains(challengeAllPerms);
	const originsperms = await browser.permissions.contains(challengeOriginsPerms);
	const basicperms = await browser.permissions.contains(challengeBasicPerms);
	
	if (!allperms) {
		console.log("LGC: missing permissions.");
		if (installing == "false") {
			console.log("LGC: re-onboarding...");
			const url = browser.runtime.getURL("onboarding/installed.html");
			await browser.tabs.create({ url, active: true });  
		}
	} else {
		console.log("LGC: permissions granted.");
	}
}

reqPerm();

// on permission added refresh the active tab
browser.permissions.onAdded.addListener(handleAdded);

function handleAdded(permissions) {
	browser.tabs.query({ active: true, currentWindow: true, lastFocusedWindow: true }, function (tabs) {
    // reload the tab if not in the addons page
    if (tabs[0].url) {
			console.log("LGC: permissions added: " + tabs[0].url);
			browser.tabs.reload();			
		}       
	});
}

// block some scripts
function cancel(requestDetails) {
  //console.log("Canceling: " + requestDetails.url);
  return {cancel: true};
}

browser.webRequest.onBeforeRequest.addListener(
		cancel,
  {urls: [
	  "*://*.lavoz.com.ar/sites/default/files/libs/paywall/lagaceta/pw.dev.js",
	  "*://*.scuore.com.ar/*",
	  "*://*.lagaceta.com.ar/js/sus/swg-merge.min.*",
	  "*://*.lagaceta.com.ar/assets/2022/js/analyticsSiltiumProd.*"],
  },
  ["blocking"]
);

// redirect some scripts
function redirect(requestDetails) {
  //console.log("Redirecting: " + requestDetails.url);
  return {
    redirectUrl: browser.runtime.getURL("js/controller.js"),
  };
}

browser.webRequest.onBeforeRequest.addListener(
		redirect,
  {urls: [
	  "*://*.lagaceta.com.ar/assets/2022/js/controller.min.*"], types:["script"],
  },
  ["blocking"]
);

// try to get the cached URL with the premium article
browser.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		requestedPremiumURL = request.premiumURL;
		if (requestedPremiumURL != null){
			console.log("LGC: requested premiumURL: " + requestedPremiumURL);
			// get the cached version of the premium article
			if (requestedPremiumURL != "https://www.lagaceta.com.ar/") {
			// Construct cached content URL
			var ccUrl = 'https://webcache.googleusercontent.com/search?q=cache:' + requestedPremiumURL;
			// Get html content from ccUrl
			fetch(ccUrl)
				.then(
				function(response) {
					console.log('LGC: are we being redirected?: ' + response.redirected);
					if (response.redirected === false){
						if (response.status === 200) {
							// Return the response since status was ok
							console.log("LGC: got a 200 response, sending cached article to content script.");
							return response.text();
						} else {
							// Return the status and do the logic in content.js
							console.log("LGC: did not get a 200 response.");
							return response.status;
						}
					} else {
						// We are being redirected, possibly to a captcha...
						return "REDIRECTED";
					}
				}
				)
				// send back what was retrieved
				.then(response => sendResponse({cachedC: response}))
				.catch(function(err) {
					console.log('Fetch Error :-S', err);
				});
			return true;		
			}
		}
	}
);
