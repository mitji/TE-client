import axios from 'axios'

class Comments {
  constructor() {
    this.comments = axios.create({
      baseURL: process.env.REACT_APP_API_URL + '/comments',
      withCredentials: true,
    })
  }

  // get all comments from one exercise id
  getAll(exerciseId) {
    return this.comments
              .get(`/${exerciseId}`)
              .then(({ data }) => data);
  }

  // post a comment to an exercise id
  create(exerciseId, exercise) {
    const { text } = exercise;
    return this.comments
              .post(`${exerciseId}`, { text })
              .then(({data}) => data);
  }

  // delete comment from exercise id
  deleteOne(exerciseId, commentId) {
    return this.comments
              .delete(`/${exerciseId}/${commentId}`)
              .then(({ data }) => data);
  }

  // edit-update comment

}

const commentsService = new Comments();

export default commentsService;