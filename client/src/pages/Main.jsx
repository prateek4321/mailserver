import { useState, Suspense } from 'react';

import { Header, SideBar } from '../components';
import { Box, styled } from '@mui/material';
import { Outlet } from 'react-router-dom';
import SuspenseLoader from '../components/common/SuspenseLoader';

const Wrapper = styled(Box)`
    display: flex;
`;

const Main = () => {

    const [openDrawer, setOpenDrawer] = useState(true);  // initialized value is true
    // we are managing the state and we need to toggle the value through setopendrawer
    const toggleDrawer = () => {  // use to toggle the value
        setOpenDrawer(prevState => !prevState);  // swithces the value(0->1 or 1->0)
    }
    // sending the props to header to open and close the drawer thorugh button click
    return (
        <>
            <Header toggleDrawer={toggleDrawer} />  
            <Wrapper>
                <SideBar toggleDrawer={toggleDrawer} openDrawer={openDrawer} />
                <Suspense fallback={<SuspenseLoader />} >
                    <Outlet context={{ openDrawer }} />
                </Suspense>
            </Wrapper>
        </>
    )
}

export default Main;