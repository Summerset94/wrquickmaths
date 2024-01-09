export default function aurelionsol({currentLevel, mod, bonus, atk, def}) {
  const abilities = [
    
    {
      description:
        <div className="abilityDescription">
          <h4>
          <span className="marker--ability">P</span> CENTER OF THE UNIVERSE
          </h4>

          <h5 className="stat--ap">
            Damage:
          </h5>

          <p className="stat--ad">Pre-mitigation:{' '}{Math.round(((15+(7.4285 * (currentLevel - 1)))+(atk.ap * 25 / 100)))}
          </p>

          <p className="stat--ad">Post-mitigation: 
            {' '}{Math.round(((15+(7.4285 * (currentLevel - 1)))+(atk.ap * 25 / 100)) * (1 - mod.defMagRed))}
          </p> 

    
          <p>
            Stars orbit Aurelion Sol, dealing <abbr className="stat--ap" title='15 + (6 for levels 2-4 / 7 for levels 5-8 / 9 for levels 9 - 12) / 11 for levels 13-15'>15-119 (+25% AP) magic damage</abbr> when they hit an enemy.
          </p>
        </div>
    },

    {
      description:
        <div className="abilityDescription">
          <h4>
          <span className="marker--ability">1</span> STARSURGE
          </h4>
    
          <h5>
          Cooldown: 
            {' '}{(11*mod.atkcdr).toFixed(1)} / 
            {' '}{(10*mod.atkcdr).toFixed(1)} / 
            {' '}{(9*mod.atkcdr).toFixed(1)} / 
            {' '}{(8*mod.atkcdr).toFixed(1)} 
          </h5>
            <h5 className="stat--mana">
          Cost: 
            {' '}{60} / 
            {' '}{70} / 
            {' '}{80} / 
            {' '}{90} 
          </h5>

          <h5 className="stat--ap">
            Damage:
          </h5>

          <p className="stat--ad">Pre-mitigation: 
            {' '}{Math.round(((65)+(atk.ap * 65 / 100)))} / 
            {' '}{Math.round(((120)+(atk.ap * 65 / 100)))} / 
            {' '}{Math.round(((175)+(atk.ap * 65 / 100)))} / 
            {' '}{Math.round(((230)+(atk.ap * 65 / 100)))}
          </p>

          <p className="stat--ad">Post-mitigation: 
            {' '}{Math.round(((65)+(atk.ap * 65 / 100)) * (1 - mod.defMagRed))} / 
            {' '}{Math.round(((120)+(atk.ap * 65 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.round(((175)+(atk.ap * 65 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.round(((230)+(atk.ap * 65 / 100))* (1 - mod.defMagRed))}          
          </p>
    
          <p>
            Creates and launches a newborn star that detonates upon reaching the orbiting stars Outer Limit. Expands as it travels, dealing <span className="stat--ap">65 / 120 / 175 / 230 (+65% AP) magic damage</span> and stunning for 0.4 to 1.6 seconds based on distance travelled. 
          </p>
        </div>
    },

    {
      description:
        <div className="abilityDescription">
          <h4>
          <span className="marker--ability">2</span> CELESTIAL EXPANSION
          </h4>
    
          <h5>
          Cooldown: 
            {' '}{(8*mod.atkcdr).toFixed(1)} / 
            {' '}{(6*mod.atkcdr).toFixed(1)} / 
            {' '}{(4*mod.atkcdr).toFixed(1)} / 
            {' '}{(2*mod.atkcdr).toFixed(1)} 
          </h5>
            <h5 className="stat--mana">
          Cost: 
            {' '}{70} / 
            {' '}{80} / 
            {' '}{90} / 
            {' '}{100} 
          </h5>

          <h5 className="stat--ap">
            Damage:
          </h5>

          <p className="stat--ad">Pre-mitigation: 
            {' '}{Math.round(((20)+(atk.ap * 35 / 100)))} / 
            {' '}{Math.round(((25)+(atk.ap * 35 / 100)))} / 
            {' '}{Math.round(((30)+(atk.ap * 35 / 100)))} / 
            {' '}{Math.round(((35)+(atk.ap * 35 / 100)))}
          </p>

          <p className="stat--ad">Post-mitigation: 
            {' '}{Math.round(((20)+(atk.ap * 35 / 100)) * (1 - mod.defMagRed))} / 
            {' '}{Math.round(((25)+(atk.ap * 35 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.round(((30)+(atk.ap * 35 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.round(((35)+(atk.ap * 35 / 100))* (1 - mod.defMagRed))}          
          </p>
    
          <p>
            Aurelion Sol pushes his stars to the Outer limit for 3 seconds, causing them to orbit faster and deal <span className="stat--ap">20 / 25 / 30 / 35 (+35% AP) magic damage</span>. <br />
            When stars retract, Aurelion Sol gains <abbr title="30%" className="stat--moveSpeed">{Math.round(atk.moveSpeed * 30 / 100)} movement speed</abbr> that decays over 2 seconds.
          </p>
        </div>
    },

    {
      description:
        <div className="abilityDescription">
          <h4>
          <span className="marker--ability">3</span> COMET OF LEGEND
          </h4>
    
          <h5>
          Cooldown: 
            {' '}{(70*mod.atkcdr).toFixed(1)} / 
            {' '}{(60*mod.atkcdr).toFixed(1)} / 
            {' '}{(50*mod.atkcdr).toFixed(1)} / 
            {' '}{(40*mod.atkcdr).toFixed(1)} 
          </h5>
            <h5 className="stat--mana">
          Cost: 
            {' '}{60} / 
            {' '}{60} / 
            {' '}{60} / 
            {' '}{60} 
          </h5>
    
          <p>
            <b>Passive:</b> gradually gains up to <span className="stat--moveSpeed">20% movement speed</span> while moving in the same direction. <br />

            <b>ACTIVE:</b> takes flight, moving in the target direction and being able to steer by dragging for up to 9 seconds. While in flight, Aurelion Sol gains unobstructed vision and the ability to move through terrain.
          </p>
        </div>
    },

    {
      description:
        <div className="abilityDescription">
          <h4>
          <span className="marker--ability">ULT</span> VOICE OF LIGHT 
          </h4>
    
          <h5>
          Cooldown: 
            {' '}{(70*mod.atkcdr).toFixed(1)} / 
            {' '}{(60*mod.atkcdr).toFixed(1)} / 
            {' '}{(50*mod.atkcdr).toFixed(1)} 
          </h5>
            <h5 className="stat--mana">
          Cost: 
            {' '}{100} / 
            {' '}{100} / 
            {' '}{100}
          </h5>

          <h5 className="stat--ap">
            Damage:
          </h5>

          <p className="stat--ad">Pre-mitigation: 
            {' '}{Math.round(((150)+(atk.ap * 70 / 100)))} / 
            {' '}{Math.round(((250)+(atk.ap * 70 / 100)))} / 
            {' '}{Math.round(((350)+(atk.ap * 70 / 100)))}
          </p>

          <p className="stat--ad">Post-mitigation: 
            {' '}{Math.round(((150)+(atk.ap * 70 / 100)) * (1 - mod.defMagRed))} / 
            {' '}{Math.round(((250)+(atk.ap * 70 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.round(((350)+(atk.ap * 70 / 100))* (1 - mod.defMagRed))}      
          </p>
    
          <p>
          Exhales starfire, dealing <span className="stat--ap">150 / 250 / 350 (+70% AP) magic damage</span> and slowing by <span className="stat--moveSpeed">40% / 50% / 60%</span> for 2 seconds, Enemies hit are knocked back to the Outer Limit. 
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