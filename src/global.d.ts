import { EAvatarDirection } from './config/constants';
import 'reactn';

declare module 'reactn/default' {
  export interface Reducers {
    move: (
      dispatch: Dispatch,
      position: object,
    ) => Pick<State, 'position'>;

  }
  
  export interface State {
    position: {
      x: number,
      y: number,
    };
    lastMove: EAvatarDirection;
  }
}