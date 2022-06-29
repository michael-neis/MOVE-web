import { useNavigate } from "react-router-dom";

function GroupList(){


    const navigate = useNavigate();

    const findButton = () => {
        navigate('/find_groups')
    }

    return(
        <div>
            groups here
            <button onClick={findButton}>Find Groups</button>
        </div>
    )
}

export default GroupList