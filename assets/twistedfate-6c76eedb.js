import{r,j as a}from"./index-2f9a7f7a.js";function N({currentLevel:x,mod:e,bonus:o,atk:s,def:j,champ:n,updateAbilitiesBonus:d}){const[c,i]=r.useState(0);r.useEffect(()=>{d({twistedFateE:c})},[c]);const l=()=>{i(t=>t<4?t+1:0)},h=[{description:a.jsxs("div",{className:"abilityDescription",children:[a.jsxs("h4",{children:[a.jsx("span",{className:"marker--ability",children:"P"})," LOADED DICE"]}),a.jsxs("p",{children:["Gain ",a.jsx("span",{className:"stat--armor",children:"2 to 12 bonus gold"}),"  upon killing a unit."]})]})},{description:a.jsxs("div",{className:"abilityDescription",children:[a.jsxs("h4",{children:[a.jsx("span",{className:"marker--ability",children:"1"})," WILD CARDS"]}),a.jsxs("h5",{children:["Cooldown:"," ",(6*e.atkcdr).toFixed(1)]}),a.jsxs("h5",{className:"stat--mana",children:["Cost:"," ",60," /"," ",70," /"," ",80," /"," ",90]}),a.jsx("h5",{className:"stat--ap",children:"Damage:"}),a.jsxs("p",{className:"stat--ap",children:["Pre-mitigation:"," ",Math.round(60+s.ap*70/100)," /"," ",Math.round(120+s.ap*70/100)," /"," ",Math.round(180+s.ap*70/100)," /"," ",Math.round(240+s.ap*70/100)]}),a.jsxs("p",{className:"stat--ap",children:["Post-mitigation:"," ",Math.round((60+s.ap*70/100)*(1-e.defMagRed))," /"," ",Math.round((120+s.ap*70/100)*(1-e.defMagRed))," /"," ",Math.round((180+s.ap*70/100)*(1-e.defMagRed))," /"," ",Math.round((240+s.ap*70/100)*(1-e.defMagRed))]}),a.jsx("br",{}),a.jsxs("p",{children:["Throws three cards, dealing ",a.jsx("span",{className:"stat--ap",children:"60 / 120 / 180 / 240 (+70% AP) magic damage"})]})]})},{description:a.jsxs("div",{className:"abilityDescription",children:[a.jsxs("h4",{children:[a.jsx("span",{className:"marker--ability",children:"2"})," PICK A CARD"]}),a.jsxs("h5",{children:["Cooldown:"," ",(7*e.atkcdr).toFixed(1)," /"," ",(6.5*e.atkcdr).toFixed(1)," /"," ",(6*e.atkcdr).toFixed(1)," /"," ",(5.5*e.atkcdr).toFixed(1)]}),a.jsxs("h5",{className:"stat--mana",children:["Cost:"," ",40," /"," ",60," /"," ",80," /"," ",100]}),a.jsx("h5",{className:"stat--ap",children:"Damage:"}),a.jsxs("p",{className:"stat--ap",children:["Pre-mitigation:",a.jsxs("span",{className:"stat--vamp",children:[" ",Math.round(30+s.ap*65/100+s.attack*100/100)]})," -"," ",a.jsx("span",{className:"stat--mana",children:Math.round(40+s.ap*80/100+s.attack*100/100)})," -"," ",a.jsx("span",{className:"stat--armor",children:Math.round(15+s.ap*50/100+s.attack*100/100)})," /",a.jsxs("span",{className:"stat--vamp",children:[" ",Math.round(50+s.ap*65/100+s.attack*100/100)]})," -"," ",a.jsx("span",{className:"stat--mana",children:Math.round(65+s.ap*80/100+s.attack*100/100)})," -"," ",a.jsx("span",{className:"stat--armor",children:Math.round(25+s.ap*50/100+s.attack*100/100)})," /",a.jsxs("span",{className:"stat--vamp",children:[" ",Math.round(70+s.ap*65/100+s.attack*100/100)]})," -"," ",a.jsx("span",{className:"stat--mana",children:Math.round(90+s.ap*80/100+s.attack*100/100)})," -"," ",a.jsx("span",{className:"stat--armor",children:Math.round(35+s.ap*50/100+s.attack*100/100)})," /",a.jsxs("span",{className:"stat--vamp",children:[" ",Math.round(90+s.ap*65/100+s.attack*100/100)]})," -"," ",a.jsx("span",{className:"stat--mana",children:Math.round(115+s.ap*80/100+s.attack*100/100)})," -"," ",a.jsx("span",{className:"stat--armor",children:Math.round(45+s.ap*50/100+s.attack*100/100)})]}),a.jsxs("p",{className:"stat--ap",children:["Post-mitigation:",a.jsxs("span",{className:"stat--vamp",children:[" ",Math.round((30+s.ap*65/100+s.attack*100/100)*(1-e.defMagRed))]})," -"," ",a.jsx("span",{className:"stat--mana",children:Math.round((40+s.ap*80/100+s.attack*100/100)*(1-e.defMagRed))})," -"," ",a.jsx("span",{className:"stat--armor",children:Math.round((15+s.ap*50/100+s.attack*100/100)*(1-e.defMagRed))})," /",a.jsxs("span",{className:"stat--vamp",children:[" ",Math.round((50+s.ap*65/100+s.attack*100/100)*(1-e.defMagRed))]})," -"," ",a.jsx("span",{className:"stat--mana",children:Math.round((65+s.ap*80/100+s.attack*100/100)*(1-e.defMagRed))})," -"," ",a.jsx("span",{className:"stat--armor",children:Math.round((25+s.ap*50/100+s.attack*100/100)*(1-e.defMagRed))})," /",a.jsxs("span",{className:"stat--vamp",children:[" ",Math.round((70+s.ap*65/100+s.attack*100/100)*(1-e.defMagRed))]})," -"," "," ",a.jsx("span",{className:"stat--mana",children:Math.round((90+s.ap*80/100+s.attack*100/100)*(1-e.defMagRed))})," -"," ",a.jsx("span",{className:"stat--armor",children:Math.round((35+s.ap*50/100+s.attack*100/100)*(1-e.defMagRed))})," /",a.jsxs("span",{className:"stat--vamp",children:[" ",Math.round((90+s.ap*65/100+s.attack*100/100)*(1-e.defMagRed))]})," -"," ",a.jsx("span",{className:"stat--mana",children:Math.round((115+s.ap*80/100+s.attack*100/100)*(1-e.defMagRed))})," -"," ",a.jsx("span",{className:"stat--armor",children:Math.round((45+s.ap*50/100+s.attack*100/100)*(1-e.defMagRed))})]}),a.jsx("br",{}),a.jsxs("p",{children:[a.jsx("b",{children:"First Cast:"})," Start shuffling Twisted Fate's deck."]}),a.jsxs("p",{children:[a.jsx("b",{children:"Second Cast:"})," Pick a card to empower his next attack."]}),a.jsxs("p",{children:[a.jsx("b",{className:"stat--vamp",children:"Red Cards:"})," deal ",a.jsxs("span",{className:"stat--ap",children:["30 / 50 / 70 / 90 (+65% AP) (",a.jsx("span",{className:"stat--ad",children:"+100% AD"}),") magic damage"]})," in an area and ",a.jsx("span",{className:"stat--moveSpeed",children:"slow by 35/40/45/50%"})," for 3 seconds."]}),a.jsxs("p",{children:[a.jsx("b",{className:"stat--mana",children:"Blue Cards:"})," deal ",a.jsxs("span",{className:"stat--ap",children:["40 / 65 / 90 / 115 (+80% AP) (",a.jsx("span",{className:"stat--ad",children:"+100% AD"}),") magic damage"]})," and and restore ",a.jsx("span",{className:"stat--mana",children:"60/90/120/150 Mana"}),"."]}),a.jsxs("p",{children:[a.jsx("b",{className:"stat--armor",children:"Gold Cards:"})," deal ",a.jsxs("span",{className:"stat--ap",children:["15 / 25 / 35 / 45 (+50% AP) (",a.jsx("span",{className:"stat--ad",children:"+100% AD"}),") magic damage"]})," and stun for 1.25 / 1.5 / 1.75 / 2 second(s)."]})]})},{description:a.jsxs("div",{className:"abilityDescription",children:[a.jsxs("h4",{children:[a.jsx("span",{className:"marker--ability",children:"3"})," STACKED DECK"]}),a.jsxs("h5",{children:["Cooldown:"," ",(17*e.atkcdr).toFixed(1)," /"," ",(16*e.atkcdr).toFixed(1)," /"," ",(15*e.atkcdr).toFixed(1)," /"," ",(14*e.atkcdr).toFixed(1)]}),a.jsxs("h5",{className:"stat--mana",children:["Cost:"," ",50]}),a.jsx("h5",{className:"stat--ap",children:"Damage:"}),a.jsxs("p",{className:"stat--ap",children:["Pre-mitigation:"," ",Math.round(60+s.ap*45/100)," /"," ",Math.round(90+s.ap*45/100)," /"," ",Math.round(120+s.ap*45/100)," /"," ",Math.round(150+s.ap*45/100)]}),a.jsxs("p",{className:"stat--ap",children:["Post-mitigation:"," ",Math.round((60+s.ap*45/100)*(1-e.defMagRed))," /"," ",Math.round((90+s.ap*45/100)*(1-e.defMagRed))," /"," ",Math.round((120+s.ap*45/100)*(1-e.defMagRed))," /"," ",Math.round((150+s.ap*45/100)*(1-e.defMagRed))]}),a.jsxs("p",{children:["Toggle attack speed passive bonus:",a.jsx("button",{onClick:l,children:"Change ability level"})," Current ability level: ",a.jsx("b",{className:"stat--as",children:c})]}),a.jsx("br",{}),a.jsxs("p",{children:[a.jsx("b",{children:"Passive:"})," gain ",a.jsx("span",{className:"stat--as",children:"15 / 20 /  25 / 30% Attack Speed."}),". Every 4th attack deals ",a.jsx("span",{className:"stat--ap",children:"60 / 90 / 120 / 150 (+45% AP) bonus magic damage"})]}),a.jsxs("p",{children:[a.jsx("b",{children:"Active:"})," gain ",a.jsxs("span",{className:"stat--as",children:["40% (",(n.asBase*40/100).toFixed(3),") / 45% (",(n.asBase*45/100).toFixed(3),") / 50% (",(n.asBase*50/100).toFixed(3),") / 55% (",(n.asBase*55/100).toFixed(3),") Attack Speed"]})," for 3 seconds. During this time, attacking enemy champions rolls ",a.jsx("b",{children:"Loaded Dice"}),"."]})]})},{description:a.jsxs("div",{className:"abilityDescription",children:[a.jsxs("h4",{children:[a.jsx("span",{className:"marker--ability",children:"ULT"})," DESTINY"]}),a.jsxs("h5",{children:["Cooldown:"," ",(110*e.atkcdr).toFixed(1)," /"," ",(95*e.atkcdr).toFixed(1)," /"," ",(80*e.atkcdr).toFixed(1)]}),a.jsxs("h5",{className:"stat--mana",children:["Cost:"," ",100]}),a.jsx("br",{}),a.jsxs("p",{children:[a.jsx("b",{children:"First Cast:"})," Reveals all enemy champions for 6 / 7 / 8 seconds."]}),a.jsxs("p",{children:[a.jsx("b",{children:"Second Cast:"})," Channel for 1.5 seconds to teleport to target location."]})]})}];return a.jsx(a.Fragment,{children:h.map((t,p)=>a.jsx("div",{className:"abilitiesTile",children:a.jsx("div",{children:t.description},p)}))})}export{N as default};
