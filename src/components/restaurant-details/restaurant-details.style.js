import { alpha, Button, Chip, Grid, styled, Typography } from '@mui/material'
import { Box, Stack } from '@mui/system'
import discountBanner from '../../../public/static/restaurantDiscountBanner.svg'
import ImageNotFound from '../../../public/static/no-image-found.png'

export const CategoryButton = styled(Button)(({ theme, active }) => ({
    cursor: 'pointer',

    color: theme.palette.customColor.six,
    borderBottom:
        active === 'true' && `3px solid ${theme.palette.primary.main}`,
    minWidth: 'auto',
    borderRadius: '0px',
    //padding: '0px 0px',
    whiteSpace: 'nowrap',
    [theme.breakpoints.down('sm')]: {
        minWidth: 'auto',
        padding: '8px 10px',
        // height:" 351px"
    },
}))

export const CloseOverlay = styled(Stack)(({ theme }) => ({
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    background: (theme) => theme.palette.primary.main,
    opacity: '0.5',
    color: 'white',
    height: '100%',
    justifyContent: 'center',
    zIndex: 1,
}))
export const DiscountImageGrid = styled(Grid)(
    ({ theme, discountBanner, ImageNotFound }) => ({
        backgroundImage: `url(${
            discountBanner ? discountBanner.src : ImageNotFound.src
        })`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        //background: 'rgba(75, 86, 107, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '24px',
        borderRadius: '5px',
        position: 'relative',
        zIndex: 1,
        '&::after': {
            content: '" "',
            position: 'absolute',
            width: '100%',
            height: 'calc(100% - 2px)',
            left: '0',
            backgroundColor: alpha(theme.palette.primary.main, 0.05),
            zIndex: '-1',
            top: '1px',
        },
    })
)
