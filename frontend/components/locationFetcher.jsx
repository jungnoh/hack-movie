import React, { useEffect } from 'react';

export default function LocationFetcher(props) {
  const [loadNeeded, setLoadNeeded] = useEffect(true);
  const [loading, setLoading] = useEffect(false);

  if (loadNeeded && !loading) {
    setLoadNeeded(false);
    setLoading(true);
    navigator.geolocation.getCurrentPosition((position) => {
      setLoading(false);
      props.report(position);
    });
  }

  if (loading) {
    return (
      <div>
        위치 가져오는중..
      </div>
    )
  } else {
    return <div />;
  }
}