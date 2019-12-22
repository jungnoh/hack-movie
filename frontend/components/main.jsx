import React, {useState} from 'react';
import styled from "styled-components";
import GoogleMapReact from 'google-map-react';
import LocationFetcher from './locationFetcher';
import * as xhr from '../xhr';
import Scanner from './scanner';

const setLocation = (location) => {
  localStorage.setItem('location-x', location.coords.longitude);
  localStorage.setItem('location-y', location.coords.latitude);
}

const searchClicked = (movie, cb) => {
  xhr.loadNearestMovies(localStorage.getItem('location-x'), localStorage.getItem('location-y'), movie, cb);
}


const Main = (props) => {
    const seletedMovieIdx = React.useState(0);
    const seletedTheaterIdx = React.useState(0);
    React.useEffect(() => {
        console.log("movie: ", seletedMovieIdx[0]);
        console.log("theater: ", seletedTheaterIdx[0]);
    })
    const Movie = (props) => {
        return (
            <div className="movie-container" onClick={() => { seletedMovieIdx[1](props.idx) }} style={{ backgroundColor: props.background }}>
                <div className="poster">
                    <img src={props.movie.posterUrl} alt={props.movie.title} />
                </div>
                <div className="title">
                    {props.movie.title}
                </div>
            </div>
        )
    }
    return (<>
        <h2>&nbsp;&nbsp;&nbsp;&nbsp;지금 인기있는 영화</h2>
        <MovieList>
            {props.movies.map((movie, idx) => {
                return (
                    <Movie key={idx} idx={idx} movie={movie} background={idx === seletedMovieIdx[0] ? "black" : "transparent"} />
                )
            })}
        </MovieList>
        <h2>&nbsp;&nbsp;&nbsp;&nbsp;나와 가까운 극장</h2>
        <TheaterList>
            <div className="theaterBox">
                <div className="head-table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>순위</th>
                                <th>극장</th>
                                {/* <th>거리</th> */}
                            </tr>
                        </thead>
                    </table>

                </div>
                <div className="body-table-container">
                    <table>
                        <tbody>
                            {
                                props.theaters.map((theater, idx) => {
                                    return (
                                        <tr key={idx} onClick={() => { seletedTheaterIdx[1](idx) }}>
                                            <td>{idx}</td>
                                            <td>{theater.name}</td>
                                            {/* <td>{theater.distance}km</td> */}
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="mapBox">
                {/* <GoogleMapReact
                    bootstrapURLKeys={{ key: 'AIzaSyCGdylwOS37HVgu289UA6q2J4omA81Rd-w' }}
                    defaultCenter={{ lat: props.theaters[seletedTheaterIdx[0]].coordX, lng: props.theaters[seletedTheaterIdx[0]].coordY }}
                    defaultZoom={11}
                >
                </GoogleMapReact> */}
                {props.movies.map((movie, idx) => {
                    if (idx === seletedMovieIdx[0]) {
                        return (
                            <img key={idx} src={movie.posterUrl} alt={movie.title} />
                        )
                    }
                    else {
                        return (<div key={idx} ></div>)
                    }
                })}
            </div>
        </TheaterList>
        <LocationFetcher report={(location) => {
            setLocation(location);
            setLocFound(true);
        }} />
        <SearchRegion>
        <div className={`btn-container ${locFound?'':'disabled'}`} onClick={searchHandler}>
            검색
        </div>
        </SearchRegion>
        <Scanner slots={results} />
    </>);
}

export default Main;

const SearchRegion = styled.div`
  .btn-container {
    height: 4rem;
    margin: 0.5rem 20px;
    background-color: #0000FF;
    border-radius: 2rem;
    box-sizing: border-box;
    justify-content: center;
    align-items: center;
    display: flex;
    font-size: 1.5rem;
    user-select: none;
  }
  .btn-container:hover {

  }
  .btn-container.disabled, .btn-container.disabled:hover {
    background-color: #0000aa;
  }
`;

const TheaterList = styled.div`
    position: relative;
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 340px;
    .theaterBox {
        position: relative;
        width: calc(100% - 360px);
        height: 300px;
        margin: 20px;
        margin-right: 0px;
        box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.16);
        .head-table-container {
            width: 100%;
            height:62px;
        }
        .body-table-container {
            width: 100%;
            height:calc(100% - 62px);
            overflow: auto;
        }
        table {
            position: relative;
            width: 100%;
            height: 100%;
            border-collapse: collapse;
            text-align: center;
            thead {
                height: 60px;
                box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.16);
                background-color: #ffffff;
                overflow: auto;
            }
            th {
                height: 60px;
                font-size: 16px;
                font-weight: normal;
                font-stretch: normal;
                font-style: normal;
                line-height: 1.19;
                letter-spacing: -0.38px;
                color: #000000;
            }
            td {
                height: 50px;
                width: 33%;
                border-bottom: 1px solid #707070;
                padding: 10px;
                font-size: 16px;
                font-weight: normal;
                font-stretch: normal;
                font-style: normal;
                line-height: 1.13;
                letter-spacing: normal;
                color: #707070;
            }
        }
    }
    .mapBox {
        position: relative;
        width: 300px;
        //background-color: salmon;
        height: 300px;
        margin: 20px;
        img {
                position: relative;
                width: 150px !important;
                vertical-align: middle;
                left: 50%;
                transform: translate(-50%, 0%);
                top: 50px;
        }
    }
`
const MovieList = styled.div`
    position: relative;
    width: calc(100% - 50px);
    left: 20px;
    background-color: #333;
    padding-left: 10px;
    height: 280px;
    overflow: auto;
    white-space: nowrap;
    .movie-container {
        position: relative;
        display: inline-block;
        width: 150px;
        margin: 10px;
        background: transparent;
        height: 260px;
        .poster {
            position: absolute;
            top: 10px;
            width: 150px;
            height: 213px;
            border: 1px solid black;
            img {
                width: 150px !important;
                vertical-align: middle;
            }
        }
        .title {
            position: absolute;
            width: 100%;
            height: 12px;
            bottom: 15px;
            text-align: center;
            font-size: 14px;
            color: #ffffff;
            font-weight: 600;
        }
    }
`