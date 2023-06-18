import React from 'react'
import { CustomFoodCard, CustomFoodCardNew } from './FoodCard.style'
import CustomImageContainer from '../CustomImageContainer'
import test_image from '../../../public/static/testImage.svg'
import { CustomStackForFoodModal } from '../foodDetail-modal/FoodModalStyle'
import { Chip, IconButton, Typography } from '@mui/material'
import ProductCardMedia from './ProductCardMedia'
import VagSvg from '../foodDetail-modal/VagSvg'
import { Stack } from '@mui/system'
import { useTheme } from '@mui/material/styles'
import { CustomStackFullWidth } from '../../styled-components/CustomStyles.style'
import { CustomTypographyGray } from '../error/Errors.style'
import StartPriceView from '../foodDetail-modal/StartPriceView'
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined'
import { useSelector } from 'react-redux'
import { CustomTypographyEllipsis } from '../../styled-components/CustomTypographies.style'
import AfterAddToCart from './AfterAddToCart'
const FoodVerticalCard = (props) => {
    const {
        product,
        setOpenModal,
        productImageUrl,
        handleFoodDetailModal,
        deleteWishlistItem,
        isInList,
        addToFavorite,
        imageUrl,
        handleBadge,
        addToCart,
        isInCart,
        getQuantity,
        incrOpen,
        setIncrOpen,
        handleClickQuantityButton,
        hasBackGroundSection,
    } = props

    const { global } = useSelector((state) => state.globalSettings)
    const theme = useTheme()
    return (
        <CustomFoodCardNew
            maxwidth="240px"
            smheight="240px"
            height="290px"
            onClick={(e) => handleFoodDetailModal(e)}
            background={
                hasBackGroundSection === 'true'
                    ? theme.palette.cardBackground1
                    : theme.palette.cardBackground2
            }
        >
            <CustomStackFullWidth spacing={1.3}>
                <ProductCardMedia
                    imageUrl={imageUrl}
                    avg_rating={product?.avg_rating}
                    discount={product?.discount}
                    discount_type={product?.discount_type}
                    restaurant_discount={product?.restaurant_discount}
                    alt={name}
                    price={product?.price}
                    onClick={handleFoodDetailModal}
                    available_time_ends={product?.available_time_ends}
                    available_time_starts={product?.available_time_starts}
                    available_date_ends={product?.available_date_ends}
                    deleteWishlistItem={deleteWishlistItem}
                    isInList={isInList}
                    addToFavorite={addToFavorite}
                    id={product?.id}
                    deliveryTime={product?.delivery_time}
                    minFreeDelivery={product?.min_delivery_time}
                    maxFreeDelivery={product?.max_delivery_time}
                    handleBadge={handleBadge}
                    product={product}
                />
                <CustomStackFullWidth sx={{ padding: '5px' }}>
                    <Stack
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="center"
                        flexWrap="wrap"
                        spacing={0.5}
                    >
                        <CustomTypographyEllipsis
                            variant="h5"
                            fontWeight="500"
                            sx={{
                                maxWidth: '163px',
                                [theme.breakpoints.down('md')]: {
                                    maxWidth: '112px',
                                },
                            }}
                        >
                            {product?.name}
                        </CustomTypographyEllipsis>
                        <VagSvg
                            color={
                                Number(product?.veg) === 0
                                    ? theme.palette.nonVeg
                                    : theme.palette.success.light
                            }
                        />
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
                        {product?.cuisines?.length > 0 &&
                            product?.cuisines?.map((cuisine, index) => (
                                <CustomTypographyEllipsis
                                    align="left"
                                    fontSize="12px"
                                    color={theme.palette.neutral[600]}
                                >
                                    {' '}
                                    {cuisine?.name}{' '}
                                    {product?.cuisines?.length - 1 === index
                                        ? ''
                                        : ','}
                                </CustomTypographyEllipsis>
                            ))}
                    </Stack>
                    <Stack
                        width="100%"
                        justifyContent="space-between"
                        direction="row"
                        alignItems="center"
                        position="relative"
                    >
                        <StartPriceView
                            data={product}
                            handleBadge={handleBadge}
                            available_date_ends={product?.available_date_ends}
                        />

                        {!isInCart && (
                            <IconButton
                                onClick={(e) => addToCart(e)}
                                sx={{ padding: '3px' }}
                            >
                                <ShoppingBagOutlinedIcon color="primary" />
                            </IconButton>
                        )}
                        {isInCart && (
                            <AfterAddToCart
                                isInCart={isInCart}
                                product={product}
                                getQuantity={getQuantity}
                                handleClickQuantityButton={
                                    handleClickQuantityButton
                                }
                                setIncrOpen={setIncrOpen}
                                incrOpen={incrOpen}
                            />
                        )}
                    </Stack>
                </CustomStackFullWidth>
            </CustomStackFullWidth>
        </CustomFoodCardNew>
    )
}

export default FoodVerticalCard
