/**
 * Created by hukui on 2018/8/4.
 */
import React, {Component} from 'react';
import {Table, Button, Input, Modal} from 'antd';
import urls from '../tools/urls';
import BaseService from '../tools/baseService';
import TeamMembers from "./TeamMembers";
import ScoreDetails from './ScoreDetails'
import AddTeamMember from "./AddTeamMember";
import CreateTeam from "./CreateTeam";

const Search = Input.Search;
const confirm = Modal.confirm;


export default class TeamsList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tableData: [],
      showAddTeamModal: false,
      memberModal: false,
      scoreDetailsModal: false,
      addMemberModal: false,
      members: [],     // 小组成员
      teamScores: [],  //小组分数详情
      team: {}, //当前小组
      persons: [],  //不在队伍里的成员

    };
    this.getInitialTeamsList()
  }

  getInitialTeamsList() {
    BaseService.ajax({
      url: urls.getAllTeams,
      type: 'get',
    }).then((response) => {
      this.tableData = response;
      this.setState({
        tableData: this.tableData
      })
    });
  }

  getInitialNoTeamPersonsList() {
    BaseService.ajax({
      url: urls.getNoTeamPersons,
      type: 'get',
    }).then((response) => {
      this.persons = response;
      this.setState({
        persons: this.persons
      })
    });
  }


  columns = [
    {
      title: '编号',
      dataIndex: 'team.code',
      key: 'code',
      width: '15%',


    },
    {
      title: '名称',
      dataIndex: 'team.name',
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
      title: '口号',
      dataIndex: 'team.slogan',
      key: 'slogan',
      width: '15%',

    },
    {
      title: '排名',
      dataIndex: 'rank',
      key: 'rank',
      width: '10%',

    },
    {
      title: '得分',
      dataIndex: 'score',
      key: 'score',
      width: '10%',
      sorter: (a, b) => a.score - b.score,

    },


    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      width: '30%',
      render: (text, record, index) => {
        return (
            <div>
              <span style={{color: '#21a0d8', cursor: 'pointer'}}
                    onClick={this.showScoreDetails.bind(this, record.team.code)}
              >活动得分</span>
              <span style={{marginLeft: 29, color: '#21a0d8', cursor: 'pointer'}}
                    onClick={this.showMembers.bind(this, record.team.code)}

              >成员列表</span>
              <span style={{marginLeft: 29, color: '#21a0d8', cursor: 'pointer'}}
                    onClick={this.showAddMember.bind(this, record.team)}
              >添加成员</span>

            </div>)
      }
    },
  ];
  showAddMember = (record) => {
    this.getInitialNoTeamPersonsList()
    this.setState({
      team: record,
      addMemberModal: true
    })
  }

  showMembers = (teamId) => {
    BaseService.ajax({
      url: urls.getTeamMembers(teamId),
      type: 'get',
    }).then((response) => {
      this.members = response;
      this.setState({
        members: this.members,
        memberModal: true
      })
    });

  }
  showScoreDetails = (teamId) => {
    console.log(teamId)

    BaseService.ajax({
      url: urls.getTeamScores(teamId),
      type: 'get',
    }).then((response) => {
      this.teamScores = response;
      this.setState({
        teamScores: this.teamScores,
        scoreDetailsModal: true
      })
    });


  }
  showModal = () => {
    this.setState({showAddTeamModal: true});
  };
  disableModel = (data) => {
    this.setState({
      showAddTeamModal: false,
      memberModal: false,
      scoreDetailsModal: false,
      addMemberModal: false,
    });
    this.getInitialTeamsList()

  };
  getKeyRecord = (data) => {
    if (data) {
      data.forEach((item, index) => {
        item.key = index;
      });
      return data;
    }
    return null;
  };
  refreshActivityScore() {
    this.props.refreshActivity()

  }


  render() {


    return (
        <div>
          <Button type="primary" className="dg-ant-btn"
                  onClick={this.showModal}> + {'创建小组'}</Button>
          <CreateTeam visible={this.state.showAddTeamModal}
                      close={this.disableModel}
          refreshActivityScore={this.refreshActivityScore.bind(this)}/>
          <AddTeamMember visible={this.state.addMemberModal}
                         team={this.state.team}
                         persons={this.state.persons}
                         close={this.disableModel}/>
          <TeamMembers visible={this.state.memberModal}
                       members={this.getKeyRecord(this.state.members)}
                       close={this.disableModel}/>
          <ScoreDetails visible={this.state.scoreDetailsModal}
                        teamScores={this.getKeyRecord(this.state.teamScores)}
                        close={this.disableModel}/>
          <Table columns={this.columns} dataSource={this.getKeyRecord(this.state.tableData)}/>
        </div>
    )
  }


}
