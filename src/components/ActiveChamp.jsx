import '../styles/ActiveChamp.css'
import { useState } from "react";
import champions from "./Champions";
import Stats from './Stats';

export default function ActiveChampion(props) {

  const champion = props.champion

  function goBack() {
    props.onChampClick(false)
  }
  
  return (
    <>
    <button onClick={goBack} className='backButton'>Back to list</button>

    <div className='championTile'>
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
    </div>

    < Stats champion={champion} />

    <button onClick={goBack} className='backButton'>Back to list</button>
    </>
  )
}