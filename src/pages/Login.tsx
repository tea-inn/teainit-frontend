import Footer from '@/components/Footer';
import { userLoginUsingPost } from '@/services/teainit-backend/userController';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginForm, ProFormText } from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { Helmet, history, useModel } from '@umijs/max';
import { App, message, Tabs } from 'antd';
import React, { useState } from 'react';
import { flushSync } from 'react-dom';
import { Link } from 'umi';
import Settings from '../../config/defaultSettings';

const Login: React.FC = () => {
  const [type, setType] = useState<string>('account');
  const { setInitialState } = useModel('@@initialState');
  const containerClassName = useEmotionCss(() => {
    return {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'auto',
      backgroundImage:
        "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
      backgroundSize: '100% 100%',
    };
  });
  const handleSubmit = async (values: API.UserLoginRequest) => {
    // 登录
    try {
      const { data } = await userLoginUsingPost({ ...values });

    if (data?.tokenInfo != null) {
      localStorage.setItem('tokenInfo', JSON.stringify(data.tokenInfo));
    }

    flushSync(() => {
      setInitialState((s) => ({
        ...s,
        currentUser: data,
      }));
    });
    message.success('登录成功');
    history.push('/');
    } catch (err: any) {
      console.log("login err",err)
      message.error('登录失败，' + err.info.errMsg)
    }
  };

  return (
    <App>
      <div className={containerClassName}>
        <Helmet>
          <title>
            {'登录'}- {Settings.title}
          </title>
        </Helmet>
        <div
          style={{
            flex: '1',
            padding: '32px 0',
          }}
        >
          <LoginForm
            contentStyle={{
              minWidth: 280,
              maxWidth: '75vw',
            }}
            logo={<img alt="logo" src="/teainit-icon.png" />}
            title="茶初后台管理"
            subTitle={'基于 RBAC 模型的初始化模板'}
            onFinish={async (values) => {
              await handleSubmit(values as API.UserLoginRequest);
            }}
          >
            <Tabs
              activeKey={type}
              onChange={setType}
              centered
              items={[
                {
                  key: 'account',
                  label: '账户密码登录',
                },
              ]}
            />

            {type === 'account' && (
              <>
                <ProFormText
                  name="userAccount"
                  fieldProps={{
                    size: 'large',
                    prefix: <UserOutlined />,
                  }}
                  placeholder={'请输入用户名'}
                  initialValue={process.env.NODE_ENV == 'development' ? 'admin_teainn' : ''}
                  rules={[
                    {
                      required: true,
                      message: '用户名是必填项！',
                    },
                  ]}
                />
                <ProFormText.Password
                  name="userPassword"
                  fieldProps={{
                    size: 'large',
                    prefix: <LockOutlined />,
                  }}
                  placeholder={'请输入密码'}
                  initialValue={process.env.NODE_ENV == 'development' ? '12345678' : ''}
                  rules={[
                    {
                      required: true,
                      message: '密码是必填项！',
                    },
                  ]}
                />
              </>
            )}

            <div
              style={{
                marginBottom: 24,
              }}
            >
              <Link to="/user/register">注册</Link>
            </div>
          </LoginForm>
        </div>
        <Footer />
      </div>
    </App>
  );
};
export default Login;
