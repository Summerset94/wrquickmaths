import{j as a}from"./index-90298c99.js";function p({currentLevel:d,mod:s,bonus:t,atk:e,def:r,champ:h}){const n=[{description:a.jsxs("div",{className:"abilityDescription",children:[a.jsxs("h4",{children:[a.jsx("span",{className:"marker--ability",children:"P"})," REIGN OF ANGER"]}),a.jsxs("p",{children:["Casting abilities with ",a.jsx("span",{className:"stat--vamp",children:"50 Fury"}),"  or more consumes that ",a.jsx("span",{className:"stat--vamp",children:"Fury"})," for enhanced effects. Enhanced abilities do not generate any ",a.jsx("span",{className:"stat--vamp",children:"Fury"})]}),a.jsxs("p",{children:["Attacks generate ",a.jsx("span",{className:"stat--vamp",children:"5 Fury"}),". Fury gains are increased by 50% when under ",a.jsx("span",{className:"stat--hp",children:"50% Health"}),". Out of combat, ",a.jsx("span",{className:"stat--vamp",children:"4 Fury"})," dissipates every second."]})]})},{description:a.jsxs("div",{className:"abilityDescription",children:[a.jsxs("h4",{children:[a.jsx("span",{className:"marker--ability",children:"1"})," CULL THE MEEK"]}),a.jsxs("h5",{children:["Cooldown:"," ",(7*s.atkcdr).toFixed(1)]}),a.jsx("h5",{className:"stat--ad",children:"Damage:"}),a.jsxs("p",{className:"stat--ad",children:["Pre-mitigation:"," ",Math.round(80+t.attack*90/100)," /"," ",Math.round(130+t.attack*90/100)," /"," ",Math.round(180+t.attack*90/100)," /"," ",Math.round(230+t.attack*90/100)]}),a.jsxs("p",{className:"stat--ad",children:["Post-mitigation:"," ",Math.round((80+t.attack*90/100)*(1-s.defPhysRed))," /"," ",Math.round((130+t.attack*90/100)*(1-s.defPhysRed))," /"," ",Math.round((180+t.attack*90/100)*(1-s.defPhysRed))," /"," ",Math.round((230+t.attack*90/100)*(1-s.defPhysRed))]}),a.jsx("h5",{className:"stat--critChance",children:"Reign of Anger:"}),a.jsxs("p",{className:"stat--critChance",children:["Pre-mitigation:"," ",Math.round(120+t.attack*135/100)," /"," ",Math.round(195+t.attack*135/100)," /"," ",Math.round(270+t.attack*135/100)," /"," ",Math.round(345+t.attack*135/100)]}),a.jsxs("p",{className:"stat--critChance",children:["Post-mitigation:"," ",Math.round((120+t.attack*135/100)*(1-s.defPhysRed))," /"," ",Math.round((195+t.attack*135/100)*(1-s.defPhysRed))," /"," ",Math.round((270+t.attack*135/100)*(1-s.defPhysRed))," /"," ",Math.round((345+t.attack*135/100)*(1-s.defPhysRed))]}),a.jsxs("p",{children:["Deal ",a.jsx("span",{className:"stat--ad",children:"80 / 130 / 180 / 230 (+90% bonus AD) physical damage"}),"  to nearby enemies, generating ",a.jsx("span",{className:"stat--vamp",children:"5 Fury"})," and ",a.jsx("span",{className:"stat--hp",children:"healing 7/9/11/13"})," ",a.jsx("abbr",{className:"stat--ad",title:"10% bonus AD"})," per enemy unit."]}),a.jsxs("p",{children:[a.jsx("b",{children:"Reign of Anger:"})," Damage increases to",a.jsx("span",{className:"stat--ad",children:"120 / 195 / 270 / 345 (+135 bonus AD)"})," and healing is increased by 200% (12 / 18 / 24 / 30 ",a.jsxs("abbr",{className:"stat--ad",title:"24% bonus AD",children:["(+",Math.round(t.attack*10/100),")"]}),")"]})]})},{description:a.jsxs("div",{className:"abilityDescription",children:[a.jsxs("h4",{children:[a.jsx("span",{className:"marker--ability",children:"2"})," RUTHLESS PREDATOR"]}),a.jsxs("h5",{children:["Cooldown:"," ",(13*s.atkcdr).toFixed(1)," /"," ",(12*s.atkcdr).toFixed(1)," /"," ",(11*s.atkcdr).toFixed(1)," /"," ",(10*s.atkcdr).toFixed(1)]}),a.jsx("h5",{className:"stat--ad",children:"Damage:"}),a.jsxs("p",{className:"stat--ad",children:["Pre-mitigation:"," ",Math.round(20+e.attack*150/100)," /"," ",Math.round(50+e.attack*150/100)," /"," ",Math.round(80+e.attack*150/100)," /"," ",Math.round(110+e.attack*150/100)]}),a.jsxs("p",{className:"stat--ad",children:["Post-mitigation:"," ",Math.round((20+e.attack*150/100)*(1-s.defPhysRed))," /"," ",Math.round((50+e.attack*150/100)*(1-s.defPhysRed))," /"," ",Math.round((80+e.attack*150/100)*(1-s.defPhysRed))," /"," ",Math.round((110+e.attack*150/100)*(1-s.defPhysRed))]}),a.jsx("h5",{className:"stat--critChance",children:"Reign of Anger:"}),a.jsxs("p",{className:"stat--critChance",children:["Pre-mitigation:"," ",Math.round(30+e.attack*225/100)," /"," ",Math.round(75+e.attack*225/100)," /"," ",Math.round(120+e.attack*225/100)," /"," ",Math.round(165+e.attack*225/100)]}),a.jsxs("p",{className:"stat--critChance",children:["Post-mitigation:"," ",Math.round((30+e.attack*225/100)*(1-s.defPhysRed))," /"," ",Math.round((75+e.attack*225/100)*(1-s.defPhysRed))," /"," ",Math.round((120+e.attack*225/100)*(1-s.defPhysRed))," /"," ",Math.round((165+e.attack*225/100)*(1-s.defPhysRed))]}),a.jsxs("p",{children:["Empowers the next attack to strike twice, ",a.jsx("b",{children:"stunning for 0.75 seconds"})," and dealing ",a.jsx("span",{className:"stat--ad",children:"20 / 50 / 80 / 110 (+150 AD) physical damage"}),"."]}),a.jsxs("p",{children:[a.jsx("b",{children:"Reign of Anger:"})," Strikes three times, ",a.jsx("b",{children:"stunning for 1.5 seconds"})," and dealing ",a.jsx("span",{className:"stat--ad",children:"30 / 75 / 120 / 165 (+225% AD) physical damage"})]}),a.jsx("p",{children:a.jsxs("abbr",{title:"This part of description is missing in game",children:["Under the effect of ",a.jsx("b",{children:"Reign of Anger"}),", clear all shields on the target."]})})]})},{description:a.jsxs("div",{className:"abilityDescription",children:[a.jsxs("h4",{children:[a.jsx("span",{className:"marker--ability",children:"3"})," SLICE AND DICE"]}),a.jsxs("h5",{children:["Cooldown:"," ",(15*s.atkcdr).toFixed(1)," /"," ",(14*s.atkcdr).toFixed(1)," /"," ",(13*s.atkcdr).toFixed(1)," /"," ",(12*s.atkcdr).toFixed(1)]}),a.jsx("h5",{className:"stat--ad",children:"Damage:"}),a.jsxs("p",{className:"stat--ad",children:["Pre-mitigation:"," ",Math.round(40+t.attack*90/100)," /"," ",Math.round(80+t.attack*90/100)," /"," ",Math.round(120+t.attack*90/100)," /"," ",Math.round(160+t.attack*90/100)]}),a.jsxs("p",{className:"stat--ad",children:["Post-mitigation:"," ",Math.round((40+t.attack*90/100)*(1-s.defPhysRed))," /"," ",Math.round((80+t.attack*90/100)*(1-s.defPhysRed))," /"," ",Math.round((120+t.attack*90/100)*(1-s.defPhysRed))," /"," ",Math.round((160+t.attack*90/100)*(1-s.defPhysRed))]}),a.jsx("h5",{className:"stat--critChance",children:"Reign of Anger:"}),a.jsxs("p",{className:"stat--critChance",children:["Pre-mitigation:"," ",Math.round(70+t.attack*135/100)," /"," ",Math.round(130+t.attack*135/100)," /"," ",Math.round(190+t.attack*135/100)," /"," ",Math.round(250+t.attack*135/100)]}),a.jsxs("p",{className:"stat--critChance",children:["Post-mitigation:"," ",Math.round((70+t.attack*135/100)*(1-s.defPhysRed))," /"," ",Math.round((130+t.attack*135/100)*(1-s.defPhysRed))," /"," ",Math.round((190+t.attack*135/100)*(1-s.defPhysRed))," /"," ",Math.round((250+t.attack*135/100)*(1-s.defPhysRed))]}),a.jsxs("p",{children:["Dash in a direction, dealing ",a.jsx("span",{className:"stat--ad",children:"40 / 80 / 120 / 160 (+90% bonus AD) physical damage "})," and generating ",a.jsx("span",{className:"stat--vamp",children:" 5 Fury"})," for each enemy passed through. Hitting an enemy grants a second dash to cast within 4 seconds."]}),a.jsxs("p",{children:[a.jsx("b",{children:"Reign of Anger:"})," The second dash now deals ",a.jsx("span",{className:"stat--ad",children:"70 / 130 / 190 / 250 (+135% bonus AD) physical damage"})," and ",a.jsx("span",{className:"stat--ad",children:"shreds armor by 25 / 30 / 35 / 40%"})," for 4 seconds."]})]})},{description:a.jsxs("div",{className:"abilityDescription",children:[a.jsxs("h4",{children:[a.jsx("span",{className:"marker--ability",children:"ULT"})," DOMINUS"]}),a.jsxs("h5",{children:["Cooldown:"," ",(75*s.atkcdr).toFixed(1)]}),a.jsx("h5",{className:"stat--ap",children:"Damage per second:"}),a.jsxs("p",{className:"stat--ap",children:["Pre-mitigation:"," ",Math.round(50+e.ap*20/100)," /"," ",Math.round(100+e.ap*20/100)," /"," ",Math.round(150+e.ap*20/100)]}),a.jsxs("p",{className:"stat--ap",children:["Post-mitigation:"," ",Math.round((50+e.ap*20/100)*(1-s.defMagRed))," /"," ",Math.round((100+e.ap*20/100)*(1-s.defMagRed))," /"," ",Math.round((150+e.ap*20/100)*(1-s.defMagRed))]}),a.jsxs("p",{children:["Gain ",a.jsx("span",{className:"stat--vamp",children:"20 Fury"})," and ",a.jsx("span",{className:"stat--hp",children:"250 / 500 / 750 Health"})," for 12 seconds. Every second after casting, gain ",a.jsx("span",{className:"stat--vamp",children:"5 Fury"})," and deal ",a.jsx("span",{className:"stat--ap",children:"50 / 100 / 150 (+20% AP) magic damage"})," to nearby enemies."]})]})}];return a.jsx(a.Fragment,{children:n.map((i,c)=>a.jsx("div",{className:"abilitiesTile",children:a.jsx("div",{children:i.description},c)}))})}export{p as default};
