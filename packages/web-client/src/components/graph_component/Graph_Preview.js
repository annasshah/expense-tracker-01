import { CircularProgress, Stack, Typography } from '@mui/material';
import React from 'react'
import { useSelector } from 'react-redux';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Bar,
  BarChart,
  ResponsiveContainer
} from "recharts";
import { async_status } from '../../utils/contants';
import { color_scheme } from '../../utils/input_list'

const propertise = ['cash', 'saving', 'bank']

export const Graph_Preview = () => {

  const { graph_data, getting_user_transactions_status, user_transaction, getting_user_transactions_error } = useSelector(state => state.user_transaction)




  const data_render = () => {

    const data_array = []
    const render_array = []

    if (graph_data.length) {
      graph_data.forEach((e) => {
        const { data, total } = e
        const { paid_from, date_range } = data

        const foundIndex = data_array.findIndex(x => x.name === date_range)
        if (foundIndex !== -1) {
          data_array[foundIndex][paid_from] = total
        }
        else {
          data_array.push({
            name: date_range, [paid_from]: total
          })
        }
      })
    }

    data_array.forEach((elem) => {
      let obj = { ...elem }

      propertise.forEach((key) => {
        if (!obj.hasOwnProperty(key)) {
          obj[key] = 0
        }
      })
      render_array.push(obj)
    })
    return render_array
  }




  if(getting_user_transactions_status === async_status.IDLE || getting_user_transactions_status === async_status.LOADING ){
    return <Stack height='100%' justifyContent='center' alignItems='center'>
      <CircularProgress />
    </Stack>
  }


  if(getting_user_transactions_status === async_status.ERROR ){
    return <Stack height='100%' justifyContent='center' alignItems='center'>
      <Typography color='red'>{getting_user_transactions_error?.message}</Typography>
    </Stack>
  }



  if(getting_user_transactions_status === async_status.SUCCEEDED){


  return (
    <ResponsiveContainer width='100%' height='85%'>
      <BarChart

        data={data_render()}

      >
        <Tooltip />
        <Legend />
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" fontSize={12} />
        <YAxis />

        <Bar type="monotone" dataKey="cash" minPointSize={0} fill={color_scheme.cash.caption} />
        <Bar type="monotone" dataKey="bank" minPointSize={0} fill={color_scheme.bank.caption} />
        <Bar type="monotone" dataKey="saving" minPointSize={0} fill={color_scheme.saving.caption} />
      </BarChart>
    </ResponsiveContainer>
  );

}
}
