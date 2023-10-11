import { useState, useEffect, useMemo } from "react";
import React from 'react';
import { Tooltip } from 'react-tooltip'
import '../styles/StatColors.css'
import { useStats } from './StatsContext';


export default function Inventory({base, bonus, total, handleBonusChange, currentLevel, bonusEffects, switchHat, switchTwinguard, switchFON, index}) { 

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
  const sunFireEffect = ((16 + 9 / 14 * (currentLevel - 1)) + (bonus.health * 8 / 100));



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
        <img src="../images/items/Guardian_Angel.png" alt="itemIcon" className="itemIcon" />
        <h3 className='stat--ad'>+{40} Attack Damage</h3>
        <h3 className='stat--armor'>+{40} Armor</h3>
  
        <p>
          <b>Resurrect: </b> Upon taking lethal damage, restores <abbr title="50% BASE health"><span className='stat--hp'>{Math.floor(base.health / 2)} base Health</span></abbr> {total.mana && <abbr title='30% total'> and <span className='stat--mana'> {Math.floor(total.mana * 0.3)} maximum Mana</span> </abbr> } after 4 Seconds of Stasis. (210s. Cooldown)
        </p>
      </div>
    },
  
    {
      name: 'Bloodthirster',
      
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
      critMultiplier: 0,
      armorReduction: 0,

      
      description: <div className='itemDescription'>
        <img src="../images/items/Bloodthirster.png" alt="itemIcon" className="itemIcon" />
        <h3 className='stat--ad'>+ {55} Attack Damage</h3>
        <h3 className='stat--critChance'>+ {Number(0.25*100)}% Critical Rate</h3>
  
        <p><b>Bloody: </b> <b className='stat--vamp'>+12% (<abbr title="Damage against 0 armor target / post mitigated for current target">{Math.floor((total.attack * 0.12))} / {Math.floor((total.attack * 0.12)* (1 - modifier))}</abbr>)  Physical Vamp</b></p>
        <p><b>Bloodsworn: </b> <span className='stat--vamp'>Physical Vamp</span> overheals you, generating a shield that absorbs <abbr title='40 + (20 * level)' className='stat--hp'>{(40 + 20 * (currentLevel - 1))}</abbr> damage. This shield decays out of combat over 10 seconds</p>
      </div>
    },
  
    {
      name: 'Statikk Shiv',      

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
         <img src="../images/items/Statikk_Shiv.png" alt="itemIcon" className="itemIcon" />
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
         <img src="../images/items/Blade_of_the_Ruined_King.png" alt="itemIcon" className="itemIcon" />
        <h3 className='stat--ad'>+{20} Attack Damage</h3>
        <h3 className='stat--as'>+35% ({Number(base.asBase * 0.35).toFixed(3)}) Attack Speed</h3>
  
        <p>
          <b>Thirst:</b> <b className='stat--vamp'>+10% (<abbr title="Damage against 0 armor target / post mitigated for current target">{Math.floor((total.attack * 0.1))} / {Math.floor((total.attack * 0.1)* (1 - modifier))}</abbr>)  Physical Vamp</b>
        </p>
  
        <p>
          <b>Ruined Strikes:</b> Attacks deal <span className='stats--ad'>bonus physical damage</span> equal to the <span className='stats--ad'>6%</span>( <span>9%</span> for Melee) on-hit. Min damage: 15. Max damage vs monsters: 90
        </p>
  
        <p>
          <b>Drain:</b> Hitting a champion with 3 consecutive attacks or ablilties deals <abbr title="30 + 5 per level" className='stats--ap'> {30 + 5 * (currentLevel - 1)} magic damage</abbr> and steals 25% of their Move Speed for 2 Seconds (60s Cooldown).
        </p>
  
      </div>
    },
  
    {
      name: 'Rapid Firecannon',
      
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
           <img src="../images/items/Rapid_Firecannon.png" alt="itemIcon" className="itemIcon" />
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
           <img src="../images/items/Runaan's_Hurricane.png" alt="itemIcon" className="itemIcon" />
          <h3 className='stat--as'>+45% ({(base.asBase * 0.45).toFixed(3)}) Attack Speed</h3>
          <h3 className='stat--critChance'>+ {0.25*100}% Critical Rate</h3>
  
          <p>Attacks strike 2 additional nearby enemies. Each attack  dealing <abbr title="55% Attack Damage" className='stat--ad'>{Math.floor(total.attack*0.55)} damage</abbr>. These attacks CAN critically hit and trigger on-hit effects.</p>        
        </div>
    },
  
    {
      name: 'Youmuu\'s Ghostblade',
      
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
           <img src="../images/items/Youmuus.png" alt="itemIcon" className="itemIcon" />
          <h3 className='stat--ad'>+{55} Attack Damage</h3>
          <h3>+{15} Ability Haste</h3>
          <h3>+{15} Lethality/flat armor penetration</h3>
  
          <p>Moving builds up <b>Momentum</b> stacks, granting up to 40 movement speed at 100 stacks. Stacks decay when movement impaired. </p>
          <p>Attacking with max <b>Momentum</b> consumes all stacks and grants <b className='stat--as'>25% ({Number(base.asBase*0.25).toFixed(3)}) Attack Speed</b> for 4 seconds.</p>
        </div>
    },
  
    {
      name: 'Duskblade of Draktharr',
      
      health: 0,
      mana: 0,
      armor: 0,
      magres: 0,
      attack: 55,
      ap: 0,
      as: 0,
      moveSpeed: 0,
      flatArmPen: 18,
      flatMagPen: 0,
      armPen: 0,
      magPen: 0,
      critChance: 0,
      critMultiplier: 0,      
      ah: 10,
      armorReduction: 0,
      
  
      description:
        <div className='itemDescription'>
           <img src="../images/items/Duskblade.png" alt="itemIcon" className="itemIcon" />
          <h3 className='stat--ad'>+{55} Attack Damage</h3>
          <h3>+{10} Ability Haste</h3>
          <h3>+{15} Lethality/flat armor penetration</h3>
  
          <p><b>Nightstalker:</b> The first attack against a champion deals <abbr title="20 + 7.5 per level"><b className='stat--ad'>{Math.floor(60 + (100/14)*(currentLevel - 1))} physical damage</b></abbr> and slows target by 99% for 0.35s (10s cooldown). Champions takedown refresh cooldown duration</p>
        </div>
    },
  
    {
      name: 'Sterak\'s Gage',
      
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
           <img src="../images/items/Steraks.png" alt="itemIcon" className="itemIcon" />
          <h3 className='stat--hp'>+{400} Max Health</h3>
          <h3>Heavy Handed: <abbr title="(50% of BASE attack damage)"><span className='stat--ad'>+{base.attack*0.5} Attack Damage</span></abbr> as BONUS attack damage</h3>
  
          <p><b>Lifeline:</b> Damage that puts you under <abbr title="(35% MAX health)"><span className='stat--hp'>{Math.floor(total.health*0.35)} health</span></abbr> triggers a <abbr title="(75% of BONUS health)" className="stat--hp">{bonus.health * 0.75} points </abbr> shield that decays Over 3 seconds (90 sec Cooldown)</p>
  
          <p><b>Sterak's fury:</b> Triggering Lifeline also increases your size and grants <span className='stat--ap'>30% Tenacity</span> for 8 seconds.</p>
        </div>
    },
  
    {
      name: 'Infinity Edge',
      
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
      critChance: 25 / 100,
      critMultiplier: 30 / 100,
      armorReduction: 0,
      ah: 0,      
  
      description:
        <div className='itemDescription'>
           <img src="../images/items/Infinity.png" alt="itemIcon" className="itemIcon" />
          <h3 className='stat--ad'>+{55} Attack Damage</h3>
          <h3 className='stat--critChance'>+{0.25*100}% Critical Rate</h3>
  
          <p><b>Infinity:</b> Critical Strikes deal 205% damage instead of 175%</p>
        </div>
    },

    {
      name: 'Mortal Reminder',
      icon: '', 

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
           <img src="../images/items/Mortal.png" alt="itemIcon" className="itemIcon" />
          <h3 className='stat--ad'>+{45} Attack Damage</h3>
          <h3>Last Whisper: <abbr title="15 + your current level">+{(15 + Number(currentLevel))}%</abbr> Armor Penetration</h3>

          <p><b>Sepsis:</b> Dealing <span className='stat--ad'>Physical Damage</span> to enemy champions apply 40% <abbr title="Reduces healing and regeneration">Grievous wounds</abbr> to target for 3 seconds. 60% for targets under <span className='stat--hp'>50% Health</span> </p>      
        </div>
    },

    {
      name: 'Manamune',
      
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
           <img src="../images/items/Manamune.png" alt="itemIcon" className="itemIcon" />
          <h3 className="stat--ad">+{25} Attack Damage</h3>
          <h3 classname='stat--mana'>+{300} Max mana</h3>
          <h3>+{20} Ability Haste</h3>

          <p><b>Awe:</b> grants <abbr title="1.5% of maximum mana"><span className="stat--mana">{Math.floor(total.mana * 0.015)}</span></abbr> Attacks damage, refunds <span className='stat--mana'>15%</span> of all Mana spent</p>


          <p><b>Mana Charge:</b> Increase max Mana by <span className='stat--mana'>10</span> every attack or when Mana is spent. Triggers up to 3 times every 12 seconds Caps at <span className='stat--mana'>700</span> bonus Mana and transforms into <b>Manamune</b> </p>
        </div>


    },

    {
      name: 'Muramana',
      
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
           <img src="../images/items/Muramana.png" alt="itemIcon" className="itemIcon" />
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
           <img src="../images/items/Nashors.png" alt="itemIcon" className="itemIcon" />
          <h3 className='stat--as'>+ 45% ({(base.asBase * 0.45).toFixed(3)}) Attack Speed</h3>
          <h3>+20 Ability Haste</h3>

          <p><b>Magic Fang:</b> Gain <span className="stat--ad">30 Attack Damage</span> or <span className='stat--ap'>60 Ability Power</span> <abbr title="Based of what BONUS stat you have more. Calculated whenever you select this item from the list"><b>(Adaptive)</b></abbr>.</p>

          <p><b>Gnaw:</b> When basic attack hits enemy champions, it will cause <abbr title="15 + 25% BONUS attack + 25% bonus ap"><span className='stat--ap'>{15 + (bonus.attack * 0.25) + (bonus.ap * 0.25)} bonus Magic damage</span></abbr></p>
        </div>
    },

    {
      name: 'Black Cleaver(stacked)',
      
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
           <img src="../images/items/BC.png" alt="itemIcon" className="itemIcon" />
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
           <img src="../images/items/Trinity.png" alt="itemIcon" className="itemIcon" />
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
         <img src="../images/items/MOM.png" alt="itemIcon" className="itemIcon" />
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
           <img src="../images/items/DD.png" alt="itemIcon" className="itemIcon" />
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
          <img src="../images/items/PD.png" alt="itemIcon" className="itemIcon" />
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
          <img src="../images/items/PD.png" alt="itemIcon" className="itemIcon" />
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
          <img src="../images/items/WitsEnd.png" alt="itemIcon" className="itemIcon" />
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
          <img src="../images/items/ER.png" alt="itemIcon" className="itemIcon" />
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
          <img src="../images/items/Stormrazor.png" alt="itemIcon" className="itemIcon" />
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
          <img src="../images/items/Serylda.png" alt="itemIcon" className="itemIcon" />
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
          <img src="../images/items/Solari.png" alt="itemIcon" className="itemIcon" />
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
          <img src="../images/items/Navori.png" alt="itemIcon" className="itemIcon" />
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
          <img src="../images/items/EdgeOfNight.png" alt="itemIcon" className="itemIcon" />
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
          <img src="../images/items/Hullbreaker.png" alt="itemIcon" className="itemIcon" />
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
          <img src="../images/items/Hullbreaker.png" alt="itemIcon" className="itemIcon" />
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
          <img src="../images/items/Hullbreaker.png" alt="itemIcon" className="itemIcon" />
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
          <img src="../images/items/DivineSunderer.png" alt="itemIcon" className="itemIcon" />
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
          <img src="../images/items/Serpent.webp" alt="itemIcon" className="itemIcon" />
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
          <img src="../images/items/LDR.webp" alt="itemIcon" className="itemIcon" />
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
          <img src="../images/items/ISB.webp" alt="itemIcon" className="itemIcon" />
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
          <img src="../images/items/Collector.webp" alt="itemIcon" className="itemIcon" />
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
          <img src="../images/items/Ludens.png" alt="itemIcon" className="itemIcon" />
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
          <img src="../images/items/Morellonomicon.png" alt="itemIcon" className="itemIcon" />
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
          <img src="../images/items/VoidStaff.png" alt="itemIcon" className="itemIcon" />
          <h3 className='stat--ap'>+{70} Ability Power</h3>
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
          <img src="../images/items/Rabadon.png" alt="itemIcon" className="itemIcon" />
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
          <img src="../images/items/Rylais.png" alt="itemIcon" className="itemIcon" />
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
          <img src="../images/items/Liandry.png" alt="itemIcon" className="itemIcon" />
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
          <img src="../images/items/ROA.png" alt="itemIcon" className="itemIcon" />
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
          <img src="../images/items/ROA.png" alt="itemIcon" className="itemIcon" />
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
          <img src="../images/items/LichBane.png" alt="itemIcon" className="itemIcon" />
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
          <img src="../images/items/ArchangelStaff.png" alt="itemIcon" className="itemIcon" />
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
          <img src="../images/items/Seraphs.png" alt="itemIcon" className="itemIcon" />
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
          <img src="../images/items/Ardent.png" alt="itemIcon" className="itemIcon" />
          <h3 className='stat--hp'>+{250} Max Health</h3>
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
      ah: 10,
      armorReduction: 0,

      description: 
        <div className='itemDescription'>
          <img src="../images/items/HarmonicEcho.png" alt="itemIcon" className="itemIcon" />
          <h3 className="stat--ap">+{75} Ability Power</h3>
          <h3 className='stat--mana'>+{300} Max Mana</h3>
          <h3>+{10} Ability Haste</h3>

          <p><b>Harmonic Echo:</b> Moving and casting abilities build Harmony stacks. At 100 stacks your next healing / shielding ability coast on ally restores <abbr title="130 + 10% AP"><span className="stat--hp">{Math.floor(130 + (total.ap * 10 / 100))} Health</span></abbr> to your target and up to 3 nearby allied champions</p>
        </div>

    },

    {
      name: 'Awakened Soulstealer',

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
          <img src="../images/items/Soulstealer.png" alt="itemIcon" className="itemIcon" />
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
          <img src="../images/items/Infinity_Orb.png" alt="itemIcon" className="itemIcon" />
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
          <img src="../images/items/Staff_of_Flowing_Water.png" alt="itemIcon" className="itemIcon" />
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
          <img src="../images/items/Crystalline_Reflector.png" alt="itemIcon" className="itemIcon" />
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
          <img src="../images/items/Banshee's_Veil.png" alt="itemIcon" className="itemIcon" />
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
          <img src="../images/items/Imperial_Mandate.webp" alt="itemIcon" className="itemIcon" />
          <h3 className="stat--hp">+{200} Max Health</h3>
          <h3 className='stat--ap'>+{40} Ability Power</h3>
          <h3>+20 Ability Haste</h3>

          <p><b>Coordinated Fire:</b> Abilities that slow/immobilize a champion deal <abbr title="47-75; 45 + 2 * level; numbers are pre/post-mitigation"><span className="stat--ap">{45 + 2 * currentLevel} / {Math.floor((45 + 2 * currentLevel) * (1 - modifierMres))} Magic Damage</span></abbr> and marks them for 4 seconds (6 seconds cooldown). Allied champion damage detonates the mark dealing <abbr title="94 - 150; 90 + 4 * level; numbers are pre/post-mitigated damage"><span className="stat--ap">{Math.floor(90 + 4 * currentLevel)} / {Math.floor((90 + 4 * currentLevel) * (1 - modifierMres))} Magic Damage</span></abbr> and granting you both <abbr title="Value for your champion">20% ({Math.floor(base.moveSpeed * 20 / 100)}) Movement Speed</abbr> for 2 seconds</p>
        </div>

    },

    {
      name: 'Cosmic Drive',

      health: 0,
      mana: 0,
      armor: 0,
      magres: 0,
      attack: 0,
      ap: 75,
      as: 0,
      moveSpeed: (base.moveSpeed * 5 / 100),
      flatArmPen: 0,
      flatMagPen: 0,
      armPen: 0,
      magPen: 0,
      critChance: 0,
      critMultiplier: 0,
      ah: 30,
      armorReduction: 0,

      description: 
        <div className='itemDescription'>
          <img src="../images/items/Cosmic_Drive.webp" alt="itemIcon" className="itemIcon" />
          <h3 className="stat--ap">+75 Ability Power</h3>
          <h3>+30 Ability Haste</h3>
          <h3>Hyperdrive: +5% ({Math.floor(base.moveSpeed * 5 / 100)}) Movement speed</h3>

          <p><b>Spellweaving: </b>Active abilities and empowered attacks grant <abbr title="30 + 70% Ability Haste"><b>{Math.floor(30 + (attacker.ah * 70 /100))} Movement Speed</b></abbr> after dealing damage to enemy champion. This movement speed decays over 2 seconds. Each source has 1s cooldown for triggering the effect. Only <b>Ability Haste</b> from items contributes to Spellweaving's movement speed</p>
        </div>

    },

    {
      name: 'Riftmaker',

      health: 150,
      mana: 0,
      armor: 0,
      magres: 0,
      attack: 0,
      ap: 80,
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
          <img src="../images/items/Riftmaker.webp" alt="itemIcon" className="itemIcon" />
          <h3 className="stat--hp">+150 Max Health</h3>
          <h3 className="stat--ap">+80 Ability Power</h3>
          <h3>+15 Ability Haste</h3>
          <h3 className="stat--vamp">+12% Omnivamp</h3>

          <p><b>Void Corruption:</b> When in combat with champions gain 1 stack of <b>Corruption</b> every 1 seconds. Every stacks increases the damage you deal by 3% up to 3 stacks. At 3 stacks additional damage becomes <b>true damage</b>.</p>
        </div>

    },

    {
      name: 'Horizon Focus',

      health: 150,
      mana: 0,
      armor: 0,
      magres: 0,
      attack: 0,
      ap: 80,
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
          <img src="../images/items/Horizon_Focus.webp" alt="itemIcon" className="itemIcon" />
          <h3 className="stat--hp">+150 Max Health</h3>
          <h3 className="stat--ap">+80 Ability Power</h3>
          <h3>+15 Ability Haste</h3>
          
          <p><b>Hypershot:</b> Apply 1 mark when you damage enemy champion with non-targeted ability from 500 units away; apply 2 marks for immobolizing. MArked enemies are revealed. At 3 stacks detonate them  to deal <abbr title="90 +25% AP; numbers are pre/post-mitigation"><span className="stat--ap">{Math.floor(90 + (total.ap * 25 / 100))} / {Math.floor((90 + (total.ap * 25 / 100)) * (1 - modifierMres))} Magic damage</span></abbr> to the target.</p>
        </div>

    },

    //Defense items

    {
      name: 'Sunfire Aegis',

      health: 500,
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
      ah: 15,
      armorReduction: 0,

      description: 
        <div className='itemDescription'>
          <img src="../images/items/Sunfire_Aegis.png" alt="itemIcon" className="itemIcon" />
          <h3 className="stat--hp">+500 Max Health</h3>
          <h3>+15 Ability Haste</h3>

          <p><b>Immolate:</b> deals <abbr title="(16 + 9 / 14 * (level - 1)) + 0.8% of BONUS hp; pre/post mitigation numbers"><span className="stat--ap">{Math.floor(sunFireEffect)} / {Math.floor((sunFireEffect * (1 - modifierMres)))} Magic Damage</span></abbr> per second to nearby enemies. <span className="stat--ap">Immolate</span> increases it's damage by 7% for 5s, stacking up to 6 times to: <span className="stat--ap">{Math.floor((sunFireEffect) + (sunFireEffect * 7 / 100 * 6))} / {Math.floor((((sunFireEffect) + (sunFireEffect * 7 / 100 * 6)) * (1 - modifierMres)))}</span></p> 
          <p><b>Flametouch:</b> At max stacks <span className="stat--ap">Immolate</span> stacks attacks burn enemies for <abbr title="50% of immolates damage" className="stat--ap">{Math.floor(((sunFireEffect) + (sunFireEffect * 7 / 100 * 6))/2)} / {Math.floor(((((sunFireEffect) + (sunFireEffect * 7 / 100 * 6)) * (1 - modifierMres)))/2)} Magic Damage</abbr>. Immolate deals <abbr title="130%" className="stat--ap">{Math.floor(((sunFireEffect) + (sunFireEffect * 7 / 100 * 6))*(130/100))} Damage to monsters</abbr> and <abbr title="175% + 75% / 14 * (level - 1)" className="stat--ap">{Math.floor(sunFireEffect * (1.75 + 0.75 / 14 * (currentLevel - 1)))} Damage</abbr> to minions</p>         
        </div>

    },

    {
      name: 'Spirit Visage',

      health: 350,
      mana: 0,
      armor: 0,
      magres: 50,
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
      ah: 20,
      armorReduction: 0,

      description: 
        <div className='itemDescription'>
          <img src="../images/items/Spirit_Visage.png" alt="itemIcon" className="itemIcon" />
          <h3 className="stat--hp">+350 Max Health</h3>
          <h3 className="stat--hp">+100% Health Regen</h3>
          <h3 className="stat--magres">+50 Magic Resistance</h3>
          <h3>+20 Ability Haste</h3>

          <p><b>Blessed:</b> Increases all healing and shielding effects on you by <span className="stat--hp">30%</span></p>
        </div>

    },

    {
      name: 'Randuin\'s Omen',

      health: 400,
      mana: 0,
      armor: 60,
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
        <div className='itemDescription'>
          <img src="../images/items/Randuins_Omen.png" alt="itemIcon" className="itemIcon" />
          <h3 className="stat--hp">+400 Max Health</h3>
          <h3 className="stat--armor">+60 Armor</h3>

          <p><b>Cold Steel:</b> reduces the attack speed of enemies by <b>15%</b> when struck by basic attack</p>
          <p><b>Determination:</b> When you are getting critically struck store (20% for melee / 14% for ranged) pre-mitigation damage received as Datermination stacks for 5 seconds (500 stacks max). When you attack a champion consume all stacks and heal for the amount consumed.</p>
        </div>

    },

    {
      name: 'Thornmail',

      health: 100,
      mana: 0,
      armor: 75,
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
        <div className='itemDescription'>
          <img src="../images/items/Thornmail.webp" alt="itemIcon" className="itemIcon" />
          <h3 className="stat--hp">+100 Max Health</h3>
          <h3 className="stat--armor">+75 Armor</h3>

          <p><b>Thorns: </b>When struck by attack deal <abbr title="20 + 6% bonus armor + 1% bonus HP; numbers are pre/post-mitigation" class='stat--vamp'>{Math.floor((20 + (bonus.armor * 6 / 100) + (bonus.health /100)))}
          / {Math.floor((20 + (bonus.armor * 6 / 100) + (bonus.health /100)) * (1 - modifierMres))} Magic Damage</abbr> to the attacker and apply 40% <b>Grievous Wounds</b>. 60% for target under 50% health / immobilized.</p>
          <p><b>Grievous Wounds</b> reduces the effectiveness of healing and regeneration effects.</p>
        </div>

    },

    {
      name: 'Warmog\'s Armor',

      health: 700,
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
      ah: 10,
      armorReduction: 0,

      description: 
        <div className='itemDescription'>
          <img src="../images/items/Warmogs_Armor.png" alt="itemIcon" className="itemIcon" />
          <h3 className="stat--hp">+700 Max Health</h3>
          <h3 className="stat--hp">+200% Health Regen</h3>
          <h3>+10 Ability Haste</h3>

          <p><b>Warmog's Heart:</b> If you have at least <span className="stat--hp">950 bonus health</span>, and did not take any damage within last 6 seconds, restore <abbr title="5% Max health" className="stat--hp">{Math.floor(total.health * 5 / 100)} Health</abbr> per second</p>
        </div>

    },

    {
      name: 'Iceborn Gauntlet',

      health: 250,
      mana: 250,
      armor: 50,
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
      ah: 30,
      armorReduction: 0,

      description: 
        <div className='itemDescription'>
          <img src="../images/items/Iceborn_Gauntlet.png" alt="itemIcon" className="itemIcon" />
          <h3 className="stat--hp">+250 Max Health</h3>
          <h3 className="stat--armor">+50 Armor</h3>
          <h3 className="stat--mana">+250 Max Mana</h3>

          <p><b>Spellblade: </b>Using an ability causes the next attack within 10 seconds to deal <abbr title="100% base AD + 25% armor; numbers are pre/post mitigation" className="stat--ad">{Math.floor(base.attack + (bonus.armor / 4))} / {Math.floor((base.attack + (bonus.armor / 4)) * (1 - modifier))} Bonus Physical Damage</abbr> in an area and creates an icy zone for 2 seconds that slows by <b>30%</b>. Armor increases the size of a field (1.5s Cooldown). Damage is reduced against structures.</p>
        </div>

    },

    {
      name: 'Dead Man\'s Plate',

      health: 250,
      mana: 0,
      armor: 50,
      magres: 0,
      attack: 0,
      ap: 0,
      as: 0,
      moveSpeed: (base.moveSpeed * 5 / 100),
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
          <img src="../images/items/Dead_Mans_Plate.png" alt="itemIcon" className="itemIcon" />
          <h3 className="stat--health">+250 Max Health</h3>
          <h3 className="stat--armor">+50 Armor</h3>

          <p><b>Relentless:</b> +5% ({Math.floor(base.moveSpeed * 5 / 100)}) Movement Speed</p>

          <p><b>Momentum:</b> Moving builds up stacks, granting up to 40 Movement Speed at 100 stacks. Attacking removes all Momentum stacks, stacks decay when movement impaired.</p>

          <p><b>Crushing blow:</b> Attacks deal up to <span className="stat--ap">100 <abbr title="post-mitigation">({Math.floor(100 * (1 - modifierMres))})</abbr> Bonus Magic Damage</span> based on Momentum removed . Attacks with max Momentum slows the target by 50% for 1 second.</p>
        </div>

    },

    {
      name: 'Abyssal Mask',

      health: 250,
      mana: 300,
      armor: 0,
      magres: 40,
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
      ah: 10,
      armorReduction: 0,

      description: 
        <div className='itemDescription'>
          <img src="../images/items/Abyssal_Mask.png" alt="itemIcon" className="itemIcon" />
          <h3 className="stat--hp">+300 Max Health</h3>
          <h3 className="stat--magres">+40 Magic Resistance</h3>
          <h3 className="stat--mana">+300 Max Mana</h3>
          <h3>+10 Ability Haste</h3>

          <p><b>Eternity:</b> restore <span className="stat--mana">Mana</span> equal to 15% damage taken from champions. Regen <span className="stat--hp">Health</span> equal to 20% of mana spent Capped at 25 health per cast.</p>
          <p><b>Abyssal</b> store <span>20% pre-mitigation magic damage</span> taken for 5 seconds. When you immobilize the champion explode stacks for <span className="stat--ap">Magic Damage</span> equal to stored stacks.</p>
        </div>

    },

    {
      name: 'Zeke\'s Convergence',

      health: 0,
      mana: 150,
      armor: 40,
      magres: 40,
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
      ah: 10,
      armorReduction: 0,

      description: 
        <div className='itemDescription'>
          <img src="../images/items/Zekes_Convergence.png" alt="itemIcon" className="itemIcon" />
          <h3 className="stat--armor">+40 Armor</h3>
          <h3 className="stat--magres">+40 Magic Resistance</h3>
          <h3 className="stat--mana">+150 Max mana</h3>
          <h3>+10 Ability Haste</h3>

          <p>
           <b>Harbringer:</b> While near an allied champion, casting your ultimate ability grants you and a nearby allied champion bonus effects for 10 seconds. Prioritizes highest attack damage ally. You have a 300 range aura that slows enemies within by 20%, and your ally's basic attacks burn their target dealing <span className="stat--ap">30% bonus magic damage</span> over 2 seconds. 
          </p>
          <p>
            <b>Frostfire Covenant: </b>Slowing a burning enemy with your frost aura deals <span className="stat--ap">60 <abbr title="post-mitigated for current target">({Math.floor(60 * (1 - modifierMres))})</abbr> magic damage per second</span>  to nearby enemies and slow them by 50% for 3 seconds. 
          </p>
        </div> 

    },

    {
      name: 'Protector\'s Vow',

      health: 350,
      mana: 0,
      armor: 40,
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
      ah: 10,
      armorReduction: 0,

      description: 
        <div className='itemDescription'>
          <img src="../images/items/Protectors_Vow.png" alt="itemIcon" className="itemIcon" />
          <h3 className="stat--hp">+350 Max Health</h3>
          <h3 className="stat--armor">+40 Armor</h3>
          <h3>+10 Ability Haste</h3>

          <p><b>Proptector:</b> Raise your guard when you're near an allied champion. If you or ally take damage, both of you receive <abbr title="125 + 30% BONUS HP" className="stat--hp">{Math.floor(125 + (bonus.health * 30 / 100))} shield</abbr> for 1.5 seconds. 20 seconds cooldown.</p>
        </div>

    },

    {
      name: 'Winter\'s Approach',

      health: 350 + Math.floor((attacker.mana) * 8 / 100),
      mana: 500,
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
      ah: 15,
      armorReduction: 0,

      description: 
        <div className='itemDescription'>
          <img src="../images/items/Winter's_Approach.png" alt="itemIcon" className="itemIcon" />
          <h3 className="stat--hp">+350 Max Health</h3>
          <h3 className="stat--mana">+500 Max Mana</h3>
          <h3>+15 Ability Haste</h3>

          <p><b>Awe:</b> Grants <abbr title="8% of Max mana" className="stat--hp">{Math.floor(total.mana * 8 / 100)} bonus Health</abbr> and refunds <span className="stat--mana">15%</span> of Mana spent</p>
          <p><b>Mana Charge:</b> Increases <span className="stat--mana">Max mana by 12</span> every Attack, when mana is spent or on taking damage from champions/minions/monsters. Generates up to 3 stacks every 12 seconds. Caps at <span className="stat--mana">700 mana</span> and transforms into <b>Fimbulwinter</b></p>
        </div>

    },

    {
      name: 'Fimbulwinter',

      health: 350,
      mana: 1200 + Math.floor(total.mana * 8 / 100),
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
      ah: 15,
      armorReduction: 0,

      description: 
      <div className='itemDescription'>
          <img src="../images/items/Fimbulwinter.png" alt="itemIcon" className="itemIcon" />
      <h3 className="stat--hp">+350 Max Health</h3>
      <h3 className="stat--mana">+1200 Max Mana</h3>
      <h3>+15 Ability Haste</h3>

      <p><b>Awe:</b> Grants <abbr title="8% of Max mana" className="stat--hp">{Math.floor(total.mana * 8 / 100)} bonus Health</abbr> and refunds <span className="stat--mana">15%</span> of Mana spent</p>
      <p><b>Frozen Colossus:</b> Immobilizing or slowing an enemy champion consumes <span className="stat--mana">3% current Mana</span> and grants a shield for 3 seconds, absorbing <span className="stat--hp">{Math.floor(100 + 100 / 14 * (currentLevel - 1))}</span>  + <span className="stat--mana">5% current mana</span>, icreased by <b>80%</b> if there are more than 1 enemy champion nearby. Shield triggers when above <abbr title="20% Max" className="stat--mana">{Math.floor(total.mana / 5)} Mana</abbr> (8s Cooldown).</p>
    </div>

    },

    {
      name: 'Frozen Heart',

      health: 0,
      mana: 200,
      armor: 80,
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
      ah: 25,
      armorReduction: 0,

      description: 
        <div className='itemDescription'>
          <img src="../images/items/FH.png" alt="itemIcon" className="itemIcon" />
          <h3 className="stat--armor">+80 Armor</h3>
          <h3 className="stat--mana">+200 Max mana</h3>
          <h3>+25 Ability Haste</h3>

          <p><b>Winter's Caress:</b> Basic Attacks and <span className="stat--ap">Magic Damage</span> caused by you or inflicted upon you will apply stacks of Chill to enemy for 3 Seconds. Each stack reduce <b>Attack Speed</b> by <b>9%</b> up to a maximum of <b>36%</b> at <b>4 stacks</b>. Each individual ability has a 3 second cooldown on applying stacks.</p>
        </div>

    },

    {
      name: 'Force of Nature',

    
      health: 350,
      mana: 0,
      armor: 0,
      magres: 50,
      attack: 0,
      ap: 0,
      as: 0,
      moveSpeed: Math.floor(base.moveSpeed * 5 / 100),
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
          <img src="../images/items/Force_of_Nature.png" alt="itemIcon" className="itemIcon" />
          <h3 className="stat--hp">+350 Max Health</h3>
          <h3 className="stat--magres">+50 Magic resistance</h3>
          <h3>+5% ({Math.floor(base.moveSpeed * 5 / 100)}) Movement Speed</h3>

          {/* Bug: numbers don't update dynamically */}
          {/* <button onClick={switchFON}>Max stacks on / off</button>
          <p>
            <sub>*switch stacks off before changing to other item. Stacks don't remove by themselves.</sub>
          </p> */}

          <p>
            <b>Absorb:</b> Taking ability damage from enemy champions grants 1 stack of Steadfast for 7 seconds, max 6 stacks. Dealing damage to enemy champions refresh effect duration. at maximum stacks gain 10% ({Math.floor(base.moveSpeed /10)}) Movement Speed and reduce all incoming magic damage by 25%.
          </p>
        </div>

    },

    {
      name: 'Ixtali Seedjar',

      health: 425,
      mana: 0,
      armor: 0,
      magres: 0,
      attack: 0,
      ap: 0,
      as: 0,
      moveSpeed: Math.floor(base.moveSpeed * 5 / 100),
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
          <img src="../images/items/Ixtali_Seedjar.png" alt="itemIcon" className="itemIcon" />
          <h3 className="stat--hp">+425 Max Health</h3>
          <h3>+25 Ability Haste</h3>
          <h3>+5% ({Math.floor(base.moveSpeed * 5 / 100)}) Movement Speed</h3>

          <p>
            <b>Harvester:</b> Plants hit by you or your ally drop a seed. Picking up a seed replaces your trinket with corresponding plant for 60 seconds and grants you  <b>+40% ({Math.floor(base.moveSpeed * 40 / 100)}) Movement Speed </b> decaying over 2.5 seconds
          </p>

          <p>
            <b>Propagation:</b> Plant your held seed at a terget location causing it to grow to full size over 1 second. Each plant type has 30 seconds cooldown
          </p>
        </div>

    },

    {
      name: 'Dawnshroud',

      health: 250,
      mana: 0,
      armor: 50,
      magres: 30,
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
        <div className='itemDescription'>
          <img src="../images/items/Dawnshroud.png" alt="itemIcon" className="itemIcon" />
          <h3 className="stat--hp">+250 Max Health</h3>
          <h3 className="stat--armor">+50 Armor</h3>
          <h3 className="stat--magres">+30 Magic Resistance</h3>

          <p>
            <b>Dawnbringer:</b> If you are within 400 units of enemy champion and you immobilize them or getting immobilized, reveal all nearby enemy champions and deal them <abbr title="80 + 5% BONUS HP; numbers are pre/post-mitigation" className="stat--ap">{Math.floor(80 + bonus.health / 20 )} / {Math.floor((80 + bonus.health / 20 ) * (1 - modifierMres))} Magic Damage</abbr>. (3 seconds Cooldown)
          </p>
        </div>

    },

    {
      name: 'Amaranth Twinguard',

      health: 0,
      mana: 0,
      armor: 55,
      magres: 55,
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
        <div className='itemDescription'>
          <img src="../images/items/Amaranth.png" alt="itemIcon" className="itemIcon" />
          <h3 className="stat--armor">+55 Armor</h3>
          <h3 className="stat--magres">+55 Magic Resistance</h3>

          <button onClick={switchTwinguard}>Enable / disable bonus defence </button>
          <p><sub>* please, disable bonus defence before changing items - it does not auto updates for now</sub></p>
          <p>
            <b>Endurance:</b> Gain 1 stack every 1 seconds while in combat with Enemy Champions.
          </p>
          <p>
            At full stacks gain 20% size, 20% Tenacity, increase both <span className="stat--ad">Armor</span> and <span className="stat--magres">Magic resistance</span> by 30% until Out Of Combat with enemy champions
          </p>
        </div>

    },    

    {
      name: 'Mantle of the Twelfth Hour',

      health: 200,
      mana: 0,
      armor: 40,
      magres: 40,
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
        <div className='itemDescription'>
          <img src="../images/items/12HourMantle.png" alt="itemIcon" className="itemIcon" />
          <h3 className="stat--hp">+200 Max Health</h3>
          <h3 className="stat--armor">+40 Armor</h3>
          <h3 className="stat--magres">+40 Magic Resistance</h3>

          <p>
            <b>Lifeline:</b> Damage that puts you under <abbr title="35% max HP" className="stat--hp">{Math.floor(total.health * 35 / 100)} Health</abbr> grants you a heal for <abbr title="200 + 50% BONUS HP" className="stat--hp">{Math.floor(200 + bonus.health/2)} health</abbr> over 3 seconds, and provides <b>50% Slow Resistance</b> and <b>30 Movement Speed</b> for 3 seconds (90 second cooldown).
          </p>
        </div>

    },

    {
      name: 'Searing Crown',

      health: 300,
      mana: 0,
      armor: 50,
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
        <div className='itemDescription'>
          <img src="../images/items/SearingCrown.png" alt="itemIcon" className="itemIcon" />
          <h3 className="stat--hp">+300 Max Health</h3>
          <h3 className="stat--armor">+50 Armor</h3>

          <p>
            <b>Fiery Touch:</b> After dealing damage with an attack or ability, burn target for 3 seconds dealing <abbr title="1.4% max HP damage. Numbers for current target pre-post/mitigation" className="stat--ap">{Math.floor((target.health * 14 /1000))} / {Math.floor((target.health * 14 /1000) * (1 - modifierMres))} Magic Damage</abbr> per second. Reduced to <span className="stat--ap">{Math.floor((target.health * 7 /1000))} / {Math.floor((target.health * 7 /1000) * (1 - modifierMres))}</span> for ranged users. Deals 150% damage to minions and monsters. Maximum 125 damage to monsters.
          </p>
        </div>

    },

    //Support Items

    {
      name: 'Ancient Coin',

      health: 80,
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
      ah: 5,
      armorReduction: 0,

      description: 
        <div className='itemDescription'>
          <img src="../images/items/Ancient_Coin.png" alt="itemIcon" className="itemIcon" />
          <h3 className="stat--hp">+80 Health</h3>
          <h3>+5 Ability Hate</h3>

          <p><b>Offering:</b> Generates a charge every 30 seconds, up to 3 charges. While you are near an allied champion, nearby minions that die will each consume a charge. Consuming a charge will grant 65 gold and heal you for 20 - 80 (based on missing health) You earn 50% reduced gold from killing minions and monsters. Killing minions will also grant 100% kill gold Gold 100% kill gold to the nearby ally.</p>
          <p><b>Mission:</b> This item transforms into <b>Talisman of Ascension</b> after obtaining <b>500</b> gold.</p>
        </div>
    },

    {
      name: 'Talisman of Ascension (Stacked)',

      health: 375,
      mana: 0,
      armor: 0,
      magres: 0,
      attack: (total.ap < total.attack ? 20 : 0),
      ap:  (total.ap > total.attack ? 40 : 0),
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
          <img src="../images/items/Talisman_of_Ascension.png" alt="itemIcon" className="itemIcon" />
          <h3 className="stat--hp">+375 (125 + 250) Health</h3>
          <h3><span className="stat--ad">+20 Attack Damage</span> or <span className="stat--ap">+40 Ability Power</span> (Adaptive)</h3>
          <h3>+15 Ability Haste</h3>

          <p>
            <b>Soulcast:</b> Every 60 seconds gain <b>75 Gold</b> <span className="stat--hp">25 Health</span>, and <span className="stat--ad">2 AD</span> or <span className="stat--ap">4 AP</span> (Adaptive) up to a maximum of <span className="stat--hp">250 Health,</span> and <span className="stat--ad">20 AD</span> or <span className="stat--ap">40 AP</span> (Adaptive).
            </p>
        </div>

    },

    {
      name: 'Spectral Sickle',

      health: 0,
      mana: 0,
      armor: 0,
      magres: 0,
      attack: (total.ap < total.attack ? 10 : 0),
      ap:  (total.ap > total.attack ? 20 : 0),
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
          <img src="../images/items/Spectral_Sickle.png" alt="itemIcon" className="itemIcon" />
          <p><b>Versatile:</b> Gain <span className="stat--ad">10 Attack Damage</span> or <span className="stat--ap">20 Ability Power</span> (Adaptive).</p>

          <p><b>Tribute:</b>  Generates a charge every 30 seconds, up to 3 charges. While you are near an allied champion, your damaging abilities and attacks against champions and structures consume up to one charge per attack or cast. Consuming a charge grants 65 gold and heals for <span className="stat--hp">20 - 80 health (based on missing health)</span> . You earn 50% reduced gold from killing minions and monsters. Killing minions will also grant 100% kill gold to the nearby ally.</p>

          <p><b>Quest:</b> Earn <b>500</b> Gold with this item to transform it into <b>Black Mist Scythe</b>.</p>
        </div>

    },

    {
      name: 'Black Mist Scythe (Stacked)',

      health: 250,
      mana: 0,
      armor: 0,
      magres: 0,
      attack: (total.ap < total.attack ? 34 : 0),
      ap:  (total.ap > total.attack ? 68 : 0),
      as: 0,
      moveSpeed: 0,
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
          <img src="../images/items/Black_Mist_Scythe.png" alt="itemIcon" className="itemIcon" />
          <h3>+10 Ability Haste</h3>

          <p>
            <b>Versatile:</b> Gain <span className="stat--ad">14 Attack Damage</span> or <span stat--ap>28 Ability Power</span> (Adaptive).
          </p>

          <p>
            <b>Soulcast:</b> Every 60 seconds gain <b>75 Gold</b> <span className="stat--hp">25 Health</span>, and <span className="stat--ad">2 AD</span> or <span className="stat--ap">4 AP</span> (Adaptive) up to a maximum of <span className="stat--hp">250 Health,</span> and <span className="stat--ad">20 AD</span> or <span className="stat--ap">40 AP</span> (Adaptive). 
          </p>

        </div>

    },

    {
      name: 'Relic Shield',

      health: 175,
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
      ah: 10,
      armorReduction: 0,

      description: 
        <div className='itemDescription'>
          <img src="../images/items/Relic_Shield.png" alt="itemIcon" className="itemIcon" />

          <h3 className="stat--hp">+175 Max Health</h3>
          <h3>+10 Ability Haste</h3>

          <p>
            <b>Spoils of War:</b> Generates a charge every 30 seconds, up to 3 charges. While you are near an allied champion, your basic attacks execute minions below <span className="stat--hp">65% of their maximum health</span>, consuming 1 charge per minion. Consuming a charge will heal you for <span className="stat--hp">15 - 65 (based on missing health)</span>, as well as grant 65 Gold to you and 100% kill gold to the nearest allied champion. You earn 50% reduced gold from killing minions and monsters. Killing minions will also grant 100% kill gold to the nearby ally.
          </p>

          <p>
            <b>Quest:</b> earn <b>500</b> gold with this item to transform it into <b>Bulwark of the Mountain</b>
          </p>

        </div>
    },

    {
      name: 'Bulwark of the Mountain (Stacked)',

      health: 175+250,
      mana: 0,
      armor: 0,
      magres: 0,
      attack: (total.ap < total.attack ? 20 : 0),
      ap:  (total.ap > total.attack ? 40 : 0),
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
          <img src="../images/items/Bulwark_of_the_Mountain.png" alt="itemIcon" className="itemIcon" />
          <h3 className="stat--hp">+175 Max Health</h3>
          <h3>+10 Ability Haste</h3>

          <p>
            <b>Soulcast:</b> Every 60 seconds gain <b>75 Gold</b> <span className="stat--hp">25 Health</span>, and <span className="stat--ad">2 AD</span> or <span className="stat--ap">4 AP</span> (Adaptive) up to a maximum of <span className="stat--hp">250 Health,</span> and <span className="stat--ad">20 AD</span> or <span className="stat--ap">40 AP</span> (Adaptive).
            </p>

        </div>

    },
  ];

    const boots = [
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
        bootsPassive: false,
  
        description: 
          <div className='itemDescription'>
            <p>
              No boots selected
            </p>
  
          </div>
  
      },

      {
        name: 'Boots of Speed',
  
        health: 0,
        mana: 0,
        armor: 0,
        magres: 0,
        attack: 0,
        ap: 0,
        as: 0,
        moveSpeed: 25,
        flatArmPen: 0,
        flatMagPen: 0,
        armPen: 0,
        magPen: 0,
        critChance: 0,
        critMultiplier: 0,
        ah: 0,
        armorReduction: 0,
        bootsPassive: false,
  
        description: 
          <div className='itemDescription'>
            <img src="../images/items/bootsBasic.png" alt="itemIcon" className="itemIcon" />

            <h3 className="stat--moveSpeed">+25 Movement Speed</h3>  
          </div>
  
      },

      {
        name: 'Gluttonous Greaves',
  
        health: 0,
        mana: 0,
        armor: 0,
        magres: 0,
        attack: 35,
        ap: 0,
        as: 0,
        moveSpeed: 45,
        flatArmPen: 0,
        flatMagPen: 0,
        armPen: 0,
        magPen: 0,
        critChance: 0,
        critMultiplier: 0,
        ah: 0,
        armorReduction: 0,
        bootsPassive: false,
  
        description: 
          <div className='itemDescription'>
            <img src="../images/items/bootsVamp.png" alt="itemIcon" className="itemIcon" />

            <h3 className="stat--ad">+35 Attack Damage</h3>
            <h3 className="stat--moveSpeed">+45 Movement Speed</h3>

            <p>
              <b>Conversion:</b> <span className="stat--vamp">+7% Omnivamp (Total / Current: {Math.floor((total.attack * 7 /100))} / {Math.floor((total.attack * 7  / 100)* (1 - modifier))}; <abbr title="For now it does not calculate your ability damage. placeholder with formula same for AA, just for AP"><span className="stat--ap">{Math.floor((total.ap * 7 / 100))} / {Math.floor((total.ap * 7 / 100)* (1 - modifierMres))}</span></abbr> )</span>  
            </p>  
          </div>
  
      },

      {
        name: 'Berserker\'s Greaves',
  
        health: 0,
        mana: 0,
        armor: 0,
        magres: 0,
        attack: 18,
        ap: 0,
        as: (base.asBase * 30/100),
        moveSpeed: 45,
        flatArmPen: 0,
        flatMagPen: 0,
        armPen: 0,
        magPen: 0,
        critChance: 0,
        critMultiplier: 0,
        ah: 0,
        armorReduction: 0,
        bootsPassive: false,
  
        description: 
          <div className='itemDescription'>
            <img src="../images/items/bootsBerserkers.png" alt="itemIcon" className="itemIcon" />

            <h3 className="stat--ad">+15 Attack Damage</h3>
            <h3 className="stat--as">+30% ({(base.asBase * 30 / 100).toFixed(3)}) Attack Speed</h3>
            <h3 className="stat--moveSpeed">+45 Movement Speed</h3>
  
          </div>
  
      },

      {
        name: 'Mercury\'s Treads',
  
        health: 200,
        mana: 0,
        armor: 0,
        magres: 35,
        attack: 0,
        ap: 0,
        as: 0,
        moveSpeed: 45,
        flatArmPen: 0,
        flatMagPen: 0,
        armPen: 0,
        magPen: 0,
        critChance: 0,
        critMultiplier: 0,
        ah: 0,
        armorReduction: 0,
        bootsPassive: 'Mercury',
  
        description: 
          <div className='itemDescription'>
            <img src="../images/items/bootsMercury.png" alt="itemIcon" className="itemIcon" />

            <h3 className="stat--hp">+150 Max Health</h3>
            <h3 className="stat--hp">+100% Health Regen</h3>
            <h3 className="stat--magres">+35 Magic Resistance</h3>
            <h3 className="stat--moveSpeed">+45 Movement Speed</h3>

            <p>
              <b>Dissolve:</b> reduces <span className="stat--ap">magic damage</span> taken by 12% 
            </p>  
          </div>
  
      },

      {
        name: 'Plated Steelcaps',
  
        health: 150,
        mana: 0,
        armor: 35,
        magres: 0,
        attack: 0,
        ap: 0,
        as: 0,
        moveSpeed: 45,
        flatArmPen: 0,
        flatMagPen: 0,
        armPen: 0,
        magPen: 0,
        critChance: 0,
        critMultiplier: 0,
        ah: 0,
        armorReduction: 0,
        bootsPassive: 'Steelcaps',
  
        description: 
          <div className='itemDescription'>
            <img src="../images/items/bootsSteelcaps.png" alt="itemIcon" className="itemIcon" />

            <h3 className="stat--hp">+150 Max Health</h3>
            <h3 className="stat--hp">+100% Health Regen</h3>
            <h3 className="stat--armor">+35 Armor</h3>
            <h3 className="stat--moveSpeed">+45 Movement Speed</h3>

            <p>
              <b>Block:</b> reduces <span className="stat--ad">physical damage</span> taken by 10% 
            </p>    
          </div>
  
      },

      {
        name: 'Ionian Boots of Lucidity',
  
        health: 150,
        mana: 0,
        armor: 0,
        magres: 0,
        attack: 0,
        ap: 0,
        as: 0,
        moveSpeed: 45,
        flatArmPen: 0,
        flatMagPen: 0,
        armPen: 0,
        magPen: 0,
        critChance: 0,
        critMultiplier: 0,
        ah: 30,
        armorReduction: 0,
        bootsPassive: 'Ionian',
  
        description: 
          <div className='itemDescription'>
            <img src="../images/items/bootsIonians.png" alt="itemIcon" className="itemIcon" />

            <h3 className="stat--hp">+150 Max Health</h3>
            <h3>+30 Ability Haste</h3>
            <h3 className="stat--moveSpeed">+45 Movement Speed</h3>

            <p>
              <b>Summoned:</b> Reduces summoner spell cooldowns by <b>15%</b>  
            </p>  
          </div>
  
      },

      {
        name: 'Boots of Mana',
  
        health: 0,
        mana: 0,
        armor: 0,
        magres: 0,
        attack: 0,
        ap: 55,
        as: 0,
        moveSpeed: 45,
        flatArmPen: 0,
        flatMagPen: 8,
        armPen: 0,
        magPen: 0,
        critChance: 0,
        critMultiplier: 0,
        ah: 0,
        armorReduction: 0,
        bootsPassive: false,
  
        description: 
          <div className='itemDescription'>
            <img src="../images/items/bootsMana.png" alt="itemIcon" className="itemIcon" />

            <h3 className="stat--ap">+55 Ability Power</h3>
            <h3 className="stat--mana">+150% Mana Regeneration</h3>
            <h3 className="stat--moveSpeed">+45 Movement Speed</h3>
            <h3 className="stat--magres">+8 Magic Penetration</h3>  
          </div>  
      },

      {
        name: 'Boots of Dynamism',
  
        health: 0,
        mana: 0,
        armor: 0,
        magres: 0,
        attack: 35,
        ap: 0,
        as: 0,
        moveSpeed: 45,
        flatArmPen: 10,
        flatMagPen: 0,
        armPen: 0,
        magPen: 0,
        critChance: 0,
        critMultiplier: 0,
        ah: 0,
        armorReduction: 0,
        bootsPassive: false,
  
        description: 
          <div className='itemDescription'>
            <img src="../images/items/bootsDynamism.png" alt="itemIcon" className="itemIcon" />

            <h3 className="stat--ad">+30 Attack Damage</h3>
            <h3 className="stat--moveSpeed">+45 Movement Speed</h3>
            <h3>Strike: <span className="stat--armor">+8 Armor Penetration</span></h3>  
          </div>
  
      },

    ];


  // State for inventory 
  const [Items, setItems ] = useState([{health: 0}, {armor: 0}, {attack: 0}, {attack: 0}, {attack: 0}]);

  //  State for Boots
  const [selectedBoots, setSelectedBoots] = useState(null);


  //  Logic for combining all bonus stat from items
  const NewBonusValues = function(items) {
    const aggregatedValues = {};
  
    items.forEach(item => {
      Object.keys(item).forEach(key => {
        if (key !== 'name' && key !== 'icon' && key !== 'description') {
          const value = item[key];
          if (typeof value === 'number' || typeof value === 'string') {
            aggregatedValues[key] = (aggregatedValues[key] || 0) + value;
          }
        }
      });
    });
  
    return aggregatedValues;
  };

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

  const handleBootsChange = (value) => {
    setSelectedBoots(value);

    const selectedBootId = boots[value].name;

    setItems(prevItems => {
      const newItems = [...prevItems];
      newItems[5] = boots[value]; // Assuming the boots slot is at index 5
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
        {/* Additional section for boots */}
        <div className='inventorySlot'>
          <div>
            <select onChange={(e) => handleBootsChange(e.target.value)}>
              <option value="" disabled>Select boots</option>
              {boots.map((boot, bootIndex) => (
                <option key={bootIndex} value={bootIndex}>
                  {boot.name}
                </option>
              ))}
            </select>
          </div>
          {selectedBoots !== null ? 
            boots[selectedBoots].description : 
            <div className="itemDescription">
              <p>Choose boots</p>
            </div>
          }
        </div>
      </div>)}
    </div>
  );
  }