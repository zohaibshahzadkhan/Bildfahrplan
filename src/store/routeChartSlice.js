import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  trips: [],
  stops: [],
  stopTimes: [],
  stopTimesData: null,
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

    setStopTimesData: (state, action) => {
      state.stopTimesData = action.payload.stopTimesData
    },

    setLoadingStatus: (state, action) => {
      state.loading = action.payload.loading
    },

    setRoutes: (state, action) => {
      state.routes = action.payload.routes
    }

  }
})

export const { setTrips, setStops, setStopTimes, setStopTimesData, setLoadingStatus, setRoutes } = routeChartSlice.actions

export default routeChartSlice.reducer;