import React from 'react'
import { Stack } from '@mui/system'
import CustomImageContainer from '../CustomImageContainer'
import { Typography } from '@mui/material'
import { CustomStackFullWidth } from '../../styled-components/CustomStyles.style'
import { t } from 'i18next'
import moment from 'moment'
import Skeleton from '@mui/material/Skeleton'
import { useTheme } from '@emotion/react'

const MiddleSection = ({ campaignsDetails, image }) => {
    const theme = useTheme()
    return (
        <CustomStackFullWidth spacing={1} sx={{ paddingLeft: '1.6rem' }}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <CustomImageContainer
                    src={image}
                    height="100px"
                    width="100px"
                    borderRadius=".6rem"
                    objectFit="cover"
                />
                <Stack justifyContent="center" alignItems="flex-start">
                    <Typography
                        fontWeight="600"
                        variant="h5"
                        color={theme.palette.neutral[1000]}
                    >
                        {campaignsDetails?.title}
                    </Typography>
                    <Typography
                        fontSize={{ xs: '12px', sm: '12px', md: '14px' }}
                        fontWeight="500"
                        color={theme.palette.neutral[1000]}
                    >
                        {campaignsDetails?.description}
                    </Typography>
                </Stack>
            </Stack>
            <CustomStackFullWidth spacing={0.5}>
                <Stack direction="row" spacing={1}>
                    <Typography
                        variant="subtitle2"
                        color={theme.palette.neutral[1000]}
                    >
                        {t('Campaign Schedule :')}
                    </Typography>
                    <Typography
                        fontWeight="600"
                        variant="h6"
                        color={theme.palette.primary.main}
                    >
                        {moment(campaignsDetails?.available_date_starts).format(
                            'MMMM Do YYYY'
                        )}
                        -
                        {moment(campaignsDetails?.available_date_ends).format(
                            'MMMM Do YYYY'
                        )}
                    </Typography>
                </Stack>
                <Stack direction="row" spacing={1}>
                    <Typography
                        variant="subtitle2"
                        color={theme.palette.neutral[1000]}
                    >
                        {t('Daily time: ')}
                    </Typography>
                    {campaignsDetails ? (
                        <Typography
                            fontWeight="600"
                            variant="h6"
                            color={theme.palette.primary.main}
                        >
                            {moment(campaignsDetails?.start_time, [
                                'HH:mm',
                            ]).format('hh:mm a')}{' '}
                            -{' '}
                            {moment(campaignsDetails?.end_time, [
                                'HH:mm',
                            ]).format('hh:mm a')}
                        </Typography>
                    ) : (
                        <Skeleton variant="text" width="100px" />
                    )}
                </Stack>
            </CustomStackFullWidth>
        </CustomStackFullWidth>
    )
}

export default MiddleSection
