import Axios from "axios";
import { isEmpty } from "lodash";

export const callApi = (
  type, //http method
  url, //endpoint
  data, //body
  contentType = "application/json",
  params = {}, //query-parameters
  headers = {}
) => {
  const options = {
    method: type,
    url: url,
    headers: {
      "content-type": contentType,
    },
  };
  if (headers.Authorization) {
    options.headers["Access-Control-Allow-Origin"] = "*";
    options.headers["Access-Control-Allow-Methods"] =
      "GET,PUT,POST,DELETE,PATCH,OPTIONS";
  }
  if (data) {
    options.data = data;
  }
  if (!isEmpty(params)) {
    options.params = params;
  }
  if (headers) {
    options.headers = { ...options.headers, ...headers };
  }
  return Axios(options)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
};
