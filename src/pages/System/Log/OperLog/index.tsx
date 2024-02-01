import { ActionType, ProColumns, ProDescriptions } from '@ant-design/pro-components';
import { Modal, Tag } from 'antd';
// @ts-ignore
import { useRef, useState } from 'react';

import { PageContainer, ProTable } from '@ant-design/pro-components';

import {
  getOperLogByIdUsingGet,
  pageOperLogUsingGet,
} from '@/services/teainit-backend/logController';
import { Access, useAccess } from 'umi';

export default () => {
  const actionRef = useRef<ActionType>();

  /**
   * @en-US Pop-up window of new window
   * @zh-CN 新建窗口的弹窗
   *  */
  /**
   * @en-US The pop-up window of the distribution update window
   * @zh-CN 分布更新窗口的弹窗
   * */
  const [total, setTotal] = useState<number>();
  const [detailOpen, setDetailOpen] = useState<boolean>();
  const [idParam, setIdParam] = useState<string>();
  const ref = useRef<ActionType>();
  const access = useAccess();

  // @ts-ignore
  const columns: ProColumns<API.OperLog>[] = [
    {
      title: '日志编号',
      dataIndex: 'id',
      align: 'center',
      width: '10%',
      hideInSearch: true,
    },
    {
      title: '操作模块',
      dataIndex: 'operModule',
      width: '10%',
      ellipsis: true,
    },
    {
      title: '操作类型',
      dataIndex: 'operType',
      width: '10%',
      valueEnum: {
        0: <Tag color="magenta">其他</Tag>,
        1: <Tag color="blue">新增</Tag>,
        2: <Tag color="gold">修改</Tag>,
        3: <Tag color="red">删除</Tag>,
        4: <Tag color="purple">导入</Tag>,
        5: <Tag color="purple">导出</Tag>,
      },
    },
    {
      title: 'IP 地址',
      dataIndex: 'ip',
    },
    {
      title: '操作地点',
      dataIndex: 'operAddress',
    },
    {
      title: '操作账号',
      dataIndex: 'userAccount',
    },
    {
      title: '状态',
      dataIndex: 'operState',
      width: '10%',
      valueEnum: {
        0: <Tag color="success">成功</Tag>,
        1: <Tag color="error">失败</Tag>,
      },
    },
    {
      title: '操作时间',
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
      title: '操作时间',
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
      width: 80,
      title: '操作',
      valueType: 'option',
      key: 'option',
      render: (_, record) => [
        <a
          key="detail"
          onClick={() => {
            setDetailOpen(true);
            setIdParam(record.id);
            ref.current?.reload();
          }}
        >
          详细
        </a>,
      ],
    },
  ];
  return (
    <PageContainer>
      <Access accessible={access.canSystemOperList || false}>
        <ProTable<API.OperLog>
          columns={columns}
          headerTitle="操作日志"
          actionRef={actionRef}
          scroll={{ x: '800px' }}
          cardBordered
          request={async (params = {}) => {
            params.sortField = 'createTime';
            params.sortOrder = 'descend';
            // @ts-ignore
            const { data: operLogDataReq } = await pageOperLogUsingGet(params);
            // @ts-ignore
            setTotal(operLogDataReq?.total);
            // setOperLogData(operLogDataReq?.records);
            return {
              // @ts-ignore
              data: operLogDataReq?.records,
            };
          }}
          editable={{
            type: 'multiple',
          }}
          rowKey="id"
          pagination={{
            pageSize: 10,
            total: total,
            // onChange: (page) => console.log(page),
          }}
        />
      </Access>

      <Modal
        title="操作日志详细数据"
        open={detailOpen}
        footer={null}
        onCancel={() => {
          setDetailOpen(false);
        }}
        width="60%"
      >
        <ProDescriptions
          bordered
          size={'small'}
          column={2}
          request={async () => {
            const param = {
              id: idParam,
            };
            // @ts-ignore
            const { data } = await getOperLogByIdUsingGet(param);
            return {
              success: true,
              data: data,
            };
          }}
          columns={[
            {
              title: '操作模块',
              dataIndex: 'operModule',
              ellipsis: true,
            },
            {
              title: '操作类型',
              dataIndex: 'operType',
            },
            {
              title: 'ip',
              dataIndex: 'ip',
            },
            {
              title: '操作地点',
              dataIndex: 'operAddress',
            },
            {
              title: '操作账号',
              dataIndex: 'userAccount',
            },
            {
              title: '状态',
              dataIndex: 'operState',
              valueEnum: {
                0: { text: '成功', status: 'Success' },
                1: {
                  text: '失败',
                  status: 'Error',
                },
              },
            },
            {
              title: '操作时间',
              key: 'showTime',
              dataIndex: 'createTime',
              valueType: 'dateTime',
            },
            {
              title: '请求方法',
              key: 'operMethod',
              dataIndex: 'operMethod',
            },
            {
              title: '请求路径',
              key: 'operUrl',
              dataIndex: 'operUrl',
            },
            {
              title: '异常信息',
              key: 'errorInfo',
              dataIndex: 'errorInfo',
            },

            {
              title: '响应信息',
              key: 'responseInfo',
              dataIndex: 'responseInfo',
              valueType: 'jsonCode',
            },
            {
              title: '请求参数',
              key: 'requestParam',
              dataIndex: 'requestParam',
              valueType: 'jsonCode',
            },
          ]}
          actionRef={ref}
        ></ProDescriptions>
      </Modal>
    </PageContainer>
  );
};
