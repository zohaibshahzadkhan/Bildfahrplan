import routeChartReducer, { setTrips, setStops, setStopTimes, setLoadingStatus } from '../../store/routeChartSlice.js';

describe('routeChartSlice reducers', () => {
  const initialState = {
    trips: [],
    stops: [],
    stopTimes: [],
    loading: true,
    routes: {}
  };

  test('setTrips reducer updates trips correctly', () => {
    const prevState = { ...initialState };
    const trips = [
      {
        route_id: '1',
        service_id: '000001',
        trip_id: '1',
        trip_headsign: 'Backnang',
        trip_short_name: '',
        direction_id: '',
        block_id: '1',
        shape_id: '',
        trip_type: '1'
      },
      {
        route_id: '1',
        service_id: '000002',
        trip_id: '2',
        trip_headsign: 'Backnang',
        trip_short_name: '',
        direction_id: '',
        block_id: '1',
        shape_id: '',
        trip_type: '1'
      }];
    const action = setTrips({ trips });
    const newState = routeChartReducer(prevState, action);
    expect(newState.trips).toEqual(trips);
  });

  test('setStops reducer updates stops correctly', () => {
    const prevState = { ...initialState };
    const stops =
      [
        {
          stop_id: 'S8000016',
          stop_code: '',
          stop_name: 'Backnang',
          stop_desc: '',
          stop_lat: '48.942676',
          stop_lon: '9.425989',
          zone_id: '',
          stop_url: '',
          location_type: '1',
          parent_station: '',
          platform_code: ''
        },
        {
          stop_id: '8000016_5       ',
          stop_code: '',
          stop_name: 'Backnang',
          stop_desc: '',
          stop_lat: '48.942676',
          stop_lon: '9.425989',
          zone_id: '',
          stop_url: '',
          location_type: '0',
          parent_station: 'S8000016',
          platform_code: '5       '
        }];
    const action = setStops({ stops });
    const newState = routeChartReducer(prevState, action);
    expect(newState.stops).toEqual(stops);
  });

  test('setStopTimes reducer updates stops correctly', () => {
    const prevState = { ...initialState };
    const stopTimes =
      [
        {
          trip_id: '1',
          arrival_time: '05:45:00',
          departure_time: '05:45:00',
          stop_id: '8005776',
          stop_sequence: '1',
          stop_headsign: '',
          pickup_type: '0',
          drop_off_type: '1',
          shape_dist_traveled: ''
        },
        {
          trip_id: '1',
          arrival_time: '05:47:00',
          departure_time: '05:47:00',
          stop_id: '8005779',
          stop_sequence: '2',
          stop_headsign: '',
          pickup_type: '0',
          drop_off_type: '0',
          shape_dist_traveled: ''
        }];
    const action = setStopTimes({ stopTimes });
    const newState = routeChartReducer(prevState, action);
    expect(newState.stopTimes).toEqual(stopTimes);
  });

  test('setLoadingStatus reducer updates stops correctly', () => {
    const prevState = { ...initialState };
    const loading = true
    const action = setLoadingStatus({ loading });
    const newState = routeChartReducer(prevState, action);
    expect(newState.loading).toEqual(loading);
  });

});
