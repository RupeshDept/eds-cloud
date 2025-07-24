import formBlock from "../form/form.js"
export default function decorate(block) {
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
  formBlock(block.querySelector(".posteritem1 .posterinneritem1"));

}