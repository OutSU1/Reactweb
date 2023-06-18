import React, { useEffect } from 'react'
import FooterLg from './FooterLg'
import FooterSm from './FooterSm'
import footerBg from './footerBg.svg'
import { StyledFooterBackground } from './Footer.style'
import { Container } from '@mui/material'
import FooterTop from './FooterTop'
import FooterMiddle from './FooterMiddle'
import FooterBottom from './FooterBottom'
import { CustomStackFullWidth } from '../../styled-components/CustomStyles.style'
import { useRouter } from 'next/router'
import FooterTopSection from './FooterTopSection'
import { landingPageApi } from '../landingpage/Api'
import { useQuery } from 'react-query'
import { onErrorResponse } from '../ErrorResponse'
import { useDispatch, useSelector } from 'react-redux'
import { setLandingPageData } from '../../redux/slices/landingpagedata'
const Footer = ({ languageDirection }) => {
    const dispatch = useDispatch()
    const { landingPage } = useSelector((state) => state.landingPage)
    const router = useRouter()
    const { data, refetch } = useQuery(
        ['landing-page'],
        landingPageApi.getLandingPageImages,
        {
            enabled: false,
            // onSuccess: handleOnSuccess,
            onError: onErrorResponse,
        }
    )

    useEffect(() => {
        if (landingPage === undefined) {
            refetch()
        }
    }, [])
    useEffect(() => {
        if (data) {
            dispatch(setLandingPageData(data))
        }
    }, [data])

    return (
        <>
            <FooterTop />
            <StyledFooterBackground router={router.pathname}>
                <CustomStackFullWidth
                    height="100%"
                    alignItems="center"
                    justifyContent="space-between"
                    paddingTop="50px"
                >
                    <FooterTopSection />
                    <FooterMiddle
                        landingPageLink={landingPage?.data?.landing_page_links}
                    />
                    <FooterBottom />
                </CustomStackFullWidth>
            </StyledFooterBackground>
        </>
    )
}

export default Footer
