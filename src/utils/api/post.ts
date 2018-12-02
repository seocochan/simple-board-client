import { ICommentRequest, IPostRequest } from 'payloads';
import request from 'utils/api';

export const createPost = (userId: string, data: IPostRequest) => {
  return request({
    url: `/users/${userId}/posts`,
    method: 'post',
    data
  });
};

export const updatePost = (postId: string, data: IPostRequest) => {
  return request({
    url: `/posts/${postId}`,
    method: 'put',
    data
  });
};

export const loadPost = (postId: string) => {
  return request({
    url: `/posts/${postId}`,
    method: 'get'
  });
};

export const deletePost = (postId: string) => {
  return request({
    url: `/posts/${postId}`,
    method: 'delete'
  });
};

export const createRecommend = (postId: string) => {
  return request({
    url: `/posts/${postId}/recommends`,
    method: 'post'
  });
};

export const deleteRecommend = (postId: string) => {
  return request({
    url: `/posts/${postId}/recommends`,
    method: 'delete'
  });
};

export const loadComments = (postId: string) => {
  return request({
    url: `/posts/${postId}/comments`,
    method: 'get'
  });
};

export const createComment = (postId: string, data: ICommentRequest) => {
  return request({
    url: `/posts/${postId}/comments`,
    method: 'post',
    data
  });
};

export const deleteComment = (commentId: string) => {
  return request({
    url: `/comments/${commentId}`,
    method: 'delete'
  });
};
