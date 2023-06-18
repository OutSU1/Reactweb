import React from 'react'
import { Stack } from '@mui/system'
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'
import { Button, Typography } from '@mui/material'
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { t } from 'i18next'

const FilterButton = ({ handleClick }) => {
    const theme = useTheme()
    const isSmall = useMediaQuery(theme.breakpoints.down('sm'))
    return (
        <Button
            variant="outlined"
            color="primary"
            sx={{ padding: '5px 15px', borderRadius: '6px' }}
            onClick={handleClick}
        >
            <Stack direction="row" alignItems="center" spacing={0.5}>
                <FilterAltOutlinedIcon
                    style={{
                        width: '16px',
                        height: '16px',
                    }}
                    color="primary"
                />
                {!isSmall && (
                    <Typography
                        fontSize="12px"
                        fontWeight="500"
                        color={theme.palette.primary.main}
                    >
                        {t('Filter')}
                    </Typography>
                )}
                <KeyboardArrowDownOutlinedIcon
                    style={{
                        width: '16px',
                        height: '16px',
                    }}
                    color="primary"
                />
            </Stack>
        </Button>
    )
}

export default FilterButton
