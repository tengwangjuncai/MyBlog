<template>
  <div class="home">
    <div v-bind:class="[isLittleScreen ? 'TopButton' : 'home_more']">
      <div class="TopButton_action" @click="showMenu">
        <img class="TopButton_icon" :src="BtnIcon" />
      </div>
    </div>
    <div v-bind:class="[(isMenuShow && isLittleScreen) ? 'TopMenu' : 'home_more']">
      <hr class="TopMenu_line"/>
      <!--.hr1{ height:1px;border:none;border-top:1px solid #000;}-->
      <!--<div class="TopMenu_line"></div>-->
      <div class="TopMenu_list" v-for="(item,index) in list">
        <div class="TopMenu_cell" @click="goDetail(index)">{{item}}</div>
      </div>
      <div class="TopMenu_contact">
        <img class="homeLeft_page" :src="item" v-for="item in contacts"/>
      </div>
    </div>
    <div v-bind:class="[{homeLeft_row:leftRow && !isLittleScreen},
    {homeLeft:!leftRow},{homeTop:(isLittleScreen && leftRow)}]">
      <!--<img class="homeLeft_bg" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1543816741060&di=d9bfdad227b4c345741f4a42a56b6131&imgtype=0&src=http%3A%2F%2Fpic117.nipic.com%2Ffile%2F20161208%2F24443431_165032871926_2.jpg"/>-->
      <div v-bind:class="[{homeLeft_mask_row:leftRow && !isLittleScreen},{homeLeft_mask:!leftRow},{homeTop_mask:(isLittleScreen && leftRow)}]"></div>
      <div v-bind:class="[(isLittleScreen && leftRow) ? 'homeTop_content' : 'homeLeft_content']">
        <img class="homeLeft_icon" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1543816682771&di=f44eee8cfbbfa7405e1b37f93c15d4a8&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201211%2F11%2F20121111152729_vLh8t.thumb.700_0.jpeg"/>
        <div class="homeLeft_name">Juncai's Den</div>
        <div class="homeLeft_sign">浮世万千，吾爱有三</div>
        <div v-bind:class="[(isLittleScreen && leftRow) ? 'home_more' : '']">
          <div class="homeLeft_line"></div>
          <div class="homeLeft_introduce" v-html="desc">{{desc}}</div>
          <div v-bind:class="[isLittleScreen ? 'home_List' : '']">
            <div class="homeLeft_pageList">
              <div class="homeLeft_pageItem" @click="goDetail(index)" v-for="(item,index) in list">{{item}}</div>
            </div>
            <div class="homeLeft_contactPages">
              <img class="homeLeft_page" :src="item" v-for="item in contacts"></img>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-bind:class="[(isLittleScreen && leftRow) ? 'homeBottom' : 'homeRight']">
      <div class="">
          <router-view></router-view>
        <!--<div class="" v-for="item in pageList">-->
          <!--<h2 class="homeRight_title">{{item.title}}</h2>-->
          <!--<p class="homeRight_desc">{{item.desc}}</p>-->
          <!--<div class="homeRight_container">-->
            <!--<div class="homeRight_date">{{item.date}}</div>-->
            <!--<div class="homeRight_action" @click="goPageDetail(item)"> 继续阅读</div>-->
          <!--</div>-->
        <!--</div>-->
      </div>
    </div>



  </div>
</template>

<script>
    export default {
        name: "HomeView",
        data() {
            return {
                leftRow:false,//是否左右分屏显示   根据屏幕宽度看是否分屏
                isLittleScreen:false,//小屏模式显示 与 leftRow  相对
                isMenuShow:false,
                desc: '嗨，我是xxx  (@twjuncai)  一名ios开发者 \n 正在探索创意之源',
                list:['博客','简历','工具'],

                contacts:[require('../../src/assets/footer_weibo.png'),require('../../src/assets/github.png'),require('../../src/assets/Group.png'),require('../../src/assets/youxiang.png')],
                pageList:[{title:'关于 Swift defer 的正确使用',desc:'其实这篇文章的缘起是由于在对 Kingfisher 做重构的时候，因为自己对 defer 的理解不够准确，导致了一个 bug。所以想藉由这篇文章探索一下 defer 这个关键字的一些 edge case。典型用法Swift 里的 defer 大家应该都很熟悉了，defer 所声明的 block 会在当前代码执行退出后被调用。正因为它提供了一种延时调用的方式，所以一般会被用来做资源释放或者销毁，这在某个函数有多个返回出口的时候特别有用。比如下面的通过 FileHandle 打开文件进行操作的...…',date:'2018-12-02'}, {title:'十年前的日记们',desc:'假如我有时光机最近把工作上的事情忙完了，也把主机从美国换到了日本的机房，解决了国内的访问问题，所以准备开始好好重新拾掇一下，恢复定期更新 blog。其实我从大学时就有开始写 blog 的习惯了。不过不像最近的独立博客，那时候更多地是用新浪或者搜狐这样的平台，所以也就在那些地方也留下了不少“足迹”。既然是自己“存在过的证明”，我想可能还是把它们汇总一下，留个存档为好。于是就有了这篇和“技术”没什么关系的文章。这里面是我从 2006 年底到 2010 年三月期间的一些碎碎念，时间跨越从大二上半...…',date:'2018-12-02'},
                    {title:'开发者所需要知道的 WWDC 2018 新特性',desc:'一直阅读我的博客的朋友可能知道，我在每年 WWDC 之后都会写 (水) 一篇关于新 SDK 和开发工具的文章。之前这个系列叫做《开发者所需要知道的 iOS SDK 新特性》，但是最近虽然 Craig 嘴上说着不要，身体却很诚实地将 iOS 和 macOS 带到一起，所以今年我觉得可以改一改题目，就总览一下作为 Apple 生态圈的开发者，在今年 WWDC 上我个人的一些观察，以及可能应该注意的有趣的地方。在会前，Apple 就已经放出消息要放慢增加新功能的脚步，转而提升软件稳定性和可靠性。...…',date:'2018-12-02'}],

                PageListPath:'PageList',
                width:document.body.clientWidth,

                normalIcon:require('../../src/assets/menu.png'),
                selectIcon:require('../../src/assets/up.png'),
                BtnIcon:'',
            }
        },
        methods:{
            goDetail(index){
                if (index == 0){
                    if(!this.leftRow){
                        this.leftRow = true;
                        sessionStorage.setItem('leftrow',this.leftRow);
                    }

                    if (this.isLittleScreen){
                        this.showMenu();
                    }
                } else if (index == 1){

                    let route = this.$router.resolve({
                        // name:'Resume',
                        path:'/Resume',
                        query:{},
                    });

                    window.open(route.href,'_blank');

                }else  if (index == 2){

                }
            },
            showMenu(){

                if(this.BtnIcon == this.normalIcon){
                    this.BtnIcon = this.selectIcon;
                    this.isMenuShow = true;
                }else {
                    this.BtnIcon = this.normalIcon;
                    this.isMenuShow = false;
                }
            }
        },


        mounted(){

            this.desc = this.desc.replace(/\n|\r\n/g, "<br/>");
            this.leftRow = sessionStorage.getItem('leftrow');
            this.BtnIcon = this.normalIcon;
            let _this = this;

            if(document.body.clientWidth < 930){
                _this.isLittleScreen = true
            }

            window.onresize = function () {

                let width = document.body.clientWidth;
                let height = document.body.scrollHeight;

                console.log('------' + width + '------' + height);

                if(width < 930){
                    _this.isLittleScreen = true
                    // this.$set(this,'isLittleScreen',true)
                    console.log('改了呀' + _this.isLittleScreen);
                }else {
                    _this.isLittleScreen = false
                }

            }

        }
    }
</script>

<style scoped>

  .home {
  
    /*清除浮动*/
    /*overflow: hidden;*/
    /*display: flex;*/
    height: 100%;
    width: 100%;
    /*background: darkgreen;*/
  }

  .TopButton{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 36px;
    z-index: 1000;
    background-color: #262626;
  }
  .TopButton_action{
    margin: 0 auto;
    width: 120px;
    height: 36px;
    align-content: center;

  }
  .TopButton_icon{
    margin: 8px 0;
    width: 20px;
    height: 20px;
    align-content: center;
  }
  .TopMenu{
    position: fixed;
    top: 36px;
    right: 0;
    left: 0;
    z-index: 999;
    /*height: 100px;*/
    /*background: darkgreen;*/
    background:rgba(38,38,38,0.97);/*#262626*/
  }

  .TopMenu_line{
    border: none;
    border-top: 1px solid #FAF0E6;
    /*background-color: ;*/
    height: 1px;
    width: 100%;
    opacity: 0.2;
  }
  .TopMenu_list{
    margin: 20px 10%;
  }
  .TopMenu_cell{
    border: 1px solid floralwhite;
    height: 40px;
    border-radius: 20px;
    width: 100%;
    margin: 2px 0;
    line-height: 40px;
    color: floralwhite;
  }

  .TopMenu_contact{
    margin: 30px 10%;
    display: flex;
    /*width: 80%;*/
    justify-content: space-around;
  }

  .TopMenu_contact_item{


  }
  .homeLeft{
    display: table;

    /*display: block;*/
    position: fixed;
    height: 100%;
    width: 100%;
    background-position: center center;
    z-index: 900;
    background: url("https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1543816741060&di=d9bfdad227b4c345741f4a42a56b6131&imgtype=0&src=http%3A%2F%2Fpic117.nipic.com%2Ffile%2F20161208%2F24443431_165032871926_2.jpg") center no-repeat #666666;
    background-size: cover;
  }

  .homeLeft_row{
    display: table;
    position: fixed;
    height: 100%;
    width: 30%;
    background-position: center center;
    background: url("https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1543816741060&di=d9bfdad227b4c345741f4a42a56b6131&imgtype=0&src=http%3A%2F%2Fpic117.nipic.com%2Ffile%2F20161208%2F24443431_165032871926_2.jpg") center no-repeat #666666;
    background-size: cover;
  }

   .homeLeft_mask{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
  }
  .homeLeft_mask_row{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    /*height:  100%;*/
    background: rgba(0, 0, 0, 0.5);
  }
  .homeLeft_icon{
    width: 70px;
    height: 70px;
    border-radius: 50%;
    border: 3px solid #FFF;
    box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.3);
  }
  .homeLeft_name{
    padding-top: 10px;
    color: #FFF;
    font-size:  32px;
    text-align: center;
    font-weight: lighter;
    -webkit-font-smoothing: antialiased;
  }
  .homeLeft_content{
    vertical-align: middle;
    position: relative;
    display: table-cell;
    margin: 0 auto;
    max-width: 620px;
    z-index: 800;
    padding: 60px 0;
    overflow: hidden;
  }
  .home_more{
    display: none;
  }

  .home_List{
    /*visibility: hidden;*/  /*占位置的隐藏*/
    display: none;   /*隐藏的同时 不占位置*/
  }


  .homeLeft_sign{
    font-family: "ff-tisa-web-pro-1", "ff-tisa-web-pro-2", "Lucida Grande", "Hiragino Sans GB", "Hiragino Sans GB W3", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;
    padding-top: 5px;
    color: #CCCCCC;
    font-size: 17px;
    letter-spacing: 3px;
    font-weight: lighter;
    -webkit-font-smoothing: antialiased;
  }
  .homeLeft_line{
    background-color: gray;
    height: 1px;
    width: 20%;
    margin: 10px auto;

    /*display: none;*/
  }

  .homeLeft_introduce{

    padding: 5px 10px;
    color:lightgray;
    line-height: 40px;

    /*display: none;*/
  }

  .homeLeft_pageList{
    display: flex;
    flex-direction:row;
    margin:0 auto;
    margin-top: 30px;
    /*width: 320px;*/
    justify-content: center;

    /*background-color: darkgreen;*/


    /*display: none;*/

  }
  .homeLeft_pageItem{
    color: lightgray;
    font-size: 13px;
    border-radius: 15px;
    width: 70px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border: 1px solid #CCCCCC;
    margin: 0 8px;
  }

  .homeLeft_contactPages{

    display: flex;
    flex-direction:row;
    margin:10px auto;
    margin-top: 30px;
    /*width: 400px;*/
    justify-content: center;


    /*display: none;*/
  }
  .homeLeft_page{
    height: 30px;
    width: 30px;
    margin: 0 8px;
    object-fit: cover;
    object-position: center;
  }


  .homeRight{
    flex: 1;
    position: fixed;
    left: 30%;
    top: 0;
    right: 0;
    bottom: 0;
    overflow-y: scroll;
    /*background-color: darkred;*/

  }

   .homeRight_title{
     text-align: left;
     font-family: "ff-tisa-web-pro-1", "ff-tisa-web-pro-2", "Lucida Grande", "Hiragino Sans GB", "Hiragino Sans GB W3", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;
     font-weight: lighter;
     color: #333333;
     -webkit-font-smoothing: antialiased;
     margin: 20px 0 10px;
   }

  .homeRight_desc{
    text-align: left;
    margin: 0;
    font-size: .9em;
    color: #999999;
  }

  .homeRight_container{
     display: flex;
     margin-top: 10px;
     /*background-color: darkgreen;*/
  }
  .homeRight_date {
    text-align: left;
    line-height: 20px;
    font-size: 14px;
    color: #c7c7c7;
  }
  .homeRight_action{
    margin-left: 20px;
    line-height: 20px;
    font-size: 14px;
    color: darkred;
  }

   /*-------------------------------------------*/



  .homeTop {

    height: auto;
    background-position: center center;
    width: 100%;

    background: url("https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1543816741060&di=d9bfdad227b4c345741f4a42a56b6131&imgtype=0&src=http%3A%2F%2Fpic117.nipic.com%2Ffile%2F20161208%2F24443431_165032871926_2.jpg") center no-repeat #666666;
    background-size: cover;
    vertical-align: baseline;

  }

  .homeTop_content{

    vertical-align: middle;
    overflow: hidden;
    position: relative;
    /*display: table-cell;*/  /*去掉table 的属性*/
    margin: 0 auto;
    max-width: 620px;
    z-index: 800;
    padding-top: 103px;
    padding-bottom: 30px;
  }

    .homeTop_mask{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 300px;
      background: rgba(0, 0, 0, 0.5);
    }

  .homeBottom{

    flex: 1;
    width: 100%;

  }


</style>
