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
            <li>Champion Abilities</li>
            </ul>
          <br />

          <p>latest updates:</p>
          <ul>
            <li>29.10: Senna, Seraphine, Shen, Shyvana, Singed, Sion added;</li>
            <li>Force of Nature damage reduction now works;</li>
            <li>Darius, Jax, Singed, Sion, Singed, Rengar, Nasus: abilities with stacks / added bonuses now can be properly used.</li>
          </ul></>)}

    </div>
  )
}