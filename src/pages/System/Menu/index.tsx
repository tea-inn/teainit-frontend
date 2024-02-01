import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { useRef, useState } from 'react';

import CreateModal from '@/pages/System/Menu/components/CreateModal';
import UpdateModal from '@/pages/System/Menu/components/UpdateModal';
import {
  addMenuUsingPost,
  deleteMenuUsingPost,
  listMenuTreeUsingGet,
  listMenuUsingGet,
  updateMenuUsingPost,
} from '@/services/teainit-backend/menuController';
import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Popconfirm, Tag } from 'antd';
import { Access, useAccess } from 'umi';

export default () => {
  const tableRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.MenuTreeVO>({});
  const [createModalOpen, setCreateModalOpen] = useState<boolean>(false);
  const [updateModalOpen, setUpdateModalOpen] = useState<boolean>(false);
  const access = useAccess();

  /**
   * 新增
   */
  const handleAdd = async (fields: API.MenuAddRequest) => {
    const hide = message.loading('正在添加');
    try {
      await addMenuUsingPost({ ...fields });
      message.success('添加成功');
      setCreateModalOpen(false);
      tableRef.current?.reload();
    } catch (err: any) {
      message.error('添加失败，' + err.info.errMsg);
    }
    hide();
  };

  /**
   * 修改
   */
  const handleUpdate = async (fields: API.MenuUpdateRequest) => {
    const hide = message.loading('正在修改');
    try {
      await updateMenuUsingPost({
        ...fields,
        id: currentRow?.id || '',
      });
      message.success('修改成功');
      setUpdateModalOpen(false);
      tableRef.current?.reload();
    } catch (err: any) {
      let errMsg = err.info.errMsg;
      message.error('修改失败，' + errMsg);
    }
    hide();
  };

  /**
   * 删除
   */
  const handleRemove = async (menuId: string | undefined) => {
    const hide = message.loading('正在删除');
    try {
      await deleteMenuUsingPost({ id: menuId || '' });
      message.success('删除成功');
      tableRef.current?.reload();
    } catch (err: any) {
      message.error('删除失败，' + err.info.errMsg);
    }
    hide();
  };

  // 将菜单树中属性 children 为 [] 的 children 属性去掉
  const removeEmptyChildren = (menuTree: API.MenuTreeVO) => {
    if (menuTree.children && menuTree.children.length === 0) {
      delete menuTree.children; // 移除空的 children 属性
    }

    if (menuTree.children && menuTree.children.length > 0) {
      menuTree.children.forEach((child) => removeEmptyChildren(child)); // 递归处理子对象
    }
  };

  const columns: ProColumns<API.MenuTreeVO>[] = [
    {
      title: '菜单名称',
      dataIndex: 'menuName',
    },
    {
      title: '权限',
      dataIndex: 'perms',
    },
    {
      title: '排序',
      dataIndex: 'sortNum',
      hideInSearch: true,
    },
    {
      title: '类型',
      dataIndex: 'type',
      valueEnum: {
        0: <Tag color="magenta">目录</Tag>,
        1: <Tag color="volcano">菜单</Tag>,
        2: <Tag color="blue">按钮</Tag>,
      },
    },
    {
      title: '创建时间',
      key: 'showTime',
      dataIndex: 'createTime',
      ellipsis: {
        showTitle: true,
      },
      valueType: 'dateTime',
      sorter: true,
      hideInForm: true,
      hideInSearch: true,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      hideInForm: true,
      hideInTable: true,
      valueType: 'dateRange',
      search: {
        transform: (value) => {
          // console.log("transform",value)
          if (value == undefined) {
            return null;
          } else {
            return {
              startTime: value[0] === undefined ? null : value[0],
              endTime: value[1] === undefined ? null : value[1],
            };
          }
        },
      },
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      render: (_, record) => [
        <Access accessible={access.canSystemMenuEdit || false} key="update">
          <a
            key="update"
            onClick={() => {
              setUpdateModalOpen(true);
              if (record.parentId == '0') {
                record.parentId = undefined;
              }
              console.log('menu record', record);
              setCurrentRow(record);
            }}
            style={{ marginRight: '10px' }}
          >
            修改
          </a>
        </Access>,
        <Access accessible={access.canSystemMenuRemove || false} key="delete">
          <Popconfirm
            key="delete"
            title="确定要删除吗"
            onConfirm={async () => {
              await handleRemove(record.id);
            }}
            okText="确定"
            cancelText="取消"
          >
            <a type="text" style={{ color: '#ff4d4f' }} onClick={() => {}}>
              删除
            </a>
          </Popconfirm>
        </Access>,
      ],
    },
  ];
  return (
    <PageContainer>
      <Access accessible={access.canSystemMenuList || false}>
        <ProTable<API.MenuTreeVO>
          columns={columns}
          scroll={{ x: '800px' }}
          headerTitle="菜单管理"
          actionRef={tableRef}
          toolBarRender={() => [
            <Button
              type="primary"
              key="primary"
              onClick={() => {
                setCreateModalOpen(true);
              }}
            >
              <PlusOutlined /> 新建
            </Button>,
          ]}
          request={async (params = {}) => {
            const condition =
              params.menuName ||
              params.perms ||
              params.type ||
              (params.startTime && params.endTime);
            let menuTreeList: API.MenuTreeVO[] | undefined;
            if (condition == undefined) {
              const { data } = await listMenuTreeUsingGet();
              menuTreeList = data;
              // 将菜单树中属性 children 为 [] 的 children 属性去掉
              menuTreeList?.forEach((menuTree) => {
                removeEmptyChildren(menuTree);
              });
            } else {
              // @ts-ignore
              const { data } = await listMenuUsingGet(params);
              menuTreeList = data;
            }
            return {
              success: true,
              data: menuTreeList,
            };
          }}
          editable={{
            type: 'multiple',
          }}
          rowKey="id"
          options={{
            reload: true,
            density: true,
            setting: {
              draggable: true,
              checkedReset: true,
              listsHeight: 500,
            },
          }}
        />
      </Access>

      <CreateModal
        open={createModalOpen}
        onCancel={() => {
          setCreateModalOpen(false);
        }}
        onSubmit={async (values) => {
          await handleAdd(values);
        }}
      />

      <UpdateModal
        open={updateModalOpen}
        initialValues={currentRow as API.MenuUpdateRequest}
        onCancel={() => {
          setUpdateModalOpen(false);
        }}
        onSubmit={async (values) => {
          await handleUpdate(values);
        }}
      />
    </PageContainer>
  );
};
