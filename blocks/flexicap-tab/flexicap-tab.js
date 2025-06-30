// eslint-disable-next-line import/no-unresolved
import { toClassName } from "../../scripts/aem.js";
import accordion from "../accordion/accordion.js"
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
  }else{
   accordion(block)
  }
}