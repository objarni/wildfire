import React, {useEffect, useState} from 'react'
import Grid from './Grid'
import {Cell} from "./types";

const App: React.FC = () => {
    const [gridData, setGridData] = useState<{ color: 'green' | 'red' | 'yellow' }[][]>([])

    useEffect(() => {

        function generateHeatField(): number[][] {
            return Array.from({length: 10}, () =>
                Array.from({length: 10}, () => {
                    const greenRandom = Math.random()
                    const percentGreen = 80
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

        const intervalId = setInterval(() => {
            const field = generateHeatField()
            const colorField = gridFromField(field)
            setGridData(colorField)
        }, 1000) // 1000 milliseconds = 1 second

        // Cleanup function to clear interval when the component unmounts
        return () => clearInterval(intervalId)
    }, [])

    return <div>
        <Grid data={gridData}/>
    </div>
}

export default App

export function gridFromField(field: number[][]): Cell[][] {
    const heatToColor = (heat: number): Cell => {
        if (heat < 6)
            return {color: 'green'};
        return {color: heat % 2 === 1 ? 'red' : 'yellow'}
    }
    return field.map(row => row.map(heatToColor))
}