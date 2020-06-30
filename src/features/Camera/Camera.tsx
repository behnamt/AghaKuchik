import React, { ReactElement } from 'react';
import { CAMERA_WIDTH, CAMERA_HEIGHT, TILE_WIDTH } from '../../config/constants';

interface ICameraProps {
  district_dimensions: {col: number, row: number};
  children: ReactElement;
}
const Camera: React.FC<ICameraProps> = (props: ICameraProps) => {
  return (
    <div
      className="camera"
      style={{
        position: 'absolute',
        width: TILE_WIDTH * CAMERA_WIDTH,
        height: TILE_WIDTH * CAMERA_HEIGHT, 
      }}
    >
      {props.children}
    </div>
  );
};

export default Camera;
