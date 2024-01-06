import{j as a}from"./index-e0eb6c18.js";function o({currentLevel:i,mod:s,bonus:e,atk:t,def:r,champ:h}){const d=[{description:a.jsxs("div",{className:"abilityDescription",children:[a.jsxs("h4",{children:[a.jsx("span",{className:"marker--ability",children:"P"})," UNSEEN THREAT"]}),a.jsxs("p",{children:["Kha'zix enhances his next autoattack against enemy champions to deal bonus ",a.jsxs("abbr",{title:"10 + 8 per level + 50% bonus AD; pre-/post-mitigation damage",className:"stat--ap",children:[Math.round(10+8*i+e.attack*50/100)," (",Math.round((10+8*i+e.attack*50/100)*(1-s.defMagRed)),") Magic Damage"]})," and slow them by ",a.jsx("span",{className:"stat--moveSpeed",children:"25%"})," for 2 seconds."]}),a.jsx("p",{children:"Unseen Threat is refreshed when the enemy team loses sight of Kha'Zix. Isolation radius 300 units, internal cooldown 5 seconds."})]})},{description:a.jsxs("div",{className:"abilityDescription",children:[a.jsxs("h4",{children:[a.jsx("span",{className:"marker--ability",children:"1"})," TASTE THEIR FEAR"]}),a.jsxs("h5",{children:["Cooldown:"," ",(5*s.atkcdr).toFixed(1)," /"," ",(4.5*s.atkcdr).toFixed(1)," /"," ",(4*s.atkcdr).toFixed(1)," /"," ",(3.5*s.atkcdr).toFixed(1)]}),a.jsxs("h5",{className:"stat--mana",children:["Cost:"," ",20," /"," ",20," /"," ",20," /"," ",20]}),a.jsx("h5",{className:"stat--ad",children:"Damage:"}),a.jsxs("p",{className:"stat--ad",children:["Pre-mitigation:"," ",Math.round(55+e.attack*130/100)," /"," ",Math.round(90+e.attack*130/100)," /"," ",Math.round(125+e.attack*130/100)," /"," ",Math.round(160+e.attack*130/100)]}),a.jsxs("p",{className:"stat--ad",children:["Post-mitigation:"," ",Math.round((55+e.attack*130/100)*(1-s.defPhysRed))," /"," ",Math.round((90+e.attack*130/100)*(1-s.defPhysRed))," /"," ",Math.round((125+e.attack*130/100)*(1-s.defPhysRed))," /"," ",Math.round((160+e.attack*130/100)*(1-s.defPhysRed))]}),a.jsxs("p",{children:["Slashes with his claws, dealing ",a.jsx("span",{className:"stat--ad ",children:"55 / 90 / 125 / 160 (+130% bonus AD) physical damage"}),". If the target is ",a.jsx("b",{children:"isolated"}),", damage is increased by ",a.jsx("span",{className:"stat--critChance",children:"100%"}),"."]}),a.jsxs("p",{children:[a.jsx("b",{children:"Evolve:"})," Attacks and Taste Their Fear gain 50 range and 30% of Taste Their Fear's cooldown is refunded against isolated target."]})]})},{description:a.jsxs("div",{className:"abilityDescription",children:[a.jsxs("h4",{children:[a.jsx("span",{className:"marker--ability",children:"2"})," VOID SPIKE"]}),a.jsxs("h5",{children:["Cooldown:"," ",(9*s.atkcdr).toFixed(1)," /"," ",(9*s.atkcdr).toFixed(1)," /"," ",(9*s.atkcdr).toFixed(1)," /"," ",(9*s.atkcdr).toFixed(1)]}),a.jsxs("h5",{className:"stat--mana",children:["Cost:"," ",55," /"," ",60," /"," ",65," /"," ",70]}),a.jsx("h5",{className:"stat--ad",children:"Damage:"}),a.jsxs("p",{className:"stat--ad",children:["Pre-mitigation:"," ",Math.round(80+e.attack*100/100)," /"," ",Math.round(120+e.attack*100/100)," /"," ",Math.round(160+e.attack*100/100)," /"," ",Math.round(200+e.attack*100/100)]}),a.jsxs("p",{className:"stat--ad",children:["Post-mitigation:"," ",Math.round((80+e.attack*100/100)*(1-s.defPhysRed))," /"," ",Math.round((120+e.attack*100/100)*(1-s.defPhysRed))," /"," ",Math.round((160+e.attack*100/100)*(1-s.defPhysRed))," /"," ",Math.round((200+e.attack*100/100)*(1-s.defPhysRed))]}),a.jsx("h5",{className:"stat--hp",children:"Healing:"}),a.jsxs("p",{className:"stat--hp",children:[Math.round(40+t.ap*50/100)," /"," ",Math.round(75+t.ap*50/100)," /"," ",Math.round(110+t.ap*50/100)," /"," ",Math.round(145+t.ap*50/100)]}),a.jsxs("p",{children:["Fires spikes that deal ",a.jsx("span",{className:"stat--ad",children:"80 / 120 / 160 / 200 (+100% bonus AD) physical damage"}),"."]}),a.jsxs("p",{children:["HEals himself for ",a.jsxs("span",{className:"stat--hp",children:["40 / 75 / 110 / 145 (",a.jsx("span",{className:"stat--ap",children:"+50% AP"}),") health"]})," if he is within explosion"]}),a.jsxs("p",{children:[a.jsx("b",{children:"EVOLVE:"})," Fires two additional spikes and slows enemies by ",a.jsx("span",{className:"stat--moveSpeed",children:"60%"})," for 2 seconds."]})]})},{description:a.jsxs("div",{className:"abilityDescription",children:[a.jsxs("h4",{children:[a.jsx("span",{className:"marker--ability",children:"3"})," LEAP"]}),a.jsxs("h5",{children:["Cooldown:"," ",(18*s.atkcdr).toFixed(1)," /"," ",(16*s.atkcdr).toFixed(1)," /"," ",(14*s.atkcdr).toFixed(1)," /"," ",(12*s.atkcdr).toFixed(1)]}),a.jsxs("h5",{className:"stat--mana",children:["Cost:"," ",50," /"," ",50," /"," ",50," /"," ",50]}),a.jsx("h5",{className:"stat--ad",children:"Damage:"}),a.jsxs("p",{className:"stat--ad",children:["Pre-mitigation:"," ",Math.round(65+e.attack*20/100)," /"," ",Math.round(110+e.attack*20/100)," /"," ",Math.round(155+e.attack*20/100)," /"," ",Math.round(200+e.attack*20/100)]}),a.jsxs("p",{className:"stat--ad",children:["Post-mitigation:"," ",Math.round((65+e.attack*20/100)*(1-s.defPhysRed))," /"," ",Math.round((110+e.attack*20/100)*(1-s.defPhysRed))," /"," ",Math.round((155+e.attack*20/100)*(1-s.defPhysRed))," /"," ",Math.round((200+e.attack*20/100)*(1-s.defPhysRed))]}),a.jsxs("p",{children:["Leaps to target area, dealing ",a.jsx("span",{className:"stat--ad",children:"65 / 110 / 155 / 200 + (20% bonus AD) physical damage"}),"."]}),a.jsxs("p",{children:[a.jsx("b",{children:"Evolve:"})," Gain 250 range on Leap. Leap's cooldown is reset on champion takedowns."]})]})},{description:a.jsxs("div",{className:"abilityDescription",children:[a.jsxs("h4",{children:[a.jsx("span",{className:"marker--ability",children:"ULT"})," VOID ASSAULT"]}),a.jsxs("h5",{children:["Cooldown:"," ",(70*s.atkcdr).toFixed(1)," /"," ",(60*s.atkcdr).toFixed(1)," /"," ",(50*s.atkcdr).toFixed(1)]}),a.jsxs("h5",{className:"stat--mana",children:["Cost:"," ",100," /"," ",100," /"," ",100]}),a.jsxs("p",{children:[a.jsx("b",{children:"Passive:"})," Each rank in Void Assault allows Kha'Zix to evolve one of his abilities."]}),a.jsxs("p",{children:[a.jsx("b",{children:"Active:"})," Becomes Invisible and gain ",a.jsxs("abbr",{title:"40%",className:"stat--moveSpeed",children:[Math.round(t.moveSpeed*40/100)," Movement Speed"]}),"  for 1.25 seconds. Void Assault can be cast again within 10 seconds."]}),a.jsxs("p",{children:[a.jsx("b",{children:"Evolve:"})," Invisibility duration is increased to 2 seconds and can be cast up to three times."]})]})}];return a.jsx(a.Fragment,{children:d.map((c,n)=>a.jsx("div",{className:"abilitiesTile",children:a.jsx("div",{children:c.description},n)}))})}export{o as default};