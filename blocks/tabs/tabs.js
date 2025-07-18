/* eslint-disable */
// eslint-disable-next-line import/no-unresolved
import { toClassName } from '../../scripts/aem.js';
import dataCfObj from "../../scripts/dataCfObj.js";
import fundCardblock from "../fund-card/fund-card.js"
import {button,a} from "../../scripts/dom-helpers.js"
export default async function decorate(block) {
    // build tablist
    // console.log(dataCfObj);
    const tablist = document.createElement('div');
    tablist.className = 'tabs-list';
    tablist.setAttribute('role', 'tablist');

    // decorate tabs and tabpanels
    const tabs = [...block.children].map((child) => child.firstElementChild);
    tabs.forEach((tab, i) => {
        const id = toClassName(tab.textContent);

        // decorate tabpanel
        const tabpanel = block.children[i];
        tabpanel.className = 'tabs-panel';
        tabpanel.id = `tabpanel-${id}`;
        tabpanel.setAttribute('aria-hidden', !!i);
        tabpanel.setAttribute('aria-labelledby', `tab-${id}`);
        tabpanel.setAttribute('role', 'tabpanel');

        // build tab button
        const button = document.createElement('button');
        button.className = 'tabs-tab';
        button.id = `tab-${id}`;
        button.innerHTML = tab.innerHTML;
        button.setAttribute('aria-controls', `tabpanel-${id}`);
        button.setAttribute('aria-selected', !i);
        button.setAttribute('role', 'tab');
        button.setAttribute('type', 'button');
        button.addEventListener('click', () => {
            block.querySelectorAll('[role=tabpanel]').forEach((panel) => {
                panel.setAttribute('aria-hidden', true);
            });
            tablist.querySelectorAll('button').forEach((btn) => {
                btn.setAttribute('aria-selected', false);
            });
            tabpanel.setAttribute('aria-hidden', false);
            button.setAttribute('aria-selected', true);
        });
        tablist.append(button);
        tab.remove();
    });

    block.prepend(tablist);

    if (block.closest(".our-popular-funds")) {
        let dataCf = dataCfObj.slice(0,4);

        Array.from(tablist.children).forEach(element=>{
            element.addEventListener("click",(event)=>{
                block.querySelectorAll(".tabs-panel").forEach((el)=>{
                    el.style.display = "none";
                })

                if (event.currentTarget.getAttribute("aria-controls") === "tabpanel-trending-funds") {
                    dataCf = dataCfObj.slice(0,4)
                    
                }else if (event.currentTarget.getAttribute("aria-controls") === "tabpanel-most-searched-funds") {
                    dataCf = dataCfObj.map((elem)=>{
                        return [...elem.fundsTaggingSection].includes("motilal-oswal:active") ? elem : ""
                    })
                    dataCf = dataCf.filter((el)=> el)
                    dataCf = dataCf.slice(0,4)
                }else if (event.currentTarget.getAttribute("aria-controls") === "tabpanel-most-bought-funds") {
                    dataCf = dataCfObj.map((elem)=>{
                        return elem.fundCategorisation ==='Passive Funds' ? elem : ""
                    })
                    dataCf = dataCf.filter((el)=> el)
                    dataCf = dataCf.slice(0,4)
                }
                block.querySelector("#"+event.currentTarget.getAttribute("aria-controls")).innerHTML = ""
                dataCf.map((element)=>{
                    return block.querySelector("#"+event.currentTarget.getAttribute("aria-controls")).append(fundCardblock(element))
                });    
                block.querySelector("#"+event.currentTarget.getAttribute("aria-controls")).style.display = "flex"
            })
        })

        const wrapperTablist = document.createElement("div");
        wrapperTablist.classList.add("wrappertablist");
        wrapperTablist.append(block.querySelector(".tabs-list"))
        wrapperTablist.append(
            button({
                class:"btndesk"},a({
                href:block.closest('.section').querySelector(".button-container a").getAttribute("href")
            }),
            block.closest('.section').querySelector(".button-container a").textContent.trim())
        )
        block.closest('.section').querySelector(".button-container").classList.add("btnMob");
        let tabspanel = block.querySelectorAll(".tabs-panel");
        block.innerHTML = "";
        block.append(wrapperTablist);
        tabspanel.forEach((el)=>{
            block.append(el); 
        })
        tablist.children[0].click();
    }
    if (block.closest(".known-our-funds")) {    
        let dataCf = dataCfObj.slice(0,4);

        Array.from(tablist.children).forEach(element=>{
            element.addEventListener("click",(event)=>{
                block.querySelectorAll(".tabs-panel").forEach((el)=>{
                    el.style.display = "none";
                })

                if (event.currentTarget.getAttribute("aria-controls") === "tabpanel-trending-funds") {
                    dataCf = dataCfObj.slice(0,4)
                } else if (event.currentTarget.getAttribute("aria-controls") === "tabpanel-international-equity") {
                    dataCf = dataCfObj.map((elem)=>{
                        return [...elem.fundsTaggingSection].includes("motilal-oswal:international-equity") ? elem : ""
                    })
                    dataCf = dataCf.filter((el)=> el)
                    dataCf = dataCf.slice(0,4)
                }else if (event.currentTarget.getAttribute("aria-controls") === "tabpanel-hybrid-balanced") { //tabpanel-index 
                    dataCf = dataCfObj.map((elem)=>{
                        return [...elem.fundsTaggingSection].includes("motilal-oswal:hybrid-&-balanced") ? elem : ""
                    })
                    dataCf = dataCf.filter((el)=> el)
                    dataCf = dataCf.slice(0,4)
                }else if (event.currentTarget.getAttribute("aria-controls") === "tabpanel-index") {  
                    dataCf = dataCfObj.map((elem)=>{
                        return [...elem.fundsTaggingSection].includes("motilal-oswal:index-funds") ? elem : ""
                    })
                    dataCf = dataCf.filter((el)=> el)
                    dataCf = dataCf.slice(0,4)
                }else if (event.currentTarget.getAttribute("aria-controls") === "tabpanel-etfs") { 
                    dataCf = dataCfObj.map((elem)=>{
                        return [...elem.fundsTaggingSection].includes("motilal-oswal:etf") ? elem : ""
                    })
                    dataCf = dataCf.filter((el)=> el)
                    dataCf = dataCf.slice(0,4)
                }else if (event.currentTarget.getAttribute("aria-controls") === "tabpanel-others") {
                    dataCf = dataCfObj.map((elem)=>{
                        return elem.sebiSubCategory ==='Other ETF' ? elem : ""
                    })
                    dataCf = dataCf.filter((el)=> el)
                    dataCf = dataCf.slice(0,4)
                } 
                block.querySelector("#"+event.currentTarget.getAttribute("aria-controls")).innerHTML = ""
                dataCf.map((element)=>{
                    return block.querySelector("#"+event.currentTarget.getAttribute("aria-controls")).append(fundCardblock(element))
                });    
                block.querySelector("#"+event.currentTarget.getAttribute("aria-controls")).style.display = "flex"
            })
        })

        const wrapperTablist = document.createElement("div");
        wrapperTablist.classList.add("wrappertablist");
        wrapperTablist.append(block.querySelector(".tabs-list"))
        wrapperTablist.append(
            button({
                class:"btndesk"},a({
                href:block.closest('.section').querySelector(".button-container a").getAttribute("href"),
                class:"btndesk"
            }),
            block.closest('.section').querySelector(".button-container a").textContent.trim())
        )
        block.closest('.section').querySelector(".button-container").classList.add("btnMob");
        let tabspanel = block.querySelectorAll(".tabs-panel");
        block.innerHTML = "";
        block.append(wrapperTablist);
        tabspanel.forEach((el)=>{
            block.append(el); 
        })

        tablist.children[0].click();
    }
}