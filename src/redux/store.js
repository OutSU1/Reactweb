import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../redux/slices/counter'
import layoutReducer from '../redux/slices/layout'
import multiStepFormReducer from './slices/multiStepForm'
import globalSettingsReducer from './slices/global'
import cartReducer from './slices/cart'
import wishListSlice from './slices/wishList'
import searchFilterSlice from './slices/searchFilter'
import restaurantFoodFilterSlice from './slices/restaurantFoodFilter'
import fbCredentialSlice from './slices/fbCredentials'
import storedDataSliceReducer from './slices/storedData'
import landingPageSliceReducer from './slices/landingpagedata'

import storage from 'redux-persist/lib/storage'
import { combineReducers } from 'redux'
import {
    persistReducer,
    // FLUSH,
    // REHYDRATE,
    // PAUSE,
    // PERSIST,
    // PURGE,
    // REGISTER,
} from 'redux-persist'
import userSlice from './slices/customer'
import orderTypeSlice from './slices/orderType'
import userTokenReducer from './slices/userToken'

const persistConfig = {
    key: 'stack-food',
    storage: storage,
    blacklist: ['searchFilterStore', 'storedData'],
}
const reducers = combineReducers({
    counter: counterReducer,
    layout: layoutReducer,
    globalSettings: globalSettingsReducer,
    cart: cartReducer,
    wishList: wishListSlice,
    restaurantFoodFilterStore: restaurantFoodFilterSlice,
    searchFilterStore: searchFilterSlice,
    user: userSlice,
    orderType: orderTypeSlice,
    fbCredentialsStore: fbCredentialSlice,
    storedData: storedDataSliceReducer,
    landingPage: landingPageSliceReducer,
    userToken: userTokenReducer,
})
const persistedReducer = persistReducer(persistConfig, reducers)
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
            // serializableCheck: {
            //     ignoredActions: [
            //         FLUSH,
            //         REHYDRATE,
            //         PAUSE,
            //         PERSIST,
            //         PURGE,
            //         REGISTER,
            //     ],
            // },
        }),
})
