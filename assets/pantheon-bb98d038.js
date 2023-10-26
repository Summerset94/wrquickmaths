import{j as a}from"./index-5461ade0.js";function p({currentLevel:e,mod:s,bonus:t,atk:c,def:n,champ:r}){const i=[{description:a.jsxs("div",{className:"abilityDescription",children:[a.jsxs("h4",{children:[a.jsx("span",{className:"marker--ability",children:"P"})," MORTAL WILL"]}),a.jsx("p",{children:"After 5 seconds or abilities Pantheon's next basic ability is enhanced."})]})},{description:a.jsxs("div",{className:"abilityDescription",children:[a.jsxs("h4",{children:[a.jsx("span",{className:"marker--ability",children:"1"})," COMET SPEAR"]}),a.jsxs("h5",{children:["Cooldown:"," ",(9.5*s.atkcdr).toFixed(1)," /"," ",(9*s.atkcdr).toFixed(1)," /"," ",(8.5*s.atkcdr).toFixed(1)," /"," ",(8*s.atkcdr).toFixed(1)]}),a.jsxs("h5",{className:"stat--mana",children:["Cost:"," ",40]}),a.jsxs("h5",{className:"stat--ad",children:["Normal Damage (",a.jsx("span",{className:"stat--critChance",children:"crit"})," ):"]}),a.jsxs("p",{className:"stat--ad",children:["Pre-mitigation:"," ",Math.round(70+t.attack*120/100)," ","(",a.jsx("span",{className:"stat--critChance",children:Math.round(110+t.attack*165/100)}),") /"," ",Math.round(110+t.attack*120/100)," ","(",a.jsx("span",{className:"stat--critChance",children:Math.round(200+t.attack*165/100)}),") /"," ",Math.round(150+t.attack*120/100)," ","(",a.jsx("span",{className:"stat--critChance",children:Math.round(290+t.attack*165/100)}),") /"," ",Math.round(190+t.attack*120/100)," ","(",a.jsx("span",{className:"stat--critChance",children:Math.round(380+t.attack*165/100)}),")"]}),a.jsxs("p",{className:"stat--ad",children:["Post-mitigation:"," ",Math.round((70+t.attack*120/100)*(1-s.defPhysRed))," ","(",a.jsx("span",{className:"stat--critChance",children:Math.round((110+t.attack*165/100)*(1-s.defPhysRed))}),") /"," ",Math.round((110+t.attack*120/100)*(1-s.defPhysRed))," ","(",a.jsx("span",{className:"stat--critChance",children:Math.round((200+t.attack*165/100)*(1-s.defPhysRed))}),") /"," ",Math.round((150+t.attack*120/100)*(1-s.defPhysRed))," ","(",a.jsx("span",{className:"stat--critChance",children:Math.round((290+t.attack*165/100)*(1-s.defPhysRed))}),") /"," ",Math.round((190+t.attack*120/100)*(1-s.defPhysRed))," ","(",a.jsx("span",{className:"stat--critChance",children:Math.round((380+t.attack*165/100)*(1-s.defPhysRed))}),")"]}),a.jsxs("h5",{className:"stat--ad",children:["Mortal Will (",a.jsx("span",{className:"stat--critChance",children:"crit"})," ):"]}),a.jsxs("p",{className:"stat--ad",children:["Pre-mitigation:"," ",Math.round(70+t.attack*120/100+(15+15*e+t.attack*120/100))," ","(",a.jsx("span",{className:"stat--critChance",children:Math.round(110+t.attack*165/100+(15+15*e+t.attack*120/100))}),") /"," ",Math.round(110+t.attack*120/100+(15+15*e+t.attack*120/100))," ","(",a.jsx("span",{className:"stat--critChance",children:Math.round(200+t.attack*165/100+(15+15*e+t.attack*120/100))}),") /"," ",Math.round(150+t.attack*120/100+(15+15*e+t.attack*120/100))," ","(",a.jsx("span",{className:"stat--critChance",children:Math.round(290+t.attack*165/100+(15+15*e+t.attack*120/100))}),") /"," ",Math.round(190+t.attack*120/100+(15+15*e+t.attack*120/100))," ","(",a.jsx("span",{className:"stat--critChance",children:Math.round(380+t.attack*165/100+(15+15*e+t.attack*120/100))}),")"]}),a.jsxs("p",{className:"stat--ad",children:["Post-mitigation:"," ",Math.round((70+t.attack*120/100+(15+15*e+t.attack*120/100))*(1-s.defPhysRed))," ","(",a.jsx("span",{className:"stat--critChance",children:Math.round((110+t.attack*165/100+(15+15*e+t.attack*120/100))*(1-s.defPhysRed))}),") /"," ",Math.round((110+t.attack*120/100+(15+15*e+t.attack*120/100))*(1-s.defPhysRed))," ","(",a.jsx("span",{className:"stat--critChance",children:Math.round((200+t.attack*165/100+(15+15*e+t.attack*120/100))*(1-s.defPhysRed))}),") /"," ",Math.round((150+t.attack*120/100+(15+15*e+t.attack*120/100))*(1-s.defPhysRed))," ","(",a.jsx("span",{className:"stat--critChance",children:Math.round((290+t.attack*165/100+(15+15*e+t.attack*120/100))*(1-s.defPhysRed))}),") /"," ",Math.round((190+t.attack*120/100+(15+15*e+t.attack*120/100))*(1-s.defPhysRed))," ","(",a.jsx("span",{className:"stat--critChance",children:Math.round((380+t.attack*165/100+(15+15*e+t.attack*120/100))*(1-s.defPhysRed))}),")"]}),a.jsxs("p",{children:[a.jsx("b",{children:"Tap-cast:"})," Stabs forward, dealing ",a.jsx("span",{className:"stat--ad",children:"70 / 110 / 150 / 190 (+130 bonus AD) physical damage"}),". Refunds 60% of Comet Spear's cooldown."]}),a.jsxs("p",{children:[a.jsx("b",{children:"Charge-cast:"})," Hurl the spear, dealing the same damage to the first enemy hit and 50% less to subsequent targets."]}),a.jsxs("p",{children:["Enemies below ",a.jsx("span",{className:"stat--hp",children:"35% Health"}),"  are critically hit for ",a.jsx("span",{className:"stat--critChance",children:"110 / 200 / 290 / 380 (+165% bonus AD) physical damage"})]}),a.jsx("p",{children:"Damage to minions reduced by 20%."}),a.jsxs("p",{children:[a.jsx("b",{children:"Mortal Will:"})," Deals an additional ",a.jsx("abbr",{className:"stat--ad",title:"30 + 15 per level",children:"30-240 (+120% bonus AD) physical damage"})]})]})},{description:a.jsxs("div",{className:"abilityDescription",children:[a.jsxs("h4",{children:[a.jsx("span",{className:"marker--ability",children:"2"})," SHIELD VAULT"]}),a.jsxs("h5",{children:["Cooldown:"," ",(12*s.atkcdr).toFixed(1)," /"," ",(11*s.atkcdr).toFixed(1)," /"," ",(10*s.atkcdr).toFixed(1)," /"," ",(9*s.atkcdr).toFixed(1)]}),a.jsxs("h5",{className:"stat--mana",children:["Cost:"," ",55]}),a.jsx("h5",{className:"stat--ad",children:"Damage:"}),a.jsxs("p",{className:"stat--ad",children:["Pre-mitigation:"," ",Math.round(70+c.ap*100/100)," /"," ",Math.round(120+c.ap*100/100)," /"," ",Math.round(170+c.ap*100/100)," /"," ",Math.round(220+c.ap*100/100)]}),a.jsxs("p",{className:"stat--ad",children:["Post-mitigation:"," ",Math.round((70+c.ap*100/100)*(1-s.defPhysRed))," /"," ",Math.round((120+c.ap*100/100)*(1-s.defPhysRed))," /"," ",Math.round((170+c.ap*100/100)*(1-s.defPhysRed))," /"," ",Math.round((220+c.ap*100/100)*(1-s.defPhysRed))]}),a.jsx("h5",{className:"stat--ad",children:"Mortal Will bonus:"}),a.jsxs("p",{className:"stat--ad",children:[" ",Math.round(c.attack*(135+2.142857142857143*(e-1))/100)," (",Math.round(c.attack*(135+2.142857142857143*(e-1))/100*(1-s.defPhysRed))," post-mitigation)"]}),a.jsxs("p",{children:["Dash to an enemy, stunning for 1 second and dealing ",a.jsxs("span",{className:"stat--ap",children:["70 / 120 / 170 / 220 (",a.jsx("span",{className:"stat--ap",children:"+100% AP"}),") physical damage"]})]}),a.jsxs("p",{children:["Mortal Will: Follows up with an attack that strikes 3 times, dealing a total of ",a.jsxs("abbr",{title:"135 - 165 based on level",className:"stat--ad",children:[Math.round(135+2.142857142857143*(e-1)),"% AD"]})]})]})},{description:a.jsxs("div",{className:"abilityDescription",children:[a.jsxs("h4",{children:[a.jsx("span",{className:"marker--ability",children:"3"})," AEGIS ASSAULT"]}),a.jsxs("h5",{children:["Cooldown:"," ",(15*s.atkcdr).toFixed(1)," /"," ",(14*s.atkcdr).toFixed(1)," /"," ",(13*s.atkcdr).toFixed(1)," /"," ",(12*s.atkcdr).toFixed(1)]}),a.jsxs("h5",{className:"stat--mana",children:["Cost:"," ",80]}),a.jsxs("h5",{className:"stat--ad",children:["Damage(",a.jsx("span",{className:"stat--critChance",children:"FLURRY"})," + slam):"]}),a.jsxs("p",{className:"stat--ad",children:["Pre-mitigation:",a.jsxs("b",{className:"stat--critChance",children:[" ",Math.round(c.attack)]})," +"," ",Math.round(60+t.attack*150/100)," /"," ",Math.round(120+t.attack*150/100)," /"," ",Math.round(180+t.attack*150/100)," /"," ",Math.round(240+t.attack*150/100)]}),a.jsxs("p",{className:"stat--ad",children:["Post-mitigation:",a.jsxs("b",{className:"stat--critChance",children:[" ",Math.round(c.attack*(1-s.defPhysRed))," "]})," +"," ",Math.round((60+t.attack*150/100)*(1-s.defPhysRed))," /"," ",Math.round((120+t.attack*150/100)*(1-s.defPhysRed))," /"," ",Math.round((180+t.attack*150/100)*(1-s.defPhysRed))," /"," ",Math.round((240+t.attack*150/100)*(1-s.defPhysRed))]}),a.jsxs("p",{children:["Block all non-tower damage from a direction for 1.5 seconds and deal ",a.jsx("span",{className:"stat--ad",children:"100% AD physical damage"})," to nearby enemies. At the end slam forward and deal ",a.jsx("span",{className:"stat--ad",children:"60 / 120 / 180 / 240 (+150% bonus AD) physical damage"}),"."]}),a.jsxs("p",{children:["Pantheon is ",a.jsx("span",{className:"stat-moveSpeed",children:"slowed by up to 50%"})," when moving away from the blocking direction."]}),a.jsx("p",{children:"Recast to end early. Damage to minions is reduced by 50%."}),a.jsxs("p",{children:[a.jsx("b",{children:"Mortal Will:"})," When Pantheon slams his shield he gains ",a.jsxs("abbr",{title:"60%",className:"stat--moveSpeed",children:[Math.round(c.moveSpeed*60/100)," Move Speed"]}),"  for 1.5 seconds."]})]})},{description:a.jsxs("div",{className:"abilityDescription",children:[a.jsxs("h4",{children:[a.jsx("span",{className:"marker--ability",children:"ULT"})," GRAND STARFALL"]}),a.jsxs("h5",{children:["Cooldown:"," ",(95*s.atkcdr).toFixed(1)," /"," ",(85*s.atkcdr).toFixed(1)," /"," ",(75*s.atkcdr).toFixed(1)]}),a.jsxs("h5",{className:"stat--mana",children:["Cost:"," ",100]}),a.jsx("h5",{className:"stat--ap",children:"Landing damage:"}),a.jsxs("p",{className:"stat--ap",children:["Pre-mitigation:"," ",Math.round(300+c.ap*100/100)," /"," ",Math.round(500+c.ap*100/100)," /"," ",Math.round(700+c.ap*100/100)]}),a.jsxs("p",{className:"stat--ap",children:["Post-mitigation:"," ",Math.round((300+c.ap*100/100)*(1-s.defMagRed))," /"," ",Math.round((500+c.ap*100/100)*(1-s.defMagRed))," /"," ",Math.round((700+c.ap*100/100)*(1-s.defMagRed))]}),a.jsxs("p",{children:[a.jsx("b",{children:"Passive:"})," Gains ",a.jsx("abbr",{title:"included in calculations from lvl 5 / 9 / 13",className:"stat--ad",children:" 10 / 20 / 30% Armor Penetration"}),"."]}),a.jsxs("p",{children:[a.jsx("b",{children:"Active:"})," strength to leap high into the air. Throws a spear from above which in a small area deals ",a.jsx("b",{children:"COMET SPEAR (S1) damage"})," and ",a.jsx("span",{className:"stat--moveSpeed",children:"slows by 50% for 2 seconds"}),"."]}),a.jsxs("p",{children:["Then crashes down at the target area. Deals up to ",a.jsx("span",{className:"stat--ap",children:"300 / 500 / 700 (+100% AP) magic damage"})," to enemies in a line."]}),a.jsxs("p",{children:["Grand Starfall instantly readies ",a.jsx("b",{children:"Mortal Will."})," Damage is decreased by up to 50% at the edge of the landing area."]})]})}];return a.jsx(a.Fragment,{children:i.map((d,h)=>a.jsx("div",{className:"abilitiesTile",children:a.jsx("div",{children:d.description},h)}))})}export{p as default};
