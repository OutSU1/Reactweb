import React, { useEffect, useState } from 'react'
import { Grid, IconButton, Typography } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { PrimaryButton } from '../products-page/FoodOrRestaurant'
import CustomSideDrawer from '../side-drawer/CustomSideDrawer'
import MenuBar from './customer-layout/MenuBar'
import { useRouter } from 'next/router'
import { useTheme } from '@mui/material/styles'
import ProfileSideMenu from './ProfileSideMenu'
import MenuOpenIcon from '@mui/icons-material/MenuOpen'

const SideDrawer = ({ page }) => {
    const theme = useTheme()
    const [languageDirection, setLanguageDirection] = useState('ltr')
    const [open, setOpen] = useState(false)
    useEffect(() => {
        if (localStorage.getItem('direction')) {
            setLanguageDirection(localStorage.getItem('direction'))
        }
    }, [])
    return (
        <>
            {languageDirection && (
                <>
                    <Grid item xs={2} sm={2}>
                        <IconButton
                            onClick={() => setOpen(true)}
                            sx={{
                                color: (theme) => theme.palette.primary.main,
                            }}
                        >
                            <MenuOpenIcon />
                        </IconButton>
                        <CustomSideDrawer
                            open={open}
                            onClose={() => setOpen(false)}
                            anchor={
                                languageDirection === 'rtl' ? 'right' : 'left'
                            }
                        >
                            <ProfileSideMenu
                                onClose={() => setOpen(false)}
                                sidedrawer="true"
                                page={page}
                            />
                        </CustomSideDrawer>
                    </Grid>
                    <Grid justifySelf="flex-end" item xs={10} sm={10}>
                        <Typography
                            variant="h3"
                            color={theme.palette.primary.main}
                            align="center"
                            marginLeft="-40px"
                        >
                            {page}
                        </Typography>
                    </Grid>
                </>
            )}
        </>
    )
}
export default SideDrawer
