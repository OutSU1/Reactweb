import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Box from '@mui/material/Box'
import {
    CustomAppbarFilter,
    CustomTypographyForSideDrawerFilter,
    WrapperForSideDrawerFilter,
} from '../../gurbage/admin/components/filter/SideDrawerFilter.style'
import Toolbar from '@mui/material/Toolbar'
import { Stack } from '@mui/material'
import Typography from '@mui/material/Typography'
import CustomDateRangePicker from '../custom-date-range-picker/CustomDateRangePicker'
import CustomMultiSelectTags from '../custom-multi-select-tags/CustomMultiSelectTags'
import {
    CustomButtonGray,
    CustomButtonPrimary,
} from '../../styled-components/CustomButtons.style'
//import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css'
import { useTranslation } from 'react-i18next'
import { CustomColouredTypography } from '../../styled-components/CustomStyles.style'
import CustomSlider from '../custom-slider/CustomSlider'
import CustomRatings from '../custom-ratings/CustomRatings'
import CustomGroupCheckbox from '../custom-group-checkboxs/CustomGroupCheckbox'
import { useDispatch, useSelector } from 'react-redux'
import {
    setFilterbyByCuisineDispatch,
    setFilterbyByDispatch,
    setFilterDrawerOpenByDispatch,
    setPriceByDispatch,
    setRatingByDispatch,
    setSortbyByDispatch,
} from '../../redux/slices/searchFilter'
import { setIconicSidebar } from '../../redux/slices/layout'
import ButtonGroups from './ButtonGroups'
import { useGetCuisines } from '../../hooks/react-query/cuisines/useGetCuisines'
import SimpleBar from 'simplebar-react'
import { searchMockData } from './SearchMockData'

const FilterCard = ({
    setSideDrawerOpen,
    handleDropClose,
    handleFilter,
    handleClearAll,
    foodOrRestaurant,
    sideDrawerOpen,
    stateData,
    setStateData,
}) => {
    const { t } = useTranslation()
    const { filterData } = useSelector((state) => state.searchFilterStore)
    const [storeData, setStoreData] = useState({ ...filterData })
    const [cuisineState, setCuisineState] = useState([])
    const [isFilterCall, setIsFilterCall] = useState(false)
    const dispatch = useDispatch()
    const handleFilterBy = () => {
        const activeFilters = stateData.filter((item) => item.isActive === true)
        dispatch(setFilterbyByDispatch(activeFilters))
        dispatch(setPriceByDispatch(storeData?.price))
        dispatch(setRatingByDispatch(storeData?.rating))
        dispatch(setFilterbyByCuisineDispatch(storeData.filterByCuisine))
        handleFilter()
    }
    useEffect(() => {
        if (isFilterCall) {
            handleFilterBy()
        }
    }, [stateData, storeData])

    const handlePrice = (value) => {
        setStoreData({
            ...storeData,
            price: value,
        })
        setIsFilterCall(true)
    }
    const handleChangeRatings = (value) => {
        setStoreData({
            ...storeData,
            rating: value,
        })
        setIsFilterCall(true)
    }
    const handleSuccess = (res) => {
        setCuisineState(res?.Cuisines)
    }

    const { data, isLoading, refetch, isRefetching } =
        useGetCuisines(handleSuccess)
    useEffect(() => {
        if (foodOrRestaurant === 'restaurants') {
            refetch()
        }
        dispatch(setFilterbyByCuisineDispatch([]))
    }, [])

    // useEffect(() => {
    //     dispatch(setFilterbyByCuisineDispatch([]))
    // }, [sideDrawerOpen])
    return (
        <Box>
            <WrapperForSideDrawerFilter smminwith="270px">
                <Stack spacing={3}>
                    {/*<Stack spacing={1}>*/}
                    {/*    <Typography variant="h4">{t('Sort By')}</Typography>*/}
                    {/*    <ButtonGroups handleSortBy={handleSortBy} />*/}
                    {/*</Stack>*/}
                    <Stack spacing={1}>
                        <Typography variant="h4">{t('Filter By')}</Typography>
                        <Stack direction="row">
                            <CustomGroupCheckbox
                                handleChangeFilter={handleFilterBy}
                                // checkboxState={filterData.filterBy}
                                checkboxData={stateData}
                                stateData={stateData}
                                setStateData={setStateData}
                                setIsFilterCall={setIsFilterCall}
                            />
                        </Stack>
                    </Stack>
                    {/*{foodOrRestaurant === 'restaurants' && (*/}
                    {/*    <Stack spacing={1}>*/}
                    {/*        <Typography variant="h4">*/}
                    {/*            {t('Cuisines')}*/}
                    {/*        </Typography>*/}
                    {/*        <SimpleBar style={{ maxHeight: 200 }}>*/}
                    {/*            <CustomGroupCheckbox*/}
                    {/*                isLoading={isLoading}*/}
                    {/*                checkboxData={cuisineState?.map((item) => {*/}
                    {/*                    return {*/}
                    {/*                        ...item,*/}
                    {/*                        isActive: false,*/}
                    {/*                    }*/}
                    {/*                })}*/}
                    {/*                forcuisine="true"*/}
                    {/*                setCuisineState={setCuisineState}*/}
                    {/*                cuisineState={cuisineState}*/}
                    {/*            />*/}
                    {/*        </SimpleBar>*/}
                    {/*    </Stack>*/}
                    {/*)}*/}
                    {foodOrRestaurant === 'products' && (
                        <Stack spacing={1} width="100%">
                            <Typography variant="h4">{t('Price')}</Typography>
                            <CustomSlider
                                handleChangePrice={handlePrice}
                                priceValue={filterData.price}
                            />
                        </Stack>
                    )}
                    <Stack
                        spacing={1}
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Typography variant="h4">{t('Rating')}</Typography>
                        <CustomRatings
                            handleChangeRatings={handleChangeRatings}
                            ratingValue={filterData.rating}
                        />
                    </Stack>
                </Stack>
            </WrapperForSideDrawerFilter>
        </Box>
    )
}

FilterCard.propTypes = {}

export default FilterCard
