import React from 'react'
import PropTypes from 'prop-types'
import { Box, Card, Container, Stack } from '@mui/material'
import SuccessCard from '../../components/checkout-page/SuccessCard'
import { useRouter } from 'next/router'
import CheckoutFailed from '../../components/checkout-page/CheckoutFailed'
import { CustomPaperBigCard } from '../../styled-components/CustomStyles.style'
import Meta from '../../components/Meta'
import { useTranslation } from 'react-i18next'
const Index = (props) => {
    const router = useRouter()
    const { status, amnt,order_id } = router.query
    const { t } = useTranslation()
    return (
        <>
            <Meta
                title={
                    status === 'fail'||status === 'cancel'
                        ? t('Order placement failed')
                        : t('Order placed successfully.')
                }
            />
            <Container maxWidth="lg" sx={{ mb: { xs: '72px', md: '0' } }}>
                <>
                    {
                        router.isReady && <Stack
                            width="100%"
                            height="60vh"
                            mt={{ xs: '5rem', md: '9rem' }}
                            mb="3rem"
                            alignItems="center"
                            justifyContent="center"
                        >
                            <CustomPaperBigCard>
                                {status  && status === 'fail' || status === 'cancel'  ? (
                                    <CheckoutFailed id={order_id}/>
                                ) : (
                                    <SuccessCard totalAmount={amnt} />
                                )
                                }
                            </CustomPaperBigCard>
                        </Stack>
                    }

                </>

            </Container>
        </>
    )
}

Index.propTypes = {}

export default Index
