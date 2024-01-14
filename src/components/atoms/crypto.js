import CryptoJS from 'crypto-js';
const local = '6d090796-ecdf-11ea-adc1-0242ac112345';

export const encryptData = data => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), local).toString();
};

export const decryptData = data => {
  try {
    const bytes = CryptoJS.AES.decrypt(data, local);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  } catch (err) {
    return null;
  }
};
