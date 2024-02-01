import type { RequestConfig } from '@umijs/max';
import { history } from '@umijs/max';
import { message } from 'antd';
import {RequestError} from "@@/plugin-request/request";

// 错误码
enum ErrorEnum {
  NOT_LOGIN_ERROR = 40100,
  NO_AUTH_ERROR = 40300,
  SYSTEM_ERROR = 50000,
}

// 与后端约定的响应数据格式
interface ResponseStructure {
  errCode: number;
  errMsg: string;
  data: any;
}

const loginPath = '/login';
/**
 * @name 错误处理
 * pro 自带的错误处理， 可以在这里做自己的改动
 * @doc https://umijs.org/docs/max/request#配置
 */
export const requestConfig: RequestConfig = {
  withCredentials: true,
  // 错误处理： umi@3 的错误处理方案。
  errorConfig: {
    // 错误抛出
    errorThrower: (res) => {
      const { errCode, errMsg, data } = res as unknown as ResponseStructure;
      const error: any = new Error(errMsg);
      error.name = 'BizError';
      error.info = { errCode, errMsg, data };
      // 抛出自制的错误
      throw error;
    },
    // 错误接收及处理
    errorHandler: (error: any, opts: any) => {
      if (opts?.skipErrorHandler) throw error;
      // 业务异常错误处理
      if (error.name === 'BizError') {
        const errorInfo: ResponseStructure | undefined = error.info;
        if (errorInfo) {
          const { errMsg, errCode } = errorInfo;
          switch (errCode) {
            case ErrorEnum.NOT_LOGIN_ERROR:
              // message.error(errMsg);
              history.push(loginPath);
              break;
            case ErrorEnum.NO_AUTH_ERROR:
              // message.error(errMsg);
              break;
            // 其他处理
            // case ErrorEnum.SYSTEM_ERROR:
            //   message.error(errMsg);
            //   break;
            // default:
              // throw error;
          }
        }
      } else if (error.response) {
        // Axios 的错误
        // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
        message.error(`Response status:${error.response.status}`);
      } else if (error.request) {
        // 请求已经成功发起，但没有收到响应
        // \`error.request\` 在浏览器中是 XMLHttpRequest 的实例，
        // 而在node.js中是 http.ClientRequest 的实例
        message.error('None response! Please retry.');
      } else {
        // 发送请求时出了点问题
        message.error('Request error, please retry.');
      }
    },
  },

  // 请求拦截器
  requestInterceptors: [
    (url, options: any) => {
      let tokenInfo = localStorage.getItem('tokenInfo');
      let token = null;
      if (tokenInfo != null) {
        token = JSON.parse(tokenInfo).tokenValue;
      }
      // 拦截请求配置，进行个性化处理。
      const realUrl = url;
      const authHeader = { Authorization: token };
      return {
        url: realUrl,
        options: { ...options, interceptors: true, headers: authHeader },
      };
      // 拦截请求配置，进行个性化处理。
      // const url = config?.url?.concat('?token = 123');
      // return { ...config, url };
    },
  ],

  // 响应拦截器
  responseInterceptors: [
    (response) => {
      // data 为返回的数据 {data: xx,errCode: xx,errMsg: xx}
      const { data } = response as unknown as ResponseStructure;
      if (data.errCode !== 0) {
        // 不成功抛异常
          requestConfig.errorConfig?.errorThrower?.(data);
      }
      return response;
    },
  ],
};
