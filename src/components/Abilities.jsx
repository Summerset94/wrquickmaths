import { useStats } from "./StatsContext";
import React, { useMemo, useState, useEffect } from "react";

export default function Abilities({champ, currentLevel, index, bonus, updateAbilitiesBonus}) {

  const { totalStats } = useStats();  

const atk = totalStats[index === 1 ? 0 : 1];
const def = totalStats[index === 1 ? 1 : 0];

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

  

  const physicalDamageReduction = (postMitigationArmor, champ) => {
    return ((1 - (100/(100 + (postMitigationArmor))))*100*(1 + (champ.bootsPassive === 'Steelcaps' ? 0.1 : 0)));
  };

  const magicalDamageReduction = (postMitigationMres, champ) => {
    return ((1 - (100/(100 + (postMitigationMres))))*100*(1 + (champ.bootsPassive === 'Mercury' ? 12 : 0) + (champ.fonEffect ? 25 : 0)));
  };

  const postMitigationArmorAttacker = postMitigationArmor(atk ,def);
  const postMitigationArmorDefender = postMitigationArmor(def, atk);

  const postMitigationMresAttacker = postMitigationMres(atk ,def);
  const postMitigationMresDefender = postMitigationMres(def ,atk);

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

const [importedComponent, setImportedComponent] = useState(null);

useEffect(() => {
  const importComponent = async () => {
    const module = await import(`./abilities/${champ.id}.jsx`);
    const AnotherComponent = module.default;
    setImportedComponent(<AnotherComponent 
      currentLevel={currentLevel}
      mod={mod}
      bonus={bonus}
      atk={atk}
      def={def}
      champ={champ}
      updateAbilitiesBonus={updateAbilitiesBonus} />);
  };

  importComponent();
}, [champ.id, atk, def, currentLevel, bonus]);



  return (
  <div className="abilitiesWrap">
    <div className="abilitiesGrid">
      {importedComponent && importedComponent}
    </div>      
    </div>
  )
}