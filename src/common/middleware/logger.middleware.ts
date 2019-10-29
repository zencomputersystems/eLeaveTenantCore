import { Logger } from "@nestjs/common";

/**
 * Logger function to log running api
 *
 * @export
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export function logger(req, res, next) {
  var data = `[HTTP/${req.httpVersion}] ${req.headers.referer}${req.url}`;
  Logger.log(data, req.method)
  next();
};