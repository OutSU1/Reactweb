import React, { memo, useRef, useState } from 'react'
import Slider from 'react-slick'
import Box from '@mui/material/Box'
import { Button, Grid, IconButton, Stack, Typography } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import FoodCard from '../../../food-card/FoodCard'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { useDispatch, useSelector } from 'react-redux'
import { useQuery } from 'react-query'
import { MostReviewedApi } from '../../../../hooks/react-query/config/productsApi'
import { useRouter } from 'next/router'
import { AllRoutes } from '../../../../AllRoutes'
import {
    HomeTitleTypography,
    LeftArrowStyle,
    RightArrowStyle,
} from '../../HomeStyle'
import { useTranslation } from 'react-i18next'
import CustomShimmerForBestFood from '../../../CustomShimmer/CustomShimmerForBestFood'
import {
    CustomStackFullWidth,
    CustomViewAll,
    SliderCustom,
} from '../../../../styled-components/CustomStyles.style'
import { CustomTypography } from '../../../custom-tables/Tables.style'
import FeaturedCategoryCard from '../../../featured-category-item/FeaturedCategoryCard'
import CustomShimmerCategories from '../../../CustomShimmer/CustomShimmerCategories'
import { CustomIconButton, CustomSideOverLay } from '../FoodCampaign.style'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { settings } from './SliderSetting'
import { onSingleErrorResponse } from '../../../ErrorResponse'
import best_foods from '../../../../../public/static/best_foods.svg'
import CustomImageContainer from '../../../CustomImageContainer'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import FoodCardShimmer from '../../../food-card/FoodCarShimmer'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { HandleNext, HandlePrev } from '../../../CustomSliderIcon'
import { setHandleHomePage } from '../../../../redux/slices/global'
import Skeleton from '@mui/material/Skeleton'
const BestReviewedFood = ({ data, isLoading }) => {
    const dispatch = useDispatch()
    const { t } = useTranslation()
    const { bestReviewedFoods } = useSelector((state) => state.storedData)
    const [hoverOn, setHoverOn] = useState(false)
    const bestfoodslideRef = useRef(null)
    const foodCampaignSliderRef = useRef(null)
    const router = useRouter()
    const theme = useTheme()
    const isSmall = useMediaQuery(theme.breakpoints.down('md'))
    const isXSmall = useMediaQuery(theme.breakpoints.up('sm'))

    const { global } = useSelector((state) => state.globalSettings)
    const languageDirection = localStorage.getItem('direction')

    const settings = {
        speed: 500,
        slidesToShow: 4.7,
        slidesToScroll: 3,
        initialSlide: 0,
        infinite: false,
        nextArrow: hoverOn && <HandleNext />,
        prevArrow: hoverOn && <HandlePrev />,
        // rtl:true,
        responsive: [
            {
                breakpoint: 1600,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 5,

                    initialSlide: 0,
                    // dots: true
                },
            },
            {
                breakpoint: 1340,
                settings: {
                    slidesToShow: 4.5,
                    slidesToScroll: 5,

                    initialSlide: 0,
                    // dots: true
                },
            },
            {
                breakpoint: 1075,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    initialSlide: 0,
                    // dots: true
                },
            },
            {
                breakpoint: 999,
                settings: {
                    slidesToShow: 3.5,
                    slidesToScroll: 3,

                    // dots: true
                    initialSlide: 0,
                },
            },
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    // initialSlide: 2

                    initialSlide: 0,
                },
            },
            {
                breakpoint: 670,
                settings: {
                    slidesToShow: 2.5,
                    slidesToScroll: 3,

                    initialSlide: 0,
                },
            },
            {
                breakpoint: 540,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 3,

                    initialSlide: 0,
                },
            },
            {
                breakpoint: 400,
                settings: {
                    slidesToShow: 1.7,
                    slidesToScroll: 2,

                    // dots: true
                    initialSlide: 0,
                },
            },
        ],
    }

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
                    page: 'most-reviewed',
                },
            },
            undefined,
            { shallow: router.pathname === '/home' ? true : false }
        )
    }
    return (
        <Grid
            container
            paddingTop={bestReviewedFoods?.length > 0 && '1.9rem'}
            gap="1.4rem"
        >
            {bestReviewedFoods?.length > 0 && (
                <Grid item xs={12} md={12}>
                    <CustomStackFullWidth
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                    >
                        <Stack direction="row" spacing={1}>
                            <CustomImageContainer
                                src={best_foods.src}
                                width="26px"
                                height="26px"
                            />
                            <Typography
                                variant="h3"
                                color={theme.palette.neutral[1000]}
                                fontWeight="500"
                            >
                                {t('Best Reviewed Foods')}
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
                xs={12}
                sm={12}
                md={12}
                onMouseEnter={() => setHoverOn(true)}
                onMouseLeave={() => setHoverOn(false)}
                sx={{ position: 'relative' }}
            >
                {!isLoading ? (
                    <Grid
                        container
                        item
                        lg={12}
                        md={12}
                        xs={12}
                        position="relative"
                    >
                        <CustomStackFullWidth justifyContent="right">
                            <SliderCustom languageDirection={languageDirection}>
                                <Slider
                                    ref={foodCampaignSliderRef}
                                    {...settings}
                                >
                                    {bestReviewedFoods
                                        .slice(0, 10)
                                        .map((product) => {
                                            if (
                                                product?.variations === null ||
                                                product?.variations[0]
                                                    ?.values ||
                                                product?.variations?.length ===
                                                    0
                                            ) {
                                                return (
                                                    <FoodCard
                                                        key={product?.id}
                                                        hasBackGroundSection="false"
                                                        product={product}
                                                        global={global}
                                                        productImageUrl={
                                                            global?.base_urls
                                                                ?.product_image_url
                                                        }
                                                    />
                                                )
                                            }
                                        })}
                                </Slider>
                            </SliderCustom>
                        </CustomStackFullWidth>
                    </Grid>
                ) : (
                    <Stack marginTop="40px" spacing={2}>
                        <Skeleton
                            variant="rectangular"
                            width="400px"
                            height="20px"
                        />
                        <SliderCustom>
                            <Slider {...settings}>
                                <FoodCardShimmer />
                                <FoodCardShimmer />
                                <FoodCardShimmer />
                                <FoodCardShimmer />
                                <FoodCardShimmer />
                            </Slider>
                        </SliderCustom>
                    </Stack>
                )}
                {/*{hoverOn && <CustomSideOverLay left="0" right="unset"  />}*/}
            </Grid>
        </Grid>
    )
}

export default memo(BestReviewedFood)
