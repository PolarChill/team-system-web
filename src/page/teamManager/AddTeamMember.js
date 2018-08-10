/**
 * Created by hukui on 2018/8/4.
 */
import React, {Component} from 'react';
import {Select, Modal} from 'antd';
import urls from '../tools/urls';
import BaseService from '../tools/baseService';
import './AddTeamMember.css'

const Option = Select.Option;


export default class AddTeamMember extends Component {
  state = {
    code: ''
  }

  handleCodeChange(value) {
    this.setState({
      code: value
    })
  }

  handleCancel = () => {
    this.props.close();//调用父组件的方法，关闭modal
  };
  handleOk = () => {

    let data = {
      code: this.state.code,
    }
    BaseService.postJson({
      url: urls.addPerson2Team(this.props.team.code),
      data: data,
      // data: JSON.stringify(data),
      showLoading: false,
      tipFlag: false

    }).then((res) => {
      this.setState({
        code: '',
      })
      this.props.close(res);
    }).catch(() => {

      this.setState({confirmLoading: false});
      // this.props.close();
    })
  };

  render() {


    return (
        <div>
          <Modal
              visible={this.props.visible}
              title="添加小组成员"
              onOk={this.handleOk}
              onCancel={this.handleCancel}
              okText="确认"
              cancelText="取消"
              allowClear={true}
              width={400}

          >

            <div className='content'>

              <div style={{margin: 10}}>{this.props.team.name}</div>
              <div style={{margin: 10}}>
                <Select
                    showSearch
                    style={{width: 200}}
                    placeholder="Select a person"
                    optionFilterProp="children"
                    // value={this.props.persons &&this.props.persons[0].code }
                    onChange={this.handleCodeChange.bind(this)}
                    // value={null}
                    filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                  {this.props.persons && this.props.persons.map((item, index) =>
                      <Option value={item.code} key={index}>{item.name}</Option>
                  )}
                </Select>
              </div>

            </div>
          </Modal>

        </div>
    )
  }


}

