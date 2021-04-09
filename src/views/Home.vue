<template>
  <div class="page_index">
    <div class="w">
      <div class="content">

        <!-- 轮播图 -->
        <div class="slideshow">
          <van-swipe
            class="my-swipe"
            :autoplay="5000"
            indicator-color="white"
            :show-indicators=false
          >
            <van-swipe-item v-for="(item, index) in slideshowList.contentDOS" :key="index">
              <img :src="item.imgurl" alt="" class="swipeImg">
            </van-swipe-item>
          </van-swipe>
        </div>

        <!-- 最新动态 -->
        <div class="new_dynamic">
          <div class="module_top">
            <div class="module_top_title">
              <div class="module_top_title_icon">
                <img :src="newDynamicList.imgurl" alt="" class="module_top_title_icon_img">
              </div>
              <div class="module_top_title_font">{{newDynamicList.name}}</div>
            </div>
            <div class="module_top_more">
              <a :href="newDynamicList.url" target="_blank">查看更多>></a>
            </div>
          </div>
          <div class="dynamic_content">
            <div
              class="dynamic_content_list"
              v-for="(item, index) in newDynamicList.contentDOS"
              :key="index"
              @click="handleDynamicTo(item.url,index)"
            >
              <img :src="item.imgurl" alt="">
              <div class="dynamic_content_list_right">
                <div
                  class="dynamic_content_list_right_title"
                  :class="{dynamic_content_list_right_title_pitch: index <= 0}"
                >
                  {{item.title}}
                </div>
                <div class="dynamic_content_list_right_divider"></div>
                <div class="dynamic_content_list_right_particulars">{{item.subtitle}}</div>
              </div>
              <div
                class="dynamic_content_list_to"
                :class="{dynamic_content_list_to_pitch: index <= 0}"
              ></div>
            </div>
          </div>
        </div>

        <!-- 展会 -->
        <div class="trade_show">
          <div class="module_top">
            <div class="module_top_title">
              <div class="module_top_title_icon">
                <img :src="tradeShowList.imgurl" alt="" class="module_top_title_icon_img">
              </div>
              <div class="module_top_title_font">{{tradeShowList.name}}</div>
            </div>
<!--             <div class="module_top_more">
              <a :href="tradeShowList.url" target="_blank">查看更多>></a>
            </div>
 -->          </div>
          <div class="show_content">
            <div class="show_content_tab">
              <van-tabs
                v-model="active"
                title-active-color='#EB8C00'
                color='#EB8C00'
              >
                <van-tab
                  v-for="(item, index) in tradeShowList.contentDOS"
                  :key="index"
                  :title="item.title"
                  :title-class="{tabClass: active == index}"
                ></van-tab>
              </van-tabs>
            </div>
            <div class="show_content_list">
              <div
                v-for="(item, index) in tradeShowList.contentDOS"
                :key="index"
                class="show_content_list_box"
                :class="{show_content_list_handle_box: active==index}"
                @click="handleShowContentTo(item.url,index)"
              >
                <img :src="item.imgurl" alt="">
              </div>
            </div>
          </div>
        </div>

        <!-- 在线研讨会 -->
        <div class="online_meeting">
          <div class="module_top">
            <div class="module_top_title">
              <div class="module_top_title_icon">
                <img :src="onlineMeetingList.imgurl" alt="" class="module_top_title_icon_img">
              </div>
              <div class="module_top_title_font">{{onlineMeetingList.name}}</div>
            </div>
          </div>
          <div class="meeting_content">
            <div
              class="meeting_content_list"
              v-for="(item, index) in onlineMeetingList.contentDOS"
              :key="index"
              @click="handleOnlineMeetingTo(item.url,index)"
            >
              <img :src="item.imgurl" alt="">
              <div class="meeting_content_list_right">
                <div
                  class="meeting_content_list_right_title meeting_content_list_right_title_pitch"
                >
                  {{item.title}}
                </div>
                <div class="meeting_content_list_right_info">
                  <div class="meeting_content_list_right_info_left">
                    <div class="meeting_content_list_right_info_left_backer">主持人：{{item.host}}</div>
                    <div class="meeting_content_list_right_info_left_time">时间：{{item.time}}</div>
                  </div>
                  <div
                    class="meeting_content_list_right_info_right meeting_content_list_right_info_right_pitch"
                  >
                    <span>查看</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 在线大课堂 -->
        <div class="online_class">
          <div class="module_top">
            <div class="module_top_title">
              <div class="module_top_title_icon">
                <img :src="onlineClassList.imgurl" alt="" class="module_top_title_icon_img">
              </div>
              <span class="module_top_title_font">{{onlineClassList.name}}</span>
            </div>
            <div class="module_top_more">
              <a :href="onlineClassList.url" target="_blank">查看更多>></a>
            </div>
          </div>
          <div class="class_content">
            <div
              class="class_content_list"
              v-for="(item, index) in onlineClassList.contentDOS"
              :key="index"
              @click="handleOnlineClassTo(item.url,index)"
            >
              <img :src="item.imgurl" alt="">
              <div class="class_content_list_right">
                <div class="class_content_list_right_left">
                  <div class="class_content_list_right_title" :class="{class_content_list_right_title_pitch: index <= 0}">{{item.title}}</div>
                  <!-- <div class="class_content_list_right_particulars">{{item.subtitle}}</div> -->
                </div>
                <div class="class_content_list_right_right" :class="{dynamic_content_list_to_pitch: index <= 0}"></div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
  
</template>

<script>

export default {
  data() {
    return {
      pitchDynamic: '',  /* 最新咨询中被点击的文章索引 */
      ptichMeeting: '',  /* 在线研讨会中被点击的文章索引 */
      ptichClass: '',    /* 在线大课堂中被点击的文章索引 */
      pitchSrc: require('@/assets/images/返回 拷贝 3@2x.png'),  /* 最新咨询中被点击的箭头图片路径 -- （不用了） */
      active: 1,  /* tabbar切换栏下标 */

      slideshowList: {},                /* 轮播图数据 */
      newDynamicList: {},                /* 最新动态数据 */
      tradeShowList: {},                  /* 展会数据 */
      onlineMeetingList: {},              /* 在线研讨会模块数据 */
      onlineClassList: {},                /* 在线大课堂模块数据 */

    };
  },
  created() {
      // 页面进来, 需要马上获取数据
      this.$axios({
          url: 'https://kaifatest.hemajia.net/fulwdml/reception/selectAll',
      }).then(res=>{
          console.log(res);
          let list = res.data.data
          list.forEach((item, index)=> {
            if (item.id === '1') {
              this.slideshowList = item
            } else if (item.id === '2') {
              this.newDynamicList = item
            } else if (item.id === '3') {
              this.tradeShowList = item
            } else if (item.id === '4') {
              this.onlineMeetingList = item
            } else if (item.id === '5') {
              this.onlineClassList = item
            }
          })
      })
  },
  methods: {
    
    // 点击最新动态文章列表
    handleDynamicTo(src, index) {
      this.pitchDynamic = index;
      setTimeout(() => {
        this.pitchDynamic = ''
      }, 1000);
      window.open(src, "_blank");
    },

    // 点击展会图片
    handleShowContentTo(src, index) {
      this.active = index;
      window.open(src, "_blank");
    },

    // 点击在线研讨会
    handleOnlineMeetingTo(src, index) {
      this.ptichMeeting = index;
      setTimeout(() => {
        this.ptichMeeting = ''
      }, 1000);
      window.open(src, "_blank");
    },

    // 点击在线大课堂
    handleOnlineClassTo(src, index) {
      this.ptichClass = index;
      setTimeout(() => {
        this.ptichClass = ''
      }, 1000);
      window.open(src, "_blank");
    },


  }
}
</script>

<style lang="less" scoped>

  .page_index {
    background: #EEEEEE;
  }
  .w {
    padding: 27/540 * 100vw 30/540 * 100vw;
  }


  .slideshow {
    width: 100%;
    height: 265/540 * 100vw;
    margin-bottom: 45/540 * 100vw;
    border-radius: 10/540 * 100vw;
    overflow: hidden;
    cursor: pointer;
  }
  .my-swipe {
    width: 480/540 * 100vw;
    height: 100%;
  }
  .my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 150px;
    text-align: center;
    background-color: #39a9ed;
  }
  .swipeImg {
    width: 480/540 * 100vw;
    height: 100%;
  }


  .new_dynamic {
    margin-bottom: 23/540 * 100vw;
  }
  .module_top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 22.5/540 * 100vw;
  }
  .module_top_title {
    display: flex;
    align-items: center;
  }
  .module_top_title_icon {
    width: 20.5/540 * 100vw;
    height: 20.5/540 * 100vw;
    margin-right: 12/540 * 100vw;
    border-radius: 50%;
    overflow: hidden;
  }
  .module_top_title_icon_img {
    width: 20.5/540 * 100vw;
    height: 20.5/540 * 100vw;
  }
  .module_top_title_font {
    font-size: 18/540 * 100vw;
    font-family: Source Han Sans CN;
    font-weight: bold;
    color: #EB8C00;
    letter-spacing: 1/540 * 100vw;
  }
  .module_top_more {
    font-size: 15/540 * 100vw;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: #8E8E8E;
  }
  .dynamic_content {
    border-radius: 10/540 * 100vw;
    overflow: hidden;
    cursor: pointer;
  }
  .dynamic_content_list {
    display: flex;
    position: relative;
    background: #fff;
    padding: 22/540 * 100vw;
    margin-bottom: 1px;
  }
  .dynamic_content_list img {
    width: 122/540 * 100vw;
    height: 95/540 * 100vw;
  }
  .dynamic_content_list_right {
    margin-left: 23/540 * 100vw;
  }
  .dynamic_content_list_right_title {
    width: 260/540 * 100vw;
    height: 40/540 * 100vw;
    padding-top: 6/540 * 100vw;
    font-size: 18/540 * 100vw;
    font-family: Source Han Sans CN;
    font-weight: 400;
    line-height: 21/540 * 100vw;
    text-align: justify;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    word-break: break-all;
  }
  .dynamic_content_list_right_title_pitch {
    color: #EB8C00;
  }
  .dynamic_content_list_right_divider {
    margin: 8/540 * 100vw 0 4/540 * 100vw;;
    width: 248/540 * 100vw;
    height: 4/540 * 100vw;
    background: url('../assets/images/分割.png') no-repeat;
    background-size: 100%;
  }
  .dynamic_content_list_right_particulars {
      font-size: 15/540 * 100vw;
      font-family: Source Han Sans CN;
      color: #8E8E8E;
      line-height: 19/540 * 100vw;
      text-align: justify; /* 末尾对齐 */
      width: 260/540 * 100vw;
      height: 40/540 * 100vw;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      word-break: break-all;
  }
  .dynamic_content_list_to {
    position: absolute;
    right: 13.5/540 * 100vw;
    bottom: 20.5/540 * 100vw;
    width: 23.5/540 * 100vw;
    height: 24.5/540 * 100vw;
    background: url('../assets/images/返回 拷贝 3@2x.png') no-repeat;
    background-size: 100%;
  }
  .dynamic_content_list_to_pitch {
    background: url('../assets/images/返回@2x.png') no-repeat;
    background-size: 100%;
  }

  .trade_show {
    margin-bottom: 23/540 * 100vw;
  }
  .show_top_title_icon {
    width: 20.5/540 * 100vw;
    height: 20.5/540 * 100vw;
    background: url('../assets/images/在线展会@2x.png') no-repeat;
    background-size: 20.5/540 * 100vw;
    margin-right: 12/540 * 100vw;
  }
  .show_content {
    background: #fff;
    border-radius: 10/540 * 100vw;
    overflow: hidden;
  }
  .show_content_tab {
    padding-top: 18/540 * 100vw;
  }
  .show_content_list {
    height: 216.5/540 * 100vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 37/540 * 100vw 13/540 * 100vw 41/540 * 100vw;
  }
  .show_content_list_box {
    width: 128.5/540 * 100vw;
    height: 170/540 * 100vw;
    cursor: pointer;
    border-radius: 10/540 * 100vw;
    overflow: hidden;
  }
  .show_content_list_box img {
    width: 128.5/540 * 100vw;
    height: 170/540 * 100vw;
  }
  .show_content_list_handle_box {
    width: 164/540 * 100vw;
    height: 216.5/540 * 100vw;
  }
  .show_content_list_handle_box img {
    width: 164/540 * 100vw;
    height: 216.5/540 * 100vw;
  }
  .van-tabs--line /deep/ .van-tabs__wrap {
    height: 36.5/540 * 100vw;
  }
  /deep/ .van-tab {
    font-size: 15/540 * 100vw;
    font-family: Source Han Sans CN;
  }
  /deep/ .van-tabs__line {
    width: 60/540 * 100vw;
  }
  /deep/ .tabClass {
    font-size: 18/540 * 100vw;
  }
  /deep/ .van-tab__text--ellipsis {
    overflow: visible;
  }


  .online_meeting {
    margin-bottom: 23/540 * 100vw;
  }
  .meeting_top_title_icon {
    width: 20.5/540 * 100vw;
    height: 20.5/540 * 100vw;
    background: url('../assets/images/课堂@2x.png') no-repeat;
    background-size: 20.5/540 * 100vw;
    margin-right: 12/540 * 100vw;
  }
  .meeting_content_list {
    display: flex;
    position: relative;
    background: #fff;
    margin-bottom: 25.5/540 * 100vw;
    border-radius: 5/540 * 100vw;
    cursor: pointer;
  }
  .meeting_content_list img {
    width: 211.5/540 * 100vw;
    height: 152.5/540 * 100vw;
  }
  .meeting_content_list_right {
    width: 268.3/540 * 100vw;
    padding: 15/540 * 100vw 21/540 * 100vw 15/540 * 100vw 15.5/540 * 100vw;
  }
  .meeting_content_list_right_title {
    height: 56/540 * 100vw;
    font-size: 18/540 * 100vw;
    font-family: Source Han Sans CN;
    line-height: 30/540 * 100vw;
    margin-bottom: 18/540 * 100vw;
    text-align: justify;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    word-break: break-all;
  }
  .meeting_content_list_right_title_pitch {
    color: #EB8C00;
  }
  .meeting_content_list_right_info {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }
  .meeting_content_list_right_info_left {
    font-size: 14/540 * 100vw;
    color: #8E8E8E;
    font-family: Source Han Sans CN;
  }
  .meeting_content_list_right_info_left_time {
    margin-left: 1/540 * 100vw;
  }
  .meeting_content_list_right_info_right {
    width: 57.3/540 * 100vw;
    height: 28.65/540 * 100vw;
    line-height: 28.65/540 * 100vw;
    text-align: center;
    border-radius: 10/540 * 100vw;
    background: #8E8E8E;
    color: #fff;
    font-size: 15/540 * 100vw;
  }
  .meeting_content_list_right_info_right_pitch {
    background: #EB8C00;
  }
  .meeting_content_list_right_info_right span {
    display: inline-block;
  }


  .class_content {
    border-radius: 10/540 * 100vw;
    overflow: hidden;
  }
  .class_top_title_icon {
    width: 20.5/540 * 100vw;
    height: 20.5/540 * 100vw;
    background: url('../assets/images/课堂.png') no-repeat;
    background-size: 20.5/540 * 100vw;
    margin-right: 12/540 * 100vw;
  }
  .class_content_list {
    display: flex;
    position: relative;
    background: #fff;
    padding: 22/540 * 100vw;
    margin-bottom: 1px;
    cursor: pointer;
  }
  .class_content_list img {
    width: 116/540 * 100vw;
    height: 116/540 * 100vw;
    border-radius: 50%;
    border: 3/540 * 100vw solid #EB8C00;
    box-sizing: border-box;
  }
  .class_content_list_right {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-left: 38.5/540 * 100vw;
  }
  .class_content_list_right_title {
    width: 200/540 * 100vw;
    font-size: 18/540 * 100vw;
    font-family: Source Han Sans CN;
    line-height: 21/540 * 100vw;
    text-align: justify;
    word-break: break-all;
  }
  .class_content_list_right_title_pitch {
    color: #EB8C00;
  }
  .class_content_list_right_particulars {
    font-size: 15/540 * 100vw;
    font-family: Source Han Sans CN;
    color: #8E8E8E;
    line-height: 19/540 * 100vw;
    text-align: justify; /* 末尾对齐 */
    margin-top: 11/540 * 100vw;
    width: 230/540 * 100vw;
    height: 19/540 * 100vw;
  }
  .class_content_list_right_right {
    width: 23.5/540 * 100vw;
    height: 24.5/540 * 100vw;
    background: url('../assets/images/返回 拷贝 3@2x.png') no-repeat;
    background-size: 100%;
    margin-left: 60/540 * 100vw;
  }
  .dynamic_content_list_to_pitch {
    background: url('../assets/images/返回@2x.png') no-repeat;
    background-size: 100%;
  }

</style>
