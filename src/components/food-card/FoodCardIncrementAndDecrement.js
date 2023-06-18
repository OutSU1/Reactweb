import React from 'react'
import { CustomCardButton } from './FoodCard.style'
import { Stack } from '@mui/system'
import { alpha, Grow, IconButton, Typography, Fade } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import RemoveIcon from '@mui/icons-material/Remove'
import AddIcon from '@mui/icons-material/Add'
import { useTheme } from '@emotion/react'
import { useDispatch } from 'react-redux'
import {
    decrementProductQty,
    incrementProductQty,
    removeProduct,
} from '../../redux/slices/cart'
import useMediaQuery from '@mui/material/useMediaQuery'

const FoodCardIncrementAndDecrement = ({
    getQuantity,
    product,
    setIncrOpen,
    incrOpen,
    isInCart,
    position,
}) => {
    const theme = useTheme()
    const isSmall = useMediaQuery(theme.breakpoints.down('md'))
    const dispatch = useDispatch()
    const handleHover = () => {}

    const handleIncrement = (e) => {
        e.stopPropagation()
        dispatch(incrementProductQty(isInCart))
    }
    const handleDecrement = (e) => {
        e.stopPropagation()
        dispatch(decrementProductQty(isInCart))
    }
    const handleRemove = (e) => {
        e.stopPropagation()
        dispatch(removeProduct(isInCart))
    }

    return (
        <Stack
            sx={{
                borderRadius: '5px',
                background: (theme) => theme.palette.neutral[200],
                position: 'absolute',
                right: '0',
                left: 'unset',
                top: position ? position : '0',
                width: { xs: '100%', md: '50%' },
                transformOrigin: 'right',
                '@keyframes scaleXCustom': {
                    '0%': {
                        transform: 'scaleX(0)',
                        transformOrigin: 'right',
                    },
                    '100%': {
                        transform: 'scaleX(1)',
                    },
                },
                animation: 'scaleXCustom .3s',
                WebkitAnimation: 'scaleXCustom .3s',
                MozAnimation: 'scaleXCustom .3s',
            }}
            onClick={(e) => e.stopPropagation()}
            onMouseEnter={() => setIncrOpen(true)}
        >
            <Stack
                width="100%"
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                gap="12px"
                onMouseEnter={handleHover}

                // height={{ xs: '15px', sm: '20px', md: '25px' }}
            >
                {getQuantity(product?.id) === 1 ? (
                    <IconButton
                        aria-label="delete"
                        size="small"
                        color="error"
                        sx={{
                            padding: '4px',
                        }}
                        onClick={(e) => handleRemove(e)}
                    >
                        <DeleteIcon
                            fontSize="inherit"
                            sx={{ width: '25px', height: '25px' }}
                        />
                    </IconButton>
                ) : (
                    <>
                        <IconButton
                            // disabled={
                            //   state.modalData[0]?.totalPrice === 0 ||
                            //   state.modalData[0]?.quantity <= 1
                            // }
                            size="small"
                            color="primary"
                            sx={{
                                background: (theme) =>
                                    alpha(theme.palette.primary.main, 0.5),
                                borderRadius: '3px',
                                padding: '3px',
                                '&:hover': {
                                    background: (theme) =>
                                        theme.palette.primary.dark,
                                },
                            }}
                            onClick={(e) => handleDecrement(e)}
                        >
                            <RemoveIcon
                                size="small"
                                sx={{
                                    color: (theme) =>
                                        theme.palette.neutral[100],
                                    width: '25px',
                                    height: '25px',
                                }}
                            />
                        </IconButton>
                    </>
                )}
                <Typography
                    variant="h5"
                    fontWeight="500"
                    color={theme.palette.neutral[1000]}
                >
                    {getQuantity(product?.id)}
                </Typography>
                <IconButton
                    color="primary"
                    aria-label="add"
                    onClick={(e) => handleIncrement(e)}
                    size="small"
                    sx={{
                        background: (theme) => theme.palette.primary.main,
                        borderRadius: '3px',
                        padding: '3px',
                        '&:hover': {
                            background: (theme) => theme.palette.primary.dark,
                        },
                    }}
                >
                    <AddIcon
                        size="small"
                        sx={{
                            color: (theme) => theme.palette.neutral[100],
                            width: '25px',
                            height: '25px',
                        }}
                    />
                </IconButton>
            </Stack>
        </Stack>
    )
}

export default FoodCardIncrementAndDecrement
