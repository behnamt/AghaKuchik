/* eslint-disable react/no-array-index-key */
import React, { ReactElement } from 'react';
import './Map.scss';
import { SPRITE_WIDTH, CAMERA_WIDTH, CAMERA_HEIGHT, EMapTile } from '../../config/constants';
import { useBoundery } from '../../Hooks/bounderyHook';

interface IMapProps {
  children: ReactElement
  district: number[][];
  dimensions: { row: number, col: number };
}

const Map: React.FC<IMapProps> = (props: IMapProps) => {

  const { currentPortion } = useBoundery(props.district, props.dimensions);

  function getTileType(type: number): string {
    switch (type) {
      case EMapTile.Grass:
        return 'grass';
      case EMapTile.Rock:
        return 'rock';
      case EMapTile.Tree:
      default:
        return 'tree';
    }

  }

  return (
    <div
      className="map"
      style={{
        position: 'relative',
        height: CAMERA_HEIGHT * SPRITE_WIDTH,
        width: CAMERA_WIDTH * SPRITE_WIDTH,
      }}
    >
      {
        currentPortion.map((row: number[], rowIndex: number) => {
          return (
            <div key={rowIndex} className="row">
              {
                row.map((tile: number, colIndex: number) => {
                  return (
                    <div key={colIndex} className={`tile tile--${getTileType(tile)}`} />
                  );
                })
              }
            </div>
          );
        })
      }
      {
        props.children
      }
    </div>
  );
};

export default Map;
