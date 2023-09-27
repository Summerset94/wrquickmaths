import '../../styles/StatColors.css'

const physical = [
  {
    name: 'Guardian Angel',
    icon: '../images/items/Guardian_Angel.png',
    attack: 40,
    armor: 40,
    description: <div className='itemDescription'>
      <h3 className='stat--ad'>+{attack} Attack Damage</h3>
      <h3 className='stat--armor'>+{armor} Armor</h3>

      <p>
        <b>Resurrect: </b> Upon taking lethal damage, restores <b className='stat--hp'>{baseMemo.health / 2} base Health</b> {totalMemo.mana && <span>and <b className='stat--mana'>{totalMemo * 0.3} maximum Mana</b></span>} after 4 Seconds of Stasis. (210s. Cooldown)
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

      <p><b>Bloody: </b> <b className='stat--vamp'>+{(totalMemo.attack * 12 / 100)}  Physical Vamp</b></p>
      <p><b>Bloodsworn: </b> <b className='stat--vamp'>Physical Vamp</b> overheals you, generating a shield that absorbs <b className='stat--hp'>{(40 + 20 * (currentLevel - 1))}</b> (40 + 20/level) damage. This shield decays out of combat over 10 seconds</p>
    </div>
  },

  {
    name: 'Statikk Shiv',
    icon: '../images/items/Statikk_Shiv.png',
    as: 0.35,
    critChance: 0.25,
    moveSpeed: 0.05,
    description: <div className='itemDescription'>
      <h3 className='stat--as'>+ {Number(baseMemo.asBase * as).toFixed(3)} Attack Speed</h3>
      <h3 className='stat--critChance'>+ {Number(critChance*100)}% Critical Rate</h3>

      <p>
        <b>Electric: </b> <b className='stat--moveSpeed'>+{(baseMemo.moveSpeed * moveSpeed)} Movement Speed </b>
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
    icon: '../images/items/Blade_of_the_Ruined_King.png',
    attack: 20,
    as: 0.35,
    description: <div className='itemDescription'>
      <h3 className='stat--ad'>+{attack} Attack Damage</h3>
      <h3 className='stat--as'>+ {Number(baseMemo.asBase * as).toFixed(3)} Attack Speed</h3>

      <p>
        <b>Thirst:</b> <b className='stat--vamp'>+{(totalMemo.attack * 10 / 100)}  Physical Vamp</b>
      </p>
    </div>
  },
]