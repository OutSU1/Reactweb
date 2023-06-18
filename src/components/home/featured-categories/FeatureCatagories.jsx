import React, { memo, useEffect, useRef } from 'react'
import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useQuery } from 'react-query'
import Slider from 'react-slick'

import { CategoryApi } from '../../../hooks/react-query/config/categoryApi'
import FeaturedCategoryCard from '../../featured-category-item/FeaturedCategoryCard'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import 'react-multi-carousel/lib/styles.css'
import CustomShimmerCategories from '../../CustomShimmer/CustomShimmerCategories'
import { useRouter } from 'next/router'
import {
    CustomStackFullWidth,
    CustomViewAll,
} from '../../../styled-components/CustomStyles.style'
import { CustomTypography } from '../../custom-tables/Tables.style'
import { settings } from './SliderSettings'
import { useTheme } from '@mui/material/styles'
import { onErrorResponse } from '../../ErrorResponse'

const FeatureCatagories = () => {
    const theme = useTheme()
    const { t } = useTranslation()
    const router = useRouter()
    const { global } = useSelector((state) => state.globalSettings)
    const { featuredCategories } = useSelector((state) => state.storedData)

    const sliderRef = useRef(null)
    const searchKey = ''
    // const { data, refetch: refetchCategories } = useQuery(
    //     ['category'],
    //     () => CategoryApi.categories(searchKey),
    //     {
    //         enabled: false,
    //         staleTime: 1000 * 60 * 8,
    //         onError: onErrorResponse,
    //         cacheTime: 8 * 60 * 1000,
    //     }
    // )
    // useEffect(() => {}, [])
    return (
        <>
            <Grid container>
                <Grid item xs={12} md={12}>
                    {featuredCategories?.length > 0 ? (
                        <Slider
                            className="slick__slider"
                            {...settings}
                            ref={sliderRef}
                        >
                            {featuredCategories.map((categoryItem) => (
                                <FeaturedCategoryCard
                                    key={categoryItem?.id}
                                    id={categoryItem?.id}
                                    categoryImage={categoryItem?.image}
                                    name={categoryItem?.name}
                                    categoryImageUrl={
                                        global?.base_urls?.category_image_url
                                    }
                                    height="40px"
                                />
                            ))}
                        </Slider>
                    ) : (
                        <CustomShimmerCategories
                            noSearchShimmer="true"
                            itemCount="7"
                            smItemCount="5"
                        />
                    )}
                </Grid>
            </Grid>
        </>
    )
}

export default memo(FeatureCatagories)
