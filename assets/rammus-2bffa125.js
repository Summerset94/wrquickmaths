import{j as a}from"./index-90298c99.js";function h({currentLevel:n,mod:e,bonus:c,atk:s,def:l,champ:r}){const i=[{description:a.jsxs("div",{className:"abilityDescription",children:[a.jsxs("h4",{children:[a.jsx("span",{className:"marker--ability",children:"P"})," ROLLING ARMORDILLO"]}),a.jsxs("p",{children:["While out of combat gain ",a.jsxs("abbr",{title:"32 + 2 per level",className:"stat--moveSpeed",children:[30+n*2," Movement Speed"]})," increased to ",a.jsx("abbr",{title:"37 + 2 per level",className:"stat--moveSpeed",children:35+n*2})," during ",a.jsx("b",{children:"Powerball"})]})]})},{description:a.jsxs("div",{className:"abilityDescription",children:[a.jsxs("h4",{children:[a.jsx("span",{className:"marker--ability",children:"1"})," POWERBALL"]}),a.jsxs("h5",{children:["Cooldown:"," ",(15*e.atkcdr).toFixed(1)," /"," ",(12*e.atkcdr).toFixed(1)," /"," ",(9*e.atkcdr).toFixed(1)," /"," ",(6*e.atkcdr).toFixed(1)]}),a.jsxs("h5",{className:"stat--mana",children:["Cost:"," ",65]}),a.jsx("h5",{className:"stat--ap",children:"Damage:"}),a.jsxs("p",{className:"stat--ap",children:["Pre-mitigation:"," ",Math.round(80+s.ap*100/100)," /"," ",Math.round(110+s.ap*100/100)," /"," ",Math.round(140+s.ap*100/100)," /"," ",Math.round(170+s.ap*100/100)]}),a.jsxs("p",{className:"stat--ap",children:["Post-mitigation:"," ",Math.round((80+s.ap*100/100)*(1-e.defMagRed))," /"," ",Math.round((110+s.ap*100/100)*(1-e.defMagRed))," /"," ",Math.round((140+s.ap*100/100)*(1-e.defMagRed))," /"," ",Math.round((170+s.ap*100/100)*(1-e.defMagRed))]}),a.jsxs("p",{children:["Enables Rolling Armordillo and accelerates up to ",a.jsx("span",{className:"stat--moveSpeed",children:" +110 / 120 / 130 / 140% bonus Movement Speed"})," over 6 seconds. Colliding with an enemy deals ",a.jsx("span",{className:"stat--ap",children:"80 / 110 / 140 / 170 (+100% AP) magic damage"})," in an area, knocking back and ",a.jsx("span",{className:"stat--moveSpeed",children:"slowing enemies by 40 / 50 / 60 / 70%"})," for 1 second."]}),a.jsxs("p",{children:["Activating cancels ",a.jsx("b",{children:"Defensive Ball Curl"})," and puts it on cooldown."]})]})},{description:a.jsxs("div",{className:"abilityDescription",children:[a.jsxs("h4",{children:[a.jsx("span",{className:"marker--ability",children:"2"})," DEFENSIVE BALL CURL"]}),a.jsxs("h5",{children:["Cooldown:"," ",(6*e.atkcdr).toFixed(1)]}),a.jsxs("h5",{className:"stat--mana",children:["Cost:"," ",40]}),a.jsxs("h5",{className:"stat--ap",children:["Damage (",a.jsx("span",{className:"stat--critChance",children:"active"}),"):"]}),a.jsxs("p",{className:"stat--ap",children:["Pre-mitigation:"," ",Math.round(10+s.armor*8/100)," ","(",a.jsx("span",{className:"stat--critChance",children:Math.round((10+s.armor*8/100)*1.5)}),")  /"," ",Math.round(12+s.armor*8/100)," ","(",a.jsx("span",{className:"stat--critChance",children:Math.round((12+s.armor*8/100)*1.5)}),") /"," ",Math.round(14+s.armor*8/100)," ","(",a.jsx("span",{className:"stat--critChance",children:Math.round((14+s.armor*8/100)*1.5)}),") /"," ",Math.round(16+s.armor*8/100)," ","(",a.jsx("span",{className:"stat--critChance",children:Math.round((16+s.armor*8/100)*1.5)}),")"]}),a.jsxs("p",{className:"stat--ap",children:["Post-mitigation:"," ",Math.round((10+s.armor*8/100)*(1-e.defMagRed))," ","(",a.jsx("span",{className:"stat--critChance",children:Math.round((10+s.armor*8/100)*(1-e.defMagRed)*1.5)}),") /"," ",Math.round((12+s.armor*8/100)*(1-e.defMagRed))," ","(",a.jsx("span",{className:"stat--critChance",children:Math.round((12+s.armor*8/100)*(1-e.defMagRed)*1.5)}),") /"," ",Math.round((14+s.armor*8/100)*(1-e.defMagRed))," ","(",a.jsx("span",{className:"stat--critChance",children:Math.round((14+s.armor*8/100)*(1-e.defMagRed)*1.5)}),") /"," ",Math.round((16+s.armor*8/100)*(1-e.defMagRed))," ","(",a.jsx("span",{className:"stat--critChance",children:Math.round((16+s.armor*8/100)*(1-e.defMagRed)*1.5)}),")"]}),a.jsx("h5",{children:"Bonus Resistance:"}),a.jsxs("p",{className:"stat--armor",children:["Armor:"," ",Math.round(30+s.armor*55/100)," /"," ",Math.round(30+s.armor*60/100)," /"," ",Math.round(30+s.armor*65/100)," /"," ",Math.round(30+s.armor*70/100)]}),a.jsxs("p",{className:"stat--magres",children:["Magic Resistance:"," ",Math.round(10+s.magres*35/100)," /"," ",Math.round(10+s.magres*40/100)," /"," ",Math.round(10+s.magres*45/100)," /"," ",Math.round(10+s.magres*50/100)]}),a.jsxs("p",{children:[a.jsx("b",{children:"Spiked Shell:"}),"  Attacks deal ",a.jsxs("span",{className:"stat--ap",children:["10 / 12 / 14 / 16 (",a.jsx("span",{className:"stat--armor",children:"+8% Armor"}),") bonus magic damage"]})]}),a.jsxs("p",{children:[a.jsx("b",{children:"Active:"})," Brace for up to 6 seconds, ",a.jsx("span",{className:"stat--moveSpeed",children:"slowing Rammus by 30%"})," while gaining ",a.jsx("span",{className:"stat--armor",children:"30 (+ 55 / 60 / 65 / 70% Armor)"})," and ",a.jsx("span",{className:"stat--magres",children:"10 (+35 / 40 / 45 / 50% Magic Resistance)"}),". While curled Spiked Shell deals ",a.jsx("span",{className:"stat--critChance",children:"50%"})," more damage and also applies to enemies that attack Rammus."]}),a.jsxs("p",{children:["Deals 175% damage to monsters. ",a.jsx("br",{}),"Activating cancels ",a.jsx("b",{children:"Powerball"})," and puts it on cooldown."]})]})},{description:a.jsxs("div",{className:"abilityDescription",children:[a.jsxs("h4",{children:[a.jsx("span",{className:"marker--ability",children:"3"})," FRENZYING TAUNT"]}),a.jsxs("h5",{children:["Cooldown:"," ",(15*e.atkcdr).toFixed(1)," /"," ",(14*e.atkcdr).toFixed(1)," /"," ",(13*e.atkcdr).toFixed(1)," /"," ",(12*e.atkcdr).toFixed(1)]}),a.jsxs("h5",{className:"stat--mana",children:["Cost:"," ",50]}),a.jsxs("p",{children:["Taunts an enemy champion or monster for ",a.jsx("b",{children:"1.25/1.5/1.75/2 seconds"}),"  and gain ",a.jsxs("abbr",{title:"35 / 45 / 55 / 65%",className:"stat--as",children:[(r.asBase*35/100).toFixed(3)," / ",(r.asBase*45/100).toFixed(3)," / ",(r.asBase*55/100).toFixed(3)," / ",(r.asBase*65/100).toFixed(3)," Attack Speed"]})," for 5 seconds."]})]})},{description:a.jsxs("div",{className:"abilityDescription",children:[a.jsxs("h4",{children:[a.jsx("span",{className:"marker--ability",children:"ULT"})," SOARING SLAM"]}),a.jsxs("h5",{children:["Cooldown:"," ",(65*e.atkcdr).toFixed(1)," /"," ",(80*e.atkcdr).toFixed(1)," /"," ",(65*e.atkcdr).toFixed(1)]}),a.jsxs("h5",{className:"stat--mana",children:["Cost:"," ",100]}),a.jsx("h5",{className:"stat--ap",children:"Impact damage:"}),a.jsxs("p",{className:"stat--ap",children:["Pre-mitigation:"," ",Math.round(75+s.ap*50/100)," /"," ",Math.round(150+s.ap*50/100)," /"," ",Math.round(225+s.ap*50/100)]}),a.jsxs("p",{className:"stat--ap",children:["Post-mitigation:"," ",Math.round((75+s.ap*50/100)*(1-e.defMagRed))," /"," ",Math.round((150+s.ap*50/100)*(1-e.defMagRed))," /"," ",Math.round((225+s.ap*50/100)*(1-e.defMagRed))]}),a.jsx("h5",{className:"stat--ap",children:"Aftershock damage/second:"}),a.jsxs("p",{className:"stat--ap",children:["Pre-mitigation:"," ",Math.round(30+s.ap*20/100)," /"," ",Math.round(45+s.ap*20/100)," /"," ",Math.round(60+s.ap*20/100)]}),a.jsxs("p",{className:"stat--ap",children:["Post-mitigation:"," ",Math.round((30+s.ap*20/100)*(1-e.defMagRed))," /"," ",Math.round((45+s.ap*20/100)*(1-e.defMagRed))," /"," ",Math.round((60+s.ap*20/100)*(1-e.defMagRed))]}),a.jsxs("p",{children:["Hop into the air and slam down, dealing ",a.jsx("span",{className:"stat--ap",children:"75 / 150 / 225 (+50% AP) magic damage"})," and creating aftershocks for 4 seconds."]}),a.jsxs("p",{children:["Aftershocks deal ",a.jsx("span",{className:"stat--ap",children:"30 / 45 / 60 (+20% AP) magic damage"})," every second and ",a.jsx("span",{className:"stat--moveSpeed",children:"slow enemies incrementally by 10 / 12 / 14%"}),", stacking up to ",a.jsx("span",{className:"stat--moveSpeed",children:"50 / 60 / 70%"}),"."]}),a.jsxs("p",{children:["If used during ",a.jsx("b",{children:"Powerball"}),", ",a.jsx("b",{children:"Powerball's"})," effect are applied at the center of the landing zone."]}),a.jsxs("p",{children:[a.jsx("b",{children:"Soaring Slam's"})," range increases with Movement Speed. Aftershocks damage structures."]})]})}];return a.jsx(a.Fragment,{children:i.map((d,t)=>a.jsx("div",{className:"abilitiesTile",children:a.jsx("div",{children:d.description},t)}))})}export{h as default};
