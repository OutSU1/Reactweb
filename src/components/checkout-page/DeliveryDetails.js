import React from 'react'
import {DeliveryCaption, DeliveryTitle} from './CheckOut.style'
import {useTranslation} from 'react-i18next'
import FormControl from '@mui/material/FormControl'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'
import DeliveryAddress from './DeliveryAddress'
import {CustomPaperBigCard, CustomStackFullWidth} from '../../styled-components/CustomStyles.style'
import OrderType from "./order-type";
import AdditionalAddresses from "./AdditionalAddresses";

const DeliveryDetails = (props) => {
    const {global, restaurantData, setOrderType, orderType, setAddress, address, subscriptionStates, subscriptionDispatch, page,
        additionalInformationStates,
        additionalInformationDispatch} =
        props
    const {t} = useTranslation()
    return (
        <CustomPaperBigCard>
            <CustomStackFullWidth>
                <DeliveryTitle>{global?.cash_on_delivery && restaurantData?.data?.order_subscription_active && t('ORDER TYPE &')} {t('DELIVERY DETAILS')}</DeliveryTitle>
                <FormControl>
                    {page!=='campaign' && global?.cash_on_delivery && restaurantData?.data?.order_subscription_active && <OrderType t={t} subscriptionStates={subscriptionStates}
                                                        subscriptionDispatch={subscriptionDispatch}/> }

                    <DeliveryCaption const id="demo-row-radio-buttons-group-label">
                        {t('Delivery Options')}
                    </DeliveryCaption>
                    {restaurantData?.data && (
                        <RadioGroup
                            defaultValue="delivery"
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            onChange={(e) => setOrderType(e.target.value)}
                        >
                            {restaurantData?.data?.delivery && (
                                <FormControlLabel
                                    value="delivery"
                                    control={<Radio/>}
                                    label={t('Home Delivery')}
                                />
                            )}
                            {restaurantData?.data?.take_away && (
                                <FormControlLabel
                                    value="take_away"
                                    control={<Radio/>}
                                    label={t('Take Away')}
                                />
                            )}
                        </RadioGroup>
                    )}
                </FormControl>

                {orderType === 'delivery' && (
                    <DeliveryAddress setAddress={setAddress} address={address} additionalInformationDispatch={additionalInformationDispatch} restaurantId={restaurantData?.data?.zone_id} />
                )}
                <AdditionalAddresses t={t}  additionalInformationStates={additionalInformationStates}
                                     additionalInformationDispatch={additionalInformationDispatch}/>
            </CustomStackFullWidth>
        </CustomPaperBigCard>
    )
}

DeliveryDetails.propTypes = {}

export default DeliveryDetails
