export default [
  {
    path: '/',
    redirect: '/index',
  },
  {
    path: '/login',
    layout: false,
    component: './Login',
  },
  {
    path: '/index',
    name: '首页',
    icon: 'alertOutlined',
    component: './Welcome',
  },
  {
    path: '/system',
    name: '系统管理',
    icon: 'appstore',
    routes: [
      {
        path: '/system/user',
        name: '用户管理',
        access: 'canSystemUserView',
        component: './System/User',
      },
      {
        path: '/system/role',
        name: '角色管理',
        access: 'canSystemRoleView',
        component: './System/Role',
      },
      {
        path: '/system/menu',
        name: '菜单管理',
        access: 'canSystemMenuView',
        component: './System/Menu',
      },
      {
        name: '日志管理',
        path: '/system/log',
        routes: [
          {
            name: '操作日志',
            path: '/system/log/oper',
            access: 'canSystemOperView',
            component: './System/Log/OperLog',
          },
          {
            name: '登录日志',
            path: '/system/log/login',
            access: 'canSystemLoginView',
            component: './System/Log/LoginLog',
          },
        ],
      },
    ],
  },
  { path: '*', layout: false, component: './404' },
];
