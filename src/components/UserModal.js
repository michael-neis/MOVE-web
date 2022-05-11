import { Modal } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { logout } from "../firebase";

function UserModal({showUserModal, handleClose, name}){

    let history = useNavigate();

    const handleLogout = () => {
        handleClose();
        logout()
    }

    const handleEditProfile = () => {
        handleClose();
        console.log('should lead to edit page once created')
    }


    return(
    <>
    <Modal show={showUserModal} onHide={handleClose}>
        <Modal.Header >
            <Modal.Title>{name}</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
            <button className='nes-btn is-primary' style={{fontSize: 10, marginRight: 10}} onClick={handleEditProfile}>
                My Profile
            </button>
            <button className='nes-btn is-warning' style={{fontSize: 10}} variant="warning" onClick={handleLogout}>
                Logout
            </button>
        </Modal.Footer>
    </Modal>
    </>
    )
}

export default UserModal