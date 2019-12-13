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
}

// ProfilesService.getAll()
//   .then( (response) => response.data )
//   .catch( (err) => console.log(err));

// ProfilesService.getOneById( idString )
//   .then( ( { data } ) => data)
//   .catch( (err) => console.log(err));

const ProfileService = new Profile();

export default ProfileService;
  