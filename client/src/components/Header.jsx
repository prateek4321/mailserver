

import { AppBar, Toolbar, Box, InputBase, styled } from '@mui/material';
import { Menu as MenuIcon, Tune, HelpOutlineOutlined, SettingsOutlined, 
    AppsOutlined, AccountCircleOutlined, Search } from '@mui/icons-material'
import { logo } from '../constants/constant';
// styled app bar is basically use to apply css directly and then we use the name styled app bar instead of appbar in the below code
const StyledAppBar = styled(AppBar)`  
    background: #f5F5F5;
    box-shadow: none;
`;
// box instead of div allows to direct apply styling on it and also allow to use xm xl to adapt the layout based on screen size
const SearchWrapper = styled(Box)`
    background: #EAF1FB;
    margin-left: 80px;
    border-radius: 8px;
    min-width: 690px;
    max-width: 720px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px; 
    & > div {  
        width: 100%
    }
`
// &>div is used to apply css on this whole search bar(wrapped as box) child element (i.e the text field/inputbase)
const OptionsWrapper = styled(Box)`
    width: 100%;
    display: flex;
    justify-content: end;
    & > svg {
        margin-left: 20px;
    }
`
// & > svg is used to apply styles on this box(which contain all header icons(which are actually svgs)) , justify content: end moves this icons to the right end
const Header = ({ toggleDrawer }) => {  // object destructuring (used to extract props sended by parent)
    // using action in color darkens our menu icon
    return (
        // in searchwrapper, we have wrapped searchicon, textfield like inputbase(more custom and specialized input components) and tune icon
        // on click of the 3 lines button(menuicon), we will call toggledrawer and change the state
        <StyledAppBar position="static">
            <Toolbar>
                <MenuIcon color="action" onClick={toggleDrawer} />   
                <img src={logo} alt="logo" style={{ width: 110, marginLeft: 10,height:50 }} />
                <p style={{color:'black', marginLeft: 10,marginRight: 0}}>Mailing Master</p>
                <SearchWrapper>
                    <Search color="action" /> 
                    <InputBase /> 
                    <Tune  color="action"/>
                </SearchWrapper>
                
                <OptionsWrapper>
                    <HelpOutlineOutlined color="action" />
                    <SettingsOutlined color="action" />
                    <AppsOutlined color="action" />
                    <AccountCircleOutlined color="action" />
               </OptionsWrapper>
            </Toolbar>
        </StyledAppBar>
    )
}

export default Header;