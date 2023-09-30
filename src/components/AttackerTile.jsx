import { useEffect, useState, useMemo } from "react";
import StatsCalculator from "./StatsCalculator";

export default function AttackerTile(props) {
  const champion = props.champ
  const index = props.index
 
// visibility button
  const [isBaseInfoVisible, setIsBaseInfoVisible] = useState(true);
  const toggleBaseInfoVisibility = () => {
    setIsBaseInfoVisible(prevState => !prevState);
  };

//passing total stats up. Fuck modularity it's took me too much time to implement this shit.  


  return (
    <div className='champTile'>
      
      <button onClick={toggleBaseInfoVisibility}>
        Show / hide champion info
      </button>
      
      { isBaseInfoVisible && (<div className='baseInfo'>
      <div className='defaultsTile'>
      <div className='visitCard'>
        <img src={champion.icon} alt="Champion Icon" className='champIcon'/>
        <div className='nameTile'>
        <h2 className="champName">{champion.name}</h2>
        <p className='champTitle'>{champion.title}</p>
        </div>
        <div className="roleTile">
          <h3>Position:</h3>
          <p>{champion.rolePrim}</p>
          {champion.roleSecond && <p>{champion.roleSecond}</p>}
        </div>        
      </div>
      
      <div className='baseStats'>
        <table>
          <thead>
            <tr>
              <th>
                Base stats
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Stat</td>
              <td>Base</td>
              <td>Scaling</td>
            </tr>

            <tr>
              <td>Health</td>
              <td className='stat--hp'>{champion.healthBase}</td>
              <td className='stat--hp'>{champion.healthScale}</td>
            </tr>

            {!champion.manaBase ? (<tr>
              <td>Mana</td>
              <td colSpan={2}>Manaless(TBD)</td>
            </tr>) :
              (
                <tr>
                <td>Mana</td>
                <td className='stat--mana'>{champion.healthBase}</td>
                <td className='stat--mana'>{champion.healthScale}</td>
                </tr>
              )}

            <tr>
              <td>Armor</td>
              <td className='stat--armor'>{champion.armorBase}</td>
              <td className='stat--armor'>{champion.armorScale}</td>
            </tr>

            <tr>
              <td>Mag Res</td>
              <td className='stat--magres'>{champion.magresBase}</td>
              <td className='stat--magres'>{champion.magresScale}</td>
            </tr>

            <tr>
              <td>AD</td>
              <td className='stat--ad'>{champion.attackBase}</td>
              <td className='stat--ad'>{champion.attackScale}</td>
            </tr>

            <tr>
              <td>AP</td>
              <td colSpan={2} className='stat--ap'><sub>*Base AP = 0 and don't scale</sub></td>
            </tr>

            <tr>
              <td>Attack speed</td>
              <td className='stat--as'>{champion.asBase}</td>
              <td className='stat--as'>{Number(champion.asScale).toFixed(3)}</td>
            </tr>
              

          </tbody>
        </table>
      </div>
      </div>

      <StatsCalculator 
        champion={champion}
        index={index}  
      />
      </div>
      )}
      
      
    </div>
    )
  
}