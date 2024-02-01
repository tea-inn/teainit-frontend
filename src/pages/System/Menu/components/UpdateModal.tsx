import { listMenuTreeBySelectUsingGet } from '@/services/teainit-backend/menuController';
import {
  ModalForm,
  ProFormDigit,
  ProFormInstance,
  ProFormRadio,
  ProFormText,
  ProFormTreeSelect,
} from '@ant-design/pro-components';
import React, { useEffect, useRef, useState } from 'react';

export type Props = {
  open: boolean;
  onCancel: () => void;
  onSubmit: (values: API.MenuUpdateRequest) => void;
  initialValues: API.MenuUpdateRequest;
};

const UpdateModal: React.FC<Props> = (props) => {
  const { open, onCancel, onSubmit, initialValues } = props;
  const formRef = useRef<ProFormInstance<API.MenuUpdateRequest>>();
  const [menuTree] = useState<any>();
  const [typeValue, setTypeValue] = useState<number>();

  useEffect(() => {
    setTypeValue(initialValues.type);
  }, [initialValues.type]);

  return (
    <ModalForm<API.MenuUpdateRequest>
      title="修改用户"
      width={500}
      open={open}
      formRef={formRef}
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
    >
      <ProFormTreeSelect
        name="parentId"
        label="上级菜单"
        placeholder="请选择上级菜单"
        request={async () => {
          const { data: menuTreeList } = await listMenuTreeBySelectUsingGet();
          return menuTreeList || [];
        }}
        fieldProps={{
          fieldNames: {
            label: 'menuName',
            value: 'id',
            children: 'children',
          },
          treeData: menuTree,
          placeholder: '请选择上级菜单',
        }}
      />
      <ProFormRadio.Group
        name="type"
        label="类型"
        required
        fieldProps={{
          onChange: (value) => {
            setTypeValue(value.target.value);
          },
        }}
        options={[
          {
            label: '目录',
            value: 0,
          },
          {
            label: '菜单',
            value: 1,
          },
          {
            label: '按钮',
            value: 2,
          },
        ]}
      />
      <ProFormText
        name="menuName"
        required
        label="菜单名称"
        placeholder="请输入菜单名称"
        rules={[
          {
            required: true,
            message: '此项为必填项',
          },
          {
            max: 20,
            message: '菜单过长',
          },
        ]}
      />
      {typeValue != 0 && (
        <ProFormText
          name="perms"
          required
          label="菜单权限"
          placeholder="请输入菜单权限"
          rules={[
            {
              required: true,
              message: '此项为必填项',
            },
            {
              max: 30,
              message: '菜单权限过长',
            },
          ]}
        />
      )}
      <ProFormDigit label="显示排序" name="sortNum" width="md" required min={1} max={30} />
    </ModalForm>
  );
};

export default UpdateModal;
