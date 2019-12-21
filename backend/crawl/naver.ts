// 네이버 영화 예메사이트 크롤링
import * as utils from './utils';
import cheerio from 'cheerio';
import { Coords, getCoordsFromAddress } from './map';

interface NaverTheater {
  code: string;
  name: string;
  type: string;
  address: string;
  coords: Coords;
}

interface MovieTime {
  venue: string; //관
  hour: number;
  minute: number;
  runningTime: number;
}

interface NaverMovie {
  date: string;
  movieCode: string;
  name: string;
  times: MovieTime[];
}

interface NaverMovieEntry {
  title: string;
  movieCode: string;
  posterUrl: string;
}

const padDate = (day: number) => {
  return day < 10 ? `0${day}` : `${day}`;
}
const createNaverDateString = (date: Date) => `${date.getFullYear()}-${padDate(date.getMonth()+1)}-${padDate(date.getDate())}`;

export async function getTheaterList(date: Date = new Date()): Promise<NaverTheater[]> {
  const response = await utils.postForm('http://ticket.movie.naver.com/AsyncRequest/GetTheater.aspx', {
    CMD: 'TLIST',
    M_ID: '',
    PLAY_DT: createNaverDateString(date),
    NT_ID: ''
  });
  return response;
}

/**
 * @description 해당 날에 영화관에서 상영하는 모든 영화와 시간을 반환
 * @param date 검색할 날짜 (기본값: 현재)
 * @param theaterCode 네이버 영화관 코드
 */
export async function theaterMovieList(theaterCode: string, date: Date = new Date()): Promise<NaverMovie[]> {
  const dateString = createNaverDateString(date);
  const singleQueryPromiseBuilder: (movieCode: string) => Promise<NaverMovie | null> = async (movieCode) => {
    const movieResp = await utils.postForm('http://ticket.movie.naver.com/AsyncRequest/GetPlayTime.aspx', {
      CMD: 'PLAYTIME_TLIST',
      M_ID: movieCode,
      T_LIST: theaterCode,
      PLAY_DT: dateString, 
    });
    const times: MovieTime[] = movieResp.map((x: any) => ({
      venue: x[8],
      hour: parseInt(x[11].substring(0, 2)),
      minute: parseInt(x[11].substring(2, 4)),
      runningTime: parseInt(x[12])
    }));
    if (movieResp.length === 0) {
      return null;
    } else {
      return {
        movieCode,
        date: dateString,
        times,
        name: movieResp[0][2]
      };
    }
  }
  const resp = await utils.postForm('http://ticket.movie.naver.com/AsyncRequest/GetMovie.aspx', {
    CMD: 'MLIST',
    T_ID: theaterCode,
    PLAY_DT: dateString
  });
  const promises = resp.map((x: any) => singleQueryPromiseBuilder(x.m2));
  return (await Promise.all(promises)).filter(x => x!==null) as NaverMovie[];
}

/**
 * @description 영화관의 주소를 반환
 * @param code 영화관 코드
 */
export async function naverTheaterAddress(code: string) {
  const url = `https://movie.naver.com/movie/bi/ti/basic.nhn?cpgcode=${code}`;
  const response = await utils.getKorean(url);
  const addressRaw = cheerio.load(response)('dl.summary > dd')[0].children[0].data!;
  return /\[([0-9\-]*?)\] (.*)$/.exec(addressRaw)![2];
}

/**
 * @description 네이버 영화목록 가져올 때 페이지에 포함된 영화관 목록을 파싱
 */
export async function loadTheaterData() {
  const response = await utils.get('http://ticket.movie.naver.com/Ticket/Reserve.aspx');
  const rawMovieList = JSON.parse(/objTheaterData1 = JSON.parse\('(.*?)'\);/.exec(response)![1]);
  
  const movieList: NaverTheater[] = [];
  for (const x of rawMovieList) {
    console.log(`Loading ${x[0]}: ${x[1]}`);
    try {
      const address = await naverTheaterAddress(x[0]);
      const tCoords = await getCoordsFromAddress(address);
      movieList.push({
        address,
        code: x[0],
        name: x[1],
        type: x[8],
        coords: tCoords
      });
    } catch (err) {
      console.log('Failed to add, skipping');
    }
  }
  return movieList;
}

/**
 * @description 네이버 영화목록 가져올 때 페이지에 포함된 영화 목록을 파싱
 */
export async function loadMovieData() {
  const response = await utils.get('http://ticket.movie.naver.com/Ticket/Reserve.aspx');
  const rawMovieList = JSON.parse(/objMovieData1 = JSON.parse\('(.*?)'\);/.exec(response)![1]);
  
  const movieList: NaverMovieEntry[] = [];
  for (const x of rawMovieList) {
    const title = x.m3;
    const code = x.m2;
    try {
      console.log(`Loading movie ${code}: ${title}`);
      const detailResp = await utils.get(`http://movie.naver.com/movie/api/yes24/movieLink.nhn?M_CODE=${code}`);
      const imgSrc = cheerio.load(detailResp)('div.poster img')[0].attribs['src'].replace(/\?type=(.*?)$/, '');
      movieList.push({
        movieCode: code,
        title,
        posterUrl: imgSrc
      });
    } catch (err) {
      console.log('Failed to add, skipping');
    }
  }
  return movieList;
}
