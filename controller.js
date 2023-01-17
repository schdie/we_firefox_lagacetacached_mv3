/* v2.3 */
function showloading() {
    if (document.getElementById("dloading")) document.getElementById("dloading").style.display = "block";
    else {
        var e = document.createElement("div");
        e.setAttribute("id", "dloading"), e.style.cssText = "width: 100%; height: 100%; z-index: 10009; top: 0px; left: 0px; background: rgba(255,255,255,.7); position: fixed; overflow: hidden; text-align: center";
        var t = document.createElement("img");
        t.setAttribute("src", URL_ACTUAL + "images/loading.gif"), t.setAttribute("style", "position:relative;top:45%;"), e.appendChild(t), document.getElementsByTagName("body")[0].appendChild(e)
    }
}

function hideloading() {
    document.getElementById("dloading") && (document.getElementById("dloading").style.display = "none")
}
/* default !1 */
var wall_chequeado = !0;

function wallChequed(e) {
    wall_chequeado || (dataLayer.push({
        event: "SuscriptionVirtualPageview",
        virtualPageURL: e
    }), console.log("PageURL: " + e), wall_chequeado = !0)
}

function scrollBar() {
    var e = window.scrollY,
        t = document.querySelector("#header"),
        n = document.querySelector("#addTop"),
        i = !1,
        s = !1,
        a = !1,
        o = !1,
        l = 20;
    t.classList.contains("is-home") ? s = !0 : t.classList.contains("is-home-m") ? (a = !0, o = !0) : t.classList.contains("is-mobile") && (o = !0), t.classList.contains("esp") && (i = !0), window.addEventListener("scroll", function() {
        var r = window.scrollY;
        if (s) l = 600, window.scrollY > 600 && (t.classList.add("sticky", "small"), document.body.style.paddingTop = "265px"), window.scrollY <= 600 && (t.classList.remove("sticky", "small"), document.body.style.paddingTop = "0px");
        else {
            if (a) var d = 148;
            else var d = 1;
            window.scrollY > d ? (t.classList.add("sticky"), o && t.classList.add("is-up"), a ? (document.body.style.paddingTop = "130px", n && (n.style.visibility = "hidden")) : o && n && (n.style.marginTop = "70px")) : (t.classList.remove("sticky"), o && t.classList.remove("is-up"), a ? (document.body.style.paddingTop = "0px", n && (n.style.visibility = "visible")) : o && n && (n.style.marginTop = "0px"))
        }
        r > e ? (o || t.classList.remove("is-up"), i && (t.classList.add("esp"), document.querySelector("#brandHeader").src = URL_ACTUAL + "assets/2022/images/brandw.svg")) : e > r && (window.scrollY > l ? (o || t.classList.add("is-up"), i && (t.classList.remove("esp"), document.querySelector("#brandHeader").src = URL_ACTUAL + "assets/2022/images/brand.svg")) : (o || t.classList.remove("is-up"), i && (t.classList.add("esp"), document.querySelector("#brandHeader").src = URL_ACTUAL + "assets/2022/images/brandw.svg"))), e = r <= 0 ? 0 : r
    })
}

function share(e) {
    var t = {};
    if (t.width = 700, t.height = 435, (now = new Date).getTime(), "Netscape" == navigator.appName) {
        t.left = window.screenX + (window.outerWidth - t.width) / 2, t.top = window.screenY + (window.outerHeight - t.height) / 2;
        var n = "screenX=" + t.left + ",screenY=" + t.top + ",resizable=no,width=" + t.width + ",height=" + t.height + ",scrollbars=yes,menubar=no,location=no,toolbar=no,status=no,directories=no"
    } else if (document.all) {
        t.left = (screen.width - t.width) / 2, t.top = (screen.height - t.height) / 2;
        var n = "left=" + t.left + ",top=" + t.top + ",resizable=no,width=" + t.width + ",height=" + t.height + ",scrollbars=yes,menubar=no,location=no,toolbar=no,status=no,directories=no"
    }
    window.open(e, "Redes", n)
}

function lazyload() {
    if ("loading" in HTMLImageElement.prototype) {
        let e = document.querySelectorAll('img[loading="lazy"]');
        e.forEach(e => {
            e.src = e.dataset.original
        })
    } else {
        let t = document.querySelectorAll('img[class="lazy"]');
        t.forEach(e => {
            e.src = e.dataset.original
        })
    }
}

function searchNow() {
    word2 = (word2 = (word = (value = document.getElementById("textSearch").value.trim()).replace(/ /gi, "_")).replace(/\./gi, "_")).toLowerCase(), window.location = URL_ACTUAL + "buscar?q=" + word2
}

function searchNowAdvanced() {
    url = URL_ACTUAL + "buscar?q=" + (word2 = (word2 = (word = (value = document.getElementById("textSearchAdvanced").value.trim()).replace(/ /gi, "_")).replace(/\./gi, "_")).toLowerCase()), document.getElementById("searchForm").setAttribute("action", url), document.getElementById("searchForm").submit(), showloading()
}
/* og
function getGeneralData() {
    var e = new XMLHttpRequest,
        t = "origin=" + document.location.href;
    e.open("POST", URL_ACTUAL + "ajax/getInfo", !0), e.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), e.send(t), e.onload = function() {
        if (200 == e.status) {
            (resp = JSON.parse(e.response)).status && ("" != resp.user_menu && (document.getElementById("user_menu").innerHTML = resp.user_menu), callSignPW = resp.is_logged ? setInterval(function() {
                sendUserPW(!0, resp.user)
            }, 500) : setInterval(function() {
                sendUserPW(!1, !1)
            }, 500), document.getElementById("user_sidebar").innerHTML = resp.user_sidebar, resp.is_subscriber && (document.getElementById("side_suscription").style.display = "none")), document.getElementById("sidebar").style.display = "block";
            var t = document.querySelector("#header");
            (t.classList.contains("is-home") || t.classList.contains("is-home-m")) && (document.querySelectorAll(".data-partido").forEach(function(e) {
                minxmin.ajaxCall(e)
            }), resp.zocPromo && (document.getElementById("zocPromoCont").innerHTML = resp.zocPromo, document.getElementById("zocPromoCont").style.display = "block", pushEventGTM("WidgetList", "NotifSuscriptor", "Print", "PromoLealesHome", 1)))
        }
    }
}*/

function getGeneralData() {
	var e = new XMLHttpRequest,
		t = "origin=" + document.location.href;
	e.open("POST", URL_ACTUAL + "ajax/getInfo", !0), e.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), e.send(t), e.onload = function() {
		if (200 == e.status) {
			(resp = JSON.parse(e.response)).status && ("" != resp.user_menu && (document.getElementById("user_menu").innerHTML = resp.user_menu), callSignPW = resp.is_logged ? setInterval(function() {
				sendUserPW(!0, resp.user)
			}, 500) : setInterval(function() {
				sendUserPW(!1, !1)
			}, 500), document.getElementById("user_sidebar").innerHTML = resp.user_sidebar, resp.is_subscriber && (document.getElementById("side_suscription").style.display = "none")), document.getElementById("sidebar").style.display = "block";
			var t = document.querySelector("#header");
			(t.classList.contains("is-home") || t.classList.contains("is-home-m")) && (document.querySelectorAll(".data-partido").forEach(function(e) {
				minxmin.ajaxCall(e)
			}), resp.zocPromo && (document.getElementById("zocPromoCont").innerHTML = resp.zocPromo, document.getElementById("zocPromoCont").style.display = "block", pushEventGTM("WidgetList", "NotifSuscriptor", "Print", "PromoLeales", 1)))
		}
	}
}
/* og
function getGeneralDataFromArticle(e, t) {
    var n = new XMLHttpRequest,
        i = "id=" + e + "&type=" + t + "&origin=" + document.location.href;
    n.open("POST", URL_ACTUAL + "ajax/getInfo", !0), n.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), n.send(i), n.onload = function() {
        200 == n.status && ((resp = JSON.parse(n.response)).status && ("" != resp.user_menu && (document.getElementById("user_menu").innerHTML = resp.user_menu), callSignPW = resp.is_logged ? setInterval(function() {
            sendUserPW(!0, resp.user)
        }, 500) : setInterval(function() {
            sendUserPW(!1, !1)
        }, 500), document.getElementById("user_sidebar").innerHTML = resp.user_sidebar, resp.is_subscriber ? document.getElementById("side_suscription").style.display = "none" : document.getElementById("lgwid") && (document.getElementById("lgwid").innerHTML = resp.viewWidget), "" != resp.viewContent && (document.getElementById("articleContent").innerHTML = resp.viewContent, resp.ads_ajax && setTimeout(function() {
            callGtag = setInterval(function() {
                displayGbanner(resp.ads_ajax)
            }, 1e3)
        }, 3e3), lazyload(), resp.show_wall && (document.getElementsByTagName("html")[0].style = "overflow: hidden", document.getElementById("dilogComments").remove(), document.getElementById("articleAudio") && document.getElementById("articleAudio").remove())), resp.share ? document.querySelectorAll("span.js-share-count").forEach(function(e) {
            e.innerHTML = resp.share
        }) : document.getElementById("j-ishare") && (document.getElementById("j-ishare").innerHTML = ""), resp.totalComments ? resp.totalComments > 0 ? document.querySelectorAll("span.js-comment-count").forEach(function(e) {
            e.innerHTML = resp.totalComments
        }) : (document.getElementById("iCommentsUp").remove(), document.getElementById("iCommentsDown").remove()) : document.querySelectorAll("span.js-comment-count").forEach(function(e) {
            e.innerHTML = ""
        }), resp.show_wall || showWidgetList(e), resp.is_selected && pushEventGTM("WidgetList", "NotifSuscriptor", "Print", resp.is_selected, 1)), document.getElementById("sidebar").style.display = "block")
    }
}*/

function getGeneralDataFromArticle(e, t) {
	var n = new XMLHttpRequest,
		i = "id=" + e + "&type=" + t + "&origin=" + document.location.href;
	n.open("POST", URL_ACTUAL + "ajax/getInfo", !0), n.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), n.send(i), n.onload = function() {
		200 == n.status && ((resp = JSON.parse(n.response)).status && ("" != resp.user_menu && (document.getElementById("user_menu").innerHTML = resp.user_menu), callSignPW = resp.is_logged ? setInterval(function() {
			sendUserPW(!0, resp.user)
		}, 500) : setInterval(function() {
			sendUserPW(!1, !1)
		}, 500), document.getElementById("user_sidebar").innerHTML = resp.user_sidebar, resp.is_subscriber ? document.getElementById("side_suscription").style.display = "none" : document.getElementById("lgwid") && (document.getElementById("lgwid").innerHTML = resp.viewWidget), "" != resp.viewContent && (resp.ads_ajax && setTimeout(function() {
			callGtag = setInterval(function() {
				displayGbanner(resp.ads_ajax)
			}, 1e3)
		}, 3e3), lazyload(), (document.getElementsByTagName("html")[0].style = "overflow: visible")), resp.share ? document.querySelectorAll("span.js-share-count").forEach(function(e) {
			e.innerHTML = resp.share
		}) : document.getElementById("j-ishare") && (document.getElementById("j-ishare").innerHTML = ""), resp.totalComments ? resp.totalComments > 0 ? document.querySelectorAll("span.js-comment-count").forEach(function(e) {
			e.innerHTML = resp.totalComments
		}) : (document.getElementById("iCommentsUp").remove(), document.getElementById("iCommentsDown").remove()) : document.querySelectorAll("span.js-comment-count").forEach(function(e) {
			e.innerHTML = ""
		}), showWidgetList(e)), document.getElementById("sidebar").style.display = "block")
	}
}

function displayGbanner(e) {
    if (googletag) {
        var t = e;
        Array.isArray(t) && t.forEach(function(e, t, n) {
            "" != e && (googletag.display(e), console.log(e + " cargado."))
        }), clearInterval(callGtag)
    }
}

function close(e) {
    showloading();
    var t = new XMLHttpRequest;
    t.open("POST", URL_ACTUAL + "usuarios/logout/" + e, !0), t.send(), t.onload = function() {
        200 == t.status && (resp = JSON.parse(t.response)).status && (callSignPW = setInterval(function() {
            sendUserPW(!1, !1)
        }, 500), window.location = resp.back_url)
    }
}

function closeAlert() {
    var e = new XMLHttpRequest;
    e.open("POST", URL_ACTUAL + "ajax/close_zocalo", !0), e.send(), e.onload = function() {
        e.status
    }, document.getElementById("alertHead").style.display = "none"
}

function sendUserPW(e, t) {
    "undefined" != typeof paywall && void 0 !== paywall.auth && (e ? paywall.auth.user() ? t && paywall.auth.user().id != t.id && paywall.signIn({
        id: t.id,
        email: t.email,
        first_name: t.nombre,
        last_name: t.apellido,
        avatar: t.avatar,
        identification_type: t.identification_type,
        identification_number: t.identification_number,
        phone: t.celular,
        roles: t.roles
    }) : paywall.signIn({
        id: t.id,
        email: t.email,
        first_name: t.nombre,
        last_name: t.apellido,
        avatar: t.avatar,
        identification_type: t.identification_type,
        identification_number: t.identification_number,
        phone: t.celular,
        roles: t.roles
    }) : paywall.auth.isLogged() && paywall.signOff(), clearInterval(callSignPW))
}

function sendOnesignal(e, t, n, i, s) {
    var a = window.OneSignal || [];
    a.push(function() {
        a.init({
            appId: n,
            promptOptions: {
                actionMessage: i,
                acceptButtonText: "Acepto",
                cancelButtonText: "No me interesa"
            }
        }), s && a.getUserId().then(function(e) {
            if (e) {
                var t = new XMLHttpRequest;
                t.open("POST", URL_ACTUAL + "ajax/send_token", !0), t.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), t.send("token=" + e), t.onload = function() {
                    t.status
                }
            }
        }), a.setExternalUserId(e), t && a.sendTag("suscripto", "si").then(function(e) {})
    })
}

function sendShareCl(e, t) {
    var n = new XMLHttpRequest;
    n.open("POST", URL_ACTUAL + "redes/shareTwWh", !0), n.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), n.send("objeto_id=" + e + "&type=" + t), n.onload = function() {
        n.status
    }
}

function resizeInit(e) {
    var t = e.querySelectorAll("div.range")[0];
    t.classList.contains("active") ? t.classList.remove("active") : t.classList.add("active")
}

function resize(e) {
    10 == e.value ? (document.getElementById("articleContainer").classList.remove("t2"), document.getElementById("articleContainer").classList.remove("t3"), document.getElementById("articleContainer").classList.add("t1")) : 20 == e.value ? (document.getElementById("articleContainer").classList.remove("t1"), document.getElementById("articleContainer").classList.remove("t3"), document.getElementById("articleContainer").classList.add("t2")) : 30 == e.value ? (document.getElementById("articleContainer").classList.remove("t1"), document.getElementById("articleContainer").classList.remove("t2"), document.getElementById("articleContainer").classList.add("t3")) : (document.getElementById("articleContainer").classList.remove("t1"), document.getElementById("articleContainer").classList.remove("t2"), document.getElementById("articleContainer").classList.remove("t3")), "myRange1" == e.id ? document.getElementById("myRange2").value = e.value : document.getElementById("myRange1").value = e.value;
    var t = new XMLHttpRequest,
        n = "range=" + e.value;
    t.open("POST", URL_ACTUAL + "ajax/changeSizeArticle", !0), t.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), t.send(n), t.onload = function() {
        t.status
    }
}
document.addEventListener && lazyload(), document.getElementById("textSearch").addEventListener("keyup", function(e) {
    13 == (e.keyCode || e.which) && searchNow()
});
var minxmin = {
    intervalos: {},
    getTime: function(e) {
        var t = new Date(e).getTime(),
            n = new Date().getTime() - t,
            i = parseInt(n / 1e3 / 60 / 60),
            s = parseInt(n / 1e3 / 60 - 60 * i),
            a = parseInt(n / 1e3 - 3600 * i - 60 * s);
        return i > 0 ? (i > 9 ? i : "0" + i) + ":" + (s > 9 ? s : "0" + s) + ":" + (a > 9 ? a : "0" + a) : (s > 9 ? s : "0" + s) + ":" + (a > 9 ? a : "0" + a)
    },
    showTimer: function(e, t) {
        var n = e.dataset.fecha_estado;
        t.innerHTML = this.getTime(n)
    },
    getMatchData: function(e, t) {
        var n = new XMLHttpRequest;
        n.open("GET", URL_ACTUAL + "partidos/mam_minuto/" + e, !0), n.onload = function() {
            200 == n.status && t(resp = JSON.parse(n.response))
        }, n.send()
    },
    iniciarReloj: function(e, t, n) {
        minxmin.intervalos["reloj_" + t] || (minxmin.intervalos["reloj_" + t] = setInterval(function() {
            minxmin.showTimer(e, n)
        }, 1e3))
    },
    stop: function(e) {
        minxmin.intervalos["reloj_" + e] && clearInterval(minxmin.intervalos["reloj_" + e])
    },
    startInterval: function(e, t, n, i) {
        var s = this;
        minxmin.intervalos[e + n] = setInterval(function() {
            s.getMatchData(n, i)
        }, 1e3 * t)
    },
    ajaxCall: function(e) {
        var t = e.dataset.id_partido;
        e.dataset.estado;
        var n = e.getElementsByClassName("js-reloj-mam")[0],
            i = e.getElementsByClassName("js-hora")[0],
            s = n.dataset.uniq,
            a = e.getElementsByClassName("js-descripcion-estado")[0];
        if (e.getElementsByClassName("js-marquee")) var o = e.getElementsByClassName("js-marquee")[0];
        else var o = !1;
        var l = e.getElementsByClassName("js-local-name")[0],
            r = e.getElementsByClassName("js-visit-name")[0],
            d = e.getElementsByClassName("js-local-shield")[0],
            c = e.getElementsByClassName("js-visit-shield")[0],
            m = e.getElementsByClassName("js-score")[0],
            u = this,
            g = function(e) {
                switch (l.innerHTML = e.local_abbr, r.innerHTML = e.visita_abbr, d.setAttribute("src", e.escudo_local), c.setAttribute("src", e.escudo_visita), e.gol_penal_local ? m.innerHTML = '<span style="font-size:10px;">(' + e.gol_penal_local + ")</span>" + e.gol_local + " . " + e.gol_visita + '<span style="font-size:10px;">(' + e.gol_penal_visita + ")</span>" : m.innerHTML = e.gol_local + " . " + e.gol_visita, n.dataset.fecha_estado = e.fecha_inicio_estado, parseInt(e.mam_estado)) {
                    case 0:
                        i.innerHTML = e.fecha_corta + " " + e.hora_inicio + " hrs", a.innerHTML = "", o && (o.innerHTML = "");
                        break;
                    case 1:
                        minxmin.iniciarReloj(n, s, i), a.innerHTML = "PT", o && (o.innerHTML = e.incidencias);
                        break;
                    case 2:
                        minxmin.stop(s), e.fecha_corta ? i.innerHTML = e.fecha_corta : i.innerHTML = "Fin", a.innerHTML = "", o && (o.innerHTML = e.incidencias);
                        break;
                    case 3:
                        minxmin.stop(s), i.innerHTML = "Susp", a.innerHTML = "", o && (o.innerHTML = e.incidencias);
                        break;
                    case 4:
                        minxmin.stop(s), i.innerHTML = "Post", a.innerHTML = "";
                        break;
                    case 5:
                    case 9:
                        minxmin.stop(s), i.innerHTML = "ET", a.innerHTML = "", o && (o.innerHTML = e.incidencias);
                        break;
                    case 6:
                        minxmin.iniciarReloj(n, s, i), a.innerHTML = "ST", o && (o.innerHTML = e.incidencias);
                        break;
                    case 7:
                        minxmin.stop(s), i.innerHTML = "Alar", a.innerHTML = "", o && (o.innerHTML = e.incidencias);
                        break;
                    case 8:
                        minxmin.iniciarReloj(n, s, i), a.innerHTML = "PTA", o && (o.innerHTML = e.incidencias);
                        break;
                    case 10:
                        minxmin.iniciarReloj(n, s, i), a.innerHTML = "STA", o && (o.innerHTML = e.incidencias);
                        break;
                    case 11:
                        minxmin.stop(s), i.innerHTML = "Fin", a.innerHTML = "", o && (o.innerHTML = e.incidencias);
                        break;
                    case 12:
                        minxmin.stop(s), i.innerHTML = "Pen", a.innerHTML = "", o && (o.innerHTML = e.incidencias), minxmin.intervalos["penales_partido_" + t] || (clearInterval(minxmin.intervalos["partido_" + t]), u.startInterval("penales_partido_", 10, t, g))
                }
            };
        this.getMatchData(t, g), this.startInterval("partido_", 60, t, g)
    },
    ajaxCallCards: function(e) {
        var t = e.dataset.pid,
            n = e.getElementsByClassName("js-nombre-local")[0],
            i = e.getElementsByClassName("js-nombre-visita")[0],
            s = e.getElementsByClassName("js-escudo-local")[0],
            a = e.getElementsByClassName("js-escudo-visita")[0],
            o = e.getElementsByClassName("js-resultado")[0],
            l = function(e) {
                if (e.local_abbr) switch (n.innerHTML = e.local_abbr, i.innerHTML = e.visita_abbr, s.setAttribute("src", e.escudo_local), a.setAttribute("src", e.escudo_visita), parseInt(e.mam_estado)) {
                    case 2:
                        e.gol_penal_local || e.gol_penal_visita ? o.innerHTML = "<span>(" + e.gol_penal_local + ")<span> " + e.gol_local + " . " + e.gol_visita + " <span>(" + e.gol_penal_visita + ")</span>" : o.innerHTML = e.gol_local + " . " + e.gol_visita;
                        break;
                    case 12:
                        o.innerHTML = "<span>(" + e.gol_penal_local + ")<span> " + e.gol_local + " . " + e.gol_visita + " <span>(" + e.gol_penal_visita + ")</span>";
                        break;
                    default:
                        o.innerHTML = e.gol_local + " . " + e.gol_visita
                }
            };
        this.getMatchData(t, l)
    }
};

function hideZoc() {
    document.getElementsByClassName("js-zocalo")[0].style.display = "none"
}

function copyToClipboard(e) {
    var t = document.createElement("textarea");
    t.value = e, document.body.appendChild(t), t.select(), document.execCommand("Copy"), t.remove(), closeModal("mshare")
}
/*
function showModal(e) {
    let t = document.getElementById(e),
        n = document.getElementById("modal-close"),
        i = document.querySelector(".body-blackout");
    var s = window.scrollY,
        a = !1;
    header.classList.contains("is-home-m") ? a = !0 : header.classList.contains("is-mobile") && (a = !0), "mshare" == e && a ? t.style.cssText = "" : "mlist" == e && a ? t.style.cssText = "" : t.style.cssText = "top: " + (s + 350) + "px", t.classList.add("is--visible"), i.classList.add("is-blacked-out"), document.getElementsByTagName("html")[0].style.overflow = "hidden", n.addEventListener("click", () => {
        t.classList.remove("is--visible"), i.classList.remove("is-blacked-out"), document.getElementsByTagName("html")[0].style.overflow = "auto", document.getElementById("modal-content").innerHTML = ""
    }), i.addEventListener("click", () => {
        t.classList.remove("is--visible"), i.classList.remove("is-blacked-out"), document.getElementsByTagName("html")[0].style.overflow = "auto", document.getElementById("modal-content").innerHTML = ""
    })
}

function closeModal(e) {
    let t = document.getElementById(e),
        n = document.querySelector(".body-blackout");
    t.classList.remove("is--visible"), n.classList.remove("is-blacked-out"), document.getElementsByTagName("html")[0].style.overflow = "auto", document.getElementById("modal-content").innerHTML = ""
}

function checkCardExpDate() {
    paywall.queue.push(["invoke", "viewSubscriptionData", function(e) {
        if (e && e.is_active && e.card && e.card.expiration_date) {
            var t = new Date,
                n = new Date,
                i = new Date(n.setMonth(n.getMonth() + 1)),
                s = new Date(e.card.expiration_date),
                a = e.failed_payments,
                o = e.resource.price;
            (s <= i || s < t || a > 1) && o > 0 && (req_sign.open("POST", URL_ACTUAL + "ajax/notif_susc", !0), req_sign.send(), req_sign.onload = function() {
                200 == req_sign.status && (resp = JSON.parse(req_sign.response)).estado && resp.user_id == e.subscriber.user_id && (a > 1 ? (console.log("Moroso"), pushEventGTM("NotifSuscriptor", "NotifSuscriptor", "Moroso", "AvisoSuscriptor", 1)) : s < t ? (console.log("Tarjeta vencida"), pushEventGTM("NotifSuscriptor", "NotifSuscriptor", "TarjetaVencida", "AvisoSuscriptor", 1)) : s <= i && (console.log("Tarjeta por vencer"), pushEventGTM("NotifSuscriptor", "NotifSuscriptor", "TarjetaPorVencer", "AvisoSuscriptor", 1)))
            })
        }
    }])
}
*/
function showWidgetList(e) {
    if (document.getElementById("listID") && document.getElementById("lgwid") && 0 == document.getElementById("lgwid").innerText.length) {
        var t = document.getElementById("listID").value;
        if (t) {
            var n = new XMLHttpRequest;
            n.open("POST", URL_ACTUAL + "widget/show_widget_list", !0), n.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), n.send("list_id=" + t + "&nota_id=" + e), n.onload = function() {
                200 == n.status && (resp = JSON.parse(n.response)).status && (document.getElementById("lgwid").innerHTML = resp.widget, dataLayer.push({
                    event: "WidgetList",
                    eventCategory: "WidgetList",
                    eventAction: resp.eventAction,
                    eventLabel: resp.eventLabel,
                    eventValue: 1
                }))
            }
        }
    }
}
/*
function showFormWidgetSubscribe(e, t, n) {
    showloading();
    var i = new XMLHttpRequest;
    i.open("POST", URL_ACTUAL + "widget/show_widget_list_form", !0), i.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), i.send("list_id=" + n + "&nota_id=" + t), i.onload = function() {
        if (200 == i.status && (resp = JSON.parse(i.response)).status) {
            if ("object" != typeof grecaptcha) {
                var t, n, s, a = "script";
                (n = (t = document).createElement(a)).type = "text/java" + a, n.async = "async", n.src = "https://www.google.com/recaptcha/api.js?render=6LdM4ZQUAAAAAJxQkCG_8CujiKFD9HnnhrgIlPAn", (s = t.getElementsByTagName(a)[0]).parentNode.insertBefore(n, s)
            }
            document.getElementById(e).innerHTML = resp.widget_form, showModal(e)
        }
        hideloading()
    }
}
*/
function suscLista(e) {
    showloading(), document.getElementById("msj_errorsus").innerHTML = "";
    var t = document.getElementById(e);
    formData = new FormData(t), grecaptcha.execute("6LdM4ZQUAAAAAJxQkCG_8CujiKFD9HnnhrgIlPAn").then(function(e) {
        formData.append("token", e);
        var t = new XMLHttpRequest;
        t.open("POST", URL_ACTUAL + "widget/suscribe", !0), t.send(formData), t.onload = function() {
            200 == t.status ? (resp = JSON.parse(t.response)).status ? (document.getElementById("contNews").innerHTML = resp.html_res, closeModal("mlist"), dataLayer.push({
                event: "WidgetList",
                eventCategory: "WidgetList",
                eventAction: resp.eventAction,
                eventLabel: resp.eventLabel,
                eventValue: 1
            })) : document.getElementById("msj_errorsus").innerHTML = resp.msj : document.getElementById("msj_errorsus").innerHTML = "Se produjo un error inesperado. Intentelo nuevamente.", hideloading()
        }
    }).catch(function() {
        hideloading(), document.getElementById("msj_errorsus").innerHTML = "Se produjo un error inesperado. Intentelo nuevamente."
    })
}

function pushEventGTM(e, t, n, i, s) {
    dataLayer.push({
        event: e,
        eventCategory: t,
        eventAction: n,
        eventLabel: i,
        eventValue: s
    })
}
if (document.addEventListener) {
    let e = document.location,
        t = e.pathname.split("/");
    var n = 0;
    t.forEach(function(e, i) {
        "nota" == e && (n = t[i + 1])
    }), n > 0 ? getGeneralDataFromArticle(n, 32) : getGeneralData()
}
/* og
function agregarBanner(e, t, n) {
    if (t.height) var i = t.height;
    else var i = "250";
    if (t.width) var s = t.width;
    else var s = "250";
    t.range && t.range;
    var a = document.createElement("div");
    a.setAttribute("class", "col-12 add");
    var o = document.createElement("div");
    o.setAttribute("id", "adslot" + t.id), o.setAttribute("style", "min-height:" + i + "px; min-width:" + s + "px; text-align:left; overflow-x:hidden; justify-content:left; margin-left:auto; margin-right:auto;"), a.appendChild(o), document.getElementById(e).appendChild(a), googletag.cmd.push(function() {
        if (googletag.pubads().setCentering(!0), googletag.enableServices(), n) var e = googletag.defineSlot("/1418175/" + t.slot, [300, 250], "adslot" + t.id).addService(googletag.pubads());
        else var e = googletag.defineSlot("/1418175/" + t.slot, [
            [300, 250],
            [728, 90],
            [728, 250]
        ], "adslot" + t.id).addService(googletag.pubads());
        googletag.pubads().addEventListener("slotRenderEnded", function(e) {}), googletag.display("adslot" + t.id), googletag.pubads().refresh([e])
    })
}*/

function agregarBanner(e, t, n) {
	if (t.height) var i = t.height;
	else var i = "250";
	if (t.width) var a = t.width;
	else var a = "250";
	t.range && t.range;
	var s = document.createElement("div");
	s.setAttribute("class", "col-12 add");
}

function bikers(e) {
    showloading();
    var t = document.getElementById(e);
    formData = new FormData(t);
    var n = new XMLHttpRequest;
    n.open("POST", URL_ACTUAL + "widget/get_bikers", !0), n.send(formData), n.onload = function() {
        200 == n.status && (resp = JSON.parse(n.response)).status && (document.getElementById("result").innerHTML = resp.view), hideloading()
    }
}
