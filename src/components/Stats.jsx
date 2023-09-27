import '../styles/Stats.css'

export default function Stats(props) {
  const champion = props.champion

  return (
    <div className='baseStats'>
      <div className='statPair'>
        <div className="statTile">
          <p className="statName">Base Health</p>
          <p className="statNumber">{champion.healthBase}</p>
        </div>
        <div className="statTile">
          <p className="statName">Growth Per Level</p>
          <p className="statNumber">{champion.healthScale}</p>
        </div>
      </div>
      

      {!champion.manaBase ? (
        <div className='statPair'>
        <div className='statTile'>Manaless (TBD)</div>
      </div>
      ) : (
        <div className='statPair'>
          <div className="statTile">
            <p className="statName">Base Mana Pool</p>
            <p className="statNumber">{champion.manaBase}</p>
          </div>
          <div className="statTile">
            <p className="statName">Growth per Level</p>
            <p className="statNumber">{champion.manaScale}</p>
          </div>
        </div>
        
      )}
      
      <div className='statPair'>
        <div className="statTile">
          <p className="statName">Base Armor</p>
          <p className="statNumber">{champion.armorBase}</p>
        </div>
        <div className="statTile">
          <p className="statName">Growth Per Level</p>
          <p className="statNumber">{champion.armorScale}</p>
        </div>
      </div>      

      <div className='statPair'>
        <div className="statTile">
          <p className="statName">Base Magic Resistance</p>
          <p className="statNumber">{champion.magresBase}</p>
        </div>
        <div className="statTile">
          <p className="statName">Growth Per Level</p>
          <p className="statNumber">{champion.magresScale}</p>
        </div>
      </div>      

      <div className='statPair'>
        <div className="statTile">
          <p className="statName">Base Attack Damage</p>
          <p className="statNumber">{champion.attackBase}</p>
        </div>
        <div className="statTile">
          <p className="statName">Growth Per Level</p>
          <p className="statNumber">{champion.attackScale}</p>
        </div>
      </div>
      
      <div className='statPair'>
        <div className="statTile">
          <p className="statName">Base Atk Speed (atk/sec)</p>
          <p className="statNumber">{champion.asBase}</p>
        </div>
        <div className="statTile">
          <p className="statName">Growth Per Level</p>
          <p className="statNumber">{Number.parseFloat(champion.asScale).toFixed(4)}</p>
        </div>
      </div>       

      <div className='statPair'>
        <div className="statTile">
          <p className="statName">Base Move Speed</p>
          <p className="statNumber">{champion.moveSpeed}</p>
        </div> 
      </div>
           
    </div>
  )

}