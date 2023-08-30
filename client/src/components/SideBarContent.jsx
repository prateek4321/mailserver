import { useState } from 'react';
import { Button, List, ListItem, Box, styled } from '@mui/material';
import ComposeMail from './ComposeMail';
import { SIDEBAR_DATA } from '../config/sidebar.config';  // sidebar data array has been imported
import { CreateOutlined } from '@mui/icons-material';
import { NavLink, useParams } from 'react-router-dom';  // use params a custom hook to use param in url
import { routes } from '../routes/routes';
// &>ul directs to the items of the sidebar, cursor:pointer shows a hand as pointer
// & > ul > li > svg  in list items, we go to an item by(li) and then we target the svg icon
const Container = styled(Box)`
    padding: 8px;
    & > ul {  
        padding: 10px 0 0 5px;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
        & > a {
            text-decoration: none;
            color: inherit;
        }
        & > a > li > svg {
            margin-right: 20px;
        }
    }
`
// compose button styling
const ComposeButton = styled(Button)`  
    background: #c2e7ff;
    color: #001d35;
    border-radius: 16px;
    padding: 15px;
    min-width: 140px;
    text-transform: none;  
`
// text transform converts the text to uppercase, to get it in lowercase, we set it to none
const SideBarContent = () => {

    const [openDrawer, setOpenDrawer] = useState(false); // usestate used to change state on clicking the button compose
    // opendrawer is the current state and setopen changes its state
    const { type } = useParams();

    const onComposeClick = () => {
        setOpenDrawer(true);  // on click of compoes this function is called and we set the state to true   
    }
    // create outlined is the pen of compose button
    return (
        <Container>
            <ComposeButton onClick={() => onComposeClick()}>
                <CreateOutlined style={{ marginRight: 10 }} />Compose
            </ComposeButton>
            <List>
                {   // navlink to navigate between different views/components
                    SIDEBAR_DATA.map(data => (  // so through a loop (by using map) we iterate the sidebar items from sidebar.config array (named SIDEBAR)
                        <NavLink key={data.name} to={`${routes.emails.path}/${data.name}`}>  
                            <ListItem style={ type === data.name.toLowerCase() ? {  // checking params(url we opened) and this data(which type we have) is equal
                                backgroundColor: '#d3e3fd',     // if they match we need to change css of sidebar button(the page we have opened)
                                borderRadius: '0 16px 16px 0'  // data.name is the list item name and data.icon is the icon set for this item
                            } : {}}><data.icon fontSize="small" />{data.title}</ListItem> 
                        </NavLink>
                    )) // fontsize works as a prop 
                }
            </List>
            <ComposeMail open={openDrawer} setOpenDrawer={setOpenDrawer} />
        </Container> // so in composemail we send the state of drawer as true or false
        // setopendrawer is passed so that it can be used in composemail to switch its state to false on clicking the delete icon to close the pop up
    )
}

export default SideBarContent;