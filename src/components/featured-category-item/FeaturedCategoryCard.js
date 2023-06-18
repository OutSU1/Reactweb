import { Grid, Paper, Stack, Typography } from '@mui/material'
import React from 'react'
import Link from 'next/link'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import CustomImageContainer from '../CustomImageContainer'
import { CustomColouredPaper, FeatureImageBox } from './FeaturedCategory.style'
import Router, { useRouter } from 'next/router'
import { Box } from '@mui/system'

const FeaturedCategoryCard = ({
    categoryImage,
    name,
    id,
    categoryImageUrl,
    height,
}) => {
    const theme = useTheme()
    const router = useRouter()
    const isXSmall = useMediaQuery(theme.breakpoints.down('sm'))
    const image = `${categoryImageUrl}/${categoryImage}`
    const handleClick = () => {
        Router.push(
            {
                pathname: `/category/${id}`,
                query: { name: name },
            },
            undefined,
            { shallow: true }
        )
    }
    return (
        <Grid item sx={{ overflow: 'hidden' }} onClick={handleClick}>
            <FeatureImageBox
                justifyContent="center"
                alignItems="center"
                spacing={1}
            >
                <Box
                    sx={{
                        transition: `${theme.transitions.create(
                            ['background-color', 'transform'],
                            {
                                duration: theme.transitions.duration.standard,
                            }
                        )}`,
                        '&:hover': {
                            transform: 'scale(1.1)',
                        },
                    }}
                >
                    <CustomImageContainer
                        src={image}
                        alt={name}
                        height="120px"
                        maxWidth="120px"
                        width="100%"
                        borderRadius="50%"
                        objectFit="contained"
                        smMb="5px"
                        smHeight="50px"
                        smMaxWidth="50px"
                        cursor="pointer"
                    />
                </Box>
                <Typography
                    sx={{
                        color: (theme) => theme.palette.neutral[900],
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: '1',
                        WebkitBoxOrient: 'vertical',
                    }}
                    fontSize={{ xs: '13px', sm: '14px', md: '16px' }}
                    fontWeight="500"
                >
                    {name}
                </Typography>
            </FeatureImageBox>
        </Grid>
    )
}

export default FeaturedCategoryCard
