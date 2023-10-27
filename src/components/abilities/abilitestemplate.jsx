export default function blank({currentLevel, mod, bonus, atk, def, champ}) {
  const abilities = [

    {
      description:
        <div className="abilityDescription">
          <h4>
          <span className="marker--ability">P</span> 
          </h4>
    
          <p>
            
          </p>
        </div>
    },

    {
      description:
        <div className="abilityDescription">
          <h4>
          <span className="marker--ability">1</span> 
          </h4>
    
          <h5>
          Cooldown: 
            {' '}{(y*mod.atkcdr).toFixed(1)} / 
            {' '}{(y*mod.atkcdr).toFixed(1)} / 
            {' '}{(y*mod.atkcdr).toFixed(1)} / 
            {' '}{(y*mod.atkcdr).toFixed(1)} 
          </h5>
            <h5 className="stat--mana">
          Cost: 
            {' '}{q} / 
            {' '}{q} / 
            {' '}{q} / 
            {' '}{q} 
          </h5>
    
          <p>
            
          </p>
        </div>
    },

    {
      description:
        <div className="abilityDescription">
          <h4>
          <span className="marker--ability">2</span> 
          </h4>
    
          <h5>
          Cooldown: 
            {' '}{(y*mod.atkcdr).toFixed(1)} / 
            {' '}{(y*mod.atkcdr).toFixed(1)} / 
            {' '}{(y*mod.atkcdr).toFixed(1)} / 
            {' '}{(y*mod.atkcdr).toFixed(1)} 
          </h5>
            <h5 className="stat--mana">
          Cost: 
            {' '}{q} / 
            {' '}{q} / 
            {' '}{q} / 
            {' '}{q} 
          </h5>
    
          <p>
            
          </p>
        </div>
    },
    {
      description:
        <div className="abilityDescription">
          <h4>
          <span className="marker--ability">3</span> 
          </h4>
    
          <h5>
          Cooldown: 
            {' '}{(y*mod.atkcdr).toFixed(1)} / 
            {' '}{(y*mod.atkcdr).toFixed(1)} / 
            {' '}{(y*mod.atkcdr).toFixed(1)} / 
            {' '}{(y*mod.atkcdr).toFixed(1)} 
          </h5>
            <h5 className="stat--mana">
          Cost: 
            {' '}{q} / 
            {' '}{q} / 
            {' '}{q} / 
            {' '}{q} 
          </h5>
    
          <p>
            
          </p>
        </div>
    },

    {
      description:
        <div className="abilityDescription">
          <h4>
          <span className="marker--ability">ULT</span> 
          </h4>
    
          <h5>
          Cooldown: 
            {' '}{(y*mod.atkcdr).toFixed(1)} / 
            {' '}{(y*mod.atkcdr).toFixed(1)} / 
            {' '}{(y*mod.atkcdr).toFixed(1)}
          </h5>
            <h5 className="stat--mana">
          Cost: 
            {' '}{q} / 
            {' '}{q} / 
            {' '}{q}
          </h5>
    
          <p>
            
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