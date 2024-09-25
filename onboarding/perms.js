var closeButton = document.getElementById("close");

closeButton.addEventListener("click", function(event){
	window.close();
});

//https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/permissions/request
const permissionsToRequest = {
  //permissions: ["storage", "webRequest", "webRequestBlocking"],
  origins: ["*://*.lagaceta.com.ar/*", "*://*.lavoz.com.ar/*", "*://*.scuore.com.ar/*"],
};

async function requestPermissions() {
  function onResponse(response) {
    if (response) {
      console.log("ONBOARDING: Permission was granted");
      // change html to explain usage and acknowledge the user response
      document.getElementById("main").style.display = 'none';
      document.getElementById("sec").style.display = 'block';
    } else {
      console.log("ONBOARDING: Permission was refused");
      document.getElementById("main").style.display = 'block';
      document.getElementById("sec").style.display = 'none';
      alert("Permisos Denegados.\nLa extensión no puede funcionar sin permisos.");
    }
    return browser.permissions.getAll();
  }

  const response = await browser.permissions.request(permissionsToRequest);
  const currentPermissions = await onResponse(response);

  console.log(`Current permissions:`, currentPermissions);
}

document.getElementById("grantPerms").addEventListener("click", requestPermissions);

// check if perms are granted on load because sometimes FF refreshes the onboarding page after a permissions change
async function reqPerm() {
	let challengeAllPerms = {
		origins: ["*://*.lagaceta.com.ar/*", "*://*.lavoz.com.ar/*", "*://*.scuore.com.ar/*"],
		permissions: ["storage", "webRequest", "webRequestBlocking"],
	};
	
	let challengeOriginsPerms = {
		origins: ["*://*.lagaceta.com.ar/*", "*://*.lavoz.com.ar/*", "*://*.scuore.com.ar/*"],
	};
	
	let challengeBasicPerms = {
		permissions: ["storage", "webRequest", "webRequestBlocking"],
	};
	
	const allperms = await browser.permissions.contains(challengeAllPerms);
	const originsperms = await browser.permissions.contains(challengeOriginsPerms);
	const basicperms = await browser.permissions.contains(challengeBasicPerms);
	
	if (!allperms) {
		console.log("ONBOARDING: No perms.");
	} else {
		console.log("ONBOARDING: Perms granted.");
		document.getElementById("main").style.display = 'none';
    document.getElementById("sec").style.display = 'block';
	}
}

reqPerm();
