Array.from(document.querySelector(".strategy-card").children).forEach(
    (e, i) => {
        e.classList.add(`card-item-${i + 1}`, 'card-item');
        Array.from(e.children)[0].classList.add('item-icon')
        Array.from(e.children)[1].classList.add('item-content')
    }
);
