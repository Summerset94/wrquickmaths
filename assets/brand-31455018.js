import{j as a}from"./index-8dfca7b9.js";function h({currentLevel:r,mod:s,bonus:l,atk:e,def:t}){const i=[{description:a.jsxs("div",{className:"abilityDescription",children:[a.jsxs("h4",{children:[a.jsx("span",{className:"marker--ability",children:"P"})," BLAZE"]}),a.jsxs("p",{children:["Brand abilities set enemies Ablaze dealing ",a.jsxs("span",{className:"stat--ap",children:["3% (",Math.round(t.health*3/100*(1-s.defMagRed)),")"]})," of their max health as magic damage over 4 seconds. ",a.jsx("br",{}),"Stacking Ablaze 3 times on champions and large monsters causes them to detonate after 2 seconds dealing ",a.jsx("span",{className:"stat--ap",children:"10% (+0.02% AP)"})," of ",a.jsx("b",{children:"each enemy"})," max Health as ",a.jsx("span",{className:"stat--ap",children:"Magic damage"}),". (current target: ",a.jsx("span",{className:"stat--ap",children:Math.round(t.health*((10+e.ap*.02)/100)*(1-s.defMagRed))})," damage ) ",a.jsx("br",{}),"Enemies that detonate cannot be set Ablaze again for 4 seconds."]})]})},{description:a.jsxs("div",{className:"abilityDescription",children:[a.jsxs("h4",{children:[a.jsx("span",{className:"marker--ability",children:"1"})," SEAR"]}),a.jsxs("h5",{children:["Cooldown:"," ",(7.5*s.atkcdr).toFixed(1)," /"," ",(7*s.atkcdr).toFixed(1)," /"," ",(6.5*s.atkcdr).toFixed(1)," /"," ",(6*s.atkcdr).toFixed(1)]}),a.jsxs("h5",{className:"stat--mana",children:["Cost:"," ",50," /"," ",50," /"," ",50," /"," ",50]}),a.jsx("h5",{className:"stat--ap",children:"Damage:"}),a.jsxs("p",{className:"stat--ad",children:["Pre-mitigation:"," ",Math.round(80+e.ap*55/100)," /"," ",Math.round(120+e.ap*55/100)," /"," ",Math.round(160+e.ap*55/100)," /"," ",Math.round(200+e.ap*55/100)]}),a.jsxs("p",{className:"stat--ad",children:["Post-mitigation:"," ",Math.round((80+e.ap*55/100)*(1-s.defMagRed))," /"," ",Math.round((120+e.ap*55/100)*(1-s.defMagRed))," /"," ",Math.round((160+e.ap*55/100)*(1-s.defMagRed))," /"," ",Math.round((200+e.ap*55/100)*(1-s.defMagRed))]}),a.jsxs("p",{children:["Launch a fireball forward that deals ",a.jsx("span",{className:"stat--ap",children:"80 / 120 / 160 / 200 (+55%) magic damage"})," to the first enemy i hits. If the target is ",a.jsx("b",{children:"ablaze"}),", stun them for 1.75 seconds."]})]})},{description:a.jsxs("div",{className:"abilityDescription",children:[a.jsxs("h4",{children:[a.jsx("span",{className:"marker--ability",children:"2"})," PILLAR OF FLAME"]}),a.jsxs("h5",{children:["Cooldown:"," ",(9.5*s.atkcdr).toFixed(1)," /"," ",(9*s.atkcdr).toFixed(1)," /"," ",(8.5*s.atkcdr).toFixed(1)," /"," ",(8*s.atkcdr).toFixed(1)]}),a.jsxs("h5",{className:"stat--mana",children:["Cost:"," ",75," /"," ",85," /"," ",95," /"," ",105]}),a.jsx("h5",{className:"stat--ap",children:"Damage:"}),a.jsxs("p",{className:"stat--ad",children:["Pre-mitigation:"," ",Math.round(70+e.ap*55/100)," /"," ",Math.round(125+e.ap*55/100)," /"," ",Math.round(180+e.ap*55/100)," /"," ",Math.round(235+e.ap*55/100)]}),a.jsxs("p",{className:"stat--ad",children:["Post-mitigation:"," ",Math.round((70+e.ap*55/100)*(1-s.defMagRed))," /"," ",Math.round((125+e.ap*55/100)*(1-s.defMagRed))," /"," ",Math.round((180+e.ap*55/100)*(1-s.defMagRed))," /"," ",Math.round((235+e.ap*55/100)*(1-s.defMagRed))]}),a.jsx("h5",{className:"stat--critChance",children:"Ablazed damage:"}),a.jsxs("p",{className:"stat--ad",children:["Pre-mitigation:"," ",Math.round((70+e.ap*55/100)*1.3)," /"," ",Math.round((125+e.ap*55/100)*1.3)," /"," ",Math.round((180+e.ap*55/100)*1.3)," /"," ",Math.round((235+e.ap*55/100)*1.3)]}),a.jsxs("p",{className:"stat--ad",children:["Post-mitigation:"," ",Math.round((70+e.ap*55/100)*1.3*(1-s.defMagRed))," /"," ",Math.round((125+e.ap*55/100)*1.3*(1-s.defMagRed))," /"," ",Math.round((180+e.ap*55/100)*1.3*(1-s.defMagRed))," /"," ",Math.round((235+e.ap*55/100)*1.3*(1-s.defMagRed))]}),a.jsxs("p",{children:["Target an area, after a short delay create a pillar of flame at targeted area that deals ",a.jsx("span",{className:"stat--ap",children:"70 / 125 / 180/ 235 (+55% AP) magic damage"})," to enemies in the area. Units that ablaze take ",a.jsx("b",{children:"30%"})," additional damage."]})]})},{description:a.jsxs("div",{className:"abilityDescription",children:[a.jsxs("h4",{children:[a.jsx("span",{className:"marker--ability",children:"3"})," CONFLAGRATION"]}),a.jsxs("h5",{children:["Cooldown:"," ",(11*s.atkcdr).toFixed(1)," /"," ",(10*s.atkcdr).toFixed(1)," /"," ",(9*s.atkcdr).toFixed(1)," /"," ",(8*s.atkcdr).toFixed(1)]}),a.jsxs("h5",{className:"stat--mana",children:["Cost:"," ",75," /"," ",80," /"," ",85," /"," ",90]}),a.jsx("h5",{className:"stat--ap",children:"Damage:"}),a.jsxs("p",{className:"stat--ad",children:["Pre-mitigation:"," ",Math.round(60+e.ap*50/100)," /"," ",Math.round(90+e.ap*50/100)," /"," ",Math.round(120+e.ap*50/100)," /"," ",Math.round(150+e.ap*50/100)]}),a.jsxs("p",{className:"stat--ad",children:["Post-mitigation:"," ",Math.round((60+e.ap*50/100)*(1-s.defMagRed))," /"," ",Math.round((90+e.ap*50/100)*(1-s.defMagRed))," /"," ",Math.round((120+e.ap*50/100)*(1-s.defMagRed))," /"," ",Math.round((150+e.ap*50/100)*(1-s.defMagRed))]}),a.jsxs("p",{children:["Set the target aflame and spread conflagration to all enemies near initial target, dealing ",a.jsx("span",{className:"stat--ap",children:"60 / 90 / 120 / 150 (+50%AP) magic damage"}),". When initial target is ",a.jsx("b",{children:"ablaze"}),", Conflagration's spread radius doubles."]})]})},{description:a.jsxs("div",{className:"abilityDescription",children:[a.jsxs("h4",{children:[a.jsx("span",{className:"marker--ability",children:"ULT"})," PYROCLASM"]}),a.jsxs("h5",{children:["Cooldown:"," ",(70*s.atkcdr).toFixed(1)," /"," ",(65*s.atkcdr).toFixed(1)," /"," ",(60*s.atkcdr).toFixed(1)]}),a.jsxs("h5",{className:"stat--mana",children:["Cost:"," ",100," /"," ",100," /"," ",100]}),a.jsx("h5",{className:"stat--ap",children:"Bounce damage:"}),a.jsxs("p",{className:"stat--ad",children:["Pre-mitigation:"," ",Math.round(100+e.ap*30/100)," /"," ",Math.round(200+e.ap*30/100)," /"," ",Math.round(300+e.ap*30/100)]}),a.jsxs("p",{className:"stat--ad",children:["Post-mitigation:"," ",Math.round((100+e.ap*30/100)*(1-s.defMagRed))," /"," ",Math.round((200+e.ap*30/100)*(1-s.defMagRed))," /"," ",Math.round((300+e.ap*30/100)*(1-s.defMagRed))]}),a.jsxs("p",{children:["Throw a fireball that bounces up to 5 times between enemies or Brand, each bounce dealing ",a.jsx("span",{className:"stat--ap",children:"100 / 200 / 300 (+30% AP) magic damage"})," ",a.jsx("br",{}),"Puroclasm brielfy slows by ",a.jsx("span",{className:"stat--moveSpeed",children:"30% / 40% / 50%"})," targets that are ",a.jsx("b",{children:"ablaze"}),". Bounces attempt to max stacks on champions."]})]})}];return a.jsx(a.Fragment,{children:i.map((n,d)=>a.jsx("div",{className:"abilitiesTile",children:a.jsx("div",{children:n.description},d)}))})}export{h as default};