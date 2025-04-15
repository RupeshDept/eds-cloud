import { fetchAPI } from "../../scripts/scripts.js";
import { fetchPlaceholders } from "../../scripts/aem.js";

export default async function decorate(block) {
    const path = block.textContent.trim()
    console.log(path);

    const placeholders = await fetchPlaceholders()
    console.log(placeholders)
    const fundAPIURL = placeholders.fundapi

    const button = document.createElement('button')
    button.classList.add('btn-fundapi')
    button.textContent = "Click Me"
    block.append(button)
    const btnone = document.querySelector('.btn-fundapi')
    btnone.addEventListener('click', function (e) {
        console.log("clicked")
        if (window.Sentry) {
            Sentry.addBreadcrumb({
                category: 'ui.click',
                message: 'User clicked fund-api button',
                level: 'info',
            });
        }
        fundAPI(fundAPIURL)

    })


    function fundAPI(fundAPIURL) {
        const apiRequest = {
            "api_name": "FundCategoryNew",
            "categoryType": "MF"
        }
        const apiid = "27820BB4MEC3DA4D65MAC74CDFF81E020A60"
        const APIURL = fundAPIURL
        const requestObj = {
            requestJson: apiRequest,
            headerJson: {
                appid: apiid,
            },
        };

        return new Promise((resolve, reject) => {
            fetchAPI('POST', APIURL, requestObj)
                .then((response) => {
                    console.log("Data inserted successfully.");
                })
                .catch((error) => {
                    console.log(error)
                    Sentry.captureException(error);
                })
        });
    }
    fundAPI(fundAPIURL)
}