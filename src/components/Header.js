import {Link} from 'react-router-dom'
import UserModal from './UserModal'
import { useState } from 'react'
import styled from 'styled-components'

function Header({user, name}){

    const [showUserModal, setShowUserModal] = useState(false)

    const handleShow = () => {
        setShowUserModal(true)
    }

    const handleClose = () => {
        setShowUserModal(false)
    }

    return(
        <div>
        {/* <Link to="/" style={{ textDecoration: 'none', marginLeft: "2%" }}>
            <button className="nes-btn is-warning" style={{textAlign: 'center'}}>
                <img className="nes-avatar" alt="Home Button" src="https://cdn-icons-png.flaticon.com/512/25/25694.png" style={{imageRendering: "pixelated"}}/>
            </button>
        </Link> */}
        <button className="nes-btn is-primary" onClick={handleShow} style={{ float: 'right'}}>{name}</button>
        <MoveHeader>MOVE</MoveHeader>
        <UserModal handleClose={handleClose} showUserModal={showUserModal} name={name}/>
        </div>
    )
}

export default Header

const MoveHeader = styled.div`
     color: ${props => props.theme.color.headers};
     text-align: center;
     font-size: 300%
 `