import{j as e}from"./index-99cbdbed.js";function h({currentLevel:i,mod:s,bonus:t,atk:a,def:n}){const d=[{description:e.jsxs("div",{className:"abilityDescription",children:[e.jsxs("h4",{children:[e.jsx("span",{className:"marker--ability",children:"P"})," ASSASIN'S MARK"]}),e.jsx("h5",{className:"stat--ap",children:"Damage:"}),e.jsxs("p",{className:"stat--ap",children:["Pre-mitigation:"," ",Math.round(20+8*i+a.attack*60/100+a.ap*50/100)]}),e.jsxs("p",{className:"stat--ap",children:["Post-mitigation:"," ",Math.round((20+8*i+a.attack*60/100+a.ap*50/100)*(1-s.defMagRed))]}),e.jsxs("p",{children:["Dealing spell damage to a champion creates a ring of energy around them for 4 seconds. Exiting that ring empowers Akali's next autoattack to have 100 bonus range and deal ",e.jsx("abbr",{title:"20 + 8 * level",children:"28-140"})," (",e.jsx("span",{className:"stat--ad",children:"+60% AD"}),",  ",e.jsx("span",{className:"stat--ap",children:"+50% AP"}),") ",e.jsx("span",{className:"stat--ap",children:" magic damage"}),". Gain ",e.jsxs("abbr",{title:"level 1-30 % / 5-40% / 11-50% / 15-60% source for levels: I'VE MADE IT THE F UP!",className:"stat--moveSpeed",children:[Math.round(a.moveSpeed*30/100)," / ",Math.round(a.moveSpeed*40/100)," / ",Math.round(a.moveSpeed*50/100)," / ",Math.round(a.moveSpeed*60/100)," Movement Speed"]}),"  while moving toward the ring, crossing the ring Akali gains ",e.jsxs("abbr",{title:"level 1-30 % / 5-40% / 11-50% / 15-60% source for levels: I'VE MADE IT THE F UP!",className:"stat--moveSpeed",children:[Math.round(a.moveSpeed*30/100)," / ",Math.round(a.moveSpeed*40/100)," / ",Math.round(a.moveSpeed*50/100)," / ",Math.round(a.moveSpeed*60/100)," Movement Speed"]})," while moving toward enemy champions for 2 seconds."]})]})},{description:e.jsxs("div",{className:"abilityDescription",children:[e.jsxs("h4",{children:[e.jsx("span",{className:"marker--ability",children:"1"})," FIVE POINT STRIKE"]}),e.jsxs("h5",{children:["Cooldown:"," ",(2*s.atkcdr).toFixed(1)," /"," ",(2*s.atkcdr).toFixed(1)," /"," ",(2*s.atkcdr).toFixed(1)," /"," ",(2*s.atkcdr).toFixed(1)]}),e.jsxs("h5",{className:"stat--armor",children:["Cost:"," ",105," /"," ",90," /"," ",75," /"," ",60]}),e.jsx("h5",{className:"stat--ap",children:"Damage:"}),e.jsxs("p",{className:"stat--ap",children:["Pre-mitigation:"," ",Math.round(35+a.ap*60/100+a.attack*65/100)," /"," ",Math.round(70+a.ap*60/100+a.attack*65/100)," /"," ",Math.round(105+a.ap*60/100+a.attack*65/100)," /"," ",Math.round(140+a.ap*60/100+a.attack*65/100)]}),e.jsxs("p",{className:"stat--ap",children:["Post-mitigation:"," ",Math.round((35+a.ap*60/100+a.attack*65/100)*(1-s.defMagRed))," /"," ",Math.round((70+a.ap*60/100+a.attack*65/100)*(1-s.defMagRed))," /"," ",Math.round((105+a.ap*60/100+a.attack*65/100)*(1-s.defMagRed))," /"," ",Math.round((140+a.ap*60/100+a.attack*65/100)*(1-s.defMagRed))]}),e.jsxs("p",{children:["Akali throws five kunais in a cone in the target direction, dealing ",e.jsx("span",{className:"stat--ap",children:"35 / 70 / 105 / 140"})," (",e.jsx("span",{className:"stat--ad",children:"+65 AD"}),", ",e.jsx("span",{className:"stat--ap",children:"+60 AP"})," ) ",e.jsx("span",{className:"stat--ap",children:"Magic Damage"})," to enemies hit, as well as slowing them by ",e.jsxs("abbr",{title:"50%",className:"stat--moveSpeed",children:[Math.round(n.moveSpeed/2)," Movespeed"]})," for 0.5 seconds if they were hit at maximum range."]})]})},{description:e.jsxs("div",{className:"abilityDescription",children:[e.jsxs("h4",{children:[e.jsx("span",{className:"marker--ability",children:"2"})," TWILIGHT SHROUD"]}),e.jsxs("h5",{children:["Cooldown:"," ",(18*s.atkcdr).toFixed(1)," /"," ",(18*s.atkcdr).toFixed(1)," /"," ",(18*s.atkcdr).toFixed(1)," /"," ",(18*s.atkcdr).toFixed(1)]}),e.jsxs("h5",{children:["Duration:"," ",5.5,"S /"," ",6,"S /"," ",6.5,"S /"," ",7,"S"]}),e.jsxs("h5",{children:["Bonus Movement Speed:"," ",Math.round(a.moveSpeed*30/100)," /"," ",Math.round(a.moveSpeed*35/100)," /"," ",Math.round(a.moveSpeed*40/100)," /"," ",Math.round(a.moveSpeed*45/100)]}),e.jsxs("p",{children:["Akali restores ",e.jsx("span",{className:"armor",children:"100 energy"}),"  and detonates a smoke bomb in the target direction, creating a shroud for a few seconds that expands into a ring over the duration. The shroud will slowly move to encircle a nearby enemy. While the shroud is active, Akali's maximum energy is increased by ",e.jsx("span",{className:"stat--armor",children:"100."})," ",e.jsx("br",{}),"While inside the shroud, Akali gains invisibility and ",e.jsx("b",{className:"stat--moveSpeed",children:"30% / 35% / 40% / 45% bonus movement speed"}),". Attacking or casting abilities breaks the stealth, preventing her from regaining it again for 0.8 seconds."]})]})},{description:e.jsxs("div",{className:"abilityDescription",children:[e.jsxs("h4",{children:[e.jsx("span",{className:"marker--ability",children:"3"})," SHURIKEN FLIP"]}),e.jsxs("h5",{children:["Cooldown:"," ",(15*s.atkcdr).toFixed(1)," /"," ",(15*s.atkcdr).toFixed(1)," /"," ",(15*s.atkcdr).toFixed(1)," /"," ",(15*s.atkcdr).toFixed(1)]}),e.jsxs("h5",{className:"stat--armor",children:["Cost:"," ",30," /"," ",30," /"," ",30," /"," ",30]}),e.jsx("h5",{className:"stat--ap",children:"Damage:"}),e.jsxs("p",{className:"stat--ad",children:["Pre-mitigation: ",e.jsx("br",{}),"Initial:"," ",Math.round(30+a.ap*30/100+a.attack*25/100)," /"," ",Math.round(60+a.ap*30/100+a.attack*25/100)," /"," ",Math.round(90+a.ap*30/100+a.attack*25/100)," /"," ",Math.round(120+a.ap*30/100+a.attack*25/100)," ",e.jsx("br",{}),"Recast:"," ",Math.round(70+a.ap*80/100+a.attack*50/100)," /"," ",Math.round(120+a.ap*80/100+a.attack*50/100)," /"," ",Math.round(170+a.ap*80/100+a.attack*50/100)," /"," ",Math.round(220+a.ap*80/100+a.attack*50/100)]}),e.jsxs("p",{className:"stat--ad",children:["Post-mitigation: ",e.jsx("br",{}),"Initial:"," ",Math.round((30+a.ap*30/100+a.attack*25/100)*(1-s.defMagRed))," /"," ",Math.round((60+a.ap*30/100+a.attack*25/100)*(1-s.defMagRed))," /"," ",Math.round((90+a.ap*30/100+a.attack*25/100)*(1-s.defMagRed))," /"," ",Math.round((120+a.ap*30/100+a.attack*25/100)*(1-s.defMagRed))," ",e.jsx("br",{}),"Recast:"," ",Math.round((70+a.ap*80/100+a.attack*50/100)*(1-s.defMagRed))," /"," ",Math.round((120+a.ap*80/100+a.attack*50/100)*(1-s.defMagRed))," /"," ",Math.round((170+a.ap*80/100+a.attack*50/100)*(1-s.defMagRed))," /"," ",Math.round((220+a.ap*80/100+a.attack*50/100)*(1-s.defMagRed))]}),e.jsxs("p",{children:["Akali flips backward and fires a shuriken forward, dealing ",e.jsxs("span",{className:"stat--ap",children:["30 / 60 / 90 / 120 (",e.jsx("span",{className:"stat--ad",children:"+25% AD"})," +30% AP) magic damage"]}),". The first enemy or smoke cloud hit is marked. Re-casting dashes to the marked target, dealing ",e.jsxs("span",{className:"stat--ap",children:["70 / 120 / 170 / 220 (",e.jsx("span",{className:"stat--ad",children:" +50% AD"})," +80% AP) magic damage"]}),"."]})]})},{description:e.jsxs("div",{className:"abilityDescription",children:[e.jsxs("h4",{children:[e.jsx("span",{className:"marker--ability",children:"ULT"})," PERFECT EXECUTION"]}),e.jsxs("h5",{children:["Cooldown:"," ",(85*s.atkcdr).toFixed(1)," /"," ",(65*s.atkcdr).toFixed(1)," /"," ",(45*s.atkcdr).toFixed(1)]}),e.jsx("h5",{className:"stat--ap",children:"Damage:"}),e.jsxs("p",{className:"stat--ad",children:["Pre-mitigation: ",e.jsx("br",{}),"Initial:"," ",Math.round(80+a.ap*30/100+t.attack*50/100)," /"," ",Math.round(200+a.ap*30/100+t.attack*50/100)," /"," ",Math.round(320+a.ap*30/100+t.attack*50/100),e.jsx("br",{}),"Recast (minimum damage):"," ",Math.round(70+a.ap*30/100)," /"," ",Math.round(140+a.ap*30/100)," /"," ",Math.round(210+a.ap*30/100)]}),e.jsxs("p",{className:"stat--ad",children:["Post-mitigation: ",e.jsx("br",{}),"Initial:"," ",Math.round((80+a.ap*30/100+t.attack*50/100)*(1-s.defMagRed))," /"," ",Math.round((200+a.ap*30/100+t.attack*50/100)*(1-s.defMagRed))," /"," ",Math.round((320+a.ap*30/100+t.attack*50/100)*(1-s.defMagRed)),e.jsx("br",{}),"Recast (minimum damage):"," ",Math.round((70+a.ap*30/100)*(1-s.defMagRed))," /"," ",Math.round((140+a.ap*30/100)*(1-s.defMagRed))," /"," ",Math.round((210+a.ap*30/100)*(1-s.defMagRed))]}),e.jsxs("p",{children:["Akali dashes through an enemy champion, dealing ",e.jsxs("span",{className:"stat--ap",children:["80 / 200 / 320 (",e.jsx("span",{className:"stat--ad",children:"+50% AD"})," +30% AP) magic damage"]}),". Can be cast again after 2.5 seconds. ",e.jsx("br",{}),"Recast: Dashes in target direction, dealing ",e.jsx("span",{className:"stat--ap",children:"70 / 140 / 210 (+30% AP to +90% AP) magic damage"})," based upon enemies missing Health."]})]})}];return e.jsx(e.Fragment,{children:d.map((r,c)=>e.jsx("div",{className:"abilitiesTile",children:e.jsx("div",{children:r.description},c)}))})}export{h as default};
