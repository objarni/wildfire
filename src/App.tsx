import React, {useEffect, useState} from 'react'
import Grid from './Grid'
import {Cell} from "./types";
import {simulate} from "./simulation";

const size = 200

function generateHeatField(): number[][] {
    return Array.from({length: size}, () =>
        Array.from({length: size}, () => {
            const greenRandom = Math.random()
            const percentGreen = 99
            let heat: number
            if (greenRandom < percentGreen / 100.0) {
                heat = 1
            } else if (Math.random() > 0.2) {
                heat = 6
            } else {
                heat = 7
            }
            return heat
        })
    )
}

const initialField = generateHeatField()

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
        }, 100) // 1000 milliseconds = 1 second

        // Cleanup function to clear interval when the component unmounts
        return () => clearInterval(intervalId)
    }, [field])

    return <div>
        <Grid data={gridData}/>
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