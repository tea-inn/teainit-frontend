import CreateModal from '@/pages/System/User/components/CreateModal';
import UpdateModal from '@/pages/System/User/components/UpdateModal';
import {
  addUserUsingPost,
  deleteUserUsingPost,
  pageUserUsingGet,
  updateUserUsingPost,
} from '@/services/teainit-backend/userController';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, Image, message, Popconfirm } from 'antd';
import { useRef, useState } from 'react';
import { Access, useAccess } from 'umi';

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
  const handleAdd = async (fields: API.UserAddRequest) => {
    const hide = message.loading('正在添加');
    try {
      await addUserUsingPost({ ...fields });
      message.success('添加成功（ 初始密码为 12345678 ）');
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
  const handleUpdate = async (fields: API.UserUpdateRequest) => {
    const hide = message.loading('正在修改');
    try {
      await updateUserUsingPost({
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
  const handleRemove = async (userId: string | undefined) => {
    const hide = message.loading('正在删除');
    try {
      await deleteUserUsingPost({ id: userId || '' });
      message.success('删除成功');
      tableRef.current?.reload();
    } catch (err: any) {
      message.error('删除失败，' + err.info.errMsg);
    }
    hide();
  };

  const columns: ProColumns<API.UserVO>[] = [
    {
      title: '用户编号',
      dataIndex: 'id',
      key: 'id',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '用户名',
      dataIndex: 'userName',
      ellipsis: {
        showTitle: true,
      },
    },
    {
      title: '账号',
      dataIndex: 'userAccount',
      copyable: true,
      ellipsis: {
        showTitle: true,
      },
    },
    {
      title: '头像',
      dataIndex: 'avatarUrl',
      align: 'center',
      hideInForm: true,
      hideInSearch: true,
      render: (_, record) => (
        <div>
          <Image src={record.userAvatar ?? ''} width={30} />
        </div>
      ),
    },
    {
      title: '性别',
      dataIndex: 'gender',
      valueEnum: {
        0: { text: '男', status: 'Default' },
        1: { text: '女', status: 'Default' },
        2: { text: '未知', status: 'Default' },
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
        <Access accessible={access.canSystemUserEdit || false} key="update">
          <a
            key="update"
            onClick={() => {
              setUpdateModalOpen(true);
              setCurrentRow(record);
            }}
            style={{ marginRight: '10px' }}
          >
            修改
          </a>
        </Access>,
        <Access accessible={access.canSystemUserRemove || false} key="delete">
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
      <Access accessible={access.canSystemUserList || false}>
        <ProTable<API.UserVO>
          columns={columns}
          scroll={{ x: '800px' }}
          headerTitle="用户管理"
          toolBarRender={() => [
            <Access accessible={access.canSystemUserAdd || false}>
              <Button
                type="primary"
                key="primary"
                onClick={() => {
                  setCreateModalOpen(true);
                }}
              >
                <PlusOutlined /> 新建
              </Button>
              ,
            </Access>,
          ]}
          actionRef={tableRef}
          request={async (params = {}) => {
            // @ts-ignore
            const { data: userData } = await pageUserUsingGet(params);
            // @ts-ignore
            setTotal(userData?.total);
            return {
              success: true,
              data: userData?.records,
            };
          }}
          editable={{
            type: 'multiple',
          }}
          rowKey="id"
          key="userList"
          options={{
            reload: true,
            density: true,
            setting: {
              draggable: true,
              checkedReset: true,
              listsHeight: 500,
            },
          }}
          pagination={{
            pageSize: 10,
            total: total,
            onChange: (page) => console.log(page),
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
        initialValues={currentRow as API.UserUpdateRequest}
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
