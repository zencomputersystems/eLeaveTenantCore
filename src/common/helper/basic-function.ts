import { NotFoundException } from '@nestjs/common';

// start encrypt function //
var CryptoJS = require("crypto-js");

export function encryptProcess([value, key]: [string, string]) {
  var ciphertext = CryptoJS.AES.encrypt(value, key);
  return ciphertext.toString();
}

export function decryptProcess([value, key]: [string, string]) {
  var bytes = CryptoJS.AES.decrypt(value, key);
  return bytes.toString(CryptoJS.enc.Utf8);
}
// end encrypt process // 

// get id parameter whether from param or query request
// req = request query
// key = key to find
// id = if no data get from @Param() variable id
export function verifyParam([req, key, id]: [any, string, string]) {
  let dataId = null;
  let dataIdParam = req.query[key];
  if (dataIdParam == null) {
    dataId = id;
  } else {
    dataId = dataIdParam;
  }
  if (dataId == null || dataId == '{' + key + '}') {
    throw new NotFoundException(`Item ${key} not found`);
  }
  return dataId;

}