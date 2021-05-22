export const getCountries = async () => {
  return fetch('https://restcountries.eu/rest/v2/all')
    .then(response => response.json())
    .then(json => {
      return json;
    })
    .catch(error => {
      console.error(error);
    });
};
export const trackAPI = async (country, dateFrom, dateTo) => {
  return fetch(
    'https://api.covid19tracking.narrativa.com/api/country/' +
      country +
      '?date_from=' +
      dateFrom +
      '&date_to=' +
      dateTo,
  )
    .then(response => response.json())
    .then(json => {
      return json;
    })
    .catch(error => {
      console.error(error);
    });
};
export const getNews = async countryCode => {
  return fetch(
    'https://newsapi.org/v2/top-headlines?country=' +
      countryCode +
      '&category=health&apiKey=e28180c6aad6470aa8892f0fd3477a0d',
  )
    .then(response => response.json())
    .then(json => {
      return json;
    })
    .catch(error => {
      console.error(error);
    });
};
