import React from 'react'
import {
    CustomOverlayBox,
    CustomStackFullWidth,
} from '../../styled-components/CustomStyles.style'
import CustomImageContainer from '../CustomImageContainer'
import { alpha, Grid, IconButton, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useTheme } from '@mui/material/styles'
import { Box, Stack } from '@mui/system'
import CustomRatings from '../custom-ratings/CustomRatings'
import moment from 'moment'
import {
    getAmount,
    getNumberWithConvertedDecimalPoint,
    isAvailable,
} from '../../utils/customFunctions'
import { t } from 'i18next'
import { addWishListRes, removeWishListRes } from '../../redux/slices/wishList'
import { useWishListResDelete } from '../../hooks/react-query/config/wish-list/useWishListResDelete'
import { useMutation } from 'react-query'
import { RestaurantsApi } from '../../hooks/react-query/config/restaurantApi'
import { toast } from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import useMediaQuery from '@mui/material/useMediaQuery'
import { CustomSideOverLay } from '../home/food-campaign/FoodCampaign.style'
import ClosedNowOverlay from './HeadingBannerSection/ClosedNowOverlay'

const RestaurantLeftDetails = (props) => {
    const {
        details,
        restaurantCoverUrl,
        currencySymbolDirection,
        currencySymbol,
        digitAfterDecimalPoint,
        scrollPosition,
    } = props
    const { wishLists } = useSelector((state) => state.wishList)
    const dispatch = useDispatch()
    const { global } = useSelector((state) => state.globalSettings)
    const { token } = useSelector((state) => state.userToken)
    const theme = useTheme()
    const isSmall = useMediaQuery(theme.breakpoints.down('sm'))
    const { t } = useTranslation()
    const {
        logo,
        name,
        rating_count,
        avg_rating,
        address,
        delivery_time,
        minimum_order,
        latitude,
        longitude,
        id,
        active,
        schedules,
    } = details

    const {
        mutate: addFavoriteMutation,
        isLoading,
        error,
    } = useMutation('add-favourite', () => RestaurantsApi.addFavorite(id), {
        onSuccess: (response) => {
            toast.success(t('Added to Wishlist successfully.'))

            if (response?.data) {
                dispatch(
                    addWishListRes({
                        logo,
                        name,
                        rating_count,
                        avg_rating,
                        address,
                        delivery_time,
                        minimum_order,
                        latitude,
                        longitude,
                        id,
                    })
                )

                //setOpen(false)
            }
        },
        onError: (error) => {},
    })
    const addToFavorite = () => {
        if (token) {
            addFavoriteMutation()
        } else toast.error(t('You are not logged in'))
    }
    const onSuccessHandlerForResDelete = (res, id) => {
        if (res) {
            toast.success(
                t('Removed from  favorite successfully.', {
                    id: 'favorite',
                })
            )
            dispatch(removeWishListRes(id))
        }
    }
    const { mutate: restaurantMutate } = useWishListResDelete(
        onSuccessHandlerForResDelete
    )

    const deleteWishlistRes = (id) => {
        restaurantMutate(id)
    }

    const isInList = (id) => {
        return !!wishLists?.restaurant?.find(
            (wishRestaurant) => wishRestaurant.id === id
        )
    }

    const closedNowHandler = () => {
        if (active) {
            if (schedules.length > 0) {
                const todayInNumber = moment().weekday()
                let isOpen = false
                let filteredSchedules = schedules.filter(
                    (item) => item.day === todayInNumber
                )
                let isAvailableNow = []
                filteredSchedules.forEach((item) => {
                    if (isAvailable(item?.opening_time, item?.closing_time)) {
                        isAvailableNow.push(item)
                    }
                })
                if (isAvailableNow.length > 0) {
                    isOpen = true
                } else {
                    isOpen = false
                }
                if (!isOpen) {
                    return <ClosedNowOverlay t={t} theme={theme} />
                }
            } else {
                return <ClosedNowOverlay t={t} theme={theme} />
            }
        } else {
            return <ClosedNowOverlay t={t} theme={theme} />
        }
    }
    const handleTop = () => {
        return (
            <Grid
                item
                xs={12}
                sm={12}
                md={12}
                sx={{
                    background: '#ffffff1a',
                    backdropFilter: 'blur(10px)',
                    animation: 'fadeIn .9s',
                    '@keyframes fadeIn ': {
                        '0%': {
                            opacity: '0',
                        },
                        '100%': {
                            opacity: '1',
                        },
                    },
                }}
            >
                <CustomStackFullWidth
                    alignItems={{ xs: 'center', sm: 'flex-end' }}
                    justiyfContent="center"
                    direction="row"
                    spacing={1}
                    sx={{
                        padding: {
                            xs: '5px 5px 5px 5px',
                            sm: '20px 20px 20px 20px',
                            md: '25px 25px 30px 25px',
                        },
                        height: '100%',
                    }}
                >
                    <Stack
                        position="absolute"
                        top={
                            scrollPosition === 0
                                ? '5%'
                                : isSmall
                                ? '25%'
                                : '45%'
                        }
                        right="5%"
                        zIndex="999"
                    >
                        {!isInList(id) ? (
                            <IconButton
                                sx={{
                                    background: (theme) =>
                                        theme.palette.neutral[100],
                                    '&:hover': {
                                        backgroundColor: (theme) =>
                                            theme.palette.error.dark,
                                    },
                                }}
                                onClick={(e) => addToFavorite(e)}
                            >
                                <FavoriteBorderIcon color="primary" />
                            </IconButton>
                        ) : (
                            <IconButton
                                sx={{
                                    background: (theme) =>
                                        theme.palette.neutral[100],
                                    '&:hover': {
                                        backgroundColor: (theme) =>
                                            theme.palette.error.dark,
                                    },
                                }}
                                onClick={(e) => deleteWishlistRes(id, e)}
                            >
                                <FavoriteIcon color="primary" />
                            </IconButton>
                        )}
                    </Stack>
                    <Box
                        sx={{
                            width: { xs: '70px', sm: '100px' },
                            height: { xs: '50px', sm: '100px' },
                            borderRadius: '50%',
                            position: 'relative',
                        }}
                    >
                        {closedNowHandler()}
                        <CustomImageContainer
                            src={`${global?.base_urls?.restaurant_image_url}/${details?.logo}`}
                            width="100px"
                            smWidth="50px"
                            height="100%"
                            borderRadius="50%"
                            objectFit="cover"
                        />
                    </Box>
                    <Stack padding="10px" justifyContent="center">
                        <Typography color={theme.palette.whiteContainer.main}>
                            {details?.name}
                        </Typography>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <CustomRatings
                                ratingValue={getNumberWithConvertedDecimalPoint(
                                    details?.avg_rating,
                                    global?.digit_after_decimal_point
                                )}
                                readOnly="true"
                                color={theme.palette.whiteContainer.main}
                            />
                            <Typography
                                color={theme.palette.whiteContainer.main}
                                fontSize="13px"
                                sx={{ textDecoration: 'underline' }}
                            >
                                {JSON.stringify(details?.rating_count)}{' '}
                                {t('Reviews')}
                            </Typography>
                        </Stack>
                        <Typography
                            color="white"
                            fontSize="12px"
                            color={theme.palette.whiteContainer.main}
                        >
                            {details?.address}
                        </Typography>
                    </Stack>
                </CustomStackFullWidth>
            </Grid>
        )
    }
    const handleBottom = () => {
        return (
            <Grid
                container
                item
                xs={12}
                sm={12}
                md={12}
                sx={{ paddingX: '20px' }}
                justifyContent="space-between"
                alignItems="center"
            >
                <Grid xs={6} sm={4} md={4}>
                    <Typography
                        fontSize={{ xs: '20px', md: '24px' }}
                        fontWeight="800"
                        color={theme.palette.whiteContainer.main}
                    >
                        {details?.positive_rating} %
                    </Typography>
                    <Typography
                        fontSize="14px"
                        color={theme.palette.whiteContainer.main}
                    >
                        {t('Positive Review')}
                    </Typography>
                </Grid>
                <Grid xs={6} sm={4} md={4}>
                    <Typography
                        fontSize={{ xs: '20px', md: '24px' }}
                        fontWeight="800"
                        color={theme.palette.whiteContainer.main}
                    >
                        {' '}
                        {getAmount(
                            details?.minimum_order,
                            currencySymbolDirection,
                            currencySymbol,
                            digitAfterDecimalPoint
                        )}
                    </Typography>
                    <Typography
                        fontSize="14px"
                        color={theme.palette.whiteContainer.main}
                    >
                        {t('Minimum Order')}
                    </Typography>
                </Grid>
                <Grid xs={6} sm={4} md={4}>
                    <Typography
                        fontSize={{ xs: '20px', md: '24px' }}
                        fontWeight="800"
                        color={theme.palette.whiteContainer.main}
                    >
                        {details?.delivery_time} {t('min')}
                    </Typography>
                    <Typography
                        fontSize="14px"
                        color={theme.palette.whiteContainer.main}
                    >
                        {t('Delivery Time')}
                    </Typography>
                </Grid>
            </Grid>
        )
    }
    return (
        <CustomStackFullWidth
            sx={{ position: scrollPosition === 0 ? 'inherit' : 'sticky' }}
        >
            <CustomStackFullWidth
                sx={{
                    position: 'relative',
                    boxShadow: '0px 2px 30px 2px rgba(0, 0, 0, 0.08)',
                }}
            >
                <CustomImageContainer
                    src={`${restaurantCoverUrl}/${details.cover_photo}`}
                    height="250px"
                    smHeight={scrollPosition === 0 ? '250px' : '180px'}
                    objectFit="cover"
                />
                <CustomStackFullWidth
                    sx={{
                        position: 'absolute',
                        background: (theme) =>
                            alpha(theme.palette.primary.main, 0.9),
                        height: '100%',
                    }}
                >
                    {scrollPosition === 0 && handleTop()}
                    {scrollPosition === 0 ? handleBottom() : handleTop()}
                </CustomStackFullWidth>
            </CustomStackFullWidth>
        </CustomStackFullWidth>
    )
}

export default RestaurantLeftDetails
