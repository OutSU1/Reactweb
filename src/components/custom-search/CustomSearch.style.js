import { alpha, InputBase, styled } from '@mui/material'

export const Search = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    borderRadius: '24px',
    background:
        theme.palette.mode === 'dark'
            ? alpha(theme.palette.primary.main, 0.05)
            : alpha(theme.palette.primary.main, 0.1),
    color: theme.palette.neutral[600],
    border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
    width: '100%',
    //margin: 'auto',
    [theme.breakpoints.up('sm')]: {},
}))
export const SearchIconWrapper = styled('div')(
    ({ theme, languageDirection }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        top: 0,
        right: 0,
        left: 'unset',
    })
)

export const StyledInputBase = styled(InputBase)(
    ({ theme, languageDirection, backgroundColor }) => ({
        color: 'inherit',
        width: '100%',
        backgroundColor: backgroundColor ? backgroundColor : '',
        '& .MuiInputBase-input': {
            padding: theme.spacing(1.2, 1, 1.2, 2),
            // vertical padding + font size from searchIcon

            paddingRight:
                languageDirection === 'rtl' &&
                `calc(1em + ${theme.spacing(4)}) `,
            transition: theme.transitions.create('width'),
            width: '100%',
            // [theme.breakpoints.up('md')]: {
            //     width: '20ch',
            // },
        },
    })
)
