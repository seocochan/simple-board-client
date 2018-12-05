import axios from 'axios';
import request from 'utils/api';

export const getSignedUrl = (key?: string) => {
  return request({
    url: key ? `/upload/signedUrl?key=${key}` : '/upload/signedUrl',
    method: 'get'
  });
};

export const uploadFile = (url: string, file: Blob) => {
  return axios.put(url, file, {
    headers: {
      'Content-Type': file.type
    }
  });
};
