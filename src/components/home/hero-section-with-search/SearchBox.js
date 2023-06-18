import React, { useEffect, useRef, useState } from 'react'
import { CustomStackFullWidth } from '../../../styled-components/CustomStyles.style'
import CustomSearchInput from './CustomSearchInput'
import { useRouter } from 'next/router'
import { alpha } from '@mui/material'
import SearchSuggestionsBottom from '../../search/SearchSuggestionsBottom'
import { useSelector } from 'react-redux'

const SearchBox = ({ query }) => {
    const [focused, setFocused] = React.useState(false)
    const [openSearchSuggestions, setOpenSearchSuggestions] = useState(false)
    const [selectedValue, setSelectedValue] = useState('')
    const [onSearchDiv, setOnSearchDiv] = useState(false)
    const { token } = useSelector((state) => state.userToken)
    const [inputValue, setInputValue] = useState('')
    const router = useRouter()
    const searchRef = useRef(null)
    const onFocus = () => setFocused(true)
    const onBlur = () => {
        //setFocused(false)
    }

    const handleSearchedValues = (value) => {
        console.log('value', value)
        const searchedValues = JSON.parse(
            localStorage.getItem('searchedValues')
        )
        if (searchedValues && searchedValues.length > 0) {
            if (value !== '') {
                searchedValues.push(value)
            }
            localStorage.setItem(
                'searchedValues',
                JSON.stringify([...new Set(searchedValues)])
            )
        } else {
            if (value !== '') {
                let newData = []
                newData.push(value)
                localStorage.setItem('searchedValues', JSON.stringify(newData))
            }
        }
    }
    const routeHandler = (value) => {
        setFocused(false)
        setInputValue('')

        if (value !== '') {
            router.push(
                {
                    pathname:
                        router.pathname === '/home'
                            ? window.location.pathname
                            : '/search',
                    query: {
                        query: value,
                    },
                },
                undefined,
                { shallow: router.pathname === '/home' ? true : false }
            )
            onBlur()
        }
    }
    const handleKeyPress = (value) => {
        handleSearchedValues(value)
        routeHandler(value)
    }
    const handleClickOutside = (event) => {
        if (searchRef.current && !searchRef.current.contains(event.target)) {
            setFocused(false)
        }
    }
    useEffect(() => {
        // Bind the event listener
        document.addEventListener('mousedown', handleClickOutside, {
            passive: true,
        })
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [searchRef])

    const handleSearchSuggestionsBottom = () => {
        if (token) {
            if (focused || inputValue.trim().length >= 1) {
                return (
                    <SearchSuggestionsBottom
                        setOnSearchDiv={setOnSearchDiv}
                        setOpenSearchSuggestions={setOpenSearchSuggestions}
                        setSelectedValue={setSelectedValue}
                        routeHandler={routeHandler}
                        handleFocus={onFocus}
                        inputValue={inputValue}
                    />
                )
            }
        } else {
            if (inputValue.trim().length >= 1) {
                return (
                    <SearchSuggestionsBottom
                        setOnSearchDiv={setOnSearchDiv}
                        setOpenSearchSuggestions={setOpenSearchSuggestions}
                        setSelectedValue={setSelectedValue}
                        routeHandler={routeHandler}
                        handleFocus={onFocus}
                        inputValue={inputValue}
                    />
                )
            }
        }
    }

    return (
        <CustomStackFullWidth
            ref={searchRef}
            sx={{
                background: (theme) => theme.palette.searchBoxBg,
                padding: '20px',
                borderRadius: '2px',
                maxWidth: '640px',
                position: 'relative',
            }}
        >
            <CustomSearchInput
                setInputValue={setInputValue}
                handleSearchResult={handleKeyPress}
                handleFocus={onFocus}
                handleBlur={onBlur}
                query={query}
                setFocused={setFocused}
            />
            {handleSearchSuggestionsBottom()}
        </CustomStackFullWidth>
    )
}

export default SearchBox
