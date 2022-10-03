//for this extension to work on mv3 the user needs to give host permissions manually on the add-on page.

// On installation set darktheme default to false
browser.runtime.onInstalled.addListener(() => {
	const options = {};
	browser.storage.local.get('options', (data) => {
		// Set darktheme for the first time
		if (!options){
			Object.assign(options, data.options);
			options.dmToggle = 'false';
			browser.storage.local.set({options});
		}
	});	
});

//block some scripts
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

//redirect some scripts
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
