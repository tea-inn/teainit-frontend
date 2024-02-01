declare namespace API {
  type BaseResponseBoolean_ = {
    data?: boolean;
    errCode?: number;
    errMsg?: string;
  };

  type BaseResponseCurrentUserVO_ = {
    data?: CurrentUserVO;
    errCode?: number;
    errMsg?: string;
  };

  type BaseResponseDemo_ = {
    data?: Demo;
    errCode?: number;
    errMsg?: string;
  };

  type BaseResponseListDemo_ = {
    data?: Demo[];
    errCode?: number;
    errMsg?: string;
  };

  type BaseResponseListLong_ = {
    data?: string[];
    errCode?: number;
    errMsg?: string;
  };

  type BaseResponseListMenuTreeSelectVO_ = {
    data?: MenuTreeSelectVO[];
    errCode?: number;
    errMsg?: string;
  };

  type BaseResponseListMenuTreeVO_ = {
    data?: MenuTreeVO[];
    errCode?: number;
    errMsg?: string;
  };

  type BaseResponseListRole_ = {
    data?: Role[];
    errCode?: number;
    errMsg?: string;
  };

  type BaseResponseListRoleSelectVO_ = {
    data?: RoleSelectVO[];
    errCode?: number;
    errMsg?: string;
  };

  type BaseResponseListUserVO_ = {
    data?: UserVO[];
    errCode?: number;
    errMsg?: string;
  };

  type BaseResponseLong_ = {
    data?: string;
    errCode?: number;
    errMsg?: string;
  };

  type BaseResponseOperLog_ = {
    data?: OperLog;
    errCode?: number;
    errMsg?: string;
  };

  type BaseResponsePageDemo_ = {
    data?: PageDemo_;
    errCode?: number;
    errMsg?: string;
  };

  type BaseResponsePageLoginLog_ = {
    data?: PageLoginLog_;
    errCode?: number;
    errMsg?: string;
  };

  type BaseResponsePageOperLog_ = {
    data?: PageOperLog_;
    errCode?: number;
    errMsg?: string;
  };

  type BaseResponsePageRole_ = {
    data?: PageRole_;
    errCode?: number;
    errMsg?: string;
  };

  type BaseResponsePageUserVO_ = {
    data?: PageUserVO_;
    errCode?: number;
    errMsg?: string;
  };

  type BaseResponseVoid_ = {
    errCode?: number;
    errMsg?: string;
  };

  type CurrentUserVO = {
    gender?: number;
    id?: string;
    permSet?: string[];
    tokenInfo?: SaTokenInfo;
    userAccount?: string;
    userAvatar?: string;
    userName?: string;
  };

  type Demo = {
    age?: number;
    contact?: string;
    content?: string;
    createTime?: string;
    education?: string;
    gender?: number;
    id?: string;
    isDelete?: number;
    job?: string;
    loveExp?: string;
    photo?: string;
    place?: string;
    reviewMessage?: string;
    reviewStatus?: number;
    thumbNum?: number;
    updateTime?: string;
    viewNum?: number;
  };

  type DemoAddRequest = {
    age?: number;
    contact: string;
    education?: string;
    gender: number;
    job?: string;
    loveExp?: string;
    place?: string;
  };

  type DemoUpdateRequest = {
    age?: number;
    contact: string;
    education?: string;
    gender: number;
    id: string;
    job?: string;
    loveExp?: string;
    place?: string;
  };

  type getDemoByIdUsingGETParams = {
    id: string;
  };

  type getOperLogByIdUsingGETParams = {
    id: string;
  };

  type getRolePermsToEchoUsingGETParams = {
    id: string;
  };

  type getRolePermsUsingGETParams = {
    id: string;
  };

  type IdRequest = {
    id: string;
  };

  type listDemoUsingGETParams = {
    age?: number;
    current?: string;
    endTime?: string;
    gender?: number;
    job?: string;
    pageSize?: string;
    place?: string;
    sortField?: string;
    sortOrder?: string;
    startTime?: string;
  };

  type listMenuUsingGETParams = {
    current?: string;
    endTime?: string;
    menuName?: string;
    pageSize?: string;
    perms?: string;
    sortField?: string;
    sortOrder?: string;
    startTime?: string;
    type?: number;
  };

  type listRoleUsingGETParams = {
    current?: string;
    endTime?: string;
    pageSize?: string;
    roleName?: string;
    sortField?: string;
    sortOrder?: string;
    startTime?: string;
  };

  type listUserUsingGETParams = {
    current?: string;
    endTime?: string;
    gender?: number;
    id?: string;
    pageSize?: string;
    sortField?: string;
    sortOrder?: string;
    startTime?: string;
    userAccount?: string;
    userAvatar?: string;
    userName?: string;
    userRole?: string;
  };

  type LoginLog = {
    browser?: string;
    createTime?: string;
    id?: string;
    ip?: string;
    isDelete?: number;
    loginAccount?: string;
    loginAddress?: string;
    loginInfo?: string;
    loginState?: number;
    operSystem?: string;
    updateTime?: string;
  };

  type MenuAddRequest = {
    menuName?: string;
    parentId?: string;
    perms?: string;
    sortNum: number;
    type: number;
  };

  type MenuTreeSelectVO = {
    children?: MenuTreeSelectVO[];
    id?: string;
    menuName?: string;
    type?: number;
  };

  type MenuTreeVO = {
    children?: MenuTreeVO[];
    createTime?: string;
    id?: string;
    menuName?: string;
    parentId?: string;
    perms?: string;
    sortNum?: number;
    type?: number;
    updateTime?: string;
  };

  type MenuUpdateRequest = {
    id?: string;
    menuName?: string;
    parentId?: string;
    perms?: string;
    sortNum: number;
    type: number;
  };

  type OperLog = {
    createTime?: string;
    errorInfo?: string;
    id?: string;
    ip?: string;
    isDelete?: number;
    operAddress?: string;
    operMethod?: string;
    operModule?: string;
    operState?: number;
    operType?: number;
    operUrl?: string;
    requestParam?: string;
    responseInfo?: string;
    updateTime?: string;
    userAccount?: string;
    userId?: string;
  };

  type OrderItem = {
    asc?: boolean;
    column?: string;
  };

  type PageDemo_ = {
    countId?: string;
    current?: string;
    maxLimit?: string;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: string;
    records?: Demo[];
    searchCount?: boolean;
    size?: string;
    total?: string;
  };

  type pageDemoUsingGETParams = {
    age?: number;
    current?: string;
    endTime?: string;
    gender?: number;
    job?: string;
    pageSize?: string;
    place?: string;
    sortField?: string;
    sortOrder?: string;
    startTime?: string;
  };

  type PageLoginLog_ = {
    countId?: string;
    current?: string;
    maxLimit?: string;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: string;
    records?: LoginLog[];
    searchCount?: boolean;
    size?: string;
    total?: string;
  };

  type pageLoginLogUsingGETParams = {
    current?: string;
    endTime?: string;
    ip?: string;
    loginAccount?: string;
    loginAddress?: string;
    loginState?: number;
    pageSize?: string;
    sortField?: string;
    sortOrder?: string;
    startTime?: string;
  };

  type PageOperLog_ = {
    countId?: string;
    current?: string;
    maxLimit?: string;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: string;
    records?: OperLog[];
    searchCount?: boolean;
    size?: string;
    total?: string;
  };

  type pageOperLogUsingGETParams = {
    current?: string;
    endTime?: string;
    ip?: string;
    operAddress?: string;
    operModule?: string;
    operState?: number;
    operType?: number;
    pageSize?: string;
    sortField?: string;
    sortOrder?: string;
    startTime?: string;
    userAccount?: string;
  };

  type PageRole_ = {
    countId?: string;
    current?: string;
    maxLimit?: string;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: string;
    records?: Role[];
    searchCount?: boolean;
    size?: string;
    total?: string;
  };

  type pageRoleUsingGETParams = {
    current?: string;
    endTime?: string;
    pageSize?: string;
    roleName?: string;
    sortField?: string;
    sortOrder?: string;
    startTime?: string;
  };

  type pageUserUsingGETParams = {
    current?: string;
    endTime?: string;
    gender?: number;
    id?: string;
    pageSize?: string;
    sortField?: string;
    sortOrder?: string;
    startTime?: string;
    userAccount?: string;
    userAvatar?: string;
    userName?: string;
    userRole?: string;
  };

  type PageUserVO_ = {
    countId?: string;
    current?: string;
    maxLimit?: string;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: string;
    records?: UserVO[];
    searchCount?: boolean;
    size?: string;
    total?: string;
  };

  type Role = {
    createTime?: string;
    id?: string;
    isDelete?: number;
    roleName?: string;
    updateTime?: string;
  };

  type RoleAddRequest = {
    menuIdList: string[];
    roleName?: string;
  };

  type RoleSelectVO = {
    id?: string;
    roleName?: string;
  };

  type RoleUpdateRequest = {
    id: string;
    menuIdList?: string[];
    roleName?: string;
  };

  type SaTokenInfo = {
    isLogin?: boolean;
    loginDevice?: string;
    loginId?: Record<string, any>;
    loginType?: string;
    sessionTimeout?: string;
    tag?: string;
    tokenActiveTimeout?: string;
    tokenName?: string;
    tokenSessionTimeout?: string;
    tokenTimeout?: string;
    tokenValue?: string;
  };

  type UserAddRequest = {
    gender?: number;
    roleIdList: string[];
    userAccount?: string;
    userAvatar?: string;
    userName?: string;
    userPassword?: string;
    userRole?: string;
  };

  type UserLoginRequest = {
    userAccount: string;
    userPassword: string;
  };

  type UserRegisterRequest = {
    checkPassword?: string;
    userAccount: string;
    userPassword?: string;
  };

  type UserUpdatePwdRequest = {
    checkPassword?: string;
    newUserPassword?: string;
    oldUserPassword?: string;
    userId?: string;
  };

  type UserUpdateRequest = {
    gender?: number;
    id: string;
    roleIdList: string[];
    userAccount?: string;
    userAvatar?: string;
    userName?: string;
  };

  type UserVO = {
    createTime?: string;
    gender?: number;
    id?: string;
    roleIdList?: string[];
    userAccount?: string;
    userAvatar?: string;
    userName?: string;
  };
}
