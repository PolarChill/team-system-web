import React, {Component} from 'react';
import {Input, Modal, Radio, message, Form, Select, Row, Col, Button, Icon} from 'antd';
import urls from '../tools/urls';
import BaseService from '../tools/baseService';
import './CreateTeam.css';

const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const Option = Select.Option;
export default class CreateTeam extends Component {
  constructor(props) {
    super(props);
    this.state = ({
      visible: this.props.visible,
      code: '',
      name: '',
      slogan: '',

    });
  }

  componentWillReceiveProps(nextProps) {
    // if (nextProps.visible) {
    //   // this.setState({
    //   //   editInfo: nextProps.editInfo
    //   // })
    //   // this.getInitRemoteSysTypes();
    //   // this.getInitDatabaseTypes();
    //   // this.getInitDbUrl();
    // }
  };

  nameInput = (e) => {
    this.setState({
      name: e.target.value
    })
  }
  codeInput = (e) => {
    this.setState({
      code: e.target.value
    })
  }

  sloganInput = (e) => {
    this.setState({
      slogan: e.target.value
    })
  }
  handleCancel = () => {
    this.props.close();//调用父组件的方法，关闭modal
  };
  handleOk = () => {

    let data = {
      code: this.state.code,
      name: this.state.name,
      slogan: this.state.slogan
    }
    BaseService.postJson({
      url: urls.addOrModifyTeam,
      data: data,
      // data: JSON.stringify(data),
      showLoading: false,
      tipFlag: false

    }).then((res) => {
      this.setState({
        code: '',
        name: '',
        slogan: '',
      })
      this.props.close(res);
    }).catch(() => {

      this.setState({confirmLoading: false});
      // this.props.close();


    })


  };

  render() {
    let {code, name, slogan} = this.state
    return (
        <div>
          <Modal
              title={'新增小组'}
              visible={this.props.visible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
              okText="确认"
              cancelText="取消"
              allowClear={true}
              className='modal'
          >
            <div className='createTeam'>
              <div className='createTeam-content'>

                <div className='code-input'>
                  <span style={{marginRight: 20}} className='name'>编号</span> <Input style={{width: 250}} value={code}
                                                                                    onChange={this.codeInput.bind(this)}/>
                </div>
                <div className='name-input'>
                  <span style={{marginRight: 20}}>名称</span><Input style={{width: 250}} value={name}
                                                                  onChange={this.nameInput.bind(this)}/>
                </div>

                <div className='slogan-input'>
                  <span style={{marginRight: 20}}>口号</span><Input style={{width: 300}} value={slogan}
                                                                  onChange={this.sloganInput.bind(this)}/>
                </div>
              </div>
            </div>


          </Modal>
        </div>
    )
  }
}
