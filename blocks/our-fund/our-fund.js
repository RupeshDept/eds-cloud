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
                        eventTriggerRending(dataCfObj)
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
                        eventTriggerRending(dataCfObj)
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
                                                console.log(ele.target.getAttribute("dataattr"));
                                                eventTriggerRending(dataObjAllFundBoost.data.data.data)
                                            }
                                        })
                                    ),
                                    span(sublabel)
                                )
                            })
                        )
                    }
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
                                    if (ele.currentTarget.parentElement.nextElementSibling.textContent.trim().includes("Indian Equity")) {
                                        block.querySelectorAll(".Indian-Equity-container .categorey-direct").forEach((element) => {
                                            element.checked = ele.currentTarget.checked ? true : false;
                                        })
                                    }
                                    eventTriggerRending(dataObjAllFundBoost.data.data.data)
                                }
                            })
                        ),
                        span(capitalizeEachWord(Object.keys(element)[0].replaceAll("-"," ")) + "(" + element[Object.keys(element)[0]].length + ")"),
                        capitalizeEachWord(Object.keys(element)[0].replaceAll("-"," ")) === "Indian Equity" ? div({
                            class: "innerIndianEquity"
                        }, dataMapObj[index + "ArrayDoc"]) : ""
                    )
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

    let InvestMethod = "Direct"; //document.querySelector("input[type='radio']:checked").value;
    dataMapObj.filterSeachArr = [];
    dataMapObj.inputSelectArr = [];
    dataObjAllFundBoost.data.data.data.forEach((elem) => {
        elem.planList.forEach((element) => {
            if (!dataMapObj.filterSeachArr.includes(elem.schDetail.schName)) { //element.planName == InvestMethod &&
                dataMapObj.filterSeachArr.push(elem.schDetail.schName)
            }
        })

    })
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
                        ...dataMapObj.filterSeachArr.map((element) => {
                            return li({
                                class: "dropdown-item",
                                dataValue: element,
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
                            }, element)
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
                        ...dataObj.data.data.sort.map((e, index) => {
                            return li({
                                dataIndex: index,
                                onclick: (event) => {
                                    block.querySelectorAll(".inner2-container1 .dropdown-modal ul li").forEach((el) => {
                                        el.classList.remove("active");
                                    })
                                    event.target.classList.add("active");
                                    block.querySelector(".inner2-container1 .seachBox").value = event.target.textContent.trim()
                                    block.querySelector(".inner2-container1 .dropdown-modal").style.display = "none";
                                    let schemes = dataObj.data.data.sort[event.target.getAttribute("dataIndex")].schemes

                                }
                            }, e.sortName)
                        })
                    )
                )
            )
        )
    )

    function navDate(mop) {
        let str = ""
        let mopMonth = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
        mop = mop.split("/");
        str = "As on " + mop[1] + " " + mopMonth[mop[0] - 1] + " " + mop[2]
        return str;
    }

    function cgarDate(mop) {
        let str = ""
        let mopMonth = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
        mop = mop.split("-");
        str = "As on " + mop[2] + " " + mopMonth[mop[1] - 1] + " " + mop[0]
        return str;
    }
    const rightBottomContainer = div({
        class: "main-container-bottom"
    },
        ...dataObjAllFundBoost.data.data.data.map((ele, index) => {
            dataMapObj.DuplicateRemove = []
            dataMapObj.siperiods = []
            dataMapObj.tags = [];
            ele.tags.forEach((element) => {
                let temp = ["Active", "Index", "ETFs"]
                if (!temp.includes(element)) {
                    dataMapObj.tags.push(element)
                }
            })
            ele.return.forEach((element) => {
                if (!dataMapObj.siperiods.includes(element.period.replaceAll("yr", " Year"))) {
                    dataMapObj.siperiods.push(element.period.replaceAll("yr", " Year"))
                }
            })
            dataMapObj.siperiods = dataMapObj.siperiods.sort();

            let InvestBtn = ''
            block.querySelectorAll(".radio-button-container [type=radio]").length === 0 ? InvestBtn = "Direct" : block.querySelectorAll(".radio-button-container [type=radio]").forEach((el) => {
                if (el.checked) {
                    InvestBtn = el.value;
                }
            })
            let AumValue = '',
                dataAum = '',
                navRecdt = '',
                navValue = '',
                navChngPer = '',
                schReturnCagr = '',
                schReturnAsOnDt = '';
            ele.planList.forEach((eleTemp) => {
                let dataCode = eleTemp.schemeCode + eleTemp.planCode;
                [...ele.aum, ...ele.nav, ...ele.return].forEach((Aum) => {
                    let tempAumCode = Aum.schemeCode + Aum.planCode;
                    if (tempAumCode == dataCode) {
                        if (Aum.latestAum) {
                            AumValue = Aum.latestAum;
                        }
                        if (Aum.latestAumAsOnDt) {
                            dataAum = Aum.latestAumAsOnDt;
                        }
                        if (Aum.nav) {
                            navValue = Aum.nav;
                        }
                        if (Aum.navRecdt) {
                            navRecdt = Aum.navRecdt;
                        }
                        if (Aum.navChngPer) {
                            navChngPer = Aum.navChngPer;
                        }
                        if (Aum.schReturnCagr) {
                            schReturnCagr = Aum.schReturnCagr
                        }
                        if (Aum.schReturnAsOnDt) {
                            schReturnAsOnDt = Aum.schReturnAsOnDt
                        }
                    }
                })
            })
            return index !== 0 && dataMapObj.filterSeachArr.includes(ele.schDetail.schName) ? div({
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
                                dataschCode: ele.schCode
                            }, a(ele.schDetail.schName))
                        ),
                        div({
                            class: "dropdown-container"
                        },
                            span({
                                class: "fundOption"
                            },
                                select({
                                    dataCardIndex: index,
                                    onchange: function (event) {
                                        let cardIndex = event.target.getAttribute("dataCardIndex");
                                        let dataCode = event.currentTarget.options[event.target.options.selectedIndex].getAttribute("dataCode");
                                        let AumValue = '',
                                            dataAum = '',
                                            navRecdt = '',
                                            navValue = '',
                                            navChngPer = '',
                                            schReturnCagr = '',
                                            schReturnAsOnDt = '';
                                        [...ele.aum, ...ele.nav, ...ele.return].forEach((Aum) => {
                                            let tempAumCode = Aum.schemeCode + Aum.planCode;
                                            if (tempAumCode == dataCode) {
                                                if (Aum.latestAum) {
                                                    AumValue = Aum.latestAum;
                                                }
                                                if (Aum.latestAumAsOnDt) {
                                                    dataAum = Aum.latestAumAsOnDt;
                                                }
                                                if (Aum.nav) {
                                                    navValue = Aum.nav;
                                                }
                                                if (Aum.navRecdt) {
                                                    navRecdt = Aum.navRecdt;
                                                }
                                                if (Aum.navChngPer) {
                                                    navChngPer = Aum.navChngPer;
                                                }
                                                if (Aum.schReturnCagr) {
                                                    schReturnCagr = Aum.schReturnCagr
                                                }
                                                if (Aum.schReturnAsOnDt) {
                                                    schReturnAsOnDt = Aum.schReturnAsOnDt
                                                }
                                            }
                                        })
                                        Array.from(block.querySelector(".main-container-bottom").children).forEach((eleHTML, indexHTML) => {
                                            if (indexHTML == (cardIndex - 1)) {
                                                eleHTML.querySelector(".amuvalue").textContent = "";
                                                eleHTML.querySelector(".amuvalue").textContent = AumValue;

                                                eleHTML.querySelector(".fundValue").textContent = "";
                                                eleHTML.querySelector(".fundValue").textContent = navValue;
                                                eleHTML.querySelector(".fundRateValue").textContent = "";
                                                eleHTML.querySelector(".fundRateValue").style.color = Math.sign(navChngPer) == -1 ? "red" : "green"
                                                eleHTML.querySelector(".fundRateValue").textContent = "(" + navChngPer + "%)";
                                                eleHTML.querySelector(".navFundDate").textContent = "";
                                                eleHTML.querySelector(".navFundDate").textContent = navDate(navRecdt.split(" ")[0]);

                                                eleHTML.querySelector(".cagr-rate").textContent = "";
                                                eleHTML.querySelector(".cagr-rate").textContent = schReturnCagr;
                                                eleHTML.querySelector(".cagr-rateDate").textContent = "";
                                                eleHTML.querySelector(".cagr-rateDate").textContent = cgarDate(schReturnAsOnDt);
                                            }
                                        })
                                        //   console.log(AumValue, dataAum, navValue,navChngPer,schReturnAsOnDt);
                                    }
                                },
                                    ...ele.planList.map((seleOp) => {
                                        if (!dataMapObj.DuplicateRemove.includes(seleOp.optionName) && InvestBtn == seleOp.planName) {
                                            dataMapObj.DuplicateRemove.push(seleOp.optionName)
                                            return option({
                                                dataCode: seleOp.schemeCode + seleOp.planCode,
                                            }, seleOp.optionName)
                                        }
                                    })
                                )
                            )
                        ),
                        div({
                            class: "category-container"
                        },
                            span(dataMapObj.tags.join("|"))
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
                                        class: "amuvalue",
                                    }, ("₹" + AumValue + " " + "Crs"))
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
                                        }, ele.risk.risk),
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
                                            }, navValue),
                                            div({
                                                class: "fundRateValue",
                                                style: Math.sign(navChngPer) == -1 ? "color:red" : "color:green"
                                            }, "(" + navChngPer + "%)")
                                        ),
                                        div({
                                            class: "navFundDate"
                                        }, navDate(navRecdt.split(" ")[0]))
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
                                    }, schReturnCagr != '' ? schReturnCagr + "%" : ""),
                                    div({
                                        class: "cagr-rateDate"
                                    }, schReturnAsOnDt != '' ? cgarDate(schReturnAsOnDt) : "")
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
            ) : ""
        })

    )

    block.querySelector(".inner1-container2").innerHTML = "";
    block.querySelector(".inner1-container2").append(leftContainer);


    block.querySelector(".inner2-container1").append(rightTopContianer);

    block.querySelector(".inner2-container2").innerHTML = "";
    block.querySelector(".inner2-container2").append(rightBottomContainer);

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

    function eventTriggerRending(param) {
        let InvestMethod = block.querySelector("input[type='radio']:checked").value;
        dataMapObj.filterSeachArr = [];
        let mop = [];
        block.querySelectorAll("[type='checkbox']").forEach((element) => {
            if (element.checked) {
                mop.push(element.getAttribute("dataattr"))
            }
        })
        mop = mop.length === 0 ? "" : mop.join("-");
        param.forEach((elem) => {
            elem.planList.forEach((element) => {
                if (!dataMapObj.filterSeachArr.includes(elem.schDetail.schName) && mop.length === 0) {
                    dataMapObj.filterSeachArr.push(elem.schDetail.schName)
                } else {
                    if (!dataMapObj.filterSeachArr.includes(elem.schDetail.schName) && mop.includes(elem.schCode)) {
                        dataMapObj.filterSeachArr.push(elem.schDetail.schName)
                    }
                }
            })

        })
        const rightTopContianer = div({
            class: "rightTopContainer"
        },
            div({
                class: "searchBarContainer wrapper"
            },
                label("Search"),
                div({
                    class: "inputContainer tag-container",
                    id: "tags",
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
                            ...dataMapObj.filterSeachArr.map((element) => {
                                return li({
                                    class: "dropdown-item",
                                    dataValue: element,
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
                                }, element)
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
                        })
                    ),
                    div({
                        class: "dropdown-modal"
                    },
                        ul(
                            ...dataObj.data.data.sort.map((e, index) => {
                                return li({
                                    dataIndex: index,
                                    onclick: (event) => {
                                        block.querySelectorAll(".inner2-container1 .dropdown-modal ul li").forEach((el) => {
                                            el.classList.remove("active");
                                        })
                                        event.target.classList.add("active");
                                        block.querySelector(".inner2-container1 .seachBox").value = event.target.textContent.trim()
                                        block.querySelector(".inner2-container1 .dropdown-modal").style.display = "none";

                                        let schemes = dataObj.data.data.sort[event.target.getAttribute("dataIndex")].schemes
                                        // eventTriggerRending(dataObjAllFundBoost.data.data.data)
                                    }
                                }, e.sortName)
                            })
                        )
                    )
                )
            )
        )
        const rightBottomContainer = div({
            class: "main-container-bottom"
        },
            ...dataObjAllFundBoost.data.data.data.map((ele, index) => {
                let InvestBtn = ''
                block.querySelectorAll(".radio-button-container [type=radio]").forEach((el) => {
                    if (el.checked) {
                        InvestBtn = el.value;
                    }
                })
                dataMapObj.DuplicateRemove = []
                dataMapObj.siperiods = []
                dataMapObj.tags = [];
                ele.tags.forEach((element) => {
                    let temp = ["Active", "Index", "ETFs"]
                    if (!temp.includes(element)) {
                        dataMapObj.tags.push(element)
                    }
                })
                ele.return.forEach((element) => {
                    if (!dataMapObj.siperiods.includes(element.period.replaceAll("yr", " Year"))) {
                        dataMapObj.siperiods.push(element.period.replaceAll("yr", " Year"))
                    }
                })
                dataMapObj.siperiods = dataMapObj.siperiods.sort();
                return index !== 0 && dataMapObj.filterSeachArr.includes(ele.schDetail.schName) ? div({
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
                                    dataschCode: ele.schCode
                                }, a(ele.schDetail.schName))
                            ),
                            div({
                                class: "dropdown-container"
                            },
                                span({
                                    class: "fundOption"
                                },
                                    select(
                                        ...ele.planList.map((seleOp) => {
                                            if (!dataMapObj.DuplicateRemove.includes(seleOp.optionName) && seleOp.planName == InvestBtn) {
                                                dataMapObj.DuplicateRemove.push(seleOp.optionName)
                                                return option(seleOp.optionName)
                                            }
                                        })
                                    )
                                )
                            ),
                            div({
                                class: "category-container"
                            },
                                span(dataMapObj.tags.join("|"))
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
                                        }, (ele.aum[0].latestAum == null ? "" : "₹" + ele.aum[0].latestAum + " " + "Crs"))
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
                                            }, ele.risk.risk),
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
                                                }, ele.nav[0].nav),
                                                div({
                                                    class: "fundRateValue",
                                                    style: Math.sign(ele.nav[0].navChng) == -1 ? "color:red" : "color:green"
                                                }, "(" + ele.nav[0].navChng + "%)")
                                            ),
                                            div({
                                                class: "navFundDate"
                                            }, navDate(ele.nav[0].navRecdt.split(" ")[0]))
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
                                        }, ele.return.length != 0 ? ele.return[0].schReturnCagr + "%" : ""),
                                        div({
                                            class: "cagr-rateDate"
                                        }, ele.return.length != 0 ? cgarDate(ele.return[0].schReturnAsOnDt) : "")
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
                ) : ""
            })

        )


        block.querySelector(".inner2-container1").innerHTML = "";
        const headerRightConyainer = h3({
            id: "our-funds"
        }, "Our Funds")
        block.querySelector(".inner2-container1").append(headerRightConyainer);
        block.querySelector(".inner2-container1").append(rightTopContianer);

        block.querySelector(".inner2-container2").innerHTML = "";
        block.querySelector(".inner2-container2").append(rightBottomContainer);
    }

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



    // function showEditPopup(targetContainer) {
    //     const overlay = div({ class: 'edit-popup-overlay' });

    //     const popup = div({ class: 'edit-popup' });

    //     // Frequency options
    //     const frequencyOptions = ['Annual', 'Daily', 'Fortnightly', 'Monthly', 'Quarterly', 'Weekly'];
    //     const frequencyDiv = div({ class: 'frequency-options' },
    //         ...frequencyOptions.map(freq =>
    //             label(
    //                 input({
    //                     type: 'radio',
    //                     name: 'frequency',
    //                     value: freq,
    //                     checked: freq === 'Monthly'
    //                 }),
    //                 text(` ${freq}`)
    //             )
    //         )
    //     );

    //     // End Date options
    //     const dateInput = input({
    //         type: 'date',
    //         class: 'end-date-input',
    //         style: 'display:none; margin-top: 5px;'
    //     });

    //     const endDateDiv = div({ class: 'enddate-options' },
    //         label(
    //             input({ type: 'radio', name: 'enddate', value: 'until', checked: true }),
    //             text(' Until Cancel')
    //         ),
    //         label(
    //             input({ type: 'radio', name: 'enddate', value: 'select' }),
    //             text(' Select Date')
    //         ),
    //         dateInput
    //     );

    //     // Buttons
    //     const buttonDiv = div({ class: 'edit-popup-buttons' },
    //         button({ class: 'cancel-btn' }, text('CANCEL')),
    //         button({ class: 'ok-btn' }, text('OK'))
    //     );

    //     // Append everything to popup
    //     popup.append(
    //         h4(text('Frequency')),
    //         frequencyDiv,
    //         h4(text('End Date')),
    //         endDateDiv,
    //         buttonDiv
    //     );

    //     overlay.appendChild(popup);
    //     document.body.appendChild(overlay);

    //     // Handle show/hide of date input based on enddate radio selection
    //     const endDateRadios = popup.querySelectorAll('input[name="enddate"]');
    //     endDateRadios.forEach(radio => {
    //         radio.addEventListener('change', () => {
    //             dateInput.style.display = radio.value === 'select' ? 'block' : 'none';
    //         });
    //     });

    //     // Cancel button
    //     popup.querySelector('.cancel-btn').addEventListener('click', () => {
    //         overlay.remove();
    //     });

    //     // OK button
    //     popup.querySelector('.ok-btn').addEventListener('click', () => {
    //         const selectedFrequency = popup.querySelector('input[name="frequency"]:checked')?.value;
    //         const selectedEndType = popup.querySelector('input[name="enddate"]:checked')?.value;
    //         const selectedDate = dateInput.value;

    //         const endDateDisplay = selectedEndType === 'select' && selectedDate
    //             ? selectedDate
    //             : 'Until I Cancel';

    //         const freqLabel = targetContainer.querySelector('.sip-frequency .frequency-label');
    //         if (freqLabel) freqLabel.textContent = `Frequency: ${selectedFrequency}`;

    //         const endLabel = targetContainer.querySelector('.sip-end .end-label');
    //         if (endLabel) endLabel.textContent = `End Date: ${endDateDisplay}`;

    //         overlay.remove();
    //     });
    // }




    // Invest Now Logic RM11


}

function dataFilterfun(param){
    let dataMapObj = {}
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
    }
    return dataMapObj
}
function capitalizeEachWord(sentence) {
  return sentence.replace(/\b\w/g, function(char) {
    return char.toUpperCase();
  });
}