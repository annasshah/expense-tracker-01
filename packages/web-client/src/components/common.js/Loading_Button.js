import { LoadingButton } from '@mui/lab'
import React from 'react'

export const Loading_Button = ({ sx, loading, onClick, variant, color, children, loadingIndicator, type }) => {
    return (
        <LoadingButton
            type={type}
            sx={{ minWidth: '180px', height: 50, textTransform: 'none', wordWrap: 'normal', ...sx }}
            onClick={onClick}
            loading={loading}

            color={color ? color : 'primary'}
            variant={variant ? variant : 'outlined'}
        loadingIndicator={loadingIndicator ? loadingIndicator : null}
        >
            {!loading ? children : ''}
        </LoadingButton>
    )
}


