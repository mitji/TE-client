import axios from 'axios';

class Profile {
  constructor() {
    this.profile = axios.create({
      baseURL: process.env.REACT_APP_API_URL + '/profile',
      withCredentials: true,
    });
  }

  getUser() {
    return this.profile
          .get('/')
          .then(({ data }) => data);
  }

  unsaveExercise(id) {
    return this.profile
          .put(`/${id}`)
          .then(({ data }) => data);
  }
}

const ProfileService = new Profile();

export default ProfileService;
  