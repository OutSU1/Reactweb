import React, { useEffect, useState } from 'react'
import { CardMedia, IconButton, Typography } from '@mui/material'
import { CustomCardMedia, OfferTypography } from './FoodCard.style'
import { t } from 'i18next'
import CustomImageContainer from '../CustomImageContainer'
import { Box, Stack } from '@mui/system'
import { useSelector } from 'react-redux'
import { getAmount, isAvailable } from '../../utils/customFunctions'
import { CustomOverlayBox } from '../../styled-components/CustomStyles.style'
import { useTheme } from '@mui/material/styles'
import test_image from '../../../public/static/testImage.svg'
import { CustomStackForFoodModal } from '../foodDetail-modal/FoodModalStyle'
import FoodRating from './FoodRating'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'

const ProductCardMedia = (props) => {
    const {
        id,
        discount,
        image,
        height,
        name,
        discount_type,
        restaurant_discount,
        price,
        avg_rating,
        onClick,
        available_time_starts,
        available_time_ends,
        imageUrl,
        addToFavorite,
        isInList,
        deleteWishlistItem,
        available_date_ends,
        minFreeDelivery,
        maxFreeDelivery,
        freeDelivery,
        handleBadge,
        product,
    } = props
    const [languageDirection, setLanguageDirection] = useState('ltr')
    const { global } = useSelector((state) => state.globalSettings)
    const theme = useTheme()
    let currencySymbol
    let currencySymbolDirection
    let digitAfterDecimalPoint

    if (global) {
        currencySymbol = global.currency_symbol
        currencySymbolDirection = global.currency_symbol_direction
        digitAfterDecimalPoint = global.digit_after_decimal_point
    }
    useEffect(() => {
        if (localStorage.getItem('direction')) {
            setLanguageDirection(localStorage.getItem('direction'))
        }
    }, [])

    return (
        <>
            {!image && (
                <Stack sx={{ overflow: 'hidden' }}>
                    <Box
                        onClick={onClick}
                        sx={{
                            position: 'relative',
                            maxHeight: '170px',

                            [theme.breakpoints.down('sm')]: {
                                maxHeight: '140px',
                                // height:" 351px"
                            },
                        }}
                    >
                        {!available_date_ends && (
                            <Stack
                                position="absolute"
                                top="5%"
                                right="5%"
                                zIndex="99"
                            >
                                {!isInList(id) ? (
                                    <IconButton
                                        onClick={(e) => addToFavorite(e)}
                                    >
                                        <FavoriteBorderIcon color="primary" />
                                    </IconButton>
                                ) : (
                                    <IconButton
                                        onClick={(e) =>
                                            deleteWishlistItem(id, e)
                                        }
                                    >
                                        <FavoriteIcon color="primary" />
                                    </IconButton>
                                )}
                            </Stack>
                        )}

                        <Stack
                            position="absolute"
                            top="10%"
                            left="6%"
                            zIndex="1"
                        >
                            {!available_date_ends ? (
                                <FoodRating product_avg_rating={avg_rating} />
                            ) : (
                                <>
                                    {handleBadge(
                                        product,
                                        currencySymbol,
                                        currencySymbolDirection,
                                        digitAfterDecimalPoint,
                                        available_date_ends
                                    )}
                                </>
                            )}
                        </Stack>
                        {!isAvailable(
                            available_time_starts,
                            available_time_ends
                        ) && (
                            <CustomOverlayBox>
                                <Typography align="center" variant="h5">
                                    {t('Not Available now')}
                                </Typography>
                            </CustomOverlayBox>
                        )}
                        <Box
                            sx={{
                                transition: `${theme.transitions.create(
                                    ['background-color', 'transform'],
                                    {
                                        duration:
                                            theme.transitions.duration.standard,
                                    }
                                )}`,
                                '&:hover': {
                                    transform: 'scale(1.1)',
                                },
                            }}
                        >
                            <CustomImageContainer
                                src={imageUrl}
                                width="100%"
                                height="170px"
                                borderRadius="3px"
                                objectFit="contained"
                                smHeight="130px"
                            />
                        </Box>

                        <CustomStackForFoodModal
                            padding="12px"
                            width="100%"
                            direction="row"
                            spacing={1}
                            justifyContent="center"
                            alignItems="flex-end"
                        >
                            <Typography
                                fontSize="12px"
                                color={theme.palette.whiteContainer.main}
                            >
                                {minFreeDelivery}-{maxFreeDelivery} {t('min')}
                            </Typography>
                            <Typography
                                fontSize="12px"
                                color={theme.palette.whiteContainer.main}
                            >
                                {freeDelivery === 1 && t('Free Delivery')}
                            </Typography>
                        </CustomStackForFoodModal>
                    </Box>
                </Stack>
            )}
        </>
    )
}

export default ProductCardMedia
