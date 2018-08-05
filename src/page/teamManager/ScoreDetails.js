/**
 * Created by hukui on 2018/8/4.
 */
import React, {Component} from 'react';
import {Table, Button, Input, Modal} from 'antd';
import urls from '../tools/urls';
import BaseService from '../tools/baseService';



export default class ScoreDetails extends Component {

  // constructor(props) {
  //   super(props);
  //   this.state = ({
  //     visible: this.props.visible,
  //   });
  // }


  columns = [

    {
      title: '任务',
      dataIndex: 'task',
      key: 'task',
      width: '10%',

    },
    {
      title: '分数',
      dataIndex: 'score',
      key: 'score',
      width: '10%',
      sorter: (a, b) => a.score - b.score,

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
              title="该小组任务得分情况"
              // onOk={this.handleOk}
              onCancel={this.handleCancel}
              footer={null}
          >
            <Table columns={this.columns} dataSource={this.props.teamScores}/>
          </Modal>

        </div>
    )
  }


}

/**
 * Created by hukui on 2018/8/4.
 */
