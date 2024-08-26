
import axios, { AxiosError, AxiosResponse } from 'axios';
import { responseToJSONStringify, toJson, validResponse } from './utils/raenaUtils';
import RaenaResponse from './dto/RaenaResponse';
import RaenaRequestConfigDefault from './config/RaenaRequestConfig'
import CrawlingExeption from './exception/CrawlingException';


const RequestRaenaAPI = async (): Promise<RaenaResponse> => {
  // for query item : [{"query":"ACNES Sealing Jell 9 gr","first":5}]
  let data = `[{"after":"${RaenaRequestConfigDefault.after}","before":"${RaenaRequestConfigDefault.before}","query":"${RaenaRequestConfigDefault.query}","first":${RaenaRequestConfigDefault.first}}]`;
  let config = {
    method: 'POST',
    url: 'https://raenabeauty.com/product-catalog/categories/skincare',
    headers: { 
      'Next-Action': 'fc08fe102e9d5e3c722b8b8ba86125cf7f232dc2',
      'Content-Type': 'text/plain',
      'Accept': 'application/json'
    },
    data : data
  };

  const response = await axios.post(config.url, data, {
      headers: config.headers
  })
  .then((response: AxiosResponse) => processRaenaResponse(response.data))
  .catch((error: AxiosError) => {
    throw new CrawlingExeption(
      `Error while fetching data \n>> Headers : ${error.response?.headers} \n>> Body : ${error.response?.data}`)
  });

  return response;
};

const processRaenaResponse = (data: string): RaenaResponse => {
    const startIndex = validResponse(data);
    const stringData = responseToJSONStringify(data, startIndex);
    
    return toJson(stringData);
}

const doRequestRaena = async () => {
  for (let i=0; i< 2; i++) {
    await RequestRaenaAPI().then(data => {
      console.log(data)
      if (data.pageInfo.hasNextPage) {
        RaenaRequestConfigDefault.after = data.pageInfo.startCursor;
      }
    })
  }
}

doRequestRaena()

// todo:
// - 
// - setup shopee API
// - setup tokopedia API
