// ==UserScript==
// @name         United States Calendar
// @namespace    https://github.com/Rainman69/
// @version      1.0
// @description  Display United States date and time in AM/PM format at the bottom right corner of the site in Chrome browser.
// @author       Your Name
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var usDateDiv = document.createElement('div');
    usDateDiv.style.position = 'fixed';
    usDateDiv.style.bottom = '0';
    usDateDiv.style.right = '0';
    usDateDiv.style.width = '40%';
    usDateDiv.style.padding = '5px';
    usDateDiv.style.fontFamily = 'digital-7 (mono)';
    usDateDiv.style.fontSize = '12px';
    usDateDiv.style.textAlign = 'center';
    usDateDiv.style.zIndex = '9999';
    usDateDiv.style.textShadow = '0px -2px 4px rgba(0, 0, 0, 0.3)';
    usDateDiv.style.transition = 'opacity 0.5s ease-in-out';

    function convertToEnglishNumbers(input) {
        var persianNumbers = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g];
        var englishNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

        for (var i = 0; i < 10; i++) {
            input = input.replace(persianNumbers[i], englishNumbers[i]);
        }

        return input;
    }

    function formatTime(date) {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();
        var ampm = hours >= 12 ? 'PM' : 'AM';

        hours = hours % 12;
        hours = hours ? hours : 12; // Handle midnight (0 hours)

        var timeString = convertToEnglishNumbers(hours.toString().padStart(2, '0')) + ':' +
            convertToEnglishNumbers(minutes.toString().padStart(2, '0')) + ':' +
            convertToEnglishNumbers(seconds.toString().padStart(2, '0')) + ' ' + ampm;

        return timeString;
    }

    function updateTime() {
        var options = { timeZone: 'America/New_York', year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true };
        var usTime = new Date().toLocaleString('en-US', options);

        usDateDiv.textContent = 'United States: ' + usTime;
    }

    function handleScroll() {
        if (isScrolling) {
            clearTimeout(scrollingTimer);
        } else {
            usDateDiv.style.opacity = '0';
        }

        isScrolling = true;

        scrollingTimer = setTimeout(function() {
            isScrolling = false;
            usDateDiv.style.opacity = '1';
        }, 1000);
    }

    var isScrolling = false;
    var scrollingTimer;

    updateTime();

    window.addEventListener('scroll', handleScroll);

    document.body.appendChild(usDateDiv);

    // Update the time every second
    setInterval(updateTime, 1000);
})();
