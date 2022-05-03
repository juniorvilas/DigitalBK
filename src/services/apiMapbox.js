import axios from 'axios';

const apiMapbox = axios.create({
  baseURL: 'https://api.mapbox.com/geocoding/v5/mapbox.places/'
});

export default apiMapbox;