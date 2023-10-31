import{r as n,j as a}from"./index-2f9a7f7a.js";function N({currentLevel:j,mod:e,bonus:m,atk:s,def:g,champ:u,updateAbilitiesBonus:c}){const[i,d]=n.useState(0);n.useEffect(()=>{c({veigarP:i})},[i]);const[r,l]=n.useState(""),h=t=>{l(t.target.value)},o=()=>{const t=parseInt(r);isNaN(t)||d(t)},p=[{description:a.jsxs("div",{className:"abilityDescription",children:[a.jsxs("h4",{children:[a.jsx("span",{className:"marker--ability",children:"P"})," PHENOMENAL EVIL POWER"]}),a.jsxs("div",{children:[a.jsxs("label",{children:["Set your ",a.jsx("span",{className:"stat--armor",children:"Stacks"})," number:"," ",a.jsx("input",{type:"number",value:r,onChange:h})]}),a.jsxs("p",{children:[a.jsx("button",{onClick:o,children:"Update Stacks"})," Current bonus ",a.jsx("span",{className:"stat--ap",children:"Ability Power"}),": ",i," "]})]}),a.jsx("p",{children:"Hitting an Enemy Champion with a spell grants Veigar 1 stack of Phenomenal Evil. Killing minions or monsters with a spell grants Veigar 1 stack of Phenomenal Evil. Champion takedowns grant Veigar 5 stacks of Phenomenal Evil."}),a.jsxs("p",{children:["Each stack of Phenomenal Evil grants ",a.jsx("span",{className:"stat--ap",children:"1 Ability Power"}),"."]})]})},{description:a.jsxs("div",{className:"abilityDescription",children:[a.jsxs("h4",{children:[a.jsx("span",{className:"marker--ability",children:"1"})," BALEFUL STRIKE"]}),a.jsxs("h5",{children:["Cooldown:"," ",(5.5*e.atkcdr).toFixed(1)," /"," ",(5*e.atkcdr).toFixed(1)," /"," ",(4.5*e.atkcdr).toFixed(1)," /"," ",(4*e.atkcdr).toFixed(1)]}),a.jsxs("h5",{className:"stat--mana",children:["Cost:"," ",35," /"," ",40," /"," ",45," /"," ",50]}),a.jsx("h5",{className:"stat--ap",children:"Damage:"}),a.jsxs("p",{className:"stat--ap",children:["Pre-mitigation:"," ",Math.round(65+s.ap*50/100)," /"," ",Math.round(125+s.ap*55/100)," /"," ",Math.round(185+s.ap*60/100)," /"," ",Math.round(245+s.ap*65/100)]}),a.jsxs("p",{className:"stat--ap",children:["Post-mitigation:"," ",Math.round((65+s.ap*50/100)*(1-e.defMagRed))," /"," ",Math.round((125+s.ap*55/100)*(1-e.defMagRed))," /"," ",Math.round((185+s.ap*60/100)*(1-e.defMagRed))," /"," ",Math.round((245+s.ap*65/100)*(1-e.defMagRed))]}),a.jsx("br",{}),a.jsxs("p",{children:["Veigar unleashes a bolt of dark energy, dealing ",a.jsx("span",{className:"stat--ap",children:"65 / 125 / 185 / 245 (+50 / 55 / 60 / 65% AP) magic damage"})," to the first two enemies hit."]})]})},{description:a.jsxs("div",{className:"abilityDescription",children:[a.jsxs("h4",{children:[a.jsx("span",{className:"marker--ability",children:"2"})," DARK MATTER"]}),a.jsxs("h5",{children:["Cooldown:"," ",(8*e.atkcdr).toFixed(1)]}),a.jsxs("h5",{className:"stat--mana",children:["Cost:"," ",75," /"," ",80," /"," ",85," /"," ",90]}),a.jsx("h5",{className:"stat--ap",children:"Damage:"}),a.jsxs("p",{className:"stat--ap",children:["Pre-mitigation:"," ",Math.round(100+s.ap*90/100)," /"," ",Math.round(160+s.ap*90/100)," /"," ",Math.round(220+s.ap*90/100)," /"," ",Math.round(280+s.ap*90/100)]}),a.jsxs("p",{className:"stat--ap",children:["Post-mitigation:"," ",Math.round((100+s.ap*90/100)*(1-e.defMagRed))," /"," ",Math.round((160+s.ap*90/100)*(1-e.defMagRed))," /"," ",Math.round((220+s.ap*90/100)*(1-e.defMagRed))," /"," ",Math.round((280+s.ap*90/100)*(1-e.defMagRed))]}),a.jsx("br",{}),a.jsxs("p",{children:["Veigar summons dark matter from the sky, dealing ",a.jsx("span",{className:"stat--ap",children:"100 / 160 / 220 / 280 (+90% AP) magic damage"})]}),a.jsx("p",{children:"Every 50 stacks of Phenomenal Evil reduce this ability's cooldown by 10%."})]})},{description:a.jsxs("div",{className:"abilityDescription",children:[a.jsxs("h4",{children:[a.jsx("span",{className:"marker--ability",children:"3"})," EVENT HORIZON"]}),a.jsxs("h5",{children:["Cooldown:"," ",(18*e.atkcdr).toFixed(1)," /"," ",(17*e.atkcdr).toFixed(1)," /"," ",(16*e.atkcdr).toFixed(1)," /"," ",(15*e.atkcdr).toFixed(1)]}),a.jsxs("h5",{className:"stat--mana",children:["Cost:"," ",75," /"," ",80," /"," ",85," /"," ",90]}),a.jsx("br",{}),a.jsxs("p",{children:["Veigar creates a cage that stuns enemies that pass through for ",a.jsx("b",{children:"1.75 / 2 / 2.25 / 2.5 seconds"}),". The cage lasts for 3 seconds."]}),a.jsx("p",{children:"Veigar's auto casts will prioritize targets stunned by Event Horizon."})]})},{description:a.jsxs("div",{className:"abilityDescription",children:[a.jsxs("h4",{children:[a.jsx("span",{className:"marker--ability",children:"ULT"})," PRIMORDIAL BURST"]}),a.jsxs("h5",{children:["Cooldown:"," ",(60*e.atkcdr).toFixed(1)," /"," ",(55*e.atkcdr).toFixed(1)," /"," ",(50*e.atkcdr).toFixed(1)]}),a.jsxs("h5",{className:"stat--mana",children:["Cost:"," ",100]}),a.jsx("h5",{className:"stat--ap",children:"Damage:"}),a.jsxs("p",{className:"stat--ap",children:["Pre-mitigation:"," ",Math.round(185+s.ap*75/100)," -"," ",Math.round((185+s.ap*75/100)*2)," /"," ",Math.round(250+s.ap*75/100)," -"," ",Math.round((250+s.ap*75/100)*2)," /"," ",Math.round(315+s.ap*75/100)," -"," ",Math.round((315+s.ap*75/100)*2)]}),a.jsxs("p",{className:"stat--ap",children:["Post-mitigation:"," ",Math.round((185+s.ap*75/100)*(1-e.defMagRed))," -"," ",Math.round((185+s.ap*75/100)*(1-e.defMagRed)*2)," /"," ",Math.round((250+s.ap*75/100)*(1-e.defMagRed))," -"," ",Math.round((250+s.ap*75/100)*(1-e.defMagRed)*2)," /"," ",Math.round((315+s.ap*75/100)*(1-e.defMagRed))," -"," ",Math.round((315+s.ap*75/100)*(1-e.defMagRed)*2)]}),a.jsx("br",{}),a.jsxs("p",{children:["Veigar blasts an Enemy Champion with primal magic to deal ",a.jsx("span",{className:"stat--ap",children:"185 / 250 / 315 (+75% AP) magic damage"})," to them, increased by 0% - 100% based on the target's missing health."]}),a.jsxs("p",{children:["Deals max damage to enemies below ",a.jsx("span",{className:"stat--hp",children:"35% health"}),"."]})]})}];return a.jsx(a.Fragment,{children:p.map((t,x)=>a.jsx("div",{className:"abilitiesTile",children:a.jsx("div",{children:t.description},x)}))})}export{N as default};
