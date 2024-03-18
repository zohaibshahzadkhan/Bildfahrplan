import { configureStore } from '@reduxjs/toolkit'
import routeChartReducer from './routeChartSlice'

const store = configureStore({
  reducer: routeChartReducer
})

export default store