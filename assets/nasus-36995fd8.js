import{j as a}from"./index-99cbdbed.js";function p({currentLevel:r,mod:s,bonus:l,atk:e,def:i,champ:c}){const n=[{description:a.jsxs("div",{className:"abilityDescription",children:[a.jsxs("h4",{children:[a.jsx("span",{className:"marker--ability",children:"P"})," SOUL EATER"]}),a.jsxs("p",{children:["Gains ",a.jsx("abbr",{title:"at level 1 / 5 / 9",className:"stat--vamp",children:"12 / 18 / 24% Physical Vamp"})]})]})},{description:a.jsxs("div",{className:"abilityDescription",children:[a.jsxs("h4",{children:[a.jsx("span",{className:"marker--ability",children:"1"})," SIPHONING STRIKE"]}),a.jsxs("h5",{children:["Cooldown:"," ",(7*s.atkcdr).toFixed(1)," /"," ",(6*s.atkcdr).toFixed(1)," /"," ",(5*s.atkcdr).toFixed(1)," /"," ",(4*s.atkcdr).toFixed(1)]}),a.jsxs("h5",{className:"stat--mana",children:["Cost:"," ",20]}),a.jsx("h5",{className:"stat--ad",children:"Base damage:"}),a.jsxs("p",{className:"stat--ad",children:["Pre-mitigation:"," ",Math.round(30)," /"," ",Math.round(55)," /"," ",Math.round(80)," /"," ",Math.round(105)]}),a.jsxs("p",{className:"stat--ad",children:["Post-mitigation:"," ",Math.round(30*(1-s.defPhysRed))," /"," ",Math.round(55*(1-s.defPhysRed))," /"," ",Math.round(80*(1-s.defPhysRed))," /"," ",Math.round(105*(1-s.defPhysRed))]}),a.jsxs("p",{children:["Empowers next attack within 10 seconds to deal an additional ",a.jsx("span",{className:"stat--ad",children:"30 / 55 / 80 / 105 physical damage"}),"."]}),a.jsxs("p",{children:["If Siphoning Strike kills the target, its damage is permanently increased by ",a.jsx("span",{className:"stat--ad",children:"4"}),"."]}),a.jsxs("p",{children:["Killing champions, large minions and large monsters increases Siphoning Strike's damage by ",a.jsx("span",{className:"stat--ad",children:"8"})," instead."]})]})},{description:a.jsxs("div",{className:"abilityDescription",children:[a.jsxs("h4",{children:[a.jsx("span",{className:"marker--ability",children:"2"})," WITHER"]}),a.jsxs("h5",{children:["Cooldown:"," ",(14*s.atkcdr).toFixed(1)," /"," ",(13*s.atkcdr).toFixed(1)," /"," ",(12*s.atkcdr).toFixed(1)," /"," ",(11*s.atkcdr).toFixed(1)]}),a.jsxs("h5",{className:"stat--mana",children:["Cost:"," ",80]}),a.jsxs("p",{children:["Slows enemy ",a.jsx("span",{className:"stat--moveSpeed",children:"Movement Speed by 35%"})," and Attack Speed by ",a.jsx("span",{className:"stat--as",children:"22.5 / 30 / 37.5 / 45%"})," for 5 seconds. The Movement Speed slow increases to ",a.jsx("span",{className:"stat--moveSpeed",children:"45 / 60 / 75 / 90% "})," over the duration."]})]})},{description:a.jsxs("div",{className:"abilityDescription",children:[a.jsxs("h4",{children:[a.jsx("span",{className:"marker--ability",children:"3"})," SPIRIT FIRE"]}),a.jsxs("h5",{children:["Cooldown:"," ",(12*s.atkcdr).toFixed(1)]}),a.jsxs("h5",{className:"stat--mana",children:["Cost:"," ",110," /"," ",120," /"," ",130," /"," ",140]}),a.jsx("h5",{className:"stat--ap",children:"Initial damage:"}),a.jsxs("p",{className:"stat--ap",children:["Pre-mitigation:"," ",Math.round(55+e.ap*40/100)," /"," ",Math.round(110+e.ap*40/100)," /"," ",Math.round(165+e.ap*40/100)," /"," ",Math.round(220+e.ap*40/100)]}),a.jsxs("p",{className:"stat--ap",children:["Post-mitigation:"," ",Math.round((55+e.ap*40/100)*(1-s.defMagRed))," /"," ",Math.round((110+e.ap*40/100)*(1-s.defMagRed))," /"," ",Math.round((165+e.ap*40/100)*(1-s.defMagRed))," /"," ",Math.round((220+e.ap*40/100)*(1-s.defMagRed))]}),a.jsx("h5",{className:"stat--ap",children:"Tick Damage:"}),a.jsxs("p",{className:"stat--ap",children:["Pre-mitigation:"," ",Math.round(11+e.ap*12/100)," /"," ",Math.round(22+e.ap*12/100)," /"," ",Math.round(33+e.ap*12/100)," /"," ",Math.round(44+e.ap*12/100)]}),a.jsxs("p",{className:"stat--ap",children:["Post-mitigation:"," ",Math.round((11+e.ap*12/100)*(1-s.defMagRed))," /"," ",Math.round((22+e.ap*12/100)*(1-s.defMagRed))," /"," ",Math.round((33+e.ap*12/100)*(1-s.defMagRed))," /"," ",Math.round((44+e.ap*12/100)*(1-s.defMagRed))]}),a.jsxs("p",{children:["Creates a flaming zone, dealing ",a.jsx("span",{className:"stat--ap",children:"55 / 110 / 165 / 220 (+40% AP) magic damage"}),". The zone persists for 5 seconds, dealing ",a.jsx("span",{className:"stat--ap",children:"11 / 22 / 33 / 44 (+12% AP)"})," over time and reducing ",a.jsx("span",{className:"stat--armor",children:"Armor by 15 / 20 / 25 / 30%"}),"."]})]})},{description:a.jsxs("div",{className:"abilityDescription",children:[a.jsxs("h4",{children:[a.jsx("span",{className:"marker--ability",children:"ULT"})," FURY OF THE SANDS"]}),a.jsxs("h5",{children:["Cooldown:"," ",(75*s.atkcdr).toFixed(1)," /"," ",(70*s.atkcdr).toFixed(1)," /"," ",(65*s.atkcdr).toFixed(1)]}),a.jsxs("h5",{className:"stat--mana",children:["Cost:"," ",100]}),a.jsx("h5",{className:"stat--ap",children:"Damage (current target):"}),a.jsxs("p",{className:"stat--ap",children:[Math.round(i.health*(3+e.ap*.01)/100*(1-s.defMagRed))," /"," ",Math.round(i.health*(4+e.ap*.01)/100*(1-s.defMagRed))," /"," ",Math.round(i.health*(5+e.ap*.01)/100*(1-s.defMagRed))]}),a.jsxs("p",{children:["Enchances himself to gain ",a.jsx("span",{className:"stat--hp",children:"300 / 450 / 600 Health"}),", ",a.jsx("b",{children:"40 / 50 /60 "})," ",a.jsx("span",{className:"stat--armor",children:"Armor"})," and ",a.jsx("span",{className:"stat--magres",children:"Magic Resist"})," for 12 seconds."]}),a.jsxs("p",{children:["Deals ",a.jsx("span",{className:"stat--ap",children:"magic damage"})," to nearby enemies equal to ",a.jsx("span",{className:"stat--ap",children:"3 / 4 / 5% (+0.01% AP)"})," of their Health during the duration."]}),a.jsx("p",{children:"Siphoning Strike's (1St spell) cooldown is reduced by 50% during the duration."})]})}];return a.jsx(a.Fragment,{children:n.map((t,d)=>a.jsx("div",{className:"abilitiesTile",children:a.jsx("div",{children:t.description},d)}))})}export{p as default};
