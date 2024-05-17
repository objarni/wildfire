import React, {useEffect, useState} from 'react'
import Grid from './Grid'
import {Cell} from "./types";
import {countGrass, generateHeatField, simulate} from "./simulation";

const size = 100

const initialField = generateHeatField(size)

const App: React.FC = () => {
    const [field, setField] = useState<number[][]>(initialField)
    const [gridData, setGridData] = useState<Cell[][]>(
        gridFromField(field))

    useEffect(() => {

        const intervalId = setInterval(() => {
            setGridData(_ => {
                const newGrid = gridFromField(field)
                console.log("Grid: ", newGrid)
                return newGrid
            });

            setField(field => {
                const newField = simulate(field);
                console.log("Field: ", newField); // This should now log the updated field
                return newField;
            });
        }, 10) // 1000 milliseconds = 1 second

        // Cleanup function to clear interval when the component unmounts
        return () => clearInterval(intervalId)
    }, [field])

    return <div>
        <Grid data={gridData}/>
        <div>Grass: {(100 * countGrass(field) / (size * size)).toFixed(1)}%</div>
    </div>
}

export default App

export function gridFromField(field: number[][]): Cell[][] {
    const heatToColor = (heat: number): Cell => {
        if (heat === 0)
            return {color: 'black'}
        if (heat < 6)
            return {color: 'green'}
        return {color: heat % 2 === 1 ? 'red' : 'yellow'}
    }
    return field.map(row => row.map(heatToColor))
}