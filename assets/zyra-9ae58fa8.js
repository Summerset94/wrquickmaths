import{j as a}from"./index-120eff63.js";function o({currentLevel:i,mod:e,bonus:d,atk:s,def:c,champ:l,updateAbilitiesBonus:h}){const n=[{description:a.jsxs("div",{className:"abilityDescription",children:[a.jsxs("h4",{children:[a.jsx("span",{className:"marker--ability",children:"P"})," GARDEN OF THORNS"]}),a.jsxs("h5",{className:"stat--ap",children:["Damage normal / ",a.jsx("span",{className:"stat--armor",children:"target with seed"}),":"]}),a.jsxs("p",{className:"stat--ap",children:["Pre-mitigation:"," ",Math.round(5*i+s.ap*10/100)," /"," ",Math.round((5*i+s.ap*10/100)*2)]}),a.jsxs("p",{className:"stat--ap",children:["Post-mitigation:"," ",Math.round((5*i+s.ap*10/100)*(1-e.defMagRed)),"  /"," ",Math.round((5*i+s.ap*10/100)*2*(1-e.defMagRed))]}),a.jsxs("p",{className:"stat--hp",children:["Thorn Spitter Health: ",Math.round(20+17.142857142857142*(Number(i)-1)+s.ap*35/100)]}),".",a.jsxs("p",{children:[a.jsx("b",{children:"Deadly Spines"})," and ",a.jsx("b",{children:"Grasping Roots"})," spawns ",a.jsx("b",{className:"stat--armor",children:"Thorn Spitter"})," with every ability cast."]}),a.jsx("p",{children:"Thorn Spitter:"}),a.jsxs("ul",{children:[a.jsx("li",{children:"Lifetime: 6 seconds;"}),a.jsxs("li",{children:["Damage: ",a.jsx("span",{className:"stat--ap",children:"5"})," per level (",a.jsx("span",{className:"stat--ap",children:"+10% AP"}),") magic damage;"]}),a.jsxs("li",{children:["Attack Speed (empirically tested): ",a.jsx("span",{className:"stat--as",children:"~0.8"}),";"]}),a.jsxs("li",{children:["Health: ",a.jsx("span",{className:"stat--hp",children:" 20-260"})," (based on level) (",a.jsx("span",{className:"stat--ap",children:"+35% AP"}),")"]})]}),a.jsxs("p",{children:["Hitting a ",a.jsx("b",{children:"Champion / Large monster / Epic Monster"})," spawns an additional ",a.jsx("b",{className:"stat--armor",children:"Thorn Spitter"})]}),a.jsxs("p",{children:[a.jsx("b",{className:"stat--armor",children:"Thorn Spitter"})," automatically attacks nearby targets prioritizing enemies marked by ",a.jsx("b",{className:"stat--armor",children:"Rampant Growth"}),"."]}),a.jsx("p",{children:"Deals 50% damage to monsters"})]})},{description:a.jsxs("div",{className:"abilityDescription",children:[a.jsxs("h4",{children:[a.jsx("span",{className:"marker--ability",children:"1"})," DEADLY SPINES"]}),a.jsxs("h5",{children:["Cooldown:"," ",(7*e.atkcdr).toFixed(1)," /"," ",(6.5*e.atkcdr).toFixed(1)," /"," ",(6*e.atkcdr).toFixed(1)," /"," ",(5.5*e.atkcdr).toFixed(1)]}),a.jsxs("h5",{className:"stat--mana",children:["Cost:"," ",75," /"," ",75," /"," ",75," /"," ",75]}),a.jsx("h5",{className:"stat--ap",children:"Damage:"}),a.jsxs("p",{className:"stat--ap",children:["Pre-mitigation:"," ",Math.round(60+s.ap*50/100)," /"," ",Math.round(110+s.ap*50/100)," /"," ",Math.round(160+s.ap*50/100)," /"," ",Math.round(210+s.ap*50/100)]}),a.jsxs("p",{className:"stat--ap",children:["Post-mitigation:"," ",Math.round((60+s.ap*50/100)*(1-e.defMagRed))," /"," ",Math.round((110+s.ap*50/100)*(1-e.defMagRed))," /"," ",Math.round((160+s.ap*50/100)*(1-e.defMagRed))," /"," ",Math.round((210+s.ap*50/100)*(1-e.defMagRed))]}),a.jsx("br",{}),a.jsxs("p",{children:["Vines spread out and burst into spines dealing ",a.jsx("span",{className:"stat--ap",children:"60 / 110 / 160 / 210 (+50%AP) magic damage"})," and sprouting 1 ",a.jsx("b",{className:"stat--armor",children:"Thorn Spitter"})]})]})},{description:a.jsxs("div",{className:"abilityDescription",children:[a.jsxs("h4",{children:[a.jsx("span",{className:"marker--ability",children:"2"})," RAMPANT GROWTH"]}),a.jsxs("h5",{children:["Cooldown:"," ",(15*e.atkcdr).toFixed(1)," /"," ",(14*e.atkcdr).toFixed(1)," /"," ",(13*e.atkcdr).toFixed(1)," /"," ",(12*e.atkcdr).toFixed(1)]}),a.jsxs("h5",{className:"stat--mana",children:["Cost:"," ",50]}),a.jsx("h5",{className:"stat--ap",children:"Damage tick/cast:"}),a.jsxs("p",{className:"stat--ap",children:["Pre-mitigation:"," ",Math.round(5+s.ap*3/100)," ","(",Math.round((5+s.ap*3/100)*12),") /"," ",Math.round(7+s.ap*3/100)," ","(",Math.round((7+s.ap*3/100)*12),") /"," ",Math.round(9+s.ap*3/100)," ","(",Math.round((9+s.ap*3/100)*12),") /"," ",Math.round(11+s.ap*3/100)," ","(",Math.round((11+s.ap*3/100)*12),")"]}),a.jsxs("p",{className:"stat--ap",children:["Post-mitigation:"," ",Math.round((5+s.ap*3/100)*(1-e.defMagRed))," ","(",Math.round((5+s.ap*3/100)*(1-e.defMagRed)*12),") /"," ",Math.round((7+s.ap*3/100)*(1-e.defMagRed))," /"," ","(",Math.round((7+s.ap*3/100)*(1-e.defMagRed)*12),")"," ",Math.round((9+s.ap*3/100)*(1-e.defMagRed))," /"," ","(",Math.round((9+s.ap*3/100)*(1-e.defMagRed)*12),")"," ",Math.round((11+s.ap*3/100)*(1-e.defMagRed))," ","(",Math.round((11+s.ap*3/100)*(1-e.defMagRed)*12),")"]}),a.jsx("br",{}),a.jsx("p",{children:"Plants a seed on an enemy (excluding minions) for 6 seconds."}),a.jsxs("p",{children:["Seed deals ",a.jsx("span",{className:"stat--ap",children:"5 / 7 / 9 / 11 (+3% AP) magic damage"})," every 0.5 second and increases the damage ",a.jsx("b",{className:"stat--aror",children:"Thorn Spitters"})," deal to target by 100%"]})]})},{description:a.jsxs("div",{className:"abilityDescription",children:[a.jsxs("h4",{children:[a.jsx("span",{className:"marker--ability",children:"3"})," GRASPING ROOTS"]}),a.jsxs("h5",{children:["Cooldown:"," ",(12*e.atkcdr).toFixed(1)]}),a.jsxs("h5",{className:"stat--mana",children:["Cost:"," ",60]}),a.jsx("h5",{className:"stat--ap",children:"Damage:"}),a.jsxs("p",{className:"stat--ap",children:["Pre-mitigation:"," ",Math.round(60+s.ap*40/100)," /"," ",Math.round(100+s.ap*40/100)," /"," ",Math.round(140+s.ap*40/100)," /"," ",Math.round(180+s.ap*40/100)]}),a.jsxs("p",{className:"stat--ap",children:["Post-mitigation:"," ",Math.round((60+s.ap*40/100)*(1-e.defMagRed))," /"," ",Math.round((100+s.ap*40/100)*(1-e.defMagRed))," /"," ",Math.round((140+s.ap*40/100)*(1-e.defMagRed))," /"," ",Math.round((180+s.ap*40/100)*(1-e.defMagRed))]}),a.jsx("br",{}),a.jsxs("p",{children:["Zyra sends out vines that ",a.jsx("b",{className:"stat--armor",children:"roots"})," champions hit for ",a.jsx("b",{className:"stat--armor",children:"1 / 1.25 / 1.5 / 1.75"})," seconds and deal ",a.jsx("span",{className:"stat--ap",children:"60 / 100 / 140 / 180 (+40% AP) magic damage"}),"."]}),a.jsxs("p",{children:["A ",a.jsx("b",{children:"Thorn Spitter"})," spawns when ability on first hitting enemy champion or when vines reach maximum travel distance. Hitting large or epic monsters also trigger this effect."]})]})},{description:a.jsxs("div",{className:"abilityDescription",children:[a.jsxs("h4",{children:[a.jsx("span",{className:"marker--ability",children:"ULT"})," STRANGLETHORNS"]}),a.jsx("h5",{className:"stat--ap",children:"Damage:"}),a.jsxs("p",{className:"stat--ap",children:["Pre-mitigation:"," ",Math.round(170+s.ap*60/100)," /"," ",Math.round(250+s.ap*60/100)," /"," ",Math.round(330+s.ap*60/100)]}),a.jsxs("p",{className:"stat--ap",children:["Post-mitigation:"," ",Math.round((170+s.ap*60/100)*(1-e.defMagRed))," /"," ",Math.round((250+s.ap*60/100)*(1-e.defMagRed))," /"," ",Math.round((330+s.ap*60/100)*(1-e.defMagRed))]}),a.jsxs("h5",{children:["Cooldown:"," ",(80*e.atkcdr).toFixed(1)," /"," ",(70*e.atkcdr).toFixed(1)," /"," ",(60*e.atkcdr).toFixed(1)]}),a.jsxs("h5",{className:"stat--mana",children:["Cost:"," ",100]}),a.jsx("br",{}),a.jsxs("p",{children:["Zyra summons vines in large circular area that deal ",a.jsx("span",{className:"stat--ap",children:"170 / 250 / 330 (+60% AP) magic damage"})," to the enemies."]}),a.jsx("p",{children:"After 2 secinds, the vines snaps upwards knocking up enemies caught in cast area for 1 second"}),a.jsxs("p",{children:["The ",a.jsx("b",{className:"stat--armor",children:"Thorn Spitters"})," in a cast aea become enraged: life duration refreshes, gain ",a.jsx("span",{className:"stat--hp",children:"50% bonus HP"})," and ",a.jsx("span",{className:"stat--as",children:"50% bonus Attack Speed"}),"."]})]})}];return a.jsx(a.Fragment,{children:n.map((r,t)=>a.jsx("div",{className:"abilitiesTile",children:a.jsx("div",{children:r.description},t)}))})}export{o as default};
