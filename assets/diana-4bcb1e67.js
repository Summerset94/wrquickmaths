import{j as a}from"./index-77f38fe5.js";function o({currentLevel:i,mod:e,bonus:r,atk:s,def:c,champ:h}){const n=[{description:a.jsxs("div",{className:"abilityDescription",children:[a.jsxs("h4",{children:[a.jsx("span",{className:"marker--ability",children:"P"})," MOONSILVER BLADE"]}),a.jsx("h5",{className:"stat--ap",children:a.jsxs("abbr",{title:"pre-post mitigation",children:["Damage: ",Math.round(15+15*i+s.ap*50/100)," /"," ",Math.round((15+15*i+s.ap*50/100)*(1-e.defMagRed))]})}),a.jsxs("h5",{className:"stat--as",children:["Attack Speed: ",(.667*(25+5*i)/100).toFixed(3)]}),a.jsxs("p",{children:["Using an ability causes Diana's next 3 attacks to gain ",a.jsxs("abbr",{title:"30-100% based on level",className:"stat--as",children:[25+5*i,"% Attack speed"]})," for 4 seconds. ",a.jsx("br",{}),"Every thid attack deals ",a.jsxs("abbr",{title:"30-240 based on level",className:"stat--ap",children:[15+15*i," (+50% AP) magic damage"]})," in an area. ",a.jsx("br",{}),"Deals 50% damage to structures, and 110% damage to monsters."]})]})},{description:a.jsxs("div",{className:"abilityDescription",children:[a.jsxs("h4",{children:[a.jsx("span",{className:"marker--ability",children:"1"})," CRESCENT STRIKE"]}),a.jsxs("h5",{children:["Cooldown:"," ",(9*e.atkcdr).toFixed(1)," /"," ",(8*e.atkcdr).toFixed(1)," /"," ",(7*e.atkcdr).toFixed(1)," /"," ",(6*e.atkcdr).toFixed(1)]}),a.jsxs("h5",{className:"stat--mana",children:["Cost:"," ",55," /"," ",65," /"," ",75," /"," ",85]}),a.jsx("h5",{className:"stat--ap",children:"Damage:"}),a.jsxs("p",{className:"stat--ad",children:["Pre-mitigation:"," ",Math.round(60+s.ap*70/100)," /"," ",Math.round(105+s.ap*70/100)," /"," ",Math.round(150+s.ap*70/100)," /"," ",Math.round(195+s.ap*70/100)]}),a.jsxs("p",{className:"stat--ad",children:["Post-mitigation:"," ",Math.round((60+s.ap*70/100)*(1-e.defMagRed))," /"," ",Math.round((105+s.ap*70/100)*(1-e.defMagRed))," /"," ",Math.round((150+s.ap*70/100)*(1-e.defMagRed))," /"," ",Math.round((195+s.ap*70/100)*(1-e.defMagRed))]}),a.jsxs("p",{children:["Unleashes an arcing bolt of energy that deals ",a.jsx("span",{className:"stat--ap",children:" 60 / 105 / 150 / 195 (+70% AP) magic damage "}),"and applies ",a.jsx("b",{children:"Moonlight"})," for 3 seconds."]})]})},{description:a.jsxs("div",{className:"abilityDescription",children:[a.jsxs("h4",{children:[a.jsx("span",{className:"marker--ability",children:"2"})," PALE CASCADE"]}),a.jsxs("h5",{children:["Cooldown:"," ",(13*e.atkcdr).toFixed(1)," /"," ",(11.5*e.atkcdr).toFixed(1)," /"," ",(10*e.atkcdr).toFixed(1)," /"," ",(8.5*e.atkcdr).toFixed(1)]}),a.jsxs("h5",{className:"stat--mana",children:["Cost:"," ",70," /"," ",70," /"," ",70," /"," ",70]}),a.jsx("h5",{className:"stat--ap",children:"Damage per sphere:"}),a.jsxs("p",{className:"stat--ad",children:["Pre-mitigation:"," ",Math.round(25+s.ap*20/100)," /"," ",Math.round(40+s.ap*20/100)," /"," ",Math.round(55+s.ap*20/100)," /"," ",Math.round(70+s.ap*20/100)]}),a.jsxs("p",{className:"stat--ad",children:["Post-mitigation:"," ",Math.round((25+s.ap*20/100)*(1-e.defMagRed))," /"," ",Math.round((40+s.ap*20/100)*(1-e.defMagRed))," /"," ",Math.round((55+s.ap*20/100)*(1-e.defMagRed))," /"," ",Math.round((70+s.ap*20/100)*(1-e.defMagRed))]}),a.jsx("h5",{className:"stat--hp",children:"Shield:"}),a.jsxs("p",{className:"stat--hp",children:[Math.round(40)+s.ap*40/100," /"," ",Math.round(60)+s.ap*40/100," /"," ",Math.round(80)+s.ap*40/100," /"," ",Math.round(100)+s.ap*40/100]}),a.jsxs("p",{children:["Creates 3 spheres that orbit Diana for 5 seconds. Upon contact with enemies the spheres detonate, dealing ",a.jsx("span",{className:"stat--ap",children:"25 / 40 / 55 / 70 (+20% AP) magic damage"}),". Also grants a shield that absorbs ",a.jsx("span",{className:"stat--hp",children:" 40 / 60 / 80 / 100 (+40% AP) damage"}),". If the third sphere detonates, the shield is increased by ",a.jsx("span",{className:"stat--hp",children:" 40 / 60 / 80 / 100 (+40% AP)"}),"."]})]})},{description:a.jsxs("div",{className:"abilityDescription",children:[a.jsxs("h4",{children:[a.jsx("span",{className:"marker--ability",children:"3"})," LUNAR RUSH"]}),a.jsxs("h5",{children:["Cooldown:"," ",(18*e.atkcdr).toFixed(1)," /"," ",(16*e.atkcdr).toFixed(1)," /"," ",(14*e.atkcdr).toFixed(1)," /"," ",(12*e.atkcdr).toFixed(1)]}),a.jsxs("h5",{className:"stat--mana",children:["Cost:"," ",20," /"," ",20," /"," ",20," /"," ",20]}),a.jsxs("p",{children:["Dashes to a point near an enemy, dealing ",a.jsx("span",{className:"stat--ap",children:"40 / 75 / 110 / 145 (+25% AP) magic damage "}),"and removing Moonlight in an area. ",a.jsx("br",{}),"Lunar Rush's Cooldown is reduced to 0.5 seconds if it removes ",a.jsx("b",{children:"Moonlight"})," from an enemy."]})]})},{description:a.jsxs("div",{className:"abilityDescription",children:[a.jsxs("h4",{children:[a.jsx("span",{className:"marker--ability",children:"ULT"})," MOONFALL"]}),a.jsxs("h5",{children:["Cooldown:"," ",(70*e.atkcdr).toFixed(1)," /"," ",(65*e.atkcdr).toFixed(1)," /"," ",(60*e.atkcdr).toFixed(1)]}),a.jsxs("h5",{className:"stat--mana",children:["Cost:"," ",100," /"," ",100," /"," ",100]}),a.jsx("h5",{className:"stat--ap",children:"Minimum damage:"}),a.jsxs("p",{className:"stat--ad",children:["Pre-mitigation:"," ",Math.round(150+s.ap*40/100)," /"," ",Math.round(200+s.ap*40/100)," /"," ",Math.round(250+s.ap*40/100)]}),a.jsxs("p",{className:"stat--ad",children:["Post-mitigation:"," ",Math.round((150+s.ap*40/100)*(1-e.defMagRed))," /"," ",Math.round((200+s.ap*40/100)*(1-e.defMagRed))," /"," ",Math.round((250+s.ap*40/100)*(1-e.defMagRed))]}),a.jsx("h5",{className:"stat--ap",children:"Maximum damage:"}),a.jsxs("p",{className:"stat--ad",children:["Pre-mitigation:"," ",Math.round(300+s.ap*80/100)," /"," ",Math.round(400+s.ap*80/100)," /"," ",Math.round(500+s.ap*80/100)]}),a.jsxs("p",{className:"stat--ad",children:["Post-mitigation:"," ",Math.round((300+s.ap*80/100)*(1-e.defMagRed))," /"," ",Math.round((400+s.ap*80/100)*(1-e.defMagRed))," /"," ",Math.round((500+s.ap*80/100)*(1-e.defMagRed))]}),a.jsxs("p",{children:[a.jsx("b",{children:"HOLD:"})," Summons the moon, slowing enemies by ",a.jsx("span",{className:"stat--moveSpeed",children:"20%"})," and applying ",a.jsx("b",{children:"Moonlight"})," in a growing area.",a.jsx("b",{children:"RELEASE:"})," Slams the moon down, spiraling enemies toward Diana and dealing ",a.jsx("span",{className:"stat--ap",children:"150 / 200 / 250 (+40% AP) to 300 / 400 / 500 (+80% AP) magic damage"})," (scaling with charge time)."]})]})}];return a.jsx(a.Fragment,{children:n.map((t,d)=>a.jsx("div",{className:"abilitiesTile",children:a.jsx("div",{children:t.description},d)}))})}export{o as default};