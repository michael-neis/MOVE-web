import UserModal from './UserModal'
import { useState } from 'react'
import { BsFillFilePersonFill } from "react-icons/bs";


function Header({name}){

    const [showUserModal, setShowUserModal] = useState(false)

    const handleShow = () => {
        setShowUserModal(true)
    }

    const handleClose = () => {
        setShowUserModal(false)
    }

    return(
        <div>
        <div className='profile-icon'>
            <BsFillFilePersonFill onClick={handleShow}/>
        </div>
        <div className="header">
            MOVE
        </div>
        <UserModal handleClose={handleClose} showUserModal={showUserModal} name={name}/>
        </div>
    )
}

export default Header