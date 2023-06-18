import { styled } from '@mui/material/styles'
import { alpha, Typography } from '@mui/material'
import { Stack } from '@mui/system'

export const CustomStackForFoodModal = styled(Stack)(({ theme, padding }) => ({
    padding: padding ? padding : '18px',
    position: 'absolute',
    bottom: '0',
    background: `linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgb(18 18 18 / 94%) 100%)`,
}))
