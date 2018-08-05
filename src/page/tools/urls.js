/**
 * Created by hukui on 2018/8/4.
 */
let urls = {} ;

let protocol = window.location.protocol;//xieyi
let host  = window.location.host;

urls.baseURL = "http://172.20.8.173:8080";//protocol+'//'+host;
const CONTEXT = '';
// 小组管理
urls.getTeam = function (teamId) {
  return `${CONTEXT}/teams/${teamId}`
}
urls.getTeamMembers = function (teamId) {
  return `${CONTEXT}/teams/${teamId}/members`
}
urls.getTeamScores = function (teamId) {
  return `${CONTEXT}/teams/${teamId}/scores`
}
urls.addPerson2Team = function (teamId) {
  return `${CONTEXT}/teams/${teamId}/members`
}
urls.getAllTeams = CONTEXT + '/teams';
urls.addOrModifyTeam = CONTEXT + '/teams';

// 人员管理
urls.getPerson = function (personId) {
  return `${CONTEXT}/persons/${personId}`;
}

urls.getAllPersons = CONTEXT + '/persons';
urls.getNoTeamPersons = CONTEXT + '/persons/noteam';
urls.addOrModifyPerson = CONTEXT + '/persons';
// 活动加分
urls.addScore2Team = function (teamId) {
  return `${CONTEXT}/teams/${teamId}/scores`;

}

export default urls
