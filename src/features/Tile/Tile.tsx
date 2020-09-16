/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { EMapTile, TILE_WIDTH, MAX_PASSABLE_MAP_TILE } from '../../config/constants';
import rock from './tablet.png';
import tree from './tree.png';
import wall1 from './wall-1.png';
import wall2 from './wall-2.png';
import wall3 from './wall-3.png';
import wallLeft from './wall-left.png';
import wallRight from './wall-right.png';
import cut1 from './cut-1.png';
import cut2 from './cut-2.png';
import door1 from './door-1.png';
import door2 from './door-2.png';

interface ITileProps {
  row: number;
  col: number;
  type: number;
  handleClick: (destination: {row: number, col: number}) => void;
}

const Tile: React.FC<ITileProps> = (props: ITileProps) => {
  function getTileImage(): string {
    switch (props.type) {
      case EMapTile.Grass:
        return '';
      case EMapTile.Rock:
        return rock;
      case EMapTile.Tree:
        return tree;
      case EMapTile.Wall1:
        return wall1;
      case EMapTile.Wall2:
        return wall2;
      case EMapTile.Wall3:
        return wall3;
      case EMapTile.Cut1:
        return cut1;
      case EMapTile.Cut2:
        return cut2;
      case EMapTile.WallLeft:
        return wallLeft;
      case EMapTile.WallRight:
        return wallRight;
      case EMapTile.DoorClosed:
        return door2;
      case EMapTile.DoorOpen:
        return door1;
      default:
        return '';
    }
  }

  const onClick = () => {
    if (props.type < MAX_PASSABLE_MAP_TILE) {
      props.handleClick({ row: props.row, col: props.col });
    }
  };
  
  return (
    <div
      style={{
        height: `${TILE_WIDTH}px`,
        width: `${TILE_WIDTH}px`,
        backgroundColor: 'green',
        backgroundImage: `url('${getTileImage()}')`,
        backgroundSize: `${TILE_WIDTH}px ${TILE_WIDTH}px`,
      }}
      onClick={onClick}
    />
  );
};

export default Tile;
