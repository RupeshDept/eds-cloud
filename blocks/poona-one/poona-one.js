/* eslint-disable */
export default function decorate(block) {
    console.log("Poona One block loaded", block);

    const poonaOneLi = document.querySelectorAll('.poona-one li')
    poonaOneLi.forEach(function (item) {
        item.addEventListener('click', function () {
            // const poonaOneContent = document.querySelector('.poona-one-content');
            // poonaOneContent.innerHTML = item.innerHTML;
            item.classList.add('active');
        });
    })

}