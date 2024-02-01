// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** addDemo POST /api/demo/add */
export async function addDemoUsingPost(body: API.DemoAddRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponseLong_>('/api/demo/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteDemo POST /api/demo/delete */
export async function deleteDemoUsingPost(body: API.IdRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponseBoolean_>('/api/demo/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getDemoById GET /api/demo/get */
export async function getDemoByIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getDemoByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseDemo_>('/api/demo/get', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** listDemo GET /api/demo/list */
export async function listDemoUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listDemoUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseListDemo_>('/api/demo/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** pageDemo GET /api/demo/page */
export async function pageDemoUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.pageDemoUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageDemo_>('/api/demo/page', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** updateDemo POST /api/demo/update */
export async function updateDemoUsingPost(
  body: API.DemoUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/demo/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
