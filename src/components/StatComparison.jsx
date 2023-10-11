import React, { useMemo } from 'react';
import { useStats } from './StatsContext';

export default function StatComparison({atkname, defname}) {

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
      return ((1 - (100/(100 + (postMitigationArmor))))*100 + (champ.bootsPassive === 'Steelcaps' ? 10 : 0));
    };

    const magicalDamageReduction = (postMitigationMres, champ) => {
      return ((1 - (100/(100 + (postMitigationMres))))*100 + (champ.bootsPassive === 'Mercury' ? 12 : 0) + (champ.fonEffect ? 25 : 0));
    };

    const physicalReductionAttacker = physicalDamageReduction(postMitigationArmorAttacker, atk);
    const physicalReductionDefender = physicalDamageReduction(postMitigationArmorDefender, def);

    const magicalReductionAttacker = magicalDamageReduction(postMitigationMresAttacker, atk);
    const magicalReductionDefender = magicalDamageReduction(postMitigationMresDefender, def);

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
            <th colSpan={4}>
              Stats comparison table
            </th>
          </thead>
          <tbody>
          <tr>
              <td colSpan={2}>{atkname} Stats</td>
              <td colSpan={2}>{defname} Stats</td>
            </tr>

          <tr>
              <th colSpan={4}>Effective (Post-mitigation):</th>
            </tr>
            <tr>
              <td>AD:</td>
              <td className="stat--ad">{Math.ceil(atk.attack * (100 - formula.defenderPhysReduction)/ 100)}</td>
              <td>AD:</td>
              <td className="stat--ad">{Math.ceil(def.attack * (100 - formula.attackerPhysReduction)/ 100)}</td>
            </tr>
            <tr>
              <td>AP:</td>
              <td className='stat--ap'>{Math.ceil(atk.ap * (100 - formula.defenderMagReduction)/ 100)}</td>
              <td>AP:</td>
              <td className='stat--ap'>{Math.ceil(def.ap * (100 - formula.attackerMagReduction)/ 100)}</td>
            </tr>

            <tr>
              <td>DPS</td>
              <td className="stat--ad">{Number(formula.attackerDps).toFixed(2)}</td>
              <td>DPS</td>
              <td className="stat--ad">{Number(formula.defenderDps).toFixed(2)}</td>
            </tr>

            <tr>
              <th colSpan={4}>Critical Strike</th>
            </tr>

            <tr>
              <td>AD:</td>
              <td className="stat--critChance">{Number(Math.floor(formula.attackerCriticalStrike))}</td>
              <td>AD:</td>
              <td className="stat--critChance">{Number(Math.floor(formula.defenderCriticalStrike))}</td>
            </tr>
            <tr>
              <td>DPS</td>
              <td className="stat--critChance">{(formula.attackerCritDps).toFixed(2)}</td>
              <td>DPS</td>
              <td className="stat--critChance">{(formula.defenderCritDps).toFixed(2)}</td>
            </tr>

            <tr>
              <th colSpan={4}>
                Post-mitigation <span className='stat--armor'>Physical</span> / <span className='stat--magres'>Magical</span> Damage Reduction
              </th>              
            </tr>
            

            <tr>
              <td className='stat--armor'>{Math.floor(formula.attackerPhysReduction)}%</td>
              <td className='stat--magres'>{Math.floor(formula.attackerMagReduction)}%</td>
              <td className='stat--armor'>{Math.floor(formula.defenderPhysReduction)}%</td>
              <td className='stat--magres'>{Math.floor(formula.defenderMagReduction)}%</td>
            </tr>    
          </tbody>
        </table>
      </div>
    )

}