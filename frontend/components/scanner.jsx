import React from 'react';
import styled from "styled-components";

const ListItem = (props) => {
  const {movie} = props;
  <Item key={idx}>
    <div className="movieInfo-container">
      <div className="title-container">
          <div className="title">
            {movie.movieCode}
          </div>
          <div className="age">
            {movie.venue}
          </div>
      </div>
      <div className="time-container">
          {/* 조조인지 확인하고 빼는거 구현 못함 ㅜ */}
          <div className="startTime">
            {movie.hour}:{movie.minute}
          </div>
          <div className="endTime">
            {movie.runningTime}
          </div>
      </div>
    </div>
    <div className="theaterInfo-container">
      <div className="text">
        {movie.theaterCode}
      </div>
    </div>
    <div className="button">
      예매하기
    </div>
  </Item>
}

export default function Scanner(props) {
  const items = props.slots.map((x, id) => <ListItem movie={x} key={id} />);
  return (
    <ItemList>
      {items}
    </ItemList>
  );
}

export default Scanner;

const ItemList = styled.div`
    position: relative;
    top: 20px;
    left: 20px;
    width: 500px;
    height: auto;
    text-align: left;
    margin-bottom: 30px;
`
const Item = styled.div`
    position: relative;
    width: 100%;
    height: 100px;
    border: 1px solid black;
    border-radius: 5px;
    margin-bottom: 10px;
    /* 첫번째 줄 - 영화 정보(제목, 시간) */
    .movieInfo-container {
        position: relative;
        display: flex;
        flex-direction: row;
        margin-top: 10px;
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
