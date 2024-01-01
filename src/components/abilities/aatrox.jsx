export default function aatrox({currentLevel, mod, bonus, atk, def}) {
  const abilities = [
    {
      description: <div className="abilityDescription">
      <h4><span className="marker--ability">P</span> DEATHBRINGER STANCE</h4>
      <p>
        Enhances his next attack every <abbr title="24 seconds">{(24*mod.atkcdr).toFixed(1)} seconds</abbr> to deal bonus <abbr title="5%-15% based on level, pre/post-mitigation stats" className="stat--ad">{(Math.round(def.health * (5 + (10/14 * currentLevel -1)) / 100))} / {(Math.round((def.health * (5 + (10/14 * currentLevel -1)) / 100) * (1 - mod.defPhysRed)))} physical damage</abbr>  and <span className="stat--hp">heals</span>  himself for the same amount. <br />
        Stance's cooldown is reduced by 3 seconds when Aatrox hits a Champion or large monster with an attack or ability. <br />
        Max <b>50</b> damage against monsters. <br />
      </p>
    </div>
    },

    {
      description:
        <div className="abilityDescription">
          <h4><span className="marker--ability">1</span> THE DARKIN BLADE</h4>
          <h5>Cooldown:{' '}
          {' '}{(13*mod.atkcdr).toFixed(1)} /  
          {' '}{(11*mod.atkcdr).toFixed(1)} /  
          {' '}{(9*mod.atkcdr).toFixed(1)} /  
          {' '}{(7*mod.atkcdr).toFixed(1)}
          </h5>

          <h5 className="stat--ad">Damage:</h5>
          <p className="stat--ad">
            Pre-mitigation: 
            {' '}{Math.round(((15)+(atk.attack * 70 / 100)))} / 
            {' '}{Math.round(((45)+(atk.attack * 75 / 100)))} / 
            {' '}{Math.round(((75)+(atk.attack * 80 / 100)))} / 
            {' '}{Math.round(((105)+(atk.attack * 85 / 100)))}
          </p>
          
          <p className="stat--ad">
            Post-mitigation: 
            {' '}{Math.round(((15)+(atk.attack * 70 / 100)) * (1 - mod.defPhysRed))} / 
            {' '}{Math.round(((45)+(atk.attack * 75 / 100))* (1 - mod.defPhysRed))} / 
            {' '}{Math.round(((75)+(atk.attack * 80 / 100))* (1 - mod.defPhysRed))} / 
            {' '}{Math.round(((105)+(atk.attack * 85 / 100))* (1 - mod.defPhysRed))}
          </p>

          <p>
            Swings his giant blade, dealing <span className="stat--ad">15 / 45 / 75 / 105 (+70% / 75% / 80% / 85% AD) physical damage</span>. This ability can be cast 2 more times, with each cast dealing 25% more damage.            
          </p>

          <p>
          Deals 65% damage to minions.
          </p>

          <p>
            Deals 70% damage to monsters.
          </p>
        </div>
    },

    {
      description:
        <div className="abilityDescription">
          <h4>
            <span className="marker--ability">2</span> INFERNAL CHAINS
          </h4>

          <h5>
            Cooldown: 
              {' '}{(15*mod.atkcdr).toFixed(1)} / 
              {' '}{(14*mod.atkcdr).toFixed(1)} / 
              {' '}{(13*mod.atkcdr).toFixed(1)} / 
              {' '}{(12*mod.atkcdr).toFixed(1)} 
          </h5>

          <h5 className="stat--ad">
            Damage:
          </h5>

          <p className="stat--ad">
            Pre-mitigation: 
            {' '}{Math.round(((24)+(atk.attack * 40 / 100)))} 
            {' '}/ {Math.round(((40)+(atk.attack * 40 / 100)))} 
            {' '}/ {Math.round(((55)+(atk.attack * 40 / 100)))} 
            {' '}/ {Math.round(((70)+(atk.attack * 40 / 100)))}
          </p>
          
          <p className="stat--ad">
            Post-mitigation: 
            {' '}{Math.round(((25)+(atk.attack * 40 / 100)) * (1 - mod.defPhysRed))} / 
            {' '}{Math.round(((40)+(atk.attack * 40 / 100))* (1 - mod.defPhysRed))} / 
            {' '}{Math.round(((55)+(atk.attack * 40 / 100))* (1 - mod.defPhysRed))} / 
            {' '}{Math.round(((70)+(atk.attack * 40 / 100))* (1 - mod.defPhysRed))}          
          </p>

          <p>
          Sends a chain dealing <span className="stat--ad">25 / 40 / 55 / 70 (+40% AD) physical damage</span>  to the first enemy hit and slowing them by 25% for 1.5 seconds. <br />
          If a champion or large monster remains within the imapct area after 1.5 seconds, they will be dragged back to the center and take the same damage again. <br />
          Deals double damage to minions.
          </p>
        </div>
    },

    {
      description:
        <div className="abilityDescription">
          <h4><span className="marker--ability">3</span> UMBRAL DASH</h4>
          <h5>Cooldown: 
          {' '}{(8*mod.atkcdr).toFixed(1)} / 
          {' '}{(7*mod.atkcdr).toFixed(1)} / 
          {' '}{(6*mod.atkcdr).toFixed(1)} / 
          {' '}{(5*mod.atkcdr).toFixed(1)} 
          </h5>

          <h5 className="stat--vamp">
            Vampirism:
          </h5>

          <p className="stat--vamp">Pre-mitigation: 
          {' '}{Math.round(((atk.attack * 19 / 100)))} /             
          {' '}{Math.round(((atk.attack * 21 / 100)))} /     
          {' '}{Math.round(((atk.attack * 23 / 100)))} / 
          {' '}{Math.round(((atk.attack * 25 / 100)))}</p>
          
          <p className="stat--vamp">Post-mitigation: 
          {' '}{Math.round(((atk.attack * 19 / 100)) * (1 - mod.defPhysRed))} / 
          {' '}{Math.round(((atk.attack * 21 / 100))* (1 - mod.defPhysRed))} / 
          {' '}{Math.round(((atk.attack * 23 / 100))* (1 - mod.defPhysRed))} / 
          {' '}{Math.round(((atk.attack * 25 / 100))* (1 - mod.defPhysRed))}          
          </p>

          <p>
            <b>Passive:</b> Aatrox gains <span className="stat-vamp">19% / 21% / 23% / 25% physical vamp</span> against enemy champions. <br />
            <b>Active:</b>  Dashes forward. This resets Aatrox's normal attack. Usable whie casting other abilities.            
          </p>
        </div>
    },

    {
      description:
        <div className="abilityDescription">
          <h4>
          <span className="marker--ability">ULT</span> WORLD ENDER
          </h4>

          <h5>
          Cooldown: 
            {' '}{(75*mod.atkcdr).toFixed(1)} / 
            {' '}{(65*mod.atkcdr).toFixed(1)} / 
            {' '}{(55*mod.atkcdr).toFixed(1)}
          </h5>

          <h5 className="stat--vamp">
            Vampirism (Dash + ult combined):
          </h5>
          
          <p className="stat--vamp">Pre-mitigation: 
          {' '}{Math.round(((atk.attack * 19 /100 * 1.5)))} /             
          {' '}{Math.round(((atk.attack * 21 /100 * 1.5)))} /     
          {' '}{Math.round(((atk.attack * 23 /100 * 1.5)))} / 
          {' '}{Math.round(((atk.attack * 25 /100 * 1.5)))}</p>
          
          <p className="stat--vamp">Post-mitigation: 
          {' '}{Math.round(((atk.attack * 19 /100 * 1.5)) * (1 - mod.defPhysRed))} / 
          {' '}{Math.round(((atk.attack * 21 /100 * 1.5))* (1 - mod.defPhysRed))} / 
          {' '}{Math.round(((atk.attack * 23 /100 * 1.5))* (1 - mod.defPhysRed))} / 
          {' '}{Math.round(((atk.attack * 25 /100 * 1.5))* (1 - mod.defPhysRed))}          
          </p>



          <p>
          Unleashes his demonic form for <b>10</b> seconds, gaining: <abbr className="stat--ad" title='30% / 40% / 50%'>
            {Math.round(atk.attack * 30 / 100) } / 
            {' '}{Math.round(atk.attack * 40 / 100) }  / 
            {' '}{Math.round(atk.attack * 50 / 100) } Attack Damage</abbr>, <span className="stat--hp">25% / 35% / 45% increased healing</span> and <abbr title="60% / 80% / 100%" className="stat--moveSpeed">
              {Math.round(atk.moveSpeed * 60 / 100)} / 
              {' '}{Math.round(atk.moveSpeed * 80 / 100)} / 
              {' '}{Math.round(atk.moveSpeed)} decaying Movement Speed</abbr>. During this time, Umbral Dash's Physical Vamp is increased to <span className="stat--vamp">50%</span>. <br />
              World Ender's duration is extended by 5 seconds with a takedown, up to 10 extra seconds. <br />
              Nearby minions and monsters are feared for 3 seconds on activation.
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