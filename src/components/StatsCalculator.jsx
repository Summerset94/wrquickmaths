import { useState, useEffect, useMemo } from "react"
import { useStats } from './StatsContext';
import Inventory from "./Inventory";
import Abilities from "./Abilities";


export default function StatsCalculator(props) {
  const champ = props.champion  

  const [contentVisible, setContentVisible] = useState(true);
  const [currentLevel, setCurrentLevel] = useState(1);

  
  const baseModifier = useMemo(() => {
    
    let critMultiplier;

    switch (champ.name) {
      case 'Yone':
      case 'Yasuo':
        critMultiplier = 1.65;
        break;
      case 'Senna':
        critMultiplier = 1.5;
        break;
      default:
        critMultiplier = 1.75;
    };
    
    return {
      critMultiplier,      
    }


  }, [champ, currentLevel])

 // THIS FORMULA is for how much statistics grow through level
//  const g = stat.scale *  (0.67294 + 0.03846 * currentLevel)

//  stat = base + ((stat.scale * (currentLevel - 1) * (0.67294 + 0.03846 * (currentLevel - 1)))
0.03571

const statGrowth = function(mod) {  
  if(currentLevel == 1) {
    return 0
  } else if (currentLevel == 2) {
    return (mod * 75 / 100)
  } else {
      let totalMod = 0;

      for (let level = 2; level <= currentLevel; level++) {
        totalMod += mod * ((75 / 100) + (((50 / 100)/14) * (level - 2)))
      }

      return totalMod;
  }  
}

  const baseMemo = useMemo(() => {
    return {
      health: Math.ceil(champ.healthBase + statGrowth(champ.healthScale)),
      mana: champ.manaBase ? Math.ceil(champ.manaBase + statGrowth(champ.manaScale)) : 0,
      armor: Math.ceil(champ.armorBase + statGrowth(champ.armorScale)),
      magres: Math.ceil(champ.magresBase + statGrowth(champ.magresScale)),
      attack: Math.ceil(champ.attackBase + statGrowth(champ.attackScale)),
      ap: 0,
      as: champ.asBase +  champ.asBaseBonus + (champ.asScale * (currentLevel - 1)),
      asBase: champ.asBase,
      moveSpeed: champ.moveSpeed,
      critMultiplier: baseModifier.critMultiplier,
    };
  }, [currentLevel, champ]);


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
    ah: 0,
    bootsPassive: false
  }, []);
's'
  const [abilitiesBonus, setAbilitiesBonus] = useState({
    singedR: 0,
    jaxR: 0,
    dariusE: 0,
    sionW: 0,
    sennaP: 0,
    rengarP: 0,
  });

  const updateAbilitiesBonus = function(updatedValues) {
    setAbilitiesBonus((prevStats) => ({...prevStats, ...updatedValues}))
  };
 

// This Memo because some champs are unique so I have to dance around their stats interactions
  const totalModifier = useMemo(() => {
    let healthMod;
    let attackMod;
    let apMod;
    let asMod;
    let critChanceMod;
    let moveSpeedMod;
    let armPenMod;
    let armorMod;
    let magresMod;
    let critMultiplierMod

  //Armor
  switch (champ.name) {
    case 'Ornn':
      if (currentLevel <= 4) {
        armorMod = (bonusMemo.armor * 7 /100)
      } else if (currentLevel >4 && currentLevel <= 8) {
        armorMod = (bonusMemo.armor * 12 /100)
      } else if (currentLevel >8 && currentLevel <= 12) {
        armorMod = (bonusMemo.armor * 17 /100)
      } else {
        armorMod = (bonusMemo.armor * 22 /100)
      };
      break;
    case 'Singed':
      if (abilitiesBonus.singedR == 0) {
        armorMod = 0
      } else if (abilitiesBonus.singedR == 1) {
        armorMod = 30
      } else if (abilitiesBonus.singedR == 2) {
        armorMod = 50
      } else if (abilitiesBonus.singedR == 3) {
        armorMod = 80
      }
      break;
    case 'Jax':
      if (abilitiesBonus.jaxR == 0) {
        armorMod = 0
      } else if (abilitiesBonus.jaxR == 1) {
        armorMod = (30 + bonusMemo.attack * 50 /100)
      } else if (abilitiesBonus.jaxR == 2) {
        armorMod = (50 + bonusMemo.attack * 50 /100)
      } else if (abilitiesBonus.jaxR == 3) {
        armorMod = (70 + bonusMemo.attack * 50 /100)
      }
      break; 
    default:
      armorMod = 0;
      break;
  }

  //Magic Resistance
  switch (champ.name) {
    case 'Ornn':
      if (currentLevel <= 4) {
        magresMod = (bonusMemo.magres * 7 /100)
      } else if (currentLevel >4 && currentLevel <= 8) {
        magresMod = (bonusMemo.magres * 12 /100)
      } else if (currentLevel >8 && currentLevel <= 12) {
        magresMod = (bonusMemo.magres * 17 /100)
      } else {
        magresMod = (bonusMemo.magres * 22 /100)
      };
      break;
      case 'Singed':
      if (abilitiesBonus.singedR == 0) {
        magresMod = 0
      } else if (abilitiesBonus.singedR == 1) {
        magresMod = 30
      } else if (abilitiesBonus.singedR == 2) {
        magresMod = 50
      } else if (abilitiesBonus.singedR == 3) {
        magresMod = 80
      }
      break;
      case 'Jax':
      if (abilitiesBonus.jaxR == 0) {
        magresMod = 0
      } else if (abilitiesBonus.jaxR == 1) {
        magresMod = (30 + bonusMemo.ap * 20 /100)
      } else if (abilitiesBonus.jaxR == 2) {
        magresMod = (50 + bonusMemo.ap * 20 /100)
      } else if (abilitiesBonus.jaxR == 3) {
        magresMod = (70 + bonusMemo.ap * 20 /100)
      }
      break; 
    default:
      magresMod = 0;
      break;
  }

  //Health
    switch (champ.name) {
      case 'Pyke':
        healthMod = baseMemo.health;
        break;
      case 'Ornn':
        if (currentLevel <= 4) {
          healthMod = (bonusMemo.health * 7 /100)
        } else if (currentLevel >4 && currentLevel <= 8) {
          healthMod = (bonusMemo.health * 12 /100)
        } else if (currentLevel >8 && currentLevel <= 12) {
          healthMod = (bonusMemo.health * 17 /100)
        } else {
          healthMod = (bonusMemo.health * 22 /100)
        };
        break;
      case 'Sion':
        healthMod = baseMemo.health + bonusMemo.health +  abilitiesBonus.sionW;
        break;
      default:
        healthMod = baseMemo.health + bonusMemo.health;
        break;
    }  
    
  // Attack
    switch (champ.name) {
      case 'Pyke':
        attackMod = Math.ceil(bonusMemo.health / 14);
        break;
      case 'Zeri':
        attackMod = baseMemo.as + bonusMemo.as >= 1.5 ? Math.floor((baseMemo.as + bonusMemo.as - 1.5) * (50 / champ.asBase)) : 0;
        break;
      case 'Jhin':
        attackMod = Math.round((baseMemo.attack + bonusMemo.attack)*((5+55/14*(currentLevel-1))/100 + (bonusMemo.as*(14 + (17/14*(currentLevel - 1))))/(champ.asBase*100) + (bonusMemo.critChance*(23 + (26/14*(currentLevel - 1))))/100));
        break;
      case 'Hecarim':
        attackMod = Math.round(bonusMemo.moveSpeed * 12 / 100);
        break;
      case 'Senna':
        attackMod = abilitiesBonus.sennaP;
        break;

      case 'Rengar':
        if (abilitiesBonus.rengarP == 0) {
          attackMod = 0
        } else if (abilitiesBonus.rengarP == 1) {
          attackMod = ((baseMemo.attack + bonusMemo.attack) * 1/100)
        } else if (abilitiesBonus.rengarP == 2) {
          attackMod = ((baseMemo.attack + bonusMemo.attack) * 4/100)
        } else if (abilitiesBonus.rengarP == 3) {
          attackMod = ((baseMemo.attack + bonusMemo.attack) * 9/100)
        } else if (abilitiesBonus.rengarP == 4) {
          attackMod = ((baseMemo.attack + bonusMemo.attack) * 16/100)
        } else if (abilitiesBonus.rengarP == 5) {
          attackMod = ((baseMemo.attack + bonusMemo.attack) * 25/100)
        };
        break;
      default:
        attackMod = 0;
        break;
    }

  // Ability Power
    switch (champ.name) {
      case 'Singed':
        if (abilitiesBonus.singedR == 0) {
          apMod = 0
        } else if (abilitiesBonus.singedR == 1) {
          apMod = 30
        } else if (abilitiesBonus.singedR == 2) {
          apMod = 50
        } else if (abilitiesBonus.singedR == 3) {
          apMod = 80
        }
        break;
      default:
        apMod = 0
        break;
    }

  // Attack Speed
    switch (champ.name) {
      case 'Zeri':
        asMod = (baseMemo.as + bonusMemo.as) < 1.5 ? (baseMemo.as + bonusMemo.as) : 1.5;
        break;
      case 'Jhin':
        asMod = baseMemo.as;
        break;
      case 'Senna' :
        asMod = baseMemo.as + (bonusMemo.as / 5);
        break;
      default:
        asMod = baseMemo.as + bonusMemo.as;
        break;
    }

  //Crit Chance
  switch (champ.name) {
    case 'Yone':
      critChanceMod = Math.max(bonusMemo.critChance * 2 || 1);
      break;
    case 'Yasuo':
      critChanceMod = Math.max(bonusMemo.critChance * 2 || 1);
      break;

    case 'Senna':
      critChanceMod = (bonusMemo.critChance + (0.15 * Math.floor (abilitiesBonus.sennaP/20)));
      break;
    default:
      critChanceMod = bonusMemo.critChance;
      break;
  }

  //Crit Multiplier
  switch (champ.name) {
    case 'Ashe':
      critMultiplierMod = 1;
      break;
    case 'Senna':
      critMultiplierMod = ((baseMemo.critMultiplier + bonusMemo.critMultiplier))
      break;
    case 'Jhin':
      critMultiplierMod = (150 / 100) + bonusMemo.critMultiplier;
      break; 
    default: 
    critMultiplierMod = baseMemo.critMultiplier + bonusMemo.critMultiplier;
      break;
  }
  
  //Movement Speed
  switch (champ.name) {
    case 'Janna':
      moveSpeedMod = (baseMemo.moveSpeed + bonusMemo.moveSpeed) * 5 / 100;
      break;
    case 'Singed':
      if (abilitiesBonus.singedR === 0) {
        moveSpeedMod = 0
      } else if (abilitiesBonus.singedR === 1) {
        moveSpeedMod = 30
      } else if (abilitiesBonus.singedR === 2) {
        moveSpeedMod = 50
      } else if (abilitiesBonus.singedR === 3) {
        moveSpeedMod = 80
      }
      break;
    default:
      moveSpeedMod = 0;
      break;
  }

  //Armor Penetration
  switch (champ.name) {
    case 'Nilah':
      armPenMod = (bonusMemo.critChance * 35 / 100);
      break;
    case 'Pantheon':
      if (currentLevel < 5) {
        armPenMod = 0
      } else if (currentLevel >= 5 && currentLevel < 9) {
        armPenMod = 10/100
      } else if (currentLevel >= 9 && currentLevel < 13) {
        armPenMod = 20/100
      } else {
        armPenMod = 30/100
      }
      break;
    case 'Darius':
      if (abilitiesBonus.dariusE == 0) {
        armPenMod = 0
      } else if (abilitiesBonus.dariusE == 1) {
        armPenMod = 15/100
      } else if (abilitiesBonus.dariusE == 2) {
        armPenMod = 22/100
      } else if (abilitiesBonus.dariusE == 3) {
        armPenMod = 29/100
      } else if (abilitiesBonus.dariusE == 4) {
        armPenMod = 36/100
      }
      break;
    default:
      armPenMod = 0;
      break;

  }
  
    return {
      health: healthMod,
      attack: attackMod,
      ap: apMod,
      as: asMod,
      critChance: critChanceMod,
      moveSpeed: moveSpeedMod,
      armPen : armPenMod,
      armor: armorMod,
      magres: magresMod,
      critMultiplier: critMultiplierMod,
    };
  }, [champ, baseMemo, bonusMemo, currentLevel, abilitiesBonus]);

  

  // State and functions for changing stats depending on bonus from items passive effects

  const [fonStacked, setFonStacked] = useState(false);
  
  const toggleFON = () => {
    setFonStacked(oldState => !oldState)
  };
  
  const bonusEffectsMemo = useMemo(() =>{
    return {
      rabadon: Math.floor((bonusMemo.ap) * (20 + (25/14 * (currentLevel - 1))) / 100),
      twinguardAR: Math.floor((baseMemo.armor + bonusMemo.armor + totalModifier.armor) * 30 / 100),
      twinguardMR: Math.floor((baseMemo.magres + bonusMemo.magres + totalModifier.magres) * 30 / 100),
      
    }
  }, [bonusMemo])

  const [rabadonApplied, setRabadonApplied] = useState(false);
  const [twinguardApplied, setTwinguardapplied] = useState(false);
  

  const toggleTwinguard = () => {
    setTwinguardapplied(oldState => !oldState)
  };

  const toggleRabadon = () => { 
    setRabadonApplied(oldState => !oldState)
  };

  
  
  const totalMemo = useMemo(() => {
    return {
      health: totalModifier.health,
      mana: champ.manaBase ? baseMemo.mana + bonusMemo.mana : 0,
      armor: baseMemo.armor + bonusMemo.armor + totalModifier.armor + (twinguardApplied ? bonusEffectsMemo.twinguardAR : 0),
      magres: baseMemo.magres + bonusMemo.magres + totalModifier.magres + (twinguardApplied ? bonusEffectsMemo.twinguardMR : 0),
      attack: baseMemo.attack + bonusMemo.attack + totalModifier.attack,
      
      ap: (bonusMemo.ap + totalModifier.ap) + (rabadonApplied ? bonusEffectsMemo.rabadon : 0),
      
      as: totalModifier.as,

      dps: (baseMemo.attack + bonusMemo.attack + totalModifier.attack) * (baseMemo.as + bonusMemo.as),

      
      dmgReductArm: ((1 - (100/(100 + (baseMemo.armor + bonusMemo.armor +  (twinguardApplied ? bonusEffectsMemo.twinguardAR : 0)))))*100),
      dmgReductMag: ((1 - (100/(100 + (baseMemo.magres + bonusMemo.magres + (twinguardApplied ? bonusEffectsMemo.twinguardMR : 0)))))*100),
      effectiveHealthArm: ((baseMemo.health + bonusMemo.health)/(100/(100 + (baseMemo.armor + bonusMemo.armor + (twinguardApplied ? bonusEffectsMemo.twinguardAR : 0))))),
      effectiveHealthMag: ((baseMemo.health + bonusMemo.health)/(100/(100 + (baseMemo.magres + bonusMemo.magres + (twinguardApplied ? bonusEffectsMemo.twinguardMR : 0))))),
      flatArmPen: bonusMemo.flatArmPen,
      flatMagPen: bonusMemo.flatMagPen,
      // Bug: percent mitigation don't re-render dynamically
      armPen: bonusMemo.armPen + totalModifier.armPen,
      magPen: bonusMemo.magPen,
      moveSpeed: baseMemo.moveSpeed + bonusMemo.moveSpeed + totalModifier.moveSpeed,
      critChance: totalModifier.critChance,
      critMultiplier: totalModifier.critMultiplier,
      critDamage: ((baseMemo.attack + bonusMemo.attack))*(champ.name != 'Ashe' ? baseMemo.critMultiplier + bonusMemo.critMultiplier : 1),
      armorReduction: bonusMemo.armorReduction,
      magResReduction: bonusMemo.magResReduction,
      cdr: (1-(1/(1+bonusMemo.ah/100))),
      ah: bonusMemo.ah,
      bootsPassive: bonusMemo.bootsPassive,
      fonEffect: fonStacked
    };
  }, [baseMemo, bonusMemo, rabadonApplied, twinguardApplied, currentLevel, fonStacked, abilitiesBonus]);


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
  }, [bonusMemo, totalMemo, currentLevel, rabadonApplied, twinguardApplied, fonStacked]);  

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
            <td>DPS:</td>
            <td className="stat--ad">{totalMemo.dps.toFixed(2)}</td>
            <td>Crit Chance</td>
            <td className="stat--critChance">{Math.floor(totalMemo.critChance*100)}%</td>
          </tr>   

          <tr>
            <td>Crit dps:</td>
            <td className="stat--critChance">{(totalMemo.dps * totalMemo.critMultiplier).toFixed(2)}</td>
            <td>Crit Multiplier:</td>
            <td className="stat--as">{Math.ceil(totalMemo.critMultiplier * 100)}%</td>
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
            <td colSpan={2} className='stat--hp'>{totalMemo.effectiveHealthArm.toFixed(0)}</td>
          </tr>
          <tr>
            <td colSpan={2}>VS Magic</td>
            <td colSpan={2} className='stat--hp'>{totalMemo.effectiveHealthMag.toFixed(0)}</td>
          </tr>

          <tr>
            <td colSpan={4}>Damage Penetration:</td>            
          </tr>

          <tr>
            <td colSpan={2}>Flat Armor</td>
            <td colSpan={2} className="stat--ad">{totalMemo.flatArmPen}</td>
          </tr>
          <tr>
            <td colSpan={2}>Flat Magic</td>
            <td colSpan={2} className="stat--ap">{totalMemo.flatMagPen}</td>
          </tr>
          <tr>
            <td colSpan={2}>Percentage Armor</td>
            <td colSpan={2} className="stat--ad">{(totalMemo.armPen * 100).toFixed(0)}%</td>
          </tr>
          <tr>
            <td colSpan={2}>Percentage Magic</td>
            <td colSpan={2} className="stat--ap">{(totalMemo.magPen * 100).toFixed(0)}%</td>
          </tr>

          <tr>
            <td colSpan={2}><abbr title="Ability haste converted into cdr">Cooldown reduction</abbr></td>
            <td colSpan={2} className="stat--moveSpeed">{Math.floor(totalMemo.cdr*100)}%</td>
          </tr>
        </tbody>
      </table>
      </div>)}

    </div>

    <Abilities 
      updateAbilitiesBonus={updateAbilitiesBonus}
      champ={champ}
      currentLevel={currentLevel}
      index={index}
      bonus={bonusMemo}            
      />
      
    <Inventory 
      base={baseMemo}
      bonus={bonusMemo}
      total={totalMemo}
      bonusEffects={bonusEffectsMemo}
      handleBonusChange={updateBonusMemo}
      currentLevel={currentLevel}
      switchHat={toggleRabadon}
      switchTwinguard={toggleTwinguard}
      switchFON={toggleFON}
      index={index}
      champ={champ}

    />
    </>
  )
}