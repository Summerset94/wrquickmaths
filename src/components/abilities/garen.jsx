export default function garen({currentLevel, mod, bonus, atk, def, champ}) {
  const abilities = [
    {
      description:
        <div className="abilityDescription">
          <h4>
          <span className="marker--ability">P</span> PERSEVERANCE
          </h4> 

          <p>
            Garen regenerates <abbr title="1.2% - 4% (based on level)" className="stat--hp">{(1 + 0.2 * currentLevel).toFixed(1)}% of his missing health</abbr> per second. <br />
            Perseverance is disabled for 5 seconds whenever Garen takes damage from enemy champions, turrets, or epic monsters, or is hit by attacks or abilities, refreshing on subsequent damage and hits against him.
          </p>

          <p>
            When casting Demacian Justice and the target dies, moves out of range, becomes untargetable, or activates Zhonya’s Hourglass or Guardian Angel, spell will go on a 5s Cooldown.
          </p>
        </div>
    },

    {
      description:
        <div className="abilityDescription">
          <h4>
          <span className="marker--ability">1</span> DECISIVE STRIKE
          </h4>
    
          <h5>
          Cooldown: 
            {' '}{(8*mod.atkcdr).toFixed(1)} / 
            {' '}{(8*mod.atkcdr).toFixed(1)} / 
            {' '}{(8*mod.atkcdr).toFixed(1)} / 
            {' '}{(8*mod.atkcdr).toFixed(1)} 
          </h5>

          <h5 className="stat--ad">
            Damage:
          </h5>

          <p className="stat--ad">Pre-mitigation: 
            {' '}{Math.round(((30)+(atk.attack * 40 / 100)))} / 
            {' '}{Math.round(((70)+(atk.attack * 40 / 100)))} / 
            {' '}{Math.round(((110)+(atk.attack * 40 / 100)))} / 
            {' '}{Math.round(((150)+(atk.attack * 40 / 100)))}
          </p>

          <p className="stat--ad">Post-mitigation: 
            {' '}{Math.round(((30)+(atk.attack * 40 / 100)) * (1 - mod.defPhysRed))} / 
            {' '}{Math.round(((70)+(atk.attack * 40 / 100))* (1 - mod.defPhysRed))} / 
            {' '}{Math.round(((110)+(atk.attack * 40 / 100))* (1 - mod.defPhysRed))} / 
            {' '}{Math.round(((150)+(atk.attack * 40 / 100))* (1 - mod.defPhysRed))}          
          </p>
    
          <p>
          Breaks free from all slows, becoming immune to them for 0.5 seconds and gaining <span className="stat--moveSpeed">35% Movement Speed</span> for 3 seconds. <br />

          The next attack within 3 seconds is empowered to deal an additional <span className="stat--ad">30 / 70 / 110 / 150 (+40% AD) physical damage</span> and silence the target for 1.5 seconds.
          </p>
        </div>
    },

    {
      description:
        <div className="abilityDescription">
          <h4>
          <span className="marker--ability">2</span> COURAGE
          </h4>
    
          <h5>
          Cooldown: 
            {' '}{(18*mod.atkcdr).toFixed(1)} / 
            {' '}{(16*mod.atkcdr).toFixed(1)} / 
            {' '}{(14*mod.atkcdr).toFixed(1)} / 
            {' '}{(12*mod.atkcdr).toFixed(1)} 
          </h5>
    
          <p>
          Reduce damage taken for <b>2 / 3 / 4 / 5 seconds</b>. For the 1 second, damage is reduced by <b className="stat--armor">70%</b> and Garen gains 70% Tenacity. <br />
          Damage is reduced by <b className="stat--armor">30%</b> for the remaining duration.
          <br />
          Tenacity reduces the duration of most movement impairing effects.
          </p>
        </div>
    },

    {
      description:
        <div className="abilityDescription">
          <h4>
          <span className="marker--ability">3</span> JUDGMENT
          </h4>
    
          <h5>
          Cooldown: 
            {' '}{(9*mod.atkcdr).toFixed(1)} / 
            {' '}{(9*mod.atkcdr).toFixed(1)} / 
            {' '}{(9*mod.atkcdr).toFixed(1)} / 
            {' '}{(9*mod.atkcdr).toFixed(1)} 
          </h5>

          <h5 className="stat--ad">
           Tick damage:
          </h5>

          <p className="stat--ad">Pre-mitigation: 
            {' '}{Math.round(((11)+(atk.attack * 30 / 100)))} / 
            {' '}{Math.round(((14)+(atk.attack * 30 / 100)))} / 
            {' '}{Math.round(((17)+(atk.attack * 30 / 100)))} / 
            {' '}{Math.round(((20)+(atk.attack * 30 / 100)))}
          </p>

          <p className="stat--ad">Post-mitigation: 
            {' '}{Math.round(((11)+(atk.attack * 30 / 100)) * (1 - mod.defPhysRed))} / 
            {' '}{Math.round(((14)+(atk.attack * 30 / 100))* (1 - mod.defPhysRed))} / 
            {' '}{Math.round(((17)+(atk.attack * 30 / 100))* (1 - mod.defPhysRed))} / 
            {' '}{Math.round(((20)+(atk.attack * 30 / 100))* (1 - mod.defPhysRed))}          
          </p>

          <h5 className="stat--ad">
           Crit tick damage:
          </h5>

          <p className="stat--ad">Pre-mitigation: 
            {' '}{Math.round(((11)+(atk.attack * 30 / 100)) * (135 / 100))} / 
            {' '}{Math.round(((14)+(atk.attack * 30 / 100)) * (140 / 100))} / 
            {' '}{Math.round(((17)+(atk.attack * 30 / 100)) * (145 / 100))} / 
            {' '}{Math.round(((20)+(atk.attack * 30 / 100)) * (150 / 100))}
          </p>

          <p className="stat--ad">Post-mitigation: 
            {' '}{Math.round(((11)+(atk.attack * 30 / 100)) * (1 - mod.defPhysRed) * (135 / 100))} / 
            {' '}{Math.round(((14)+(atk.attack * 30 / 100))* (1 - mod.defPhysRed) * (140 / 100))} / 
            {' '}{Math.round(((17)+(atk.attack * 30 / 100))* (1 - mod.defPhysRed) * (145 / 100))} / 
            {' '}{Math.round(((20)+(atk.attack * 30 / 100))* (1 - mod.defPhysRed) * (150 / 100))}          
          </p>
    
          <p>
          Rapidly spin in a bladestorm for 3 seconds, dealing <span className="stat--ad">11 / 14 / 17 / 20 (+30% AD) physical damage 8 times</span>, Enemies hit by the bladestorm's edge are critically struck for <span className="stat--critChance"> 135% / 140% / 145% / 150% damage</span>. <br />

          <b>Re-cast:</b> Stops spinning. <br />

          Deals 60% damage to minions.
          </p>
        </div>
    },

    {
      description:
        <div className="abilityDescription">
          <h4>
          <span className="marker--ability">ULT</span> DEMACIAN JUSTICE
          </h4>
    
          <h5>
          Cooldown: 
            {' '}{(70*mod.atkcdr).toFixed(1)} / 
            {' '}{(65*mod.atkcdr).toFixed(1)} / 
            {' '}{(60*mod.atkcdr).toFixed(1)}
          </h5>
    
          <p>
          Calls forth the might of Demacia to execute an enemy champion, dealing <span className="stat--critChance">150 / 250 / 350 +15% (<span className="stat--ad"> +0.12% bonus AD</span>) true damage of the target's missing health</span>. <br />
           Nearby enemies take <span className="stat--critChance">75 +7.5% (<span className="stat--ad">+0.06% AD</span>) true damage of their missing health</span>. <br />
          Deals a max of 600 damage to epic monsters.
          </p>
        </div>
    }
  ];

  return(
    <>
    {abilities.map((ability, index) => (
      <div className="abilitiesTile">
        <div key={index}>{ability.description}</div>
        </div>
    ))}   
    </>
     
  )
}