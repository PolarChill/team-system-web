/**
 * Created by hukui on 2018/8/4.
 */
import React, {Component} from 'react';
import {Table, Modal} from 'antd';



export default class TeamMembers extends Component {




  columns = [
    {
      title: '编号',
      dataIndex: 'code',
      key: 'code',
      width: '10%',


    },
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      width: '15%',
      sorter: (a, b) => {
        let nameA = a.name.toUpperCase();
        let nameB = b.name.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;

      }

    },
    {
      title: '性别',
      dataIndex: 'sex',
      key: 'sex',
      width: '10%',
      render(text) {
        return (
            <div>
              {text == 1 ? '男': '女'}
            </div>
        )
      }

    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
      width: '10%',

    },
  ];

  handleCancel = () => {
    this.props.close();//调用父组件的方法，关闭modal
  };



  render() {


    return (
        <div>
          <Modal
              visible={this.props.visible}
              title="该小组成员列表"
              // onOk={this.handleOk}
              onCancel={this.handleCancel}
              footer={null}
          >
            <Table columns={this.columns} dataSource={this.props.members}/>
          </Modal>

        </div>
    )
  }


}

