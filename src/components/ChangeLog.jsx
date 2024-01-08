import { useState } from "react"
export default function ChangeLog() {
  
  const [contentVisible, setContentVisible] = useState(false);
  return (  
    
    

    <div className='bugsTile'>
      <button onClick={() => setContentVisible(!contentVisible)}>
      Show / hide changelog
      </button>

          {contentVisible && (<><p>In progress:</p>
          <ul>
            <li>Runes</li>
            </ul>
          <br />

          <p>latest updates:</p>
          <ul>
            <li>Night of 08-09.01 Runes finished</li>
            <li>Keystones implemented</li>
            <li>29.12 Added Zyra, updated for 4.4d, Added Malphite passive armor from W with switch on ability page;</li>
            <li>07.12 Updated for 4.4c</li>
            <li>~01.12 The navigation is not as bad is it was now;</li>
            <li>24.11 Sivir added (new method for calculations in the background, shouldn't be any difference on the output);</li>
            <li>23.11 updated for 4.4b (no Sivir);</li>
            <li>10.11 Updated for patch 4.4a;</li>
            <li>03.11 Fiddlesticks hotfix;</li>
            <li>01.11 All champs done;</li>
            <li>31.10 added: Twisted Fate, Twitch, Urgot, Varus, Vayne, Veigar, Vex, Vi, Vladimir, Volibear;</li>
            <li>30.10 added: Sona, Soraka, Swain (+ stacks), Teemo, Thresh (+stacks), Tristana, Tryndamere;</li>
            <li>29.10: added: Senna, Seraphine, Shen, Shyvana, Singed, Sion;</li>
            <li>Force of Nature damage reduction now works;</li>
            <li>Darius, Jax, Singed, Sion, Singed, Rengar, Nasus: abilities with stacks / added bonuses now can be properly used.</li>
          </ul></>)}

    </div>
  )
}