import {a, button, div, input, label, span} from "../../scripts/dom-helpers.js"
export default function decorate(block){
    console.log(block);
    Array.from(block.children).forEach((el,index)=>{
        el.classList.add("newsitem"+(index+1))
        Array.from(el.children).forEach((subel)=>{
            subel.classList.add("newssubitem");
            Array.from(subel.children).forEach((innersubel,jindex)=>{
                innersubel.classList.add("newsinneritem"+(jindex+1));
            })
        })
    })

    let formContainer = div({class:"form-container"},
        div({class:"formwrapper"},
            div({class:"inputfield"},
                label(block.querySelector(".newsitem2 .newsinneritem1").textContent.trim()),
                input({
                    placeholder:"name@email.com",
                    onkeyup:(event)=>{
                        let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
                        if (!regex.test(event.target.value)) {
                            event.target.nextSibling.classList.remove("dsp-none");
                        }else{
                            if(!Array.from(event.target.nextSibling.classList).includes("dsp-none")){
                                event.target.nextSibling.classList.add("dsp-none")
                            }
                        }
                    }
                }),
                span({class:"error dsp-none"},"Enter Valid Email Address")
            ),
            div({class:"submitbtn"},
                button(a({href:block.querySelector(".newsitem2 .newsinneritem2 a").getAttribute("href")}),block.querySelector(".newsitem2 .newsinneritem2").textContent.trim())
            )
        )
    )
    block.querySelector(".newsitem2").innerHTML = "";
    block.querySelector(".newsitem2").append(formContainer);
}