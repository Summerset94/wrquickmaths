import { useState, useEffect } from "react"

export default function StatsCalculator(props) {
  const champ = props.champion

  const [currentLevel, setCurrentLevel] = useState(1)

  const [base, setBase] = useState({
    health: (champ.healthBase),
    mana: champ.manaBase ? champ.manaBase : 0,
    armor: (champ.armorBase),
    magres: (champ.magresBase),
    attack: (champ.attackBase),
    ap: (0),
    as: (champ.asBase)
  });

  const [bonus, setBonus] = useState({
    health: 0,
    mana: 0,
    armor: 0,
    magres: 0,
    attack: 0,
    ap: 0,
    as: 0
  });

  let [total, setTotal] = useState({   
    health: (base.health + bonus.health),   
    mana: champ.manaBase ? (base.mana + bonus.mana) : 0,   
    armor: (base.armor + bonus.armor),    
    magres: (base.magres + bonus.magres),    
    attack: (base.attack + bonus.attack),    
    ap: (base.ap + bonus.ap),    
    as: (base.as + bonus.as),
    dps: ((base.attack + bonus.attack)* (base.as + bonus.as))
  });

  function levelSlider(n) {
  const newLevel = n.target.value;
  setCurrentLevel(newLevel);
}

useEffect(() => {
  setBase(prevBase => {
    return {
      ...prevBase,
      health: champ.healthBase + (champ.healthScale * (currentLevel - 1)),
      mana: champ.manaBase ? champ.manaBase + (champ.manaScale * (currentLevel - 1)) : 0,
      armor: champ.armorBase + (champ.armorScale * (currentLevel - 1)),
      magres: champ.magresBase + (champ.magresScale * (currentLevel - 1)),
      attack: champ.attackBase + (champ.attackScale * (currentLevel - 1)),
      ap: 0,
      as: champ.asBase + (champ.asScale * (currentLevel - 1))
    };
  });

  setTotal(prevTotal => {
    return {
      ...prevTotal,
      health: base.health + bonus.health,
      mana: champ.manaBase ? base.mana + bonus.mana : 0,
      armor: base.armor + bonus.armor,
      magres: base.magres + bonus.magres,
      attack: base.attack + bonus.attack,
      ap: bonus.ap,
      as: base.as + bonus.as,
      dps: (base.attack + bonus.attack) * (base.as + bonus.as)
    };
  });
}, [currentLevel, champ, base, bonus]);

  function handleBonusChange(property, value) {
    setBonus(prevBonus => ({
      ...prevBonus,
      [property]: value
    }));
  }

  return (
    <div className="levelSlider">
      <input
        className='slider'
        type="range"
        min="1"
        max="15"
        step="1"
        value={currentLevel}
        onChange={levelSlider}
      />
      <p>Select level: {currentLevel}</p>
      <table className='statsTable'>
        <thead>
          <tr>
            <th>
              Comprehensive statistics table
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Stat</td>
            <td>Base at {currentLevel}</td>
            <td>Bonus</td>
            <td>Total</td>
          </tr>
          
          <tr>
            <td>Health</td>
            <td>{base.health}</td>
            <td>{bonus.health}</td>
            <td>{total.health}</td>
          </tr>

          <tr>
            <td>Mana</td>
            <td>{base.mana}</td>
            <td>{bonus.mana}</td>
            <td>{total.mana}</td>
          </tr>

          <tr>
            <td>Armor</td>
            <td>{base.armor}</td>
            <td>{bonus.armor}</td>
            <td>{total.armor}</td>
          </tr>

          <tr>
            <td>Magic Resistance</td>
            <td>{base.magres}</td>
            <td>{bonus.magres}</td>
            <td>{total.magres}</td>
          </tr>

          <tr>
            <td>Attack</td>
            <td>{base.attack}</td>
            <td>{bonus.attack}</td>
            <td>{total.attack}</td>
          </tr>

          <tr>
            <td>Ability Power</td>
            <td>{base.ap}</td>
            <td>{bonus.ap}</td>
            <td>{total.ap}</td>
          </tr>

          <tr>
            <td>Attack speed</td>
            <td>{base.as.toFixed(2)}</td>
            <td>{bonus.as.toFixed(2)}</td>
            <td>{total.as.toFixed(2)}</td>
          </tr>

          <tr>
            <td>DPS</td>
            <td rowSpan={3} >{total.dps.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}