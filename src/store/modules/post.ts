import { AxiosError } from 'axios';
import produce from 'immer';
import { ICommentRequest, ICommentResponse, IPostRequest, IPostResponse } from 'payloads';
import { ThunkResult } from 'store';
import { action as createAction, ActionType } from 'typesafe-actions';
import * as PostAPI from 'utils/api/post';

// action types
const LOAD_POST_PENDING = 'post/LOAD_POST_PENDING';
const LOAD_POST_SUCCESS = 'post/LOAD_POST_SUCCESS';
const LOAD_POST_FAILURE = 'post/LOAD_POST_FAILURE';
const CREATE_POST_SUCCESS = 'post/CREATE_POST_SUCCESS';
const DELETE_POST_SUCCESS = 'post/DELETE_POST_SUCCESS';
const UPDATE_POST_SUCCESS = 'post/UPDATE_POST_SUCCESS';
const CREATE_RECOMMEND_SUCCESS = 'post/CREATE_RECOMMEND_SUCCESS';
const DELETE_RECOMMEND_SUCCESS = 'post/DELETE_RECOMMEND_SUCCESS';
const LOAD_COMMENTS_PENDING = 'posts/LOAD_COMMENTS_PENDING';
const LOAD_COMMENTS_SUCCESS = 'posts/LOAD_COMMENTS_SUCCESS';
const DELETE_COMMENT_SUCCESS = 'posts/DELETE_COMMENT_SUCCESS';

// action creators
export const actions = {
  loadPost: (postId: string): ThunkResult<Promise<void>> => async dispatch => {
    dispatch(actions.loadPostPending());
    try {
      const res = await PostAPI.loadPost(postId);
      dispatch(actions.loadPostSuccess(res.data));
    } catch (error) {
      dispatch(actions.loadPostFailure(error));
      throw error;
    }
  },
  loadPostPending: () => createAction(LOAD_POST_PENDING),
  loadPostSuccess: (post: IPostResponse) =>
    createAction(LOAD_POST_SUCCESS, post),
  loadPostFailure: (error: AxiosError) =>
    createAction(LOAD_POST_FAILURE, error),

  deletePost: (
    postId: string
  ): ThunkResult<Promise<void>> => async dispatch => {
    try {
      await PostAPI.deletePost(postId);
      dispatch(actions.deletePostSuccess());
    } catch (error) {
      throw error;
    }
  },
  deletePostSuccess: () => createAction(DELETE_POST_SUCCESS),

  createPost: (
    userId: string,
    data: IPostRequest
  ): ThunkResult<Promise<void>> => async dispatch => {
    try {
      const res = await PostAPI.createPost(userId, data);
      dispatch(actions.createPostSuccess(res.data));
    } catch (error) {
      throw error;
    }
  },
  createPostSuccess: (post: IPostResponse) =>
    createAction(CREATE_POST_SUCCESS, post),

  updatePost: (
    postId: string,
    data: IPostRequest
  ): ThunkResult<Promise<void>> => async dispatch => {
    try {
      await PostAPI.updatePost(postId, data);
      dispatch(actions.updatePostSuccess());
    } catch (error) {
      throw error;
    }
  },
  updatePostSuccess: () => createAction(UPDATE_POST_SUCCESS),

  createRecommend: (
    postId: string
  ): ThunkResult<Promise<void>> => async dispatch => {
    try {
      await PostAPI.createRecommend(postId);
      dispatch(actions.createRecommendSuccess());
    } catch (error) {
      throw error;
    }
  },
  createRecommendSuccess: () => createAction(CREATE_RECOMMEND_SUCCESS),

  deleteRecommend: (
    postId: string
  ): ThunkResult<Promise<void>> => async dispatch => {
    try {
      await PostAPI.deleteRecommend(postId);
      dispatch(actions.deleteRecommendSuccess());
    } catch (error) {
      throw error;
    }
  },
  deleteRecommendSuccess: () => createAction(DELETE_RECOMMEND_SUCCESS),

  loadComments: (
    postId: string
  ): ThunkResult<Promise<void>> => async dispatch => {
    dispatch(actions.loadCommentsPending());
    try {
      const res = await PostAPI.loadComments(postId);
      dispatch(actions.loadCommentsSuccess(res.data.content)); // ignore pagination
    } catch (error) {
      throw error;
    }
  },
  loadCommentsPending: () => createAction(LOAD_COMMENTS_PENDING),
  loadCommentsSuccess: (comments: ICommentResponse[]) =>
    createAction(LOAD_COMMENTS_SUCCESS, comments),

  createComment: (
    postId: string,
    data: ICommentRequest
  ): ThunkResult<Promise<void>> => async dispatch => {
    try {
      await PostAPI.createComment(postId, data);
      dispatch(actions.loadComments(postId)); // re-fetch comments
    } catch (error) {
      throw error;
    }
  },

  deleteComment: (
    commentId: string,
    index: number
  ): ThunkResult<Promise<void>> => async dispatch => {
    try {
      await PostAPI.deleteComment(commentId);
      dispatch(actions.deleteCommentSuccess(index)); // ignore pagination
    } catch (error) {
      throw error;
    }
  },
  deleteCommentSuccess: (index: number) =>
    createAction(DELETE_COMMENT_SUCCESS, index)
};
export type PostAction = ActionType<typeof actions>;

// state
export interface PostState {
  postData: IPostResponse | null;
  comments: ICommentResponse[] | null;
}
const initialState: PostState = {
  postData: null,
  comments: null
};

// reducer
export default produce<PostState, PostAction>((draft, action) => {
  switch (action.type) {
    case LOAD_POST_PENDING:
      draft.postData = null;
      return;
    case LOAD_POST_SUCCESS:
      draft.postData = action.payload;
      return;
    case LOAD_POST_FAILURE:
      console.log(action.payload);
      return;
    case DELETE_POST_SUCCESS:
      draft.postData = null;
      return;
    case CREATE_POST_SUCCESS:
      draft.postData = action.payload;
      return;
    case UPDATE_POST_SUCCESS:
      draft.postData = null;
      return;
    case CREATE_RECOMMEND_SUCCESS:
      if (draft.postData == null) {
        return;
      }
      draft.postData.recommends++;
      draft.postData.isRecommended = true;
      return;
    case DELETE_RECOMMEND_SUCCESS:
      if (draft.postData == null) {
        return;
      }
      draft.postData.recommends--;
      draft.postData.isRecommended = false;
      return;
    case LOAD_COMMENTS_PENDING:
      draft.comments = null;
      return;
    case LOAD_COMMENTS_SUCCESS:
      draft.comments = action.payload;
      return;
    case DELETE_COMMENT_SUCCESS:
      // draft.comments =
      //   draft.comments && draft.comments.splice(action.payload, 1);
      if (draft.comments == null) {
        return;
      }
      draft.comments.splice(action.payload, 1);
      return;
  }
}, initialState);
