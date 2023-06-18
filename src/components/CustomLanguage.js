import React, {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {TopBarButton} from "./navbar/Navbar.style";

import {alpha, ListItemIcon, MenuItem, Stack} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {CustomColouredTypography} from "../styled-components/CustomStyles.style";
import ReactCountryFlag from 'react-country-flag'
import {StyledMenu} from "./navbar/top-navbar/TopNav.style";
import {useSelector} from "react-redux";
import {toast} from "react-hot-toast";
import {useSettings} from "../contexts/use-settings";
import {t} from "i18next";
import {useTheme} from "@mui/material/styles";
const CustomLanguage = ({formMobileMenu}) => {
    const theme=useTheme()
    const [language, setLanguage] = useState('')
    const [anchorEl, setAnchorEl] = useState(null)
    const anchorRef = useRef(null)
    const { global } = useSelector((state) => state.globalSettings)

    useEffect(() => {
        // Perform localStorage action
        if (typeof window !== 'undefined') {
            setLanguage(localStorage.getItem('language') || 'en')
        }
    }, [language])
    const handleClick = (event) => {
        // i18n.changeLanguage(language)
        setAnchorEl(event.currentTarget)
    }
    let languageDirection = undefined
    if (typeof window !== 'undefined') {
        languageDirection = localStorage.getItem('direction')
    }
    const handleClose = () => {
        setAnchorEl(null)
    }
    const getValues = (settings) => ({
        direction: settings.direction,
        responsiveFontSizes: settings.responsiveFontSizes,
        theme: settings.theme,
    })
    const { settings, saveSettings } = useSettings()
    const [values, setValues] = useState(getValues(settings))
    useEffect(() => {
        setValues(getValues(settings))
    }, [settings])
    const open = Boolean(anchorEl)
    const handleLanguage = (ln) => {
        // setLanguage(ln)
        localStorage.setItem('language', ln)
        if (ln === 'ar') {
            // i18n.changeLanguage(ln)
            localStorage.setItem('direction', 'rtl')
            saveSettings({ ...values, direction: 'rtl' })
            // setLanguage(ln)
            toast.success(t('Language Changed Successfully.'))
            //handleClose?.()
        } else {
            // i18n.changeLanguage(ln)
            localStorage.setItem('direction', 'ltr')
            saveSettings({ ...values, direction: 'ltr' })
            //setLanguage(ln)
            toast.success(t('Language Changed Successfully.'))
            //handleClose?.()
        }
        window.location.reload()
    }
    const arrowColor=theme.palette.neutral[500]
    return (
        <>
           <Stack sx={{
               borderRight:`1px solid ${alpha(theme.palette.primary.main,.5)}`,
               borderLeft:`1px solid ${alpha(theme.palette.primary.main,.5)}`,
               height:"64px"


           }}
           alignItems="center"
           justifyContent="center"
           >
               <TopBarButton
                   formMobileMenu={formMobileMenu}
                   // id="demo-customized-button"
                   variant="text"
                   size="small"
                   aria-controls={
                       open ? 'demo-customized-menu' : undefined
                   }
                   aria-haspopup="true"
                   aria-expanded={open ? 'true' : undefined}
                   disableElevation
                   onClick={handleClick}

                   endIcon={
                       <KeyboardArrowDownIcon  style={{color:arrowColor}}/>
                   }
               >
                   <CustomColouredTypography
                       color={theme.palette.neutral[600]}
                   >
                       {language === 'en' ? 'EN' : 'AR'}
                   </CustomColouredTypography>
               </TopBarButton>
           </Stack>
            <StyledMenu
                id="demo-customized-menu"
                MenuListProps={{
                    'aria-labelledby': 'demo-customized-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                {global?.language?.map((lan, index) => (
                    <MenuItem
                        onClick={() => handleLanguage(lan.key)}
                        disableRipple
                        key={index}
                        sx={{

                            '&:hover': {
                                backgroundColor: 'primary.main',
                            }}}
                    >
                        <ListItemIcon>
                            <ReactCountryFlag
                                countryCode={
                                    lan.key === 'en'
                                        ? 'US'
                                        : 'ae'
                                }
                                svg
                            />
                        </ListItemIcon>
                        {lan.value}
                    </MenuItem>
                ))}
            </StyledMenu>
        </>
    );
};

CustomLanguage.propTypes = {

};

export default CustomLanguage;
