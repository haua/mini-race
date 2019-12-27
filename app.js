//app.js

const login = require('./utils/login.js')

App({
  onShow: function () {
    var that = this;

    // 登录
    login.getOpenid((res) => {
      console.log('openid:', res.openid); // openid
      that.globalData.openid = res.openid;
      wx.setStorage({
        key: 'openid',
        data: res.openid
      })
    })

  },
  globalData: {
    'openid':'',
    'uploadFileUrl': 'https://card.qxueyou.com/api/common/upload',
    'getCard':'https://card.qxueyou.com/api/card/cardetail',
    'addCard':'https://card.qxueyou.com/api/card/savecard'
  }
})