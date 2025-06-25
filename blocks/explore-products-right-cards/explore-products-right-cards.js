/* eslint-disable */

export default function decorate() {
    var rightCards = document.querySelector(".explore-products-right-cards");
    Array.from(rightCards.children).forEach((e, i) => {
        e.classList.add("right-card", `right-card-${i + 1}`);
        Array.from(e.children).forEach((e, i) => {
            e.classList.add(`card-item-${i + 1}`);
        });
    });
};
