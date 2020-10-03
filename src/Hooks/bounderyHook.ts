import {
  useCallback,
  useDispatch,
  useGlobal,
  useState,
  useEffect,
} from 'reactn';
import {
  CAMERA_CENTER_X, CAMERA_CENTER_Y,
  MAX_PASSABLE_MAP_TILE,
  CAMERA_WIDTH,
  CAMERA_HEIGHT
} from '../config/constants';
import { IGraphIndex, IPosition } from '../@types/Map';
import { usePrevious } from './usePreviousHook';
import { EAvatarDirection } from '../config/Enums';


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


  const attemptToMove = (x: number, y: number, direction: EAvatarDirection): void => {
    if (isInOfBounderies(x, y) && isPassable(x, y)) {
      changeDirection(direction);
      move(x, y);
    }
  };

  const changeDirection = (direction: EAvatarDirection): void => {
    direct(direction);
  };

  const walk = (path: IGraphIndex[]): void => {
    if (!path.length) {
      return;
    }
    setWalkPath(path);
  };

  const isInOfBounderies = (x: number, y: number): boolean => {
    return global.position.x + x >= 0 && global.position.y + y >= 0 &&
      global.position.x + x < dimensions.col && global.position.y + y < dimensions.row;
  };

  const isPassable = (x: number, y: number): boolean => {
    return district[global.position.y + y][global.position.x + x] < MAX_PASSABLE_MAP_TILE;
  };

  const updateWalkPath = useCallback(
    (dir: EAvatarDirection): void => {

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
    if (walkPath.length) {
      attemptToMove(walkPath[0].col, walkPath[0].row, EAvatarDirection.Right);
      setWalkPath(walkPath.slice(1));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [walkPath.length]);

  useEffect(() => {
    if (previousPortionMovement) {
      if (portionMovement.x - previousPortionMovement?.x > 0) {
        updateWalkPath(EAvatarDirection.Right);
      } else if (portionMovement.x - previousPortionMovement?.x < 0) {
        updateWalkPath(EAvatarDirection.Left);
      } else if (portionMovement.y - previousPortionMovement?.y < 0) {
        updateWalkPath(EAvatarDirection.Up);
      } else if (portionMovement.y - previousPortionMovement?.y > 0) {
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