import '../../styles/StatColors.css'

/*
stats
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
    critMultiplier: 1.75

    available prefixes: base, bonus, total
*/

const physical = [
  {
    name: 'Guardian Angel',
    icon: '../../images/items/Guardian_Angel.png',
    attack: 40,
    armor: 40,
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
    attack: 55,
    critChance: 0.25,
    description: <div className='itemDescription'>
      <h3 className='stat--ad'>+ {55} Attack Damage</h3>
      <h3 className='stat--critChance'>+ {Number(0.25*100)}% Critical Rate</h3>

      <p><b>Bloody: </b> <b className='stat--vamp'>+{Math.floor(total.attack * 12 / 100)}  Physical Vamp</b></p>
      <p><b>Bloodsworn: </b> <b className='stat--vamp'>Physical Vamp</b> overheals you, generating a shield that absorbs <b className='stat--hp'>{(40 + 20 * (currentLevel - 1))}</b> (40 + 20/level) damage. This shield decays out of combat over 10 seconds</p>
    </div>
  },

  {
    name: 'Statikk Shiv',
    icon: '../../images/items/Statikk_Shiv.png',
    as: 0.35,
    critChance: 0.25,
    moveSpeed: (0.05 * base.moveSpeed),

    description: <div className='itemDescription'>
      <h3 className='stat--as'>+{Number(base.asBase * 0.35).toFixed(3)} Attack Speed</h3>
      <h3 className='stat--critChance'>+ 2% Critical Rate</h3>

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
    icon: '../../images/items/Blade_of_the_Ruined_King.png',
    attack: 20,
    as: (base.asBase * 0.35),

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
    icon: '../../images/items/Rapid_Firecannon.png',
    critChance: 0.25,
    as: (base.asBase * 0.35),
    moveSpeed: (0.05 * base.moveSpeed),
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
    icon: '../../images/items/Runaan\'s_Hurricane.png',
    critChance: 0.25,
    as: (base.asBase * 0.45),
    description:
      <div className='itemDescription'>
        <h3 className='stat--as'>+45% ({(base.asBase * 0.45).toFixed(3)}) Attack Speed</h3>
        <h3 className='stat--critChance'>+ {0.25*100}% Critical Rate</h3>

        <p>Attacks strike 2 additional nearby enemies. Each attack  dealing <b className='stat--ad'>{Math.floor(total.attack*0.55)}</b>. These attacks CAN critically hit and trigger on-hit effects.</p>        
      </div>
  },

  {
    name: 'Youmuu\'s Ghostblade',
    icon: '../../images/Items/Youmuus.png',
    attack: 55,
    ah: 15,
    flatArmPen: 15,

    description:
      <div className='description'>
        <h3 className='stat--ad'>+{55} Attack Damage</h3>
        <h3>+{15} Ability Haste</h3>
        <h3>+{15} Lethality/flat armor penetration</h3>

        <p>Moving builds up <b>Momentum</b> stacks, granting up to 40 movement speed at 100 stacks. Stacks decay when movement impaired. </p>
        <p>Attacking with max <b>Momentum</b> consumes all stacks and grants <b className='stat--as'>25% ({Number(base.baseAs*0.25).toFixed(3)}) Attack Speed</b> for 4 seconds.</p>
      </div>
  },

  {
    name: 'Duskblade of Draktharr',
    icon: '../../images/Items/Duskblade.png',
    attack: 55,
    ah: 10,
    flatArmPen: 15,

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
    icon: '../../images/Items/Steraks.png',
    health: 400,
    attack: (base.attack*0.5),
    item_shield: (bonus.health * 0.75),
    
    description:
      <div className='itemDescription'>
        <h3 className='stat--hp'>+{health} Max Health</h3>
        <h3>Heavy Handed: <abbr title="(50% of BASE attack damage)"><span className='stat--ad'>+{base.attack*0.5}Attack Damage</span></abbr> as BONUS attack damage</h3>

        <p><b>Lifeline:</b> Damage that puts you under <abbr title="(35% MAX health)"><span className='stat--hp'>{Math.floor(total.health*0.35)}</span></abbr> triggers a <abbr title="(75% of BONUS health)">{bonus.health * 0.75}<span className='stat--hp'></span></abbr> that decays Over 3 seconds (90 sec Cooldown)</p>

        <p><b>Sterak's fury:</b> Triggering Lifeline also increases your size and grants <span className='stat--ap'>30% Tenacity</span> for 8 seconds.</p>
      </div>
  },

  {
    name: 'Infinity Edge',
    icon: '../../images/Infinity_Edge.png',
    attack: 55,
    critChance: 0.25,
    critMultiplier: 0.25,

    description:
      <div className='itemDescription'>
        <h3 className='stat--ad'>+{55} Attack Damage</h3>
        <h3 className='stat--critChance'>+{0.25*100}% Critical Rate</h3>

        <p><b>Infinity:</b> Critical Strikes deal 205% damage instead of 175%</p>
      </div>
  },


];

export {physical};