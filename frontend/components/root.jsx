import React from 'react';
import Scanner from './scanner';
import Main from './main';
import Axios from 'axios';

const RootComponent = () => {

  const Movies = [{ title: "겨울왕국2", age: "12", isMorning: true, startTime: "08:00", endTime: "11:58", theater: "CGV 강남 7관" }, { title: "코물쥐", age: "전체", isMorning: false, startTime: "08:00", endTime: "11:58", theater: "CGV 강남 3관" }];
  const Movies1 = [{ src: "http://image2.megabox.co.kr/mop/poster/2019/37/FC0155-CBED-48D6-B4F8-0F686D79CE86.medium.jpg", title: "겨울왕국2" }, { src: "http://image2.megabox.co.kr/mop/poster/2019/5E/400265-8BAD-4767-AA82-63BE35EAFA85.medium.jpg", title: "캣츠" }, {}, {}, {}, {}, {}]
  const Theaters = [{ name: "tt9.3", distance: 9.3 }, { name: "tt9.9", distance: 9.9 }, { name: "tt8", distance: 8 }, { name: "tt9", distance: 9 }]
  Theaters.sort(function (a, b) {
    return a.distance < b.distance ? -1 : a.distance > b.distance ? 1 : 0;
  });
  const trendMovies = React.useState([]);
  const nearestTheaters = React.useState([]);
  React.useEffect(() => {
    // 영화 목록 가져오기
    Axios.get(`/api/trending`, { withCredentials: true })
      .then(ans => {
        trendMovies[1](ans.data.items)
        console.log("collected trend movies");
        for(const it of ans.data.items) {
          localStorage.setItem(it.naverCode, JSON.stringify(it));
        }
      })
      .catch(ans => {
        console.log(ans)
      })
    // 가까운 영화 목록 가져오기
    Axios.get(`/api/theater/near?x=127.03237293819225&y=37.588750090892205`, { withCredentials: true })
      .then(ans => {
        nearestTheaters[1](ans.data.theaters);
        console.log(ans.data.theaters[1])
        console.log("collected trend theaters");
      })
      .catch(ans => {
        console.log(ans)
      })
  }, []);

  var array = trendMovies[0];
  array.splice(9, 1);

  return (
    <>
      <Main movies={array} theaters={nearestTheaters[0]} />
      {/* <Scanner movies={Movies} /> */}
    </>
  );
}

export default RootComponent;
