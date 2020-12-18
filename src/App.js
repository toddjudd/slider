import { useState } from 'react';
import Bar from './Bar';

const App = () => {
  const [chunk, setChunk] = useState(5);
  console.log(chunk);

  // let data = { startAisle: 'AA', endAisle: 'AZ', pickCount: 100 };
  let picks = [
    { taskId: 1, aisle: 'AA' },
    { taskId: 2, aisle: 'AC' },
    { taskId: 3, aisle: 'AD' },
    { taskId: 4, aisle: 'AF' },
    { taskId: 5, aisle: 'AG' },
    { taskId: 6, aisle: 'AG' },
    { taskId: 7, aisle: 'AG' },
    { taskId: 8, aisle: 'AH' },
    { taskId: 9, aisle: 'AI' },
    { taskId: 10, aisle: 'AJ' },
    { taskId: 11, aisle: 'AJ' },
    { taskId: 12, aisle: 'AL' },
    { taskId: 13, aisle: 'AN' },
    { taskId: 14, aisle: 'AO' },
    { taskId: 15, aisle: 'AQ' },
    { taskId: 16, aisle: 'AR' },
    { taskId: 17, aisle: 'AS' },
    { taskId: 18, aisle: 'AT' },
    { taskId: 19, aisle: 'AW' },
    { taskId: 20, aisle: 'AZ' },
  ];

  let bars = picks
    .sort((a, b) => {
      return a.aisle > b.aisle;
    })
    .reduce(
      (groupedPicks, pick, i) => {
        let lastGroupIndex = groupedPicks.length - 1;
        //if gp[last].length is < pickCount add pick to gp[last]
        if (groupedPicks[lastGroupIndex].length < chunk) {
          groupedPicks[lastGroupIndex].push(pick);
        } else {
          //else add new [] to end of gp and add pick to that array
          groupedPicks.push([pick]);
        }
        return groupedPicks;
      },
      [[]]
    )
    .map((groupedPicks) => {
      return groupedPicks
        .sort((a, b) => {
          return a.aisle > b.aisle;
        })
        .reduce((bar, pick, i, groupedPicks) => {
          if (i === 0) {
            bar.startAisle = pick.aisle;
          }
          if (i === groupedPicks.length - 1) {
            bar.endAisle = pick.aisle;
          }
          bar.pickCount = i + 1;
          return bar;
        }, {});
    });

  console.table(bars);
  return (
    <div className='App'>
      <input
        type='range'
        min='1'
        max={picks.length}
        value={chunk}
        onChange={(e) => {
          console.log(chunk);
          console.log('changing chunk');
          setChunk(e.target.value);
          console.log(chunk);
          e.preventDefault();
        }}
      />
      <div className='bars'>
        {bars.length > 0
          ? bars.map((bar, i) => {
              return <Bar key={i} bar={bar}></Bar>;
            })
          : null}
      </div>
    </div>
  );
};

export default App;
