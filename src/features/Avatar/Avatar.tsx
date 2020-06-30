import React, { useCallback, useEffect, useState } from 'react';
import { useGlobal } from 'reactn';
import { CAMERA_CENTER_X, CAMERA_CENTER_Y, SPRITE_WIDTH, SPRITE_MOVEMENT_FRAMES, TILE_WIDTH, EAvatarDirection } from '../../config/constants';
import { useBoundery } from '../../Hooks/bounderyHook';
import avatar from './avatar.png';

interface IAvatarProps {
  district: number[][];
  dimensions: { row: number, col: number };
}

enum EkeyboardCode {
  Left = 37,
  Up = 38,
  Right = 39,
  Down = 40,
}

interface ISpritePosition {
  x: number;
  y: number;
}

const Avatar: React.FC<IAvatarProps> = (props: IAvatarProps) => {
  const [top, setTop] = useState<number>(0);
  const [left, setLeft] = useState<number>(0);
  const [direction, setDirection] = useState<EAvatarDirection>(EAvatarDirection.Down);
  const [spritePosition, setSpritePosition] = useState<ISpritePosition>({ x: 0, y: 0 });
  const [position] = useGlobal('position');

  const { attemptToMove } = useBoundery(props.district, props.dimensions);

  const bindKeyboardListener = useCallback((event: KeyboardEvent) => {
    event.preventDefault();

    switch (event.keyCode) {
      case EkeyboardCode.Left:
        direction === EAvatarDirection.Left ? attemptToMove(-1, 0, EAvatarDirection.Left) : setDirection(EAvatarDirection.Left);
        break;
      case EkeyboardCode.Up:
        direction === EAvatarDirection.Up ? attemptToMove(0, -1, EAvatarDirection.Up) : setDirection(EAvatarDirection.Up);
        break;
      case EkeyboardCode.Right:
        direction === EAvatarDirection.Right ? attemptToMove(1, 0, EAvatarDirection.Right) : setDirection(EAvatarDirection.Right);
        break;
      case EkeyboardCode.Down:
        direction === EAvatarDirection.Down ? attemptToMove(0, 1, EAvatarDirection.Down) : setDirection(EAvatarDirection.Down);
        break;
    }
  }, [attemptToMove, direction]);

  useEffect(() => {
    setSpritePosition({ x: direction, y: 0 });
  }, [direction]);

  useEffect(() => {
    document.addEventListener('keydown', bindKeyboardListener);
    return () => {
      document.removeEventListener('keydown', bindKeyboardListener);
    };
  }, [bindKeyboardListener]);

  useEffect(() => {
    const x = position.x < CAMERA_CENTER_X ? position.x : CAMERA_CENTER_X;
    setLeft(x * TILE_WIDTH);

    const y = position.y < CAMERA_CENTER_Y ? position.y : CAMERA_CENTER_Y;
    setTop(y * TILE_WIDTH);

    setSpritePosition({ x: direction, y: (spritePosition.y+1) % SPRITE_MOVEMENT_FRAMES });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [position]);

  return (
    <div style={{
      position: 'absolute',
      backgroundImage: `url('${avatar}')`,
      backgroundPositionX: spritePosition.x * SPRITE_WIDTH,
      backgroundPositionY: spritePosition.y * SPRITE_WIDTH,
      width: TILE_WIDTH,
      height: TILE_WIDTH,
      top,
      left,
    }}
    />
  );
};

export default Avatar;
