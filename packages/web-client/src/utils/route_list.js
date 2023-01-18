import { Asset_Records } from "../pages/Asset_Records";
import { Finance } from "../pages/Finance";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { Signup } from "../pages/Signup";

export const route_list = [
    {
        caption: 'Login',
        linkTo: '/login',
        Page_Component: <Login />,
        private_route: false,
        menu_item:false

    },
    {
        caption: 'Signup',
        linkTo: '/signup',
        Page_Component: <Signup />,
        private_route: false,
        menu_item:false

    },
    {
        caption: 'Record Assets',
        linkTo: '/asset-record',
        Page_Component: <Asset_Records />,
        private_route: true,
        asset_records_route: true,
        menu_item:false

    },
    {
        caption: 'Home',
        linkTo: '/',
        Page_Component: <Home />,
        private_route: true,
        menu_item:true

    },
    // {
    //     caption: 'Finance',
    //     linkTo: '/finance',
    //     Page_Component: <Finance />,
    //     private_route: true,
    //     menu_item:true

    // },
]