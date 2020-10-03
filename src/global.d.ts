import 'reactn';
import { IPosition } from './@types/Map';
import { EAvatarDirection } from './config/Enums';

declare module 'reactn/default' {
  export interface Reducers {
    move: (
      dispatch: Dispatch,
      position: object,
      direction: EAvatarDirection
    ) => Pick<State, 'position'>;
    direct: (
      dispatch: Dispatch,
      direction: EAvatarDirection,
    ) => Pick<State, 'last'>;

  }
  
  export interface State {
    position: IPosition;
    direction: EAvatarDirection;
  }
}