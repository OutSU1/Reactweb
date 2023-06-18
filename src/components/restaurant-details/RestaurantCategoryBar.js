import React, { useEffect, useRef, useState } from 'react'
import { alpha, Grid, Popover, Typography } from '@mui/material'
import { CustomStackFullWidth } from '../../styled-components/CustomStyles.style'
import { CategoryButton } from './restaurant-details.style'
import { styled, useTheme } from '@mui/material/styles'
import FilterButton from '../Button/FilterButton'
import { Box } from '@mui/system'
import RestaurantFilterCard from '../home/restaurant/RestaurantFilterCard'
import { filterData } from '../home/restaurant/FilterData'
import { setFilterbyByCuisineDispatch } from '../../redux/slices/searchFilter'
import { RTL } from '../RTL/RTL'
import { CustomTypographyEllipsis } from '../../styled-components/CustomTypographies.style'

const CustomBox = styled(Box)(({ theme }) => ({
    width: '100%',

    overflowX: 'none',
    overflowY: 'auto',
    cursor: 'pointer',
    '&::-webkit-scrollbar': {
        height: '4px',
    },
    '&::-webkit-scrollbar-track': {
        backgroundColor: theme.palette.whiteContainer.main,
        borderRadius: 10,
        opacity: 0,
        zIndex: -1,
    },
    '&::-webkit-scrollbar-thumb': {
        backgroundColor: theme.palette.neutral[300],
        borderRadius: 10,
        opacity: 0,
        transition: 'opacity 0.2s',
    },
    '&::-webkit-scrollbar-thumb:hover': {
        backgroundColor: theme.palette.neutral[400],
    },
    '&:hover': {
        '&::-webkit-scrollbar-thumb': {
            opacity: 1,
        },
    },
    // '&::after': {
    //     content: '" "',
    //     display: 'flex',
    //     width: '20px',
    //     height: '100%',
    //     right: 0,
    //     position: 'absolute',
    //     marginLeft: 'auto',
    //     top: 0,
    //     background: theme.palette.neutral[300],
    //     opacity: '.3',
    // },
}))

const RestaurantCategoryBar = (props) => {
    const {
        data,
        selectedId,
        handleClick,
        filterKey,
        setFilterKey,
        handleFilter,
    } = props
    const [checkedFilterKey, setCheckedFilterKey] = useState(filterData)
    const theme = useTheme()
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)
    const refs = useRef([])
    const scrollerRef = useRef(null)
    const handleDropClick = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleDropClose = () => {
        setAnchorEl(null)
    }
    useEffect(() => {
        if (selectedId && refs.current[selectedId]) {
            const selectedButton = refs.current[selectedId]
            const scrollerLeft =
                scrollerRef.current.getBoundingClientRect().left
            const buttonLeft = selectedButton.getBoundingClientRect().left
            const offset =
                buttonLeft -
                scrollerLeft +
                (selectedButton.offsetWidth - scrollerRef.current.offsetWidth) /
                    2
            scrollerRef.current.scrollLeft = offset
        }
    }, [selectedId])

    // useEffect(() => {
    //     setCheckFilterKey(filterData)
    // }, [])

    const handleFilterData = (event, id) => {
        const activeFilters = checkedFilterKey.filter(
            (filter) => filter.isActive === true
        )

        const filteredData = {
            veg:
                activeFilters.find((filter) => filter.value === 'veg') !==
                undefined,
            nonVeg:
                activeFilters.find((filter) => filter.value === 'nonVeg') !==
                undefined,
            currentlyAvailable:
                activeFilters.find(
                    (filter) => filter.value === 'currentlyAvailable'
                ) !== undefined,
            discount:
                activeFilters.find((filter) => filter.value === 'discount') !==
                undefined,
        }
        setFilterKey(filteredData)
        handleFilter()
    }

    useEffect(() => {
        handleFilterData()
    }, [checkedFilterKey])
    let languageDirection = undefined
    if (typeof window !== 'undefined') {
        languageDirection = localStorage.getItem('direction')
    }
    return (
        <RTL direction={languageDirection}>
            <Grid
                container
                sx={{
                    borderBottom: `1px solid ${theme.palette.borderBottomBg}`,
                    position: 'sticky',
                    top: { xs: '158px', sm: '200px', md: '200px' },
                    background: (theme) => theme.palette.neutral[1800],
                    padding: {
                        xs: '5px 5px 0px 10px',
                        sm: '20px 5px 0px 0px',
                        md: '20px 5px 0px 0px',
                    },
                    zIndex: 999,
                    boxShadow: `0px 4px 15px ${alpha(
                        theme.palette.primary.main,
                        0.1
                    )}`,
                }}
                alignItems="center"
            >
                <Grid item xs={9} sm={10} md={10} sx={{ position: 'relative' }}>
                    <CustomBox ref={scrollerRef}>
                        <CustomStackFullWidth direction="row">
                            {data?.map((item) => {
                                return (
                                    <CategoryButton
                                        key={item?.id}
                                        id={item?.id}
                                        ref={(el) =>
                                            (refs.current[item?.id] = el)
                                        }
                                        onClick={() => handleClick(item?.id)}
                                        active={
                                            selectedId === item?.id
                                                ? 'true'
                                                : 'false'
                                        }
                                    >
                                        <Typography
                                            fontSize={{
                                                xs: '12px',
                                                sm: '14px',
                                                md: '14px',
                                            }}
                                            fontWeight="500"
                                        >
                                            {item?.name}
                                        </Typography>
                                        {/*<CustomTypographyEllipsis>*/}
                                        {/*    */}
                                        {/*</CustomTypographyEllipsis>*/}
                                    </CategoryButton>
                                )
                            })}
                        </CustomStackFullWidth>
                    </CustomBox>
                </Grid>
                <Grid
                    item
                    xs={3}
                    sm={2}
                    md={2}
                    align={languageDirection === 'rtl' ? 'left' : 'right'}
                    sx={{ paddingBottom: '.7rem' }}
                >
                    <FilterButton handleClick={handleDropClick} />
                </Grid>
            </Grid>
            <Popover
                onClose={() => handleDropClose()}
                id="fade-button"
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                sx={{
                    zIndex: 999,
                }}
            >
                <RestaurantFilterCard
                    homeRestaurant="true"
                    checkboxData={checkedFilterKey}
                    handleDropClose={handleDropClose}
                    anchorEl={anchorEl}
                    handleFilterData={handleFilterData}
                    setCheckedFilterKey={setCheckedFilterKey}
                    // handleClear={handleClear}
                    setFilterKey={setFilterKey}
                    // handleFilter={handleFilter}
                    // handleClearAll={handleClearAll}
                    // foodOrRestaurant={foodOrRestaurant}
                />
            </Popover>
        </RTL>
    )
}

export default RestaurantCategoryBar
