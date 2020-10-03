import React, { useCallback, useEffect, useState } from 'react';
import { useGlobal } from 'reactn';
import { IPosition } from '../../@types/Map';
import {
  CAMERA_CENTER_X,
  CAMERA_CENTER_Y,
  SPRITE_MOVEMENT_FRAMES, SPRITE_WIDTH,
  TILE_WIDTH
} from '../../config/constants';
import { EAvatarDirection, EkeyboardCode } from '../../config/Enums';
import { useBoundery } from '../../Hooks/bounderyHook';

interface IAvatarProps {
  district: number[][];
  dimensions: { row: number, col: number };
}

const Avatar: React.FC<IAvatarProps> = (props: IAvatarProps) => {
  const [top, setTop] = useState<number>(0);
  const [left, setLeft] = useState<number>(0);
  const [spritePosition, setSpritePosition] = useState<IPosition>({ x: 0, y: 0 });
  const [position] = useGlobal('position');
  const [direction] = useGlobal('direction');
  const { attemptToMove, changeDirection } = useBoundery(props.district, props.dimensions);

  const bindKeyboardListener = useCallback((event: KeyboardEvent): void => {
    event.preventDefault();

    switch (event.key) {
      case EkeyboardCode.Left:
        direction === EAvatarDirection.Left ? attemptToMove(-1, 0, EAvatarDirection.Left) : changeDirection(EAvatarDirection.Left);
        break;
      case EkeyboardCode.Up:
        direction === EAvatarDirection.Up ? attemptToMove(0, -1, EAvatarDirection.Up) : changeDirection(EAvatarDirection.Up);
        break;
      case EkeyboardCode.Right:
        direction === EAvatarDirection.Right ? attemptToMove(1, 0, EAvatarDirection.Right) : changeDirection(EAvatarDirection.Right);
        break;
      case EkeyboardCode.Down:
        direction === EAvatarDirection.Down ? attemptToMove(0, 1, EAvatarDirection.Down) : changeDirection(EAvatarDirection.Down);
        break;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attemptToMove]);

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

    setSpritePosition({ x: direction, y: (spritePosition.y + 1) % SPRITE_MOVEMENT_FRAMES });
    // eslint-disable-next-line react-hooks/exhaustive-deps
}, [position]);

  return (
    <div style={{
      position: 'absolute',
      backgroundImage: `url('${process.env.PUBLIC_URL}/img/avatar/avatar.png')`,
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
