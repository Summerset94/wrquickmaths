import ChangeLog from "./ChangeLog"

export default function MainInfo() {

  return (
    <div className='champTile homeTile'>
    <ChangeLog />          
          <br />
          <div className='bugsTile'>
          <p>Runes in progress</p>
          <br /> 

          <p>
            Source code for project: <a href="https://github.com/Summerset94/wrquickmaths" target='_blank'>Github Page</a>  
          </p>

          <br />
          <p>
            For any questions contact me in Discord @summerset94 or <a href="https://twitter.com/wrquickmaths" target='_blank'>twitter</a> 
          </p>
          </div>
        </div>
  )
}