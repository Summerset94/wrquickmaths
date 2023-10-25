import{j as a}from"./index-99cbdbed.js";function o({currentLevel:r,mod:e,bonus:s,atk:t,def:h,champ:i}){const d=[{description:a.jsxs("div",{className:"abilityDescription",children:[a.jsxs("h4",{children:[a.jsx("span",{className:"marker--ability",children:"P"})," FLURRY"]}),a.jsxs("p",{children:["After casting an ability Lee Sin gains ",a.jsxs("abbr",{title:"40%",className:"stat--as",children:[(i.asBase*40/100).toFixed(3)," Attack Speed"]}),"  for his next 2 attacks within 3 seconds. The first attack restores ",a.jsx("span",{className:"stat--armor",children:"20 energy"}),"  (+10 every 5 levels) and the second restores half of that amount."]})]})},{description:a.jsxs("div",{className:"abilityDescription",children:[a.jsxs("h4",{children:[a.jsx("span",{className:"marker--ability",children:"1"})," SONIC WAVE / RESONATING STRIKE"]}),a.jsxs("h5",{children:["Cooldown:"," ",(9*e.atkcdr).toFixed(1)," /"," ",(8*e.atkcdr).toFixed(1)," /"," ",(7*e.atkcdr).toFixed(1)," /"," ",(6*e.atkcdr).toFixed(1)]}),a.jsxs("h5",{className:"stat--armor",children:["Cost:"," ",50]}),a.jsx("h5",{className:"stat--ad",children:"Sonic Wave damage:"}),a.jsxs("p",{className:"stat--ad",children:["Pre-mitigation:"," ",Math.round(55+s.attack*105/100)," /"," ",Math.round(90+s.attack*105/100)," /"," ",Math.round(125+s.attack*105/100)," /"," ",Math.round(160+s.attack*105/100)]}),a.jsxs("p",{className:"stat--ad",children:["Post-mitigation:"," ",Math.round((55+s.attack*105/100)*(1-e.defPhysRed))," /"," ",Math.round((90+s.attack*105/100)*(1-e.defPhysRed))," /"," ",Math.round((125+s.attack*105/100)*(1-e.defPhysRed))," /"," ",Math.round((160+s.attack*105/100)*(1-e.defPhysRed))]}),a.jsx("h5",{className:"stat--magres",children:"Resonating Strike min damage:"}),a.jsxs("p",{className:"stat--ad",children:["Pre-mitigation:"," ",Math.round(60+s.attack*105/100)," /"," ",Math.round(100+s.attack*105/100)," /"," ",Math.round(140+s.attack*105/100)," /"," ",Math.round(180+s.attack*105/100)]}),a.jsxs("p",{className:"stat--ad",children:["Post-mitigation:"," ",Math.round((60+s.attack*105/100)*(1-e.defPhysRed))," /"," ",Math.round((100+s.attack*105/100)*(1-e.defPhysRed))," /"," ",Math.round((140+s.attack*105/100)*(1-e.defPhysRed))," /"," ",Math.round((180+s.attack*105/100)*(1-e.defPhysRed))]}),a.jsxs("p",{children:[a.jsx("b",{children:"SONIC WAVE: "})," Fires an energy wave that deals ",a.jsx("span",{className:"stat--ad",children:"55 / 90 / 125 / 160 (+105% bonus AD) physical damage"})," to enemies and reveals them. Hitting an enemy allows ",a.jsx("b",{children:"Resonating Strike"})," to be cast within 3 seconds."]}),a.jsx("hr",{}),a.jsxs("p",{children:[a.jsx("b",{children:"RESONATING STRIKE: "})," Dash to enemy marked by Sonic Wave, dealing ",a.jsx("span",{className:"stat--ad",children:"60 / 100 / 140 / 180 (+105% bonus AD)"})," increased up to 100% based on target's missing health."]})]})},{description:a.jsxs("div",{className:"abilityDescription",children:[a.jsxs("h4",{children:[a.jsx("span",{className:"marker--ability",children:"2"})," SAFEGUARD / IRON WILL"]}),a.jsxs("h5",{children:["Cooldown:"," ",(17*e.atkcdr).toFixed(1)," /"," ",(16*e.atkcdr).toFixed(1)," /"," ",(15*e.atkcdr).toFixed(1)," /"," ",(14*e.atkcdr).toFixed(1)]}),a.jsxs("h5",{className:"stat--armor",children:["Cost:"," ",50]}),a.jsx("h5",{className:"stat--hp",children:"Safeguard shield"}),a.jsxs("p",{className:"stat--hp",children:[Math.round(60+t.ap*100/100)," /"," ",Math.round(120+t.ap*100/100)," /"," ",Math.round(180+t.ap*100/100)," /"," ",Math.round(240+t.ap*100/100)]}),a.jsx("h5",{className:"stat--ap",children:"Iron Will damage:"}),a.jsxs("p",{className:"stat--ap",children:["Pre-mitigation:"," ",Math.round(26+t.ap*40/100)," /"," ",Math.round(39+t.ap*40/100)," /"," ",Math.round(52+t.ap*40/100)," /"," ",Math.round(65+t.ap*40/100)]}),a.jsxs("p",{className:"stat--ap",children:["Post-mitigation:"," ",Math.round((26+t.ap*40/100)*(1-e.defMagRed))," /"," ",Math.round((39+t.ap*40/100)*(1-e.defMagRed))," /"," ",Math.round((52+t.ap*40/100)*(1-e.defMagRed))," /"," ",Math.round((65+t.ap*40/100)*(1-e.defMagRed))]}),a.jsxs("p",{children:[a.jsx("b",{children:"SAFEGUARD:"})," Dashes to target location. If an enemy is nearby on arrival, Lee Sin shields himself for ",a.jsxs("span",{className:"stat--hp",children:["60 / 120 / 180 / 240 (",a.jsx("span",{className:"stat--ap",children:"+100% AP"}),")"]})," for 2 seconds. Allows ",a.jsx("b",{children:"Iron Will"})," to be cast within 3 seconds."]}),a.jsxs("p",{children:[a.jsx("b",{children:"Safeguard's"})," cooldown is reduced by 0.5 seconds with each attack."]}),a.jsx("hr",{}),a.jsxs("p",{children:[a.jsx("b",{children:"IRON WILL"}),": Empowers next two attacks to deal an additional ",a.jsxs("span",{className:"stat--hp",children:["26/39/52/65 (",a.jsx("span",{className:"stat--ap",children:"+40% AP"}),") magic damage"]}),"  and gain ",a.jsx("span",{className:"stat--vamp",children:"16% / 24% / 32% / 40% Omnivamp"}),"."]})]})},{description:a.jsxs("div",{className:"abilityDescription",children:[a.jsxs("h4",{children:[a.jsx("span",{className:"marker--ability",children:"3"})," TEMPEST / CRIPPLE"]}),a.jsxs("h5",{children:["Cooldown:"," ",(8*e.atkcdr).toFixed(1)]}),a.jsxs("h5",{className:"stat--armor",children:["Cost:"," ",50]}),a.jsx("h5",{className:"stat--ap",children:"Tempest damage:"}),a.jsxs("p",{className:"stat--ap",children:["Pre-mitigation:"," ",Math.round(90+s.attack*125/100)," /"," ",Math.round(140+s.attack*125/100)," /"," ",Math.round(190+s.attack*125/100)," /"," ",Math.round(240+s.attack*125/100)]}),a.jsxs("p",{className:"stat--ap",children:["Post-mitigation:"," ",Math.round((90+s.attack*125/100)*(1-e.defMagRed))," /"," ",Math.round((140+s.attack*125/100)*(1-e.defMagRed))," /"," ",Math.round((190+s.attack*125/100)*(1-e.defMagRed))," /"," ",Math.round((240+s.attack*125/100)*(1-e.defMagRed))]}),a.jsxs("p",{children:[a.jsx("b",{children:"TEMPEST:"})," deal ",a.jsxs("span",{className:"stat--ap",children:["90 / 140 / 190 / 240 (",a.jsx("span",{className:"stat--ad",children:"+125% bonus AD"}),") magic damage"]})," to nearby enemies and reveals them. Hitting an enemy allows ",a.jsx("b",{children:"Cripple"})," to be cast within 3 seconds."]}),a.jsx("hr",{}),a.jsxs("p",{children:[a.jsx("b",{children:"CRIPPLE:"})," Slows enemies hit by Tempest by ",a.jsx("span",{className:"stat--moveSpeed",children:"30% / 40% / 50% / 60%"}),"  decaying over 4 seconds."]})]})},{description:a.jsxs("div",{className:"abilityDescription",children:[a.jsxs("h4",{children:[a.jsx("span",{className:"marker--ability",children:"ULT"})," DRAGON'S RAGE"]}),a.jsxs("h5",{children:["Cooldown:"," ",(70*e.atkcdr).toFixed(1)," /"," ",(60*e.atkcdr).toFixed(1)," /"," ",(50*e.atkcdr).toFixed(1)]}),a.jsx("h5",{className:"stat--ad",children:"Damage:"}),a.jsxs("p",{className:"stat--ad",children:["Pre-mitigation:"," ",Math.round(200+s.attack*200/100)," /"," ",Math.round(425+s.attack*200/100)," /"," ",Math.round(650+s.attack*200/100)]}),a.jsxs("p",{className:"stat--ad",children:["Post-mitigation:"," ",Math.round((200+s.attack*200/100)*(1-e.defPhysRed))," /"," ",Math.round((425+s.attack*200/100)*(1-e.defPhysRed))," /"," ",Math.round((650+s.attack*200/100)*(1-e.defPhysRed))]}),a.jsx("h5",{className:"stat--ad",children:"Minimal target collide damage:"}),a.jsxs("p",{className:"stat--ad",children:["Pre-mitigation:"," ",Math.round(200+s.attack*200/100)," /"," ",Math.round(425+s.attack*200/100)," /"," ",Math.round(650+s.attack*200/100)]}),a.jsxs("p",{children:["Kicks an enemy champion, dealing ",a.jsx("span",{className:"stat--ad",children:"200 / 425 / 650 (+200% bonus AD)"})," knicking it away."]}),a.jsxs("p",{children:["Deals ",a.jsxs("span",{className:"stat--ad",children:["200 / 425 / 650 (+200% bonus AD) (",a.jsx("span",{className:"stat--hp",children:"+12% / 15% / 18% of target's BONUS health"}),")"]})," to enemies hit by the kicked champion and knocks them up for 1 seconds."]})]})}];return a.jsx(a.Fragment,{children:d.map((n,c)=>a.jsx("div",{className:"abilitiesTile",children:a.jsx("div",{children:n.description},c)}))})}export{o as default};
