export default function decorate(block) {
    block.querySelector(".home-banner div").classList.add("sub-home-banner");
    block.querySelectorAll('.sub-home-banner div').forEach((ele,i)=>{
        ele.classList.add(`sub-banner-item-${i+1}`)
    })
}