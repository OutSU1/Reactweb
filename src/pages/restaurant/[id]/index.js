import React from 'react'
import RestaurantDetails from '../../../components/restaurant-details/RestaurantDetails'
import Meta from '../../../components/Meta'
import MainApi from '../../../api/MainApi'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { CustomHeader } from '../../../api/Headers'

const index = ({ restaurantData, configData }) => {
    const { global } = useSelector((state) => state.globalSettings)
    const restaurantCoverUrl = global?.base_urls?.restaurant_cover_photo_url
    const restaurantCoverPhoto = `${restaurantCoverUrl}/${restaurantData?.cover_photo}`
    const router = useRouter()
    const origin =
        typeof window !== 'undefined' && window.location.origin
            ? window.location.origin
            : ''

    return (
        <>
            <Meta
                title={`${restaurantData?.name} - ${configData?.business_name}`}
                ogImage={`${configData?.base_urls?.restaurant_cover_photo_url}/${restaurantData?.cover_photo}`}
                description={restaurantData?.address}
            />
            <RestaurantDetails restaurantData={restaurantData} />
        </>
    )
}

export default index
export const getServerSideProps = async ({ params: { id }, resolvedUrl }) => {
    const data = await MainApi.get(`/api/v1/restaurants/details/${id}`)
    const configRes = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/config`,
        {
            method: 'GET',
            headers: CustomHeader,
        }
    )
    const config = await configRes.json()
    return {
        props: {
            restaurantData: data.data,
            configData: config,
        },
    }
}
