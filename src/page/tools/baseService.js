import axios from 'axios';
import {Modal} from 'antd';
import message from './message';


export default class BaseService {
  static showLoading() {
    if (this.isloading) {
      return;
    }
    this.isloading = true;
  }

  static dismissLoading() {
    if (!this.isloading) {
      return;
    }
    this.isloading = false;
  }

  static successCallback(res, resolve, reject, option) {
    this.dismissLoading();
    let tipFlag = option.tipFlag; //错误提示类型  true 模态框  false message

    if (res.status == 200) {
      let result = res.data;
      if (result.success === false) {
        //错误信息确认
        tipFlag ? Modal.error({
          title: '提示',
          content: result.message
        }) : message.error(result.message);

      } else {
        //成功提示信息
        if (result.message) {
          message.success(result.message);
        }
        console.log(result.data)
        resolve(result.data)
      }
    } else {
      reject(res.data.data);
    }
  }

  static errorCallback(error, reject) {
    this.dismissLoading();
    let response = error.response;

    message.error((response.data && response.data.message) || "请求异常");
    reject(error);
    // console.error(`request URL ${error}`)

  }

  /*
   * 通用的服务请求方式, 封装了成功和失败的的处理
   *
   * options:      tipFlag        //错误提示类型  true 模态框  false message
   *               showLoading   ===false不显示loading 效果   其他值都显示
   *               url
   *               type          即method
   *               data
   *               headers
   *
   * */
  static ajax(option) {
    if (option.showLoading === false) {

    } else {
      this.showLoading();
    }
    // let tipFlag = option.tipFlag; //错误提示类型  true 模态框  false message
    // let showTip = option.showTip;

    return new Promise((resolve, reject) => {
      axios({
        url: option.url,
        method: option.type || 'post',
        data: option.data || '',
        headers: option.headers || {},
        timeout: 20000
      }).then((res) => {
        this.successCallback(res, resolve, reject, option);

      }).catch((error) => {
        this.errorCallback(error, reject);
      })
    })
  }
  /**
   * post请求 传json格式参数 ， 封装了成功和失败的的处理
   * */
  static postJson(option) {
    // let tipFlag = option.tipFlag; //错误提示类型  true 模态框  false message
    if(option.showLoading === false){

    }else{
      this.showLoading();
    }
    return new Promise((resolve, reject) => {
      axios.post(option.url,JSON.stringify(option.data|| ''),{
            headers: option.headers || {"Content-Type": "application/json;charset=uft-8 "}
          }
      ).then(res => {
        this.successCallback(res,resolve,reject,option);
      }).catch(err => {
        this.errorCallback(err,reject);
      })
    })
  }

  //get请求传参
  static ajax_get(option) {
    if (option.showLoading === false) {

    } else {
      this.showLoading();
    }

    return new Promise((resolve, reject) => {
      axios.get(option.url, {
        params: option.params || '',
        headers: option.headers || {"Content-Type": "application/json"},
      }).then((res) => {
        this.successCallback(res, resolve, reject, option);

      }).catch((error) => {
        this.errorCallback(error, reject);
      })
    })
  }

}