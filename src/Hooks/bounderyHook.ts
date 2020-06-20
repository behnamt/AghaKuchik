import { MINIMUM_PASSABLE_MAP_TILE } from './../config/constants';
import { useDispatch, useGlobal } from 'reactn';
import { useState, useEffect } from 'react';
import { CAMERA_HEIGHT, CAMERA_WIDTH, CAMERA_CENTER_X, CAMERA_CENTER_Y } from '../config/constants';

function useBoundery(district: number[][], dimensions: { row: number, col: number }) {
  const getPortion = (x: number, y: number): number[][] =>
    district.map((row: number[]) => row.slice(x, x + CAMERA_WIDTH)).slice(y, y + CAMERA_HEIGHT);

  const [currentPortion, setCurrentPortion] = useState<number[][]>(getPortion(0, 0));
  const move: any = useDispatch('move');
  const [global] = useGlobal();
  const [position] = useGlobal('position');


  useEffect(() => {
    let { x, y } = position;
    x = x < CAMERA_CENTER_X ? 0 : x - CAMERA_CENTER_X;
    y = y < CAMERA_CENTER_Y ? 0 : y - CAMERA_CENTER_Y;

    setCurrentPortion(getPortion(x, y));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [position]);

  const attemptToMove = (x: number, y: number) => {
    if (isInOfBounderies(x, y) && isPassable(x, y)) {
      move(x, y);
    }
  };

  const isInOfBounderies = (x: number, y: number) => {
    return global.position.x + x >= 0 && global.position.y + y >= 0 &&
            global.position.x + x < dimensions.col && global.position.y + y < dimensions.row;
  };

  const isPassable = (x: number, y: number) => {
    return district[global.position.y + y][global.position.x + x] < MINIMUM_PASSABLE_MAP_TILE;
  };

  return {
    currentPortion,
    attemptToMove,
  };
}
export { useBoundery };