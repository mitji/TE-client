import axios from 'axios';

class Exercises {
  constructor() {
    this.exercises = axios.create({
      baseURL: 'http://localhost:5000/exercises',
      withCredentials: true,
    });
  }

  getOne(id) {
    return this.exercises
              .get(`/${id}`)
              .then(({ data }) => data);
  }

  create(exercise) {
    const {title, description, duration, sport, type, video_url, img_url, share} = exercise;
    return this.exercises
              .post('/new', {title, description, duration, sport, type, video_url, img_url, share})
              .then(({ data }) => data);
  }

  modifyOne(modifiedExercise) {
    const {title, description, duration, sport, type, video_url, img_url, share} = modifiedExercise;
    return this.exercises
              .put(`/${modifiedExercise._id}`, {title, description, duration, sport, type, video_url, img_url, share})
              .then(({ data }) => data);
  }

  deleteOne(id) {
    return this.exercises
              .delete(`/${id}`)
              .then(({ data }) => data);
  }
}

// exercisessService.getAll()
//   .then( (response) => response.data )
//   .catch( (err) => console.log(err));

// exercisessService.getOneById( idString )
//   .then( ( { data } ) => data)
//   .catch( (err) => console.log(err));

const exercisesService = new Exercises();

export default exercisesService;