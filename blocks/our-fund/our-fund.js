/* eslint-disable */

import {
    div, label, input, span, ul, li, button, a, img, select, option, h3, p, strong, br, text, h4
} from "../../scripts/dom-helpers.js"
import { dataObj } from "./dataObj.js"
import { dataObjAllFundBoost } from "./dataObjAllFundBoost.js"
import {dataCfObj} from "./dataCfObj.js"

export default async function decorate(block) {
    let dataMapObj = {}
    dataMapObj['data'] = dataFilterfun(dataCfObj)

    Array.from(block.children).forEach((element, index) => {
        element.classList.add("inner" + (index + 1))
        Array.from(element.children).forEach((elementer, indexer) => {
            elementer.classList.add("inner" + (index + 1) + "-container" + (indexer + 1))
        })
    })

    const leftContainer = div({
        class: "left-container"
    },
        label("Investment Method"),
        div({
            class: "radio-button-container"
        },
            label(
                input({
                    type: "radio",
                    value: "Direct",
                    cheked: "true",
                    onclick: function (ele) {
                        document.querySelector("input[value='Regular']").checked = false
                        rightBottomcardRender(block,dataCfObj,dataMapObj)
                    },
                    checked: true
                }), "Direct"
            ),
            label(
                input({
                    type: "radio",
                    value: "Regular",
                    onclick: function (ele) {
                        document.querySelector("input[value='Direct']").checked = false
                        rightBottomcardRender(block,dataCfObj,dataMapObj)
                    }
                }), "Regular"
            )
        ),
        div({
            class: "FundCategory-container"
        },
            div({
                class: "title-container"
            },
                label("Fund Category"),
                label("Clear")
            ),
            div({
                class: "filter-container"
            },
                ...dataMapObj.data.fundCategory.map((element, index) => {
                    if (capitalizeEachWord(Object.keys(element)[0].replaceAll("-"," ")) === "Indian Equity") {
                        dataMapObj[index + "ArrayDoc"] = div({
                            class: "Indian-Equity-container"
                        },
                            ...dataMapObj.data.fundCategory[dataMapObj.data.fundCategory.length-1]["indianEquitySub"].map((elme, ind) => {
                                let sublabel = Object.keys(elme)[0].split("-")[1].trim(); 
                                return label({
                                    class: "checkbox-label-container"
                                },
                                    span({
                                        class: "square-shape"
                                    },
                                        input({
                                            class: "categorey-direct",
                                            type: "checkbox",
                                            dataattr: elme[Object.keys(elme)].join("-"),
                                            onclick: function (ele) {
                                               let tempSchCode =[]
                                                document.querySelectorAll(".innerIndianEquity .categorey-direct").forEach((el)=>{
                                                    if (el.checked) {
                                                        tempSchCode.push(el.getAttribute('dataattr').split("-"))
                                                    }
                                                })
                                                tempSchCode = tempSchCode.flat(2)
                                                let tempScheme = dataCfObj.filter((item)=>{
                                                        if(tempSchCode.includes(item.schcode)){
                                                            return item
                                                        }
                                                    })
                                                   //Search Input
                                                    Array.from(block.querySelector(".searchBarContainer .searchModal ul").children).forEach((elre)=>{
                                                        elre.style.display="none"
                                                        if (tempSchCode.includes(elre.getAttribute("dataattr"))) {
                                                            elre.style.display="block"
                                                        }
                                                    }) 
                                                rightBottomcardRender(block,tempScheme,dataMapObj)
                                            }
                                        })
                                    ),
                                    span(sublabel)
                                )
                            })
                        )
                    }
                    return Object.keys(element)[0] !== 'indianEquitySub'?  label({
                        class: "checkbox-label-container"
                    },
                        span({
                            class: "square-shape"
                        },
                            input({
                                class: "categorey-direct",
                                type: "checkbox",
                                dataattr: element[Object.keys(element)[0]].join("-"),
                                onclick: function (ele) {
                                    let tempSchCode =[];
                                    Array.from(document.querySelector(".filter-container").children).forEach((el)=>{
                                        if (el.querySelector(".categorey-direct").checked) {
                                            if (el.querySelector(".innerIndianEquity")) {
                                               document.querySelectorAll(".innerIndianEquity .categorey-direct").forEach((elm)=>{
                                                    if(elm.checked){
                                                        tempSchCode.push(elm.getAttribute('dataattr').split("-"))
                                                    }
                                                })
                                                if (tempSchCode.length == 0) {
                                                    document.querySelectorAll(".innerIndianEquity .categorey-direct").forEach((elsm)=>{
                                                        elsm.checked =true;
                                                    })
                                                    tempSchCode.push(el.querySelector(".categorey-direct").getAttribute('dataattr').split("-"))        
                                                }
                                            }else{
                                                tempSchCode.push(el.querySelector(".categorey-direct").getAttribute('dataattr').split("-"))
                                            }   
                                        }else{
                                            if (el.querySelector(".innerIndianEquity")) {
                                               document.querySelectorAll(".innerIndianEquity .categorey-direct").forEach((elm)=>{
                                                    elm.checked =false;
                                                })  
                                            }
                                        }
                                    })    
                                    if (ele.target.checked) {
                                        ele.target.checked = true;
                                    }else{
                                        ele.target.checked =false;
                                    }
                                    //Cards
                                    tempSchCode = tempSchCode.flat(2)
                                    let tempScheme = dataCfObj.filter((item)=>{
                                        if(tempSchCode.includes(item.schcode)){
                                            return item
                                        }
                                    })
                                    //Search Input
                                     Array.from(block.querySelector(".searchBarContainer .searchModal ul").children).forEach((elre)=>{
                                        elre.style.display="none"
                                        if (tempSchCode.includes(elre.getAttribute("dataattr"))) {
                                            elre.style.display="block"
                                        }
                                     })
                                    rightBottomcardRender(block,tempScheme,dataMapObj)     
                                }
                            })
                        ),
                        span(capitalizeEachWord(Object.keys(element)[0].replaceAll("-"," ")) + "(" + element[Object.keys(element)[0]].length + ")"),
                        capitalizeEachWord(Object.keys(element)[0].replaceAll("-"," ")) === "Indian Equity" ? div({
                            class: "innerIndianEquity"
                        }, dataMapObj[index + "ArrayDoc"]) : ""
                    ) : ""
                })
            )
        ),
        div({
            class: "FundTye-container"
        },
            div({
                class: "title-container"
            },
                label("Fund Type"),
                label("Clear")
            ),
            div({
                class: "fund-container"
            },
                ...dataMapObj.data.fundType.map((element) => {
                    return label({
                        class: "checkbox-label-container"
                    },
                        span({
                            class: "square-shape"
                        },
                            input({
                                class: "categorey-direct",
                                type: "checkbox",
                                dataattr: element[Object.keys(element)[0]].join("-"),
                                onclick: function (ele) {
                                    console.log(ele.target.getAttribute("dataattr"));
                                    eventTriggerRending(dataObjAllFundBoost.data.data.data)
                                }
                            })
                        ),
                        span(capitalizeEachWord(Object.keys(element)[0].replaceAll("-"," ")) + "(" + element[Object.keys(element)[0]].length + ")"),
                    )
                })
            )
        )
    )

    const rightTopContianer = div({
        class: "rightTopContainer"
    },
        div({
            class: "searchBarContainer wrapper"
        },
            label("Search"),
            div({
                id: "tags",
                class: "inputContainer tag-container"
            },
                input({
                    type: "text",
                    id: "inputBox",
                    class: "searchField input-box",
                    placeholder: "Search Fund",
                    onfocus: () => {
                        block.querySelector(".searchModal").style.display = "block";
                    },
                    oninput: () => {
                        const inputBox = block.querySelector('#inputBox');
                        const dropdown = block.querySelector('#dropdown');
                        const tags = block.querySelector('#tags');

                        block.querySelector(".searchModal").style.display = "block";
                        const search = inputBox.value.toLowerCase();
                        const items = block.querySelectorAll('.dropdown-item');

                        items.forEach(item => {
                            const text = item.getAttribute('dataValue').toLowerCase();

                            // Only show if it matches search AND is not already selected (displayed as tag)
                            const isAlreadySelected = Array.from(tags.children).some(tag =>
                                tag.textContent.replace('×', '').trim().toLowerCase() === text
                            );

                            item.style.display = (!isAlreadySelected && text.includes(search)) ? 'block' : 'none';
                        });
                    },
                }),
                div({
                    id: "dropdown",
                    class: "searchModal",
                    style: "display:none"
                },
                    ul(
                        ...dataMapObj.data.schemeName.map((element) => {
                            return li({
                                class: "dropdown-item",
                                dataValue: element.schemeName,
                                dataattr:element.schcode,
                                onclick: ((event) => {
                                    const inputBox = block.querySelector('#inputBox');
                                    const dropdown = block.querySelector('#dropdown');
                                    const tags = block.querySelector('#tags');

                                    const value = event.target.getAttribute('dataValue');
                                    let submainContainerCard = block.querySelectorAll(".submain-container-bottom");
                                    // Hide selected item from dropdown
                                    event.target.style.display = 'none';
                                    dataMapObj.inputSelectArr.push(value);

                                    dataMapObj.inputSelectArr.forEach((elem, ind) => {
                                        submainContainerCard.forEach((item, index) => {
                                            if (item.querySelector(".planName").textContent.trim() == elem) {
                                                item.setAttribute("searchplane", "yes")
                                            }
                                        })
                                    })

                                    submainContainerCard.forEach((item, index) => {
                                        if (item.getAttribute("searchplane") == "yes") {
                                            item.style.display = "block"
                                        } else {
                                            item.style.display = "none"
                                        }
                                    })
                                    // Create a tag
                                    const tagsAppend = span({
                                        dataClose: value,
                                        onclick: ((event) => {
                                            event.currentTarget.parentElement.remove(); // Remove tag

                                            const items = dropdown.querySelectorAll('.dropdown-item');

                                            dataMapObj.inputSelectArr = dataMapObj.inputSelectArr.filter((ele, ind) => {
                                                return dataMapObj.inputSelectArr.indexOf(event.target.getAttribute("dataClose")) != ind
                                            })
                                            items.forEach(item => {
                                                if (item.getAttribute('dataValue') === event.currentTarget.getAttribute("dataClose")) {
                                                    item.style.display = 'block';
                                                }
                                            });
                                            if (dataMapObj.inputSelectArr.length != 0) {
                                                submainContainerCard.forEach((item, index) => {
                                                    if (item.querySelector(".planName").textContent.trim() == event.target.getAttribute("dataClose")) {
                                                        item.setAttribute("searchplane", "no")
                                                        item.style.display = "none"
                                                    }
                                                })
                                            } else {
                                                submainContainerCard.forEach((item, index) => {
                                                    item.style.display = "block"
                                                })
                                            }
                                            dropdown.style.display = 'none';
                                        })
                                    }, 'x');

                                    const tag = div({
                                        class: 'tag'
                                    },
                                        value,
                                        tagsAppend)

                                    tags.insertBefore(tag, inputBox);

                                    inputBox.value = '';
                                    dropdown.style.display = 'none';
                                })
                            }, element.schemeName)
                        })
                    )
                )
            )
        ),
        div({
            class: "dropDownField"
        },
            label("Sort Funds By"),
            div({
                class: "dropDownField-container"
            },
                div({
                    class: "container-box"
                },
                    input({
                        class: "seachBox",
                        placeholder: "Popular"
                    }),
                ),
                div({
                    class: "dropdown-modal"
                },
                    ul(
                        ...dataMapObj.data.sort[0].ListDropdown.map((e, index) => {
                            return li({
                                dataIndex: index,
                                dataattr:e.value,
                                onclick: (event) => {
                                    block.querySelectorAll(".inner2-container1 .dropdown-modal ul li").forEach((el) => {
                                        el.classList.remove("active");
                                    })
                                    event.target.classList.add("active");
                                    block.querySelector(".inner2-container1 .seachBox").value = event.target.textContent.trim()
                                    block.querySelector(".inner2-container1 .dropdown-modal").style.display = "none";
                                    let schemes = dataObj.data.data.sort[event.target.getAttribute("dataIndex")].schemes

                                }
                            }, e.text)
                        })
                    )
                )
            )
        )
    )

    block.querySelector(".inner1-container2").innerHTML = "";
    block.querySelector(".inner1-container2").append(leftContainer);
    block.querySelector(".inner2-container1").innerHTML = "";
    block.querySelector(".inner2-container1").innerHTML = "";
    const headerRightConyainer = h3({
        id: "our-funds"
    }, "Our Funds")
    block.querySelector(".inner2-container1").append(headerRightConyainer);
    block.querySelector(".inner2-container1").append(rightTopContianer);
    block.querySelector(".inner2-container1 .seachBox").addEventListener("focusin", (element) => {
        block.querySelector(".inner2-container1 .container-box").classList.add("active");
        block.querySelector(".dropdown-modal").style.display = element ? "block" : "none"
    })

    block.querySelector(".inner2-container1 .dropdown-modal").addEventListener("mouseover", () => {
        block.querySelector(".dropdown-modal").style.display = "block";
    });

    block.querySelector(".inner2-container1 .dropdown-modal").addEventListener("mouseleave", () => {
        block.querySelector(".dropdown-modal").style.display = "none";
    });
    rightBottomcardRender(block,dataCfObj,dataMapObj);

    // Invest Now Logic RM11
    function initInvestNowListeners() {
        const buttons = document.querySelectorAll('.invest-now-btn');

        buttons.forEach((btn) => {
            btn.addEventListener('click', (e) => {
                const card = e.target.closest('.fundCard');
                const fundName = card.querySelector('.planName a')?.textContent;
                const selectedOption = card.querySelector('.fundOption select')?.value;

                console.log('Clicked Invest Now for:', fundName, selectedOption);

                // Disable all other cards
                const allCards = document.querySelectorAll('.fundCard');
                allCards.forEach((c) => {
                    if (c !== card) c.classList.add('disable-Cart');
                    else c.classList.remove('disable-Cart');
                });

                investnowmodels(card);
            });
        });
    }
    initInvestNowListeners();

    let lastTab = 'lumpsum'; // persist last selected tab globally

    function investnowmodels(card) {
        let modal = card.querySelector('.fund-popup-modal');

        if (modal) {
            modal.classList.remove('hidden');

            // Restore last selected tab
            const tabBtns = modal.querySelectorAll('.tab-btn');
            const tabContents = modal.querySelectorAll('.tab-content');
            tabBtns.forEach((b) => b.classList.remove('active'));
            tabContents.forEach((tc) => tc.classList.remove('show'));

            modal.querySelector(`.tab-btn[data-tab="${lastTab}"]`)?.classList.add('active');
            modal.querySelector(`#${lastTab}`)?.classList.add('show');
            return;
        }

        // Create modal only once
        modal = div({ class: 'fund-popup-modal' });

        // Tabs
        const tabButtons = div({ class: 'fund-tabs' },
            button({ class: 'tab-btn active', 'data-tab': 'lumpsum' }, 'Lumpsum'),
            button({ class: 'tab-btn', 'data-tab': 'sip' }, 'SIP'),
            button({ class: 'close-popup' }, '×')
        );

        // Lumpsum
        const lumpsumForm = div({ class: 'tab-content show', id: 'lumpsum' },
            span({ class: 'form-label' }, 'ENTER YOUR INVESTMENT AMOUNT'),
            input({ type: 'number', placeholder: '₹ Enter Amount', class: 'input-amount' })
        );

        // SIP
        const sipForm = div({ class: 'tab-content', id: 'sip' },
            div({ class: 'sip-amount' },
                span('Enter Amount'),
                input({ type: 'number', placeholder: '₹ Enter Amount', class: 'input-amount' })
            ),
            div({ class: 'sip-date' },
                span('2ND SIP STARTS FROM'),
                strong('09 Jun 2025')
            ),
            div({ class: 'sip-start-today' },
                input({ type: 'checkbox', checked: true }),
                span('Start Today')
            ),
            div({ class: 'sip-frequency' },
                span({ class: 'frequency-label' }, 'Frequency: Monthly'),
                span({ class: 'edit-btn' }, 'Edit')
            ),
            div({ class: 'sip-end' },
                span({ class: 'end-label' }, 'End Date: Until I Cancel')
            )
        );

        // Buttons
        const actionButtons = div({ class: 'popup-actions' },
            div({ class: "buttonFactor-container" },
                div({ class: "button-container" },
                    div({ class: "btn-white" }, a({ class: "add-to-cart-btn" }, "ADD TO CART"))
                ),
                div({ class: "btn-blue" }, a({ class: "invest-now-btn" }, "INVEST NOW"))
            )
        );

        modal.append(tabButtons, lumpsumForm, sipForm, actionButtons);
        card.appendChild(modal);

        // Tab switching logic
        const tabBtns = tabButtons.querySelectorAll('.tab-btn');
        const tabContents = modal.querySelectorAll('.tab-content');

        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                tabBtns.forEach(b => b.classList.remove('active'));
                tabContents.forEach(tc => tc.classList.remove('show'));

                btn.classList.add('active');
                const targetTab = btn.dataset.tab;
                lastTab = targetTab;
                modal.querySelector(`#${targetTab}`)?.classList.add('show');
            });
        });

        // Close popup
        tabButtons.querySelector('.close-popup').addEventListener('click', () => {
            modal.classList.add('hidden'); // instead of removing
            // Remove Disable from all other cards
            const allCards = document.querySelectorAll('.fundCard');
            allCards.forEach((c) => {
                c.classList.remove('disable-Cart');
            });
        });

        // Edit in SIP
        modal.querySelector('.edit-btn')?.addEventListener('click', () => {
            showEditPopup(modal);
        });
    }

    // Edit Popup Logic

    function showEditPopup(targetContainer) {
        const overlay = div({ class: 'edit-popup-overlay' });
        const popup = div({ class: 'edit-popup' });

        // Read previous values from data attributes or fallback defaults
        const savedFrequency = targetContainer.dataset.selectedFrequency || 'Monthly';
        const savedEndType = targetContainer.dataset.selectedEndType || 'until';
        const savedDate = targetContainer.dataset.selectedDate || '';

        // Create Frequency section
        const frequencyHeader = h4(text('Frequency'));
        const frequencyOptions = ['Annual', 'Daily', 'Fortnightly', 'Monthly', 'Quarterly', 'Weekly'];
        const frequencyDiv = div({ class: 'frequency-options' },
            ...frequencyOptions.map(freq =>
                label(
                    input({
                        type: 'radio',
                        name: 'frequency',
                        value: freq,
                        checked: freq === savedFrequency
                    }),
                    text(` ${freq}`)
                )
            )
        );

        // Create End Date section
        const endDateHeader = h4(text('End Date'));

        const dateInput = input({
            type: 'date',
            class: 'end-date-input',
            value: savedDate,
            style: savedEndType === 'select' ? 'margin-top: 5px;' : 'display:none; margin-top: 5px;'
        });

        const endDateDiv = div({ class: 'enddate-options' },
            label(
                input({
                    type: 'radio',
                    name: 'enddate',
                    value: 'until',
                    checked: savedEndType === 'until'
                }),
                text(' Until Cancel')
            ),
            label(
                input({
                    type: 'radio',
                    name: 'enddate',
                    value: 'select',
                    checked: savedEndType === 'select'
                }),
                text(' Select Date')
            ),
            dateInput
        );

        // Buttons
        const buttonContainer = div({ class: 'edit-popup-buttons' },
            button({ class: 'cancel-btn' }, text('CANCEL')),
            button({ class: 'ok-btn' }, text('OK'))
        );


        // Append all to popup
        popup.append(
            frequencyHeader,
            frequencyDiv,
            endDateHeader,
            endDateDiv,
            buttonContainer
        );

        overlay.appendChild(popup);
        document.body.appendChild(overlay);

        // set checked property for frequency radio
        const freqInputs = popup.querySelectorAll('input[name="frequency"]');
        freqInputs.forEach(input => {
            input.checked = input.value === savedFrequency;
        });

        // set checked property for enddate radio
        const endDateInputs = popup.querySelectorAll('input[name="enddate"]');
        endDateInputs.forEach(input => {
            input.checked = input.value === savedEndType;
        });


        // === Logic Handlers ===

        // Toggle date input based on radio
        const endDateRadios = popup.querySelectorAll('input[name="enddate"]');
        endDateRadios.forEach(radio => {
            radio.addEventListener('change', () => {
                dateInput.style.display = radio.value === 'select' ? 'block' : 'none';
            });
        });

        // Cancel logic
        popup.querySelector('.cancel-btn').addEventListener('click', () => {
            overlay.remove();
        });

        // OK logic
        popup.querySelector('.ok-btn').addEventListener('click', () => {
            const selectedFrequency = popup.querySelector('input[name="frequency"]:checked')?.value;
            const selectedEndType = popup.querySelector('input[name="enddate"]:checked')?.value;
            const selectedDate = dateInput.value;

            const endDateDisplay = selectedEndType === 'select' && selectedDate
                ? selectedDate
                : 'Until I Cancel';

            // Update visible labels
            const freqLabel = targetContainer.querySelector('.sip-frequency .frequency-label');
            if (freqLabel) freqLabel.textContent = `Frequency: ${selectedFrequency}`;

            const endLabel = targetContainer.querySelector('.sip-end .end-label');
            if (endLabel) endLabel.textContent = `End Date: ${endDateDisplay}`;

            // Store values in dataset for future edits
            targetContainer.dataset.selectedFrequency = selectedFrequency;
            targetContainer.dataset.selectedEndType = selectedEndType;
            targetContainer.dataset.selectedDate = selectedDate;

            overlay.remove();
        });
    }
}

function dataFilterfun(param){
    let dataMapObj = {}
    dataMapObj["schemeName"] = []
        dataMapObj["fundCategory"] = [
        {"indian-equity": []},
        {"international-equity": []},
        {"hybrid-&-balanced": []},
        {"multi-asset": []},
        {"commodity": []},
        {"debt-&-liquid": []},
        {"indianEquitySub" :[
            {"Indian Equity - Large and Mid Cap":[]},
            {"Indian Equity - Large Cap":[]},
            {"Indian Equity - Mid Cap":[]},
            {"Indian Equity - Small Cap":[]},
            {"Indian Equity - Sector":[]},
            {"Indian Equity - Factor":[]},
            {"Indian Equity - Tax Saver (ELSS)":[]},
            {"Indian Equity - Multi Cap":[]}
        ]}
    ];
    dataMapObj["fundType"] =[
        {"active":[]},
        {"index-funds":[]},
        {"etf":[]}
    ]
    dataMapObj["sort"] =[
        {
            "ListDropdown":[{"text":"Popular","value":"inception_Ret"},{"text":"1 Year Returns","value":"oneYear_Ret"},{"text":"3 Year Returns","value":"threeYear_Ret"},{"text":"5 Year Returns","value":"fiveYear_Ret"},{"text":"7 Year Returns","value":"sevenYear_Ret"},{"text":"10 Year Returns","value":"tenYear_Ret"}],
            "inception_Ret" :[],
            "oneYear_Ret":[],
            "threeYear_Ret":[],
            "fiveYear_Ret":[],
            "sevenYear_Ret":[],
            "tenYear_Ret":[],  
        }
    ]
    
     for (let name of param) {
        if ([...name.fundsTaggingSection].includes("motilal-oswal:indian-equity-")) {
            dataMapObj["fundCategory"].forEach((element)=>{
                if (element["indian-equity"]) {
                    element["indian-equity"].push(name.schcode)   
                }
            })
        }
        if ([...name.fundsTaggingSection].includes("motilal-oswal:hybrid-&-balanced")) {
             dataMapObj["fundCategory"].forEach((element)=>{
                if (element["hybrid-&-balanced"]) {
                    element["hybrid-&-balanced"].push(name.schcode)   
                }
            })
        }
        if ([...name.fundsTaggingSection].includes("motilal-oswal:debt-&-liquid")) {
            dataMapObj["fundCategory"].forEach((element)=>{
                if (element["debt-&-liquid"]) {
                    element["debt-&-liquid"].push(name.schcode)   
                }
            })
        }
        if ([...name.fundsTaggingSection].includes("motilal-oswal:international-equity")) {
            dataMapObj["fundCategory"].forEach((element)=>{
                if (element["international-equity"]) {
                    element["international-equity"].push(name.schcode)   
                }
            })
        }
        if ([...name.fundsTaggingSection].includes("motilal-oswal:multi-asset")) {
            dataMapObj["fundCategory"].forEach((element)=>{
                if (element["multi-asset"]) {
                    element["multi-asset"].push(name.schcode)   
                }
            })
        }
        if ([...name.fundsTaggingSection].includes("motilal-oswal:commodity")) {
            dataMapObj["fundCategory"].forEach((element)=>{
                if (element["commodity"]) {
                    element["commodity"].push(name.schcode)   
                }
            })
        }
        if ([...name.fundsTaggingSection].includes("motilal-oswal:index-funds")) {
            dataMapObj["fundType"].forEach((element)=>{
                if (element["index-funds"]) {
                    element["index-funds"].push(name.schcode)   
                }
            })
        }
        if ([...name.fundsTaggingSection].includes("motilal-oswal:active")) {
            dataMapObj["fundType"].forEach((element)=>{
                if (element["active"]) {
                    element["active"].push(name.schcode)   
                }
            })
        }
        if ([...name.fundsTaggingSection].includes("motilal-oswal:etf")) {
            dataMapObj["fundType"].forEach((element)=>{
                if (element["etf"]) {
                    element["etf"].push(name.schcode)   
                }
            })
        }
        if (name.fundSubCategorisation) {
            dataMapObj["fundCategory"][dataMapObj["fundCategory"].length-1]["indianEquitySub"].forEach((elementsub,index)=>{
                if (elementsub[name.fundSubCategorisation]) {
                    elementsub[name.fundSubCategorisation].push(name.schcode)   
                }
            })
        }
        for (const element of name.returns) {
            let key = Object.keys(element);
            if([...key].includes("inception_Ret") && !dataMapObj["sort"][0]["inception_Ret"].includes(name.schcode)){
                dataMapObj["sort"][0]["inception_Ret"].push(name.schcode)
            }
            if([...key].includes("oneYear_Ret") && !dataMapObj["sort"][0]["oneYear_Ret"].includes(name.schcode)){
                dataMapObj["sort"][0]["oneYear_Ret"].push(name.schcode)
            }
            if([...key].includes("threeYear_Ret") && !dataMapObj["sort"][0]["threeYear_Ret"].includes(name.schcode)){
                dataMapObj["sort"][0]["threeYear_Ret"].push(name.schcode)
            }
            if([...key].includes("fiveYear_Ret") && !dataMapObj["sort"][0]["fiveYear_Ret"].includes(name.schcode)){
                dataMapObj["sort"][0]["fiveYear_Ret"].push(name.schcode)
            }
            if([...key].includes("sevenYear_Ret") && !dataMapObj["sort"][0]["sevenYear_Ret"].includes(name.schcode)){
                dataMapObj["sort"][0]["sevenYear_Ret"].push(name.schcode)
            }
            if([...key].includes("tenYear_Ret") && !dataMapObj["sort"][0]["tenYear_Ret"].includes(name.schcode)){
                dataMapObj["sort"][0]["tenYear_Ret"].push(name.schcode)
            }
        }
        dataMapObj["schemeName"].push({"schemeName" : name.schDetail.schemeName,"schcode":name.schcode})  
    }
    return dataMapObj
}
function capitalizeEachWord(sentence) {
    if (sentence.includes("etf")) {
        return sentence.toUpperCase() + "'s"; 
    }
  return sentence.replace(/\b\w/g, function(char) {
    return char.toUpperCase();
  });
}

function undefinedHandler(param){
    let mop = [undefined,null,""]
    if (mop.includes(param)) {
        return "NA"
    }
    return param

}

function rightBottomcardRender(block,params,dataMapObj){
    let InvestBtn = ''
    let siblock = {"inception_Ret":"si","oneYear_Ret":"1 Year","threeYear_Ret":"3 Year","fiveYear_Ret":"5 Year","sevenYear_Ret":"7 Year","tenYear_Ret":"10 Year"} 
    block.querySelectorAll(".radio-button-container [type=radio]").forEach((el) => {
        if (el.checked) {
            InvestBtn = el.value;
        }
    })
    if (params.length == 0) {
        params = dataCfObj
    }
    params.forEach((elem,index)=>{
        dataMapObj["data"][index] = {}
        elem.planList.forEach((element)=>{
            if (element.planName == InvestBtn && element.optionName === "Growth") {
                        dataMapObj.tagCode = ""
                        dataMapObj.tagCode = element.groupedCode;
                        [...elem.aum].forEach((aum) => {
                            if (dataMapObj.tagCode === (aum.plancode + aum.optioncode)) {
                                dataMapObj["data"][index].aum = aum.latestAum;
                            }
                        })
                        elem.nav.forEach((aum) => {
                            if (dataMapObj.tagCode === (aum.plancode + aum.optioncode)) {
                                dataMapObj["data"][index].nav = aum.latnav;
                             }
                        })
                        elem.returns.forEach((aum) => {
                            if (dataMapObj.tagCode === (aum.plancode + aum.optioncode)) {
                                dataMapObj["data"][index].schReturnCagr = aum.inception_Ret;
                            }
                        })
            }
        })
    })
    
    const rightBottomContainer = div({
            class: "main-container-bottom"
        },
            ...params.map((ele, index) => {
                dataMapObj.tags = [];
                ele.fundsTaggingSection.forEach((element) => {
                    let temp = ["motilal-oswal:active", "motilal-oswal:index-funds", "motilal-oswal:etf"]
                        if (!temp.includes(element)) {
                            dataMapObj.tags.push(element.replace("motilal-oswal:",""))
                        }
                })
                dataMapObj.siperiods = [];
                let tempData = ""
                dataMapObj[index] = {}
                dataMapObj.DuplicateRemove = []
                ele.returns.forEach((key,val)=>{
                    if (Object.keys(key).includes("inception_Ret") && !dataMapObj.siperiods.includes("si")) {
                        dataMapObj.siperiods.push("si")
                    }
                    if (Object.keys(key).includes("oneYear_Ret") && !dataMapObj.siperiods.includes("1 Year")) {
                        dataMapObj.siperiods.push("1 Year")
                    }
                    if (Object.keys(key).includes("threeYear_Ret") && !dataMapObj.siperiods.includes("3 Year")) {
                        dataMapObj.siperiods.push("3 Year")
                    }
                    if (Object.keys(key).includes("fiveYear_Ret") && !dataMapObj.siperiods.includes("5 Year")) {
                        dataMapObj.siperiods.push("5 Year")
                    }
                    if (Object.keys(key).includes("sevenYear_Ret") && !dataMapObj.siperiods.includes("7 Year")) {
                        dataMapObj.siperiods.push("7 Year")
                    }
                    if (Object.keys(key).includes("tenYear_Ret") && !dataMapObj.siperiods.includes("10 Year")) {
                        dataMapObj.siperiods.push("10 Year")
                    }
                })
                return  div({
                    class: "submain-container-bottom"
                },
                    div({
                        class: "fundCard"
                    },
                        div({
                            class: "submain-Header"
                        },
                            div({
                                class: "name-content-container"
                            },
                                div({
                                    class: "logoName"
                                }, "Logo"),
                                div({
                                    class: "planName",
                                    dataschCode: ele.schcode
                                }, a(ele.schDetail.schemeName))
                            ),
                            div({
                                class: "dropdown-container"
                            },
                                span({
                                    class: "fundOption"
                                },
                                    select(
                                        ...ele.planList.map((seleOp,idx) => {
                                            if (!dataMapObj.DuplicateRemove.includes(seleOp.optionName) && seleOp.planName == InvestBtn) {
                                                dataMapObj.DuplicateRemove.push(seleOp.optionName)
                                                return option({groupedCode:seleOp.groupedCode},seleOp.optionName)
                                            }
                                        }) 
                                    )
                                )
                            ),
                            div({
                                class: "category-container"
                            },
                                span(capitalizeEachWord(dataMapObj.tags.join("|")))
                            )
                        ),
                        div({
                            class: "submain-Footer"
                        },
                            div({
                                class: "row valueFactor-container"
                            },
                                div({
                                    class: "factor-container"
                                },
                                    div({
                                        class: "amu-container"
                                    },
                                        label("AMU"),
                                        span({
                                            class: "amuvalue"
                                        }, ("₹" + undefinedHandler(dataMapObj.data[index].aum) + " " + "Crs"))
                                    ),
                                    div({
                                        class: "risk-container"
                                    },
                                        label("Risk"),
                                        div({
                                            class: "riskvalue"
                                        },
                                            div({
                                                class: "risklabelvalue"
                                            }, ele.risk.riskType),
                                            div({
                                                class: "riskinfoiconvalue"
                                            },
                                                img("/content.fake/path.img")
                                            )
                                        )
                                    ),
                                    div({
                                        class: "nav-container"
                                    },
                                        label("NAV"),
                                        div({
                                            class: "navContainervalue"
                                        },
                                            div({
                                                class: "navRatevalue"
                                            },
                                                div({
                                                    class: "fundValue"
                                                }, undefinedHandler(dataMapObj.data[index].nav)),//ele.nav[0].nav
                                                div({
                                                    class: "fundRateValue",
                                                    style: Math.sign(0) == -1 ? "color:red" : "color:green"
                                                }, "(" + 0 + "%)") //ele.nav[0].navChng
                                            ),
                                            div({
                                                class: "navFundDate"
                                            }, 0)//navDate(ele.nav[0].navRecdt.split(" ")[0])
                                        )
                                    ),
                                    div({
                                        class: "cagr-container"
                                    },
                                        label({
                                            class: "CAGRContainer"
                                        }, "CAGR",
                                            select(
                                                ...dataMapObj.siperiods.map((ele) => {
                                                    return option(ele.toUpperCase())
                                                })
                                            )
                                        ),
                                        div({
                                            class: "cagr-rate"
                                        }, undefinedHandler(dataMapObj.data[index].schReturnCagr) + "%"),
                                        div({
                                            class: "cagr-rateDate"
                                        }, 0) //cgarDate(ele.return[0].schReturnAsOnDt)
                                    )
                                )
                            ),
                            div({
                                class: "buttonFactor-container"
                            },
                                div({
                                    class: "button-container"
                                },
                                    div({
                                        class: "know-more-btn"
                                    }, a({
                                        class: "know-more"
                                    }, "Know More")),
                                ),
                                div({
                                    class: "invest-now-btn"
                                }, a({
                                    class: "Invest-now"
                                }), "Invest Now")
                            )
                        )
                    )
                )
            })

        )
    block.querySelector(".inner2-container2").innerHTML = "";
    block.querySelector(".inner2-container2").append(rightBottomContainer);
}