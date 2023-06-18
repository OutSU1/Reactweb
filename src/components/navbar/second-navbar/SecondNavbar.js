import React, { useEffect, useRef, useState } from 'react'
import Toolbar from '@mui/material/Toolbar'
import { CustomStackFullWidth } from '../../../styled-components/CustomStyles.style'
import { Avatar, Box, ButtonBase, Stack } from '@mui/material'
import DrawerMenu from '../DrawerMenu'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useDispatch, useSelector } from 'react-redux'
import { useQuery } from 'react-query'
import { ConfigApi } from '../../../hooks/react-query/config/useConfig'
import { setGlobalSettings } from '../../../redux/slices/global'
import LogoSide from './LogoSide'
import NavLinks from './NavLinks'
import Wishlist from './Wishlist'
import CustomContainer from '../../container'
import AddressReselect from '../top-navbar/address-reselect/AddressReselect'
import { SignInButton } from '../../../styled-components/CustomButtons.style'
import { CustomTypography } from '../../custom-tables/Tables.style'
import LockIcon from '@mui/icons-material/Lock'
import AuthModal from '../../auth'
import IconButton from '@mui/material/IconButton'
import ChatIcon from '@mui/icons-material/Chat'
import { AccountPopover } from '../AccountPopover'
import CustomLanguage from '../../CustomLanguage'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import { CustomNavSearchIcon } from '../Navbar.style'
import SearchBoxPopover from '../SearchBoxPopover'
import { onSingleErrorResponse } from '../../ErrorResponse'
import { RTL } from '../../RTL/RTL'
import { useSettings } from '../../../contexts/use-settings'
import ThemeSwitches from '../top-navbar/ThemeSwitches'

const SecondNavbar = () => {
    const [modalFor, setModalFor] = useState('sign-in')
    const [openSearchBox, setOpenSearchBox] = useState(false)
    const [authModalOpen, setOpen] = useState(false)
    const [showSearch, setShowSearch] = useState(false)
    const [openPopover, setOpenPopover] = useState(false)
    const { userData } = useSelector((state) => state.user)
    const { token } = useSelector((state) => state.userToken)
    const { t } = useTranslation()
    const router = useRouter()
    const { query } = router.query
    const { global } = useSelector((state) => state.globalSettings)
    const theme = useTheme()
    const isSmall = useMediaQuery(theme.breakpoints.down('md'))
    const dispatch = useDispatch()
    const anchorRef = useRef(null)
    const searchRef = useRef(null)
    const [theme_mode, setThemeMode] = useState('')

    const businessLogo = global?.fav_icon
    useEffect(() => {
        // Perform localStorage action
        if (typeof window !== 'undefined') {
            setThemeMode(localStorage.getItem('mode') || 'light')
        }
    }, [theme_mode])
    const changeThemeMode = (e) => {
        if (theme_mode === 'dark') {
            localStorage.setItem('mode', 'light')
        } else {
            localStorage.setItem('mode', 'dark')
        }
        window.location.reload()
    }

    //SEARCH BOX OPEN//

    const handleOpenPopover = () => {
        setOpenPopover(true)
        setModalFor('sign-in')
    }
    const handleSearchBoxOpen = () => {
        setOpenSearchBox(!openSearchBox)
    }
    const handleShowSearch = () => {
        if (router.pathname === '/home') {
            if (window.scrollY >= 250) {
                setShowSearch(true)
            } else {
                setShowSearch(false)
                setOpenSearchBox(false)
            }
        }
    }
    if (typeof window !== 'undefined') {
        window.addEventListener('scroll', handleShowSearch)
    }

    const handleClickOutside = (event) => {
        setOpenSearchBox(false)
    }

    const handleOpenAuthModal = () => setOpen(true)
    const handleCloseAuthModal = () => {
        setOpen(false)
        setModalFor('sign-in')
    }

    const handleClosePopover = () => {
        setOpenPopover(false)
    }
    const { isLoading, data, isError, error, refetch } = useQuery(
        ['config'],
        ConfigApi.config,
        {
            enabled: false,
            onError: onSingleErrorResponse,
            staleTime: 1000 * 60 * 8,
            cacheTime: 8 * 60 * 1000,
        }
    )
    useEffect(() => {
        refetch()
    }, [])

    useEffect(() => {
        if (data) {
            dispatch(setGlobalSettings(data))
        }
    }, [data])

    let zoneid = undefined
    let location = undefined
    let languageDirection = undefined
    if (typeof window !== 'undefined') {
        zoneid = localStorage.getItem('zoneid')
        languageDirection = localStorage.getItem('direction')
        location = localStorage.getItem('location')
    }
    const customerbaseUrl = global?.base_urls?.customer_image_url

    const handleClick = (value) => {
        router.push({
            pathname: '/info',
            query: {
                page: value,
            },
        })
    }

    const handleAuthBasedOnRoute = () => {
        return (
            <RTL direction={languageDirection}>
                {!token ? (
                    <Stack direction="row">
                        <Box
                            align="center"
                            alignItem="center"
                            component={ButtonBase}
                            marginRight="10px"
                        >
                            <ThemeSwitches
                                checked={theme_mode === 'light'}
                                handleThemeChangeMode={changeThemeMode}
                                themeMode={theme_mode}
                            />
                        </Box>
                        <SignInButton
                            onClick={handleOpenAuthModal}
                            variant="contained"
                        >
                            <CustomStackFullWidth
                                direction={
                                    languageDirection === 'rtl'
                                        ? 'row'
                                        : 'row-reverse'
                                }
                                alignItems="center"
                                spacing={1}
                            >
                                <CustomTypography
                                    sx={{
                                        color: (theme) =>
                                            theme.palette.whiteContainer.main,
                                    }}
                                >
                                    {t('Sign In')}
                                </CustomTypography>
                                <LockIcon fontSize="small" />
                            </CustomStackFullWidth>
                        </SignInButton>
                        <AuthModal
                            open={authModalOpen}
                            modalFor={modalFor}
                            setModalFor={setModalFor}
                            handleClose={handleCloseAuthModal}
                        />
                    </Stack>
                ) : (
                    <>
                        <Stack direction="row" spacing={2}>
                            <Box
                                align="center"
                                alignItem="center"
                                component={ButtonBase}
                            >
                                <ThemeSwitches
                                    checked={theme_mode === 'light'}
                                    handleThemeChangeMode={changeThemeMode}
                                    themeMode={theme_mode}
                                />
                            </Box>
                            <Box
                                align="center"
                                component={ButtonBase}
                                alignItem="center"
                                onClick={() => handleClick('inbox')}
                            >
                                <IconButton>
                                    <ChatIcon
                                        sx={{
                                            height: 25,
                                            width: 25,
                                            color: (theme) =>
                                                theme.palette.primary.main,
                                        }}
                                    ></ChatIcon>
                                </IconButton>
                            </Box>
                            {token && !isSmall && (
                                <Wishlist handleClick={handleClick} />
                            )}

                            <Box
                                align="center"
                                ml={languageDirection !== 'rtl' && '.9rem'}
                                mr={languageDirection === 'rtl' && '.9rem'}
                                component={ButtonBase}
                                onClick={handleOpenPopover}
                                ref={anchorRef}
                            >
                                <Avatar
                                    sx={{
                                        height: 30,
                                        width: 30,
                                    }}
                                    src={`${customerbaseUrl}/${userData?.image}`}
                                />
                            </Box>
                        </Stack>
                        <AccountPopover
                            anchorEl={anchorRef.current}
                            onClose={handleClosePopover}
                            open={openPopover}
                        />
                    </>
                )}
            </RTL>
        )
    }
    const handleShowingSearch = () => {
        if (
            router.pathname !== '/home' &&
            router.pathname !== '/' &&
            location
        ) {
            return (
                <Stack
                    onClick={handleSearchBoxOpen}
                    sx={{ transition: 'all ease .4s' }}
                >
                    <CustomNavSearchIcon>
                        <SearchOutlinedIcon
                            sx={{ fontSize: '20px' }}
                            color="primary"
                        />
                    </CustomNavSearchIcon>
                </Stack>
            )
        } else if (showSearch && router.pathname !== '/' && location) {
            return (
                <Stack
                    onClick={handleSearchBoxOpen}
                    sx={{
                        transition: 'all ease .4s',
                    }}
                >
                    <CustomNavSearchIcon>
                        <SearchOutlinedIcon
                            sx={{ fontSize: '20px' }}
                            color="primary"
                        />
                    </CustomNavSearchIcon>
                </Stack>
            )
        }
    }

    return (
        <>
            <CustomContainer>
                <Toolbar disableGutters={true}>
                    <CustomStackFullWidth
                        direction="row"
                        // alignItems="center"
                        justifyContent="space-between"
                    >
                        <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="center"
                            gap="1rem"
                        >
                            <LogoSide
                                global={global}
                                width="auto"
                                businessLogo={businessLogo}
                            />

                            {!isSmall && location && (
                                <AddressReselect location={location} />
                            )}
                            {!isSmall && (
                                <NavLinks
                                    languageDirection={languageDirection}
                                    t={t}
                                    zoneid={zoneid}
                                />
                            )}
                        </Stack>
                        <Stack
                            direction="row"
                            alignItems="center"
                            gap={isSmall ? '5px' : '24px'}
                        >
                            {isSmall && (
                                <Box
                                    align="center"
                                    alignItem="center"
                                    component={ButtonBase}
                                >
                                    <ThemeSwitches
                                        checked={theme_mode === 'light'}
                                        handleThemeChangeMode={changeThemeMode}
                                        themeMode={theme_mode}
                                    />
                                </Box>
                            )}
                            {isSmall && <DrawerMenu zoneid={zoneid} />}

                            <Box
                                sx={{
                                    display: { xs: 'none', md: 'flex' },
                                    flexGrow: 0,
                                    height: '40px',
                                    alignItems: 'center',
                                }}
                            >
                                {handleShowingSearch()}
                                {handleAuthBasedOnRoute()}
                            </Box>
                            {!isSmall && <CustomLanguage />}
                        </Stack>
                    </CustomStackFullWidth>
                </Toolbar>
            </CustomContainer>
            {openSearchBox && (
                <>
                    <SearchBoxPopover searchRef={searchRef} query={query} />
                    <Box
                        onClick={() => handleClickOutside()}
                        sx={{
                            position: 'fixed',
                            top:
                                router.pathname === '/home' ? '520px' : '520px',
                            left: '0',
                            width: '100vw',
                            height: 'calc(100vh - 320px)',
                            zIndex: 999,
                        }}
                    />
                </>
            )}
        </>
    )
}
export default SecondNavbar
