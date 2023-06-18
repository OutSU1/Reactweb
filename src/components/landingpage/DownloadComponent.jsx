import React from 'react'
import { Button, styled, Typography } from '@mui/material'
import {
    LandingPageTypography,
    LandingPageTypographyWhite,
} from './landingPageStyle'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { CustomStackFullWidth } from '../../styled-components/CustomStyles.style'
import AppLinks from './AppLinks'
import { useTheme } from '@mui/material/styles'

const DownloadComponent = (props) => {
    const theme = useTheme()
    const { landing_page_links } = props
    const { global } = useSelector((state) => state.globalSettings)
    const { t } = useTranslation()
    const ImageButton = styled(Button)(({ theme }) => ({
        width: '153px',
        height: '50px',
        padding: '0',
    }))
    const goToApp = (s) => {
        window.open(s)
    }
    return (
        <>
            {(Number.parseInt(landing_page_links?.app_url_android_status) ===
                1 ||
                Number.parseInt(landing_page_links?.app_url_ios_status) ===
                    1) && (
                <CustomStackFullWidth
                    alignItems="center"
                    justifyContent="center"
                >
                    <LandingPageTypography
                        fontSize={{ xs: '20', sm: '25', md: '29px' }}
                        fontWeight="700"
                    >
                        {t('Download app to enjoy more!')}
                    </LandingPageTypography>
                    <Typography
                        fontSize={{ xs: '12px', sm: '18px', md: '18px' }}
                        fontWeight="500"
                        color={theme.palette.primary.main}
                    >
                        {t('All the best restaurants are one click away')}
                    </Typography>
                    <Typography
                        sx={{ fontWeight: '400' }}
                        fontSize={{ xs: '14px', sm: '16px' }}
                        color={theme.palette.neutral[1000]}
                    >
                        {t(
                            'Download our app from google play store & app store.'
                        )}
                    </Typography>
                    <AppLinks
                        global={global}
                        landing_page_links={landing_page_links}
                        width="172px"
                    />
                </CustomStackFullWidth>
            )}
        </>
    )
}

export default DownloadComponent
