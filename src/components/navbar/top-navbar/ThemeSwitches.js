import React from 'react'
import PropTypes from 'prop-types'
import { Stack } from '@mui/material'
import { CustomColouredTypography } from '../../../styled-components/CustomStyles.style'
import { useTranslation } from 'react-i18next'
import { CustomStack, CustomSwitch } from '../Navbar.style'
import { useTheme } from '@mui/material/styles'
import { MoonIcon, SunIcon } from '../customSvgIcon'

const ThemeSwitches = ({ checked, handleThemeChangeMode, themeMode }) => {
    const { t } = useTranslation()
    const theme = useTheme()
    return (
        <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            onClick={() => handleThemeChangeMode()}
        >
            {/*<CustomColouredTypography color={theme.palette.neutral[600]}>*/}
            {/*    {t('Dark Mode')}*/}
            {/*</CustomColouredTypography>*/}
            <CustomStack>
                {themeMode === 'light' ? (
                    <MoonIcon color={theme.palette.primary.main} />
                ) : (
                    <SunIcon color={theme.palette.primary.main} />
                )}
            </CustomStack>
        </Stack>
    )
}

ThemeSwitches.propTypes = {}

export default ThemeSwitches
