import { applyMiddleware, combineReducers, compose, configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk';
import { type_constants} from '../utils/contants';
import category_slice from './slices/category_slice';
import user_assets_slice from './slices/user_assets_slice';
import user_auth_slice from './slices/user_auth_slice';
import user_transactions_slice from './slices/user_transactions_slice';


let reducers = combineReducers({
    user_auth: user_auth_slice,
    user_asset: user_assets_slice,
    user_transaction:user_transactions_slice,
    category:category_slice
    
})


const rootReducer = (state, action) => {
    if (action.type === type_constants.TYPE_LOGOUT_USER) {
        state = undefined
    }
    return reducers(state, action)
}



const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = configureStore(
    { reducer: rootReducer },
    composeEnhancers(
        applyMiddleware(thunk)
    )
)


export default store