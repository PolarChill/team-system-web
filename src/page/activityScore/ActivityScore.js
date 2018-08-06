/**
 * Created by hukui on 2018/8/4.
 */
import React, {Component} from 'react';
import {Select, Button, Input} from 'antd';
import urls from '../tools/urls';
import BaseService from '../tools/baseService';
import './ActivityScore.css'

const Option = Select.Option;
export default class ActivityScore extends Component {

  constructor(props) {
    super(props);
    this.state = {
      teams: [],
      teamCode: '',
      task: '',
      score: '',
      refresh: false,

    }
    this.getInitialTeamsList()
    console.log('activityScore  render')
  }
  componentWillReceiveProps(nextProps) {
      this.setState({
        refresh: !this.state.refresh
      });
      this.getInitialTeamsList()

  }
  getInitialTeamsList() {
    BaseService.ajax({
      url: urls.getAllTeams,
      type: 'get',
    }).then((response) => {
      this.teams = response
      this.setState({
        teams: this.teams
      })
    });
  }

  handleTaskChange = (e) => {
    this.setState({
      task: e.target.value
    })
  }
  handleScoreChange = (e) => {
    this.setState({
      score: e.target.value
    })
  }
  handleOk = () => {

    let data = {
      task: this.state.task,
      score: this.state.score
    }
    BaseService.postJson({
      url: urls.addScore2Team(this.state.teamCode),
      data: data,
      // data: JSON.stringify(data),
      showLoading: false,
      tipFlag: false

    }).then((res) => {
      this.setState({
        task: '',
        score: '',
      })
      // this.props.close(res);
    }).catch(() => {

      this.setState({confirmLoading: false});
      // this.props.close();


    })
  }

  handleTeamChange(value) {
    this.setState({
      teamCode: value
    })
  }

  render() {
    let {task, score} = this.state
    return (
        <div className="task">
          <div className="task-content">
            <div style={{margin: 10}}>
              <span style={{marginRight: 29}}>任务</span><Input style={{width: 250}}
                                                              value={task}
                                                              onChange={this.handleTaskChange.bind(this)}/>
            </div>
            <div style={{margin: 10}}>
              <span style={{marginRight: 29}}>小组</span>
              <Select
                  showSearch
                  style={{width: 200}}
                  placeholder="Select a team"
                  optionFilterProp="children"
                  onChange={this.handleTeamChange.bind(this)}
                  filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              >
                {this.state.teams && this.state.teams.map((item, index) =>
                    <Option value={item.team.code} key={index}>{item.team.name}</Option>
                )}
              </Select>
            </div>
            <div style={{margin: 10}}>
              <span style={{marginRight: 29}}>分数</span><Input style={{width: 250}}
                                                              value={score}
                                                              onChange={this.handleScoreChange.bind(this)}/>
            </div>
            <div className="task-submit">
              <Button type="primary" style={{width: 200, margin: 10}} onClick={this.handleOk}>小组奖励加分</Button>
            </div>
          </div>

        </div>

    )
  }
}
