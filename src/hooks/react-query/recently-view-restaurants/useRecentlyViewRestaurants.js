import MainApi from '../../../api/MainApi'
import { useQuery } from 'react-query'
import {onSingleErrorResponse} from "../../../components/ErrorResponse";

export const getData = async () => {
    const { data } = await MainApi.get('/api/v1/restaurants/recently-viewed-restaurants')
    return data
}
export const useRecentlyViewRestaurants = () => {
    return useQuery('view-restaurants', () => getData(), {
        enabled:true,
        onError:onSingleErrorResponse
    })
}