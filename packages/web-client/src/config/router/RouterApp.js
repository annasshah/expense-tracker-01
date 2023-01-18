import { Container } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Navbar_Component } from '../../components/Navbar_Component'
import { Error_Page } from '../../pages/Error_Page'
import { route_list } from '../../utils/route_list'
import { Private_Routes, Record_Assets_Routes } from './Private_Routes'
import { Public_Routes } from './Public_Routes'




export const RouterApp = () => {

    const { user_auth } = useSelector(state => state.user_auth)

    return (
        <Container maxWidth={false}>
            <Router>
                {user_auth && <Navbar_Component />}
                <Routes>
                    <Route element={<Public_Routes />}>
                        {route_list.map((elem, ind) => {
                            const { Page_Component, private_route, linkTo } = elem
                            return !private_route && <Route key={ind} element={Page_Component} path={linkTo} />
                        })
                        }
                    </Route>
                    <Route element={<Private_Routes />}>
                        {route_list.map((elem, ind) => {
                            const { Page_Component, private_route, linkTo, asset_records_route } = elem
                            return private_route && !asset_records_route && <Route key={ind} element={Page_Component} path={linkTo} />
                        })
                        }
                    </Route>
                    <Route element={<Record_Assets_Routes />}>
                        {route_list.map((elem, ind) => {
                            const { Page_Component, private_route, linkTo, asset_records_route } = elem
                            return private_route && asset_records_route && <Route key={ind} element={Page_Component} path={linkTo} />
                        })
                        }
                    </Route>
                    <Route path='*' element={<Error_Page />} />
                </Routes>
            </Router>
        </Container>
    )
}
