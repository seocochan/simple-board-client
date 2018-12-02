import { AxiosError } from 'axios';
import produce from 'immer';
import { IPagedResponse, IPostSummary } from 'payloads';
import { ThunkResult } from 'store';
import { action as createAction, ActionType } from 'typesafe-actions';
import * as PostsAPI from 'utils/api/posts';

// action types
const LOAD_POSTS_PENDING = 'posts/LOAD_POSTS_PENDING';
const LOAD_POSTS_SUCCESS = 'posts/LOAD_POSTS_SUCCESS';
const LOAD_POSTS_FAILURE = 'posts/LOAD_POSTS_FAILURE';
const SEARCH_POSTS_PENDING = 'posts/SEARCH_POSTS_PENDING';
const SEARCH_POSTS_SUCCESS = 'posts/SEARCH_POSTS_SUCCESS';

// action creators
export const actions = {
  loadPosts: (
    category: string,
    subCategory: string,
    page = 0,
    size = 10
  ): ThunkResult<Promise<void>> => async dispatch => {
    dispatch(actions.loadPostsPending());
    try {
      const res = await PostsAPI.loadPosts(category, subCategory, page, size);
      dispatch(actions.loadPostsSuccess(res.data));
    } catch (error) {
      dispatch(actions.loadPostsFailure(error));
      throw error;
    }
  },
  loadPostsPending: () => createAction(LOAD_POSTS_PENDING),
  loadPostsSuccess: (posts: IPagedResponse<IPostSummary>) =>
    createAction(LOAD_POSTS_SUCCESS, posts),
  loadPostsFailure: (error: AxiosError) =>
    createAction(LOAD_POSTS_FAILURE, error),

  searchPosts: (
    q: string,
    page = 0,
    size = 10
  ): ThunkResult<Promise<void>> => async dispatch => {
    dispatch(actions.searchPostsPending());
    try {
      const res = await PostsAPI.searchPosts(q, page, size);
      dispatch(actions.searchPostsSuccess(res.data));
    } catch (error) {
      throw error;
    }
  },
  searchPostsPending: () => createAction(SEARCH_POSTS_PENDING),
  searchPostsSuccess: (posts: IPagedResponse<IPostSummary>) =>
    createAction(SEARCH_POSTS_SUCCESS, posts)
};
export type PostsAction = ActionType<typeof actions>;

// state
export interface PostsState {
  postsData: IPagedResponse<IPostSummary> | null;
}
const initialState: PostsState = {
  postsData: null
};

// reducer
export default produce<PostsState, PostsAction>((draft, action) => {
  switch (action.type) {
    case LOAD_POSTS_PENDING:
      draft.postsData = null;
      return;
    case LOAD_POSTS_SUCCESS:
      draft.postsData = action.payload;
      return;
    case LOAD_POSTS_FAILURE:
      console.log(action.payload);
      return;
    case SEARCH_POSTS_PENDING:
      draft.postsData = null;
      return;
    case SEARCH_POSTS_SUCCESS:
      draft.postsData = action.payload;
      return;
  }
}, initialState);
