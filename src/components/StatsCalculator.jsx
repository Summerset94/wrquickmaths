import { useState, useEffect, useMemo } from "react"
import { useStats } from './StatsContext';
import Inventory from "./Inventory";


export default function StatsCalculator(props) {
  const champ = props.champion  

  const [contentVisible, setContentVisible] = useState(true);
  const [currentLevel, setCurrentLevel] = useState(1);

  const baseMemo = useMemo(() => {
    return {
      health: champ.healthBase + (champ.healthScale * (currentLevel - 1)),
      mana: champ.manaBase ? champ.manaBase + (champ.manaScale * (currentLevel - 1)) : 0,
      armor: champ.armorBase + (champ.armorScale * (currentLevel - 1)),
      magres: champ.magresBase + (champ.magresScale * (currentLevel - 1)),
      attack: champ.attackBase + (champ.attackScale * (currentLevel - 1)),
      ap: 0,
      as: champ.asBase + (champ.asScale * (currentLevel - 1)),
      asBase: champ.asBase,
      moveSpeed: champ.moveSpeed,
      critMultiplier: 1.75
    };
  }, [currentLevel, champ]);

  //fallback option
  // const bonusMemo = useMemo(() => {
  //   return {
  //     health: 0,
  //     mana: 0,
  //     armor: 0,
  //     magres: 0,
  //     attack: 0,
  //     ap: 0,
  //     as: 0,
  //     moveSpeed: 0,
  //     flatArmPen: 0,
  //     flatMagPen: 0,
  //     armPen: 0,
  //     magPen: 0,
  //     critChance: 0,
  //     critMultiplier: 1.75
  //   }
  // }, []);

  //cdr for future needs: CDR = (1-(1/(1+AH/100)))

  const [bonusMemo, setBonusMemo] = useState({
    health: 0,
    mana: 0,
    armor: 0,
    magres: 0,
    attack: 0,
    ap: 0,
    as: 0,
    moveSpeed: 0,
    flatArmPen: 0,
    flatMagPen: 0,
    armPen: 0,
    magPen: 0,
    critChance: 0,
    critMultiplier: 0,
    armorReduction: 0,
    magResReduction: 0,
    ah: 0
  });

  const bonusEffectsMemo = useMemo(() =>{
    return {
      rabadon: Math.floor((bonusMemo.ap) * 40 / 100),
    }
  }, [bonusMemo])

  const [rabadonApplied, setRabadonApplied] = useState(false);

  const toggleRabadon = () => { 
    setRabadonApplied(oldState => !oldState)
  }

  const totalMemo = useMemo(() => {
    return {
      health: baseMemo.health + bonusMemo.health,
      mana: champ.manaBase ? baseMemo.mana + bonusMemo.mana : 0,
      armor: baseMemo.armor + bonusMemo.armor,
      magres: baseMemo.magres + bonusMemo.magres,
      attack: baseMemo.attack + bonusMemo.attack,
      ap: rabadonApplied ? bonusMemo.ap + bonusEffectsMemo.rabadon : bonusMemo.ap,
      as: baseMemo.as + bonusMemo.as,
      dps: (baseMemo.attack + bonusMemo.attack) * (baseMemo.as + bonusMemo.as),
      dmgReductArm: ((1 - (100/(100 + (baseMemo.armor + bonusMemo.armor))))*100),
      dmgReductMag: ((1 - (100/(100 + (baseMemo.magres + bonusMemo.magres))))*100),
      effectiveHealthArm: ((baseMemo.health + bonusMemo.health)/(100/(100 + (baseMemo.armor + bonusMemo.armor)))),
      effectiveHealthMag: ((baseMemo.health + bonusMemo.health)/(100/(100 + (baseMemo.magres + bonusMemo.magres)))),
      flatArmPen: bonusMemo.flatArmPen,
      flatMagPen: bonusMemo.flatMagPen,
      armPen: bonusMemo.armPen,
      magPen: bonusMemo.magPen,
      moveSpeed: baseMemo.moveSpeed + bonusMemo.moveSpeed,
      critChance: bonusMemo.critChance,
      critMultiplier: baseMemo.critMultiplier + bonusMemo.critMultiplier,
      critDamage: ((baseMemo.attack + bonusMemo.attack))*(baseMemo.critMultiplier + bonusMemo.critMultiplier),
      armorReduction: bonusMemo.armorReduction,
      magResReduction: bonusMemo.magResReduction,
      cdr: (1-(1/(1+bonusMemo.ah/100))),
      ah: bonusMemo.ah
    };
  }, [baseMemo, bonusMemo, rabadonApplied]);


  function levelSlider(n) {
    const newLevel = n.target.value;
    setCurrentLevel(newLevel);
  }

  function updateBonusMemo(updatedValues) {
    setBonusMemo((prevStats) => ({...prevStats, ...updatedValues}))
  };

  // here we be tryin' pass the memo up

  const { totalStats, setTotalStats } = useStats();
  const index = props.index;

  useEffect(() => {
    setTotalStats(prevTotalStats => {
      const newTotalStats = [...prevTotalStats];
      newTotalStats[index] = totalMemo;
      return newTotalStats;
    });
  }, [bonusMemo, totalMemo]);  

  return (
    <>
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

      <button onClick={() => setContentVisible(!contentVisible)}>
      Show / hide stats
      </button>

      {contentVisible && (<div className={`dynamicStats ${contentVisible ? 'visible' : 'hidden'}`}>
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
            <td className='stat--hp'>{baseMemo.health}</td>
            <td className='stat--hp'>{bonusMemo.health}</td>
            <td className='stat--hp'>{totalMemo.health}</td>
          </tr>

          <tr>
            <td>Mana</td>
            <td className='stat--mana'>{baseMemo.mana}</td>
            <td className='stat--mana'>{bonusMemo.mana}</td>
            <td className='stat--mana'>{totalMemo.mana}</td>
          </tr>

          <tr>
            <td>Armor</td>
            <td className='stat--armor'>{baseMemo.armor}</td>
            <td className='stat--armor'>{bonusMemo.armor}</td>
            <td className='stat--armor'>{totalMemo.armor}</td>
          </tr>

          <tr>
            <td>Magic Resistance</td>
            <td className='stat--magres'>{baseMemo.magres}</td>
            <td className='stat--magres'>{bonusMemo.magres}</td>
            <td className='stat--magres'>{totalMemo.magres}</td>
          </tr>

          <tr>
            <td>Attack</td>
            <td className='stat--ad'>{baseMemo.attack}</td>
            <td className='stat--ad'>{bonusMemo.attack}</td>
            <td className='stat--ad'>{totalMemo.attack}</td>
          </tr>

          <tr>
            <td>Ability Power</td>
            <td className='stat--ap'>{baseMemo.ap}</td>
            <td className='stat--ap'>{bonusMemo.ap}</td>
            <td className='stat--ap'>{totalMemo.ap}</td>
          </tr>

          <tr>
            <td>Attack speed</td>
            <td className='stat--as'>{baseMemo.as.toFixed(2)}</td>
            <td className='stat--as'>{bonusMemo.as.toFixed(2)}</td>
            <td className='stat--as'>{totalMemo.as.toFixed(2)}</td>
          </tr>

          <tr>
            <td>Movespeed</td>
            <td className='stat--moveSpeed'>{Math.ceil(baseMemo.moveSpeed)}</td>
            <td className='stat--moveSpeed'>{Math.ceil(bonusMemo.moveSpeed)}</td>
            <td className='stat--moveSpeed'>{Math.ceil(totalMemo.moveSpeed)}</td>
          </tr>

          <tr>
            <td>DPS</td>
            <td>{totalMemo.dps.toFixed(2)}</td>
            <td>Crit Chance</td>
            <td>{Math.floor(totalMemo.critChance*100)}%</td>
          </tr>          
        </tbody>
      </table>

      <table className="statsTable">
        <tbody>

        <tr>
            <td colSpan={4}>Damage mitigation</td>
          </tr>
          <tr>
            <td colSpan={2}>Physical</td>
            <td colSpan={2} className='stat--armor'>{totalMemo.dmgReductArm.toFixed(0)}%</td>
          </tr>
          <tr>
            <td colSpan={2}>Magical</td>
            <td colSpan={2} className='stat--magres'>{totalMemo.dmgReductMag.toFixed(0)}%</td>
          </tr>

          <tr>
            <td colSpan={4}>Effective HP:</td>
          </tr>

          <tr>
            <td colSpan={2}>VS Physical</td>
            <td colSpan={2} className='stat--health'>{totalMemo.effectiveHealthArm.toFixed(0)}</td>
          </tr>
          <tr>
            <td colSpan={2}>VS Magic</td>
            <td colSpan={2} className='stat--health'>{totalMemo.effectiveHealthMag.toFixed(0)}</td>
          </tr>

          <tr>
            <td colSpan={4}>Damage Penetration:</td>            
          </tr>

          <tr>
            <td colSpan={2}>Flat Armor</td>
            <td colSpan={2}>{totalMemo.flatArmPen}</td>
          </tr>
          <tr>
            <td colSpan={2}>Flat Magic</td>
            <td colSpan={2}>{totalMemo.flatMagPen}</td>
          </tr>
          <tr>
            <td colSpan={2}>Percentage Armor</td>
            <td colSpan={2}>{totalMemo.armPen * 100}%</td>
          </tr>
          <tr>
            <td colSpan={2}>Percentage Magic</td>
            <td colSpan={2}>{totalMemo.magPen * 100}%</td>
          </tr>

          <tr>
            <td colSpan={2}><abbr title="Ability haste converted into cdr">Cooldown reduction</abbr></td>
            <td colSpan={2}>{Math.floor(totalMemo.cdr*100)}%</td>
          </tr>
        </tbody>
      </table>
      </div>)}

    </div>

    <Inventory 
      base={baseMemo}
      bonus={bonusMemo}
      total={totalMemo}
      bonusEffects={bonusEffectsMemo}
      handleBonusChange={updateBonusMemo}
      currentLevel={currentLevel}
      switchHat={toggleRabadon}
      index={index}

    />
    </>
  )
}