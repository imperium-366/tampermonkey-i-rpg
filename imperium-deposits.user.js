// ==UserScript==
// @name         Imperium - Depozyty
// @namespace    https://github.com/imperium-366/tampermonkey-i-rpg
// @version      1.0
// @description  Dodaje przycisk do odłożenia 75% złota z ręki do skarbca albo 100% złota z ręki do gildi.
// @author       366
// @match        https://i-rpg.net/*
// @icon         https://cdn-icons-png.flaticon.com/32/9594/9594262.png
// @updateURL    https://raw.githubusercontent.com/imperium-366/tampermonkey-i-rpg/refs/heads/main/imperium-deposits.user.js
// @downloadURL  https://raw.githubusercontent.com/imperium-366/tampermonkey-i-rpg/refs/heads/main/imperium-deposits.user.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const goldOnHand = document.getElementsByClassName("numer gold")[0];

    function getGoldOnHand() {
        return parseInt(goldOnHand.textContent);
    }

    function newDepositBankForm() {
        const form = document.createElement("form");
        form.setAttribute("method", "post");
        form.setAttribute("action", "/bank.php?action=deposit");

        const number = document.createElement("input");
        number.setAttribute("type", "number");
        number.setAttribute("name", "dep");
        number.setAttribute("value", Math.floor(getGoldOnHand() * 0.75));
        number.setAttribute("hidden", "hidden");

        const submit = document.createElement("input");
        submit.setAttribute("type", "submit");
        submit.setAttribute("value", "Bank");

        form.append(number);
        form.append(submit);

        return form;
    }

    function newDepositLoanBankForm() {
        const form = document.createElement("form");
        form.setAttribute("method", "post");
        form.setAttribute("action", "/bank.php?action=loan");

        const number = document.createElement("input");
        number.setAttribute("class", "bank bigmoney");
        number.setAttribute("type", "number");
        number.setAttribute("min", "0");
        number.setAttribute("name", "repay");
        number.setAttribute("value", Math.floor(getGoldOnHand()));
        number.setAttribute("hidden", "hidden");

        const submit = document.createElement("input");
        submit.setAttribute("type", "submit");
        submit.setAttribute("value", "Pożyczka");

        form.append(number);
        form.append(submit);

        return form;
    }

    function newDepositGuildForm() {
        const form = document.createElement("form");
        form.setAttribute("method", "POST");
        form.setAttribute("action", "guilds.php?op=viewmy&chamber=strongroom&a=dep");

        const amount = document.createElement("input");
        amount.setAttribute("type", "number");
        amount.setAttribute("name", "amount");
        amount.setAttribute("value", getGoldOnHand());
        amount.setAttribute("hidden", "hidden");

        const rich = document.createElement("select");
        rich.setAttribute("name", "rich");
        rich.setAttribute("hidden", "hidden");

        const credits = document.createElement("option");
        credits.setAttribute("value", "credits");
        credits.textContent = "Złota";

        rich.append(credits);

        const submit = document.createElement("input");
        submit.setAttribute("type", "submit");
        submit.setAttribute("value", "Gildia");

        form.append(amount);
        form.append(rich);
        form.append(submit);

        return form;
    }

    if (document.querySelectorAll("a[href='guilds.php?op=viewmy&chamber=main']").length > 0) {
        goldOnHand.parentElement.after(newDepositGuildForm());
    }

    if (document.querySelectorAll("a[href='bank.php']").length > 0) {
        goldOnHand.parentElement.after(newDepositLoanBankForm());
        goldOnHand.parentElement.after(newDepositBankForm());
    }
})();
