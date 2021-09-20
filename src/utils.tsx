import { API_KEY } from './model';

export const getJSON = async (startDate?: string, endDate?: string) => {
  return fetch(
    `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}${`&thumbs=true`}${
      startDate ? `&start_date=${startDate}` : ''
    }${endDate ? `&end_date=${endDate}` : ''}`
  );
};

// Accepted Format for API
export const convertToEarthDate = (date: string): string => {
  const day = new Date(date).getDate();
  const month = new Date(date).getMonth() + 1;
  const year = new Date(date).getFullYear();

  return `${year}-${month}-${day}`;
};

export const parseSelectedDates = (selectedDate: string[]) => {
  return [
    convertToEarthDate(selectedDate[0]),
    convertToEarthDate(selectedDate[1]),
  ];
};

export const setDefaultDate = (stringVersion = false) => {
  const date = new Date();
  const date2 = new Date();
  date2.setDate(date2.getDate() - 7);

  const defaultDate = stringVersion
    ? [...parseSelectedDates([date2.toISOString(), date.toISOString()])]
    : [date2, date];

  return defaultDate;
};
