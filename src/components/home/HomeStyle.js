import { styled } from '@mui/material/styles'

import { Box, Card, Typography } from '@mui/material'
import { Stack } from '@mui/system'

export const LeftArrowStyle = styled(Box)(
    ({ theme, languageDirection, left, isdisabled }) => ({
        zIndex: 999,
        top: '37%',
        position: 'absolute',
        display: isdisabled && 'none',
        left: `${languageDirection === 'rtl' ? '2%' : left}`,
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    })
)
export const RightArrowStyle = styled(Box)(
    ({ theme, languageDirection, right, isdisabled }) => ({
        zIndex: '1',
        position: 'absolute',
        top: '37%',
        right: `${languageDirection === 'rtl' ? '2%' : right}`,
        display: isdisabled && 'none',

        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    })
)

export const HomeTitleTypography = styled(Typography)(({ theme }) => ({
    // fontSize: '26px',
    fontWeight: '800',
    color: `${theme.palette.mode === 'dark' && '#fff'}`,
}))
export const HomeTextTypography = styled(Typography)(({ theme }) => ({
    fontSize: '16px',
    fontWeight: '600',
    lineHeight: '22px',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',

    color: `${theme.palette.mode === 'dark' && '#fff'}`,
    [theme.breakpoints.down('sm')]: {
        fontSize: '12px',
    },
}))
export const PopularRestaurantCard = styled(Card)(({ theme }) => ({
    margin: '20px 0',
    padding: '30px',
    // border: '.5px solid #ef7822',
    boxShadow: `${
        theme.palette.mode === 'light' &&
        '0px 0px 2px rgba(239, 120, 34, 0.1),0px 6px 12px rgba(239, 120, 34, 0.08)'
    }`,
    borderRadius: '10px',
    color: `${theme.palette.mode === 'dark' && '#fff'}`,
    [theme.breakpoints.down('sm')]: {
        padding: '7px',
        margin: '0px 0',
    },
}))
export const FoodDetailModalStyle = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '459px',
    width: '100%',
    borderRadius: '5px',
    boxShadow: 24,
    border: 'none',

    color: `${theme.palette.mode === 'dark' && '#fff'}`,
    [theme.breakpoints.down('md')]: {
        width: '85%',
    },
    // [theme.breakpoints.down('sm')]: {
    //     width: '70%',
    // },
    [theme.breakpoints.down('xs')]: {
        width: '85%',
    },
}))

export const CustomSpinner = styled(Stack)(({ theme, color }) => ({
    position: 'relative',
    width: '10px',
    height: '10px',
    borderRadius: '5px',
    backgroundColor: 'transparent',
    color: 'transparent',
    boxShadow:
        '0 -18px 0 0 ${color}, 12.727926px -12.727926px 0 0 ${color}, 18px 0 0 0 ${color}, 12.727926px 12.727926px 0 0 rgba(152, 128, 255, 0), 0 18px 0 0 rgba(152, 128, 255, 0), -12.727926px 12.727926px 0 0 rgba(152, 128, 255, 0), -18px 0 0 0 rgba(152, 128, 255, 0), -12.727926px -12.727926px 0 0 rgba(152, 128, 255, 0)',
    animation: 'dots-pin 1.5s infinite linear',
    '@Keyframes dots-pin': {
        '0%': {
            boxShadow: `0 -18px 0 0 ${color}, 12.727926px -12.727926px 0 0 ${color}, 18px 0 0 0 ${color}, 12.727926px 12.727926px 0 -5px rgba(152, 128, 255, 0), 0 18px 0 -5px rgba(152, 128, 255, 0), -12.727926px 12.727926px 0 -5px rgba(152, 128, 255, 0), -18px 0 0 -5px rgba(152, 128, 255, 0), -12.727926px -12.727926px 0 -5px rgba(152, 128, 255, 0)`,
        },
        '100%': {
            boxShadow: `0 -18px 0 0 ${color}, 12.727926px -12.727926px 0 0 ${color}, 18px 0 0 0 ${color}, 12.727926px 12.727926px 0 -5px rgba(152, 128, 255, 0), 0 18px 0 -5px rgba(152, 128, 255, 0), -12.727926px 12.727926px 0 -5px rgba(152, 128, 255, 0), -18px 0 0 -5px rgba(152, 128, 255, 0), -12.727926px -12.727926px 0 -5px rgba(152, 128, 255, 0)`,
        },
        '12.5%': {
            boxShadow: `0 -18px 0 -5px rgba(152, 128, 255, 0), 12.727926px -12.727926px 0 0 ${color}, 18px 0 0 0 ${color}, 12.727926px 12.727926px 0 0 ${color}, 0 18px 0 -5px rgba(152, 128, 255, 0), -12.727926px 12.727926px 0 -5px rgba(152, 128, 255, 0), -18px 0 0 -5px rgba(152, 128, 255, 0), -12.727926px -12.727926px 0 -5px rgba(152, 128, 255, 0)`,
        },
        '25%': {
            boxShadow: `0 -18px 0 -5px rgba(152, 128, 255, 0), 12.727926px -12.727926px 0 -5px rgba(152, 128, 255, 0), 18px 0 0 0 ${color}, 12.727926px 12.727926px 0 0 ${color}, 0 18px 0 0 ${color}, -12.727926px 12.727926px 0 -5px rgba(152, 128, 255, 0), -18px 0 0 -5px rgba(152, 128, 255, 0), -12.727926px -12.727926px 0 -5px rgba(152, 128, 255, 0)`,
        },
        '37.5%': {
            boxShadow: `0 -18px 0 -5px rgba(152, 128, 255, 0), 12.727926px -12.727926px 0 -5px rgba(152, 128, 255, 0), 18px 0 0 -5px rgba(152, 128, 255, 0), 12.727926px 12.727926px 0 0 ${color}, 0 18px 0 0 ${color}, -12.727926px 12.727926px 0 0 ${color}, -18px 0 0 -5px rgba(152, 128, 255, 0), -12.727926px -12.727926px 0 -5px rgba(152, 128, 255, 0)`,
        },
        '50%': {
            boxShadow: `0 -18px 0 -5px rgba(152, 128, 255, 0), 12.727926px -12.727926px 0 -5px rgba(152, 128, 255, 0), 18px 0 0 -5px rgba(152, 128, 255, 0), 12.727926px 12.727926px 0 -5px rgba(152, 128, 255, 0), 0 18px 0 0 ${color}, -12.727926px 12.727926px 0 0 ${color}, -18px 0 0 0 ${color}, -12.727926px -12.727926px 0 -5px rgba(152, 128, 255, 0)`,
        },
        '62.5%': {
            boxShadow: `0 -18px 0 -5px rgba(152, 128, 255, 0), 12.727926px -12.727926px 0 -5px rgba(152, 128, 255, 0), 18px 0 0 -5px rgba(152, 128, 255, 0), 12.727926px 12.727926px 0 -5px rgba(152, 128, 255, 0), 0 18px 0 -5px rgba(152, 128, 255, 0), -12.727926px 12.727926px 0 0 ${color}, -18px 0 0 0 ${color}, -12.727926px -12.727926px 0 0 ${color}`,
        },
        '75%': {
            boxShadow: `0 -18px 0 0 ${color}, 12.727926px -12.727926px 0 -5px rgba(152, 128, 255, 0), 18px 0 0 -5px rgba(152, 128, 255, 0), 12.727926px 12.727926px 0 -5px rgba(152, 128, 255, 0), 0 18px 0 -5px rgba(152, 128, 255, 0), -12.727926px 12.727926px 0 -5px rgba(152, 128, 255, 0), -18px 0 0 0 ${color}, -12.727926px -12.727926px 0 0 ${color}`,
        },
        '87.5%': {
            boxShadow: `0 -18px 0 0 ${color}, 12.727926px -12.727926px 0 0 ${color}, 18px 0 0 -5px rgba(152, 128, 255, 0), 12.727926px 12.727926px 0 -5px rgba(152, 128, 255, 0), 0 18px 0 -5px rgba(152, 128, 255, 0), -12.727926px 12.727926px 0 -5px rgba(152, 128, 255, 0), -18px 0 0 -5px rgba(152, 128, 255, 0), -12.727926px -12.727926px 0 0 ${color}`,
        },
    },
}))
