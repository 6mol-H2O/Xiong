// pages/play_ball/play_ball.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show : true,
    splice : 40,
    up : true,
    angle :undefined,
    move: " top : 70%;left : 30%;",
    animation :undefined,
    rotate:true,
    scale:true,
    interver: undefined,
    trail : null,
    index :0,
    tap : 'tap'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  animation:function(angle)
  {
  
    if(this.data.rotate)
    {
      this.data.animation = wx.createAnimation({
        delay: 0,
        duration:2000 / this.data.splice
      }).rotate(this.data.angle).step()
      this.setData({
        animation : this.data.animation.export()
      })
      if(this.data.up)
        this.data.angle -= 180 / (2000 / this.data.splice)
      else
        this.data.angle += 180 / (2000 / this.data.splice)
    }
    if(this.data.angle > 0)
      this.data.up = true
    if(this.data.angle < -180)
      this.data.up = false
  },
  onLoad: function (options) {
    var that = this
    this.data.angle =  -180 / (2000 / this.data.splice)
    this.data.interver = setInterval(()=>{
      that.animation()
    },2000 / this.data.splice * 1.1)
  },
  tap:function()
  {
    
    //this.data.rotate = false;
    
    if(this.data.rotate)
    {
      this.data.rotate = false
      this.data.interver = clearInterval(this.data.interver)
      this.setData({
        interver : this.data.interver,
        show : false
      })
      this.data.trail = this.toulan((this.data.angle + 90) * -1)
      this.data.interver = setInterval(() => {
        this.data.move =''
        this.data.move = "top:" + this.data.trail[this.data.index][1].toString() + '%;left:' + this.data.trail[this.data.index][0].toString() + '%;'
        ++this.data.index
        this.setData({
          move : this.data.move,
        })
        if(this.data.index == this.data.trail.length)
        {
          this.data.interver = clearInterval(this.data.interver)
          this.setData({
            tap : 'tap',
          })
          if(this.data.trail[this.data.index - 1][1].toString() < 100)
          {
            wx.showToast({
            title: '恭喜通关',
            icon : 'success',
            duration : 1000
          })
        }
        else
        {
          wx.showToast({
            title: '啊哦，失败了',
            icon : 'error',
            duration : 1000
          })
        }
      }
      }, 50);
      this.data.tap = null
      this.setData({
        tap : this.data.tap
      })
   }
   else
   this.reset()
  
  },
  reset:function(){
    this.setData({
      show : true,
      splice : 40,
      up : true,
      angle :undefined,
      move: "",
      animation :undefined,
      rotate:true,
      scale:true,
      interver: undefined,
      trail : null,
      index :0,
      tap : 'tap'
    })
    this.onLoad()
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

  },
  toulan: function( angle,begin_x = 30 , begin_y = 70 , end_x = 95 , end_y = 100 , target_x = 65 , target_y = 32,  begin_speed = 20 )
{
    let now_x = begin_x , now_y = begin_y , speed_x = begin_speed * Math.cos(angle * Math.PI / 180) , speed_y = -begin_speed * Math.sin(angle * Math.PI / 180)
    let points = [[30,70]] , time_step = 0.1 , g = 3 , get_score = false
    while(now_y <= 120)
    {
        now_x += speed_x * time_step
        now_y += speed_y * time_step + 0.5 * g * time_step ** 2
        if (now_x >= end_x)
        {
            now_x = 2 * end_x - now_x
            speed_x *= -1
        }
        if(now_x < 0)
            {
                now_x -= now_x
                speed_x *= -1
            }
        if(now_y < 0)
        {
            now_y = -now_y
            speed_y *= -1
        }
        speed_y += g*time_step
        points.push([now_x , now_y])
        if(target_x - 3 <= now_x &&  now_x <= target_x + 8 && now_y <= target_y + 3 && now_y >= target_y - 2 )
        {
            break;
        }
    }
    points[points.length-1][1] = Math.min(120,points[points.length-1][1])
    return points
}
})