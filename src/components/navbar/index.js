import React from 'react'

import { AppBarStyle } from './Navbar.style'
//import SecondNavbar from './second-navbar/SecondNavbar'
// import TopNav from './top-navbar/TopNav'
import dynamic from 'next/dynamic'

const Navigation = () => {
    const SecondNavbar = dynamic(() => import('./second-navbar/SecondNavbar'), {
        ssr: false,
    })
    return (
        <AppBarStyle disableGutters={true}>
            {/*<TopNav />*/}
            <SecondNavbar />
        </AppBarStyle>
    )
}

export default Navigation
