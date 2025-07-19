// ==UserScript==
// @name         Imperium - Przełączenie Konta
// @namespace    https://github.com/imperium-366/tampermonkey-i-rpg/tree/main
// @version      1.0
// @description  Dodaje przycisk do przełączania konta dodatkowego
// @author       366
// @match        https://i-rpg.net/*
// @icon         https://cdn-icons-png.flaticon.com/32/9594/9594262.png
// @updateURL    https://raw.githubusercontent.com/imperium-366/tampermonkey-i-rpg/refs/heads/main/imperium-switch-account.user.js
// @downloadURL  https://raw.githubusercontent.com/imperium-366/tampermonkey-i-rpg/refs/heads/main/imperium-switch-account.user.js
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
