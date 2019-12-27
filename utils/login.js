const config = require('../config.js')

module.exports = {
  /**
   * 前端自己调微信接口获取openid
   */
  getOpenid(callback) {
    wx.login({
      success(res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: `https://api.weixin.qq.com/sns/jscode2session`,
            data: {
              appid: config.appid,
              secret: config.appSecret,
              js_code: res.code,
              grant_type: 'authorization_code'
            },
            success(data) {
              console.log(11111, data)
              if (data.data && data.data.openid) {
                callback(data.data)
              } else {
                wx.showToast({
                  title: 'data.data无openid'
                })
              }
            },
            fail() {
              wx.showToast({
                title: '获取openid接口请求失败，可能网络出了点问题'
              })
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      },
      fail() {
        wx.showToast({
          title: '获取登录授权失败，请允许此小程序获取您的基本资料'
        })
      }
    })
  }
}