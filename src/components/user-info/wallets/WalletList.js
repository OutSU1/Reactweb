import React, { useEffect, useState } from 'react'
import { Grid, Box, Typography, Stack, List, ListItem } from '@mui/material'
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'
import {
    WallatBox,
    WallateBox,
    WalletBox,
    WalletBoxSection,
} from './Wallets.style'
import WalletsPage from './WalletsPage'
import { useQuery } from 'react-query'
import { WalletApi } from '../../../hooks/react-query/config/walletApi'
import { getAmount, getTotalWalletAmount } from '../../../utils/customFunctions'
import { ProfileApi } from '../../../hooks/react-query/config/profileApi'
import WalletShimmer from './WalletShimmer'
import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import CustomePagination from '../../pagination/Pagination'
import CustomEmptyResult from '../../empty-view/CustomEmptyResult'
import {
    CustomPaperBigCard,
    CustomStackFullWidth,
} from '../../../styled-components/CustomStyles.style'
import CustomImageContainer from '../../CustomImageContainer'
import walletImage from '../../../../public/static/profile/wa.svg'
import { useTheme } from '@mui/material/styles'
import noData from '../../../../public/static/nodata.png'
import { onSingleErrorResponse } from '../../ErrorResponse'
import LandingSliderImage from '../../../../public/static/banners/hero-banner-sm.png'
import bg from '../../../../public/static/profile/wa.svg'
import ScrollerProvider from '../../scroller-provider'
import Skeleton from '@mui/material/Skeleton'
import Meta from '../../Meta'
const Wallet = () => {
    const theme = useTheme()
    const [page_limit, setPageLimit] = useState(10)
    const [offset, setOffset] = useState(1)
    const { global } = useSelector((state) => state.globalSettings)
    let currencySymbol
    let currencySymbolDirection
    let digitAfterDecimalPoint

    if (global) {
        currencySymbol = global.currency_symbol
        currencySymbolDirection = global.currency_symbol_direction
        digitAfterDecimalPoint = global.digit_after_decimal_point
    }
    const { t } = useTranslation()
    const { isLoading, data, isError, error, refetch } = useQuery(
        ['wallet-list', offset],
        () => WalletApi.walletList(offset),
        {
            enabled: false,
        }
    )
    useEffect(async () => {
        await refetch()
    }, [])
    useEffect(async () => {
        await refetch()
    }, [offset])

    const { isLoading: profileDataLoading, data: profileData } = useQuery(
        ['profile-info'],
        ProfileApi.profileInfo,
        {
            onError: onSingleErrorResponse,
        }
    )
    //
    // if (!isLoading) {
    //     return (
    //         <>
    //             <WalletShimmer />
    //         </>
    //     )
    // }
    return (
        <>
            <Meta
                title={` My Wallet-${global?.business_name}`}
                description=""
                keywords=""
            />
            <CustomPaperBigCard padding="1.9rem">
                <Grid container spacing={3.5}>
                    <Grid item sm={12} xs={12} md={4}>
                        <WalletBox>
                            <CustomStackFullWidth
                                spacing={0.5}
                                sx={{ flexWrap: 'wrap' }}
                            >
                                <CustomImageContainer
                                    src={walletImage.src}
                                    width="34px"
                                    height="34px"
                                    objectFit="contain"
                                />
                                <Typography
                                    fontSize="36px"
                                    fontWeight="700"
                                    color={theme.palette.neutral[100]}
                                >
                                    {' '}
                                    {profileDataLoading ? (
                                        <Skeleton
                                            variant="text"
                                            width={150}
                                            height="50px"
                                        />
                                    ) : (
                                        getAmount(
                                            profileData?.data?.wallet_balance,
                                            currencySymbolDirection,
                                            currencySymbol,
                                            digitAfterDecimalPoint
                                        )
                                    )}
                                </Typography>
                                <Typography
                                    fontSize="12px"
                                    fontWeight="400"
                                    color={theme.palette.neutral[100]}
                                >
                                    {t('Total Balance')}
                                </Typography>
                            </CustomStackFullWidth>
                        </WalletBox>
                    </Grid>
                    <Grid item sm={12} xs={12} md={8}>
                        <CustomStackFullWidth
                            alignItems="start"
                            justifyContent="center"
                            sx={{ height: '100%' }}
                            spacing={1}
                        >
                            <Typography fontSize="14px" fontWeight="700">
                                {t('How to use')}
                            </Typography>
                            <List
                                sx={{
                                    listStyleType: 'disc',
                                    pl: 4,
                                    pt: 0,
                                    '& .MuiListItem-root': {
                                        display: 'list-item',
                                        paddingLeft: '0px',
                                        paddingBottom: '0px',
                                        paddingTop: '0px',
                                    },
                                }}
                            >
                                <ListItem>
                                    <Typography
                                        fontSize="13px"
                                        fontWeight="400"
                                    >
                                        {t(
                                            'Earn money to your wallet by completing the offer & challenged'
                                        )}
                                    </Typography>
                                </ListItem>
                                <ListItem>
                                    <Typography
                                        fontSize="13px"
                                        fontWeight="400"
                                    >
                                        {t(
                                            'Convert your loyalty points into wallet money'
                                        )}
                                    </Typography>
                                </ListItem>
                                <ListItem>
                                    <Typography
                                        fontSize="13px"
                                        fontWeight="400"
                                    >
                                        {t(
                                            'Amin also reward their top customers with wallet money'
                                        )}
                                    </Typography>
                                </ListItem>
                                <ListItem>
                                    <Typography
                                        fontSize="13px"
                                        fontWeight="400"
                                    >
                                        {t(
                                            'Send your wallet money while order'
                                        )}
                                    </Typography>
                                </ListItem>
                            </List>
                        </CustomStackFullWidth>
                    </Grid>
                    <Grid item md={12} xs={12}>
                        <Box sx={{ padding: '10px' }}>
                            <Typography fontSize="16px" fontWeight="500">
                                {t('Wallet History')}
                            </Typography>
                        </Box>
                        <ScrollerProvider maxHeight="40vh">
                            {data ? (
                                data?.data?.data?.map((wallet) => (
                                    <WalletsPage
                                        key={wallet.id}
                                        data={wallet}
                                        currencySymbolDirection={
                                            currencySymbolDirection
                                        }
                                        currencySymbol={currencySymbol}
                                        digitAfterDecimalPoint={
                                            digitAfterDecimalPoint
                                        }
                                    />
                                ))
                            ) : (
                                <div
                                    style={{
                                        textAlign: 'center',
                                        fontSize: 20,
                                    }}
                                >
                                    <WalletShimmer />
                                </div>
                            )}
                        </ScrollerProvider>
                        {data?.data?.data?.length === 0 && (
                            <CustomEmptyResult
                                label="No Data Found"
                                image={noData}
                            />
                        )}
                        <CustomStackFullWidth
                            sx={{ height: '50px' }}
                            alignItems="center"
                            justifyContent="center"
                        >
                            {data && data?.data?.total_size >= page_limit && (
                                <CustomePagination
                                    offset={offset}
                                    page_limit={page_limit}
                                    setOffset={setOffset}
                                    total_size={data?.data?.total_size}
                                />
                            )}
                        </CustomStackFullWidth>
                    </Grid>
                </Grid>
            </CustomPaperBigCard>
        </>
    )
}

export default Wallet
