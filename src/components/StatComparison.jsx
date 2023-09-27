import React from 'react';
import { useStats } from './StatsContext';

export default function StatComparison(props) {

    const { totalStats } = useStats();
  
    const firstTotalStats = totalStats[0];
    const secondTotalStats = totalStats[1];

    console.log(firstTotalStats);
    console.log(secondTotalStats);


    return (      
      <div className='compareTile'><h1>Helloooo!</h1></div>
    )

}