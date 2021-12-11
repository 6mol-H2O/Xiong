// pages/play_piano/play_piano.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    styles : ["" , "" , "","","","","","","","","",""],
    play : [[0,3,4,5,6],[2,3,4,5,6],[2,3,4,5]],
    action : undefined,
    index : 0,
    column : 0,
    record : [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  action:function(e)
  {
    let black = [1,3,6,8,10],  data = parseInt(e.currentTarget.dataset.id)
    let color = '#666'
    if(black.indexOf(data) != -1)
      {
        if(this.data.styles[data].search("color") != -1)
          {
            let tmp = this.data.styles[data].split('#')
            this.data.styles[data] = tmp[0]
            this.data.styles[data] += '#fff;'
            
          }
        else
          this.data.styles[data] += 'background-color: ' +'#fff;'
      }
    else{
      color = '#eee'
      if(this.data.styles[data].search("color") != -1)
          {
            let tmp = this.data.styles[data].split('#')
            this.data.styles[data] = tmp[0]
            this.data.styles[data] += '#111;'
          }
        else
          this.data.styles[data] += 'background-color: ' +'#111;'
    }
    this.setData({
     styles : this.data.styles
    })
    let a = new Promise((resoive,reject)=>{
      setTimeout((color , id ,that) => {
        that.data.styles[id] = that.data.styles[id].split('#')[0]
        that.data.styles[id] += color
        that.setData({
          styles : that.data.styles
        })
        resoive(id)
      } ,255, color,data , this);
    })
    a.then(result =>{
      if (this.data.action == 'action')
        {
          console.log(result)
          this.data.record.push(result)
          console.log(this.data.record)
          if(this.data.record.length == this.data.play[this.data.column].length)
        {
          let flag = true
          for(let i = 0 ; i < this.data.record.length ; ++i)
            {
              flag = flag && (this.data.record[i] == this.data.play[this.data.column][i])
              console.log(this.data.record[i] == this.data.play[this.data.column][i])
            }
          if(flag)
            {
              wx.showToast({
                title: '弹奏正确',
                icon : 'success',
                duration : 1000
              })
              this.data.record = []
              this.data.column += 1
              this.data.column %= this.data.play.length
              this.data.index = 0
              if(this.data.column)
              {
                this.setData({
                  action : null
                })
                setTimeout(() => {
                this.play()
              }, 2000);
            }
            }
          else
            {
              this.data.record = []
              this.data.index = 0
              this.setData({
                action : null
              })
              wx.showToast({
                title: '弹奏错误',
                icon : 'error',
                duration : 1000
              })
              setTimeout(() => {
                this.play()
              }, 2000);
            }
          }
        }
    })
  },
  play : function()
  {
    var that = this
    this.data.interver = setInterval(()=>{
    let data = {"currentTarget" : {"dataset" : {'id' : this.data.play[this.data.column][this.data.index % this.data.play[this.data.column].length]}}}
    ++this.data.index
    that.action(data)
    if(that.data.index % this.data.play[this.data.column].length == 0 && that.data.index)
        that.over()
    },400)
  },
  over : function(){
    //this.data.rotate = false;
    this.data.interver = clearInterval(this.data.interver)
    this.setData({
      interver : this.data.interver,
  })
  setTimeout(() => {
      this.setData({
        action : 'action'
      })
  }, 400);
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log(this.data.styles.length)
    for(let i = 0 ; i < this.data.styles.length ; ++i)
    {
      console.log(this.getPosition(i))
      this.data.styles[i] += "left : " + this.getPosition(i).toString() +'rpx;'+'display:block;'
    }
    this.setData({
      styles : this.data.styles
    })
    this.play()
  }, // 83 55

    getPosition : function (noteNumber){
    let OFFSET = [0,55,85,140,169, 253,306,336,391,419,474,500]
		var left = 0;
		var offset = (noteNumber % 12);
		var octave = Math.floor((noteNumber) / 12);
		left = OFFSET[offset];
    left = left + (octave * 500) + 80;
		return left;
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