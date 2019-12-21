import * as utils from './utils';
import axios from 'axios';

export interface Coords {
  x: number;
  y: number;
}

export async function getCoordsFromAddress(address: string): Promise<Coords> {
  address = address.replace(/ [0-9\-~]+?층$/, '');
  const url = `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURI(address)}`;
  const resp = (await axios.get(url, {
    headers: {
      'Authorization': `KakaoAK ${process.env.KAKAO_KEY}`
    }
  })).data;
  return {
    x: resp.documents[0].address.x,
    y: resp.documents[0].address.y
  }
}
