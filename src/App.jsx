import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  fetchData, filterStopsByRouteId, calculateDistances,
  filterTripsByRouteId, getRelevantStopTimes, filterStopTimesByTimeRange
} from './utils/helpers';
import { setTrips, setStops, setStopTimes, setLoadingStatus, setRoutes } from './store/routeChartSlice'
import { ROUTE_ID_NAME_MAPPING, START_TIME, END_TIME } from './utils/constants';


import './App.css'

function App() {
  const dispatch = useDispatch()
  const trips = useSelector(state => state.trips)
  const stops = useSelector(state => state.stops)
  const stopTimes = useSelector(state => state.stopTimes)
  const routes = useSelector(state => state.routes)
  const loading = useSelector(state => state.loading)

  useEffect(() => {
    const fetchDataAndProcess = async () => {
      try {
        const trips = await fetchData('./stuttgart_data/trips.txt');
        const stops = await fetchData('./stuttgart_data/stops.txt');
        const stopTimes = await fetchData('./stuttgart_data/stop_times.txt');

        dispatch(setTrips({ trips }))
        dispatch(setStops({ stops }))
        dispatch(setStopTimes({ stopTimes }))
        dispatch(setLoadingStatus({ loading: false }))
      } catch (error) {
        console.error('Error fetching data:', error);
        dispatch(setLoadingStatus({ loading: false }))
      }
    }
    fetchDataAndProcess();
  }, []);

  useEffect(() => {
    if (stopTimes) {
      const routes = {};
      Object.keys(ROUTE_ID_NAME_MAPPING).forEach(routeID => {
        const { stopTimes, distances, stops } = getFilteredData(routeID, START_TIME, END_TIME);
        routes[parseInt(routeID)] = { stopTimes, distances, stops };
      })
      dispatch(setRoutes({ routes }))
    }
  }, [trips, stops, stopTimes]);

  function getFilteredData(routeId, START_TIME, END_TIME) {
    const filteredTrips = filterTripsByRouteId(trips, routeId);
    const filteredStopTimes = filterStopTimesByTimeRange(stopTimes, START_TIME, END_TIME);
    const relevantStopTimes = getRelevantStopTimes(filteredStopTimes, filteredTrips);
    const distances = calculateDistances(relevantStopTimes, stops);
    const routeStopsData = filterStopsByRouteId(trips, stopTimes, routeId, stops);
    return { stopTimes: relevantStopTimes, distances, stops: routeStopsData };
  }

  return (
    <>
    </>
  )
}

export default App
