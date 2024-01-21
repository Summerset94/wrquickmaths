import{j as a}from"./index-b373cb2d.js";function p({currentLevel:n,mod:e,bonus:l,atk:s,def:t,champ:d,updateAbilitiesBonus:c}){const i=[{description:a.jsxs("div",{className:"abilityDescription",children:[a.jsxs("h4",{children:[a.jsx("span",{className:"marker--ability",children:"P"})," CRIMSON PACT"]}),a.jsxs("p",{children:["Gains ",a.jsx("span",{className:"stat--ap",children:"Ability Power"})," equal to ",a.jsx("span",{className:"stat--hp",children:"4.5% of bonus Health"})," and ",a.jsx("span",{className:"stat--hp",children:"Bonus Health"})," equal to",a.jsx("span",{className:"stat--ap",children:"120% of Ability Power"})," (Does not stack with itself)."]})]})},{description:a.jsxs("div",{className:"abilityDescription",children:[a.jsxs("h4",{children:[a.jsx("span",{className:"marker--ability",children:"1"})," TRANSFUSION"]}),a.jsxs("h5",{children:["Cooldown:"," ",(9*e.atkcdr).toFixed(1)," /"," ",(7.5*e.atkcdr).toFixed(1)," /"," ",(6*e.atkcdr).toFixed(1)," /"," ",(4.5*e.atkcdr).toFixed(1)]}),a.jsx("h5",{className:"stat--hp",children:"Base healing:"}),a.jsxs("p",{className:"stat--hp",children:[Math.round(15+s.ap*35/100)," /"," ",Math.round(20+s.ap*35/100)," /"," ",Math.round(25+s.ap*35/100)," /"," ",Math.round(30+s.ap*35/100)]}),a.jsxs("h5",{className:"stat--ap",children:["Damage (",a.jsx("span",{className:"stat--critChance",children:"Crimson Rush"}),"):"]}),a.jsxs("p",{className:"stat--ap",children:["Pre-mitigation:"," ",Math.round(70+s.ap*60/100)," -",a.jsxs("span",{className:"stat--critChance",children:[" ",Math.round((70+s.ap*60/100)*1.75)]})," /"," ",Math.round(100+s.ap*60/100)," -",a.jsxs("span",{className:"stat--critChance",children:[" ",Math.round((100+s.ap*60/100)*1.75)]})," /"," ",Math.round(130+s.ap*60/100)," -",a.jsxs("span",{className:"stat--critChance",children:[" ",Math.round((130+s.ap*60/100)*1.75)]})," /"," ",Math.round(160+s.ap*60/100)," -",a.jsxs("span",{className:"stat--critChance",children:[" ",Math.round((160+s.ap*60/100)*1.75)]})]}),a.jsxs("p",{className:"stat--ap",children:["Post-mitigation:"," ",Math.round((70+s.ap*60/100)*(1-e.defMagRed))," -",a.jsxs("span",{className:"stat--critChance",children:[" ",Math.round((70+s.ap*60/100)*(1-e.defMagRed)*1.75)]})," /"," ",Math.round((100+s.ap*60/100)*(1-e.defMagRed))," -",a.jsxs("span",{className:"stat--critChance",children:[" ",Math.round((100+s.ap*60/100)*(1-e.defMagRed)*1.75)]})," /"," ",Math.round((130+s.ap*60/100)*(1-e.defMagRed))," -",a.jsxs("span",{className:"stat--critChance",children:[" "," ",Math.round((130+s.ap*60/100)*(1-e.defMagRed)*1.75)]})," /"," ",Math.round((160+s.ap*60/100)*(1-e.defMagRed))," -",a.jsxs("span",{className:"stat--critChance",children:[" ",Math.round((160+s.ap*60/100)*(1-e.defMagRed)*1.75)]})]}),a.jsx("br",{}),a.jsxs("p",{children:["Drains life from enemies, dealing ",a.jsx("span",{className:"stat--ap",children:"70 / 100 / 130 / 160 (+60% AP) magic damage"})," and restoring ",a.jsxs("span",{className:"stat--hp",children:["15 / 20 / 25 / 30 (",a.jsx("span",{className:"stat--ap",children:"+35% AP"}),")"]}),". When this ability's cooldown ends, generates a stack of ",a.jsx("b",{children:"Bloodthirst"}),"."]}),a.jsxs("p",{children:["At 2 stacks, gains ",a.jsx("abbr",{title:"10% + 10% every 4 levels",className:"stat--moveSpeed",children:"10% / 20% / 30% / 40% bonus Movement Speed"})," for 0.5 seconds and enters Crimson Rush for 2.5 seconds, gradually depleting all Bloodthirst stacks over this time."]}),a.jsxs("p",{children:[a.jsx("b",{children:"Crimson Rush:"})," While in this state, empowers the next cast of Transfusion to deal ",a.jsx("span",{className:"stat--critChance",children:"85% bonus damage"})," and heal himself for ",a.jsxs("abbr",{title:"30 + 10 per level",className:"stat--hp",children:[Math.round(30+10*n)," health +5% (",a.jsx("span",{className:"stat--ap",children:"+0.03% AP"}),") of missing Health"]}),". When cast, consumes all Bloodthirst stacks and ends Crimson Rush. The empowered version of this ability heals for 35% against minions."]})]})},{description:a.jsxs("div",{className:"abilityDescription",children:[a.jsxs("h4",{children:[a.jsx("span",{className:"marker--ability",children:"2"})," SANGUINE POOL"]}),a.jsxs("h5",{children:["Cooldown:"," ",(25*e.atkcdr).toFixed(1)," /"," ",(22*e.atkcdr).toFixed(1)," /"," ",(19*e.atkcdr).toFixed(1)," /"," ",(16*e.atkcdr).toFixed(1)]}),a.jsxs("h5",{className:"stat--hp",children:["Cost:"," ",Math.round(s.health*20/100)]}),a.jsx("h5",{className:"stat--ap",children:"Damage (current target):"}),a.jsxs("p",{className:"stat--ap",children:["Post-mitigation:"," ",Math.round((20+t.health*2/100)*(1-e.defMagRed))," /"," ",Math.round((40+t.health*2/100)*(1-e.defMagRed))," /"," ",Math.round((60+t.health*2/100)*(1-e.defMagRed))," /"," ",Math.round((80+t.health*2/100)*(1-e.defMagRed))]}),a.jsx("br",{}),a.jsxs("p",{children:["Sinks into a blood pool, becoming untargetable for 2 seconds. Also gains ",a.jsx("span",{className:"stat--moveSpeed",children:"27.5% bonus Movement Speed"}),"  that gradually decays over 1 seconds. While the blood pool is active, enemies within the blood pool take ",a.jsxs("span",{className:"stat--ap",children:["20 / 40 / 60 / 80 (",a.jsx("span",{className:"stat--hp",children:"+2% Max Health"}),") magic damage"]})," 0.5 seconds and are ",a.jsx("span",{className:"stat--moveSpeed",children:"slowed by 40%"}),". Also restores  to ",a.jsx("span",{className:"stat--hp",children:"Health equal 15% of the damage dealt"}),"."]})]})},{description:a.jsxs("div",{className:"abilityDescription",children:[a.jsxs("h4",{children:[a.jsx("span",{className:"marker--ability",children:"3"})," TIDES OF BLOOD"]}),a.jsxs("h5",{children:["Cooldown:"," ",(12.5*e.atkcdr).toFixed(1)," /"," ",(10*e.atkcdr).toFixed(1)," /"," ",(7.5*e.atkcdr).toFixed(1)," /"," ",(5*e.atkcdr).toFixed(1)]}),a.jsxs("h5",{className:"stat--hp",children:["Cost:"," ",Math.round(s.health*8/100)]}),a.jsx("h5",{className:"stat--ap",children:a.jsx("abbr",{title:"Charged just deals 2 x Damage",children:"Damage:"})}),a.jsxs("p",{className:"stat--ap",children:["Base:"," ",Math.round(20+s.ap*35/100)," /"," ",Math.round(40+s.ap*35/100)," /"," ",Math.round(60+s.ap*35/100)," /"," ",Math.round(80+s.ap*35/100)]}),a.jsxs("p",{className:"stat--ap",children:["Current target:"," ",Math.round((20+s.ap*35/100+t.health*2.5/100)*(1-e.defMagRed))," /"," ",Math.round((40+s.ap*35/100+t.health*2.5/100)*(1-e.defMagRed))," /"," ",Math.round((60+s.ap*35/100+t.health*2.5/100)*(1-e.defMagRed))," /"," ",Math.round((80+s.ap*35/100+t.health*2.5/100)*(1-e.defMagRed))]}),a.jsx("br",{}),a.jsxs("p",{children:["Charges up to 1.5 seconds, dealing ",a.jsxs("span",{className:"stat--ap",children:["20 / 40 / 60 / 80 (+35% AP) (",a.jsx("span",{className:"stat--hp",children:"+2.5% target's Max Health"}),") magic damage"]})," to nearby enemies. Charging can additionally increase damage by up to 100%. After charging for 1 seconds, becomes slowed by 20% and also slows any enemies hit by 40/45/50/55%."]})]})},{description:a.jsxs("div",{className:"abilityDescription",children:[a.jsx("h4",{children:a.jsx("span",{className:"marker--ability",children:"ULT"})}),a.jsxs("h5",{children:["Cooldown:"," ",(90*e.atkcdr).toFixed(1)]}),a.jsx("h5",{className:"stat--hp",children:"Healing base (bonus per champion):"}),a.jsxs("p",{className:"stat--hp",children:[Math.round(150+s.ap*70/100)," ","(",Math.round((150+s.ap*70/100)*40/100),") /"," ",Math.round(250+s.ap*70/100)," ","(",Math.round((250+s.ap*70/100)*40/100),") /"," ",Math.round(350+s.ap*70/100)," ","(",Math.round((350+s.ap*70/100)*40/100),")"]}),a.jsx("h5",{className:"stat--ap",children:"Base damage:"}),a.jsxs("p",{className:"stat--ap",children:["Pre-mitigation:"," ",Math.round(150+s.ap*70/100)," /"," ",Math.round(250+s.ap*70/100)," /"," ",Math.round(350+s.ap*70/100)]}),a.jsxs("p",{className:"stat--ap",children:["Post-mitigation:"," ",Math.round((150+s.ap*70/100)*(1-e.defMagRed))," /"," ",Math.round((250+s.ap*70/100)*(1-e.defMagRed))," /"," ",Math.round((350+s.ap*70/100)*(1-e.defMagRed))]}),a.jsx("br",{}),a.jsxs("p",{children:["nfects an area with a toxic plague that infects enemies hit for 4 seconds, after which the plague explodes, dealing ",a.jsx("span",{className:"stat--ap",children:"150 / 250 / 350 (+70% AP) magic damage"})," to infected targets. Also deals 10% of the damage taken by the targets during the infection period as ",a.jsx("span",{className:"stat--ap",children:"bonus magic damage."})]}),a.jsxs("p",{children:["After 0.4 seconds, the first infected enemy champion restores ",a.jsxs("span",{className:"stat--hp",children:["150 / 250 / 350 (",a.jsx("span",{className:"stat--ap",children:"70% AP"}),") Health"]})," to Vladimir. Every subsequent champion provides 40% healing."]})]})}];return a.jsx(a.Fragment,{children:i.map((r,h)=>a.jsx("div",{className:"abilitiesTile",children:a.jsx("div",{children:r.description},h)}))})}export{p as default};