/**
 * 权限配置
 * 在 routes.ts 中 access 使用
 * */
export default function access(initialState: { currentUser?: API.CurrentUserVO } | undefined) {
  const { currentUser } = initialState ?? {};

  // 校验权限
  const hasPerm = (permString: string) => {
    return currentUser?.permSet?.includes(permString);
  }
  return {
    // 系统管理

    // 用户管理
    canSystemUserView: hasPerm("system:user:view"),
    canSystemUserList: hasPerm("system:user:list"),
    canSystemUserAdd: hasPerm("system:user:add"),
    canSystemUserEdit: hasPerm("system:user:edit"),
    canSystemUserRemove: hasPerm("system:user:remove"),

    // 角色管理
    canSystemRoleView: hasPerm("system:role:view"),
    canSystemRoleList: hasPerm("system:role:list"),
    canSystemRoleAdd: hasPerm("system:role:add"),
    canSystemRoleEdit: hasPerm("system:role:edit"),
    canSystemRoleRemove: hasPerm("system:role:remove"),

    // 菜单管理
    canSystemMenuView: hasPerm("system:menu:view"),
    canSystemMenuList: hasPerm("system:menu:list"),
    canSystemMenuAdd: hasPerm("system:menu:add"),
    canSystemMenuEdit: hasPerm("system:menu:edit"),
    canSystemMenuRemove: hasPerm("system:menu:remove"),

    // 日志管理

    // 操作管理
    canSystemOperView: hasPerm("system:oper:view"),
    canSystemOperList: hasPerm("system:oper:list"),

    // 登录管理
    canSystemLoginView: hasPerm("system:login:view"),
    canSystemLoginList: hasPerm("system:login:list"),
  };
}
