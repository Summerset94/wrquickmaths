import React, {useMemo, useState, useReducer, useEffect} from 'react'
import { useStats } from "./StatsContext";





const Runes = ({champ, currentLevel, index, bonus, updateRunesEffects}) => {

// Total stats of attacker and defender for comparison
  const { totalStats } = useStats();
  let level = currentLevel

const atk = totalStats[index === 1 ? 0 : 1];
const def = totalStats[index === 1 ? 1 : 0];

// Memo to track the defenders resistances change
const mod = useMemo(() => {

  const postMitigationArmor = (target, attacker) => {
    let mitigatedArmor = 0
    if (attacker.armorReduction && (target.armor * (1 - attacker.armorReduction) <= 0)) {
      return (target.armor * (1 - attacker.armorReduction))
    } else if (attacker.armorReduction) { 
     
      mitigatedArmor = ((target.armor * (1 - attacker.armorReduction)) * (1 - attacker.armPen) - attacker.flatArmPen);
     
      return (Math.max(mitigatedArmor, 0))

    } else {
      mitigatedArmor = (target.armor * ((1 - attacker.armPen)) - attacker.flatArmPen)

      return (Math.max(mitigatedArmor, 0))
    }
  };

  const postMitigationMres = (target, attacker) => {
    let mitigatedMres = 0
    if (attacker.magResReduction && (target.magres - attacker.magResReduction <= 0)) {
      return Math.round(target.magres - attacker.magResReduction)
    } else if (attacker.magResReduction) { 
     
      mitigatedMres = ((target.magres - attacker.magResReduction) * (1 - attacker.magPen) - attacker.flatMagPen);
     
      return Math.round(Math.max(mitigatedMres, 0))

    } else {
      mitigatedMres = (target.magres * (1 - attacker.magPen) - attacker.flatMagPen)

      return Math.round(Math.max(mitigatedMres, 0))
    }
  };

  

  const physicalDamageReduction = (postMitigationArmor, champ) => {
    return ((1 - (100/(100 + (postMitigationArmor))))*100*(1 + (champ.bootsPassive === 'Steelcaps' ? 0.1 : 0)));
  };

  const magicalDamageReduction = (postMitigationMres, champ) => {
    return ((1 - (100/(100 + (postMitigationMres))))*100*(1 + (champ.bootsPassive === 'Mercury' ? 12 : 0) + (champ.fonEffect ? 25 : 0)));
  };

  const postMitigationArmorAttacker = postMitigationArmor(atk ,def);
  const postMitigationArmorDefender = postMitigationArmor(def, atk);

  const postMitigationMresAttacker = postMitigationMres(atk ,def);
  const postMitigationMresDefender = postMitigationMres(def ,atk);

  const physicalReductionAttacker = physicalDamageReduction(postMitigationArmorAttacker, atk);
  const physicalReductionDefender = physicalDamageReduction(postMitigationArmorDefender, def);

  const magicalReductionAttacker = magicalDamageReduction(postMitigationMresAttacker, atk);
  const magicalReductionDefender = magicalDamageReduction(postMitigationMresDefender, def);

  return {
    attackerArmor: postMitigationArmorAttacker,
    attackerMres: postMitigationMresAttacker,
    atkPhysRed: physicalReductionAttacker/100,
    atkMagRed: magicalReductionAttacker/100,
    atkcdr:(1 - atk.cdr),


    defenderArmor: postMitigationArmorDefender,
    defenderMres: postMitigationMresDefender,
    defPhysRed: physicalReductionDefender/100,
    defMagRed: magicalReductionDefender/100,
    defcdr:(1 - def.cdr)

  }
},
[atk, def]);


// useReducer hook for tracking runes effects that have constant impact on character
const initialRunesEffects = {
  keystones: {
    conqueror: 0,
    grasp: 0,
    aftershock: false,
    tempoType: 'ranged',
    tempo: 0,
  },
  
  path: {
    suddenImpact: false,
    eyeballCollector: 0,
    zombieWard: 0,
  }, 
  
};

const runesEffectsReducer = (state, action) => {
  switch (action.type) {
    case 'conqueror':
      return {
        ...state,
        keystones: {
          ...state.keystones,
          conqueror: state.keystones.conqueror < 6 ? state.keystones.conqueror + 1 : 0,
        }
        
      };

    case 'grasp':
      return {
        ...state,
        keystones: {
          ...state.keystones,
          grasp: parseInt(action.payload) || 0,
        }
      };  

    case 'toggleAftershock':
      return {
        ...state,
        keystones: {
          ...state.keystones,
          aftershock: !state.keystones.aftershock
        }        
      };

    case 'toggleTempoType':
      return {
        ...state,
        keystones: {
          ...state.keystones,
          tempoType: state.keystones.tempoType === 'ranged' ? 'melee' : 'ranged'
        }
        
      };

    case 'tempoStacks': 
      return {
        ...state,
        keystones: {
          ...state.keystones,
          tempo: state.keystones.tempo < 6 ? state.keystones.tempo + 1 : 0,
        }        
      }

    case 'reset-keystones':
      return {
        ...state,
        keystones: {
          ...initialRunesEffects.keystones
        }        
      };
      
    case 'reset-path':
      return {
        ...state,
        path: {
          ...initialRunesEffects.path
        }        
      };  

    case 'toggleSuddenImpact':
      return {
        ...state,
        path: {
          ...state.path,
          suddenImpact: !state.path.suddenImpact
        }
      };

    case 'eyeball': 
      return {
        ...state,
        path: {
          ...state.path,
          eyeballCollector: state.path.eyeballCollector < 10 ? state.path.eyeballCollector + 1 : 0,
        }
      };

    case 'zombie ward': 
      return {
        ...state,
        path: {
          ...state.path,
          zombieWard: state.path.zombieWard < 5 ? state.path.zombieWard + 1 : 0,
        }
      };

    default:
      return state;
  }
};

const [runesEffects, dispatch] = useReducer(runesEffectsReducer, initialRunesEffects);

// calculations of runes effects
const runeFormulas = useMemo(()=>{
  const damagetype = bonus.attack < atk.ap * 0.6 ? 'magical' : 'physical';

  const electrocute = {
    damage: {
      base: 40,
      growth: 154,
      modifier: bonus.attack * 40 / 100 + atk.ap * 25 / 100
    },

    cooldown: {
      base: 20,
      growth: -7
    }
  };

  const aery = {
    damage: {
      base: 10,
      growth: 50,
      modifier: bonus.attack * 20 / 100 + atk.ap * 10 / 100
    },

    shield: {
      base: 20,
      growth: 100,
      modifier: bonus.attack * 40 / 100 + atk.ap * 20 / 100
    }
  };

  const phaseRush = {
    movespeed: {
      melee: {
        base: 0.4,
        growth: 0.2
      },

      ranged: {
        base: 0.3,
        growth: 0.2
      }
    }
  };

  const conqueror = {
    ad: {
      base: 2,
      growth: 4
    },

    ap: {
      base: 3,
      growth: 6
    }
  };

  const fleetFootwork = {
    healing: {
      base: 15,
      growth: 70,
      modifier: (bonus.attack * 30/100) + (atk.ap*30/100)
    }
  };

  const krakenSlayer = {
    damage: {
      base: 30,
      growth: 65,
      modifier: (bonus.attack * 40 / 100) + (atk.ap * 20 / 100)
    }
  };

  const aftershock = {
    damage: {
      base: 12,
      growth: 98,
      modifier: (atk.health * 3 / 100)
    },
    defence: {
      armor: 35 + (bonus.armor * 60 / 100),
      magres: 35 + (bonus.magres * 60 / 100)
    }
  };

  const lethalTempo = {
    base: runesEffects.keystones.tempoType === 'ranged' ? 4 : 7,
    growth: 6,
    bonus: runesEffects.keystones.tempo === 6 ? 40 : 0,
    stacks: runesEffects.keystones.tempo
  }

  const shieldBash = {
    damage: {
      base: 15,
      growth: 35,
      modifier: (bonus.attack * 15 / 100) + (atk.ap * 10 / 100)
    }
  }

  const empoweredAA = {
    base: 35,
    growth: 15,
  }
  
  return { 

    damagetype: {
    type: damagetype,
    description: damagetype === 'physical' ? <span className='stat--ad'>Physical</span> : <span className='stat--ap'>Magical</span>
    },

    electrocute: {

      cooldown: (electrocute.cooldown.base + electrocute.cooldown.growth/14 * (currentLevel-1)),
      damage: {
        raw: (electrocute.damage.base + electrocute.damage.growth/14*(currentLevel-1) + electrocute.damage.modifier),
        mitigated: ((electrocute.damage.base + electrocute.damage.growth/14*(currentLevel-1) + electrocute.damage.modifier) * (1 - (damagetype === 'physical' ? mod.defPhysRed : def.defMagRed)))
    }
    },

    aery: {
      damage: {
        raw: (aery.damage.base + aery.damage.growth/14*(currentLevel-1) + aery.damage.modifier),
        mitigated: ((aery.damage.base + aery.damage.growth/14*(currentLevel-1) + aery.damage.modifier) * (1 - (damagetype === 'physical' ? mod.defPhysRed : mod.defMagRed)))
      },
      shield: (aery.shield.base + aery.shield.growth/14*(currentLevel-1) + aery.shield.modifier)
    },

    phaseRush:{
      melee: (atk.moveSpeed * (phaseRush.movespeed.melee.base + phaseRush.movespeed.melee.growth/14 * (currentLevel-1))),
      ranged: (atk.moveSpeed * (phaseRush.movespeed.ranged.base + phaseRush.movespeed.ranged.growth/14 * (currentLevel-1))),
      cdr: (1-(1/(1+(atk.ah + 25)/100)))
    },

    conqueror:{
      bonus: damagetype === 'physical' ? 
       ((conqueror.ad.base + conqueror.ad.growth/14*(currentLevel-1))*runesEffects.keystones.conqueror) :
       ((conqueror.ap.base + conqueror.ap.growth/14*(currentLevel-1))*runesEffects.keystones.conqueror),
      stacks: runesEffects.keystones.conqueror
    },

    fleetFootwork: {
      healing: {
        champion: fleetFootwork.healing.base + (fleetFootwork.healing.growth/14*(currentLevel-1)) + (fleetFootwork.healing.modifier),
  
        melee: (fleetFootwork.healing.base + (fleetFootwork.healing.growth/14*(currentLevel-1)) + (fleetFootwork.healing.modifier)) * (60/100),
  
        ranged: (fleetFootwork.healing.base + (fleetFootwork.healing.growth/14*(currentLevel-1)) + (fleetFootwork.healing.modifier)) * (20/100)
       }
    },

    krakenSlayer: {
      damage: krakenSlayer.damage.base + (krakenSlayer.damage.growth/14*(currentLevel-1)) + krakenSlayer.damage.modifier
    },

    grasp: {
      damage: {
        raw: Number((atk.health * 3 / 100) + (bonus.attack * 20 / 100) + (atk.ap * 10 / 100)),
        mitigated: ((atk.health * 3 / 100) + (bonus.attack * 20 / 100) + (atk.ap * 10 / 100)) * (1 - mod.defMagRed),
      }
    },

    aftershock: {
      damage: {
        raw: (aftershock.damage.base + aftershock.damage.growth/14*(currentLevel-1) + aftershock.damage.modifier),
        mitigated: (aftershock.damage.base + aftershock.damage.growth/14*(currentLevel-1) + aftershock.damage.modifier) * (1 - mod.defMagRed)
      },
      defence: {
        armor: aftershock.defence.armor,
        magres: aftershock.defence.magres
      }
    },

    lethalTempo: {
      as: champ.asBase * ((lethalTempo.base + lethalTempo.growth/14*(currentLevel-1))*lethalTempo.stacks + lethalTempo.bonus)/100
    },

    shieldBash: {
      damage: {
        raw: shieldBash.damage.base + shieldBash.damage.growth/14 * (currentLevel-1) + shieldBash.damage.modifier,
        mitigated: (shieldBash.damage.base + shieldBash.damage.growth/14 * (currentLevel-1) + shieldBash.damage.modifier) * (1 - (damagetype === 'physical' ? mod.defPhysRed : def.defMagRed))
      }
    },

    empoweredAA: {
      raw: empoweredAA.base + empoweredAA.growth/14*(currentLevel -1),
      mitigated: empoweredAA.base + empoweredAA.growth/14*(currentLevel -1) * (1 - (damagetype === 'physical' ? mod.defPhysRed : def.defMagRed)),
    },

    eyeballCollector: {
      bonus: (runesEffects.path.eyeballCollector + (runesEffects.path.eyeballCollector === 10 ? 10 : 0)) * (damagetype === 'magical' ? 2 : 1),
      type: damagetype === 'magical' ? <span className='stat--ap'>Ability Power</span> : <span className='stat--ad'>Attack Damage</span>
    },

    zombieWard: {
      bonus: (runesEffects.path.zombieWard * (damagetype === 'magical' ? 6 : 3) + (runesEffects.path.zombieWard === 5 ? damagetype === 'magical' ? 20 : 10 : 0)),
      type: damagetype === 'magical' ? <span className='stat--ap'>Ability Power</span> : <span className='stat--ad'>Attack Damage</span>
    }

  }
}, [mod, currentLevel, runesEffects])

// effect for updating constant bonuses from runes
useEffect(() => {
  const payload = {
    attack: (runeFormulas.damagetype.type === 'physical' ? runeFormulas.conqueror.bonus : 0) + (runeFormulas.damagetype.type === 'physical' ? runesEffects.path.eyeballCollector : 0) + (runeFormulas.damagetype.type === 'physical' && runesEffects.path.eyeballCollector === 10 ? 10 : 0) + (runeFormulas.damagetype.type === 'physical' ? (runesEffects.path.zombieWard * 3) : 0) + (runeFormulas.damagetype.type === 'physical' && runesEffects.path.zombieWard === 5 ? 10 : 0),

    ap: (runeFormulas.damagetype.type === 'magical' ? runeFormulas.conqueror.bonus : 0) + (runeFormulas.damagetype.type === 'magical' ? (runesEffects.path.eyeballCollector * 2) : 0) + (runeFormulas.damagetype.type === 'magical' && runesEffects.path.eyeballCollector === 10 ? 20 : 0) + (runeFormulas.damagetype.type === 'magical' ? (runesEffects.path.zombieWard * 6) : 0) + (runeFormulas.damagetype.type === 'magical' && runesEffects.path.zombieWard === 5 ? 20 : 0),

    health: (runesEffects.keystones.grasp * 5),

    armor: (runesEffects.keystones.aftershock ? runeFormulas.aftershock.defence.armor : 0),

    magres: (runesEffects.keystones.aftershock ? runeFormulas.aftershock.defence.magres : 0),

    as: (runeFormulas.lethalTempo.as),

    flatArmPen: (runesEffects.path.suddenImpact ? 13 : 0),

    flatMagPen: (runesEffects.path.suddenImpact ? 13 : 0),
  }

  updateRunesEffects(payload)
}, [runesEffects, currentLevel])

// Array for storing keystones descriptions
const keystones = [
  {
    name: 'Electrocute',    
    id: '6ba993ad-90a3-4e86-9a72-5c769914c2ae',
    icon: '../images/runes/electrocute.webp',
    description: <div className='runeDescription'>
    <p>Within 3 seconds, hit the same enemy champion with 3 basic attacks or abilities to cause additional adaptive damage to the target.</p>

    <p title='Physical or magical based on your bonus attack and Ability Power'>Damage type: {runeFormulas.damagetype.description}</p>
    <p>Damage (pre/post-mitigation): {Math.round(runeFormulas.electrocute.damage.raw)} / {Math.round(runeFormulas.electrocute.damage.mitigated)}</p>
    <p>Damage formula: 40-194 (+11 per level) (<span className='stat--ad'>+40% bonus AD</span>) (<span className='stat--ap'>+20% AP</span>)</p>
    <p>Cooldown: {(runeFormulas.electrocute.cooldown).toFixed(1)} (20-13 based on level) seconds.</p>
  </div>
  },

  {
    name: 'Aery',
    id: 'ca422aab-6277-4784-8b52-8ea6a8a235d1',
    icon: '../images/runes/aery.webp',
    description: <div className='runeDescription'>
    <p>Your Attacks and abilities send Aery to a target, damaging enemies or shielding allies. Aery lingers on the target for 2 seconds before flying back to the user, and cannot be sent out again until she returns. Aery will gradually accelerate her return, and can be picked up by moving near her.</p>

    
    <p title='Physical or magical based on your bonus attack and Ability Power'>Damage type: {runeFormulas.damagetype.description}</p>
    <p>Damage (pre/post-mitigation): {Math.round(runeFormulas.aery.damage.raw)} / {Math.round(runeFormulas.aery.damage.mitigated)}</p>
    <p>Damage formula: 10-60 (based on level) (<span className='stat--ad'>+20% bonus AD</span>) (<span className='stat--ap'>+10% AP</span>)</p>
    
    <p>Shield: <span className='stat--armor'>{Math.round(runeFormulas.aery.shield)}</span></p>
    <p>Shield formula: 20-120 (based on level) (<span className='stat--ad'>+40% bonus AD</span>) (<span className='stat--ap'>+20% AP</span>)</p>
  </div>
  },

 {
  name: 'Phase Rush',
  id: '510faf7b-99f8-47ce-818d-3ccfe6b4b9a7',
  icon: '../images/runes/phaseRush.webp',
  description:  <div className='runeDescription'>
  <p>Using basic attacks or abilities on an enemy champion 3 times within 4 seconds grants Movement Speed and reduces the remaining cooldown of basic abilities by 20% and grants 25 Ability Haste for duration</p>

  <p>Duration: 3 seconds</p>
  <p>Movement Speed bonus (melee / ranged): <span className='stat--moveSpeed'>{Math.round(runeFormulas.phaseRush.melee)} / {Math.round(runeFormulas.phaseRush.ranged)}</span></p>
  <p>Cooldown reduction under effect: {Math.round(runeFormulas.phaseRush.cdr*100)}%</p>
  <p>Movespeed formula: melee: 40%-60% based on level, ranged: 30%-50% based on level</p>
  <p>Cooldown: 12 seconds.</p>
</div>
 },

 {
  name: 'Conqueror',
  id: 'c446021b-0e9e-48d7-8b66-a985057be148',
  icon: '../images/runes/conqueror.webp',
  description:  <div className='runeDescription'>
  <p>Gain stacks of Adaptive Force when hitting a champion with separate attacks or abilities. Stacks up to 6 times. When fully stacked, gain bonus omnivamp</p>

  <p>Stacks: {runesEffects.keystones.conqueror}</p>
  <button type='button' onClick={() => dispatch({ type: 'conqueror' })}>Change Stacks</button>

  <p>Active bonus: {runeFormulas.damagetype.description} {Math.round(runeFormulas.conqueror.bonus)}</p>
  <p>At full Stacks gain <span className='stat--vamp'>8% / 5% (for melee/ranged) Omnivamp</span> </p>
</div>
 },

 {
  name: 'Freet Footwork',
  id: 'b093a8f4-e3e8-4df2-b003-874794a6820d',
  icon: '../images/runes/fleetFootwork.webp',
  description: <div className='runeDescription'>
  <p>Moving, Attacking and casting builds Energy stacks. At 100 stacks, your heals you, grants increased Movement Speed, and restores mana or energy if you attack a champion</p>

  <p className='stat--hp'>Healing from champions: {Math.round(runeFormulas.fleetFootwork.healing.champion)}</p>
  <p className='stat--hp'>Healing from minions/monsters:</p>
  <ul>
    <li>for melee champions: <span className='stat--hp'>{Math.round(runeFormulas.fleetFootwork.healing.melee)}</span></li>
    <li>for ranged champions: <span className='stat--hp'>{Math.round(runeFormulas.fleetFootwork.healing.ranged)}</span></li>
  </ul>
  
  <p>Healing formula: 15-85 (based on level) (<span className='stat--ad'>+30% bonus AD</span>) (<span className='stat--ap'>+30% AP</span>)</p>

  <p>
    Movement Speed bonus: <span className='stat--moveSpeed'>20% ({Math.round(atk.moveSpeed * 20 / 100)}) for 1 second</span>.
  </p>

  <p>
    When attacking a champion, restore <span className='stat--mana'>8% missing mana</span> or <span className='stat--armor'>8% missing energy</span>
  </p>
</div>
 },

 {
  name: 'Kraken Slayer',
  id: 'c16ebe1e-8988-4178-b355-d3b65483f28e',
  icon: "../images/runes/krakenSlayer.webp",
  description: <div className='runeDescription'>
  <p>Gain stacks when hitting a champion with attacks. When reaching 3 stacks. Upon reaching 3 stacks, deal bonus true damage on attack.</p>

  <p>Stacks reset after not attacking enemy champion for 3 seconds.</p>

  <p className='stat--vamp'>Damage: {Math.round(runeFormulas.krakenSlayer.damage)}</p>

  <p>
    Damage formula: 30-95 (based on level) (<span className='stat--ad'>+40% bonus AD</span>) (<span className='stat--ap'>+20% AP</span>)
  </p>
  
</div>
 },

 {
  name: 'Grasp of the Undying',
  icon: "../images/runes/grasp.webp",
  id: '4aa2b0a4-02bf-49dc-abf5-7246b8931d11',
  description: <div className='runeDescription'>
  <p>
     Every 3 seconds in combat, your next attack on a champion will be enhanced with additional damage and increase your <span className='stat--hp'>Health</span> by <span className='stat--hp'>5</span> permanently
  </p>

  <p>Grasp proc damage: </p>
  <ul>
    <li>Pre-mitigation: <span className='stat--ap'>{Math.round(runeFormulas.grasp.damage.raw)}</span></li>
    <li>Post-mitigation: <span className='stat--ap'>{Math.round(runeFormulas.grasp.damage.mitigated)}</span></li>
  </ul>

  <div>
        <label>
          Set your <span className="stat--armor">Grasp</span> stacks:
          {' '}<input
            type="number"
            value={runesEffects.keystones.grasp}
            onChange={(e) => {dispatch({type: 'grasp', payload: e.target.value})}}
          />
        </label>            
        <ul>
          <li>Stacks: {runesEffects.keystones.grasp}</li>
          <li>Bonus health: <span className='stat--hp'>{(runesEffects.keystones.grasp * 5)}</span> </li>
        </ul>
      </div>
</div>,
 },

 {
  name: 'Aftershock',
  icon: '../images/runes/aftershock.webp',
  id: 'a61d65e7-1b28-4e54-940f-0c3233617b3f',
  description: <div className='runeDescription'>
    <p>After immobilizing an enemy champion, gain defences and deal a burst of magic damage around you</p>

    <p>
      Damage (pre / post-mitigation): <span className='stat--ap'>{Math.round(runeFormulas.aftershock.damage.raw)} / {Math.round(runeFormulas.aftershock.damage.mitigated)} magic damage</span>
    </p>

    <p>
      Defence bonus: <span className='stat--armor'>{Math.round(runeFormulas.aftershock.defence.armor)} Armor</span> / <span className='stat--magres'>{Math.round(runeFormulas.aftershock.defence.magres)} Magic Resistance</span> 
    </p>

    <p>
      Damage formula: 12-110 (based on level) (<span className='stat--hp'>
        3% Max Health</span>).
    </p>

    <p>
      Defence formula: <span className='stat--armor'>35 Armor (+60% bonus Armor)</span>, <span className='stat--magres'>35 Magic Resistance (+60% bonus Magic Resistance)</span> for 2.5 seconds
    </p>

    <p>
      Cooldown: 20 Seconds
    </p>

    <p>toggle active Defence bonus:</p>
    <p>
      Bonus: {runesEffects.keystones.aftershock ? 'active' : 'unactive'};
    </p>
    <p>
      <button onClick={() => {dispatch({type: 'toggleAftershock'})}}>toggle bonus</button>
    </p>
  </div>,
 },

 {
  name: 'Lethal Tempo',
  icon: '../images/runes/lethalTempo.webp',
  id: '0dce20df-c3ce-42a9-b0c2-d2acea2b62e0',
  description: <div className='runeDescription'>
    <p>
      Gain stacks of attack speed when attacking enemy champions. Stacks up to 6 times, stacks lasts for 6 seconds. When fully stacked, you gain Bonus Attack Speed and can exceed <strong title='2.5 attacks per second'>*Attack Speed Cap</strong>.
    </p>
    <p>
      Stacks: {runesEffects.keystones.tempo}
    </p>
    <p>
      Attack Speed Bonus: {(runeFormulas.lethalTempo.as).toFixed(3)}
    </p>

     <p>
      Current bonus type: {runesEffects.keystones.tempoType}
     </p>
     <p>
      Switch bonus types  and stacks 
      <button onClick={() => {dispatch({type: 'toggleTempoType'})}}>Toggle type</button>
      <button onClick={() => {dispatch({type: 'tempoStacks'})}}>Change current stacks</button>
     </p>
  </div>
  
 },

 {
  name: 'First Strike',
  icon: '../images/runes/firstStrike.webp',
  id: '08831f5d-b7e5-4165-a589-017cf388f924',
  description: <div>
    <p>
      Dealing damage to an enemy champions within 0.25 seconds of engaging them in combat grants <span className='stat--armor'>5 Gold</span> and enables First Strike for 3 seconds. While the effect is active you deal 9% of <strong>post-mitigation</strong> damage inflicted as <span className='stat--vamp'>true damage</span>.
    </p>
    <p>
      After the effect ends gain gold equal to 100% (for melee characters) / 85% (for ranged characters) of <strong>bonus damage</strong>.
    </p>

    <p>
      Cooldown: {(20-(7/14*(currentLevel-1))).toFixed(1)} (20-13 based on level) seconds.
    </p>
  </div>,
 },

 {
  name: 'Glacial Augment',
  icon: "../images/runes/glacial.webp",
  id: '33675895-4045-429d-b2fd-b4d4aabe5cd2',
  description: <div className='runeDescription'>
    <p>Landing a basic attack on a champion champion will <span className='stat--moveSpeed'>slow</span>  them by <span className='stat--moveSpeed'>20% for 1.5 seconds</span>. (10 second cooldown per target).</p>
    
    <p>
      Immobilizing an enemy champion will cause 3 glacial rays to emanate from them towards you and other nearby enemy champions, creating icy zones that last 3 seconds. Enemies within the zone are slowed by <span className='stat--moveSpeed'>{Math.round(20 + bonus.health * 1.5/100)}%</span> (20 + <span className='stat--hp'> 1.5% of your bonus health</span>), and deal 12% reduced damage against you and your allies. The slow persists for 1.5 seconds after leaving the zone. (20 second cooldown)
    </p>
  </div>,
 }

];

const mainRunes = [
  {
    path: 'Domination',
    path_Id: '763258c4-3c21-4a77-bb40-04f1c3254fc4',
    icon: '../images/runes/domination.webp',
    runes: [
      {
        name: 'Scorch',
        icon: '../images/runes/scorch.webp',
        id: '7cea6e4f-010c-4bb9-948c-fe61fbea2968',
        slot: 0,
        description: <div className='runeDescription'>
          <p>
            Damaging an enemy with an ability deals an additional 28-42 (based on level) <span className='stat--ap'>magic damage</span> after 1 second (8 seconds cooldown).
          </p>

          <p>
            Damage (pre- / post-mitigation): <span className='stat--ap'>{Math.round(28 + (currentLevel - 1))}</span> / <span className='stat--ap'>{Math.round((28 + (currentLevel - 1)) * (1 - mod.atkMagRed))}</span>
          </p>          
        </div>
      },

      {
        name: 'Shield Bash',
        icon: '../images/runes/shieldBash.webp',
        id: 'e1cf17ea-2aba-4e88-9d20-71640ca4871b',
        slot: 0,
        description: <div className='runeDescription'>
          <p>Damage (pre- / post-mitigation): {Math.round(runeFormulas.shieldBash.damage.raw)} / {Math.round(runeFormulas.shieldBash.damage.mitigated)} {runeFormulas.damagetype.description} damage.</p>

          <p>
            After gaining a healing or shielding effect, your next attack on an enemy champion is empowered to deal 15-50 (based on level) (<span className='stat--ad'>+15 bonus AD</span>) (<span className='stat--ap'>+10% AP</span>) bonus adaptive damage. Empowered attack goes on cooldown after 5 seconds of shield expiring. 
          </p>

          <p>
            7 Seconds cooldown.
          </p>
        </div>
      },

      {
        name: 'Sudden Impact',
        icon: '../images/runes/suddenImpact.webp',
        id: '95347d1b-0597-4b95-aade-d4cd886c645d',
        slot: 0,
        description: <div className='runeDescription'>
          <p>
            Effect is: {runesEffects.path.suddenImpact ? <span className='stat--hp'>Active</span> : <span className='stat--vamp'>Disabled</span>}.
          </p>
          <p>
            <button onClick={()=> {dispatch({type:'toggleSuddenImpact'})}}>Switch bonus penetration effect</button>
          </p>
          <p>After Exiting stealth or Using a dash, leap, blink, or teleport effect, damaging an enemy champion grants you <span className='stat--armor'>13 Armor Penetration</span> and <span className='stat--magres'>13 Magic Penetration </span>for 4 seconds.</p>

          <p>
            4 Seconds cooldown.
          </p>
        </div>
      },

      {
        name: 'Empowered Attack',
        icon: '../images/runes/empoweredAttack.webp',
        id:'6a16395f-ef11-4565-8894-1545edb4e612',
        slot: 1,
        description: <div className='runeDescription'>
          <p>Every 10 seconds the next attack will be empowered, dealing 35-50 (based on level) bonus adaptive damage</p>

          <p>
            Bonus (pre/post mitigation): {Math.round(runeFormulas.empoweredAA.raw)} / {Math.round(runeFormulas.empoweredAA.mitigated)} {runeFormulas.damagetype.description} damage
          </p>
        </div>
      },

      {
        name: 'Cheap Shot',
        icon: '../images/runes/cheapShot.webp',
        id: 'a42d3c1c-b0cf-4a0c-8ae2-c1ac5d4c9eb6',
        slot: 1,
        description: <div className='runeDescription'>
          <p>
            Deal <span className='stat--vamp'>{10 + 35/14*(currentLevel-1)}</span> (10-45 based on level) bonus true damage to enemies whose movement is impaired.
          </p>          
        </div>
      },

      {
        name: 'Mark of the Weak',
        icon: '../images/runes/markOfTheWeak.webp',
        id: '699413fd-ea39-4e40-96d5-0ef4d09d1240',
        slot: 1,
        description: <div className='runeDescription'>
          <p>
            Using abilities to deal damage to deal damage to enemy champions marks them as weak, increasing damage taken by 4%-7% (increased at level 5, 9, 13).
          </p>
          <p>
            The mark disappears after they take ability damage 3 times or after 7 seconds.
          </p>

          <p>
            coldown: 15 seconds
          </p>
        </div>
      },

      {
        name: 'Eyeball Collector',
        icon: '../images/runes/eyeballCollector.webp',
        id: '09792921-c845-4e66-8f44-b2d34b1b4654',
        slot: 2,
        description: <div className='runeDescription'>
        <p>
          Current Stacks: {runesEffects.path.eyeballCollector}
        </p>

        <p>
          Bonus: {runeFormulas.eyeballCollector.bonus} {runeFormulas.eyeballCollector.type}
        </p>

        <p>
          <button onClick={() => {dispatch({type:'eyeball'})}}>Change stacks amount</button>
        </p>

        <p>
          Gain <span className='stat--ad'>1 Attack Damage</span> or <span className='stat--ap'>2 Ability Power</span> after each enemy takedown stacking up to 10 times.
        </p> 

        <p>
          At 10 stacks gain bonus <span className='stat--ad'>10 Attack Damage</span> or <span className='stat--ap'>20 Ability Power</span>
        </p>
        </div>
      },

      {
        name: 'Ingenious Hunter',
        icon: '../images/runes/ingeniousHunter.webp',
        id: '35673a93-0283-4944-8182-210570657f08',
        slot: 2,
        description: <div className='runeDescription'>
          Gain 20 Item Ability Haste. Gain a bonus 5 Item Ability Haste after each unique enemy champion takedown. Stacks up to 5 times.
        </div>
      },

      {
        name: 'Zombie Ward',
        icon: '../images/runes/zombieWard.webp',
        id: '06409904-eec6-48ec-982e-48cf34517bf1',
        slot: 2,
        description: <div className='runeDescription'>
           <p>
          Current Stacks: {runesEffects.path.zombieWard}
        </p>

        <p>
          Bonus: {runeFormulas.zombieWard.bonus} {runeFormulas.zombieWard.type}
        </p>

        <p>
          <button onClick={() => {dispatch({type:'zombie ward'})}}>Change stacks amount</button>
        </p>

          <p>
            Removing an enemy ward (excluding Zombie Wards) within 10 seconds of damaging it will summon an allied Zombie Ward in its place. Zombie ward has 1 health and lasts for 120 seconds.
          </p>
          
          <p>
          Gain <span className='stat--ad'>3 Attack Damage</span> or <span className='stat--ap'>6 Ability Power</span> for each ward takedown stacking up to 5 times.
          </p>

          <p>
          At 5 stacks gain bonus <span className='stat--ad'>10 Attack Damage</span> or <span className='stat--ap'>20 Ability Power</span>
        </p>
        </div>
      }
    ]
  }
]

// tracking the runes that are active for current champion
const [chosenRunes, setChosenRunes] = useState({
  keystone: keystones[0].id,
  path: mainRunes[0].path_Id,
  primary: [mainRunes[0].runes[0].id, mainRunes[0].runes[3].id, mainRunes[0].runes[6].id],
  secondary: ''
});

const updateKeystone = (e) => {
  dispatch({type:'reset-keystones'})
  setChosenRunes(oldRunes => ({
    ...oldRunes,
    keystone: e.target.value
  }));
};

const updateRunePath = (e) => {
  dispatch({type:'reset-path'})
  setChosenRunes(oldRunes => ({
    ...oldRunes,
    path: e.target.value
  }));
};

const updateMainRune = (e, index) => {
    dispatch({ type: 'reset-path' });
    setChosenRunes((oldRunes) => ({
      ...oldRunes,
      primary: oldRunes.primary.map((value, i) => (i === index ? e.target.value : value)),
    }));
  };

const mainRune = (index) => {
  const selectedPath = mainRunes.find((path) => path.path_Id === chosenRunes.path);
  if (selectedPath) {
    const selectedRune = selectedPath.runes.find((rune) => rune.id === chosenRunes.primary[index]);
    if (selectedRune) {
      return (
        <><h3 className='runeName'>{selectedRune.name}</h3>
      <img src={selectedRune.icon} alt={selectedRune.name} />
      {selectedRune.description}</>
      );
    }
  }
  return <p>No description available for the selected rune.</p>;
};



return (
  <div className='runeWrapper'>
    <select name="keystoneselector" id="keystone-selector" onChange={updateKeystone} value={chosenRunes.keystone}>
      <option value="" disabled>Select a keystone</option>
      {keystones.map((keystone) => (
        <option key={keystone.id} value={keystone.id}>{keystone.name}</option>
      ))}
    </select> 

    <div className='keystoneTile'>
      <h3 className='runeName'>{keystones.find(k => k.id === chosenRunes.keystone)?.name}</h3>
      <img src={keystones.find(k => k.id === chosenRunes.keystone)?.icon} alt={chosenRunes.keystone.name} />
      {keystones.find(k => k.id === chosenRunes.keystone)?.description}
    </div>

    <select name="primary-runes" id="rune-primary-selector" onChange={updateRunePath} value={chosenRunes.path}>
      <option value='' disabled>Select a path</option>
      {mainRunes.map((paths) => (
        <option key={paths.path_Id} value={paths.path_Id}>{paths.path}</option>
      ))}
    </select>

    <div className='runeTile'>
        <select name="primary-slot-1" id="rune-primary-1" value={chosenRunes.primary[0]} onChange={(e) => updateMainRune(e, 0)}>
        <option value='' disabled>Select a rune</option>
      {mainRunes
        .filter((path) => path.path_Id === chosenRunes.path)
        .flatMap((item) =>
          item.runes
            .filter((rune) => rune.slot === 0)
            .map((rune) => (
              <option value={rune.id} key={rune.id}>
                {rune.name}
              </option>
            ))
        )}
    </select>
    {mainRune(0)}
    </div>

    <div className='runeTile'>
        <select name="primary-slot-2" id="rune-primary-2" value={chosenRunes.primary[1]} onChange={(e) => updateMainRune(e, 1)}>
          <option value='' disabled>Select a rune</option>
      {mainRunes
        .filter((path) => path.path_Id === chosenRunes.path)
        .flatMap((item) =>
          item.runes
            .filter((rune) => rune.slot === 1)
            .map((rune) => (
              <option value={rune.id} key={rune.id}>
                {rune.name}
              </option>
            ))
        )}
    </select>
    {mainRune(1)}
    </div>

    <div className='runeTile'>
        <select name="primary-slot-3" id="rune-primary-3" value={chosenRunes.primary[2]} onChange={(e) => updateMainRune(e, 2)}>
          <option value='' disabled>Select a rune</option>
      {mainRunes
        .filter((path) => path.path_Id === chosenRunes.path)
        .flatMap((item) =>
          item.runes
            .filter((rune) => rune.slot === 2)
            .map((rune) => (
              <option value={rune.id} key={rune.id}>
                {rune.name}
              </option>
            ))
        )}
    </select>
    {mainRune(2)}
    </div>
  </div>
);

};



export default Runes