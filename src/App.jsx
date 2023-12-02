import './App.css';
import { useState } from 'react';
import AttackerTile from './components/AttackerTile';
import DefenderTile from './components/DefenderTile';
import ChangeLog from './components/ChangeLog';
import { StatsProvider } from './components/StatsContext';
import Header from './components/Header';
import StatComparison from './components/StatComparison';
import MainInfo from './components/MainInfo';

function App() {
  const [activePageIndex, setActivePageIndex] = useState(0);

  const pages = [
    { component: <MainInfo/>, label: 'Home' },
    { component: <AttackerTile index={1} />, label: 'Champion 1' },
    { component: <DefenderTile index={2} />, label: 'Champion 2' },
    { component: <StatComparison />, label: 'Stats comparison'}  
   
  ];

  return (
    <>
      <StatsProvider>
        <Header />

        <nav>
          {pages.map((page, index) => (
            <button key={index} onClick={() => setActivePageIndex(index)}>
              {page.label}
            </button>
          ))}
        </nav>

        <div className="page-container">
          {pages.map((page, index) => (
            <div
              key={index}
              className={`page ${activePageIndex === index ? 'active' : 'hidden'}`}
            >
              {page.component}
            </div>
          ))}
        </div>
      </StatsProvider>
    </>
  );
}

export default App;







{/* {champSelected && confirmation ? (        
        <div className='mainTile'>
          <StatsProvider>
          <MainInfo 
            attack={attackChamp} 
            defence={defenceChamp}
            resetButtonClick={handleConfirm}
          />
          </StatsProvider>
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

          <ChangeLog />          
          <br />
          <div className='bugsTile'>
          <p>Current bugs:</p>
          <ol>
            <li>Level scaling bonus: JS doesn't like decimals. And numbers here have a lot of them. BASE stats at level are a bit off (Health and Mana ~40; small numbers like AD, Armor, Magic Resistance ~1). It is due the nature of level growth mechanic (stats grow at 75-125% of scaling based on level and JS doesn't take those numbers well).</li>
            <li>% Physical Penetration items do not update <u>shown</u> numbers when Champion level is changed. Re-apply item after changing current champion level to show up actual numbers;</li>
          </ol>
          <br /> 

          <p>
            Source code for project: <a href="https://github.com/Summerset94/wrquickmaths" target='_blank'>Github Page</a>  
          </p>

          <br />
          <p>
            For any questions contact me in Discord @summerset94 or <a href="https://twitter.com/wrquickmaths" target='_blank'>twitter</a> 
          </p>
          </div>
        </div>

        
      )} */}