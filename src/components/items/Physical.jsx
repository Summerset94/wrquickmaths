import '../../styles/StatColors.css'

/*
ATK for current total CURRENT attacker stats;
DEF for total CURRENT  defender stats;
BASE_ATK/DEF for base stats;
BONUS_ATK/DEF for bonus stats;
item_stat for item self stats
*/

const physical = [
  {
    name: 'Guardian Angel',
    icon: '../../images/items/Guardian_Angel.png',
    item_attack: 40,
    item_armor: 40,
    description: <div className='itemDescription'>
      <h3 className='stat--ad'>+{item_attack} Attack Damage</h3>
      <h3 className='stat--armor'>+{item_armor} Armor</h3>

      <p>
        <b>Resurrect: </b> Upon taking lethal damage, restores <b className='stat--hp'>{BASE_ATK.health / 2} base Health</b> {DEF.mana && <span>and <b className='stat--mana'>{DEF.mana * 0.3} maximum Mana</b></span>} after 4 Seconds of Stasis. (210s. Cooldown)
      </p>
    </div>
  },

  {
    name: 'Bloodthirster',
    icon: '../images/items/Bloodthirster.png',
    attack: 55,
    critChance: 0.25,
    description: <div className='itemDescription'>
      <h3 className='stat--ad'>+ {attack} Attack Damage</h3>
      <h3 className='stat--critChance'>+ {Number(critChance*100)}% Critical Rate</h3>

      <p><b>Bloody: </b> <b className='stat--vamp'>+{(total.attack * 12 / 100)}  Physical Vamp</b></p>
      <p><b>Bloodsworn: </b> <b className='stat--vamp'>Physical Vamp</b> overheals you, generating a shield that absorbs <b className='stat--hp'>{(40 + 20 * (currentLevel - 1))}</b> (40 + 20/level) damage. This shield decays out of combat over 10 seconds</p>
    </div>
  },

  {
    name: 'Statikk Shiv',
    icon: '../../images/items/Statikk_Shiv.png',
    as: 0.35,
    item_critChance: 0.25,
    item_moveSpeed: (0.05 * BASE_ATK.moveSpeed) ,
    description: <div className='itemDescription'>
      <h3 className='stat--as'>+ {Number(BASE_ATK.asBase * as).toFixed(3)} Attack Speed</h3>
      <h3 className='stat--critChance'>+ {Number(item_critChance*100)}% Critical Rate</h3>

      <p>
        <b>Electric: </b> <b className='stat--moveSpeed'>+{(BASE_ATK.moveSpeed * item_moveSpeed)} Movement Speed </b>
      </p>
        
      <p>
        <b>Energized: </b>Moving and attacking will generate an <b>Energized Attack </b>
      </p>

      <p>
        <b>Shiv Lightning:</b> Energized Attack gain <b className='stat--ap'>{(50 + 5 * (currentLevel - 1))} Magic Damage</b>, that bounces to <b>5</b> nearby enemies. This effect's damage can <b className='stat--critChance'>crit</b> and applies this effect of <b classname='stat--ap'>Energized Attacks</b> to all enemies hit.
      </p> 
    </div>
  },

  {
    name: 'Blade of the Ruined King',
    icon: '../../images/items/Blade_of_the_Ruined_King.png',
    item_attack: 20,
    item_as: (BASE_ATK.asBase * 0.35),
    description: <div className='itemDescription'>
      <h3 className='stat--ad'>+{item_attack} Attack Damage</h3>
      <h3 className='stat--as'>+ {Number(BASE_ATK.asBase * 0.35).toFixed(3)} Attack Speed</h3>

      <p>
        <b>Thirst:</b> <b className='stat--vamp'>+{(ATK.attack * 10 / 100)}  Physical Vamp</b>
      </p>

      <p>
        <b>Ruined Strikes:</b> Attacks deal <span className='stats--ad'>bonus physical damage</span> equal to the <span className='stats--ad'>6%</span>( <span>9%</span> for Melee) on-hit. Min damage: 15. Max damage vs monsters: 90
      </p>

      <p>
        <b>Drain:</b> Hitting a champion with 3 consecutive attacks or ablilties deals <span className='stats-ap'>{30 + 5 * (currentLevel - 1)} magic damage</span> and steals 25% of their Move Speed ({DEF.moveSpeed}) for 2 Seconds (60s Cooldown).
      </p>

    </div>
  },

  {
    name: 'Rapid Firecannon',
    icon: '../../images/items/Rapid_Firecannon.png',
    item_critChance: 0.25,
    item_as: (BASE_ATK.asBase * 0.35),
    item_moveSpeed: (0.05 * BASE_ATK.moveSpeed),
    description:
      <div className='description'>
        <h3 className='stat--as'>+35% ({item_as}) Attack Speed</h3>
        <h3 className='stat--critChance'>+{item_critChance*100}% Critical Rate</h3>

        <p>
          <b>Hunter's Swiftness:</b> <span className='stat--moveSpeed'>+{item_moveSpeed} Move Speed.</span>
        </p>

        <p>
          <b>Energized:</b> moving and attacking will generate an <span className='stat--ad'>Energized Attack</span>. Energized Attacks generate 25% faster. gain <span className='stat--ap'>{(50 + 5 * (currentLevel - 1))} bonus magic damage</span> and gain 125 attack range. Melee attacks gets 50 bonus range.
        </p>
      </div>
  },

  {
    name: 'Runaan\'s Hurricane',
    icon: '../../images/items/Runaan\'s_Hurricane.png',
    item_critChance: 0.25,
    item_as: (BASE_ATK.asBase * 0.45),
    description:
      <div className='description'>
        <h3 className='stat--as'>+45% ({item_as}) Attack Speed</h3>
        <h3 className='stat--critChance'>+ {item_critChance*100}% Critical Rate</h3>

        <p>Attacks strike 2 dditional nearby enemies. Each attack  dealing <b className='stat--ad'>{ATK.attack*0.55}</b>. These attacks CAN critically hit and trigger on-hit effects.</p>        
      </div>
  },

  {
    name: 'Youmuu\'s Ghostblade',
    icon: '../../images/Items/Youmuus.png',
    item_attack: 55,
    item_AH: 15,
    item_flatArmPen: 15,

    description:
      <div className='description'>
        <h3 className='stat--ad'>+{item.attack} Attack Damage</h3>
        <h3>+{item_AH} Ability Haste</h3>
        <h3>+{item_flatArmPen} Lethality/flat armor penetration</h3>

        <p>Moving builds up <b>Momentum</b> stacks, granting up to 40 movement speed at 100 stacks. Stacks decay when movement impaired. </p>
        <p>Attacking with max <b>Momentum</b> consumes all stacks and grants <b className='stat--as'>{BAS.BASE_ATK.baseAs*0.25} Attack Speed</b> for 4 seconds.</p>
      </div>
  },
]