var CryptoJS = require("crypto-js");

export function encryptProcess([value, key]: [string, string]) {
  var ciphertext = CryptoJS.AES.encrypt(value, key);
  return ciphertext.toString();
}

export function decryptProcess([value, key]: [string, string]) {
  var bytes = CryptoJS.AES.decrypt(value, key);
  return bytes.toString(CryptoJS.enc.Utf8);
}