import axios from 'axios';

class Training {
  constructor() {
    this.training = axios.create({
      baseURL: 'http://localhost:5000/my-trainings',
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
}

const TrainingService = new Training();

export default TrainingService;