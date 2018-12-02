import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunkMiddleware, { ThunkAction } from 'redux-thunk';
import { StateType } from 'typesafe-actions';

import authReducer, { AuthAction } from './modules/auth';
import postReducer, { PostAction } from './modules/post';
import postsReducer, { PostsAction } from './modules/posts';

const rootReducer = combineReducers({
  auth: authReducer,
  post: postReducer,
  posts: postsReducer
});
const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export type RootState = StateType<typeof rootReducer>;
export type RootAction = AuthAction | PostAction | PostsAction;
export type ThunkResult<R> = ThunkAction<R, any, undefined, any>;

export default store;
