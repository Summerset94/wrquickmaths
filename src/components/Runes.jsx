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
  conqueror: 0,
  grasp: 0,
  aftershock: false,
  tempoType: 'ranged',
  tempo: 0,
};

const runesEffectsReducer = (state, action) => {
  switch (action.type) {
    case 'conqueror':
      return {
        ...state,
        conqueror: state.conqueror < 6 ? state.conqueror + 1 : 0,
      };

    case 'grasp':
      return {
        ...state,
        grasp: parseInt(action.payload) || 0
      };  

    case 'toggleAftershock':
      return {
        ...state,
        aftershock: !state.aftershock
      };

    case 'toggleTempoType':
      return {
        ...state,
        tempoType: state.tempoType === 'ranged' ? 'melee' : 'ranged'
      };

    case 'tempoStacks': 
      return {
        ...state,
        tempo: state.tempo < 6 ? state.tempo + 1 : 0,
      }

    case 'reset':
      return {
        ...state,
        ...initialRunesEffects
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
    base: runesEffects.tempoType === 'ranged' ? 4 : 7,
    growth: 6,
    bonus: runesEffects.tempo === 6 ? 40 : 0,
    stacks: runesEffects.tempo
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
       ((conqueror.ad.base + conqueror.ad.growth/14*(currentLevel-1))*runesEffects.conqueror) :
       ((conqueror.ap.base + conqueror.ap.growth/14*(currentLevel-1))*runesEffects.conqueror),
      stacks: runesEffects.conqueror
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
    }

  }
}, [mod, currentLevel, runesEffects])

// effect for updating constant bonuses from runes
useEffect(() => {
  const payload = {
    attack: (runeFormulas.damagetype.type === 'physical' ? runeFormulas.conqueror.bonus : 0),
    ap: (runeFormulas.damagetype.type === 'magical' ? runeFormulas.conqueror.bonus : 0),
    health: (runesEffects.grasp * 5),
    armor: (runesEffects.aftershock ? runeFormulas.aftershock.defence.armor : 0),
    magres: (runesEffects.aftershock ? runeFormulas.aftershock.defence.magres : 0),
    as: (runeFormulas.lethalTempo.as),
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

  <p>Stacks: {runesEffects.conqueror}</p>
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
            value={runesEffects.grasp}
            onChange={(e) => {dispatch({type: 'grasp', payload: e.target.value})}}
          />
        </label>            
        <ul>
          <li>Stacks: {runesEffects.grasp}</li>
          <li>Bonus health: <span className='stat--hp'>{(runesEffects.grasp * 5)}</span> </li>
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
      Bonus: {runesEffects.aftershock ? 'active' : 'unactive'};
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
      Stacks: {runesEffects.tempo}
    </p>
    <p>
      Attack Speed Bonus: {(runeFormulas.lethalTempo.as).toFixed(3)}
    </p>

     <p>
      Current bonus type: {runesEffects.tempoType}
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

// tracking the runes that are active for current champion
const [chosenRunes, setChosenRunes] = useState({
  keystone: keystones[0].id
});

const updateKeystone = (e) => {
  dispatch({type:'reset'})
  setChosenRunes(oldRunes => ({
    ...oldRunes,
    keystone: e.target.value
  }));
};

return (
  <div className='runeWrapper'>
    <select name="keystoneselector" id="rune_main" onChange={updateKeystone} value={chosenRunes.keystone}>
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
  </div>
);

};



export default Runes