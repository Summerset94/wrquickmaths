import{j as a}from"./index-6e7f5b0c.js";function o({currentLevel:r,mod:e,bonus:d,atk:s,def:c,champ:l}){const i=[{description:a.jsxs("div",{className:"abilityDescription",children:[a.jsxs("h4",{children:[a.jsx("span",{className:"marker--ability",children:"P"})," A HARMLESS SCARECROW"]}),a.jsx("p",{children:"After a champion or epic monster takedown, summons Scarecrow Effigy to where they were killed."}),a.jsx("p",{children:"Scarecrow Effigy fears nearby enemies after charging up for 2 seconds. Scarecrow Effigy can be removed by attacks while it is still charging up."})]})},{description:a.jsxs("div",{className:"abilityDescription",children:[a.jsxs("h4",{children:[a.jsx("span",{className:"marker--ability",children:"1"})," TERRIFY"]}),a.jsxs("h5",{children:["Cooldown:"," ",(13.5*e.atkcdr).toFixed(1)," /"," ",(13*e.atkcdr).toFixed(1)," /"," ",(12.5*e.atkcdr).toFixed(1)," /"," ",(12*e.atkcdr).toFixed(1)]}),a.jsxs("h5",{className:"stat--mana",children:["Cost:"," ",65]}),a.jsxs("p",{children:[a.jsx("b",{children:"Passive:"})," While out of combat and stationary, or not visible to the enemy team, Fiddlesticks' next damaging ability additionally fears targets hit for ",a.jsx("b",{children:"1 / 1.1 / 1.2 / 1.3 seconds"}),"."]}),a.jsxs("p",{children:[a.jsx("b",{children:"Active:"})," Summons crows that attack enemies along the path, dealing magic damage equal to ",a.jsx("span",{className:"stat--ap",children:"4% / 5% / 6% / 7% (+0.015 AP)"})," of the targets' ",a.jsx("span",{className:"stat--hp",children:"current Health."})," If the targets were recently feared, damage dealt is doubled. Deals a minimum of ",a.jsx("span",{className:"stat--ap",children:"45 / 70 / 95 / 120 damage"}),"  to enemy champions and a maximum of 400 damage to monsters."]})]})},{description:a.jsxs("div",{className:"abilityDescription",children:[a.jsxs("h4",{children:[a.jsx("span",{className:"marker--ability",children:"2"})," BOUNTIFUL HARVEST"]}),a.jsxs("h5",{children:["Cooldown:"," ",(8*e.atkcdr).toFixed(1)," /"," ",(7.5*e.atkcdr).toFixed(1)," /"," ",(7*e.atkcdr).toFixed(1)," /"," ",(6.5*e.atkcdr).toFixed(1)]}),a.jsxs("h5",{className:"stat--mana",children:["Cost:"," ",60]}),a.jsx("h5",{className:"stat--ap",children:"Damage per second:"}),a.jsxs("p",{className:"stat--ap",children:["Pre-mitigation:"," ",Math.round(50+s.ap*25/100)," /"," ",Math.round(80+s.ap*25/100)," /"," ",Math.round(110+s.ap*25/100)," /"," ",Math.round(140+s.ap*25/100)]}),a.jsxs("p",{className:"stat--ap",children:["Post-mitigation:"," ",Math.round((50+s.ap*25/100)*(1-e.defMagRed))," /"," ",Math.round((80+s.ap*25/100)*(1-e.defMagRed))," /"," ",Math.round((110+s.ap*25/100)*(1-e.defMagRed))," /"," ",Math.round((140+s.ap*25/100)*(1-e.defMagRed))]}),a.jsxs("p",{children:["Siphons the souls of nearby enemies, dealing ",a.jsx("span",{className:"stat--ap",children:" 50 / 80 / 110 / 140 (+ 25% AP) magic damage"})," every second for 2 seconds. The last strike deals damage equal to the target's missing Health. Heals itself by draining Health from enemies."]}),a.jsx("p",{children:"Health recoverable by dealing damage:"}),a.jsxs("p",{children:[a.jsx("span",{className:"stat--hp",children:"35% / 40% / 45% / 50%"}),"  against enemy champions; ",a.jsx("span",{className:"stat--hp",children:"15%"}),"  against minions; ",a.jsx("span",{className:"stat--hp",children:"45%"}),"  against monsters."]}),a.jsx("p",{children:"Deals 160% damage to monsters. Deals 50% damage to minions."})]})},{description:a.jsxs("div",{className:"abilityDescription",children:[a.jsxs("h4",{children:[a.jsx("span",{className:"marker--ability",children:"3"})," REAP"]}),a.jsxs("h5",{children:["Cooldown:"," ",(9*e.atkcdr).toFixed(1)," /"," ",(8*e.atkcdr).toFixed(1)," /"," ",(7*e.atkcdr).toFixed(1)," /"," ",(6*e.atkcdr).toFixed(1)]}),a.jsxs("h5",{className:"stat--mana",children:["Cost:"," ",40]}),a.jsx("h5",{className:"stat--ap",children:"Damage:"}),a.jsxs("p",{className:"stat--ap",children:["Pre-mitigation:"," ",Math.round(70+s.ap*50/100)," /"," ",Math.round(120+s.ap*50/100)," /"," ",Math.round(170+s.ap*50/100)," /"," ",Math.round(220+s.ap*50/100)]}),a.jsxs("p",{className:"stat--ap",children:["Post-mitigation:"," ",Math.round((70+s.ap*50/100)*(1-e.defMagRed))," /"," ",Math.round((120+s.ap*50/100)*(1-e.defMagRed))," /"," ",Math.round((170+s.ap*50/100)*(1-e.defMagRed))," /"," ",Math.round((220+s.ap*50/100)*(1-e.defMagRed))]}),a.jsxs("p",{children:["Slashes the target location with its scythe, dealing ",a.jsx("span",{className:"stat--ap",children:"70 / 120 / 170 / 220 (+50% AP) magic damage"})," to enemies within the area and ",a.jsx("span",{className:"stat--moveSpeed",children:"slowing them by 35% / 40% / 45% / 50%"})," for 1.25 seconds. Enemies in the center are silenced."]})]})},{description:a.jsxs("div",{className:"abilityDescription",children:[a.jsxs("h4",{children:[a.jsx("span",{className:"marker--ability",children:"ULT"})," CROWSTORM"]}),a.jsxs("h5",{children:["Cooldown:"," ",(110*e.atkcdr).toFixed(1)," /"," ",(90*e.atkcdr).toFixed(1)," /"," ",(70*e.atkcdr).toFixed(1)]}),a.jsxs("h5",{className:"stat--mana",children:["Cost:"," ",100]}),a.jsx("h5",{className:"stat--ap",children:"Damage per tick:"}),a.jsxs("p",{className:"stat--ap",children:["Pre-mitigation:"," ",Math.round(25+s.ap*10/100)," /"," ",Math.round(42.5+s.ap*10/100)," /"," ",Math.round(60+s.ap*10/100)]}),a.jsxs("p",{className:"stat--ap",children:["Post-mitigation:"," ",Math.round((25+s.ap*10/100)*(1-e.defMagRed))," /"," ",Math.round((42.5+s.ap*10/100)*(1-e.defMagRed))," /"," ",Math.round((60+s.ap*10/100)*(1-e.defMagRed))]}),a.jsxs("p",{children:["Channels for 1.5 seconds, then blinks to the target location and summons Crowstorm, dealing ",a.jsx("span",{className:"stat--ap",children:"25 / 42.5 / 60 (+10% AP) magic damage"})," every 0.25 seconds to nearby enemies for 5 seconds."]})]})}];return a.jsx(a.Fragment,{children:i.map((t,n)=>a.jsx("div",{className:"abilitiesTile",children:a.jsx("div",{children:t.description},n)}))})}export{o as default};
