import AttackerTile from "./AttackerTile";
import React, {useState, useMemo, useEffect} from "react";
import StatComparison from "./StatComparison";


export default function MainInfo(props) {
  const attack = props.attack;
  const defence = props.defence;

  function goBack() {
    props.resetButtonClick()
  }

   return(
    <>
    <button onClick={goBack} className='returnButton'>Back to Champion Select</button>

    <AttackerTile 
      champ={attack}
      index={0}          
    />

    <AttackerTile 
      champ={defence}
      index={1} 
    />

    <StatComparison />
    </>
  )
}