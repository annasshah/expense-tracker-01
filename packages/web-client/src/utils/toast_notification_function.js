import { toast } from 'react-toastify'

export const displaySuccessToast = message => {
 return toast.success(message, {
    position: 'top-center',
    autoClose: 2000,
    theme:"light",
    hideProgressBar: true,
    closeOnClick: true,
    draggable: true
  })
}
