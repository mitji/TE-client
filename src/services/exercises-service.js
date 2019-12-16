import axios from 'axios';

class Exercises {
  constructor() {
    this.exercises = axios.create({
      baseURL: process.env.REACT_APP_API_URL + '/exercises',
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

  modifyOne(modifiedExercise, id) {
    const {title, description, duration, sport, type, video_url, img_url, share} = modifiedExercise;
    return this.exercises
              .put(`/${id}`, {title, description, duration, sport, type, video_url, img_url, share})
              .then(({ data }) => data);
  }

  deleteOne(id) {
    return this.exercises
              .delete(`/${id}`)
              .then(({ data }) => data);
  }
}

const exercisesService = new Exercises();

export default exercisesService;