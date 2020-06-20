
const INITIAL_STATE = {
  position: {
    x: 0,
    y: 0,
  }
};
  
const INITIAL_REDUCERS = {
  move: (state: any, a: any, x: number, y: number)=> ({
    position: {
      x: state.position.x + x,
      y: state.position.y + y,
    }
  }),
};
  
export {
  INITIAL_STATE,
  INITIAL_REDUCERS,
};