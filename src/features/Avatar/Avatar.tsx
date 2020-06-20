import React, { useState, useEffect } from 'react';
import { useGlobal } from 'reactn';
import { SPRITE_WIDTH, CAMERA_CENTER_X, CAMERA_CENTER_Y } from '../../config/constants';
import avatar from '../../sprites/avatar.png';
import { useBoundery } from '../../Hooks/bounderyHook';

interface IAvatarProps {
  district: number[][];
  dimensions: { row: number, col: number };
}

const Avatar: React.FC<IAvatarProps> = (props:IAvatarProps) => {
  const [top, setTop] = useState(0);
  const [left, setLeft] = useState(0);
  const [position] = useGlobal('position');
  const { attemptToMove } = useBoundery(props.district, props.dimensions);


  const bindKeyboardListener = (event: KeyboardEvent) => {
    event.preventDefault();
    switch (event.keyCode) {
      case 37:
        attemptToMove(-1, 0);
        break;
      case 38:
        attemptToMove(0, -1);
        break;
      case 39:
        attemptToMove(1, 0);
        break;
      case 40:
        attemptToMove(0, 1);
        break;
    }
  };


  useEffect(() => {
    document.addEventListener('keydown', bindKeyboardListener);
    return () => {
      document.removeEventListener('keydown', bindKeyboardListener);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const x = position.x < CAMERA_CENTER_X ? position.x : CAMERA_CENTER_X;
    setLeft(x * SPRITE_WIDTH);
  }, [position]);

  useEffect(() => {
    const y = position.y < CAMERA_CENTER_Y ? position.y : CAMERA_CENTER_Y;
    setTop(y * SPRITE_WIDTH);
  }, [position]);
  return (
    <div style={{
      position: 'absolute',
      backgroundImage: `url('${avatar}')`,
      backgroundPositionX: 0,
      backgroundPositionY: 0,
      width: SPRITE_WIDTH,
      height: SPRITE_WIDTH,
      top,
      left,
    }}
    />
  );
};

export default Avatar;
