import { useStats } from "./StatsContext";
import React, { useMemo, useState } from "react";

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
's'

const AbilitiesGrid = React.lazy(() => import(`./abilities/${champ.id}.jsx`));


  return (
    <div className="abilitiesWrap">
    <button onClick={toggleGrid}>Show/Hide Abilities,</button>
    {abilityGrid && <div className="abilitiesGrid">      
      <React.Suspense fallback={<div>Loading...</div>}>
      <AbilitiesGrid
        currentLevel={currentLevel}
        mod={mod}
        bonus={bonus}
        atk={atk}
        def={def}
        champ={champ}
      />
      </React.Suspense>
    </div>}    
    </div>
  )
}