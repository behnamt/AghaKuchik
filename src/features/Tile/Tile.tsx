import React from 'react';
import { MAX_PASSABLE_MAP_TILE, TILE_WIDTH } from '../../config/constants';

interface ITileProps {
  row: number;
  col: number;
  type: number;
  handleClick: (destination: { row: number, col: number }) => void;
}

const Tile: React.FC<ITileProps> = (props: ITileProps) => {
    const onClick = (): void => {
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
        backgroundImage: `url('${process.env.PUBLIC_URL}/img/tiles/${props.type}.png')`,
        backgroundSize: `${TILE_WIDTH}px ${TILE_WIDTH}px`,
      }}
      onClick={onClick}
    />
  );
};

export default Tile;
