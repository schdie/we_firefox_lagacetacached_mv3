// In-page cache of the user's options
const options = {};

// Initialize the form with the user's option settings
browser.storage.local.get('options', (data) => {
  Object.assign(options, data.options);
  // dark mode
  optionsForm.dmToggle.checked = Boolean(options.dmToggle);
});

// Immediately persist options changes for dark mode
optionsForm.dmToggle.addEventListener('change', (event) => {
  options.dmToggle = event.target.checked;
  browser.storage.local.set({options});
});

// check current permissions status
let testPermissions = {
  origins: ["*://webcache.googleusercontent.com/*", "*://*.lagaceta.com.ar/*", "*://*.lavoz.com.ar/*", "*://*.scuore.com.ar/*"]
};

browser.permissions.contains(testPermissions).then((result) => {
  console.log("permisos????: " + result);    // true
  if (result) {
		optionsForm.pmToggle.checked = true;
	} else {
		optionsForm.pmToggle.checked = false;
	}
});

// User toggle to request permissions in mv3
const permissionsToRequest = {
  origins: ["*://webcache.googleusercontent.com/*", "*://*.lagaceta.com.ar/*", "*://*.lavoz.com.ar/*", "*://*.scuore.com.ar/*"]
}

function requestPermissions() {
  function onResponse(response) {
    if (response) {
      console.log("Permission was granted: " + response);
    } else {
      console.log("Permission was refused");
    }
    return browser.permissions.getAll();
  }

  browser.permissions.request(permissionsToRequest)
    .then(onResponse)
    .then((currentPermissions) => {
    console.log(`Current permissions:`, currentPermissions);
  });
}

document.querySelector("#pmToggle").addEventListener("click", requestPermissions);
