import { listMenuTreeUsingGet } from '@/services/teainit-backend/menuController';
import { ModalForm, ProForm, ProFormInstance, ProFormText } from '@ant-design/pro-components';
import { Tree } from 'antd';
import React, { useEffect, useRef, useState } from 'react';

export type Props = {
  open: boolean;
  onCancel: () => void;
  onSubmit: (values: API.RoleUpdateRequest) => void;
  initialValues: API.RoleUpdateRequest;
};

const UpdateModal: React.FC<Props> = (props) => {
  const { open, onCancel, onSubmit, initialValues } = props;
  const [menuTree, setMenuTree] = useState<any>();
  const [echoMenuIdList, setEchoMenuIdList] = useState<string[]>();
  const [menuIdList, setMenuIdList] = useState<string[]>();
  const formRef = useRef<ProFormInstance<API.RoleUpdateRequest>>();

  useEffect(() => {
    console.log('role initialValues', initialValues);
    setEchoMenuIdList(initialValues.menuIdList);
  }, [initialValues]);

  return (
    <ModalForm<API.RoleUpdateRequest>
      title="修改角色"
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
        console.log('onFinish', values);
        let params: API.RoleUpdateRequest = { ...values, menuIdList: menuIdList || [] };
        onSubmit(params);
        return true;
      }}
      formRef={formRef}
      request={async () => {
        const { data } = await listMenuTreeUsingGet({});
        setMenuTree(data);
        return {} as API.RoleUpdateRequest;
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
      <ProForm.Item label="菜单权限" name="menuIdList">
        <Tree
          checkable={true}
          multiple={true}
          treeData={menuTree}
          checkedKeys={echoMenuIdList}
          onCheck={(checkedKeys: any, e) => {
            const halfCheckedKeys = e.halfCheckedKeys || [];
            const checkedKeysResult = [...checkedKeys, ...halfCheckedKeys];
            // 修改所需要的数据，包含父节点，请求数据
            setMenuIdList(checkedKeysResult);
            // 回显数据，不包含父节点，正常显示
            setEchoMenuIdList(checkedKeys);
          }}
          fieldNames={{
            title: 'menuName',
            key: 'id',
            children: 'children',
          }}
        />
      </ProForm.Item>
    </ModalForm>
  );
};

export default UpdateModal;
