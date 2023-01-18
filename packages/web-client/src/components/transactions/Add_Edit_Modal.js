import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Chip, Divider, FormControl, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material';
import { primary_color, text_color } from '../../allStyles';
import { Icon_Button } from '../common.js/Icon_Button';
import { IoCloseOutline } from 'react-icons/io5'
import { alert_severity_constants, async_status } from '../../utils/contants';
import { get_categories_async } from '../../services/category_service';
import { useDispatch, useSelector } from 'react-redux';
import { Loading_Button } from '../common.js/Loading_Button';
import { Alert_Message } from '../common.js/Alert_Message';
import { add_user_transaction_async, update_user_transaction_async } from '../../services/transaction_service';

const field_size = 'medium'

const required_fields = ['amount', 'description', 'paid_from', 'category']

const transaction_input_list = [
    {
        type: 'number',
        field: 'input',
        caption: 'Amount',
        name: 'amount',
        id: 'amount'
    },
    {
        type: 'text',
        field: 'input',
        caption: 'Description',
        name: 'description',
        id: 'description'
    },
    {
        field: 'select',
        caption: 'category',
        name: 'category',
        id: 'category',
        options: []

    },
    {
        type: 'text',
        field: 'input',
        caption: 'Other Category',
        name: 'other_category',
        id: 'other_category'
    },
    {
        field: 'select',
        caption: 'Paid from',
        name: 'paid_from',
        id: 'paid_from',
        options: [
            {
                label: 'Cash',
                value: 'cash'
            },
            {
                label: 'Bank',
                value: 'bank'
            },
            {
                label: 'Saving',
                value: 'saving'
            },
        ]
    }

]


const Render_Categories_Select = ({ on_change_handle, defaultValue }) => {
    const { getting_categories_status, categories, getting_categories_error } = useSelector(state => state.category)
    const dispatch = useDispatch()


    console.log({ defaultValue });


    React.useEffect(() => {
        if (getting_categories_status === async_status.IDLE) {
            dispatch(get_categories_async())
        }
    }, [])



    return <FormControl size={field_size}>
        <InputLabel id="category">category</InputLabel>
        <Select
            inputProps={{
                defaultValue: defaultValue ? defaultValue : ''
            }}
            onChange={on_change_handle}
            labelId="category"
            id="category"
            name="category"
            // value={age}
            label="category"
        // onChange={handleChange}
        >{getting_categories_status === async_status.IDLE || getting_categories_status === async_status.LOADING ?
            <MenuItem value='-'>{getting_categories_error?.message}</MenuItem> : getting_categories_status === async_status.ERROR ? <MenuItem value='-'>loading...</MenuItem> : getting_categories_status === async_status.SUCCEEDED ? React.Children.toArray(categories.map((elem) => {
                const { category, default_category, _id } = elem
                return <MenuItem value={_id}><Stack spacing={1} direction='row' alignItems='center' ><Typography>{category}</Typography> {default_category && <Chip variant="outlined" color="success" sx={{ fontSize: 10, height: 18 }} label="Default" size="small" />}</Stack> </MenuItem>
            })) : null
            }
            <MenuItem value='other'>other</MenuItem>
        </Select>
    </FormControl>



}





const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    //   border: '2px solid #000',
    boxShadow: 24,
};




export const Add_Edit_Modal = ({ is_open, close_modal_handle }) => {
    const [open, setOpen] = React.useState(true)


    const dispatch = useDispatch()

    const { post_transaction_status, edit_transaction_status, edit_transaction_state, edit_transaction_data, post_transaction_error, edit_transaction_error } = useSelector(state => state.user_transaction)

    const [form_data, setForm_data] = React.useState({
        other_category: false
    })

    const [other_category, setOther_category] = React.useState(false)

    const [error_message, setError_message] = React.useState('')


    React.useEffect(() => {
        setForm_data({
            other_category: false
        })
        setOther_category(false)

    }, [is_open])
    






    const on_change_handle = (e) => {
        const { name, value } = e.target
        setError_message('')
        if (name === 'category') {
            if (value === 'other') {
                setForm_data({ ...form_data, category: value })
                setOther_category(true)
            }
            else {
                setOther_category(false)
                setForm_data({ ...form_data, other_category: false, category: value })
            }
        }
        else {
            setForm_data({ ...form_data, [name]: value })
        }
    }



    const submit_handle = () => {

        let missing_fields = []


        if (!edit_transaction_state) {
            required_fields.forEach(element => {
                if (!form_data.hasOwnProperty(element) || form_data[element] === '') {
                    const split_element = element.split('_').join(' ')
                    const format_element = `${split_element.substring(0, 1).toUpperCase()}${split_element.substring(1)}`
                    missing_fields.push(format_element)
                }
            })
        }


        if (form_data?.category === 'other' && form_data?.other_category === false || form_data?.category === 'other' && form_data?.other_category === '') {
            missing_fields.push('Other Category')
        }



        if (missing_fields.length) {
            setError_message(`${missing_fields.join(', ')} field${missing_fields.length > 1 ? 's are' : ' is'} missing, please provide all required fields!`)
        }
        else {
            let submit_data = {...form_data}
            if (form_data?.category) {
                submit_data = {...submit_data,
                    category_id: form_data?.category
                }
                delete submit_data.category
            }


            if (!edit_transaction_state) {
                dispatch(add_user_transaction_async(submit_data))
            } else {
                dispatch(update_user_transaction_async({data:submit_data, id:edit_transaction_data?._id}))
            }
        }

    }












    return (
        <div>
            <Modal
                open={is_open}
                // onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Stack>
                        <Stack direction='row' alignItems='center' justifyContent='space-between' bgcolor={primary_color} px={2} py={2}>
                            <Typography color='#fff' fontWeight='500'>
                                {edit_transaction_state ? 'Update' : 'Add'} Transaction
                            </Typography>
                            <Icon_Button onClick={close_modal_handle} icon={<IoCloseOutline color='#fff' />} />
                        </Stack>
                        <Divider />


                        <Stack spacing={2} px={2} py={2}>
                            {React.Children.toArray(transaction_input_list.map((elem) => {
                                const { type, field, caption, name, options, id } = elem
                                return field === 'input' ? <>
                                    {name !== 'other_category' || name === 'other_category' && other_category ?
                                        <TextField
                                            defaultValue={name === 'other_category' ? '' : edit_transaction_data?.[id] ? edit_transaction_data?.[id] : ''}
                                            onChange={(e) => on_change_handle(e)}
                                            size={field_size}
                                            required={true}
                                            type={type}
                                            name={name}
                                            label={caption}
                                            variant='outlined'
                                        /> : null
                                    }
                                </> : field === 'select' ? <>
                                    {name === 'category' ? <Render_Categories_Select defaultValue={edit_transaction_data?.[id] ? edit_transaction_data?.[id] : ''} on_change_handle={on_change_handle} /> :
                                        <FormControl size={field_size} >

                                            <InputLabel id={name}>{caption}</InputLabel>
                                            <Select
                                                inputProps={{
                                                    defaultValue: edit_transaction_data?.[id] ? edit_transaction_data?.[id] : ''
                                                }}
                                                // defaultValue=""
                                                onChange={(e) => on_change_handle(e)}
                                                // labelId={name}
                                                id={name}
                                                name={name}
                                                // value={age}
                                                label={caption}
                                            // onChange={handleChange}
                                            >
                                                {React.Children.toArray(options.map((option) => {
                                                    const { label, value } = option
                                                    return <MenuItem value={value}>{label}</MenuItem>
                                                }))}
                                            </Select>
                                        </FormControl>
                                    }
                                </> : null


                            }))}
                        </Stack>

                        <Divider />

                        <Stack py={1.5} px={2} justifyContent='flex-end' direction='row'>

                            <Loading_Button
                                onClick={submit_handle}
                                loading={post_transaction_status === async_status.LOADING || edit_transaction_status === async_status.LOADING}
                                variant="outlined"
                                color='primary'
                            >{edit_transaction_state ? 'Update' : 'Add'} Transaction</Loading_Button>
                        </Stack>
                    </Stack>
                </Box>
            </Modal>

            <Alert_Message status={post_transaction_status} severity={alert_severity_constants.ERROR} message={post_transaction_error?.message} />

            <Alert_Message status={edit_transaction_status} severity={alert_severity_constants.ERROR} message={edit_transaction_error?.message} />

            {
                error_message && <Alert_Message message={error_message} severity={alert_severity_constants.ERROR} status={async_status.ERROR} />
            }
        </div>
    );
}