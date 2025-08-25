/* v3.8 */
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
    s = !1,
    a = !1,
    o = !1,
    i = !1,
    r = 20;
    t.classList.contains("is-home") ? a = !0 : t.classList.contains("is-home-m") ? (o = !0, i = !0) : t.classList.contains("is-mobile") && (i = !0),
    t.classList.contains("esp") && (s = !0),
    window.addEventListener("scroll", (function () {
            var l = window.scrollY;
            if (a)
                r = 600, window.scrollY > 600 && (t.classList.add("sticky", "small"), document.body.style.paddingTop = "265px"), window.scrollY <= 600 && (t.classList.remove("sticky", "small"), document.body.style.paddingTop = "0px");
            else {
                if (o)
                    var d = 148;
                else
                    d = 1;
                //window.scrollY > d ? (t.classList.add("sticky"), i && t.classList.add("is-up"), o ? (document.body.style.paddingTop = "130px", n && (n.style.visibility = "hidden")) : i && n && (n.style.marginTop = "70px")) : (t.classList.remove("sticky"), i && t.classList.remove("is-up"), o ? (document.body.style.paddingTop = "0px", n && (n.style.visibility = "visible")) : i && n && (n.style.marginTop = "0px"))
            }
			//l > e ? (i || t.classList.remove("is-up"), s && (t.classList.add("esp"), document.querySelector("#brandHeader").src = URL_ACTUAL + "assets/2022/images/brandw.svg")) : e > l && (window.scrollY > r ? (i || t.classList.add("is-up"), s && (t.classList.remove("esp"), document.querySelector("#brandHeader").src = URL_ACTUAL + "assets/2022/images/brand.svg")) : (i || t.classList.remove("is-up"), s && (t.classList.add("esp"), document.querySelector("#brandHeader").src = URL_ACTUAL + "assets/2022/images/brandw.svg"))),
			l > e ? (i || t.classList.remove("is-up"), s && (t.classList.add("esp"), document.querySelector("#brandHeader").src = URL_ACTUAL + "assets/2022/images/brandw.svg")) : e > l && (window.scrollY > r ? (i || t.classList.add("is-up"), s && (document.querySelector("#brandHeader").src = URL_ACTUAL + "assets/2022/images/brand.svg")) : (i || t.classList.remove("is-up"), s && (t.classList.add("esp"), document.querySelector("#brandHeader").src = URL_ACTUAL + "assets/2022/images/brandw.svg"))),
            e = l <= 0 ? 0 : l
        }))
}

function share(e) {
    var t = new Object;
    t.width = 700, t.height = 435, now = new Date;
    now.getTime();
    if ("Netscape" == navigator.appName) {
        t.left = window.screenX + (window.outerWidth - t.width) / 2, t.top = window.screenY + (window.outerHeight - t.height) / 2;
        var n = "screenX=" + t.left + ",screenY=" + t.top + ",resizable=no,width=" + t.width + ",height=" + t.height + ",scrollbars=yes,menubar=no,location=no,toolbar=no,status=no,directories=no"
    } else if (document.all) {
        t.left = (screen.width - t.width) / 2, t.top = (screen.height - t.height) / 2;
        n = "left=" + t.left + ",top=" + t.top + ",resizable=no,width=" + t.width + ",height=" + t.height + ",scrollbars=yes,menubar=no,location=no,toolbar=no,status=no,directories=no"
    }
    window.open(e, "Redes", n)
}

function lazyload() {
    if ("loading" in HTMLImageElement.prototype) {
        document.querySelectorAll('img[loading="lazy"]').forEach((e => {
            e.src = e.dataset.original
        }))
    } else {
        document.querySelectorAll('img[class="lazy"]').forEach((e => {
            e.src = e.dataset.original
        }))
    }
}

function searchNow() {
    value = document.getElementById("textSearch").value.trim(), word = value.replace(/ /gi, "_"), word2 = word.replace(/\./gi, "_"), word2 = word2.toLowerCase(), window.location = URL_ACTUAL + "buscar?q=" + word2
}

function searchNowAdvanced() {
    value = document.getElementById("textSearchAdvanced").value.trim(), word = value.replace(/ /gi, "_"), word2 = word.replace(/\./gi, "_"), word2 = word2.toLowerCase(), url = URL_ACTUAL + "buscar?q=" + word2, document.getElementById("searchForm").setAttribute("action", url), document.getElementById("searchForm").submit(), showloading()
}

function getGeneralData() {
    var e = new XMLHttpRequest,
    t = "origin=" + document.location.href;
    e.open("POST", URL_ACTUAL + "ajax/getInfo", !0),
    e.setRequestHeader("Content-type", "application/x-www-form-urlencoded"),
    e.send(t),
    e.onload = function () {
        if (200 == e.status) {
            resp = JSON.parse(e.response),
            resp.status && ("" != resp.user_menu && (document.getElementById("user_menu").innerHTML = resp.user_menu), resp.is_logged ? callSignPW = setInterval((function () {
                            sendUserPW(!0, resp.user)
                        }), 500) : callSignPW = setInterval((function () {
                            sendUserPW(!1, !1)
                        }), 500), document.getElementById("user_sidebar").innerHTML = resp.user_sidebar, resp.is_subscriber && (document.getElementById("side_suscription").style.display = "none"), resp.is_logged && sendInfoMf(resp.user.id, resp.is_subscriber, resp.subscriber_resource)),
            document.getElementById("sidebar").style.display = "block";
            var t = document.querySelector("#header");
            if (t.classList.contains("is-home") || t.classList.contains("is-home-m"))
                document.querySelectorAll(".data-partido").forEach((function (e) {
                        minxmin.ajaxCall(e)
                    //})), resp.zocPromo && (document.getElementById("zocPromoCont").innerHTML = resp.zocPromo, document.getElementById("zocPromoCont").style.display = "block", pushEventGTM("WidgetList", "NotifSuscriptor", "Print", "PromoLealesHome", 1));
					}));
			/*
			if (resp.zocPromo || "undefined" != typeof anchor_slot && googletag.display(anchor_slot), resp.check_card && checkCardExpDate(), resp.show_zocalo_est) {
                var n = document.createElement("div");
                n.innerHTML = resp.show_zocalo_msj,
                document.body.appendChild(n),
                pushEventGTM("PlanEstudiantes", "Zocalo", "Print", "ExtenderPromo", 1),
                window.marfeel.cmd.push(["compass", function (e) {
                            e.setPageVar("open", "zocaloEstudiantes")
                        }
                    ])
            }
			*/
        }
    }
}

function getGeneralDataFromArticle(e, t) {
    var n = new XMLHttpRequest,
    s = "id=" + e + "&type=" + t + "&origin=" + document.location.href;
    n.open("POST", URL_ACTUAL + "ajax/getInfo", !0),
    n.setRequestHeader("Content-type", "application/x-www-form-urlencoded"),
    n.send(s),
    n.onload = function () {
        if (200 == n.status) {
            if (resp = JSON.parse(n.response), resp.status) {
                if ("" != resp.user_menu && (document.getElementById("user_menu").innerHTML = resp.user_menu), resp.is_logged ? callSignPW = setInterval((function () {
                                sendUserPW(!0, resp.user)
                            }), 500) : callSignPW = setInterval((function () {
                                sendUserPW(!1, !1)
                            //}), 500), document.getElementById("user_sidebar").innerHTML = resp.user_sidebar, resp.is_subscriber ? document.getElementById("side_suscription").style.display = "none" : document.getElementById("lgwid") && (document.getElementById("lgwid").innerHTML = resp.viewWidget), "" != resp.viewContent && (document.getElementById("articleContent").innerHTML = resp.viewContent, resp.ads_ajax && (callGtag = setInterval(displayGbanner, 1e3, resp.ads_ajax)), lazyload(), resp.show_wall && (document.getElementsByTagName("html")[0].style = "overflow: hidden", document.getElementById("dilogComments").remove(), document.getElementById("articleAudio") && document.getElementById("articleAudio").remove()), resp.call_tiktok)) {
                            }), 500), document.getElementById("user_sidebar").innerHTML = resp.user_sidebar, resp.is_subscriber ? document.getElementById("side_suscription").style.display = "none" : document.getElementById("lgwid") && (document.getElementById("lgwid").innerHTML = resp.viewWidget), "" != resp.viewContent) {
					const e = document.createElement("script");
                    e.src = "https://www.tiktok.com/embed.js",
                    e.async = !0,
                    document.body.appendChild(e)
                }
                if (resp.share)
                    document.querySelectorAll("span.js-share-count").forEach((function (e) {
                            e.innerHTML = resp.share
                        }));
                else
                    document.getElementById("j-ishare") && (document.getElementById("j-ishare").innerHTML = "");
                if (resp.totalComments)
                    if (resp.totalComments > 0)
                        document.querySelectorAll("span.js-comment-count").forEach((function (e) {
                                e.innerHTML = resp.totalComments
                            }));
                    else
                        document.getElementById("iCommentsUp").remove(), document.getElementById("iCommentsDown").remove();
                else
                    document.querySelectorAll("span.js-comment-count").forEach((function (e) {
                            e.innerHTML = ""
                        }));
                showWidgetList(e)
            }
            document.getElementById("sidebar").style.display = "block"
        }
    }
}

/*
function displayGbanner(e) {
    if (googletag) {
        var t = e;
        Array.isArray(t) && t.forEach((function (e, t, n) {
                "" != e && (googletag.display(e), console.log(e + " cargado."))
            })),
        clearInterval(callGtag)
    }
}
*/

function close(e) {
    showloading();
    var t = new XMLHttpRequest;
    t.open("POST", URL_ACTUAL + "usuarios/logout/" + e, !0), t.send(), t.onload = function() {
        200 == t.status && (resp = JSON.parse(t.response), resp.status && (callSignPW = setInterval((function() {
            sendUserPW(!1, !1)
        }), 500), window.location = resp.back_url))
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

/*
function sendOnesignal(e, t, n, s, a) {
    var o = window.OneSignal || [];
    o.push((function () {
            o.init({
                appId: n,
                promptOptions: {
                    actionMessage: s,
                    acceptButtonText: "Acepto",
                    cancelButtonText: "No me interesa"
                }
            }),
            a && o.getUserId().then((function (e) {
                    if (e) {
                        var t = new XMLHttpRequest,
                        n = "token=" + e;
                        t.open("POST", URL_ACTUAL + "ajax/send_token", !0),
                        t.setRequestHeader("Content-type", "application/x-www-form-urlencoded"),
                        t.send(n),
                        t.onload = function () {
                            t.status
                        }
                    }
                })),
            o.setExternalUserId(e),
            t && o.sendTag("suscripto", "si").then((function (e) {}))
        }))
}
*/

function sendShareCl(e, t) {
    var n = new XMLHttpRequest,
        s = "objeto_id=" + e + "&type=" + t;
    n.open("POST", URL_ACTUAL + "redes/shareTwWh", !0), n.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), n.send(s), n.onload = function() {
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

document.getElementById("textSearch").addEventListener("keyup", (function(e) {
    13 == (e.keyCode || e.which) && searchNow()
}));
var minxmin = {
    intervalos: {},
    getTime: function(e) {
        new Date;
        var t = new Date(e).getTime(),
            n = (new Date).getTime() - t,
            s = parseInt(n / 1e3 / 60 / 60),
            a = parseInt(n / 1e3 / 60 - 60 * s),
            o = parseInt(n / 1e3 - 60 * s * 60 - 60 * a);
        return s > 0 ? (s > 9 ? s : "0" + s) + ":" + (a > 9 ? a : "0" + a) + ":" + (o > 9 ? o : "0" + o) : (a > 9 ? a : "0" + a) + ":" + (o > 9 ? o : "0" + o)
    },
    showTimer: function(e, t) {
        var n = e.dataset.fecha_estado;
        t.innerHTML = this.getTime(n)
    },
    getMatchData: function(e, t) {
        var n = new XMLHttpRequest;
        n.open("GET", URL_ACTUAL + "partidos/mam_minuto/" + e, !0), n.onload = function() {
            200 == n.status && (resp = JSON.parse(n.response), t(resp))
        }, n.send()
    },
    iniciarReloj: function(e, t, n) {
        minxmin.intervalos["reloj_" + t] || (minxmin.intervalos["reloj_" + t] = setInterval((function() {
            minxmin.showTimer(e, n)
        }), 1e3))
    },
    stop: function(e) {
        minxmin.intervalos["reloj_" + e] && clearInterval(minxmin.intervalos["reloj_" + e])
    },
    startInterval: function(e, t, n, s) {
        var a = this;
        minxmin.intervalos[e + n] = setInterval((function() {
            a.getMatchData(n, s)
        }), 1e3 * t)
    },
    ajaxCall: function(e) {
        var t = e.dataset.id_partido,
            n = (e.dataset.estado, e.dataset.check),
            s = e.getElementsByClassName("js-reloj-mam")[0],
            a = e.getElementsByClassName("js-hora")[0],
            o = s.dataset.uniq,
            i = e.getElementsByClassName("js-descripcion-estado")[0];
        if (e.getElementsByClassName("js-marquee")) var r = e.getElementsByClassName("js-marquee")[0];
        else r = !1;
        var l = e.getElementsByClassName("js-local-name")[0],
            d = e.getElementsByClassName("js-visit-name")[0],
            c = e.getElementsByClassName("js-local-shield")[0],
            m = e.getElementsByClassName("js-visit-shield")[0],
            u = e.getElementsByClassName("js-score")[0],
            p = this,
            g = function(e) {
                switch (l.innerHTML = e.local_abbr, d.innerHTML = e.visita_abbr, c.setAttribute("src", e.escudo_local), m.setAttribute("src", e.escudo_visita), e.gol_penal_local ? u.innerHTML = '<span style="font-size:10px;">(' + e.gol_penal_local + ")</span>" + e.gol_local + " . " + e.gol_visita + '<span style="font-size:10px;">(' + e.gol_penal_visita + ")</span>" : u.innerHTML = e.gol_local + " . " + e.gol_visita, s.dataset.fecha_estado = e.fecha_inicio_estado, parseInt(e.mam_estado)) {
                    case 0:
                        a.innerHTML = e.fecha_corta + " " + e.hora_inicio + " hrs", i.innerHTML = "", r && (r.innerHTML = "");
                        break;
                    case 1:
                        minxmin.iniciarReloj(s, o, a), i.innerHTML = "PT", r && (r.innerHTML = e.incidencias);
                        break;
                    case 2:
                        minxmin.stop(o), e.fecha_corta ? a.innerHTML = e.fecha_corta : a.innerHTML = "Fin", i.innerHTML = "", r && (r.innerHTML = e.incidencias);
                        break;
                    case 3:
                        minxmin.stop(o), a.innerHTML = "Susp", i.innerHTML = "", r && (r.innerHTML = e.incidencias);
                        break;
                    case 4:
                        minxmin.stop(o), a.innerHTML = "Post", i.innerHTML = "";
                        break;
                    case 5:
                    case 9:
                        minxmin.stop(o), a.innerHTML = "ET", i.innerHTML = "", r && (r.innerHTML = e.incidencias);
                        break;
                    case 6:
                        minxmin.iniciarReloj(s, o, a), i.innerHTML = "ST", r && (r.innerHTML = e.incidencias);
                        break;
                    case 7:
                        minxmin.stop(o), a.innerHTML = "Alar", i.innerHTML = "", r && (r.innerHTML = e.incidencias);
                        break;
                    case 8:
                        minxmin.iniciarReloj(s, o, a), i.innerHTML = "PTA", r && (r.innerHTML = e.incidencias);
                        break;
                    case 10:
                        minxmin.iniciarReloj(s, o, a), i.innerHTML = "STA", r && (r.innerHTML = e.incidencias);
                        break;
                    case 11:
                        minxmin.stop(o), a.innerHTML = "Fin", i.innerHTML = "", r && (r.innerHTML = e.incidencias);
                        break;
                    case 12:
                        minxmin.stop(o), a.innerHTML = "Pen", i.innerHTML = "", r && (r.innerHTML = e.incidencias), minxmin.intervalos["penales_partido_" + t] || (clearInterval(minxmin.intervalos["partido_" + t]), p.startInterval("penales_partido_", 10, t, g))
                }
            };
        this.getMatchData(t, g), 1 == n && this.startInterval("partido_", 60, t, g)
    },
    ajaxCallCards: function(e) {
        var t = e.dataset.pid,
            n = e.getElementsByClassName("js-nombre-local")[0],
            s = e.getElementsByClassName("js-nombre-visita")[0],
            a = e.getElementsByClassName("js-escudo-local")[0],
            o = e.getElementsByClassName("js-escudo-visita")[0],
            i = e.getElementsByClassName("js-resultado")[0];
        this.getMatchData(t, (function(e) {
            if (e.local_abbr) switch (n.innerHTML = e.local_abbr, s.innerHTML = e.visita_abbr, a.setAttribute("src", e.escudo_local), o.setAttribute("src", e.escudo_visita), parseInt(e.mam_estado)) {
                case 2:
                    e.gol_penal_local || e.gol_penal_visita ? i.innerHTML = "<span>(" + e.gol_penal_local + ")<span> " + e.gol_local + " . " + e.gol_visita + " <span>(" + e.gol_penal_visita + ")</span>" : i.innerHTML = e.gol_local + " . " + e.gol_visita;
                    break;
                case 12:
                    i.innerHTML = "<span>(" + e.gol_penal_local + ")<span> " + e.gol_local + " . " + e.gol_visita + " <span>(" + e.gol_penal_visita + ")</span>";
                    break;
                default:
                    i.innerHTML = e.gol_local + " . " + e.gol_visita
            }
        }))
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
    const t = document.getElementById(e),
    n = document.getElementById("modal-close"),
    s = document.querySelector(".body-blackout");
    var a = window.scrollY,
    o = !1;
    (header.classList.contains("is-home-m") || header.classList.contains("is-mobile")) && (o = !0);
    var i = a + 350;
    t.style.cssText = "mshare" == e && o || "mlist" == e && o ? "" : "top: " + i + "px",
    t.classList.add("is--visible"),
    s.classList.add("is-blacked-out"),
    document.getElementsByTagName("html")[0].style.overflow = "hidden",
    n.addEventListener("click", (() => {
            t.classList.remove("is--visible"),
            s.classList.remove("is-blacked-out"),
            document.getElementsByTagName("html")[0].style.overflow = "auto",
            document.getElementById("modal-content").innerHTML = ""
        })),
    s.addEventListener("click", (() => {
            t.classList.remove("is--visible"),
            s.classList.remove("is-blacked-out"),
            document.getElementsByTagName("html")[0].style.overflow = "auto",
            document.getElementById("modal-content").innerHTML = ""
        }))
}
function closeModal(e) {
    const t = document.getElementById(e),
    n = document.querySelector(".body-blackout");
    t.classList.remove("is--visible"),
    n.classList.remove("is-blacked-out"),
    document.getElementsByTagName("html")[0].style.overflow = "auto",
    document.getElementById("modal-content").innerHTML = ""
}
function checkCardExpDate() {
    paywall.queue.push(["invoke", "viewSubscriptionData", function (e) {
                if (e && e.is_active && e.card && e.card.expiration_date) {
                    var t = new Date,
                    n = new Date,
                    s = new Date(n.setMonth(n.getMonth() + 15)),
                    a = new Date(e.card.expiration_date),
                    o = e.failed_payments,
                    i = e.resource.price;
                    if ((a <= s || a < t || o > 1) && i > 0) {
                        var r = a.getFullYear() + "-" + (a.getMonth() + 1) + "-" + a.getDate(),
                        l = new XMLHttpRequest;
                        params = "fallidos=" + o + "&expira=" + r + "&subscription_user_id=" + e.subscriber.user_id,
                        l.open("POST", URL_ACTUAL + "ajax/notif_susc", !0),
                        l.setRequestHeader("Content-type", "application/x-www-form-urlencoded"),
                        l.send(params),
                        l.onload = function () {
                            if (200 == l.status && (resp = JSON.parse(l.response), resp.status)) {
                                var e = document.createElement("div");
                                e.innerHTML = resp.html_zocalo,
                                document.body.appendChild(e),
                                pushEventGTM("NotifSuscriptor", "NotifSuscriptor", resp.evento, "AvisoSuscriptor", 1),
                                console.log(resp.evento)
                            }
                        }
                    }
                }
            }
        ])
}
*/

function showWidgetList(e) {
    if (document.getElementById("listID") && document.getElementById("lgwid") && 0 == document.getElementById("lgwid").innerText.length) {
        var t = document.getElementById("listID").value;
        if (t) {
            var n = new XMLHttpRequest,
                s = "list_id=" + t + "&nota_id=" + e;
            n.open("POST", URL_ACTUAL + "widget/show_widget_list", !0), n.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), n.send(s), n.onload = function() {
                200 == n.status && (resp = JSON.parse(n.response), resp.status && (document.getElementById("lgwid").innerHTML = resp.widget, dataLayer.push({
                    event: "WidgetList",
                    eventCategory: "WidgetList",
                    eventAction: resp.eventAction,
                    eventLabel: resp.eventLabel,
                    eventValue: 1
                })))
            }
        }
    }
}

/*
function showFormWidgetSubscribe(e, t, n) {
    showloading();
    var s = new XMLHttpRequest,
    a = "list_id=" + n + "&nota_id=" + t;
    s.open("POST", URL_ACTUAL + "widget/show_widget_list_form", !0),
    s.setRequestHeader("Content-type", "application/x-www-form-urlencoded"),
    s.send(a),
    s.onload = function () {
        var t,
        n,
        a,
        o;
        200 == s.status && (resp = JSON.parse(s.response), resp.status && ("object" != typeof grecaptcha && (t = document, n = "script", (a = t.createElement(n)).type = "text/java" + n, a.async = "async", a.src = "https://www.google.com/recaptcha/api.js?render=6LdM4ZQUAAAAAJxQkCG_8CujiKFD9HnnhrgIlPAn", (o = t.getElementsByTagName(n)[0]).parentNode.insertBefore(a, o)), document.getElementById(e).innerHTML = resp.widget_form, showModal(e))),
        hideloading()
    }
}
*/

function suscLista(e) {
    showloading(), document.getElementById("msj_errorsus").innerHTML = "";
    var t = document.getElementById(e);
    formData = new FormData(t), grecaptcha.execute("6LdM4ZQUAAAAAJxQkCG_8CujiKFD9HnnhrgIlPAn").then((function(e) {
        formData.append("token", e);
        var t = new XMLHttpRequest;
        t.open("POST", URL_ACTUAL + "widget/suscribe", !0), t.send(formData), t.onload = function() {
            200 == t.status ? (resp = JSON.parse(t.response), resp.status ? (document.getElementById("contNews").innerHTML = resp.html_res, closeModal("mlist"), dataLayer.push({
                event: "WidgetList",
                eventCategory: "WidgetList",
                eventAction: resp.eventAction,
                eventLabel: resp.eventLabel,
                eventValue: 1
            })) : document.getElementById("msj_errorsus").innerHTML = resp.msj) : document.getElementById("msj_errorsus").innerHTML = "Se produjo un error inesperado. Intentelo nuevamente.", hideloading()
        }
    })).catch((function() {
        hideloading(), document.getElementById("msj_errorsus").innerHTML = "Se produjo un error inesperado. Intentelo nuevamente."
    }))
}

/*
function pushEventGTM(e, t, n, s, a) {
    dataLayer.push({
        event: e,
        eventCategory: t,
        eventAction: n,
        eventLabel: s,
        eventValue: a
    })
}
*/

if (document.addEventListener) {
    const e = document.location.pathname.split("/");
    var lgid = 0;
    e.forEach((function(t, n) {
        "nota" == t && (lgid = e[n + 1])
    })), lgid > 0 ? getGeneralDataFromArticle(lgid, 32) : getGeneralData()
}

/* og
function agregarBanner(e, t, n) {
    if (t.height)
        var s = t.height;
    else
        s = "250";
    if (t.width)
        var a = t.width;
    else
        a = "250";
    if (t.range)
        t.range;
    else ;
    var o = document.createElement("div");
    o.setAttribute("class", "col-12 add");
    var i = document.createElement("div");
    i.setAttribute("id", "adslot" + t.id),
    i.setAttribute("style", "min-height:" + s + "px; min-width:" + a + "px; text-align:left; overflow-x:hidden; justify-content:left; margin-left:auto; margin-right:auto;"),
    o.appendChild(i),
    document.getElementById(e).appendChild(o),
    googletag.cmd.push((function () {
            if (googletag.pubads().setCentering(!0), googletag.enableServices(), n)
                var e = googletag.defineSlot("/1418175/" + t.slot, [300, 250], "adslot" + t.id).addService(googletag.pubads());
            else
                e = googletag.defineSlot("/1418175/" + t.slot, [[300, 250], [728, 90], [728, 250]], "adslot" + t.id).addService(googletag.pubads());
            googletag.pubads().addEventListener("slotRenderEnded", (function (e) {})),
            googletag.display("adslot" + t.id),
            googletag.pubads().refresh([e])
        }))
}
*/

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
        200 == n.status && (resp = JSON.parse(n.response), resp.status && (document.getElementById("result").innerHTML = resp.view)), hideloading()
    }
}

/* new from 2.3/4 to 3.7 - not useful
function sendInfoMf(e, t, n) {
    readSess("lg_mf_" + e) || window.marfeel.cmd.push(["compass", function (s) {
                s.setSiteUserId(e),
                t ? "PRESUN" == n ? s.setUserType(4) : s.setUserType(3) : s.setUserType(2),
                setSess("lg_mf_" + e, 1, 60, ".lagaceta.com.ar")
            }
        ])
}
function setSess(e, t, n, s) {
    if ("https:" == document.location.protocol)
        var a = "; sameSite=None; secure";
    else
        a = "";
    var o = new Date;
    o.setTime(o.getTime() + 24 * n * 60 * 60 * 1e3);
    var i = "expires=" + o.toGMTString();
    document.cookie = e + "=" + t + "; " + i + "; path=/; domain=" + s + a
}
function readSess(e) {
    for (var t = e + "=", n = document.cookie.split(";"), s = 0; s < n.length; s++) {
        for (var a = n[s]; " " == a.charAt(0); )
            a = a.substring(1, a.length);
        if (0 == a.indexOf(t))
            return a.substring(t.length, a.length)
    }
    return null
}
function hideZocalo() {
    (document.getElementById("gpt_unit_/1418175/LGT_Zocalo_Google_0") || document.getElementById("gpt_unit_/1418175/LGTM_Zocalo_Google_0")) && (googletag.destroySlots([anchor_slot]), clearInterval(callHideZocalo))
}
*/

function elecciones2023() {
    showloading();
    var e = document.getElementById("municipio"),
        t = new XMLHttpRequest,
        n = "municipio_id=" + e.value;
    t.open("POST", URL_ACTUAL + "widget/elecc2023_int", !0), t.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), t.send(n), t.onload = function() {
        200 == t.status && (resp = JSON.parse(t.response), resp.status && (document.getElementById("cont_int").innerHTML = resp.view)), hideloading()
    }
}

function elecciones2023_paso(e) {
    showloading();
    var t = new XMLHttpRequest,
        n = "categoria_id=" + e;
    t.open("POST", URL_ACTUAL + "widget/elecc2023_paso", !0), t.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), t.send(n), t.onload = function() {
        200 == t.status && (resp = JSON.parse(t.response), resp.status && (document.getElementById("res_partidos").innerHTML = resp.view, 1 == e ? (document.getElementById("cat_2").classList.remove("active"), document.getElementById("cat_1").classList.add("active")) : (document.getElementById("cat_1").classList.remove("active"), document.getElementById("cat_2").classList.add("active")))), hideloading()
    }
}

function elecciones2023_grales(e, t, n) {
    showloading();
    var s = new XMLHttpRequest,
        a = "categoria_id=" + e + "&distrito_id=" + t + "&tipo=" + n;
    s.open("POST", URL_ACTUAL + "widget/elecc2023_gral", !0), s.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), s.send(a), s.onload = function() {
        200 == s.status && (resp = JSON.parse(s.response), resp.status && (document.getElementById(resp.content_id).innerHTML = resp.view)), hideloading()
    }
}
