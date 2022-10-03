const options = {};

// Get darkmode state from storage and apply it if needed
browser.storage.local.get('options', (data) => {
	Object.assign(options, data.options);
		if (options.dmToggle === true) {
			document.documentElement.classList.add('darkmode');
		} else if (options.dmToggle === false) {
			document.documentElement.classList.remove('darkmode');
		}
});

// Watch for changes to the user's darkmode setting & apply them on the fly
browser.storage.onChanged.addListener((changes, area) => {
	if (area === 'local' && changes.options?.newValue) {
		browser.storage.local.get('options', (data) => {
			Object.assign(options, data.options);
				if (options.dmToggle === true) {
					document.documentElement.classList.add('darkmode');
				} else if (options.dmToggle === false) {
					document.documentElement.classList.remove('darkmode');
				}
		});
	}
});

// Loading disclaimer on premium article plus: faster than readystate
document.addEventListener('DOMContentLoaded', fireContentLoadedEvent, false);

function fireContentLoadedEvent () {
	const punlocked = document.getElementsByClassName("icon-unlock-keyhole-regular")[0];
	const premium = document.getElementsByClassName("article premium")[0];
	const especialpremium = document.getElementsByClassName("especial")[0];
	const edupremium = document.getElementsByClassName("edu")[0];
	if (!punlocked) {
		if (premium) {
			// When using darktheme the dots have a different styling
			if (options.dmToggle === true) {
				if (especialpremium || edupremium) {
					document.querySelector('#articleContent').setAttribute("class", "row justify-content-center");
					document.querySelector('#articleContent').innerHTML = '<div class="container"><div class="articleBody"><div class="row justify-content-center"><div class="col-xl-8 col-lg-8 col-md-10"><p class="loadingplusdm">Buscando la nota, por favor espere</p></div></div></div></div>';
				} else {
					document.querySelector('#articleContent').innerHTML = '<div class="articleBody col-xl-10"><p class="loadingplusdm">Buscando la nota, por favor espere</p></div>';
				}
			} else {
				if (especialpremium || edupremium) {
					document.querySelector('#articleContent').setAttribute("class", "row justify-content-center");
					document.querySelector('#articleContent').innerHTML = '<div class="container"><div class="articleBody"><div class="row justify-content-center"><div class="col-xl-8 col-lg-8 col-md-10"><p class="loadingplus">Buscando la nota, por favor espere</p></div></div></div></div>';
				} else {
					document.querySelector('#articleContent').innerHTML = '<div class="articleBody col-xl-10"><p class="loadingplus">Buscando la nota, por favor espere</p></div>';
				}
			}
		}
	}
}
