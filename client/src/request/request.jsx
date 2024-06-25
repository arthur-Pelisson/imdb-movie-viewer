import { useState } from 'react';
import axios from 'axios';
import {setCacheRequest, clearAll, cachedRequest} from './cacheRequest';

const RequestBuilder = () => {
  const [Status, setStatus] = useState("");
  const [Data, setData] = useState(null);
  const [Error, setError] = useState(null);
  // const [isCancel, setIsCancel] = useState(false);
  
  const header = {
    Authorization: "Bearer ",
  }

  //Ajout d'un delay pour tester le loading si besoin
  const DelayTest = async (ms, params) => {
    setTimeout( async () => {
      const cache = cachedRequest(params);
      if (cache && params.cacheKey !== undefined && params.cacheKey !== "") {
        setStatus('success');
        setData(cache);
      } else {
        const response = await axios[params.type](params.url, {
          data: params.data,
          cancelToken: params.cancelToken || null,
          headers: header,
        });
        console.log("RESPONSE : ", response);
        setStatus('success');
        setData(response.data);
        if (params.cacheKey !== undefined && params.cacheKey !== "") {
          setCacheRequest(params, response.data);
        }
      }
    }, ms );
  }
  
  const Request = async (params) => {
    if (params.debug) {
      console.log("type : " , params.type);
      console.log("url : " , params.url);
      console.log("data : " , params.data);
      console.log("cached : " , params.cacheKey);
      console.log(cachedRequest(params));
    }
      try {
        setStatus('loading');
        DelayTest(0, params);
      } catch (error) {
        if (axios.isCancel(error)) {
          // setIsCancel(true);
          console.log("Requête annulée :", error.message);
        } else {
          setStatus('error');
          setError(error);
        }
      }
    // clearAll();
  } 
  
  return { Data, Status, Error,Request };
};

export default RequestBuilder;