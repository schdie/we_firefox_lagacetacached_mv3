const options = {};

// detect default system color-scheme
function detectSystemTheme() {
	if (window.matchMedia && !!window.matchMedia('(prefers-color-scheme: dark)').matches) {
		console.log('LGC: system dark theme detected');
		document.documentElement.classList.add('darkmode');
		// send current theme to the background script
		browser.runtime.sendMessage({darkmodeValue: "true"});
	} else {
		console.log('LGC: system light theme detected');
		document.documentElement.classList.remove('darkmode');
		// send current theme to the background script
		browser.runtime.sendMessage({darkmodeValue: "false"});
	}
}

// there's no need to execute here but doing so and doing it first no matter what allows to minimize FOUC
// this works well with the default settings but not so much when the user forces a theme
detectSystemTheme();

// get darkmode state from storage and change/apply it if needed
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
					document.querySelector('#articleContent').insertAdjacentHTML('afterbegin', '<div id="cargandop" class="container"><div class="articleBody"><div class="row justify-content-center"><div class="col-xl-8 col-lg-8 col-md-10"><p class="loadingplusdm">Buscando la nota, por favor espere</p></div></div></div></div>');
					//document.querySelector('#articleContent').innerHTML = '<div class="container"><div class="articleBody"><div class="row justify-content-center"><div class="col-xl-8 col-lg-8 col-md-10"><p class="loadingplusdm">Buscando la nota, por favor espere</p></div></div></div></div>';
				} else {
					document.querySelector('#articleContent').insertAdjacentHTML('afterbegin', '<div id="cargandop" class="articleBody col-xl-10"><p class="loadingplusdm">Buscando la nota, por favor espere</p></div>');
					//document.querySelector('#articleContent').innerHTML = '<div class="articleBody col-xl-10"><p class="loadingplusdm">Buscando la nota, por favor espere</p></div>';
				}
			} else if (options.dmToggle === false) {
				if (especialpremium || edupremium) {
					document.querySelector('#articleContent').setAttribute("class", "row justify-content-center");
					document.querySelector('#articleContent').insertAdjacentHTML('afterbegin', '<div id="cargandop" class="container"><div class="articleBody"><div class="row justify-content-center"><div class="col-xl-8 col-lg-8 col-md-10"><p class="loadingplus">Buscando la nota, por favor espere</p></div></div></div></div>');
					//document.querySelector('#articleContent').innerHTML = '<div class="container"><div class="articleBody"><div class="row justify-content-center"><div class="col-xl-8 col-lg-8 col-md-10"><p class="loadingplus">Buscando la nota, por favor espere</p></div></div></div></div>';
				} else {
					document.querySelector('#articleContent').insertAdjacentHTML('afterbegin', '<div id="cargandop" class="articleBody col-xl-10"><p class="loadingplus">Buscando la nota, por favor espere</p></div>');
					//document.querySelector('#articleContent').innerHTML = '<div class="articleBody col-xl-10"><p class="loadingplus">Buscando la nota, por favor espere</p></div>';
				}
			} else {
				// needed when there's no stored value and we use automatic detection by system
				if (window.matchMedia && !!window.matchMedia('(prefers-color-scheme: dark)').matches) {
					if (especialpremium || edupremium) {
						document.querySelector('#articleContent').setAttribute("class", "row justify-content-center");
						document.querySelector('#articleContent').insertAdjacentHTML('afterbegin', '<div id="cargandop" class="container"><div class="articleBody"><div class="row justify-content-center"><div class="col-xl-8 col-lg-8 col-md-10"><p class="loadingplusdm">Buscando la nota, por favor espere</p></div></div></div></div>');
						//document.querySelector('#articleContent').innerHTML = '<div class="container"><div class="articleBody"><div class="row justify-content-center"><div class="col-xl-8 col-lg-8 col-md-10"><p class="loadingplusdm">Buscando la nota, por favor espere</p></div></div></div></div>';
					} else {
						document.querySelector('#articleContent').insertAdjacentHTML('afterbegin', '<div id="cargandop" class="articleBody col-xl-10"><p class="loadingplusdm">Buscando la nota, por favor espere</p></div>');
						//document.querySelector('#articleContent').innerHTML = '<div class="articleBody col-xl-10"><p class="loadingplusdm">Buscando la nota, por favor espere</p></div>';
					}
				} else {
					if (especialpremium || edupremium) {
						document.querySelector('#articleContent').setAttribute("class", "row justify-content-center");
						document.querySelector('#articleContent').insertAdjacentHTML('afterbegin', '<div id="cargandop" class="container"><div class="articleBody"><div class="row justify-content-center"><div class="col-xl-8 col-lg-8 col-md-10"><p class="loadingplus">Buscando la nota, por favor espere</p></div></div></div></div>');
						//document.querySelector('#articleContent').innerHTML = '<div class="container"><div class="articleBody"><div class="row justify-content-center"><div class="col-xl-8 col-lg-8 col-md-10"><p class="loadingplus">Buscando la nota, por favor espere</p></div></div></div></div>';
					} else {
						document.querySelector('#articleContent').insertAdjacentHTML('afterbegin', '<div id="cargandop" class="articleBody col-xl-10"><p class="loadingplus">Buscando la nota, por favor espere</p></div>');
						//document.querySelector('#articleContent').innerHTML = '<div class="articleBody col-xl-10"><p class="loadingplus">Buscando la nota, por favor espere</p></div>';
					}
				}
			}
		}
	}
}

// once we get the article's content we parse it
function handleResponse(message) {
  //console.log("LGC: cached article retrieved: ", message.cachedC);
  // Create div to manipulate
	let wpDiv = document.createElement('div');
	// let's fill it with the "premium" content
	wpDiv.setHTMLUnsafe(message.cachedC);
	//wpDiv.insertAdjacentHTML("afterbegin", message.cachedC);
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
					if (message.cachedC === 404) {
						document.querySelector('#articleContent').insertAdjacentHTML("afterbegin", '<div class="articleBody col-xl-10"><p>Nota temporalmente inaccesible con el bot de Google-News, por favor intente más tarde.</p></div>');
						//document.querySelector('#articleContent').innerHTML = '<div class="articleBody col-xl-10"><p>Nota temporalmente inaccesible en el cache de Google, por favor intente más tarde.</p></div>';
					// Check for other numeric error
					} else if (Number.isInteger(message.cachedC)) {
						document.querySelector('#articleContent').insertAdjacentHTML("afterbegin", '<div class="articleBody col-xl-10"><p>Hubo un error inesperado, por favor intente nuevamente más tarde.</p></div>');
						//document.querySelector('#articleContent').innerHTML = '<div class="articleBody col-xl-10"><p>Hubo un error inesperado, por favor intente nuevamente más tarde o <a href="https://webcache.googleusercontent.com/search%3Fq%3Dcache:' + document.location.href + '">visite la nota en el cache de google</a>.</p></div>';
					// Cache captcha probably...
					} else if (message.cachedC === 'REDIRECTED') {
						document.querySelector('#articleContent').insertAdjacentHTML("afterbegin", '<div class="articleBody col-xl-10"><p>Hubo una redirección en el pedido de la nota, por favor intente nuevamente más tarde.</p></div>');
						//document.querySelector('#articleContent').innerHTML = '<div class="articleBody col-xl-10"><p>El cache de Google requiere autorización, por favor <a href="https://webcache.googleusercontent.com/search%3Fq%3Dcache:' + document.location.href + '">visite la nota en el cache de google</a>.</p></div>';
					} else {
						// Get the cached div
						let cachedDiv = wpDiv.querySelector('#articleContent');
						// Special needs :D
						if (especialpremium || edupremium) {
							console.log("LGC: the article is Especial...");
							/*
							// Fix img src if needed, this is not needed anymore because someone is doing things right in lagaceta...
							// This works for edu but may not work for especial, needs more testing,
							const srcImages = cachedDiv.querySelectorAll('.pic > img');
							if ( srcImages.length ) {
								for(var i=0;i<srcImages.length;i++){
									cachedDiv.querySelectorAll('.pic > img')[i].src = cachedDiv.querySelectorAll('.pic > img')[i].getAttribute('data-original');
								}
							}
							*/
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
							cachedDiv.insertAdjacentHTML("afterbegin", '<div class="container"><div class="row justify-content-center">');
							cachedDiv.insertAdjacentHTML("beforeend", '</div></div>');
							//cachedDiv.innerHTML = '<div class="container"><div class="row justify-content-center">' + cachedDiv.innerHTML + '</div></div>';
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
							/*
							// Fix img src if needed, this is not needed anymore because someone is doing things right in lagaceta...
							const srcImages = cachedDiv.querySelectorAll('.pic > img');
							if ( srcImages.length ) {
								for(var i=0;i<srcImages.length;i++){
									cachedDiv.querySelectorAll('.pic > img')[i].src = cachedDiv.querySelectorAll('.pic > img')[i].getAttribute('data-original');
									console.log("LGC: srcImages:", cachedDiv.querySelectorAll('.pic > img')[i]);
								}
							}
							*/
							// Fix video if needed
							const srcIframes = cachedDiv.querySelectorAll('.image > iframe');
							if ( srcIframes.length ) {
								for(var i=0;i<srcIframes.length;i++){
									cachedDiv.querySelectorAll('.image > iframe')[i].setAttribute('height', '550');
								}
							}
						}
						// Inject modified cached div
						//document.getElementById('articleContent').insertAdjacentHTML("afterbegin", setHTMLUnsafe(value));
						// hide the loading div...
						if (document.getElementById('cargandop') !== null) {
							document.getElementById('cargandop').style.display = 'none';
						}
						document.getElementById('articleContent').setHTMLUnsafe(cachedDiv.innerHTML);
						//document.getElementById('articleContent').innerHTML = cachedDiv.innerHTML;
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
		// Wait until we can read the html we want, should be complete instead of interactive but *it works tm*
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
