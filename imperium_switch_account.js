// ==UserScript==
// @name         Imperium - Przełączenie Konta
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Dodaje przycisk do przełączania konta dodatkowego
// @author       366
// @match        https://i-rpg.net/*
// @icon         https://cdn-icons-png.flaticon.com/32/9594/9594262.png
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const menu = document.getElementById("nav");

    if (!menu) return;

    const ul = menu.getElementsByTagName("ul")[0];
    const liArray = Array.from(ul.getElementsByTagName("li"));

    const accountOption = liArray.find(li => {
        const link = li.querySelector('a');
        return link && link.getAttribute('href') === 'account.php';
    });

    if (!accountOption) return;

    const newLi = document.createElement('li');

    const newA = document.createElement('a');
    newA.href = 'account.php?view=switch_clone';
    newA.textContent = 'Przełącz konto';

    newLi.appendChild(newA);

    ul.insertBefore(newLi, accountOption);
})();
