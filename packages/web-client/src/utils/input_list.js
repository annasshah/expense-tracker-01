import { BsCashCoin } from "react-icons/bs";
import { CiBank } from "react-icons/ci";
import { RiCurrencyLine } from "react-icons/ri";
import { TbCash } from "react-icons/tb";
import { GiCash } from "react-icons/gi";
import { currency_list } from "./currency_list";

export const color_scheme = {
    cash:{
        main_text:'#027eb7',
        caption:'#03a9f4',
        icon_color:'#03a9f4',
        background:'#e5f6fd75'
    },
    bank:{
        main_text:'#2b8b2f',
        caption:'#4caf50',
        icon_color:'#4caf50',
        background:'#edf7ed'
    },
    saving:{
        main_text:'#d37f03',
        caption:'#ff9800',
        icon_color:'#ff9800',
        background:'#fff4e5'
    },
    total_assets:{
        main_text:'#287271',
        caption:'#2a9d8f',
        icon_color:'#2a9d8f',
        background:'#a4f5eb6e'
    }
}




export const assets_icon = {
    cash:<BsCashCoin color={color_scheme.cash.icon_color}/>,
    bank:<CiBank color={color_scheme.bank.icon_color} />,
    saving:<GiCash  color={color_scheme.saving.icon_color} />,
    total_assets:<TbCash  color={color_scheme.total_assets.icon_color} />,
    currency:<RiCurrencyLine color="#4caf50" />
}


export const render_cards_data = {
    cash:{
        caption: 'Cash',
        id: 'cash',
        icon: assets_icon.cash,
        theme: color_scheme.cash
    },
    bank:{
        caption: 'Bank',
        id: 'bank',
        icon: assets_icon.bank,
        theme: color_scheme.bank
    },
    saving:{
        caption: 'Saving',
        id: 'saving',
        icon: assets_icon.saving,
        theme: color_scheme.saving
    },
    total_assets:{
        caption: 'Total Assets',
        id: 'total_assets',
        icon: assets_icon.total_assets,
        theme: color_scheme.total_assets
    },
}


export const asset_record_inputs = [
    {
        id:'cash',
        field_type:'input',
        field_name: 'Cash',
        type:'number',
        place_holder:'Enter current available cash',
        icon:assets_icon.cash,
    },
    {
        id:'bank',
        field_name: 'Bank',
        type:'number',
        field_type:'input',
        icon:assets_icon.bank,
        place_holder:'Enter current available cash in bank',
       
    },
    {
        id:'saving',
        field_name: 'Savings',
        type:'number',
        field_type:'input',
        icon:assets_icon.saving,
        place_holder:'Enter your savings',
       
    },
    {
        id:'currency',
        field_name: 'Currency',
        type:'select',
        field_type:'select',
        icon:assets_icon.currency,
        place_holder:'Select Currency',
        options_list:currency_list
        
    },
]