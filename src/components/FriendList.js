import { useNavigate } from "react-router-dom";

function FriendList(){


    const navigate = useNavigate();

    const findButton = () => {
        navigate('/find_users')
    }

    return(
        <div>
            friends here
            <button onClick={findButton}>Find Users</button>
        </div>
    )
}

export default FriendList