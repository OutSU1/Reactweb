import React from 'react'
import { CustomStackFullWidth } from '../../styled-components/CustomStyles.style'
import { Grid, Typography } from '@mui/material'
import RestaurantBoxCard from '../restaurant-details/RestaurantBoxCard'
import { useSelector } from 'react-redux'
import CustomPageTitle from '../CustomPageTitle'
import CustomShimmerRestaurant from '../CustomShimmer/CustomShimmerRestaurant'
import CustomEmptyResult from '../empty-view/CustomEmptyResult'
import nodata from '../../../public/static/nodata.png'

const CuisinesDetailsPage = ({ data, isLoading }) => {
    const { global } = useSelector((state) => state.globalSettings)
    return (
        <CustomStackFullWidth spacing={2} sx={{ minHeight: '70vh' }}>
            <CustomPageTitle title="Cuisine Restaurant" />
            <Grid container spacing={1}>
                {data &&
                    data?.restaurants.length > 0 &&
                    data?.restaurants?.map((restaurant) => {
                        return (
                            <Grid
                                item
                                xs={6}
                                sm={4}
                                md={3}
                                key={restaurant?.id}
                            >
                                <RestaurantBoxCard
                                    image={restaurant?.cover_photo}
                                    name={restaurant?.name}
                                    rating={restaurant?.avg_rating}
                                    restaurantImageUrl={
                                        global?.base_urls
                                            ?.restaurant_cover_photo_url
                                    }
                                    id={restaurant?.id}
                                    active={restaurant?.active}
                                    open={restaurant?.open}
                                    restaurantDiscount={restaurant?.discount}
                                    freeDelivery={restaurant?.free_delivery}
                                    delivery_time={restaurant?.delivery_time}
                                    cuisines={restaurant?.cuisine}
                                    v
                                />
                            </Grid>
                        )
                    })}
                {isLoading && <CustomShimmerRestaurant />}
                {data?.restaurants.length === 0 && (
                    <CustomEmptyResult
                        image={nodata}
                        label="No Cuisine Restaurant Found"
                    />
                )}
            </Grid>
        </CustomStackFullWidth>
    )
}

export default CuisinesDetailsPage
