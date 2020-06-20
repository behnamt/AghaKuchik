export const SPRITE_WIDTH = 40;
export const MAP_WIDTH = SPRITE_WIDTH * 20;
export const MAP_HEIGHT = SPRITE_WIDTH * 10;
export const MINIMUM_PASSABLE_MAP_TILE = 100;

export enum EMapTile {
  Grass= 0,
  Rock=101,
  Tree=102,
}

export const CAMERA_WIDTH = 10;
export const CAMERA_HEIGHT = 5;
export const CAMERA_CENTER_X = Math.round(CAMERA_WIDTH / 2);
export const CAMERA_CENTER_Y = Math.floor(CAMERA_HEIGHT / 2);
