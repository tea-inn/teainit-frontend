import { listRoleSelectUsingGet } from '@/services/teainit-backend/roleController';
import { ModalForm, ProFormInstance, ProFormText } from '@ant-design/pro-components';
import { ProFormSelect } from '@ant-design/pro-form';
import React, { useRef } from 'react';

export type Props = {
  open: boolean;
  onCancel: () => void;
  onSubmit: (values: API.UserUpdateRequest) => void;
  initialValues: API.UserUpdateRequest;
};

const UpdateModal: React.FC<Props> = (props) => {
  const { open, onCancel, onSubmit, initialValues } = props;
  const formRef = useRef<ProFormInstance<API.UserUpdateRequest>>();

  // useEffect(() => {
  //   console.log('执行了', values);
  //   listRoleUsingGet().then((res) => {
  //     let roleListEnum = {};
  //     for (let i = 0; i < res.data.length; i++) {
  //       // console.log("data",data[i].roleName)
  //       roleListEnum[res.data[i].id] = res.data[i].roleName;
  //     }
  //     setRoleList(roleListEnum);
  //     console.log('roleList', roleListEnum);
  //   });
  //   if (formRef) {
  //     const initValue = {
  //       ...values,
  //     };
  //     formRef.current?.setFieldsValue(initValue);
  //   }
  // }, [values]);
  return (
    <ModalForm<API.UserUpdateRequest>
      title="修改用户"
      width={500}
      open={open}
      initialValues={initialValues}
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
      // request={() => {
      //   return {};
      // }}
    >
      <ProFormText
        name="userName"
        required
        dependencies={[['contract', 'name']]}
        label="用户名"
        placeholder="请输入用户名"
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
            max: 20,
            message: '账号过长',
          },
        ]}
      />
      <ProFormSelect
        name="roleIdList"
        label="角色"
        request={async () => {
          const { data: roleList } = await listRoleSelectUsingGet();
          const roleSelect = roleList?.map((item) => {
            return {
              label: item.roleName,
              value: item.id,
            };
          });
          return roleSelect || [];
        }}
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

export default UpdateModal;
