
import { Drawer, styled } from "@mui/material";  // styles should be imported from material ui

import SideBarContent from "./SideBarContent";

const StyledDrawer = styled(Drawer)`
    margin-top: 54px;
`

const SideBar = ({ toggleDrawer, openDrawer }) => {

    return (
        <StyledDrawer
            anchor='left'  // to shift the drawer to the left side of page
            open={openDrawer}   // generally open remain true, so that when we open page it by default slides out
            // through props the value of openDrawer keeps on toggling and we put this here(now not hardcoded)
            onClose={toggleDrawer}
            hideBackdrop={true}  // when sidebar opens the main page becomes dull/black, turn off this thing
            ModalProps={{
                keepMounted: true, // mounted means that render method is called and component's elements and content are now part of the DOM (visible)
            }}  // keep mounted keep the contents visible, the text is just hided when it goes in, but they are not remounted again to show contents
            variant="persistent" // sidebar (Drawer) will remain open and persistently visible on the screen, even when interacting with the main content or other parts of the user interface
            sx={{
                '& .MuiDrawer-paper': {  // the top part of sidebar which need to be lowered down a bit
                    width: 250,
                    borderRight: 'none',
                    background: '#f5F5F5',
                    marginTop: '64px',  // needed to be put in string to avoid rem sizes
                    height: 'calc(100vh - 64px)'  // to remove the scroll bar from the bottom(total height-the height of top section)
                },
            }}
          >
            <SideBarContent /> 
        </StyledDrawer>
    ) // sidebarcontent is created differently and then this component is added int his sidebar
}

export default SideBar;