import { useState, useEffect, useMemo } from "react"

export default function StatsCalculator(props) {
  const champ = props.champion

  const [currentLevel, setCurrentLevel] = useState(1);

  const baseMemo = useMemo(() => {
    return {
      health: champ.healthBase + (champ.healthScale * (currentLevel - 1)),
      mana: champ.manaBase ? champ.manaBase + (champ.manaScale * (currentLevel - 1)) : 0,
      armor: champ.armorBase + (champ.armorScale * (currentLevel - 1)),
      magres: champ.magresBase + (champ.magresScale * (currentLevel - 1)),
      attack: champ.attackBase + (champ.attackScale * (currentLevel - 1)),
      ap: 0,
      as: champ.asBase + (champ.asScale * (currentLevel - 1))
    };
  }, [currentLevel, champ]);

  const bonusMemo = useMemo(() => {
    return {
      health: 0,
      mana: 0,
      armor: 0,
      magres: 0,
      attack: 0,
      ap: 0,
      as: 0
    }
  }, []);

  const totalMemo = useMemo(() => {
    return {
      health: baseMemo.health + bonusMemo.health,
      mana: champ.manaBase ? baseMemo.mana + bonusMemo.mana : 0,
      armor: baseMemo.armor + bonusMemo.armor,
      magres: baseMemo.magres + bonusMemo.magres,
      attack: baseMemo.attack + bonusMemo.attack,
      ap: bonusMemo.ap,
      as: baseMemo.as + bonusMemo.as,
      dps: (baseMemo.attack + bonusMemo.attack) * (baseMemo.as + bonusMemo.as),
      dmgReductArm: ((1 - (100/(100 + (baseMemo.armor + bonusMemo.armor))))*100),
      dmgReductMag: ((1 - (100/(100 + (baseMemo.magres + bonusMemo.magres))))*100),
      effectiveHealthArm: ((baseMemo.health + bonusMemo.health)/(100/(100 + (baseMemo.armor + bonusMemo.armor)))),
      effectiveHealthMag: ((baseMemo.health + bonusMemo.health)/(100/(100 + (baseMemo.magres + bonusMemo.magres)))),
    };
  }, [baseMemo, bonusMemo]);


  function levelSlider(n) {
    const newLevel = n.target.value;
    setCurrentLevel(newLevel);
  }

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
            <td>{baseMemo.health}</td>
            <td>{bonusMemo.health}</td>
            <td>{totalMemo.health}</td>
          </tr>

          <tr>
            <td>Mana</td>
            <td>{baseMemo.mana}</td>
            <td>{bonusMemo.mana}</td>
            <td>{totalMemo.mana}</td>
          </tr>

          <tr>
            <td>Armor</td>
            <td>{baseMemo.armor}</td>
            <td>{bonusMemo.armor}</td>
            <td>{totalMemo.armor}</td>
          </tr>

          <tr>
            <td>Magic Resistance</td>
            <td>{baseMemo.magres}</td>
            <td>{bonusMemo.magres}</td>
            <td>{totalMemo.magres}</td>
          </tr>

          <tr>
            <td>Attack</td>
            <td>{baseMemo.attack}</td>
            <td>{bonusMemo.attack}</td>
            <td>{totalMemo.attack}</td>
          </tr>

          <tr>
            <td>Ability Power</td>
            <td>{baseMemo.ap}</td>
            <td>{bonusMemo.ap}</td>
            <td>{totalMemo.ap}</td>
          </tr>

          <tr>
            <td>Attack speed</td>
            <td>{baseMemo.as.toFixed(2)}</td>
            <td>{bonusMemo.as.toFixed(2)}</td>
            <td>{totalMemo.as.toFixed(2)}</td>
          </tr>

          <tr>
            <td>DPS</td>
            <td colSpan={3} >{totalMemo.dps.toFixed(2)}</td>
          </tr>

          <tr>
            <td colSpan={4}>Damage mitigation, %</td>
          </tr>
          <tr>
            <td colSpan={2}>Physical</td>
            <td colSpan={2}>{totalMemo.dmgReductArm.toFixed(0)}</td>
          </tr>
          <tr>
            <td colSpan={2}>Magical</td>
            <td colSpan={2}>{totalMemo.dmgReductMag.toFixed(0)}</td>
          </tr>

          <tr>
            <td colSpan={4}>Effective HP</td>
          </tr>

          <tr>
            <td colSpan={2}>VS Physical</td>
            <td colSpan={2}>{totalMemo.effectiveHealthArm.toFixed(0)}</td>
          </tr>
          <tr>
            <td colSpan={2}>VS Magic</td>
            <td colSpan={2}>{totalMemo.effectiveHealthMag.toFixed(0)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}