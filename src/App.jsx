import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchData } from './utils/helpers';
import { setTrips, setStops, setStopTimes, setLoadingStatus, setRoutes } from './store/routeChartSlice'


import './App.css'

function App() {
  const dispatch = useDispatch()

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

  return (
    <>
    </>
  )
}

export default App
