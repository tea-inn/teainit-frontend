import CreateModal from '@/pages/System/Role/components/CreateModal';
import UpdateModal from '@/pages/System/Role/components/UpdateModal';
import {
  addRoleUsingPost,
  deleteRoleUsingPost,
  getRolePermsToEchoUsingGet,
  pageRoleUsingGet,
  updateRoleUsingPost,
} from '@/services/teainit-backend/roleController';
import { useAccess } from '@@/exports';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, message, Popconfirm } from 'antd';
import { useRef, useState } from 'react';
import { Access } from 'umi';

export default () => {
  const tableRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.UserVO>({});
  const [createModalOpen, setCreateModalOpen] = useState<boolean>(false);
  const [updateModalOpen, setUpdateModalOpen] = useState<boolean>(false);
  const [total, setTotal] = useState<number>();
  const access = useAccess();

  /**
   * 新增
   */
  const handleAdd = async (fields: API.RoleAddRequest) => {
    const hide = message.loading('正在添加');
    try {
      await addRoleUsingPost({ ...fields });
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
  const handleUpdate = async (fields: API.RoleUpdateRequest) => {
    const hide = message.loading('正在修改');
    try {
      await updateRoleUsingPost({
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
  const handleRemove = async (roleId: string | undefined) => {
    const hide = message.loading('正在删除');
    try {
      await deleteRoleUsingPost({ id: roleId || '' });
      message.success('删除成功');
      tableRef.current?.reload();
    } catch (err: any) {
      message.error('删除失败，' + err.info.errMsg);
    }
    hide();
  };

  // 表格/表单 标题字段（对应数据库）
  const columns: ProColumns<API.Role>[] = [
    {
      title: '角色编号',
      dataIndex: 'id',
      align: 'center',
      width: '15%',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: '角色名称',
      dataIndex: 'roleName',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项为必填项',
          },
          {
            max: 50,
            message: '角色名称不符合要求',
          },
        ],
      },
    },
    {
      title: '创建时间',
      key: 'showTime',
      dataIndex: 'updateTime',
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
      dataIndex: 'updateTime',
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
        <Access accessible={access.canSystemRoleEdit || false} key="update">
          <a
            key="update"
            onClick={async () => {
              setUpdateModalOpen(true);
              const { data: menuIdList } = await getRolePermsToEchoUsingGet({
                id: record.id || '',
              });
              let roleRecord = {
                ...record,
                menuIdList: menuIdList,
              };
              setCurrentRow(roleRecord);
            }}
            style={{ marginRight: '10px' }}
          >
            修改
          </a>
        </Access>,
        <Access accessible={access.canSystemRoleRemove || false} key="remove">
          <Popconfirm
            key="remove"
            title="你确定要删除吗"
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
      <Access accessible={access.canSystemRoleList || false}>
        <ProTable<API.Role>
          columns={columns}
          actionRef={tableRef}
          scroll={{ x: '800px' }}
          headerTitle="角色管理"
          toolBarRender={() => [
            <Access accessible={access.canSystemRoleAdd || false}>
              <Button
                type="primary"
                key="primary"
                onClick={() => {
                  setCreateModalOpen(true);
                }}
              >
                <PlusOutlined /> 新建
              </Button>
            </Access>,
          ]}
          request={async (params = {}) => {
            // @ts-ignore
            const { data } = await pageRoleUsingGet(params);
            // @ts-ignore
            setTotal(data?.total);
            return {
              success: true,
              data: data?.records,
            };
          }}
          pagination={{
            pageSize: 10,
            total: total,
            // onChange: (page) => console.log(page)
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
              checkable: true,
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
        initialValues={currentRow as API.RoleUpdateRequest}
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
