document.querySelectorAll(".investment-philosophy-card").forEach((e, i) => {
    Array.from(e.children).forEach((e) => {
        e.classList.add('card-item');
        Array.from(e.children)[0].classList.add("item-icon");
        Array.from(e.children)[1].classList.add("item-content");
    });
});