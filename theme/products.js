(function(meta) {
    "use strict";
    if (/android 5\.0\.2|iphone;|ipod;/i.test(navigator.userAgent)) {
        var resizeHandler = function() {
            window.setTimeout(function() {
                document.body.style.display = 'none';
                document.body.offsetWidth;
                document.body.style.display = '';
            }, 350);
        };
        window.addEventListener('orientationchange', resizeHandler);
    }
    // test requirement and neccessary prerequisite
    if (!/\bno-flex\b/.test(document.body.className) || !('matchMedia' in window)) { return; }
    var regex = /width=[^,]+(,?\s*)/,
        breakpoints = "980, 660, 340".split(', '),
    setViewport = function(width, bodyWidth) {
        width || (width = 'device-width');
        var content = meta.getAttribute('content');
        if (!regex.test(content)) {
            content = 'width=' + width + ', ' + content;
        } else {
            regex.lastIndex = 0;
            content = content.replace(regex, 'width=' + width + RegExp.$1);
        }
        if (bodyWidth) {
            content = content.replace(/initial-scale=[\d\.]+/, 'initial-scale=' + (bodyWidth / width).toFixed(2));
        }
        meta.setAttribute('content', content);
    },
    // true = device-width is set, false/undefined = other width, 1 = other width, don't resize!
    viewportDefault = /width=device-width/.test(meta.getAttribute('content')),
    viewportTimeout,
    viewportHandler = function() {
        if (viewportDefault === 1) { return; }
        if (!viewportDefault) {
            setViewport();
            viewportDefault = true;
            window.clearTimeout(viewportTimeout);
            viewportTimeout = window.setTimeout(viewportHandler, 150);
            return;
        }
        for (var width = document.body.offsetWidth, b = 0, l = breakpoints.length; b < l; b++) {
            // Fix for Samsung Galaxy Tab 3 with Android 4.4.2  - (/4\.4\.2.*?SM-T310\D/.test(navigator.userAgent) ? 60 : 0) - leads to zoomed effect
            if (width >= breakpoints[b] || b === breakpoints.length - 1) {
                setViewport(breakpoints[b], document.body.offsetWidth);
                // block resize for 150ms
                viewportDefault = 1;
                window.clearTimeout(viewportTimeout);
                window.setTimeout(function() { viewportDefault = false; }, 150);
                break;
            }
        }
    },
    resizeTimeout,
    abordResize = false,
    resizeHandler = function() {
        if (viewportDefault || abordResize) { return; }
        window.clearTimeout(resizeTimeout);
        resizeTimeout = window.setTimeout(viewportHandler, 150);
    },
    lastFocus = document,
    touchHandler = function(ev) {
        if (/input|textarea|select|label/i.test(ev.target.nodeName) || /input|textarea|select|label/i.test(lastFocus.nodeName)) {
            abordResize = true;
            lastFocus = ev.target;
        }
    };

    viewportHandler();
    window.addEventListener('resize', resizeHandler);
    window.addEventListener('orientationchange', function() { abordResize = false; resizeHandler(); });
    document.addEventListener('touchstart', touchHandler);
})(document.getElementsByName('viewport')[0]);


/**
 * Polyfill
 */
// Element.matches
if (!Element.prototype.matches) {
    Element.prototype.matches =
        Element.prototype.matchesSelector ||
        Element.prototype.mozMatchesSelector ||
        Element.prototype.msMatchesSelector ||
        Element.prototype.oMatchesSelector ||
        Element.prototype.webkitMatchesSelector ||
        function(s) {
            var matches = (this.document || this.ownerDocument).querySelectorAll(s),
                i = matches.length;
            while (--i >= 0 && matches.item(i) !== this) {}
            return i > -1;
        };
}

// Nodelist.forEach
if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = function (callback, thisArg) {
        thisArg = thisArg || window;
        for (var i = 0; i < this.length; i++) {
            callback.call(thisArg, this[i], i, this);
        }
    };
}

// Node.scrollIntoView()
if (!Element.prototype.scrollIntoView || /(edge)/i.test(navigator.userAgent)) {
    var getOffset = function (element) {
        element = element.getBoundingClientRect();
        return {
            left: element.left + window.pageXOffset,
            top: element.top + window.pageYOffset
        }
    },
    pollyfillScroll = function (startEl, endEl, position) {
        var startPos = getOffset(startEl).top - startEl.getBoundingClientRect().top,
            endPos = getOffset(endEl).top,
            step = startPos > endPos ? -30 : 30,
            intervalPos = 0,
            intervalPosTmp = 0,
            space = window.innerHeight/2,
            int = setInterval(function () {
                window.scrollTo(0, startPos);
                startPos += step;
                intervalPos = endEl.getBoundingClientRect().top;
                if ((step > 0 && intervalPos < step) || (step < 0 && intervalPos > -step) || (intervalPos === intervalPosTmp)) {
                    clearInterval(int);
                } else {
                    intervalPosTmp = endEl.getBoundingClientRect().top;
                }
            }, 10);
    };
}

// get closest element
if (window.Element && !Element.prototype.closest) {
    Element.prototype.closest =
    function(s) {
        var matches = (this.document || this.ownerDocument).querySelectorAll(s),
            i,
            el = this;
        do {
            i = matches.length;
            while (--i >= 0 && matches.item(i) !== el) {};
        } while ((i < 0) && (el = el.parentElement));
        return el;
    };
}

/**
 * Smooth scroll: scroll to inner anchor smoothly
 *
 * Specialized:
 * - #SELF: if the URL is exactly '#SELF', page will be scrolled on top of itself
 * - data-prevent-scroll="true": if link element has this attribute, scroll will be stopped
 */
(function () {
    var smoothScrollHandler = function (ev) {
            if (!ev || !ev.target || ev.target.hasAttribute('data-show-window') || !((/^a$/i.test(ev.target.nodeName) || (ev.target.parentElement != null && /^a$/i.test(ev.target.parentElement.nodeName))) && (ev.target.hash || ev.target.parentElement.hash) && (/^#/.test(ev.target.hash) || (ev.target.parentElement != null && /^#/.test(ev.target.parentElement.hash))))) { return; }
            var target = ev.target.hash ? ev.target : ev.target.parentElement,
            anchor = /^#SELF$/.test(target.hash) ? target : document.getElementById(target.hash.substr(1));
            if (!anchor || target.getAttribute('data-prevent-scroll') == 'true') { return; }
            ev.preventDefault();
            if (/(\.net|edge)/i.test(navigator.userAgent)) {
                pollyfillScroll(target, anchor);
            } else {
                anchor.scrollIntoView({behavior: "smooth", block: "start"});
            }
        };
    document.addEventListener('click', smoothScrollHandler);
})();/* Default-Funktion von aria-disabled-Buttons verhindern (Fehler in Android) */
(function(){
    // TODO: check if this is still relevant or is it fixed in current Android versions (very old code here)
	var buttonHandler = function(ev) {
		ev = ev || window.event;
		var button = ev.target || ev.srcElement;
		if (!button) { return; }
		if (ev.type === 'keyup' && ev.keyCode !== 13) { return; }
		if (button.getAttribute && button.getAttribute('aria-disabled')) {
			if (typeof ev.preventDefault === 'function') {
				ev.preventDefault();
			} else {
				return false;
			}
		}
	}
    if (!document.addEventListener) {
        document.attachEvent('onclick', buttonHandler);
        document.attachEvent('onkeyup', buttonHandler);
    } else {
        document.addEventListener('click', buttonHandler);
        document.addEventListener('keyup', buttonHandler);
    }
})();
/* Text for the app buttons is fix, same for all pages, that is why we extracted it in the following function, here in the button module. */
/* Primary motivation for this is integration of cat components in CMS (Hippo). This way it is possible to have a single configurable element for all buttons. */
/* See https://mam-confluence.1and1.com/x/7_HjB for further details. */
(function () {
    var addTextToAppStoreButtons = function() {
        var BUTTON_TEXT = {
                "de": {
                    "apple": "Laden im App Store",
                    "google": "Jetzt bei Google Play" ,
                    "windows": "Herunterladen von Microsoft"
                },
                "en": {
                    "apple": "Download on the App Store",
                    "google": "Get it on Google Play" ,
                    "windows": "Get it from Microsoft"
                },
                "es": {
                    "apple": "Consíguelo en el App Store",
                    "google": "Disponible en Google Play" ,
                    "windows": "Consíguelo de Microsoft"
                },
                "fr": {
                    "apple": "Télécharger dans l'App Store",
                    "google": "Disponible sur Google Play" ,
                    "windows": "Obtenir sur Microsoft"
                }
            }[/(de|en|fr|es)/.test(document.documentElement.getAttribute('lang')) ? RegExp.$1 : 'de'],
            appButtons = document.getElementsByClassName('button app store') || [];

            if ( appButtons.length < 1 ) { return; }

            for ( var i = 0; i < appButtons.length; i++ ) {
                if ( appButtons[i].className.indexOf('apple') > -1 ) {
                    appButtons[i].innerHTML =  BUTTON_TEXT['apple'];
                }
                if ( appButtons[i].className.indexOf('google') > -1 ) {
                    appButtons[i].innerHTML =  BUTTON_TEXT['google'];
                }
                if ( appButtons[i].className.indexOf('windows') > -1 ) {
                    appButtons[i].innerHTML =  BUTTON_TEXT['windows'];
                }
            }
        }
        document.addEventListener('DOMContentLoaded', addTextToAppStoreButtons);
})();
if (/no-svg/.test(document.querySelector('body').className)) {
    var imgs = document.querySelectorAll('img[src$=".svg"]');
    for (var i = 0, len = imgs.length; i < len; i++) {
        imgs[i].src = imgs[i].src.replace(/\.svg$/, '.png');
    }
}
(function(){
    var popupOptions = 'left top height width menubar toolbar location status dependent dialog minimizable resizable scrollbars',
    linkHandler = function(ev) {
        ev = ev || window.event;
        if (ev.type == 'keypress' && ev.keyCode !== 13) { return; }     
        var node = ev.target || ev.srcElement,
            data, opts = {};        
        if (!node) { return; }
        while (node && (!node.getAttribute || !(data = node.getAttribute('data-popup')))) {
            node = node.parentNode;
        }
        if (!data) { return; }
        data.replace(/([^=,]+)=?([^,]*),\s*/g, function(_, key, value) { 
            opts[key] = /^\d+$/.test(value) ? +value : value || true;
        });
        if (opts.center) {
            opts.top = (((window.innerHeight || document.documentElement.clientHeight || screen.height) - opts.height) >> 1) + (window.screenTop || screen.top);
            opts.left = (((window.innerWidth || document.documentElement.clientWidth || screen.width) - opts.width) >> 1) + (window.screenLeft || screen.left);
        }
        if (!window.open(opts.href || node.href, opts.target || 'popup'+0|Math.random()*1E6, popupOptions.replace(/(\w+) ?/g, function(_, key) {
            if (opts[key]) { return key + '=' + opts[key] + ','; }
            return '';
        }).replace(/,$/, ''))) { return; }
        typeof ev.preventDefault === 'function' && ev.preventDefault();
        return false;
    };
    if (!document.addEventListener) {
        document.attachEvent('onclick', linkHandler);
        window.attachEvent('onkeypress', linkHandler);
    } else {
        document.addEventListener('click', linkHandler);
        window.addEventListener('keypress', linkHandler);
    }
})();(function() {
    var touch = false,
    clickHandler = function(ev) {
        ev = ev || window.event;
        ev.target || (ev.target = ev.srcElement);
        if (!ev || !ev.target || !ev.target.getAttribute) { return; }

        if (ev.type === 'keypress' && (ev.which || ev.keyCode) != 13) { return; }
        if (ev.type === 'click' && (ev.which || ev.keyCode) > 1) { return; }
        if (ev.type === 'touchstart') {
            touch = true;
            return;
        }
        if (ev.type === 'touchmove') {
            touch = false;
            return;
        }
        if (ev.type === 'touchend') {
            if (!touch) { return; }
            touch = false;
        }

        var items = ['hide', 'toggle', 'show', 'set', 'unset'],
            node,
            selector,
            any;

        for (var i = 0, item; item = items[i]; i++) {
            selector = false;
            node = ev.target;

            while (node && node.getAttribute && !selector) {
                (selector = node.getAttribute('data-' + item + '-nodes')) || (node = node.parentNode);
            }
            /* alternative attribute value with same behavior but with cursor pointer: #empty-withpointer */
            if (!selector || selector === '#empty') { continue; }

            var parquery = node.getAttribute('data-' + item + '-parent') || node.getAttribute('data-nodes-parent'),
                parent = document;
            if (parquery) {
                var parents = document.querySelectorAll(parquery),
                    parent = node;
                findparent: while (parent) {
                    for (var p = parents.length; p >= 0; p--) {
                        if (parents[p] === parent) { break findparent; }
                    }
                    parent = parent.parentNode;
                }
            }

            selector.replace(/([^,\{]+)(?:\{(.*?)\}|)/g, function(full, query, name) {
                query = parent.querySelectorAll(query);
                name = name || 'hidden';
                any = any || 'href' in node;
                var re = new RegExp('(^|\\s)' + name + '(\\s|$)', 'g');

                for (var q = 0, l = query.length; q < l; q++) {
                    var cls = query[q].className.replace(re, '$2');
                    query[q].className = cls + ((item === 'hide' || item === 'set' || (item === 'toggle' && query[q].className === cls)) ? ' ' + name : '');
                    if ((query[q].hasAttribute('data-load-always') || query[q].offsetHeight) && query[q].getAttribute('data-load-url')) {
                        if (typeof document.createEvent === 'function') {
                            var load = document.createEvent('CustomEvent');
                            load.initCustomEvent('lazyload', true, true, null);
                            query[q].dispatchEvent(load);
                        } else {
                            typeof document.onlazyload === 'function' && document.onlazyload({ target: query[q] });
                        }
                    }
                    // fix reflow/redraw problem in "noflex" clients by applied DOM force
                    if (/(^|\s)no-flex\b/.test(document.body.className) && !/input|select|textarea/i.test(ev.target)) {
                        var text = document.createTextNode('');
                        if (!/input|select|textarea/i.test(node)) {
                            node.parentNode.replaceChild(text, node);
                            text.parentNode.replaceChild(node, text);
                        }
                        if (!/input|select|textarea/i.test(query[q])) {
                            query[q].parentNode.replaceChild(text, query[q]);
                            text.parentNode.replaceChild(query[q], text);
                        }
                    }
                }
            });
        }

        if (any && (ev.type === 'touchend' || ev.type === 'click')) {
            ev.preventDefault && ev.preventDefault();
        }
    }
    if (!document.addEventListener) {
        document.attachEvent('onclick', clickHandler);
        document.attachEvent('onkeypress', clickHandler);
    } else {
        document.addEventListener('keypress', clickHandler);
        if (/ip[ao]d|iphone/i.test(navigator.userAgent)) {
            document.addEventListener('touchstart', clickHandler);
            document.addEventListener('touchmove', clickHandler);
            document.addEventListener('touchend', clickHandler);
        } else {
            document.addEventListener('click', clickHandler);
        }
    }
})();
(function() {
    var click = false,
    seoLinkHandler = function(ev) {
        if (ev.type === 'touchstart' || ev.type === 'mousedown') {
            click = true;
            return;
        }
        if (ev.type === 'touchmove' || ev.type === 'mousemove') {
            click = false;
            return;
        }
        if (ev.type === 'touchend' || ev.type === 'mouseup') {
            if (!click) { return; }
            click = false;
        }

        var key = ev.which || ev.key || 0,
            node = ev.target,
            teaser = node,
            url;
        // we need to check if a href attribute is present, because IE aliases img.src to href
        if (!node || (node.hasAttribute && node.hasAttribute('href')) || node.form || key > 2) { return; }
        while (teaser && !/\b(?=.*linked)\b(?=.*teaser)\b/.test(teaser.className || '')) {
            !url && (url = url || (teaser.hasAttribute && teaser.hasAttribute('href') && teaser.getAttribute('href'))
                || teaser.getAttribute && teaser.getAttribute('data-link-url')) && (node = teaser);
            teaser = teaser.parentNode;
        }
        if (!teaser) { return; }
        if (!url) {
            node = teaser.getAttribute && teaser.getAttribute('data-link-url') ? teaser
                : teaser.querySelector('[data-link-url], a'); //Reihenfolge der Linkpriorität kann noch angepasst werden
            url = node && (node.getAttribute && node.getAttribute('data-link-url') || node.href);
        }
        if (!url) { return; }
        if ('dispatchEvent' in node) {
            var clickEvent = document.createEvent('MouseEvent');
            clickEvent.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, node);
            if (!node.dispatchEvent(clickEvent)) { return; }
        } else {
            node.click();
        }
        if ('href' in node) { return; }
        // if data-link-url is an attribute of the linked hero-teaser, simulate the click action
        window.open(url, ev.ctrlKey || key == 2 ? '_blank' : '_self');
    };
    document.addEventListener('mousedown', seoLinkHandler);
    document.addEventListener('mousemove', seoLinkHandler);
    document.addEventListener('mouseup', seoLinkHandler);
    document.addEventListener('touchstart', seoLinkHandler);
    document.addEventListener('touchmove', seoLinkHandler);
    document.addEventListener('touchend', seoLinkHandler);
})();
(function(undef){
    var nativeSupport = 'open' in document.createElement('details'),
    akkordeonToggle = function(akkordeon, status) {
        var autoToggle = (status === undef),
            initialStatus = !!(akkordeon.getAttribute('open') || /(^|\s)open\b/.test(akkordeon.className));

        if (autoToggle) {
            status = !initialStatus;
        }

        // android 4.1-3 touts native support that doesn't work correctly
        if (!/details/i.test(akkordeon.nodeName) || !nativeSupport || /android 4\.[1-3]/i.test(navigator.userAgent)) {
            akkordeon[status ? 'setAttribute' : 'removeAttribute']('open', true);
            akkordeon.className = akkordeon.className.replace(/(^|\s)open(\s|$)/g, '') + (status ? ' open' : '');
        } else {
            akkordeon.className = akkordeon.className.replace(/(^|\s)open(\s|$)/g, '');
        }

        if (status) {
            if (akkordeon.hasAttribute('data-load-url')) {
                var ev = document.createEvent('CustomEvent');
                ev.initCustomEvent('lazyload', true, true, null);
                akkordeon.dispatch(ev);
            }
        }

        if (!nativeSupport && status != initialStatus) {
            var ev = document.createEvent('CustomEvent');
            ev.initCustomEvent('toggle', true, true, {});
            akkordeon.dispatchEvent(ev);
        }

        var ev = document.createEvent('CustomEvent');
        ev.initCustomEvent('accordion.toggle', true, true, {});
        akkordeon.dispatchEvent(ev);
    },
    akkordeonHandler = function(evt) {
        evt = evt || window.evt;
        var akkordeon = evt.target || evt.srcElement,
            locked = false,
            summary;
        if (!akkordeon) { return; }

        while (akkordeon && (!akkordeon.className || !/(^|\s)akkordeon(\s|$)/.test(akkordeon.className))) {
            summary = akkordeon.querySelector('.field.checkbox');
            if (summary && /(^|\s)(checkbox|error)(\b|$)/.test(summary.className) && !summary.getElementsByTagName('input')[0].checked) {
                locked = true;
            }
            summary = akkordeon;
            akkordeon = akkordeon.parentNode;
        }
        if (!akkordeon || akkordeon.classList.contains('disabled')) { return; }
        if (locked) {
            akkordeon.setAttribute('open', true);
            akkordeon.className = akkordeon.className.replace(/(^|\s)open(\s|$)/g, '') + (' open');
            return;
        }
        if (summary !== akkordeon.querySelector('*:first-child')) { return; }

        if (evt.type === 'keyup') {
            if (evt.keyCode === 13 || evt.keyCode === 32) { akkordeonToggle(akkordeon); }
            else if (evt.keyCode === 38) { akkordeonToggle(akkordeon, false); }
            else if (evt.keyCode === 40) { akkordeonToggle(akkordeon, true); }
        } else if ((evt.which || evt.keycode) <= 1) {
            akkordeonToggle(akkordeon);
        }
        return false;
    };

    if (!document.addEventListener) {
        document.attachEvent('onclick', akkordeonHandler, false);
        document.attachEvent('onkeyup', akkordeonHandler, false);
    } else {
        document.addEventListener('click', akkordeonHandler);
        document.addEventListener('keyup', akkordeonHandler);
    }
})();
(function() {
    // returns carousel node or undefined
    var getCarousel = function(node) {
        var found = node;
        while (found && !/\bcarousel\b/.test(found.className || "")) {
            found = found.parentNode;
        }
        return found;
    },
    getPosAttribute = function(node) {
        var parent = node,
            pos;
        while (parent && (!parent.getAttribute || !(pos = parent.getAttribute('data-carousel-pos')))) {
            parent = parent.parentNode;
        }
        return pos;
    },
    // find out which variant of the transform attribute can be used
    transformAttr = 'transform oTransform msTransform webkitTransform'.replace(/(\w+)\s?/g, function(full, attr) {
        return attr in document.body.style ? full : '';
    }).split(' ')[0],
    // and transition (to trigger simulated transition for IE9)
    transitionAttr = 'transition oTransition msTransition webkitTransition'.replace(/(\w+)\s?/g, function(full, attr) {
        return attr in document.body.style ? full : '';
    }).split(' ')[0],
    setTranslateX = !transitionAttr ? transformAttr ? function(node, pos, unanimated) {
        if (unanimated) {
            node.style[transformAttr] = 'translateX(' + pos + 'px)';
            return;
        }
        var step = ((/(\-?\d+)/.test(node.style[transformAttr]) ? +RegExp.$1 : 0) - pos) / 10,
            i = 0;
        (function go() {
            if (++i < 10) { window.setTimeout(go, 17); }
            node.style[transformAttr]  = 'translateX(' + (pos + (10 - i) * step | 0) + 'px)';
        })();
    } : function(node, pos, unanimated) {
        if (unanimated) {
            node.style.left = pos + 'px';
            return;
        }
        var step = ((/(\-?\d+)/.test(node.style.left) ? +RegExp.$1 : 0) - pos) / 10,
            i = 0;
        (function go() {
            if (++i < 10) { window.setTimeout(go, 17); }
            node.style.left = (pos + (10 - i) * step | 0) + 'px';
        })();
    } : transformAttr ? function(node, pos) {
        node.style[transformAttr] = 'translateX(' + pos + 'px)';
    } : function(node, pos) {
        node.style.left = pos + 'px';
    },
    // move our carousel to a certain position
    moveToPos = function(node, pos, ev) {
        var rail = node.querySelector('ol[role="row"]'),
            nav = node.querySelector('ol[role="navigation"]'),
            items = node.querySelectorAll('ol[role="row"] > li'),
            maxWidth = node.offsetWidth,
            item = node.querySelector('ol[role="row"] > li.hidden + li:not(.hidden)');
        // prepare previous containers
        if (item) {
            var hidden = node.querySelectorAll('ol[role="row"] > li.hidden');
            for (var h = 0, t = hidden.length; h < t; h++) {
                hidden[h].className = hidden[h].className.replace(/(^|\s)hidden\b/g, '');
            }
            setTranslateX(rail, -item.offsetLeft, true);
        }
        // switch items one by one
        if (/^[+-]/.test(pos)) {
            if (pos === '+i') {
                node.pos++;
            } else if (pos === '-i') {
                node.pos--;
            } else if (pos === '+1') {
                // find next item that is not 100% in viewport
                for (var width = 0, i = node.pos - 1, l = items.length; i < l; i++) {
                    if (items[i].offsetWidth > maxWidth) {
                        width += maxWidth;
                    } else {
                        width += items[i].offsetWidth;
                    }
                    node.pos = i + 1;
                    if (width > maxWidth) {
                        break;
                    }
                }
            } else if (pos === "-1") {
                // find previous item that will fit 100% in viewport
                var width = 0;
                do {
                    width += items[--node.pos] && items[node.pos].offsetWidth;
                } while (node.pos > 0 && width < maxWidth);
                if (node.pos < 1) { node.pos = 1; }
            }
        } else {
            node.pos = +pos;
        }
        item = items[node.pos - 1];
        pos = item.offsetLeft;
        // use modern CSS transorms if at all possible, otherwise use left
        rail.className = rail.className.replace(/(^|\s)animate\b/g, '') + (ev.type !== 'resize' ? ' animate' : '');
        setTranslateX(rail, -pos, ev.type === 'resize');
        rail.pos = pos;
        // enable/disable prev/next buttons, change active
        nav.querySelector('[rel="prev"]')[node.pos === 1 ? 'setAttribute' : 'removeAttribute']('aria-disabled', true);
        var preview = node.pos > 1 && items[node.pos - 2].getAttribute('data-preview');
        nav.querySelector('[rel="prev"]').innerHTML = preview ? '<img src="' + preview.replace(/\"/g, '&quot;') + '" width="72" height="72" alt=""/>' : '';
        var active = nav.querySelector('.active'),
            icon = active.querySelector('.icon'),
            number = active.querySelector('.number');
        active.className = active.className.replace('active ', '');
        icon && (icon.className = icon.className.replace(/(^|\s)white/, '$1inactive service-hover'));
        number && (number.className = number.className.replace(/(^|\s)white/, '$1inactive service-hover'));
        active = nav.querySelectorAll('li')[node.pos];
        var activeOtherClasses = active.className;
        active.className =  'active ' + activeOtherClasses;
        icon = active.querySelector('.icon');
        number = active.querySelector('.number');
        icon && (icon.className = icon.className.replace(/(^|\s)inactive service-hover/, '$1white'));
        number && (number.className = number.className.replace(/(^|\s)inactive service-hover/, '$1white'));
        var bm = document.createEvent('CustomEvent');
        bm.initCustomEvent('carousel.beforemove', true, true, { originalEvent: ev });
        active.dispatchEvent(bm);
        // clean up afterwards
        window.setTimeout(function() {
            rail.className = rail.className.replace(/(^|\s)animate\b/g, '');
            for (var a = 0, x = items.length; a < x; a++) {
                items[a].className = items[a].className.replace(/(^|\s)hidden\b/g, '')
                    + ((a <= node.pos - 2) ? ' hidden': '');
            }
            rail.style[transformAttr || 'left'] = '';
            var mv = document.createEvent('CustomEvent');
            mv.initCustomEvent('carousel.move', true, true, {});
            active.dispatchEvent(mv);
            // we need to wait for clean up to detect the next preview
            if (node.pos < items.length) {
                var nextInvisible = node.pos;
                while (items[nextInvisible] && items[nextInvisible].getBoundingClientRect().left <= node.offsetWidth) {
                    nextInvisible++;
                }
                if (items[nextInvisible]) {
                    preview = items[nextInvisible].getAttribute('data-preview');
                    nav.querySelector('[rel="next"]').innerHTML = preview ? '<img src="' + preview.replace(/\"/g, '&quot;') + '" width="72" height="72" alt=""/>' : '';
                }
            }
            // find out if we're already on the last page, i.e. that all modules after our current are already visible
            nav.querySelector('[rel="next"]')[items[items.length - 1].offsetLeft < maxWidth ? 'setAttribute' : 'removeAttribute']('aria-disabled', true);
        }, 260);
    },
    autoswitchHandler = function(carousel) {
        if (!carousel) {
            for (var carousels = document.querySelectorAll('.carousel[data-autoswitch]'), c = 0, l = carousels.length; c < l; c++) {
                var opts = carousels[c].getAttribute('data-autoswitch');
                if (!opts) { continue; }
                carousels[c].autoswitchTimeout = window.setTimeout(function(node) { return function() {
                    autoswitchHandler(node);
                }}(carousels[c]), /^(\d+)/.test(opts) && +RegExp.$1 || 10000);
            }
            return;
        }
        var opts = carousel.getAttribute && carousel.getAttribute('data-autoswitch');
        if (!opts || /\btouch\b/.test(document.body.className) && (/mobile=off/.test(opts)
            || (/mobile=touchoff/.test(opts) && carousel.touched))) {
            var wait = /mobile=touchoff,(\d+)/.test(opts) && +RegExp.$1;
            if (wait) {
                carousel.autoswitchTimeout = window.setTimeout(function(node) { return function() {
                    node.touched = false;
                    autoswitchHandler(node);
                }}(carousel), wait);
            }
            return;
        } else if (/desktop=clickoff/.test(opts) && carousel.clicked) {
            var wait = /desktop=clickoff,(\d+)/.test(opts) && +RegExp.$1;
            if (wait) {
                carousel.autoswitchTimeout = window.setTimeout(function(node) { return function() {
                    node.clicked = false;
                    autoswitchHandler(node);
                }}(carousel), wait);
            }
            return;
        }
        window.clearTimeout(carousel.autoswitchTimeout);
        carousel.autoswitchTimeout = window.setTimeout(function(node) { return function() {
            autoswitchHandler(node);
        }}(carousel), /^(\d+)/.test(opts) && +RegExp.$1 || 10000);
        if ((carousel.currentStyle || window.getComputedStyle(carousel)).maxHeight === '10000px') { return; }
        var next = carousel.querySelector('[rel="next"]');
        if (next.hasAttribute('aria-disabled')) {
            moveToPos(carousel, 1, { type: 'autoswitch' });
        } else {
            clickHandler({ type: 'autoswitch', target: next });
        }
    },
    clickHandler = function(ev) {
        if (!ev || !ev.target) { return; }
        // is there a carousel button clicked
        var changepos = getPosAttribute(ev.target);
        if (!changepos) { return; }
        var carousel = getCarousel(ev.target);
        if (!carousel) { return; }
        if (!carousel.pos) { carousel.pos = 1; }
        if (ev.type === 'click') { carousel.clicked = true; }
        var effect = document.createEvent('CustomEvent');
        effect.initCustomEvent('carousel.effect', true, true, { change: changepos, carousel: carousel });
        if (carousel.dispatchEvent(effect)) {
            moveToPos(carousel, changepos, ev);
            ev.target.blur && ev.target.blur();
        }
    },
    tposx,
    tposy,
    tmoved,
    tnode,
    touchHandler = function(ev) {
        if (!ev) { return; }
        if (/start|down$/i.test(ev.type)) {
            tnode = getCarousel(ev.target);
            if (!tnode) { return; }
            // do not use touch events on disabled carousels
            var nav = tnode.querySelector('ol[role="navigation"]');
            if (nav && (window.getComputedStyle(nav) || nav.currentStyle).display === 'none') {
                tnode = false;
                return;
            }
            tposx = (ev.touches ? ev.touches[0] || ev.touches : ev).clientX;
            tposy = (ev.touches ? ev.touches[0] || ev.touches : ev).clientY;
            tmoved = false;
        } else {
            if (!tnode) { return; }
            var rail = tnode.querySelector('ol[role="row"]');
            if (/move$/i.test(ev.type)) {
                var dx = (ev.touches ? ev.touches[0] || ev.touches : ev).clientX - tposx,
                    dy = (ev.touches ? ev.touches[0] || ev.touches : ev).clientY - tposy;
                if (dx * dx <= 4 || dy * dy > dx * dx) { return; }
                tmoved = dx;
                if ((tmoved < 0 && tnode.querySelector('ol[role="navigation"] [rel="next"][aria-disabled]'))
                    || (tmoved > 0 && tnode.querySelector('ol[role="navigation"] [rel="prev"][aria-disabled]'))) {
                    tmoved = false;
                    tnode = false;
                    return;
                }
                setTranslateX(rail, dx);
                ev.preventDefault();
            } else {
                if (tmoved === false) {
                    tnode = false;
                    return;
                }
                var button = tmoved < 0
                    ? tnode.querySelector('ol[role="navigation"] [rel="next"]')
                    : tnode.querySelector('ol[role="navigation"] [rel="prev"]');
                if (button.hasAttribute('aria-disabled')) {
                    setTranslateX(rail, -rail.pos || 0);
                } else {
                    clickHandler({ type: 'touch', target: button });
                }
                tnode.touched = true;
                tnode = false;
                return false;
            }
        }
    },
    resizeTimeout = false,
    resizeFunction = function() {
        for (var carousels = document.querySelectorAll('.carousel'), c = 0, l = carousels.length; c < l; c++) {
            if ('pos' in carousels[c]) {
                // disabled in breakpoint
                var nav = carousels[c].querySelector('ol[role="navigation"]');
                if (!nav.offsetWidth) {
                    moveToPos(carousels[c], 1, { target: carousels[c], type: 'resize' });
                    carousels[c].setAttribute('previous-position', carousels[c].pos);
                    continue;
                }
                // re-enabled in breakpoint
                var previous;
                if (nav.offsetWidth && (previous = carousels[c].getAttribute('previous-position'))) {
                    moveToPos(carousels[c], previous, { target: carousels[c], type: 'resize' });
                    carousels[c].removeAttribute('previous-position');
                    continue;
                }
                // current navigation item is invisible - switch to the previous/next visible one
                var navItems = carousels[c].querySelectorAll('ol[role="navigation"] li'),
                    navItem = (navItems || [])[carousels[c].pos];
                if (navItem && /(s|m|l|xl)-0/.test(navItem.className) && !navItem.offsetWidth) {
                    var dist = 0;
                    while (dist++ < navItems.length) {
                        if (carousels[c].pos - dist > 1 && (navItems[carousels[c].pos - dist] || {}).offsetWidth) {
                            moveToPos(carousels[c], carousels[c].pos - dist, { target: carousels[c], type: 'resize' });
                            break;
                        }
                        if (carousels[c].pos + dist < navItems.length - 1 && (navItems[carousels[c].pos + dist] || {}).offsetWidth) {
                            moveToPos(carousels[c], carousels[c].pos + dist, { target: carousels[c], type: 'resize' });
                            break;
                        }
                    }
                }
                // DP-10556 Bugfix
                moveToPos(carousels[c], carousels[c].pos, { target: carousels[c], type: 'resize' });
            }
        }
    },
    resizeHandler = function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = window.setTimeout(resizeFunction, 100);
    };
    window.addEventListener('load', function() { autoswitchHandler(); });
    document.addEventListener('click', clickHandler);
    window.addEventListener('resize', resizeHandler);
    // touch handler
    var events = 'ontouchstart' in window ? 'touchstart touchmove touchend'
        : window.navigator.msPointerEnabled ? 'MSPointerDown MSPointerMove MSPointerUp'
        : window.navigator.pointerEnabled ? 'pointerdown pointermove pointerup'
        : '';
    events.replace(/\w+/g, function(name) { document.addEventListener(name, touchHandler); });
})();
var getValidityState = function (field) {
    var length = field.value.length;
    var checkValidity = {
        tooLong: (field.hasAttribute('maxLength') && field.getAttribute('maxLength') > 0 && length > parseInt(field.getAttribute('maxLength'), 10)),
        tooShort: (field.hasAttribute('minLength') && field.getAttribute('minLength') > 0 && length > 0 && length < parseInt(field.getAttribute('minLength'), 10))
    };

    var valid = true;
    for (var key in checkValidity) {
        if (checkValidity.hasOwnProperty(key)) {
            // If there's an error, change valid value
            if (checkValidity[key]) {
                valid = false;
                break;
            }
        }
    }
    checkValidity.valid = valid;

    return checkValidity;
};
(function() {
    'use strict';
    // check for prerequisites; otherwise we have to rely on server-side validation
    if (!document.addEventListener || !('validity' in document.createElement('input'))) { return; }
    /* validation messages depending on document language */
    var messages = {
            "de": {
                "valueMissing": "Bitte {{meaning}} eingeben",
                "typeMismatch": "Vertippt? Bitte {{meaning}} prüfen",
                "patternMismatch": "Vertippt? Bitte {{meaning}} prüfen",
                "tooLong": "Bitte höchstens {{maxlength}} Zeichen eingeben",
                "tooShort": "Bitte mindestens {{minlength}} Zeichen eingeben",
                "rangeUnderflow": "Bitte Betrag von mindestens {{min}} {{format}} eingeben",
                "rangeOverflow": "Bitte Betrag von höchstens {{max}} {{format}} eingeben",
                "stepMismatch": "Bitte Betrag in {{format}} eingeben: {{placeholder}}",
                "valueMissingNoMeaning": "Bitte Formularfeld ausfüllen",
                "valueMissingCheckbox": "Bitte {{meaning}} bestätigen",
                "atMissing": "Bitte @-Zeichen in der E-Mail-Adresse einfügen"
            },
            "en": {
                "valueMissing": "Please insert {{meaning}}",
                "typeMismatch": "Mistyped? Please check the {{meaning}}",
                "patternMismatch": "Mistyped? Please check the {{meaning}}",
                "tooLong": "Please insert at most {{maxlength}} characters",
                "tooShort": "Please insert at least {{minlength}} characters",
                "rangeUnderflow": "Please insert an amount of at least {{min}} {{format}}",
                "rangeOverflow": "Please insert an amount of at most {{max}} {{format}}",
                "stepMismatch": "Please insert amount in {{format}}: {{placeholder}}",
                "valueMissingNoMeaning": "Please fill in form field",
                "valueMissingCheckbox": "Please accept {{meaning}} to continue",
                "atMissing": "Please insert @-Sign in E-Mail-Address"
            },
            "es": {
                "valueMissing": "Por favor inserte {{meaning}}",
                "typeMismatch": "Por favor inserte {{meaning}} completamente",
                "patternMismatch": "Por favor inserte {{meaning}} en el siguiente formato: {{format}}",
                "tooLong": "Por favor inserte un máximo de {{maxlength}} caracteres",
                "tooShort": "Por favor inserte un mínimo de {{minlength}} caracteres",
                "rangeUnderflow": "Por favor inserte un monto de al menos {{min}} {{format}}",
                "rangeOverflow": "Por favor inserte un monto de máximo {{max}} {{format}}",
                "stepMismatch": "Por favor inserte el monto en {{format}}: {{placeholder}}",
                "valueMissingNoMeaning": "Por favor llene el campo del formulario ",
                "valueMissingCheckbox": "Por favor acepte {{meaning}} para continuar",
                "atMissing": "Por favor inserte el símbolo @ en la dirección de correo electrónico."
            },
            "fr": {
                "valueMissing": "Veuillez s'il vous plaît saisir {{meaning}}",
                "typeMismatch": "Veuillez s'il vous plaît saisir {{meaning}} complètement",
                "patternMismatch": "Veuillez s'il vous plaît saisir {{meaning}} au format suivant: {{format}}",
                "tooLong": "Veuillez s'il vous plaît saisir au maximum {{maxlength}} caractères",
                "tooShort": "Veuillez s'il vous plaît saisir au minimum {{minlength}} caractères",
                "rangeUnderflow": "Veuillez s'il vous plaît saisir un nombre d'au moins {{min}} {{format}}",
                "rangeOverflow": "Veuillez s'il vous plaît saisir un nombre maximum de {{max}} {{format}}",
                "stepMismatch": "Veuillez s'il vous plaît saisir la quantité en {{format}}: {{placeholder}}",
                "valueMissingNoMeaning": "Veuillez s'il vous plaît remplir dans le champ du formulaire",
                "valueMissingCheckbox": "Veuillez s'il vous plaît confirmer {{meaning}} pour continuer",
                "atMissing": "Veuillez s'il vous plaît saisir le symbol @ dans l'adresse e-mail"
            },
            "zh-cn": {
                "valueMissing": "请输入 {{meaning}}",
                "typeMismatch": "请检查 {{meaning}} 的输入",
                "patternMismatch": "请检查 {{meaning}} 的输入",
                "tooLong": "最多只可输入 {{maxlength}} 个字符",
                "tooShort": "最少需要 {{minlength}} 个字符",
                "rangeUnderflow": "最少 {{min}} {{format}}",
                "rangeOverflow": "最多 {{max}} {{format}}",
                "stepMismatch": "默认增量 {{format}}: {{placeholder}}",
                "valueMissingNoMeaning": "请完整填写表格",
                "valueMissingCheckbox": "请接受 {{meaning}} 条款以便继续下一步操作",
                "atMissing": "电子邮件地址中缺少 @ 符号"
            }
        }[/(de|en|fr|es|zh-cn)/.test(document.documentElement.getAttribute('lang')) ? RegExp.$1 : 'de'],
        /* TODO: more languages */
        getMessage = function(field) {
            var text = field.validationMessage,
                textdata = {
                    meaning: field.getAttribute('aria-label') || (field.parentNode.querySelector('label') || {}).innerHTML,
                    format: field.getAttribute('data-field-format') || field.getAttribute('placeholder'),
                    placeholder: field.getAttribute('placeholder') || '',
                    minlength: field.getAttribute('minlength'),
                    maxlength: field.getAttribute('maxlength'),
                    min: field.getAttribute('min'),
                    max: field.getAttribute('max')
                };
            // custom message takes precedence over generic messages
            if (field.validity && field.validity.customError) { return text; }
            // get message by ValidityState
            for (var item in messages) {
                if (messages.hasOwnProperty(item) && (field.validity[item] || getValidityState(field)[item])) {
                    // use typeMismatch message for pattern mismatch without format information
                    if (item === 'patternMismatch' && !field.hasAttribute('data-patternmismatch-message')
                        && !textdata.format) { item = 'typeMismatch'; }
                    // split up different cases of valueMissing messages
                    if (item === 'valueMissing' && !field.hasAttribute('data-valuemissing-message')) {
                        if (!textdata.meaning) { item = 'valueMissingNoMeaning'; }
                        else if (item === 'valueMissing' && field.type === 'checkbox') { item = 'valueMissingCheckbox'; }
                    }
                    // use data attributes before generic message
                    text = field.getAttribute('data-' + item.toLowerCase() + '-message') ||
                           field.getAttribute('data-invalid-message') || messages[item];
                    break;
                }
            }
            return text.replace(/\{\{(.*?)\}\}/g, function(_, part) { return textdata[part] || ''; });
        },
        addMessage = function(field) {
            var text = getMessage(field),
                message = document.getElementById(field.id + '-error'),
                container = field.parentNode;
            container.className = container.className.replace(/(^|\s)error\b/g, '') + ' error';
            if (container.parentNode && /fieldset/i.test(container.parentNode.nodeName)) {
                container = container.parentNode;
            }
            field.setAttribute('aria-invalid', true);
            // if message container is not already there, add it behind the next container (.field, fieldset)
            if (text === '\0') {
                message && message.parentNode.removeChild(message);
                return;
            }
            if (!message) {
                message = document.createElement('div');
                message.id = field.id + '-error';
                message.className = 'error message field';
                container.parentNode[container.nextSibling ? 'insertBefore' : 'appendChild'](message, container.nextSibling);
            }
            message.innerHTML = '<span class="m error icon"></span><span></span>';
            message.lastChild.appendChild(document.createTextNode(text));
            var val = document.createEvent('CustomEvent');
            val.initCustomEvent('validation.errormessage.added', true, true, {
            });
            field.dispatchEvent(val);
        },
        removeMessage = function(field) {
            var message = document.getElementById(field.id + '-error');
            message && message.parentNode.removeChild(message);
            field.removeAttribute('aria-invalid');
            var container = field;
            while (container && container !== field.form) {
                container.className = container.className.replace(/(^|\s)error\b/g, '');
                container = container.parentNode;
            }
            var val = document.createEvent('CustomEvent');
            val.initCustomEvent('validation.errormessage.removed', true, true, {
            });
            field.dispatchEvent(val);
        },
        invalidHandler = function(ev) {
            if (!ev.target || !ev.target.validity || ev.target.validity.valid && getValidityState(ev.target).valid ||
                 ev.target.getAttribute('data-novalidate') || ev.target.form.novalidate) { return; }
            addMessage(ev.target);
            ev.preventDefault();
        },
        blurHandler = function(ev) {
            if (!ev.target || !ev.target.form) { return; }
            var noval = ev.target.getAttribute('data-novalidate') || ev.target.form.hasAttribute('novalidate') ||
                ev.target.form.hasAttribute('formnovalidate') || ev.target.form.getAttribute('data-novalidate'),
                custom,
                pollyValidityState = getValidityState(ev.target).valid;
            if (noval && (noval !== 'reqonly' || !ev.target.validity.valueMissing)) { return; }
            if ((custom = ev.target.getAttribute('data-custom-validation'))) {
                // send custom validation event (call ev.detail.done() when finished)
                var val = document.createEvent('CustomEvent'),
                    field = ev.target;
                val.initCustomEvent(custom, true, true, {
                    originalEvent: ev,
                    done: function(defer) {
                        (defer || field).checkValidity() && removeMessage(defer || field);
                        if (/android/i.test(navigator.userAgent)) {
                            ev.relatedTarget && ev.relatedTarget.focus && ev.relatedTarget.focus();
                        }
                    }
                });
                field.dispatchEvent(val);
            } else if (ev.target.reportValidity ? ev.target.reportValidity() && pollyValidityState
                : ev.target.checkValidity && ev.target.checkValidity() && pollyValidityState) {
                removeMessage(ev.target);
            } else if (!pollyValidityState) {
                invalidHandler(ev);
            }
            if (/android/i.test(navigator.userAgent)) {
                ev.relatedTarget && ev.relatedTarget.focus && ev.relatedTarget.focus();
            }
        },
        changeHandler = function(ev) {
            if (!ev.target || !ev.target.form || ( ev.target.type && !/radio|checkbox/i.test(ev.target.type))) { return; }
            var noval = ev.target.getAttribute('data-novalidate') || ev.target.form.hasAttribute('novalidate') ||
                ev.target.form.hasAttribute('formnovalidate') || ev.target.form.getAttribute('data-novalidate'),
                custom;
            if (noval && (noval !== 'reqonly' || !ev.target.validity.valueMissing)) { return; }
            if ((custom = ev.target.getAttribute('data-custom-validation'))) {
                // send custom validation event (call ev.detail.done() when finished)
                var val = document.createEvent('CustomEvent'),
                    field = ev.target;
                val.initCustomEvent(custom, true, true, {
                    originalEvent: ev,
                    done: function(defer) {
                        (defer || field).checkValidity() && removeMessage(defer || field);
                    }
                });
                field.dispatchEvent(val);
            } else if (/radio/i.test(ev.target.type)) {
                var radio = ev.target, group = radio.form[radio.name];
                if (group.value) {
                    for(var i = 0; i < group.length; i++) {
                        removeMessage(group[i]);
                    }
                }
            } else if (ev.target.reportValidity ? ev.target.reportValidity() && getValidityState(ev.target).valid
            : ev.target.checkValidity && ev.target.checkValidity() && getValidityState(ev.target).valid) {
                removeMessage(ev.target);
            }
        },
        loadHandler = function(ev) {
            var target = ev.target === window ? document : ev.target,
                firstError = target.querySelector('input[aria-invalid], select[aria-invalid], textarea[aria-invalid]');
            if (firstError) {
                firstError.focus();
                firstError.parentNode.scrollIntoView();
            }
        },
        resetHandler = function(ev) {
            var fields = ev.target.querySelectorAll('input[aria-invalid], select[aria-invalid], textarea[aria-invalid]');
            for (var f = 0, l = fields.length; f < l; f++) { removeMessage(fields[f]); }
        },
        submitHandler = function(ev) {
            if (ev.target.checkValidity() == false) {
                ev.preventDefault && ev.preventDefault();
                // Android 4.0.4 seems not to be satisfied with only using preventDefault...
                ev.stopImmediatePropagation && ev.stopImmediatePropagation();
                if (ev.target.reportValidity) {
                    ev.target.reportValidity();
                } else {
                    var fields = ev.target.querySelectorAll('input, textarea, select');
                    for (var f = fields.length; f--;) {
                        fields[f].checkValidity() || fields[f].dispatchEvent(new Event('invalid'));
                    }
                }
                return false;
            }
        },
        focusErrorField = function(form) { return function() {
            loadHandler({target: form});
        }},
        clickHandler = function(ev) {
            if (!ev.target) { return; }
            // clicked on a button that leads to form submit - focus first erroneous node
            if (ev.target.form && !ev.target.hasAttribute('novalidate') && !ev.target.hasAttribute('formnovalidate')
                && ((/button/i.test(ev.target.nodeName) && ev.target.type !== 'reset' && ev.target.classList.contains('key')) ||
                    (/input/i.test(ev.target.nodeName) && /submit|image/.test(ev.target.type)))) {
                window.setTimeout(focusErrorField(ev.target.form), 100);
            }
        },
        keyHandler = function(ev) {
            if (!ev.target || !ev.target.form) { return; }
            if ((ev.which || ev.keyCode) == 13 && /input|select/i.test(ev.target.nodeName) ||
                (/textarea/i.test(ev.target.nodeName) && ev.ctrlKey)) {
                // inline form submit - focus first erroneous node
                window.setTimeout(focusErrorField(ev.target.form), 100);
            }
        };
    document.addEventListener('invalid', invalidHandler, true);
    document.addEventListener('blur', blurHandler, true);
    document.addEventListener('change', changeHandler, true);
    document.addEventListener('reset', resetHandler, true);
    document.addEventListener('reset.validation', resetHandler);
    document.addEventListener('click', clickHandler);
    document.addEventListener('keyup', keyHandler);
    window.addEventListener('load', loadHandler);
    document.addEventListener('lazyload.done', loadHandler);
    // fix for some mobile webkit engines which don't stop submit on missingValue errors
    if (/mac os|android 4\.(4\.[0-2]|[^4])/i.test(navigator.userAgent)) {
        document.addEventListener('submit', submitHandler, true);
    }
})();
/**
 * Customer Validation - Date
 *
 * attribute in input field:
 * 	- day -> data-surveyor-date="day"
 * 	- month -> data-surveyor-date="month"
 * 	- year -> data-surveyor-date="year"
 *
 * Support by using "data-surveyor-date" in fieldset with following values:
 * 	- (by default date validity)
 * 	- future -> data-surveyor-date="future"
 * 	- past -> data-surveyor-date="past"
 * 	- adult -> data-surveyor-date="adult"
 */
(function() {
	var closestContainer = function(childEl, parentSelector) {
		while (childEl && childEl !== document) {
			if (childEl.matches(parentSelector)) { return childEl; }
			childEl = childEl.parentNode;
		}
		return undefined;
	},
	dateSurveyor = function(ev) {
		if (!ev || !ev.target || !ev.target.form) { return; }
		var fieldset = closestContainer(ev.target, 'fieldset');
		if (!fieldset) { return; }
		if(fieldset.querySelector('[data-input-formatter]') != null && fieldset.querySelector('[data-input-formatter]').getAttribute("data-input-formatter").split(";").length == 3) {
            var dateField = fieldset.querySelector('[data-input-formatter]'),
                pointer = dateField.getAttribute('data-surveyor-date') || '',
				formatterDim = dateField.getAttribute("data-input-formatter").split(";")[1].split(","),
				delimiter = dateField.getAttribute("data-input-formatter").split(";")[2],
                valueSplit = dateField.value.split(delimiter),
                meaning = dateField.getAttribute('aria-label') || 'Datum';

			for(var i=0; formatterDim.length > i; i++) {
				if(formatterDim[i] == "d") {
					var day = parseInt(valueSplit[i], 10);
				} else if(formatterDim[i] == "m") {
					var month = parseInt(valueSplit[i], 10);
				} else if(formatterDim[i] == "Y") {
					var year = parseInt(valueSplit[i], 10);
				}
			}
		} else {
			var pointer = fieldset.getAttribute('data-surveyor-date') || '',
				dayField = fieldset.querySelector('[data-surveyor-date="day"]'),
				monthField = fieldset.querySelector('[data-surveyor-date="month"]'),
				yearField = fieldset.querySelector('[data-surveyor-date="year"]'),
				day = parseInt(dayField.value, 10),
				month = parseInt(monthField.value, 10),
				year = parseInt(yearField.value, 10),
                meaning = dateField.getAttribute('aria-label') || 'Datum';
		}
		var date = new Date(year | 0, (month | 0) - 1, day | 0),
			valid = date.getDate() == day && date.getMonth() + 1 == month && date.getFullYear() == year,
			now = new Date(),
			adult = date <= new Date(now.getFullYear() - 18, now.getMonth(), now.getDate()),
            future = date > now,
			past = date < now,
            msg = (isNaN(day) || isNaN(month) || isNaN(year)) ? 'Bitte ' + meaning + ' eingeben'
                : !valid ? 'Vertippt? Bitte ' + meaning + ' prüfen'
				: pointer && (pointer == 'future') && !future ? 'Vertippt? Bitte ' + meaning + ' prüfen'
				: pointer && (pointer == 'past') && !past ? 'Vertippt? Bitte ' + meaning + ' prüfen'
				: pointer && (pointer == 'adult') && !adult ? 'Ein Vertragsabschluss ist erst ab dem 18. Lebensjahr möglich.'
				: '';
		if (msg) {
			if(typeof dateField != "undefined") {
				dateField.setCustomValidity(msg);
				dateField.reportValidity ? dateField.reportValidity() : dateField.checkValidity && dateField.checkValidity();
			} else {
				dayField.setCustomValidity(msg);
				monthField.setCustomValidity('\0');
				yearField.setCustomValidity('\0');
				dayField.reportValidity ? dayField.reportValidity() : dayField.checkValidity && dayField.checkValidity();
				monthField.reportValidity ? monthField.reportValidity() : monthField.checkValidity && monthField.checkValidity();
				yearField.reportValidity ? yearField.reportValidity() : yearField.checkValidity && yearField.checkValidity();
			}
		} else if (!msg) {
			if(typeof dateField != "undefined") {
				dateField.setCustomValidity('');
				if (msg === '') {
					var reset = document.createEvent('CustomEvent');
					reset.initCustomEvent('reset.validation', true, true, {});
					dateField.parentNode.parentNode.dispatchEvent(reset);
				} else {
					ev.detail.done(dateField);
				}
			} else {
				dayField.setCustomValidity('');
				monthField.setCustomValidity('');
				yearField.setCustomValidity('');
				if (msg === '') {
					var reset = document.createEvent('CustomEvent');
					reset.initCustomEvent('reset.validation', true, true, {});
					dayField.parentNode.parentNode.dispatchEvent(reset);
				} else {
					ev.detail.done(dayField);
				}
			}
		}
		ev.detail.done();
	};
	effective_date = function(ev) {
		if (!ev || !ev.target || !ev.target.form) { return; }
		var fieldset = closestContainer(ev.target, 'fieldset');
		if (!fieldset) { return; }
		if(fieldset.querySelector('[data-input-formatter]') != null && fieldset.querySelector('[data-input-formatter]').getAttribute("data-input-formatter").split(";").length == 3) {
			var pointer = fieldset.getAttribute('data-surveyor-date') || '',
				dateField = fieldset.querySelector('[data-input-formatter]'),
				formatterDim = dateField.getAttribute("data-input-formatter").split(";")[1].split(","),
				delimiter = dateField.getAttribute("data-input-formatter").split(";")[2],
				valueSplit = dateField.value.split(delimiter);

			for(var i=0; formatterDim.length > i; i++) {
				if(formatterDim[i] == "d") {
					var day = parseInt(valueSplit[i], 10);
				} else if(formatterDim[i] == "m") {
					var month = parseInt(valueSplit[i], 10);
				} else if(formatterDim[i] == "Y") {
					var year = parseInt(valueSplit[i], 10);
				}
			}
			var date = new Date(year | 0, (month | 0) - 1, day | 0),
			// check for inherent Date validity
			valid = date.getDate() == day && date.getMonth() + 1 == month && date.getFullYear() == year,
			now = new Date(),
			past = date < now.setHours(0,0,0,0),
			available = date >= now.setDate(now.getDate() + 10),
			msg = (isNaN(day) || isNaN(month) || isNaN(year)) ? null
				: !valid ? 'Vertippt? Bitte Gültigkeitsdatum prüfen'
				: past ? 'Der Ausweis muss mind. noch 10 Tage gültig sein'
				: !available ? 'Der Ausweis muss mind. noch 10 Tage gültig sein'
				: '';

				if (msg) {
					dateField.setCustomValidity(msg);
					dateField.reportValidity ? dateField.reportValidity() : dateField.checkValidity && dateField.checkValidity();
				} else if (!msg) {
					dateField.setCustomValidity('');
					if (msg === '') {
						var reset = document.createEvent('CustomEvent');
						reset.initCustomEvent('reset.validation', true, true, {});
						dateField.parentNode.parentNode.dispatchEvent(reset);
					} else {
						ev.detail.done(dateField);
					}
				}
				ev.detail.done();
		} else if(fieldset.getAttribute("data-check-cc-date") === "select") {
			var first_select = fieldset.querySelector('#cc-exp-month'),
				scnd_select = fieldset.querySelector('#cc-exp-year'),
				dateField = fieldset,
				month = parseInt(first_select.options[first_select.selectedIndex].value)-1,
				year = parseInt(scnd_select.options[scnd_select.selectedIndex].value),
				today = new Date(),
				day = new Date(today.getFullYear(), today.getMonth()+1, 0).getDate(),
				date = new Date(year | 0, (month + 1 | 0), 0),
				// check for inherent Date validity
				now = new Date(),
				past = date < now.setHours(0,0,0,0),
				available = date >= now.setDate(now.getDate() + 10),
				msg = (isNaN(day) || isNaN(month) || isNaN(year)) ? null
					: past ? 'Die Kreditkarte muss mind. noch 10 Tage gültig sein'
					: !available ? 'Die Kreditkarte muss mind. noch 10 Tage gültig sein'
					: '';

				if (msg) {
					first_select.setCustomValidity(msg);
					scnd_select.setCustomValidity(msg);
					first_select.reportValidity ? first_select.reportValidity() : first_select.checkValidity && first_select.checkValidity();
					scnd_select.reportValidity ? scnd_select.reportValidity() : scnd_select.checkValidity && scnd_select.checkValidity();
				} else if (!msg) {
					first_select.setCustomValidity('');
					scnd_select.setCustomValidity('');
					if (msg === '') {
						var reset = document.createEvent('CustomEvent');
						reset.initCustomEvent('reset.validation', true, true, {});
						dateField.parentNode.parentNode.dispatchEvent(reset);
					} else {
						ev.detail.done(dateField);
					}
				}
		}
	};
	document.addEventListener('validate.date', dateSurveyor);
	document.addEventListener('validate.effectivedate', effective_date);
})();// fields-toggle for form version 1.5+
(function () {
    var click = false,
        fields_activate = function (nodelist) {
            var fields = Array.isArray(nodelist) ? nodelist : document.querySelectorAll(nodelist);
            for (var f = 0, l = fields.length; f < l; f++) {
                if (!/input|select|textarea/i.test(fields[f].nodeName)) {
                    fields[f].classList.contains('hidden') && fields[f].classList.remove('hidden');
                    continue;
                }
                fields[f].removeAttribute('disabled');
                if (!(/button/i.test(fields[f].className) || fields[f].hasAttribute('data-field-optional'))
                    && /input|select|textarea/i.test(fields[f].nodeName)) {
                    fields[f].setAttribute('required', 'required');
                }
                var error_message = document.querySelector('#' + fields[f].id + '-error');
                error_message && error_message.classList.contains('hidden') && error_message.classList.remove('hidden');
                var container = fields[f];
                while (container && !/\bfield\b/.test(container.className)) {
                    container = container.parentNode;
                }
                if (!container) { continue; }
                container.className = (container.className + '').replace(/(\s|^)hidden\b/g, '');
                if (/fieldset/i.test(container.parentNode.nodeName)) {
                    container.parentNode.className = (container.parentNode.className + '').replace(/(\s|^)hidden\b/g, '');
                }

                /* for checked radio buttons and selected select options, further trigger their activate/deactivate fields */
                var cascadeElements = [];
                if (/(radio|checkbox)/i.test(fields[f].type) && fields[f].checked) {
                    cascadeElements.push(fields[f]);
                } else if (/select/i.test(fields[f].type) && fields[f].options.length > 0) {
                    for (var i = 0, len = fields[f].options.length; i < len; i++) {
                        if (fields[f].options[i].selected) {
                            cascadeElements.push(fields[f].options[i]);
                            break;
                        }
                    }
                }
                for (var c = 0; c < cascadeElements.length; c++) {
                    if (cascadeElements[c].hasAttribute('data-deactivate-fields')) {
                        fields_deactivate(cascadeElements[c].getAttribute('data-deactivate-fields'));
                    }
                    if (cascadeElements[c].hasAttribute('data-activate-fields')) {
                        fields_activate(cascadeElements[c].getAttribute('data-activate-fields'));
                    }
                }
            }
        },
        fields_deactivate = function (nodelist) {
            var fields = Array.isArray(nodelist) ? nodelist : document.querySelectorAll(nodelist);
            for (var f = 0, l = fields.length; f < l; f++) {
                if (/(radio|checkbox)/i.test(fields[f].type) && fields[f].hasAttribute('checked')) {
                    /* re-establish the (radio-)field's default value (from dom state at page load) and trigger activation/deactivation of attached fields accordingly */
                    fields[f].checked = true;
                    if (fields[f].hasAttribute('data-deactivate-fields')) {
                        fields_deactivate(fields[f].getAttribute('data-deactivate-fields'));
                    }
                    if (fields[f].hasAttribute('data-activate-fields')) {
                        fields_activate(fields[f].getAttribute('data-activate-fields'));
                    }
                }
                if (/select/i.test(fields[f].type) && fields[f].options.length > 0) {
                    /* same for select */
                    for (var i = 0, len = fields[f].options.length; i < len; i++) {
                        if (fields[f].options[i].hasAttribute('selected')) {
                            fields[f].value = fields[f].options[i].value;
                            if (fields[f].options[i].hasAttribute('data-deactivate-fields')) {
                                fields_deactivate(fields[f].options[i].getAttribute('data-deactivate-fields'));
                            }
                            if (fields[f].options[i].hasAttribute('data-activate-fields')) {
                                fields_activate(fields[f].options[i].getAttribute('data-activate-fields'));
                            }
                        }
                    }
                }
                var error_message = document.querySelector('#' + fields[f].id + '-error');
                error_message && !error_message.classList.contains('hidden') && error_message.classList.add('hidden');
                if (/input|select|textarea/i.test(fields[f].nodeName)) {
                    // fields[f].removeAttribute('aria-invalid');
                    fields[f].removeAttribute('required');
                    fields[f].setAttribute('disabled', 'disabled');
                    // if (!/(radio|checkbox|select)/.test(fields[f].type)) { fields[f].value = ''; }
                } else {
                    !fields[f].classList.contains('hidden') && fields[f].classList.add('hidden');
                    continue;
                }
                var container = fields[f];
                while (container && !/\bfield\b/.test(container.className)) {
                    container = container.parentNode;
                }
                if (!container) { continue; }
                container.className = container.className.replace(new RegExp('(^|\\s)' + 'hidden' + '\\b', 'g'), '') + ' hidden';
                var info_icon = container.querySelector('.info.service.icon'), info;
                if (info_icon) {
                    info = document.querySelector(info_icon.getAttribute('data-toggle-nodes'));
                    info.className = info.className.replace(new RegExp('(^|\\s)' + 'hidden' + '\\b', 'g'), '') + ' hidden';
                }
                while (container && !/\bfieldset\b/i.test(container.nodeName)) {
                    container = container.parentNode;
                }
                if (!container) { continue; }
                container.className = container.className.replace(new RegExp('(^|\\s)' + 'hidden' + '\\b', 'g'), '') + ' hidden';
                var info_icons = container.querySelectorAll('.info.service.icon');
                if (info_icons.length) {
                    for (var i = 0, len = info_icons.length; i < len; i++) {
                        info = document.querySelector(info_icons[i].getAttribute('data-toggle-nodes'));
                        info.className = info.className.replace(new RegExp('(^|\\s)' + 'hidden' + '\\b', 'g'), '') + ' hidden';
                    }
                }
            }
        },
        fields_toggle = function(nodelist) {
            var activateList = [], deactivateList = [],
                fields = document.querySelectorAll(nodelist);
            for (var f = 0, l = fields.length; f < l; f++) {
                if (fields[f].classList.contains('hidden') || fields[f].hasAttribute('disabled')) {
                    activateList.push(fields[f]);
                } else {
                    deactivateList.push(fields[f]);
                }
            }
            if (activateList.length > 0) { fields_activate(activateList); }
            if (deactivateList.length > 0) { fields_deactivate(deactivateList); }
        },
        fields_toggle_handler = function (ev) {
            if (ev.type === 'keyup' && (ev.which || ev.keyCode) != 13 || (ev.which || ev.keyCode) > 1) { return; }
            if (ev.type === 'touchstart' || ev.type === 'mousedown') {
                click = true;
                return;
            }
            if (ev.type === 'touchmove' || ev.type === 'mousemove') {
                click = false;
                return;
            }
            if (ev.type === 'touchend' || ev.type === 'mouseup') {
                if (!click) { return; }
                click = false;
            }

            var target = ev.target || ev.srcElement,
                parent = target,
                enable,
                disable,
                toggle;

            while (parent) {
                if (parent.htmlFor) { parent = document.getElementById(parent.htmlFor); }
                enable || (parent.getAttribute && (enable = parent.getAttribute('data-activate-fields')));
                disable || (parent.getAttribute && (disable = parent.getAttribute('data-deactivate-fields')));
                toggle || (parent.getAttribute && (toggle = parent.getAttribute('data-toggle-fields')));
                parent = parent.parentNode;
            }
            if (!enable && !disable && !toggle) { return; }
            disable && fields_deactivate(disable);
            enable && fields_activate(enable);
            toggle && fields_toggle(toggle);
        },
        revolution_handler = function () {
            var inputs = document.querySelectorAll('input[type="radio"][checked="checked"]');
            if (!inputs || inputs.length < 0) { return; }
            for (var index = 0; index < inputs.length; index++) {
                inputs[index].hasAttribute('data-deactivate-fields') && fields_deactivate(inputs[index].getAttribute('data-deactivate-fields'));
                inputs[index].hasAttribute('data-activate-fields') && fields_activate(inputs[index].getAttribute('data-activate-fields'));
            }
        },
        checkedHandler = function (ev) {
            if (!ev || !ev.target || !ev.target.form || !ev.target.type || !/radio/i.test(ev.target.type)) { return; }
            var target = ev.target,
            radios = target.form.querySelectorAll('input[name="' + target.name + '"]');
            for (var index = 0; index < radios.length; index++) {
                if (radios[index].checked) {
                    radios[index].setAttribute('checked', 'checked');
                } else {
                    radios[index].hasAttribute('checked') && radios[index].removeAttribute('checked');
                }
            }
        };
    if (!document.addEventListener) {
        document.attachEvent('onclick', fields_toggle_handler);
        document.attachEvent('onkeypress', fields_toggle_handler);
    } else {
        document.addEventListener('keypress', fields_toggle_handler);
        if (/ip[ao]d|iphone/i.test(navigator.userAgent)) {
            document.addEventListener('touchstart', fields_toggle_handler);
            document.addEventListener('touchmove', fields_toggle_handler);
            document.addEventListener('touchend', fields_toggle_handler);
        } else {
            document.addEventListener('change', fields_toggle_handler);
        }
    }
    // check user selection for all radio buttons by step-falling back
    document.addEventListener('DOMContentLoaded', revolution_handler);
    // handel the checked="checked" attribute by changing with radio input
    document.addEventListener('change', checkedHandler);
})();/**
 * one error message for a Fieldset
 * - data-invalid-message: attribute needs to be put in fieldset element & its value is the error message for this fieldset
 */
(function() {
    var eMessageHandler = function(ev) {
        if (!ev || !ev.target || !ev.target.form) { return; }
        var fieldset = ev.target.parentNode.parentNode;
        if (!fieldset || !/fieldset/i.test(fieldset.nodeName) || !fieldset.hasAttribute('data-invalid-message')) { return; }
        var error = fieldset.nextSibling,
            errorText = '<span class="m error icon"></span><span>' + fieldset.getAttribute('data-invalid-message') + '</span>';
        if (!error || !/error message field/i.test(error.className)) { return; }
        error.innerHTML = errorText;
        while (/error message field/i.test(error.nextSibling.className)) {
            error.nextSibling.innerHTML = errorText;
            error.classList.add('hidden');
            error = error.nextSibling;
        }
    };
    document.addEventListener('validation.errormessage.added', eMessageHandler, true);
})();(function() {
    var inputFormatter = function (element, opts) {
        var owner = this;
        if (typeof element === 'string') {
            owner.element = document.querySelector(element);
        } else {
            owner.element = ((typeof element.length !== 'undefined') && element.length > 0) ? element[0] : element;
        }
        if (!owner.element) { throw new Error('[inputFormatter.js] Element nicht gefunden -> prüfen'); }
        opts.initValue = owner.element.value;
        owner.properties = inputFormatter.DefaultProperties.assign({}, opts);
        owner.init();
    }

    inputFormatter.prototype = {
        init: function () {
            var owner = this, oProp = owner.properties;
            if (!oProp.date && oProp.blocksLength === 0) {
                owner.onInput(oProp.initValue);
                return;
            }
            oProp.maxLength = inputFormatter.Util.getMaxLength(oProp.blocks);
            owner.isAndroid = inputFormatter.Util.isAndroid();
            owner.lastInputValue = '';
            owner.onChangeListener = owner.onChange.bind(owner);
            owner.onKeyDownListener = owner.onKeyDown.bind(owner);
            owner.onCutListener = owner.onCut.bind(owner);
            owner.onCopyListener = owner.onCopy.bind(owner);
            owner.onClickListener = owner.onClick.bind(owner);
            owner.onFocusListener = owner.onFocus.bind(owner);
            owner.element.addEventListener('input', owner.onChangeListener);
            owner.element.addEventListener('keydown', owner.onKeyDownListener);
            owner.element.addEventListener('cut', owner.onCutListener);
            owner.element.addEventListener('copy', owner.onCopyListener);
            owner.element.addEventListener('click', owner.onClickListener);
            owner.element.addEventListener('focus', owner.onFocusListener);
            owner.initDateFormatter();

            // verhindere touch input feld wenn value = null, anderenfalls fügt firefox einen red box-shadow für required ein
            if (oProp.initValue) {
                owner.onInput(oProp.initValue);
            }
        },
        initDateFormatter: function () {
            var owner = this, oProp = owner.properties;
            if (!oProp.date) {
                return;
            }
            oProp.dateFormatter = new inputFormatter.DateFormatter(oProp.datePattern);
            oProp.blocks = oProp.dateFormatter.getBlocks();
            oProp.blocksLength = oProp.blocks.length;
            oProp.maxLength = inputFormatter.Util.getMaxLength(oProp.blocks);
        },
        onClick: function(event) {
            var owner = this,
                ownerElem = owner.element
                oProp = owner.properties,
                firstBlockLength = typeof oProp.blocks[0] != "undefined" ? oProp.blocks[0] + 1 : 0,
                secondBlockLength = typeof oProp.blocks[1] != "undefined" ? oProp.blocks[1] + 1 : 0,
                thirdBlockLength = typeof oProp.blocks[2] != "undefined" ? oProp.blocks[2] : 0,
                caretStart = 0,
                caretEnd = firstBlockLength-1;

            if(oProp.date && ownerElem.value.length > firstBlockLength-1) {
                //if(this.selectionStart < 3) { this.setSelectionRange(0,2);  }
                if(ownerElem.selectionStart >= firstBlockLength && ownerElem.selectionEnd < (firstBlockLength + secondBlockLength)) { caretStart = firstBlockLength; caretEnd = firstBlockLength + secondBlockLength - 1; }
                if(ownerElem.selectionStart >= (firstBlockLength + secondBlockLength) && ownerElem.selectionEnd >= (firstBlockLength + secondBlockLength)) { caretStart = firstBlockLength + secondBlockLength; caretEnd = firstBlockLength + secondBlockLength + thirdBlockLength; }
                ownerElem.setSelectionRange(caretEnd, caretEnd);
                ownerElem.setSelectionRange(caretStart,caretEnd);
            }
            oProp.focusChanged = true;
        },
        onKeyDown: function (event) {
            var owner = this, oProp = owner.properties,
                charCode = event.which || event.keyCode,
                Util = inputFormatter.Util,
                currentValue = owner.element.value;


            // Falls charcode == 8 zurückkommt, wird backspace korrekt gesendet. In dem Fall brauchen wir keine Sonderbehandlung
            owner.hasBackspaceSupport = owner.hasBackspaceSupport || charCode === 8;
            if (!owner.hasBackspaceSupport && Util.isAndroidBackspace(owner.lastInputValue, currentValue)) {
                charCode = 8;
            }
            owner.lastInputValue = currentValue;

            // backspace wenn letztes Zeichen ein Trennzeichen ist
            var postDelimiter = Util.getPostDelimiter(currentValue, oProp.delimiter, oProp.delimiters);
            if (charCode === 8 && postDelimiter) {
                oProp.postDelimiterBackspace = postDelimiter;
            } else {
                oProp.postDelimiterBackspace = false;
            }

            if(oProp.date) {
                var startPos = typeof owner.element.selectionStart != "undefined" ? owner.element.selectionStart : 0,
                    endPos = typeof owner.element.selectionEnd != "undefined" ? owner.element.selectionEnd : 0,
                    firstBlockLength = typeof oProp.blocks[0] != "undefined" ? oProp.blocks[0] + 1 : 0,
                    secondBlockLength = typeof oProp.blocks[1] != "undefined" ? oProp.blocks[1] + 1 : 0,
                    thirdBlockLength = typeof oProp.blocks[2] != "undefined" ? oProp.blocks[2] : 0;
                if(charCode == 38 || charCode == 39 || (charCode == 9 && !event.shiftKey && owner.element.selectionEnd < owner.element.value.length)) {
                    event.preventDefault();
                    if (endPos >= 5) {
                        startPos = firstBlockLength + secondBlockLength;
                        endPos = firstBlockLength + secondBlockLength + thirdBlockLength;
                    } else if (endPos >= 2) {
                        startPos = oProp.blocks[0] + 1;
                        endPos = firstBlockLength + secondBlockLength - 1;
                    }
                    //var newSelectionRangeEnd = currentValue.length == endPos ? endPos : oProp.blocks;
                    owner.element.setSelectionRange(endPos, endPos);
                    owner.element.setSelectionRange(startPos,endPos);
                    owner.element.focus();
                    oProp.focusChanged = true;
                }
                if(charCode == 40 || charCode == 37 || (charCode == 9 && event.shiftKey && endPos > owner.element.value.length)) {
                    event.preventDefault();
                    if(startPos == endPos && (startPos > firstBlockLength + secondBlockLength)) {
                        startPos = firstBlockLength + secondBlockLength;
                    } else if (oProp.blocks.length == 3 && (endPos >= firstBlockLength + secondBlockLength)) {
                        startPos = firstBlockLength;
                        endPos = firstBlockLength + secondBlockLength -1 ;
                    } else if (endPos < firstBlockLength + secondBlockLength) {
                        startPos = 0;
                        endPos = firstBlockLength - 1;
                    }
                    //var newSelectionRangeEnd = currentValue.length == endPos ? endPos : oProp.blocks;
                    owner.element.setSelectionRange(endPos, endPos);
                    owner.element.setSelectionRange(startPos,endPos);
                    owner.element.focus();
                    oProp.focusChanged = true;
                }
            }
        },
        onFocus: function(event) {
            var owner = this, oProp = owner.properties;
            if(oProp.date) {
                var startPos = typeof owner.element.selectionStart != "undefined" ? owner.element.selectionStart : 0,
                    endPos = typeof owner.element.selectionEnd != "undefined" ? owner.element.selectionEnd : 0;
                owner.element.setSelectionRange(endPos, endPos);
                owner.element.setSelectionRange(startPos, oProp.blocks[0]);
                owner.element.focus();
                oProp.focusChanged = true;
            }
        },
        onChange: function () {
            this.onInput(this.element.value);
        },
        onCut: function (e) {
            this.copyClipboardData(e);
            this.onInput('');
        },
        onCopy: function (e) {
            this.copyClipboardData(e);
        },
        copyClipboardData: function (e) {
            var owner = this,
                oProp = owner.properties,
                Util = inputFormatter.Util,
                inputValue = owner.element.value,
                textToCopy = '';

            if (!oProp.copyDelimiter) {
                textToCopy = Util.cutDelimiters(inputValue, oProp.delimiter, oProp.delimiters);
            } else {
                textToCopy = inputValue;
            }

            try {
                if (e.clipboardData) {
                    e.clipboardData.setData('Text', textToCopy);
                } else {
                    window.clipboardData.setData('Text', textToCopy);
                }
                e.preventDefault();
            } catch (ex) {
                //  none
            }
        },
        onInput: function (value) {
            var owner = this, oProp = owner.properties,
                Util = inputFormatter.Util;

            // case 1: lösche einen weiteren buchstaben "4": 1234*| -> backspace -> 123|
            // case 2: letzter charakter ist kein Trennzeichen: 12|34* -> backspace -> 1|34*
            var postDelimiterAfter = Util.getPostDelimiter(value, oProp.delimiter, oProp.delimiters);
            if (oProp.postDelimiterBackspace && !postDelimiterAfter) {
                value = Util.headStr(value, value.length - oProp.postDelimiterBackspace.length);
            }

            // steuerung datumsverhalten
            if (oProp.date) {
                value = oProp.dateFormatter.getValidatedDate(value, oProp, owner.lastInputValue, '');
            }

            // ersetze Trennzeichen
            value = Util.cutDelimiters(value, oProp.delimiter, oProp.delimiters);

            // ersetze nicht numerische zeichen
            value = oProp.numericOnly ? Util.strip(value, /[^\d]/g) : value;

            // konvertiere
            value = oProp.uppercase ? value.toUpperCase() : value;
            value = oProp.lowercase ? value.toLowerCase() : value;

            // slice
            value = Util.headStr(value, oProp.maxLength);

            // apply blocks
            oProp.result = Util.getFormattedValue(
                value,
                oProp.blocks, oProp.blocksLength,
                oProp.delimiter, oProp.delimiters, oProp.delimiterLazyShow
            );
            owner.updateValueState();
        },
        updateValueState: function () {
            var owner = this,
                Util = inputFormatter.Util,
                oProp = owner.properties,
                firstBlockLength = typeof oProp.blocks[0] != "undefined" ? oProp.blocks[0] + 1 : 0,
                secondBlockLength = typeof oProp.blocks[1] != "undefined" ? oProp.blocks[1] + 1 : 0,
                thirdBlockLength = typeof oProp.blocks[2] != "undefined" ? oProp.blocks[2] : 0;;
            if (!owner.element) { return; }

            var endPos = typeof owner.element.selectionEnd != "undefined" ? owner.element.selectionEnd : 0;
            var oldValue = owner.element.value;
            var newValue = oProp.result;
            endPos = Util.getNextCursorPosition(endPos, oldValue, newValue, oProp.delimiter, oProp.delimiters);

            /*if (owner.isAndroid) {
                window.setTimeout(function () {
                    owner.element.value = newValue;
                    Util.setSelection(owner.element, endPos, oProp.document, false);
                    owner.callOnValueChanged();
                }, 1);
                return;
            }*/
            owner.element.value = newValue;
            Util.setSelection(owner.element, endPos, oProp.document, false);
            owner.callOnValueChanged();
            if(typeof oProp.setStartMarker != "undefined" && typeof oProp.setEndMarker != "undefined") {
                owner.element.setSelectionRange(oProp.setStartMarker, oProp.setEndMarker);
                owner.element.focus();
                if(endPos < oProp.setStartMarker) {
                    oProp.focusChanged = true;
                }
                /*
                if(endPos < firstBlockLength && owner.element.value.length > firstBlockLength && oProp.setEndMarker < firstBlockLength && (parseInt(owner.element.value.slice(oProp.setStartMarker, oProp.setEndMarker),10) > firstBlockLength || owner.lastInputValue.slice(oProp.setStartMarker, oProp.setEndMarker) == "00")) {
                    owner.element.setSelectionRange(firstBlockLength, firstBlockLength + secondBlockLength-1);
                    owner.element.focus();
                } else if(endPos < (firstBlockLength + secondBlockLength) && owner.element.value.length >= (firstBlockLength + secondBlockLength - 1) && oProp.setEndMarker > firstBlockLength && oProp.setEndMarker < (firstBlockLength + secondBlockLength) && (parseInt(owner.element.value.slice(oProp.setStartMarker, oProp.setEndMarker),10) >= 2 || owner.lastInputValue.slice(oProp.setStartMarker, oProp.setEndMarker) == "00")) {
                    owner.element.setSelectionRange(firstBlockLength + secondBlockLength, firstBlockLength + secondBlockLength + thirdBlockLength);
                    owner.element.focus();
                } else if(endPos < (firstBlockLength + secondBlockLength-1)) {
                    owner.element.setSelectionRange(oProp.setStartMarker, oProp.setEndMarker);
                    owner.element.focus();
                } else if (endPos >= (firstBlockLength + secondBlockLength)) {
                    owner.element.setSelectionRange(endPos, endPos);
                }
                */
            }
            // var range1 = oProp.blocks[0], range2 = oProp.blocks[0] + oProp.blocks[1];
            // if(endPos < range1) { owner.element.setSelectionRange(0, range1); }
            // if(endPos > range1 && endPos < (range2)) { owner.element.setSelectionRange(range1+1, range2); }
            // if(endPos > range1 && endPos < (range2)) { owner.element.setSelectionRange(range2+1, endPos); }
        },
        callOnValueChanged: function () {
            var owner = this,
                oProp = owner.properties;

            oProp.onValueChanged.call(owner, {
                target: {
                    value: oProp.result,
                    rawValue: owner.getRawValue()
                }
            });
        },
        getRawValue: function () {
            var owner = this,
                oProp = owner.properties,
                Util = inputFormatter.Util,
                rawValue = owner.element.value;
            rawValue = Util.cutDelimiters(rawValue, oProp.delimiter, oProp.delimiters);
            return rawValue;
        },
        getISOFormatDate: function () {
            var owner = this,
                oProp = owner.properties;
            return oProp.date ? oProp.dateFormatter.getISOFormatDate() : '';
        }
    }

    inputFormatter.DateFormatter = function (datePattern) {
        var owner = this;
        owner.date = [];
        owner.blocks = [];
        owner.datePattern = datePattern;
        owner.initBlocks();
    }

    inputFormatter.DateFormatter.prototype = {
        initBlocks: function () {
            var owner = this;
            owner.datePattern.forEach(function (value) {
                if (value === 'Y') {
                    owner.blocks.push(4);
                } else {
                    owner.blocks.push(2);
                }
            });
        },
        getISOFormatDate: function () {
            var owner = this,
                date = owner.date;
            return date[2] ? ( date[2] + '-' + owner.addLeadZero(date[1]) + '-' + owner.addLeadZero(date[0]) ) : '';
        },
        getBlocks: function () {
            return this.blocks;
        },
        getValidatedDate: function (value, oProp, lastInputValue) {
            var owner = this, result = '', markSet = false;
            owner.getSplittedValue = value.split(oProp.delimiter);
            value = value.replace(/[^\d]/g, '');
            owner.lastInputValue = lastInputValue.split(oProp.delimiter);
            // if((typeof getSplittedValue[0] != "undefined" && getSplittedValue[0] != "") && value.length > getSplittedValue[0].length && getSplittedValue[0].length < oProp.blocks[0]) {
            //     value = "0" + getSplittedValue[0];
            // }
            // if((typeof getSplittedValue[1] != "undefined" && getSplittedValue[1] != "") && value.length > getSplittedValue[1].length && getSplittedValue[1].length < oProp.blocks[1]) {
            //     value = getSplittedValue[0] + "0" + getSplittedValue[1];
            // }
            // if((typeof getSplittedValue[2] != "undefined" && getSplittedValue[2] != "") && value.length > getSplittedValue[2].length && getSplittedValue[2].length < oProp.blocks[2]) {
            //     var preValue = typeof lastInputValue[2] != "undefined" ? lastInputValue[2] : "000";
            //     value = getSplittedValue[0] + getSplittedValue[1] + (preValue + getSplittedValue[2]).slice(-4);
            // }
            oProp.blockRanges = [
                [0, owner.blocks[0]],
                [owner.blocks[0]+1, owner.blocks[0]+owner.blocks[1]+1],
                [owner.blocks[0]+1+owner.blocks[1]+1, owner.blocks[0]+1+owner.blocks[1]+1+owner.blocks[2]]
            ];
            // durchlaufe jeden Block nach art (d,m) und wende entsprechende formatierung an
            owner.blocks.forEach(function(length, index) {
                if (value.length > 0) {
                    var sub = value.slice(0, owner.getSplittedValue[index].length),
                        sub0 = sub.slice(0, 1),
                        rest = value.slice(owner.getSplittedValue[index].length);
                    switch (owner.datePattern[index]) {
                    case 'd':
                        if (sub === '00') {
                            sub = '01';
                        }
                        if(sub.length > 2) {
                            sub = sub.slice(0, 2);
                        }
                        if(rest.length > 0 && sub.length == 1) {
                            if (sub === '0' && parseInt(owner.lastInputValue[index],10) > 3) {
                                sub = '00';
                                oProp.setStartMarker = oProp.blockRanges[index][0];
                                oProp.setEndMarker = oProp.blockRanges[index][1];
                                markSet = true;
                            } else if(owner.lastInputValue[index] != "01" && owner.lastInputValue[index] != "02" && owner.lastInputValue[index] != "03" || oProp.focusChanged) {
                                sub = '0' + sub;
                                sub0 = sub.slice(0, 1);
                                try {
                                    if(parseInt(sub, 10) > 3 || owner.lastInputValue[index] == "00" && sub != "00") {
                                        oProp.setStartMarker = oProp.blockRanges[index+1][0];
                                        oProp.setEndMarker = oProp.blockRanges[index+1][1];
                                        markSet = true;
                                    } else {
                                        oProp.setStartMarker = oProp.blockRanges[index][0];
                                        oProp.setEndMarker = oProp.blockRanges[index][1];
                                        markSet = true;
                                    }
                                } catch (error) {}
                                oProp.focusChanged = false;
                            } else {
                                sub = (owner.lastInputValue[index] + sub).slice(-length);
                                sub0 = sub.slice(0, 1);
                                try {
                                    oProp.setStartMarker = oProp.blockRanges[index+1][0];
                                    oProp.setEndMarker = oProp.blockRanges[index+1][1];
                                    markSet = true;
                                } catch (error) {}
                            }
                        } else if (sub != owner.lastInputValue[index] && (parseInt(sub0, 10) > 0 || owner.lastInputValue[index] == "00")) {
                            oProp.setStartMarker = oProp.blocksLength == index+1 ? oProp.blockRanges[index][1] : oProp.blockRanges[index+1][0];
                            oProp.setEndMarker = oProp.blocksLength == index+1 ? oProp.blockRanges[index][1] : oProp.blockRanges[index+1][1];
                            markSet = true;
                        }
                        if (parseInt(sub0, 10) > 3) {
                            sub = '0' + sub0;
                        } else if (parseInt(sub, 10) > 31) {
                            sub = '31';
                        }
                         /*else {
                            sub = lastInputValue[index] == "" ? ("00" + sub).slice(-2) : ("00" + lastInputValue[index] + sub).slice(-2);
                        }*/
                        break;
                    case 'm':
                        if (sub === '00') {
                            sub = '01';
                        }
                        if(sub.length > 2) {
                            sub = sub.slice(0, 2);
                        }
                        if(rest.length > 0 && sub.length == 1) {
                            if (sub === '0' && parseInt(owner.lastInputValue[index],10) > 1) {
                                sub = '00';
                                oProp.setStartMarker = oProp.blockRanges[index][0];
                                oProp.setEndMarker = oProp.blockRanges[index][1];
                                markSet = true;
                            }  else if(owner.lastInputValue[index] != "01" || oProp.focusChanged) {
                                sub = '0' + sub;
                                sub0 = sub.slice(0, 1);
                                if(parseInt(sub, 10) > 1 || owner.lastInputValue[index] == "00" && sub != "00") {
                                    oProp.setStartMarker = oProp.blockRanges[index+1][0];
                                    oProp.setEndMarker = oProp.blockRanges[index+1][1];
                                    markSet = true;
                                } else {
                                    oProp.setStartMarker = oProp.blockRanges[index][0];
                                    oProp.setEndMarker = oProp.blockRanges[index][1];
                                    markSet = true;
                                }
                                oProp.focusChanged = false;
                            } else {
                                sub = (owner.lastInputValue[index] + sub).slice(-length);
                                sub0 = sub.slice(0, 1);
                                try {
                                    oProp.setStartMarker = oProp.blockRanges[index+1][0];
                                    oProp.setEndMarker = oProp.blockRanges[index+1][1];
                                    markSet = true;
                                } catch (error) {}
                            }
                        } else if (sub != owner.lastInputValue[index]) {
                            oProp.setStartMarker = oProp.blocksLength == index+1 ? oProp.blockRanges[index][1] : oProp.blockRanges[index+1][0];
                            oProp.setEndMarker = oProp.blocksLength == index+1 ? oProp.blockRanges[index][1] : oProp.blockRanges[index+1][1];
                            markSet = true;
                        }
                        if (parseInt(sub0, 10) > 1) {
                            sub = '0' + sub0;
                        } else if (parseInt(sub, 10) > 12) {
                            sub = '12';
                        }
                        /* else {
                            sub = lastInputValue[index] == "" ? ("00" + sub).slice(-2) : ("00" + lastInputValue[index] + sub).slice(-2);
                        } */
                        break;

                    }
                    result += sub;

                    // aktualisiere verbleibenden string
                    value = rest;

                    if(owner.blocks.length == index+1 && sub.length != owner.blocks[index] && !markSet) {
                        oProp.setEndMarker = oProp.blockRanges[index][1];
                        oProp.setStartMarker = oProp.setEndMarker;
                    }
                }
            });
            return this.getFixedDateString(result);
        },
        getFixedDateString: function (value) {
            var owner = this, datePattern = owner.datePattern, date = [],
                dayIndex = 0, monthIndex = 0, yearIndex = 0,
                dayStartIndex = 0, monthStartIndex = 0, yearStartIndex = 0,
                day, month, year, fullYearDone = false;

            // mm-dd || dd-mm
            if (value.length === 4 && datePattern[0].toLowerCase() !== 'y' && datePattern[1].toLowerCase() !== 'y') {
                dayStartIndex = datePattern[0] === 'd' ? 0 : 2;
                monthStartIndex = 2 - dayStartIndex;
                day = parseInt(value.slice(dayStartIndex, dayStartIndex + 2), 10);
                month = parseInt(value.slice(monthStartIndex, monthStartIndex + 2), 10);
                date = this.getFixedDate(day, month, 0);
            }

            // yyyy-mm-dd || yyyy-dd-mm || mm-dd-yyyy || dd-mm-yyyy || dd-yyyy-mm || mm-yyyy-dd
            if (value.length === 8) {
                datePattern.forEach(function (type, index) {
                    switch (type) {
                    case 'd':
                        dayIndex = index;
                        break;
                    case 'm':
                        monthIndex = index;
                        break;
                    default:
                        yearIndex = index;
                        break;
                    }
                });

                yearStartIndex = yearIndex * 2;
                dayStartIndex = (dayIndex <= yearIndex) ? dayIndex * 2 : (dayIndex * 2 + 2);
                monthStartIndex = (monthIndex <= yearIndex) ? monthIndex * 2 : (monthIndex * 2 + 2);
                day = parseInt(value.slice(dayStartIndex, dayStartIndex + 2), 10);
                month = parseInt(value.slice(monthStartIndex, monthStartIndex + 2), 10);
                year = parseInt(value.slice(yearStartIndex, yearStartIndex + 4), 10);
                fullYearDone = value.slice(yearStartIndex, yearStartIndex + 4).length === 4;
                date = this.getFixedDate(day, month, year);
            }
            owner.date = date;
            return date.length === 0 ? value : datePattern.reduce(function (previous, current) {
                switch (current) {
                case 'd': return previous + owner.addLeadZero(date[0]);
                case 'm': return previous + owner.addLeadZero(date[1]);
                default: return previous + (fullYearDone ? owner.addLeadZeroForYear(date[2]) : '');
                }
            }, '');
        },
        getFixedDate: function (day, month, year) {
            day = Math.min(day, 31);
            month = Math.min(month, 12);
            year = parseInt((year || 0), 10);

            if ((month < 7 && month % 2 === 0) || (month > 8 && month % 2 === 1)) {
                day = Math.min(day, month === 2 ? (this.isLeapYear(year) ? 29 : 28) : 30);
            }
            return [day, month, year];
        },
        isLeapYear: function (year) {
            return ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0);
        },
        addLeadZero: function (number) {
            return (number < 10 ? '0' : '') + number;
        },
        addLeadZeroForYear: function (number) {
            return (number < 10 ? '000' : (number < 100 ? '00' : (number < 1000 ? '0' : ''))) + number;
        }
    }

    inputFormatter.Util = {
        strip: function (value, re) { return value.replace(re, ''); },
        getPostDelimiter: function (value, delimiter, delimiters) {
            // einzelnes Trennzeichen
            if (delimiters.length === 0) {
                return value.slice(-delimiter.length) === delimiter ? delimiter : '';
            }

            // mehrere Trennzeichen
            var matchedDelimiter = '';
            delimiters.forEach(function (current) {
                if (value.slice(-current.length) === current) { matchedDelimiter = current; }
            });
            return matchedDelimiter;
        },
        getDelimiterRegexByDelimiter: function (delimiter) {
            return new RegExp(delimiter.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1'), 'g');
        },
        getNextCursorPosition: function (prevPos, oldValue, newValue, delimiter, delimiters) {
            // Falls cursor am ende des values, setze ihn zurück; Neuer Value könnte zusätzliche Charakter enthalten
            if (oldValue.length === prevPos) { return newValue.length; }
            return prevPos + this.getPositionOffset(prevPos, oldValue, newValue, delimiter ,delimiters);
        },
        getPositionOffset: function (prevPos, oldValue, newValue, delimiter, delimiters) {
            var oldRawValue, newRawValue, lengthOffset;
            oldRawValue = this.cutDelimiters(oldValue.slice(0, prevPos), delimiter, delimiters);
            newRawValue = this.cutDelimiters(newValue.slice(0, prevPos), delimiter, delimiters);
            lengthOffset = oldRawValue.length - newRawValue.length;
            return (lengthOffset !== 0) ? (lengthOffset / Math.abs(lengthOffset)) : 0;
        },
        cutDelimiters: function (value, delimiter, delimiters) {
            var owner = this;

            // einzelnes Trennzeichen
            if (delimiters.length === 0) {
                var delimiterRE = delimiter ? owner.getDelimiterRegexByDelimiter(delimiter) : '';
                return value.replace(delimiterRE, '');
            }

            // mehrere Trennzeichen
            delimiters.forEach(function (current) {
                current.split('').forEach(function (letter) {
                    value = value.replace(owner.getDelimiterRegexByDelimiter(letter), '');
                });
            });
            return value;
        },
        headStr: function (str, length) {
            return str.slice(0, length);
        },
        getMaxLength: function (blocks) {
            return blocks.reduce(function (previous, current) { return previous + current; }, 0);
        },
        getFormattedValue: function (value, blocks, blocksLength, delimiter, delimiters, delimiterLazyShow) {
            var result = '',
                multipleDelimiters = delimiters.length > 0,
                currentDelimiter;

            // falls keine Optionen, gib einfach value zurück
            if (blocksLength === 0) { return value; }

            blocks.forEach(function (length, index) {
                if (value.length > 0) {
                    var sub = value.slice(0, length),
                        rest = value.slice(length);

                    if (multipleDelimiters) {
                        currentDelimiter = delimiters[delimiterLazyShow ? (index - 1) : index] || currentDelimiter;
                    } else {
                        currentDelimiter = delimiter;
                    }

                    if (delimiterLazyShow) {
                        if (index > 0) { result += currentDelimiter; }
                        result += sub;
                    } else {
                        result += sub;
                        if (sub.length === length && index < blocksLength - 1) { result += currentDelimiter; }
                    }
                    // String aktualisieren
                    value = rest;
                }
            });
            return result;
        },
        setSelection: function (element, position, doc) {
            if (element !== this.getActiveElement(doc)) { return; }

            // Falls cursor bereits am Ende
            if (element && element.value.length <= position) { return; }

            if (element.createTextRange) {
                var range = element.createTextRange();
                range.move('character', position);
                range.select();
            } else {
                try {
                    element.setSelectionRange(position, position);
                } catch (e) {
                    console.warn('Markieren wird vom input element nicht unterstützt');
                }
            }
        },
        getActiveElement: function(parent) {
            var activeElement = parent.activeElement;
            if (activeElement && activeElement.shadowRoot) {
                return this.getActiveElement(activeElement.shadowRoot);
            }
            return activeElement;
        },
        isAndroid: function () {
            return navigator && /android/i.test(navigator.userAgent);
        },
        // Für Android chrome, keyup und keydown events geben leider immer key code 229 zurück bei Tastendruck
        isAndroidBackspace: function (lastInputValue, currentInputValue) {
            if (!this.isAndroid() || !lastInputValue || !currentInputValue) { return false; }
            return currentInputValue === lastInputValue.slice(0, -1);
        }
    }

    inputFormatter.DefaultProperties = {
        assign: function (target, opts) {
            target = target || {};
            opts = opts || {};

            // datum
            target.date = !!opts.date;
            target.datePattern = opts.datePattern || ['d', 'm', 'Y'];
            target.dateFormatter = {};

            // andere
            target.numericOnly = false;//target.date || !!opts.numericOnly;
            target.uppercase = !!opts.uppercase;
            target.lowercase = !!opts.lowercase;
            target.copyDelimiter = !!opts.copyDelimiter;
            target.initValue = (opts.initValue !== undefined && opts.initValue !== null) ? opts.initValue.toString() : '';
            target.delimiter = (opts.delimiter || opts.delimiter === '') ? opts.delimiter : (opts.date ? '/' : ' ');
            target.delimiterLazyShow = !!opts.delimiterLazyShow;
            target.delimiters = opts.delimiters || [];
            target.blocks = opts.blocks || [];
            target.blocksLength = target.blocks.length;
            target.blockRanges = [];
            target.root = (typeof global === 'object' && global) ? global : window;
            target.document = opts.document || target.root.document;
            target.maxLength = 0;
            target.result = '';
            target.onValueChanged = opts.onValueChanged || (function () {});
            // marker for marking a group of days/month/years digits
            target.setStartMarker;
            target.setEndMarker;
            // if focus changes, e.g. to correct somthing, the whole day/month/year should be replaced
            target.focusChanged = false;

            return target;
        }
    }

    function initDateFormatting(input) {
        var curVar = {},
            datasetSplit = input.dataset.inputFormatter.split(";");
        if(datasetSplit[0] == "date") {
            curVar.i = new inputFormatter(input, {
                delimiter: datasetSplit[2],
                date: true,
                datePattern: datasetSplit[1].split(",")
            });
        }
        if(datasetSplit[0] == "block") {
            curVar.i = new inputFormatter(input, {
                delimiter: datasetSplit[2],
                blocks: datasetSplit[1].split(",").map(Number)
            });
        }
    }

    document.addEventListener("DOMContentLoaded", function(){
        var curInputElements = document.querySelectorAll("[data-input-formatter]");
    
        for(var i=0; curInputElements.length > i; i++) {
            curInputElements[i].addEventListener("focus", initDateFormatting(curInputElements[i]));
        }
    });
})();/**
 * Original Functional Requirement
 * - For the germany there should be a constraint for post-code which has exact 5 digits
 * - for any other country there should be no constraint for post-code
 *
 * Technical Analyse
 * - Precondition: all element IDs are reserved for D&P FD
 * - Precondition: only the input field of post-code is in the scope
 * - For Select Element:
 *  - attribute `data-check-validity='#idOfPostcodeField'` in select element  has two purposes a) identify the field of post code; b) add/remove its error message
 * - For Option Element:
 *  - for all options of country there should be a two-letter country code in form of `data-iso-country-code="xx"` (need to be done by server-side)
 *  - all necessary front-end validations regarding to the chosen country are stored in an object
 *  - frontend validation will be navigated and updated by a javascript handler
 */
(function() {
    var countryCodes = {
        "_default": {
            "minlength": undefined,
            "maxlength": undefined,
            "pattern": undefined
        },
        "de": {
            "minlength": 5,
            "maxlength": 5,
            "pattern": "[0-9]*"
        }
    },
    // integrate or remove constraints in to element regarding the country code
    constraintHandler = function(el, field) {
        var cCode = el.getAttribute('data-iso-country-code') || '';
        if (cCode && countryCodes[cCode]) {
            // integrate constraints
            for (var prop in countryCodes[cCode]) {
                field.setAttribute(prop, countryCodes[cCode][prop]);
            }
            field.reportValidity ? field.reportValidity() : field.checkValidity && field.checkValidity();
        } else {
            // remove constraints
            for (var prop in countryCodes._default) {
                field.removeAttribute(prop);
            }
            // add or remove error message for the field of post code
            removeMessage(field);
        }

    },
    removeMessage = function(field) {
        var message = document.getElementById(field.id + '-error');
        message && message.parentNode.removeChild(message);
        field.removeAttribute('aria-invalid');
        var container = field;
        while (container && container !== field.form) {
            container.className = container.className.replace(/(^|\s)error\b/g, '');
            container = container.parentNode;
        }
        var val = document.createEvent('CustomEvent');
        val.initCustomEvent('validation.errormessage.removed', true, true, {});
        field.dispatchEvent(val);
    },
    geoHandler = function(ev) {
        if (!ev || !ev.target || !/^select$/i.test(ev.target.nodeName) || !ev.target.getAttribute('data-check-validity')) { return; }
        var target = ev.target,
            // collect inputs to get ready for manipulating the constraints
            field = document.querySelector(target.getAttribute('data-check-validity'));
        // update constraints based on selected option
        constraintHandler(target.options[target.selectedIndex], field);
    };
    document.addEventListener('change', geoHandler);
})();(function() {
    var lastMatch = window.matchMedia('screen and (min-width: 980px)').matches,
        lastFocus = false,
        toggle = /(?:^|\s)(toggle-\w+)\b/g,
        focus = /(^|\s)form-focus\b/g;
    resizeHandler = function() {
        var currentMatch = window.matchMedia('screen and (min-width: 980px)').matches;
        if (currentMatch && !lastMatch && toggle.test(document.body.className)) {
            toggle.lastIndex = 0;
            document.body.className.replace(toggle, function(_, name) {
                if (!name) { return; }
                var click = document.createEvent('Event');
                click.initEvent('click', true, true, {});
                document.querySelector('[data-toggle-nodes*="' + name + '"]').dispatchEvent(click);
            });
        }
        lastMatch = currentMatch;
    },
    focusHandler = function(ev) {
        if (ev.target !== lastFocus) {
            lastFocus = ev.target;
            document.body.className = document.body.className.replace(focus, '') + (ev.target.form ? ' form-focus' : '');
        }
    };
    window.addEventListener('resize', resizeHandler);
    window.addEventListener('click', focusHandler);
    window.addEventListener('keyup', focusHandler);
})();
/* js-code for snippet 'component=hero type=video size=l' */
/* on mobile devices the video will played on the mobile-video viewer */
(function() {
    var linkHandler = function(ev) {
        if (ev.type == 'keypress' && ev.which !== 13) { return; }
        if (!ev.target) { return; }
        var node = ev.target;
        while (node && node.nodeName !== 'A') {
            node = node.parentNode;
        }
        var newWindow = false,
            regex = /\bnew-window\b/,
            testNode = node;
        while (!newWindow && testNode && testNode !== document) {
            if (testNode.className.match(regex)) { newWindow = true; }
            testNode = testNode.parentNode;
        }
        if (newWindow) {
            if (node.blur) { node.blur(); }
            if (/((like mac os)|android ([23]|4\.[0-4]))/i.test(navigator.userAgent)) {
                var text = document.createTextNode('');
                node.parentNode.replaceChild(text, node);
                window.setTimeout(function() { text.parentNode.replaceChild(node, text); }, 1);
            }
        }
    }
    document.addEventListener('click', linkHandler, false);
    document.addEventListener('keypress', linkHandler, false);
})();

/* on mobile devices the video will played on the mobile-video viewer */
(function() {
    if (/iphone|ip[ao]d|android|windows phone/i.test(navigator.userAgent)) {
        // prefer data-mobile-video-link to href in mobile devices
        var linkHandler = function(ev) {
            var videolink,
                node = ev.target;
            while (node && (!node.getAttribute || !(videolink = node.getAttribute('data-mobile-video-link')))) {
                node = node.parentNode;
            }
            if (videolink) {
                ev.preventDefault();
                //location.href = videolink; öffent nicht im neuen TAB bei IOs, deshalb:
                window.open(videolink, "videolayer");
            }
        };
        document.addEventListener('click', linkHandler, false)
    }
})();
Paging = {
    defaults: {
        start: 1,
        pos: 1,
        end: Infinity,
        l: 7,
        m: 5,
        s: 3,
        data: {}
    },
    getPages: function(pos, start, end, items) {
        var lim = Math.floor(items / 2),
            first = pos - lim,
            last = pos + lim - (1 - items & 1),
            fshift = last >= end ? end - last : 0,
            lshift = first < start ? start - first : 0;
        return {
            begin: Math.max(first + fshift, start),
            end: Math.min(last + lshift, end)
        };
    },
    getData: function(opts) {
        opts = opts || {};
        for (var key in this.defaults) {
            if (this.defaults.hasOwnProperty(key) && !opts.hasOwnProperty(key)) {
                opts[key] = this.defaults[key];
            }
        }
        var pages = {},
            sizes = ['l', 'm', 's'],
            data = { items: [], start: opts.pos === opts.start, end: opts.pos === opts.end, js: true };
        for (var size, s = sizes.length; s--;) {
            size = sizes[s];
            pages[size] = this.getPages(opts.pos, opts.start, opts.end, opts[size]);
        }
        for (var page = pages.l.begin; page <= pages.l.end; page++) {
            var pg = (opts.showStart && page === pages.l.begin)
                   ? opts.start
                   : (opts.showEnd && page === pages.l.end && opts.end < Infinity)
                   ? opts.end
                   : page,
                item = { page: pg },
                sizes = (page < pages.s.begin || page > pages.s.end ? 's-0' : '') +
                        (page < pages.m.begin || page > pages.m.end ? ' m-0' : '');
            opts.data.page = pg;
            var url = window.Mustache ? Mustache.render(opts.url, opts.data) : opts.url + pg;
            sizes && (item.sizes = sizes);
            url && (item.url = url);
            (pg === opts.pos) && (item.active = true);
            data.items.push(item);
        }
        return data;
    }
};
(function() {
    function loadHandler(ev) {
        var inputs = (ev.target === window ? document : ev.target).querySelectorAll('input[type="search"]');
        for (var i=0, l=inputs.length; i<l; i++) {
            var input = inputs[i];
            var value = input.value;
            input.value = '';
            input.removeAttribute('value');
            input.setAttribute('value', '');
            input.parentNode.appendChild(document.createTextNode(''));
            input.parentNode.insertBefore(input.nextSibling, input);
            input.value = value;
        }
    }
    window.addEventListener('load', loadHandler);
    document.addEventListener('lazyload.done', loadHandler);
})();
(function(){
    var tables = document.getElementsByTagName('table');
    if (!tables.length || !document.querySelectorAll) {return;}
    for (var t = 0; t < tables.length; t++) {
        var data = [];
        var ths = tables[t].querySelectorAll('thead tr:first-child th');
        for (var h = 0; h < ths.length; h++) {
            data.push(ths[h].innerText || ths[h].textContent);
        }
        var trs = tables[t].querySelectorAll('tbody > tr');
        for (var r = 0; r < trs.length; r++) {
            var tds = trs[r].querySelectorAll('td, th');
            for (var d = 0; d < tds.length; d++) {
                tds[d].setAttribute('data-table-headline', data[d % data.length]);
            }
        }
    }
    var openHandler = function(evt) {
        evt = evt || window.evt;
        var rowgroup = evt.target || evt.srcElement;
        if (!rowgroup) { return; }
        while (/^t/i.test(rowgroup.parentNode.nodeName) && rowgroup.getAttribute('scope') !== 'rowgroup') {
            rowgroup = rowgroup.parentNode;
        }
        if (!rowgroup || rowgroup.getAttribute('scope') !== 'rowgroup') { return; }
        for (var tbody = evt.target || evt.srcElement; !/t?(body|head)/i.test(tbody.nodeName); tbody = tbody.parentNode);
        var sans = tbody.className.replace(/(^|\s)collapsed\b/g, '');
        if (evt.type === 'keyup') {
            if (evt.keyCode === 13 || evt.keyCode === 32) { tbody.className = tbody.className === sans ? tbody.className + ' collapsed' : sans; }
            else if (evt.keyCode === 38) { tbody.className += ' collapsed'; }
            else if (evt.keyCode === 40) { tbody.className = sans; }
        } else {
            tbody.className = tbody.className === sans ? tbody.className + ' collapsed' : sans;
        }
        if (typeof evt.preventDefault === 'function') {
            evt.preventDefault();
        }
        return false;
    }
    if (!document.addEventListener) {
        document.attachEvent('onclick', openHandler);
        document.attachEvent('onkeyup', openHandler);
    } else {
        document.addEventListener('click', openHandler);
        document.addEventListener('keyup', openHandler);
    }
})();
(function () {
    resetHandler = function (ev) {
        var target = ev.target || ev.srcElement;
        if (!ev || !target || !target.getAttribute) {
            return;
        }
        if (ev.type === 'click') {
            if  (target &&
                (target.form && target.type === 'reset') ||
                (target.parentElement && target.parentElement.form && target.parentElement.type === 'reset')) {
                var _target = target;
                if(target.parentElement.type === 'reset') {
                    _target = target.parentElement;
                }

                var searchformInputFields = document.getElementsByName(_target.previousElementSibling.name);

                for(var i = 0; i < searchformInputFields.length; i++) {
                    (function () {
                        var _searchform = searchformInputFields[i];
                        window.setTimeout(function () {
                            var x = document.createTextNode('');
                            _searchform.parentNode.replaceChild(x, _searchform);
                            x.parentNode.replaceChild(_searchform, x);
                            _searchform.value = "";
                            _searchform.removeAttribute('value');

                            var form = closest(_searchform, 'form');
                            form.reset();
                        }, 17);
                    })();
                }
            }
        } else if (target.type === 'search' && (ev.type === 'keydown' || ev.type === 'keypress') && target.form) {
            var resetButton = target.parentNode.querySelector('button[type="reset"]');
            window.setTimeout(function () {
                var x = document.createTextNode('');
                resetButton.parentNode.replaceChild(x, resetButton);
                x.parentNode.replaceChild(resetButton, x);
            }, 17);
        } else if (target.type === 'search' && ev.type === 'keyup' && target.form) {
            var searchformInputFields = document.getElementsByName(target.name);

            for (var i = 0; i < searchformInputFields.length; i++) {
                if (searchformInputFields[i] !== target) {
                    searchformInputFields[i].value = target.value;
                }
            }
        }
    };


    function closest(el, selector) {
        var matchesFn;
        // find vendor prefix
        ['matches', 'webkitMatchesSelector', 'mozMatchesSelector', 'msMatchesSelector', 'oMatchesSelector'].some(function (fn) {
            if (typeof document.body[fn] == 'function') {
                matchesFn = fn;
                return true;
            }
            return false;
        })

        var parent;
        // traverse parents
        while (el) {
            parent = el.parentElement;
            if (parent && parent[matchesFn](selector)) {
                return parent;
            }
            el = parent;
        }
        return null;
    }

    // set up events
    document.addEventListener('click', resetHandler);
    document.addEventListener('keydown', resetHandler);
    document.addEventListener('keypress', resetHandler);
    document.addEventListener('keyup', resetHandler);
})();

var CAT_MODULES_VERSIONS = CAT_MODULES_VERSIONS || {"project":"products - 4.2.0","catModules":[{"akkordeon":"1.6.0"},{"backdrop":"1.1.5"},{"button":"2.1.3"},{"carousel":"2.1.2"},{"font":"3.1.0"},{"footer":"1.2.2"},{"form":"1.8.2"},{"freehtml":"1.0.2"},{"grid":"3.0.1"},{"header":"3.0.2"},{"headline":"1.2.0"},{"hero":"2.3.6"},{"list":"2.0.2"},{"markdown":"1.1.1"},{"message":"2.1.2"},{"navigation":"4.0.0"},{"page":"2.1.3"},{"paging":"1.5.0"},{"paragraph":"1.1.1"},{"popup":"1.0.1"},{"searchform":"1.4.1"},{"section":"1.1.1"},{"showhidetoggle":"1.0.4"},{"spoiler":"4.0.4"},{"table":"1.1.1"},{"teaser":"3.3.0"},{"theme":"6.0.0"},{"video":"1.0.2"},{"vspace":"1.0.1"},{"wrapper":"1.0.1"},{"icon":"(LOCAL)"},{"image":"(LOCAL)"},{"jquery":"(LOCAL)"}]};
