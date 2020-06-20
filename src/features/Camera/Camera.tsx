import React, { ReactElement } from 'react';
import { SPRITE_WIDTH, CAMERA_WIDTH, CAMERA_HEIGHT } from '../../config/constants';

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
        width: SPRITE_WIDTH * CAMERA_WIDTH,
        height: SPRITE_WIDTH * CAMERA_HEIGHT, 
      }}
    >
      {props.children}
    </div>
  );
};

export default Camera;
