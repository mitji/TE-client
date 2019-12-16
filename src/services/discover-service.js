import axios from 'axios';

class Discover {
  constructor() {
    this.discover = axios.create({
      baseURL: 'http://localhost:5000/discover',
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