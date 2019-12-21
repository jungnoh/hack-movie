import React from 'react';
import Scanner from './sacnner';
import Main from './main';

const RootComponent = () => {

  const Movies = [{ title: "겨울왕국2", age: "12", isMorning: true, startTime: "08:00", endTime: "11:58", theater: "CGV 강남 7관" }, { title: "코물쥐", age: "전체", isMorning: false, startTime: "08:00", endTime: "11:58", theater: "CGV 강남 3관" }];
  const Movies1 = [{ src: "http://image2.megabox.co.kr/mop/poster/2019/37/FC0155-CBED-48D6-B4F8-0F686D79CE86.medium.jpg", title: "겨울왕국2" }, { src: "http://image2.megabox.co.kr/mop/poster/2019/5E/400265-8BAD-4767-AA82-63BE35EAFA85.medium.jpg", title: "캣츠" }, {}, {}, {}, {}, {}]
  const Theaters = [{ name: "tt9.3", distance: 9.3 }, { name: "tt9.9", distance: 9.9 }, { name: "tt8", distance: 8 }, { name: "tt9", distance: 9 }]
  Theaters.sort(function (a, b) {
    return a.distance < b.distance ? -1 : a.distance > b.distance ? 1 : 0;
  });
  return (
    <>
      {/* <Scanner movies={Movies} /> */}
      <Main movies={Movies1} theaters={Theaters} />
    </>
  );
}

export default RootComponent;
