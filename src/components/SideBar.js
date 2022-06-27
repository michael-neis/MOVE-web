

function Sidebar(){


    return(
        <div className="sidebar">
            <ul className="sidebar_ul">
                <li>
                    <a href="/">Home</a>
                </li>
                <li>
                    <a href="/friends">Friends</a>
                </li>
                <li>
                    <a href="/groups">Groups</a>
                </li>
                <li>
                    <a href="/settings">Settings</a>
                </li>
            </ul>
        </div>
    )
}

export default Sidebar