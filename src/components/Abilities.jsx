import { useStats } from "./StatsContext";
import { useMemo, useState } from "react";

export default function Abilities({champ, currentLevel, index}) {

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