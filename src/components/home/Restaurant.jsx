import React, { memo, useEffect, useRef, useState } from 'react'
import Grid from '@mui/material/Grid'
import { Dropdown } from 'react-bootstrap'
import FilterListIcon from '@mui/icons-material/FilterList'
import {
    Box,
    Typography,
    Button,
    CircularProgress,
    useMediaQuery,
    Stack,
    Tabs,
    Tab,
} from '@mui/material'
import { useSelector } from 'react-redux'
import { QueryClient, useInfiniteQuery, useQuery } from 'react-query'
import { RestaurantsApi } from '../../hooks/react-query/config/restaurantApi'
import RestaurantBoxCard from '../restaurant-details/RestaurantBoxCard'

import { useTranslation } from 'react-i18next'
import noData from '../../../public/static/resturants.png'
import { useTheme } from '@mui/material/styles'
import { onSingleErrorResponse } from '../ErrorResponse'
import { RTL } from '../RTL/RTL'
import CustomImageContainer from '../CustomImageContainer'
import restaurantIcon from '../../../public/static/result_count.svg'
import { mockData } from './mockData'
import RestaurantTab from './restaurant/RestaurantTab'
import { useGetRestaurant } from '../../hooks/react-query/restaurants/useGetRestaurant'
import DotSpin from './restaurant/DotSpin'
import CustomEmptyResult from '../empty-view/CustomEmptyResult'
import { useInView } from 'react-intersection-observer'
const Restaurant = () => {
    const theme = useTheme()
    const { t } = useTranslation()
    const { global } = useSelector((state) => state.globalSettings)
    const [type, setType] = useState('all')
    const [filterType, setFilterType] = useState('all')
    const [searchKey, setSearchKey] = useState(' ')
    const [offset, setOffSet] = useState(1)
    const [page_limit, setPage_Limit] = useState(12)
    const matchesToMd = useMediaQuery('(min-width:740px)')
    const matchesToScroll = useMediaQuery('(min-width:828px)')
    const matchesToSmall = useMediaQuery('(min-width:400px)')
    const isSmall = useMediaQuery(theme.breakpoints.down('sm'))
    const [filterByData, setFilterByData] = useState({})
    const [forFilter, setForFilter] = useState(false)
    const { ref, inView } = useInView()
    const refs = useRef(null)
    const {
        data,
        isSuccess,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage,
        isLoading,
        fetchPage,
        refetch,
    } = useGetRestaurant({
        filterByData,
        offset,
        page_limit,
        filterType,
        searchKey,
    })
    const responsiveTop = isSmall ? 2000 : matchesToScroll ? 1700 : 1950
    // let fetching = false
    // const bottomValue = isSmall ? 3.7 : 1.7
    //
    // const onScroll = async (event) => {
    //     const { scrollHeight, scrollTop, clientHeight } =
    //         event.target.scrollingElement
    //     if (
    //         !fetching &&
    //         scrollHeight - scrollTop <= clientHeight * bottomValue
    //     ) {
    //         fetching = true
    //         await fetchNextPage()
    //         setOffSet((prevState) => prevState + 1)
    //         fetching = false
    //     }
    // }
    // useEffect(() => {
    //     document.addEventListener('scroll', onScroll, { passive: true })
    //     return () => {
    //         document.removeEventListener('scroll', onScroll)
    //     }
    // }, [])

    const handleChange = (event, newValue) => {
        setFilterType(newValue)
        setOffSet(1)
        setForFilter(true)
        window.scrollTo(0, responsiveTop)
    }
    useEffect(() => {
        setForFilter(false)
    }, [])

    useEffect(() => {
        if (inView) {
            fetchNextPage()
            setOffSet((prevState) => prevState + 1)
        }
    }, [inView])

    useEffect(async () => {
        if (forFilter) {
            setOffSet(1)
            // fetchPage(2)
            await refetch()
        }
    }, [forFilter, filterByData, filterType])
    let mode = undefined
    if (typeof window !== 'undefined') {
        mode = localStorage.getItem('mode')
    }
    const lightColor = theme.palette.neutral[1000]
    const languageDirection = localStorage.getItem('direction')

    return (
        <RTL direction={languageDirection}>
            <Grid
                container
                sx={{ paddingBlockStart: '1.6rem', paddingBlockEnd: '2rem' }}
                rowGap="2rem"
            >
                <Grid
                    item
                    container
                    xs={12}
                    sm={12}
                    md={12}
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{
                        borderBottom: `1px solid ${theme.palette.borderBottomBg}`,
                        position: 'sticky',
                        top: '55px',

                        padding: '15px 10px 0px 0px',
                        zIndex: 5,
                        background: theme.palette.neutral[1800],
                    }}
                >
                    <Grid item xs={12} sm={12} md={4}>
                        <Stack direction="row" spacing={1}>
                            <CustomImageContainer
                                src={restaurantIcon.src}
                                width="26px"
                                height="26px"
                            />
                            <Typography
                                variant="h3"
                                color={theme.palette.neutral[1000]}
                                fontWeight="500"
                            >
                                {data?.pages[0]?.total_size} {t('Restaurants')}
                            </Typography>
                        </Stack>
                    </Grid>
                    <Grid item xs={12} sm={12} md={8} ref={refs}>
                        <RestaurantTab
                            filterByData={filterByData}
                            setFilterByData={setFilterByData}
                            filterType={filterType}
                            handleChange={handleChange}
                            mockData={mockData}
                            setOffSet={setOffSet}
                            setForFilter={setForFilter}
                            responsiveTop={responsiveTop}
                            forFilter={forFilter}
                        />
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={12} md={12} container spacing={2}>
                    {data && (
                        <>
                            {data?.pages.map((item) =>
                                item?.restaurants?.map((restaurantData) => (
                                    <Grid
                                        key={restaurantData?.id}
                                        item
                                        md={3}
                                        sm={matchesToMd ? 4 : 6}
                                        xs={matchesToSmall ? 6 : 12}
                                    >
                                        <RestaurantBoxCard
                                            key={restaurantData?.id}
                                            id={restaurantData.id}
                                            image={restaurantData?.cover_photo}
                                            name={restaurantData?.name}
                                            rating={restaurantData?.avg_rating}
                                            restaurantImageUrl={
                                                global?.base_urls
                                                    ?.restaurant_cover_photo_url
                                            }
                                            restaurantDiscount={
                                                restaurantData.discount &&
                                                restaurantData.discount
                                            }
                                            freeDelivery={
                                                restaurantData.free_delivery
                                            }
                                            open={restaurantData?.open}
                                            active={restaurantData?.active}
                                            delivery_time={
                                                restaurantData?.delivery_time
                                            }
                                            cuisines={restaurantData?.cuisine}
                                            coupons={restaurantData?.coupons}
                                            slug={restaurantData?.slug}
                                        />
                                    </Grid>
                                ))
                            )}
                        </>
                    )}
                    <Stack ref={ref}></Stack>
                    {data?.pages[0]?.restaurants.length === 0 && (
                        <Grid
                            item
                            xs={12}
                            sm={12}
                            md={12}
                            sx={{
                                paddingBlockEnd: '30px',
                                paddingBlockStart: '30px',
                            }}
                        >
                            <CustomEmptyResult
                                image={noData}
                                label="No Restaurant found"
                            />
                        </Grid>
                    )}
                </Grid>
                {isFetchingNextPage && (
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={12}
                        sx={{
                            paddingBlockEnd: '30px',
                            paddingBlockStart: '30px',
                        }}
                    >
                        <Stack sx={{ minHeight: '30vh' }}>
                            <DotSpin />
                        </Stack>
                    </Grid>
                )}
                {isLoading && !isFetchingNextPage && (
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={12}
                        sx={{
                            paddingBlockEnd: '30px',
                            paddingBlockStart: '30px',
                        }}
                    >
                        <Stack sx={{ minHeight: '40vh' }}>
                            <DotSpin />
                        </Stack>
                    </Grid>
                )}
            </Grid>
        </RTL>
    )
}

export default Restaurant
