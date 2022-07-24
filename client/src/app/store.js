import { configureStore } from '@reduxjs/toolkit'
import usersReducer from '../features/users/usersSlice'
import detailReducer from '../features/detail/detailSlice'
import modalReducer from '../features/modal/modalSlice'

const store = configureStore({
    reducer: {
        users: usersReducer,
        details: detailReducer,
        modal: modalReducer,
    }
})

export default store