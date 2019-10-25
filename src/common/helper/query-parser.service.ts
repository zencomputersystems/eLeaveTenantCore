import { DreamFactory } from '../../config/dreamfactory';

type DBRequest = [string, Array<string>, Array<string>, string, number];
/**
 * Service for query
 *
 * @export
 * @class QueryParserService
 */
export class QueryParserService {

  /**
   * Method generate db query 
   *
   * @returns
   * @memberof QueryParserService
   */
  generateDbQuery([tableName, fields, filters]: [string, Array<string>, Array<string>]) {
    // set url table name
    let url = DreamFactory.df_host + tableName + "?";

    // set field and filter
    let field = "";
    let filter = "";

    // extract and setup field data 
    if (fields.length > 0) {
      field = "fields=" + fields.join(",");
    }

    // extract and setup filter data
    if (filters.length > 0) {
      if (field !== "")
        filter = "&";
      // create filter parameter
      filter = filter + "filter=" + filters.join("AND");
    }

    // combine field and filter in parameter
    return url + field + filter;

  }

  /**
   * Method generate db query additional idfields parameter
   * Use url for create and uppdate
   *
   * @returns
   * @memberof QueryParserService
   */
  generateDbQueryV2([tableName, fields, filters, idFields]: [string, Array<string>, Array<string>, Array<string>]) {
    // set url table name
    let url = DreamFactory.df_host + tableName + "?";

    // setup param key and value for url
    const paramArray = [];

    // refactor data request
    this.refactor([paramArray, fields, filters, "AND"]);

    // get only field specify
    if (idFields.length > 0) {
      const idField = "id_field=" + idFields.map(res => encodeURIComponent(res)).join(",");
      paramArray.push(idField);
    }

    // generate url and return
    const buildurl = url + paramArray.join("&");
    return buildurl;

  }

  /**
   * function with sort and limit
   * use in all query contain limit and order condition
   * 
   * @param {DBRequest} data
   * @returns
   * @memberof QueryParserService
   */
  generateDbQueryV3([tableName, fields, filters, orders, limit]: DBRequest) {

    // let tableName: string = data[0];
    // let fields: Array<string> = data[1];
    // let filters: Array<string> = data[2];
    // let orders: string = data[3];
    // let limit: number = data[4];

    // set url table name
    let url = DreamFactory.df_host + tableName + "?";

    // setup param key and value for url
    const paramArray = [];

    // refactor data request
    this.refactor([paramArray, fields, filters, " "]);

    // order condition
    if (orders != null && orders != '' && orders != undefined) {
      const order = "order=" + orders;
      paramArray.push(order);
    }

    // limit data results
    if (limit != null && limit != undefined) {
      const limits = "limit=" + limit;
      paramArray.push(limits);
    }

    // generate url and return
    const buildurl = url + paramArray.join("&");
    return buildurl;

  }

  //const url = DreamFactory.df_host+this.table_name+"?id_field=TENANT_GUID%2CCOST_CENTRE_GUID";

  /**
   * Refactor function
   *
   * @param {any[]} paramArray
   * @param {string[]} fields
   * @param {string[]} filters
   * @param {string} whereArgs
   * @memberof QueryParserService
   */
  public refactor([paramArray, fields, filters, whereArgs]: [any[], string[], string[], string]) {
    // build the parameter
    if (fields.length > 0) {
      const field = "fields=" + fields.map(res => encodeURIComponent(res)).join(",");
      paramArray.push(field);
    }

    if (filters.length > 0) {
      const filter = "filter=" + filters.map(res => encodeURIComponent(res)).join(whereArgs);
      paramArray.push(filter);
    }

  }
}
