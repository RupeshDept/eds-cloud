/* eslint-disable */

const classNames = ["footer-top-left", "footer-top-right"];

const footerTop = document.querySelector(".footer-top").children;
Array.from(footerTop).forEach((e, i) => {
    e.classList.add(classNames[i], "footer-content");
    Array.from(e.children).forEach((e) => {
        e.classList.add("footer-list");
    });
});