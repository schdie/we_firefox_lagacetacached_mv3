const options = {};

// detect default system color-scheme
function detectSystemTheme() {
	if (window.matchMedia && !!window.matchMedia('(prefers-color-scheme: dark)').matches) {
		console.log('LGC: system dark theme detected');
		document.documentElement.classList.add('darkmode');
	} else {
		console.log('LGC: system light theme detected');
		document.documentElement.classList.remove('darkmode');
	}
}

// executing it first no matter what allows to minimize FOUC
detectSystemTheme();

// get darkmode state from storage and change/apply it if needed
browser.storage.local.get('options', (data) => {
	Object.assign(options, data.options);
		if (options.dmToggle == "true") {
			document.documentElement.classList.add('darkmode');
		} else if (options.dmToggle == "false") {
			document.documentElement.classList.remove('darkmode');
		} else {
			detectSystemTheme();
		}
});

// watch for changes to the user's darkmode setting & apply them on the fly
browser.storage.onChanged.addListener((changes, area) => {
	if (area === 'local' && changes.options?.newValue) {
		browser.storage.local.get('options', (data) => {
			Object.assign(options, data.options);
				if (options.dmToggle === true) {
					document.documentElement.classList.add('darkmode');
				} else if (options.dmToggle === false) {
					document.documentElement.classList.remove('darkmode');
				} else {
					detectSystemTheme();
				}
		});
	}
});

// loading disclaimer on premium article plus: faster than readystate
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

// once we get the cached article we parse it
function handleResponse(message) {
  //console.log("LGC: cached article retrieved: ", message.cachedC);
  // Create div to manipulate
	var wpDiv = document.createElement('div');
	wpDiv.innerHTML = message.cachedC;
	// Avoid main page
	if (document.location.href != "https://www.lagaceta.com.ar/") {	
		console.log("LGC: the page is an article...");
			// Only inject on premium content
			const premium = document.getElementsByClassName("article premium")[0];
			const especialpremium = document.getElementsByClassName("especial")[0];
			const edupremium = document.getElementsByClassName("edu")[0];
			console.log("LGC: (premium status: " + premium + ") (especial status: " + especialpremium + ") (edu status: " + edupremium + ")");
			if (premium) {
				console.log("LGC: the article is premium...");
					// Check for 404
					if (message === 404) {
						document.querySelector('#articleContent').innerHTML = '<div class="articleBody col-xl-10"><p>Nota temporalmente inaccesible en el cache de Google, por favor intente más tarde.</p></div>';
					// Check for other numeric error
					} else if (Number.isInteger(message)) {
						document.querySelector('#articleContent').innerHTML = '<div class="articleBody col-xl-10"><p>Hubo un error inesperado, por favor intente nuevamente más tarde o <a href="https://webcache.googleusercontent.com/search%3Fq%3Dcache:' + document.location.href + '">visite la nota en el cache de google</a>.</p></div>';
					// Cache captcha probably...
					} else if (message === 'REDIRECTED') {
						document.querySelector('#articleContent').innerHTML = '<div class="articleBody col-xl-10"><p>El cache de Google requiere autorización, por favor <a href="https://webcache.googleusercontent.com/search%3Fq%3Dcache:' + document.location.href + '">visite la nota en el cache de google</a>.</p></div>';
					} else {
						// Get the cached div
						var cachedDiv = wpDiv.querySelector('#articleContent');
						// Special needs :D
						if (especialpremium || edupremium) {
							console.log("LGC: the article is Especial...");
							// Fix img src if needed 
							// This works for edu but may not work for especial, needs more testing
							const srcImages = cachedDiv.querySelectorAll('.pic > img');
							if ( srcImages.length ) {
								for(var i=0;i<srcImages.length;i++){
									cachedDiv.querySelectorAll('.pic > img')[i].src = cachedDiv.querySelectorAll('.pic > img')[i].getAttribute('data-original');
								}
							}
							// Fix formatting for videos
							const srcformatv = cachedDiv.getElementsByClassName('noGutter');
							while (srcformatv.length) {
								srcformatv[0].className = "col-xl-10";
							}
							// Fix video height if needed
							const srcIframes = cachedDiv.querySelectorAll('.image > iframe');
							if ( srcIframes.length ) {
								for(var i=0;i<srcIframes.length;i++){
									cachedDiv.querySelectorAll('.image > iframe')[i].setAttribute('height', '550');
								}
							}
							// Fix global formatting
							const srcformat = cachedDiv.getElementsByClassName('col-12');
							while (srcformat.length) {
								srcformat[0].className = "col-xl-8 col-lg-8 col-md-10";
							}
							// We need everthing inside a container
							cachedDiv.innerHTML = '<div class="container"><div class="row justify-content-center">' + cachedDiv.innerHTML + '</div></div>';
						} else {
							// Fix formatting for video
							const srcformatv = cachedDiv.getElementsByClassName('noGutter');
							while (srcformatv.length) {
								srcformatv[0].className = "col-xl-12";
							}
							// Fix global formatting
							const srcformat = cachedDiv.getElementsByClassName('col-12');
							while (srcformat.length) {
								srcformat[0].className = "col-xl-10";
							}
							// Fix main class
							//cachedDiv.setAttribute ("class", "row justify-content-center");
							// Fix img src if needed
							const srcImages = cachedDiv.querySelectorAll('.pic > img');
							if ( srcImages.length ) {
								for(var i=0;i<srcImages.length;i++){
									cachedDiv.querySelectorAll('.pic > img')[i].src = cachedDiv.querySelectorAll('.pic > img')[i].getAttribute('data-original');
								}
							}
							// Fix video if needed
							const srcIframes = cachedDiv.querySelectorAll('.image > iframe');
							if ( srcIframes.length ) {
								for(var i=0;i<srcIframes.length;i++){
									cachedDiv.querySelectorAll('.image > iframe')[i].setAttribute('height', '550');
								}
							}
						}
						// Inject modified cached div
						document.getElementById('articleContent').innerHTML = cachedDiv.innerHTML;
					}
			} else {
				console.log("LGC: the article is not premium...");
			}
	}
  
}

// got 99 problems but google cache ain't one
function handleError(error) {
  console.log(`Error: ${error}`);
}

// sending the current url to the service worker
function letsGo(e) {
	// Needed because run_at is set to start (because of darktheme and FOUC)
	document.addEventListener('readystatechange', event => {
		// Wait until we can read the html we want, should be complete insted of interactive but *it works tm*
		if (event.target.readyState === 'interactive') {
			// Only request on premium article
			const premium = document.getElementsByClassName("article premium")[0];
			if (premium) {
				console.log("LGC: readystatechange = complete:", premium);
				const sending = browser.runtime.sendMessage({
					premiumURL: document.location.href,
				});
				sending.then(handleResponse, handleError);
			}
		}
	});
}

// startup
letsGo();
