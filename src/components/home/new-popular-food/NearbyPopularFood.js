import React, { memo, useRef } from 'react'
import { Box, Stack, Typography } from '@mui/material'
import { IconButton, Grid, CircularProgress } from '@mui/material'
import fire_image from '../../../../public/static/fire.svg'
import FoodCard from '../../food-card/FoodCard'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { useSelector } from 'react-redux'

import { AllRoutes } from '../../../AllRoutes'
import { useTranslation } from 'react-i18next'

import CustomImageContainer from '../../CustomImageContainer'

import {
    CustomStackFullWidth,
    CustomViewAll,
} from '../../../styled-components/CustomStyles.style'

import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import FoodCardHorizontalShimmer from '../../food-card/FoodCardHorizontalShimmer'
import { useRouter } from 'next/router'

const NearbyPopularFood = ({ data, isLoading, isFetching }) => {
    const { t } = useTranslation()
    const router = useRouter()
    const { global } = useSelector((state) => state.globalSettings)
    const { popularFood } = useSelector((state) => state.storedData)
    const theme = useTheme()
    const isXSmall = useMediaQuery(theme.breakpoints.up('sm'))
    const matches = useMediaQuery('(max-width:825px)')
    let languageDirection = undefined
    if (typeof window !== 'undefined') {
        languageDirection = localStorage.getItem('direction')
    }
    const limit = 6
    const handleClick = () => {
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth',
        })
        router.push(
            {
                pathname:
                    router.pathname === '/home'
                        ? window.location.pathname
                        : 'search',
                query: {
                    page: 'popular',
                },
            },
            undefined,
            { shallow: router.pathname === '/home' ? true : false }
        )
    }
    return (
        <>
            <Grid
                container
                paddingTop={popularFood.length > 0 && '1.9rem'}
                gap="1.4rem"
            >
                {popularFood.length > 0 && (
                    <Grid item xs={12} md={12} sm={12} lg={12}>
                        <CustomStackFullWidth
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                        >
                            <Stack direction="row" spacing={1}>
                                <CustomImageContainer
                                    src={fire_image.src}
                                    width="26px"
                                    height="26px"
                                />
                                <Typography
                                    variant="h3"
                                    color={theme.palette.neutral[1000]}
                                    fontWeight="500"
                                >
                                    {t('Popular in your area')}
                                </Typography>
                            </Stack>
                            <CustomViewAll
                                onClick={handleClick}
                                direction="row"
                                spacing={1}
                                alignItems="center"
                            >
                                {isXSmall && (
                                    <Typography>{t('View all')}</Typography>
                                )}
                                <IconButton
                                    sx={{
                                        filter: 'drop-shadow(0px 1px 3px rgba(0, 0, 0, 0.1))',
                                        flex: 'none',
                                        order: '1',
                                        flexGrow: '0',
                                        boxShadow: 3,
                                    }}
                                >
                                    <KeyboardArrowRightIcon
                                        color="primary"
                                        style={{
                                            width: '19px',
                                            height: '19px',
                                            transform:
                                                languageDirection === 'rtl' &&
                                                'rotate(180deg)',
                                        }}
                                        fontWeight="700"
                                    />
                                </IconButton>
                            </CustomViewAll>
                        </CustomStackFullWidth>
                    </Grid>
                )}
                <Grid
                    item
                    container
                    xs={12}
                    md={12}
                    sm={12}
                    lg={12}
                    sx={{
                        background:
                            popularFood.length > 0 &&
                            ((theme) => theme.palette.sectionBg),
                        padding: '20px',
                        [theme.breakpoints.down('sm')]: {
                            padding: '10px',
                        },
                    }}
                >
                    {popularFood?.slice(0, limit).map((product) => {
                        if (
                            product?.variations === null ||
                            product?.variations[0]?.values ||
                            product?.variations?.length === 0
                        ) {
                            return (
                                <Grid
                                    item
                                    xs={12}
                                    sm={matches ? 12 : 6}
                                    md={6}
                                    lg={4}
                                    key={product?.id}
                                    padding={{ xs: 0.5, sm: 1, md: 1 }}
                                >
                                    <FoodCard
                                        product={product}
                                        productImageUrl={
                                            global?.base_urls?.product_image_url
                                        }
                                        horizontal="true"
                                        hasBackGroundSection="true"
                                    />
                                </Grid>
                            )
                        }
                    })}
                    {isLoading &&
                        [...Array(6)].map((item) => (
                            <Grid
                                item
                                xs={12}
                                sm={matches ? 12 : 6}
                                md={6}
                                lg={4}
                                padding={{ xs: 0.5, sm: 1, md: 1 }}
                            >
                                <FoodCardHorizontalShimmer />
                            </Grid>
                        ))}
                </Grid>
            </Grid>
        </>
    )
}

export default memo(NearbyPopularFood)
