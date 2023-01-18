import logo from '../../assets/Expense-Tracker.png'
import {
    Paper,
    Stack,
    Typography,
} from '@mui/material'
import { allStyles, primary_color } from '../../allStyles'



export const Box_Container = ({ children, page_title, box_size }) => {
    return (
        <Stack
            justifyContent='center'
            alignItems='center'
            direction='column'
            sx={allStyles.loginPage}
        >
            <Paper  elevation={2} >
                <Stack
                py={4}
                    sx={box_size}
                    alignItems='center'
                    justifyContent='center'
                >
                    <Stack
                        alignItems='center'
                        spacing={3}
                        direction='column'
                        sx={{
                            '& > :not(style)': { width: '45ch' },
                            px: 4
                        }}
                    >
                        <Stack alignItems='center'>
                            <img width='150px' src={logo} />
                        </Stack>

                        <Stack  spacing={4}>
                            <Stack >
                                <Typography align='center' variant='h4' textTransform='none' fontWeight='bold' sx={{ color: primary_color, fontSize: '2rem' }} >{page_title}</Typography>
                                {/* <SvgIcon style={{ fontSize: '20px' }}>
                                <ImMinus color={primary_color} />
                            </SvgIcon> */}
                            </Stack>



                            {/* <Stack spacing={1} mb={2}>
                            <Typography fontWeight='bold' color={primary_color} variant='h4'>{page_title}</Typography>
                        </Stack> */}

                            {children}
                        </Stack>

                    </Stack>
                </Stack>
            </Paper>

        </Stack>
    )
}

