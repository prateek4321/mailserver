import axios from "axios";

const API_URI = "";

const API_GMAIL = async (serviceUrlObject, requestData = {}, type) => {
  // type coming from useapi.jsx
  // gmail api
  const { params, urlParams, ...body } = requestData;

  return await axios({
    // it is asynchronous and so use async and await
    method: serviceUrlObject.method,
    url: `${API_URI}/${serviceUrlObject.endpoint}/${type}`, // passing the endpoint and the serviceobjecturl
    data: requestData, // payload in case of post request needed to pass data, whose handling done in useapi
  });
};

export default API_GMAIL;
