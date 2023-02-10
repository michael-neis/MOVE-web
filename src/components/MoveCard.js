// import { useNavigate } from 'react-router-dom';

function MoveCard(){

const handleClick = () => {
    console.log("hello there")
}

    return(
        <div className="move-card" onClick={handleClick}>
            <img alt={'move image'} src={'https://img.favpng.com/14/6/10/jake-the-dog-roblox-finn-the-human-drawing-png-favpng-UTUQSu8ThSx9Ab5hdTeU7Jyzf.jpg'}/>
            <p>Move Title</p>
        </div>
    )
}

export default MoveCard