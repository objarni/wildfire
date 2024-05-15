import React from 'react';

type Cell = {
    color: 'green' | 'red' | 'yellow';
};

type GridProps = {
    data: Cell[][];
};

const Grid: React.FC<GridProps> = ({ data }) => {
    return (
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${data[0].length}, 50px)` }}>
            {data.map((row, i) =>
                row.map((cell, j) => (
                    <div
                        key={`${i}-${j}`}
                        style={{ width: '50px', height: '50px', backgroundColor: cell.color }}
                    />
                ))
            )}
        </div>
    );
};

export default Grid;
