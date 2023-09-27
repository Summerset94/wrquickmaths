import './App.css';
import { useState } from 'react';
import ChampionList from './components/ChampionList';
import MainInfo from './components/MainInfo';
import './styles/StatColors.css'


function App() {
  const [attackChamp, setAttackChamp] = useState(false);
  const [defenceChamp, setDefenceChamp] = useState(false);
  const [confirmation, setConfirmation] = useState(false);
  
  function champSelected() {
    return attackChamp && defenceChamp ? true : false
  };


  function handleConfirm() {
    setConfirmation(!confirmation)
  }

  function handleAttackClick(champion) {
    setAttackChamp(champion);
  }

  function handleDefenceClick(champion) {
    setDefenceChamp(champion);
  }
  
  return (
    <>

       {champSelected && confirmation ? (        
        <div className='mainTile'>
          <MainInfo 
            attack={attackChamp} 
            defence={defenceChamp}
            resetButtonClick={handleConfirm}
          />
        </div>
      ) : ( 
        <div className='selectTile'>
          <ChampionList 
            onChampClick={handleAttackClick}
            champ='attacking' />
          <ChampionList 
            onChampClick={handleDefenceClick}
            champ='defending' />

          <div className='confirmButtonTile'>
          <button onClick={handleConfirm} className='confirmButton'>Confirm</button>
          </div>        
        </div>

      )}
    </>
  )
}

export default App
