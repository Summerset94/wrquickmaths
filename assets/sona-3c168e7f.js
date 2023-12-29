import{j as a}from"./index-6e7f5b0c.js";function x({currentLevel:n,mod:e,bonus:l,atk:s,def:c,champ:h,updateAbilitiesBonus:p}){const i=Number((2+1.2857142857142858*n)/100),t=[{description:a.jsxs("div",{className:"abilityDescription",children:[a.jsxs("h4",{children:[a.jsx("span",{className:"marker--ability",children:"P"})," POWER CHORD"]}),a.jsxs("p",{children:["After casting three basic abilities, her next attack is enhanced to deal an additional ",a.jsxs("abbr",{title:"20 + 10 per Level + 15% AP",className:"stat--ap",children:[Math.round(10+10*n+s.ap*15/100)," magic damage"]}),", stunning the target for 0.5s. Casting basic abilities creates a non-stacking buff aura for 3s."]}),a.jsxs("p",{children:["Basic abilities cooldown are reduced by ",a.jsx("b",{children:"2-20%"})]})]})},{description:a.jsxs("div",{className:"abilityDescription",children:[a.jsxs("h4",{children:[a.jsx("span",{className:"marker--ability",children:"1"})," HYMN OF VALOR"]}),a.jsxs("h5",{children:["Cooldown:"," ",(8*(e.atkcdr-i)).toFixed(1)]}),a.jsxs("h5",{className:"stat--mana",children:["Cost:"," ",60," /"," ",65," /"," ",70," /"," ",75]}),a.jsx("h5",{className:"stat--ap",children:"Damage:"}),a.jsxs("p",{className:"stat--ap",children:["Pre-mitigation:"," ",Math.round(50+s.ap*40/100)," /"," ",Math.round(90+s.ap*40/100)," /"," ",Math.round(130+s.ap*40/100)," /"," ",Math.round(170+s.ap*40/100)]}),a.jsxs("p",{className:"stat--ap",children:["Post-mitigation:"," ",Math.round((50+s.ap*40/100)*(1-e.defMagRed))," /"," ",Math.round((90+s.ap*40/100)*(1-e.defMagRed))," /"," ",Math.round((130+s.ap*40/100)*(1-e.defMagRed))," /"," ",Math.round((170+s.ap*40/100)*(1-e.defMagRed))]}),a.jsx("h5",{className:"stat--magres",children:"Aura bonus damage:"}),a.jsxs("p",{className:"stat--ap",children:[Math.round(8+s.ap*20/100)," /"," ",Math.round(13+s.ap*20/100)," /"," ",Math.round(18+s.ap*20/100)," /"," ",Math.round(23+s.ap*20/100)]}),a.jsx("br",{}),a.jsxs("p",{children:["Deals ",a.jsx("span",{className:"stat--ap",children:"50 / 90 / 130 / 170 (+40% AP) magic damage"})," to two nearest enemies."]}),a.jsxs("p",{children:[a.jsx("b",{children:"Aura:"})," Enhances allied champions' next attack to deal an additional ",a.jsx("span",{className:"stat--ap",children:"8 / 13 / 18 / 23 (+20% AP) magic damage"})]})]})},{description:a.jsxs("div",{className:"abilityDescription",children:[a.jsxs("h4",{children:[a.jsx("span",{className:"marker--ability",children:"2"})," ARIA OF PERSEVERANCE"]}),a.jsxs("h5",{children:["Cooldown:"," ",(10*(e.atkcdr-i)).toFixed(1)]}),a.jsxs("h5",{className:"stat--mana",children:["Cost:"," ",85," /"," ",90," /"," ",95," /"," ",100]}),a.jsx("h5",{className:"stat--hp",children:"Healing:"}),a.jsxs("p",{className:"stat--hp",children:[Math.round(25+s.ap*20/100)," /"," ",Math.round(40+s.ap*20/100)," /"," ",Math.round(55+s.ap*20/100)," /"," ",Math.round(70+s.ap*20/100)]}),a.jsx("h5",{className:"stat--armor",children:"Aura Shield:"}),a.jsxs("p",{className:"stat--hp",children:[Math.round(25+s.ap*18/100)," /"," ",Math.round(50+s.ap*18/100)," /"," ",Math.round(75+s.ap*18/100)," /"," ",Math.round(100+s.ap*18/100)]}),a.jsx("br",{}),a.jsxs("p",{children:["Heals herself and another allied champion for ",a.jsxs("span",{className:"stat--hp",children:["25 / 40 / 55 / 70 (",a.jsx("span",{className:"stat--ap",children:"+20% AP"}),") health"]}),"."]}),a.jsxs("p",{children:[a.jsx("b",{children:"Aura:"})," Grants allied champions a shield that absorbs ",a.jsxs("span",{className:"stat--hp",children:["25 / 50 / 75 / 100 (",a.jsx("span",{className:"stat--ap",children:"+18% AP"}),") damage"]})," for 3 seconds."]})]})},{description:a.jsxs("div",{className:"abilityDescription",children:[a.jsxs("h4",{children:[a.jsx("span",{className:"marker--ability",children:"3"})," SONG OF CELERITY"]}),a.jsxs("h5",{children:["Cooldown:"," ",(14*(e.atkcdr-i)).toFixed(1)]}),a.jsxs("h5",{className:"stat--mana",children:["Cost:"," ",80]}),a.jsx("br",{}),a.jsxs("p",{children:["Gains ",a.jsxs("span",{className:"stat--moveSpeed",children:["10 / 11 / 12 / 13% (",a.jsx("span",{className:"stat--ap",children:"+3% AP"}),") Movement Speed"]})," for 5 seconds."]}),a.jsxs("p",{children:[a.jsx("b",{children:"Aura:"})," Grants allied champions ",a.jsxs("span",{className:"stat--moveSpeed",children:["10 / 11 / 12 / 13% (",a.jsx("span",{className:"stat--ap",children:"+3% AP"}),") Movement Speed"]})]})]})},{description:a.jsxs("div",{className:"abilityDescription",children:[a.jsxs("h4",{children:[a.jsx("span",{className:"marker--ability",children:"ULT"})," CRESCENDO"]}),a.jsxs("h5",{children:["Cooldown:"," ",(80*e.atkcdr).toFixed(1)," /"," ",(70*e.atkcdr).toFixed(1)," /"," ",(60*e.atkcdr).toFixed(1)]}),a.jsxs("h5",{className:"stat--mana",children:["Cost:"," ",100]}),a.jsx("h5",{className:"stat--ap",children:"Damage:"}),a.jsxs("p",{className:"stat--ap",children:["Pre-mitigation:"," ",Math.round(35+s.ap*15/100)," /"," ",Math.round(60+s.ap*15/100)," /"," ",Math.round(85+s.ap*15/100)]}),a.jsxs("p",{className:"stat--ap",children:["Post-mitigation:"," ",Math.round((35+s.ap*15/100)*(1-e.defMagRed))," /"," ",Math.round((60+s.ap*15/100)*(1-e.defMagRed))," /"," ",Math.round((85+s.ap*15/100)*(1-e.defMagRed))]}),a.jsx("p",{children:"The aura will be reinforced for 20s after casting the ability, providing a higher buff effect than usual."}),a.jsxs("p",{children:[a.jsx("b",{children:"ACTIVE: "})," Plays a chord that emits a soundwave every 0.75s as it travels to the target location. The soundwave deals ",a.jsx("span",{className:"stat--ap",children:"35 / 60 / 85 (+15% AP) magic damage"})," and stuns enemies hit for the first time for 1s. Enemies caught inside the chord are also slowed for ",a.jsx("span",{className:"stat--moveSpeed",children:"25% / 30% / 35%"}),"."]})]})}];return a.jsx(a.Fragment,{children:t.map((r,d)=>a.jsx("div",{className:"abilitiesTile",children:a.jsx("div",{children:r.description},d)}))})}export{x as default};
