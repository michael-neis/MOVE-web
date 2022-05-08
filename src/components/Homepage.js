import styled from 'styled-components';

function Homepage () {




    return(
        <Header>
            <h1>MOVE</h1>
        </Header>
    )
}

export default Homepage

const Header = styled.div`
    color: ${props => props.theme.color.headers};
    text-align: center
`