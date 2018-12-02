import request from 'utils/api';

export const loadPosts = (
  category: string,
  subCategory: string,
  page: number,
  size: number
) => {
  return request({
    url: `/posts?category=${category}&subCategory=${subCategory}&page=${page}&size=${size}`,
    method: 'get'
  });
};

export const searchPosts = (q: string, page: number, size: number) => {
  return request({
    url: `/posts/search?q=${q}&page=${page}&size=${size}`,
    method: 'get'
  });
};
