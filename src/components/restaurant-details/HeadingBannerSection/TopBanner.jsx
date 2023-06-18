import { Box, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { styled, useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import RestaurantLeftDetails from '../RestaurantLeftDetails'
import RestaurantRightDetails from '../RestaurantRightDetails'
import { useGetScreenPosition } from '../../../hooks/custom-hooks/useGetScreenPosition'

const StyledImageBox = styled(Box)(({ theme, height, objectfit }) => ({
    height: height,
    width: '100%',
    borderRadius: '0.125rem',
    position: 'relative',
    '& img': {
        width: '100%',
        height: '100%',
        objectFit: objectfit ? objectfit : 'contained',
    },
}))
const TopBanner = ({ details }) => {
    const { global } = useSelector((state) => state.globalSettings)

    let currencySymbol
    let currencySymbolDirection
    let digitAfterDecimalPoint

    if (global) {
        currencySymbol = global.currency_symbol
        currencySymbolDirection = global.currency_symbol_direction
        digitAfterDecimalPoint = global.digit_after_decimal_point
    }
    const restaurantCoverUrl = global?.base_urls?.restaurant_cover_photo_url
    const theme = useTheme()
    const isSmall = useMediaQuery(theme.breakpoints.down('md'))
    const freeDelivery = details?.free_delivery
    const restaurantDiscount = details.discount
    const scrollPosition = useGetScreenPosition()
    return (
        <>
            <Grid
                container
                spacing={{ xs: '1rem', sm: '0rem', md: '0rem' }}
                sx={{
                    position: 'sticky',
                    top: '-39px',
                    zIndex: 999,
                    [theme.breakpoints.down('sm')]: {
                        top: '0px',
                    },
                }}
            >
                <Grid item container xs={12} sm={12} md={4.5}>
                    <RestaurantLeftDetails
                        details={details}
                        restaurantCoverUrl={restaurantCoverUrl}
                        currencySymbol={currencySymbol}
                        currencySymbolDirection={currencySymbolDirection}
                        digitAfterDecimalPoint={digitAfterDecimalPoint}
                        scrollPosition={scrollPosition}
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={7.5}>
                    {!isSmall && (
                        <RestaurantRightDetails
                            details={details}
                            restaurantCoverUrl={restaurantCoverUrl}
                        />
                    )}
                </Grid>
            </Grid>
        </>
    )
}

export default TopBanner
