import{r as h,j as a}from"./index-22e5b87e.js";function m({currentLevel:i,mod:s,bonus:r,atk:t,def:c,champ:l}){const d=h.useMemo(()=>{const e={cooldown:{base:8,growth:1},cost:{base:50,growth:0},damage:{base:20,growth:20,modifier:t.ap*50/100,modifierPhys:t.attack*100/100}};return{q:{cooldown:{1:e.cooldown.base*s.atkcdr,2:(e.cooldown.base-e.cooldown.growth)*s.atkcdr,3:(e.cooldown.base-e.cooldown.growth*2)*s.atkcdr,4:(e.cooldown.base-e.cooldown.growth*3)*s.atkcdr},cost:{1:e.cost.base,2:e.cost.base+e.cost.growth,3:e.cost.base+e.cost.growth*2,4:e.cost.base+e.cost.growth*3},damage:{raw:{1:e.damage.base+e.damage.modifier,2:e.damage.base+e.damage.modifier+e.damage.growth+e.damage.modifierPhys,3:e.damage.base+e.damage.modifier+e.damage.growth*2+e.damage.modifierPhys,4:e.damage.base+e.damage.modifier+e.damage.growth*3+e.damage.modifierPhys},mitigated:{1:(e.damage.base+e.damage.modifier)*(1-s.defMagRed)+e.damage.modifierPhys*(1-s.defPhysRed),2:(e.damage.base+e.damage.modifier+e.damage.growth)*(1-s.defMagRed)+e.damage.modifierPhys*(1-s.defPhysRed),3:(e.damage.base+e.damage.modifier+e.damage.growth*2)*(1-s.defMagRed)+e.damage.modifierPhys*(1-s.defPhysRed),4:(e.damage.base+e.damage.modifier+e.damage.growth*3)*(1-s.defMagRed)+e.damage.modifierPhys*(1-s.defPhysRed)}},text:{damage:a.jsxs("span",{className:"stat--ap",children:[e.damage.base," / ",e.damage.base+e.damage.growth," / ",e.damage.base+e.damage.growth*2," / ",e.damage.base+e.damage.growth*3," (+50% AP) Magic damage ",a.jsx("span",{className:"stat--ad",children:"+100% AD Physical damage"})]})}}}},[i,s,r,t]),n=[{description:a.jsxs("div",{className:"abilityDescription",children:[a.jsxs("h4",{children:[a.jsx("span",{className:"marker--ability",children:"P"})," SEASTONE TRIDENT"]}),a.jsx("h5",{className:"stat--ap",children:"Damage:"}),a.jsxs("p",{className:"stat--ad",children:["Pre / post-mitigation:"," ",Math.round(20+2*i+t.ap*40/100)," /"," ",Math.round((20+2*i+t.ap*40/100)*(1-s.defMagRed))]}),a.jsxs("p",{children:["Attacks deal an additional ",a.jsx("abbr",{title:"20 + 2 * Level",className:"stat--ap",children:"22-50 (+40% AP) magic damage"})," over 3 seconds. ",a.jsx("br",{}),"Deals 90% damage to monsters."]})]})},{description:a.jsxs("div",{className:"abilityDescription",children:[a.jsxs("h4",{children:[a.jsx("span",{className:"marker--ability",children:"1"})," URCHIN STRIKE"]}),a.jsxs("h5",{children:["Cooldown:"," ",d.q.cooldown[1].toFixed(1)," /"," ",d.q.cooldown[2].toFixed(1)," /"," ",d.q.cooldown[3].toFixed(1)," /"," ",d.q.cooldown[4].toFixed(1)]}),a.jsxs("h5",{className:"stat--mana",children:["Cost:"," ",d.q.cost[1]]}),a.jsx("h5",{className:"stat--ap",children:"Damage:"}),a.jsxs("p",{className:"stat--ad",children:["Pre-mitigation:"," ",Math.round(d.q.damage.raw[1])," /"," ",Math.round(d.q.damage.raw[2])," /"," ",Math.round(d.q.damage.raw[3])," /"," ",Math.round(d.q.damage.raw[4])]}),a.jsxs("p",{className:"stat--ad",children:["Post-mitigation:"," ",Math.round(d.q.damage.mitigated[1])," /"," ",Math.round(d.q.damage.mitigated[2])," /"," ",Math.round(d.q.damage.mitigated[3])," /"," ",Math.round(d.q.damage.mitigated[4])]}),a.jsxs("p",{children:["Dashes through target enemy, dealing ",d.q.text.damage," and applying on-hit effects."]})]})},{description:a.jsxs("div",{className:"abilityDescription",children:[a.jsxs("h4",{children:[a.jsx("span",{className:"marker--ability",children:"2"})," RENDING WAVE"]}),a.jsxs("h5",{children:["Cooldown:"," ",(10*s.atkcdr).toFixed(1)," /"," ",(9*s.atkcdr).toFixed(1)," /"," ",(9*s.atkcdr).toFixed(1)," /"," ",(8*s.atkcdr).toFixed(1)]}),a.jsxs("h5",{className:"stat--mana",children:["Cost:"," ",30," /"," ",40," /"," ",50," /"," ",60]}),a.jsx("h5",{className:"stat--ap",children:"Damage:"}),a.jsxs("p",{className:"stat--ad",children:["Pre-mitigation:"," ",Math.round(50+t.ap*45/100)," /"," ",Math.round(75+t.ap*45/100)," /"," ",Math.round(100+t.ap*45/100)," /"," ",Math.round(125+t.ap*45/100)]}),a.jsxs("p",{className:"stat--ad",children:["Post-mitigation:"," ",Math.round((50+t.ap*45/100)*(1-s.defMagRed))," /"," ",Math.round((75+t.ap*45/100)*(1-s.defMagRed))," /"," ",Math.round((100+t.ap*45/100)*(1-s.defMagRed))," /"," ",Math.round((125+t.ap*45/100)*(1-s.defMagRed))]}),a.jsx("h5",{className:"stat--ap",children:"Bonus on-hit damage:"}),a.jsxs("p",{className:"stat--ad",children:["Pre-mitigation:"," ",Math.round(10+t.ap*35/100)," /"," ",Math.round(15+t.ap*35/100)," /"," ",Math.round(20+t.ap*35/100)," /"," ",Math.round(25+t.ap*35/100)]}),a.jsxs("p",{className:"stat--ad",children:["Post-mitigation:"," ",Math.round((10+t.ap*35/100)*(1-s.defMagRed))," /"," ",Math.round((15+t.ap*35/100)*(1-s.defMagRed))," /"," ",Math.round((20+t.ap*35/100)*(1-s.defMagRed))," /"," ",Math.round((25+t.ap*35/100)*(1-s.defMagRed))]}),a.jsxs("p",{children:["Empowers the next attack to gush water around the target, dealing ",a.jsx("span",{className:"stat--ap",children:"50 / 75 / 100 / 125 (+50% AP) magic damage"})," and applying ",a.jsx("span",{className:"stat--ap",children:"Seastone Trident"})," to enemies hit. Additional attacks within 5 seconds deal ",a.jsx("span",{className:"stat--ap",children:"10 / 15 / 20 / 25 (+35% AP) bonus magic damage"}),". ",a.jsx("br",{}),"Killing a unit with the first attack reduces Rending Wave's cooldown to 1 second."]})]})},{description:a.jsxs("div",{className:"abilityDescription",children:[a.jsxs("h4",{children:[a.jsx("span",{className:"marker--ability",children:"3"})," PLAYFUL / TRICKSTER"]}),a.jsxs("h5",{children:["Cooldown:"," ",(16*s.atkcdr).toFixed(1)," /"," ",(14*s.atkcdr).toFixed(1)," /"," ",(12*s.atkcdr).toFixed(1)," /"," ",(10*s.atkcdr).toFixed(1)]}),a.jsxs("h5",{className:"stat--mana",children:["Cost:"," ",85," /"," ",90," /"," ",95," /"," ",100]}),a.jsx("h5",{className:"stat--ap",children:"Damage:"}),a.jsxs("p",{className:"stat--ad",children:["Pre-mitigation:"," ",Math.round(80+t.ap*80/100)," /"," ",Math.round(150+t.ap*80/100)," /"," ",Math.round(220+t.ap*80/100)," /"," ",Math.round(290+t.ap*80/100)]}),a.jsxs("p",{className:"stat--ad",children:["Post-mitigation:"," ",Math.round((80+t.ap*80/100)*(1-s.defMagRed))," /"," ",Math.round((150+t.ap*80/100)*(1-s.defMagRed))," /"," ",Math.round((220+t.ap*80/100)*(1-s.defMagRed))," /"," ",Math.round((290+t.ap*80/100)*(1-s.defMagRed))]}),a.jsxs("p",{children:["Vaults to target location, becoming untargetable while balanced on the trident. After 1.2 seconds, Fizz hops down with a large splash that deals ",a.jsx("span",{className:"stat--ap",children:"80 / 150 / 220 / 290 (+80% AP) magic damage"}),"  and slows enemies hit by ",a.jsx("span",{className:"stat--moveSpeed",children:"40% / 45% / 50% / 55% for 2 seconds"}),". ",a.jsx("br",{}),a.jsx("b",{children:"Re-cast:"})," Hop down early towards a direction, but deal damage in a smaller splash that does not slow enemies."]})]})},{description:a.jsxs("div",{className:"abilityDescription",children:[a.jsxs("h4",{children:[a.jsx("span",{className:"marker--ability",children:"ULT"})," CHUM THE WATERS"]}),a.jsxs("h5",{children:["Cooldown:"," ",(85*s.atkcdr).toFixed(1)," /"," ",(70*s.atkcdr).toFixed(1)," /"," ",(55*s.atkcdr).toFixed(1)]}),a.jsxs("h5",{className:"stat--mana",children:["Cost:"," ",100," /"," ",100," /"," ",100]}),a.jsx("h5",{className:"stat--ap",children:"Mimimum damage:"}),a.jsxs("p",{className:"stat--ad",children:["Pre-mitigation:"," ",Math.round(150+t.ap*60/100)," /"," ",Math.round(250+t.ap*60/100)," /"," ",Math.round(350+t.ap*60/100)]}),a.jsxs("p",{className:"stat--ad",children:["Post-mitigation:"," ",Math.round((150+t.ap*60/100)*(1-s.defMagRed))," /"," ",Math.round((250+t.ap*60/100)*(1-s.defMagRed))," /"," ",Math.round((350+t.ap*60/100)*(1-s.defMagRed))]}),a.jsx("h5",{className:"stat--ap",children:"Maximum damage:"}),a.jsxs("p",{className:"stat--ad",children:["Pre-mitigation:"," ",Math.round(300+t.ap*120/100)," /"," ",Math.round(400+t.ap*120/100)," /"," ",Math.round(500+t.ap*120/100)]}),a.jsxs("p",{className:"stat--ad",children:["Post-mitigation:"," ",Math.round((300+t.ap*120/100)*(1-s.defMagRed))," /"," ",Math.round((400+t.ap*120/100)*(1-s.defMagRed))," /"," ",Math.round((500+t.ap*120/100)*(1-s.defMagRed))]}),a.jsxs("p",{children:["Launches a fish in taget direction that attaches to the first champion hit and reveals them. After 2 seconds, the fish attracts a shark that knocks up its target and knocks away enemies around them. The farther the fish travels, the larger the shark it will attract, dealing ",a.jsx("span",{className:"stat---ap",children:" 150 / 250 / 350 (+60% AP) to 300 / 400 / 500 (+120% AP) magic damage"})," and slowing enemies hit by ",a.jsx("span",{className:"stat--moveSpeed",children:" 40% to 80%"})," based on the size of the shark. ",a.jsx("br",{}),"If the fish does not attach to a champion, it will flop on the ground and still attract a shark at its location."]})]})}];return a.jsx(a.Fragment,{children:n.map((e,o)=>a.jsx("div",{className:"abilitiesTile",children:a.jsx("div",{children:e.description},o)}))})}export{m as default};