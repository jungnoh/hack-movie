import React from 'react';
import styled from "styled-components";
import GoogleMapReact from 'google-map-react';

const Main = (props) => {
    const seletedMovie = React.useState({});
    const seletedTheater = React.useState({});
    React.useEffect(() => {
        console.log("movie: ", seletedMovie[0]);
        console.log("theater: ", seletedTheater[0]);
    })
    return (<>
        <MovieList>
            {props.movies.map((movie, idx) => {
                return (
                    <div key={idx} className="movie-container" onClick={() => { seletedMovie[1](movie) }}>
                        <div className="poster">
                            <img src={movie.posterUrl} alt={movie.title} />
                        </div>
                        <div className="title">
                            {movie.title}
                        </div>
                    </div>
                )
            })}
        </MovieList>
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
                                        <tr key={idx} onClick={() => { seletedTheater[1](theater) }}>
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

            </div>
        </TheaterList>
    </>);
}

export default Main;

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
        background-color: salmon;
        height: 300px;
        margin: 20px;
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
                contain: cover;
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
