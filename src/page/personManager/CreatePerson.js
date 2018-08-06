import React, {Component} from 'react';
import {Input, Modal, Radio} from 'antd';
import urls from '../tools/urls';
import BaseService from '../tools/baseService';
import './CreatePerson.css';

const RadioGroup = Radio.Group;

export default class CreatePerson extends Component {
  constructor(props) {
    super(props);
    this.state = ({
      visible: this.props.visible,
      editInfo: null,
      code: '',
      name: '',
      age: '',
      sex: '',

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
  sexInput = (e) => {
    this.setState({
      sex: e.target.value
    })
  }
  ageInput = (e) => {
    this.setState({
      age: e.target.value
    })
  }
  handleCancel = () => {
    this.props.close();//调用父组件的方法，关闭modal
  };
  handleOk = () => {

    let data = {
      code: this.state.code,
      name: this.state.name,
      sex: this.state.sex,
      age: this.state.age

    }
    BaseService.postJson({
      url: urls.addOrModifyPerson,
      data: data,
      // data: JSON.stringify(data),
      showLoading: false,
      tipFlag: false

    }).then((res) => {
      this.setState({
        code:'',
        name:'',
        sex: "",
        age:""
      })
      this.props.close(res);
    }).catch(() => {

      this.setState({confirmLoading: false});
      // this.props.close();


    })

  };

  render() {
    let {code, name, sex, age} = this.state
    return (
        <div>
          <Modal
              title={'新增'}
              visible={this.props.visible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
              okText="确认"
              cancelText="取消"
              allowClear={true}
              className='modal'
          >
            <div className='content'>

              <div className='code-input'>
                <span style={{marginRight: 29}} className='name'>编号</span> <Input style={{width: 250}} value={code}
                                                                                  onChange={this.codeInput.bind(this)}/>
              </div>
              <div className='name-input'>
                <span style={{marginRight: 29}} className='name'>姓名</span><Input style={{width: 250}} value={name}
                                                                                 onChange={this.nameInput.bind(this)}/>
              </div>
              <div className='sex-input'>
                <span style={{marginRight: 29}} className='name'>性别</span>
                <RadioGroup value={sex} onChange={this.sexInput.bind(this)}>
                  <Radio value={1}>男</Radio>
                  <Radio value={0}>女</Radio>
                </RadioGroup>
              </div>
              <div className='age-input'>
                <span style={{marginRight: 29}} className='name'>年龄</span><Input style={{width: 250}} value={age}
                                                                                 onChange={this.ageInput.bind(this)}/>
              </div>
            </div>


          </Modal>
        </div>
    )
  }
}
