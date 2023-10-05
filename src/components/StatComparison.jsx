import React, { useMemo } from 'react';
import { useStats } from './StatsContext';

export default function StatComparison(props) {

  const { totalStats } = useStats();

  const atk = totalStats[0];
  const def = totalStats[1];

  const formula = useMemo(() => {

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
       
        mitigatedMres = ((target.magres - attacker.magResReduction) * Math.floor(1 - attacker.magPen) - attacker.flatMagPen);
       
        return Math.floor(Math.max(mitigatedMres, 0))

      } else {
        mitigatedMres = (target.magres * Math.floor(1 - attacker.magPen) - attacker.flatMagPen)

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

    const dpsAttacker = dps(physicalReductionDefender, atk);
    const dpsDefender = dps(physicalReductionAttacker, def);

    const critAttack = (targetPhysDamageReduction, attacker) => {
      return (attacker.critDamage * (1 - targetPhysDamageReduction/100))
    };

    const critAttAttacker = critAttack(physicalReductionDefender, atk);
    const critAttDefender = critAttack(physicalReductionAttacker, def);

  return {
    attackerArmor: postMitigationArmorAttacker,
    attackerMres: postMitigationMresAttacker,
    attackerPhysReduction: physicalReductionAttacker,
    attackerMagReduction: magicalReductionAttacker,
    attackerDps: dpsAttacker,
    attackerCriticalStrike: critAttAttacker,
    attackerCritDps: (dpsAttacker * atk.critMultiplier),


    defenderArmor: postMitigationArmorDefender,
    defenderMres: postMitigationMresDefender,
    defenderPhysReduction: physicalReductionDefender,
    defenderMagReduction: magicalReductionDefender,
    defenderDps: dpsDefender,
    defenderCriticalStrike: critAttDefender,
    defenderCritDps: (dpsDefender * def.critMultiplier)

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
              <td>{Number(formula.attackerDps).toFixed(2)}</td>
              <td>Enemy dps</td>
              <td>{Number(formula.defenderDps).toFixed(2)}</td>
            </tr>

            <tr>
              <td>Critical Strike damage, dps</td>
            </tr>
            <tr>
              <td>{Number(Math.floor(formula.attackerCriticalStrike))}</td>
              <td>{(formula.attackerCritDps).toFixed(2)}</td>
              <td>{Number(Math.floor(formula.defenderCriticalStrike))}</td>
              <td>{(formula.defenderCritDps).toFixed(2)}</td>
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
              <td className='stat--armor'>{Math.floor(formula.attackerArmor)}</td>
              <td className='stat--magres'>{Math.floor(formula.attackerMres)}</td>
              <td className='stat--armor'>{Math.floor(formula.defenderArmor)}</td>
              <td className='stat--magres'>{Math.floor(formula.defenderMres)}</td>
            </tr>


          </tbody>
        </table>
      </div>
    )

}