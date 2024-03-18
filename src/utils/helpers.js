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