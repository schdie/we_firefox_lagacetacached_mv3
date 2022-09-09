// In-page cache of the user's options
const options = {};

// Initialize the form with the user's option settings
browser.storage.local.get('options', (data) => {
  Object.assign(options, data.options);
  optionsForm.dmToggle.checked = Boolean(options.dmToggle);
});

// Immediately persist options changes
optionsForm.dmToggle.addEventListener('change', (event) => {
  options.dmToggle = event.target.checked;
  browser.storage.local.set({options});
});
