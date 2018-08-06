import React, {Component} from 'react';
import {Table, Button} from 'antd';
import urls from '../tools/urls';
import BaseService from '../tools/baseService';
import CreatePerson from "./CreatePerson";

const data = [{
  key: '1',
  code: '1',
  name: 'John Brown',
  sex: '男',
  age: 32,
}, {
  key: '2',
  code: '2',
  name: 'Jim Green',
  sex: '男',
  age: 42,
}, {
  key: '3',
  code: '3',
  name: 'Joe Black',
  sex: '男',
  age: 32,
}, {
  key: '4',
  code: '4',
  name: 'Jim Red',
  sex: '男',
  age: 32,
}];

export default class PersonsList extends Component {


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

  constructor(props) {
    super(props);
    this.state = {
      tableData: data,
      showModal: false,

    };
    this.getInitialPersonsList()
    // this.getInitRemoteSystems();
  }
  getInitialPersonsList () {
    BaseService.ajax({
      url: urls.getAllPersons,
      type: 'get',
    }).then((response) => {
      this.tableData = response;
      this.setState({
        tableData: this.tableData
      })
    });
  }
  getKeyRecord =(data)=>{
    if(data){
      data.forEach((item,index)=>{
        item.key = index;
      });
      return data;
    }
    return null;
  };


  showModal = () => {
    this.setState({showModal: true, editInfo: null, editIndex: -1});
  };
  disableModel = (data, isEdit) => {
    this.setState({showModal: false});
    this.getInitialPersonsList();

  };


  render() {
    const {tableData} = this.state;
    return (

        <div>
          <Button type="primary" className="dg-ant-btn"
                  onClick={this.showModal}> + {'创建成员'}</Button>
          <CreatePerson
              visible={this.state.showModal}
              close={this.disableModel}/>
          <Table columns={this.columns} dataSource={this.getKeyRecord(tableData)}/>
        </div>
    )
  }


}