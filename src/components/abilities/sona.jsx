export default function sona({currentLevel, mod, bonus, atk, def, champ, updateAbilitiesBonus}) {
  const abilities = [

    {
      description:
        <div className="abilityDescription">
          <h4>
          <span className="marker--ability">P</span> POWER CHORD
          </h4>
    
          <p>
            After casting three basic abilities, her next attack is enhanced to deal an additional <abbr title="20 + 10 per Level + 15% AP" className="stat--ap">{Math.round(10 + 10*currentLevel + (atk.ap * 15 / 100))} magic damage</abbr> with a bonus effect based on the last ability cast.
          </p>

          <p>
            <b>Hymn of Valor-Staccato:</b> Instead deals <abbr title="28 + 14 per Level + 21% AP" className="stat--ap">{Math.round(14 + 14*currentLevel + (atk.ap * 21 / 100))} magic damage</abbr>.
          </p>

          <p>
            <b>Aria of Perseverance-Diminuendo:</b> Reduces damage dealt by the target by <abbr title="25% + 4%AP" className="stat--ad">{Math.round(25 + (atk.ap*4/100))}%</abbr> for 3 seconds.
          </p>

          <p>
            <b>Song of Celerity-Tempo:</b> Slows by <abbr title="40%  + 4% AP" className="stat--moveSpeed">{Math.round(40 + (atk.ap*4/100))}%</abbr> for 2 seconds.
          </p>

          <p>
           Basic abilities grant a non-stacking aura for 3 seconds.
          </p>
        </div>
    },

    {
      description:
        <div className="abilityDescription">
          <h4>
          <span className="marker--ability">1</span> HYMN OF VALOR
          </h4>
    
          <h5>
          Cooldown: 
            {' '}{(8*mod.atkcdr).toFixed(1)}
          </h5>
            <h5 className="stat--mana">
          Cost: 
            {' '}{55} / 
            {' '}{60} / 
            {' '}{65} / 
            {' '}{70} 
          </h5>

          <h5 className="stat--ap">
            Damage:
          </h5>

          <p className="stat--ap">Pre-mitigation: 
            {' '}{Math.round(((40)+(atk.ap * 20 / 100)))} / 
            {' '}{Math.round(((75)+(atk.ap * 20 / 100)))} / 
            {' '}{Math.round(((110)+(atk.ap * 20 / 100)))} / 
            {' '}{Math.round(((145)+(atk.ap * 20 / 100)))}
          </p>

          <p className="stat--ap">Post-mitigation: 
            {' '}{Math.round(((40)+(atk.ap * 20 / 100)) * (1 - mod.defMagRed))} / 
            {' '}{Math.round(((75)+(atk.ap * 20 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.round(((110)+(atk.ap * 20 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.round(((145)+(atk.ap * 20 / 100))* (1 - mod.defMagRed))}          
          </p>

          <h5 className="stat--magres">
            Aura bonus damage:
          </h5>

          <p className="stat--ap">
                {Math.round(((10)+(atk.ap * 20 / 100)))} / 
            {' '}{Math.round(((15)+(atk.ap * 20 / 100)))} / 
            {' '}{Math.round(((20)+(atk.ap * 20 / 100)))} / 
            {' '}{Math.round(((25)+(atk.ap * 20 / 100)))}
          </p>
    
          <br />
          <p>
            Deals <span className="stat--ap">40 / 75 / 110 / 145 (+40% AP) magic damage</span> to two nearest enemies.
          </p>
          
          <p>
            <b>Aura:</b> Enhances allied champions' next attack to deal an additional <span className="stat--ap">10 / 15 / 20 / 25 (+20% AP) magic damage</span> 
          </p>
        </div>
    },

    {
      description:
        <div className="abilityDescription">
          <h4>
          <span className="marker--ability">2</span> ARIA OF PERSEVERANCE
          </h4>
    
          <h5>
          Cooldown: 
            {' '}{(10*mod.atkcdr).toFixed(1)}
          </h5>
            <h5 className="stat--mana">
          Cost: 
            {' '}{85} / 
            {' '}{90} / 
            {' '}{95} / 
            {' '}{100} 
          </h5>

          <h5 className="stat--hp">
            Healing:
          </h5>

          <p className="stat--hp">
                {Math.round(((30)+(atk.ap * 25 / 100)))} / 
            {' '}{Math.round(((45)+(atk.ap * 25 / 100)))} / 
            {' '}{Math.round(((60)+(atk.ap * 25 / 100)))} / 
            {' '}{Math.round(((75)+(atk.ap * 25 / 100)))}
          </p>

          <h5 className="stat--armor">
            Aura Shield:
          </h5>

          <p className="stat--hp">
                {Math.round(((25)+(atk.ap * 30 / 100)))} / 
            {' '}{Math.round(((55)+(atk.ap * 30 / 100)))} / 
            {' '}{Math.round(((85)+(atk.ap * 30 / 100)))} / 
            {' '}{Math.round(((115)+(atk.ap * 30 / 100)))}
          </p>
    
          <br />
          <p>
          Heals herself and another allied champion for <span className="stat--hp">30 / 45 / 60 / 78 (<span className="stat--ap">+25% AP</span>) health</span>.
          </p>
          
          <p>
            <b>Aura:</b> Grants allied champions a shield that absorbs <span className="stat--hp">25 / 55 / 85 / 115 (<span className="stat--ap">+30% AP</span>) damage</span> for 3 seconds.
          </p>
        </div>
    },
    {
      description:
        <div className="abilityDescription">
          <h4>
          <span className="marker--ability">3</span> SONG OF CELERITY
          </h4>
    
          <h5>
          Cooldown: 
            {' '}{(14*mod.atkcdr).toFixed(1)}
          </h5>
            <h5 className="stat--mana">
          Cost: 
            {' '}{80}
          </h5>

          <br />
          <p>
          Gains <span className="stat--moveSpeed">10 / 11 / 12 / 13% (<span className="stat--ap">+3% AP</span>) Movement Speed</span> for 5 seconds.
          </p>

          
          <p>
            <b>Aura:</b> Grants allied champions <span className="stat--moveSpeed">10 / 11 / 12 / 13% (<span className="stat--ap">+3% AP</span>) Movement Speed</span> 
          </p>
        </div>
    },

    {
      description:
        <div className="abilityDescription">
          <h4>
          <span className="marker--ability">ULT</span> CRESCENDO
          </h4>
    
          <h5>
          Cooldown: 
            {' '}{(80*mod.atkcdr).toFixed(1)} / 
            {' '}{(70*mod.atkcdr).toFixed(1)} / 
            {' '}{(60*mod.atkcdr).toFixed(1)}
          </h5>
            <h5 className="stat--mana">
          Cost: 
            {' '}{100}
          </h5>

          <h5 className="stat--ap">
            Damage:
          </h5>

          <p className="stat--ap">Pre-mitigation: 
            {' '}{Math.round(((150)+(atk.ap * 50 / 100)))} / 
            {' '}{Math.round(((250)+(atk.ap * 50 / 100)))} / 
            {' '}{Math.round(((350)+(atk.ap * 50 / 100)))}
          </p>

          <p className="stat--ap">Post-mitigation: 
            {' '}{Math.round(((150)+(atk.ap * 50 / 100)) * (1 - mod.defMagRed))} / 
            {' '}{Math.round(((250)+(atk.ap * 50 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.round(((350)+(atk.ap * 50 / 100))* (1 - mod.defMagRed))}
          </p>

          <br />
    
          <p>
           <b>Passive:</b> Reduces the base cooldown of Sona's basic abilities by 10 / 20 / 30%.
          </p>

          <p>
            <b>Active:</b> Plays an irresistible chord, dealing <span className="stat--ap">150 / 250 / 350 (+50% AP) magic damage</span> and stunning for 1 seconds.
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