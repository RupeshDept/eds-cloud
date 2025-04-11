import myform from "../form/form.js"

export default function decorate(block) {
    const path = block.textContent.trim()
    document.querySelector('.pms-form a').textContent = ""
    console.log(path)
    myform(block, path)

}