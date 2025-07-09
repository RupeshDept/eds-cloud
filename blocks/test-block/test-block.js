import {
  dataMapObjmo
} from "../../scripts/constant.js"
export default function decorate(block) {
  console.log(dataMapObjmo);
  dataMapObjmo.makeRequest("POST", "https://api.moamc.com/LoginAPI/api/Login/GetClientType", {
      "panNo": "PWXPC6172P",
      "isNri": false
    }).then(response => console.log('GetClientType Created:', response))
    .catch(error => console.error('GetClientType Error:', error));

  dataMapObjmo.makeRequest("POST", "https://api.moamc.com/LoginAPI/api/Login/GenerateOtpNew", {
      "userId": "DJSPK7117L",
      "loginModeId": 1,
      "credentialModeId": 1,
      "ipV4": "192.168.22.22",
      "otpThroughDIT": false,
      "ditotpType": "",
      "pmsGuest": false,
      "isAIF": false,
      "mfGuest": false,
      "product": "MF"
    }).then(response => console.log('GenerateOtpNew Created:', response))
    .catch(error => console.error('GenerateOtpNew Error:', error));


  dataMapObjmo.makeRequest("POST", "https://api.moamc.com/loginapi/api/Login/GenerateOtp", {
      "panNo": "DJSPK7117L",
      "credentialModeId": 1,
      "clientType": "MF",
      "password": "",
      "Type": "GeneartePin"
    }).then(response => console.log('GenerateOtp Created:', response))
    .catch(error => console.error('GenerateOtp Error:', error));


  dataMapObjmo.makeRequest("POST", "https://api.moamc.com/loginapi/api/Login/AuthenticateUserCred", {
      "password": "4589",
      "userId": "DJSPK7117L",
      "loginModeId": 1,
      "credentialModeId": 3,
      "ipV4": "192.198.22.22",
      "otpThroughDIT": false,
      "ditotpType": "",
      "pmsGuest": false,
      "isAIF": false,
      "mfGuest": false,
      "product": "MF"
    }).then(response => console.log('AuthenticateUserCred Created:', response))
    .catch(error => console.error('AuthenticateUserCred Error:', error));


  dataMapObjmo.makeRequest("GET", "https://api.moamc.com/loginapi/api/Login/GetUserInfo")
    .then(response => console.log('GetUserInfo Created:', response))
    .catch(error => console.error('GetUserInfo Error:', error));

  dataMapObjmo.makeRequest("POST", "https://api.moamc.com/loginapi/api/Login/SETMPIN", {
      "userId": "DJSPK7117L",
      "clientType": "MF",
      "mpin": "4589",
      "confirmMpin": "4589"
    }).then(response => console.log('SETMPIN Created:', response))
    .catch(error => console.error('SETMPIN Error:', error));

  dataMapObjmo.makeRequest("POST", "https://api.moamc.com/loginapi/api/Login/SETMPIN", {
      "userId": "DJSPK7117L",
      "clientType": "MF",
      "mpin": "4589",
      "confirmMpin": "4589",
      "password": "999999"
    }).then(response => console.log('SETMPIN FORGET Created:', response))
    .catch(error => console.error('SETMPIN FORGET Error:', error));

  dataMapObjmo.makeRequest("POST", "https://api.moamc.com/InitAPI/api/Init/CVLKYCCheck", {
      "panNo": "DJSPK7117L"
    }).then(response => console.log('CVLKYCCheck Created:', response))
    .catch(error => console.error('CVLKYCCheck Error:', error));

  dataMapObjmo.makeRequest("POST", "https://api.moamc.com/prelogin/api/KYC/KYCProcess", {
      "name": "Dnyanesh S Kamthe",
      "email": "dnyaneshkamthe@gmail.com",
      "phone": "9511788333",
      "returnUrl": "https://mf.moamc.com/onboarding/personal",
      "timeOutUrl": "https://mf.moamc.com/error",
      "panNo": "DJSPK71170"
    }).then(response => console.log('KYCProcess Created:', response))
    .catch(error => console.error('KYCProcess Error:', error));

  dataMapObjmo.makeRequest("POST", "https://api.moamc.com/MFTransaction/api/InvestorDetails/panDetail", {
      "name": "Dnyanesh Kamthe",
      "email": "dnyaneshkamthe6@gmail.com",
      "phone": "9511788338",
      "returnUrl": "https://mf.moamc.com/onboarding/personal",
      "timeOutUrl": "https://mf.moamc.com/error",
      "panNo": "DJSPK7117N"
    }).then(response => console.log('panDetail Created:', response))
    .catch(error => console.error('panDetail Error:', error));

  dataMapObjmo.makeRequest("POST", "https://api.moamc.com/initapi/api/Init/Lmsentry", {
      "frmdata": "LMS~DJSPK7117L|DNYANESH SUKHDEO KAMTHE|+919021738421|dnyanesh451989@gmail.com||Mumbai||Y|MF New investor|||||||||false|"
    }).then(response => console.log('Lmsentry Created:', response))
    .catch(error => console.error('Lmsentry Error:', error));

  dataMapObjmo.makeRequest("POST", "https://mf.moamc.com/api/removeCookie", {}).then(response => console.log('removeCookie Created:', response))
    .catch(error => console.error('removeCookie Error:', error));

  dataMapObjmo.makeRequest("POST", "https://api.moamc.com/MFTransaction/api/InvestorDetails/panDetail", {
      "name": "Dnyanesh Sukhdeo Kamth",
      "panNo": "DJSPK71173",
      "otp": 0,
      "saveForLater": true

    }).then(response => console.log('panDetail different request Created:', response))
    .catch(error => console.error('panDetail different request Error:', error));

  dataMapObjmo.makeRequest("POST", "https://api.moamc.com/MFTransaction/api/InvestorDetails/ClientDetails", {
      "panNo": "DJSPK7117N"
    }).then(response => console.log('ClientDetails Created:', response))
    .catch(error => console.error('ClientDetails Error:', error));

  dataMapObjmo.makeRequest("POST", "https://api.moamc.com/prelogin/api/KYC/GetKYCData", {
      "panNo": "DJSPK7117N"
    }).then(response => console.log('GetKYCData Created:', response))
    .catch(error => console.error('GetKYCData Error:', error));

  dataMapObjmo.makeRequest("POST", "https://mf.moamc.com/mutualfund/api/v1/someFunc", {
      "apiName": "GetINAVandPrice"
    }).then(response => console.log('someFunc Created:', response))
    .catch(error => console.error('someFunc Error:', error));
}