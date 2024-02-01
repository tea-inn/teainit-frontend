// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** getOperLogById GET /api/log/get/oper */
export async function getOperLogByIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getOperLogByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseOperLog_>('/api/log/get/oper', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** pageLoginLog GET /api/log/page/login */
export async function pageLoginLogUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.pageLoginLogUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageLoginLog_>('/api/log/page/login', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** pageOperLog GET /api/log/page/oper */
export async function pageOperLogUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.pageOperLogUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageOperLog_>('/api/log/page/oper', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
