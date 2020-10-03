import { useCallback, useEffect, useState } from 'react';
import { IPosition, IGraphIndex } from '../@types/Map';
import { MAX_PASSABLE_MAP_TILE } from '../config/constants';

interface IDijekstra {
  value: number;
  dist: number;
  visited: boolean;
  colIdx: number;
  rowIdx: number;
  prev: IDijekstra | undefined;
}

interface IShortestPathHook {
  getShortestPath: (currentPosition: IPosition, destination: IGraphIndex) => IGraphIndex[];
}

const useShortestPath = (district: number[][], dimensions: IGraphIndex): IShortestPathHook => {

  const [graph, setGraph] = useState<IDijekstra[][]>([[]]);

  const resetDistrict = useCallback(
    (): void => {
      const resultGraph = district.map((row, rowIdx): IDijekstra[] => row.map((col, colIdx): IDijekstra => {
        return { value: col < MAX_PASSABLE_MAP_TILE ? 1 : -1, dist: Infinity, prev: undefined, visited: false, colIdx, rowIdx };
      }));
      setGraph(resultGraph);

    },
    [district, setGraph],
  );

  const getQueue = (_graph: IDijekstra[][]): IDijekstra[] => {
    return _graph.reduce((acc: IDijekstra[], curr: IDijekstra[]) => acc.concat(curr));
  };

  const sortQueue = (queue: IDijekstra[]): IDijekstra[] => {
    const filtered = queue.filter((item: IDijekstra) => item.value > 0);
    const sorted = filtered.sort((a: IDijekstra, b: IDijekstra): number => {
      return a.dist < b.dist ? -1 : 1;
    });
    return sorted;
  };

  const isOutsideofBoundery = (i: number, j: number): boolean => {
    return i < 0 || j < 0 || i > dimensions.row - 1 || j > dimensions.col - 1;
  };

  const getNeighbours = (node: IDijekstra, graphInstance: IDijekstra[][]): IDijekstra[] => {
    const resultIndices: IDijekstra[] = [];
    const availableNeighbors = [
      { i: node.rowIdx - 1, j: node.colIdx },
      { i: node.rowIdx + 1, j: node.colIdx },
      { i: node.rowIdx, j: node.colIdx },
      { i: node.rowIdx, j: node.colIdx + 1 },
      { i: node.rowIdx, j: node.colIdx - 1 },
    ];
    availableNeighbors.forEach((neighbourItem) => {
      if (!isOutsideofBoundery(neighbourItem.i, neighbourItem.j) && graphInstance[neighbourItem.i][neighbourItem.j].value > 0) {
        resultIndices.push(graphInstance[neighbourItem.i][neighbourItem.j]);
      }
    });

    return resultIndices;
  };

  const printShortestPath = (graphInstance: IDijekstra[][], destination: IGraphIndex): IGraphIndex[] => {
    const node = graphInstance?.[destination.row]?.[destination.col];
    if (node?.dist !== Infinity && node?.dist !== 0 && node.prev) {
      return printShortestPath(graphInstance, { row: node.prev?.rowIdx, col: node.prev?.colIdx }).concat([{ col: node.colIdx, row: node.rowIdx }]);
    }
    return [];

  };

  const getShortestPath = (currentPosition: IPosition, destination: IGraphIndex): IGraphIndex[] => {
    const graphInstance = [...graph];
    graphInstance[currentPosition.y][currentPosition.x] = {
      ...graphInstance[currentPosition.y][currentPosition.x],
      dist: 0,
    };

    let queue = getQueue(graphInstance);
    while (queue.length > 0) {
      queue = sortQueue(queue);
      const u = queue.splice(0, 1)?.[0];
      for (const v of getNeighbours(u, graphInstance)) {
        const alt = u.dist + 1;
        if (alt < v.dist) {
          v.dist = alt;
          v.prev = u;
        }
      }
    }
    return printShortestPath(graphInstance, destination);
  };

  useEffect(() => {
    resetDistrict();
  }, [resetDistrict]);

  return { getShortestPath };

};

export { useShortestPath };
