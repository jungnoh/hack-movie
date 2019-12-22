import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

export default function LocationFetcher(props) {
  const [loadNeeded, setLoadNeeded] = useState(true);
  const [loading, setLoading] = useState(false);

  if (loadNeeded && !loading) {
    setLoadNeeded(false);
    setLoading(true);
    navigator.geolocation.getCurrentPosition((position) => {
      console.log('asdf');
      setLoading(false);
      props.report(position);
    });
  }

  if (loading) {
    return (
      <TS>
        <div>
          위치 가져오는중..
        </div>
      </TS>
    )
  } else {
    return <div />;
  }
}

const TS = styled.div`
  .container {
    width: 100%;
    text-align: center;
  }
`;