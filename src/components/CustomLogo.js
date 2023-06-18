import React from 'react'
import { Box } from '@mui/material'
import { Logo } from '../styled-components/CustomStyles.style'
import { useRouter } from 'next/router'

const CustomLogo = ({ logoImg, atlText, height, width }) => {
    const router = useRouter()
    let zoneid = undefined
    if (typeof window !== 'undefined') {
        zoneid = JSON.parse(localStorage.getItem('zoneid'))
    }
    const handleClick = () => {
        if (router.pathname === '/') {
            if (zoneid) {
                router.push('/home', undefined, { shallow: true }).then()
                window.scrollTo(0, 0)
            } else {
                router.push('/', undefined, { shallow: true }).then()
                window.scrollTo(0, 0)
            }
        } else {
            router.push('/home', undefined, { shallow: true }).then()
            window.scrollTo(0, 0)
        }
    }
    return (
        <Logo height={height} width={width} onClick={handleClick}>
            <img src={logoImg} alt={atlText} />
        </Logo>
    )
}
export default CustomLogo
