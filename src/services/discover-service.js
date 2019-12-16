import axios from 'axios';

class Discover {
  constructor() {
    this.discover = axios.create({
      baseURL: process.env.REACT_APP_API_URL + '/discover',
      withCredentials: true,
    });
  }

  getAll() {
    return this.discover
          .get('/')
          .then(({ data }) => data);
  }

}

const DiscoverService = new Discover();

export default DiscoverService;