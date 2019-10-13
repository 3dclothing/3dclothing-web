
import config from '../config';
import loading from './loading';

const _handleResponse = (res: any, { resolve, reject }: any) => {
  if (res.code == 401) {
    wx.navigateTo({
      url: '../index/index?auth=true',
    })
    return
  }
  if (res.code === 500) {
    reject(res);
    throw res.msg;
  }
  resolve(res);
}

const _request = (...argus: any[]) => {
  let user: User;
  try {
    user = wx.getStorageSync('user');
    console.log('user', user)
    const header_pre = {
      'authorization': 'Bearer ' + user.token,
      'content-type': 'application/json'
    };
    let options = argus[0];
    let {
      method = 'GET',
      url,
      data = {},
      header,
      reject = function () { console.log('default reject func') },
    } = options;
    let { needLoading = '0' } = data;
    if (needLoading === '1') {
      loading.show();
    }
    wx.request({
      url: config.hostUrl + url,
      method: method,
      data: data,
      header: Object.assign({}, header_pre, header),
      success: (res: any) => {
        _handleResponse(res.data, options);
      },
      fail: (res: any) => {
        if (reject) {
          reject(res)
        }
      },
      complete: () => {
        if (needLoading === '1') {
          loading.hide();
        }
      }
    });
  } catch (e) {
    console.log('请求异常');
  }
};

const promisify = (callback: any) => {
  return (options: any, ...params: any[]) => {
    return new Promise((resolve, reject) => {
      callback(Object.assign({}, options, { resolve: resolve, reject: reject }), ...params);
    });
  }
}

const _get = (...argus: any) => _request(Object.assign({}, argus[0], { method: 'GET' }));
const _put = (...argus: any) => _request(Object.assign({}, argus[0], { method: 'PUT' }));
const _post = (...argus: any) => _request(Object.assign({}, argus[0], { method: 'POST' }));
const _post_form = (...argus: any) => _request(Object.assign({}, argus[0], {
  method: 'POST',
  header: {
    'authorization': 'Bearer ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJQd0MgTmV3IFZlbnR1cmVzIiwiaWF0IjoxNTQxNTc3MTE4LCJleHAiOjE2MDQ3MzU1MTgsImF1ZCI6InB3Yy5jb20iLCJzdWIiOiJQd0MgTmV3IFZlbnR1cmVzIHRlc3QgdG9rZW4iLCJjbGllbnROYW1lIjoiUHdDIE9uZUNoYXQifQ.d4_jlSqDndisproPjiy1zy1_aELwMYVLk_nQRwCGcTc',
    'content-type': 'application/x-www-form-urlencoded'
  }
}));

let HttpServer = {
  get: promisify(_get),
  put: promisify(_put),
  post: promisify(_post),
  post_form: promisify(_post_form),
};

interface User {
  token: string,
}

export default HttpServer


