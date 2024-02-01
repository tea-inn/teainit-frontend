import { listRoleUsingGet } from '@/services/teainit-backend/roleController';
import { ModalForm, ProFormInstance, ProFormText } from '@ant-design/pro-components';
import { ProFormSelect } from '@ant-design/pro-form';
import React, { useEffect, useRef, useState } from 'react';

export type Props = {
  open: boolean;
  onCancel: () => void;
  onSubmit: (values: API.UserAddRequest) => void;
};

const CreateModal: React.FC<Props> = (props) => {
  const { open, onCancel, onSubmit } = props;
  const [roleList, setRoleList] = useState<any>();
  const formRef = useRef<ProFormInstance<API.UserAddRequest>>();

  useEffect(() => {
    listRoleUsingGet({} as API.listRoleUsingGETParams).then((res) => {
      let roleIdLen = res.data?.length || 0;
      let roleListEnum = {};
      let roleList = res.data || [];
      if (roleIdLen > 0) {
        for (let i = 0; i < roleIdLen; i++) {
          // @ts-ignore
          roleListEnum[roleList[i].id] = roleList[i].roleName;
        }
      }
      setRoleList(roleListEnum);
    });
  }, []);

  return (
    <ModalForm<API.UserAddRequest>
      title="添加用户"
      width={500}
      open={open}
      autoFocusFirstInput
      modalProps={{
        destroyOnClose: true,
        onCancel: () => onCancel(),
      }}
      submitTimeout={2000}
      onFinish={async (values) => {
        onSubmit(values);
        return true;
      }}
      formRef={formRef}
      params={{ id: '100' }}
      formKey="base-form-use-demo"
    >
      <ProFormText
        name="userName"
        dependencies={[['contract', 'name']]}
        label="用户名"
        placeholder="用户名为空则系统自动生成"
        rules={[
          {
            max: 12,
            message: '用户名过长',
          },
        ]}
      />
      <ProFormText
        name="userAccount"
        required
        dependencies={[['contract', 'name']]}
        label="账号"
        placeholder="请输入账号"
        rules={[
          {
            required: true,
            message: '此项为必填项',
          },
          {
            min: 5,
            message: '账号过短',
          },
          {
            max: 10,
            message: '账号过长',
          },
        ]}
      />
      <ProFormSelect
        name="roleIdList"
        label="角色"
        valueEnum={roleList}
        fieldProps={{
          mode: 'multiple',
        }}
        placeholder="请选择角色"
        rules={[
          {
            required: true,
            message: '角色不能为空',
            type: 'array',
          },
        ]}
      />
    </ModalForm>
  );
};

export default CreateModal;
