import React from 'react'
import { CustomStackFullWidth } from '../../styled-components/CustomStyles.style'
import CustomImageContainer from '../CustomImageContainer'
import RestaurantCoupon from './RestaurantCoupon'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import 'react-multi-carousel/lib/styles.css'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { Stack } from '@mui/system'
import { useQuery } from 'react-query'
import { CouponApi } from '../../hooks/react-query/config/couponApi'
import { onErrorResponse, onSingleErrorResponse } from '../ErrorResponse'
import { useSelector } from 'react-redux'
import { NoSsr } from '@mui/material'

const RestaurantRightDetails = ({ details, restaurantCoverUrl }) => {
    const theme = useTheme()
    const isSmall = useMediaQuery(theme.breakpoints.down('sm'))
    const { userData } = useSelector((state) => state.user)

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
    }
    const { data } = useQuery(
        'restaurant-coupon',
        () => CouponApi.restaurantCoupon(userData?.id, details?.id),
        {
            onError: onErrorResponse,
        }
    )

    return (
        <NoSsr>
            <CustomStackFullWidth
                sx={{
                    position: !isSmall && 'relative',
                    background: (theme) => theme.palette.neutral[100],
                }}
            >
                {!isSmall && (
                    <NoSsr>
                        <CustomImageContainer
                            src={`${restaurantCoverUrl}/${details.cover_photo}`}
                            height="250px"
                            width="100%"
                            objectFit="cover"
                        />
                    </NoSsr>
                )}
                {data?.data.length > 0 && (
                    <Stack
                        sx={{
                            maxWidth: '373px',
                            width: '100%',
                            position: !isSmall && 'absolute',
                            bottom: '2%',
                            left: 'unset',
                            right: '1%',
                            borderRadius: '5px',
                            // height:"100%"
                        }}
                    >
                        <Slider {...settings}>
                            {data?.data?.map((coupon) => {
                                return (
                                    <Stack key={coupon?.id}>
                                        <RestaurantCoupon coupon={coupon} />
                                    </Stack>
                                )
                            })}
                        </Slider>
                    </Stack>
                )}
            </CustomStackFullWidth>
        </NoSsr>
    )
}

export default RestaurantRightDetails
