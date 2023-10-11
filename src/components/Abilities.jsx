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
      return Math.floor(target.magres - attacker.magResReduction)
    } else if (attacker.magResReduction) { 
     
      mitigatedMres = ((target.magres - attacker.magResReduction) * (1 - attacker.magPen) - attacker.flatMagPen);
     
      return Math.floor(Math.max(mitigatedMres, 0))

    } else {
      mitigatedMres = (target.magres * (1 - attacker.magPen) - attacker.flatMagPen)

      return Math.floor(Math.max(mitigatedMres, 0))
    }
  };

  const postMitigationArmorAttacker = postMitigationArmor(atk ,def);
  const postMitigationArmorDefender = postMitigationArmor(def, atk);

  const postMitigationMresAttacker = postMitigationMres(atk ,def);
  const postMitigationMresDefender = postMitigationMres(def ,atk);

  const physicalDamageReduction = (postMitigationArmor, champ) => {
    return ((1 - (100/(100 + (postMitigationArmor))))*100 + (champ.bootsPassive === 'Steelcaps' ? 15 : 0));
  };

  const magicalDamageReduction = (postMitigationMres, champ) => {
    return ((1 - (100/(100 + (postMitigationMres))))*100 + (champ.bootsPassive === 'Mercury' ? 15 : 0) + (champ.fonEffect ? 25 : 0));
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
        Enhances his next attack every <abbr title="24 seconds">{(24*mod.atkcdr).toFixed(1)} seconds</abbr> to deal bonus <abbr title="6%, pre/post-mitigation stats" className="stat--ad">{(Math.ceil(def.health * 6 / 100))} / {(Math.ceil((def.health * 6 / 100) * (1 - mod.defPhysRed)))} physical damage</abbr>  and <span className="stat--hp">heals</span>  himself for the same amount. <br />
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
            {' '}{Math.floor(((15)+(atk.attack * 65 / 100)))} / 
            {' '}{Math.floor(((40)+(atk.attack * 70 / 100)))} / 
            {' '}{Math.floor(((65)+(atk.attack * 75 / 100)))} / 
            {' '}{Math.floor(((90)+(atk.attack * 80 / 100)))}
          </p>
          
          <p className="stat--ad">
            Post-mitigation: 
            {' '}{Math.floor(((15)+(atk.attack * 65 / 100)) * (1 - mod.defPhysRed))} / 
            {' '}{Math.floor(((40)+(atk.attack * 70 / 100))* (1 - mod.defPhysRed))} / 
            {' '}{Math.floor(((65)+(atk.attack * 75 / 100))* (1 - mod.defPhysRed))} / 
            {' '}{Math.floor(((90)+(atk.attack * 80 / 100))* (1 - mod.defPhysRed))}
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
            {' '}{Math.floor(((24)+(atk.attack * 40 / 100)))} 
            {' '}/ {Math.floor(((40)+(atk.attack * 40 / 100)))} 
            {' '}/ {Math.floor(((55)+(atk.attack * 40 / 100)))} 
            {' '}/ {Math.floor(((70)+(atk.attack * 40 / 100)))}
          </p>
          
          <p className="stat--ad">
            Post-mitigation: 
            {' '}{Math.floor(((25)+(atk.attack * 40 / 100)) * (1 - mod.defPhysRed))} / 
            {' '}{Math.floor(((40)+(atk.attack * 40 / 100))* (1 - mod.defPhysRed))} / 
            {' '}{Math.floor(((55)+(atk.attack * 40 / 100))* (1 - mod.defPhysRed))} / 
            {' '}{Math.floor(((70)+(atk.attack * 40 / 100))* (1 - mod.defPhysRed))}          
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
          {' '}{Math.floor(((atk.attack * 19 / 100)))} /             
          {' '}{Math.floor(((atk.attack * 21 / 100)))} /     
          {' '}{Math.floor(((atk.attack * 23 / 100)))} / 
          {' '}{Math.floor(((atk.attack * 25 / 100)))}</p>
          
          <p className="stat--vamp">Post-mitigation: 
          {' '}{Math.floor(((atk.attack * 19 / 100)) * (1 - mod.defPhysRed))} / 
          {' '}{Math.floor(((atk.attack * 21 / 100))* (1 - mod.defPhysRed))} / 
          {' '}{Math.floor(((atk.attack * 23 / 100))* (1 - mod.defPhysRed))} / 
          {' '}{Math.floor(((atk.attack * 25 / 100))* (1 - mod.defPhysRed))}          
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
          {' '}{Math.floor(((atk.attack * 19 /100 * 1.5)))} /             
          {' '}{Math.floor(((atk.attack * 21 /100 * 1.5)))} /     
          {' '}{Math.floor(((atk.attack * 23 /100 * 1.5)))} / 
          {' '}{Math.floor(((atk.attack * 25 /100 * 1.5)))}</p>
          
          <p className="stat--vamp">Post-mitigation: 
          {' '}{Math.floor(((atk.attack * 19 /100 * 1.5)) * (1 - mod.defPhysRed))} / 
          {' '}{Math.floor(((atk.attack * 21 /100 * 1.5))* (1 - mod.defPhysRed))} / 
          {' '}{Math.floor(((atk.attack * 23 /100 * 1.5))* (1 - mod.defPhysRed))} / 
          {' '}{Math.floor(((atk.attack * 25 /100 * 1.5))* (1 - mod.defPhysRed))}          
          </p>



          <p>
          Unleashes his demonic form for <b>10</b> seconds, gaining: <abbr className="stat--ad" title='30% / 40% / 50%'>
            {Math.floor(atk.attack * 30 / 100) } / 
            {' '}{Math.floor(atk.attack * 40 / 100) }  / 
            {' '}{Math.floor(atk.attack * 50 / 100) } Attack Damage</abbr>, <span className="stat--hp">25% / 35% / 45% increased healing</span> and <abbr title="60% / 80% / 100%" className="stat--moveSpeed">
              {Math.floor(atk.moveSpeed * 60 / 100)} / 
              {' '}{Math.floor(atk.moveSpeed * 80 / 100)} / 
              {' '}{Math.floor(atk.moveSpeed)} decaying Movement Speed</abbr>. During this time, Umbral Dash's Physical Vamp is increased to <span className="stat--vamp">50%</span>. <br />
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
            {' '}{Math.floor(((40)+(atk.ap * 20 / 100)))}
          </p>

          <p className="stat--hp">On Takedown: 
          {' '}{Math.floor(((80)+(atk.ap * 35 / 100)))} /
          {' '}{Math.floor(((120)+(atk.ap * 35 / 100)))} /
          {' '}{Math.floor(((160)+(atk.ap * 35 / 100)))} / 
          {' '}{Math.floor(((200)+(atk.ap * 35 / 100)))}      
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
            {' '}{Math.floor(((35)+(atk.ap * 35 / 100)))} + {Math.floor(((35)+(atk.ap * 35 / 100)))} / 
            {' '}{Math.floor(((70)+(atk.ap * 35 / 100)))} + {Math.floor(((70)+(atk.ap * 35 / 100)))}  / 
            {' '}{Math.floor(((105)+(atk.ap * 35 / 100)))} + {Math.floor(((105)+(atk.ap * 35 / 100)))}  / 
            {' '}{Math.floor(((140)+(atk.ap * 35 / 100)))} + {Math.floor(((140)+(atk.ap * 35 / 100)))} 
          </p>

          <p className="stat--ad">Post-mitigation: 
            {' '}{Math.floor(((35)+(atk.ap * 35 / 100)) * (1 - mod.defMagRed))} + {Math.floor(((35)+(atk.ap * 35 / 100)))}  / 
            {' '}{Math.floor(((70)+(atk.ap * 35 / 100))* (1 - mod.defMagRed))} + {Math.floor(((70)+(atk.ap * 35 / 100)))}  / 
            {' '}{Math.floor(((105)+(atk.ap * 35 / 100))* (1 - mod.defMagRed))} + {Math.floor(((105)+(atk.ap * 35 / 100)))}  / 
            {' '}{Math.floor(((140)+(atk.ap * 35 / 100))* (1 - mod.defMagRed))} + {Math.floor(((140)+(atk.ap * 35 / 100)))}           
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
            {' '}{Math.floor(((40)+(atk.ap * 30 / 100)))} / 
            {' '}{Math.floor(((75)+(atk.ap * 30 / 100)))} / 
            {' '}{Math.floor(((110)+(atk.ap * 30 / 100)))} / 
            {' '}{Math.floor(((145)+(atk.ap * 30 / 100)))}
          </p>

          <p className="stat--ad">Post-mitigation: 
            {' '}{Math.floor(((40)+(atk.ap * 30 / 100)) * (1 - mod.defMagRed))} / 
            {' '}{Math.floor(((75)+(atk.ap * 30 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.floor(((110)+(atk.ap * 30 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.floor(((145)+(atk.ap * 30 / 100))* (1 - mod.defMagRed))}          
          </p>

          <p>
          <b>ACTIVE:</b> Ahri gains <abbr title="40%">{Math.floor(atk.moveSpeed * 45 / 100)}</abbr> bonus movement speed that decays over 1.5 seconds and summons three flames which orbit her for up to 5 seconds. <br />
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
            {' '}{Math.floor(((60)+(atk.ap * 50 / 100)))} / 
            {' '}{Math.floor(((100)+(atk.ap * 50 / 100)))} / 
            {' '}{Math.floor(((140)+(atk.ap * 50 / 100)))} / 
            {' '}{Math.floor(((180)+(atk.ap * 50 / 100)))}
          </p>

          <p className="stat--ad">Post-mitigation: 
            {' '}{Math.floor(((60)+(atk.ap * 50 / 100)) * (1 - mod.defMagRed))} / 
            {' '}{Math.floor(((100)+(atk.ap * 50 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.floor(((140)+(atk.ap * 50 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.floor(((180)+(atk.ap * 50 / 100))* (1 - mod.defMagRed))}          
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
            {' '}{Math.floor(((60)+(atk.ap * 35 / 100)))} / 
            {' '}{Math.floor(((90)+(atk.ap * 35 / 100)))} / 
            {' '}{Math.floor(((120)+(atk.ap * 35 / 100)))}
          </p>

          <p className="stat--ad">Post-mitigation: 
            {' '}{Math.floor(((60)+(atk.ap * 35 / 100)) * (1 - mod.defMagRed))} / 
            {' '}{Math.floor(((90)+(atk.ap * 35 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.floor(((120)+(atk.ap * 35 / 100))* (1 - mod.defMagRed))}
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
            {' '}{Math.floor(((20 + 8 * currentLevel)+(atk.attack * 60 / 100)+(atk.ap * 50 / 100)))}
          </p>

          <p className="stat--ad">Post-mitigation: 
            {' '}{Math.floor(((20 + 8 * currentLevel)+(atk.attack * 60 / 100)+(atk.ap * 50 / 100)) * (1 - mod.defMagRed))}
          </p>

          <p>
          Dealing spell damage to a champion creates a ring of energy around them for 4 seconds. Exiting that ring empowers Akali's next autoattack to have 100 bonus range and deal <abbr title="20 + 8 * level">28-140</abbr> (<span className="stat--ad">+60% AD</span>,  <span className="stat--ap">+50% AP</span>) <span className="stat--ap"> magic damage</span>. Gain <abbr title="level 1-30 % / 5-40% / 11-50% / 15-60% source for levels: I'VE MADE IT THE F UP!">{Math.floor(atk.moveSpeed * 30 / 100)} / {Math.floor(atk.moveSpeed * 40 / 100)} / {Math.floor(atk.moveSpeed * 50 / 100)} / {Math.floor(atk.moveSpeed * 60 / 100)} Movement Speed</abbr>  while moving toward the ring, crossing the ring Akali gains <abbr title="level 1-30 % / 5-40% / 11-50% / 15-60% source for levels: I'VE MADE IT THE F UP!">{Math.floor(atk.moveSpeed * 30 / 100)} / {Math.floor(atk.moveSpeed * 40 / 100)} / {Math.floor(atk.moveSpeed * 50 / 100)} / {Math.floor(atk.moveSpeed * 60 / 100)} Movement Speed</abbr> while moving toward enemy champions for 2 seconds.
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
            {' '}{Math.floor(((35)+(atk.ap * 60 / 100)+(atk.attack*65/100)))} / 
            {' '}{Math.floor(((70)+(atk.ap * 60 / 100)+(atk.attack*65/100)))} / 
            {' '}{Math.floor(((105)+(atk.ap * 60 / 100)+(atk.attack*65/100)))} / 
            {' '}{Math.floor(((140)+(atk.ap * 60 / 100)+(atk.attack*65/100)))}
          </p>

          <p className="stat--ad">Post-mitigation: 
            {' '}{Math.floor(((35)+(atk.ap * 60 / 100)+(atk.attack*65/100)) * (1 - mod.defMagRed))} / 
            {' '}{Math.floor(((70)+(atk.ap * 60 / 100)+(atk.attack*65/100))* (1 - mod.defMagRed))} / 
            {' '}{Math.floor(((105)+(atk.ap * 60 / 100)+(atk.attack*65/100))* (1 - mod.defMagRed))} / 
            {' '}{Math.floor(((140)+(atk.ap * 60 / 100)+(atk.attack*65/100))* (1 - mod.defMagRed))}          
          </p>

          <p>
            Akali throws five kunais in a cone in the target direction, dealing <span className="stat--ap">35 / 70 / 105 / 140</span> (<span className="stat--ad">+65 AD</span>, <span className="stat--ap">+60 AP</span> ) <span className="stat--ap">Magic Damage</span> to enemies hit, as well as slowing them by <abbr title="50%">{(Math.ceil(def.moveSpeed/2))} Movespeed</abbr> for 0.5 seconds if they were hit at maximum range.
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
            {' '}{Math.floor(atk.moveSpeed *30 /100)} / 
            {' '}{Math.floor(atk.moveSpeed *35 /100)} / 
            {' '}{Math.floor(atk.moveSpeed *40 /100)} / 
            {' '}{Math.floor(atk.moveSpeed *45 /100)} 
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
            {' '}{Math.floor(((30)+(atk.ap * 30 / 100)+(atk.attack*25/100)))} / 
            {' '}{Math.floor(((60)+(atk.ap * 30 / 100)+(atk.attack*25/100)))} / 
            {' '}{Math.floor(((90)+(atk.ap * 30 / 100)+(atk.attack*25/100)))} / 
            {' '}{Math.floor(((120)+(atk.ap * 30 / 100)+(atk.attack*25/100)))} <br />
            Recast:
            {' '}{Math.floor(((70)+(atk.ap * 80 / 100)+(atk.attack*50/100)))} / 
            {' '}{Math.floor(((120)+(atk.ap * 80 / 100)+(atk.attack*50/100)))} / 
            {' '}{Math.floor(((170)+(atk.ap * 80 / 100)+(atk.attack*50/100)))} / 
            {' '}{Math.floor(((220)+(atk.ap * 80 / 100)+(atk.attack*50/100)))}
          </p>

          <p className="stat--ad">Post-mitigation: <br />
          Initial:
            {' '}{Math.floor(((30)+(atk.ap * 30 / 100)+(atk.attack*25/100)) * (1 - mod.defMagRed))} / 
            {' '}{Math.floor(((60)+(atk.ap * 30 / 100)+(atk.attack*25/100))* (1 - mod.defMagRed))} / 
            {' '}{Math.floor(((90)+(atk.ap * 30 / 100)+(atk.attack*25/100))* (1 - mod.defMagRed))} / 
            {' '}{Math.floor(((120)+(atk.ap * 30 / 100)+(atk.attack*25/100))* (1 - mod.defMagRed))} <br />
          Recast:
          {' '}{Math.floor(((70)+(atk.ap * 80 / 100)+(atk.attack*50/100)) * (1 - mod.defMagRed))} / 
            {' '}{Math.floor(((120)+(atk.ap * 80 / 100)+(atk.attack*50/100))* (1 - mod.defMagRed))} / 
            {' '}{Math.floor(((170)+(atk.ap * 80 / 100)+(atk.attack*50/100))* (1 - mod.defMagRed))} / 
            {' '}{Math.floor(((220)+(atk.ap * 80 / 100)+(atk.attack*50/100))* (1 - mod.defMagRed))}
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
            {' '}{Math.floor(((80)+(atk.ap * 30 / 100)+(atk.attack*50/100)))} / 
            {' '}{Math.floor(((200)+(atk.ap * 30 / 100)+(atk.attack*50/100)))} / 
            {' '}{Math.floor(((320)+(atk.ap * 30 / 100)+(atk.attack*50/100)))}<br />
            Recast (minimum damage):
            {' '}{Math.floor(((70)+(atk.ap * 30 / 100)))} / 
            {' '}{Math.floor(((140)+(atk.ap * 30 / 100)))} / 
            {' '}{Math.floor(((210)+(atk.ap * 30 / 100)))}
          </p>

          <p className="stat--ad">Post-mitigation: <br />
          Initial:
            {' '}{Math.floor(((80)+(atk.ap * 30 / 100)+(atk.attack*50/100)) * (1 - mod.defMagRed))} / 
            {' '}{Math.floor(((200)+(atk.ap * 30 / 100)+(atk.attack*50/100))* (1 - mod.defMagRed))} / 
            {' '}{Math.floor(((320)+(atk.ap * 30 / 100)+(atk.attack*50/100))* (1 - mod.defMagRed))}<br />
          Recast (minimum damage):
          {' '}{Math.floor(((70)+(atk.ap * 30 / 100)) * (1 - mod.defMagRed))} / 
            {' '}{Math.floor(((140)+(atk.ap * 30 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.floor(((210)+(atk.ap * 30 / 100))* (1 - mod.defMagRed))}
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
            Every three hits from attacks and abilities deal bonus <abbr title="25-180 based on level" className="stat--ap">{Math.floor(25 + (155/14+(currentLevel - 1)))} Magic Damage</abbr> and gain a shield that absorbs <abbr title="40-300 based on level +40 bonus AD" className="stat--hp">{Math.floor(40+(260/14*(currentLevel - 1))+ (bonus.attack * 40 / 100))} Damage</abbr> for 2 seconds. <br />
            After launching a basic attack. Akshan will fire a second shot that deals <abbr title="50% AD" className="stat--ad">{Math.ceil(atk.attack/2)} Physical Damage</abbr>. He can cancel this shot to gain <abbr title="40-120 based an level">{Math.ceil(40 + (80/14*(currentLevel - 1)))}</abbr> decaying over 1 second.
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
          {' '}{Math.floor(((5)+(atk.attack * 80 / 100)))} / 
          {' '}{Math.floor(((30)+(atk.attack * 80 / 100)))} / 
          {' '}{Math.floor(((55)+(atk.attack * 80 / 100)))} / 
          {' '}{Math.floor(((80)+(atk.attack * 80 / 100)))}
        </p>

        <p className="stat--ad">Post-mitigation: 
          {' '}{Math.floor(((5)+(atk.attack * 80 / 100)) * (1 - mod.defPhysRed))} / 
          {' '}{Math.floor(((30)+(atk.attack * 80 / 100))* (1 - mod.defPhysRed))} / 
          {' '}{Math.floor(((55)+(atk.attack * 80 / 100))* (1 - mod.defPhysRed))} / 
          {' '}{Math.floor(((80)+(atk.attack * 80 / 100))* (1 - mod.defPhysRed))}          
        </p>

          <p>
            Akshan throws a boomerang that deals <span className="stat--ad">5 / 3 / 55 / 80 (+80% AD) Physical Damage</span> to enemies it passes through and revealing them, granting sight of the area along its path, as well as extending its range every time it hits an enemy. If the boomerang hits an enemy champion, Akshan gains bonus <abbr title="40%">{Math.ceil(atk.moveSpeed * 40 / 100)} Movement Speed</abbr> decaying over time. Upon reaching maximum range, the boomerang returns to Akshan, applying the same effects to enemies hit along the way. Avengerang's damage is reduced against non-champions.
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
            Enemies that kill allied champions become Scoundrels for a duration. When Akshan takes down a Scoundrel, he gains bonus gold and revives the allies slain. Active: Become camouflaged for a few seconds and gain bonus <abbr title="80% / 90% / 100% / 110%"> {Math.ceil(atk.moveSpeed * 80 / 100)} / {Math.ceil(atk.moveSpeed * 90 / 100)} / {Math.ceil(atk.moveSpeed * 100 / 100)} / {Math.ceil(atk.moveSpeed * 110 / 100)} Movement Speed</abbr> towards Scoundrels. Always camouflaged when Akshan is near terrain or in brushes. Gain <span className="stat--mana">2% missing mana regen</span> per second when chasing Scoundrels.
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
            {' '}{Math.floor(((30)+(atk.attack * 15 / 100)))} / 
            {' '}{Math.floor(((70)+(atk.attack * 15 / 100)))} / 
            {' '}{Math.floor(((110)+(atk.attack * 15 / 100)))} / 
            {' '}{Math.floor(((150)+(atk.attack * 15 / 100)))}
          </p>

          <p className="stat--ad">Post-mitigation: 
            {' '}{Math.floor(((30)+(atk.attack * 15 / 100)) * (1 - mod.defPhysRed))} / 
            {' '}{Math.floor(((70)+(atk.attack * 15 / 100))* (1 - mod.defPhysRed))} / 
            {' '}{Math.floor(((110)+(atk.attack * 15 / 100))* (1 - mod.defPhysRed))} / 
            {' '}{Math.floor(((150)+(atk.attack * 15 / 100))* (1 - mod.defPhysRed))}          
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
            {' '}{Math.floor(((20)+(atk.attack * 10 / 100)) * 5)} / 
            {' '}{Math.floor(((30)+(atk.attack * 10 / 100)) * 6)} / 
            {' '}{Math.floor(((40)+(atk.attack * 10 / 100)) * 7)}
          </p>

          <p className="stat--ad">Post-mitigation: 
            {' '}{Math.floor((((20)+(atk.attack * 10 / 100))*5) * (1 - mod.defPhysRed))} / 
            {' '}{Math.floor((((30)+(atk.attack * 10 / 100))*6)* (1 - mod.defPhysRed))} / 
            {' '}{Math.floor((((40)+(atk.attack * 10 / 100))*7)* (1 - mod.defPhysRed))}         
          </p>

          <h5 className="stat--ad">
            Maximum Damage:
          </h5>

          <p className="stat--ad">Pre-mitigation: 
            {' '}{Math.floor(((80)+(atk.attack * 40 / 100)) * 5)} / 
            {' '}{Math.floor(((120)+(atk.attack * 40 / 100)) * 6)} / 
            {' '}{Math.floor(((160)+(atk.attack * 40 / 100)) * 7)}
          </p>

          <p className="stat--ad">Post-mitigation: 
            {' '}{Math.floor((((20)+(atk.attack * 40 / 100))*5) * (1 - mod.defPhysRed))} / 
            {' '}{Math.floor((((30)+(atk.attack * 40 / 100))*6)* (1 - mod.defPhysRed))} / 
            {' '}{Math.floor((((40)+(atk.attack * 40 / 100))*7)* (1 - mod.defPhysRed))}         
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
            When Alistar takes damage, he heals himself for <abbr title="27-160 based on level" className="stat--hp">{Math.ceil( (17.5 )+ (9.5 * currentLevel))}</abbr> and nearby allied champions for <abbr title="54-320 based on level" className="stat--hp">{Math.ceil((35) + (19 * currentLevel))}</abbr>. Knocking up or stunning champions with Alistar's abilities reduces the cooldown by 10 seconds.
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
            {' '}{Math.floor(((60)+(atk.ap * 50 / 100)))} / 
            {' '}{Math.floor(((110)+(atk.ap * 50 / 100)))} / 
            {' '}{Math.floor(((160)+(atk.ap * 50 / 100)))} / 
            {' '}{Math.floor(((210)+(atk.ap * 50 / 100)))}
          </p>

          <p className="stat--ad">Post-mitigation: 
            {' '}{Math.floor(((60)+(atk.ap * 50 / 100)) * (1 - mod.defMagRed))} / 
            {' '}{Math.floor(((110)+(atk.ap * 50 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.floor(((160)+(atk.ap * 50 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.floor(((210)+(atk.ap * 50 / 100))* (1 - mod.defMagRed))}          
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
            {' '}{Math.floor(((50)+(atk.ap * 60 / 100)))} / 
            {' '}{Math.floor(((120)+(atk.ap * 60 / 100)))} / 
            {' '}{Math.floor(((190)+(atk.ap * 60 / 100)))} / 
            {' '}{Math.floor(((260)+(atk.ap * 60 / 100)))}
          </p>

          <p className="stat--ad">Post-mitigation: 
            {' '}{Math.floor(((50)+(atk.ap * 60 / 100)) * (1 - mod.defMagRed))} / 
            {' '}{Math.floor(((120)+(atk.ap * 60 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.floor(((190)+(atk.ap * 60 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.floor(((260)+(atk.ap * 60 / 100))* (1 - mod.defMagRed))}          
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
            {' '}{Math.floor(((100)+(atk.ap * 40 / 100)))} / 
            {' '}{Math.floor(((150)+(atk.ap * 40 / 100)))} / 
            {' '}{Math.floor(((200)+(atk.ap * 40 / 100)))} / 
            {' '}{Math.floor(((250)+(atk.ap * 40 / 100)))}
          </p>

          <p className="stat--ad">Post-mitigation: 
            {' '}{Math.floor(((100)+(atk.ap * 40 / 100)) * (1 - mod.defMagRed))} / 
            {' '}{Math.floor(((150)+(atk.ap * 40 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.floor(((200)+(atk.ap * 40 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.floor(((250)+(atk.ap * 40 / 100))* (1 - mod.defMagRed))}          
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
            {' '}{Math.floor(((70)+(atk.ap * 70 / 100)))} / 
            {' '}{Math.floor(((105)+(atk.ap * 70 / 100)))} / 
            {' '}{Math.floor(((140)+(atk.ap * 70 / 100)))} / 
            {' '}{Math.floor(((175)+(atk.ap * 70 / 100)))}
          </p>

          <p className="stat--ad">Post-mitigation: 
            {' '}{Math.floor(((70)+(atk.ap * 70 / 100)) * (1 - mod.defMagRed))} / 
            {' '}{Math.floor(((1005)+(atk.ap * 70 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.floor(((140)+(atk.ap * 70 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.floor(((175)+(atk.ap * 70 / 100))* (1 - mod.defMagRed))}          
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
            {' '}{Math.floor(((15)+(def.health *(1 + (Math.floor(atk.ap * 6 / 1000))) / 100)))} / 
            {' '}{Math.floor(((20)+(def.health *(1.2 + (Math.floor(atk.ap * 6 / 1000))) / 100)))} / 
            {' '}{Math.floor(((25)+(def.health *(1.4 + (Math.floor(atk.ap * 6 / 1000))) / 100)))} / 
            {' '}{Math.floor(((30)+(def.health *(1.6 + (Math.floor(atk.ap * 6 / 1000))) / 100)))}
          </p>

          <p className="stat--ad">Post-mitigation: 
            {' '}{Math.floor(((15)+(def.health * (1 + (Math.floor(atk.ap * 6 / 1000)))/ 100)) * (1 - mod.defMagRed))} / 
            {' '}{Math.floor(((20)+(def.health * (1.2 + (Math.floor(atk.ap * 6 / 1000))) / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.floor(((25)+(def.health * (1.4 + (Math.floor(atk.ap * 6 / 1000))) / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.floor(((30)+(def.health * (1.6 + (Math.floor(atk.ap * 6 / 1000))) / 100))* (1 - mod.defMagRed))}          
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
            {' '}{Math.floor(((4)+(atk.armor * 3 / 100)+(atk.magres * 3 / 100)))} / 
            {' '}{Math.floor(((6)+(atk.armor * 3 / 100)+(atk.magres * 3 / 100)))} / 
            {' '}{Math.floor(((8)+(atk.armor * 3 / 100)+(atk.magres * 3 / 100)))} / 
            {' '}{Math.floor(((10)+(atk.armor * 3 / 100)+(atk.magres * 3 / 100)))}
          </p>

          <h5 className="stat--ap">
            Damage:
          </h5>

          <p className="stat--ad">Pre-mitigation: 
            {' '}{Math.floor(((90)+(atk.ap * 50 / 100)))} / 
            {' '}{Math.floor(((120)+(atk.ap * 50 / 100)))} / 
            {' '}{Math.floor(((150)+(atk.ap * 50 / 100)))} / 
            {' '}{Math.floor(((180)+(atk.ap * 50 / 100)))}
          </p>

          <p className="stat--ad">Post-mitigation: 
            {' '}{Math.floor(((90)+(atk.ap * 50 / 100)) * (1 - mod.defMagRed))} / 
            {' '}{Math.floor(((120)+(atk.ap * 50 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.floor(((150)+(atk.ap * 50 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.floor(((180)+(atk.ap * 50 / 100))* (1 - mod.defMagRed))}          
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
            {' '}{Math.floor(((150)+(atk.ap * 80 / 100)))} / 
            {' '}{Math.floor(((250)+(atk.ap * 80 / 100)))} / 
            {' '}{Math.floor(((350)+(atk.ap * 80 / 100)))}
          </p>

          <p className="stat--ad">Post-mitigation: 
            {' '}{Math.floor(((150)+(atk.ap * 80 / 100)) * (1 - mod.defMagRed))} / 
            {' '}{Math.floor(((250)+(atk.ap * 80 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.floor(((350)+(atk.ap * 80 / 100))* (1 - mod.defMagRed))}
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
            {' '}{Math.floor(((80)+(atk.ap * 80 / 100)))} / 
            {' '}{Math.floor(((125)+(atk.ap * 80 / 100)))} / 
            {' '}{Math.floor(((170)+(atk.ap * 80 / 100)))} / 
            {' '}{Math.floor(((215)+(atk.ap * 80 / 100)))}
          </p>

          <p className="stat--ad">Post-mitigation: 
            {' '}{Math.floor(((80)+(atk.ap * 80 / 100)) * (1 - mod.defMagRed))} / 
            {' '}{Math.floor(((125)+(atk.ap * 80 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.floor(((170)+(atk.ap * 80 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.floor(((215)+(atk.ap * 80 / 100))* (1 - mod.defMagRed))}          
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
            {' '}{Math.floor(((70)+(atk.ap * 70 / 100)))} / 
            {' '}{Math.floor(((130)+(atk.ap * 70 / 100)))} / 
            {' '}{Math.floor(((190)+(atk.ap * 70 / 100)))} / 
            {' '}{Math.floor(((250)+(atk.ap * 70 / 100)))}
          </p>

          <p className="stat--ad">Post-mitigation: 
            {' '}{Math.floor(((70)+(atk.ap * 70 / 100)) * (1 - mod.defMagRed))} / 
            {' '}{Math.floor(((130)+(atk.ap * 70 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.floor(((190)+(atk.ap * 70 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.floor(((250)+(atk.ap * 70 / 100))* (1 - mod.defMagRed))}          
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
            {' '}{Math.floor(((50)+(atk.ap * 40 / 100)))} / 
            {' '}{Math.floor(((100)+(atk.ap * 40 / 100)))} / 
            {' '}{Math.floor(((150)+(atk.ap * 40 / 100)))} / 
            {' '}{Math.floor(((200)+(atk.ap * 40 / 100)))}
          </p>
    
          <p>
            Annie covers herself and <b>Tibbers</b> with shield, absorbing <span className="stat--hp">absorbing 50 / 100 / 150 / 200 <span className="stat--ap">(+40% AP)</span>  damage</span> for 3 seconds. Also both of them gain <abbr title="20% / 25% / 30% / 35%" className="stat--moveSpeed">{Math.ceil(atk.moveSpeed * 20 / 100)} / {Math.ceil(atk.moveSpeed * 25 / 100)} / {Math.ceil(atk.moveSpeed * 30 / 100)} / {Math.ceil(atk.moveSpeed * 35 / 100)} movement speed</abbr>. Speed bonus decays over 3 seconds.
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
            {' '}{Math.floor(((130)+(atk.ap * 60 / 100)))} / 
            {' '}{Math.floor(((230)+(atk.ap * 60 / 100)))} / 
            {' '}{Math.floor(((330)+(atk.ap * 60 / 100)))}
          </p>

          <p className="stat--ad">Post-mitigation: 
            {' '}{Math.floor(((130)+(atk.ap * 60 / 100)) * (1 - mod.defMagRed))} / 
            {' '}{Math.floor(((230)+(atk.ap * 60 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.floor(((330)+(atk.ap * 60 / 100))* (1 - mod.defMagRed))}        
          </p>

          <h5 className="stat--ap">
          Pounce damage:
          </h5>

          <p className="stat--ad">Pre-mitigation: 
            {' '}{Math.floor(((110)+(atk.ap * 30 / 100)))} / 
            {' '}{Math.floor(((150)+(atk.ap * 30 / 100)))} / 
            {' '}{Math.floor(((190)+(atk.ap * 30 / 100)))}
          </p>

          <p className="stat--ad">Post-mitigation: 
            {' '}{Math.floor(((110)+(atk.ap * 30 / 100)) * (1 - mod.defMagRed))} / 
            {' '}{Math.floor(((150)+(atk.ap * 30 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.floor(((190)+(atk.ap * 30 / 100))* (1 - mod.defMagRed))}       
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
            {' '}{Math.floor(((atk.attack + atk.attack *(0.1 + atk.critChance))))}
            
          </p>

          <p className="stat--ad">Post-mitigation: 
            {' '}{Math.floor(((atk.attack + atk.attack *(0.1 + atk.critChance))) * (1 - mod.defPhysRed))}
          </p> 
          
    
          <p>
          Ashe's attacks slow targets hit by <span className="stat--moveSpeed">15% / 17.5% / 20% / 22.5% / 25%</span>  for 2 seconds, causing her to deal increased <span className="stat--ad">10% (+100% Crit) bonus damage</span>  to these targets. Ashe's critical strikes deal no bonus damage but apply a <abbr title="40%-60% based on level" className="stat--moveSpeed">{Math.floor(40+(20/14*(currentLevel - 1)))}% slow</abbr> to the target.
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
            {' '}{Math.floor(((atk.attack * 115 / 100)))} / 
            {' '}{Math.floor(((atk.attack * 120 / 100)))} / 
            {' '}{Math.floor(((atk.attack * 125 / 100)))} / 
            {' '}{Math.floor(((atk.attack * 130 / 100)))}
          </p>

          <p className="stat--ad">Post-mitigation: 
            {' '}{Math.floor(((atk.attack * 115 / 100)) * (1 - mod.defPhysRed))} / 
            {' '}{Math.floor(((atk.attack * 120 / 100))* (1 - mod.defPhysRed))} / 
            {' '}{Math.floor(((atk.attack * 125 / 100))* (1 - mod.defPhysRed))} / 
            {' '}{Math.floor(((atk.attack * 130 / 100))* (1 - mod.defPhysRed))}
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
            {' '}{Math.floor(((20)+(atk.attack * 115 / 100)))} / 
            {' '}{Math.floor(((40)+(atk.attack * 115 / 100)))} / 
            {' '}{Math.floor(((60)+(atk.attack * 115 / 100)))} / 
            {' '}{Math.floor(((80)+(atk.attack * 115 / 100)))}
          </p>

          <p className="stat--ad">Post-mitigation: 
            {' '}{Math.floor(((20)+(atk.attack * 115 / 100)) * (1 - mod.defPhysRed))} / 
            {' '}{Math.floor(((40)+(atk.attack * 115 / 100))* (1 - mod.defPhysRed))} / 
            {' '}{Math.floor(((60)+(atk.attack * 115 / 100))* (1 - mod.defPhysRed))} / 
            {' '}{Math.floor(((80)+(atk.attack * 115 / 100))* (1 - mod.defPhysRed))}          
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
            {' '}{Math.floor(((200)+(atk.ap * 40 / 100)))} / 
            {' '}{Math.floor(((350)+(atk.ap * 40 / 100)))} / 
            {' '}{Math.floor(((500)+(atk.ap * 40 / 100)))}
          </p>

          <p className="stat--ad">Post-mitigation: 
            {' '}{Math.floor(((200)+(atk.ap * 40 / 100)) * (1 - mod.defMagRed))} / 
            {' '}{Math.floor(((350)+(atk.ap * 40 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.floor(((500)+(atk.ap * 40 / 100))* (1 - mod.defMagRed))}      
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
            {' '}{Math.floor(((15)+(atk.ap * 25 / 100)))}
          </p>

          <p className="stat--ad">Post-mitigation: 
            {' '}{Math.floor(((15)+(atk.ap * 25 / 100)) * (1 - mod.defMagRed))}
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
            {' '}{Math.floor(((65)+(atk.ap * 65 / 100)))} / 
            {' '}{Math.floor(((120)+(atk.ap * 65 / 100)))} / 
            {' '}{Math.floor(((175)+(atk.ap * 65 / 100)))} / 
            {' '}{Math.floor(((230)+(atk.ap * 65 / 100)))}
          </p>

          <p className="stat--ad">Post-mitigation: 
            {' '}{Math.floor(((65)+(atk.ap * 65 / 100)) * (1 - mod.defMagRed))} / 
            {' '}{Math.floor(((120)+(atk.ap * 65 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.floor(((175)+(atk.ap * 65 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.floor(((230)+(atk.ap * 65 / 100))* (1 - mod.defMagRed))}          
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
            {' '}{Math.floor(((20)+(atk.ap * 35 / 100)))} / 
            {' '}{Math.floor(((25)+(atk.ap * 35 / 100)))} / 
            {' '}{Math.floor(((30)+(atk.ap * 35 / 100)))} / 
            {' '}{Math.floor(((35)+(atk.ap * 35 / 100)))}
          </p>

          <p className="stat--ad">Post-mitigation: 
            {' '}{Math.floor(((20)+(atk.ap * 35 / 100)) * (1 - mod.defMagRed))} / 
            {' '}{Math.floor(((25)+(atk.ap * 35 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.floor(((30)+(atk.ap * 35 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.floor(((35)+(atk.ap * 35 / 100))* (1 - mod.defMagRed))}          
          </p>
    
          <p>
            Aurelion Sol pushes his stars to the Outer limit for 3 seconds, causing them to orbit faster and deal <span className="stat--ap">20 / 25 / 30 / 35 (+35% AP) magic damage</span>. <br />
            When stars retract, Aurelion Sol gains <abbr title="30%" className="stat--moveSpeed">{Math.ceil(atk.moveSpeed * 30 / 100)} movement speed</abbr> that decays over 2 seconds.
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
            {' '}{Math.floor(((150)+(atk.ap * 70 / 100)))} / 
            {' '}{Math.floor(((250)+(atk.ap * 70 / 100)))} / 
            {' '}{Math.floor(((350)+(atk.ap * 70 / 100)))}
          </p>

          <p className="stat--ad">Post-mitigation: 
            {' '}{Math.floor(((150)+(atk.ap * 70 / 100)) * (1 - mod.defMagRed))} / 
            {' '}{Math.floor(((250)+(atk.ap * 70 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.floor(((350)+(atk.ap * 70 / 100))* (1 - mod.defMagRed))}      
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
            Shield: {Math.ceil(atk.mana * 30 / 100)}
          </h5>
           <p>
            When Blitzcrank receives damage that will put him under  <abbr title="35% maximum health">{Math.ceil(atk.health * 35 / 100)} health</abbr>, he gains a shield equal to <span className="stat--mana">30% maximum mana</span> up to 10 seconds
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
            {' '}{Math.floor(((100)+(atk.ap * 100 / 100)))} / 
            {' '}{Math.floor(((160)+(atk.ap * 100 / 100)))} / 
            {' '}{Math.floor(((220)+(atk.ap * 100 / 100)))} / 
            {' '}{Math.floor(((280)+(atk.ap * 100 / 100)))}
          </p>

          <p className="stat--ad">Post-mitigation: 
            {' '}{Math.floor(((100)+(atk.ap * 100 / 100)) * (1 - mod.defMagRed))} / 
            {' '}{Math.floor(((160)+(atk.ap * 100 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.floor(((220)+(atk.ap * 100 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.floor(((280)+(atk.ap * 100 / 100))* (1 - mod.defMagRed))}          
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
            {' '}{Math.floor(((0)+(atk.attack * 180 / 100)))} / 
            {' '}{Math.floor(((0)+(atk.attack * 200 / 100)))} / 
            {' '}{Math.floor(((0)+(atk.attack * 220 / 100)))} / 
            {' '}{Math.floor(((0)+(atk.attack * 240 / 100)))}
          </p>

          <p className="stat--ad">Post-mitigation: 
            {' '}{Math.floor(((0)+(atk.attack * 180 / 100)) * (1 - mod.defPhysRed))} / 
            {' '}{Math.floor(((0)+(atk.attack * 200 / 100))* (1 - mod.defPhysRed))} / 
            {' '}{Math.floor(((0)+(atk.attack * 220 / 100))* (1 - mod.defPhysRed))} / 
            {' '}{Math.floor(((0)+(atk.attack * 240 / 100))* (1 - mod.defPhysRed))}          
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
            {' '}{Math.floor(((40)+(atk.ap * 15 / 100)))} / 
            {' '}{Math.floor(((80)+(atk.ap * 15 / 100)))} / 
            {' '}{Math.floor(((120)+(atk.ap * 15 / 100)))}
          </p>

          <p className="stat--ad">Post-mitigation: 
            {' '}{Math.floor(((40)+(atk.ap * 15 / 100)) * (1 - mod.defMagRed))} / 
            {' '}{Math.floor(((80)+(atk.ap * 15 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.floor(((120)+(atk.ap * 15 / 100))* (1 - mod.defMagRed))}
          </p>

          <h5 className="stat--ap">
          Cast damage:
          </h5>

          <p className="stat--ad">Pre-mitigation: 
            {' '}{Math.floor(((200)+(atk.ap * 80 / 100)))} / 
            {' '}{Math.floor(((325)+(atk.ap * 80 / 100)))} / 
            {' '}{Math.floor(((450)+(atk.ap * 80 / 100)))}
          </p>

          <p className="stat--ad">Post-mitigation: 
            {' '}{Math.floor(((200)+(atk.ap * 80 / 100)) * (1 - mod.defMagRed))} / 
            {' '}{Math.floor(((325)+(atk.ap * 80 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.floor(((450)+(atk.ap * 80 / 100))* (1 - mod.defMagRed))}
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
           Brand abilities set enemies Ablaze dealing <span className="stat--ap">3% ({Math.ceil(def.health * 3 / 100 * (1 - mod.defMagRed))})</span> of their max health as magic damage over 4 seconds. <br />
           Stacking Ablaze 3 times on champions and large monsters causes them to detonate after 2 seconds dealing <span className="stat--ap">10% (+0.02% AP)</span> of <b>each enemy</b> max Health as <span className="stat--ap">Magic damage</span>. (current target: <span className="stat--ap">{Math.ceil(def.health*((10 / 100)+(atk.ap * 0.02 / 100))* (1 - mod.defMagRed))}</span> damage ) <br />
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
            {' '}{Math.floor(((80)+(atk.ap * 55 / 100)))} / 
            {' '}{Math.floor(((120)+(atk.ap * 55 / 100)))} / 
            {' '}{Math.floor(((160)+(atk.ap * 55 / 100)))} / 
            {' '}{Math.floor(((200)+(atk.ap * 55 / 100)))}
          </p>

          <p className="stat--ad">Post-mitigation: 
            {' '}{Math.floor(((80)+(atk.ap * 55 / 100)) * (1 - mod.defMagRed))} / 
            {' '}{Math.floor(((120)+(atk.ap * 55 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.floor(((160)+(atk.ap * 55 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.floor(((200)+(atk.ap * 55 / 100))* (1 - mod.defMagRed))}          
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
            {' '}{Math.floor(((70)+(atk.ap * 55 / 100)))} / 
            {' '}{Math.floor(((125)+(atk.ap * 55 / 100)))} / 
            {' '}{Math.floor(((180)+(atk.ap * 55 / 100)))} / 
            {' '}{Math.floor(((235)+(atk.ap * 55 / 100)))}
          </p>

          <p className="stat--ad">Post-mitigation: 
            {' '}{Math.floor(((70)+(atk.ap * 55 / 100)) * (1 - mod.defMagRed))} / 
            {' '}{Math.floor(((125)+(atk.ap * 55 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.floor(((180)+(atk.ap * 55 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.floor(((235)+(atk.ap * 55 / 100))* (1 - mod.defMagRed))}          
          </p>

          <h5 className="stat--ap">
           Ablazed damage:
          </h5>

          <p className="stat--ad">Pre-mitigation: 
            {' '}{Math.floor(((70)+(atk.ap * 55 / 100))*1.3)} / 
            {' '}{Math.floor(((125)+(atk.ap * 55 / 100))*1.3)} / 
            {' '}{Math.floor(((180)+(atk.ap * 55 / 100))*1.3)} / 
            {' '}{Math.floor(((235)+(atk.ap * 55 / 100))*1.3)}
          </p>

          <p className="stat--ad">Post-mitigation: 
            {' '}{Math.floor((((70)+(atk.ap * 55 / 100))*1.3) * (1 - mod.defMagRed))} / 
            {' '}{Math.floor((((125)+(atk.ap * 55 / 100))*1.3)* (1 - mod.defMagRed))} / 
            {' '}{Math.floor((((180)+(atk.ap * 55 / 100))*1.3)* (1 - mod.defMagRed))} / 
            {' '}{Math.floor((((235)+(atk.ap * 55 / 100))*1.3)* (1 - mod.defMagRed))}          
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
            {' '}{Math.floor(((60)+(atk.ap * 40 / 100)))} / 
            {' '}{Math.floor(((90)+(atk.ap * 40 / 100)))} / 
            {' '}{Math.floor(((120)+(atk.ap * 40 / 100)))} / 
            {' '}{Math.floor(((150)+(atk.ap * 40 / 100)))}
          </p>

          <p className="stat--ad">Post-mitigation: 
            {' '}{Math.floor(((60)+(atk.ap * 40 / 100)) * (1 - mod.defMagRed))} / 
            {' '}{Math.floor(((90)+(atk.ap * 40 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.floor(((120)+(atk.ap * 40 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.floor(((150)+(atk.ap * 40 / 100))* (1 - mod.defMagRed))}          
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
            {' '}{Math.floor(((100)+(atk.ap * 25 / 100)))} / 
            {' '}{Math.floor(((200)+(atk.ap * 25 / 100)))} / 
            {' '}{Math.floor(((300)+(atk.ap * 25 / 100)))}
          </p>

          <p className="stat--ad">Post-mitigation: 
            {' '}{Math.floor(((100)+(atk.ap * 25 / 100)) * (1 - mod.defMagRed))} / 
            {' '}{Math.floor(((200)+(atk.ap * 25 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.floor(((300)+(atk.ap * 25 / 100))* (1 - mod.defMagRed))}
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
          Braum's basic attacks apply Concussive Blows. Once the first stack is applied, ally basic attacks also stack Concussive Blows. Upon reaching 4 stacks, the target is stunned for 1 second and takes <abbr title="32-200 based on level" className="stat--ap"> {Math.ceil((20+12*currentLevel))} ({Math.ceil((20+12*currentLevel)*(1 - mod.defMagRed))}) magic damage</abbr>. For the next 8 seconds they cannot receive new stacks, but take bonus <abbr title="7-40 based on level" className="stat--ap"> {Math.ceil((7+33/14*(currentLevel - 1)))} ({Math.ceil((7+33/14*(currentLevel - 1))*(1 - mod.defMagRed))})</abbr> magic damage from Braum's attacks.
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
            {' '}{Math.floor(((60)+(atk.health * 3 / 100)))} / 
            {' '}{Math.floor(((120)+(atk.health * 3 / 100)))} / 
            {' '}{Math.floor(((180)+(atk.health * 3 / 100)))} / 
            {' '}{Math.floor(((240)+(atk.health * 3 / 100)))}
          </p>

          <p className="stat--ad">Post-mitigation: 
            {' '}{Math.floor(((60)+(atk.health * 3 / 100)) * (1 - mod.defMagRed))} / 
            {' '}{Math.floor(((120)+(atk.health * 3 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.floor(((180)+(atk.health * 3 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.floor(((240)+(atk.health * 3 / 100))* (1 - mod.defMagRed))}          
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
          {' '}{Math.ceil(10 + (atk.armor * 10 / 100))} /
          {' '}{Math.ceil(15 + (atk.armor * 12 / 100))} /
          {' '}{Math.ceil(20 + (atk.armor * 14 / 100))} /
          {' '}{Math.ceil(25 + (atk.armor * 16 / 100))}
          </p>
          <p className="stat--magres">Magic Resistance:
          {' '}{Math.ceil(10 + (atk.magres * 10 / 100))} /
          {' '}{Math.ceil(15 + (atk.magres * 12 / 100))} /
          {' '}{Math.ceil(20 + (atk.magres * 14 / 100))} /
          {' '}{Math.ceil(25 + (atk.magres * 16 / 100))}
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
            {' '}{Math.floor(((150)+(atk.ap * 60 / 100)))} / 
            {' '}{Math.floor(((250)+(atk.ap * 60 / 100)))} / 
            {' '}{Math.floor(((350)+(atk.ap * 60 / 100)))}
          </p>

          <p className="stat--ad">Post-mitigation: 
            {' '}{Math.floor(((150)+(atk.ap * 60 / 100)) * (1 - mod.defMagRed))} / 
            {' '}{Math.floor(((250)+(atk.ap * 60 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.floor(((350)+(atk.ap * 60 / 100))* (1 - mod.defMagRed))}
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
            After 6 basic attacks (basic attacks from bush counts as 2) the next basic attack deals <abbr title="50% - 100% based on level +125% critical strike chance. Shown pre/post-mitigation number" className="stat--ad">{Math.ceil(atk.attack* (50 + (currentLevel < 12 ? (5 * currentLevel - 1): (50))+ (atk.critChance*125))/100)} ({Math.ceil((atk.attack* (50 + (currentLevel < 12 ? (5 * currentLevel - 1): (50))+ (atk.critChance*125))/100)*(1 - mod.defPhysRed))}) bonus physical damage</abbr>. <b>Trapped</b> or <b>Netted</b> enemies trigger a Headshot that has double range.
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
            {' '}{Math.floor(((60)+(atk.attack * 125 / 100)))} / 
            {' '}{Math.floor(((110)+(atk.attack * 140 / 100)))} / 
            {' '}{Math.floor(((160)+(atk.attack * 155 / 100)))} / 
            {' '}{Math.floor(((210)+(atk.attack * 170 / 100)))}
          </p>

          <p className="stat--ad">Post-mitigation: 
            {' '}{Math.floor(((60)+(atk.attack * 125 / 100)) * (1 - mod.defPhysRed))} / 
            {' '}{Math.floor(((110)+(atk.attack * 140 / 100))* (1 - mod.defPhysRed))} / 
            {' '}{Math.floor(((160)+(atk.attack * 155 / 100))* (1 - mod.defPhysRed))} / 
            {' '}{Math.floor(((210)+(atk.attack * 170 / 100))* (1 - mod.defPhysRed))}          
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
            {' '}{Math.floor(((70)+(atk.ap * 80 / 100)))} / 
            {' '}{Math.floor(((120)+(atk.ap * 80 / 100)))} / 
            {' '}{Math.floor(((170)+(atk.ap * 80 / 100)))} / 
            {' '}{Math.floor(((220)+(atk.ap * 80 / 100)))}
          </p>

          <p className="stat--ad">Post-mitigation: 
            {' '}{Math.floor(((70)+(atk.ap * 80 / 100)) * (1 - mod.defMagRed))} / 
            {' '}{Math.floor(((120)+(atk.ap * 80 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.floor(((170)+(atk.ap * 80 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.floor(((220)+(atk.ap * 80 / 100))* (1 - mod.defMagRed))}          
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
            {' '}{Math.floor(((200)+(atk.attack * 200 / 100)))} / 
            {' '}{Math.floor(((375)+(atk.attack * 200 / 100)))} / 
            {' '}{Math.floor(((550)+(atk.attack * 200 / 100)))}
          </p>

          <p className="stat--ad">Post-mitigation: 
            {' '}{Math.floor(((200)+(atk.attack * 200 / 100)) * (1 - mod.defPhysRed))} / 
            {' '}{Math.floor(((375)+(atk.attack * 200 / 100))* (1 - mod.defPhysRed))} / 
            {' '}{Math.floor(((550)+(atk.attack * 200 / 100))* (1 - mod.defPhysRed))}        
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

          <h3 className="stat--hp">Shield strength: {Math.ceil(atk.health * 20 / 100)}</h3> 
          
    
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
            {' '}{Math.floor(((0)+(atk.attack * 120 / 100)))} / 
            {' '}{Math.floor(((0)+(atk.attack * 130 / 100)))} / 
            {' '}{Math.floor(((0)+(atk.attack * 140 / 100)))} / 
            {' '}{Math.floor(((0)+(atk.attack * 150 / 100)))}
          </p>

          <p className="stat--ad">Post-mitigation: 
            {' '}{Math.floor(((0)+(atk.attack * 120 / 100)) * (1 - mod.defPhysRed))} / 
            {' '}{Math.floor(((0)+(atk.attack * 130 / 100))* (1 - mod.defPhysRed))} / 
            {' '}{Math.floor(((0)+(atk.attack * 140 / 100))* (1 - mod.defPhysRed))} / 
            {' '}{Math.floor(((0)+(atk.attack * 150 / 100))* (1 - mod.defPhysRed))}          
          </p>

          <h5 className="stat--ad">
          Second cast damage:
          </h5>         

          <p className="stat--ad">Post-mitigation: 
            {' '}{Math.floor((((atk.attack * 120 / 100))*0.6) * (1 - mod.defPhysRed) + (((atk.attack * 120 / 100))*0.4))} / 
            {' '}{Math.floor((((atk.attack * 130 / 100))*0.6)* (1 - mod.defPhysRed)+(((atk.attack * 130 / 100))*0.4))} / 
            {' '}{Math.floor((((atk.attack * 140 / 100))*0.6)* (1 - mod.defPhysRed)+(((atk.attack * 140 / 100))*0.4))} / 
            {' '}{Math.floor((((atk.attack * 150 / 100))*0.6)* (1 - mod.defPhysRed)+(((atk.attack * 150 / 100))*0.4))}          
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
            {' '}{Math.floor(((90)+(atk.attack * 110 / 100)+(def.health * 4 / 100)))} / 
            {' '}{Math.floor(((120)+(atk.attack * 110 / 100)+(def.health * 6 / 100)))} / 
            {' '}{Math.floor(((150)+(atk.attack * 110 / 100)+(def.health * 8 / 100)))} / 
            {' '}{Math.floor(((180)+(atk.attack * 110 / 100)+(def.health * 10 / 100)))}
          </p>

          <p className="stat--ad">Post-mitigation: 
            {' '}{Math.floor(((90)+(atk.attack * 110 / 100)+(def.health * 4 / 100)) * (1 - mod.defPhysRed))} / 
            {' '}{Math.floor(((120)+(atk.attack * 110 / 100)+(def.health * 6 / 100))* (1 - mod.defPhysRed))} / 
            {' '}{Math.floor(((150)+(atk.attack * 110 / 100)+(def.health * 8 / 100))* (1 - mod.defPhysRed))} / 
            {' '}{Math.floor(((180)+(atk.attack * 110 / 100)+(def.health * 10 / 100))* (1 - mod.defPhysRed))}          
          </p>

          <h5 className="stat--hp">
            Healing:
          </h5>
          <p className="stat--hp">VS current target: 
            {' '}{Math.floor((((90)+(atk.attack * 110 / 100)+(def.health * 4 / 100)) * (1 - mod.defPhysRed))*0.4)} / 
            {' '}{Math.floor((((120)+(atk.attack * 110 / 100)+(def.health * 6 / 100))* (1 - mod.defPhysRed))*0.4)} / 
            {' '}{Math.floor((((150)+(atk.attack * 110 / 100)+(def.health * 8 / 100))* (1 - mod.defPhysRed))*0.4)} / 
            {' '}{Math.floor((((180)+(atk.attack * 110 / 100)+(def.health * 10 / 100))* (1 - mod.defPhysRed))*0.4)}          
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
            {' '}{(0.667*0.5).toFixed(3)} /
            {' '}{(0.667*0.6).toFixed(3)} /
            {' '}{(0.667*0.7).toFixed(3)} /
            {' '}{(0.667*0.8).toFixed(3)}
          </h5>          

          <h5 className="stat--ad">
            Damage:
          </h5>

          <p className="stat--ad">Pre-mitigation: 
            {' '}{Math.floor(((60)+(atk.attack * 75 / 100)))} / 
            {' '}{Math.floor(((110)+(atk.attack * 75 / 100)))} / 
            {' '}{Math.floor(((160)+(atk.attack * 75 / 100)))} / 
            {' '}{Math.floor(((210)+(atk.attack * 75 / 100)))}
          </p>

          <p className="stat--ad">Post-mitigation: 
            {' '}{Math.floor(((60)+(atk.attack * 75 / 100)) * (1 - mod.defPhysRed))} / 
            {' '}{Math.floor(((110)+(atk.attack * 75 / 100))* (1 - mod.defPhysRed))} / 
            {' '}{Math.floor(((160)+(atk.attack * 75 / 100))* (1 - mod.defPhysRed))} / 
            {' '}{Math.floor(((210)+(atk.attack * 75 / 100))* (1 - mod.defPhysRed))}          
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
            {' '}{Math.floor(((30)+(def.health * 15 / 100)) * (1 - mod.defMagRed))} / 
            {' '}{Math.floor(((30)+(def.health * 20 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.floor(((30)+(def.health * 25 / 100))* (1 - mod.defMagRed))}      
          </p>

          <p className="stat--ad">Current target at 50% HP: 
            {' '}{Math.floor(((30)+((def.health/2) * 15 / 100)) * (1 - mod.defMagRed))} / 
            {' '}{Math.floor(((30)+((def.health/2) * 20 / 100))* (1 - mod.defMagRed))} / 
            {' '}{Math.floor(((30)+((def.health/2) * 25 / 100))* (1 - mod.defMagRed))}      
          </p>
    
          <p>
          Leap to enemy champion, becoming untargetable for 0.75 seconds and dealing <span>30 <span className="stat--hp">(+ 15% / 20% / 25% of target's current Health)</span>  magic damage </span>, knocking away other enemies and creating an inescapable zone for 2 / 2.5 / 3 seconds. Hextech Ultimatum ends when Camille leaves the zone.
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