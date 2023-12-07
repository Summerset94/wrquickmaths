import { useEffect, useState, useMemo } from "react";
import champions from './Champions.jsx'
import Abilities from "./Abilities";
import Inventory from "./Inventory";
import { useStats } from './StatsContext';

export default function AttackerTile(props) {
  // const champion = props.champ
  const index = props.index

  const champTemplate = {
    id: 'undefined',
  name: 'Not Selected',
  title: 'No title',
  icon: '../images/portraits/AatroxSquare.webp',
  
  rolePrim: false,
  roleSecond: false,

  healthBase: 0,
  healthScale: 0,

  manaBase: 0,
  manaScale: 0,

  armorBase: 0,
  armorScale: 0,

  magresBase: 0,
  magresScale: 0,

  moveSpeed: 0,
  
  attackBase: 0,
  attackScale: 0,
  apBase: 0,
  
  asBase: 0,
  asBaseBonus: 0,
  asScale: 0,
  }

  const [activeChampion, setActiveChampion] = useState(champTemplate);
  
  const handleChampSelect = (event) => {
    event.preventDefault();    
    const selectedChampion = champions.find(champion => champion.name === event.target.value);
    setActiveChampion(oldState => selectedChampion);      
  }
 

  const champion = activeChampion
  
  const champ = champion;

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
        totalMod += mod * ((75 / 100) + (((50 / 100)/13) * (level - 2)))
      }

      return totalMod;
  }  
}

  const baseStats = useMemo(() => {
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


  const [itemBonus, setItemBonus] = useState({
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
    swainP: 0,
    threshP: 0,
    twistedFateE: 0,
    veigarP: 0,
  });

  const updateAbilitiesBonus = function(updatedValues) {
    setAbilitiesBonus((prevStats) => ({...prevStats, ...updatedValues}))
  };
 

// This Memo because some champs are unique so I have to dance around their stats interactions
  const championModifier = useMemo(() => {
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
        armorMod = (itemBonus.armor * 7 /100)
      } else if (currentLevel >4 && currentLevel <= 8) {
        armorMod = (itemBonus.armor * 12 /100)
      } else if (currentLevel >8 && currentLevel <= 12) {
        armorMod = (itemBonus.armor * 17 /100)
      } else {
        armorMod = (itemBonus.armor * 22 /100)
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
        armorMod = (30 + itemBonus.attack * 50 /100)
      } else if (abilitiesBonus.jaxR == 2) {
        armorMod = (50 + itemBonus.attack * 50 /100)
      } else if (abilitiesBonus.jaxR == 3) {
        armorMod = (70 + itemBonus.attack * 50 /100)
      }
      break; 

    case 'Thresh':
      armorMod = abilitiesBonus.threshP * 2;
      break;
    default:
      armorMod = 0;
      break;
  }

  //Magic Resistance
  switch (champ.name) {
    case 'Ornn':
      if (currentLevel <= 4) {
        magresMod = (itemBonus.magres * 7 /100)
      } else if (currentLevel >4 && currentLevel <= 8) {
        magresMod = (itemBonus.magres * 12 /100)
      } else if (currentLevel >8 && currentLevel <= 12) {
        magresMod = (itemBonus.magres * 17 /100)
      } else {
        magresMod = (itemBonus.magres * 22 /100)
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
        magresMod = (30 + itemBonus.ap * 20 /100)
      } else if (abilitiesBonus.jaxR == 2) {
        magresMod = (50 + itemBonus.ap * 20 /100)
      } else if (abilitiesBonus.jaxR == 3) {
        magresMod = (70 + itemBonus.ap * 20 /100)
      }
      break; 
    default:
      magresMod = 0;
      break;
  }

  //Health
    switch (champ.name) {
      case 'Pyke':
        healthMod = baseStats.health;
        break;
      case 'Ornn':
        if (currentLevel <= 4) {
          healthMod = (itemBonus.health * 7 /100)
        } else if (currentLevel >4 && currentLevel <= 8) {
          healthMod = (itemBonus.health * 12 /100)
        } else if (currentLevel >8 && currentLevel <= 12) {
          healthMod = (itemBonus.health * 17 /100)
        } else {
          healthMod = (itemBonus.health * 22 /100)
        };
        break;
      case 'Sion':
        healthMod = baseStats.health + itemBonus.health +  abilitiesBonus.sionW;
        break;

      case 'Swain':
        healthMod = baseStats.health + itemBonus.health +  (abilitiesBonus.swainP * 16);
        break;
      
      case 'Vladimir':
        healthMod = baseStats.health + itemBonus.health + Math.round(itemBonus.ap * 120 / 100);
        break;


      default:
        healthMod = baseStats.health + itemBonus.health;
        break;

      
    }  
    
  // Attack
    switch (champ.name) {
      case 'Pyke':
        attackMod = Math.ceil(itemBonus.health / 14);
        break;
      case 'Zeri':
        attackMod = baseStats.as + itemBonus.as >= 1.5 ? Math.floor((baseStats.as + itemBonus.as - 1.5) * (50 / champ.asBase)) : 0;
        break;
      case 'Jhin':
        attackMod = Math.round((baseStats.attack + itemBonus.attack)*((5+55/14*(currentLevel-1))/100 + (itemBonus.as*(14 + (17/14*(currentLevel - 1))))/(champ.asBase*100) + (itemBonus.critChance*(23 + (26/14*(currentLevel - 1))))/100));
        break;
      case 'Hecarim':
        attackMod = Math.round(itemBonus.moveSpeed * 12 / 100);
        break;
      case 'Senna':
        attackMod = abilitiesBonus.sennaP;
        break;

      case 'Rengar':
        if (abilitiesBonus.rengarP == 0) {
          attackMod = 0
        } else if (abilitiesBonus.rengarP == 1) {
          attackMod = ((baseStats.attack + itemBonus.attack) * 1/100)
        } else if (abilitiesBonus.rengarP == 2) {
          attackMod = ((baseStats.attack + itemBonus.attack) * 4/100)
        } else if (abilitiesBonus.rengarP == 3) {
          attackMod = ((baseStats.attack + itemBonus.attack) * 9/100)
        } else if (abilitiesBonus.rengarP == 4) {
          attackMod = ((baseStats.attack + itemBonus.attack) * 16/100)
        } else if (abilitiesBonus.rengarP == 5) {
          attackMod = ((baseStats.attack + itemBonus.attack) * 25/100)
        };
        break;

      case 'Yasuo':
      case 'Yone':
        attackMod = Math.round(((itemBonus.critChance * 2) - 1) * 40)
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

      case 'Thresh':
        apMod = abilitiesBonus.threshP * 2;
        break;

      case 'Veigar':
        apMod = abilitiesBonus.veigarP;
        break;

      case 'Vladimir':
        apMod = Math.round(itemBonus.health * 4.5 / 100);
        break;

      default:
        apMod = 0
        break;
    }

  // Attack Speed
    switch (champ.name) {
      case 'Zeri':
        asMod = (baseStats.as + itemBonus.as) < 1.5 ? (baseStats.as + itemBonus.as) : 1.5;
        break;
      case 'Jhin':
        asMod = baseStats.as;
        break;
      case 'Senna' :
        asMod = baseStats.as + (itemBonus.as / 5);
        break;

      case 'Twisted Fate':
        if (abilitiesBonus.twistedFateE == 0) {
          asMod = baseStats.as + itemBonus.as;
        } else if (abilitiesBonus.twistedFateE == 1) {
          asMod = baseStats.as + itemBonus.as + (champ.asBase * 15 / 100);
        } else if (abilitiesBonus.twistedFateE == 2) {
          asMod = baseStats.as + itemBonus.as + (champ.asBase * 20 / 100);
        } else if (abilitiesBonus.twistedFateE == 3) {
          asMod = baseStats.as + itemBonus.as + (champ.asBase * 25 / 100);
        } else if (abilitiesBonus.twistedFateE == 4) {
          asMod = baseStats.as + itemBonus.as + (champ.asBase * 30 / 100);
        };
        break;

      default:
        asMod = baseStats.as + itemBonus.as;
        break;
    }

  //Crit Chance
  switch (champ.name) {
    case 'Yone':
      critChanceMod = Math.max(itemBonus.critChance * 2 || 1);
      break;
    case 'Yasuo':
      critChanceMod = Math.max(itemBonus.critChance * 2 || 1);
      break;

    case 'Senna':
      critChanceMod = (itemBonus.critChance + (0.15 * Math.floor (abilitiesBonus.sennaP/20)));
      break;
    default:
      critChanceMod = itemBonus.critChance;
      break;
  }

  //Crit Multiplier
  switch (champ.name) {
    case 'Ashe':
      critMultiplierMod = 1;
      break;
    case 'Senna':
      critMultiplierMod = ((baseStats.critMultiplier + itemBonus.critMultiplier))
      break;
    case 'Jhin':
      critMultiplierMod = (150 / 100) + itemBonus.critMultiplier;
      break; 
    default: 
    critMultiplierMod = baseStats.critMultiplier + itemBonus.critMultiplier;
      break;
  }
  
  //Movement Speed
  switch (champ.name) {
    case 'Janna':
      moveSpeedMod = (baseStats.moveSpeed + itemBonus.moveSpeed) * 5 / 100;
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
      armPenMod = (itemBonus.critChance * 35 / 100);
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
  }, [champ, baseStats, itemBonus, currentLevel, abilitiesBonus]);

  const [itemEffects, setItemEffects] = useState({
    rabadon: false,
    twinguard: false,    
    steraks: false,
    seraphs: false,
    fimbulwinter: false,
    muramana: false,
    lastWhisper: false,

    forceOfNature: false,
    bootsPassive: false,
  });

  const itemEffectsMemo = useMemo(() =>{
    
    const steraks = itemEffects.steraks ? baseStats.attack / 2 : 0;
    const rabadon = itemEffects.rabadon ? ((itemBonus.ap + championModifier.ap) * (20 + (25/14 * (currentLevel - 1))) / 100) : 0;
    const twinguardAR = itemEffects.twinguard ? ((baseStats.armor + itemBonus.armor + championModifier.armor) * 30 / 100) : 0;
    const twinguardMR = itemEffects.twinguard ? ((baseStats.magres + itemBonus.magres + championModifier.magres) * 30 / 100) : 0;
    const seraphs = itemEffects.seraphs ? ((baseStats.mana? baseStats.mana + itemBonus.mana : itemBonus.mana) * 3/100) : 0;
    const muramana = itemEffects.muramana ? ((baseStats.mana? baseStats.mana + itemBonus.mana : itemBonus.mana) * 1.5/100) : 0;
    const fimbulwinter = itemEffects.fimbulwinter ? ((baseStats.mana? baseStats.mana + itemBonus.mana : itemBonus.mana) * 8/100) : 0;
    const lastWhisper = itemEffects.lastWhisper ? ((15 + Number(currentLevel))/100) : 0;
    const forceOfNature = itemEffects.forceOfNature;
    const bootsPassive = itemEffects.bootsPassive;


    
    return {
      attack: steraks + muramana,
      ap: rabadon + seraphs,
      armor: twinguardAR,
      magres: twinguardMR,
      health: fimbulwinter,
      armPen: lastWhisper,
      forceOfNature: forceOfNature,
      bootsPassive: bootsPassive

    }
  }, [itemEffects, baseStats, itemBonus, championModifier])

  

  // State and functions for changing stats depending on bonus from items passive effects

  const [fonStacked, setFonStacked] = useState(false);
  
  const toggleFON = () => {
    setFonStacked(oldState => !oldState)
  };
  
  const bonusEffectsMemo = useMemo(() =>{
    return {
      rabadon: Math.floor((itemBonus.ap) * (20 + (25/14 * (currentLevel - 1))) / 100),
      twinguardAR: Math.floor((baseStats.armor + itemBonus.armor + championModifier.armor) * 30 / 100),
      twinguardMR: Math.floor((baseStats.magres + itemBonus.magres + championModifier.magres) * 30 / 100),
      
    }
  }, [itemBonus])

  const [rabadonApplied, setRabadonApplied] = useState(false);
  const [twinguardApplied, setTwinguardapplied] = useState(false);
  

  const toggleTwinguard = () => {
    setTwinguardapplied(oldState => !oldState)
  };

  const toggleRabadon = () => { 
    setRabadonApplied(oldState => !oldState)
  };

  
  
  const totalMemo = useMemo(() => {
    const combiner = {
      health: champ.name !== 'Pyke' ? championModifier.health + itemEffectsMemo.health: baseStats.health,
      mana: champ.manaBase ? baseStats.mana + itemBonus.mana : itemBonus.mana,
      armor: baseStats.armor + itemBonus.armor + championModifier.armor + itemEffectsMemo.armor,
      magres: baseStats.magres + itemBonus.magres + championModifier.magres + itemEffectsMemo.magres,
      attack: baseStats.attack + itemBonus.attack + championModifier.attack + itemEffectsMemo.attack,
      ap: itemBonus.ap + championModifier.ap + itemEffectsMemo.ap,

      as: championModifier.as,

      armPen: itemEffectsMemo.armPen + championModifier.armPen,
      magPen: itemBonus.magPen,
      flatArmPen: itemBonus.flatArmPen,
      flatMagPen: itemBonus.flatMagPen,
      armorReduction: itemBonus.armorReduction,
      magResReduction: itemBonus.magResReduction,


      moveSpeed: baseStats.moveSpeed + itemBonus.moveSpeed + championModifier.moveSpeed,
      ah: itemBonus.ah,

      critChance: championModifier.critChance,
      critMultiplier: championModifier.critMultiplier,
      critDamage: ((baseStats.attack + itemBonus.attack))*(champ.name != 'Ashe' ? baseStats.critMultiplier + itemBonus.critMultiplier : 1),

      forceOfNature: itemEffectsMemo.forceOfNature,
      bootsPassive: itemEffectsMemo.bootsPassive
    }

    return {
      health: combiner.health,
      mana: combiner.mana,

      armor: combiner.armor,
      magres: combiner.magres,

      attack: combiner.attack,      
      ap: combiner.ap,
      
      as: combiner.as,
      dps: (combiner.attack) * (combiner.as),
      
      dmgReductArm: ((1 - (100/(100 + combiner.armor)))*100),
      dmgReductMag: ((1 - (100/(100 + combiner.magres)))*100),
      effectiveHealthArm: ((combiner.health)/(100/(100 + (combiner.armor)))),
      effectiveHealthMag: ((combiner.health)/(100/(100 + (combiner.magres)))),

      flatArmPen: combiner.flatArmPen,
      flatMagPen: combiner.flatMagPen,
      armPen: combiner.armPen,
      magPen: combiner.magPen,
      armorReduction: combiner.armorReduction,
      magResReduction: combiner.magResReduction,
      

      moveSpeed: combiner.moveSpeed,
      critChance: combiner.critChance,
      critMultiplier: combiner.critMultiplier,
      critDamage: combiner.critDamage,
      
      ah: combiner.ah,
      cdr: (1-(1/(1+combiner.ah/100))),
      
      forceOfNature: combiner.forceOfNature,
      bootsPassive: combiner.bootsPassive
    };
  }, [baseStats, itemBonus, championModifier, currentLevel, itemEffectsMemo]);


  function levelSlider(n) {
    n.preventDefault();
    const newLevel = n.target.value;
    setCurrentLevel(newLevel);
  }

  function updateitemBonus(updatedValues) {
    setItemBonus((prevStats) => ({...prevStats, ...updatedValues}))
  };

  function updateItemEffects(updatedValues) {
    setItemEffects((prevStats) => ({ ...prevStats, ...updatedValues }));
  };

  // here we be tryin' pass the memo up

  const { totalStats, setTotalStats } = useStats();
  

  useEffect(() => {
    setTotalStats(prevTotalStats => {
      const newTotalStats = [...prevTotalStats];
      newTotalStats[1] = totalMemo;
      return newTotalStats;
    });
  }, [itemBonus, totalMemo, currentLevel, rabadonApplied, twinguardApplied, fonStacked]);

  const [activePageIndex, setActivePageIndex] = useState(0);
  const pages = [
    { component: <Inventory 
      base={baseStats}
      bonus={itemBonus}
      total={totalMemo}
      bonusEffects={bonusEffectsMemo}
      handleBonusChange={updateitemBonus}
      currentLevel={currentLevel}      
      index={index}
      champ={champ}
      itemEffects={itemEffects}
      updateItemEffects={updateItemEffects}
    />, label: 'Inventory' },
    { component: <Abilities 
      updateAbilitiesBonus={updateAbilitiesBonus}
      champ={champ}
      currentLevel={currentLevel}
      index={index}
      bonus={itemBonus}            
      />, label: 'Abilities' },
    
   
  ];

 


  return (
    <div className='champTile'>

           
<div className='baseInfo'>
      <div className='defaultsTile'>
      <div className='visitCard'>      

        <img src={champion.icon} alt="Champion Icon" className='champIcon'/>
        <div className='nameTile'>
          <div className="selectOption">
            <h5>Select Champion: </h5>
        <select onChange={handleChampSelect}>
          <option value={champTemplate} disabled>Select a champion</option>
          {champions.map((champion) => (
            <option key={champion.id} value={champion.name}>
              {champion.name}
            </option>
          ))}
        </select>
          </div>
          
        <h2 className="champName">{champion.name}</h2>
        <p className='champTitle'>{champion.title}</p>
        </div>
        <div className="roleTile">
          <h3>Position:</h3>
          <p>{champion.rolePrim}</p>
          {champion.roleSecond && <p>{champion.roleSecond}</p>}
        </div>        
      </div>
      
      <div className='baseStats'>
        

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

      <table>
          <thead>
            <tr>
              <th>
                Base stats
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Stat</td>
              <td>Base</td>
              <td>Scaling</td>
            </tr>

            <tr>
              <td>Health</td>
              <td className='stat--hp'>{champion.healthBase}</td>
              <td className='stat--hp'>{champion.healthScale}</td>
            </tr>

            {!champion.manaBase ? (<tr>
              <td>Mana</td>
              <td colSpan={2}>Manaless(TBD)</td>
            </tr>) :
              (
                <tr>
                <td>Mana</td>
                <td className='stat--mana'>{champion.manaBase}</td>
                <td className='stat--mana'>{champion.manaScale}</td>
                </tr>
              )}

            <tr>
              <td>Armor</td>
              <td className='stat--armor'>{champion.armorBase}</td>
              <td className='stat--armor'>{champion.armorScale}</td>
            </tr>

            <tr>
              <td>Mag Res</td>
              <td className='stat--magres'>{champion.magresBase}</td>
              <td className='stat--magres'>{champion.magresScale}</td>
            </tr>

            <tr>
              <td>AD</td>
              <td className='stat--ad'>{champion.attackBase}</td>
              <td className='stat--ad'>{champion.attackScale}</td>
            </tr>            

            <tr>
            <td className="stat--as">Attack Speed</td>
            <td className="stat--as">{champion.asBase}</td>
            <td className="stat--as">{parseFloat(champion.asScale).toFixed(3)}</td>
          </tr>

          <tr>
            <td colSpan={3}><abbr title="Basically your attack speed consists of BASIC value, plus percentage of BASIC value as bonus at level 1 plus % growth on that is derived as % of BASE as. Most of AS bonuses are based on your BASE AS"><sup>**</sup></abbr>AS bonus</td>
          </tr>

          <tr>
            <td colSpan={2}>At level 1</td>
            <td className="stat--as">{Math.round(champion.asBaseBonus/champion.asBase*100)}%</td>
          </tr>

          <tr>
            <td colSpan={2}>Level bonus</td>
            <td className="stat--as">{(champion.asScale/champion.asBase*100).toFixed(1)}%</td>
          </tr>
              

          </tbody>
        </table>
      
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
            <td className='stat--hp'>{baseStats.health}</td>
            <td className='stat--hp'>{itemBonus.health}</td>
            <td className='stat--hp'>{totalMemo.health}</td>
          </tr>

          <tr>
            <td>Mana</td>
            <td className='stat--mana'>{baseStats.mana}</td>
            <td className='stat--mana'>{itemBonus.mana}</td>
            <td className='stat--mana'>{totalMemo.mana}</td>
          </tr>

          <tr>
            <td>Armor</td>
            <td className='stat--armor'>{baseStats.armor}</td>
            <td className='stat--armor'>{itemBonus.armor}</td>
            <td className='stat--armor'>{totalMemo.armor}</td>
          </tr>

          <tr>
            <td>Magic Resistance</td>
            <td className='stat--magres'>{baseStats.magres}</td>
            <td className='stat--magres'>{itemBonus.magres}</td>
            <td className='stat--magres'>{totalMemo.magres}</td>
          </tr>

          <tr>
            <td>Attack</td>
            <td className='stat--ad'>{baseStats.attack}</td>
            <td className='stat--ad'>{itemBonus.attack}</td>
            <td className='stat--ad'>{totalMemo.attack}</td>
          </tr>

          <tr>
            <td>Ability Power</td>
            <td className='stat--ap'>{baseStats.ap}</td>
            <td className='stat--ap'>{itemBonus.ap}</td>
            <td className='stat--ap'>{totalMemo.ap}</td>
          </tr>

          <tr>
            <td>Attack speed</td>
            <td className='stat--as'>{baseStats.as.toFixed(2)}</td>
            <td className='stat--as'>{itemBonus.as.toFixed(2)}</td>
            <td className='stat--as'>{totalMemo.as.toFixed(2)}</td>
          </tr>

          <tr>
            <td>Movespeed</td>
            <td className='stat--moveSpeed'>{Math.ceil(baseStats.moveSpeed)}</td>
            <td className='stat--moveSpeed'>{Math.ceil(itemBonus.moveSpeed)}</td>
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
            <td colSpan={2} className="stat--ad">{((totalMemo.armPen) * 100).toFixed(0)}%</td>
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
      </div>
      </div>

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
      
    
      </div>     
      
    </div>
    )
  
}