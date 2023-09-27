import AttackerTile from "./AttackerTile";


export default function MainInfo(props) {
  const attack = props.attack;
  const defence = props.defence;

  function goBack() {
    props.resetButtonClick()
  }

  console.log(attack)

  return(
    <>
    <button onClick={goBack}>Back to Champion Select</button>

    <AttackerTile champ={attack} />
    <AttackerTile champ={defence} />

    </>

        // attacker info
    //defender info
    //true attacker numbers
    //items
    //abilities
  )
}