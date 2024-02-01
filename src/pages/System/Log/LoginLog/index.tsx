import { ActionType, ProColumns } from '@ant-design/pro-components';
// @ts-ignore
import { pageLoginLogUsingGet } from '@/services/teainit-backend/logController';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Tag } from 'antd';
import { useRef, useState } from 'react';
import { Access, useAccess } from 'umi';

export default () => {
  const actionRef = useRef<ActionType>();
  const [total, setTotal] = useState<number>();
  const access = useAccess();

  // @ts-ignore
  const columns: ProColumns<API.LoginLog>[] = [
    {
      title: '日志编号',
      dataIndex: 'id',
      align: 'center',
      width: '10%',
      hideInSearch: true,
    },
    {
      title: 'IP 地址',
      dataIndex: 'ip',
    },
    {
      title: '登录地点',
      dataIndex: 'loginAddress',
      ellipsis: {
        showTitle: true,
      },
    },
    {
      title: '登录账号',
      dataIndex: 'loginAccount',
    },
    {
      title: '浏览器',
      dataIndex: 'browser',
      hideInSearch: true,
    },
    {
      title: '操作系统',
      dataIndex: 'operSystem',
      hideInSearch: true,
    },
    {
      title: '登录信息',
      dataIndex: 'loginInfo',
      hideInSearch: true,
      ellipsis: {
        showTitle: true,
      },
    },
    {
      title: '状态',
      dataIndex: 'loginState',
      width: '10%',
      valueEnum: {
        0: <Tag color="success">成功</Tag>,
        1: <Tag color="error">失败</Tag>,
      },
    },
    {
      title: '登录时间',
      key: 'showTime',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      ellipsis: {
        showTitle: true,
      },
      hideInForm: true,
      hideInSearch: true,
    },
    {
      title: '登录时间',
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
  ];
  return (
    <PageContainer>
      <Access accessible={access.canSystemLoginList || false}>
        <ProTable<API.LoginLog>
          columns={columns}
          headerTitle="登录日志"
          actionRef={actionRef}
          scroll={{ x: '800px' }}
          cardBordered
          request={async (params = {}) => {
            params.sortField = 'createTime';
            params.sortOrder = 'descend';
            // @ts-ignore
            const { data: loginLogDataReq } = await pageLoginLogUsingGet(params);
            // @ts-ignore
            setTotal(loginLogDataReq?.total);
            return {
              // @ts-ignore
              data: loginLogDataReq?.records,
            };
          }}
          rowKey="id"
          pagination={{
            pageSize: 10,
            total: total,
          }}
        />
      </Access>
    </PageContainer>
  );
};
