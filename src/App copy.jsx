import './App.css';
import { useState } from 'react';
import ActiveChampion from './components/ActiveChamp';
import ChampionList from './components/ChampionList';
import StatsCalculator from './components/StatsCalculator';

function App() {
  const [currentChamp, setCurrentChamp] = useState(false);

  function handleChampClick(champion) {
    setCurrentChamp(champion);
  }
  
  return (
    <>
      
       {currentChamp ? (
        <>
        <ActiveChampion 
          champion={currentChamp} 
          onChampClick={handleChampClick}/>
        <StatsCalculator champion={currentChamp} />
        </>
      ) : ( 
        <ChampionList 
          onChampClick={handleChampClick} />
      )}
    </>
  )
}

export default App
