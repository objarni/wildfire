import React, {useEffect, useState} from 'react';
import Grid from './Grid';

const App: React.FC = () => {
    const [gridData, setGridData] = useState<{ color: 'green' | 'red' | 'yellow' }[][]>([]);

    useEffect(() => {
        function generateData() {
            return Array.from({length: 10}, () =>
                Array.from({length: 10}, () => {
                    // Explicitly define the color as a type 'green' | 'red' | 'yellow'
                    const greenRandom = Math.random();
                    let color: 'green' | 'red' | 'yellow';
                    let percentGreen = 80
                    if (greenRandom < percentGreen / 100.0) {
                        color = 'green';
                    } else if (Math.random() < 0.2) {
                        color = 'red';
                    } else {
                        color = 'yellow';
                    }
                    return {color};
                })
            );
        }

        const intervalId = setInterval(() => {
            setGridData(generateData());
        }, 1000); // 1000 milliseconds = 1 second

        // Cleanup function to clear interval when the component unmounts
        return () => clearInterval(intervalId);
    }, []);

    return <div>
        <Grid data={gridData}/>
    </div>;
};

export default App;
