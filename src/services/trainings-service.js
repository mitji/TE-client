import axios from 'axios';

class Training {
  constructor() {
    this.training = axios.create({
      baseURL: process.env.REACT_APP_API_URL + '/trainings',
      withCredentials: true,
    });
  }

  getAll() {
    return this.training
          .get('/')
          .then(({ data }) => data);
  }

  create(newTraining) {
    const { title, description, duration, sport, type, exercises } = newTraining; 
    return this.training
          .post('/new', { title, description, duration, sport, type, exercises })
          .then(({ data }) => data);
  }

  getOne(id) {
    return this.training
          .get(`/${id}`)
          .then(({ data }) => data);
  }

  deleteOne(id) {
    return this.training
      .delete(`/${id}`)
      .then(({ data }) => data)
  }

  deleteExercise(trainingId, exerciseId) {
    return this.training
      .put(`/${trainingId}/${exerciseId}/delete`)
      .then(({ data }) => data)
  }

  modifyOne(modifiedTraining, id) {
    const { title, description, duration, sport } = modifiedTraining;
    return this.training    
          .put(`/${id}`, { title, description, duration, sport })
          .then(({ data }) => data);
  }

  addExercise(trainingId, exerciseId) {
    return this.training
          .post(`/${trainingId}/${exerciseId}`)
          .then((data) => data);
  }
  
}

const TrainingService = new Training();

export default TrainingService;