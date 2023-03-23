// import { IResponseType } from '@/types/common';
import request from '@/utils/axios';

export const getHello = () => {
  return request<any>({
    url: '/hello',
    method: 'get'
  });
};
export const getHello2 = () => {
  return request<any>({
    url: '/hello2',
    method: 'get'
  });
};
