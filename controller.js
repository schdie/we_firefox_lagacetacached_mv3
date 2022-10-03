function showloading() {
    if (document.getElementById("dloading")) document.getElementById("dloading").style.display = "block";
    else {
        var a = document.createElement("div");
        a.setAttribute("id", "dloading"), a.style.cssText = "width: 100%; height: 100%; z-index: 10009; top: 0px; left: 0px; background: rgba(255,255,255,.7); position: fixed; overflow: hidden; text-align: center";
        var b = document.createElement("img");
        b.setAttribute("src", URL_ACTUAL + "images/loading.gif"), b.setAttribute("style", "position:relative;top:45%;"), a.appendChild(b), document.getElementsByTagName("body")[0].appendChild(a)
    }
}

function hideloading() {
    document.getElementById("dloading") && (document.getElementById("dloading").style.display = "none")
}
var wall_chequeado = !0

function wallChequed(a) {
    wall_chequeado || (dataLayer.push({
        event: "SuscriptionVirtualPageview",
        virtualPageURL: a
    }), console.log("PageURL: " + a), wall_chequeado = !0)
}

function scrollBar() {
    var f = window.scrollY,
        a = document.querySelector("#header"),
        g = document.querySelector("#addTop"),
        c = !1,
        d = !1,
        e = !1,
        b = !1,
        h = 20;
    a.classList.contains("is-home") ? d = !0 : a.classList.contains("is-home-m") ? (e = !0, b = !0) : a.classList.contains("is-mobile") && (b = !0), a.classList.contains("esp") && (c = !0), window.addEventListener("scroll", function() {
        var i = window.scrollY;
        if (d) h = 600, window.scrollY > 600 && (a.classList.add("sticky", "small"), document.body.style.paddingTop = "265px"), window.scrollY <= 600 && (a.classList.remove("sticky", "small"), document.body.style.paddingTop = "0px");
        else {
            if (e) var j = 148;
            else var j = 1;
            window.scrollY > j ? (a.classList.add("sticky"), b && a.classList.add("is-up"), e ? (document.body.style.paddingTop = "130px", g && (g.style.visibility = "hidden")) : b && g && (g.style.marginTop = "70px")) : (a.classList.remove("sticky"), b && a.classList.remove("is-up"), e ? (document.body.style.paddingTop = "0px", g && (g.style.visibility = "visible")) : b && g && (g.style.marginTop = "0px"))
        }
        i > f ? (b || a.classList.remove("is-up"), c && (a.classList.add("esp"), document.querySelector("#brandHeader").src = URL_ACTUAL + "assets/2022/images/brandw.svg")) : f > i && (window.scrollY > h ? (b || a.classList.add("is-up"), c && (a.classList.remove("esp"), document.querySelector("#brandHeader").src = URL_ACTUAL + "assets/2022/images/brand.svg")) : (b || a.classList.remove("is-up"), c && (a.classList.add("esp"), document.querySelector("#brandHeader").src = URL_ACTUAL + "assets/2022/images/brandw.svg"))), f = i <= 0 ? 0 : i
    })
}

function share(c) {
    var a = new Object;
    if (a.width = 700, a.height = 435, (now = new Date).getTime(), "Netscape" == navigator.appName) {
        a.left = window.screenX + (window.outerWidth - a.width) / 2, a.top = window.screenY + (window.outerHeight - a.height) / 2;
        var b = "screenX=" + a.left + ",screenY=" + a.top + ",resizable=no,width=" + a.width + ",height=" + a.height + ",scrollbars=yes,menubar=no,location=no,toolbar=no,status=no,directories=no"
    } else if (document.all) {
        a.left = (screen.width - a.width) / 2, a.top = (screen.height - a.height) / 2;
        var b = "left=" + a.left + ",top=" + a.top + ",resizable=no,width=" + a.width + ",height=" + a.height + ",scrollbars=yes,menubar=no,location=no,toolbar=no,status=no,directories=no"
    }
    window.open(c, "Redes", b)
}

function lazyload() {
    if ("loading" in HTMLImageElement.prototype) {
        let a = document.querySelectorAll('img[loading="lazy"]');
        a.forEach(a => {
            a.src = a.dataset.original
        })
    } else {
        let b = document.querySelectorAll('img[class="lazy"]');
        b.forEach(a => {
            a.src = a.dataset.original
        })
    }
}

function searchNow() {
    word2 = (word2 = (word = (value = document.getElementById("textSearch").value.trim()).replace(/ /gi, "_")).replace(/\./gi, "_")).toLowerCase(), window.location = URL_ACTUAL + "buscar?q=" + word2
}

function searchNowAdvanced() {
    url = URL_ACTUAL + "buscar?q=" + (word2 = (word2 = (word = (value = document.getElementById("textSearchAdvanced").value.trim()).replace(/ /gi, "_")).replace(/\./gi, "_")).toLowerCase()), document.getElementById("searchForm").setAttribute("action", url), document.getElementById("searchForm").submit(), showloading()
}

function getGeneralData() {
    var a = new XMLHttpRequest,
        b = "origin=" + document.location.href;
    a.open("POST", URL_ACTUAL + "ajax/getInfo", !0), a.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), a.send(b), a.onload = function() {
        200 == a.status && ((resp = JSON.parse(a.response)).status && ("" != resp.user_menu && (document.getElementById("user_menu").innerHTML = resp.user_menu), callSignPW = resp.is_logged ? setInterval(function() {
            sendUserPW(!0, resp.user)
        }, 500) : setInterval(function() {
            sendUserPW(!1, !1)
        }, 500), document.getElementById("user_sidebar").innerHTML = resp.user_sidebar, resp.is_subscriber && (document.getElementById("side_suscription").style.display = "none")), document.getElementById("sidebar").style.display = "block", document.querySelector("#header").classList.contains("is-home") && document.querySelectorAll(".data-partido").forEach(function(a) {
            minxmin.ajaxCall(a)
        }))
    }
}

function getGeneralDataFromArticle(b, c) {
    var a = new XMLHttpRequest,
        d = "id=" + b + "&type=" + c + "&origin=" + document.location.href;
    a.open("POST", URL_ACTUAL + "ajax/getInfo", !0), a.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), a.send(d), a.onload = function() {
        200 == a.status && ((resp = JSON.parse(a.response)).status && ("" != resp.user_menu && (document.getElementById("user_menu").innerHTML = resp.user_menu), callSignPW = resp.is_logged ? setInterval(function() {
            sendUserPW(!0, resp.user)
        }, 500) : setInterval(function() {
            sendUserPW(!1, !1)
        }, 500), document.getElementById("user_sidebar").innerHTML = resp.user_sidebar, resp.is_subscriber ? document.getElementById("side_suscription").style.display = "none" : document.getElementById("lgwid") && (document.getElementById("lgwid").innerHTML = resp.viewWidget), "" != resp.viewContent && (document.getElementById("articleContent").innerHTML = resp.viewContent, resp.ads_ajax && (callGtag = setInterval(function() {
            displayGbanner(resp.ads_ajax)
        }, 1e3)), lazyload(), resp.show_wall && (document.getElementsByTagName("html")[0].style = "overflow: visible")), resp.share ? document.querySelectorAll("span.js-share-count").forEach(function(a) {
            a.innerHTML = resp.share
        }) : document.getElementById("j-ishare") && (document.getElementById("j-ishare").innerHTML = ""), resp.totalComments ? resp.totalComments > 0 ? document.querySelectorAll("span.js-comment-count").forEach(function(a) {
            a.innerHTML = resp.totalComments
        }) : (document.getElementById("iCommentsUp").remove(), document.getElementById("iCommentsDown").remove()) : document.querySelectorAll("span.js-comment-count").forEach(function(a) {
            a.innerHTML = ""
        }), resp.show_wall || showWidgetList(b)), document.getElementById("sidebar").style.display = "block")
    }
}

function displayGbanner(b) {
    if (googletag) {
        var a = b;
        Array.isArray(a) && a.forEach(function(a, b, c) {
            "" != a && googletag.display(a)
        }), clearInterval(callGtag)
    }
}

function close(b) {
    showloading();
    var a = new XMLHttpRequest;
    a.open("POST", URL_ACTUAL + "usuarios/logout/" + b, !0), a.send(), a.onload = function() {
        200 == a.status && (resp = JSON.parse(a.response)).status && (callSignPW = setInterval(function() {
            sendUserPW(!1, !1)
        }, 500), window.location = resp.back_url)
    }
}

function closeAlert() {
    var a = new XMLHttpRequest;
    a.open("POST", URL_ACTUAL + "ajax/close_zocalo", !0), a.send(), a.onload = function() {
        a.status
    }, document.getElementById("alertHead").style.display = "none"
}

function sendUserPW(b, a) {
    "undefined" != typeof paywall && void 0 !== paywall.auth && (b ? paywall.auth.user() ? a && paywall.auth.user().id != a.id && paywall.signIn({
        id: a.id,
        email: a.email,
        first_name: a.nombre,
        last_name: a.apellido,
        avatar: a.avatar,
        identification_type: a.identification_type,
        identification_number: a.identification_number,
        phone: a.celular,
        roles: a.roles
    }) : paywall.signIn({
        id: a.id,
        email: a.email,
        first_name: a.nombre,
        last_name: a.apellido,
        avatar: a.avatar,
        identification_type: a.identification_type,
        identification_number: a.identification_number,
        phone: a.celular,
        roles: a.roles
    }) : paywall.auth.isLogged() && paywall.signOff(), clearInterval(callSignPW))
}

function sendOnesignal(b, c, d, e, f) {
    var a = window.OneSignal || [];
    a.push(function() {
        a.init({
            appId: d,
            promptOptions: {
                actionMessage: e,
                acceptButtonText: "Acepto",
                cancelButtonText: "No me interesa"
            }
        }), f && a.getUserId().then(function(b) {
            if (b) {
                var a = new XMLHttpRequest,
                    c = "token=" + b;
                a.open("POST", URL_ACTUAL + "ajax/send_token", !0), a.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), a.send(c), a.onload = function() {
                    a.status
                }
            }
        }), a.setExternalUserId(b), c && a.sendTag("suscripto", "si").then(function(a) {})
    })
}

function sendShareCl(b, c) {
    var a = new XMLHttpRequest;
    a.open("POST", URL_ACTUAL + "redes/shareTwWh", !0), a.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), a.send("objeto_id=" + b + "&type=" + c), a.onload = function() {
        a.status
    }
}

function resizeInit(b) {
    var a = b.querySelectorAll("div.range")[0];
    a.classList.contains("active") ? a.classList.remove("active") : a.classList.add("active")
}

function resize(a) {
    10 == a.value ? (document.getElementById("articleContainer").classList.remove("t2"), document.getElementById("articleContainer").classList.remove("t3"), document.getElementById("articleContainer").classList.add("t1")) : 20 == a.value ? (document.getElementById("articleContainer").classList.remove("t1"), document.getElementById("articleContainer").classList.remove("t3"), document.getElementById("articleContainer").classList.add("t2")) : 30 == a.value ? (document.getElementById("articleContainer").classList.remove("t1"), document.getElementById("articleContainer").classList.remove("t2"), document.getElementById("articleContainer").classList.add("t3")) : (document.getElementById("articleContainer").classList.remove("t1"), document.getElementById("articleContainer").classList.remove("t2"), document.getElementById("articleContainer").classList.remove("t3")), "myRange1" == a.id ? document.getElementById("myRange2").value = a.value : document.getElementById("myRange1").value = a.value;
    var b = new XMLHttpRequest,
        c = "range=" + a.value;
    b.open("POST", URL_ACTUAL + "ajax/changeSizeArticle", !0), b.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), b.send(c), b.onload = function() {
        b.status
    }
}
document.addEventListener && lazyload(), document.getElementById("textSearch").addEventListener("keyup", function(a) {
    13 == (a.keyCode || a.which) && searchNow()
});
var minxmin = {
    intervalos: {},
    getTime: function(e) {
        var f = new Date(e).getTime(),
            g = new Date,
            h = g.getTime(),
            d = h - f,
            b = parseInt(d / 1e3 / 60 / 60),
            a = parseInt(d / 1e3 / 60 - 60 * b),
            c = parseInt(d / 1e3 - 3600 * b - 60 * a);
        return b > 0 ? (b > 9 ? b : "0" + b) + ":" + (a > 9 ? a : "0" + a) + ":" + (c > 9 ? c : "0" + c) : (a > 9 ? a : "0" + a) + ":" + (c > 9 ? c : "0" + c)
    },
    showTimer: function(a, b) {
        var c = a.dataset.fecha_estado;
        b.innerHTML = this.getTime(c)
    },
    getMatchData: function(b, c) {
        var a = new XMLHttpRequest;
        a.open("GET", URL_ACTUAL + "partidos/mam_minuto/" + b, !0), a.onload = function() {
            200 == a.status && c(resp = JSON.parse(a.response))
        }, a.send()
    },
    iniciarReloj: function(b, a, c) {
        minxmin.intervalos["reloj_" + a] || (minxmin.intervalos["reloj_" + a] = setInterval(function() {
            minxmin.showTimer(b, c)
        }, 1e3))
    },
    stop: function(a) {
        minxmin.intervalos["reloj_" + a] && clearInterval(minxmin.intervalos["reloj_" + a])
    },
    startInterval: function(a, b, c, d) {
        var e = this;
        minxmin.intervalos[a + c] = setInterval(function() {
            e.getMatchData(c, d)
        }, 1e3 * b)
    },
    ajaxCall: function(a) {
        var b = a.dataset.id_partido;
        a.dataset.estado;
        var d = a.getElementsByClassName("js-reloj-mam")[0],
            f = a.getElementsByClassName("js-hora")[0],
            g = d.dataset.uniq,
            h = a.getElementsByClassName("js-descripcion-estado")[0];
        if (a.getElementsByClassName("js-marquee")) var e = a.getElementsByClassName("js-marquee")[0];
        else var e = !1;
        var i = a.getElementsByClassName("js-local-name")[0],
            j = a.getElementsByClassName("js-visit-name")[0],
            k = a.getElementsByClassName("js-local-shield")[0],
            l = a.getElementsByClassName("js-visit-shield")[0],
            m = a.getElementsByClassName("js-score")[0],
            n = this,
            c = function(a) {
                switch (i.innerHTML = a.local_abbr, j.innerHTML = a.visita_abbr, k.setAttribute("src", a.escudo_local), l.setAttribute("src", a.escudo_visita), a.gol_penal_local ? m.innerHTML = '<span style="font-size:10px;">(' + a.gol_penal_local + ")</span>" + a.gol_local + " . " + a.gol_visita + '<span style="font-size:10px;">(' + a.gol_penal_visita + ")</span>" : m.innerHTML = a.gol_local + " . " + a.gol_visita, d.dataset.fecha_estado = a.fecha_inicio_estado, parseInt(a.mam_estado)) {
                    case 0:
                        f.innerHTML = a.fecha_corta + " " + a.hora_inicio + " hrs", h.innerHTML = "", e && (e.innerHTML = "");
                        break;
                    case 1:
                        minxmin.iniciarReloj(d, g, f), h.innerHTML = "PT", e && (e.innerHTML = a.incidencias);
                        break;
                    case 2:
                        minxmin.stop(g), a.fecha_corta ? f.innerHTML = a.fecha_corta : f.innerHTML = "Fin", h.innerHTML = "", e && (e.innerHTML = a.incidencias);
                        break;
                    case 3:
                        minxmin.stop(g), f.innerHTML = "Susp", h.innerHTML = "", e && (e.innerHTML = a.incidencias);
                        break;
                    case 4:
                        minxmin.stop(g), f.innerHTML = "Post", h.innerHTML = "";
                        break;
                    case 5:
                    case 9:
                        minxmin.stop(g), f.innerHTML = "ET", h.innerHTML = "", e && (e.innerHTML = a.incidencias);
                        break;
                    case 6:
                        minxmin.iniciarReloj(d, g, f), h.innerHTML = "ST", e && (e.innerHTML = a.incidencias);
                        break;
                    case 7:
                        minxmin.stop(g), f.innerHTML = "Alar", h.innerHTML = "", e && (e.innerHTML = a.incidencias);
                        break;
                    case 8:
                        minxmin.iniciarReloj(d, g, f), h.innerHTML = "PTA", e && (e.innerHTML = a.incidencias);
                        break;
                    case 10:
                        minxmin.iniciarReloj(d, g, f), h.innerHTML = "STA", e && (e.innerHTML = a.incidencias);
                        break;
                    case 11:
                        minxmin.stop(g), f.innerHTML = "Fin", h.innerHTML = "", e && (e.innerHTML = a.incidencias);
                        break;
                    case 12:
                        minxmin.stop(g), f.innerHTML = "Pen", h.innerHTML = "", e && (e.innerHTML = a.incidencias), minxmin.intervalos["penales_partido_" + b] || (clearInterval(minxmin.intervalos["partido_" + b]), n.startInterval("penales_partido_", 10, b, c))
                }
            };
        this.getMatchData(b, c), this.startInterval("partido_", 60, b, c)
    },
    ajaxCallCards: function(a) {
        var b = a.dataset.pid,
            c = a.getElementsByClassName("js-nombre-local")[0],
            d = a.getElementsByClassName("js-nombre-visita")[0],
            e = a.getElementsByClassName("js-escudo-local")[0],
            f = a.getElementsByClassName("js-escudo-visita")[0],
            g = a.getElementsByClassName("js-resultado")[0];
        this.getMatchData(b, function(a) {
            if (a.local_abbr) switch (c.innerHTML = a.local_abbr, d.innerHTML = a.visita_abbr, e.setAttribute("src", a.escudo_local), f.setAttribute("src", a.escudo_visita), parseInt(a.mam_estado)) {
                case 2:
                    a.gol_penal_local || a.gol_penal_visita ? g.innerHTML = "<span>(" + a.gol_penal_local + ")<span> " + a.gol_local + " . " + a.gol_visita + " <span>(" + a.gol_penal_visita + ")</span>" : g.innerHTML = a.gol_local + " . " + a.gol_visita;
                    break;
                case 12:
                    g.innerHTML = "<span>(" + a.gol_penal_local + ")<span> " + a.gol_local + " . " + a.gol_visita + " <span>(" + a.gol_penal_visita + ")</span>";
                    break;
                default:
                    g.innerHTML = a.gol_local + " . " + a.gol_visita
            }
        })
    }
};

function hideZoc() {
    document.getElementsByClassName("js-zocalo")[0].style.display = "none"
}

function copyToClipboard(b) {
    var a = document.createElement("textarea");
    a.value = b, document.body.appendChild(a), a.select(), document.execCommand("Copy"), a.remove(), closeModal("mshare")
}

function showModal(c) {
    let a = document.getElementById(c),
        e = document.getElementById("modal-close"),
        d = document.querySelector(".body-blackout");
    var f = window.scrollY,
        b = !1;
    header.classList.contains("is-home-m") ? b = !0 : header.classList.contains("is-mobile") && (b = !0), "mshare" == c && b ? a.style.cssText = "" : "mlist" == c && b ? a.style.cssText = "" : a.style.cssText = "top: " + (f + 350) + "px", a.classList.add("is--visible"), d.classList.add("is-blacked-out"), document.getElementsByTagName("html")[0].style.overflow = "hidden", e.addEventListener("click", () => {
        a.classList.remove("is--visible"), d.classList.remove("is-blacked-out"), document.getElementsByTagName("html")[0].style.overflow = "auto", document.getElementById("modal-content").innerHTML = ""
    }), d.addEventListener("click", () => {
        a.classList.remove("is--visible"), d.classList.remove("is-blacked-out"), document.getElementsByTagName("html")[0].style.overflow = "auto", document.getElementById("modal-content").innerHTML = ""
    })
}

function closeModal(a) {
    let b = document.getElementById(a),
        c = document.querySelector(".body-blackout");
    b.classList.remove("is--visible"), c.classList.remove("is-blacked-out"), document.getElementsByTagName("html")[0].style.overflow = "auto", document.getElementById("modal-content").innerHTML = ""
}
/*
function checkCardExpDate() {
    paywall.queue.push(["invoke", "viewSubscriptionData", function(a) {
        if (a && a.is_active && a.card && a.card.expiration_date) {
            var d = new Date,
                b = new Date,
                e = new Date(b.setMonth(b.getMonth() + 1)),
                c = new Date(a.card.expiration_date),
                f = a.failed_payments,
                g = a.resource.price;
            (c <= e || c < d || f > 1) && g > 0 && (req_sign.open("POST", URL_ACTUAL + "ajax/notif_susc", !0), req_sign.send(), req_sign.onload = function() {
                200 == req_sign.status && (resp = JSON.parse(req_sign.response)).estado && resp.user_id == a.subscriber.user_id && (f > 1 ? (console.log("Moroso"), pushEventGTM("NotifSuscriptor", "NotifSuscriptor", "Moroso", "AvisoSuscriptor", 1)) : c < d ? (console.log("Tarjeta vencida"), pushEventGTM("NotifSuscriptor", "NotifSuscriptor", "TarjetaVencida", "AvisoSuscriptor", 1)) : c <= e && (console.log("Tarjeta por vencer"), pushEventGTM("NotifSuscriptor", "NotifSuscriptor", "TarjetaPorVencer", "AvisoSuscriptor", 1)))
            })
        }
    }])
}
*/
function showWidgetList(c) {
    if (document.getElementById("listID") && document.getElementById("lgwid") && 0 == document.getElementById("lgwid").innerText.length) {
        var b = document.getElementById("listID").value;
        if (b) {
            var a = new XMLHttpRequest,
                d = "list_id=" + b + "&nota_id=" + c;
            a.open("POST", URL_ACTUAL + "widget/show_widget_list", !0), a.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), a.send(d), a.onload = function() {
                200 == a.status && (resp = JSON.parse(a.response)).status && (document.getElementById("lgwid").innerHTML = resp.widget, dataLayer.push({
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
function showFormWidgetSubscribe(d, b, c) {
    showloading();
    var a = new XMLHttpRequest;
    a.open("POST", URL_ACTUAL + "widget/show_widget_list_form", !0), a.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), a.send("list_id=" + c + "&nota_id=" + b), a.onload = function() {
        if (200 == a.status && (resp = JSON.parse(a.response)).status) {
            if ("object" != typeof grecaptcha) {
                var e, b, c, f;
                b = "script", (c = (e = document).createElement(b)).type = "text/java" + b, c.async = "async", c.src = "https://www.google.com/recaptcha/api.js?render=6LdM4ZQUAAAAAJxQkCG_8CujiKFD9HnnhrgIlPAn", (f = e.getElementsByTagName(b)[0]).parentNode.insertBefore(c, f)
            }
            document.getElementById(d).innerHTML = resp.widget_form, showModal(d)
        }
        hideloading()
    }
}
*/
function suscLista(a) {
    showloading(), document.getElementById("msj_errorsus").innerHTML = "";
    var b = document.getElementById(a);
    formData = new FormData(b), grecaptcha.execute("6LdM4ZQUAAAAAJxQkCG_8CujiKFD9HnnhrgIlPAn").then(function(b) {
        formData.append("token", b);
        var a = new XMLHttpRequest;
        a.open("POST", URL_ACTUAL + "widget/suscribe", !0), a.send(formData), a.onload = function() {
            200 == a.status ? (resp = JSON.parse(a.response)).status ? (document.getElementById("contNews").innerHTML = resp.html_res, closeModal("mlist"), dataLayer.push({
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

function pushEventGTM(a, b, c, d, e) {
    dataLayer.push({
        event: a,
        eventCategory: b,
        eventAction: c,
        eventLabel: d,
        eventValue: e
    })
}
if (document.addEventListener) {
    let b = document.location,
        c = b.pathname.split("/");
    var a = 0;
    c.forEach(function(b, d) {
        "nota" == b && (a = c[d + 1])
    }), a > 0 ? getGeneralDataFromArticle(a, 32) : getGeneralData()
}
/*
function agregarBanner(f, a, g) {
    if (a.height) var d = a.height;
    else var d = "250";
    if (a.width) var e = a.width;
    else var e = "250";
    a.range && a.range;
    var b = document.createElement("div");
    b.setAttribute("class", "col-12 add");
    var c = document.createElement("div");
    c.setAttribute("id", "adslot" + a.id), c.setAttribute("style", "min-height:" + d + "px; min-width:" + e + "px; text-align:left; overflow-x:hidden; justify-content:left; margin-left:auto; margin-right:auto;"), b.appendChild(c), document.getElementById(f).appendChild(b), googletag.cmd.push(function() {
        if (googletag.pubads().setCentering(!0), googletag.enableServices(), g) var b = googletag.defineSlot("/1418175/" + a.slot, [300, 250], "adslot" + a.id).addService(googletag.pubads());
        else var b = googletag.defineSlot("/1418175/" + a.slot, [
            [300, 250],
            [728, 90],
            [728, 250]
        ], "adslot" + a.id).addService(googletag.pubads());
        googletag.pubads().addEventListener("slotRenderEnded", function(a) {}), googletag.display("adslot" + a.id), googletag.pubads().refresh([b])
    })
}
*/
function bikers(b) {
    showloading();
    var c = document.getElementById(b);
    formData = new FormData(c);
    var a = new XMLHttpRequest;
    a.open("POST", URL_ACTUAL + "widget/get_bikers", !0), a.send(formData), a.onload = function() {
        200 == a.status && (resp = JSON.parse(a.response)).status && (document.getElementById("result").innerHTML = resp.view), hideloading()
    }
}
