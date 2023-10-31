import{j as s}from"./index-2f9a7f7a.js";function m({currentLevel:i,mod:a,bonus:t,atk:e,def:r,champ:n,updateAbilitiesBonus:h}){const c=[{description:s.jsxs("div",{className:"abilityDescription",children:[s.jsxs("h4",{children:[s.jsx("span",{className:"marker--ability",children:"P"})," DEADLY VENOM"]}),s.jsxs("p",{children:["Attacks infect enemies with venom, dealing ",s.jsxs("abbr",{className:"stat--vamp",title:"1-5 (+1 every 3 levels) + 3.5% AP",children:[Math.round(1+1*Math.floor((i-1)/3)+e.ap*3.5/100)," true damage"]})," over 5 seconds and stacking up to 5 times (",s.jsxs("span",{className:"stat--vamp",children:[Math.round((1+1*Math.floor((i-1)/3)+e.ap*3.5/100)*5)," damage"]}),")."]}),s.jsxs("p",{children:["When an enemy champion has full stacks of DEADLY VENOM, Twitch gains ",s.jsxs("abbr",{title:"10% + 5% every 3 levels (10-30)",className:"stat--as",children:[(n.asBase*(10+5*Math.floor((i-1)/3))/100).toFixed(3)," Attack Speed"]})," for 5 seconds."]}),s.jsx("p",{children:"Monsters take 130% increased damage from DEADLY VENOM."})]})},{description:s.jsxs("div",{className:"abilityDescription",children:[s.jsxs("h4",{children:[s.jsx("span",{className:"marker--ability",children:"1"})," AMBUSH"]}),s.jsxs("h5",{children:["Cooldown:"," ",(15*a.atkcdr).toFixed(1)]}),s.jsxs("h5",{className:"stat--mana",children:["Cost:"," ",40]}),s.jsx("br",{}),s.jsxs("p",{children:["Become Camouflaged and hasted by ",s.jsx("span",{className:"stat--moveSpeed",children:"10% for 8 / 9 / 10 / 11 seconds"}),", increasing to ",s.jsx("span",{className:"stat--moveSpeed",children:"20%"}),"  when nearby enemy champions cannot see Twitch."]}),s.jsx("p",{children:"After exiting Camouflage, Twitch's attacks will apply an additional stack of DEADLY VENOM for 3 seconds. AMBUSH resets when a champion dies while infected by DEADLY VENOM."})]})},{description:s.jsxs("div",{className:"abilityDescription",children:[s.jsxs("h4",{children:[s.jsx("span",{className:"marker--ability",children:"2"})," VENOM CASK"]}),s.jsxs("h5",{children:["Cooldown:"," ",(12*a.atkcdr).toFixed(1)]}),s.jsxs("h5",{className:"stat--mana",children:["Cost:"," ",70]}),s.jsx("br",{}),s.jsxs("p",{children:["Hurls a cask that applies stacks of DEADLY VENOM to enemies and ",s.jsx("span",{className:"stat--moveSpeed",children:"slows"})," by ",s.jsxs("span",{className:"stat--moveSpeed",children:[" 30 / 35 / 40 / 45% (",s.jsx("span",{className:"stat--ap",children:"+6% AP"}),")"]})," for 3 seconds."]})]})},{description:s.jsxs("div",{className:"abilityDescription",children:[s.jsxs("h4",{children:[s.jsx("span",{className:"marker--ability",children:"3"})," CONTAMINATE"]}),s.jsxs("h5",{children:["Cooldown:"," ",(16*a.atkcdr).toFixed(1)," /"," ",(15*a.atkcdr).toFixed(1)," /"," ",(14*a.atkcdr).toFixed(1)," /"," ",(13*a.atkcdr).toFixed(1)]}),s.jsxs("h5",{className:"stat--mana",children:["Cost:"," ",50," /"," ",60," /"," ",70," /"," ",80]}),s.jsx("h5",{className:"stat--ad",children:"Stack damage:"}),s.jsxs("p",{className:"stat--ad",children:["Pre-mitigation:"," ",Math.round(20+t.attack*37/100+e.ap*30/100)," /"," ",Math.round(25+t.attack*37/100+e.ap*30/100)," /"," ",Math.round(30+t.attack*37/100+e.ap*30/100)," /"," ",Math.round(35+t.attack*37/100+e.ap*30/100)]}),s.jsxs("p",{className:"stat--ad",children:["Post-mitigation:"," ",Math.round((20+t.attack*37/100+e.ap*30/100)*(1-a.defPhysRed))," /"," ",Math.round((25+t.attack*37/100+e.ap*30/100)*(1-a.defPhysRed))," /"," ",Math.round((30+t.attack*37/100+e.ap*30/100)*(1-a.defPhysRed))," /"," ",Math.round((35+t.attack*37/100+e.ap*30/100)*(1-a.defPhysRed))]}),s.jsx("br",{}),s.jsxs("p",{children:["Deals ",s.jsx("span",{className:"stat--ad",children:"30 / 40 / 50 / 60 physical damage"})," to all enemies affected by DEADLY VENOM, each stack deals ",s.jsxs("span",{className:"stat--ad",children:["20 / 25 / 30 / 35 (+37% bonus AD) (",s.jsx("span",{className:"stat--ap",children:"+30% AP"}),") damage"]})," to enemies."]}),s.jsx("p",{children:"Enemies with maximum stacks will spread the damage to nearby targets and  apply maximum stacks of DEADLY VENOM to them."}),s.jsx("p",{children:s.jsxs("b",{children:["Deals ",s.jsx("span",{className:"stat--ad",children:"130 / 165 / 200 / 235 physical damage"})," at max stacks."]})}),s.jsx("p",{children:"Deals 130% increased damage to monsters."})]})},{description:s.jsxs("div",{className:"abilityDescription",children:[s.jsxs("h4",{children:[s.jsx("span",{className:"marker--ability",children:"ULT"})," SPRAY AND PRAY"]}),s.jsxs("h5",{children:["Cooldown:"," ",(80*a.atkcdr).toFixed(1)," /"," ",(70*a.atkcdr).toFixed(1)," /"," ",(60*a.atkcdr).toFixed(1)]}),s.jsxs("h5",{className:"stat--mana",children:["Cost:"," ",100]}),s.jsx("br",{}),s.jsxs("p",{children:["For 6 seconds gain 250 Attack Range and ",s.jsx("span",{className:"stat--ad",children:"25 / 40 / 55 bonus attack damage"})," and transform attacks into piercing bolts that hit every enemy in a line."]}),s.jsx("p",{children:"Subsequent targets take 10% less damage, down to a minimum of 60%."})]})}];return s.jsx(s.Fragment,{children:c.map((d,l)=>s.jsx("div",{className:"abilitiesTile",children:s.jsx("div",{children:d.description},l)}))})}export{m as default};
