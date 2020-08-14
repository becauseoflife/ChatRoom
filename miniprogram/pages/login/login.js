// miniprogram/pages/login/login.js
const app = getApp();

// 数据库
const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 使用微信登录
   */
  onGetUserInfo: function(e){
    console.log('onGetUserInfo e is:', e)
    // 用户授权
    wx.getSetting({
      success: res => {
        console.log('getSetting res is:', res)
        if(res.authSetting['scope.userInfo']){
            wx.showLoading({
              title: '登录中...',
            })
            //用户信息
            wx.getUserInfo({
              lang: 'zh_CN',
            })
            // 调用云函数
            wx.cloud.callFunction({
              name: 'login',
              data: {},
              success: res => {
                console.log('login res is:', res)
                console.log('[云函数] [login] user openid: ', res.result.openid)

                // 全局赋值
                app.globalData.openid = res.result.openid
                app.globalData.userInfo = e.detail.userInfo

                // 判断用户信息是否已经存在
                db.collection('userInformation').where({
                  _openid: res.result.openid
                })
                .get({
                  success: res => {
                    console.log('_openid has >>>', res)
                    if(res.data.length == 0)
                    {
                        // 将用户信息存入数据库
                        db.collection('userInformation').add({
                          data: {
                            avatarUrl: e.detail.userInfo.avatarUrl,
                            city: e.detail.userInfo.city,
                            country: e.detail.userInfo.country,
                            gender: e.detail.userInfo.gender,
                            language: e.detail.userInfo.language,
                            nickName: e.detail.userInfo.nickName,
                            province: e.detail.userInfo.province
                          }
                        }).then(res => {
                          if(e.detail.userInfo){
                            wx.hideLoading()
                            // 成功后跳转到主页
                            wx.switchTab({
                              url: '../news/news',
                            })
                          }
                        }).catch(console.error)
                    }else{
                      wx.hideLoading()
                      // 成功后跳转到主页
                      wx.switchTab({
                        url: '../news/news',
                      })
                    }
                  }
                })
              },
              fail: err => {
                console.error('[云函数] [login] 调用失败', err)
                wx.navigateTo({
                  url: '../deployFunctions/deployFunctions',
                })
              }
            })
        }
      }
    })

  },

  /**
   * 页面的输入框的样式改变
   */
  onFocusPsd: function () {
    this.setData({
      psdFocus: 'psdFocus'
    })
  },
  onBlurPsd: function () {
    this.setData({
      psdFocus: ''
    })
  },
  onFocusName: function () {
    this.setData({
      nameFocus: 'nameFocus'
    })
  },
  onBlurName: function () {
    this.setData({
      nameFocus: ''
    })
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})