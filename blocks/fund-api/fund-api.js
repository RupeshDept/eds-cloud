import { fetchAPI } from "../../scripts/scripts.js";

export default function decorate(block) {
    const path = block.textContent.trim()
    console.log(path);



    function fundAPI() {
        const apiRequest = {
            "api_name": "FundCategoryNew",
            "categoryType": "MF"
        }
        const apiid = "27820BB4MEC3DA4D65MAC74CDFF81E020A60"
        const APIURL = "https://mf.moamc.com/mutualfund/api/v1/getAllFundsBoost"
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
                    // resolve('Data inserted successfully.');
                });
        });
    }
    fundAPI()
}