import axios from 'axios';

class Profile {
  constructor() {
    this.profile = axios.create({
      baseURL: 'http://localhost:5000/profile',
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
  