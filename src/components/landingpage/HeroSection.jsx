import React from 'react'
import { Container, Stack } from '@mui/material'

import LandingHeroBanner from '../../../public/static/banners/hero-banner.png'
import ImageNotFound from '../../../public/static/no-image-found.png'

import HeroSectionSm from './HeroSectionSm'
import { useSelector } from 'react-redux'
import Skeleton from '@mui/material/Skeleton'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { Box } from '@mui/system'
import { HeroCardTypography } from './Landingpage.style'
import HeroLocationForm from './HeroLocationForm'
import CustomContainer from '../container'
import { LandingHeroBox } from './landingPageStyle'

const HeroSection = ({
    business_name,
    modalview,
    handleModalClose,
    banner_section_full,
    isLoading,
}) => {
    const { global } = useSelector((state) => state.globalSettings)
    const heroImg = banner_section_full?.banner_section_img_full

    // `${global?.base_urls?.react_landing_page_images}/${heroImg}`

    const theme = useTheme()
    const isXSmall = useMediaQuery(theme.breakpoints.down('sm'))
    return (
        <>
            {!isLoading && (
                <LandingHeroBox
                    global={global}
                    heroImg={heroImg}
                    isXSmall={isXSmall}
                    ImageNotFound={ImageNotFound}
                >
                    <Box
                        sx={{
                            flexGrow: '1',
                            backgroundColor: 'rgba(0, 0, 0, 0.05)',
                        }}
                    ></Box>
                    <CustomContainer>
                        {isLoading ? (
                            <Stack
                                width="100%"
                                paddingTop={{ xs: '30px', md: '60px' }}
                                sx={{
                                    height: {
                                        xs: '137px',
                                        sm: '300px',
                                        md: '300px',
                                    },
                                }}
                            >
                                <Skeleton
                                    variant="rectangular"
                                    animation="pulse"
                                    width="100%"
                                    height="100%"
                                />
                            </Stack>
                        ) : (
                            <>
                                <Stack
                                    height={{
                                        xs: '137px',
                                        sm: '300px',
                                        md: '320px',
                                    }}
                                    width="100%"
                                    paddingY="20px"
                                    paddingX={isXSmall && '1rem'}
                                    justifyContent="center"
                                    alignItems="center"
                                >
                                    <HeroCardTypography
                                        fontSize={{ xs: '24px', sm: '48px' }}
                                        fontWeight="700"
                                    >
                                        {
                                            banner_section_full?.full_banner_section_title
                                        }
                                    </HeroCardTypography>
                                    <HeroCardTypography
                                        fontSize={{ xs: '12px', sm: '18px' }}
                                    >
                                        {
                                            banner_section_full?.full_banner_section_sub_title
                                        }
                                    </HeroCardTypography>
                                    {!isXSmall && (
                                        <HeroLocationForm
                                            mobileview="false"
                                            handleModalClose={handleModalClose}
                                        />
                                    )}
                                </Stack>
                            </>
                        )}
                    </CustomContainer>
                    <Box
                        sx={{
                            flexGrow: '1',
                            backgroundColor: 'rgba(0, 0, 0, 0.05)',
                        }}
                    ></Box>
                </LandingHeroBox>
            )}
            {isXSmall && (
                <HeroLocationForm
                    mobileview="true"
                    handleModalClose={handleModalClose}
                />
            )}
            {isLoading && (
                <Skeleton width="100%" height="250px" variant="rectangular" />
            )}
        </>
    )
}

export default HeroSection
