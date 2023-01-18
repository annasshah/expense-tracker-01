import { Paper, Stack } from '@mui/material'
import React from 'react'

export const Paper_Container = ({px,py, children }) => {
    return (
        <Stack>
            <Paper
                elevation={0}
                sx={{ borderRadius: 2, boxShadow: "0px 1px 5px 0.3px rgba(0,0,0,0.1)" }}
                

            >

                <Stack px={px ? px : 3} py={py ? py :3}>
                    {children}
                </Stack>




            </Paper>

        </Stack>
    )
}
