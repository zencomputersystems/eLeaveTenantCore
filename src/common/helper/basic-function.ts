import { NotFoundException, HttpModule, HttpStatus } from '@nestjs/common';
import { DreamFactory } from '../../config/dreamfactory';

//  ---------------------------------------------------------------------------------------------------------------------------------------------------
/**
 * Declare base module http
 */
const baseModule = HttpModule.register({ headers: { 'Content-Type': 'application/json', 'X-Dreamfactory-API-Key': DreamFactory.df_key } });
/**
 * Return http base module
 *
 * @export
 * @returns
 */
export function getModuleHttp() {
  return baseModule;
}

/**
 * Show error
 *
 * @export
 * @param {*} err
 * @returns
 */
export function getResErr(err) { return err.response.data.error.context.resource }



//  ---------------------------------------------------------------------------------------------------------------------------------------------------
/**
 * Declare cryptojs library
 */
var CryptoJS = require("crypto-js");
/**
 * Encrypt process
 *
 * @export
 * @param {[string, string]} [value, key]
 * @returns
 */
export function encryptProcess([value, key]: [string, string]) {
  var ciphertext = CryptoJS.AES.encrypt(value, key);
  return ciphertext.toString();
}
/**
 * Decrypt process
 *
 * @export
 * @param {[string, string]} [value, key]
 * @returns
 */
export function decryptProcess([value, key]: [string, string]) {
  var bytes = CryptoJS.AES.decrypt(value, key);
  return bytes.toString(CryptoJS.enc.Utf8);
}



//  ---------------------------------------------------------------------------------------------------------------------------------------------------
/**
 * get id parameter whether from param or query request
 * req = request query
 * key = key to find
 * id = if no data get from @Param() variable id
 *
 * @export
 * @param {[any, string, string]} [req, key, id]
 * @returns
 */
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



//  ---------------------------------------------------------------------------------------------------------------------------------------------------
/**
 * Set update data (declare once only in all update api)
 *
 * @export
 * @param {[any, string]} [data, userGuid]
 * @returns
 */
export function setUpdateData([data, userGuid]: [any, string]) {
  data.UPDATE_TS = (new Date(Date.now() - ((new Date()).getTimezoneOffset() * 60000))).toISOString().slice(0, -1);
  data.UPDATE_USER_GUID = userGuid;
  return data;
}


// From common function service

/**
     * general create function
     *
     * @param {*} method
     * @param {*} res
     * @memberof CommonFunctionService
     */
export function runCreateService([method, res]) {
  getResults([method, res, 'Fail to create resource']);
}

/**
 * general update function
 *
 * @param {*} method
 * @param {*} res
 * @memberof CommonFunctionService
 */
export function runUpdateService([method, res]) {
  getResults([method, res, 'Fail to update resource']);
}

/**
 * calendar profile n role profile list
 *
 * @param {*} method
 * @param {*} res
 * @memberof CommonFunctionService
 */
export function runGetServiceV2([method, res]) {
  method.subscribe(
    data => { res.send(data); },
    err => { sendResErrorV2([res, HttpStatus.BAD_REQUEST, 'Fail to fetch resource']); }
  );
}

/**
* Get result method refactor
*
* @param {*} method
* @param {*} res
* @param {*} message
* @memberof CommonFunctionService
*/
export function getResults([method, res, message]) {
  method.subscribe(
    data => {
      if (data.status === 200) {
        res.send(data.data.resource);
      } else {
        res.status(data.status);
        res.send();
      }
    },
    err => {
      // console.log(err.response.data.error.context.resource);
      const response: { status: string } = { status: message };
      sendResErrorV2([res, HttpStatus.BAD_REQUEST, response]);
    }
  );
}

/**
 * Failed response with custom code
 *
 * @param {*} res
 * @param {*} code
 * @param {*} msg
 * @memberof CommonFunctionService
 */
export function sendResErrorV2([res, code, msg]) { //sendErrorV2
  res.status(code);
  res.send(msg);
}

/**
 * Run service callback
 *
 * @export
 * @param {*} method
 * @returns
 */
export async function runServiceCallback(method) {
  const cbService = () => {
    return new Promise((resolve, reject) => {
      method.subscribe(
        data => {
          resolve(data);
        }, err => {
          return reject(err);
        }
      )
    })
  }
  return await cbService();
}