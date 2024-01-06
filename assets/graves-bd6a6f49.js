import{j as a}from"./index-e0eb6c18.js";function o({currentLevel:i,mod:s,bonus:t,atk:e,def:n,champ:h}){const d=[{description:a.jsxs("div",{className:"abilityDescription",children:[a.jsxs("h4",{children:[a.jsx("span",{className:"marker--ability",children:"P"})," NEW DESTINY"]}),a.jsx("h5",{className:"stat--ad",children:"Damage:"}),a.jsxs("p",{className:"stat--ad",children:["Pre-mitigation:"," ","Bullet: ",Math.round(e.attack*(70+2*i)/100)," /"," ","Salvo: ",Math.round(e.attack*(70+2*i)/100*(1+(.24+.664*(i-1))*3))," /",a.jsxs("span",{className:"stat--critChance",children:[" ","Crit-bullet: ",Math.round(e.attack*(70+2*i)/100*1.3)," /"," ","Crit-salvo: ",Math.round(e.attack*(70+2*i)/100*1.3*(1+(.24+.664*(i-1))*6*1.3))]})]}),a.jsxs("p",{className:"stat--ad",children:["Post-mitigation:"," ","Bullet: ",Math.round(e.attack*(70+2*i)/100*(1-s.defPhysRed))," /"," ","Salvo: ",Math.round(e.attack*(70+2*i)/100*(1+(.24+.664*(i-1))*3)*(1-s.defPhysRed))," /",a.jsxs("span",{className:"stat--critChance",children:[" ","Crit-bullet: ",Math.round(e.attack*(70+2*i)/100*1.3*(1-s.defPhysRed))," /"," ","Crit-salvo: ",Math.round(e.attack*(70+2*i)/100*1.3*(1+(.24+.664*(i-1))*6*1.3)*(1-s.defPhysRed))]})]}),a.jsxs("p",{children:["Graves' shotgun has some unique properties: ",a.jsx("br",{}),a.jsx("b",{children:"Double Barrel:"})," Graves must reload when he runs out of ammo. Attack Speed reduces reload time slightly, but reduces time between attacks dramatically.",a.jsx("b",{children:"12 Gauge:"}),"  Attacks fire 4 bullets. Units hit take ",a.jsx("abbr",{className:"stat--ad",title:"based on level",children:"72%-100% AD physical damage +24-33.3%% for additional bullets"}),". Critical strikes fire ",a.jsx("span",{className:"stat--critChance",children:"6 bullets, 130% damage each and increase each bullet's damage by 30%"}),". Strcutures only take 75% damage. ",a.jsx("br",{}),a.jsx("b",{children:"Buckshot:"})," Bullets cannot pass through enemy units. Non-champions struck by multiple bullets are knock back slightly."]})]})},{description:a.jsxs("div",{className:"abilityDescription",children:[a.jsxs("h4",{children:[a.jsx("span",{className:"marker--ability",children:"1"})," END OF THE LINE"]}),a.jsxs("h5",{children:["Cooldown:"," ",(13*s.atkcdr).toFixed(1)," /"," ",(11*s.atkcdr).toFixed(1)," /"," ",(9*s.atkcdr).toFixed(1)," /"," ",(7*s.atkcdr).toFixed(1)]}),a.jsxs("h5",{className:"stat--mana",children:["Cost:"," ",65," /"," ",70," /"," ",75," /"," ",80]}),a.jsx("h5",{className:"stat--ad",children:"Initial damage:"}),a.jsxs("p",{className:"stat--ad",children:["Pre-mitigation:"," ",Math.round(45+t.attack*80/100)," /"," ",Math.round(65+t.attack*80/100)," /"," ",Math.round(85+t.attack*80/100)," /"," ",Math.round(105+t.attack*80/100)]}),a.jsxs("p",{className:"stat--ad",children:["Post-mitigation:"," ",Math.round((45+t.attack*80/100)*(1-s.defPhysRed))," /"," ",Math.round((65+t.attack*80/100)*(1-s.defPhysRed))," /"," ",Math.round((85+t.attack*80/100)*(1-s.defPhysRed))," /"," ",Math.round((105+t.attack*80/100)*(1-s.defPhysRed))]}),a.jsx("h5",{className:"stat--ad",children:"Explosion damage:"}),a.jsxs("p",{className:"stat--ad",children:["Pre-mitigation:"," ",Math.round(80+t.attack*80/100)," /"," ",Math.round(130+t.attack*110/100)," /"," ",Math.round(180+t.attack*140/100)," /"," ",Math.round(230+t.attack*170/100)]}),a.jsxs("p",{className:"stat--ad",children:["Post-mitigation:"," ",Math.round((80+t.attack*80/100)*(1-s.defPhysRed))," /"," ",Math.round((130+t.attack*110/100)*(1-s.defPhysRed))," /"," ",Math.round((180+t.attack*140/100)*(1-s.defPhysRed))," /"," ",Math.round((230+t.attack*170/100)*(1-s.defPhysRed))]}),a.jsxs("p",{children:["Fires a powder round that deals ",a.jsx("span",{className:"stat--ad",children:"45 / 65 / 85 / 105 (+80% bonus AD) physical damage"})," and then detonates after 1 second to deal an additional ",a.jsx("span",{className:"stat--ad",children:"80 / 130 / 180 / 230 (+80% / 110% / 140% / 170% bonus AD) physical damage"}),". ",a.jsx("br",{}),"Detonates in 0.25 seconds if the round hits terrain, Deals 90% damage against monsters."]})]})},{description:a.jsxs("div",{className:"abilityDescription",children:[a.jsxs("h4",{children:[a.jsx("span",{className:"marker--ability",children:"2"})," SMOKE SCREEN"]}),a.jsxs("h5",{children:["Cooldown:"," ",(20*s.atkcdr).toFixed(1)," /"," ",(18*s.atkcdr).toFixed(1)," /"," ",(16*s.atkcdr).toFixed(1)," /"," ",(14*s.atkcdr).toFixed(1)]}),a.jsxs("h5",{className:"stat--mana",children:["Cost:"," ",75," /"," ",80," /"," ",85," /"," ",90]}),a.jsx("h5",{className:"stat--ap",children:"Damage:"}),a.jsxs("p",{className:"stat--ap",children:["Pre-mitigation:"," ",Math.round(60+e.ap*60/100)," /"," ",Math.round(125+e.ap*60/100)," /"," ",Math.round(190+e.ap*60/100)," /"," ",Math.round(255+e.ap*60/100)]}),a.jsxs("p",{className:"stat--ap",children:["Post-mitigation:"," ",Math.round((60+e.ap*60/100)*(1-s.defMagRed))," /"," ",Math.round((125+e.ap*60/100)*(1-s.defMagRed))," /"," ",Math.round((190+e.ap*60/100)*(1-s.defMagRed))," /"," ",Math.round((255+e.ap*60/100)*(1-s.defMagRed))]}),a.jsxs("p",{children:["Throws a canister that creates a cloud of smoke for 4 seconds. Enemies within the smoke cannot see outside of it. ",a.jsx("br",{}),"Enemies caught in the initial impact take ",a.jsx("span",{className:"stat--ap",children:"60 / 125 / 190 / 255 (+60% AP) magic damage"})," and are ",a.jsx("span",{className:"stat--moveSpeed",children:"slowed by 50%"})," for 0.5 seconds."]})]})},{description:a.jsxs("div",{className:"abilityDescription",children:[a.jsxs("h4",{children:[a.jsx("span",{className:"marker--ability",children:"3"})," QUICKDRAW"]}),a.jsxs("h5",{children:["Cooldown:"," ",(16*s.atkcdr).toFixed(1)," /"," ",(15*s.atkcdr).toFixed(1)," /"," ",(14*s.atkcdr).toFixed(1)," /"," ",(13*s.atkcdr).toFixed(1)]}),a.jsxs("h5",{className:"stat--mana",children:["Cost:"," ",40," /"," ",40," /"," ",40," /"," ",40]}),a.jsxs("p",{children:["Dashes a fixed length in a target direction, reloading one shell and granting ",a.jsx("b",{children:"True Grit"})," for 4 seconds. True Grit grants ",a.jsx("span",{className:"stat--armor",children:"6 / 10 / 14 / 18 bonus armor"}),", stacks up to 8 times, and refreshes when damaging non-minions. ",a.jsx("br",{}),"Dashing towards an enemy champion grants 2 stacks of True Grit. Each bullet hit reduces Quickdraw's cooldown by 0.5 seconds."]})]})},{description:a.jsxs("div",{className:"abilityDescription",children:[a.jsxs("h4",{children:[a.jsx("span",{className:"marker--ability",children:"ULT"})," COLLATERAL DAMAGE"]}),a.jsxs("h5",{children:["Cooldown:"," ",(75*s.atkcdr).toFixed(1)," /"," ",(60*s.atkcdr).toFixed(1)," /"," ",(45*s.atkcdr).toFixed(1)]}),a.jsxs("h5",{className:"stat--mana",children:["Cost:"," ",100," /"," ",100," /"," ",100]}),a.jsx("h5",{className:"stat--ad",children:"Shell damage:"}),a.jsxs("p",{className:"stat--ad",children:["Pre-mitigation:"," ",Math.round(300+t.attack*150/100)," /"," ",Math.round(450+t.attack*150/100)," /"," ",Math.round(600+t.attack*150/100)]}),a.jsxs("p",{className:"stat--ad",children:["Post-mitigation:"," ",Math.round((300+t.attack*150/100)*(1-s.defPhysRed))," /"," ",Math.round((450+t.attack*150/100)*(1-s.defPhysRed))," /"," ",Math.round((600+t.attack*150/100)*(1-s.defPhysRed))]}),a.jsx("h5",{className:"stat--ad",children:"Explosion damage:"}),a.jsxs("p",{className:"stat--ad",children:["Pre-mitigation:"," ",Math.round(200+t.attack*120/100)," /"," ",Math.round(320+t.attack*120/100)," /"," ",Math.round(440+t.attack*120/100)]}),a.jsxs("p",{className:"stat--ad",children:["Post-mitigation:"," ",Math.round((200+t.attack*120/100)*(1-s.defPhysRed))," /"," ",Math.round((320+t.attack*120/100)*(1-s.defPhysRed))," /"," ",Math.round((440+t.attack*120/100)*(1-s.defPhysRed))]}),a.jsxs("p",{children:["Fires an explosive shell that deals ",a.jsx("span",{className:"stat--ad",children:"300 / 450 / 600 (+150% AD) physical damage"}),"  and knocks Graves back from recoil. The shell explodes upon hitting an enemy champion or reaching the end of its range, dealing ",a.jsx("span",{className:"stat--ad",children:"200 / 320 / 440 (+120% AD) physical damage"})," in a cone. ",a.jsx("br",{}),"Enemies damaged by the shell's initial impact do not take damage from the explosive cone."]})]})}];return a.jsx(a.Fragment,{children:d.map((c,r)=>a.jsx("div",{className:"abilitiesTile",children:a.jsx("div",{children:c.description},r)}))})}export{o as default};