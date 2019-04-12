const baseURL = 'https://wx.lagranmoon.com/';

const http = (url = '', param = {}, other = {}) => {
  const token = wx.getStorageSync('Authorization') || null;// intercept to add token
  const request = {
    url: baseURL + url,
    data: param,
    ...other,
  };
  if (token) {
    request.header = {
      ...request.header,
      'Authorization': token,
    };
  }
  return new Promise((resolve, reject) => {
    wx.request({
      ...request,
      complete: (res) => {
        console.log(res);
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(res.data);
        } else {
          switch (res.statusCode) {
            case 401:
              wx.showToast({
                title: '请先登录',
                icon: 'none',
              });
              break;
            default:
              break;
          }
          reject(res.data);
        }
      }
    });
  });
};

const _get = (url, param = {}) => {
  return http(url, param);
};

const _post = (url, param = {}) => {
  return http(url, param, { method: 'post' });
};

const _put = (url, param = {}) => {
  return http(url, param, { method: 'put' });
};

const _delete = (url, param = {}) => {
  return http(url, param, { method: 'delete' });
};

module.exports = {
  get: _get,
  post: _post,
  put: _put,
  delete: _delete,
};
