(function() {
    'use strict';

    var subscribeDropDown;
    var isDropDownOpened = false;
    
    var failsafeTimeout;
    var intervalButton;
    var intervalDropDown;

    function init() {
        intervalDropDown = window.setInterval(function() {
            subscribeDropDown = document.body.querySelector('.tw-button[data-a-target="subscribe-button"]');
            if(subscribeDropDown) {
                clearInterval(intervalDropDown);
                forceClick();
            }
        }, 100);

        //Stop the process after 10 seconds.
        failsafeTimeout = window.setTimeout(function() {
            clearInterval(intervalDropDown);
            clearInterval(intervalButton);
            resetWebsiteToNormal();
        }, 10000);
    }

    function forceClick() {
        var forceClickStyles = document.createElement("style");
        forceClickStyles.setAttribute('type', 'text/css');
        forceClickStyles.setAttribute('id', 'forceClickStyles');
        forceClickStyles.textContent = ".tw-balloon{display: none !important;}";
        document.body.appendChild(forceClickStyles);

        subscribeDropDown.click();
        isDropDownOpened = true;

        window.setTimeout(function(){
            resetWebsiteToNormal();
        }, 100);

        intervalButton = window.setInterval(function() {
            var subscribeButton = document.body.querySelector('.tw-button[data-a-target="subscribe-with-prime-button"]');
            if(subscribeButton) { 
                if(!subscribeButton.disabled && subscribeButton.tagName.toLowerCase() === "button") {
                    subscribeDropDown.setAttribute("style", "background:#ff7c08");
                }
                clearInterval(intervalButton);
                clearTimeout(failsafeTimeout);
            }
        }, 100);
    }

    function resetWebsiteToNormal() {
        if(isDropDownOpened) {
            subscribeDropDown.click();
            isDropDownOpened = false;
        }
        document.body.removeChild(document.body.querySelector("#forceClickStyles"));
    }

    init();
})(); 