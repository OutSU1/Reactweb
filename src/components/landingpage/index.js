import React, { useState, useEffect } from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import Container from '@mui/material/Container'
import HeroSection from './HeroSection'
import FunFactSection from './FunFactSection'
import BannerSection from './BannerSection'
import LinkSection from './link-section/LinkSection'
import DownloadSection from './DownloadSection'

import DiscountBanner from './DiscountBanner'
import { useGetLandingPageData } from '../../hooks/react-query/landing-page/useGetLandingPageData'
import { useDispatch, useSelector } from 'react-redux'
import { setLandingPageData } from '../../redux/slices/storedData'
import { NoSsr } from '@mui/material'

const LandingPage = (props) => {
    const { global } = props
    const [zoneid, setZoneid] = useState(null)
    const dispatch = useDispatch()
    const { landingPageData } = useSelector((state) => state.storedData)
    useEffect(async () => {
        if (typeof window !== 'undefined') {
            setZoneid(JSON.parse(localStorage.getItem('zoneid')))
        }
    }, [])
    const handleModalClose = () => {}

    const onSuccessHandler = (res) => {
        dispatch(setLandingPageData(res))
    }

    const { data, refetch, isLoading } = useGetLandingPageData(onSuccessHandler)
    useEffect(() => {
        if (!landingPageData) {
            refetch()
        }
    }, [])
    return (
        <NoSsr>
            <CssBaseline />
            <HeroSection
                business_name={global?.business_name}
                banner_section_full={landingPageData?.banner_section_full}
                handleModalClose={handleModalClose}
                isLoading={isLoading}
            />
            <FunFactSection
                global={global}
                react_feature={landingPageData?.react_feature}
                isLoading={isLoading}
            />
            <BannerSection
                global={global}
                banner_section_half={landingPageData?.banner_section_half}
                discount_banner={landingPageData?.discount_banner}
                isLoading={isLoading}
            />
            <LinkSection
                self_registration_restaurant={
                    landingPageData?.react_self_registration_restaurant
                }
                self_registration_deliveryMan={
                    landingPageData?.react_self_registration_delivery_man
                }
                isLoading={isLoading}
            />
            <DiscountBanner
                global={global}
                discount_banner={landingPageData?.discount_banner}
                isLoading={isLoading}
            />

            {(Number.parseInt(
                landingPageData?.landing_page_links?.app_url_android_status
            ) === 1 ||
                Number.parseInt(
                    landingPageData?.landing_page_links?.app_url_ios_status
                ) === 1) && (
                <DownloadSection
                    isLoading={isLoading}
                    global={global}
                    app_section_image={landingPageData?.app_section_image}
                    app_section_small_image={
                        landingPageData?.app_section_image_2
                    }
                    landing_page_links={landingPageData?.landing_page_links}
                />
            )}
            {/*</Container>*/}
        </NoSsr>
    )
}

export default LandingPage
