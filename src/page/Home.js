import React, {Component} from 'react';
import './Home.css';
import {Layout, Breadcrumb, Tabs} from 'antd';
import TeamsList from "./teamManager/TeamsList";
import PersonsList from "./personManager/PersonsList";
import ActivityScore from "./activityScore/ActivityScore";

const {Header, Content, Footer} = Layout;
const TabPane = Tabs.TabPane;
export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      refresh: false
    }
  }

  handleChange(key) {
    if (key === 1) {
      this.setState({
        refresh: !this.state.refresh
      })
    }
  }

  handleOnChange() {
    this.setState({
      refresh: !this.state.refresh
    })
  }

  render() {

    return (
        <Layout>
          <Header className="header">
            <div className="logo"/>
            <h1 className="header-title">Team System</h1>

          </Header>
          <Content style={{padding: '0 50px'}}>
            <Breadcrumb style={{margin: '12px 0'}}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              {/*<Breadcrumb.Item>List</Breadcrumb.Item>*/}
              {/*<Breadcrumb.Item>App</Breadcrumb.Item>*/}
            </Breadcrumb>
            <Layout style={{padding: '24px 0', background: '#fff'}}>
              <div>
                <div style={{marginBottom: 16}}>

                </div>
                <Tabs tabPosition="left" onChange={this.handleChange.bind(this)}>

                  <TabPane tab="小组管理" key="1">
                    <TeamsList refreshActivity={this.handleOnChange.bind(this)}/>
                  </TabPane>
                  <TabPane tab="人员管理" key="2">
                    <PersonsList/>
                  </TabPane>

                  <TabPane tab="参与活动" key="3">
                    <ActivityScore refesh={this.state.refresh}/>
                  </TabPane>
                </Tabs>
              </div>

            </Layout>
          </Content>
          <Footer style={{textAlign: 'center'}}>
            Team Management ©2018 Created by 奇人
          </Footer>
        </Layout>
    )
  }
}