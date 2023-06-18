import React from 'react'
import CustomContainer from '../container'
import { CustomStackFullWidth } from '../../styled-components/CustomStyles.style'
import { alpha, Stack } from '@mui/material'
import { DiscountBannerBox, LandingPageTypography } from './landingPageStyle'
import Card from '@mui/material/Card'
import Skeleton from '@mui/material/Skeleton'
import { useTheme } from '@mui/material/styles'
import { Box } from '@mui/system'

const DiscountBanner = ({ discount_banner, global }) => {
    const theme = useTheme()
    return (
        <CustomContainer>
            <CustomStackFullWidth
                sx={{ mt: { xs: '10px', sm: '20px', md: '25px' } }}
            >
                {discount_banner ? (
                    discount_banner && (
                        <DiscountBannerBox
                            sx={{
                                backgroundImage: `url(${`${global?.base_urls?.react_landing_page_images}/${discount_banner.img}`})`,
                            }}
                        >
                            <LandingPageTypography
                                fontSize={{
                                    xs: '14px',
                                    sm: '30px',
                                    md: '40px',
                                }}
                                fontWeight="700"
                                sx={{ color: theme.palette.primary.main }}
                            >
                                {discount_banner.title}
                            </LandingPageTypography>
                            <LandingPageTypography
                                sx={{
                                    color: theme.palette.primary.main,
                                    mt: 1,
                                    textAlign: 'center',
                                    maxWidth: { xs: '270px', sm: '500px' },
                                }}
                                fontSize={{ xs: '10px', md: '20px' }}
                                fontWeight="500"
                            >
                                {discount_banner.sub_title}
                            </LandingPageTypography>
                        </DiscountBannerBox>
                    )
                ) : (
                    <Stack width="100%" className="banner-item lg">
                        <Card elevation={0}>
                            <Skeleton
                                variant="rectangular"
                                width="100%"
                                height="180px"
                            />
                        </Card>
                    </Stack>
                )}
            </CustomStackFullWidth>
        </CustomContainer>
    )
}

export default DiscountBanner
