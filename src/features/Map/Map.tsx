/* eslint-disable react/no-array-index-key */
import React, { ReactElement } from 'react';
import { CAMERA_HEIGHT, CAMERA_WIDTH, TILE_WIDTH } from '../../config/constants';
import { useBoundery } from '../../Hooks/bounderyHook';
import './Map.scss';
import Tile from '../Tile/Tile';

interface IMapProps {
  children: ReactElement
  district: number[][];
  dimensions: { row: number, col: number };
}

const Map: React.FC<IMapProps> = (props: IMapProps) => {

  const { currentPortion } = useBoundery(props.district, props.dimensions);
  

  // const getNeighbours = (row: number, col: number): INeighbours => {
  //   const leftNeighbour = col === 0 ? -1 : currentPortion[row][col - 1];
  //   const topNeighbour = row === 0 ? -1 : currentPortion[row - 1][col];
  //   const rightNeighbor = col === CAMERA_WIDTH - 1 ? -1 : currentPortion[row][col + 1];
  //   const bottomNeighbour = row === CAMERA_HEIGHT - 1 ? -1 : currentPortion[row + 1][col];
  //   return {
  //     left: leftNeighbour,
  //     top: topNeighbour,
  //     right: rightNeighbor,
  //     bottom: bottomNeighbour,
  //   };
  // };

  return (
    <div
      className="map"
      style={{
        position: 'relative',
        height: CAMERA_HEIGHT * TILE_WIDTH,
        width: CAMERA_WIDTH * TILE_WIDTH,
      }}
    >
      {
        currentPortion.map((row: number[], rowIndex: number) => {
          return (
            <div key={rowIndex} className="row">
              {
                row.map((tile: number, colIndex: number) => {
                  return (
                    <Tile key={colIndex} type={tile} />
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
