/* eslint-disable react/no-array-index-key */
import React, { ReactElement } from 'react';
import { useGlobal } from 'reactn';
import { CAMERA_HEIGHT, CAMERA_WIDTH, TILE_WIDTH } from '../../config/constants';
import { useBoundery } from '../../Hooks/bounderyHook';
import { useShortestPath } from '../../Hooks/shortestPathHook';
import Tile from '../Tile/Tile';
import './Map.scss';

interface IMapProps {
  children: ReactElement
  district: number[][];
  dimensions: { row: number, col: number };
}

const Map: React.FC<IMapProps> = (props: IMapProps) => {
  const { getShortestPath } = useShortestPath(props.district, props.dimensions);
  const { walk, currentPortion } = useBoundery(props.district, props.dimensions);
  const [position] = useGlobal('position');

  const handleClick = (destination: { row: number, col: number }): void => {
    const path = getShortestPath(position, destination);
    walk(path);
  };

  return (
    <div
      className="map"
      style={{
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
                    <Tile
                      key={colIndex}
                      type={tile}
                      row={rowIndex}
                      col={colIndex}
                      handleClick={handleClick}
                    />
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
