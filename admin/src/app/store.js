import { configureStore } from '@reduxjs/toolkit'
import updateSeasonReducer from '../features/updateSeason/updateSeasonSlice'


const store = configureStore({
    reducer: {
        updateSeason: updateSeasonReducer
    }
})

export default store