// in-page cache of the user's options
const options = {};

// initialize the form with the user's option settings
browser.storage.local.get('options', (data) => {
  Object.assign(options, data.options);
  // dark mode
  //optionsForm.dmToggle.checked = Boolean(options.dmToggle);
  // a hack
  console.log("options.dmToggle: ", options.dmToggle);
  if (options.dmToggle === true) {
		console.log("options.dmToggle should be true: ", options.dmToggle);
		optionsForm.dmToggle.checked = true;
	} else if (options.dmToggle === false) {
		console.log("options.dmToggle should be false: ", options.dmToggle);
		optionsForm.dmToggle.checked = false;
	} else {
		getThemeFromContentScript();
	}
});

// getting the correct and current value of dark theme
function getThemeFromContentScript() {
	const sending = browser.runtime.sendMessage({
	darkmode: "We need the current value of the actual content script",
	});
	sending.then(ResponseDarkMode, handleError);;
}

function ResponseDarkMode(message) {
  console.log(`Dark theme from background: ${message.response}`);
  if (message.response == "true") {
		optionsForm.dmToggle.checked = true;
		// set label to show auto selection
		document.getElementsByClassName('switcher')[0].attributes.class.value = "switcher cl-switch-auto";
		document.documentElement.classList.add('darkmode');
	} else {
		optionsForm.dmToggle.checked = false;
		// set label to show auto selection
		document.getElementsByClassName('switcher')[0].attributes.class.value = "switcher cl-switch-auto";
		document.documentElement.classList.remove('darkmode');
	}
}

function handleError(error) {
  console.log(`Error: ${error}`);
}

// immediately persist options changes for dark mode
optionsForm.dmToggle.addEventListener('change', (event) => {
	// set label to show forced selection
	//document.getElementsByClassName('switcher')[0].attributes.class.value = "switcher";
  options.dmToggle = event.target.checked;
  browser.storage.local.set({options});
});

// check current permissions status
let testPermissions = {
  origins: ["*://webcache.googleusercontent.com/*", "*://*.lagaceta.com.ar/*", "*://*.lavoz.com.ar/*", "*://*.scuore.com.ar/*"]
};

browser.permissions.contains(testPermissions).then((result) => {
  console.log("check permisos al cargar: " + result);    // true
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
