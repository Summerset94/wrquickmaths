import{j as a}from"./index-67d5e236.js";function o({currentLevel:d,mod:e,bonus:t,atk:s,def:r,champ:h}){const i=[{description:a.jsxs("div",{className:"abilityDescription",children:[a.jsxs("h4",{children:[a.jsx("span",{className:"marker--ability",children:"P"})," LIGHTSLINGER"]}),a.jsx("p",{children:"After using an Ability, Lucian's next attack within 3.5 seconds will fire two shots."}),a.jsxs("p",{children:["The second shot deals ",a.jsx("abbr",{title:"at level 1 / 6 /11",className:"stat--ad",children:"50% / 55% / 60% physical damage"}),", increased to ",a.jsx("span",{className:"stat--ad",children:"100%"}),"  against minions. The second shot is a separate Attack that deals on-hit effects and can ",a.jsx("span",{className:"stat--critChance",children:"critical strike"}),"."]})]})},{description:a.jsxs("div",{className:"abilityDescription",children:[a.jsxs("h4",{children:[a.jsx("span",{className:"marker--ability",children:"1"}),"  PIERCING LIGHT"]}),a.jsxs("h5",{children:["Cooldown:"," ",(9.5*e.atkcdr).toFixed(1)," /"," ",(8*e.atkcdr).toFixed(1)," /"," ",(6.5*e.atkcdr).toFixed(1)," /"," ",(5*e.atkcdr).toFixed(1)]}),a.jsxs("h5",{className:"stat--mana",children:["Cost:"," ",50," /"," ",60," /"," ",70," /"," ",80]}),a.jsx("h5",{className:"stat--ad",children:"Damage:"}),a.jsxs("p",{className:"stat--ad",children:["Pre-mitigation:"," ",Math.round(110+t.attack*60/100)," /"," ",Math.round(150+t.attack*80/100)," /"," ",Math.round(190+t.attack*100/100)," /"," ",Math.round(230+t.attack*120/100)]}),a.jsxs("p",{className:"stat--ad",children:["Post-mitigation:"," ",Math.round((110+t.attack*60/100)*(1-e.defPhysRed))," /"," ",Math.round((150+t.attack*80/100)*(1-e.defPhysRed))," /"," ",Math.round((190+t.attack*100/100)*(1-e.defPhysRed))," /"," ",Math.round((230+t.attack*120/100)*(1-e.defPhysRed))]}),a.jsxs("p",{children:["Shoots a bolt of piercing light through an enemy unit, damaging enemies in a line for ",a.jsx("span",{className:"stat--ad",children:"110 / 150 / 190 / 230 (+60 / 80 / 100 / 120% bonus AD) physical damage"}),"."]}),a.jsxs("p",{children:["Cast time decreases as Bucian's attack speed increases (up to ",a.jsx("span",{className:"stat--as",children:"140% bonus attack speed"}),")."]})]})},{description:a.jsxs("div",{className:"abilityDescription",children:[a.jsxs("h4",{children:[a.jsx("span",{className:"marker--ability",children:"2"})," ARDENT BLAZE"]}),a.jsxs("h5",{children:["Cooldown:"," ",(13*e.atkcdr).toFixed(1)," /"," ",(12*e.atkcdr).toFixed(1)," /"," ",(11*e.atkcdr).toFixed(1)," /"," ",(10*e.atkcdr).toFixed(1)]}),a.jsxs("h5",{className:"stat--mana",children:["Cost:"," ",70]}),a.jsx("h5",{className:"stat--ap",children:"Damage:"}),a.jsxs("p",{className:"stat--ap",children:["Pre-mitigation:"," ",Math.round(75+s.ap*90/100)," /"," ",Math.round(120+s.ap*90/100)," /"," ",Math.round(165+s.ap*90/100)," /"," ",Math.round(210+s.ap*90/100)]}),a.jsxs("p",{className:"stat--ap",children:["Post-mitigation:"," ",Math.round((75+s.ap*90/100)*(1-e.defMagRed))," /"," ",Math.round((120+s.ap*90/100)*(1-e.defMagRed))," /"," ",Math.round((165+s.ap*90/100)*(1-e.defMagRed))," /"," ",Math.round((210+s.ap*90/100)*(1-e.defMagRed))]}),a.jsxs("p",{children:["Fires a shot that explodes at the end of its range or on the first enemy hit, dealing ",a.jsx("span",{className:"stat--ap",children:"75 / 120 / 165 / 210 (+90% AP) magic damage"}),", briefly revealing enemies and marking them for 6 seconds."]}),a.jsxs("p",{children:["When Lucian or an ally damage a market enemy, Lucian gains ",a.jsx("span",{className:"stat--moveSpeed",children:" 65 / 70 / 75 /80  Movement Speed"})," for 1 second."]})]})},{description:a.jsxs("div",{className:"abilityDescription",children:[a.jsxs("h4",{children:[a.jsx("span",{className:"marker--ability",children:"3"})," RELENTLESS PURSUIT"]}),a.jsxs("h5",{children:["Cooldown:"," ",(23*e.atkcdr).toFixed(1)," /"," ",(20*e.atkcdr).toFixed(1)," /"," ",(17*e.atkcdr).toFixed(1)," /"," ",(14*e.atkcdr).toFixed(1)]}),a.jsxs("h5",{className:"stat--mana",children:["Cost:"," ",45," /"," ",30," /"," ",15," /"," ",0]}),a.jsx("p",{children:"Quickly dashes a short distance."}),a.jsx("p",{children:"Cooldown is reduced by 1 second whenever Lucian hits an enemy with Lightslinger (2 seconds for champions)."})]})},{description:a.jsxs("div",{className:"abilityDescription",children:[a.jsxs("h4",{children:[a.jsx("span",{className:"marker--ability",children:"ULT"})," THE CULLING"]}),a.jsxs("h5",{children:["Cooldown:"," ",(70*e.atkcdr).toFixed(1)," /"," ",(65*e.atkcdr).toFixed(1)," /"," ",(60*e.atkcdr).toFixed(1)]}),a.jsxs("h5",{className:"stat--mana",children:["Cost:"," ",100]}),a.jsx("h5",{className:"stat--ad",children:"Shot damage:"}),a.jsxs("p",{className:"stat--ad",children:["Pre-mitigation:"," ",Math.round(20+s.attack*25/100+s.ap*10/100)," /"," ",Math.round(40+s.attack*25/100+s.ap*10/100)," /"," ",Math.round(60+s.attack*25/100+s.ap*10/100)]}),a.jsxs("p",{className:"stat--ad",children:["Post-mitigation:"," ",Math.round((20+s.attack*25/100+s.ap*10/100)*(1-e.defPhysRed))," /"," ",Math.round((40+s.attack*25/100+s.ap*10/100)*(1-e.defPhysRed))," /"," ",Math.round((60+s.attack*25/100+s.ap*10/100)*(1-e.defPhysRed))]}),a.jsx("h5",{className:"stat--critChance",children:"Total damage:"}),a.jsxs("p",{className:"stat--ad",children:["Pre-mitigation:"," ",Math.round((20+s.attack*25/100+s.ap*10/100)*22)," /"," ",Math.round((40+s.attack*25/100+s.ap*10/100)*26)," /"," ",Math.round((60+s.attack*25/100+s.ap*10/100)*30)]}),a.jsxs("p",{className:"stat--ad",children:["Post-mitigation:"," ",Math.round((20+s.attack*25/100+s.ap*10/100)*(1-e.defPhysRed))*22," /"," ",Math.round((40+s.attack*25/100+s.ap*10/100)*(1-e.defPhysRed))*26," /"," ",Math.round((60+s.attack*25/100+s.ap*10/100)*(1-e.defPhysRed))*30]}),a.jsxs("p",{children:["Fires rapidly in a direction for 3 seconds. Each shot deals ",a.jsxs("span",{className:"stat--ad",children:["20 / 40 / 60 (+25% AD) (",a.jsx("span",{className:"stat--ap",children:"+10% AP"}),") physical damage"]})," to the first enemy hit."]}),a.jsxs("p",{children:[a.jsx("b",{children:"Total Number Of Shots:"})," 22 / 26 / 30"]}),a.jsxs("p",{children:["Lucian may use Relentless Pursuit during the Culling. ",a.jsx("br",{}),"Recast to cancel early. ",a.jsx("br",{}),"Minions take 200% damage from The Culling."]})]})}];return a.jsx(a.Fragment,{children:i.map((n,c)=>a.jsx("div",{className:"abilitiesTile",children:a.jsx("div",{children:n.description},c)}))})}export{o as default};