// ==UserScript==
// @name         Bangumi Thickbox Counter
// @namespace    https://github.com/bangumi/scripts/tree/master/inchei
// @version      0.2
// @description  Counting the rest number of your words in thickbox
// @icon         https://bgm.tv/img/favicon.ico
// @author       inchei
// @include      /^https?://(bangumi\.tv|bgm\.tv|chii\.in)/.*
// @grant        none
// ==/UserScript==

(function() {
    let winHrefKey = new RegExp("^https?://((bgm|bangumi).tv|chii.in)/subject/*");
    let TB = document.querySelectorAll(".thickbox");

    function main(textarea, tip) {
        var restNum = 200 - textarea.value.length;
        if (restNum >= 0) {
            tip.innerText = "吐槽 (简评，剩余 " + restNum + " 字):";
        }
        else {
            tip.innerText = "吐槽 (简评，超出 " + -restNum + " 字):";
        }
    }

    for (var i=0; i<TB.length; i++) {
        TB[i].addEventListener("click", function() {
            var textarea;
            var tip;
            if(!winHrefKey.test(window.location.href)) {
            for (var i=0; i<1000; i++) {
                setTimeout(function() {
                    if (document.querySelector("#TB_iframeContent")) {
                        textarea = document.querySelector("#TB_iframeContent").contentWindow.document.querySelector("textarea#comment.quick");
                        tip = document.querySelector("#TB_iframeContent").contentWindow.document.querySelector("[for='comment']");
                        textarea.onkeyup = function() {
                            var restNum = 200 - textarea.value.length;
                            main(textarea, tip);
                        }
                    }
                }, 500);
            }
        } else {
            textarea = document.querySelector("textarea#comment.quick");
            tip = document.querySelector("[for='comment']");
            textarea.onkeyup = function() {
                main(textarea, tip);
            }
        }
        });
    }
})();