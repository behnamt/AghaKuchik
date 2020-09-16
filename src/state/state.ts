import { EAvatarDirection } from '../config/constants';

const INITIAL_STATE = {
  position: {
    x: 0,
    y: 0,
  },
  direction: EAvatarDirection.Down,
};
  
const INITIAL_REDUCERS = {
  move: (state: any, a: any, x: number, y: number)=> ({
    position: {
      x: state.position.x + x,
      y: state.position.y + y,
    },
  }),
  direct: (state: any, a: any, direction: EAvatarDirection)=> ({
    direction,
  }),
};
  
export {
  INITIAL_STATE,
  INITIAL_REDUCERS,
};