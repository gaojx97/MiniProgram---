const newsMap = {
  'gn': '国内',
  'gj': '国际',
  'yl': '娱乐',
  'js': '军事',
  'ty': '体育',
  'other': '其他',
  'cj': '财经'
}

const news = ['gn', 'gj', 'cj', 'yl', 'js', 'ty', 'other']


Page({

  /**
   * 页面的初始数据
   */
  data: {
    navigate: [],
    idx: 0,
  },

  /**
   * 选择新闻类型触发函数
   */
  onTapNewsType(ntype){
    let index = ntype.currentTarget.dataset.index;
    // console.log(index)
    this.setData({
      idx: index
    })
    this.getNewsList(index)
  },

  /**
   * API获取新闻列表
   */
  getNewsList(idx, callback){
    // console.log('getNewsList', news[idx])
    wx.request({
      url: 'https://test-miniprogram.com/api/news/list',
      data: {
        type: news[idx]
      },
      success: res => {
        let result = res.data.result
        // console.log(result)
        this.setData({
          newsList: result
        })
      },
      complete: () => {
        callback && callback()
      }
    })
  },

  /**
   * 点击新闻内容触发函数
   */
  onTapNewsContent(idc){
    let news_id = idc.currentTarget.id;
    // console.log(news_id)
    wx.navigateTo({
      url: '/pages/detail/detail?news_id=' + news_id,
    })  
  },

  /**
   * 设置导航栏内容
   */
  setNavigate() {
    let navigate = []
    for (let i = 0; i < 7; i += 1) {
      let title_en = news[i];
      navigate.push({
        type: newsMap[title_en],
      })
    }
    this.setData({
      navigate: navigate
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let index = this.data.idx
    this.setNavigate()
    this.getNewsList(index)
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
    let idx = this.data.idx
    this.getNewsList(idx, () => {
      wx.stopPullDownRefresh()
      })
    
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