// pages/home/home.js
import request from '../../utils/request'
import req from '../../utils/req'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfo:{},
    id:'',
    list:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id:wx.getStorageSync('id'),
      userinfo:wx.getStorageSync('userinfo')
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
  onShow: async function () {
    let va=await request(`/admin/plot/${this.data.id}`)
    let vb=await request(`/admin/userinfo/getById/${this.data.userinfo.id}`)
    this.setData({
      list:va.data,
      userinfo:vb.data
    })
    wx.setStorageSync('userinfo', this.data.userinfo)
  },
  click:async function(){
    this.setData({
      id:this.data.id+1
    })
    await request(`/admin/userinfo/update`,{
      id:this.data.userinfo.id,
      openid:this.data.userinfo.openid,
      achieve:this.data.userinfo.achieve,
      power:this.data.userinfo.power,
      social:this.data.userinfo.social,
      wit:this.data.userinfo.wit,
      now:this.data.id
    })
    this.onShow()
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