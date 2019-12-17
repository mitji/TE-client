import axios from 'axios';

class Search {
  constructor() {
    this.search = axios.create({
      baseURL: process.env.REACT_APP_API_URL + '/search',
      withCredentials: true,
    });
  }

  getResults(searchStr) {
    return this.search
          .get(`?search=${searchStr}`)
          .then(({data}) => data);
  }
}

const SearchService = new Search();

export default SearchService;
