// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** exception GET /api/filter/throw */
export async function exceptionUsingGet(options?: { [key: string]: any }) {
  return request<API.BaseResponseVoid_>('/api/filter/throw', {
    method: 'GET',
    ...(options || {}),
  });
}
