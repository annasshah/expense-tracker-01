import { Grid, Stack, Typography } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux'
import { text_color } from '../allStyles'
import { TfiReload } from 'react-icons/tfi';
import { Icon_Button } from '../components/common.js/Icon_Button'
import { Paper_Container } from '../components/common.js/Paper_Container'
import { Graph_Preview } from '../components/graph_component/Graph_Preview'
import { Render_Asset_Cards } from '../components/Render_Asset_Cards'
import { Transaction_list } from '../components/transactions/Transaction_list'
import { get_user_transaction_async } from '../services/transaction_service'

export const Home = () => {

  return (
    <>
      <Render_Asset_Cards />

      <Stack my={3}>
        <Grid container spacing={3}>

          {/* Graphical View */}
          <Grid item xs={12} sm={12} md={7} lg={8} xl={8} >

            <Paper_Container >

              <Stack sx={{ height: 400, width:'100%' }}>
                <Stack mb={3}>
                <Typography color={text_color} fontWeight='bold'> Overview</Typography>
                </Stack>
                <Graph_Preview />
              </Stack>




            </Paper_Container>

          </Grid>

          {/* Transactions */}
          <Grid item xs={12} sm={12} md={5} lg={4} xl={4} >

            <Paper_Container px={'0'} py={'0'}  >
              <Stack my={3} sx={{ height: 400 }}>
                <Transaction_list />
              </Stack>

            </Paper_Container>

          </Grid>

        </Grid>
      </Stack>
    </>
  )
}
