// index.js
// 获取应用实例
const app = getApp()
import req from '../../utils/req'
import request from '../../utils/request'
Page({
  data: {
    list:{},
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') // 如需尝试获取用户信息可改为false
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  newgame:async function(){
    await request(`/user/userinfo/update/`,{
      id:this.data.list.id,
      openid:this.data.list.openid,
      achieve:this.data.list.achieve,
      power:this.data.list.power,
      social:this.data.list.social,
      wit:this.data.list.wit,
      now:1
    })
    wx.setStorageSync('id', 1)
    wx.navigateTo({
      url: '/pages/home/home',
    })
  },
  continue(){
    wx.setStorageSync('id', this.data.list.now)
    wx.navigateTo({
      url: '/pages/home/home',
    })
  },
  onShow: async function(){
    console.log('begin')
    wx.login({
      success (res) {
        if (res.code) {
          console.log(res)
          //发起网络请求
          wx.request({
            url: 'http://localhost:8201/admin/userinfo/login',
            data: {
              code: res.code
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
    let va=await req(`/user/userinfo/sign`)
    console.log(va)
    this.setData({
      list:va.data
    })
    wx.setStorageSync('userinfo',this.data.list)
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
