// TO-DO for mv3
// page_action may get merged into action sometime in the future before mv3 public release
// regularly check whatever mozilla decides to do with host permissions for their mv3 implementation
// depending on that maybe add a user notification on load if host permissions are not granted

// on permission change refresh the active tab
browser.permissions.onAdded.addListener(handleAdded);

function handleAdded(permissions) {
	browser.tabs.query({ active: true, currentWindow: true, lastFocusedWindow: true }, function (tabs) {
    // reload the tab if not in the addons page
    if (tabs[0].url) {
			browser.tabs.reload();
		}       
	});
}

// On installation set options default to false
browser.runtime.onInstalled.addListener(() => {
	const options = {};
	browser.storage.local.get('options', (data) => {
		// Set options for the first time
		if (!options){
			Object.assign(options, data.options);
			// dark mode
			options.dmToggle = 'false';
			browser.storage.local.set({options});
		}
	});	
});

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
	  "*://*.lagaceta.com.ar/js/sus/swg-merge.min.*"],
  },
  ["blocking"]
);

// redirect some scripts
function redirect(requestDetails) {
  //console.log("Redirecting: " + requestDetails.url);
  return {
    redirectUrl: browser.runtime.getURL("controller.js"),
  };
}

browser.webRequest.onBeforeRequest.addListener(
		redirect,
  {urls: [
	  "*://*.lagaceta.com.ar/assets/2022/js/controller.min.*"], types:["script"],
  },
  ["blocking"]
);

// Get the google cache version of the note
browser.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		// Avoid main site
		if (request.cpag != "https://www.lagaceta.com.ar/") {
			// Construct cached content URL
			var ccUrl = 'https://webcache.googleusercontent.com/search?q=cache:' + request.cpag;
			// Get html content from ccUrl
			fetch(ccUrl)
				.then(
				function(response) {
					console.log('redirected?: ' + response.redirected);
					if (response.redirected === false){
						if (response.status === 200) {
							// Response return since status was ok
							return response.text();
						} else {
							// Return the status and do the logic in content.js
							return response.status;
						}
					} else {
						// We are being redirected, possibly to a captcha...
						return "REDIRECTED";
					}
				}
				)
				.then(response => sendResponse({farewell: response}))
				.catch(function(err) {
					console.log('Fetch Error :-S', err);
				});
			return true;			
		}
	}
);
