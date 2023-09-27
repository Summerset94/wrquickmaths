import React, { useState } from 'react';
import champions from "./Champions";
import '../styles/ChampionList.css'

export default function ChampionList(props) {
  const [selectedChampion, setSelectedChampion] = useState('');

  function handleChange(event) {
    setSelectedChampion(event.target.value);
  }

  function handleConfirm() {
    const selectedChamp = champions.find(champ => champ.name === selectedChampion);
    if (selectedChamp) {
      props.onChampClick(selectedChamp);
    }
  }

  return (
    <div className='allChamps'>
      <h2>Select {props.champ} champion</h2>
      <select onChange={handleChange} value={selectedChampion}>
        <option value="" disabled>Select a champion</option>
        {champions.map(champ => (
          <option key={champ.name} value={champ.name}>
            {champ.name}
          </option>
        ))}
      </select>
      <button onClick={handleConfirm} disabled={!selectedChampion}>Confirm</button> 
    </div>
  );
}
