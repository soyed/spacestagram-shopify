import { API_KEY } from './model';

export const getJSON = async (startDate?: string, endDate?: string) => {
  return fetch(
    `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}${
      startDate ? `&start_date=${startDate}` : ''
    }${endDate ? `&end_date=${endDate}` : ''}`
  );
};

export const convertDate = () => {};
