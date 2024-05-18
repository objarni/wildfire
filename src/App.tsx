import React, {useEffect, useState} from 'react'
import Grid from './Grid'
import {Cell} from "./types";
import {countGrass, generateHeatField, simulate} from "./simulation";

const size = 100

const initialField = generateHeatField(size)

const App: React.FC = () => {
    const [field, setField] = useState<number[][]>(initialField)

    useEffect(() => {

        const intervalId = setInterval(() => {
            setField(field => {
                // console.log("Field: ", newField); // This should now log the updated field
                return simulate(field);
            });
        }, 500) // 1000 milliseconds = 1 second

        // Cleanup function to clear interval when the component unmounts
        return () => clearInterval(intervalId)
    }, [])

    function onClickCell(x: number, y: number) {
        let newField = field.map(row => row.map(cell => cell))
        newField[x][y] = 6
        console.log("setting", x, y)
        setField(newField)
    }

    return <div>
        <Grid data={gridFromField(field)} onClickCell={onClickCell}/>
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