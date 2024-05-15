import React, {useState, useEffect} from 'react';
import Grid from './Grid';

const App: React.FC = () => {
    const [gridData, setGridData] = useState<{ color: 'green' | 'red' | 'yellow' }[][]>([]);

    useEffect(() => {
        const data = Array.from({length: 10}, () =>
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
        setGridData(data);
    }, []);

    return <div>
        <Grid data={gridData}/>
    </div>;
};

export default App;


// import React from 'react';
// import './App.css';
//
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <p>
//           Edit <code>src/App.tsx</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }
//
// export default App;
