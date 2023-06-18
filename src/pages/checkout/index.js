import React, { useEffect } from 'react'
import CheckOut from '../../components/checkout-page/CheckOut'
import Meta from '../../components/Meta'
import { Container, CssBaseline } from '@mui/material'
import {
    CustomPaperBigCard,
    CustomStackFullWidth,
} from '../../styled-components/CustomStyles.style'
import ProductPage from '../../components/products-page/ProductPage'
import { useTranslation } from 'react-i18next'
import Router, { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { CustomHeader } from '../../api/Headers'
import CustomContainer from '../../components/container'

const CheckoutLayout = ({ configData }) => {
    const { t } = useTranslation()
    const { cartList } = useSelector((state) => state.cart)
    const { token } = useSelector((state) => state.userToken)
    //token && cartList?.length === 0 && Router.push('/home')
    const router = useRouter()
    const { page } = router.query

    return (
        <>
            <CssBaseline />
            <CustomContainer>
                <CustomStackFullWidth sx={{ marginTop: '5rem' }}>
                    <Meta
                        title={`Checkout on ${configData?.business_name}`}
                        description=""
                        keywords=""
                    />
                    {token && page === 'campaign' && <CheckOut />}
                    {token && page !== 'campaign' && cartList.length > 0 && (
                        <CheckOut />
                    )}
                </CustomStackFullWidth>
            </CustomContainer>
        </>
    )
}
//
// CheckoutLayout.getLa
// CheckoutLayout.getLayout = (page) =>

export default CheckoutLayout
export const getServerSideProps = async () => {
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
            configData: config,
        },
    }
}
