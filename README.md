# TE - Training preparation made easy



## Description

TE is a platform for sport coaches to prepare their training sessions easily. It is a cross-sport platform, what means that as a coach you can find exercises of your sport and different sports and adapt it to your needs.



## User Stories

-  **404:** As an anon/user I can see a 404 page if I try to reach a page that does not exist so that I know it's my fault
-  **Signup:** As an anon I can sign up in the platform so that I can start preparing my trainings
-  **Login:** As a user I can login to the platform so that I can see, add, share and find exercises for my trainings
-  **Logout:** As a user I can logout from the platform so no one else can use it
-  **My profile:** As a user I can view all my trainings, my exercises and my saved exercises
-  **My trainings:** As a user I can view all my trainings and the exercises from other users I have saved in my profile.
-  **View trainings:** As a user I can view the details of a training
-  **Edit trainings:** As a user I can edit a training by editing the activities inside
-  **Add trainings:** As a user I can add trainings by adding activities
-  **Add exercises:** As a user I can add activities to my trainings, and make it public so they appear in the discover page. The training has different inputs, including title, duration description, type, video, image and private boolean.
-  **View exercises:** As a user I can view the details of an exercise
-  **Find exercises:** As a user I can find exercises for my trainings
-  **Save exercises:** As a user I can save any exercise I find interesting
-  **Edit profile:** As a user I can edit my profile
-  **Logout:** As a user I can logout and finish my session



## Backlog

User profile:
- Save training as a pdf

- Add *articles page* where the user can read articles of his/her interest

- Visit other users profiles to see all their public exercises

- Add comments to public exercises

- Add text style options to exercise description

- Add admin page to see progress of trainings

  - Admin can see list of all users and number of exercises they have published
  - See how many trainigns are added every day with a chart.

  

  


# Client / Frontend

## Routes (React App)

[not updated]

| Path                      | Component            | Permissions | Behavior                                                     |
| ------------------------- | -------------------- | ----------- | ------------------------------------------------------------ |
| `/`                       | Splash           | public      | Home page                                        |
| `/signup`            | Signup           | anon only   | Signup form, link to login, navigate to MyTrainings after signup |
| `/login`             | Login            | anon only   | Login form, link to signup, navigate to MyTrainings after login |
| `/logout`            | n/a                  | anon only   | Navigate to homepage after logout, expire session |
| `/profile` | Profile | user only | User profile. It shows user info + list of exercises, saved exercises and trainings |
| `/:exerciseId` | ExerciseDetails | user only | View exercise. Add **edit **toggle **button** if the exercise is from current user |
| `/my-trainings` | MyTrainings | user only   | Shows all your trainings and the saved exercises |
| `/my-trainings` | TrainingsList | user only | Shows all your training cards |
| `/my-trainings` | TrainingCard | user only | Training card |
| `/my-trainings` | SavedExercises | user only | Shows all your exercises and the saved exercises |
| `/my-trainings/:trainingID` | TrainingDetails | user only   | Shows training details                                       |
| `/my-trainings/:trainingID/edit` | TrainingEdit | user only   | Edit training details and exercises details |
| `/my-trainings/:trainingID/edit` | ExerciseEdit | user only | Edit exercise details |
| `/my-trainings/new` | TrainingNew        | user only   | Form to create new training           |
| `/discover` | Discover | user only   | List of all categories         |
| `/category` | Type | user only   | List of all the exercises in that category |
| `/search` | Search | user only | Results for the search. The search is made by exercise title |




## Components

[not updated]

- Splash
- Login
- Signup
- NavbarTop
- NavbarLeft 
- MyTrainings
- TrainingList
- TrainingCard
- SavedExercises
- TrainingDetails
- TrainingEdit
- ExerciseEdit
- TrainingNew
- Filter
- Discover
- Category
- ExerciseDetails




## Services

- Auth Service
  - auth.login(user)
  - auth.signup(user)
  - auth.logout()
  - auth.me()
  - auth.getUser() // synchronous
- Training Service
  - training.getAll()
  - training.getOne(id)
  - training.add(id)
  - training.put(id)
  - training.delete(id)
- Exercises
  - exercise.getAllFromUser() --> in profile
  - exercise.getAllFromCategory(category) --> discover
  - exercise.getSaved() --> in profile and in add training
  - exercise.add(id) --> in add training
  - exercise.put(id) --> in add training
  - exercise.delete(id) --> in profile, delete your exercises
  - exercise.deleteFromTraining(trainingId, exerciseId) --> in edit training




# Server / Backend


## Models

User model

```javascript
{
  email: {type: String, required: true, unique: true},
  name: {type: String, required: true},
  lastName: {type: String, required: true}, 
  password: {type: String, required: true},
  image: {type: String},
  sport: {type: String},
  trainings: [{type: Schema.Types.ObjectId, ref:'Training'}],
  exercises: [{type: Schema.Types.ObjectId, ref:'Exercise'}],
  savedExercises: [{type: Schema.Types.ObjectId, ref:'Exercise'}]
}
```



Training model

```javascript
 {
  title: {type: String, required: true},
  description: {type: String},
  duration: {type: String, required: true}, 
  sport: {type: String, required: true},
  exercises: [{type: Schema.Types.ObjectId, ref:'Exercise'}],
  author: {type: Schema.Types.ObjectId, ref:'User'}
 }
```



Exercise model

```javascript
{
  title: {type: String, required: true},
  description: {type: String},
  duration: {type: String, required: true},
  sport: {type: String, required: true},
  type: {type: String, required: true},
  video_url: {type: String},
  img_url: {type: String},
  share: {type: Boolean},
  author: {type: Schema.Types.ObjectId, ref:'User'}
 }
```



Comment model

```javascript
{
  text: {type: String, required: true},
  created_at: {type: Data, required: true},
  author: [{type: Schema.Types.ObjectId, ref:'User', required: true}],
}
```



Article model

```javascript
{
  title: {type: String, required: true},
  text: {type: String, required: true},
  author: {type: Schema.Types.ObjectId, ref: 'User', required: true}
}
```




## API Endpoints (backend routes)

| HTTP Method | URL                         | Request Body                 | Success status | Error Status | Description                                                  |
| ----------- | --------------------------- | :--------------------------- | -------------- | ------------ | ------------------------------------------------------------ |
| GET         | `/auth/me    `          | Saved session                | 200            | 404          | Check if user is logged in and return profile page           |
| POST        | `/signup`                | {email, name, lastName, password, sport, imageUrl} | 201            | 404          | Checks if fields not empty (422) and user not exists (409), then create user with encrypted password, and store user in session |
| POST        | `/login`                 | {email, password}     | 200            | 401          | Checks if fields not empty (422), if user exists (404), and if password matches (404), then stores user in session |
| POST        | `/logout`                |                       | 204            | 400          | Logs out the user                                            |
| GET | `/profile` |  | 200 | 400 | Show user info + exercises + saved exercises |
| GET | `/edit-profile` |  |  |  |  |
| PUT | `/edit-profile` |  |  |  | Edit profile |
| PUT | `/profile/:exerciseId` | {id} | 200 | 400 | Unsave exercise from my trainings page                       |
| GET         | `/my-trainings/:trainingId` | {id}                         | 200 | 404 | Show specific training. Returns training object    |
| GET | `/my-trainings/new` |  |  |  | Route of create new training |
| POST | `/my-trainings/new` |  |  |  | Create new training |
| GET | `/my-trainings/:trainingId/edit` |  |  |  | Training edit page |
| PUT | `/my-trainings/:trainingId/edit` | {title, description, duration, type, exercises} | 201 | 400 | Edit training |
| DELETE | `/my-trainings/:trainingId/edit` | {id} | 200 | 400 | Delete training |
| POST | `/exercises/:exerciseId` | {title, description, duration, type, exercises} |  |  |  |
| GET | `/exercises/:exerciseId` | {title, description, duration, type, exercises} |  |  |  |
| PUT | `/exercises/:exerciseId` | {title, description, duration, type, exercises} | 201 | 400 | Edit exercise |
| POST | `/my-trainings/:trainingId/:exerciseId` |  |  |  | Add exercise to training and to database |
| PUT | `/my-trainings/:trainingId/:exerciseId` |  |  |  | Delete exercise from training but not from |
| GET | `/discover` |  | 201 | 400 | Show all exercises |
| GET | `/:exerciseId` | {id} |  |  | Show exercise data |
| PUT | `exercises/:exerciseId` | {id} | 200 | 400 | Save exercise |
| GET | `/search?result=` |  |  |  |  |



### Git

The url to your repository and to your deployed project


[Server repository Link](https://github.com/mitji/TE-server)

[Deployed App Link](https://te-app.herokuapp.com/)
