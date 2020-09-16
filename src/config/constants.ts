// tile and sprite should be the same value
export const SPRITE_WIDTH = 50;
export const TILE_WIDTH = 50;
export const SPRITE_MOVEMENT_FRAMES = 4;
export const MAP_WIDTH = SPRITE_WIDTH * 20;
export const MAP_HEIGHT = SPRITE_WIDTH * 10;
export const MAX_PASSABLE_MAP_TILE = 100;
export const CAMERA_WIDTH = 10;
export const CAMERA_HEIGHT = 5;
export const CAMERA_CENTER_X = Math.round(CAMERA_WIDTH / 2);
export const CAMERA_CENTER_Y = Math.floor(CAMERA_HEIGHT / 2);

export enum EMapTile {
  Grass= 0,
  DoorOpen=99,
  Rock=101,
  Tree=102,
  Wall1=110,
  Wall2=111,
  Wall3=112,
  WallLeft=113,
  WallRight=114,
  Cut1=115,
  Cut2=116,
  DoorClosed=117
}

export enum EAvatarDirection {
  None=-1,
  Down = 0,
  Left = 3,
  Up = 2,
  Right = 1,
}
