<template>
  <div class="home" v-loading="isLoading">
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
        <div v-for="(item,index) in contacts" @click="goContact(index)">
          <img class="homeLeft_page" :src="item"/>
        </div>
      </div>
    </div>
    <div v-bind:class="[{homeLeft_row:leftRow && !isLittleScreen},
    {homeLeft:!leftRow},{homeTop:(isLittleScreen && leftRow)}]">
      <img v-bind:class="[{homeLeft_mask_row:leftRow && !isLittleScreen},{homeLeft_mask:!leftRow},{homeTop_mask:(isLittleScreen && leftRow)}]" :src="user.BgUrl ? user.BgUrl : defultBgImag"/>
      <div v-bind:class="[{homeLeft_mask_row:leftRow && !isLittleScreen},{homeLeft_mask:!leftRow},{homeTop_mask:(isLittleScreen && leftRow)}]"></div>
      <div v-bind:class="[(isLittleScreen && leftRow) ? 'homeTop_content' : 'homeLeft_content']">
        <img class="homeLeft_icon" :src="user.headimage ? user.headimage : defultHeadIcon"/>
        <div class="homeLeft_name">{{user.name}}'s Den</div>
        <div class="homeLeft_sign">{{user.mark ? user.mark : defultMark}}</div>
        <div v-bind:class="[(isLittleScreen && leftRow) ? 'home_more' : '']">
          <div class="homeLeft_line"></div>
          <div class="homeLeft_introduce" v-html="user.personInfo ? user.personInfo : defultInfo"></div>
          <div v-bind:class="[isLittleScreen ? 'home_List' : '']">
            <div class="homeLeft_pageList">
              <div class="homeLeft_pageItem" @click="goDetail(index)" v-for="(item,index) in list">{{item}}</div>
            </div>
            <div class="homeLeft_contactPages">
              <img class="homeLeft_page" :src="item" v-for="(item,index) in contacts" @click="goContact(index)"></img>
            </div>
            <div style="color: darkcyan;margin-top: 50px;font-size: 14px;cursor: pointer" @click="goSignUp">开启你的 Den >></div>

          </div>
        </div>
      </div>
    </div>

    <div v-if="leftRow" v-bind:class="[(isLittleScreen && leftRow) ? 'homeBottom' : 'homeRight']">
      <div class="">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<script>
    import {httpGet,httpPost} from '@/utils/app';
    export default {
        name: "HomeView",
        data() {
            return {

                mTabPosition: 0,
                isLogin:false,
                isShowLogin:true,
                leftRow:false,//是否左右分屏显示   根据屏幕宽度看是否分屏
                isLittleScreen:false,//小屏模式显示 与 leftRow  相对
                isMenuShow:false,
                desc: '嗨，我是xxx  (@twjuncai)  一名ios开发者 \n 正在探索创意之源',
                list:['博客','项目','简历'],
                contacts:[require('../../src/assets/footer_weibo.png'),require('../../src/assets/github.png'),require('../../src/assets/Group.png'),require('../../src/assets/youxiang.png')],
                PageListPath:'PageList',
                width:document.body.clientWidth,

                normalIcon:require('../../src/assets/menu.png'),
                selectIcon:require('../../src/assets/up.png'),

                defultHeadIcon:require('../assets/defultHeadIcon.jpg'),
                defultBgImag:require('../assets/horse.jpg'),
                defultMark:'例：不忘初心，方得始终',
                defultInfo:'快来简单的介绍一下自己吧（-_-）',

                BtnIcon:require('../../src/assets/menu.png'),

                user:{
                    name:'',
                    password:'',
                },

                userid:'',
                isLoading:false,
            }
        },
        methods:{

            goSignUp(){

                let route = this.$router.resolve({
                    path:'/Login',
                });

                window.open(route.href,'_blank');
            },
            goDetail(index){

                let userid = this.userid

                this.mTabPosition = index
                if (index == 0){
                    if(!this.leftRow){
                        this.leftRow = true;
                        sessionStorage.setItem('leftrow',this.leftRow);
                    }

                    if (this.isLittleScreen){
                        this.showMenu();
                    }

                    this.$router.replace({
                        path: '/home/PageList',
                        query:{userid:userid},
                    })
                } else if (index == 1){

                    if(!this.leftRow){
                        this.leftRow = true;
                        sessionStorage.setItem('leftrow',this.leftRow);
                    }

                    if (this.isLittleScreen){
                        this.showMenu();
                    }

                    this.$router.replace({
                        path: '/home/Project',
                        query:{userid:userid},
                    })

                }else  if (index == 2){

                    let route = this.$router.resolve({
                        path:'/Resume',
                        query:{userid:userid},
                    });

                    window.open(route.href,'_blank');
            }else if(index == 3){

                    let route = this.$router.resolve({
                        path:'/EditView',
                        query:{},
                    });
                    window.open(route.href,'_blank');
                    // this.$router.push({
                    //     path: '/EditView',
                    // })


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
            },

            goContact(index){
                if(index == 0){

                    let url = this.user.weiboUrl
                    window.open(url,'_blank');

                }else if(index == 1){
                    let url = this.user.gitUrl
                    window.open(url,'_blank');

                }else  if(index == 2){
                    let url = this.user.twitterUrl
                    window.open(url,'_blank');

                }else  if(index == 3){

                }
            },

            loadData(){


                let _this = this

                _this.isLoading = true

                let param = {id:_this.userid}

                httpPost('/user/userInfo',param).then(response => {

                    _this.isLoading = false

                    _this.user = response.data;

                    document.title = _this.user.name + '\'s Den'
                });
            },

        },


        mounted(){

            this.userid = this.$route.query.userid

            let path = window.location.href
            console.log(path)
            if (!this.userid){
               if (path.endsWith('Juncai')){

                   this.userid = '1aff5690-4709-11e9-a4c6-cb0e7c6146e0'
               } else if(path.endsWith('xiaoqiang')){

                   this.userid = '616df2e0-ddb7-11e9-a795-7576b15274fc'
               }

            }
            console.error('======' + this.userid)

            let name = this.$route.query.name
            if (name){
                document.title = name + '\'s Den'
            }

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

            this.loadData()

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
    z-index: 2147483647;
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

    /*z-index: 900;*/
    /*background: url("https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1543816741060&di=d9bfdad227b4c345741f4a42a56b6131&imgtype=0&src=http%3A%2F%2Fpic117.nipic.com%2Ffile%2F20161208%2F24443431_165032871926_2.jpg") center no-repeat #666666;*/
    /*background-size: cover;*/
    /*background-position: center center;*/
  }

  .homeLeft_row{
    display: table;
    position: fixed;
    height: 100%;
    width: 30%;
    /*background-position: center center;*/
    /*background: url("https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1543816741060&di=d9bfdad227b4c345741f4a42a56b6131&imgtype=0&src=http%3A%2F%2Fpic117.nipic.com%2Ffile%2F20161208%2F24443431_165032871926_2.jpg") center no-repeat #666666;*/
    /*background-size: cover;*/
  }

   .homeLeft_mask{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
     background: rgba(47, 32, 77, 0.8);
     object-fit: cover;
     object-position: center center;
  }
  .homeLeft_mask_row{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    /*height:  100%;*/
    background: rgba(47, 32, 77, 0.8);
    object-fit: cover;
    object-position: center center;
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

    padding: 5px 30px;
    color:lightgray;
    line-height: 40px;

    /*display: none;*/
  }

  .homeLeft_login{
    display: flex;
    margin: 30px auto;
    justify-content: center;
    font-family: "ff-tisa-web-pro-1", "ff-tisa-web-pro-2", "Lucida Grande", "Hiragino Sans GB", "Hiragino Sans GB W3", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;
    color: #CCCCCC;
    font-size: 14px;
    font-weight: lighter;
    -webkit-font-smoothing: antialiased;
  }

  .homeLeft_login_Btn{
    width: 60px;
    height: 30px;
    line-height: 30px;
    /*background: red;*/
  }

  .homeLeft_pageList{
    display: flex;
    flex-direction:row;
    flex-wrap: wrap;
    margin:3% auto;
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
    margin: 5px 8px;
    cursor:pointer;
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
    cursor:pointer;
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

    /*background: url("https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1543816741060&di=d9bfdad227b4c345741f4a42a56b6131&imgtype=0&src=http%3A%2F%2Fpic117.nipic.com%2Ffile%2F20161208%2F24443431_165032871926_2.jpg") center no-repeat #666666;*/
    /*background-size: cover;*/
    /*vertical-align: baseline;*/

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
      background: rgba(47, 32, 77, 0.8);
      object-fit: cover;
      object-position: center center;
    }

  .homeBottom{

    flex: 1;
    width: 100%;

  }



</style>
