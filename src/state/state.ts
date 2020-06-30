import { EAvatarDirection } from '../config/constants';

const INITIAL_STATE = {
  position: {
    x: 0,
    y: 0,
  },
  lastMove: EAvatarDirection.None,
};
  
const INITIAL_REDUCERS = {
  move: (state: any, a: any, x: number, y: number, direction: EAvatarDirection)=> ({
    position: {
      x: state.position.x + x,
      y: state.position.y + y,
    },
    lastMove: direction,
  }),
};
  
export {
  INITIAL_STATE,
  INITIAL_REDUCERS,
};