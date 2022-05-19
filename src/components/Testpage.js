import { useState } from "react"

function Testpage(){

    const [moveTitle, setMoveTitle] = useState()

    return(
        <div>
            <h1>Moves list</h1>
            <ul>
                <li>moves here</li>
            </ul>

            <h1>Users list</h1>
            <ul>
                <li>users here</li>
            </ul>

            <h1>Create Move</h1>
            <form>
                <input type="text" value={moveTitle} onChange={(e) => setMoveTitle(e.target.value)}/>
            </form>

            
        </div>
    )
}

export default Testpage