import { useStats } from "./StatsContext";
import { useMemo, useState } from "react";

export default function Abilities({champ, currentLevel, index, bonus}) {

  const { totalStats } = useStats();

const atk = totalStats[index];
const def = totalStats[(index == 1 ? 0 : 1)];

const [abilityGrid, setAbilityGrid] = useState(true);

const toggleGrid = () => {
  setAbilityGrid(oldState => !oldState)
}

const mod = useMemo(() => {

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
      return Math.round(target.magres - attacker.magResReduction)
    } else if (attacker.magResReduction) { 
     
      mitigatedMres = ((target.magres - attacker.magResReduction) * (1 - attacker.magPen) - attacker.flatMagPen);
     
      return Math.round(Math.max(mitigatedMres, 0))

    } else {
      mitigatedMres = (target.magres * (1 - attacker.magPen) - attacker.flatMagPen)

      return Math.round(Math.max(mitigatedMres, 0))
    }
  };

  const postMitigationArmorAttacker = postMitigationArmor(atk ,def);
  const postMitigationArmorDefender = postMitigationArmor(def, atk);

  const postMitigationMresAttacker = postMitigationMres(atk ,def);
  const postMitigationMresDefender = postMitigationMres(def ,atk);

  const physicalDamageReduction = (postMitigationArmor, champ) => {
    return ((1 - (100/(100 + (postMitigationArmor))))*100*(1 + (champ.bootsPassive === 'Steelcaps' ? 0.1 : 0)));
  };

  const magicalDamageReduction = (postMitigationMres, champ) => {
    return ((1 - (100/(100 + (postMitigationMres))))*100*(1 + (champ.bootsPassive === 'Mercury' ? 12 : 0) + (champ.fonEffect ? 25 : 0)));
  };

  const physicalReductionAttacker = physicalDamageReduction(postMitigationArmorAttacker, atk);
  const physicalReductionDefender = physicalDamageReduction(postMitigationArmorDefender, def);

  const magicalReductionAttacker = magicalDamageReduction(postMitigationMresAttacker, atk);
  const magicalReductionDefender = magicalDamageReduction(postMitigationMresDefender, def);

  return {
    attackerArmor: postMitigationArmorAttacker,
    attackerMres: postMitigationMresAttacker,
    atkPhysRed: physicalReductionAttacker/100,
    atkMagRed: magicalReductionAttacker/100,
    atkcdr:(1 - atk.cdr),


    defenderArmor: postMitigationArmorDefender,
    defenderMres: postMitigationMresDefender,
    defPhysRed: physicalReductionDefender/100,
    defMagRed: magicalReductionDefender/100,
    defcdr:(1 - def.cdr)

  }
},
[atk, def]);



const abilities = {
  'Aatrox': [
    {
      description: <div className="abilityDescription">
      <h4><span className="marker--ability">P</span> DEATHBRINGER STANCE</h4>
      <p>
        Enhances his next attack every <abbr title="24 seconds">{(24*mod.atkcdr).toFixed(1)} seconds</abbr> to deal bonus <abbr title="6%, pre/post-mitigation stats" className="stat--ad">{(Math.round(def.health * 6 / 100))} / {(Math.round((def.health * 6 / 100) * (1 - mod.defPhysRed)))} physical damage</abbr>  and <span className="stat--hp">heals</span>  himself for the same amount. <br />
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
            {' '}{Math.round(((15)+(atk.attack * 65 / 100)))} / 
            {' '}{Math.round(((40)+(atk.attack * 70 / 100)))} / 
            {' '}{Math.round(((65)+(atk.attack * 75 / 100)))} / 
            {' '}{Math.round(((90)+(atk.attack * 80 / 100)))}
          </p>
          
          <p className="stat--ad">
            Post-mitigation: 
            {' '}{Math.round(((15)+(atk.attack * 65 / 100)) * (1 - mod.defPhysRed))} / 
            {' '}{Math.round(((40)+(atk.attack * 70 / 100))* (1 - mod.defPhysRed))} / 
            {' '}{Math.round(((65)+(atk.attack * 75 / 100))* (1 - mod.defPhysRed))} / 
            {' '}{Math.round(((90)+(atk.attack * 80 / 100))* (1 - mod.defPhysRed))}
          </p>

          <p>
            Swings his giant blade, dealing <span className="stat--ad">15 / 40 / 65 / 90 (+65% / 70% / 75% / 80% AD) physical damage</span>. This ability can be cast 2 more times, with each cast dealing 25% more damage. <br />
            Deals 65% damage to minions.
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
          <h5>Cooldown: {(8*mod.atkcdr).toFixed(1)} / 
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
  ],

  'Ahri': [
    {
      description:
        <div className="abilityDescription">
          <h4>
          <span className="marker--ability">P</span> ESSENCE THEFT
          </h4>

          <h5 className="stat--hp">
           Healing :
          </h5>

          <p className="stat--hp">From Stacks: 
            {' '}{Math.round(((40)+(atk.ap * 20 / 100)))}
          </p>

          <p className="stat--hp">On Takedown: 
          {' '}{Math.round(((80)+(atk.ap * 35 / 100)))} /
          {' '}{Math.round(((120)+(atk.ap * 35 / 100)))} /
          {' '}{Math.round(((160)+(atk.ap * 35 / 100)))} / 
          {' '}{Math.round(((200)+(atk.ap * 35 / 100)))}      
          </p>

          <p>
            Whenever Ahri hits a target with a spell, she gains a stack of Essence Theft. When she has enough stacks, her next spell that hits an enemy also heals her for <span className="stat--hp"> 40</span> <span className="stat--ap">(+20% AP)</span>. Whenever Ahri scores a champion takedown within 3 seconds of damaging them, she consumes their essence to heal herself for <span className="stat--hp">80 / 120 / 160 / 200</span>    <span className="stat--ap">(+35% AP)</span>.
          </p>
        </div>
    },

    {
      description:
        <div className="abilityDescription">
          <h4>
          <span className="marker--ability">1</span> ORB OF DECEPTION
          </h4>

          <h5>
          Cooldown: 
            {' '}{(7*mod.atkcdr).toFixed(1)} / 
            {' '}{(7*mod.atkcdr).toFixed(1)} / 
            {' '}{(7*mod.atkcdr).toFixed(1)} / 
            {' '}{(7*mod.atkcdr).toFixed(1)} 
          </h5>
          <h5 className="stat--mana">
          Cost: 
            {' '}{65} / 
            {' '}{70} / 
            {' '}{75} / 
            {' '}{80} 
          </h5>

          <h5 className="stat--ap">
            Damage:
          </h5>

          <p className="stat--ad">Pre-mitigation: 
            {' '}{Math.round(((35)+(atk.ap * 35 / 100)))} + {Math.round(((35)+(atk.ap * 35 / 100)))} / 
            {' '}{Math.round(((70)+(atk.ap * 35 / 100)))} + {Math.round(((70)+(atk.ap * 35 / 100)))}  / 
            {' '}{Math.round(((105)+(atk.ap * 35 / 100)))} + {Math.round(((105)+(atk.ap * 35 / 100)))}  / 
            {' '}{Math.round(((140)+(atk.ap * 35 / 100)))} + {Math.round(((140)+(atk.ap * 35 / 100)))} 
          </p>

          <p className="stat--ad">Post-mitigation: 
            {' '}{Math.round(((35)+(atk.ap * 35 / 100)) * (1 - mod.defMagRed))} + {Math.round(((35)+(atk.ap * 35 / 100)))}  / 
            {' '}{Math.round(((70)+(atk.ap * 35 / 100))* (1 - mod.defMagRed))} + {Math.round(((70)+(atk.ap * 35 / 100)))}  / 
            {' '}{Math.round(((105)+(atk.ap * 35 / 100))* (1 - mod.defMagRed))} + {Math.round(((105)+(atk.ap * 35 / 100)))}  / 
            {' '}{Math.round(((140)+(atk.ap * 35 / 100))* (1 - mod.defMagRed))} + {Math.round(((140)+(atk.ap * 35 / 100)))}           
          </p>

          <p>
            Ahri sends out and pulls back her orb, dealing <span className="stat--ap">35 / 70 / 105 / 140 (+35% AP) magic damage</span> on the way out and <span className="stat--ap">35 / 70 / 105 / 140 (+35% AP)</span> <b>true damage</b> on the way back.
          </p>
        </div>
    },

    {
      description:
        <div className="abilityDescription">
          <h4>
          <span className="marker--ability">2</span> FOX-FIRE
          </h4>

          <h5>
          Cooldown: 
            {' '}{(9*mod.atkcdr).toFixed(1)} / 
            {' '}{(8*mod.atkcdr).toFixed(1)} / 
            {' '}{(7*mod.atkcdr).toFixed(1)} / 
            {' '}{(6*mod.atkcdr).toFixed(1)} 
          </h5>
           <h5 className="stat--mana">
          Cost: 
            {' '}{50} / 
            {' '}{50} / 
            {' '}{50} / 
            {' '}{50} 
          </h5>

          <h5 className="stat--ap">
            Damage:
          </h5>

          <p className="stat--ad">Pre-mitigation: 
            {' '}{Math.round(((40)+(atk.ap * 30 / 100)))} / 
            {' '}{Math.round(((75)+(atk.ap * 30 / 100)))} / 
            {' '}{Math.round(((110)+(atk.ap * 30 / 100)))} / 
            {' '}{Math.round(((145)+(atk.ap * 30 / 100)))}
          </p>

          <p className="stat--ad">Post-mitigation: 
            {' '}{Math.round(((40)+(atk.ap * 30 / 100)) * (1 - mod.defMagRed))} / 
            {' '}{Math.round(((75)+(atk.ap * 30 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.round(((110)+(atk.ap * 30 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.round(((145)+(atk.ap * 30 / 100))* (1 - mod.defMagRed))}          
          </p>

          <p>
          <b>ACTIVE:</b> Ahri gains <abbr title="40%">{Math.round(atk.moveSpeed * 45 / 100)}</abbr> bonus movement speed that decays over 1.5 seconds and summons three flames which orbit her for up to 5 seconds. <br />
          Each flame chases a nearby enemy, dealing magic damage, reduced to 30% for enemies taking flames beyond the first. <br />
          Flames prioritize targeting enemies hit by <span className="stat--ap">Charm</span>, then the last enemy Ahri attacked, and then the nearest enemy.
          </p>
        </div>
    },

    {
      description:
        <div className="abilityDescription">
          <h4>
          <span className="marker--ability">3</span> CHARM
          </h4>

          <h5>
          Cooldown: 
            {' '}{(12*mod.atkcdr).toFixed(1)} / 
            {' '}{(12*mod.atkcdr).toFixed(1)} / 
            {' '}{(12*mod.atkcdr).toFixed(1)} / 
            {' '}{(12*mod.atkcdr).toFixed(1)} 
          </h5>
           <h5 className="stat--mana">
          Cost: 
            {' '}{85} / 
            {' '}{85} / 
            {' '}{85} / 
            {' '}{85} 
          </h5>

          <h5 className="stat--ap">
            Damage:
          </h5>

          <p className="stat--ad">Pre-mitigation: 
            {' '}{Math.round(((60)+(atk.ap * 50 / 100)))} / 
            {' '}{Math.round(((100)+(atk.ap * 50 / 100)))} / 
            {' '}{Math.round(((140)+(atk.ap * 50 / 100)))} / 
            {' '}{Math.round(((180)+(atk.ap * 50 / 100)))}
          </p>

          <p className="stat--ad">Post-mitigation: 
            {' '}{Math.round(((60)+(atk.ap * 50 / 100)) * (1 - mod.defMagRed))} / 
            {' '}{Math.round(((100)+(atk.ap * 50 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.round(((140)+(atk.ap * 50 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.round(((180)+(atk.ap * 50 / 100))* (1 - mod.defMagRed))}          
          </p>

          <p className="stat--magres">
          Charm Duration: 
            {' '}{1.4}S / 
            {' '}{1.6}S / 
            {' '}{1.8}S / 
            {' '}{2}S 
          </p>

          <p>
            Ahri blows a kiss in a line in the target direction that deals <span className="stat--ap">60 / 100 / 140 / 180 (+ 50% AP) Magic Damage</span> to the first enemy hit and Charm them for a duration, instantly stopping movement abilities and causing target to walk harmlessly towards her.
          </p>
        </div>
    },

    {
      description:
        <div className="abilityDescription">
          <h4>
          <span className="marker--ability">ULT</span> SPIRIT RUSH 
          </h4>

          <h5>
          Cooldown: 
            {' '}{(75*mod.atkcdr).toFixed(1)} / 
            {' '}{(65*mod.atkcdr).toFixed(1)} / 
            {' '}{(55*mod.atkcdr).toFixed(1)}
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
            {' '}{Math.round(((60)+(atk.ap * 35 / 100)))} / 
            {' '}{Math.round(((90)+(atk.ap * 35 / 100)))} / 
            {' '}{Math.round(((120)+(atk.ap * 35 / 100)))}
          </p>

          <p className="stat--ad">Post-mitigation: 
            {' '}{Math.round(((60)+(atk.ap * 35 / 100)) * (1 - mod.defMagRed))} / 
            {' '}{Math.round(((90)+(atk.ap * 35 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.round(((120)+(atk.ap * 35 / 100))* (1 - mod.defMagRed))}
          </p>

          <p>
            Ahri dashes in the target direction and afterwards fires bolts at up to 3 nearby enemies, each  <span className="stat--ap"> 60 / 90 / 120 (+35% AP) magic damage</span> and prioritizing champions. Spirit Rush can then be recast twice more within 10 seconds. <br />
            If Ahri devours a champion's essence with Essence Theft, Ahri will extend Spirit Rush's recast duration up to 10 seconds, and she gains an extra charge of Spirit Rush. <br />
            Stores up to 3 charges.
          </p>
        </div>
    }
  ],

  'Akali': [
    {
      description:
        <div className="abilityDescription">
          <h4>
          <span className="marker--ability">P</span> ASSASIN'S MARK
          </h4>
         

          <h5 className="stat--ap">
            Damage:
          </h5>

          <p className="stat--ad">Pre-mitigation: 
            {' '}{Math.round(((20 + 8 * currentLevel)+(atk.attack * 60 / 100)+(atk.ap * 50 / 100)))}
          </p>

          <p className="stat--ad">Post-mitigation: 
            {' '}{Math.round(((20 + 8 * currentLevel)+(atk.attack * 60 / 100)+(atk.ap * 50 / 100)) * (1 - mod.defMagRed))}
          </p>

          <p>
          Dealing spell damage to a champion creates a ring of energy around them for 4 seconds. Exiting that ring empowers Akali's next autoattack to have 100 bonus range and deal <abbr title="20 + 8 * level">28-140</abbr> (<span className="stat--ad">+60% AD</span>,  <span className="stat--ap">+50% AP</span>) <span className="stat--ap"> magic damage</span>. Gain <abbr title="level 1-30 % / 5-40% / 11-50% / 15-60% source for levels: I'VE MADE IT THE F UP!">{Math.round(atk.moveSpeed * 30 / 100)} / {Math.round(atk.moveSpeed * 40 / 100)} / {Math.round(atk.moveSpeed * 50 / 100)} / {Math.round(atk.moveSpeed * 60 / 100)} Movement Speed</abbr>  while moving toward the ring, crossing the ring Akali gains <abbr title="level 1-30 % / 5-40% / 11-50% / 15-60% source for levels: I'VE MADE IT THE F UP!">{Math.round(atk.moveSpeed * 30 / 100)} / {Math.round(atk.moveSpeed * 40 / 100)} / {Math.round(atk.moveSpeed * 50 / 100)} / {Math.round(atk.moveSpeed * 60 / 100)} Movement Speed</abbr> while moving toward enemy champions for 2 seconds.
          </p>
        </div>
    },

    {
      description:
        <div className="abilityDescription">
          <h4>
          <span className="marker--ability">1</span> FIVE POINT STRIKE
          </h4>

          <h5>
          Cooldown: 
            {' '}{(2*mod.atkcdr).toFixed(1)} / 
            {' '}{(2*mod.atkcdr).toFixed(1)} / 
            {' '}{(2*mod.atkcdr).toFixed(1)} / 
            {' '}{(2*mod.atkcdr).toFixed(1)} 
          </h5>
           <h5 className="stat--armor">
          Cost: 
            {' '}{105} / 
            {' '}{90} / 
            {' '}{75} / 
            {' '}{60} 
          </h5>

          <h5 className="stat--ap">
            Damage:
          </h5>

          <p className="stat--ad">Pre-mitigation: 
            {' '}{Math.round(((35)+(atk.ap * 60 / 100)+(atk.attack*65/100)))} / 
            {' '}{Math.round(((70)+(atk.ap * 60 / 100)+(atk.attack*65/100)))} / 
            {' '}{Math.round(((105)+(atk.ap * 60 / 100)+(atk.attack*65/100)))} / 
            {' '}{Math.round(((140)+(atk.ap * 60 / 100)+(atk.attack*65/100)))}
          </p>

          <p className="stat--ad">Post-mitigation: 
            {' '}{Math.round(((35)+(atk.ap * 60 / 100)+(atk.attack*65/100)) * (1 - mod.defMagRed))} / 
            {' '}{Math.round(((70)+(atk.ap * 60 / 100)+(atk.attack*65/100))* (1 - mod.defMagRed))} / 
            {' '}{Math.round(((105)+(atk.ap * 60 / 100)+(atk.attack*65/100))* (1 - mod.defMagRed))} / 
            {' '}{Math.round(((140)+(atk.ap * 60 / 100)+(atk.attack*65/100))* (1 - mod.defMagRed))}          
          </p>

          <p>
            Akali throws five kunais in a cone in the target direction, dealing <span className="stat--ap">35 / 70 / 105 / 140</span> (<span className="stat--ad">+65 AD</span>, <span className="stat--ap">+60 AP</span> ) <span className="stat--ap">Magic Damage</span> to enemies hit, as well as slowing them by <abbr title="50%">{(Math.round(def.moveSpeed/2))} Movespeed</abbr> for 0.5 seconds if they were hit at maximum range.
          </p>
        </div>
    },

    {
      description:
        <div className="abilityDescription">
          <h4>
          <span className="marker--ability">2</span> TWILIGHT SHROUD
          </h4>

          <h5>
          Cooldown: 
            {' '}{(18*mod.atkcdr).toFixed(1)} / 
            {' '}{(18*mod.atkcdr).toFixed(1)} / 
            {' '}{(18*mod.atkcdr).toFixed(1)} / 
            {' '}{(18*mod.atkcdr).toFixed(1)} 
          </h5>
          <h5>
          Duration: 
            {' '}{5.5}S / 
            {' '}{6}S / 
            {' '}{6.5}S / 
            {' '}{7}S 
          </h5>
          <h5>
          Bonus Movement Speed: 
            {' '}{Math.round(atk.moveSpeed *30 /100)} / 
            {' '}{Math.round(atk.moveSpeed *35 /100)} / 
            {' '}{Math.round(atk.moveSpeed *40 /100)} / 
            {' '}{Math.round(atk.moveSpeed *45 /100)} 
          </h5>
           

          <p>
            Akali restores <span className="armor">100 energy</span>  and detonates a smoke bomb in the target direction, creating a shroud for a few seconds that expands into a ring over the duration. The shroud will slowly move to encircle a nearby enemy. While the shroud is active, Akali's maximum energy is increased by <span className="stat--armor">100.</span> <br />
            While inside the shroud, Akali gains invisibility and <b>30% / 35% / 40% / 45% bonus movement speed</b>. Attacking or casting abilities breaks the stealth, preventing her from regaining it again for 0.8 seconds.
          </p>
        </div>
    },

    {
      description:
        <div className="abilityDescription">
          <h4>
          <span className="marker--ability">3</span> SHURIKEN FLIP
          </h4>

          <h5>
          Cooldown: 
            {' '}{(15*mod.atkcdr).toFixed(1)} / 
            {' '}{(15*mod.atkcdr).toFixed(1)} / 
            {' '}{(15*mod.atkcdr).toFixed(1)} / 
            {' '}{(15*mod.atkcdr).toFixed(1)} 
          </h5>
           <h5 className="stat--armor">
          Cost: 
            {' '}{30} / 
            {' '}{30} / 
            {' '}{30} / 
            {' '}{30} 
          </h5>

          <h5 className="stat--ap">Damage:</h5>
          <p className="stat--ad">Pre-mitigation: <br />
            Initial:
            {' '}{Math.round(((30)+(atk.ap * 30 / 100)+(atk.attack*25/100)))} / 
            {' '}{Math.round(((60)+(atk.ap * 30 / 100)+(atk.attack*25/100)))} / 
            {' '}{Math.round(((90)+(atk.ap * 30 / 100)+(atk.attack*25/100)))} / 
            {' '}{Math.round(((120)+(atk.ap * 30 / 100)+(atk.attack*25/100)))} <br />
            Recast:
            {' '}{Math.round(((70)+(atk.ap * 80 / 100)+(atk.attack*50/100)))} / 
            {' '}{Math.round(((120)+(atk.ap * 80 / 100)+(atk.attack*50/100)))} / 
            {' '}{Math.round(((170)+(atk.ap * 80 / 100)+(atk.attack*50/100)))} / 
            {' '}{Math.round(((220)+(atk.ap * 80 / 100)+(atk.attack*50/100)))}
          </p>

          <p className="stat--ad">Post-mitigation: <br />
          Initial:
            {' '}{Math.round(((30)+(atk.ap * 30 / 100)+(atk.attack*25/100)) * (1 - mod.defMagRed))} / 
            {' '}{Math.round(((60)+(atk.ap * 30 / 100)+(atk.attack*25/100))* (1 - mod.defMagRed))} / 
            {' '}{Math.round(((90)+(atk.ap * 30 / 100)+(atk.attack*25/100))* (1 - mod.defMagRed))} / 
            {' '}{Math.round(((120)+(atk.ap * 30 / 100)+(atk.attack*25/100))* (1 - mod.defMagRed))} <br />
          Recast:
          {' '}{Math.round(((70)+(atk.ap * 80 / 100)+(atk.attack*50/100)) * (1 - mod.defMagRed))} / 
            {' '}{Math.round(((120)+(atk.ap * 80 / 100)+(atk.attack*50/100))* (1 - mod.defMagRed))} / 
            {' '}{Math.round(((170)+(atk.ap * 80 / 100)+(atk.attack*50/100))* (1 - mod.defMagRed))} / 
            {' '}{Math.round(((220)+(atk.ap * 80 / 100)+(atk.attack*50/100))* (1 - mod.defMagRed))}
          </p>

          <p>
            Akali flips backward and fires a shuriken forward, dealing <span className="stat--ap">30 / 60 / 90 / 120 (<span className="stat--ad">+25% AD</span> +30% AP) magic damage</span>. The first enemy or smoke cloud hit is marked. Re-casting dashes to the marked target, dealing <span className="stat--ap">70 / 120 / 170 / 220 (<span className="stat--ad"> +50% AD</span> +80% AP) magic damage</span>.
          </p>
        </div>
    },

    {
      description:
        <div className="abilityDescription">
          <h4>
          <span className="marker--ability">ULT</span> PERFECT EXECUTION
          </h4>

          <h5>
          Cooldown: 
            {' '}{(85*mod.atkcdr).toFixed(1)} / 
            {' '}{(65*mod.atkcdr).toFixed(1)} / 
            {' '}{(45*mod.atkcdr).toFixed(1)}
          </h5>

          <h5 className="stat--ap">Damage:</h5>
          <p className="stat--ad">Pre-mitigation: <br />
            Initial:
            {' '}{Math.round(((80)+(atk.ap * 30 / 100)+(atk.attack*50/100)))} / 
            {' '}{Math.round(((200)+(atk.ap * 30 / 100)+(atk.attack*50/100)))} / 
            {' '}{Math.round(((320)+(atk.ap * 30 / 100)+(atk.attack*50/100)))}<br />
            Recast (minimum damage):
            {' '}{Math.round(((70)+(atk.ap * 30 / 100)))} / 
            {' '}{Math.round(((140)+(atk.ap * 30 / 100)))} / 
            {' '}{Math.round(((210)+(atk.ap * 30 / 100)))}
          </p>

          <p className="stat--ad">Post-mitigation: <br />
          Initial:
            {' '}{Math.round(((80)+(atk.ap * 30 / 100)+(atk.attack*50/100)) * (1 - mod.defMagRed))} / 
            {' '}{Math.round(((200)+(atk.ap * 30 / 100)+(atk.attack*50/100))* (1 - mod.defMagRed))} / 
            {' '}{Math.round(((320)+(atk.ap * 30 / 100)+(atk.attack*50/100))* (1 - mod.defMagRed))}<br />
          Recast (minimum damage):
          {' '}{Math.round(((70)+(atk.ap * 30 / 100)) * (1 - mod.defMagRed))} / 
            {' '}{Math.round(((140)+(atk.ap * 30 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.round(((210)+(atk.ap * 30 / 100))* (1 - mod.defMagRed))}
          </p>
           

          <p>
            Akali dashes through an enemy champion, dealing <span className="stat--ap">80 / 200 / 320 (<span className="stat--ad">+50% AD</span> +30% AP) magic damage</span>. Can be cast again after 2.5 seconds. <br />
            Recast: Dashes in target direction, dealing <span className="stat--ap">70 / 140 / 210 (+30% AP to +90% AP) magic damage</span> based upon enemies missing Health.
          </p>
        </div>
    }
  ],

  'Akshan': [
    {
      description:
        <div className="abilityDescription">
          <h4>
          <span className="marker--ability">P</span> DIRTY FIGHTING
          </h4>

          <h5>
          Cooldown: 
            {' '}{(12*mod.atkcdr).toFixed(1)} - lvl 1 / 
            {' '}{(8*mod.atkcdr).toFixed(1)} - lvl 5 / 
            {' '}{(4*mod.atkcdr).toFixed(1)}  - lvl9
          </h5>
          
          <p>
            Every three hits from attacks and abilities deal bonus <abbr title="25-180 based on level" className="stat--ap">{Math.round(25 + (155/14+(currentLevel - 1)))} Magic Damage</abbr> and gain a shield that absorbs <abbr title="40-300 based on level +40 bonus AD" className="stat--hp">{Math.round(40+(260/14*(currentLevel - 1))+ (bonus.attack * 40 / 100))} Damage</abbr> for 2 seconds. <br />
            After launching a basic attack. Akshan will fire a second shot that deals <abbr title="50% AD" className="stat--ad">{Math.round(atk.attack/2)} Physical Damage</abbr>. He can cancel this shot to gain <abbr title="40-120 based an level">{Math.round(40 + (80/14*(currentLevel - 1)))}</abbr> decaying over 1 second.
          </p>
        </div>
    },

    {
      description:
        <div className="abilityDescription">
          <h4>
          <span className="marker--ability">1</span> AVENGERANG
          </h4>

          <h5>
          Cooldown: 
            {' '}{(8*mod.atkcdr).toFixed(1)} / 
            {' '}{(7*mod.atkcdr).toFixed(1)} / 
            {' '}{(6*mod.atkcdr).toFixed(1)} / 
            {' '}{(5*mod.atkcdr).toFixed(1)} 
          </h5>
           <h5 className="stat--mana">
          Cost: 
            {' '}{50} / 
            {' '}{50} / 
            {' '}{50} / 
            {' '}{50} 
          </h5>

          <h5 className="stat--ad">
          Damage:
        </h5>

        <p className="stat--ad">Pre-mitigation: 
          {' '}{Math.round(((5)+(atk.attack * 80 / 100)))} / 
          {' '}{Math.round(((30)+(atk.attack * 80 / 100)))} / 
          {' '}{Math.round(((55)+(atk.attack * 80 / 100)))} / 
          {' '}{Math.round(((80)+(atk.attack * 80 / 100)))}
        </p>

        <p className="stat--ad">Post-mitigation: 
          {' '}{Math.round(((5)+(atk.attack * 80 / 100)) * (1 - mod.defPhysRed))} / 
          {' '}{Math.round(((30)+(atk.attack * 80 / 100))* (1 - mod.defPhysRed))} / 
          {' '}{Math.round(((55)+(atk.attack * 80 / 100))* (1 - mod.defPhysRed))} / 
          {' '}{Math.round(((80)+(atk.attack * 80 / 100))* (1 - mod.defPhysRed))}          
        </p>

          <p>
            Akshan throws a boomerang that deals <span className="stat--ad">5 / 3 / 55 / 80 (+80% AD) Physical Damage</span> to enemies it passes through and revealing them, granting sight of the area along its path, as well as extending its range every time it hits an enemy. If the boomerang hits an enemy champion, Akshan gains bonus <abbr title="40%">{Math.round(atk.moveSpeed * 40 / 100)} Movement Speed</abbr> decaying over time. Upon reaching maximum range, the boomerang returns to Akshan, applying the same effects to enemies hit along the way. Avengerang's damage is reduced against non-champions.
          </p>
        </div>
    },

    {
      description:
        <div className="abilityDescription">
          <h4>
          <span className="marker--ability">2</span> GOING ROGUE
          </h4>

          <h5>
          Cooldown: 
            {' '}{(14*mod.atkcdr).toFixed(1)} / 
            {' '}{(10*mod.atkcdr).toFixed(1)} / 
            {' '}{(6*mod.atkcdr).toFixed(1)} / 
            {' '}{(2*mod.atkcdr).toFixed(1)} 
          </h5>
           <h5 className="stat--mana">
          Cost: 
            {' '}{30} / 
            {' '}{30} / 
            {' '}{30} / 
            {' '}{30} 
          </h5>

          <p>
            Enemies that kill allied champions become Scoundrels for a duration. When Akshan takes down a Scoundrel, he gains bonus gold and revives the allies slain. Active: Become camouflaged for a few seconds and gain bonus <abbr title="80% / 90% / 100% / 110%"> {Math.round(atk.moveSpeed * 80 / 100)} / {Math.round(atk.moveSpeed * 90 / 100)} / {Math.round(atk.moveSpeed * 100 / 100)} / {Math.round(atk.moveSpeed * 110 / 100)} Movement Speed</abbr> towards Scoundrels. Always camouflaged when Akshan is near terrain or in brushes. Gain <span className="stat--mana">2% missing mana regen</span> per second when chasing Scoundrels.
          </p>
        </div>
    },

    {
      description:
        <div className="abilityDescription">
          <h4>
          <span className="marker--ability">3</span> HEROIC SWING
          </h4>

          <h5>
          Cooldown: 
            {' '}{(18*mod.atkcdr).toFixed(1)} / 
            {' '}{(16*mod.atkcdr).toFixed(1)} / 
            {' '}{(14*mod.atkcdr).toFixed(1)} / 
            {' '}{(12*mod.atkcdr).toFixed(1)} 
          </h5>
           <h5 className="stat--mana">
          Cost: 
            {' '}{50} / 
            {' '}{50} / 
            {' '}{50} / 
            {' '}{50} 
          </h5>

          <h5 className="stat--ad">
            Damage:
          </h5>

          <p className="stat--ad">Pre-mitigation: 
            {' '}{Math.round(((30)+(atk.attack * 15 / 100)))} / 
            {' '}{Math.round(((70)+(atk.attack * 15 / 100)))} / 
            {' '}{Math.round(((110)+(atk.attack * 15 / 100)))} / 
            {' '}{Math.round(((150)+(atk.attack * 15 / 100)))}
          </p>

          <p className="stat--ad">Post-mitigation: 
            {' '}{Math.round(((30)+(atk.attack * 15 / 100)) * (1 - mod.defPhysRed))} / 
            {' '}{Math.round(((70)+(atk.attack * 15 / 100))* (1 - mod.defPhysRed))} / 
            {' '}{Math.round(((110)+(atk.attack * 15 / 100))* (1 - mod.defPhysRed))} / 
            {' '}{Math.round(((150)+(atk.attack * 15 / 100))* (1 - mod.defPhysRed))}          
          </p>

          <p>
          Fires a hook to attach and swing around terrain, attacking the nearest enemy dealing <span className="stat--ad">30 / 70 / 110 / 150 (+15% AD) physical damage</span> per shot. <br />
          If Akshan collides with an enemy champion or terrain, he will jump off the rope. <br />
          Champion takedowns refresh Heroic Swing's cooldown. Heroic Swing prioritizes champions recently damaged by Akshan and applies On-hit effects at 25% effectiveness. 
          </p>
        </div>
    },

    {
      description:
        <div className="abilityDescription">
          <h4>
          <span className="marker--ability">ULT</span> COMEUPPANCE
          </h4>

          <h5>
          Cooldown: 
            {' '}{(65*mod.atkcdr).toFixed(1)} / 
            {' '}{(60*mod.atkcdr).toFixed(1)} / 
            {' '}{(55*mod.atkcdr).toFixed(1)}
          </h5>
           <h5 className="stat--mana">
          Cost: 
            {' '}{100} / 
            {' '}{100} / 
            {' '}{100}
          </h5>

          <h5 className="stat--ad">
            Minimum Damage:
          </h5>

          <p className="stat--ad">Pre-mitigation: 
            {' '}{Math.round(((20)+(atk.attack * 10 / 100)) * 5)} / 
            {' '}{Math.round(((30)+(atk.attack * 10 / 100)) * 6)} / 
            {' '}{Math.round(((40)+(atk.attack * 10 / 100)) * 7)}
          </p>

          <p className="stat--ad">Post-mitigation: 
            {' '}{Math.round((((20)+(atk.attack * 10 / 100))*5) * (1 - mod.defPhysRed))} / 
            {' '}{Math.round((((30)+(atk.attack * 10 / 100))*6)* (1 - mod.defPhysRed))} / 
            {' '}{Math.round((((40)+(atk.attack * 10 / 100))*7)* (1 - mod.defPhysRed))}         
          </p>

          <h5 className="stat--ad">
            Maximum Damage:
          </h5>

          <p className="stat--ad">Pre-mitigation: 
            {' '}{Math.round(((80)+(atk.attack * 40 / 100)) * 5)} / 
            {' '}{Math.round(((120)+(atk.attack * 40 / 100)) * 6)} / 
            {' '}{Math.round(((160)+(atk.attack * 40 / 100)) * 7)}
          </p>

          <p className="stat--ad">Post-mitigation: 
            {' '}{Math.round((((20)+(atk.attack * 40 / 100))*5) * (1 - mod.defPhysRed))} / 
            {' '}{Math.round((((30)+(atk.attack * 40 / 100))*6)* (1 - mod.defPhysRed))} / 
            {' '}{Math.round((((40)+(atk.attack * 40 / 100))*7)* (1 - mod.defPhysRed))}         
          </p>


          <p>
            Locks onto an enemy champion, charging multiple shots over a few seconds, fires up to 5 / 6 / 7 shots, dealing <span className="stat--ad">20 / 30 / 40 (+10% AD) physical damage per shot</span> to the first enemy or structure hit, increased up to <span className="stat--ad">80 / 120 / 160 (+40% AD) physical damage per shot</span> based on target's missing Health.
          </p>
        </div>
    }
  ],

  'Alistar': [
    {
      description:
        <div className="abilityDescription">
          <h4>
          <span className="marker--ability">P</span> TRIUMPHANT ROAR 
          </h4>

          <h5>
          Cooldown: 
            {' '}{(40*mod.atkcdr).toFixed(1)}
          </h5>

          <p>
            When Alistar takes damage, he heals himself for <abbr title="27-160 based on level" className="stat--hp">{Math.round( (17.5 )+ (9.5 * currentLevel))}</abbr> and nearby allied champions for <abbr title="54-320 based on level" className="stat--hp">{Math.round((35) + (19 * currentLevel))}</abbr>. Knocking up or stunning champions with Alistar's abilities reduces the cooldown by 10 seconds.
          </p>
        </div>
    },

    {
      description:
        <div className="abilityDescription">
          <h4>
          <span className="marker--ability">1</span> PULVERIZE
          </h4>

          <h5>
          Cooldown: 
            {' '}{(15*mod.atkcdr).toFixed(1)} / 
            {' '}{(14*mod.atkcdr).toFixed(1)} / 
            {' '}{(12*mod.atkcdr).toFixed(1)} / 
            {' '}{(11*mod.atkcdr).toFixed(1)} 
          </h5>
           <h5 className="stat--mana">
          Cost: 
            {' '}{65} / 
            {' '}{70} / 
            {' '}{75} / 
            {' '}{80} 
          </h5>

          <h5 className="stat--ap">
            Damage:
          </h5>

          <p className="stat--ad">Pre-mitigation: 
            {' '}{Math.round(((60)+(atk.ap * 50 / 100)))} / 
            {' '}{Math.round(((110)+(atk.ap * 50 / 100)))} / 
            {' '}{Math.round(((160)+(atk.ap * 50 / 100)))} / 
            {' '}{Math.round(((210)+(atk.ap * 50 / 100)))}
          </p>

          <p className="stat--ad">Post-mitigation: 
            {' '}{Math.round(((60)+(atk.ap * 50 / 100)) * (1 - mod.defMagRed))} / 
            {' '}{Math.round(((110)+(atk.ap * 50 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.round(((160)+(atk.ap * 50 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.round(((210)+(atk.ap * 50 / 100))* (1 - mod.defMagRed))}          
          </p>

          <p>
          Alistar smashes the ground, dealing <span className="stat--ap">60 / 110 / 160 / 210 (+50% AP) Magic Damage</span> to nearby enemies and tossing them into the air for 1 second.
          </p>
        </div>
    },

    {
      description:
        <div className="abilityDescription">
          <h4>
          <span className="marker--ability">2</span> HEADBUTT
          </h4>

          <h5>
          Cooldown: 
            {' '}{(14*mod.atkcdr).toFixed(1)} / 
            {' '}{(12*mod.atkcdr).toFixed(1)} / 
            {' '}{(11*mod.atkcdr).toFixed(1)} / 
            {' '}{(9*mod.atkcdr).toFixed(1)} 
          </h5>
           <h5 className="stat--mana">
          Cost: 
            {' '}{65} / 
            {' '}{70} / 
            {' '}{75} / 
            {' '}{80} 
          </h5>

          <h5 className="stat--ap">
            Damage:
          </h5>

          <p className="stat--ad">Pre-mitigation: 
            {' '}{Math.round(((50)+(atk.ap * 60 / 100)))} / 
            {' '}{Math.round(((120)+(atk.ap * 60 / 100)))} / 
            {' '}{Math.round(((190)+(atk.ap * 60 / 100)))} / 
            {' '}{Math.round(((260)+(atk.ap * 60 / 100)))}
          </p>

          <p className="stat--ad">Post-mitigation: 
            {' '}{Math.round(((50)+(atk.ap * 60 / 100)) * (1 - mod.defMagRed))} / 
            {' '}{Math.round(((120)+(atk.ap * 60 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.round(((190)+(atk.ap * 60 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.round(((260)+(atk.ap * 60 / 100))* (1 - mod.defMagRed))}          
          </p>

          <p>
            Alistar rams a target with his head, dealing <span className="stat--ap">50 / 120 / 190 / 260 (+60% AP) Magic Damage</span> and knocking the target back. <br />
            Can be cast on turrets to deal 75% damage.
          </p>
        </div>
    },

    {
      description:
        <div className="abilityDescription">
          <h4>
          <span className="marker--ability">3</span> TRAMPLE
          </h4>

          <h5>
          Cooldown: 
            {' '}{(12*mod.atkcdr).toFixed(1)} / 
            {' '}{(11*mod.atkcdr).toFixed(1)} / 
            {' '}{(11*mod.atkcdr).toFixed(1)} / 
            {' '}{(10*mod.atkcdr).toFixed(1)} 
          </h5>
           <h5 className="stat--mana">
          Cost: 
            {' '}{50} / 
            {' '}{60} / 
            {' '}{70} / 
            {' '}{80} 
          </h5>

          <h5 className="stat--ap">
            Damage:
          </h5>

          <p className="stat--ad">Pre-mitigation: 
            {' '}{Math.round(((100)+(atk.ap * 40 / 100)))} / 
            {' '}{Math.round(((150)+(atk.ap * 40 / 100)))} / 
            {' '}{Math.round(((200)+(atk.ap * 40 / 100)))} / 
            {' '}{Math.round(((250)+(atk.ap * 40 / 100)))}
          </p>

          <p className="stat--ad">Post-mitigation: 
            {' '}{Math.round(((100)+(atk.ap * 40 / 100)) * (1 - mod.defMagRed))} / 
            {' '}{Math.round(((150)+(atk.ap * 40 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.round(((200)+(atk.ap * 40 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.round(((250)+(atk.ap * 40 / 100))* (1 - mod.defMagRed))}          
          </p>

          <p>
            Alistar tramples the ground beneath him for 5 seconds, dealing up to <span className="stat--ap">100 / 150 / 200 / 250 (+40% AP) Magic Damage</span> to nearby enemies through 10 pulses with a pulse every 0.5 seconds and gaining a Trample stack each time at least one enemy champion is damaged, up to 5 stacks. <br />
            At 5 Trample stacks Alistar's next basic attack within 5 seconds is empowered to deal <abbr title="40-320 based on level" className="stat--ap">{(20) + (20 * currentLevel)} Magic Damage</abbr> to target and stun it for 1 second.
          </p>
        </div>
    },

    {
      description:
        <div className="abilityDescription">
          <h4>
          <span className="marker--ability">ULT</span> UNBREAKABLE WILL
          </h4>

          <h5>
          Cooldown: 
            {' '}{(75*mod.atkcdr).toFixed(1)} / 
            {' '}{(65*mod.atkcdr).toFixed(1)} / 
            {' '}{(55*mod.atkcdr).toFixed(1)}
          </h5>
           <h5 className="stat--mana">
          Cost: 
            {' '}{100} / 
            {' '}{100} / 
            {' '}{100}
          </h5>

          <p>
            Alistar let's out the wild roar, removes all crowd control effects from himself and gains <b>55% / 65% / 75%</b> damage reduction for 7 seconds.
          </p>
        </div>
    }
  ],

  'Amumu': [
    {
      description:
        <div className="abilityDescription">
          <h4>
          <span className="marker--ability">P</span> CURSED TOUCH
          </h4>         

          <p>
            Amumu's basic attacks Curse his enemies, causing them to take bonus <b>10% True Damage</b> from incoming <span className="stat--ap">Magic Damage</span>
          </p>
        </div>
    },

    {
      description:
        <div className="abilityDescription">
          <h4>
          <span className="marker--ability">1</span> BANDAGE TOSS
          </h4>

          <h5>
          Cast cooldown: 
            {' '}{(3).toFixed(1)} / 
            {' '}{(3).toFixed(1)} / 
            {' '}{(3).toFixed(1)} / 
            {' '}{(3).toFixed(1)} 
          </h5>
          <h5>
          Charge cooldown: 
            {' '}{(14*mod.atkcdr).toFixed(1)} / 
            {' '}{(13.5*mod.atkcdr).toFixed(1)} / 
            {' '}{(13*mod.atkcdr).toFixed(1)} / 
            {' '}{(12.5*mod.atkcdr).toFixed(1)} 
          </h5>
           <h5 className="stat--mana">
          Cost: 
            {' '}{35} / 
            {' '}{40} / 
            {' '}{45} / 
            {' '}{50} 
          </h5>

          <h5 className="stat--ap">
            Damage:
          </h5>

          <p className="stat--ad">Pre-mitigation: 
            {' '}{Math.round(((70)+(atk.ap * 70 / 100)))} / 
            {' '}{Math.round(((105)+(atk.ap * 70 / 100)))} / 
            {' '}{Math.round(((140)+(atk.ap * 70 / 100)))} / 
            {' '}{Math.round(((175)+(atk.ap * 70 / 100)))}
          </p>

          <p className="stat--ad">Post-mitigation: 
            {' '}{Math.round(((70)+(atk.ap * 70 / 100)) * (1 - mod.defMagRed))} / 
            {' '}{Math.round(((1005)+(atk.ap * 70 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.round(((140)+(atk.ap * 70 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.round(((175)+(atk.ap * 70 / 100))* (1 - mod.defMagRed))}          
          </p>

          <p>
            <b>Bandage Toss</b> charges are stored every 14 / 13.5 / 13 / 12.5 seconds up to 2 charges max.

            <b>Active:</b> Launches a bandage that pulls Amumu to target, stuns the target fot 1 second and deals <span className="stat--ap">70 / 105 / 140 / 175 (+70% AP) Magic Damage</span> to target.            
          </p>
        </div>
    },

    {
      description:
        <div className="abilityDescription">
          <h4>
          <span className="marker--ability">2</span> DESPAIR
          </h4>

          <h5>
          Cooldown: 
            {' '}{(1).toFixed(1)} / 
            {' '}{(1).toFixed(1)} / 
            {' '}{(1).toFixed(1)} / 
            {' '}{(1).toFixed(1)} 
          </h5>
           <h5 className="stat--mana">
          Cost: 
            {' '}{10} / 
            {' '}{11} / 
            {' '}{12} / 
            {' '}{13} 
          </h5>

          <h5 className="stat--ap">
            Damage:
          </h5>

          <p className="stat--ad">Pre-mitigation: 
            {' '}{Math.round(((15)+(def.health *(1 + (Math.round(atk.ap * 6 / 1000))) / 100)))} / 
            {' '}{Math.round(((20)+(def.health *(1.2 + (Math.round(atk.ap * 6 / 1000))) / 100)))} / 
            {' '}{Math.round(((25)+(def.health *(1.4 + (Math.round(atk.ap * 6 / 1000))) / 100)))} / 
            {' '}{Math.round(((30)+(def.health *(1.6 + (Math.round(atk.ap * 6 / 1000))) / 100)))}
          </p>

          <p className="stat--ad">Post-mitigation: 
            {' '}{Math.round(((15)+(def.health * (1 + (Math.round(atk.ap * 6 / 1000)))/ 100)) * (1 - mod.defMagRed))} / 
            {' '}{Math.round(((20)+(def.health * (1.2 + (Math.round(atk.ap * 6 / 1000))) / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.round(((25)+(def.health * (1.4 + (Math.round(atk.ap * 6 / 1000))) / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.round(((30)+(def.health * (1.6 + (Math.round(atk.ap * 6 / 1000))) / 100))* (1 - mod.defMagRed))}          
          </p>

          <p>
            Amumu begins weeping to deal <span className="stat--ap">15 / 20 / 25 / 30 <span className="stat--hp">(+1 / 1.2 / 1.4 / 1.6% <span className="stat--ap">(+0.6% per 100 AP)</span> of the target's maximum health)</span> Magic Damage</span> to nearby enemies every second
          </p>
        </div>
    },

    {
      description:
        <div className="abilityDescription">
          <h4>
          <span className="marker--ability">3</span> TANTRUM
          </h4>

          <h5>
          Cooldown: 
            {' '}{(9*mod.atkcdr).toFixed(1)} / 
            {' '}{(8*mod.atkcdr).toFixed(1)} / 
            {' '}{(7*mod.atkcdr).toFixed(1)} / 
            {' '}{(6*mod.atkcdr).toFixed(1)} 
          </h5>
           <h5 className="stat--mana">
          Cost: 
            {' '}{35} / 
            {' '}{35} / 
            {' '}{35} / 
            {' '}{35} 
          </h5>

          <p className="stat--armor">Physical Damage Reduction: 
            {' '}{Math.round(((4)+(atk.armor * 3 / 100)+(atk.magres * 3 / 100)))} / 
            {' '}{Math.round(((6)+(atk.armor * 3 / 100)+(atk.magres * 3 / 100)))} / 
            {' '}{Math.round(((8)+(atk.armor * 3 / 100)+(atk.magres * 3 / 100)))} / 
            {' '}{Math.round(((10)+(atk.armor * 3 / 100)+(atk.magres * 3 / 100)))}
          </p>

          <h5 className="stat--ap">
            Damage:
          </h5>

          <p className="stat--ad">Pre-mitigation: 
            {' '}{Math.round(((90)+(atk.ap * 50 / 100)))} / 
            {' '}{Math.round(((120)+(atk.ap * 50 / 100)))} / 
            {' '}{Math.round(((150)+(atk.ap * 50 / 100)))} / 
            {' '}{Math.round(((180)+(atk.ap * 50 / 100)))}
          </p>

          <p className="stat--ad">Post-mitigation: 
            {' '}{Math.round(((90)+(atk.ap * 50 / 100)) * (1 - mod.defMagRed))} / 
            {' '}{Math.round(((120)+(atk.ap * 50 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.round(((150)+(atk.ap * 50 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.round(((180)+(atk.ap * 50 / 100))* (1 - mod.defMagRed))}          
          </p>

          <p>
            <b>Passive:</b> Amumu blocks <span className="stat--ad">4 / 6 / 8 / 10 <span className="stat--armor">(+3% armor)</span> <span className="stat--magres">(+3% magic resistance)</span> Physical damage</span> on any instance of physical damage done to him. <br />
            <b>ACTIVE:</b> Amumu throws a Tantrum dealing <span className="stat--ap">90 / 120 / 150 / 180 (+50% AP) Magic Damage</span> to all enemies in small area around him and slowing them by <b>20%</b> for 0.5 seconds. <br />
            Tantrum's cooldown is reduced by 0.5 seconds each time Amumu is hit by basic attack.
          </p>
        </div>
    },

    {
      description:
        <div className="abilityDescription">
          <h4>
          <span className="marker--ability">ULT</span> CURSE OF THE SAD MUMMY
          </h4>

          <h5>
          Cooldown: 
            {' '}{(95*mod.atkcdr).toFixed(1)} / 
            {' '}{(85*mod.atkcdr).toFixed(1)} / 
            {' '}{(75*mod.atkcdr).toFixed(1)}
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
            {' '}{Math.round(((150)+(atk.ap * 80 / 100)))} / 
            {' '}{Math.round(((250)+(atk.ap * 80 / 100)))} / 
            {' '}{Math.round(((350)+(atk.ap * 80 / 100)))}
          </p>

          <p className="stat--ad">Post-mitigation: 
            {' '}{Math.round(((150)+(atk.ap * 80 / 100)) * (1 - mod.defMagRed))} / 
            {' '}{Math.round(((250)+(atk.ap * 80 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.round(((350)+(atk.ap * 80 / 100))* (1 - mod.defMagRed))}
          </p>

          <p>
            Amumu releases his curse, dealing <span className="stat--ap">150 / 250 / 350 (+80% AP) Magic Damage</span> and stunning all enemies in a circular area around him for 1.5 seconds.
          </p>
        </div>
    }
  ],

  'Annie': [
    {
      description:
        <div className="abilityDescription">
          <h4>
          <span className="marker--ability">P</span> PYROMANIA 
          </h4>     

          <p>
          After casting 4 spells, Annie's next offensive spell will stun the target for <abbr title="At level 1 / 6 / 11">1 / 1.25 / 1.5 seconds.</abbr>
          </p>
        </div>
    },

    {
      description:
        <div className="abilityDescription">
          <h4>
          <span className="marker--ability">1</span> DISINTEGRATE
          </h4>

          <h5>
          Cooldown: 
            {' '}{(4*mod.atkcdr).toFixed(1)} / 
            {' '}{(4*mod.atkcdr).toFixed(1)} / 
            {' '}{(4*mod.atkcdr).toFixed(1)} / 
            {' '}{(4*mod.atkcdr).toFixed(1)} 
          </h5>
           <h5 className="stat--mana">
          Cost: 
            {' '}{65} / 
            {' '}{70} / 
            {' '}{75} / 
            {' '}{80} 
          </h5>

          <h5 className="stat--ap">
            Damage:
          </h5>

          <p className="stat--ad">Pre-mitigation: 
            {' '}{Math.round(((80)+(atk.ap * 80 / 100)))} / 
            {' '}{Math.round(((125)+(atk.ap * 80 / 100)))} / 
            {' '}{Math.round(((170)+(atk.ap * 80 / 100)))} / 
            {' '}{Math.round(((215)+(atk.ap * 80 / 100)))}
          </p>

          <p className="stat--ad">Post-mitigation: 
            {' '}{Math.round(((80)+(atk.ap * 80 / 100)) * (1 - mod.defMagRed))} / 
            {' '}{Math.round(((125)+(atk.ap * 80 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.round(((170)+(atk.ap * 80 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.round(((215)+(atk.ap * 80 / 100))* (1 - mod.defMagRed))}          
          </p>

          <p>
          Annie hurls a fireball, dealing <span className="stat--ap">80 / 125 / 170 / 215
          (+80% AP) magic damage</span> in a small area. <br />
          If this spell kills a target, refunds mana cost and half of this spell cooldown.
          </p>
        </div>
    },

    {
      description:
        <div className="abilityDescription">
          <h4>
          <span className="marker--ability">2</span> INCINERATE 
          </h4>

          <h5>
          Cooldown: 
            {' '}{(8*mod.atkcdr).toFixed(1)} / 
            {' '}{(8*mod.atkcdr).toFixed(1)} / 
            {' '}{(8*mod.atkcdr).toFixed(1)} / 
            {' '}{(8*mod.atkcdr).toFixed(1)} 
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
            {' '}{Math.round(((70)+(atk.ap * 70 / 100)))} / 
            {' '}{Math.round(((130)+(atk.ap * 70 / 100)))} / 
            {' '}{Math.round(((190)+(atk.ap * 70 / 100)))} / 
            {' '}{Math.round(((250)+(atk.ap * 70 / 100)))}
          </p>

          <p className="stat--ad">Post-mitigation: 
            {' '}{Math.round(((70)+(atk.ap * 70 / 100)) * (1 - mod.defMagRed))} / 
            {' '}{Math.round(((130)+(atk.ap * 70 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.round(((190)+(atk.ap * 70 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.round(((250)+(atk.ap * 70 / 100))* (1 - mod.defMagRed))}          
          </p>

          <p>
            Annie unleashes a cone of fire in the targeted direction dealing <span className="stat--ap">70 / 130 / 190 / 250 (+70% AP) magic damage</span> to all enemies in the area.
          </p>
        </div>
    },

    {
      description:
        <div className="abilityDescription">
          <h4>
          <span className="marker--ability">3</span> MOLTEEN SHIELD
          </h4>
    
          <h5>
          Cooldown: 
            {' '}{(14*mod.atkcdr).toFixed(1)} / 
            {' '}{(14*mod.atkcdr).toFixed(1)} / 
            {' '}{(14*mod.atkcdr).toFixed(1)} / 
            {' '}{(14*mod.atkcdr).toFixed(1)} 
          </h5>
            <h5 className="stat--mana">
          Cost: 
            {' '}{60} / 
            {' '}{60} / 
            {' '}{60} / 
            {' '}{60} 
          </h5>

          <h5 className="stat--hp">
            Shield:
          </h5>

          <p className="stat--hp"> 
            {' '}{Math.round(((50)+(atk.ap * 40 / 100)))} / 
            {' '}{Math.round(((100)+(atk.ap * 40 / 100)))} / 
            {' '}{Math.round(((150)+(atk.ap * 40 / 100)))} / 
            {' '}{Math.round(((200)+(atk.ap * 40 / 100)))}
          </p>
    
          <p>
            Annie covers herself and <b>Tibbers</b> with shield, absorbing <span className="stat--hp">absorbing 50 / 100 / 150 / 200 <span className="stat--ap">(+40% AP)</span>  damage</span> for 3 seconds. Also both of them gain <abbr title="20% / 25% / 30% / 35%" className="stat--moveSpeed">{Math.round(atk.moveSpeed * 20 / 100)} / {Math.round(atk.moveSpeed * 25 / 100)} / {Math.round(atk.moveSpeed * 30 / 100)} / {Math.round(atk.moveSpeed * 35 / 100)} movement speed</abbr>. Speed bonus decays over 3 seconds.
          </p>
        </div>
    },

    {
      description:
        <div className="abilityDescription">
          <h4>
          <span className="marker--ability">ULT</span> SUMMON TIBBERS
          </h4>
    
          <h5>
          Cooldown: 
            {' '}{(70*mod.atkcdr).toFixed(1)} / 
            {' '}{(65*mod.atkcdr).toFixed(1)} / 
            {' '}{(60*mod.atkcdr).toFixed(1)}
          </h5>
            <h5 className="stat--mana">
          Cost: 
            {' '}{100} / 
            {' '}{100} / 
            {' '}{100}
          </h5>

          <h5 className="stat--ap">
            Initial damage:
          </h5>

          <p className="stat--ad">Pre-mitigation: 
            {' '}{Math.round(((130)+(atk.ap * 60 / 100)))} / 
            {' '}{Math.round(((230)+(atk.ap * 60 / 100)))} / 
            {' '}{Math.round(((330)+(atk.ap * 60 / 100)))}
          </p>

          <p className="stat--ad">Post-mitigation: 
            {' '}{Math.round(((130)+(atk.ap * 60 / 100)) * (1 - mod.defMagRed))} / 
            {' '}{Math.round(((230)+(atk.ap * 60 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.round(((330)+(atk.ap * 60 / 100))* (1 - mod.defMagRed))}        
          </p>

          <h5 className="stat--ap">
          Pounce damage:
          </h5>

          <p className="stat--ad">Pre-mitigation: 
            {' '}{Math.round(((110)+(atk.ap * 30 / 100)))} / 
            {' '}{Math.round(((150)+(atk.ap * 30 / 100)))} / 
            {' '}{Math.round(((190)+(atk.ap * 30 / 100)))}
          </p>

          <p className="stat--ad">Post-mitigation: 
            {' '}{Math.round(((110)+(atk.ap * 30 / 100)) * (1 - mod.defMagRed))} / 
            {' '}{Math.round(((150)+(atk.ap * 30 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.round(((190)+(atk.ap * 30 / 100))* (1 - mod.defMagRed))}       
          </p>
    
          <p>
            <b>INITIAL:</b> summon <b>Tibbers</b> for 20 seconds dealing <span className="stat--ap">130 / 230 / 330 (+60% AP) magic damage</span> to all enemies in the target location. <br />

            <b>RECAST:</b> <b>Tibbers</b> pounces on a target dealing <span className="stat--ap"> 110 / 150 / 190 (+30% AP) magic damage</span> and knocking target up in the air for 1 second. <br />

            After initial cast, after pouncing or when Annie dies, Tibbers gains <span className="stat--moveSpeed">100% bonus movement speed</span> and <span className="stat--as">210% bonus attack speed</span>.
          </p>
        </div>
    }
  ],

  'Ashe': [
    {
      description:
        <div className="abilityDescription">
          <h4>
          <span className="marker--ability">P</span> FROST SHOT
          </h4> 

          <h5 className="stat--ad">
           Frost shot AA Damage:
          </h5>

          <p className="stat--ad">Pre-mitigation: 
            {' '}{Math.round(((atk.attack + atk.attack *(0.1 + atk.critChance))))}
            
          </p>

          <p className="stat--ad">Post-mitigation: 
            {' '}{Math.round(((atk.attack + atk.attack *(0.1 + atk.critChance))) * (1 - mod.defPhysRed))}
          </p> 
          
    
          <p>
          Ashe's attacks slow targets hit by <span className="stat--moveSpeed">15% / 17.5% / 20% / 22.5% / 25%</span>  for 2 seconds, causing her to deal increased <span className="stat--ad">10% (+100% Crit) bonus damage</span>  to these targets. Ashe's critical strikes deal no bonus damage but apply a <abbr title="40%-60% based on level" className="stat--moveSpeed">{Math.round(40+(20/14*(currentLevel - 1)))}% slow</abbr> to the target.
          </p>
        </div>
    },

    {
      description:
        <div className="abilityDescription">
          <h4>
          <span className="marker--ability">1</span> RANGER'S FOCUS
          </h4>
    
          <h5>
          Cooldown: 
            {' '}{(7*mod.atkcdr).toFixed(1)} / 
            {' '}{(6*mod.atkcdr).toFixed(1)} / 
            {' '}{(5*mod.atkcdr).toFixed(1)} / 
            {' '}{(4*mod.atkcdr).toFixed(1)} 
          </h5>
            <h5 className="stat--mana">
          Cost: 
            {' '}{50} / 
            {' '}{50} / 
            {' '}{50} / 
            {' '}{50} 
          </h5>

          <h5 className="stat--ad">
            Flurry damage:
          </h5>

          <p className="stat--ad">Pre-mitigation: 
            {' '}{Math.round(((atk.attack * 115 / 100)))} / 
            {' '}{Math.round(((atk.attack * 120 / 100)))} / 
            {' '}{Math.round(((atk.attack * 125 / 100)))} / 
            {' '}{Math.round(((atk.attack * 130 / 100)))}
          </p>

          <p className="stat--ad">Post-mitigation: 
            {' '}{Math.round(((atk.attack * 115 / 100)) * (1 - mod.defPhysRed))} / 
            {' '}{Math.round(((atk.attack * 120 / 100))* (1 - mod.defPhysRed))} / 
            {' '}{Math.round(((atk.attack * 125 / 100))* (1 - mod.defPhysRed))} / 
            {' '}{Math.round(((atk.attack * 130 / 100))* (1 - mod.defPhysRed))}
          </p>
    
          <p>
            <b>PASSIVE:</b> While Ranger's Focus is not active, Ashe stores 2 stacks of Focus and her basic attacks grant an additional one for 4 seconds, up to 6 at a time. Stacks decay one at a time after expiring. <br />

            <b>ACTIVE:</b> Ashe empower her bow for 6 seconds, gaining <span className="stat--as">25% / 35% / 45% / 55% Attack Speed</span> and barrage target with flurry of arrows. Each flurry consumes 1 stack and deals <span className="stat--ad">115% / 120% / 125% / 130% physical damage</span>
          </p>
        </div>
    },

    {
      description:
        <div className="abilityDescription">
          <h4>
          <span className="marker--ability">2</span> VOLLEY
          </h4>
    
          <h5>
          Cooldown: 
            {' '}{(16*mod.atkcdr).toFixed(1)} / 
            {' '}{(14*mod.atkcdr).toFixed(1)} / 
            {' '}{(11*mod.atkcdr).toFixed(1)} / 
            {' '}{(9*mod.atkcdr).toFixed(1)} 
          </h5>
            <h5 className="stat--mana">
          Cost: 
            {' '}{50} / 
            {' '}{50} / 
            {' '}{50} / 
            {' '}{50} 
          </h5>

          <h5 className="stat--ad">
            Damage:
          </h5>

          <p className="stat--ad">Pre-mitigation: 
            {' '}{Math.round(((20)+(atk.attack * 115 / 100)))} / 
            {' '}{Math.round(((40)+(atk.attack * 115 / 100)))} / 
            {' '}{Math.round(((60)+(atk.attack * 115 / 100)))} / 
            {' '}{Math.round(((80)+(atk.attack * 115 / 100)))}
          </p>

          <p className="stat--ad">Post-mitigation: 
            {' '}{Math.round(((20)+(atk.attack * 115 / 100)) * (1 - mod.defPhysRed))} / 
            {' '}{Math.round(((40)+(atk.attack * 115 / 100))* (1 - mod.defPhysRed))} / 
            {' '}{Math.round(((60)+(atk.attack * 115 / 100))* (1 - mod.defPhysRed))} / 
            {' '}{Math.round(((80)+(atk.attack * 115 / 100))* (1 - mod.defPhysRed))}          
          </p>
    
          <p>
          Ashe fires <b>5 / 7 / 9 / 11</b> arrows in a cone, dealing <span className="stat--ad">20 / 40/ 60 / 80 (+115% AD) physical damage</span>. Also applies a critical slow from Frost Shot.
          </p>
        </div>
    },

    {
      description:
        <div className="abilityDescription">
          <h4>
          <span className="marker--ability">3</span> HAWKSHOT
          </h4>
    
          <h5>
          Cooldown: 
            {' '}{(45*mod.atkcdr).toFixed(1)} / 
            {' '}{(40*mod.atkcdr).toFixed(1)} / 
            {' '}{(35*mod.atkcdr).toFixed(1)} / 
            {' '}{(30*mod.atkcdr).toFixed(1)} 
          </h5>
    
          <p>
          Ashe fires a hawk spirit that grants vision of enemies along its path. <br />
          <b>RECAST: </b>  Explodes the hawk, granting vision of the area around it for 5 seconds. Units caught in the initial explosion are revealed for 5 seconds.
          </p>
        </div>
    },

    {
      description:
        <div className="abilityDescription">
          <h4>
          <span className="marker--ability">ULT</span> ENCHANTED CRYSTAL ARROW 
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
            {' '}{Math.round(((200)+(atk.ap * 40 / 100)))} / 
            {' '}{Math.round(((350)+(atk.ap * 40 / 100)))} / 
            {' '}{Math.round(((500)+(atk.ap * 40 / 100)))}
          </p>

          <p className="stat--ad">Post-mitigation: 
            {' '}{Math.round(((200)+(atk.ap * 40 / 100)) * (1 - mod.defMagRed))} / 
            {' '}{Math.round(((350)+(atk.ap * 40 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.round(((500)+(atk.ap * 40 / 100))* (1 - mod.defMagRed))}      
          </p>
    
          <p>
            Fires a crystal arrow that deals <span className="stat--ap"> 200 / 350 / 500 (+40% AP) magic damage</span> in a small area on impact with enemy champion, stunning initial target for <b>1.5 to 3.5</b> seconds based on arrow's flight distance. Ashe can steer arrow while it flies.
          </p>
        </div>
    }
  ],

  'Aurelion Sol': [
    
    {
      description:
        <div className="abilityDescription">
          <h4>
          <span className="marker--ability">P</span> CENTER OF THE UNIVERSE
          </h4>

          <h5 className="stat--ap">
            Damage:
          </h5>

          <p className="stat--ad">Pre-mitigation: 
            {' '}{Math.round(((15)+(atk.ap * 25 / 100)))}
          </p>

          <p className="stat--ad">Post-mitigation: 
            {' '}{Math.round(((15)+(atk.ap * 25 / 100)) * (1 - mod.defMagRed))}
          </p> 

    
          <p>
            Stars orbit Aurelion Sol, dealing <span className="stat--ap">15 (+25% AP) magic damage</span> when they hit an enemy.
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
            Creates and launches a newborn star that detonates upon reaching the orbiting stars Outer Limit. Expands as it travels, dealing <span className="stat--ap">65 / 120 / 175 / 230 (+65% AP) magic damage</span> and stunning for 
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
  ],

  'Blitzcrank': [
    {
      description:
        <div className="abilityDescription">
          <h4>
          <span className="marker--ability">P</span> MANA BARRIER
          </h4>
    
          <h5>
          Cooldown: 
            {' '}{(50*mod.atkcdr).toFixed(1)} / 
          </h5>
            
          <h5 className="stat--hp">
            Shield: {Math.round(atk.mana * 30 / 100)}
          </h5>
           <p>
            When Blitzcrank receives damage that will put him under  <abbr title="35% maximum health">{Math.round(atk.health * 35 / 100)} health</abbr>, he gains a shield equal to <span className="stat--mana">30% maximum mana</span> up to 10 seconds
          </p>
        </div>
    },

    {
      description:
        <div className="abilityDescription">
          <h4>
          <span className="marker--ability">1</span> ROCKET GRAB
          </h4>
    
          <h5>
          Cooldown: 
            {' '}{(18*mod.atkcdr).toFixed(1)} / 
            {' '}{(17*mod.atkcdr).toFixed(1)} / 
            {' '}{(16*mod.atkcdr).toFixed(1)} / 
            {' '}{(15*mod.atkcdr).toFixed(1)} 
          </h5>
            <h5 className="stat--mana">
          Cost: 
            {' '}{100} / 
            {' '}{100} / 
            {' '}{100} / 
            {' '}{100} 
          </h5>

          <h5 className="stat--ap">
            Damage:
          </h5>

          <p className="stat--ad">Pre-mitigation: 
            {' '}{Math.round(((100)+(atk.ap * 100 / 100)))} / 
            {' '}{Math.round(((160)+(atk.ap * 100 / 100)))} / 
            {' '}{Math.round(((220)+(atk.ap * 100 / 100)))} / 
            {' '}{Math.round(((280)+(atk.ap * 100 / 100)))}
          </p>

          <p className="stat--ad">Post-mitigation: 
            {' '}{Math.round(((100)+(atk.ap * 100 / 100)) * (1 - mod.defMagRed))} / 
            {' '}{Math.round(((160)+(atk.ap * 100 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.round(((220)+(atk.ap * 100 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.round(((280)+(atk.ap * 100 / 100))* (1 - mod.defMagRed))}          
          </p>
    
          <p>
          Blitzcrank fires his right hand in a line in the target direction, catching the first enemy hit to deal them <span className="stat--ap">100 / 160 / 220 / 280 (+100% AP)</span> and pull them to Blitzcrank.
          </p>
        </div>
    },

    {
      description:
        <div className="abilityDescription">
          <h4>
          <span className="marker--ability">2</span> OVERDRIVE
          </h4>
    
          <h5>
          Cooldown: 
            {' '}{(10*mod.atkcdr).toFixed(1)} / 
            {' '}{(10*mod.atkcdr).toFixed(1)} / 
            {' '}{(10*mod.atkcdr).toFixed(1)} / 
            {' '}{(10*mod.atkcdr).toFixed(1)} 
          </h5>
            <h5 className="stat--mana">
          Cost: 
            {' '}{50} / 
            {' '}{50} / 
            {' '}{50} / 
            {' '}{50} 
          </h5>
    
          <p>
            Gain <span className="stat--moveSpeed"> 50% / 55% / 60% / 65% decaying Movement Speed </span> for 2.5 Seconds. <br />
            <b>RECAST:</b> gain <span className="stat--moveSpeed">140% / 150% / 160% / 170% decaying Movement Speed</span> for 1.5 seconds. <br />
            When Overdrive ends, Blitzcrank is slowed by <span className="stat--moveSpeed">33%</span> for 1.5 seconds. This is increased to <span className="stat--moveSpeed">99%</span> for 2 seconds if Overdrive was recast.
          </p>
        </div>
    },

    {
      description:
        <div className="abilityDescription">
          <h4>
          <span className="marker--ability">3</span> POWER FIST
          </h4>
    
          <h5>
          Cooldown: 
            {' '}{(8*mod.atkcdr).toFixed(1)} / 
            {' '}{(7*mod.atkcdr).toFixed(1)} / 
            {' '}{(6*mod.atkcdr).toFixed(1)} / 
            {' '}{(5*mod.atkcdr).toFixed(1)} 
          </h5>
            <h5 className="stat--mana">
          Cost: 
            {' '}{25} / 
            {' '}{25} / 
            {' '}{25} / 
            {' '}{25} 
          </h5>

          <h5 className="stat--ad">
            Damage:
          </h5>

          <p className="stat--ad">Pre-mitigation: 
            {' '}{Math.round(((0)+(atk.attack * 180 / 100)))} / 
            {' '}{Math.round(((0)+(atk.attack * 200 / 100)))} / 
            {' '}{Math.round(((0)+(atk.attack * 220 / 100)))} / 
            {' '}{Math.round(((0)+(atk.attack * 240 / 100)))}
          </p>

          <p className="stat--ad">Post-mitigation: 
            {' '}{Math.round(((0)+(atk.attack * 180 / 100)) * (1 - mod.defPhysRed))} / 
            {' '}{Math.round(((0)+(atk.attack * 200 / 100))* (1 - mod.defPhysRed))} / 
            {' '}{Math.round(((0)+(atk.attack * 220 / 100))* (1 - mod.defPhysRed))} / 
            {' '}{Math.round(((0)+(atk.attack * 240 / 100))* (1 - mod.defPhysRed))}          
          </p>
    
          <p>
            Blitzcrank empo0wers his next attack to critically strike for <span className="stat--ad">180% / 200% / 220% / 240% AD physical damage</span> and knock the target up in the air for 1 second.
          </p>
        </div>
    },

    {
      description:
        <div className="abilityDescription">
          <h4>
          <span className="marker--ability">ULT</span> STATIC FIELD
          </h4>
    
          <h5>
          Cooldown: 
            {' '}{(55*mod.atkcdr).toFixed(1)} / 
            {' '}{(35*mod.atkcdr).toFixed(1)} / 
            {' '}{(15*mod.atkcdr).toFixed(1)}
          </h5>
            <h5 className="stat--mana">
          Cost: 
            {' '}{100} / 
            {' '}{100} / 
            {' '}{100}
          </h5>

          <h5 className="stat--ap">
            Mark damage:
          </h5>

          <p className="stat--ad">Pre-mitigation: 
            {' '}{Math.round(((40)+(atk.ap * 15 / 100)))} / 
            {' '}{Math.round(((80)+(atk.ap * 15 / 100)))} / 
            {' '}{Math.round(((120)+(atk.ap * 15 / 100)))}
          </p>

          <p className="stat--ad">Post-mitigation: 
            {' '}{Math.round(((40)+(atk.ap * 15 / 100)) * (1 - mod.defMagRed))} / 
            {' '}{Math.round(((80)+(atk.ap * 15 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.round(((120)+(atk.ap * 15 / 100))* (1 - mod.defMagRed))}
          </p>

          <h5 className="stat--ap">
          Cast damage:
          </h5>

          <p className="stat--ad">Pre-mitigation: 
            {' '}{Math.round(((200)+(atk.ap * 80 / 100)))} / 
            {' '}{Math.round(((325)+(atk.ap * 80 / 100)))} / 
            {' '}{Math.round(((450)+(atk.ap * 80 / 100)))}
          </p>

          <p className="stat--ad">Post-mitigation: 
            {' '}{Math.round(((200)+(atk.ap * 80 / 100)) * (1 - mod.defMagRed))} / 
            {' '}{Math.round(((325)+(atk.ap * 80 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.round(((450)+(atk.ap * 80 / 100))* (1 - mod.defMagRed))}
          </p>
    
          <p>
            <b>PASSIVE:</b> While Static Field is off cooldown, attacks marks enemies to deal <span className="stat--ap">40 / 80 / 120 (+15% AP) magic damage</span> after 1 second. <br />
            <b>ACTIVE:</b> Deals <span className="stat--ap">200 / 325 / 450 (+80% AP) magic damage</span> to nearby enemies and silences them for 0.5 seconds.
          </p>
        </div>
    }
  ],

  'Brand': [
    {
      description:
        <div className="abilityDescription">
          <h4>
          <span className="marker--ability">P</span> BLAZE
          </h4> 

          <p>
           Brand abilities set enemies Ablaze dealing <span className="stat--ap">3% ({Math.round(def.health * 3 / 100 * (1 - mod.defMagRed))})</span> of their max health as magic damage over 4 seconds. <br />
           Stacking Ablaze 3 times on champions and large monsters causes them to detonate after 2 seconds dealing <span className="stat--ap">10% (+0.02% AP)</span> of <b>each enemy</b> max Health as <span className="stat--ap">Magic damage</span>. (current target: <span className="stat--ap">{Math.round(def.health*((10 / 100)+(atk.ap * 0.02 / 100))* (1 - mod.defMagRed))}</span> damage ) <br />
           Enemies that detonate cannot be set Ablaze again for 4 seconds.
          </p>
        </div>
    },

    {
      description:
        <div className="abilityDescription">
          <h4>
          <span className="marker--ability">1</span> SEAR
          </h4>
    
          <h5>
          Cooldown: 
            {' '}{(7*mod.atkcdr).toFixed(1)} / 
            {' '}{(7*mod.atkcdr).toFixed(1)} / 
            {' '}{(6*mod.atkcdr).toFixed(1)} / 
            {' '}{(6*mod.atkcdr).toFixed(1)} 
          </h5>
            <h5 className="stat--mana">
          Cost: 
            {' '}{50} / 
            {' '}{50} / 
            {' '}{50} / 
            {' '}{50} 
          </h5>

          <h5 className="stat--ap">
            Damage:
          </h5>

          <p className="stat--ad">Pre-mitigation: 
            {' '}{Math.round(((80)+(atk.ap * 55 / 100)))} / 
            {' '}{Math.round(((120)+(atk.ap * 55 / 100)))} / 
            {' '}{Math.round(((160)+(atk.ap * 55 / 100)))} / 
            {' '}{Math.round(((200)+(atk.ap * 55 / 100)))}
          </p>

          <p className="stat--ad">Post-mitigation: 
            {' '}{Math.round(((80)+(atk.ap * 55 / 100)) * (1 - mod.defMagRed))} / 
            {' '}{Math.round(((120)+(atk.ap * 55 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.round(((160)+(atk.ap * 55 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.round(((200)+(atk.ap * 55 / 100))* (1 - mod.defMagRed))}          
          </p>
    
          <p>
            Launch a fireball forward that deals <span className="stat--ap">80 / 120 / 160 / 200 (+55%) magic damage</span> to the first enemy i hits. If the target is <b>ablaze</b>, stun them for 1.75 seconds.
          </p>
        </div>
    },

    {
      description:
        <div className="abilityDescription">
          <h4>
          <span className="marker--ability">2</span> PILLAR OF FLAME
          </h4>
    
          <h5>
          Cooldown: 
            {' '}{(10*mod.atkcdr).toFixed(1)} / 
            {' '}{(9*mod.atkcdr).toFixed(1)} / 
            {' '}{(9*mod.atkcdr).toFixed(1)} / 
            {' '}{(8*mod.atkcdr).toFixed(1)} 
          </h5>
            <h5 className="stat--mana">
          Cost: 
            {' '}{75} / 
            {' '}{85} / 
            {' '}{95} / 
            {' '}{105} 
          </h5>

          <h5 className="stat--ap">
            Damage:
          </h5>

          <p className="stat--ad">Pre-mitigation: 
            {' '}{Math.round(((70)+(atk.ap * 55 / 100)))} / 
            {' '}{Math.round(((125)+(atk.ap * 55 / 100)))} / 
            {' '}{Math.round(((180)+(atk.ap * 55 / 100)))} / 
            {' '}{Math.round(((235)+(atk.ap * 55 / 100)))}
          </p>

          <p className="stat--ad">Post-mitigation: 
            {' '}{Math.round(((70)+(atk.ap * 55 / 100)) * (1 - mod.defMagRed))} / 
            {' '}{Math.round(((125)+(atk.ap * 55 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.round(((180)+(atk.ap * 55 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.round(((235)+(atk.ap * 55 / 100))* (1 - mod.defMagRed))}          
          </p>

          <h5 className="stat--ap">
           Ablazed damage:
          </h5>

          <p className="stat--ad">Pre-mitigation: 
            {' '}{Math.round(((70)+(atk.ap * 55 / 100))*1.3)} / 
            {' '}{Math.round(((125)+(atk.ap * 55 / 100))*1.3)} / 
            {' '}{Math.round(((180)+(atk.ap * 55 / 100))*1.3)} / 
            {' '}{Math.round(((235)+(atk.ap * 55 / 100))*1.3)}
          </p>

          <p className="stat--ad">Post-mitigation: 
            {' '}{Math.round((((70)+(atk.ap * 55 / 100))*1.3) * (1 - mod.defMagRed))} / 
            {' '}{Math.round((((125)+(atk.ap * 55 / 100))*1.3)* (1 - mod.defMagRed))} / 
            {' '}{Math.round((((180)+(atk.ap * 55 / 100))*1.3)* (1 - mod.defMagRed))} / 
            {' '}{Math.round((((235)+(atk.ap * 55 / 100))*1.3)* (1 - mod.defMagRed))}          
          </p>          
    
          <p>
           Target an area, after a short delay create a pillar of flame at targeted area that deals <span className="stat--ap">70 / 125 / 180/ 235 (+55% AP) magic damage</span> to enemies in the area. Units that ablaze take <b>30%</b> additional damage. 
          </p>
        </div>
    },

    {
      description:
        <div className="abilityDescription">
          <h4>
          <span className="marker--ability">3</span> CONFLAGRATION
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
            {' '}{75} / 
            {' '}{80} / 
            {' '}{85} / 
            {' '}{90} 
          </h5>

          <h5 className="stat--ap">
            Damage:
          </h5>

          <p className="stat--ad">Pre-mitigation: 
            {' '}{Math.round(((60)+(atk.ap * 40 / 100)))} / 
            {' '}{Math.round(((90)+(atk.ap * 40 / 100)))} / 
            {' '}{Math.round(((120)+(atk.ap * 40 / 100)))} / 
            {' '}{Math.round(((150)+(atk.ap * 40 / 100)))}
          </p>

          <p className="stat--ad">Post-mitigation: 
            {' '}{Math.round(((60)+(atk.ap * 40 / 100)) * (1 - mod.defMagRed))} / 
            {' '}{Math.round(((90)+(atk.ap * 40 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.round(((120)+(atk.ap * 40 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.round(((150)+(atk.ap * 40 / 100))* (1 - mod.defMagRed))}          
          </p>
    
          <p>
            Set the target aflame and spread conflagration to all enemies near initial target, dealing <span className="stat--ap">60 / 90 / 120 / 150 (+40%AP) magic damage</span>. When initial target is <b>ablaze</b>, Conflagration's spread radius doubles.
          </p>
        </div>
    },

    {
      description:
        <div className="abilityDescription">
          <h4>
          <span className="marker--ability">ULT</span> PYROCLASM
          </h4>
    
          <h5>
          Cooldown: 
            {' '}{(70*mod.atkcdr).toFixed(1)} / 
            {' '}{(65*mod.atkcdr).toFixed(1)} / 
            {' '}{(60*mod.atkcdr).toFixed(1)}
          </h5>
            <h5 className="stat--mana">
          Cost: 
            {' '}{100} / 
            {' '}{100} / 
            {' '}{100}
          </h5>

          <h5 className="stat--ap">
          Bounce damage:
          </h5>

          <p className="stat--ad">Pre-mitigation: 
            {' '}{Math.round(((100)+(atk.ap * 25 / 100)))} / 
            {' '}{Math.round(((200)+(atk.ap * 25 / 100)))} / 
            {' '}{Math.round(((300)+(atk.ap * 25 / 100)))}
          </p>

          <p className="stat--ad">Post-mitigation: 
            {' '}{Math.round(((100)+(atk.ap * 25 / 100)) * (1 - mod.defMagRed))} / 
            {' '}{Math.round(((200)+(atk.ap * 25 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.round(((300)+(atk.ap * 25 / 100))* (1 - mod.defMagRed))}
          </p>
    
          <p>
            Throw a fireball that bounces up to 5 times between enemies or Brand, each bounce dealing <span className="stat--ap">100 / 200 / 300 (+25% AP) magic damage</span> <br />

            Puroclasm brielfy slows by <span className="stat--moveSpeed">30% / 40% / 50%</span> targets that are <b>ablaze</b>. Bounces attempt to max stacks on champions.
          </p>
        </div>
    }
  ],

  'Braum': [
    {
      description:
        <div className="abilityDescription">
          <h4>
          <span className="marker--ability">P</span> CONCUSSIVE BLOWS
          </h4>
    
          <p>
          Braum's basic attacks apply Concussive Blows. Once the first stack is applied, ally basic attacks also stack Concussive Blows. Upon reaching 4 stacks, the target is stunned for 1 second and takes <abbr title="32-200 based on level" className="stat--ap"> {Math.round((20+12*currentLevel))} ({Math.round((20+12*currentLevel)*(1 - mod.defMagRed))}) magic damage</abbr>. For the next 8 seconds they cannot receive new stacks, but take bonus <abbr title="7-40 based on level" className="stat--ap"> {Math.round((7+33/14*(currentLevel - 1)))} ({Math.round((7+33/14*(currentLevel - 1))*(1 - mod.defMagRed))})</abbr> magic damage from Braum's attacks.
          </p>
        </div>
    },

    {
      description:
        <div className="abilityDescription">
          <h4>
          <span className="marker--ability">1</span> WINTER'S BITE
          </h4>
    
          <h5>
          Cooldown: 
            {' '}{(10*mod.atkcdr).toFixed(1)} / 
            {' '}{(9*mod.atkcdr).toFixed(1)} / 
            {' '}{(8*mod.atkcdr).toFixed(1)} / 
            {' '}{(7*mod.atkcdr).toFixed(1)} 
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

          <p className="stat--ad">Pre-mitigation: 
            {' '}{Math.round(((60)+(atk.health * 3 / 100)))} / 
            {' '}{Math.round(((120)+(atk.health * 3 / 100)))} / 
            {' '}{Math.round(((180)+(atk.health * 3 / 100)))} / 
            {' '}{Math.round(((240)+(atk.health * 3 / 100)))}
          </p>

          <p className="stat--ad">Post-mitigation: 
            {' '}{Math.round(((60)+(atk.health * 3 / 100)) * (1 - mod.defMagRed))} / 
            {' '}{Math.round(((120)+(atk.health * 3 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.round(((180)+(atk.health * 3 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.round(((240)+(atk.health * 3 / 100))* (1 - mod.defMagRed))}          
          </p>
    
          <p>
            Lauches ice that deals <span className="stat--ap">60 / 120 / 180 / 240 <span className="stat--hp">(+3% HP)</span> magic damage</span>  and slows the enemy hit by <span className="stat--moveSpeed">70%</span> for 2 seconds. Applies a stack of Concussive Blows.
          </p>
        </div>
    },

    {
      description:
        <div className="abilityDescription">
          <h4>
          <span className="marker--ability">2</span> STAND BEHIND ME
          </h4>
    
          <h5>
          Cooldown: 
            {' '}{(13*mod.atkcdr).toFixed(1)} / 
            {' '}{(12*mod.atkcdr).toFixed(1)} / 
            {' '}{(11*mod.atkcdr).toFixed(1)} / 
            {' '}{(10*mod.atkcdr).toFixed(1)} 
          </h5>
            <h5 className="stat--mana">
          Cost: 
            {' '}{55} / 
            {' '}{60} / 
            {' '}{65} / 
            {' '}{70} 
          </h5>

          <h5 className="stat--hp">Bonus stats:</h5>
          <p className="stat--armor">Armor:
          {' '}{Math.round(10 + (atk.armor * 10 / 100))} /
          {' '}{Math.round(15 + (atk.armor * 12 / 100))} /
          {' '}{Math.round(20 + (atk.armor * 14 / 100))} /
          {' '}{Math.round(25 + (atk.armor * 16 / 100))}
          </p>
          <p className="stat--magres">Magic Resistance:
          {' '}{Math.round(10 + (atk.magres * 10 / 100))} /
          {' '}{Math.round(15 + (atk.magres * 12 / 100))} /
          {' '}{Math.round(20 + (atk.magres * 14 / 100))} /
          {' '}{Math.round(25 + (atk.magres * 16 / 100))}
          </p>
    
          <p>
          Leaps to an ally. Braum and the ally gain <span className="stat--armor">10 / 15 / 20 / 25 (+10% / 12% / 14% / 16% Armor) Armor</span> and <span className="stat--magres">10 / 15 / 20 / 25 (+10% / 12% / 14% / 16% MR) Magic Resist</span> for 3 seconds on arrival.
          </p>
        </div>
    },

    {
      description:
        <div className="abilityDescription">
          <h4>
          <span className="marker--ability">3</span> UNBREAKABLE
          </h4>
    
          <h5>
          Cooldown: 
            {' '}{(16*mod.atkcdr).toFixed(1)} / 
            {' '}{(14*mod.atkcdr).toFixed(1)} / 
            {' '}{(12*mod.atkcdr).toFixed(1)} / 
            {' '}{(10*mod.atkcdr).toFixed(1)} 
          </h5>
            <h5 className="stat--mana">
          Cost: 
            {' '}{35} / 
            {' '}{40} / 
            {' '}{45} / 
            {' '}{50} 
          </h5>
    
          <p>
          Braum raises his shield in a target direction, intercepting projectiles for 4 seconds. Braum negates the first instance of damage and takes <span className="stat--ad">28% / 32% / 36% / 40% reduced damage</span> afterwards. Braum gains <span className="stat--moveSpeed">10% Movement Speed</span> while his shield is raised.
          </p>
        </div>
    },

    {
      description:
        <div className="abilityDescription">
          <h4>
          <span className="marker--ability">ULT</span> GlACIAL FISSURE
          </h4>
    
          <h5>
          Cooldown: 
            {' '}{(75*mod.atkcdr).toFixed(1)} / 
            {' '}{(70*mod.atkcdr).toFixed(1)} / 
            {' '}{(65*mod.atkcdr).toFixed(1)}
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
            {' '}{Math.round(((150)+(atk.ap * 60 / 100)))} / 
            {' '}{Math.round(((250)+(atk.ap * 60 / 100)))} / 
            {' '}{Math.round(((350)+(atk.ap * 60 / 100)))}
          </p>

          <p className="stat--ad">Post-mitigation: 
            {' '}{Math.round(((150)+(atk.ap * 60 / 100)) * (1 - mod.defMagRed))} / 
            {' '}{Math.round(((250)+(atk.ap * 60 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.round(((350)+(atk.ap * 60 / 100))* (1 - mod.defMagRed))}
          </p>
    
          <p>
          Slams the ground and opens a fissure, <span className="stat--ap">dealing 150 / 250 / 350 (+60% AP) magic damage</span> and knocking up enemies for 1 second. <br />
          The fissure slows enemies by <span className="stat--moveSpeed">40% / 50% / 60%</span> and lasts for 4 seconds. <br />
          After the first enemy champion hit, subsequent enemies are knock up for 0.25 seconds.
          </p>
        </div>
    }
  ],

  'Caitlyn': [
    {
      description:
        <div className="abilityDescription">
          <h4>
          <span className="marker--ability">P</span> HEADSHOT
          </h4>    
          <p>
            After 6 basic attacks (basic attacks from bush counts as 2) the next basic attack deals <abbr title="50% - 100% based on level +125% critical strike chance. Shown pre/post-mitigation number" className="stat--ad">{Math.round(atk.attack* (50 + (currentLevel < 12 ? (5 * currentLevel - 1): (50))+ (atk.critChance*125))/100)} ({Math.round((atk.attack* (50 + (currentLevel < 12 ? (5 * currentLevel - 1): (50))+ (atk.critChance*125))/100)*(1 - mod.defPhysRed))}) bonus physical damage</abbr>. <b>Trapped</b> or <b>Netted</b> enemies trigger a Headshot that has double range.
          </p>
        </div>
    },

    {
      description:
        <div className="abilityDescription">
          <h4>
          <span className="marker--ability">1</span> PILLTOVER PEACEMAKER
          </h4>
    
          <h5>
          Cooldown: 
            {' '}{(9*mod.atkcdr).toFixed(1)} / 
            {' '}{(8*mod.atkcdr).toFixed(1)} / 
            {' '}{(7*mod.atkcdr).toFixed(1)} / 
            {' '}{(6*mod.atkcdr).toFixed(1)} 
          </h5>
            <h5 className="stat--mana">
          Cost: 
            {' '}{50} / 
            {' '}{60} / 
            {' '}{70} / 
            {' '}{80} 
          </h5>

          <h5 className="stat--ad">
            Damage:
          </h5>

          <p className="stat--ad">Pre-mitigation: 
            {' '}{Math.round(((60)+(atk.attack * 125 / 100)))} / 
            {' '}{Math.round(((110)+(atk.attack * 140 / 100)))} / 
            {' '}{Math.round(((160)+(atk.attack * 155 / 100)))} / 
            {' '}{Math.round(((210)+(atk.attack * 170 / 100)))}
          </p>

          <p className="stat--ad">Post-mitigation: 
            {' '}{Math.round(((60)+(atk.attack * 125 / 100)) * (1 - mod.defPhysRed))} / 
            {' '}{Math.round(((110)+(atk.attack * 140 / 100))* (1 - mod.defPhysRed))} / 
            {' '}{Math.round(((160)+(atk.attack * 155 / 100))* (1 - mod.defPhysRed))} / 
            {' '}{Math.round(((210)+(atk.attack * 170 / 100))* (1 - mod.defPhysRed))}          
          </p>
    
          <p>
            Fires a narrow piercing bullet that deals <span className="stat--ad"> 60 / 110 / 160 / 210 (+ 125% / 140% / 155% / 170% AD) physical damage</span>. Hitting an enemy expands the bullet, but reduces subsequent damage by <b>40%</b>. Always deals full damage to trapped or netted enemies.
          </p>
        </div>
    },

    {
      description:
        <div className="abilityDescription">
          <h4>
          <span className="marker--ability">2</span> YORDLE SNAP TRAP
          </h4>
    
          <h5>
          Cooldown: 
            {' '}{(27*mod.atkcdr).toFixed(1)} / 
            {' '}{(22*mod.atkcdr).toFixed(1)} / 
            {' '}{(17*mod.atkcdr).toFixed(1)} / 
            {' '}{(12*mod.atkcdr).toFixed(1)} 
          </h5>
            <h5 className="stat--mana">
          Cost: 
            {' '}{20} / 
            {' '}{20} / 
            {' '}{20} / 
            {' '}{20} 
          </h5>
          <h5>
            Active traps: 2 / 3 / 4 / 5
          </h5>
    
          <p>
            Sets a trap. Enemy champions caught are immobilized for 1.5 seconds, revealed for a short duration and trigger a free <b>Headshot</b> on them. Traps last for 30 seconds and  2 / 3 / 4 / 5 can be active at once.
          </p>
        </div>
    },

    {
      description:
        <div className="abilityDescription">
          <h4>
          <span className="marker--ability">3</span> 90 CALIBER NET
          </h4>
    
          <h5>
          Cooldown: 
            {' '}{(16*mod.atkcdr).toFixed(1)} / 
            {' '}{(14*mod.atkcdr).toFixed(1)} / 
            {' '}{(12*mod.atkcdr).toFixed(1)} / 
            {' '}{(10*mod.atkcdr).toFixed(1)} 
          </h5>
            <h5 className="stat--mana">
          Cost: 
            {' '}{75} / 
            {' '}{75} / 
            {' '}{75} / 
            {' '}{75} 
          </h5>

          <h5 className="stat--ap">
            Damage:
          </h5>

          <p className="stat--ad">Pre-mitigation: 
            {' '}{Math.round(((70)+(atk.ap * 80 / 100)))} / 
            {' '}{Math.round(((120)+(atk.ap * 80 / 100)))} / 
            {' '}{Math.round(((170)+(atk.ap * 80 / 100)))} / 
            {' '}{Math.round(((220)+(atk.ap * 80 / 100)))}
          </p>

          <p className="stat--ad">Post-mitigation: 
            {' '}{Math.round(((70)+(atk.ap * 80 / 100)) * (1 - mod.defMagRed))} / 
            {' '}{Math.round(((120)+(atk.ap * 80 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.round(((170)+(atk.ap * 80 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.round(((220)+(atk.ap * 80 / 100))* (1 - mod.defMagRed))}          
          </p>
    
          <p>
            Fires a net, knocking Caitlyn backwards. The net deals <span className="stat--ap">70 / 120 / 170 / 220 (+80% AP) magic damage</span> slows champion hit by 50% for 1.5 seconds and triggers a free <b>Headshot</b> on them.
          </p>
        </div>
    },

    {
      description:
        <div className="abilityDescription">
          <h4>
          <span className="marker--ability">ULT</span> ACE IN THE HOLE
          </h4>
    
          <h5>
          Cooldown: 
            {' '}{(65*mod.atkcdr).toFixed(1)} / 
            {' '}{(55*mod.atkcdr).toFixed(1)} / 
            {' '}{(45*mod.atkcdr).toFixed(1)}
          </h5>
            <h5 className="stat--mana">
          Cost: 
            {' '}{100} / 
            {' '}{100} / 
            {' '}{100}
          </h5>

          <h5 className="stat--ad">
          Minimum damage:
          </h5>

          <p className="stat--ad">Pre-mitigation: 
            {' '}{Math.round(((200)+(atk.attack * 200 / 100)))} / 
            {' '}{Math.round(((375)+(atk.attack * 200 / 100)))} / 
            {' '}{Math.round(((550)+(atk.attack * 200 / 100)))}
          </p>

          <p className="stat--ad">Post-mitigation: 
            {' '}{Math.round(((200)+(atk.attack * 200 / 100)) * (1 - mod.defPhysRed))} / 
            {' '}{Math.round(((375)+(atk.attack * 200 / 100))* (1 - mod.defPhysRed))} / 
            {' '}{Math.round(((550)+(atk.attack * 200 / 100))* (1 - mod.defPhysRed))}        
          </p>
    
          <p>
            Lines up the perfect shot, Revealing an enemy champion for 1.5 seconds before dealing <span className="stat--ad">200 / 375 / 550 (+200% AD) <span className="stat--hp">(+20% of target's missing health)</span> physical damage</span>. Enemy champions can intercept the bullet before it hits their ally.
          </p>
        </div>
    }
  ],
  
  'Camille': [
    {
      description:
        <div className="abilityDescription">
          <h4>
          <span className="marker--ability">P</span> ADAPTIVE DEFENSES
          </h4>

          <h5>
          <abbr title="based on level. Changes on 1 / 5 / 9 / 13"></abbr>  Cooldown: 
            {' '}{(18*mod.atkcdr).toFixed(1)} / 
            {' '}{(16*mod.atkcdr).toFixed(1)} / 
            {' '}{(14*mod.atkcdr).toFixed(1)} / 
            {' '}{(12*mod.atkcdr).toFixed(1)} 
          </h5>

          <h3 className="stat--hp">Shield strength: {Math.round(atk.health * 20 / 100)}</h3> 
          
    
          <p>
          Attacking an enemy champion grants a shield that absorbs <span className="stat--armor">physical</span> / <span className="stat--magres">magic</span> damage  equal to <span className="stat--hp">20% of Max Health</span> for 2 seconds. The shield type is based on the type of damage the attacked target deals.
          </p>
        </div>
    },

    {
      description:
        <div className="abilityDescription">
          <h4>
          <span className="marker--ability">1</span> PRECISION PROTOCOL
          </h4>
    
          <h5>
          Cooldown: 
            {' '}{(9*mod.atkcdr).toFixed(1)} / 
            {' '}{(8*mod.atkcdr).toFixed(1)} / 
            {' '}{(7*mod.atkcdr).toFixed(1)} / 
            {' '}{(6*mod.atkcdr).toFixed(1)} 
          </h5>
            <h5 className="stat--mana">
          Cost: 
            {' '}{25} / 
            {' '}{25} / 
            {' '}{25} / 
            {' '}{25} 
          </h5>

          <h5 className="stat--ad">
          First cast damage:
          </h5>

          <p className="stat--ad">Pre-mitigation: 
            {' '}{Math.round(((0)+(atk.attack * 120 / 100)))} / 
            {' '}{Math.round(((0)+(atk.attack * 130 / 100)))} / 
            {' '}{Math.round(((0)+(atk.attack * 140 / 100)))} / 
            {' '}{Math.round(((0)+(atk.attack * 150 / 100)))}
          </p>

          <p className="stat--ad">Post-mitigation: 
            {' '}{Math.round(((0)+(atk.attack * 120 / 100)) * (1 - mod.defPhysRed))} / 
            {' '}{Math.round(((0)+(atk.attack * 130 / 100))* (1 - mod.defPhysRed))} / 
            {' '}{Math.round(((0)+(atk.attack * 140 / 100))* (1 - mod.defPhysRed))} / 
            {' '}{Math.round(((0)+(atk.attack * 150 / 100))* (1 - mod.defPhysRed))}          
          </p>

          <h5 className="stat--ad">
          Second cast damage:
          </h5>         

          <p className="stat--ad">Post-mitigation: 
            {' '}{Math.round((((atk.attack * 120 / 100))*0.6) * (1 - mod.defPhysRed) + (((atk.attack * 120 / 100))*0.4))} / 
            {' '}{Math.round((((atk.attack * 130 / 100))*0.6)* (1 - mod.defPhysRed)+(((atk.attack * 130 / 100))*0.4))} / 
            {' '}{Math.round((((atk.attack * 140 / 100))*0.6)* (1 - mod.defPhysRed)+(((atk.attack * 140 / 100))*0.4))} / 
            {' '}{Math.round((((atk.attack * 150 / 100))*0.6)* (1 - mod.defPhysRed)+(((atk.attack * 150 / 100))*0.4))}          
          </p>
    
          <p>
          Empowers the next attack to deal <span className="stat--ad">120% / 130% / 140% / 150% physical damage</span> and grant <span className="stat--moveSpeed">25% Movement Speed</span> for 1.5 seconds. <br />

          1.6 seconds after the first attack, Precision Protocol automatically empowers another basic attack, dealing <span className="stat--critChance">40%</span> of its damage as <span className="stat--critChance">true damage</span> instead.
          </p>
        </div>
    },

    {
      description:
        <div className="abilityDescription">
          <h4>
          <span className="marker--ability">2</span> TACTICAL SWEEP
          </h4>
    
          <h5>
          Cooldown: 
            {' '}{(15*mod.atkcdr).toFixed(1)} / 
            {' '}{(13*mod.atkcdr).toFixed(1)} / 
            {' '}{(11*mod.atkcdr).toFixed(1)} / 
            {' '}{(9*mod.atkcdr).toFixed(1)} 
          </h5>
            <h5 className="stat--mana">
          Cost: 
            {' '}{50} / 
            {' '}{55} / 
            {' '}{60} / 
            {' '}{65} 
          </h5>

          <h5 className="stat--ad">
            Damage:
          </h5>

          <p className="stat--ad">Pre-mitigation: 
            {' '}{Math.round(((90)+(atk.attack * 110 / 100)+(def.health * 4 / 100)))} / 
            {' '}{Math.round(((120)+(atk.attack * 110 / 100)+(def.health * 6 / 100)))} / 
            {' '}{Math.round(((150)+(atk.attack * 110 / 100)+(def.health * 8 / 100)))} / 
            {' '}{Math.round(((180)+(atk.attack * 110 / 100)+(def.health * 10 / 100)))}
          </p>

          <p className="stat--ad">Post-mitigation: 
            {' '}{Math.round(((90)+(atk.attack * 110 / 100)+(def.health * 4 / 100)) * (1 - mod.defPhysRed))} / 
            {' '}{Math.round(((120)+(atk.attack * 110 / 100)+(def.health * 6 / 100))* (1 - mod.defPhysRed))} / 
            {' '}{Math.round(((150)+(atk.attack * 110 / 100)+(def.health * 8 / 100))* (1 - mod.defPhysRed))} / 
            {' '}{Math.round(((180)+(atk.attack * 110 / 100)+(def.health * 10 / 100))* (1 - mod.defPhysRed))}          
          </p>

          <h5 className="stat--hp">
            Healing:
          </h5>
          <p className="stat--hp">VS current target: 
            {' '}{Math.round((((90)+(atk.attack * 110 / 100)+(def.health * 4 / 100)) * (1 - mod.defPhysRed))*0.4)} / 
            {' '}{Math.round((((120)+(atk.attack * 110 / 100)+(def.health * 6 / 100))* (1 - mod.defPhysRed))*0.4)} / 
            {' '}{Math.round((((150)+(atk.attack * 110 / 100)+(def.health * 8 / 100))* (1 - mod.defPhysRed))*0.4)} / 
            {' '}{Math.round((((180)+(atk.attack * 110 / 100)+(def.health * 10 / 100))* (1 - mod.defPhysRed))*0.4)}          
          </p>
    
          <p>
            Slices in a direction dealing <span className="stat--ad">90 / 120 / 150 / 180 (+110% AD) <span className="stat--hp">(+4% / 6% / 8% / 10% of target's Max Health)</span> as physical damage</span>, <br />
            Enemies hit by the outer half are slowed by <span className="stat--moveSpeed">80%</span> decaying over 2 seconds, healing Camille for <span className="stat--hp">40%</span> of the damage dealt to Champions. 
          </p>
        </div>
    },

    {
      description:
        <div className="abilityDescription">
          <h4>
          <span className="marker--ability">3</span> HOOKSHOT
          </h4>
    
          <h5>
          Cooldown: 
            {' '}{(22*mod.atkcdr).toFixed(1)} / 
            {' '}{(20*mod.atkcdr).toFixed(1)} / 
            {' '}{(18*mod.atkcdr).toFixed(1)} / 
            {' '}{(16*mod.atkcdr).toFixed(1)}
          </h5>
            <h5 className="stat--mana">
          Cost: 
            {' '}{70} / 
            {' '}{70} / 
            {' '}{70} / 
            {' '}{70} 
          </h5>

          <h5 className="stat--as">
            Bonus Atack Speed:
            {' '}{(champ.asBase*0.5).toFixed(3)} /
            {' '}{(champ.asBase*0.6).toFixed(3)} /
            {' '}{(champ.asBase*0.7).toFixed(3)} /
            {' '}{(champ.asBase*0.8).toFixed(3)}
          </h5>          

          <h5 className="stat--ad">
            Damage:
          </h5>

          <p className="stat--ad">Pre-mitigation: 
            {' '}{Math.round(((60)+(atk.attack * 75 / 100)))} / 
            {' '}{Math.round(((110)+(atk.attack * 75 / 100)))} / 
            {' '}{Math.round(((160)+(atk.attack * 75 / 100)))} / 
            {' '}{Math.round(((210)+(atk.attack * 75 / 100)))}
          </p>

          <p className="stat--ad">Post-mitigation: 
            {' '}{Math.round(((60)+(atk.attack * 75 / 100)) * (1 - mod.defPhysRed))} / 
            {' '}{Math.round(((110)+(atk.attack * 75 / 100))* (1 - mod.defPhysRed))} / 
            {' '}{Math.round(((160)+(atk.attack * 75 / 100))* (1 - mod.defPhysRed))} / 
            {' '}{Math.round(((210)+(atk.attack * 75 / 100))* (1 - mod.defPhysRed))}          
          </p>
    
          <p>
          <b>First Cast:</b> FIres a hookshot that attaches to terrain, pulling Camille to it. If Camille misses, it is placed on a 3 second cooldown. <br />


          <b>Second Cast:</b> Dashes from the wall, dealing <span className="stat--ad">60 / 110 / 160 / 210 (+75% AD) physical damage</span> on landing. Regardless of landing, Camille's next basic attack against enemy champions within 3 seconds, grants <span className="stat--as">50% / 60% / 70% / 80% Attack Speed</span> for 5 seconds. If the dash hits an enemy champion, they are stunned for 0.75 seconds, and Hookshot's cooldown is reduced by 5 seconds.
          </p>
        </div>
    },

    {
      description:
        <div className="abilityDescription">
          <h4>
          <span className="marker--ability">ULT</span> HEXTECH ULTIMATUM
          </h4>
    
          <h5>
          Cooldown: 
            {' '}{(90*mod.atkcdr).toFixed(1)} / 
            {' '}{(80*mod.atkcdr).toFixed(1)} / 
            {' '}{(70*mod.atkcdr).toFixed(1)}
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

          <p className="stat--ad">Current target at 100% HP: 
            {' '}{Math.round(((30)+(def.health * 15 / 100)) * (1 - mod.defMagRed))} / 
            {' '}{Math.round(((30)+(def.health * 20 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.round(((30)+(def.health * 25 / 100))* (1 - mod.defMagRed))}      
          </p>

          <p className="stat--ad">Current target at 50% HP: 
            {' '}{Math.round(((30)+((def.health/2) * 15 / 100)) * (1 - mod.defMagRed))} / 
            {' '}{Math.round(((30)+((def.health/2) * 20 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.round(((30)+((def.health/2) * 25 / 100))* (1 - mod.defMagRed))}      
          </p>
    
          <p>
          Leap to enemy champion, becoming untargetable for 0.75 seconds and dealing <span>30 <span className="stat--hp">(+ 15% / 20% / 25% of target's current Health)</span>  magic damage </span>, knocking away other enemies and creating an inescapable zone for 2 / 2.5 / 3 seconds. Hextech Ultimatum ends when Camille leaves the zone.
          </p>
        </div>
    }
  ],

  'Corki': [
    {
      description:
        <div className="abilityDescription">
          <h4>
          <span className="marker--ability">P</span> HEXTECH MUNITIONS
          </h4> 

          <h5 className="stat--ad">
            Damage: {' '}{Math.round((((atk.attack * 20 / 100)) * (1 - mod.defPhysRed)) + (((atk.attack * 80 / 100)) * (1 - mod.defMagRed)))} : {Math.round((((atk.attack * 20 / 100)) * (1 - mod.defPhysRed)))} Physical + <span className="stat--ap"> {Math.round((((atk.attack * 80 / 100)) * (1 - mod.defMagRed)))} Magic</span>
          </h5>
          
    
          <p>
            <b>Hextech Shrapnel:</b> Attacks deal <span className="stat--ad">20% AD Physical damage</span> + <span className="stat--ap">80% AP Magic damage</span>. <br />

            <b>The Package:</b> After 4 minutes, The Package is delivered to Corki's base. Corki can pick it up to gain the ability to cast Special delivery, wich grants him <span className="stat--moveSpeed">35% Movement Speed</span> out of combat for 45 seconds. A new Package arrives every 150 seconds.
          </p>
        </div>
    },

    {
      description:
        <div className="abilityDescription">
          <h4>
          <span className="marker--ability">1</span> PHOSPOROUS BOMB
          </h4>
    
          <h5>
          Cooldown: 
            {' '}{(7*mod.atkcdr).toFixed(1)} / 
            {' '}{(7*mod.atkcdr).toFixed(1)} / 
            {' '}{(7*mod.atkcdr).toFixed(1)} / 
            {' '}{(7*mod.atkcdr).toFixed(1)} 
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
            {' '}{Math.round(((75)+(atk.ap * 50 / 100)+(atk.attack * 70 / 100)))} / 
            {' '}{Math.round(((135)+(atk.ap * 50 / 100)+(atk.attack * 70 / 100)))} / 
            {' '}{Math.round(((195)+(atk.ap * 50 / 100)+(atk.attack * 70 / 100)))} / 
            {' '}{Math.round(((255)+(atk.ap * 50 / 100)+(atk.attack * 70 / 100)))}
          </p>

          <p className="stat--ad">Post-mitigation: 
            {' '}{Math.round(((75)+(atk.ap * 50 / 100)+(atk.attack * 70 / 100)) * (1 - mod.defMagRed))} / 
            {' '}{Math.round(((135)+(atk.ap * 50 / 100)+(atk.attack * 70 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.round(((195)+(atk.ap * 50 / 100)+(atk.attack * 70 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.round(((255)+(atk.ap * 50 / 100)+(atk.attack * 70 / 100))* (1 - mod.defMagRed))}          
          </p>
    
          <p>
            Fires a bomb at a targeted area dealing <span className="stat--ap">75 / 135 / 195 / 255 (+50% AP) <span className="stat--ad">(+70% AD)</span> magic damage</span> and granting vision over the area.
          </p>
        </div>
    },

    {
      description:
        <div className="abilityDescription">
          <h4>
          <span className="marker--ability">2</span> VALKYRIE
          </h4>
    
          <h5>
          Cooldown: 
            {' '}{(19*mod.atkcdr).toFixed(1)} / 
            {' '}{(18*mod.atkcdr).toFixed(1)} / 
            {' '}{(16*mod.atkcdr).toFixed(1)} / 
            {' '}{(15*mod.atkcdr).toFixed(1)} 
          </h5>
            <h5 className="stat--mana">
          Cost: 
            {' '}{100} / 
            {' '}{100} / 
            {' '}{100} / 
            {' '}{100} 
          </h5>

          <h5 className="stat--ap">
            Damage:
          </h5>

          <p className="stat--ad">Pre-mitigation: 
            {' '}{Math.round(((60)+(atk.ap * 40 / 100)))} / 
            {' '}{Math.round(((100)+(atk.ap * 40 / 100)))} / 
            {' '}{Math.round(((140)+(atk.ap * 40 / 100)))} / 
            {' '}{Math.round(((180)+(atk.ap * 40 / 100)))}
          </p>

          <p className="stat--ad">Post-mitigation: 
            {' '}{Math.round(((60)+(atk.ap * 40 / 100)) * (1 - mod.defMagRed))} / 
            {' '}{Math.round(((100)+(atk.ap * 40 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.round(((140)+(atk.ap * 40 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.round(((180)+(atk.ap * 40 / 100))* (1 - mod.defMagRed))}          
          </p>

          <h5 className="stat--ap">
            Package damage:
          </h5>

          <p className="stat--ad">Pre-mitigation : 
            {' '}Tick: {Math.round((((atk.attack * 150 / 100))+(atk.ap * 20 / 100)))} / 
            {' '}Total: {Math.round((((atk.attack * 150 / 100))+(atk.ap * 20 / 100))*5)}
          </p>

          <p className="stat--ad">Post-mitigation: 
            {' '}Tick: {Math.round(((((atk.attack * 150 / 100))+(atk.ap * 20 / 100))) * (1 - mod.defMagRed))} / 
            {' '}Total: {Math.round(((((atk.attack * 150 / 100))+(atk.ap * 20 / 100)))* (1 - mod.defMagRed) * 5)}
          </p>
    
          <p>
          Dashes forward, leaving a flaming zone that deals <span className="stat--ap"> 60 / 100 / 140 / 180 (+40% AP) magic damage</span> per second for 3 seconds. <br />
          <b>Package:</b> Enemies are kocked aside and the zone deals <span className="stat--ap">20% AP <span className="stat--ad"> +150% AD </span>magic damage </span> per second for 5 seconds and slows by 90%/
          </p>
        </div>
    },

    {
      description:
        <div className="abilityDescription">
          <h4>
          <span className="marker--ability">3</span> GATLING GUN
          </h4>
    
          <h5>
          Cooldown: 
            {' '}{(14*mod.atkcdr).toFixed(1)} / 
            {' '}{(14*mod.atkcdr).toFixed(1)} / 
            {' '}{(14*mod.atkcdr).toFixed(1)} / 
            {' '}{(14*mod.atkcdr).toFixed(1)} 
          </h5>
            <h5 className="stat--mana">
          Cost: 
            {' '}{50} / 
            {' '}{50} / 
            {' '}{50} / 
            {' '}{50} 
          </h5>

          <h5 className="stat--ap">
            Damage:
          </h5>

          <p className="stat--ad">Pre-mitigation: 
            {' '}{Math.round(((32)+(atk.attack * 60 / 100)))} / 
            {' '}{Math.round(((48)+(atk.attack * 60 / 100)))} / 
            {' '}{Math.round(((64)+(atk.attack * 60 / 100)))} / 
            {' '}{Math.round(((80)+(atk.attack * 60 / 100)))}
          </p>

          <p className="stat--ad">Post-mitigation: 
            {' '}{Math.round(((32)+(atk.attack * 60 / 100)) * (1 - mod.defMagRed))} / 
            {' '}{Math.round(((48)+(atk.attack * 60 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.round(((64)+(atk.attack * 60 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.round(((80)+(atk.attack * 60 / 100))* (1 - mod.defMagRed))}          
          </p>
    
          <p>
          Fires his gatling gun for 4 seconds, dealing <span className="stat--ap">32 / 48 / 64 / 80 <span className="stat--ad">(+60% AD)</span> magic damage</span>  per second and shredding up to <abbr title="Applies BEFORE magic penetration, can drop Magic Resist of target below 0">10 / 15 / 20 / 25 Magic Resist</abbr> for 2 seconds. Fires toward Corki's current target.
          </p>
        </div>
    },

    {
      description:
        <div className="abilityDescription">
          <h4>
          <span className="marker--ability">ULT</span> MISSILE BARRAGE
          </h4>
    
          <h5>
          Cooldown: 
            {' '}{(12*mod.atkcdr).toFixed(1)} / 
            {' '}{(12*mod.atkcdr).toFixed(1)} / 
            {' '}{(12*mod.atkcdr).toFixed(1)}
          </h5>
            <h5 className="stat--mana">
          Cost: 
            {' '}{20} / 
            {' '}{20} / 
            {' '}{20}
          </h5>

          <h5 className="stat--ap">
            Damage:
          </h5>

          <p className="stat--ad">Pre-mitigation: 
            {' '}{Math.round(((80)+(atk.ap * 20 / 100)+(atk.attack * 25 / 100)))} / 
            {' '}{Math.round(((115)+(atk.ap * 20 / 100)+(atk.attack * 45 / 100)))} / 
            {' '}{Math.round(((150)+(atk.ap * 20 / 100)+(atk.attack * 65 / 100)))}
          </p>

          <p className="stat--ad">Post-mitigation: 
            {' '}{Math.round(((80)+(atk.ap * 20 / 100)+(atk.attack * 25 / 100)) * (1 - mod.defMagRed))} / 
            {' '}{Math.round(((115)+(atk.ap * 20 / 100)+(atk.attack * 45 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.round(((150)+(atk.ap * 20 / 100)+(atk.attack * 65 / 100))* (1 - mod.defMagRed))}       
          </p>

          <h5 className="stat--vamp">
           Big One's damage:
          </h5>

          <p className="stat--ad">Pre-mitigation: 
            {' '}{Math.round(((160)+(atk.ap * 40 / 100)+(atk.attack * 50 / 100)))} / 
            {' '}{Math.round(((230)+(atk.ap * 40 / 100)+(atk.attack * 90 / 100)))} / 
            {' '}{Math.round(((300)+(atk.ap * 40 / 100)+(atk.attack * 130 / 100)))}
          </p>

          <p className="stat--ad">Post-mitigation: 
            {' '}{Math.round(((160)+(atk.ap * 40 / 100)+(atk.attack * 50 / 100)) * (1 - mod.defMagRed))} / 
            {' '}{Math.round(((230)+(atk.ap * 40 / 100)+(atk.attack * 90 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.round(((300)+(atk.ap * 40 / 100)+(atk.attack * 130 / 100))* (1 - mod.defMagRed))} 
          </p>
    
          <p>
            Fires a missile, dealing <span className="stat--ap">80 / 115 / 150 (<span className="stat--ad">+25% / 45% / 65% AD</span>  +20% AP) magic damage</span>. 2 seconds cooldown between casts. <br />
            <b>Big One:</b> Every third missile fired deals <span className="stat--ap">160 / 230 / 300 (<span className="stat--ad">+50% / 90% / 130% AD</span> +40% AP) magic damage</span> and has increased range and blast radius.
          </p>
        </div>
    }
  ],

  'Darius': [
    {
      description:
        <div className="abilityDescription">
          <h4>
          <span className="marker--ability">P</span> HEMMORHAGE
          </h4>

          <h5 className="stat--ad">
            Damage:
          </h5>

          <p className="stat--ad">Pre-mitigation: 
            {' '}Stack: {Math.round((((10.5 + 1.5 * currentLevel))+(atk.attack * 30 / 100)))} / 
            {' '}Full: {Math.round((((10.5 + 1.5 * currentLevel))+(atk.attack * 30 / 100))*5)}
          </p>

          <p className="stat--ad">Post-mitigation: 
            {' '}Stack: {Math.round((((10.5 + 1.5 * currentLevel))+(atk.attack * 30 / 100)) * (1 - mod.defPhysRed))} / 
            {' '}Full: {Math.round((((10.5 + 1.5 * currentLevel))+(atk.attack * 30 / 100))* (1 - mod.defPhysRed)*5)}
          </p>

          <h5 className="stat--ad">Bonus AD at full stacks: {Math.round(15 + 14 * currentLevel)}</h5>

    
          <p>
            Attacks and damaging abilities cause enemies to bleed, dealing between <abbr title="10.5 + 1.5 x level" className="stat--ad">14.5 - 34 (+30% AD)  physical damage</abbr> over 5 seconds. Can stack up to 5 times. <br />
            Upon reaching full stacks, Darius gains <b>Noxian Might</b> for 5 seconds, gaining <abbr title="29-225 based on level" className="stat--ad">{Math.round(15 + 14 * currentLevel)} Attack Damage</abbr> and applying full stacks of Hemorrhage instead of 1. <br />
            Deals 150% damage to monsters.
          </p>
        </div>
    },

    {
      description:
        <div className="abilityDescription">
          <h4>
          <span className="marker--ability">1</span> DECIMATE
          </h4>
    
          <h5>
          Cooldown: 
            {' '}{(9*mod.atkcdr).toFixed(1)} / 
            {' '}{(8*mod.atkcdr).toFixed(1)} / 
            {' '}{(6*mod.atkcdr).toFixed(1)} / 
            {' '}{(5*mod.atkcdr).toFixed(1)} 
          </h5>
            <h5 className="stat--mana">
          Cost: 
            {' '}{35} / 
            {' '}{35} / 
            {' '}{35} / 
            {' '}{35} 
          </h5>

          <h5 className="stat--ad">
           Inner Circle damage:
          </h5>

          <p className="stat--ad">Pre-mitigation: 
            {' '}{Math.round(((40)+(atk.attack * 35 / 100)))} / 
            {' '}{Math.round(((80)+(atk.attack * 35 / 100)))} / 
            {' '}{Math.round(((120)+(atk.attack * 35 / 100)))} / 
            {' '}{Math.round(((160)+(atk.attack * 35 / 100)))}
          </p>

          <p className="stat--ad">Post-mitigation: 
            {' '}{Math.round(((40)+(atk.attack * 35 / 100)) * (1 - mod.defPhysRed))} / 
            {' '}{Math.round(((80)+(atk.attack * 35 / 100))* (1 - mod.defPhysRed))} / 
            {' '}{Math.round(((120)+(atk.attack * 35 / 100))* (1 - mod.defPhysRed))} / 
            {' '}{Math.round(((160)+(atk.attack * 35 / 100))* (1 - mod.defPhysRed))}          
          </p>

          <h5 className="stat--ad">
            Outer circle damage:
          </h5>

          <p className="stat--ad">Pre-mitigation: 
            {' '}{Math.round(((40)+(atk.attack * 100 / 100)))} / 
            {' '}{Math.round(((80)+(atk.attack * 115 / 100)))} / 
            {' '}{Math.round(((120)+(atk.attack * 130 / 100)))} / 
            {' '}{Math.round(((160)+(atk.attack * 145 / 100)))}
          </p>

          <p className="stat--ad">Post-mitigation: 
            {' '}{Math.round(((40)+(atk.attack * 100 / 100)) * (1 - mod.defPhysRed))} / 
            {' '}{Math.round(((80)+(atk.attack * 115 / 100))* (1 - mod.defPhysRed))} / 
            {' '}{Math.round(((120)+(atk.attack * 130 / 100))* (1 - mod.defPhysRed))} / 
            {' '}{Math.round(((160)+(atk.attack * 145 / 100))* (1 - mod.defPhysRed))}          
          </p>
    
          <p>
          Swings his axe after a delay, dealing <span className="stat--ad">40 / 80 / 120 / 160 (+35% AD) physical damage</span>. <br />
          Hitting enemies with the blade of the axe deals <span className="stat--ad">40 / 80 / 120 / 160 (+100% / 115% / 130% / 145% AD)</span>, heals Darius for <span className="stat--hp">12% of his missing Health</span>  for each champion or large monster hit <span className="stat--hp">(max 36%)</span> and applies <b>Hemorrhage</b>.
          </p>
        </div>
    },

    {
      description:
        <div className="abilityDescription">
          <h4>
          <span className="marker--ability">2</span> CRIPPLING STRIKE
          </h4>
    
          <h5>
          Cooldown: 
            {' '}{(6*mod.atkcdr).toFixed(1)} / 
            {' '}{(6*mod.atkcdr).toFixed(1)} / 
            {' '}{(6*mod.atkcdr).toFixed(1)} / 
            {' '}{(6*mod.atkcdr).toFixed(1)} 
          </h5>
            <h5 className="stat--mana">
          Cost: 
            {' '}{30} / 
            {' '}{30} / 
            {' '}{30} / 
            {' '}{30} 
          </h5>

          <h5 className="stat--ad">
            Damage:
          </h5>

          <p className="stat--ad">Pre-mitigation: 
            {' '}{Math.round(((0)+(atk.attack * 130 / 100)))} / 
            {' '}{Math.round(((0)+(atk.attack * 140 / 100)))} / 
            {' '}{Math.round(((0)+(atk.attack * 150 / 100)))} / 
            {' '}{Math.round(((0)+(atk.attack * 160 / 100)))}
          </p>

          <p className="stat--ad">Post-mitigation: 
            {' '}{Math.round(((0)+(atk.attack * 130 / 100)) * (1 - mod.defPhysRed))} / 
            {' '}{Math.round(((0)+(atk.attack * 140 / 100))* (1 - mod.defPhysRed))} / 
            {' '}{Math.round(((0)+(atk.attack * 150 / 100))* (1 - mod.defPhysRed))} / 
            {' '}{Math.round(((0)+(atk.attack * 160 / 100))* (1 - mod.defPhysRed))}          
          </p>
    
          <p>
          Empowers his next attack for 8 seconds to deal an additional <span className="stat--ad">30% / 40% / 50% / 60% AD physical damage</span> and slow the target by 90% for 1 second.
          </p>
        </div>
    },

    {
      description:
        <div className="abilityDescription">
          <h4>
          <span className="marker--ability">3</span> APPREHEND
          </h4>
    
          <h5>
          Cooldown: 
            {' '}{(18*mod.atkcdr).toFixed(1)} / 
            {' '}{(16*mod.atkcdr).toFixed(1)} / 
            {' '}{(14*mod.atkcdr).toFixed(1)} / 
            {' '}{(12*mod.atkcdr).toFixed(1)} 
          </h5>
            <h5 className="stat--mana">
          Cost: 
            {' '}{45} / 
            {' '}{45} / 
            {' '}{45} / 
            {' '}{45} 
          </h5>
    
          <p>
            <b>PASSIVE:</b>  Gains <span className="stat--ad">15% / 22% / 29% / 36% Armor Penetration.</span> <br />
            <b>ACTIVE:</b> Pulls in enemies in front of him, slowing them by <span className="stat--moveSpeed">40%</span> for 1.5 seconds.
          </p>
        </div>
    },

    {
      description:
        <div className="abilityDescription">
          <h4>
          <span className="marker--ability">ULT</span> NOXIAN GUILLOTINE
          </h4>
    
          <h5>
          Cooldown: 
            {' '}{(70*mod.atkcdr).toFixed(1)} / 
            {' '}{(65*mod.atkcdr).toFixed(1)} / 
            {' '}{(60*mod.atkcdr).toFixed(1)}
          </h5>
            <h5 className="stat--mana">
          Cost: 
            {' '}{100} / 
            {' '}{100} / 
            {' '}{0}
          </h5>

          <h5 className="stat--ad">
            Damage:
          </h5>

          <p className="stat--ad">Minimum: 
            {' '}{Math.round(((100)+(atk.attack * 75 / 100)))} / 
            {' '}{Math.round(((200)+(atk.attack * 75 / 100)))} / 
            {' '}{Math.round(((300)+(atk.attack * 75 / 100)))}
          </p>

          <p className="stat--ad">Maximum: 
            {' '}{Math.round(((100)+(atk.attack * 75 / 100))*2)} / 
            {' '}{Math.round(((200)+(atk.attack * 75 / 100))*2)} / 
            {' '}{Math.round(((300)+(atk.attack * 75 / 100))*2)}   
          </p>

    
          <p>
            Leaps to execute a champion. Deals <span className="stat--critChance">100 / 200 / 300 <span className="stat--ad">(+75% AD)</span> true damage</span> , increased by 20% per Hemorrhage stack, and applies Hemorrhage. <br />
            Killing the target with Noxian Guillotine refreshes its cooldown, mana cost, and grants Noxian Might for 5 seconds and causes nearby minions and monsters to flee for 1.5 seconds.
          </p>
        </div>
    }
  ],

  'Diana': [
    {
      description:
        <div className="abilityDescription">
          <h4>
          <span className="marker--ability">P</span> MOONSILVER BLADE
          </h4>

          <h5 className="stat--ap"><abbr title="pre-post mitigation">Damage: {Math.round(((15 + 15 * currentLevel)+(atk.ap * 50 / 100)))} / 
            {' '}{Math.round(((15 + 15 * currentLevel)+(atk.ap * 50 / 100))* (1 - mod.defMagRed))}</abbr> 
          </h5> 

          <h5 className="stat--as">Attack Speed: {(0.667 * (25 + 5 * currentLevel)/100).toFixed(3)}</h5>
    
          <p>
          Using an ability causes Diana's next 3 attacks to gain <abbr title="30-100% based on level" className="stat--as">{25 + 5 * currentLevel}% Attack speed</abbr> for 4 seconds. <br />

          Every thid attack deals <abbr title="30-120 based on level" className="stat--ap">{(15 + 15 * currentLevel)} (+50% AP) magic damage</abbr> in an area. <br />

          Deals 50% damage to structures, and 110% damage to monsters.
          </p>
        </div>
    },

    {
      description:
        <div className="abilityDescription">
          <h4>
          <span className="marker--ability">1</span> CRESCENT STRIKE
          </h4>
    
          <h5>
          Cooldown: 
            {' '}{(9*mod.atkcdr).toFixed(1)} / 
            {' '}{(8*mod.atkcdr).toFixed(1)} / 
            {' '}{(7*mod.atkcdr).toFixed(1)} / 
            {' '}{(6*mod.atkcdr).toFixed(1)} 
          </h5>
            <h5 className="stat--mana">
          Cost: 
            {' '}{55} / 
            {' '}{65} / 
            {' '}{75} / 
            {' '}{85} 
          </h5>

          <h5 className="stat--ap">
            Damage:
          </h5>

          <p className="stat--ad">Pre-mitigation: 
            {' '}{Math.round(((60)+(atk.ap * 70 / 100)))} / 
            {' '}{Math.round(((105)+(atk.ap * 70 / 100)))} / 
            {' '}{Math.round(((150)+(atk.ap * 70 / 100)))} / 
            {' '}{Math.round(((195)+(atk.ap * 70 / 100)))}
          </p>

          <p className="stat--ad">Post-mitigation: 
            {' '}{Math.round(((60)+(atk.ap * 70 / 100)) * (1 - mod.defMagRed))} / 
            {' '}{Math.round(((105)+(atk.ap * 70 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.round(((150)+(atk.ap * 70 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.round(((195)+(atk.ap * 70 / 100))* (1 - mod.defMagRed))}          
          </p>
    
          <p>
            Unleashes an arcing bolt of energy that deals <span className="stat--ap"> 60 / 105 / 150 / 195 (+70% AP) magic damage </span>and applies <b>Moonlight</b> for 3 seconds.
          </p>
        </div>
    },

    {
      description:
        <div className="abilityDescription">
          <h4>
          <span className="marker--ability">2</span> PALE CASCADE
          </h4>
    
          <h5>
          Cooldown: 
            {' '}{(13*mod.atkcdr).toFixed(1)} / 
            {' '}{(12*mod.atkcdr).toFixed(1)} / 
            {' '}{(10*mod.atkcdr).toFixed(1)} / 
            {' '}{(9*mod.atkcdr).toFixed(1)} 
          </h5>
            <h5 className="stat--mana">
          Cost: 
            {' '}{70} / 
            {' '}{70} / 
            {' '}{70} / 
            {' '}{70} 
          </h5>

          <h5 className="stat--ap">
            Damage per sphere:
          </h5>

          <p className="stat--ad">Pre-mitigation: 
            {' '}{Math.round(((25)+(atk.ap * 20 / 100)))} / 
            {' '}{Math.round(((40)+(atk.ap * 20 / 100)))} / 
            {' '}{Math.round(((55)+(atk.ap * 20 / 100)))} / 
            {' '}{Math.round(((70)+(atk.ap * 20 / 100)))}
          </p>

          <p className="stat--ad">Post-mitigation: 
            {' '}{Math.round(((25)+(atk.ap * 20 / 100)) * (1 - mod.defMagRed))} / 
            {' '}{Math.round(((40)+(atk.ap * 20 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.round(((55)+(atk.ap * 20 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.round(((70)+(atk.ap * 20 / 100))* (1 - mod.defMagRed))}          
          </p>

          <h5 className="stat--hp">Shield:</h5>

          <p className="stat--hp">
            {Math.round(40)+(atk.ap * 40 / 100)} /
            {' '}{Math.round(60)+(atk.ap * 40 / 100)} /
            {' '}{Math.round(80)+(atk.ap * 40 / 100)} /
            {' '}{Math.round(100)+(atk.ap * 40 / 100)}
          </p>
    
          <p>
          Creates 3 spheres that orbit Diana for 5 seconds. Upon contact with enemies the spheres detonate, dealing <span className="stat--ap">25 / 40 / 55 / 70 (+20% AP) magic damage</span>.

          Also grants a shield that absorbs <span className="stat--hp"> 40 / 60 / 80 / 100 (+40% AP) damage</span>. If the third sphere detonates, the shield is increased by <span className="stat--hp"> 40 / 60 / 80 / 100 (+40% AP)</span>.
          </p>
        </div>
    },

    {
      description:
        <div className="abilityDescription">
          <h4>
          <span className="marker--ability">3</span> LUNAR RUSH
          </h4>
    
          <h5>
          Cooldown: 
            {' '}{(18*mod.atkcdr).toFixed(1)} / 
            {' '}{(16*mod.atkcdr).toFixed(1)} / 
            {' '}{(14*mod.atkcdr).toFixed(1)} / 
            {' '}{(12*mod.atkcdr).toFixed(1)} 
          </h5>
            <h5 className="stat--mana">
          Cost: 
            {' '}{20} / 
            {' '}{20} / 
            {' '}{20} / 
            {' '}{20} 
          </h5>
    
          <p>
          Dashes to a point near an enemy, dealing <span className="stat--ap">40 / 75 / 110 / 145 (+25% AP) magic damage </span>and removing Moonlight in an area. <br />
          
          Lunar Rush's Cooldown is reduced to 0.5 seconds if it removes <b>Moonlight</b> from an enemy.
          </p>
        </div>
    },

    {
      description:
        <div className="abilityDescription">
          <h4>
          <span className="marker--ability">ULT</span> MOONFALL
          </h4>
    
          <h5>
          Cooldown: 
            {' '}{(70*mod.atkcdr).toFixed(1)} / 
            {' '}{(65*mod.atkcdr).toFixed(1)} / 
            {' '}{(60*mod.atkcdr).toFixed(1)}
          </h5>
            <h5 className="stat--mana">
          Cost: 
            {' '}{100} / 
            {' '}{100} / 
            {' '}{100}
          </h5>

          <h5 className="stat--ap">
           Minimum damage:
          </h5>

          <p className="stat--ad">Pre-mitigation: 
            {' '}{Math.round(((150)+(atk.ap * 40 / 100)))} / 
            {' '}{Math.round(((200)+(atk.ap * 40 / 100)))} / 
            {' '}{Math.round(((250)+(atk.ap * 40 / 100)))}
          </p>

          <p className="stat--ad">Post-mitigation: 
            {' '}{Math.round(((150)+(atk.ap * 40 / 100)) * (1 - mod.defMagRed))} / 
            {' '}{Math.round(((200)+(atk.ap * 40 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.round(((250)+(atk.ap * 40 / 100))* (1 - mod.defMagRed))}
          </p>

          <h5 className="stat--ap">
           Maximum damage:
          </h5>

          <p className="stat--ad">Pre-mitigation: 
            {' '}{Math.round(((300)+(atk.ap * 80 / 100)))} / 
            {' '}{Math.round(((400)+(atk.ap * 80 / 100)))} / 
            {' '}{Math.round(((500)+(atk.ap * 80 / 100)))}
          </p>

          <p className="stat--ad">Post-mitigation: 
            {' '}{Math.round(((300)+(atk.ap * 80 / 100)) * (1 - mod.defMagRed))} / 
            {' '}{Math.round(((400)+(atk.ap * 80 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.round(((500)+(atk.ap * 80 / 100))* (1 - mod.defMagRed))}
          </p>
    
          <p>
          <b>HOLD:</b> Summons the moon, slowing enemies by <span className="stat--moveSpeed">20%</span> and applying <b>Moonlight</b> in a growing area.

          <b>RELEASE:</b> Slams the moon down, spiraling enemies toward Diana and dealing <span className="stat--ap">150 / 200 / 250 (+40% AP) to 300 / 400 / 500 (+80% AP) magic damage</span> (scaling with charge time).
          </p>
        </div>
    }
  ],

  'Dr. Mundo': [
    {
      description:
        <div className="abilityDescription">
          <h4>
          <span className="marker--ability">P</span> GOES WHERE HE PLEASES
          </h4>
    
          <p>
          Resists the first immobilizing effect, losing <span className="stat--hp">3% current Health</span> instead and dropping a Chemical Canister nearby. <br />
          
           Retrieving the Canister reduces cooldown by <b>10</b> seconds and heals Dr. Mundo for <abbr title="4% of Max Health" className="stat--hp">{Math.round(atk.health * 4 / 100)} health</abbr>  <abbr title="at level 1 / 5 / 9 / 13">(40 / 30 / 20 / 10 second CD)</abbr>. Regenerates <abbr title="1%-2% based on level of Max Health" className="stat--hp">{Math.round(atk.health * (1 + 1/14*(currentLevel-1)) /100)} health </abbr>every 5 seconds. <br />
            Enemy champions destroy the Canister if they reach it first.
          </p>
        </div>
    },

    {
      description:
        <div className="abilityDescription">
          <h4>
          <span className="marker--ability">1</span> INFECTED BONESAW
          </h4>
    
          <h5>
          Cooldown: 
            {' '}{(4*mod.atkcdr).toFixed(1)} / 
            {' '}{(4*mod.atkcdr).toFixed(1)} / 
            {' '}{(4*mod.atkcdr).toFixed(1)} / 
            {' '}{(4*mod.atkcdr).toFixed(1)} 
          </h5>
            <h5 className="stat--hp">
          Cost: 
            {' '}{50} / 
            {' '}{50} / 
            {' '}{50} / 
            {' '}{50} 
          </h5>
    
          <p>
            Throw bonesaw, dealing magic damage equal to <span className="stat--ap">20% / 23% / 26% / 29% of the target's current Health ( min: 90 / 160 / 230 / 300)</span>  and slowing them by <span className="stat--moveSpeed">40%</span>  for 2 seconds. <br />
            If bonesaw hits an enemy restore half of it's health cost. restore 100% upon hitting Champions or Monsters.
          </p>
        </div>
    },

    {
      description:
        <div className="abilityDescription">
          <h4>
          <span className="marker--ability">2</span> HEART ZAPPER
          </h4>
    
          <h5>
          Cooldown: 
            {' '}{(13*mod.atkcdr).toFixed(1)} / 
            {' '}{(12*mod.atkcdr).toFixed(1)} / 
            {' '}{(11*mod.atkcdr).toFixed(1)} / 
            {' '}{(10*mod.atkcdr).toFixed(1)} 
          </h5>
            <h5 className="stat--hp">
          Cost: 
            {' '}{5}% Current Health
          </h5>

          <h5 className="stat--ap">
            Damage per tick:
          </h5>

          <p className="stat--ad">Pre-mitigation: 
            {' '}{Math.round(((20)+(atk.ap * 0 / 100)))} / 
            {' '}{Math.round(((40)+(atk.ap * 0 / 100)))} / 
            {' '}{Math.round(((60)+(atk.ap * 0 / 100)))} / 
            {' '}{Math.round(((80)+(atk.ap * 0 / 100)))}
          </p>

          <p className="stat--ad">Post-mitigation: 
            {' '}{Math.round(((20)+(atk.ap * 0 / 100)) * (1 - mod.defMagRed))} / 
            {' '}{Math.round(((40)+(atk.ap * 0 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.round(((60)+(atk.ap * 0 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.round(((80)+(atk.ap * 0 / 100))* (1 - mod.defMagRed))}          
          </p>

          <h5 className="stat--ap">
            Detonation damage:
          </h5>

          <p className="stat--ad">Pre-mitigation: 
            {' '}{Math.round(((20)+(bonus.health * 7 / 100)))} / 
            {' '}{Math.round(((40)+(bonus.health * 7 / 100)))} / 
            {' '}{Math.round(((60)+(bonus.health * 7 / 100)))} / 
            {' '}{Math.round(((80)+(bonus.health * 7 / 100)))}
          </p>

          <p className="stat--ad">Post-mitigation: 
            {' '}{Math.round(((20)+(bonus.health * 7 / 100)) * (1 - mod.defMagRed))} / 
            {' '}{Math.round(((40)+(bonus.health * 7 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.round(((60)+(bonus.health * 7 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.round(((80)+(bonus.health * 7 / 100))* (1 - mod.defMagRed))}          
          </p>
    
          <p>
            Charges a defibrillator for 4 seconds, dealing <span className="stat--ap">20 / 40 / 60 / 80 magic damage</span> per second to nearby enemies.
            <b>RECAST:</b> Detonates the defibrillator, dealing <span className="stat--ap">20 / 40 / 60 / 80 <span className="stat--hp">(+7% HP) </span>magic damage</span> to nearby enemies. If the detonation damaged an enemy, Dr. Mundo heals for <span className="stat--hp">15%</span> of the damage taken <u>during Heart Zapper's duration</u>.  If it damaged a champion or monster he heals <span className="stat--hp">30% / 35% / 40% / 45%</span> instead.
          </p>
        </div>
    },

    {
      description:
        <div className="abilityDescription">
          <h4>
          <span className="marker--ability">3</span> BLUNT FORCE TRAUMA
          </h4>
    
          <h5>
          Cooldown: 
            {' '}{(8*mod.atkcdr).toFixed(1)} / 
            {' '}{(7*mod.atkcdr).toFixed(1)} / 
            {' '}{(7*mod.atkcdr).toFixed(1)} / 
            {' '}{(6*mod.atkcdr).toFixed(1)} 
          </h5>
            <h5 className="stat--hp">
          Cost: 
            {' '}{10} / 
            {' '}{20} / 
            {' '}{30} / 
            {' '}{40} 
          </h5>

          <h5 className="stat--ad">
            Min damage:
          </h5>

          <p className="stat--ad">Pre-mitigation: 
            {' '}{Math.round(((5)+(bonus.health * 7 / 100)))} / 
            {' '}{Math.round(((20)+(bonus.health * 7 / 100)))} / 
            {' '}{Math.round(((35)+(bonus.health * 7 / 100)))} / 
            {' '}{Math.round(((50)+(bonus.health * 7 / 100)))}
          </p>

          <p className="stat--ad">Post-mitigation: 
            {' '}{Math.round(((5)+(bonus.health * 7 / 100)) * (1 - mod.defPhysRed))} / 
            {' '}{Math.round(((20)+(bonus.health * 7 / 100))* (1 - mod.defPhysRed))} / 
            {' '}{Math.round(((35)+(bonus.health * 7 / 100))* (1 - mod.defPhysRed))} / 
            {' '}{Math.round(((50)+(bonus.health * 7 / 100))* (1 - mod.defPhysRed))}          
          </p>

          <h5 className="stat--ad">
           Max damage:
          </h5>

          <p className="stat--ad">Pre-mitigation: 
            {' '}{Math.round(((5)+(bonus.health * 7 / 100))*(160/100))} / 
            {' '}{Math.round(((20)+(bonus.health * 7 / 100))*(160/100))} / 
            {' '}{Math.round(((35)+(bonus.health * 7 / 100))*(160/100))} / 
            {' '}{Math.round(((50)+(bonus.health * 7 / 100))*(160/100))}
          </p>

          <p className="stat--ad">Post-mitigation: 
            {' '}{Math.round(((5)+(bonus.health * 7 / 100)*(160/100)) * (1 - mod.defPhysRed))} / 
            {' '}{Math.round(((20)+(bonus.health * 7 / 100)*(160/100))* (1 - mod.defPhysRed))} / 
            {' '}{Math.round(((35)+(bonus.health * 7 / 100)*(160/100))* (1 - mod.defPhysRed))} / 
            {' '}{Math.round(((50)+(bonus.health * 7 / 100)*(160/100))* (1 - mod.defPhysRed))}          
          </p>
    
          <p>
          Passive: Dr. Mundo gains <span className="stat--ad">15 / 20 / 25 / 30, plus up to 30 / 45 / 50 / 60 Attack Damage</span> based on his missing health.

          Active: Empowers his next attack to deal an addition <span className="stat--ad">5 / 20 / 35 / 50 <span className="stat--hp">(+7% HP)</span> physical damage</span>, increased by up to <abbr title="max bonus at 40% missing health">60%</abbr> based on Dr. Mundo's missing heath.

          Dr. Mundo swats the target away if it was killed or was a small monster, dealing the same damage to enemies.
          </p>
        </div>
    },

    {
      description:
        <div className="abilityDescription">
          <h4>
          <span className="marker--ability">ULT</span> MAXIMUM DOSAGE
          </h4>
    
          <h5>
          Cooldown: 
            {' '}{(70*mod.atkcdr).toFixed(1)} / 
            {' '}{(65*mod.atkcdr).toFixed(1)} / 
            {' '}{(60*mod.atkcdr).toFixed(1)}
          </h5>

          <h5 className="stat--hp">
            Healing:
          </h5>
            <p className="stat--hp">
              {Math.round(atk.health * 15 / 100)} /
              {' '}{Math.round(atk.health * 35 / 100)} /
              {' '}{Math.round(atk.health * 55 / 100)}
            </p>

            <h5 className="stat--ad">
              Bonus AD:
              {' '}{Math.round(bonus.health * 4 / 100)} /
              {' '}{Math.round(bonus.health * 5.5 / 100)} / 
              {' '}{Math.round(bonus.health * 7 / 100)}
            </h5>
    
          <p>
            Dr. Mundo's base Health is increased by <span className="stat--hp">25% / 30% / 35% of his missing Health</span>. He also gains <span className="stat--ad">Attack Damage equal to 4% / 5.5% / 7% bonus HP</span>, <span className="stat--moveSpeed">15% / 25% / 35% Movement Speed for 10 seconds</span> and heals <span className="stat--hp">15% / 35% / 55%</span> of his maximum Health over the duration.
          </p>
        </div>
    }
  ],

  'Draven': [
    {
      description:
        <div className="abilityDescription">
          <h4>
          <span className="marker--ability">P</span> LEAGUE OF DRAVEN
          </h4> 
          
    
          <p>
          Killing a unit or catching a Spinning Axe grants a stack of Adoration. <br />
          Killing champions consume all Adoration stacks and grant 80 bonus gold + 4 per stack of Adoration. <br />
          When Draven dies, half of Adoration stacks are lost. <br />
          <span className="stat--critChance">Not DRAVEN. DRAAAAAAAVEN.</span>
          </p>
        </div>
    },

    {
      description:
        <div className="abilityDescription">
          <h4>
          <span className="marker--ability">1</span> SPINNING AXE
          </h4>
    
          <h5>
          Cooldown: 
            {' '}{(10*mod.atkcdr).toFixed(1)} / 
            {' '}{(9*mod.atkcdr).toFixed(1)} / 
            {' '}{(8*mod.atkcdr).toFixed(1)} / 
            {' '}{(7*mod.atkcdr).toFixed(1)} 
          </h5>
            <h5 className="stat--mana">
          Cost: 
            {' '}{45} / 
            {' '}{45} / 
            {' '}{45} / 
            {' '}{45} 
          </h5>

          <h5 className="stat--ad">
            Damage:
          </h5>

          <p className="stat--ad">Pre-mitigation: 
            {' '}{Math.round(((45)+(atk.attack * 90 / 100)))} / 
            {' '}{Math.round(((50)+(atk.attack * 100 / 100)))} / 
            {' '}{Math.round(((55)+(atk.attack * 110 / 100)))} / 
            {' '}{Math.round(((60)+(atk.attack * 120 / 100)))}
          </p>

          <p className="stat--ad">Post-mitigation: 
            {' '}{Math.round(((45)+(atk.attack * 90 / 100)) * (1 - mod.defPhysRed))} / 
            {' '}{Math.round(((50)+(atk.attack * 100 / 100))* (1 - mod.defPhysRed))} / 
            {' '}{Math.round(((55)+(atk.attack * 110 / 100))* (1 - mod.defPhysRed))} / 
            {' '}{Math.round(((60)+(atk.attack * 120 / 100))* (1 - mod.defPhysRed))}          
          </p>
    
          <p>
          Gains a Spinning Axe, causing his next attack within 6 seconds to deal an additional <span className="stat--ad">45 / 50 / 55 / 60 (+90% / 100% / 110% / 120% AD) physical damage</span>. <br />
          The Spinning Axe bounces of the target, allowing Draven to catch and regain it. <br />
          Draven can hold two Spinning Axes at once.
          </p>
        </div>
    },

    {
      description:
        <div className="abilityDescription">
          <h4>
          <span className="marker--ability">2</span> BLOOD RUSH
          </h4>
    
          <h5>
          Cooldown: 
            {' '}{(10*mod.atkcdr).toFixed(1)} / 
            {' '}{(10*mod.atkcdr).toFixed(1)} / 
            {' '}{(10*mod.atkcdr).toFixed(1)} / 
            {' '}{(10*mod.atkcdr).toFixed(1)} 
          </h5>
            <h5 className="stat--mana">
          Cost: 
            {' '}{40} / 
            {' '}{35} / 
            {' '}{30} / 
            {' '}{25} 
          </h5>

          <h5 className="stat--as">
            Bonus attack speed:
          </h5>

          <p className="stat--as">
            {(champ.asBase * 20 / 100).toFixed(3)} / 
            {' '}{(champ.asBase * 25 / 100).toFixed(3)} / 
            {' '}{(champ.asBase * 30 / 100).toFixed(3)} / 
            {' '}{(champ.asBase * 35 / 100).toFixed(3)}
          </p>
    
          <p>
          Gains <span className="stat--as">20% / 25% / 30% / 35% Attack Speed</span> for 3 seconds and <span className="stat--moveSpeed">50% / 55% / 60% / 65% Movement Speed</span>  for 1.5 seconds. <br />
          Catching a Spinning Axe refreshes Blood Rush's cooldown.
          </p>
        </div>
    },

    {
      description:
        <div className="abilityDescription">
          <h4>
          <span className="marker--ability">3</span> STAND ASIDE
          </h4>
    
          <h5>
          Cooldown: 
            {' '}{(15*mod.atkcdr).toFixed(1)} / 
            {' '}{(14*mod.atkcdr).toFixed(1)} / 
            {' '}{(13*mod.atkcdr).toFixed(1)} / 
            {' '}{(12*mod.atkcdr).toFixed(1)} 
          </h5>
            <h5 className="stat--mana">
          Cost: 
            {' '}{70} / 
            {' '}{70} / 
            {' '}{70} / 
            {' '}{70} 
          </h5>

          <h5 className="stat--ad">
            Damage:
          </h5>

          <p className="stat--ad">Pre-mitigation: 
            {' '}{Math.round(((75)+(atk.attack * 50 / 100)))} / 
            {' '}{Math.round(((120)+(atk.attack * 50 / 100)))} / 
            {' '}{Math.round(((165)+(atk.attack * 50 / 100)))} / 
            {' '}{Math.round(((210)+(atk.attack * 50 / 100)))}
          </p>

          <p className="stat--ad">Post-mitigation: 
            {' '}{Math.round(((75)+(atk.attack * 50 / 100)) * (1 - mod.defPhysRed))} / 
            {' '}{Math.round(((120)+(atk.attack * 50 / 100))* (1 - mod.defPhysRed))} / 
            {' '}{Math.round(((165)+(atk.attack * 50 / 100))* (1 - mod.defPhysRed))} / 
            {' '}{Math.round(((210)+(atk.attack * 50 / 100))* (1 - mod.defPhysRed))}          
          </p>
    
          <p>
          Throws his axes, dealing <span className="stat--ad">75 / 120 / 165 / 210 (+50% AD) physical damage</span>  and knocking enemies aside, slowing them by <span className="stat--moveSpeed">25% / 30% / 35% / 40%</span>  for 2 seconds.
          </p>
        </div>
    },

    {
      description:
        <div className="abilityDescription">
          <h4>
          <span className="marker--ability">ULT</span> WHIRLING DEATH 
          </h4>
    
          <h5>
          Cooldown: 
            {' '}{(70*mod.atkcdr).toFixed(1)} / 
            {' '}{(65*mod.atkcdr).toFixed(1)} / 
            {' '}{(60*mod.atkcdr).toFixed(1)}
          </h5>
            <h5 className="stat--mana">
          Cost: 
            {' '}{100} / 
            {' '}{100} / 
            {' '}{100}
          </h5>

          <h5 className="stat--ad">
            Damage:
          </h5>

          <p className="stat--ad">Pre-mitigation: 
            {' '}{Math.round(((200)+(atk.attack * 130 / 100)))} / 
            {' '}{Math.round(((300)+(atk.attack * 130 / 100)))} / 
            {' '}{Math.round(((400)+(atk.attack * 130 / 100)))}
          </p>

          <p className="stat--ad">Post-mitigation: 
            {' '}{Math.round(((200)+(atk.attack * 130 / 100)) * (1 - mod.defPhysRed))} / 
            {' '}{Math.round(((300)+(atk.attack * 130 / 100))* (1 - mod.defPhysRed))} / 
            {' '}{Math.round(((400)+(atk.attack * 130 / 100))* (1 - mod.defPhysRed))}
          </p>
    
          <p>
          Hurls two massive axes, dealing <span className="stat--ad">200 / 300 / 400 (+130% AD) physical damage</span>. The axe return to Draven when they reach the edge of the map, hit a champion or upon reactivation. <br />

          Deals 8% less damage as it damages targets, minimum 60%. Upon reversal, the reduction is reset do deal full damage.
          </p>
        </div>
    }
  ],

  'Ekko': [
    {
      description:
        <div className="abilityDescription">
          <h4>
          <span className="marker--ability">P</span> Z-DRIVE RESONANCE
          </h4>

          <h5 className="stat--ap">
            Damage:
          </h5>

          <p className="stat--ad">Pre-mitigation: 
            {' '}{Math.round(((22+8*currentLevel)+(atk.ap * 70 / 100)))}
          </p>

          <p className="stat--ad">Post-mitigation: 
            {' '}{Math.round(((22+8*currentLevel)+(atk.ap * 70 / 100)) * (1 - mod.defMagRed))}
          </p>    
          <p>
          Every third attack or damaging ability agains the same target deals an additional <abbr className="stat--ap" title='30-142 based on level'> {22+8*currentLevel} (+70% AP) magic damage</abbr>. If the target was a champion, Ekko gains <span className="stat--moveSpeed">40% Movement Speed</span>  for 2.5 seconds. <br />
          cannot effect the same target fo 5 seconds after the effect procs.

          Deals 140% damage to monsters. Cannot affect the same target for 5 seconds.
          </p>
        </div>
    },

    {
      description:
        <div className="abilityDescription">
          <h4>
          <span className="marker--ability">1</span> TIMEWINDER
          </h4>
    
          <h5>
          Cooldown: 
            {' '}{(9*mod.atkcdr).toFixed(1)} / 
            {' '}{(8*mod.atkcdr).toFixed(1)} / 
            {' '}{(8*mod.atkcdr).toFixed(1)} / 
            {' '}{(7*mod.atkcdr).toFixed(1)} 
          </h5>
            <h5 className="stat--mana">
          Cost: 
            {' '}{50} / 
            {' '}{60} / 
            {' '}{70} / 
            {' '}{80} 
          </h5>

          <h5 className="stat--ap">
            Damage initial:
          </h5>

          <p className="stat--ad">Pre-mitigation: 
            {' '}{Math.round(((60)+(atk.ap * 30 / 100)))} / 
            {' '}{Math.round(((80)+(atk.ap * 30 / 100)))} / 
            {' '}{Math.round(((100)+(atk.ap * 30 / 100)))} / 
            {' '}{Math.round(((120)+(atk.ap * 30 / 100)))}
          </p>

          <p className="stat--ad">Post-mitigation: 
            {' '}{Math.round(((60)+(atk.ap * 30 / 100)) * (1 - mod.defMagRed))} / 
            {' '}{Math.round(((80)+(atk.ap * 30 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.round(((100)+(atk.ap * 30 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.round(((120)+(atk.ap * 30 / 100))* (1 - mod.defMagRed))}          
          </p>

          <h5 className="stat--ap">
            Damage secondary:
          </h5>

          <p className="stat--ad">Pre-mitigation: 
            {' '}{Math.round(((40)+(atk.ap * 60 / 100)))} / 
            {' '}{Math.round(((75)+(atk.ap * 60 / 100)))} / 
            {' '}{Math.round(((110)+(atk.ap * 60 / 100)))} / 
            {' '}{Math.round(((145)+(atk.ap * 60 / 100)))}
          </p>

          <p className="stat--ad">Post-mitigation: 
            {' '}{Math.round(((40)+(atk.ap * 60 / 100)) * (1 - mod.defMagRed))} / 
            {' '}{Math.round(((75)+(atk.ap * 60 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.round(((110)+(atk.ap * 60 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.round(((145)+(atk.ap * 60 / 100))* (1 - mod.defMagRed))}          
          </p>
    
          <p>
          Throw a temporal device, dealing <span className="stat--ap">60 / 80 / 100 / 120 (+30% AP) magic damage</span>. On hitting a champion or the distance limit, it expands into a field that slows by <span className="stat--moveSpeed">30% / 40% / 50% / 60%</span>. The device then returns to Ekko, dealing <span className="stat--ap">40 / 75 / 110 / 145 (+60% AP) magic damage</span>.
          </p>
        </div>
    },

    {
      description:
        <div className="abilityDescription">
          <h4>
          <span className="marker--ability">2</span> PARALLEL CONVERGENCE
          </h4>
    
          <h5>
          Cooldown: 
            {' '}{(20*mod.atkcdr).toFixed(1)} / 
            {' '}{(18*mod.atkcdr).toFixed(1)} / 
            {' '}{(16*mod.atkcdr).toFixed(1)} / 
            {' '}{(14*mod.atkcdr).toFixed(1)} 
          </h5>
            <h5 className="stat--mana">
          Cost: 
            {' '}{35} / 
            {' '}{40} / 
            {' '}{45} / 
            {' '}{50} 
          </h5>

          <h5 className="stat--hp">
            Shield strength:
          </h5>

          <p className="stat--hp"> 
            {' '}{Math.round(((70)+(atk.ap * 150 / 100)))} / 
            {' '}{Math.round(((100)+(atk.ap * 150 / 100)))} / 
            {' '}{Math.round(((130)+(atk.ap * 150 / 100)))} / 
            {' '}{Math.round(((160)+(atk.ap * 150 / 100)))}
          </p>
    
          <p>
          <b>PASSIVE</b> Attacks agains tagets under <span className="stat--hp">30% maximum health</span> deal an additional <span className="stat--ap">3% (+0.02% AP) missing Health magic damage</span>. <br />
          <b>ACTIVE:</b> Lanches a chronosphere that lasts 1.5 seconds, slowing by 40%. If Ekko eneters the sphere it detonates, stunning for 2.5 seconds and granting Ekko a shield that aborsbs <span className="stat--hp">70 / 100 / 130 / 160 (+150% AP) damage</span> for 2 seconds.
          </p>
        </div>
    },

    {
      description:
        <div className="abilityDescription">
          <h4>
          <span className="marker--ability">3</span> PHASE DIVE
          </h4>
    
          <h5>
          Cooldown: 
            {' '}{(9*mod.atkcdr).toFixed(1)} / 
            {' '}{(8*mod.atkcdr).toFixed(1)} / 
            {' '}{(8*mod.atkcdr).toFixed(1)} / 
            {' '}{(7*mod.atkcdr).toFixed(1)} 
          </h5>
            <h5 className="stat--mana">
          Cost: 
            {' '}{45} / 
            {' '}{50} / 
            {' '}{55} / 
            {' '}{60} 
          </h5>

          <h5 className="stat--ap">
            Damage:
          </h5>

          <p className="stat--ad">Pre-mitigation: 
            {' '}{Math.round(((60)+(atk.ap * 40 / 100)))} / 
            {' '}{Math.round(((90)+(atk.ap * 40 / 100)))} / 
            {' '}{Math.round(((120)+(atk.ap * 40 / 100)))} / 
            {' '}{Math.round(((150)+(atk.ap * 40 / 100)))}
          </p>

          <p className="stat--ad">Post-mitigation: 
            {' '}{Math.round(((60)+(atk.ap * 40 / 100)) * (1 - mod.defMagRed))} / 
            {' '}{Math.round(((90)+(atk.ap * 40 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.round(((120)+(atk.ap * 40 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.round(((150)+(atk.ap * 40 / 100))* (1 - mod.defMagRed))}          
          </p>
    
          <p>
          Dashes in a taget direction. Ekko's next attack within 3 seconds gains <b>250 range</b> and causes Ekko to blink to his target and deal an additional <span className="stat--ap"> 60 / 90 / 120 / 150 (+40% AP) magic damage</span>.
          </p>
        </div>
    },

    {
      description:
        <div className="abilityDescription">
          <h4>
          <span className="marker--ability">ULT</span> CHRONOBREAK
          </h4>
    
          <h5>
          Cooldown: 
            {' '}{(80*mod.atkcdr).toFixed(1)} / 
            {' '}{(60*mod.atkcdr).toFixed(1)} / 
            {' '}{(40*mod.atkcdr).toFixed(1)}
          </h5>
            <h5 className="stat--mana">
          Cost: 
            {' '}{100} / 
            {' '}{100} / 
            {' '}{100}
          </h5>

          <h5 className="stat--hp">
            Base healing:
          </h5>

          <p className="stat--hp"> 
            {' '}{Math.round(((100)+(atk.ap * 50 / 100)))} / 
            {' '}{Math.round(((150)+(atk.ap * 50 / 100)))} / 
            {' '}{Math.round(((200)+(atk.ap * 50 / 100)))}
          </p>

          <h5 className="stat--ap">
            Damage:
          </h5>

          <p className="stat--ad">Pre-mitigation: 
            {' '}{Math.round(((200)+(atk.ap * 150 / 100)))} / 
            {' '}{Math.round(((350)+(atk.ap * 150 / 100)))} / 
            {' '}{Math.round(((500)+(atk.ap * 150 / 100)))}
          </p>

          <p className="stat--ad">Post-mitigation: 
            {' '}{Math.round(((200)+(atk.ap * 150 / 100)) * (1 - mod.defMagRed))} / 
            {' '}{Math.round(((350)+(atk.ap * 150 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.round(((500)+(atk.ap * 150 / 100))* (1 - mod.defMagRed))}     
          </p>

          <p>
            Becomes untargetable and returns to his position 3.5 seconds ago and heals for <span className="stat--hp">100 / 150 / 200 (+50% AP)</span> increased by 3% per 1% of health lost within 3.5 seconds.

            Upon arrival, Ekko deals <span className="stat--ap">200 / 350 / 500 (+150% AP) magic damage</span> to nearby enemies.
          </p>
        </div>
    }
  ],

  'Evelynn': [
    {
      description:
        <div className="abilityDescription">
          <h4>
          <span className="marker--ability">P</span> DEMON SHADE
          </h4>

          <h5 className='stat--hp'>Healing amount per 1s / Threshhold:
          {' '}{Math.round(15+(2*currentLevel)+(atk.ap * 75 / 1000))} / 
          {' '}{Math.round(250+(70*currentLevel))}
          </h5>
    
          <p>
          Enters Demon Shade after not attacking or casting for 4 seconds. Taking damage from enemy champions or turrets puts Demon Shade on a 1.5 seconds cooldown. <br />

          In Demon Shade, Evelynn regenerates <abbr title="15 + 2 x Level" className="stat--hp">17-45</abbr> (+7.5% AP) Health every second when she is below <abbr title="250 + 70 x Level" className="stat--hp">320-1300 Health</abbr>. <br />

          After lever 5, Demons Shade grants her Camouflage.
          </p>
        </div>
    },

    {
      description:
        <div className="abilityDescription">
          <h4>
          <span className="marker--ability">1</span> HATE SPIKE
          </h4>
    
          <h5>
          Cooldown: 
            {' '}{(4*mod.atkcdr).toFixed(1)} / 
            {' '}{(4*mod.atkcdr).toFixed(1)} / 
            {' '}{(4*mod.atkcdr).toFixed(1)} / 
            {' '}{(4*mod.atkcdr).toFixed(1)} 
          </h5>
            <h5 className="stat--mana">
          Cost: 
            {' '}{30} / 
            {' '}{35} / 
            {' '}{40} / 
            {' '}{45} 
          </h5>

          <h5 className="stat--ap">
            Damage:
          </h5>

          <p className="stat--ad">Pre-mitigation: 
            {' '}{Math.round(((40)+(atk.ap * 40 / 100)))} / 
            {' '}{Math.round(((45)+(atk.ap * 40 / 100)))} / 
            {' '}{Math.round(((50)+(atk.ap * 40 / 100)))} / 
            {' '}{Math.round(((55)+(atk.ap * 40 / 100)))}
          </p>

          <p className="stat--ad">Post-mitigation: 
            {' '}{Math.round(((40)+(atk.ap * 40 / 100)) * (1 - mod.defMagRed))} / 
            {' '}{Math.round(((45)+(atk.ap * 40 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.round(((50)+(atk.ap * 40 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.round(((55)+(atk.ap * 40 / 100))* (1 - mod.defMagRed))}          
          </p>
    
          <p>
          Unleashes two lines of spikes, dealing <span className="stat--ap">40 / 45 / 50 / 55 (+40% AP) magic damage</span>, each to all enemies struck. Can re-cast within 4 seconds. <br />

          Deals <b>35% / 40% / 45% / 50%</b> damage to minions.
          </p>
        </div>
    },

    {
      description:
        <div className="abilityDescription">
          <h4>
          <span className="marker--ability">2</span> ALLURE
          </h4>
    
          <h5>
          Cooldown: 
            {' '}{(14*mod.atkcdr).toFixed(1)} / 
            {' '}{(13*mod.atkcdr).toFixed(1)} / 
            {' '}{(12*mod.atkcdr).toFixed(1)} / 
            {' '}{(11*mod.atkcdr).toFixed(1)} 
          </h5>
            <h5 className="stat--mana">
          Cost: 
            {' '}{70} / 
            {' '}{80} / 
            {' '}{90} / 
            {' '}{100} 
          </h5>
    
          <p>
          Curses target champion or monster for 5 seconds. Evelynn's next attack or ability will expunge the Curse adn slow them by <span className="stat--moveSpeed">65%</span>  for <b>1 / 1.25 / 1.5 / 1.75 seconds</b>. <br />

          If the Curse lasts at least <b>2.5</b> seconds, expungint it charms the target for <b>1 / 1.25 / 1.5 / 1.75 seconds</b>, If the target is a champion, shreds their Magic Resist by <abbr className="stat--magres" title='Applies before Magic penetration'>20% / 24% / 28% / 32% for 4 seconds</abbr>. <br />
          If the target is a monster, deal additional <span className="stat--ap">300 / 350 / 400 / 450 (+60% AP) magic damage</span>. <br />

          Casting Allure does not remove Evelynn from Demon Shade.            
          </p>
        </div>
    },

    {
      description:
        <div className="abilityDescription">
          <h4>
          <span className="marker--ability">3</span> WHIPLASH
          </h4>
    
          <h5>
          Cooldown: 
            {' '}{(8*mod.atkcdr).toFixed(1)} / 
            {' '}{(8*mod.atkcdr).toFixed(1)} / 
            {' '}{(8*mod.atkcdr).toFixed(1)} / 
            {' '}{(8*mod.atkcdr).toFixed(1)} 
          </h5>
            <h5 className="stat--mana">
          Cost: 
            {' '}{45} / 
            {' '}{50} / 
            {' '}{55} / 
            {' '}{60} 
          </h5>

          <h5 className="stat--ap">
           Base damage:
          </h5>

          <p className="stat--ad">Pre-mitigation: 
            {' '}{Math.round(((55)+(def.health * (3 + atk.ap * 0.015) / 100)))} / 
            {' '}{Math.round(((75)+(def.health * (3 + atk.ap * 0.015) / 100)))} / 
            {' '}{Math.round(((95)+(def.health * (3 + atk.ap * 0.015) / 100)))} / 
            {' '}{Math.round(((115)+(def.health * (3 + atk.ap * 0.015) / 100)))}
          </p>

          <p className="stat--ad">Post-mitigation: 
            {' '}{Math.round(((55)+(def.health * (3 + atk.ap * 0.015) / 100)) * (1 - mod.defMagRed))} / 
            {' '}{Math.round(((75)+(def.health * (3 + atk.ap * 0.015) / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.round(((95)+(def.health * (3 + atk.ap * 0.015) / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.round(((115)+(def.health * (3 + atk.ap * 0.015) / 100))* (1 - mod.defMagRed))}          
          </p>

          <h5 className="stat--ap">
           Empowered damage:
          </h5>

          <p className="stat--ad">Pre-mitigation: 
            {' '}{Math.round(((75)+(def.health * (5 + atk.ap * 0.02) / 100)))} / 
            {' '}{Math.round(((110)+(def.health * (5 + atk.ap * 0.02) / 100)))} / 
            {' '}{Math.round(((145)+(def.health * (5 + atk.ap * 0.02) / 100)))} / 
            {' '}{Math.round(((180)+(def.health * (5 + atk.ap * 0.02) / 100)))}
          </p>

          <p className="stat--ad">Post-mitigation: 
            {' '}{Math.round(((75)+(def.health * (5 + atk.ap * 0.02) / 100)) * (1 - mod.defMagRed))} / 
            {' '}{Math.round(((110)+(def.health * (5 + atk.ap * 0.02) / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.round(((145)+(def.health * (5 + atk.ap * 0.02) / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.round(((180)+(def.health * (5 + atk.ap * 0.02) / 100))* (1 - mod.defMagRed))}          
          </p>
    
          <p>
          Whips a target with Lashers, applying on-hit effects and dealing <span className="stat--ap">55 / 75 / 95 / 115 (+ 3% (+0.015% AP) of their max Health) magic damage</span> . Then gain 30% Movement Speed for 2 seconds.

          Entering Demon Shade enhances the next cast to pull Evelynn to her target, dealing <span className="stat--ap">75/110/145/180 plus 5% (+ 0.02% AP) of their max Health magic damage</span> to all enemies in the way.
          </p>
        </div>
    },

    {
      description:
        <div className="abilityDescription">
          <h4>
          <span className="marker--ability">ULT</span> LAST CARESS
          </h4>
    
          <h5>
          Cooldown: 
            {' '}{(105*mod.atkcdr).toFixed(1)} / 
            {' '}{(85*mod.atkcdr).toFixed(1)} / 
            {' '}{(65*mod.atkcdr).toFixed(1)}
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
            {' '}{Math.round(((120)+(atk.ap * 75 / 100)))} / 
            {' '}{Math.round(((240)+(atk.ap * 75 / 100)))} / 
            {' '}{Math.round(((360)+(atk.ap * 75 / 100)))}
          </p>

          <p className="stat--ad">Post-mitigation: 
            {' '}{Math.round(((120)+(atk.ap * 75 / 100)) * (1 - mod.defMagRed))} / 
            {' '}{Math.round(((240)+(atk.ap * 75 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.round(((360)+(atk.ap * 75 / 100))* (1 - mod.defMagRed))}
          </p>

          <h5 className="stat--ap">
            Empowered damage:
          </h5>

          <p className="stat--ad">Pre-mitigation: 
            {' '}{Math.round(((120)+(atk.ap * 75 / 100))*(230/100))} / 
            {' '}{Math.round(((240)+(atk.ap * 75 / 100))*(230/100))} / 
            {' '}{Math.round(((360)+(atk.ap * 75 / 100))*(230/100))}
          </p>

          <p className="stat--ad">Post-mitigation: 
            {' '}{Math.round(((120)+(atk.ap * 75 / 100)) * (1 - mod.defMagRed)*(230/100))} / 
            {' '}{Math.round(((240)+(atk.ap * 75 / 100))* (1 - mod.defMagRed)*(230/100))} / 
            {' '}{Math.round(((360)+(atk.ap * 75 / 100))* (1 - mod.defMagRed)*(230/100))}
          </p>
    
          <p>
          Evelynn briefly goes untargetable and decimates the area in front of her before warping backwards a long distance. Deals <span className="stat--ap">120 / 240 / 360 (+75% AP) magic damage</span>, increased to <b>230%</b> to enemy champions below <span className="stat--hp">35% Health</span>.
          </p>
        </div>
    }
  ],

  'Ezreal': [
    {
      description:
        <div className="abilityDescription">
          <h4>
          <span className="marker--ability">P</span> RISING SPELL FORCE
          </h4>

          <h5 className="stat--as">Bonus attack speed</h5>
          <p className="stat--as">1 Stack/Maxed: 
          {' '}{(champ.asBase * 10 / 100).toFixed(3)} / 
          {' '}{(champ.asBase * 40 / 100).toFixed(3)}
          </p>
    
          <p>
          Gains <span className="stat--as">10% Attack Speed</span>  for 8 seconds when hitting abilities, stacking up to 4 times.
          </p>
        </div>
    },

    {
      description:
        <div className="abilityDescription">
          <h4>
          <span className="marker--ability">1</span> MYSTIC SHOT
          </h4>
    
          <h5>
          Cooldown: 
            {' '}{(5*mod.atkcdr).toFixed(1)} / 
            {' '}{(4*mod.atkcdr).toFixed(1)} / 
            {' '}{(4*mod.atkcdr).toFixed(1)} / 
            {' '}{(3*mod.atkcdr).toFixed(1)} 
          </h5>
            <h5 className="stat--mana">
          Cost: 
            {' '}{30} / 
            {' '}{35} / 
            {' '}{40} / 
            {' '}{45} 
          </h5>

          <h5 className="stat--ad">
            Damage:
          </h5>

          <p className="stat--ad">Pre-mitigation: 
            {' '}{Math.round(((35)+(atk.attack * 120 / 100)+(atk.ap * 30 / 100)))} / 
            {' '}{Math.round(((70)+(atk.attack * 120 / 100)+(atk.ap * 30 / 100)))} / 
            {' '}{Math.round(((105)+(atk.attack * 120 / 100)+(atk.ap * 30 / 100)))} / 
            {' '}{Math.round(((140)+(atk.attack * 120 / 100)+(atk.ap * 30 / 100)))}
          </p>

          <p className="stat--ad">Post-mitigation: 
            {' '}{Math.round(((35)+(atk.attack * 120 / 100)+(atk.ap * 30 / 100)) * (1 - mod.defPhysRed))} / 
            {' '}{Math.round(((70)+(atk.attack * 120 / 100)+(atk.ap * 30 / 100))* (1 - mod.defPhysRed))} / 
            {' '}{Math.round(((105)+(atk.attack * 120 / 100)+(atk.ap * 30 / 100))* (1 - mod.defPhysRed))} / 
            {' '}{Math.round(((140)+(atk.attack * 120 / 100)+(atk.ap * 30 / 100))* (1 - mod.defPhysRed))}          
          </p>
    
          <p>
          Fires a bolt, dealing <span className="stat--ad">35 / 70 / 105 / 140 (+120% AD <span className="stat--ap">+30% AP</span> ) physical damage</span>. Hitting a target reduces Ezreal's other ability cooldowns by 1.5 seconds. Applies on-hit effects.
          </p>
        </div>
    },

    {
      description:
        <div className="abilityDescription">
          <h4>
          <span className="marker--ability">2</span> ESSENCE FLUX
          </h4>
    
          <h5>
          Cooldown: 
            {' '}{(12*mod.atkcdr).toFixed(1)} / 
            {' '}{(12*mod.atkcdr).toFixed(1)} / 
            {' '}{(12*mod.atkcdr).toFixed(1)} / 
            {' '}{(12*mod.atkcdr).toFixed(1)} 
          </h5>
            <h5 className="stat--mana">
          Cost: 
            {' '}{50} / 
            {' '}{50} / 
            {' '}{50} / 
            {' '}{50} 
          </h5>

          <h5 className="stat--ap">
            Damage:
          </h5>

          <p className="stat--ad">Pre-mitigation: 
            {' '}{Math.round(((85)+(atk.ap * 75 / 100)+(atk.attack * 60 / 100)))} / 
            {' '}{Math.round(((155)+(atk.ap * 80 / 100)+(atk.attack * 60 / 100)))} / 
            {' '}{Math.round(((230)+(atk.ap * 85 / 100)+(atk.attack * 60 / 100)))} / 
            {' '}{Math.round(((305)+(atk.ap * 90 / 100)+(atk.attack * 60 / 100)))}
          </p>

          <p className="stat--ad">Post-mitigation: 
            {' '}{Math.round(((85)+(atk.ap * 75 / 100)+(atk.attack * 60 / 100)) * (1 - mod.defMagRed))} / 
            {' '}{Math.round(((155)+(atk.ap * 80 / 100)+(atk.attack * 60 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.round(((230)+(atk.ap * 85 / 100)+(atk.attack * 60 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.round(((305)+(atk.ap * 90 / 100)+(atk.attack * 60 / 100))* (1 - mod.defMagRed))}          
          </p>
    
          <p>
          Fires an orb that sticks to a champion, epic monster or structure for 4 seconds. <br />
          Hitting the target with an attack or ability detonates the orb, dealing <span className="stat--ap">80 / 155 / 230 / 305 (<span className="stat--ad">+60% AD</span>  +75% / 80% / 85% / 90% AP) magic damage</span>  and refunding <span className="stat--mana">60 / 70 / 80 / 90 Mana</span>.
          </p>
        </div>
    },

    {
      description:
        <div className="abilityDescription">
          <h4>
          <span className="marker--ability">3</span> ARCANE SHIFT
          </h4>
    
          <h5>
          Cooldown: 
            {' '}{(28*mod.atkcdr).toFixed(1)} / 
            {' '}{(24*mod.atkcdr).toFixed(1)} / 
            {' '}{(20*mod.atkcdr).toFixed(1)} / 
            {' '}{(16*mod.atkcdr).toFixed(1)} 
          </h5>
            <h5 className="stat--mana">
          Cost: 
            {' '}{90} / 
            {' '}{90} / 
            {' '}{90} / 
            {' '}{90} 
          </h5>

          <h5 className="stat--ap">
            Damage:
          </h5>

          <p className="stat--ad">Pre-mitigation: 
            {' '}{Math.round(((80)+(atk.ap * 75 / 100)+(atk.attack * 50 / 100)))} / 
            {' '}{Math.round(((145)+(atk.ap * 75 / 100)+(atk.attack * 50 / 100)))} / 
            {' '}{Math.round(((210)+(atk.ap * 75 / 100)+(atk.attack * 50 / 100)))} / 
            {' '}{Math.round(((275)+(atk.ap * 75 / 100)+(atk.attack * 50 / 100)))}
          </p>

          <p className="stat--ad">Post-mitigation: 
            {' '}{Math.round(((80)+(atk.ap * 75 / 100)+(atk.attack * 50 / 100)) * (1 - mod.defMagRed))} / 
            {' '}{Math.round(((145)+(atk.ap * 75 / 100)+(atk.attack * 50 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.round(((210)+(atk.ap * 75 / 100)+(atk.attack * 50 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.round(((275)+(atk.ap * 75 / 100)+(atk.attack * 50 / 100))* (1 - mod.defMagRed))}          
          </p>
    
          <p>
            Blinks to taget location and fires a bolt, dealing <span className="stat--ap">80 / 145 / 210 / 275 (<span className="stat--ad">+50% AD</span> +75% AP) magic damage</span>. Prioritizes enemies hit by Essence Flux, then the nearest enemy.
          </p>
        </div>
    },

    {
      description:
        <div className="abilityDescription">
          <h4>
          <span className="marker--ability">ULT</span> TRUESHOT BARRAGE
          </h4>
    
          <h5>
          Cooldown: 
            {' '}{(70*mod.atkcdr).toFixed(1)} / 
            {' '}{(65*mod.atkcdr).toFixed(1)} / 
            {' '}{(60*mod.atkcdr).toFixed(1)}
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
            {' '}{Math.round(((350)+(atk.ap * 90 / 100)+(atk.attack * 100 / 100)))} / 
            {' '}{Math.round(((500)+(atk.ap * 90 / 100)+(atk.attack * 100 / 100)))} / 
            {' '}{Math.round(((650)+(atk.ap * 90 / 100)+(atk.attack * 100 / 100)))}
          </p>

          <p className="stat--ad">Post-mitigation: 
            {' '}{Math.round(((350)+(atk.ap * 90 / 100)) * (1 - mod.defMagRed)+(atk.attack * 100 / 100))} / 
            {' '}{Math.round(((500)+(atk.ap * 90 / 100))* (1 - mod.defMagRed)+(atk.attack * 100 / 100))} / 
            {' '}{Math.round(((650)+(atk.ap * 90 / 100))* (1 - mod.defMagRed)+(atk.attack * 100 / 100))}
          </p>
    
          <p>
          Fires an energy wave, dealing <span className="stat--ap">350 / 500 / 650 (<span className="stat--ad">+100% AD</span> +90% AP) magic damage</span>. <br />

          Deals 50% reduced damage to minions and non-epic monsters.
          </p>
        </div>
    }
  ],

  'Fiora': [
    {
      description:
        <div className="abilityDescription">
          <h4>
          <span className="marker--ability">P</span> DUELIST'S DANCE
          </h4>

          <h5 className="stat--vamp">Damage:</h5>
          <p className="stat--ad">{Math.round(def.health * ((3 + (atk.attack * 0.055))/100))}</p>

    
          <p>
            Revelas Vitals on nearby enemy champions. <br />
            Striking a Vital deals <span className="stat--vamp">3% <span className="stat--ad">(+0.055% AD)</span>  of the target's max Health as true damage</span>, heals Fiora for <abbr title="45-115 based on level" className="stat--hp">{40 + (5*currentLevel)} health</abbr>, and grants her <abbr title="Based on ULT ability's rank" className="stat--moveSpeed"></abbr> Movement Speed (based on Grand Challenge's rank), decaying over 1.75 seconds. <br />
            New Vitals are revealed after striking one, or after 15 seconds.
          </p>
        </div>
    },

    {
      description:
        <div className="abilityDescription">
          <h4>
          <span className="marker--ability">1</span> LUNGE
          </h4>
    
          <h5>
          Cooldown: 
            {' '}{(12*mod.atkcdr).toFixed(1)} / 
            {' '}{(10*mod.atkcdr).toFixed(1)} / 
            {' '}{(8*mod.atkcdr).toFixed(1)} / 
            {' '}{(6*mod.atkcdr).toFixed(1)} 
          </h5>
            <h5 className="stat--mana">
          Cost: 
            {' '}{20} / 
            {' '}{25} / 
            {' '}{30} / 
            {' '}{35} 
          </h5>

          <h5 className="stat--ad">
            Damage:
          </h5>

          <p className="stat--ad">Pre-mitigation: 
            {' '}{Math.round(((85)+(atk.attack * 100 / 100)))} / 
            {' '}{Math.round(((95)+(atk.attack * 105 / 100)))} / 
            {' '}{Math.round(((105)+(atk.attack * 110 / 100)))} / 
            {' '}{Math.round(((115)+(atk.attack * 115 / 100)))}
          </p>

          <p className="stat--ad">Post-mitigation: 
            {' '}{Math.round(((85)+(atk.attack * 100 / 100)) * (1 - mod.defPhysRed))} / 
            {' '}{Math.round(((95)+(atk.attack * 105 / 100))* (1 - mod.defPhysRed))} / 
            {' '}{Math.round(((105)+(atk.attack * 11 / 100))* (1 - mod.defPhysRed))} / 
            {' '}{Math.round(((115)+(atk.attack * 115 / 100))* (1 - mod.defPhysRed))}          
          </p>
    
          <p>
          Lunges and stabs a neaby enemy, dealing <span className="stat--ad"> 85 / 95 / 105 / 115 (+100% / 105% / 110% / 115% AD) physical damage </span>in an area. Hitting an enemy refunds <b>50%</b> of the cooldown.
          <br />
          Lunge prioritizes Vitals and enemies it will kill. Applies <span className="stat--ad">on-hit effects</span> to the primary target.
          </p>
        </div>
    },

    {
      description:
        <div className="abilityDescription">
          <h4>
          <span className="marker--ability">2</span> RIPOSTE
          </h4>
    
          <h5>
          Cooldown: 
            {' '}{(18*mod.atkcdr).toFixed(1)} / 
            {' '}{(16*mod.atkcdr).toFixed(1)} / 
            {' '}{(14*mod.atkcdr).toFixed(1)} / 
            {' '}{(12*mod.atkcdr).toFixed(1)} 
          </h5>
            <h5 className="stat--mana">
          Cost: 
            {' '}{50} / 
            {' '}{50} / 
            {' '}{50} / 
            {' '}{50} 
          </h5>

          <h5 className="stat--ap">
            Damage:
          </h5>

          <p className="stat--ad">Pre-mitigation: 
            {' '}{Math.round(((120)+(atk.ap * 100 / 100)))} / 
            {' '}{Math.round(((170)+(atk.ap * 100 / 100)))} / 
            {' '}{Math.round(((220)+(atk.ap * 100 / 100)))} / 
            {' '}{Math.round(((270)+(atk.ap * 100 / 100)))}
          </p>

          <p className="stat--ad">Post-mitigation: 
            {' '}{Math.round(((120)+(atk.ap * 100 / 100)) * (1 - mod.defMagRed))} / 
            {' '}{Math.round(((170)+(atk.ap * 100 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.round(((220)+(atk.ap * 100 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.round(((270)+(atk.ap * 100 / 100))* (1 - mod.defMagRed))}          
          </p>
    
          <p>
          Parries all incoming damage and debuffs for the next 0.75 econds. Then stabs in the target direction, dealing <span className="stat--ap">120 / 170 / 220 / 270 (+100% AP) magic damage</span>  to the first enemy champion, slowing their <span className="stat--moveSpeed">Movement Speed</span> and <span className="stat--as">Attack Speed</span> by <b>50%</b>  for 1.5 seconds.

          Riposte <b>stuns</b>  instead of slows if it parries an immobilizing effect.
          </p>
        </div>
    },

    {
      description:
        <div className="abilityDescription">
          <h4>
          <span className="marker--ability">3</span> BLADEWORK
          </h4>
    
          <h5>
          Cooldown: 
            {' '}{(11*mod.atkcdr).toFixed(1)} / 
            {' '}{(9*mod.atkcdr).toFixed(1)} / 
            {' '}{(7*mod.atkcdr).toFixed(1)} / 
            {' '}{(5*mod.atkcdr).toFixed(1)} 
          </h5>
            <h5 className="stat--mana">
          Cost: 
            {' '}{40} / 
            {' '}{45} / 
            {' '}{50} / 
            {' '}{50} 
          </h5>

          <h5 className="stat--ad">
            Damage:
          </h5>

          <p className="stat--ad">Pre-mitigation: 
            {' '}{Math.round(((0)+(atk.attack * 170 / 100)))} / 
            {' '}{Math.round(((0)+(atk.attack * 180 / 100)))} / 
            {' '}{Math.round(((0)+(atk.attack * 190 / 100)))} / 
            {' '}{Math.round(((0)+(atk.attack * 200 / 100)))}
          </p>

          <p className="stat--ad">Post-mitigation: 
            {' '}{Math.round(((0)+(atk.attack * 170 / 100)) * (1 - mod.defPhysRed))} / 
            {' '}{Math.round(((0)+(atk.attack * 180 / 100))* (1 - mod.defPhysRed))} / 
            {' '}{Math.round(((0)+(atk.attack * 190 / 100))* (1 - mod.defPhysRed))} / 
            {' '}{Math.round(((0)+(atk.attack * 200 / 100))* (1 - mod.defPhysRed))}          
          </p>
    
          <p>
            Empowers the next 2 attacks with <span className="stat--as">60% Attack Speed</span>. The first attack applies a <span className="stat--moveSpeed">30% slow</span>  for 1 second, but cannot critically strike. The second attack will aways critically strike for <span className="stat--critChance">170% / 180% / 190% / 200% physical damage</span>.
          </p>
        </div>
    },

    {
      description:
        <div className="abilityDescription">
          <h4>
          <span className="marker--ability">ULT</span> GRAND CHALLENGE
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

          <h5 className="stat--hp">Healing per tick:</h5>
          <p className="stat--hp"> 
            {Math.round(((80)+(atk.attack * 60 / 100)))} / 
            {' '}{Math.round(((110)+(atk.attack * 60 / 100)))} / 
            {' '}{Math.round(((140)+(atk.attack * 60 / 100)))}
          </p>

          <h5 className="stat--vamp">4 Vitals proc damage:</h5>
          <p className="stat--ad">{Math.round(def.health * 12 / 100)}</p>


    
          <p>
          Revelas all 4 Vitals on an enemy champion for 8 seconds and grants Duelist's Dance's Movement Speed while near them.
          <br />
          Striking all 4 Vitals in 8 seconds -or if the target dies after at least one  hit- heals Fiora and nearby allies for <span className="stat--hp">80 / 110 / 140 <span className="stat--ad">(+60% AD)</span> each second</span> . The heal persists for 2 to 5 seconds, scaling with the number of Vitals Hit.
          <br />
          Strikig all 4 Vitals deals <span className="stat--vamp">12% max health true damage</span>.
          </p>
        </div>
    }
  ],

  'Fizz': [
    {
      description:
        <div className="abilityDescription">
          <h4>
          <span className="marker--ability">P</span> SEASTONE TRIDENT
          </h4>

          <h5 className="stat--ap">Damage:</h5>
          <p className="stat--ad">Pre / post-mitigation:
          {' '}{Math.round(20 + (2 * currentLevel) + (atk.ap * 40 / 100))} /
          {' '}{Math.round((20 + (2 * currentLevel) + (atk.ap * 40 / 100))* (1 - mod.defMagRed))}
           </p>
    
          <p>
          Attacks deal an additional <abbr title="20 + 2 * Level" className="stat--ap">22-40 (+40% AP) magic damage</abbr> over 3 seconds. <br />
          Deals 105% damage to monsters.
          </p>
        </div>
    },

    {
      description:
        <div className="abilityDescription">
          <h4>
          <span className="marker--ability">1</span> URCHIN STRIKE
          </h4>
    
          <h5>
          Cooldown: 
            {' '}{(8*mod.atkcdr).toFixed(1)} / 
            {' '}{(7*mod.atkcdr).toFixed(1)} / 
            {' '}{(7*mod.atkcdr).toFixed(1)} / 
            {' '}{(6*mod.atkcdr).toFixed(1)} 
          </h5>
            <h5 className="stat--mana">
          Cost: 
            {' '}{50} / 
            {' '}{50} / 
            {' '}{50} / 
            {' '}{50} 
          </h5>

          <h5 className="stat--ap">
            Damage:
          </h5>

          <p className="stat--ad">Pre-mitigation: 
            {' '}{Math.round(((20)+(atk.ap * 55 / 100)+(atk.attack * 100 / 100)))} / 
            {' '}{Math.round(((40)+(atk.ap * 55 / 100)+(atk.attack * 100 / 100)))} / 
            {' '}{Math.round(((60)+(atk.ap * 55 / 100)+(atk.attack * 100 / 100)))} / 
            {' '}{Math.round(((80)+(atk.ap * 55 / 100)+(atk.attack * 100 / 100)))}
          </p>

          <p className="stat--ad">Post-mitigation: 
            {' '}{Math.round(((20)+(atk.ap * 55 / 100)) * (1 - mod.defMagRed) + ((atk.attack * 100 / 100))* (1 - mod.defPhysRed))} / 
            {' '}{Math.round(((40)+(atk.ap * 55 / 100))* (1 - mod.defMagRed) + ((atk.attack * 100 / 100))* (1 - mod.defPhysRed))} / 
            {' '}{Math.round(((60)+(atk.ap * 55 / 100))* (1 - mod.defMagRed) + ((atk.attack * 100 / 100))* (1 - mod.defPhysRed))} / 
            {' '}{Math.round(((80)+(atk.ap * 55 / 100))* (1 - mod.defMagRed) + ((atk.attack * 100 / 100))* (1 - mod.defPhysRed))}          
          </p>
    
          <p>
           Dashes through target enemy, dealing <span className="stat--ap">20 / 40 / 60 / 80 (+55% AP) magic damage</span> <span className="stat--ad">(+100% AD) physical damage</span> and applying on-hit effects. 
          </p>
        </div>
    },

    {
      description:
        <div className="abilityDescription">
          <h4>
          <span className="marker--ability">2</span> RENDING WAVE
          </h4>
    
          <h5>
          Cooldown: 
            {' '}{(10*mod.atkcdr).toFixed(1)} / 
            {' '}{(9*mod.atkcdr).toFixed(1)} / 
            {' '}{(9*mod.atkcdr).toFixed(1)} / 
            {' '}{(8*mod.atkcdr).toFixed(1)} 
          </h5>
            <h5 className="stat--mana">
          Cost: 
            {' '}{30} / 
            {' '}{40} / 
            {' '}{50} / 
            {' '}{60} 
          </h5>

          <h5 className="stat--ap">
            Damage:
          </h5>

          <p className="stat--ad">Pre-mitigation: 
            {' '}{Math.round(((50)+(atk.ap * 50 / 100)))} / 
            {' '}{Math.round(((75)+(atk.ap * 50 / 100)))} / 
            {' '}{Math.round(((100)+(atk.ap * 50 / 100)))} / 
            {' '}{Math.round(((125)+(atk.ap * 50 / 100)))}
          </p>

          <p className="stat--ad">Post-mitigation: 
            {' '}{Math.round(((50)+(atk.ap * 50 / 100)) * (1 - mod.defMagRed))} / 
            {' '}{Math.round(((75)+(atk.ap * 50 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.round(((100)+(atk.ap * 50 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.round(((125)+(atk.ap * 50 / 100))* (1 - mod.defMagRed))}          
          </p>

          <h5 className="stat--ap">
            Bonus on-hit damage:
          </h5>

          <p className="stat--ad">Pre-mitigation: 
            {' '}{Math.round(((10)+(atk.ap * 35 / 100)))} / 
            {' '}{Math.round(((15)+(atk.ap * 35 / 100)))} / 
            {' '}{Math.round(((20)+(atk.ap * 35 / 100)))} / 
            {' '}{Math.round(((25)+(atk.ap * 35 / 100)))}
          </p>

          <p className="stat--ad">Post-mitigation: 
            {' '}{Math.round(((10)+(atk.ap * 35 / 100)) * (1 - mod.defMagRed))} / 
            {' '}{Math.round(((15)+(atk.ap * 35 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.round(((20)+(atk.ap * 35 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.round(((25)+(atk.ap * 35 / 100))* (1 - mod.defMagRed))}          
          </p>
    
          <p>
          Empowers the next attack to gush water around the target, dealing <span className="stat--ap">50 / 75 / 100 / 125 (+50% AP) magic damage</span> and applying <span className="stat--ap">Seastone Trident</span> to enemies hit. Additional attacks within 5 seconds deal <span className="stat--ap">10 / 15 / 20 / 25 (+35% AP) bonus magic damage</span>. <br />
          
          Killing a unit with the first attack reduces Rending Wave's cooldown to 1 second.
          </p>
        </div>
    },

    {
      description:
        <div className="abilityDescription">
          <h4>
          <span className="marker--ability">3</span> PLAYFUL / TRICKSTER
          </h4>
    
          <h5>
          Cooldown: 
            {' '}{(16*mod.atkcdr).toFixed(1)} / 
            {' '}{(14*mod.atkcdr).toFixed(1)} / 
            {' '}{(12*mod.atkcdr).toFixed(1)} / 
            {' '}{(10*mod.atkcdr).toFixed(1)} 
          </h5>
            <h5 className="stat--mana">
          Cost: 
            {' '}{85} / 
            {' '}{90} / 
            {' '}{95} / 
            {' '}{100} 
          </h5>

          <h5 className="stat--ap">
            Damage:
          </h5>

          <p className="stat--ad">Pre-mitigation: 
            {' '}{Math.round(((80)+(atk.ap * 80 / 100)))} / 
            {' '}{Math.round(((150)+(atk.ap * 80 / 100)))} / 
            {' '}{Math.round(((220)+(atk.ap * 80 / 100)))} / 
            {' '}{Math.round(((290)+(atk.ap * 80 / 100)))}
          </p>

          <p className="stat--ad">Post-mitigation: 
            {' '}{Math.round(((80)+(atk.ap * 80 / 100)) * (1 - mod.defMagRed))} / 
            {' '}{Math.round(((150)+(atk.ap * 80 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.round(((220)+(atk.ap * 80 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.round(((290)+(atk.ap * 80 / 100))* (1 - mod.defMagRed))}          
          </p>
    
          <p>
          Vaults to target location, becoming untargetable while balanced on the trident. After 1.2 seconds, Fizz hops down with a large splash that deals <span className="stat--ap">80 / 150 / 220 / 290 (+80% AP) magic damage</span>  and slows enemies hit by <span className="stat--moveSpeed">40% / 45% / 50% / 55% for 2 seconds</span>. <br />
          <b>Re-cast:</b> Hop down early towards a direction, but deal damage in a smaller splash that does not slow enemies.
          </p>
        </div>
    },

    {
      description:
        <div className="abilityDescription">
          <h4>
          <span className="marker--ability">ULT</span> CHUM THE WATERS
          </h4>
    
          <h5>
          Cooldown: 
            {' '}{(85*mod.atkcdr).toFixed(1)} / 
            {' '}{(70*mod.atkcdr).toFixed(1)} / 
            {' '}{(55*mod.atkcdr).toFixed(1)}
          </h5>
            <h5 className="stat--mana">
          Cost: 
            {' '}{100} / 
            {' '}{100} / 
            {' '}{100}
          </h5>

          <h5 className="stat--ap">
           Mimimum damage:
          </h5>

          <p className="stat--ad">Pre-mitigation: 
            {' '}{Math.round(((150)+(atk.ap * 60 / 100)))} / 
            {' '}{Math.round(((250)+(atk.ap * 60 / 100)))} / 
            {' '}{Math.round(((350)+(atk.ap * 60 / 100)))}
          </p>

          <p className="stat--ad">Post-mitigation: 
            {' '}{Math.round(((150)+(atk.ap * 60 / 100)) * (1 - mod.defMagRed))} / 
            {' '}{Math.round(((250)+(atk.ap * 60 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.round(((350)+(atk.ap * 60 / 100))* (1 - mod.defMagRed))}  
          </p>

          <h5 className="stat--ap">
           Maximum damage:
          </h5>

          <p className="stat--ad">Pre-mitigation: 
            {' '}{Math.round(((300)+(atk.ap * 120 / 100)))} / 
            {' '}{Math.round(((400)+(atk.ap * 120 / 100)))} / 
            {' '}{Math.round(((500)+(atk.ap * 120 / 100)))}
          </p>

          <p className="stat--ad">Post-mitigation: 
            {' '}{Math.round(((300)+(atk.ap * 120 / 100)) * (1 - mod.defMagRed))} / 
            {' '}{Math.round(((400)+(atk.ap * 120 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.round(((500)+(atk.ap * 120 / 100))* (1 - mod.defMagRed))}
          </p>
    
          <p>
          Launches a fish in taget direction that attaches to the first champion hit and reveals them. After 2 seconds, the fish attracts a shark that knocks up its target and knocks away enemies around them. The farther the fish travels, the larger the shark it will attract, dealing <span className="stat---ap"> 150 / 250 / 350 (+60% AP) to 300 / 400 / 500 (+120% AP) magic damage</span> and slowing enemies hit by <span className="stat--moveSpeed"> 40% to 80%</span> based on the size of the shark. <br />
          If the fish does not attach to a champion, it will flop on the ground and still attract a shark at its location.
          </p>
        </div>
    }
  ],

  'Galio': [
    {
      description:
        <div className="abilityDescription">
          <h4>
          <span className="marker--ability">P</span> COLOSSAL SMASH
          </h4>

          <h5 className="stat--ap">Damage:</h5>
          <p className="stat--ad">Pre/post-mitigation:
          {' '}{Math.round((atk.attack * 100 / 100) + (atk.ap * 50 / 100) + (atk.magres * 60 / 100))} / 
          {' '}{Math.round(((atk.attack * 100 / 100) + (atk.ap * 50 / 100) + (atk.magres * 60 / 100)) * (1 - mod.defMagRed))}
          </p>

          <p>
            Enhances his next attack to deal <span className="stat--ap">(<span className="stat--ad">100% AD</span> +50% AP <span className="stat--magres">+60% MR</span>) magic damage</span> to nearby enemies.
          </p>
        </div>
    },

    {
      description:
        <div className="abilityDescription">
          <h4>
          <span className="marker--ability">1</span> WINDS OF WAR
          </h4>
    
          <h5>
          Cooldown: 
            {' '}{(11*mod.atkcdr).toFixed(1)} / 
            {' '}{(11*mod.atkcdr).toFixed(1)} / 
            {' '}{(10*mod.atkcdr).toFixed(1)} / 
            {' '}{(10*mod.atkcdr).toFixed(1)} 
          </h5>
            <h5 className="stat--mana">
          Cost: 
            {' '}{75} / 
            {' '}{75} / 
            {' '}{75} / 
            {' '}{75} 
          </h5>

          <h5 className="stat--ap">
            Damage:
          </h5>

          <p className="stat--ad">Pre-mitigation: 
            {' '}{Math.round(((70)+(atk.ap * 75 / 100)))} / 
            {' '}{Math.round(((115)+(atk.ap * 75 / 100)))} / 
            {' '}{Math.round(((160)+(atk.ap * 75 / 100)))} / 
            {' '}{Math.round(((205)+(atk.ap * 75 / 100)))}
          </p>

          <p className="stat--ad">Post-mitigation: 
            {' '}{Math.round(((70)+(atk.ap * 75 / 100)) * (1 - mod.defMagRed))} / 
            {' '}{Math.round(((115)+(atk.ap * 75 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.round(((160)+(atk.ap * 75 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.round(((205)+(atk.ap * 75 / 100))* (1 - mod.defMagRed))}</p> 

            <h5 className="stat--ap">
            Tornado damage (current target):
          </h5>
          <p className="stat--ad">Post-mitigation: 
          {' '}{Math.round(((def.health) * ((8/100) + (atk.ap * 2 / 100)))* (1 - mod.defMagRed))}    
          </p>         
          
    
          <p>
          Fires two windblasts that deal <span className="stat--ap">70 / 115 / 160 / 205 (+75% AP) magic damage</span> and converge into a tornado.

          The tornado deals <span className="stat--ap">8% (+2% AP) magic damage</span>  of target's <span className="stat--hp">maximum Health</span>  over 1.5 seconds.
          </p>
        </div>
    },

    {
      description:
        <div className="abilityDescription">
          <h4>
          <span className="marker--ability">2</span> SHIELD OF DURAND
          </h4>
    
          <h5>
          Cooldown: 
            {' '}{(18*mod.atkcdr).toFixed(1)} / 
            {' '}{(17*mod.atkcdr).toFixed(1)} / 
            {' '}{(16*mod.atkcdr).toFixed(1)} / 
            {' '}{(15*mod.atkcdr).toFixed(1)} 
          </h5>
            <h5 className="stat--mana">
          Cost: 
            {' '}{50} / 
            {' '}{50} / 
            {' '}{50} / 
            {' '}{50} 
          </h5>

          <h5 className="stat--ap">
            Damage:
          </h5>

          <p className="stat--ad">Pre-mitigation: 
            {' '}{Math.round(((40)+(atk.ap * 55 / 100)))} / 
            {' '}{Math.round(((80)+(atk.ap * 55 / 100)))} / 
            {' '}{Math.round(((120)+(atk.ap * 55 / 100)))} / 
            {' '}{Math.round(((160)+(atk.ap * 55 / 100)))}
          </p>

          <p className="stat--ad">Post-mitigation: 
            {' '}{Math.round(((40)+(atk.ap * 55 / 100)) * (1 - mod.defMagRed))} / 
            {' '}{Math.round(((80)+(atk.ap * 55 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.round(((120)+(atk.ap * 55 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.round(((160)+(atk.ap * 55 / 100))* (1 - mod.defMagRed))}          
          </p>

          <h5 className="stat--hp">Shield</h5>
          <p className="stat--hp">
            {Math.round(atk.health * 8 / 100)} /
            {' '}{Math.round(atk.health * 12 / 100)} / 
            {' '}{Math.round(atk.health * 16 / 100)} / 
            {' '}{Math.round(atk.health * 20 / 100)}
          </p>

          <h5 className="stat--armor">Damage reduction:</h5>
          <p className="stat--armor">Physical:
          {' '}{Math.round(12.5 + (atk.ap * 25 / 1000) + (atk.magres * 4 / 100))}% /
          {' '}{Math.round(15 + (atk.ap * 25 / 1000) + (atk.magres * 4 / 100))}% /
          {' '}{Math.round(17.5 + (atk.ap * 25 / 1000) + (atk.magres * 4 / 100))}% /
          {' '}{Math.round(20 + (atk.ap * 25 / 1000) + (atk.magres * 4 / 100))}%
          </p>
          <p className="stat--magres">Magical:
          {' '}{Math.round(25 + (atk.ap * 5 / 100) + (atk.magres * 8 / 100))}% /
          {' '}{Math.round(30 + (atk.ap * 5 / 100) + (atk.magres * 8 / 100))}% /
          {' '}{Math.round(35 + (atk.ap * 5 / 100) + (atk.magres * 8 / 100))}% /
          {' '}{Math.round(40 + (atk.ap * 5 / 100) + (atk.magres * 8 / 100))}%
          </p>         

          <p>
            <b>PASSIVE:</b> Every 12 seconds, upon taking magic damage, Galio gains a shield that absorbs <span className="stat--hp">8% / 12% / 16% / 20% Max health</span> <span className="stat--magres">magic damage</span> for 3.5 seconds. <br />

            <b>HOLD:</b>  Enters a defensive stance, slowing himself by <span className="stat--moveSpeed">15%</span> for up to 2 seconds, Takes <span className="stat--magres">25% / 30% / 35% / 40% (<span className="stat--ap">+5% AP</span>  +8% MR) reduced magic damage</span> and <span className="stat--armor">12.5% / 15%  / 17.5% / 20% (<span className="stat--ap">+2.5% AP</span> <span className="stat--magres">+4% MR</span>) reduced physical damage</span>. <br />
            <b>RELEASE:</b> Deals <span className="stat--ap">40 / 80 / 120 / 160 (+55% AP) magic damage</span> to nearby enemies and <b>taunts them for 0.5-1.5 seconds</b>, increased with hold time.
          </p>
        </div>
    },

    {
      description:
        <div className="abilityDescription">
          <h4>
          <span className="marker--ability">3</span> JUSTICE PUNCH
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
            {' '}{50} / 
            {' '}{50} / 
            {' '}{50} / 
            {' '}{50} 
          </h5>

          <h5 className="stat--ap">
            Damage:
          </h5>

          <p className="stat--ad">Pre-mitigation: 
            {' '}{Math.round(((90)+(atk.ap * 90 / 100)))} / 
            {' '}{Math.round(((140)+(atk.ap * 90 / 100)))} / 
            {' '}{Math.round(((190)+(atk.ap * 90 / 100)))} / 
            {' '}{Math.round(((240)+(atk.ap * 90 / 100)))}
          </p>

          <p className="stat--ad">Post-mitigation: 
            {' '}{Math.round(((90)+(atk.ap * 90 / 100)) * (1 - mod.defMagRed))} / 
            {' '}{Math.round(((140)+(atk.ap * 90 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.round(((190)+(atk.ap * 90 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.round(((240)+(atk.ap * 90 / 100))* (1 - mod.defMagRed))}          
          </p>
    
          <p>
          Dashes forward until he hits an enemy champion or terrain, dealing <span className="stat--ap">90 / 140 / 190 / 240 (+90% AP) magic damage</span> to enemies and knocking them up for <b>0.75 seconds</b>. <br />

          Deals <b>50%</b> damage to minions and monsters.
          </p>
        </div>
    },

    {
      description:
        <div className="abilityDescription">
          <h4>
          <span className="marker--ability">ULT</span> HERO'S ENTRANCE
          </h4>
    
          <h5>
          Cooldown: 
            {' '}{(100*mod.atkcdr).toFixed(1)} / 
            {' '}{(90*mod.atkcdr).toFixed(1)} / 
            {' '}{(80*mod.atkcdr).toFixed(1)}
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
          Grants <b>Shield of Durand's</b> passive shield for 5 seconds to all allied champions near the target and designates the position as his landing spot.

          After 2.5 seconds Galio arrives at the location, dealing <span className="stat--ap">150 / 250 / 350 (+70% AP) magic damage</span> to nearby enemies and knocking them up for 0.75 seconds.
          </p>
        </div>
    }
  ],

  'Garen': [
    {
      description:
        <div className="abilityDescription">
          <h4>
          <span className="marker--ability">P</span> PERSEVERANCE
          </h4> 

          <p>
            Garen regenerates <abbr title="1.2% - 4% (based on level)" className="stat--hp">{1 + 0.2 * currentLevel}% of his missing health</abbr> per second. <br />
            Perseverance is disabled for 5 seconds whenever Garen takes damage from enemy champions, turrets, or epic monsters, or is hit by attacks or abilities, refreshing on subsequent damage and hits against him.
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
          Calls forth the might of Demacia to execute an enemy champion, dealing <span className="stat--critChance">150 / 250 / 350 +15% (<span className="stat--ad"> +0.12% AD</span>) true damage of the target's missing health</span>. <br />
           Nearby enemies take <span className="stat--critChance">75 +7.5% (<span className="stat--ad">+0.06% AD</span>) true damage of their missing health</span>. <br />
          Deals a max of 600 damage to epic monsters.
          </p>
        </div>
    }
  ],

  'Gragas': [
    {
      description:
        <div className="abilityDescription">
          <h4>
          <span className="marker--ability">P</span> HAPPY HOUR
          </h4>
    
          <h5>
          Cooldown: 
            {' '}<abbr title="Static, not affected by Ability Haste"> {(8).toFixed(1)}</abbr>
          </h5>         
    
          <p>
           Casting an ability restores <abbr title="7% of Max Health" className="stat--hp">{Math.round(atk.health * 7 / 100)}</abbr> Health.
          </p>
        </div>
    },

    {
      description:
        <div className="abilityDescription">
          <h4>
          <span className="marker--ability">1</span> BARREL ROLL
          </h4>
    
          <h5>
          Cooldown: 
            {' '}{(9*mod.atkcdr).toFixed(1)} / 
            {' '}{(8*mod.atkcdr).toFixed(1)} / 
            {' '}{(7*mod.atkcdr).toFixed(1)} / 
            {' '}{(6*mod.atkcdr).toFixed(1)} 
          </h5>
            <h5 className="stat--mana">
          Cost: 
            {' '}{65} / 
            {' '}{70} / 
            {' '}{75} / 
            {' '}{80} 
          </h5>
          <h5 className="stat--ap">
            Damage:
          </h5>

          <p className="stat--ad">Pre-mitigation: 
            {' '}{Math.round(((65)+(atk.ap * 70 / 100)))} / 
            {' '}{Math.round(((120)+(atk.ap * 70 / 100)))} / 
            {' '}{Math.round(((175)+(atk.ap * 70 / 100)))} / 
            {' '}{Math.round(((230)+(atk.ap * 70 / 100)))}
          </p>

          <p className="stat--ad">Post-mitigation: 
            {' '}{Math.round(((65)+(atk.ap * 70 / 100)) * (1 - mod.defMagRed))} / 
            {' '}{Math.round(((120)+(atk.ap * 70 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.round(((175)+(atk.ap * 70 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.round(((230)+(atk.ap * 70 / 100))* (1 - mod.defMagRed))}          
          </p>
    
          <p>
          Rolls a cask to target location that explodes upon re-casting or after 3 seconds. Enemies hit take <span className='stat--ap'>65 / 120 / 175 / 230 (+70% AP) magic damage</span>  and are slowed by <span className="stat--moveSpeed"> 30% / 35% / 40% / 45% for 2 seconds</span>. <br />
          The damage and slow amount increase over the first 1.5 seconds, by up to <b className="stat--critChance">150%</b>. <br />
          The cask reveals the area and deals 50% damage to minions. 
          </p>
        </div>
    },

    {
      description:
        <div className="abilityDescription">
          <h4>
          <span className="marker--ability">2</span> DRUNDKEN RAGE
          </h4>
    
          <h5>
          Cooldown: 
            {' '}{(5*mod.atkcdr).toFixed(1)} / 
            {' '}{(5*mod.atkcdr).toFixed(1)} / 
            {' '}{(5*mod.atkcdr).toFixed(1)} / 
            {' '}{(5*mod.atkcdr).toFixed(1)} 
          </h5>
            <h5 className="stat--mana">
          Cost: 
            {' '}{20} / 
            {' '}{20} / 
            {' '}{20} / 
            {' '}{20} 
          </h5>

          <h5 className="stat--armor">Damage reduction:</h5>
          <p className="stat--armor:">
          {' '}{Math.round((8) + (atk.ap * 4 / 10000))}% /
          {' '}{Math.round((11) + (atk.ap * 4 / 10000))}% /
          {' '}{Math.round((14) + (atk.ap * 4 / 10000))}% /
          {' '}{Math.round((17) + (atk.ap * 4 / 10000))}%
          </p>

          <h5 className="stat--ap">
            Damage:
          </h5>

          <p className="stat--ad">Pre-mitigation: 
            {' '}{Math.round(((20)+(atk.ap * 75 / 100) + (def.health * 7 / 100)))} / 
            {' '}{Math.round(((60)+(atk.ap * 75 / 100) + (def.health * 7 / 100)))} / 
            {' '}{Math.round(((100)+(atk.ap * 75 / 100) + (def.health * 7 / 100)))} / 
            {' '}{Math.round(((140)+(atk.ap * 75 / 100) + (def.health * 7 / 100)))}
          </p>

          <p className="stat--ad">Post-mitigation: 
            {' '}{Math.round(((20)+(atk.ap * 75 / 100) + (def.health * 7 / 100)) * (1 - mod.defMagRed))} / 
            {' '}{Math.round(((60)+(atk.ap * 75 / 100) + (def.health * 7 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.round(((100)+(atk.ap * 75 / 100) + (def.health * 7 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.round(((140)+(atk.ap * 75 / 100) + (def.health * 7 / 100))* (1 - mod.defMagRed))}          
          </p>
    
          <p>
          Reduces damage taken by <span className="stat--armor">8% / 11% / 14% / 17% (<span className="stat--ap">+0.04% AP</span>)</span>  for 2.5 seconds. <br />

        The next attack within 5 seconds after drinking is empowered to splash enemies for bonus <span className="stat--ap">20 / 60 / 100 /140 (+75% AP) <span className="stat--hp">(+7% target's Max Health)</span> magic damage</span>.
          </p>
        </div>
    },

    {
      description:
        <div className="abilityDescription">
          <h4>
          <span className="marker--ability">3</span> BODY SLAM
          </h4>
    
          <h5>
          Cooldown: 
            {' '}{(15*mod.atkcdr).toFixed(1)} / 
            {' '}{(14*mod.atkcdr).toFixed(1)} / 
            {' '}{(13*mod.atkcdr).toFixed(1)} / 
            {' '}{(12*mod.atkcdr).toFixed(1)} 
          </h5>
            <h5 className="stat--mana">
          Cost: 
            {' '}{50} / 
            {' '}{50} / 
            {' '}{50} / 
            {' '}{50} 
          </h5>

          <h5 className="stat--ap">
            Damage:
          </h5>

          <p className="stat--ad">Pre-mitigation: 
            {' '}{Math.round(((80)+(atk.ap * 70 / 100)))} / 
            {' '}{Math.round(((145)+(atk.ap * 70 / 100)))} / 
            {' '}{Math.round(((210)+(atk.ap * 70 / 100)))} / 
            {' '}{Math.round(((275)+(atk.ap * 70 / 100)))}
          </p>

          <p className="stat--ad">Post-mitigation: 
            {' '}{Math.round(((80)+(atk.ap * 70 / 100)) * (1 - mod.defMagRed))} / 
            {' '}{Math.round(((145)+(atk.ap * 70 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.round(((210)+(atk.ap * 70 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.round(((275)+(atk.ap * 70 / 100))* (1 - mod.defMagRed))}          
          </p>
    
          <p>
          Charges forward, colliding with the first enemy hit to deal <span className="stat--ap">80 / 145 / 210 / 275 (+70% AP) magic damage</span> to nearby enemies. Enemies hit are also bumped backwards, stunning them for <b>1</b> second. <br />
          Body Slam's cooldown is reduced by 3 seconds if it succesfully collides with an enemy.
          </p>
        </div>
    },

    {
      description:
        <div className="abilityDescription">
          <h4>
          <span className="marker--ability">ULT</span> EXPLOSIVE CASK
          </h4>
    
          <h5>
          Cooldown: 
            {' '}{(85*mod.atkcdr).toFixed(1)} / 
            {' '}{(70*mod.atkcdr).toFixed(1)} / 
            {' '}{(55*mod.atkcdr).toFixed(1)}
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
            {' '}{Math.round(((200)+(atk.ap * 70 / 100)))} / 
            {' '}{Math.round(((300)+(atk.ap * 70 / 100)))} / 
            {' '}{Math.round(((400)+(atk.ap * 70 / 100)))}
          </p>

          <p className="stat--ad">Post-mitigation: 
            {' '}{Math.round(((200)+(atk.ap * 70 / 100)) * (1 - mod.defMagRed))} / 
            {' '}{Math.round(((300)+(atk.ap * 70 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.round(((400)+(atk.ap * 70 / 100))* (1 - mod.defMagRed))}
          </p>
    
          <p>
            Hurls a potent cask that explodes when it lands, dealing <span className="stat--ap">200 / 300 / 400 (+70% AP) magic damage</span> and knocking enemies away from the explosion's center. The cask has a fixed travel time.
          </p>
        </div>
    }
  ],

  'Graves': [
    {
      description:
        <div className="abilityDescription">
          <h4>
          <span className="marker--ability">P</span> NEW DESTINY
          </h4>

          <h5 className="stat--ad">
            Damage:
          </h5>

          <p className="stat--ad">Pre-mitigation: 
            {' '}Bullet: {Math.round(((atk.attack * (70 + 2 * currentLevel) / 100)))} / 
            {' '}Salvo: {Math.round(((atk.attack * (70 + 2 * currentLevel) / 100)*(1 + (0.24*3))))} / 
            <span className="stat--critChance">
              {' '}Crit-bullet: {Math.round(((atk.attack * (70 + 2 * currentLevel) / 100)) * (130 / 100))} / 
              {' '}Crit-salvo: {Math.round(((atk.attack * (70 + 2 * currentLevel) / 100) * (130 / 100)) * (1 + (0.24*6) * 1.3))}
            </span> 
          </p>

          <p className="stat--ad">Post-mitigation: 
            {' '}Bullet: {Math.round(((atk.attack * (70 + 2 * currentLevel) / 100)) * (1 - mod.defPhysRed))} / 
            {' '}Salvo: {Math.round(((atk.attack * (70 + 2 * currentLevel) / 100)*(1 + (0.24*3))) * (1 - mod.defPhysRed))} /
            <span className="stat--critChance">
              {' '}Crit-bullet: {Math.round((((atk.attack * (70 + 2 * currentLevel) / 100)) * (130 / 100)) * (1 - mod.defPhysRed))} / 
              {' '}Crit-salvo: {Math.round((((atk.attack * (70 + 2 * currentLevel) / 100) * (130 / 100)) * (1 + (0.24*6) * 1.3)) * (1 - mod.defPhysRed))}
            </span>
          </p>
    
          <p>
          Graves' shotgun has some unique properties: <br />
          <b>Double Barrel:</b> Graves must reload when he runs out of ammo. Attack Speed reduces reload time slightly, but reduces time between attacks dramatically.

          <b>12 Gauge:</b>  Attacks fire 4 bullets. Units hit take <span className="stat--ad">72% AD physical damage +24% for additional bullets</span>. Critical strikes fire <span className="stat--critChance">6 bullets, 130% damage each and increase each bullet's damage by 30%</span>. Strcutures only take 75% damage. <br />

          <b>Buckshot:</b> Bullets cannot pass through enemy units. Non-champions struck by multiple bullets are knock back slightly. 
          </p>
        </div>
    },

    {
      description:
        <div className="abilityDescription">
          <h4>
          <span className="marker--ability">1</span> END OF THE LINE
          </h4>
    
          <h5>
          Cooldown: 
            {' '}{(13*mod.atkcdr).toFixed(1)} / 
            {' '}{(11*mod.atkcdr).toFixed(1)} / 
            {' '}{(9*mod.atkcdr).toFixed(1)} / 
            {' '}{(7*mod.atkcdr).toFixed(1)} 
          </h5>
            <h5 className="stat--mana">
          Cost: 
            {' '}{65} / 
            {' '}{70} / 
            {' '}{75} / 
            {' '}{80} 
          </h5>

          <h5 className="stat--ad">
           Initial damage:
          </h5>

          <p className="stat--ad">Pre-mitigation: 
            {' '}{Math.round(((45)+(atk.attack * 80 / 100)))} / 
            {' '}{Math.round(((65)+(atk.attack * 80 / 100)))} / 
            {' '}{Math.round(((85)+(atk.attack * 80 / 100)))} / 
            {' '}{Math.round(((105)+(atk.attack * 80 / 100)))}
          </p>

          <p className="stat--ad">Post-mitigation: 
            {' '}{Math.round(((45)+(atk.attack * 80 / 100)) * (1 - mod.defPhysRed))} / 
            {' '}{Math.round(((65)+(atk.attack * 80 / 100))* (1 - mod.defPhysRed))} / 
            {' '}{Math.round(((85)+(atk.attack * 80 / 100))* (1 - mod.defPhysRed))} / 
            {' '}{Math.round(((105)+(atk.attack * 80 / 100))* (1 - mod.defPhysRed))}          
          </p>

          <h5 className="stat--ad">
           Explosion damage:
          </h5>

          <p className="stat--ad">Pre-mitigation: 
            {' '}{Math.round(((80)+(atk.attack * 80 / 100)))} / 
            {' '}{Math.round(((130)+(atk.attack * 80 / 100)))} / 
            {' '}{Math.round(((180)+(atk.attack * 80 / 100)))} / 
            {' '}{Math.round(((230)+(atk.attack * 80 / 100)))}
          </p>

          <p className="stat--ad">Post-mitigation: 
            {' '}{Math.round(((80)+(atk.attack * 80 / 100)) * (1 - mod.defPhysRed))} / 
            {' '}{Math.round(((130)+(atk.attack * 80 / 100))* (1 - mod.defPhysRed))} / 
            {' '}{Math.round(((180)+(atk.attack * 80 / 100))* (1 - mod.defPhysRed))} / 
            {' '}{Math.round(((230)+(atk.attack * 80 / 100))* (1 - mod.defPhysRed))}          
          </p>
    
          <p>
            Fires a powder round that deals <span className="stat--ad">45 / 65 / 85 / 105 (+80% AD) physical damage</span> and then detonates after 1 second to deal an additional <span className="stat--ad">80 / 130 / 180 / 230 (+80% / 110% / 140% / 170% AD) physical damage</span>. <br />

            Detonates in 0.25 seconds if the round hits terrain, Deals 90% damage against monsters.
          </p>
        </div>
    },

    {
      description:
        <div className="abilityDescription">
          <h4>
          <span className="marker--ability">2</span> SMOKE SCREEN
          </h4>
    
          <h5>
          Cooldown: 
            {' '}{(20*mod.atkcdr).toFixed(1)} / 
            {' '}{(18*mod.atkcdr).toFixed(1)} / 
            {' '}{(16*mod.atkcdr).toFixed(1)} / 
            {' '}{(14*mod.atkcdr).toFixed(1)} 
          </h5>
            <h5 className="stat--mana">
          Cost: 
            {' '}{75} / 
            {' '}{80} / 
            {' '}{85} / 
            {' '}{90} 
          </h5>

          <h5 className="stat--ap">
            Damage:
          </h5>

          <p className="stat--ap">Pre-mitigation: 
            {' '}{Math.round(((60)+(atk.ap * 60 / 100)))} / 
            {' '}{Math.round(((125)+(atk.ap * 60 / 100)))} / 
            {' '}{Math.round(((190)+(atk.ap * 60 / 100)))} / 
            {' '}{Math.round(((255)+(atk.ap * 60 / 100)))}
          </p>

          <p className="stat--ap">Post-mitigation: 
            {' '}{Math.round(((60)+(atk.ap * 60 / 100)) * (1 - mod.defMagRed))} / 
            {' '}{Math.round(((125)+(atk.ap * 60 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.round(((190)+(atk.ap * 60 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.round(((255)+(atk.ap * 60 / 100))* (1 - mod.defMagRed))}          
          </p>
    
          <p>
          Throws a canister that creates a cloud of smoke for 4 seconds. Enemies within the smoke cannot see outside of it. <br />

          Enemies caught in the initial impact take <span className="stat--ap">60 / 125 / 190 / 255 (+60% AP) magic damage</span> and are <span className="stat--moveSpeed">slowed by 50%</span> for 0.5 seconds.
          </p>
        </div>
    },

    {
      description:
        <div className="abilityDescription">
          <h4>
          <span className="marker--ability">3</span> QUICKDRAW
          </h4>
    
          <h5>
          Cooldown: 
            {' '}{(16*mod.atkcdr).toFixed(1)} / 
            {' '}{(15*mod.atkcdr).toFixed(1)} / 
            {' '}{(14*mod.atkcdr).toFixed(1)} / 
            {' '}{(13*mod.atkcdr).toFixed(1)} 
          </h5>
            <h5 className="stat--mana">
          Cost: 
            {' '}{40} / 
            {' '}{40} / 
            {' '}{40} / 
            {' '}{40} 
          </h5>
    
          <p>
          Dashes a fixed length in a target direction, reloading one shell and granting <b>True Grit</b> for 4 seconds. True Grit grants <span className="stat--armor">6 / 10 / 14 / 18 bonus armor</span>, stacks up to 8 times, and refreshes when damaging non-minions. <br />
          Dashing towards an enemy champion grants 2 stacks of True Grit. Each bullet hit reduces Quickdraw's cooldown by 0.5 seconds.
          </p>
        </div>
    },

    {
      description:
        <div className="abilityDescription">
          <h4>
          <span className="marker--ability">ULT</span> COLLATERAL DAMAGE
          </h4>
    
          <h5>
          Cooldown: 
            {' '}{(75*mod.atkcdr).toFixed(1)} / 
            {' '}{(60*mod.atkcdr).toFixed(1)} / 
            {' '}{(45*mod.atkcdr).toFixed(1)}
          </h5>
            <h5 className="stat--mana">
          Cost: 
            {' '}{100} / 
            {' '}{100} / 
            {' '}{100}
          </h5>

          <h5 className="stat--ad">
            Shell damage:
          </h5>

          <p className="stat--ad">Pre-mitigation: 
            {' '}{Math.round(((300)+(atk.attack * 150 / 100)))} / 
            {' '}{Math.round(((450)+(atk.attack * 150 / 100)))} / 
            {' '}{Math.round(((600)+(atk.attack * 150 / 100)))}
          </p>

          <p className="stat--ad">Post-mitigation: 
            {' '}{Math.round(((300)+(atk.attack * 150 / 100)) * (1 - mod.defPhysRed))} / 
            {' '}{Math.round(((450)+(atk.attack * 150 / 100))* (1 - mod.defPhysRed))} / 
            {' '}{Math.round(((600)+(atk.attack * 150 / 100))* (1 - mod.defPhysRed))}
          </p>

          <h5 className="stat--ad">
            Explosion damage:
          </h5>

          <p className="stat--ad">Pre-mitigation: 
            {' '}{Math.round(((200)+(atk.attack * 120 / 100)))} / 
            {' '}{Math.round(((320)+(atk.attack * 120 / 100)))} / 
            {' '}{Math.round(((440)+(atk.attack * 120 / 100)))}
          </p>

          <p className="stat--ad">Post-mitigation: 
            {' '}{Math.round(((200)+(atk.attack * 120 / 100)) * (1 - mod.defPhysRed))} / 
            {' '}{Math.round(((320)+(atk.attack * 120 / 100))* (1 - mod.defPhysRed))} / 
            {' '}{Math.round(((440)+(atk.attack * 120 / 100))* (1 - mod.defPhysRed))}
          </p>
    
          <p>
            Fires an explosive shell that deals <span className="stat--ad">300 / 450 / 600 (+150% AD) physical damage</span>  and knocks Graves back from recoil. The shell explodes upon hitting an enemy champion or reaching the end of its range, dealing <span className="stat--ad">200 / 320 / 440 (+120% AD) physical damage</span> in a cone. <br />

            Enemies damaged by the shell's initial impact do not take damage from the explosive cone.
          </p>
        </div>
    }
  ],

  'Gwen': [
    {
      description:
        <div className="abilityDescription">
          <h4>
          <span className="marker--ability">P</span> THOUSAND CUTS
          </h4>
          <h5 className="stat--ap">On-hit: {Math.round((def.health * (0.01 + (atk.ap * 6 / 1000)))*(1 - mod.defMagRed))}</h5>
          <h5 className="stat--hp">Healing cap: {Math.round(12+18/14*(currentLevel - 1)+ (atk.ap * 0.07))}</h5>

    
          <p>
            Basic attacks on-hit, the center of <b>Snip Snip!</b>, and <b>Needlework</b> deal <span className="stat--ap">bonus magic damage equal to 1% (+ 0.6% per 100 AP) of the target's maximum health.</span> <br />

            Thousand Cuts is modified based on the target: <br />

            Heals Gwen for 70% of the post-mitigation damage dealt against champions, capped at<span className="stat--hp"> 12 - 30 (based on level) <span className="stat--ap">(+ 7% AP)</span></span>. <br />

            Deals a maximum of <abbr title="2 (+3% AP)" className="stat--ap">{Math.round(2 + (atk.ap * 3 / 100))} magic damage</abbr> against monsters.
          </p>
        </div>
    },

    {
      description:
        <div className="abilityDescription">
          <h4>
          <span className="marker--ability">1</span> SNIP SNIP!
          </h4>
    
          <h5>
          Cooldown: 
            {' '}{(6*mod.atkcdr).toFixed(1)} / 
            {' '}{(5*mod.atkcdr).toFixed(1)} / 
            {' '}{(4*mod.atkcdr).toFixed(1)} / 
            {' '}{(3*mod.atkcdr).toFixed(1)} 
          </h5>
            <h5 className="stat--mana">
          Cost: 
            {' '}{40} / 
            {' '}{40} / 
            {' '}{40} / 
            {' '}{40} 
          </h5>

          <h5 className="stat--ap">
           Base Damage:
          </h5>

          <p className="stat--ap">Pre-mitigation: 
            {' '}{Math.round(((12)+(atk.ap * 5 / 100)))} / 
            {' '}{Math.round(((16)+(atk.ap * 5 / 100)))} / 
            {' '}{Math.round(((20)+(atk.ap * 5 / 100)))} / 
            {' '}{Math.round(((24)+(atk.ap * 5 / 100)))}
          </p>

          <p className="stat--ap">Post-mitigation: 
            {' '}{Math.round(((12)+(atk.ap * 5 / 100)) * (1 - mod.defMagRed))} / 
            {' '}{Math.round(((16)+(atk.ap * 5 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.round(((20)+(atk.ap * 5 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.round(((24)+(atk.ap * 5 / 100))* (1 - mod.defMagRed))}          
          </p>

          <h5 className="stat--ap">
            Final snip:
          </h5>

          <p className="stat--ap">Pre-mitigation: 
            {' '}{Math.round(((60)+(atk.ap * 25 / 100)))} / 
            {' '}{Math.round(((80)+(atk.ap * 25 / 100)))} / 
            {' '}{Math.round(((100)+(atk.ap * 25 / 100)))} / 
            {' '}{Math.round(((120)+(atk.ap * 25 / 100)))}
          </p>

          <p className="stat--ap">Post-mitigation: 
            {' '}{Math.round(((60)+(atk.ap * 25 / 100)) * (1 - mod.defMagRed))} / 
            {' '}{Math.round(((80)+(atk.ap * 25 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.round(((100)+(atk.ap * 25 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.round(((120)+(atk.ap * 25 / 100))* (1 - mod.defMagRed))}          
          </p>
    
          <p>
           <b>PASSIVE:</b>  Gains 1 stack per attack hit (up to 4), lasts 6 seconds. <br />
           <b>ACTIVE:</b> Snips her scissors twice, snipping an extra time for each stack consumed. Each snip deals <span className="stat--ap">12 / 16 / 20 / 24 (+5% AP) magic damage</span>  with the final snip dealing <span className="stat--ap">60 / 80 / 100 / 120 (+25% AP) magic damage</span> instead. <br />
           The center of each strike deals <span className="stat--vamp"> true damage</span> instead and applies <b>Thousand Cuts</b>.
          </p>
        </div>
    },

    {
      description:
        <div className="abilityDescription">
          <h4>
          <span className="marker--ability">2</span> HALLOWED MIST
          </h4>
    
          <h5>
          Cooldown: 
            {' '}{(17*mod.atkcdr).toFixed(1)} / 
            {' '}{(16*mod.atkcdr).toFixed(1)} / 
            {' '}{(15*mod.atkcdr).toFixed(1)} / 
            {' '}{(14*mod.atkcdr).toFixed(1)} 
          </h5>
            <h5 className="stat--mana">
          Cost: 
            {' '}{60} / 
            {' '}{60} / 
            {' '}{60} / 
            {' '}{60} 
          </h5>

          <h5 className="stat--armor">
            Bonus Armor and <span className="stat--magres">Magic Resistance</span>:
          </h5>

          <p className="stat--armor">
            {Math.round(((14)+(atk.ap * 2 / 100)))} / 
            {' '}{Math.round(((16)+(atk.ap * 2 / 100)))} / 
            {' '}{Math.round(((18)+(atk.ap * 2 / 100)))} / 
            {' '}{Math.round(((20)+(atk.ap * 2 / 100)))}
          </p>
    
          <p>
          Summons the Hallowed Mist for 4 seconds, making Gwen untargetable to enemies outside the zone while inside. Gwen gains <span className="stat--armor">14 / 16 / 18 / 20 (+2% AP) bonus Armor and <span className="stat--magres">Magic Resist</span></span> inside the mist. <br />

          The Mist will move to Gwen the first time she attempts to leave.
          </p>
        </div>
    },

    {
      description:
        <div className="abilityDescription">
          <h4>
          <span className="marker--ability">3</span> SKIP N' SLASH
          </h4>
    
          <h5>
          Cooldown: 
            {' '}{(13*mod.atkcdr).toFixed(1)} / 
            {' '}{(12*mod.atkcdr).toFixed(1)} / 
            {' '}{(10*mod.atkcdr).toFixed(1)} / 
            {' '}{(9*mod.atkcdr).toFixed(1)} 
          </h5>
            <h5 className="stat--mana">
          Cost: 
            {' '}{35} / 
            {' '}{35} / 
            {' '}{35} / 
            {' '}{35} 
          </h5>

          <h5 className="stat--ap">
            Damage: 
            {' '}{Math.round(((10)+(atk.ap * 15 / 100)))} /
            {' '}{Math.round(((10)+(atk.ap * 15 / 100)) * (1 - mod.defMagRed))}
          </h5>

          <h5 className="stat--as">Bonus Attack Speed</h5>
          <p className="stat--as">
            {(champ.asBase * 20 / 100).toFixed(3)} /
            {' '} {(champ.asBase * 40 / 100).toFixed(3)} /
            {' '} {(champ.asBase * 60 / 100).toFixed(3)} /
            {' '} {(champ.asBase * 80 / 100).toFixed(3)} /
          </p>

          <p>
           Dashes and enhances her attacks for 4 seconds. Enhanced attacks gain <span className="stat--as">20% / 40% / 60% / 80% Attack Speed</span>, <span className="stat--ap">10 (+15% AP) magic damage</span> on-hit and 100 Range. <br />

          The first enhanced attack to hit a champion or minion refunds 50% of this ability's coodown. 
          </p>
        </div>
    },

    {
      description:
        <div className="abilityDescription">
          <h4>
          <span className="marker--ability">ULT</span> NEEDLEWORK
          </h4>
    
          <h5>
          Cooldown: 
            {' '}{(75*mod.atkcdr).toFixed(1)} / 
            {' '}{(65*mod.atkcdr).toFixed(1)} / 
            {' '}{(55*mod.atkcdr).toFixed(1)}
          </h5>
            <h5 className="stat--mana">
          Cost: 
            {' '}{100} / 
            {' '}{100} / 
            {' '}{100}
          </h5>

          <h5 className="stat--ap">
            First Cast:
          </h5>

          <p className="stat--ap">Pre-mitigation: 
            {' '}{Math.round(((35)+(atk.ap * 8 / 100)))} / 
            {' '}{Math.round(((45)+(atk.ap * 8 / 100)))} / 
            {' '}{Math.round(((60)+(atk.ap * 8 / 100)))}
          </p>

          <p className="stat--ap">Post-mitigation: 
            {' '}{Math.round(((35)+(atk.ap * 8 / 100)) * (1 - mod.defMagRed))} / 
            {' '}{Math.round(((45)+(atk.ap * 8 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.round(((60)+(atk.ap * 8 / 100))* (1 - mod.defMagRed))}
          </p>

          <h5 className="stat--ap">
            Second Cast:
          </h5>

          <p className="stat--ap">Pre-mitigation: 
            {' '}{Math.round(((90)+(atk.ap * 24 / 100)))} / 
            {' '}{Math.round(((135)+(atk.ap * 24 / 100)))} / 
            {' '}{Math.round(((180)+(atk.ap * 24 / 100)))}
          </p>

          <p className="stat--ap">Post-mitigation: 
            {' '}{Math.round(((90)+(atk.ap * 24 / 100)) * (1 - mod.defMagRed))} / 
            {' '}{Math.round(((135)+(atk.ap * 24 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.round(((180)+(atk.ap * 24 / 100))* (1 - mod.defMagRed))}
          </p>

          <h5 className="stat--ap">
            Third Cast:
          </h5>

          <p className="stat--ap">Pre-mitigation: 
            {' '}{Math.round(((150)+(atk.ap * 40 / 100)))} / 
            {' '}{Math.round(((225)+(atk.ap * 40 / 100)))} / 
            {' '}{Math.round(((300)+(atk.ap * 40 / 100)))}
          </p>

          <p className="stat--ap">Post-mitigation: 
            {' '}{Math.round(((150)+(atk.ap * 40 / 100)) * (1 - mod.defMagRed))} / 
            {' '}{Math.round(((225)+(atk.ap * 40 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.round(((300)+(atk.ap * 40 / 100))* (1 - mod.defMagRed))}
          </p>
    
          <p>
          <b>First Cast:</b> Hurl a needle that deals <span className="stat--ap">30 / 45 / 60 (+8% AP) magic damage</span>, slows by <span className="stat--moveSpeed">30% / 35% / 40% for 1.5 seconds</span>, and applies <b>Thousand Cuts</b>  to all enemies hit. Needlework can be re-cast 2 additional times. <br />

          <b>Second Cast:</b> Fires 3 needles, dealing a total of <span className="stat--ap">90 / 135 / 180 (+24% AP) magic damage</span>. <br />

          <b>Third Cast:</b> Fires 5 needles, dealing a total of <span className="stat--ap">150 / 225 / 300 (+40% AP) magic damage</span>.
          </p>
        </div>
    }
  ]
}

const chosenAbilities = abilities[champ.name] || [];

  return (
    <div className="abilitiesWrap">
    <button onClick={toggleGrid}>Show/Hide Abilities,</button>
    {abilityGrid && <div className="abilitiesGrid">       
      {chosenAbilities.map((ability, index) => (
        <div className="abilitiesTile">
          <div key={index}>{ability.description}</div>
          </div>
      ))}      
    </div>}
    </div>
  )
}