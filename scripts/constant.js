export const dataMapObjmo = {
  makeRequest(method, url, data = null) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.open(method, url);
      xhr.setRequestHeader('Content-Type', 'application/json');

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            resolve(JSON.parse(xhr.responseText));
          } catch (e) {
            resolve(xhr.responseText); // fallback if not JSON
          }
        } else {
          reject(new Error(`Request failed with status ${xhr.status}`));
        }
      };

      xhr.onerror = () => reject(new Error('Network error'));

      xhr.send(data ? JSON.stringify(data) : null);
    });
  },

};

export const dataObjTemp = {
  inception_Ret: 'SINCE INCEPTION',
  oneYear_Ret: '1 YEAR',
  threeYear_Ret: '3 YEAR',
  fiveYear_Ret: '5 YEAR',
  sevenYear_Ret: '7 YEAR',
  tenYear_Ret: '10 YEAR',
  'SINCE INCEPTION': 'inception_Ret',
  '1 YEAR': 'oneYear_Ret',
  '3 YEAR': 'threeYear_Ret',
  '5 YEAR': 'fiveYear_Ret',
  '7 YEAR': 'sevenYear_Ret',
  '10 YEAR': 'tenYear_Ret',
};
