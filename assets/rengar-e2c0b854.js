import{r as l,j as a}from"./index-b8c5ed70.js";function g({currentLevel:i,mod:e,bonus:t,atk:s,def:j,champ:d,updateAbilitiesBonus:h}){const[r,o]=l.useState(0);l.useEffect(()=>{h({rengarP:r})},[r]);const p=n=>{n.preventDefault,o(c=>c<5?c+1:0)},x=[{description:a.jsxs("div",{className:"abilityDescription",children:[a.jsxs("h4",{children:[a.jsx("span",{className:"marker--ability",children:"P"})," UNSEEN PREDATOR"]}),a.jsxs("p",{children:["Toggle ",a.jsx("b",{children:"Bonetooth Necklace"})," bonus:",a.jsx("br",{}),a.jsx("button",{type:"button",onClick:p,children:"Change stacks number"})," Current stacks: ",a.jsx("b",{className:"stat--armor",children:r})]}),a.jsx("p",{children:"If Rengar is in brush or camouflaged, he will leap to the target within his next attack. If Rengar has no Ferocity he gains 1 Ferocity."}),a.jsx("p",{children:"Gains 1 Ferocity upon casting a basic ability. Reaching 4 Ferocity enhances his next basic ability, allowing it to be cast separately from the base version."}),a.jsx("p",{children:"All Ferocity is lost upon leaving combat."}),a.jsxs("p",{children:[a.jsx("b",{children:"Bonetooth Necklace:"})," Gains ",a.jsx("abbr",{title:"for 1 / 2 / 3 / 4 / 5 unique champions takedowns",className:"stat--ad",children:"1 / 4 / 9 / 16 / 25% bonus Attack Damage"})]})]})},{description:a.jsxs("div",{className:"abilityDescription",children:[a.jsxs("h4",{children:[a.jsx("span",{className:"marker--ability",children:"1"})," SAVAGERY"]}),a.jsxs("h5",{children:["Cooldown:"," ",(5.5*e.atkcdr).toFixed(1)," /"," ",(5*e.atkcdr).toFixed(1)," /"," ",(4.5*e.atkcdr).toFixed(1)," /"," ",(4*e.atkcdr).toFixed(1)]}),a.jsxs("h5",{className:"stat--ad",children:["Damage (",a.jsx("span",{className:"stat--critChance",children:"Ferocity"})," / normal):"]}),a.jsxs("p",{className:"stat--ad",children:["Pre-mitigation:"," ",a.jsx("span",{className:"stat--critChance",children:Math.round(25+i*15+s.attack*40/100)}),"  /"," ",Math.round(40+s.attack*5/100)," /"," ",Math.round(80+s.attack*10/100)," /"," ",Math.round(120+s.attack*15/100)," /"," ",Math.round(160+s.attack*20/100)]}),a.jsxs("p",{className:"stat--ad",children:["Post-mitigation:"," ",a.jsx("span",{className:"stat--critChance",children:Math.round((25+i*15+s.attack*40/100)*(1-e.defPhysRed))})," /"," ",Math.round((40+s.attack*5/100)*(1-e.defPhysRed))," /"," ",Math.round((80+s.attack*10/100)*(1-e.defPhysRed))," /"," ",Math.round((120+s.attack*15/100)*(1-e.defPhysRed))," /"," ",Math.round((160+s.attack*20/100)*(1-e.defPhysRed))]}),a.jsxs("p",{children:["Rengar's next 2 attacks within 3 seconds gain ",a.jsxs("abbr",{title:"40%",className:"stat--as",children:[(d.asBase*40/100).toFixed(3)," Attack Speed"]}),". The first attack is empowered to deal an additional ",a.jsx("span",{className:"stat--ad",children:"40 / 80 / 120 / 160 (+5 / 10 /15 / 20% AD) physical damage"}),"."]}),a.jsxs("p",{children:[a.jsx("b",{children:"Ferocity:"})," Gains ",a.jsxs("abbr",{title:"40-115% based on level",className:"stat--as",children:[(d.asBase*(40+75/14*(i-1))/100).toFixed(3)," Attack Speed"]})," for 5 seconds instead. The first attack deals an additional ",a.jsxs("abbr",{title:"40 + 15 per level",className:"stat--ad",children:[25+i*15," (+40% AD) physical damage"]})," instead."]})]})},{description:a.jsxs("div",{className:"abilityDescription",children:[a.jsxs("h4",{children:[a.jsx("span",{className:"marker--ability",children:"2"})," BATTLE ROAR"]}),a.jsxs("h5",{children:["Cooldown:"," ",(16*e.atkcdr).toFixed(1)," /"," ",(14*e.atkcdr).toFixed(1)," /"," ",(12*e.atkcdr).toFixed(1)," /"," ",(10*e.atkcdr).toFixed(1)]}),a.jsx("h5",{className:"stat--ap",children:"Damage:"}),a.jsxs("p",{className:"stat--ap",children:["Pre-mitigation:"," ",Math.round(60+s.ap*80/100)," /"," ",Math.round(100+s.ap*80/100)," /"," ",Math.round(140+s.ap*80/100)," /"," ",Math.round(180+s.ap*80/100)]}),a.jsxs("p",{className:"stat--ap",children:["Post-mitigation:"," ",Math.round((60+s.ap*80/100)*(1-e.defMagRed))," /"," ",Math.round((100+s.ap*80/100)*(1-e.defMagRed))," /"," ",Math.round((140+s.ap*80/100)*(1-e.defMagRed))," /"," ",Math.round((180+s.ap*80/100)*(1-e.defMagRed))]}),a.jsx("h5",{className:"stat--critChance",children:"Ferocity damage:"}),a.jsxs("p",{className:"stat--critChance",children:["Pre-mitigation:"," ",Math.round(80+s.ap*80/100)," /"," ",Math.round(100+s.ap*80/100)," /"," ",Math.round(110+s.ap*80/100)," /"," ",Math.round(130+s.ap*80/100)]}),a.jsxs("p",{className:"stat--critChance",children:["Post-mitigation:"," ",Math.round((80+s.ap*80/100)*(1-e.defMagRed))," /"," ",Math.round((100+s.ap*80/100)*(1-e.defMagRed))," /"," ",Math.round((110+s.ap*80/100)*(1-e.defMagRed))," /"," ",Math.round((130+s.ap*80/100)*(1-e.defMagRed))]}),a.jsxs("p",{children:["Rengar roars, dealing ",a.jsx("span",{className:"stat--ap",children:"60 / 100 / 140 / 180 (+80% AP) magic damage"})," and ",a.jsx("span",{className:"stat--hp",children:" healing for 60%"})," of damage taken in the last 2 seconds."]}),a.jsxs("p",{children:[a.jsx("b",{children:"Ferocity: "})," Deals ",a.jsx("span",{className:"stat--ap",children:"80 / 100 / 110 / 130 (+80% AP) magic damage"})," instead. Rengar also gains ",a.jsxs("abbr",{title:"40%",className:"stat--moveSpeed",children:[Math.round(s.moveSpeed*40/100)," Movement Speed"]})," for 2.5 seconds and removes all crowd control effects from himself."]})]})},{description:a.jsxs("div",{className:"abilityDescription",children:[a.jsxs("h4",{children:[a.jsx("span",{className:"marker--ability",children:"3"})," BOLA STRIKE"]}),a.jsxs("h5",{children:["Cooldown:"," ",(10*e.atkcdr).toFixed(1)]}),a.jsxs("h5",{className:"stat--ad",children:["Damage(",a.jsx("span",{className:"stat--critChance",children:"Ferocity"})," / normal):"]}),a.jsxs("p",{className:"stat--ad",children:["Pre-mitigation:"," ",a.jsx("span",{className:"stat--critChance",children:Math.round(65+17.5*(i-1)+t.attack*80/100)})," /"," ",Math.round(60+t.attack*80/100)," /"," ",Math.round(120+t.attack*80/100)," /"," ",Math.round(180+t.attack*80/100)," /"," ",Math.round(240+t.attack*80/100)]}),a.jsxs("p",{className:"stat--ad",children:["Post-mitigation:"," ",a.jsx("span",{className:"stat--critChance",children:Math.round((65+17.5*(i-1)+t.attack*80/100)*(1-e.defPhysRed))})," /"," ",Math.round((60+t.attack*80/100)*(1-e.defPhysRed))," /"," ",Math.round((120+t.attack*80/100)*(1-e.defPhysRed))," /"," ",Math.round((180+t.attack*80/100)*(1-e.defPhysRed))," /"," ",Math.round((240+t.attack*80/100)*(1-e.defPhysRed))]}),a.jsxs("p",{children:["Throws a bola that deals ",a.jsx("span",{className:"stat--ad",children:"60 / 120 / 180 / 240 (+80% bonus AD) physical damage"})," and ",a.jsx("span",{className:"stat--moveSpeed",children:"slows by 30 / 50 / 70 / 90% "})," for 1.75 seconds."]}),a.jsxs("p",{children:[a.jsx("b",{children:"Ferocity:"})," Deals ",a.jsxs("abbr",{title:"65 + 17.5 per level",className:"stat--ad",children:[Math.round(65+17.5*(i-1))," (+80% bonus AD) physical damage"]})," and ",a.jsx("b",{children:"roots"})," instead."]})]})},{description:a.jsxs("div",{className:"abilityDescription",children:[a.jsxs("h4",{children:[a.jsx("span",{className:"marker--ability",children:"ULT"})," THRILL OF THE HUNT"]}),a.jsxs("h5",{children:["Cooldown:"," ",(90*e.atkcdr).toFixed(1)," /"," ",(75*e.atkcdr).toFixed(1)," /"," ",(60*e.atkcdr).toFixed(1)]}),a.jsxs("p",{children:["Gains ",a.jsxs("abbr",{title:"30 / 40 / 50%",className:"stat--moveSpeed",children:[Math.round(s.moveSpeed*30/100)," / ",Math.round(s.moveSpeed*40/100)," / ",Math.round(s.moveSpeed*50/100)," Move Speed"]})," and reveals the nearest enemy champion for 12 / 14 / 16 seconds."]}),a.jsxs("p",{children:["Rengar becomes ",a.jsx("b",{children:"camouflaged"})," after 1 second and can leap without being in a bush. Leaping to an enemy champion shreds target's armor by ",a.jsx("abbr",{title:"applies before armor penetration. Theoretically can lower armor below 0",className:"stat--ad",children:"16 / 24 / 32 for 4 seconds"})," ."]})]})}];return a.jsx(a.Fragment,{children:x.map((n,c)=>a.jsx("div",{className:"abilitiesTile",children:a.jsx("div",{children:n.description},c)}))})}export{g as default};
