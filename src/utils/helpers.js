import Papa from 'papaparse';

/**
 * Fetches CSV data from the specified file path.
 * @param {string} filePath - The path to the CSV file.
 * @returns {Promise<Array<Object>>} - A promise that resolves to an array of objects representing CSV data.
 * @throws {Error} - If fetching or parsing the data fails.
 */
export async function fetchData(filePath) {
  try {
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const reader = response.body.getReader();
    const result = await reader.read();
    const decoder = new TextDecoder('utf-8');
    const csv = decoder.decode(result.value);
    const { data } = Papa.parse(csv, { header: true });
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

/**
 * Filters trips by the specified route ID.
 * @param {Array<Object>} trips - An array of trip objects.
 * @param {string} routeId - The route ID to filter by.
 * @returns {Array<Object>} - An array of trip objects filtered by the route ID.
 */
export function filterTripsByRouteId(trips, routeId) {
  return trips.filter(trip => trip.route_id === routeId);
}

/**
 * Filters stop times within the specified time slot.
 * @param {Array<Object>} stopTimes - An array of stop time objects.
 * @param {string} startTime - The start time of the time slot (HH:MM:SS format).
 * @param {string} endTime - The end time of the time slot (HH:MM:SS format).
 * @returns {Array<Object>} - An array of stop time objects filtered by the time slot.
 */
export function filterStopTimesByTimeRange(stopTimes, startTime, endTime) {
  return stopTimes.filter(stopTime => {
    const arrivalTime = stopTime.arrival_time;
    return arrivalTime >= startTime && arrivalTime <= endTime;
  });
}

/**
 * Retrieves relevant stop times along with associated trip information.
 * @param {Array<Object>} stopTimes - An array of stop time objects.
 * @param {Array<Object>} trips - An array of trip objects.
 * @returns {Array<Object>} - An array of objects containing trip and stop time information.
 */
export function getRelevantStopTimes(stopTimes, trips) {
  const tripMap = new Map(trips.map(trip => [trip.trip_id, trip]));
  return stopTimes.map(stopTime => ({
    trip: tripMap.get(stopTime.trip_id),
    stopTime
  }));
}

/**
 * Calculates distances between stops (assuming equidistant stops).
 * @param {Array<Object>} stopTimes - An array of stop time objects.
 * @param {Array<Object>} stops - An array of stop objects.
 * @returns {Array<number>} - An array of distances between consecutive stops.
 */
export function calculateDistances(stopTimes, stops) {
  const distances = [];
  for (let i = 0; i < stopTimes.length - 1; i++) {
    const currentStop = stopTimes[i];
    const nextStop = stopTimes[i + 1];
    const distance = calculateDistanceBetweenStops(currentStop, nextStop, stops);
    distances.push(distance);
  }
  return distances;
}

/**
 * Calculates the distance between two stops (assuming equidistant stops).
 * @param {Object} stop1 - The first stop object.
 * @param {Object} stop2 - The second stop object.
 * @param {Array<Object>} stops - An array of stop objects.
 * @returns {number} - The distance between the two stops.
 */
export function calculateDistanceBetweenStops(stop1, stop2, stops) {
  const stop1Index = stops.findIndex(stop => stop.stop_id === stop1.stopTime.stop_id);
  const stop2Index = stops.findIndex(stop => stop.stop_id === stop2.stopTime.stop_id);
  return Math.abs(stop2Index - stop1Index); // Assuming equidistant stops
}

/**
 * Filters stops by the specified route ID.
 * @param {Array<Object>} tripsData - An array of trip objects.
 * @param {Array<Object>} stopTimesData - An array of stop time objects.
 * @param {string} routeId - The route ID to filter by.
 * @param {Array<Object>} stops - An array of stop objects.
 * @returns {Array<Object>} - An array of stops filtered by the route ID.
 */
export function filterStopsByRouteId(tripsData, stopTimesData, routeId, stops) {
  // Filter trips by route ID
  const relevantTrips = filterTripsByRouteId(tripsData, routeId);
  // Extract stop IDs from relevant trips
  const relevantStopIds = relevantTrips.flatMap(trip =>
    stopTimesData
      .filter(stopTime => stopTime.trip_id === trip.trip_id)
      .map(stopTime => stopTime.stop_id)
  );
  // Filter stops by relevant stop IDs
  const relevantStops = stops.filter(stop => relevantStopIds.includes(stop.stop_id));
  
  return relevantStops;
}
