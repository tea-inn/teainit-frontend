// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** addRole POST /api/role/add */
export async function addRoleUsingPost(body: API.RoleAddRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponseLong_>('/api/role/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteRole POST /api/role/delete */
export async function deleteRoleUsingPost(body: API.IdRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponseBoolean_>('/api/role/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getRolePerms GET /api/role/get/perms */
export async function getRolePermsUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getRolePermsUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseListLong_>('/api/role/get/perms', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** getRolePermsToEcho GET /api/role/get/perms/echo */
export async function getRolePermsToEchoUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getRolePermsToEchoUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseListLong_>('/api/role/get/perms/echo', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** listRole GET /api/role/list */
export async function listRoleUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listRoleUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseListRole_>('/api/role/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** pageRole GET /api/role/page */
export async function pageRoleUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.pageRoleUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageRole_>('/api/role/page', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** listRoleSelect GET /api/role/select/list */
export async function listRoleSelectUsingGet(options?: { [key: string]: any }) {
  return request<API.BaseResponseListRoleSelectVO_>('/api/role/select/list', {
    method: 'GET',
    ...(options || {}),
  });
}

/** updateRole POST /api/role/update */
export async function updateRoleUsingPost(
  body: API.RoleUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/role/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
