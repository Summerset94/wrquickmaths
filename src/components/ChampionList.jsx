import React from 'react';
import champions from "./Champions";

const ChampionList = ({ onChampClick, champ }) => {
  const handleChampSelect = (event) => {
    const selectedChampion = champions.find(champion => champion.name === event.target.value);
    onChampClick(selectedChampion);
  }

  return (
    <div>
      <h2>{`${champ} champions`}</h2>
      <select onChange={handleChampSelect}>
        <option value="">Select a champion</option>
        {champions.map((champion) => (
          <option key={champion.name} value={champion.name}>
            {champion.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default ChampionList;
