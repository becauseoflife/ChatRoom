// miniprogram/pages/user/user.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('app globalData userInfo is:',app.globalData.userInfo)
    let that = this
    // 获取用户信息
    wx.getUserInfo({
      lang: 'zh_CN',
      success: res => {
        console.log('getUserInfo >>>', res.userInfo)
        let userInfo = res.userInfo
        let gender = '未知'
        if(userInfo.gender == 1) //性别 0：未知、1：男、2：女
        {
          gender = '男'
        }
        else
        {
          gender = '女'
        }
        // 绑定到界面中
        that.setData({
          avatarUrl: userInfo.avatarUrl,
          nickName: userInfo.nickName,
          gender: gender,
          province: userInfo.province,
          city: userInfo.city
        })
      }
    })
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