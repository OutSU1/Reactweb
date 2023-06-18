import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import {
    CustomPaperBigCard,
    CustomStackFullWidth,
} from '../../styled-components/CustomStyles.style'
import SearchResult from './SearchResult'
import { Grid, useMediaQuery } from '@mui/material'
import FoodOrRestaurant from './FoodOrRestaurant'

import ProductList from './ProductList'
import CustomShimmerForBestFood from '../CustomShimmer/CustomShimmerForBestFood'
import RestaurantsData from '../category/RestaurantsData'
import FilterWithSideDrawer from './FilterWithSideDrawer'
import CustomEmptyResult from '../empty-view/CustomEmptyResult'
import Skeleton from '@mui/material/Skeleton'
import noData from '../../../public/static/food.png'
import noRestaurants from '../../../public/static/resturants.png'
import { useRouter } from 'next/router'
import { foodCount } from '../../utils/customFunctions'
import { useTheme } from '@mui/material/styles'
import { AnimationDots } from './AnimationDots'

const SearchFilterWithResults = ({
    searchValue,
    count,
    foodOrRestaurant,
    setFoodOrRestaurant,
    data,
    isLoading,
    offset,
    page_limit,
    setOffset,
    global,
    handleFilter,
    handleClearAll,
    isNetworkCalling,
    popularFoodisLoading,
    restaurantIsLoading,
    page,
    restaurantType,
}) => {
    const theme = useTheme()
    console.log('resta', foodOrRestaurant)
    return (
        <CustomStackFullWidth
            spacing={2}
            sx={{
                minHeight: '53vh',
                marginTop: page || restaurantType ? '0px' : '-35px',
            }}
        >
            <Grid container>
                <Grid item xs={12} sm={12} md={12} align="center">
                    {!page && !restaurantType && (
                        <FoodOrRestaurant
                            foodOrRestaurant={foodOrRestaurant}
                            setFoodOrRestaurant={setFoodOrRestaurant}
                        />
                    )}
                </Grid>

                <Grid
                    container
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    justifyContent="space-between"
                    sx={{
                        borderBottom: `1px solid ${theme.palette.neutral[300]}`,
                        paddingBottom: '10px',
                        paddingTop: '1.5rem',
                    }}
                >
                    <FilterWithSideDrawer
                        isLoading={isLoading}
                        handleFilter={handleFilter}
                        handleClearAll={handleClearAll}
                        foodOrRestaurant={foodOrRestaurant}
                        count={
                            foodOrRestaurant === 'products'
                                ? foodCount(data?.data?.products)
                                : data?.data?.total_size
                        }
                        isNetworkCalling={isNetworkCalling}
                        page={page}
                        restaurantType={
                            restaurantType === 'latest' ? 'new' : restaurantType
                        }
                    />
                </Grid>
                <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    container
                    spacing={2}
                    paddingTop="1rem"
                >
                    {(foodOrRestaurant === 'products' || page) && (
                        <>
                            {data?.data?.products?.length > 0 && !isLoading && (
                                <ProductList
                                    product_list={data?.data}
                                    offset={offset}
                                    page_limit={page_limit}
                                    setOffset={setOffset}
                                />
                            )}
                            {data?.data?.products?.length === 0 && (
                                <CustomEmptyResult
                                    label="No food found"
                                    image={noData}
                                />
                            )}
                        </>
                    )}
                    {foodOrRestaurant === 'restaurants' && (
                        <>
                            {data && !isLoading && (
                                <RestaurantsData
                                    resData={data}
                                    offset={offset}
                                    page_limit={page_limit}
                                    setOffset={setOffset}
                                    global={global}
                                    restaurantType={restaurantType}
                                />
                            )}
                            {data?.data?.restaurants?.length === 0 && (
                                <CustomEmptyResult
                                    label="No restaurant found"
                                    image={noRestaurants}
                                />
                            )}
                        </>
                    )}
                    {isLoading && <AnimationDots align="center" />}
                    {isNetworkCalling && <AnimationDots align="center" />}
                    {popularFoodisLoading && <AnimationDots align="center" />}
                    {restaurantIsLoading && <AnimationDots align="center" />}
                </Grid>
            </Grid>
        </CustomStackFullWidth>
    )
}

SearchFilterWithResults.propTypes = {}

export default SearchFilterWithResults
