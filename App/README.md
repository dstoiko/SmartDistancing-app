# How to make and handle a new api call.
(In this example, we add the "delete user" call)  
  <br/>
  <br/>
## 1) Services
 
 - ### [Define the API call function.](https://github.com/infinitered/apisauce#calling-the-api)
  (Here, we declare the api call and return its reference for later calls)<br/><br/>
  ```App/Services/UserApi.js```
  
 ```javascript
 export default create = () => {
   // API creation and initialization of the based url
   ...
   const deleteUser = () => api.delete('me')  // api.method('derived-url')
 
   return {
       ...
       deleteUser
   }
 }
 ```
## 2) Redux
 
 1. ### [Create action creators.](https://redux-actions.js.org/api/createaction#createactions)<br/>
 (Here, we fill the action map the following way : ```{ type: [actions] }```)
 
 >The more correct name for the function is probably ```createActionCreators()```, but that seems a bit redundant.
 
 ```App/Redux/UserRedux.js```
 
 ```javascript
 const { Types, Creators } = createActions({
   ...
   deleteUser: null,
   deleteUserSuccess: null,
   deleteUserFailure: ['deleteUserError']
 })
 ```
 >```createActions()``` returns an object mapping action types to action creators. The keys of this object are camel-cased from the keys in actionMap; the values are the action creators.
 
 2. ### Initialize the action creators.
 ```javascript
 export const INITIAL_STATE = Immutable({
   ...
   deleteUserSuccess: null,
   deleteUserError: null
 })
 ```
 3. ### Declare reducers.
 ```javascript
 ...
 
 export const deleteUser = state =>
  ({ ...state, deleteUserSuccess: false, deleteUserError: null })

export const deleteUserSuccess = state =>
  ({ ...state, deleteUserSuccess: true, deleteUserError: null })

export const deleteUserFailure = (state, { deleteUserError }) =>
  ({ ...state, deleteUserSuccess: false, deleteUserError })
 ```
 4. ### Create reducers.
 (Here, we link the action map key (camel-case) returned by ```createActions()``` with the previously declared reducer)
 ```javascript
 export const reducer = createReducer(INITIAL_STATE, {
  ...
  [Types.DELETE_USER]: deleteUser,
  [Types.DELETE_USER_SUCCESS]: deleteUserSuccess,
  [Types.DELETE_USER_FAILURE]: deleteUserFailure
})
 ```
## 3) Saga

 1. ### [Create Saga worker.](https://github.com/redux-saga/redux-saga#usage-example)
  (Here, we define the whole process of fetching and treating data)<br/><br/>
   ```App/Sagas/UserSagas.js```
  
 ```javascript
 export function * deleteUser (api) {
    const response = yield call(api.deleteUser)
   if (response.ok) {
     yield put(ActionsRedux[Prefix.device].unpair())
     Actions.initialScreen({ type: 'reset' })
     yield put(ActionsRedux[Prefix.user].deleteUserSuccess())
   } else if (response.status === 401) {
     yield put(ActionsRedux[Prefix.user].raiseBadSession())
   } else {
     yield put(ActionsRedux[Prefix.user].deleteUserFailure(response.problem))
   }
 }
 ```
 2. ### Add the worker to the root.
   (Here, we link the worker to the app, allowing him to watch for actions triggering)<br/><br/>
   ```App/Sagas/index.js```

 ```javascript
 export default function * root () {
   yield [
     ...
     takeLatest(UserTypes.DELETE_USER, deleteUser, userApi)  // takeLatest(actionType, worker, worker parameters)
   ]
 }
 ```
