import { listMenuTreeUsingGet } from '@/services/teainit-backend/menuController';
import type { ProFormInstance } from '@ant-design/pro-components';
import { ModalForm, ProFormItem, ProFormText } from '@ant-design/pro-components';
import { Tree } from 'antd';
import React, { useRef, useState } from 'react';

export type Props = {
  open: boolean;
  onCancel: () => void;
  onSubmit: (values: API.RoleAddRequest) => void;
};

const CreateModal: React.FC<Props> = (props) => {
  const { open, onCancel, onSubmit } = props;
  const [menuTree, setMenuTree] = useState<any>();
  const [menuIdList, setMenuIdList] = useState<string[]>();
  const formRef = useRef<ProFormInstance<API.RoleAddRequest>>();

  return (
    <ModalForm<API.RoleAddRequest>
      title="添加角色"
      width={500}
      open={open}
      autoFocusFirstInput
      modalProps={{
        destroyOnClose: true,
        onCancel: () => onCancel(),
      }}
      submitTimeout={2000}
      onFinish={async (values) => {
        let params: API.RoleAddRequest = { ...values, menuIdList: menuIdList || []};
        onSubmit(params);
        return true;
      }}
      formRef={formRef}
      formKey="base-form-use-demo"
      request={async () => {
        const { data } = await listMenuTreeUsingGet({});
        setMenuTree(data);
        return {} as API.RoleAddRequest;
      }}
    >
      <ProFormText
        label="角色名称"
        name="roleName"
        required
        dependencies={[['contract', 'name']]}
        placeholder="请输入角色名称"
        rules={[{ required: true, message: '此项为必填项' }]}
      />
      <ProFormItem label="菜单权限">
        <Tree
          checkable={true}
          multiple={true}
          defaultExpandAll={false}
          treeData={menuTree}
          // defaultCheckedKeys={menuCheckedKeys}
          onCheck={(checkedKeys: any, e) => {
            const halfCheckedKeys = e.halfCheckedKeys || [];
            const checkedKeysResult = [...checkedKeys, ...halfCheckedKeys];
            setMenuIdList(checkedKeysResult);
          }}
          fieldNames={{
            title: 'menuName',
            key: 'id',
            children: 'children',
          }}
        />
      </ProFormItem>
    </ModalForm>
  );
};

export default CreateModal;
