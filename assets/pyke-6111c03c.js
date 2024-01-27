import{j as a}from"./index-b8b36333.js";function o({currentLevel:c,mod:e,bonus:s,atk:t,def:d,champ:l}){const i=[{description:a.jsxs("div",{className:"abilityDescription",children:[a.jsxs("h4",{children:[a.jsx("span",{className:"marker--ability",children:"P"})," GIFT OF THE DROWNED ONES"]}),a.jsxs("p",{children:["Stores ",a.jsxs("abbr",{title:"10% + 0.35% of FLAT armor penetration",className:"stat--vamp",children:[(10+t.flatArmPen*.35/100).toFixed(1),"%"]})," of damage taken from champions, increased to ",a.jsxs("abbr",{title:"50% + 0.65% of FLAT armor penetration",className:"stat--vamp",children:[(50+t.flatArmPen*.65/100).toFixed(1),"%"]})," if there are two or more visible enemy champions nearby. Damage stored cannot exceed ",a.jsxs("abbr",{title:"MINIMUM between 65% Health and 146 + 800% bonus AD",className:"stat--hp",children:[Math.round(Math.min(t.health*65/100,160+s.attack*800/100))," health"]})]}),a.jsx("p",{children:"When Pyke is not visible to enemies, he heals for the amount of damage stored."}),a.jsxs("p",{children:["Pyke cannot increase his max Health and converts ",a.jsx("span",{className:"stat--hp",children:"14 bonus Health"}),"  to ",a.jsx("span",{className:"stat--ad",children:"1 Attack Damage"}),"."]})]})},{description:a.jsxs("div",{className:"abilityDescription",children:[a.jsxs("h4",{children:[a.jsx("span",{className:"marker--ability",children:"1"})," BONE SKEWER"]}),a.jsxs("h5",{children:["Cooldown:"," ",(9.5*e.atkcdr).toFixed(1)," /"," ",(9*e.atkcdr).toFixed(1)," /"," ",(8.5*e.atkcdr).toFixed(1)," /"," ",(8*e.atkcdr).toFixed(1)]}),a.jsxs("h5",{className:"stat--mana",children:["Cost:"," ",35," /"," ",40," /"," ",45," /"," ",50]}),a.jsx("h5",{className:"stat--ad",children:"Damage:"}),a.jsxs("p",{className:"stat--ad",children:["Pre-mitigation:"," ",Math.round(130+s.attack*60/100)," /"," ",Math.round(195+s.attack*60/100)," /"," ",Math.round(260+s.attack*60/100)," /"," ",Math.round(325+s.attack*60/100)]}),a.jsxs("p",{className:"stat--ad",children:["Post-mitigation:"," ",Math.round((130+s.attack*60/100)*(1-e.defPhysRed))," /"," ",Math.round((195+s.attack*60/100)*(1-e.defPhysRed))," /"," ",Math.round((260+s.attack*60/100)*(1-e.defPhysRed))," /"," ",Math.round((325+s.attack*60/100)*(1-e.defPhysRed))]}),a.jsxs("p",{children:[a.jsx("b",{children:"Charge:"})," ",a.jsx("span",{className:"stat--moveSpeed",children:"Slows himself by 20%"})," for up to 3s, increasing cast range over the first 0.8s."]}),a.jsxs("p",{children:[a.jsx("b",{children:"Release:"})," Hurls his spear, dealing ",a.jsx("span",{className:"stat--ad",children:"130 / 195 / 260 / 325 (+60% bonus AD) physical damage"}),", ",a.jsx("span",{className:"stat--moveSpeed",children:"slowing the target by 90% for 1s"})," and pulling it in. Releasing the ability immediately will cause Pyke to thrust his spear instead, dealing the same damage."]}),a.jsx("p",{children:"Deals 50% damage to minions. Deals 50% damage to monsters. If BONE SKEWER is overcharged it refunds a portion of it's cooldown and 50% of its mana cost."})]})},{description:a.jsxs("div",{className:"abilityDescription",children:[a.jsxs("h4",{children:[a.jsx("span",{className:"marker--ability",children:"2"})," GHOSTWATER DIVE"]}),a.jsxs("h5",{children:["Cooldown:"," ",(10.5*e.atkcdr).toFixed(1)," /"," ",(10*e.atkcdr).toFixed(1)," /"," ",(9.5*e.atkcdr).toFixed(1)," /"," ",(9*e.atkcdr).toFixed(1)]}),a.jsxs("p",{children:["Becomes ",a.jsx("b",{children:"camouflaged"})," for 5 seconds and gains ",a.jsxs("abbr",{className:"stat--moveSpeed",title:"40% + 200% flat armor pen",children:[Math.round(t.moveSpeed*(40+2*t.flatArmPen)/100)," Movement Speed"]})," that decays over the duration."]})]})},{description:a.jsxs("div",{className:"abilityDescription",children:[a.jsxs("h4",{children:[a.jsx("span",{className:"marker--ability",children:"3"})," PHANTOM UNDERTOW"]}),a.jsxs("h5",{children:["Cooldown:"," ",(11*e.atkcdr).toFixed(1)," /"," ",(10.5*e.atkcdr).toFixed(1)," /"," ",(10*e.atkcdr).toFixed(1)," /"," ",(9.5*e.atkcdr).toFixed(1)]}),a.jsxs("h5",{className:"stat--mana",children:["Cost:"," ",40]}),a.jsx("h5",{className:"stat--ad",children:"Damage:"}),a.jsxs("p",{className:"stat--ad",children:["Pre-mitigation:"," ",Math.round(120+s.attack*100/100)," /"," ",Math.round(175+s.attack*100/100)," /"," ",Math.round(230+s.attack*100/100)," /"," ",Math.round(285+s.attack*100/100)]}),a.jsxs("p",{className:"stat--ad",children:["Post-mitigation:"," ",Math.round((120+s.attack*100/100)*(1-e.defPhysRed))," /"," ",Math.round((175+s.attack*100/100)*(1-e.defPhysRed))," /"," ",Math.round((230+s.attack*100/100)*(1-e.defPhysRed))," /"," ",Math.round((285+s.attack*100/100)*(1-e.defPhysRed))]}),a.jsxs("p",{children:["Dashes forward, leaving behind a phantom. After 1 second, the phantom returns to Pyke, dealing ",a.jsx("span",{className:"stat--ad",children:"120 / 175 / 230 / 285 (+100% bonus AD) physical damage "})," to enemy champions and stunning for ",a.jsx("b",{children:"1.5 (+1.5% flat armor pen)"}),"  seconds."]}),a.jsx("p",{children:"Deals 50% damage to minions Deals 50% damage to monsters."})]})},{description:a.jsxs("div",{className:"abilityDescription",children:[a.jsxs("h4",{children:[a.jsx("span",{className:"marker--ability",children:"ULT"})," DEATH FROM BELOW"]}),a.jsxs("h5",{children:["Cooldown:"," ",(80*e.atkcdr).toFixed(1)," /"," ",(70*e.atkcdr).toFixed(1)," /"," ",(60*e.atkcdr).toFixed(1)]}),a.jsxs("h5",{className:"stat--mana",children:["Cost:"," ",100]}),a.jsx("h5",{className:"stat--critChance",children:"Execute Threshold:"}),a.jsxs("p",{className:"stat--critChance",children:[" ",Math.round(250+t.flatArmPen*250/100+s.attack*80/100)," /"," ",Math.round(250+t.flatArmPen*400/100+s.attack*80/100)," /"," ",Math.round(250+t.flatArmPen*550/100+s.attack*80/100)]}),a.jsxs("p",{children:["Marks target area with an X, executing enemy champions below ",a.jsx("span",{className:"stat--critChance",children:"250 (+80% bonus AD) (+250 / 400 / 550% flat Armor penetration) health"}),". Non-champions and champions above the threshold take 50% of this amount as ",a.jsx("span",{className:"stat--ad",children:"physical damage"}),"."]}),a.jsxs("p",{children:["If an emeny champion is struck, Pyke blinks to the location. If he was executed Pyke can recast ",a.jsx("b",{children:"DEATH FROM BELOW"})," within 15s."]}),a.jsx("p",{children:"Each execution grants Pyke 100% bounty gold. If there's an assisting ally, grant them 100% gold, and  grant Pyke 160% gold (up to 600). Enemies killed by an ally inside the X grant Pyke 160% gold (up to 600)."})]})}];return a.jsx(a.Fragment,{children:i.map((n,r)=>a.jsx("div",{className:"abilitiesTile",children:a.jsx("div",{children:n.description},r)}))})}export{o as default};
