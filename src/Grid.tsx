import React from 'react'
import {Cell} from "./types";

type GridProps = {
    data: Cell[][]
}

const divSize: number = 4

const Grid: React.FC<GridProps> = ({ data }) => {
    const rows = data.length > 0 ? data[0].length : 0
    return (
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${rows}, ${divSize}px)` }}>
            {data.map((row, i) =>
                row.map((cell, j) => (
                    <div
                        key={`${i}-${j}`}
                        style={{ width: `${divSize}px`, height: `${divSize}px`, backgroundColor: cell.color }}
                    />
                ))
            )}
        </div>
    )
}

export default Grid
