import React from 'react';
import {CustomStackFullWidth} from "../../styled-components/CustomStyles.style";
import {alpha, List, MenuItem, Typography} from "@mui/material";
import {t} from "i18next";
import CustomImageContainer from "../CustomImageContainer";
import Router from "next/router";

const MenuBar = ({tabData, onClose, sidedrawer, page}) => {
    const handleClick = (item) => {
        Router.push({
                pathname: '/info',
                query: {page: item?.value}
            },
            undefined, {shallow: true}
        )
        sidedrawer === "true" && onClose()
    }
    return (
        <List>
            {tabData.map((item, index) => {
                if (
                    (global?.customer_wallet_status === 0 && item.id === 4) ||
                    (global?.loyalty_point_status === 0 && item.id === 5) ||
                    (global?.ref_earning_status === 0 && item.id === 6)
                ) {
                    return null
                } else {
                    return (
                        <MenuItem
                            key={index}
                            selected={item.value === page}
                            onClick={() => handleClick(item)}
                            disableGutters="true"
                            sx={{
                                color:(theme)=> item.value===page && theme.palette.primary.main,
                                paddingY: "0px",
                                marginBottom: "5px",
                                borderRadius: "5px",
                                '&:hover': {
                                    backgroundColor: (theme) =>
                                        alpha(theme.palette.primary.main, .2),
                                },
                                "&.Mui-selected": {
                                    backgroundColor: theme=> theme.palette.neutral[200],
                                }
                            }}
                        >
                            <CustomStackFullWidth direction="row" spacing={1.2} padding='10px'>
                                <CustomImageContainer src={item?.img.src} width='20px'/>
                                <Typography fontSize="14px"
                                            fontWeight="500">{t(item.label.replaceAll("-", " "))}</Typography>
                            </CustomStackFullWidth>

                        </MenuItem>
                    )
                }
            })}
        </List>
    );
};

export default MenuBar;
