import React, { useEffect, useState } from 'react'

import { useQuery } from 'react-query'
import { ProductsApi } from '../../hooks/react-query/config/productsApi'
import Loading from '../custom-loading/Loading'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { CustomStackFullWidth } from '../../styled-components/CustomStyles.style'

import SearchFilterWithResults from './SearchFilterWithResults'
import Skeleton from '@mui/material/Skeleton'
import { getFilterChoices } from './getFilterChoices'
import Meta from '../Meta'
import { onErrorResponse } from '../ErrorResponse'
import CustomContainer from '../container'
import { RestaurantsApi } from '../../hooks/react-query/config/restaurantApi'
import { searchMockData } from './SearchMockData'
import { setFilterbyByDispatch } from '../../redux/slices/searchFilter'

const ProductSearchPage = ({
    product_type,
    configData,
    query,
    page,
    restaurantType,
}) => {
    const dispatch = useDispatch()
    const { global } = useSelector((state) => state.globalSettings)
    const router = useRouter()
    const [type, setType] = useState('all')
    // const pageLimitFromAdmin = global.
    const [page_limit, setPageLimit] = useState(60)
    const [offset, setOffset] = useState(1)
    const [searchValue, setSearchValue] = useState('')
    const [foodOrRestaurant, setFoodOrRestaurant] = useState('products')
    const { filterData } = useSelector((state) => state.searchFilterStore)
    const [checkfilter, setCheckfilter] = useState(false)
    const [pageData, setPageData] = useState({})
    const [searchOrPage, setSearchOrPage] = useState({})
    const apiKey =
        foodOrRestaurant === 'products'
            ? 'products-search'
            : 'restaurant-search'
    const handleAPiCallOnSuccess = (res) => {
        if (restaurantType) {
            setFoodOrRestaurant('restaurants')
            setPageData({
                ...res,
                data: {
                    ...res,
                    restaurants: res.data,
                    total_size: res?.data?.length,
                },
            })
            setSearchOrPage({
                ...res,
                data: {
                    ...res,
                    restaurants: res.data,
                    total_size: res?.data?.length,
                },
            })
        } else {
            setFoodOrRestaurant('products')
            setPageData(res)
            setSearchOrPage(res)
        }
    }

    const { isLoading, data, isError, error, refetch, isRefetching } = useQuery(
        [apiKey, foodOrRestaurant, searchValue, offset, page_limit],
        () =>
            ProductsApi.productSearch(
                foodOrRestaurant,
                searchValue,
                offset,
                page_limit
            ),
        {
            enabled: false,
            onSuccess: handleAPiCallOnSuccess,
            onError: onErrorResponse,
        }
    )

    //POPULAR AND BEST REVIEW FOOD API
    const {
        isLoading: popularFoodisLoading,
        data: popularData,
        refetch: popularRefetch,
    } = useQuery(
        ['popular-food', offset, page_limit, type],
        () => ProductsApi.products(page, offset, page_limit, type),
        {
            enabled: false,
            onSuccess: handleAPiCallOnSuccess,
        }
    )
    const {
        isLoading: restaurantIsLoading,
        data: restaurantData,
        refetch: restaurantRefetch,
    } = useQuery(
        [`restaurant-list`, restaurantType],
        () => RestaurantsApi.typeWiseRestaurantList({ restaurantType, type }),
        {
            enabled: false,
            onSuccess: handleAPiCallOnSuccess,
            onError: onErrorResponse,
        }
    )

    useEffect(() => {
        if (restaurantType !== undefined) {
            restaurantRefetch()
        }
    }, [restaurantType])

    useEffect(() => {
        if (page !== undefined) {
            popularRefetch()
        }
    }, [page])

    useEffect(() => {
        if (query || page || restaurantType) {
            setSearchValue(query)
        } else {
            let searchValues = []
            if (typeof window !== 'undefined') {
                searchValues = JSON.parse(
                    localStorage.getItem('searchedValues')
                )
                if (searchValues?.length > 0 && searchValues[0]) {
                    setSearchValue(searchValues[0])
                } else {
                    router.push('/home')
                }
            }
        }
    }, [query])
    useEffect(async () => {
        if (searchValue !== '' && !page && !restaurantType) {
            await refetch()
        }
    }, [searchValue])

    useEffect(() => {
        setOffset(1)
        if (searchValue !== undefined) {
            refetch()
        }
    }, [foodOrRestaurant])

    if (isError) {
        return <h1>{error.messages}</h1>
    }
    //const searchOrPage = All ? popularData : data
    useEffect(() => {
        handleFilteredData()
    }, [checkfilter])

    const handleFilter = () => {
        setCheckfilter((prevState) => !prevState)
    }
    const handleClearAll = async () => {
        await refetch()
    }

    const handleFilteredData = () => {
        let filteredData = getFilterChoices(
            filterData,
            searchOrPage,
            foodOrRestaurant
        )

        setPageData({
            ...searchOrPage,
            data:
                foodOrRestaurant === 'products'
                    ? {
                          ...pageData?.data,
                          products: filteredData,
                          total_size: filteredData?.length,
                      }
                    : {
                          ...pageData.data,
                          restaurants: filteredData,
                          total_size: filteredData?.length,
                      },
        })
    }

    return (
        <>
            <Meta
                title={`${searchValue ? searchValue : 'Searching...'} on ${
                    configData?.business_name
                }`}
            />
            <CustomStackFullWidth mb="5rem" sx={{ minHeight: '70vh' }}>
                {pageData && (
                    <SearchFilterWithResults
                        searchValue={searchValue}
                        foodOrRestaurant={foodOrRestaurant}
                        setFoodOrRestaurant={setFoodOrRestaurant}
                        isLoading={isLoading}
                        isNetworkCalling={isRefetching}
                        data={pageData}
                        page_limit={page_limit}
                        offset={offset}
                        setOffset={setOffset}
                        global={global}
                        handleFilter={handleFilter}
                        handleClearAll={handleClearAll}
                        page={page === 'most-reviewed' ? 'most_reviewed' : page}
                        popularFoodisLoading={popularFoodisLoading}
                        restaurantType={restaurantType}
                        restaurantIsLoading={restaurantIsLoading}
                    />
                )}
            </CustomStackFullWidth>
        </>
    )
}

export default ProductSearchPage
