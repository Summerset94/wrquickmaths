import React, { useMemo } from 'react';
import { useStats } from './StatsContext';

export default function StatComparison(props) {

  const { totalStats } = useStats();

  const atk = totalStats[0];
  const def = totalStats[1];

  const formula = useMemo(() => {

    //attacker 


    const postMitigationArmor = (target, attacker) => {
      let mitigatedArmor = 0
      if (attacker.armorReduction && (target.armor - attacker.armorReduction <= 0)) {
        return Math.floor(target.armor - attacker.armorReduction)
      } else if (attacker.armorReduction) { 
       
        mitigatedArmor = ((target.armor - attacker.armorReduction) * Math.floor(1 - attacker.armPen) - attacker.flatArmPen);
       
        return Math.floor(Math.max(mitigatedArmor, 0))

      } else {
        mitigatedArmor = (target.armor * Math.floor(1 - attacker.armPen) - attacker.flatArmPen)

        return Math.floor(Math.max(mitigatedArmor, 0))
      }
    };

    const postMitigationMres = (target, attacker) => {
      let mitigatedMres = 0
      if (attacker.magResReduction && (target.magres - attacker.magResReduction <= 0)) {
        return Math.floor(target.magres - attacker.magResReduction)
      } else if (attacker.magResReduction) { 
       
        mitigatedMres = ((target.magres - attacker.magResReduction) * Math.floor(1 - attacker.armPen) - attacker.flatMagPen);
       
        return Math.floor(Math.max(mitigatedMres, 0))

      } else {
        mitigatedMres = (target.magres * Math.floor(1 - attacker.armPen) - attacker.flatMagPen)

        return Math.floor(Math.max(mitigatedMres, 0))
      }
    };

    const postMitigationArmorAttacker = postMitigationArmor(atk ,def);
    const postMitigationArmorDefender = postMitigationArmor(def, atk);

    const postMitigationMresAttacker = postMitigationMres(atk ,def);
    const postMitigationMresDefender = postMitigationMres(def ,atk);

    const physicalDamageReduction = (postMitigationArmor) => {
      return ((1 - (100/(100 + (postMitigationArmor))))*100);
    };

    const magicalDamageReduction = (postMitigationMres) => {
      return ((1 - (100/(100 + (postMitigationMres))))*100);
    };

    const physicalReductionAttacker = physicalDamageReduction(postMitigationArmorAttacker);
    const physicalReductionDefender = physicalDamageReduction(postMitigationArmorDefender);

    const magicalReductionAttacker = magicalDamageReduction(postMitigationMresAttacker);
    const magicalReductionDefender = magicalDamageReduction(postMitigationMresDefender);

    const dps = (targetPhysDamageReduction, attacker) => {
      return (attacker.dps * (1 - (targetPhysDamageReduction/100)).toFixed(2))
    };

    const dpsAttacker = dps(physicalReductionDefender, atk)
    const dpsDefender = dps(physicalReductionAttacker, def)

  return {
    attackerArmor: postMitigationArmorAttacker,
    attackerMres: postMitigationMresAttacker,
    attackerPhysReduction: physicalReductionAttacker,
    attackerMagReduction: magicalReductionAttacker,
    attackerDps: dpsAttacker,


    defenderArmor: postMitigationArmorDefender,
    defenderMres: postMitigationMresDefender,
    defenderPhysReduction: physicalReductionDefender,
    defenderMagReduction: magicalReductionDefender,
    defenderDps: dpsDefender


  }


  },
  [atk, def]);
    return (      
      <div className='comparisonTile'>
        <table>
          <thead>
            <th>
              Stats comparison table
            </th>
          </thead>
          <tbody>
            <tr>
              <td>Your dps</td>
              <td>{formula.attackerDps}</td>
              <td>Enemy dps</td>
              <td>{formula.defenderDps}</td>
            </tr>

            <tr>
              <th colSpan={4}>Post-mitigation <span className='stat--armor'>Armor</span> / <span className='stat--magres'>Mres</span>
              </th>              
            </tr>
            <tr>
              <td colSpan={2}>Your Stats</td>
              <td colSpan={2}>Enemy Stats</td>
            </tr>

            <tr>
              <td className='stat--armor'>{formula.attackerArmor}</td>
              <td className='stat--magres'>{formula.attackerMres}</td>
              <td className='stat--armor'>{formula.defenderArmor}</td>
              <td className='stat--magres'>{formula.defenderMres}</td>
            </tr>
          </tbody>
        </table>
      </div>
    )

}