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
            <van-swipe-item v-for="(item, index) in 4" :key="index">
              <img src="@/assets/images/16x9-2021-38ok原文件@2x.png" alt="" class="swipeImg">
            </van-swipe-item>
          </van-swipe>
        </div>

        <!-- 最新咨询 -->
        <div class="new_dynamic">
          <div class="module_top">
            <div class="module_top_title">
              <div class="module_top_title_icon"></div>
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
                  :class="{dynamic_content_list_right_title_pitch: pitchDynamic === index}"
                >
                  {{item.title}}
                </div>
                <div class="dynamic_content_list_right_divider"></div>
                <div class="dynamic_content_list_right_particulars"><div>{{item.subtitle}}</div></div>
              </div>
              <div
                class="dynamic_content_list_to"
                :class="{dynamic_content_list_to_pitch: pitchDynamic === index}"
              ></div>
            </div>
          </div>
        </div>

        <!-- 展会 -->
        <div class="trade_show">
          <div class="module_top">
            <div class="module_top_title">
              <div class="show_top_title_icon"></div>
              <div class="module_top_title_font">{{tradeShowList.name}}</div>
            </div>
            <div class="module_top_more">
              <a :href="tradeShowList.url" target="_blank">查看更多>></a>
            </div>
          </div>
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
              <div class="meeting_top_title_icon"></div>
              <div class="module_top_title_font">在线研讨会</div>
            </div>
          </div>
          <div class="meeting_content">
            <div
              class="meeting_content_list"
              v-for="(item, index) in 5"
              :key="index"
            >
              <img src="@/assets/images/u=3281973023,1261252532&fm=26&gp=0@2x.png" alt="">
              <div class="meeting_content_list_right">
                <div class="meeting_content_list_right_title">在线研讨会 各路大神教你怎么做</div>
                <div class="meeting_content_list_right_info">
                  <div class="meeting_content_list_right_info_left">
                    <div class="meeting_content_list_right_info_left_backer">主持人：阿呆</div>
                    <div class="meeting_content_list_right_info_left_time">时间：2021-03-04</div>
                  </div>
                  <div class="meeting_content_list_right_info_right">
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
              <div class="class_top_title_icon"></div>
              <span class="module_top_title_font">在线大课堂</span>
            </div>
            <div class="module_top_more">
              <a href="" target="_blank">查看更多>></a>
            </div>
          </div>
          <div class="class_content">
            <div
              class="class_content_list"
              v-for="(item, index) in 3"
              :key="index"
            >
              <img src="@/assets/images/uid5270b1592184016427@2x.png" alt="">
              <div class="class_content_list_right">
                <div class="class_content_list_right_left">
                  <div class="class_content_list_right_title">魏德米勒OMNIMATE®总线连接解决方案</div>
                  <div class="class_content_list_right_particulars"><div>模块化和定制的解决方案</div></div>
                </div>
                <div class="class_content_list_right_right"></div>
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
      pitchSrc: require('@/assets/images/返回 拷贝 3@2x.png'),  /* 最新咨询中被点击的箭头图片路径 -- （不用了） */
      active: 1,  /* tabbar切换栏下标 */


      slideshowList: {},  /* 轮播图数据 */
      newDynamicList: {},  /* 最新动态模块数据 */
      tradeShowList: {},  /* 展会模块数据 */
      onlineMeetingList: {},  /* 在线研讨会模块数据 */
      onlineClassList: {},  /* 在线大课堂模块数据 */

    };
  },
  created() {
      // 页面进来, 需要马上获取数据
      this.$axios({
          url: 'http://192.168.3.162:4399/wdml/reception/selectAll',
      }).then(res=>{
          console.log(res.data.data);
          let list = res.data.data
          list.forEach((item, index)=> {
            if (item.type === '1') {
              this.slideshowList = item
            } else if (item.type === '2') {
              this.newDynamicList = item
            } else if (item.type === '3') {
              this.tradeShowList = item
            }
          })
      })
  },
  watch: {
    active(a, b) {
      console.log(a, b)
    }
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
    height: 265/540 * 100vw;
    margin-bottom: 45/540 * 100vw;
    border-radius: 10/540 * 100vw;
    overflow: hidden;
    cursor: pointer;
  }
  .my-swipe {
    width: 100%;
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
    width: 100%;
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
    background: url('../assets/images/动态@2x.png') no-repeat;
    background-size: 20.5/540 * 100vw;
    margin-right: 12/540 * 100vw;
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
      width: 197/540 * 100vw;
      margin-bottom: 11/540 * 100vw;
      font-size: 18/540 * 100vw;
      font-family: Source Han Sans CN;
      font-weight: 400;
      line-height: 21/540 * 100vw;
      text-align: justify;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      word-break: break-all;
  }
  .dynamic_content_list_right_title_pitch {
    color: #EB8C00;
  }
  .dynamic_content_list_right_divider {
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
      padding-top: 10/540 * 100vw;
  }
  .dynamic_content_list_right_particulars div{
    width: 300.5/540 * 100vw;
    overflow: hidden;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    word-break: break-all;
    -webkit-transform:scale(0.8);
    margin-left: -30/540 * 100vw;
  }
  .dynamic_content_list_to {
    position: absolute;
    right: 13.5/540 * 100vw;
    bottom: 13.5/540 * 100vw;
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
  }
  .show_content_list_box img {
    width: 100%;
    height: 100%;
  }
  .show_content_list_handle_box {
    width: 164/540 * 100vw;
    height: 216.5/540 * 100vw;
  }
  .show_content_list_handle_box img {
    width: 100%;
    height: 100%;
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
    font-size: 20/540 * 100vw;
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
    align-items: center;
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
    padding: 15/540 * 100vw 21/540 * 100vw 15/540 * 100vw 15.5/540 * 100vw;
  }
  .meeting_content_list_right_title {
    height: 56/540 * 100vw;
    font-size: 18/540 * 100vw;
    font-family: Source Han Sans CN;
    color: #EB8C00;
    line-height: 30/540 * 100vw;
    margin-bottom: 18/540 * 100vw;
    text-align: justify;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    word-break: break-all;
  }
  .meeting_content_list_right_info {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }
  .meeting_content_list_right_info_left {
    font-size: 14/540 * 100vw;
    color: #8E8E8E;
  }
  .meeting_content_list_right_info_left_backer {
    -webkit-transform:scale(0.8);
    margin-left: -14/540 * 100vw;
    font-family: Source Han Sans CN;
  }
  .meeting_content_list_right_info_left_time {
    -webkit-transform:scale(0.8);
    margin-left: -14/540 * 100vw;
    font-family: Source Han Sans CN;
  }
  .meeting_content_list_right_info_right {
    width: 57.3/540 * 100vw;
    height: 28.65/540 * 100vw;
    line-height: 28.65/540 * 100vw;
    text-align: center;
    border-radius: 10/540 * 100vw;
    background: #EB8C00;
    color: #fff;
    font-size: 15/540 * 100vw;
  }
  .meeting_content_list_right_info_right span {
    display: inline-block;
    -webkit-transform:scale(0.9);
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
    align-items: center;
    background: #fff;
    padding: 22/540 * 100vw;
    margin-bottom: 1px;
    cursor: pointer;
  }
  .class_content_list img {
    width: 115.5/540 * 100vw;
    height: 116/540 * 100vw;
    border-radius: 50%;
  }
  .class_content_list_right {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-left: 38.5/540 * 100vw;
  }
  .class_content_list_right_title {
    width: 209/540 * 100vw;
    font-size: 18/540 * 100vw;
    font-family: Source Han Sans CN;
    color: #EB8C00;
    line-height: 21/540 * 100vw;
    text-align: justify;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    word-break: break-all;
  }
  .class_content_list_right_particulars {
    font-size: 15/540 * 100vw;
    font-family: Source Han Sans CN;
    color: #8E8E8E;
    line-height: 19/540 * 100vw;
    text-align: justify; /* 末尾对齐 */
    margin-top: 11/540 * 100vw;
  }
  .class_content_list_right_particulars div{
    width: 300.5/540 * 100vw;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    word-break: break-all;
    -webkit-transform:scale(0.7);
    margin-left: -45/540 * 100vw;
  }
  .class_content_list_right_right {
    width: 23.5/540 * 100vw;
    height: 24.5/540 * 100vw;
    background: url('../assets/images/返回 拷贝 3@2x.png') no-repeat;
    background-size: 100%;
  }
  .dynamic_content_list_to_pitch {
    background: url('../assets/images/返回@2x.png') no-repeat;
    background-size: 100%;
  }

</style>
