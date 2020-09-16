import { useCallback, useDispatch, useGlobal, useState, useEffect } from 'reactn';
import {
  CAMERA_CENTER_X, CAMERA_CENTER_Y,
  MAX_PASSABLE_MAP_TILE,
  EAvatarDirection,
  CAMERA_WIDTH,
  CAMERA_HEIGHT
} from '../config/constants';
import { IGraphIndex, IPosition } from '../@types/Map';
import { usePrevious } from './usePreviousHook';


function useBoundery(district: number[][], dimensions: { row: number, col: number }) {
  const getPortion = (x: number, y: number): number[][] =>
    district.map((row: number[]) => row.slice(x, x + CAMERA_WIDTH)).slice(y, y + CAMERA_HEIGHT);

  const move: any = useDispatch('move');
  const direct: any = useDispatch('direct');
  const [global] = useGlobal();
  const [position] = useGlobal('position');
  const [currentPortion, setCurrentPortion] = useState<number[][]>(getPortion(0, 0));
  const [walkPath, setWalkPath] = useState<IGraphIndex[]>([]);
  const [portionMovement, setPortionMovement] = useState<IPosition>({ x: 0, y: 0 });
  const previousPortionMovement = usePrevious<IPosition>(portionMovement);


  const attemptToMove = (x: number, y: number, direction: EAvatarDirection) => {
    if (isInOfBounderies(x, y) && isPassable(x, y)) {
      changeDirection(direction);
      move(x, y);
    }
  };

  const changeDirection = (direction: EAvatarDirection) => {
    direct(direction);
  };

  const getDirectionTo = (from: IPosition, to: IGraphIndex): EAvatarDirection => {
    const horizontalMovement = from.x - to.col;
    const verticalMovement = from.y - to.row;
    if (horizontalMovement === 0) {
      return verticalMovement >= 0 ? EAvatarDirection.Up : EAvatarDirection.Down;
    }

    return horizontalMovement >= 0 ? EAvatarDirection.Left : EAvatarDirection.Right;
  };

  const walk = (path: IGraphIndex[]) => {
    if (!path.length) {
      return;
    }

    setWalkPath(path);
  };

  const isInOfBounderies = (x: number, y: number) => {
    return global.position.x + x >= 0 && global.position.y + y >= 0 &&
      global.position.x + x < dimensions.col && global.position.y + y < dimensions.row;
  };

  const isPassable = (x: number, y: number) => {
    return district[global.position.y + y][global.position.x + x] < MAX_PASSABLE_MAP_TILE;
  };

  const updateWalkPath = useCallback(
    (dir: EAvatarDirection) => {
      console.log('updaating indices');
      
      let walkPathInstance: IGraphIndex[] = [];
      switch (dir) {
        case EAvatarDirection.Up:
          walkPathInstance = walkPath.map((item: IGraphIndex) => ({
            ...item,
            row: item.row + 1
          }));
          break;
        case EAvatarDirection.Down:
          walkPathInstance = walkPath.map((item: IGraphIndex) => ({
            ...item,
            row: item.row - 1
          }));
          break;
        case EAvatarDirection.Left:
          walkPathInstance = walkPath.map((item: IGraphIndex) => ({
            ...item,
            col: item.col + 1
          }));
          break;
        case EAvatarDirection.Right:
          walkPathInstance = walkPath.map((item: IGraphIndex) => ({
            ...item,
            col: item.col - 1
          }));
          break;
      }
      setWalkPath(walkPathInstance);
    },
    [walkPath],
  );

  useEffect(() => {

    (async () => {
      const a = new Promise((res, rej) => {
        setTimeout(() => { res(); }, 1000);
      });
      await a;
      if (walkPath.length){
        console.log('attempt');
        
        attemptToMove(walkPath[0].col, walkPath[0].row, EAvatarDirection.Right);
        setTimeout(()=>{}, 0);
        console.log('update walkPath');
        
        setWalkPath(walkPath.slice(1));
      }
    })();

  }, [walkPath.length]);

  useEffect(() => {
    if (previousPortionMovement) {

      if (portionMovement.x - previousPortionMovement?.x > 0) {
        console.log('right');
        updateWalkPath(EAvatarDirection.Right);
      } else if (portionMovement.x - previousPortionMovement?.x < 0) {
        console.log('left');
        updateWalkPath(EAvatarDirection.Left);
      } else if (portionMovement.y - previousPortionMovement?.y < 0) {
        console.log('up');
        updateWalkPath(EAvatarDirection.Up);
      } else if (portionMovement.y - previousPortionMovement?.y > 0) {
        console.log('down', portionMovement, previousPortionMovement);
        updateWalkPath(EAvatarDirection.Down);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [portionMovement, updateWalkPath]);

  useEffect(() => {
    let { x, y } = position;
    x = x < CAMERA_CENTER_X ? 0 : x - CAMERA_CENTER_X;
    y = y < CAMERA_CENTER_Y ? 0 : y - CAMERA_CENTER_Y;

    setPortionMovement({ x, y });
    setCurrentPortion(getPortion(x, y));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [position]);

  return {
    attemptToMove,
    currentPortion,
    changeDirection,
    walk,
  };
}
export { useBoundery };