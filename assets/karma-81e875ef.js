import{j as a}from"./index-99cbdbed.js";function p({currentLevel:d,mod:s,bonus:i,atk:e,def:h,champ:c}){const t=[{description:a.jsxs("div",{className:"abilityDescription",children:[a.jsxs("h4",{children:[a.jsx("span",{className:"marker--ability",children:"P"})," MANTRA"]}),a.jsx("p",{children:"Every ability cast grants Karma a stack of Mantra. At 3 stacks, she enters a Mantra State, enchancing her next basic ability."})]})},{description:a.jsxs("div",{className:"abilityDescription",children:[a.jsxs("h4",{children:[a.jsx("span",{className:"marker--ability",children:"1"})," INNER FLAME"]}),a.jsxs("h5",{children:["Cooldown:"," ",(10*s.atkcdr).toFixed(1)," /"," ",(9*s.atkcdr).toFixed(1)," /"," ",(8*s.atkcdr).toFixed(1)," /"," ",(7*s.atkcdr).toFixed(1)]}),a.jsxs("h5",{className:"stat--mana",children:["Cost:"," ",60," /"," ",60," /"," ",60," /"," ",60]}),a.jsx("h5",{className:"stat--ap",children:"Damage:"}),a.jsxs("p",{className:"stat--ap",children:["Pre-mitigation:"," ",Math.round(70+e.ap*40/100)," /"," ",Math.round(110+e.ap*40/100)," /"," ",Math.round(150+e.ap*40/100)," /"," ",Math.round(190+e.ap*40/100)]}),a.jsxs("p",{className:"stat--ap",children:["Post-mitigation:"," ",Math.round((70+e.ap*40/100)*(1-s.defMagRed))," /"," ",Math.round((110+e.ap*40/100)*(1-s.defMagRed))," /"," ",Math.round((150+e.ap*40/100)*(1-s.defMagRed))," /"," ",Math.round((190+e.ap*40/100)*(1-s.defMagRed))]}),a.jsx("h5",{className:"stat--magres",children:"Mantra damage + explosion:"}),a.jsxs("p",{className:"stat--ap",children:["Pre-mitigation:"," ",Math.round(70+e.ap*50/100)," + ",Math.round(40+e.ap*50/100)," /"," ",Math.round(150+e.ap*50/100)," + ",Math.round(80+e.ap*50/100),"  /"," ",Math.round(230+e.ap*50/100)," + ",Math.round(120+e.ap*50/100),"  /"," ",Math.round(310+e.ap*50/100)," + ",Math.round(160+e.ap*50/100)]}),a.jsxs("p",{className:"stat--ap",children:["Post-mitigation:"," ",Math.round((70+e.ap*50/100)*(1-s.defMagRed))," + ",Math.round((40+e.ap*50/100)*(1-s.defMagRed))," /"," ",Math.round((150+e.ap*50/100)*(1-s.defMagRed))," + ",Math.round((80+e.ap*50/100)*(1-s.defMagRed))," /"," ",Math.round((230+e.ap*50/100)*(1-s.defMagRed))," + ",Math.round((120+e.ap*50/100)*(1-s.defMagRed))," /"," ",Math.round((310+e.ap*50/100)*(1-s.defMagRed))," + ",Math.round((160+e.ap*50/100)*(1-s.defMagRed))]}),a.jsxs("p",{children:["Fires a blast of energy, dealing ",a.jsx("span",{className:"stat--ap",children:"70 / 110 / 150 / 190 (+40% AP) magic damage"})," to the first target hit and surrounding enemies, and slowing them by ",a.jsx("span",{className:"stat--moveSpeed",children:"35%"})," for 1.5 seconds."]}),a.jsxs("p",{children:[a.jsx("b",{children:"Mantra:"})," Increases the destructive power of the blast, dealing ",a.jsx("span",{className:"stat--ap",children:"70 / 150 / 230 / 310 (+50% AP) magic damage"}),"to the first target hit and surrounding enemies. The blast leaves a field for 1.5 seconds, slowing targets by 50%, after wich it explodes and deals ",a.jsx("span",{className:"stat--ap",children:"40 / 80 / 120 / 160 (+50% AP) magic damage"}),"."]})]})},{description:a.jsxs("div",{className:"abilityDescription",children:[a.jsxs("h4",{children:[a.jsx("span",{className:"marker--ability",children:"2"})," FOCUSED RESOLVE"]}),a.jsxs("h5",{children:["Cooldown:"," ",(15*s.atkcdr).toFixed(1)," /"," ",(15*s.atkcdr).toFixed(1)," /"," ",(15*s.atkcdr).toFixed(1)," /"," ",(15*s.atkcdr).toFixed(1)]}),a.jsxs("h5",{className:"stat--mana",children:["Cost:"," ",55," /"," ",60," /"," ",65," /"," ",70]}),a.jsx("h5",{className:"stat--ap",children:"Initial + tether damage:"}),a.jsxs("p",{className:"stat--ap",children:["Pre-mitigation:"," ",Math.round(35+e.ap*40/100)," + ",Math.round(40+e.ap*45/100)," /"," ",Math.round(60+e.ap*40/100)," + ",Math.round(70+e.ap*45/100)," /"," ",Math.round(85+e.ap*40/100)," + ",Math.round(100+e.ap*45/100)," /"," ",Math.round(110+e.ap*40/100)," + ",Math.round(130+e.ap*45/100)]}),a.jsxs("p",{className:"stat--ap",children:["Post-mitigation:"," ",Math.round((35+e.ap*40/100)*(1-s.defMagRed))," + ",Math.round((40+e.ap*45/100)*(1-s.defMagRed))," /"," ",Math.round((60+e.ap*40/100)*(1-s.defMagRed))," + ",Math.round((70+e.ap*45/100)*(1-s.defMagRed))," /"," ",Math.round((85+e.ap*40/100)*(1-s.defMagRed))," + ",Math.round((100+e.ap*45/100)*(1-s.defMagRed))," /"," ",Math.round((110+e.ap*40/100)*(1-s.defMagRed)),"  + ",Math.round((130+e.ap*45/100)*(1-s.defMagRed))]}),a.jsx("h5",{className:"stat--magres",children:"Mantra tether damage:"}),a.jsxs("p",{className:"stat--ap",children:["Pre-mitigation:"," ",Math.round(40+e.ap*45/100)," /"," ",Math.round(70+e.ap*45/100)," /"," ",Math.round(100+e.ap*45/100)," /"," ",Math.round(130+e.ap*45/100)]}),a.jsxs("p",{className:"stat--ap",children:["Post-mitigation:"," ",Math.round((40+e.ap*45/100)*(1-s.defMagRed))," /"," ",Math.round((70+e.ap*45/100)*(1-s.defMagRed))," /"," ",Math.round((100+e.ap*45/100)*(1-s.defMagRed))," /"," ",Math.round((130+e.ap*45/100)*(1-s.defMagRed))]}),a.jsxs("p",{children:["Tethers up to two nearby enemy champions, dealing ",a.jsx("span",{className:"stat--ap",children:"35 / 60 / 85 / 110 (+40% AP) magic damage"})," and revealing them for 1.75 seconds. If targets fail to break the tether, they take ",a.jsx("span",{className:"stat--ap",children:"40 / 70 / 100 / 130 (+45% AP) magic damage"}),"  and are rooted for ",a.jsx("b",{children:"1 / 1.25 / 1.5 / 1.75 seconds"}),"."]}),a.jsxs("p",{children:[a.jsx("b",{children:"Mantra:"})," A new tether will be fromed between tethered targets. If there is only one tethered target, the new tether will spread toward an additional nearby enemy champion. If targets fail to break all the tethers, they take ",a.jsx("span",{className:"stat--ap",children:"40 / 70 / 100 /130 (+45% AP) magic damage"})," and are rooted for an improved ",a.jsx("b",{children:"1.5 / 1.75 / 2 / 2.25 seconds"}),"."]})]})},{description:a.jsxs("div",{className:"abilityDescription",children:[a.jsxs("h4",{children:[a.jsx("span",{className:"marker--ability",children:"3"})," INSPIRE"]}),a.jsxs("h5",{children:["Cooldown:"," ",(10*s.atkcdr).toFixed(1)," /"," ",(9*s.atkcdr).toFixed(1)," /"," ",(9*s.atkcdr).toFixed(1)," /"," ",(8*s.atkcdr).toFixed(1)]}),a.jsxs("h5",{className:"stat--mana",children:["Cost:"," ",70," /"," ",70," /"," ",70," /"," ",70]}),a.jsx("h5",{className:"stat--hp",children:"Shield strength:"}),a.jsxs("p",{className:"stat--hp",children:["Normal:"," ",Math.round(70+e.ap*65/100)," /"," ",Math.round(100+e.ap*65/100)," /"," ",Math.round(130+e.ap*65/100)," /"," ",Math.round(160+e.ap*65/100)]}),a.jsxs("p",{className:"stat--hp",children:["Mantra:"," ",Math.round(140+e.ap*65/100)," /"," ",Math.round(200+e.ap*65/100)," /"," ",Math.round(260+e.ap*65/100)," /"," ",Math.round(320+e.ap*65/100)]}),a.jsxs("p",{children:["Grants an allied champion ",a.jsxs("span",{className:"stat--hp",children:["70 / 100 / 130 / 160 ",a.jsx("span",{className:"stat--ap",children:"(+ 65% AP)"})," shield"]})," for 3 seconds and ",a.jsx("span",{className:"stat--moveSpeed",children:"30% movement speed"})," for 1.5 seconds."]}),a.jsxs("p",{children:[a.jsx("b",{children:"Mantra:"})," Karma focuses her power, granting a  ",a.jsxs("span",{className:"stat--hp",children:["140 / 200 / 260 / 320 ",a.jsx("span",{className:"stat--ap",children:"(+ 65% AP)"})," shield"]})," that decays over 4 seconds and ",a.jsx("span",{className:"stat--moveSpeed",children:"60% movement speed"})," that decays to 20% over the same duration."]}),a.jsx("p",{children:"An additional ring is generated around the shielded target, and the first ally champion who enters the ring will be granted the same shield and movement speed."})]})},{description:a.jsxs("div",{className:"abilityDescription",children:[a.jsxs("h4",{children:[a.jsx("span",{className:"marker--ability",children:"ULT"})," TRANSCENDENT EMBRACE"]}),a.jsxs("h5",{children:["Cooldown:"," ",(70*s.atkcdr).toFixed(1)," /"," ",(65*s.atkcdr).toFixed(1)," /"," ",(60*s.atkcdr).toFixed(1)]}),a.jsxs("h5",{className:"stat--mana",children:["Cost:"," ",100," /"," ",100," /"," ",100]}),a.jsx("h5",{className:"stat--ap",children:"Damage:"}),a.jsxs("p",{className:"stat--ap",children:["Pre-mitigation:"," ",Math.round(150+e.ap*60/100)," /"," ",Math.round(250+e.ap*60/100)," /"," ",Math.round(350+e.ap*60/100)]}),a.jsxs("p",{className:"stat--ap",children:["Post-mitigation:"," ",Math.round((150+e.ap*60/100)*(1-s.defMagRed))," /"," ",Math.round((250+e.ap*60/100)*(1-s.defMagRed))," /"," ",Math.round((350+e.ap*60/100)*(1-s.defMagRed))]}),a.jsxs("p",{children:["Immediately enters ",a.jsx("b",{children:"Mantra"})," state."]}),a.jsxs("p",{children:["Forms a ring of spirit energy at the taget location. After 1 second, it detonates, dealing ",a.jsx("span",{className:"stat--ap",children:"150 / 250 / 350 (+60% AP) magic damage"}),"  to all enemies inside the circle and slowing them by 35% for 1 second."]}),a.jsx("p",{children:"If enemies are hit by the outer ring, they will be knocked back toward the center."})]})}];return a.jsx(a.Fragment,{children:t.map((n,r)=>a.jsx("div",{className:"abilitiesTile",children:a.jsx("div",{children:n.description},r)}))})}export{p as default};
