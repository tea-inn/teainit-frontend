// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** addMenu POST /api/menu/add */
export async function addMenuUsingPost(body: API.MenuAddRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponseLong_>('/api/menu/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteMenu POST /api/menu/delete */
export async function deleteMenuUsingPost(body: API.IdRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponseVoid_>('/api/menu/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** listMenu GET /api/menu/list */
export async function listMenuUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listMenuUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseListMenuTreeVO_>('/api/menu/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** listMenuTree GET /api/menu/tree/list */
export async function listMenuTreeUsingGet(options?: { [key: string]: any }) {
  return request<API.BaseResponseListMenuTreeVO_>('/api/menu/tree/list', {
    method: 'GET',
    ...(options || {}),
  });
}

/** listMenuTreeBySelect GET /api/menu/tree/select */
export async function listMenuTreeBySelectUsingGet(options?: { [key: string]: any }) {
  return request<API.BaseResponseListMenuTreeSelectVO_>('/api/menu/tree/select', {
    method: 'GET',
    ...(options || {}),
  });
}

/** updateMenu POST /api/menu/update */
export async function updateMenuUsingPost(
  body: API.MenuUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseVoid_>('/api/menu/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
