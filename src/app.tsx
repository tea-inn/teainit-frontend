import Footer from '@/components/Footer';
import { Question } from '@/components/RightContent';
import { getCurrentUserAndPermUsingGet } from '@/services/teainit-backend/userController';
import { LinkOutlined } from '@ant-design/icons';
import { ProLayoutProps } from '@ant-design/pro-components';
import type { RunTimeLayoutConfig } from '@umijs/max';
import { history, Link } from '@umijs/max';
import { AvatarDropdown, AvatarName } from './components/RightContent/AvatarDropdown';
import { requestConfig } from './requestConfig';

const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/login';

//
/**
 * 每次页面刷新都会加载（除登录成功跳转不会加载）
 */
export async function getInitialState(): Promise<{
  currentUser?: API.CurrentUserVO;
  settings?: ProLayoutProps & {
    pwa?: boolean;
    logo?: string;
  };
}> {
  const { location } = history;
  // 如果不是登录页面，查看当前用户
  if (location.pathname !== loginPath) {
    const { data: currentUser } = await getCurrentUserAndPermUsingGet();
    return {
      currentUser,
    };
  }
  return {};
}

// @ts-ignore
export const layout: RunTimeLayoutConfig = ({ initialState}) => {
  return {
    logo: 'http://cdn.teainn.top/img/teainit-icon.png',
    actionsRender: () => [<Question key="doc" />],
    avatarProps: {
      src: initialState?.currentUser?.userAvatar,
      title: <AvatarName />,
      render: (_, avatarChildren) => {
        return <AvatarDropdown>{avatarChildren}</AvatarDropdown>;
      },
    },
    waterMarkProps: {
      content: initialState?.currentUser?.userName,
    },
    footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history;
      // 如果没有登录，重定向到 login
      if (!initialState?.currentUser && location.pathname !== loginPath) {
        history.push(loginPath);
      }
    },
    layoutBgImgList: [
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/D2LWSqNny4sAAAAAAAAAAAAAFl94AQBr',
        left: 85,
        bottom: 100,
        height: '303px',
      },
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/C2TWRpJpiC0AAAAAAAAAAAAAFl94AQBr',
        bottom: -68,
        right: -45,
        height: '303px',
      },
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/F6vSTbj8KpYAAAAAAAAAAAAAFl94AQBr',
        bottom: 0,
        left: 0,
        width: '331px',
      },
    ],
    links: isDev
      ? [
          <Link key="openapi" to="/umi/plugin/openapi" target="_blank">
            <LinkOutlined />
            <span>OpenAPI 文档</span>
          </Link>,
        ]
      : [],
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    childrenRender: (children) => {
      // if (initialState?.loading) return <PageLoading />;
      return (
        <>
          {children}
          {/*<SettingDrawer
            disableUrlParams
            enableDarkTheme
            settings={initialState?.settings}
            onSettingChange={(settings) => {
              setInitialState((preInitialState) => ({
                ...preInitialState,
                settings,
              }));
            }}
          />*/}
        </>
      );
    },
    ...initialState?.settings,
  };
};

/**
 * 请求配置
 */
export const request = {
  ...requestConfig,
};
