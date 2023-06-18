import { alpha, Grid, Stack, styled, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import StarIcon from '@mui/icons-material/Star'
import Link from 'next/link'
import { HomeTextTypography } from '../home/HomeStyle'
import useMediaQuery from '@mui/material/useMediaQuery'
import {
    RestaurantDiscountStack,
    OfferTypography,
} from '../food-card/FoodCard.style'
import {
    getAmount,
    getDiscountForTag,
    restaurantDiscountTag,
} from '../../utils/customFunctions'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@mui/material/styles'
import { useSelector } from 'react-redux'
import placeholder from '../../../public/static/no-image-found.png'
import Card from '@mui/material/Card'
import CustomImageContainer from '../CustomImageContainer'
import FoodRating from '../food-card/FoodRating'
import {
    CustomPaperBigCard,
    CustomStackFullWidth,
} from '../../styled-components/CustomStyles.style'
import { CustomTypographyEllipsis } from '../../styled-components/CustomTypographies.style'
import { useQuery } from 'react-query'
import { CouponApi } from '../../hooks/react-query/config/couponApi'
import { onErrorResponse } from '../ErrorResponse'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import 'react-multi-carousel/lib/styles.css'

export const SliderStack = styled(Stack)(
    ({ theme, languageDirection, gap, hasDiscount }) => ({
        '& .slick-slider': {
            width: hasDiscount ? '60px !important' : '100px !important',
            alignItems: 'center',
            '& .slick-list': {
                width: hasDiscount ? '75px !important ' : '100% !important ',
                '& .slick-track': {
                    width: '215px !important',
                    gap: '0px',
                },
            },
        },
    })
)

const RestaurantBoxCard = (props) => {
    const {
        restaurantImageUrl,
        freeDelivery,
        image,
        name,
        rating,
        id,
        active,
        open,
        restaurantDiscount,
        delivery_time,
        cuisines,
        coupons,
        matchesToSmall,
        slug,
    } = props
    const { t } = useTranslation()
    const languageDirection = localStorage.getItem('direction')
    const { userData } = useSelector((state) => state.user)
    const { global } = useSelector((state) => state.globalSettings)
    const restaurantIdOrSlug = slug ? slug : id
    let currencySymbol
    let currencySymbolDirection
    let digitAfterDecimalPoint

    if (global) {
        currencySymbol = global.currency_symbol
        currencySymbolDirection = global.currency_symbol_direction
        digitAfterDecimalPoint = global.digit_after_decimal_point
    }
    const logo = `${restaurantImageUrl}/${image}`
    const theme = useTheme()

    const settings = {
        dots: false,
        infinite: true,
        fade: true,

        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
    }
    const hasDiscount = restaurantDiscountTag(restaurantDiscount, freeDelivery)
    const restaurantCouponAndDiscount = () => {
        if (
            restaurantDiscountTag(restaurantDiscount, freeDelivery) ||
            coupons?.length > 0
        ) {
            return (
                <RestaurantDiscountStack
                    direction="row"
                    spacing={0.5}
                    justifyContent="center"
                    alignItems="center"
                >
                    {hasDiscount && (
                        <Typography fontSize="13px" fontWeight="700">
                            {restaurantDiscountTag(
                                restaurantDiscount,
                                freeDelivery,
                                currencySymbolDirection,
                                currencySymbol,
                                digitAfterDecimalPoint
                            )}
                            {coupons?.length > 0 && (
                                <Typography
                                    fontWeight="700"
                                    component="span"
                                    fontSize="13px"
                                    marginLeft="5px"
                                >
                                    |
                                </Typography>
                            )}
                        </Typography>
                    )}
                    <SliderStack hasDiscount={hasDiscount}>
                        {coupons?.length > 0 && (
                            <Slider {...settings}>
                                {coupons?.map((coupon) => {
                                    return (
                                        <Typography
                                            fontSize="13px"
                                            align={
                                                hasDiscount
                                                    ? languageDirection ===
                                                      'rtl'
                                                        ? 'right'
                                                        : 'left'
                                                    : 'center'
                                            }
                                            fontWeight="700"
                                            marginBottom="auto"
                                            marginTop="auto"
                                            marginLeft="-3"
                                        >
                                            {coupon?.code}
                                        </Typography>
                                    )
                                })}
                            </Slider>
                        )}
                    </SliderStack>
                </RestaurantDiscountStack>
            )
        }
    }

    const restaurantCloseHandler = () => {
        if (active) {
            if (open === 0) {
                return (
                    <Stack
                        sx={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            width: '100%',
                            background: (theme) =>
                                alpha(theme.palette.primary.overLay, 0.5),

                            color: 'theme.palette.whiteContainer.main',
                            height: '100%',
                            justifyContent: 'center',
                            zIndex: 1,
                            backdropFilter: 'blur(1.5px)',
                            borderRadius: '5px',
                        }}
                    >
                        <Typography
                            variant="h4"
                            align="center"
                            color={theme.palette.whiteContainer.main}
                            sx={{
                                textTransform: 'uppercase',
                                position: 'relative',
                                zIndex: 1,
                            }}
                        >
                            {t('Closed Now')}
                        </Typography>
                    </Stack>
                )
            }
        } else {
            return (
                <Stack
                    sx={{
                        position: 'absolute',
                        zIndex: 2,
                        bottom: 0,
                        left: 0,
                        width: '100%',
                        background: (theme) =>
                            alpha(theme.palette.primary.overLay, 0.5),

                        color: 'theme.palette.whiteContainer.main',
                        height: '100%',
                        justifyContent: 'center',
                        borderRadius: '5px',
                    }}
                >
                    <Typography
                        variant="h4"
                        align="center"
                        color={theme.palette.whiteContainer.main}
                        sx={{ textTransform: 'uppercase', fontWeight: '700' }}
                    >
                        {t('Closed Now')}
                    </Typography>
                </Stack>
            )
        }
    }
    return (
        <>
            <Link href={`/restaurant/${restaurantIdOrSlug}`} passHref>
                <CustomPaperBigCard
                    nopadding="true"
                    sx={{
                        borderRadius: '3px',
                        padding: '10px 10px 20px 10px',
                        cursor: 'pointer',
                        width: '100%',
                        height: '100%',
                        border: `1px solid ${alpha(
                            theme.palette.primary.main,
                            0.1
                        )}`,
                        '&:hover': {
                            boxShadow: `0px 0px 2px rgba(145, 158, 171, 0.2), 0px 5px 20px ${theme.palette.paperBoxShadow}`,
                        },
                    }}
                >
                    <CustomStackFullWidth spacing={1}>
                        <Stack
                            sx={{ overflow: 'hidden', position: 'relative' }}
                        >
                            {restaurantCloseHandler()}
                            {restaurantCouponAndDiscount()}

                            <Box
                                sx={{
                                    width: '100%',
                                    height: '130px',
                                    transition: `${theme.transitions.create(
                                        ['background-color', 'transform'],
                                        {
                                            duration:
                                                theme.transitions.duration
                                                    .standard,
                                        }
                                    )}`,
                                    '&:hover': {
                                        transform: 'scale(1.1)',
                                    },
                                }}
                            >
                                <CustomImageContainer
                                    src={`${restaurantImageUrl}/${image}`}
                                    width="100%"
                                    height="100%"
                                    objectFit="contained"
                                    borderRadius="5px"
                                />
                            </Box>
                        </Stack>
                        <CustomStackFullWidth paddingX="5px" spacing={0.4}>
                            <Stack
                                direction="row"
                                justifyContent="space-between"
                                sx={{ position: 'relative' }}
                            >
                                <HomeTextTypography>{name}</HomeTextTypography>
                                <FoodRating product_avg_rating={rating} />
                            </Stack>
                            <Stack
                                direction="row"
                                spacing={0.5}
                                flexWrap="wrap"
                                sx={{
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                }}
                            >
                                {cuisines?.length > 0 &&
                                    cuisines?.map((cuisine, index) => (
                                        <CustomTypographyEllipsis
                                            align="left"
                                            fontSize="12px"
                                            color={theme.palette.neutral[600]}
                                        >
                                            {' '}
                                            {cuisine?.name}{' '}
                                            {cuisines.length - 1 === index
                                                ? ''
                                                : ','}
                                        </CustomTypographyEllipsis>
                                    ))}
                            </Stack>
                            <Typography
                                align="left"
                                fontSize="12px"
                                color={theme.palette.neutral[600]}
                            >
                                {delivery_time} {t('min')}
                                {freeDelivery && (
                                    <Typography
                                        component="span"
                                        fontSize="12px"
                                        color={theme.palette.neutral[600]}
                                        marginLeft="5px"
                                    >
                                        {t('Free Delivery')}
                                    </Typography>
                                )}
                            </Typography>
                        </CustomStackFullWidth>
                    </CustomStackFullWidth>
                </CustomPaperBigCard>
            </Link>
        </>
    )
}

export default RestaurantBoxCard
