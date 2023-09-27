
export default function AttackerTile(props) {
  const champion = props.champ

  return (
    <div className='champTile'>
      <div className='visitCard'>
        <img src={champion.icon} alt="Champion Icon" className='champIcon'/>
        <div className='nameTile'>
        <p className="champName">{champion.name}</p>
        <p className='champTitle'>{champion.title}</p>
        </div>
        <div className="roleTile">
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
              <td>{champion.healthBase}</td>
              <td>{champion.healthScale}</td>
            </tr>

            {!champion.manaBase ? (<tr>
              <td>Mana</td>
              <td colSpan={2}>Manaless(TBD)</td>
            </tr>) :
              (
                <tr>
                <td>Mana</td>
                <td>{champion.healthBase}</td>
                <td>{champion.healthScale}</td>
                </tr>
              )}

            <tr>
              <td>Armor</td>
              <td>{champion.armorBase}</td>
              <td>{champion.armorScale}</td>
            </tr>

            <tr>
              <td>Mag Res</td>
              <td>{champion.magresBase}</td>
              <td>{champion.magresScale}</td>
            </tr>

            <tr>
              <td>AD</td>
              <td>{champion.attackBase}</td>
              <td>{champion.attackScale}</td>
            </tr>

            <tr>
              <td>AP</td>
              <td colSpan={2}><sub>*Base AP = 0 and don't scale</sub></td>
            </tr>

            <tr>
              <td>Attack speed</td>
              <td>{champion.asBase}</td>
              <td>{Number(champion.asScale).toFixed(3)}</td>
            </tr>
              

          </tbody>
        </table>
      </div>
    </div>
    )
  
}