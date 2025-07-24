import formBlock from "../form/form.js"
export default async function decorate(block) {
  console.log(block);
  Array.from(block.children).forEach((el, index) => {
    el.classList.add(`posteritem${index + 1}`);
    Array.from(el.children).forEach((subel) => {
      subel.classList.add('postersubitem');
      Array.from(subel.children).forEach((innersubel, jindex) => {
        innersubel.classList.add(`posterinneritem${jindex + 1}`);
      });
    });
  });
  await formBlock(block.querySelector(".posteritem1 .posterinneritem1"));
  let divWrapper = document.createElement("div");
  divWrapper.classList.add("input-btn")
  Array.from(block.querySelector("form").children).forEach((el, index) => {
    if (index !== 0) {
      divWrapper.append(el)
    }
    if (index === 1) {
      let divWrapperclose = document.createElement("div");
      divWrapperclose.classList.add("closebtninput")
      el.querySelector("fieldset").append(divWrapperclose)
    }
  })
  block.querySelector("form").append(divWrapper)
}