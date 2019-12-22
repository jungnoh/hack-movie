import React, { useState } from 'react';
import styled from "styled-components";
import { store } from '../xhr';
import Axios from 'axios';

const padNumber = (n) => (n<10?`0${n}`:n);

const reserve = (theater) => {
  if (theater==='LOTTEC') {
      window.location.href='http://www.lottecinema.co.kr/LCHS/Contents/ticketing/ticketing.aspx';
  }
  else if (theater==='MEGABOX') {
    window.location.href='http://www.megabox.co.kr/?show=booking&p=step1';
  }
  else {
    window.location.href='http://www.cgv.co.kr/ticket/';
  }
};

const ListItem = (props) => {
  const { movie } = props;
  const movieItem = JSON.parse(localStorage.getItem(`${movie.movieCode}`));
  console.log(movieItem);
  return (
    <Item>
      <div className="movieInfo-container">
        <div className="title-container">
          <div className="title">
            <a href={`https://www.google.com/maps/place/@${props.list[movie.theaterCode].coordX},${props.list[movie.theaterCode].coordY},17z`} target="_blank">{props.list[movie.theaterCode].name}</a>
          </div>
          <div className="age">
            {movie.venue}
          </div>
        </div>
        <div className="time-container">
          {/* 조조인지 확인하고 빼는거 구현 못함 ㅜ */}
          <div className="startTime">
            {padNumber(movie.hour)}:{padNumber(movie.minute)}
          </div>
          <div className="endTime">
            &nbsp;{movie.runningTime}분 상영
          </div>
        </div>
      </div>
      <div className="button" onClick={() => reserve(props.list[movie.theaterCode].type)}>
        예매하기
      </div>
    </Item>
  );
}

export default function Scanner(props) {
  const [ths, setThs] = useState([]);
  const [tl, setTl] = useState(false);

  if (!tl) {
    Axios.get('/api/all-theaters').then(v => {
      setThs(v.data.theaters);
      setTl(true);
    });
  }

  if (!tl) {
    return (
      <div>Loading..</div>
    );
  }
  const items = props.slots.map((x, id) => <ListItem movie={x} key={id} list={ths} />);
  return (
    <>
      <h2>&nbsp;&nbsp;&nbsp;&nbsp;근처 상영</h2>
      <ItemList>
        {items}
      </ItemList>
    </>
  );
}


const ItemList = styled.div`
    position: relative;
    top: 20px;
    left: 20px;
    height: auto;
    text-align: left;
    margin-bottom: 30px;
`
const Item = styled.div`
    position: relative;
    width: 80%;
    height: 100px;
    border: 1px solid black;
    border-radius: 5px;
    margin-bottom: 10px;
    /* 첫번째 줄 - 영화 정보(제목, 시간) */
    .movieInfo-container {
        position: relative;
        display: flex;
        flex-direction: row;
        margin-top: 38px;
        margin-left: 20px;
        .title-container {
            margin-right: 20px;
            display: flex;
            flex-direction: row;
            height: 20px;
            .title {
                font-size: 20px;
                font-weight: bold;
                margin-right: 5px;
            }
            .age {
                font-size: 12px;
                color: #666;
                padding-top: 8px;
            }
        }
        .time-container {
            display: flex;
            flex-direction: row;
            height: 20px;
            .subtitle {
                top: -12px;
                font-size: 12px;
                color: #666;
                /* 아래 display 수정 필요 */
                display:${props => props.ismorning === 'true' ? "block" : "none"};
            }
            .startTime {
                font-size: 20px;
                color: #333;
                font-weight: 700;
            }
            .endTime {
                color: #333;
                font-size: 14px;
                padding-top: 8px;
            }
        }
    }
    /* 두 번째 줄 - 영화관 정보 */
    .theaterInfo-container {
        margin-left: 20px;
        margin-top: 30px;
        display: flex;
        flex-direction: row;
        .text {
            color: #333;
            font-size: 14px;
            margin-right: 8px;
        }
    }
    .button {
        cursor: pointer;
        position: absolute;
        bottom: 20px;
        right: 20px;
        width: 100px;
        height: 40px;
        background: #00887d;
        border: 3px solid #fff;
        border-radius: 5px;
        color: #fff;
        font-size: 20px;
        font-weight: bold;
        text-align: center;
        padding-top: 10px;
    }
    
`
/*
ItemList
    Item
        titlebox
            title
        timebox
            startTime
            endTime
            비고
        theaterbox
            theater
            theaterName
            roomName




*/
