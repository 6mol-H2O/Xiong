// pages/grid/grid.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    class : undefined,
    content:undefined,
    target_col : [[1],[2],[2],[1],[2],[2],[1],[1]],
    target_row : [[1],[2],[2],[1],[2],[2],[1],[1]] 
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
    console.log([[1,2,1],[1,2,1]].toString())
    this.data.class = []
    this.data.content = []
    for(let i = 0 ; i < 9 ; ++i)
      for(let j = 0 ; j < 9 ; ++j)
      {
        this.data.class.push('title')
        this.data.content.push("")
        if(i || j)
          {
              if(i && j)
                this.data.class[i * 9 + j] = 'error'
              else
                if(i == 0)
                  this.data.content[i * 9 + j]  = this.data.target_row[j - 1].toString().replace(',' , " ")
                else
                this.data.content[i * 9 + j]  = this.data.target_col[i - 1].toString().replace(',' , " ")
          }
      }
      this.setData({
        class : this.data.class,
        content : this.data.content
      })
  },
  check:function()
  {
    for(let i = 1 ; i < 9 ; ++i)
      {
        let count = 0, have = []
        
        for(let j = 1 ; j < 9 ; ++j)
      {
          if(this.data.class[i * 9 + j] == 'click')
            count += 1
           else if(count)
            {
              have.push(count)
              count = 0
            }
      }
      if(count)
        {
              have.push(count)
              count = 0
          }
      have.sort()
      console.log(have , this.data.target_row[i - 1])
      if(have.length != this.data.target_row[i - 1].length)
        return false
      for(let j = 0 ; j < have.length ; ++j)
        if(have[j] != this.data.target_row[i - 1][j])
          {
            return false
          }
    }
    console.log('row')
    for(let i = 1 ; i < 9 ; ++i)
      {
        let count = 0, have = []
        for(let j = 1 ; j < 9 ; ++j)
      {
          if(this.data.class[i  + j * 9] == 'click')
            count += 1
          else if(count)
            {
              have.push(count)
              count = 0
            }
      }
      if(count)
      {
            have.push(count)
            count = 0
      }
      have.sort()
      if(have.length != this.data.target_col[i - 1].length)
        return false
      for(let j = 0 ; j < have.length ; ++j)
        if(have[j] != this.data.target_col[i - 1][j])
          return false
    }
    return true
  },
  tap:function(e)
  {
    let id = parseInt(e.currentTarget.dataset.id), i =id % 9 , j = Math.floor(id / 9)
    if(i && j)
    {
      if(this.data.class[id] =='error')
        this.data.class[id] = 'click'
      else
        this.data.class[id] = 'error'
    }
    this.setData({
      class : this.data.class
    })
    if(this.check())
     wx.showToast({
       title: '恭喜成功',
       icon : 'success',
       duration : 1000
     })
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