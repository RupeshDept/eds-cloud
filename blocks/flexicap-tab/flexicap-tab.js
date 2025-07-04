// eslint-disable-next-line import/no-unresolved
import {
  toClassName
} from "../../scripts/aem.js";
import accordion from "../accordion/accordion.js"
import {
  dataCfObj
} from "../our-fund/dataCfObj.js"
import {
  div,
  img,
  p,
  h4,
  span,
  table,
  label,
  strong
} from "../../scripts/dom-helpers.js"
export default async function decorate(block) {
  Array.from(document.querySelector(".flexicap-tab").children).forEach(
    (el) => {
      Array.from(el.children).filter((el) => {
        if (el.innerHTML == "") {
          el.remove();
        }
      });
    }
  );
  if (window.matchMedia("(min-width: 1024px)").matches) {
    // build tablist
    const tablist = document.createElement("div");
    tablist.className = "tabs-list";
    tablist.setAttribute("role", "tablist");

    // decorate tabs and tabpanels
    const tabs = [...block.children].map((child) => child.firstElementChild);
    tabs.forEach((tab, i) => {
      const id = toClassName(tab.textContent);

      // decorate tabpanel
      const tabpanel = block.children[i];
      tabpanel.className = "tabs-panel";
      tabpanel.id = `tabpanel-${id}`;
      tabpanel.setAttribute("aria-hidden", !!i);
      tabpanel.setAttribute("aria-labelledby", `tab-${id}`);
      tabpanel.setAttribute("role", "tabpanel");

      // build tab button
      const button = document.createElement("button");
      button.className = "tabs-tab";
      button.id = `tab-${id}`;
      button.innerHTML = tab.innerHTML;
      button.setAttribute("aria-controls", `tabpanel-${id}`);
      button.setAttribute("aria-selected", !i);
      button.setAttribute("role", "tab");
      button.setAttribute("type", "button");
      button.addEventListener("click", () => {
        block.querySelectorAll("[role=tabpanel]").forEach((panel) => {
          panel.setAttribute("aria-hidden", true);
        });
        tablist.querySelectorAll("button").forEach((btn) => {
          btn.setAttribute("aria-selected", false);
        });
        tabpanel.setAttribute("aria-hidden", false);
        button.setAttribute("aria-selected", true);
      });
      tablist.append(button);
      tab.remove();
    });

    //   Need wrapper for tabs-list and tabs-panel
    const tabListWrapper = document.createElement("div");
    tabListWrapper.classList.add("tabsList-wrapper", "list-bg");
    tabListWrapper.append(tablist);
    const tabPanelWrapper = document.createElement("div");
    tabPanelWrapper.classList.add("tabsPanel-wrapper");
    const tabPanelAll = block.querySelectorAll(".tabs-panel");
    tabPanelAll.forEach((el) => {
      tabPanelWrapper.append(el);
    });

    block.prepend(tabListWrapper, tabPanelWrapper);
  } else {
    accordion(block)
  }

  Array.from(block.querySelector(".tabs-list").children).forEach((el, index) => {
    el.classList.add("tab-btnitem" + (index + 1))
  })
  Array.from(block.querySelector(".tabsPanel-wrapper").children).forEach((el, index) => {
    el.classList.add("tabpanelitem" + (index + 1))
  })


  let FundData = dataCfObj.filter((el) => {
    if (el.schDetail.schemeName == "Motilal Oswal Large Cap Fund") { //Motilal Oswal Midcap Fund
      return el
    }
  })


  // Periodic Return 
  function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function modifyTabs() {
    await wait(50);

    const tabsList = block.querySelector(".tabpanelitem1 .tabs-list");
    if (tabsList !== null) {
      Array.from(tabsList.children).forEach((el, index) => {
        if (index === 0) {
          el.setAttribute("dataValue", "_Ret");
        }
        if (index === 1) {
          el.setAttribute("dataValue", "_marketValue");
        }
      });
      let tabdiv = tableFun(FundData, "_Ret");
      block.querySelector(".tabpanelitem1 .tabpanelitem1").innerHTML = "";
      block.querySelector(".tabpanelitem1 .tabpanelitem1").append(tabdiv)

      Array.from(block.querySelector(".tabpanelitem1 .tabs-list").children).forEach((element) => {
        element.addEventListener('click', (event) => {
          if (event.target.parentElement.getAttribute("dataValue") == "_Ret") {
            let dataVal = event.target.parentElement.getAttribute("dataValue");
            let tabdiv = tableFun(FundData, dataVal);
            block.querySelector(".tabpanelitem1 .tabpanelitem1").innerHTML = "";
            block.querySelector(".tabpanelitem1 .tabpanelitem1").append(tabdiv)
          } else {
            let dataVal = event.target.parentElement.getAttribute("dataValue");
            let tabdiv = tableFun(FundData, dataVal)
            block.querySelector(".tabpanelitem1 .tabpanelitem2").innerHTML = "";
            block.querySelector(".tabpanelitem1 .tabpanelitem2").append(tabdiv);
          }
        })
      })

      document.querySelector(".section .tab-btnitem1").addEventListener('click', () => {
        Array.from(block.querySelector(".tabpanelitem1 .tabs-list").children).forEach((el, index) => {
          if (el.getAttribute("aria-selected") === 'true') {
            block.querySelector(".tabpanelitem1 .tabpanelitem" + (index + 1)).setAttribute("aria-hidden", false)
          }
        })
      })
    }

    await wait(100);
    const tabsListPR = block.querySelector(".tabpanelitem3 .tabs-list");
    if (tabsListPR !== null) {
      //Portfolio Returns
      let tablePR = document.createElement('table')
      FundData[0].holdings.forEach((el, index) => {
        if (index == 0) {
          let tr = document.createElement('tr')
          for (const element in el) {
            let td = document.createElement('td')
            td.append(element)
            tr.append(td)
          }
          tablePR.append(tr);
        }
        let tr = document.createElement('tr')
        for (const element in el) {
          let td = document.createElement('td')
          td.append(el[element])
          tr.append(td)
        }
        tablePR.append(tr);
      })
      block.querySelector(".tabpanelitem3 .tabpanelitem2").innerHTML = ""
      block.querySelector(".tabpanelitem3 .tabpanelitem2").append(tablePR)
      //Progress Bar
      block.querySelector(".tabpanelitem3 .tabpanelitem1").innerHTML = ""
      block.querySelector(".tabpanelitem3 .tabpanelitem1").append(div({
          class: "progressBarContainer"
        },
        ...FundData[0].sector.map((el, index) => {
          return div(
            div({class:"progressLabel"},
              label(strong(el.name)),
              label(strong(el.percentage+"%"))
            ),
            div({
                class: "progressBarLine"
              },
              div({
                class: "progessBar"
              }, el.percentage)
            )
          )
        })
      ))
      Array.from(block.querySelector(".tabpanelitem3 .tabpanelitem1 .progressBarContainer").children).forEach((el) => {
        el.classList.add("progressContain")
        if (el.querySelector(".progessBar")) {
          const progessText = el.querySelector(".progessBar").textContent.trim();
          el.querySelector(".progessBar").innerText = "";
          const percent = (Number(progessText) / 100) * 100;
          el.querySelector(".progessBar").style.width = percent + "%";
          el.querySelector(".progessBar").textContent = Math.floor(percent) + "%";
        }
      })
      document.querySelector(".section .tab-btnitem3").addEventListener('click', () => {
        Array.from(block.querySelector(".tabpanelitem3 .tabs-list").children).forEach((el, index) => {
          if (el.getAttribute("aria-selected") === 'true') {
            block.querySelector(".tabpanelitem3 .tabpanelitem" + (index + 1)).setAttribute("aria-hidden", false)
          }
        })
      })
    }
  }

  modifyTabs();

  //Fund Manager
  let funddiv = document.createElement('div');
  funddiv.classList.add('fund-manager-list')
  FundData[0].fundManager.forEach((el) => {
    let fundDiv = div(
      div(
        img({
          scr: el.picture,
          alt: "fundLogo"
        }),
        div(
          h4(el.fundManagerName),
          p(el.designation)
        )
      ),
      div(
        p(el.description),
        span("Total AUM: ₹234453.92 Cr")
      ),
      div(
        p("VIEW OTHER FUNDS MANAGED BY HIM")
      )
    )
    funddiv.append(fundDiv)
  })

  block.querySelector(".tabpanelitem2  div").append(funddiv)
}

// console.log(table);


function tableFun(params, value) {
  let ObjTemp = {
    "inception_Ret": "Inception",
    "oneYear_Ret": "1Y",
    "threeYear_Ret": "3Y",
    "fiveYear_Ret": "5Y",
    "sevenYear_Ret": "7Y",
    "tenYear_Ret": "10Y",
    "Inception": "inception",
    "1Y": "oneYear",
    "3Y": "threeYear",
    "5Y": "fiveYear",
    "7Y": "sevenYear",
    "10Y": "tenYear",
  }
  let temp = [];
  for (const element of params[0].returns) {
    let key = Object.keys(element);
    if ([...key].includes("inception_Ret") && !temp.includes("Inception")) {
      temp.push("Inception")
    }
    if ([...key].includes("oneYear_Ret") && !temp.includes("1Y")) {
      temp.push("1Y")
    }
    if ([...key].includes("threeYear_Ret") && !temp.includes("3Y")) {
      temp.push("3Y")
    }
    if ([...key].includes("fiveYear_Ret") && !temp.includes("5Y")) {
      temp.push("5Y")
    }
    if ([...key].includes("sevenYear_Ret") && !temp.includes("7Y")) {
      temp.push("7Y")
    }
    if ([...key].includes("tenYear_Ret") && !temp.includes("10Y")) {
      temp.push("10Y")
    }
  }
  temp = temp.reverse();
  temp.unshift("")
  let table = document.createElement("table");
  let tr = document.createElement("tr");


  temp.forEach((ele) => {
    let th = document.createElement("th");
    th.append(ele)
    tr.append(th)
  })
  table.append(tr)
  let trdiv = document.createElement("tr");
  params[0].returns.forEach((el, index) => {
    let td = document.createElement("td");
    if (index == 0) {
      td.append(params[0].schDetail.schemeName);
      trdiv.append(td)
      temp.forEach((tempel) => {
        if (tempel != "") {
          let td = document.createElement("td");
          td.append(Number(params[0]['returns'][index][ObjTemp[tempel] + value]).toFixed(2));
          trdiv.append(td)
        }
      })
    }
  })
  table.append(trdiv);
  let trSecdiv = document.createElement("tr");
  params[0].benchmarkreturns.forEach((el, ind) => {
    let td = document.createElement("td");
    td.append(el.groupName)
    trSecdiv.append(td)
    temp.forEach((tempel) => {
      if (tempel != "") {
        let td = document.createElement("td");
        td.append(Number(params[0]['benchmarkreturns'][ind][ObjTemp[tempel] + value]).toFixed(2));
        trSecdiv.append(td)
      }
    })
  })
  table.append(trSecdiv);

  return table
}