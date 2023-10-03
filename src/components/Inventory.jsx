import { useState, useEffect, useMemo } from "react";
import React from 'react';
import { Tooltip } from 'react-tooltip'
import '../styles/StatColors.css'
import { useStats } from './StatsContext';


export default function Inventory({base, bonus, total, handleBonusChange, currentLevel, bonusEffects, switchHat, index}) { 

  // All this cringe to calculate target maxHP damage for Divine
  const { totalStats } = useStats();

  const attacker = totalStats[index]
  const target = totalStats[(index == 1 ? 0 : 1)];
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
      return Math.floor(target.magres - attacker.magResReduction)
    } else if (attacker.magResReduction) { 
     
      mitigatedMres = ((target.magres - attacker.magResReduction) * Math.floor(1 - attacker.magPen) - attacker.flatMagPen);
     
      return Math.floor(Math.max(mitigatedMres, 0))

    } else {
      mitigatedMres = (target.magres * Math.floor(1 - attacker.magPen) - attacker.flatMagPen)

      return Math.floor(Math.max(mitigatedMres, 0))
    }
  };

  let targetMres = postMitigationMres(target, total);
  let targetArmor = postMitigationArmor(target, total);
  let attArmor = postMitigationArmor(total, target);
  const modifier = ((1 - (100/(100 + (targetArmor)))));
  const modifierAtt = ((1 - (100/(100 + (attArmor)))))
  const modifierMres = ((1 - (100/(100 + (targetMres)))));


  useEffect(() => {
    let targetMres = postMitigationMres(target, total)
    targetArmor = postMitigationArmor(target, total)
  }, [target, currentLevel]);  

    const physical = [
    {
      name: 'Empty slot',

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
      ah: 0,
      armorReduction: 0,

      description: 
        <div className='itemDescription'>Empty slot</div>

    },

    // Physical items
    
    {
      name: 'Guardian Angel',
      icon: '../images/items/Guardian_Angel.png',

      health: 0,
      mana: 0,
      armor: 40,
      magres: 0,
      attack: 40,
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
      
      description: <div className='itemDescription'>
        <h3 className='stat--ad'>+{40} Attack Damage</h3>
        <h3 className='stat--armor'>+{40} Armor</h3>
  
        <p>
          <b>Resurrect: </b> Upon taking lethal damage, restores <abbr title="50% BASE health"><b className='stat--hp'>{Math.floor(base.health / 2)} base Health</b></abbr> {total.mana && <abbr title='30% total'> <span>and <b className='stat--mana'>{Math.floor(total.mana * 0.3)} maximum Mana</b></span> </abbr> } after 4 Seconds of Stasis. (210s. Cooldown)
        </p>
      </div>
    },
  
    {
      name: 'Bloodthirster',
      icon: '../images/items/Bloodthirster.png',

      health: 0,
      mana: 0,
      armor: 40,
      magres: 0,
      attack: 55,
      ap: 0,
      as: 0,
      moveSpeed: 0,
      flatArmPen: 0,
      flatMagPen: 0,
      armPen: 0,
      magPen: 0,
      critChance: 0.25,
      critMultiplier: 0,
      armorReduction: 0,

      
      description: <div className='itemDescription'>
        <h3 className='stat--ad'>+ {55} Attack Damage</h3>
        <h3 className='stat--critChance'>+ {Number(0.25*100)}% Critical Rate</h3>
  
        <p><b>Bloody: </b> <b className='stat--vamp'>+12% (<abbr title="Damage against 0 armor target / post mitigated for current target">{Math.floor((total.attack * 0.12))} / {Math.floor((total.attack * 0.12)* (1 - modifier))}</abbr>)  Physical Vamp</b></p>
        <p><b>Bloodsworn: </b> <b className='stat--vamp'>Physical Vamp</b> overheals you, generating a shield that absorbs <b className='stat--hp'>{(40 + 20 * (currentLevel - 1))}</b> (40 + 20/level) damage. This shield decays out of combat over 10 seconds</p>
      </div>
    },
  
    {
      name: 'Statikk Shiv',
      icon: '../images/items/Statikk_Shiv.png',

      health: 0,
      mana: 0,
      armor: 0,
      magres: 0,
      attack: 0,
      ap: 0,
      as: (base.asBase*0.35),
      moveSpeed: (0.05 * base.moveSpeed),
      flatArmPen: 0,
      flatMagPen: 0,
      armPen: 0,
      magPen: 0,
      critChance: 0.25,
      critMultiplier: 0,
      armorReduction: 0,
       
      description: <div className='itemDescription'>
        <h3 className='stat--as'>+{Number(base.asBase * 0.35).toFixed(3)} Attack Speed</h3>
        <h3 className='stat--critChance'>+ 25% Critical Rate</h3>
  
        <p>
          <b>Electric: </b> <b className='stat--moveSpeed'>+{(base.moveSpeed * 0.05).toFixed(2)} Movement Speed </b>
        </p>
          
        <p>
          <b>Energized: </b>Moving and attacking will generate an <b>Energized Attack </b>
        </p>
  
        <p>
          <b>Shiv Lightning:</b> Energized Attack gain <abbr title="50 + 5 per level"><b className='stat--ap'>{(50 + 5 * (currentLevel - 1))} Magic Damage</b></abbr>, that bounces to <b>5</b> nearby enemies. This effect's damage can <b className='stat--critChance'>crit</b> and applies this effect of <b classname='stat--ap'>Energized Attacks</b> to all enemies hit.
        </p> 
      </div>
    },
  
    {
      name: 'Blade of the Ruined King',
      icon: '../images/items/Blade_of_the_Ruined_King.png',

      health: 0,
      mana: 0,
      armor: 0,
      magres: 0,
      attack: 20,
      ap: 0,
      as: (base.asBase * 0.35),
      moveSpeed: 0,
      flatArmPen: 0,
      flatMagPen: 0,
      armPen: 0,
      magPen: 0,
      critChance: 0,
      critMultiplier: 0,
      armorReduction: 0,
      
  
      description: <div className='itemDescription'>
        <h3 className='stat--ad'>+{20} Attack Damage</h3>
        <h3 className='stat--as'>+ {Number(base.asBase * 0.35).toFixed(3)} Attack Speed</h3>
  
        <p>
          <b>Thirst:</b> <b className='stat--vamp'>+10% (<abbr title="Damage against 0 armor target / post mitigated for current target">{Math.floor((total.attack * 0.1))} / {Math.floor((total.attack * 0.1)* (1 - modifier))}</abbr>)  Physical Vamp</b>
        </p>
  
        <p>
          <b>Ruined Strikes:</b> Attacks deal <span className='stats--ad'>bonus physical damage</span> equal to the <span className='stats--ad'>6%</span>( <span>9%</span> for Melee) on-hit. Min damage: 15. Max damage vs monsters: 90
        </p>
  
        <p>
          <b>Drain:</b> Hitting a champion with 3 consecutive attacks or ablilties deals <abbr title="30 + 5 per level"> <span className='stats-ap'>{30 + 5 * (currentLevel - 1)} magic damage</span> </abbr> and steals 25% of their Move Speed for 2 Seconds (60s Cooldown).
        </p>
  
      </div>
    },
  
    {
      name: 'Rapid Firecannon',
      icon: '../images/items/Rapid_Firecannon.png',

      health: 0,
      mana: 0,
      armor: 0,
      magres: 0,
      attack: 0,
      ap: 0,
      as: (base.asBase * 0.35),
      moveSpeed: (0.05 * base.moveSpeed),
      flatArmPen: 0,
      flatMagPen: 0,
      armPen: 0,
      magPen: 0,
      critChance: 0.25,
      critMultiplier: 0,
      armorReduction: 0,

     
      description:
        <div className='itemDescription'>
          <h3 className='stat--as'>+35% ({(base.asBase * 0.35).toFixed(3)}) Attack Speed</h3>
          <h3 className='stat--critChance'>+{0.25*100}% Critical Rate</h3>
  
          <p>
            <b>Hunter's Swiftness:</b> <span className='stat--moveSpeed'>+{(0.05 * base.moveSpeed)} Move Speed.</span>
          </p>
  
          <p>
            <b>Energized:</b> moving and attacking will generate an <span className='stat--ad'>Energized Attack</span>. Energized Attacks generate 25% faster. gain <abbr title="50 + 5 per Level"> <span className='stat--ap'>{(50 + 5 * (currentLevel - 1))} bonus magic damage</span></abbr>  and gain 125 attack range. Melee attacks gets 50 bonus range.
          </p>
        </div>
    },
  
    {
      name: 'Runaan\'s Hurricane',
      icon: '../images/items/Runaan\'s_Hurricane.png',

      health: 0,
      mana: 0,
      armor: 0,
      magres: 0,
      attack: 0,
      ap: 0,
      as: (base.asBase * 0.45),
      moveSpeed: 0,
      flatArmPen: 0,
      flatMagPen: 0,
      armPen: 0,
      magPen: 0,
      critChance: 0.25,
      critMultiplier: 0,
      armorReduction: 0,
      
      description:
        <div className='itemDescription'>
          <h3 className='stat--as'>+45% ({(base.asBase * 0.45).toFixed(3)}) Attack Speed</h3>
          <h3 className='stat--critChance'>+ {0.25*100}% Critical Rate</h3>
  
          <p>Attacks strike 2 additional nearby enemies. Each attack  dealing <b className='stat--ad'>{Math.floor(total.attack*0.55)}</b>. These attacks CAN critically hit and trigger on-hit effects.</p>        
        </div>
    },
  
    {
      name: 'Youmuu\'s Ghostblade',
      icon: '../images/items/Youmuus.png',

      health: 0,
      mana: 0,
      armor: 0,
      magres: 0,
      attack: 55,
      ap: 0,
      as: 0,
      moveSpeed: 0,
      flatArmPen: 15,
      flatMagPen: 0,
      armPen: 0,
      magPen: 0,
      critChance: 0,
      critMultiplier: 0,      
      ah: 15,
      armorReduction: 0,    
  
      description:
        <div className='itemDescription'>
          <h3 className='stat--ad'>+{55} Attack Damage</h3>
          <h3>+{15} Ability Haste</h3>
          <h3>+{15} Lethality/flat armor penetration</h3>
  
          <p>Moving builds up <b>Momentum</b> stacks, granting up to 40 movement speed at 100 stacks. Stacks decay when movement impaired. </p>
          <p>Attacking with max <b>Momentum</b> consumes all stacks and grants <b className='stat--as'>25% ({Number(base.asBase*0.25).toFixed(3)}) Attack Speed</b> for 4 seconds.</p>
        </div>
    },
  
    {
      name: 'Duskblade of Draktharr',
      icon: '../images/items/Duskblade.png',

      health: 0,
      mana: 0,
      armor: 0,
      magres: 0,
      attack: 55,
      ap: 0,
      as: 0,
      moveSpeed: 0,
      flatArmPen: 15,
      flatMagPen: 0,
      armPen: 0,
      magPen: 0,
      critChance: 0,
      critMultiplier: 0,      
      ah: 10,
      armorReduction: 0,
      
  
      description:
        <div className='itemDescription'>
          <h3 className='stat--ad'>+{55} Attack Damage</h3>
          <h3>+{10} Ability Haste</h3>
          <h3>+{15} Lethality/flat armor penetration</h3>
  
          <p><b>Nightstalker:</b> The first attack against a champion deals <abbr title="20 + 7.5 per level"><b className='stat--ad'>{Math.floor(20 + 7.5*(currentLevel - 1))} physical damage</b></abbr> and slows target by 99% for 0.25s (10s cooldown). Champions takedown refresh cooldown duration</p>
        </div>
    },
  
    {
      name: 'Sterak\'s Gage',
      icon: '../images/items/Steraks.png',

      health: 400,
      mana: 0,
      armor: 0,
      magres: 0,
      attack: (base.attack*0.5),
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
      item_shield: (bonus.health * 0.75),
      
      description:
        <div className='itemDescription'>
          <h3 className='stat--hp'>+{400} Max Health</h3>
          <h3>Heavy Handed: <abbr title="(50% of BASE attack damage)"><span className='stat--ad'>+{base.attack*0.5}Attack Damage</span></abbr> as BONUS attack damage</h3>
  
          <p><b>Lifeline:</b> Damage that puts you under <abbr title="(35% MAX health)"><span className='stat--hp'>{Math.floor(total.health*0.35)}</span></abbr> triggers a <abbr title="(75% of BONUS health)">{bonus.health * 0.75}<span className='stat--hp'></span></abbr> that decays Over 3 seconds (90 sec Cooldown)</p>
  
          <p><b>Sterak's fury:</b> Triggering Lifeline also increases your size and grants <span className='stat--ap'>30% Tenacity</span> for 8 seconds.</p>
        </div>
    },
  
    {
      name: 'Infinity Edge',
      icon: '../images/Infinity_Edge.png',

      health: 0,
      mana: 0,
      armor: 0,
      magres: 0,
      attack: 55,
      ap: 0,
      as: 0,
      moveSpeed: 0,
      flatArmPen: 0,
      flatMagPen: 0,
      armPen: 0,
      magPen: 0,
      critChance: 0.25,
      critMultiplier: 0.25,
      armorReduction: 0,
      ah: 0,      
  
      description:
        <div className='itemDescription'>
          <h3 className='stat--ad'>+{55} Attack Damage</h3>
          <h3 className='stat--critChance'>+{0.25*100}% Critical Rate</h3>
  
          <p><b>Infinity:</b> Critical Strikes deal 205% damage instead of 175%</p>
        </div>
    },

    {
      name: 'Mortal Reminder',
      icon: '../images/Mortal.png', 

      health: 0,
      mana: 0,
      armor: 0,
      magres: 0,
      attack: 45,
      ap: 0,
      as: 0,
      moveSpeed: 0,
      flatArmPen: 0,
      flatMagPen: 0,
      armPen: ((15 + Number(currentLevel))/100),
      magPen: 0,
      critChance: 0,
      critMultiplier: 0,
      armorReduction: 0,

      description: 
        <div className='itemDescription'>
          <h3 className='stat--ad'>+{45} Attack Damage</h3>
          <h3>Last Whisper: <abbr title="15 + your current level">+{(15 + Number(currentLevel))}%</abbr> Armor Penetration</h3>

          <p><b>Sepsis:</b> Dealing <span className='stat--ad'>Physical Damage</span> to enemy champions apply 40% <abbr title="Reduces healing and regeneration">Grievous wounds</abbr> to target for 3 seconds. 60% for targets under <span className='stat--hp'>50% Health</span> </p>      
        </div>
    },

    {
      name: 'Manamune',
      icon: '../images/items/Manamune.png',

      health: 0,
      armor: 0,
      magres: 0,
      attack: 25 + Math.floor(total.mana * 0.015),
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
      mana: 300,
      ah: 20,

      description: 
        <div className="itemDescription">
          <h3 className="stat--ad">+{25} Attack Damage</h3>
          <h3 classname='stat--mana'>+{300} Max mana</h3>
          <h3>+{20} Ability Haste</h3>

          <p><b>Awe:</b> grants <abbr title="1.5% of maximum mana"><span className="stat--mana">{Math.floor(total.mana * 0.015)}</span></abbr> Attacks damage, refunds <span className='stat--mana'>15%</span> of all Mana spent</p>


          <p><b>Mana Charge:</b> Increase max Mana by <span className='stat--mana'>10</span> every attack or when Mana is spent. Triggers up to 3 times every 12 seconds Caps at <span className='stat--mana'>700</span> bonus Mana and transforms into <b>Manamune</b> </p>
        </div>


    },

    {
      name: 'Muramana',
      icon: '../images/items/Muramana.png',

      health: 0,      
      armor: 0,
      magres: 0,
      attack: 25 + Math.floor(total.mana * 0.015),
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
      mana: 1000,
      ah: 20,

      description: 
        <div className="itemDescription">
          <h3 className="stat--ad">+{25} Attack Damage</h3>
          <h3 classname='stat--mana'>+{1000} Max mana</h3>
          <h3>+{20} Ability Haste</h3>

          <p><b>Awe:</b> grants <abbr title="1.5% of maximum mana"><span className="stat--mana">{Math.floor(total.mana * 0.015)}</span></abbr> Attacks damage, refunds <span className='stat--mana'>15%</span> of all Mana spent</p>


          <p><b>Shock:</b> When an <b>attack</b> hits an enemy champion drains <abbr title="(2.5%) provided numbers are for 100% total pool"><span>{Math.floor(total.mana * 0.025)}</span></abbr> and deals it as <span className='stat--ad'>Physical damage</span>.</p>
          <p><b>Abilities</b> drains <abbr title="4%"><span className="stat--mana">{Math.floor(total.mana * 0.04)}</span></abbr> <b>current</b> mana and deals additional <abbr title="4% of mana drained + 6% of your Attack Damage"><span className="stat--ad">{Math.floor((total.mana * 0.04) + (total.attack * 0.06))} Physical damage</span></abbr>. Only triggers when remaining mana is above <abbr title="20%"><span className="stat--mana">{Math.floor(total.mana * 0.2)}</span></abbr>. Single attack or ability procs only once for one champion.</p>
        </div>
    },

    {
      name: 'Nashor\'s Tooth',
      icon: '../images/items/Nashors.png',

      

      health: 0,
      mana: 0,
      armor: 0,
      magres: 0,
      attack: (bonus.attack > bonus.ap || bonus.ap == 0 ? 30 : 0),
      ap: (bonus.ap > bonus.attack ? 60 : 0 ),
      as: Number(base.asBase * 0.45),
      moveSpeed: 0,
      flatArmPen: 0,
      flatMagPen: 0,
      armPen: 0,
      magPen: 0,
      critChance: 0,
      critMultiplier: 0,
      ah: 20,
      armorReduction: 0,

      description:
        <div className="itemDescription">
          <h3 className='stat--as'>+ 45% ({(base.asBase * 0.45).toFixed(3)}) Attack Speed</h3>
          <h3>+20 Ability Haste</h3>

          <p><b>Magic Fang:</b> Gain <span className="stat--ad">30 Attack Damage</span> or <span className='stat--ap'>60 Ability Power</span> <abbr title="Based of what BONUS stat you have more. Calculated whenever you select this item from the list"><b>(Adaptive)</b></abbr>.</p>

          <p><b>Gnaw:</b> When basic attack hits enemy champions, it will cause <abbr title="15 + 25% BONUS attack + 25% bonus ap"><span className='stat--ap'>{15 + (bonus.attack * 0.25) + (bonus.ap * 0.25)} bonus Magic damage</span></abbr></p>
        </div>
    },

    {
      name: 'Black Cleaver(stacked)',
      icon: '../images/items/BC.png',
      
      
      health: 350,
      mana: 0,
      armor: 0,
      magres: 0,
      attack: 40,
      ap: 0,
      as: 0,
      moveSpeed: 0,
      flatArmPen: 0,
      flatMagPen: 0,
      armPen: 0,
      magPen: 0,
      critChance: 0,
      critMultiplier: 0,
      ah: 20,
      armorReduction:0.24,    

      description: 
        <div className='itemDescription'>
          <h3 className='stat--hp'>+{350} Max Health</h3>
          <h3 classname='stat--ad'>+{40} Attack Damage</h3>
          <h3>+{20} Ability Haste</h3>          

          <p><b>Sunder:</b>dealing <span className="stat--ad">Physical Damage</span> to a champion reduces their <span className="stat--ad">Armor</span> by <b>4%</b>, stacking 6 times up to <b>24%</b></p>
        </div>

    },

    {
      name: 'Trinity Force',

      health: 250,
      mana: 0,
      armor: 0,
      magres: 0,
      attack: 25,
      ap: 0,
      as: (base.asBase * 0.3),
      moveSpeed: (base.moveSpeed * 0.05),
      flatArmPen: 0,
      flatMagPen: 0,
      armPen: 0,
      magPen: 0,
      critChance: 0,
      critMultiplier: 0,
      ah: 30,
      armorReduction:0,

      description: 
        <div className='itemDescription'>
          <h3 className='stat--hp'>+{250} Max Health</h3>
          <h3 className='stat--ad'>+{25} Attack Damage</h3>
          <h3 className='stat--as'>+30% ({(base.asBase * 0.3)}) Attack Speed</h3>
          <h3>+{25} Ability Haste</h3>

          <p><b>Fervor: </b>+{(base.moveSpeed * 0.05).toFixed(2)} Move Speed</p>
          <p><b>Spellblade:</b>After casting an ability next basic attack deals <abbr title="200% BASE, numbers are pre-post mitigation"><span className='stat--ad'>+{Math.floor(base.attack * 2)} /  {Math.floor((base.attack * 2) * (1- modifier))} Physical Damage</span></abbr> (1.5s Cooldown)</p>
          <p><b>Rage:</b> Attacks grant <b>20 Move Speed</b> and kills grant <b>60 Move Speed</b> for 2 seconds. Bonuses do not stack. Effect halved for ranged heroes</p>
        </div>,
    },

    {
      name: 'Maw of Malmortius',

      health: 0,
      mana: 0,
      armor: 0,
      magres: 45,
      attack: 45,
      ap: 0,
      as: 0,
      moveSpeed: 0,
      flatArmPen: 0,
      flatMagPen: 0,
      armPen: 0,
      magPen: 0,
      critChance: 0,
      critMultiplier: 0,
      ah: 10,
      armorReduction:0,

      description:
      <div className='itemDescription'>
        <h3 className="stat--ad">+{45} Attack Damage</h3>
        <h3 className="stat--magres">+{45} Magic Resistance</h3>
        <h3>+10 Ability Haste</h3>

        <p><b>Lifeline:</b> Damage that puts you under <abbr title="35% max hp"><span className="stat--hp">{Math.floor(total.health * 0.35)} Health</span></abbr> grants a Shield that absorbs <abbr title="no modifier"><span className='stat--hp'>350</span></abbr><span className="stat--magres"> Magic Damage</span> for 5 Seconds (90s Cooldown)</p>
        <p><b>Lifegrip:</b> Triggering Lifeline grants you <span className='stat--ad'>30 Attack Damage</span> and <span className="stat--vamp">10 % Omnivamp (Total/Current {Math.floor((total.attack * 0.1))} / {Math.floor((total.attack * 0.1)* (1 - modifier))}; <abbr title="For now it does not calculate your ability damage. placeholder with formula same for AA, just for AP"><span className="stat--ap">{Math.floor((total.ap * 0.1))} / {Math.floor((total.ap * 0.1)* (1 - modifierMres))}</span></abbr> )</span> until out of combat</p>

      </div>
    },

    {
      name: 'Death\'s Dance',

      health: 0,
      mana: 0,
      armor: 40,
      magres: 0,
      attack: 35,
      ap: 0,
      as: 0,
      moveSpeed: 0,
      flatArmPen: 0,
      flatMagPen: 0,
      armPen: 0,
      magPen: 0,
      critChance: 0,
      critMultiplier: 0,
      ah: 15,
      armorReduction:0,

      description:
        <div className="itemDescription">
          <h3 className="stat--ad">+{35} Attack Damage</h3>
          <h3 className="stat--armor">+{40} Armor</h3>
          <h3>+{15} Ability Haste</h3>

          <p><b>Cauterize:</b> <span className='stat--ad'>35% Physical Damage </span> received <span className="stat--ad">(15% for ranged champions)</span> is dealt to you over 3 seconds as <b>True Damage</b> instead</p>
          <p><b>Dance:</b> Champion's takedowns cleanse Cauterize's remaining damage and heal you for <abbr title="12% of Max health"><span className="stat--hp">{Math.floor(total.health * 0.12)}</span></abbr> over 2 seconds</p>
        </div>
    },

    {
      name: 'Phantom Dancer',

      health: 0,
      mana: 0,
      armor: 0,
      magres: 0,
      attack: 25,
      ap: 0,
      as: (base.asBase * 0.3),
      moveSpeed: (base.moveSpeed * 0.05),
      flatArmPen: 0,
      flatMagPen: 0,
      armPen: 0,
      magPen: 0,
      critChance: 0.25,
      critMultiplier: 0,
      ah: 0,
      armorReduction:0,

      description:
        <div className="itemDescription">
          <h3 className="stat--ad">+{25} Attack Damage</h3>
          <h3 className="stat--critChance">+{25}% Critical Rate</h3>
          <h3 className='stat--as'>+{30}% ({(base.asBase * 0.3).toFixed(3)}) Attack Speed</h3>

          <p><b>Shadowwalk:</b>+5% ({Math.floor(base.moveSpeed * 0.05)}) Movement Speed</p>

          <p><b>Spectral Waltz</b>: gain +7% ({Math.floor(base.moveSpeed * 0.07)}) Movement Speed when you attack for 3 seconds. After attacking 4 times gain 25% ({(base.asBase * 0.25).toFixed(3)}) Attack Speed for the same duration</p>
        </div>
    },

    {
      name: 'Phantom Dancer (Stacked)',

      health: 0,
      mana: 0,
      armor: 0,
      magres: 0,
      attack: 25,
      ap: 0,
      as: (base.asBase * 0.3) + (base.asBase * 0.25),
      moveSpeed: (base.moveSpeed * 0.05),
      flatArmPen: 0,
      flatMagPen: 0,
      armPen: 0,
      magPen: 0,
      critChance: 0.25,
      critMultiplier: 0,
      ah: 0,
      armorReduction:0,

      description:
        <div className="itemDescription">
          <h3 className="stat--ad">+{25} Attack Damage</h3>
          <h3 className="stat--critChance">+{25}% Critical Rate</h3>
          <h3 className='stat--as'>+{30}%, +25% ({((base.asBase * 0.3)+ (base.asBase * 0.25)).toFixed(3)}) Attack Speed</h3>

          <p><b>Shadowwalk:</b>+5% ({Math.floor(base.moveSpeed * 0.05)}) Movement Speed</p>

          <p><b>Spectral Waltz</b>: gain +7% ({Math.floor(base.moveSpeed * 0.07)}) Movement Speed when you attack for 3 seconds. After attacking 4 times gain 25% ({(base.asBase * 0.25).toFixed(3)}) Attack Speed for the same duration</p>
        </div>
    },

    {
      name: 'Wit\'s End',

      health: 0,
      mana: 0,
      armor: 0,
      magres: 50,
      attack: 0,
      ap: 0,
      as: (base.asBase * 0.45),
      moveSpeed: 0,
      flatArmPen: 0,
      flatMagPen: 0,
      armPen: 0,
      magPen: 0,
      critChance: 0,
      critMultiplier: 0,
      ah: 0,
      armorReduction:0,

      description:
        <div className="itemDescription">
          <h3 className="stat--as">+45 %({(base.asBase * 0.45).toFixed(3)}) Attack Speed</h3>
          <h3 className='stat--magres'>+{50} Magic Resistance</h3>

          <p><b>At Wit's End:</b> basic attacks deal <span class='stat--ap'><abbr title="(15 + 65 / 14 * (level - 1))">{Math.ceil(15 + 65 / 14 * (currentLevel - 1))}</abbr> bonus magic damage</span>. While below <span className='stat--hp'><abbr title="50% max hp">{total.health * 0.5} health</abbr></span> dealing damage to enemy champions heals you for (100% for Melee/33% for ranged) damage dealt</p>
        </div>
    },
  
    {
      name: 'Essence Reaver',
      health: 0,
      mana: 0,
      armor: 0,
      magres: 0,
      attack: 40,
      ap: 0,
      as: 0,
      moveSpeed: 0,
      flatArmPen: 0,
      flatMagPen: 0,
      armPen: 0,
      magPen: 0,
      critChance: 0.25,
      critMultiplier: 0,
      ah: 20,
      armorReduction:0,

      description:
        <div className="itemDescription">
          <h3 className="stat--ad">+{40} Attack Damage</h3>
          <h3 className='stat--as'>+{25}% Critical Rate</h3>
          <h3>+{20} Ability Haste</h3>

          <p>After Attacking a champion your next ability or empowered attack will deal <abbr title="20 + 1 per 10% of critchance">{20 + 1 * Math.floor(total.critChance * 10)}%</abbr> more damage. 4s Cooldown. Cooldown reduced for 1s for each basic attack against a champion</p>
          <p>attacks restore <span className='stat--mana'>3% missing mana</span> on hit</p>
        </div>
    },

    {
      name: 'Stormrazor',
      health: 0,
      mana: 0,
      armor: 0,
      magres: 0,
      attack: 40,
      ap: 0,
      as: (base.asBase * 0.2),
      moveSpeed: 0,
      flatArmPen: 0,
      flatMagPen: 0,
      armPen: 0,
      magPen: 0,
      critChance: 0.25,
      critMultiplier: 0,
      ah: 0,
      armorReduction:0,

      description:
        <div className="itemDescription">
          <h3 className="stat--ad">+{40} Attack Damage</h3>
          <h3 className="stat--critChance">+{25}% Critical Rate</h3>
          <h3 className="stat--as">+20% ({(base.asBase * 0.2).toFixed(3)}) Attack Speed</h3>

          <p><b>Energized:</b> Moving and attacking generate Energized attack. Energized attack deals <abbr title="50 + 5 per level"><span className='stat--ap'>{50 + 5 * (currentLevel - 1)} bonus Magic Damage</span></abbr> and slow by 75% for 0.5 seconds</p>
        </div>
    }, 
    
    {
      name: 'Serylda\'s Grudge',

      health: 0,
      mana: 0,
      armor: 0,
      magres: 0,
      attack: 40,
      ap: 0,
      as: 0,
      moveSpeed: 0,
      flatArmPen: 0,
      flatMagPen: 0,
      armPen: ((15 + Number(currentLevel))/100),
      magPen: 0,
      critChance: 0,
      critMultiplier: 0,
      ah: 15,
      armorReduction: 0,

      description: 
        <div className='itemDescription'>
          <h3 className='stat--ad'>+{40} Attack Damage</h3>
          <h3>+{15} Ability Haste</h3>
          <h3>Last Whisper: <abbr title="15 + your current level"> +{(15 + Number(currentLevel))}%</abbr> Armor Penetration</h3>

          <p><b>Icy:</b> Damaging and active abilities and empowered attacks slow enemies by 30% for 1 second</p>
        </div>
    },

    {
      name: 'Solari Chargeblade',

      health: 0,
      mana: 0,
      armor: 0,
      magres: 0,
      attack: 0,
      ap: 0,
      as: (base.asBase * 0.4),
      moveSpeed: 0,
      flatArmPen: 0,
      flatMagPen: 0,
      armPen: 0,
      magPen: 0,
      critChance: 0.25,
      critMultiplier: 0,
      ah: 20,
      armorReduction: 0,

      description: 
        <div className='itemDescription'>
          <h3 className='stat--critChance'>+{25}% Critical Rate</h3>
          <h3 className="stat--as">+{40}% ({(base.asBase * 0.4).toFixed(3)}) Attack Speed</h3>
          <h3>+20 Ability Haste</h3>

          <p><b>Sunburst:</b> Using an ability gathers you a stack of <span className='stat--magres'>Radiance</span> for 10 seconds, up to 3 Charges. Attacks that hit enemies use the charge to deal <abbr title="35 + 3 per level"><span className='stat--ap'>{35 + 3 * currentLevel} bonus magic damage on hit</span></abbr>. This bonus can <span className="stat--vamp">Critically strike</span>. Each unique ability can generate 1 charge every 2 seconds</p>
        </div>
    },

    {
      name: 'Navori Quickblades',

      health: 0,
      mana: 0,
      armor: 0,
      magres: 0,
      attack: 45,
      ap: 0,
      as: 0,
      moveSpeed: 0,
      flatArmPen: 0,
      flatMagPen: 0,
      armPen: 0,
      magPen: 0,
      critChance: 0.25,
      critMultiplier: 0,
      ah: 15,
      armorReduction: 0,

      description: 
        <div className='itemDescription'>
          <h3 className="stat--ad">+{45} Attack Damage</h3>
          <h3 className='stat--critChance'>+{25}% Critical Rate</h3>
          <h3>+{15} Ability Haste</h3>

          <p><b>Deft Strike:</b> <span className="stat--vamp">Critical Attakcs</span> reduce your non-ultimate ability cooldowns by 20% of their remaining cooldown</p>
        </div>
    },

    {
      name: 'Edge of Night',

      health: 250,
      mana: 0,
      armor: 0,
      magres: 0,
      attack: 50,
      ap: 0,
      as: 0,
      moveSpeed: 0,
      flatArmPen: 8,
      flatMagPen: 0,
      armPen: 0,
      magPen: 0,
      critChance: 0,
      critMultiplier: 0,
      ah: 0,
      armorReduction: 0,

      description: 
        <div className='itemDescription'>
          <h3 className="stat--hp">+{250} Max Health</h3>
          <h3 className='stat--ad'>+{50} Attack Damage</h3>

          <p><b>Gouge: +{8} Armor Penetration</b></p>
          <p><b>Annul:</b> Grants a spell shield that blocks one hostile ability. <b>35 seconds</b> cooldown</p>
        </div>
    },
    
    {
      name: 'Hullbreaker',

      health: 300,
      mana: 0,
      armor: 0,
      magres: 0,
      attack: 55,
      ap: 0,
      as: 0,
      moveSpeed: 0,
      flatArmPen: 0,
      flatMagPen: 0,
      armPen: 0,
      magPen: 0,
      critChance: 0,
      critMultiplier: 0,
      ah: 0,
      armorReduction: 0,

      description: 
        <div className='itemDescription'>
          <h3 className='stat--hp'>+{300} Max Health</h3>
          <h3 className='stat--ad'>+{55} Attack Damage</h3>

          <p><b>Boarding Party:</b> When no allied champions are within 1200 units you get:</p>
          <p><b><u>for Melee:</u> </b> <span className="stat--armor"><abbr title="4 + 46 / 14 * (level - 1)">{Math.floor(4 + 46 / 14 * (currentLevel - 1))} Armor</abbr></span>, <span className="stat--magres"><abbr title="4 + 16 / 14 * (level - 1)">{Math.floor(4 + 16 / 14 * (currentLevel - 1))} Magic Resistance</abbr></span></p>
          <p><b><u>for Ranged:</u> </b> <span className="stat--armor"><abbr title="2 + 23 / 14 * (level - 1)">{Math.floor(2 + 23 / 14 * (currentLevel - 1))} Armor</abbr></span>, <span className="stat--magres"><abbr title="2 + 8 / 14 * (level - 1)">{Math.floor(2 + 8 / 14 * (currentLevel - 1))} Magic Resistance</abbr></span></p>
          <p>And deal <b>20%</b> additional Damage to Structures</p>

          <p>Nearby Large Minions gain:</p>
          <p><b>(for Melee) </b><span className='stat--ad'>{Math.floor(40 + 130 / 14 * (currentLevel - 1))} Armor</span> and <span class='stat--magres'>{Math.floor(20 + 65 / 14 * (currentLevel - 1))} Magic Resistance</span></p>
          <p><b>(for Ranged) </b><span className='stat--ad'>{Math.floor(20 + 60 / 14 * (currentLevel - 1))} Armor</span> and <span class='stat--magres'>{Math.floor(10 + 30 / 14 * (currentLevel - 1))} Magic Resistance</span></p>
          <p>Also 10% bonus size and deal 200% bonus damage to turrets</p>
        </div>
    },

    {
      name: 'Hullbreaker (Stacked Melee)',

      health: 300,
      mana: 0,
      armor: (Math.floor(4 + 46 / 14 * (currentLevel - 1))),
      magres: (Math.floor(4 + 16 / 14 * (currentLevel - 1))),
      attack: 55,
      ap: 0,
      as: 0,
      moveSpeed: 0,
      flatArmPen: 0,
      flatMagPen: 0,
      armPen: 0,
      magPen: 0,
      critChance: 0,
      critMultiplier: 0,
      ah: 0,
      armorReduction: 0,

      description: 
        <div className='itemDescription'>
          <h3 className='stat--hp'>+{300} Max Health</h3>
          <h3 className='stat--ad'>+{55} Attack Damage</h3>

          <p><b>Boarding Party:</b> When no allied champions are within 1200 units you get:</p>
          <p><b><u>for Melee:</u> </b> <span className="stat--armor"><abbr title="4 + 46 / 14 * (level - 1)">{Math.floor(4 + 46 / 14 * (currentLevel - 1))} Armor</abbr></span>, <span className="stat--magres"><abbr title="4 + 16 / 14 * (level - 1)">{Math.floor(4 + 16 / 14 * (currentLevel - 1))} Magic Resistance</abbr></span></p>
          <p><b><u>for Ranged:</u> </b> <span className="stat--armor"><abbr title="2 + 23 / 14 * (level - 1)">{Math.floor(2 + 23 / 14 * (currentLevel - 1))} Armor</abbr></span>, <span className="stat--magres"><abbr title="2 + 8 / 14 * (level - 1)">{Math.floor(2 + 8 / 14 * (currentLevel - 1))} Magic Resistance</abbr></span></p>
          <p>And deal <b>20%</b> additional Damage to Structures</p>

          <p>Nearby Large Minions gain:</p>
          <p><b>(for Melee) </b><span className='stat--ad'>{Math.floor(40 + 130 / 14 * (currentLevel - 1))} Armor</span> and <span class='stat--magres'>{Math.floor(20 + 65 / 14 * (currentLevel - 1))} Magic Resistance</span></p>
          <p><b>(for Ranged) </b><span className='stat--ad'>{Math.floor(20 + 60 / 14 * (currentLevel - 1))} Armor</span> and <span class='stat--magres'>{Math.floor(10 + 30 / 14 * (currentLevel - 1))} Magic Resistance</span></p>
          <p>Also 10% bonus size and deal 200% bonus damage to turrets</p>
        </div>
    },

    {
      name: 'Hullbreaker (Stacked Ranged)',

      health: 300,
      mana: 0,
      armor: Math.floor(2 + 23 / 14 * (currentLevel - 1)),
      magres: Math.floor(2 + 8 / 14 * (currentLevel - 1)),
      attack: 55,
      ap: 0,
      as: 0,
      moveSpeed: 0,
      flatArmPen: 0,
      flatMagPen: 0,
      armPen: 0,
      magPen: 0,
      critChance: 0,
      critMultiplier: 0,
      ah: 0,
      armorReduction: 0,

      description: 
        <div className='itemDescription'>
          <h3 className='stat--hp'>+{300} Max Health</h3>
          <h3 className='stat--ad'>+{55} Attack Damage</h3>

          <p><b>Boarding Party:</b> When no allied champions are within 1200 units you get:</p>
          <p><b><u>for Melee:</u> </b> <span className="stat--armor"><abbr title="4 + 46 / 14 * (level - 1)">{Math.floor(4 + 46 / 14 * (currentLevel - 1))} Armor</abbr></span>, <span className="stat--magres"><abbr title="4 + 16 / 14 * (level - 1)">{Math.floor(4 + 16 / 14 * (currentLevel - 1))} Magic Resistance</abbr></span></p>
          <p><b><u>for Ranged:</u> </b> <span className="stat--armor"><abbr title="2 + 23 / 14 * (level - 1)">{Math.floor(2 + 23 / 14 * (currentLevel - 1))} Armor</abbr></span>, <span className="stat--magres"><abbr title="2 + 8 / 14 * (level - 1)">{Math.floor(2 + 8 / 14 * (currentLevel - 1))} Magic Resistance</abbr></span></p>
          <p>And deal <b>20%</b> additional Damage to Structures</p>

          <p>Nearby Large Minions gain:</p>
          <p><b>(for Melee) </b><span className='stat--ad'>{Math.floor(40 + 130 / 14 * (currentLevel - 1))} Armor</span> and <span class='stat--magres'>{Math.floor(20 + 65 / 14 * (currentLevel - 1))} Magic Resistance</span></p>
          <p><b>(for Ranged) </b><span className='stat--ad'>{Math.floor(20 + 60 / 14 * (currentLevel - 1))} Armor</span> and <span class='stat--magres'>{Math.floor(10 + 30 / 14 * (currentLevel - 1))} Magic Resistance</span></p>
          <p>Also 10% bonus size and deal 200% bonus damage to turrets</p>
        </div>
    },

    {
      name: 'Divine Sunderer',

      health: 400,
      mana: 0,
      armor: 0,
      magres: 0,
      attack: 25,
      ap: 0,
      as: 0,
      moveSpeed: 0,
      flatArmPen: 0,
      flatMagPen: 0,
      armPen: 0,
      magPen: 0,
      critChance: 0,
      critMultiplier: 0,
      ah: 25,
      armorReduction: 0,

      description: 
        <div className='itemDescription'>
          <h3 className="stat--hp">+{400} Max Health</h3>
          <h3 className='stat--ad'>+{25} Attack Damage</h3>
          <h3>+25 Ability Haste</h3>

          <p><b>Spellblade:</b>After using an ability your next attack within 10 seconds will deal <abbr title="10% max HP"><span className="stat--hp">{Math.floor((target.health * 0.1)* (1 - modifier))}</span></abbr> as bonus <span className="stat--ad">Physical damage</span> ( <abbr title="7% max hp"><span className="stat--hp">{Math.floor((target.health * 0.07)* (1 - modifier))}</span></abbr> if attack is ranged)</p>
          <p>Heal for <abbr title="7%  target max hp"><span className="stat--hp">{Math.floor((target.health * 0.07)* (1 - modifier))}</span></abbr> ( <abbr title="3% max hp"><span className="stat--hp">{Math.floor((target.health * 0.03)* (1 - modifier))}</span></abbr> If attack is ranged ).</p>
          <p>1.5s Cooldown. Damage is reduced against structures</p>
        </div>
    },

    {
      name: 'Serpent\'s Fang',

      health: 0,
      mana: 0,
      armor: 0,
      magres: 0,
      attack: 50,
      ap: 0,
      as: 0,
      moveSpeed: 0,
      flatArmPen: 15,
      flatMagPen: 0,
      armPen: 0,
      magPen: 0,
      critChance: 0,
      critMultiplier: 0,
      ah: 10,
      armorReduction: 0,

      description: 
        <div className='itemDescription'>
          <h3 className='stat--ad'>+{55} Attack Damage</h3>
          <h3 >+{10} Ability Haste</h3>
          <h3>+{15} Armor Penetration</h3>

          <p><b>Shield Reaver:</b> Dealing Damage to an enemy champion reduce any shield they gain for 50% (30% if Ranged attack). When damaging enemies not affected by Shield Reaver, reduce all shields on them by 50% (35% for Ranged champions). Shiled reduction not applicable to magic-only shields</p>
        </div>

    },

    {
      name: 'Lord Dominik\'s Regards',

      health: 0,
      mana: 0,
      armor: 0,
      magres: 0,
      attack: 35,
      ap: 0,
      as: 0,
      moveSpeed: 0,
      flatArmPen: 0,
      flatMagPen: 0,
      armPen: ((15 + Number(currentLevel))/100),
      magPen: 0,
      critChance: 0.25,
      critMultiplier: 0,
      ah: 0,
      armorReduction: 0,

      description: 
        <div className='itemDescription'>
          <h3 className='stat--ad'>+{35} Attack Damage</h3>
          <h3 className='stat--critChance'>+{25}% Critical Rate</h3>
          <h3>Last Whisper: <abbr title="15 + your current level">+{(15 + Number(currentLevel))}%</abbr> Armor Penetration</h3>

          <p><b>Rapid Shot:</b> If not engaged in champion combat, your next attack on a chmpion gains 80% ({(base.asBase * 0.8).toFixed(3)}) Attack Speed.</p>
        </div>
    },

    {
      name: 'Immmortal Shieldbow',

      health: 0,
      mana: 0,
      armor: 0,
      magres: 0,
      attack: 40,
      ap: 0,
      as: (base.asBase * 0.15),
      moveSpeed: 0,
      flatArmPen: 0,
      flatMagPen: 0,
      armPen: 0,
      magPen: 0,
      critChance: 0.25,
      critMultiplier: 0,
      ah: 0,
      armorReduction: 0,

      description: 
        <div className='itemDescription'>
          <h3 className="stat--ad">+{40} Attack Damage</h3>
          <h3 className='stat--critChance'>+{25}% Critical Rate</h3>
          <h3 classname='stat--as'>+15% ({(base.asBase * 0.15).toFixed(3)}) Attack Speed</h3>
          <h3 className="stat--vamp">+5% (<abbr title="Damage against 0 armor target / post mitigated for current target">{Math.floor(total.attack* 0.05)}/{Math.floor((total.attack * 0.05)* (1 - modifier))}</abbr> ) Physical Vamp</h3>

          <p><b>Lifeline:</b> Damage that puts you under <abbr title="35% of Max Health"><span className='stat--hp'>{Math.floor(total.health * 0.35)} Health</span></abbr> grants a shield that will absorb <span className='stat--armor'><abbr title="200 + 3 per 1% of critical chance">{Math.floor(200 + 3 * (total.critChance * 100))}</abbr> damage</span> for 5 seconds (90 seconds cooldown).</p>
          <p><b>Battle Furor:</b> Triggering lifeline grants <span className='stat--vamp'><abbr title="5% Physical">{Math.floor(total.attack * 0.05)} (Current target: {Math.floor((total.attack * 0.05)* (1 - modifier))})</abbr>Physical Vamp</span> for 8 seconds</p>
        </div>
    },

    {
      name: 'The Collector',

      health: 0,
      mana: 0,
      armor: 0,
      magres: 0,
      attack: 40,
      ap: 0,
      as: 0,
      moveSpeed: 0,
      flatArmPen: 10,
      flatMagPen: 0,
      armPen: 0,
      magPen: 0,
      critChance: 0.25,
      critMultiplier: 0,
      ah: 0,
      armorReduction: 0,

      description: 
        <div className='itemDescription'>
          <h3 className='stat--ad'>+{40} Attack Damage</h3>
          <h3 className="stat--critChance">+{25}% Critical Rate</h3>
          <h3>+10 Armor Penetration</h3>

          <p><b>Death And Taxes:</b> Dealing Damage that would leave an enemy champion below <abbr title="5% of their maximum health"><span className="stat--hp">{Math.floor(target.health)} health</span></abbr> execute them. Champion kills grant additional <span className="stat--armor">25 Gold.</span></p>
        </div>

    },

    // Magical items

    {
      name: 'Luden\'s Echo',

      health: 0,
      mana: 300,
      armor: 0,
      magres: 0,
      attack: 0,
      ap: 85,
      as: 0,
      moveSpeed: 0,
      flatArmPen: 0,
      flatMagPen: 0,
      armPen: 0,
      magPen: 0,
      critChance: 0,
      critMultiplier: 0,
      ah: 20,
      armorReduction: 0,

      description: 
        <div className='itemDescription'>
          <h3 className='stat--ap'>+{85} Ability Power</h3>
          <h3 className='stat--mana'>+{300} Max mana</h3>
          <h3>+{20} Ability Haste</h3>
          
          <p><b>Discordic Echo:</b> Moving and casting abilities gain stacks of <b>Discord</b>. At <b>100</b> stacks your next active ability or Empowered attack will deal <abbr title="110 + 10% ap. Numbers are pre/post-mitigation"><span className="stat--ap">{Math.floor(110 + total.ap * 0.1)} / {Math.floor((110 + total.ap * 0.1)*(1 - modifierMres))} bonus magic damage</span></abbr> to your target and up to 3 mearby enemies</p>
        </div>

    },

    {
      name: 'Morellonomicon',

      health: 0,
      mana: 0,
      armor: 0,
      magres: 0,
      attack: 0,
      ap: 75,
      as: 0,
      moveSpeed: 0,
      flatArmPen: 0,
      flatMagPen: 0,
      armPen: 0,
      magPen: 0,
      critChance: 0,
      critMultiplier: 0,
      ah: 20,
      armorReduction: 0,

      description: 
        <div className='itemDescription'>
          <h3 className="stat--ap">+{75} Ability Power</h3>
          <h3>+{20} Ability Haste</h3>

          <p><b>Affliction:</b> Dealing <span className="stat--ap">Magic Damage</span> applies <span className="stat--magres">40% Grievous Wounds</span> to enemy (Reduces the effectiveness of healing and Regeneration effect). Effect increased to <span className="stat--magres">60%</span> for targets under <span className="stat--hp">50% Max Health</span></p>
        </div>

    },

    {
      name: 'Void Staff',

      health: 0,
      mana: 0,
      armor: 0,
      magres: 0,
      attack: 0,
      ap: 70,
      as: 0,
      moveSpeed: 0,
      flatArmPen: 0,
      flatMagPen: 0,
      armPen: 0,
      magPen: (45 / 100),
      critChance: 0,
      critMultiplier: 0,
      ah: 0,
      armorReduction: 0,

      description: 
        <div className='itemDescription'>
          <h3 classname='stat--ap'>+{70} Ability Power</h3>
          <h3>Dissolve: <span className="stat--magres">+{45}% Magic Penetration</span></h3>
        </div>

    },

    {
      name: 'Rabadon\'s Deathcap',

      health: 0,
      mana: 0,
      armor: 0,
      magres: 0,
      attack: 0,
      ap: 110,
      as: 0,
      moveSpeed: 0,
      flatArmPen: 0,
      flatMagPen: 0,
      armPen: 0,
      magPen: 0,
      critChance: 0,
      critMultiplier: 0,
      ah: 0,
      armorReduction: 0,

      description: 
        <div className='itemDescription'>
          <h3 className='stat--ap'>+{110} Ability Power</h3>
          <p><b>Overkill:</b> Increases <span className="stat--ap">Ability Power</span> by <abbr title="40%">{bonusEffects.rabadon}</abbr></p>
          <button onClick={switchHat}>Enable/Disable bonus AP</button>
          <p><sub>* please, disable bonus AP before changing items - it does not auto updates for now</sub></p>
          
        </div>       

    },

    {
      name: 'Rylai\'s Crystal Scepter',

      health: 350,
      mana: 0,
      armor: 0,
      magres: 0,
      attack: 0,
      ap: 70,
      as: 0,
      moveSpeed: 0,
      flatArmPen: 0,
      flatMagPen: 0,
      armPen: 0,
      magPen: 0,
      critChance: 0,
      critMultiplier: 0,
      ah: 0,
      armorReduction: 0,

      description: 
        <div className='itemDescription'>
          <h3 className="stat--hp">+{350} Max Health</h3>
          <h3 className="stat--ap">+{70} Ability Power</h3>

          <p><b>Icy:</b> Damaging active abilities and empowered attacks slow enemies by 30% for 1 second.</p>
        </div>

    },

    {
      name: 'Liandry\'s Torment',

      health: 200,
      mana: 0,
      armor: 0,
      magres: 0,
      attack: 0,
      ap: 75,
      as: 0,
      moveSpeed: 0,
      flatArmPen: 0,
      flatMagPen: 0,
      armPen: 0,
      magPen: 0,
      critChance: 0,
      critMultiplier: 0,
      ah: 0,
      armorReduction: 0,

      description: 
        <div className='itemDescription'>
          <h3 className="stat--hp">+{200} Max Health</h3>
          <h3 className="stat--ap">+{75} Ability Power</h3>

          <p><b>Torment:</b> Damaging Abilities or empowered attacks deal <abbr title="(0.5% + 0.005% AP) of enemy Max HP. Shows pre/post-mitigated damage"><span className="stat--ap">{Math.floor((5/100 + 5/1000)*target.health)} / {Math.floor((5/100 + 5/1000)*target.health * (1 - modifierMres))} bonus magic damage</span></abbr> each second over 3 seconds</p>
        </div>

    },

    {
      name: 'Rod of Ages',

      health: 250,
      mana: 300,
      armor: 0,
      magres: 0,
      attack: 0,
      ap: 60,
      as: 0,
      moveSpeed: 0,
      flatArmPen: 0,
      flatMagPen: 0,
      armPen: 0,
      magPen: 0,
      critChance: 0,
      critMultiplier: 0,
      ah: 0,
      armorReduction: 0,

      description: 
        <div className='itemDescription'>
          <h3 className="stat--health">+{250} Max Health</h3>
          <h3 className="stat--ap">+{60} Ability Power</h3>
          <h3 className="stat--mana">+{300} Max mana</h3>        

          <p><b>Eternity:</b> restore <span className="stat--mana">Mana</span> equal to 15% damage taken from champions. Regen <span className="stat--hp">Health</span> equal to 20% of mana spent Capped at 25 health per cast.</p>
          <p><b>Veteran:</b> Each stack provides <span className="stat--hp">20 Health (up to 200)</span>, <span className="stat--mana">10 Mana (up to 100)</span> and <span className="stat--ap">6 Ability Power (up to 60)</span>. Gain 1 stack each 45 seconds. 10 stacks maximum</p>
        </div>

    },

    {
      name: 'Rod of Ages (stacked)',

      health: 450,
      mana: 400,
      armor: 0,
      magres: 0,
      attack: 0,
      ap: 120,
      as: 0,
      moveSpeed: 0,
      flatArmPen: 0,
      flatMagPen: 0,
      armPen: 0,
      magPen: 0,
      critChance: 0,
      critMultiplier: 0,
      ah: 0,
      armorReduction: 0,

      description: 
        <div className='itemDescription'>
          <h3 className="stat--health">+{450} Max Health</h3>
          <h3 className="stat--ap">+{120} Ability Power</h3>
          <h3 className="stat--mana">+{400} Max mana</h3>        

          <p><b>Eternity:</b> restore <span className="stat--mana">Mana</span> equal to 15% damage taken from champions. Regen <span className="stat--hp">Health</span> equal to 20% of mana spent Capped at 25 health per cast.</p>
          <p><b>Veteran:</b> Each stack provides <span className="stat--hp">20 Health (up to 200)</span>, <span className="stat--mana">10 Mana (up to 100)</span> and <span className="stat--ap">6 Ability Power (up to 60)</span>. Gain 1 stack each 45 seconds. 10 stacks maximum</p>
        </div>

    },

    {
      name: 'Lich Bane',

      health: 0,
      mana: 0,
      armor: 0,
      magres: 0,
      attack: 0,
      ap: 80,
      as: 0,
      moveSpeed: (base.moveSpeed * 5 / 100),
      flatArmPen: 0,
      flatMagPen: 0,
      armPen: 0,
      magPen: 0,
      critChance: 0,
      critMultiplier: 0,
      ah: 10,
      armorReduction: 0,

      description: 
        <div className='itemDescription'>
          <h3 className="stat--ap">+{80} Ability Power</h3>
          <h3>+{10} Ability Haste</h3>
          <h3>Bane: +5% ({Math.floor(base.moveSpeed * 5 / 100)}) Move Speed</h3>

          <p><b>Spellblade</b>Using an ability causes next attack used within 10 seconds to deal <span className='stat--ap'><abbr title="75% BASE AD + 50% AP, numbers are pre-post mitigation damage ">{Math.floor((base.attack * 75 / 100) + (total.ap * 50 / 100))} / {Math.floor(((base.attack * 75 / 100) + (total.ap * 50 / 100) * (1 - modifierMres)))}</abbr> bonus magic damage</span>. Damage is reduced against structures</p>
        </div>

    },

    {
      name: 'Archangel\'s Staff',

      health: 0,
      mana: 500,
      armor: 0,
      magres: 0,
      attack: 0,
      ap: 35 + (Math.floor(total.mana / 100)),
      as: 0,
      moveSpeed: 0,
      flatArmPen: 0,
      flatMagPen: 0,
      armPen: 0,
      magPen: 0,
      critChance: 0,
      critMultiplier: 0,
      ah: 20,
      armorReduction: 0,

      description: 
        <div className='itemDescription'>
          <h3 className="stat--ap">+{35} Ability Power</h3>
          <h3 className="stat--mana">+{500} Max Mana</h3>
          <h3>+{20} Ability Haste</h3>
          
          <p><b>Awe:</b> Grants <span className="stat--ap"><abbr title="1% of max mana">{Math.floor(total.mana / 100)} Ability Power</abbr></span> and refunds <span className="stat--mana">25%</span>of all Mana spent</p>
          <p><b>Mana Charge:</b> Increases max Mana by <span className="stat--mana">15</span> every time mana is spent up to <span className="stat--mana">700</span> bonus Mana. Triggers up to 3 times every 12 seconds. At max stacks transforms into Seraphs Embrace</p>
        </div>

    },

    {
      name: 'Seraph\'s Embrace',

      health: 0,
      mana: 1200,
      armor: 0,
      magres: 0,
      attack: 0,
      ap: 35 + Math.floor(total.mana * 3 / 100),
      as: 0,
      moveSpeed: 0,
      flatArmPen: 0,
      flatMagPen: 0,
      armPen: 0,
      magPen: 0,
      critChance: 0,
      critMultiplier: 0,
      ah: 20,
      armorReduction: 0,

      description: 
        <div className='itemDescription'>
          <h3 className="stat--ap">+{35} Ability Power</h3>
          <h3 className='stat--mana'>+{1200} Max Mana</h3>
          <h3>+{20} Ability Haste</h3>

          <p><b>Awe:</b> Grants <abbr title="3% of Max Mana"><span className="stat--ap">{Math.floor(total.mana * 3 / 100)} Ability Power</span></abbr> and refunds <span className="stat--mana">25%</span>of all Mana spent</p>
          <p><b>Lifeline:</b> Damage that puts you under <abbr title="35% Health"><span className="stat--hp">{Math.floor(total.health * 35 / 100)} Health</span></abbr> consumes <span className="stat--mana">15% current Mana</span> to grant a shield equal to <abbr title="unfortunately, calculating actual value impossible atm. It's 15% of Current mana + flat 100 points"><span className="stat--hp">100</span></abbr> for 2 seconds (90 seconds cooldown)</p>
        </div>

    },

    {
      name: 'Ardent Censer',

      health: 250,
      mana: 0,
      armor: 0,
      magres: 0,
      attack: 0,
      ap: 60,
      as: 0,
      moveSpeed: (base.moveSpeed * 5 / 100),
      flatArmPen: 0,
      flatMagPen: 0,
      armPen: 0,
      magPen: 0,
      critChance: 0,
      critMultiplier: 0,
      ah: 10,
      armorReduction: 0,

      description: 
        <div className='itemDescription'>
          <h3 className='stat--health'>+{250} Max Health</h3>
          <h3 className='stat--ap'>+{60} Ability Power</h3>
          <h3>+{10} Ability Haste</h3>

          <p><b>Ardent:</b>+5% ({Math.floor(base.moveSpeed * 5 / 100)}) Movement Speed</p>
          <p><b>Censer:</b> When you <span className="stat--hp">heal / shield</span> an allied champion both of you gain <span className="stat--as"><abbr title="10-30%; 10% + 20% / 14 * (level - 1); numbers are for your character">{(((10/100) + (20/100) / 14 * (currentLevel - 1)) * 100).toFixed(2)}%  ({(base.asBase * ((10/100) + (20/100) / 14 * (currentLevel - 1))).toFixed(3)})</abbr> Attack Speed</span> And your Attacks deal <abbr title="15 + level"><span class='stat--ap'>{15 + Number(currentLevel)} bonus Magic Damage</span></abbr> for 6 seconds. Regen effects do not trigger this effect.</p>
        </div>

    },

    {
      name: 'Harmonic Echo',

      health: 0,
      mana: 300,
      armor: 0,
      magres: 0,
      attack: 0,
      ap: 75,
      as: 0,
      moveSpeed: 0,
      flatArmPen: 0,
      flatMagPen: 0,
      armPen: 0,
      magPen: 0,
      critChance: 0,
      critMultiplier: 0,
      ah: 100,
      armorReduction: 0,

      description: 
        <div className='itemDescription'>
          <h3 className="stat--ap">+{75} Ability Power</h3>
          <h3 className='stat--man'>+{300} Max Mana</h3>
          <h3>+{10} Ability Haste</h3>

          <p><b>Harmonic Echo:</b> Moving and casting abilities build Harmony stacks. At 100 stacks your next healing / shielding ability coast on ally restores <abbr title="70 + 10% AP"><span className="stat--hp">{Math.floor(70 + (total.ap * 10 / 100))} Health</span></abbr> to your target and up to 3 nearby allied champions</p>
        </div>

    },

    {
      name: 'Awakened Spulstealer',

      health: 150,
      mana: 0,
      armor: 0,
      magres: 0,
      attack: 0,
      ap: 65,
      as: 0,
      moveSpeed: 0,
      flatArmPen: 0,
      flatMagPen: 15,
      armPen: 0,
      magPen: 0,
      critChance: 0,
      critMultiplier: 0,
      ah: 20,
      armorReduction: 0,

      description: 
        <div className='itemDescription'>
          <h3 className="stat--hp">+{150} Max Health</h3>
          <h3 className="stat--ap">+{65} Ability Power</h3>
          <h3>+{20} Ability Haste</h3>

          <p><b>Soul Hunt:</b> <span className="stat--ap">+15 Magic Penetration</span></p>
          <p><b>Soulfire:</b> Takedowns on enemy champions within of 3 seconds of dealing damage to them reduce the remaining cooldowns of your abilities by 25%</p>
        </div>

    },

    {
      name: 'Infinity Orb',

      health: 0,
      mana: 0,
      armor: 0,
      magres: 0,
      attack: 0,
      ap: 85,
      as: 0,
      moveSpeed: (base.moveSpeed * 5 / 100),
      flatArmPen: 0,
      flatMagPen: 15,
      armPen: 0,
      magPen: 0,
      critChance: 0,
      critMultiplier: 0,
      ah: 0,
      armorReduction: 0,

      description: 
        <div className='itemDescription'>
          <h3 className="stat--ap">+85 Ability Power</h3>

          <p><b>Destiny:</b> +5% ({Math.floor(base.moveSpeed * 5 / 100)}) Movement Speed</p>
          <p><b>Balance:</b> <span className="stat--ap">+{15} Magic Penetration</span></p>
          <p><b>Inevitable Demise: </b> Abilities and empowered attacks <span className="stat--vamp">Critically Strike</span> for 20% bonus damage against enemies below <span className='stat--hp'>35% <abbr title="For current target">({Math.floor(target.health * 35 / 100)})</abbr> Health</span></p>
        </div>

    },

    {
      name: 'Staff of Flowing Waters',

      health: 0,
      mana: 300,
      armor: 0,
      magres: 0,
      attack: 0,
      ap: 65,
      as: 0,
      moveSpeed: 0,
      flatArmPen: 0,
      flatMagPen: 0,
      armPen: 0,
      magPen: 0,
      critChance: 0,
      critMultiplier: 0,
      ah: 20,
      armorReduction: 0,

      description: 
        <div className='itemDescription'>
          <h3 className="stat--ap">+{65} Ability Power</h3>
          <h3 className="stat--mana">+{300} Max Mana</h3>
          <h3>+{20} Ability Haste</h3>

          <p><b>Riptide:</b> <span className="stat--hp">Healing / Shielding</span> an ally grants you both <b>15 Ability Haste</b> and <abbr title="20 - 40 ;(20 + 20 / 14 * (target's level - 1)) number is target's level = your level"><span className="stat--ap">{Math.floor(20 + 20 / 14 * (currentLevel - 1))} Ability Power</span></abbr> for 6 seconds</p>
        </div>

    },

    {
      name: 'Crystaline Reflector',

      health: 0,
      mana: 0,
      armor: 45,
      magres: 0,
      attack: 0,
      ap: 60,
      as: 0,
      moveSpeed: 0,
      flatArmPen: 0,
      flatMagPen: 0,
      armPen: 0,
      magPen: 0,
      critChance: 0,
      critMultiplier: 0,
      ah: 15,
      armorReduction: 0,

      description: 
        <div className='itemDescription'>
          <h3 className="stat--armor">+{45} Armor</h3>
          <h3 className="stat--ap">+{60} Ability Power</h3>
          <h3>+15 Ability Haste </h3>

          <p><b>Mirrored Force:</b> Ability casts grant a mirror shard (up to 3) that each block <abbr title="10 + 5% AP, numbers are pre/post mitigation"><span className="stat--ad">{Math.floor(10 + (total.ap * 5 / 100))} / {Math.floor((10 + (total.ap * 5 / 100)) * (1 - modifierAtt))}</span></abbr> form an enemy champion and deal <abbr title="20 + 10% AP; numbers are pre/post mitigation"><span className="stat--ap">{Math.floor(20 + (total.ap/10))} / {Math.floor((20 + (total.ap/10)) * (1 - modifier))} Magic Damage</span></abbr> to them.</p>
        </div>

    },

    {
      name: 'Banshee\'s Veil',

      health: 0,
      mana: 0,
      armor: 0,
      magres: 40,
      attack: 0,
      ap: 75,
      as: 0,
      moveSpeed: 0,
      flatArmPen: 0,
      flatMagPen: 0,
      armPen: 0,
      magPen: 0,
      critChance: 0,
      critMultiplier: 0,
      ah: 15,
      armorReduction: 0,

      description: 
        <div className='itemDescription'>
          <h3 className="stat--ap">+{75} Ability Power</h3>
          <h3 className="stat--magres">+{40} Magic Resistance</h3>
          <h3>+{15} Ability Haste</h3>

          <p><b>Annul:</b> Grants a spell shield that blocks the next hostile ability (35 seconds cooldown)</p>
        </div>

    },

    {
      name: 'Imerial Mandate',

      health: 200,
      mana: 0,
      armor: 0,
      magres: 0,
      attack: 0,
      ap: 40,
      as: 0,
      moveSpeed: 0,
      flatArmPen: 0,
      flatMagPen: 0,
      armPen: 0,
      magPen: 0,
      critChance: 0,
      critMultiplier: 0,
      ah: 20,
      armorReduction: 0,

      description: 
        <div className='itemDescription'>
          <h3 className="stat--hp">+{200} Max Health</h3>
          <h3 className='stat--ap'>+{40} Ability Power</h3>
          <h3>+20 Ability Haste</h3>

          <p><b>Coordinated Fire:</b> Abilities that slow/immobilize a champion deal <abbr title="47-75; 45 + 2 * level; numbers are pre/post-mitigation"><span className="stat--ap">{45 + 2 * currentLevel} / {Math.floor((45 + 2 * currentLevel) * (1 - modifierMres))} Magic Damage</span></abbr> and marks them for 4 seconds (6 seconds cooldown). Allied champion damage detonates the mark dealing <abbr title="94 - 150; 90 + 4 * level; numbers are pre/post-mitigated damage"><span className="stat--ap">{Math.floor(90 + 4 * currentLevel)} / {Math.floor((90 + 4 * currentLevel) * (1 - modifierMres))} Magic Damage</span></abbr> and granting you both <abbr title="Value for your champion">20% ({Math.floor(base.moveSpeed * 20 / 100)}) Movement Speed</abbr> for 2 seconds</p>
        </div>

    },

    
  ];


  // State for inventory 
  const [Items, setItems ] = useState([{health: 0}, {armor: 0}, {attack: 0}, {attack: 0}, {attack: 0}]);

  //  Logic for combining all bonus stat from items
  const NewBonusValues = function(items) {
    const aggregatedValues = {};
  
    items.forEach(item => {
      Object.keys(item).forEach(key => {
        if (typeof item[key] === 'number' && !['name', 'icon', 'description'].includes(key)) {
          aggregatedValues[key] = (aggregatedValues[key] || 0) + item[key];
        }
      });
    });
  
    return aggregatedValues;
  }

  // updating characters bonus stats whenever inventory changes
  useEffect(() => {
    const updatedBonusValues = NewBonusValues(Items);
    handleBonusChange(updatedBonusValues);
  }, [Items, currentLevel]);

  //state and logic to display inventory and description
   const [selectedItems, setSelectedItems] = useState([null, null, null, null, null]);

  const handleChange = (index, value) => {
    const newSelectedItems = [...selectedItems];
    newSelectedItems[index] = value;
    setSelectedItems(newSelectedItems);

    const selectedItemId = physical[value].name;

    setItems(prevItems => {
      const newItems = [...prevItems];
      newItems[index] = physical[value];
      return newItems;
    });
  };

  const [showInventory, setShowInventory] = useState(true);

  const toggleInventory = () => {
    setShowInventory(prevShowInventory => !prevShowInventory);
  };


    return (
      <div className='inventoryTile'> 
        <button onClick={toggleInventory}>Show / hide inventory</button>
        { showInventory && (<div className='inventoryGrid'>    
          {selectedItems.map((selectedIndex, index) => (
            <div className='inventorySlot' key={index}>
              <div>
                <select onChange={(e) => handleChange(index, e.target.value)}>
                  <option value="" disabled>Select an item</option>                
                  {physical.map((item, itemIndex) => (
                    <option key={itemIndex} value={itemIndex}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>          
              {selectedIndex !== null ? 
                physical[selectedIndex].description : 
                <div className="itemDescription">
                  <p>Choose an item</p>
                </div>
              }
            </div>
          ))}
        </div>)}
      </div>
    );
  }