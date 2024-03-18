import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  trips: [],
  stops: [],
  stopTimes: [],
  loading: true,
  routes: {}
}

const routeChartSlice = createSlice({
  name: 'routeChart',
  initialState,
  reducers: {
    setTrips: (state, action) => {
      state.trips = action.payload.trips
    },

    setStops: (state, action) => {
      state.stops = action.payload.stops
    },

    setStopTimes: (state, action) => {
      state.stopTimes = action.payload.stopTimes
    },

    setLoadingStatus: (state, action) => {
      state.loading = action.payload.loading
    },

    setRoutes: (state, action) => {
      state.routes = action.payload.routes
    }

  }
})

export const { setTrips, setStops, setStopTimes, setLoadingStatus, setRoutes } = routeChartSlice.actions

export default routeChartSlice.reducer;