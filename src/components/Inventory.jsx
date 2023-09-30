import { useState, useEffect } from "react";
import React from 'react';
import { Tooltip } from 'react-tooltip'
import '../styles/StatColors.css'


export default function Inventory({base, bonus, total, handleBonusChange, currentLevel}) { 
  

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
  
        <p><b>Bloody: </b> <b className='stat--vamp'>+{Math.floor(total.attack * 12 / 100)}  Physical Vamp</b></p>
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
          <b>Thirst:</b> <b className='stat--vamp'>+{Math.floor(total.attack * 10 / 100)}  Physical Vamp</b>
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
          <p><b>Spellblade:</b>After casting an ability next basic attack deals <abbr title="200% BASE"><span className='stat--ad'>+{(base.attack * 2).toFixed(2)} Physical Damage</span></abbr> (1.5s Cooldown)</p>
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
        <p><b>Lifegrip:</b> Triggering Lifeline grants you <span className='stat--ad'>30 Attack Damage</span> and <span className="stat--vamp">10 % Omnivamp</span> until out of combat</p>

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
    }
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
  }, [Items]);

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