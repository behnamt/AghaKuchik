import React, { useEffect, useState } from 'reactn';
import Map from '../Map/Map';
import Avatar from '../Avatar/Avatar';
import { MAP_WIDTH, MAP_HEIGHT } from '../../config/constants';
import { district1, dimensions } from '../../data/districts/1';

function World() {
  const [district, setDistrict] = useState<number[][] | null>(null);

  useEffect(() => {
    setDistrict(district1);
  }, []);

  return (
    <div style={{
      width: MAP_WIDTH,
      height: MAP_HEIGHT,
      margin: '10px auto',
    }}
    >
      {district &&
        <Map district={district} dimensions={dimensions}>
          <Avatar district={district} dimensions={dimensions} />
        </Map>}
    </div>
  );
}

export default World;
