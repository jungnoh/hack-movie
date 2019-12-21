import axios from 'axios';
import querystring from 'querystring';
import iconv from 'iconv-lite';

// User agent for requests
const REQUEST_UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.79 Safari/537.36';

export async function get(url: string) {
  return (await axios.get(url, {
    headers: {
      'User-Agent': REQUEST_UA
    }
  })).data;
}

export async function getKorean(url: string) {
  const buf = (await axios.get(url, {
    responseType: 'arraybuffer',
    headers: {
      'User-Agent': REQUEST_UA
    }
  })).data;
  return iconv.decode(buf as Buffer, 'cp949');
}

export async function post(url: string, body: any) {
  return (await axios.post(url, body, {
    headers: {
      'User-Agent': REQUEST_UA
    }
  })).data;
}


export async function postForm(url: string, body: any) {
  return (await axios.post(url, querystring.stringify(body),
    {
      headers: {
        'User-Agent': REQUEST_UA
      }
    }
  )).data;
}
