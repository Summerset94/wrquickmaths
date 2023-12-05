import{j as a}from"./index-9685fbcc.js";function o({currentLevel:n,mod:t,bonus:e,atk:s,def:i,champ:h,updateAbilitiesBonus:c}){const d=[{description:a.jsxs("div",{className:"abilityDescription",children:[a.jsxs("h4",{children:[a.jsx("span",{className:"marker--ability",children:"P"})," THE RELENTLESS STORM"]}),a.jsxs("p",{children:["Volibear's gains ",a.jsxs("span",{className:"stat--as",children:["5% + ",a.jsx("span",{className:"stat--ap",children:"4% AP"})," (",(h.asBase*(4+s.ap*4/100)/100).toFixed(3),") Attack Speed"]})," for 6 seconds whenever he deals damage with an Ability or Attack, staking up to 5 times (to ",a.jsx("span",{className:"stat--as",children:(h.asBase*(4+s.ap*4/100)/100*5).toFixed(3)})," Attack Speed)."]}),".",a.jsxs("p",{children:["At 5 stacks, Volibear's claws ignite with lightning, causing his Attacks to deal an additional ",a.jsxs("abbr",{title:"11 + 3.5 per level + 40% AP",className:"stat--ap",children:[Math.round(7.5+3.5*n+s.ap*40/100)," magic damage"]})," to the target and 4 closest enemies."]})]})},{description:a.jsxs("div",{className:"abilityDescription",children:[a.jsxs("h4",{children:[a.jsx("span",{className:"marker--ability",children:"1"})," THUNDERING SMASH"]}),a.jsxs("h5",{children:["Cooldown:"," ",(13*t.atkcdr).toFixed(1)," /"," ",(12*t.atkcdr).toFixed(1)," /"," ",(11*t.atkcdr).toFixed(1)," /"," ",(10*t.atkcdr).toFixed(1)]}),a.jsxs("h5",{className:"stat--mana",children:["Cost:"," ",50]}),a.jsx("h5",{className:"stat--ad",children:"Damage:"}),a.jsxs("p",{className:"stat--ad",children:["Pre-mitigation:"," ",Math.round(15+e.attack*100/100)," /"," ",Math.round(40+e.attack*100/100)," /"," ",Math.round(65+e.attack*100/100)," /"," ",Math.round(90+e.attack*100/100)]}),a.jsxs("p",{className:"stat--ad",children:["Post-mitigation:"," ",Math.round((15+e.attack*100/100)*(1-t.defPhysRed))," /"," ",Math.round((40+e.attack*100/100)*(1-t.defPhysRed))," /"," ",Math.round((65+e.attack*100/100)*(1-t.defPhysRed))," /"," ",Math.round((90+e.attack*100/100)*(1-t.defPhysRed))]}),a.jsx("br",{}),a.jsxs("p",{children:["Volibear gains ",a.jsx("span",{className:"stat--moveSpeed",children:"10 / 15 / 20 / 25% Movement Speed"}),", increased to ",a.jsx("span",{className:"stat--moveSpeed",children:"20 / 30 / 40 / 50% "})," towards enemy champion for the next 4 seconds. While active, Volibear's next Attack deals ",a.jsx("span",{className:"stat--ad",children:"15 / 40 / 65 / 90 (+100% bonus AD) physical damage"})," and Stuns the target for 1 seconds."]}),a.jsx("p",{children:"If Volibear becomes Immobilized before he Stuns a target, Thundering Smash's duration is paused."})]})},{description:a.jsxs("div",{className:"abilityDescription",children:[a.jsxs("h4",{children:[a.jsx("span",{className:"marker--ability",children:"2"})," FRENZIED MAUL"]}),a.jsxs("h5",{children:["Cooldown:"," ",(5*t.atkcdr).toFixed(1)]}),a.jsxs("h5",{className:"stat--mana",children:["Cost:"," ",35," /"," ",40," /"," ",45," /"," ",50]}),a.jsx("h5",{className:"stat--ad",children:"Damage:"}),a.jsxs("p",{className:"stat--ad",children:["Pre-mitigation:"," ",Math.round(5+s.attack*100/100+e.health*5/100)," /"," ",Math.round(30+s.attack*100/100+e.health*5/100)," /"," ",Math.round(55+s.attack*100/100+e.health*5/100)," /"," ",Math.round(80+s.attack*100/100+e.health*5/100)]}),a.jsxs("p",{className:"stat--ad",children:["Post-mitigation:"," ",Math.round((5+s.attack*100/100+e.health*5/100)*(1-t.defPhysRed))," /"," ",Math.round((30+s.attack*100/100+e.health*5/100)*(1-t.defPhysRed))," /"," ",Math.round((55+s.attack*100/100+e.health*5/100)*(1-t.defPhysRed))," /"," ",Math.round((80+s.attack*100/100+e.health*5/100)*(1-t.defPhysRed))]}),a.jsx("h5",{className:"stat--critChance",children:"Frenzy Damage:"}),a.jsxs("p",{className:"stat--critChance",children:["Pre-mitigation:"," ",Math.round(8+s.attack*160/100+e.health*8/100)," /"," ",Math.round(48+s.attack*160/100+e.health*8/100)," /"," ",Math.round(88+s.attack*160/100+e.health*8/100)," /"," ",Math.round(128+s.attack*160/100+e.health*8/100)]}),a.jsxs("p",{className:"stat--critChance",children:["Post-mitigation:"," ",Math.round((8+s.attack*160/100+e.health*8/100)*(1-t.defPhysRed))," /"," ",Math.round((48+s.attack*160/100+e.health*8/100)*(1-t.defPhysRed))," /"," ",Math.round((88+s.attack*160/100+e.health*8/100)*(1-t.defPhysRed))," /"," ",Math.round((128+s.attack*160/100+e.health*8/100)*(1-t.defPhysRed))]}),a.jsx("br",{}),a.jsxs("p",{children:["Volibear mauls an enemy, dealing ",a.jsxs("span",{className:"stat--ad",children:["5 / 30 / 55 / 80 (+100% AD) (",a.jsx("span",{className:"stat--hp",children:"+5% bonus Health"}),") physical damage"]}),". If Volibear maul's a champion or Large Monster he goes into a Frenzy for 8 seconds."]}),a.jsxs("p",{children:["If this Ability is used when in a Frenzy, its damage is increased to ",a.jsxs("span",{className:"stat--ad",children:["8 / 48 / 88 / 128 (+160% AD) (",a.jsx("span",{className:"stat--hp",children:"+8% bonus Health"}),") physical damage"]})," and Volibear restores ",a.jsx("span",{className:"stat--hp",children:"20 / 30 / 40 / 50 (+7 / 8 / 9 / 10% of missing Health)"}),"."]}),a.jsxs("p",{children:["This Ability applies on-hit effects. ",a.jsx("br",{}),"Deals 80% damage to monsters."]})]})},{description:a.jsxs("div",{className:"abilityDescription",children:[a.jsxs("h4",{children:[a.jsx("span",{className:"marker--ability",children:"3"})," SKY SPLITTER"]}),a.jsxs("h5",{children:["Cooldown:"," ",(13*t.atkcdr).toFixed(1)]}),a.jsxs("h5",{className:"stat--mana",children:["Cost:"," ",60]}),a.jsxs("h5",{className:"stat--hp",children:["Healing Shield: ",Math.round(s.health*14/100+s.ap*75/100)]}),a.jsx("h5",{className:"stat--ap",children:"Damage:"}),a.jsxs("p",{className:"stat--ap",children:["Base:"," ",Math.round(80+s.ap*50/100)," /"," ",Math.round(110+s.ap*50/100)," /"," ",Math.round(140+s.ap*50/100)," /"," ",Math.round(180+s.ap*50/100)]}),a.jsxs("p",{className:"stat--ap",children:["Current target:"," ",Math.round((80+s.ap*50/100+i.health*11/100)*(1-t.defMagRed))," /"," ",Math.round((110+s.ap*50/100+i.health*12/100)*(1-t.defMagRed))," /"," ",Math.round((140+s.ap*50/100+i.health*13/100)*(1-t.defMagRed))," /"," ",Math.round((180+s.ap*50/100+i.health*14/100)*(1-t.defMagRed))]}),a.jsx("br",{}),a.jsxs("p",{children:["Volibear summons a thundercloud that fires a lightning bolt, dealing ",a.jsxs("span",{className:"stat--ap",children:["80 / 110 / 140 / 170 (+50% AP) (",a.jsx("span",{className:"stat--hp",children:"+11 / 12 / 13 / 14% target's Max Health damage"}),")"]})," and ",a.jsx("span",{className:"stat--moveSpeed",children:" Slowing by 40%"})," for 2 seconds."]}),a.jsxs("p",{children:["If Volibear is inside the blast zone, he gains a ",a.jsxs("span",{className:"stat--hp",children:["14% Max Health (",a.jsx("span",{className:"stat--ap",children:"+75% AP"}),") Shield"]}),"  for 3 seconds."]}),a.jsx("p",{children:"Damage against non-champiuons is capped at 150 / 250 / 350 / 450."})]})},{description:a.jsxs("div",{className:"abilityDescription",children:[a.jsxs("h4",{children:[a.jsx("span",{className:"marker--ability",children:"ULT"})," STORMBRINGER"]}),a.jsxs("h5",{children:["Cooldown:"," ",(90*t.atkcdr).toFixed(1)," /"," ",(80*t.atkcdr).toFixed(1)," /"," ",(70*t.atkcdr).toFixed(1)]}),a.jsxs("h5",{className:"stat--mana",children:["Cost:"," ",100]}),a.jsx("h5",{className:"stat--ad",children:"Damage:"}),a.jsxs("p",{className:"stat--ad",children:["Pre-mitigation:"," ",Math.round(300+e.attack*200/100+s.ap*100/100)," /"," ",Math.round(450+e.attack*200/100+s.ap*100/100)," /"," ",Math.round(600+e.attack*200/100+s.ap*100/100)]}),a.jsxs("p",{className:"stat--ad",children:["Post-mitigation:"," ",Math.round((300+e.attack*200/100+s.ap*100/100)*(1-t.defPhysRed))," /"," ",Math.round((450+e.attack*200/100+s.ap*100/100)*(1-t.defPhysRed))," /"," ",Math.round((600+e.attack*200/100+s.ap*100/100)*(1-t.defPhysRed))]}),a.jsx("br",{}),a.jsxs("p",{children:["Volibear transforms and leaps, gaining ",a.jsx("span",{className:"stat--hp",children:"175 / 350 / 525 Health"})," and 50 Attack Range for next 12 seconds."]}),a.jsxs("p",{children:["Upon landing, Volibear cracks the earth, Disabiling nearby towers for ",a.jsx("b",{children:"3 / 4 / 5"})," seconds an dealing ",a.jsxs("span",{className:"stat--ad",children:["300 / 450 / 600 (",a.jsx("span",{className:"stat--ap",children:"+100% AP"}),") (+200% bonus AD) physical damage"]})," to them. Nearby enemies are Slowed by 50%, decaying over 1 second. Enemies directly underneath Volibear suffering ",a.jsxs("span",{className:"stat--ad",children:["300 / 450 / 600 (",a.jsx("span",{className:"stat--ap",children:"+100% AP"}),") (+200% bonus AD) physical damage"]}),"."]})]})}];return a.jsx(a.Fragment,{children:d.map((l,r)=>a.jsx("div",{className:"abilitiesTile",children:a.jsx("div",{children:l.description},r)}))})}export{o as default};