<template>
    <div class="Content" v-loading="isLoading">
        <div class="Left">
            <div class="left_Top">
                <div v-bind:class="[screenType != 3 ? 'homeView' : 'homeView_s']">
                    <div v-bind:class="[screenType == 3 ? 'TopButton' : 'home_more']">
                        <div class="TopButton_action" @click="showMenu">
                            <img class="TopButton_icon" :src="BtnIcon" />
                        </div>
                    </div>
                    <div v-bind:class="[(isMenuShow && screenType == 3) ? 'TopMenu' : 'home_more']">
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
                    <div v-bind:class="[{homeLeft_row:screenType == 2},
            {homeLeft:screenType == 1},{homeTop:screenType == 3}]">
                        <img  v-bind:class="[{homeLeft_mask_row:screenType == 2},{homeLeft_mask:screenType == 1},{homeTop_mask:screenType == 3}]" :src="user.BgUrl ? user.BgUrl : defultBgImag"/>
                        <div v-bind:class="[{homeLeft_mask_row:screenType == 2},{homeLeft_mask:screenType == 1},{homeTop_mask:screenType == 3}]"></div>
                        <div v-bind:class="[screenType == 3 ? 'homeTop_content' : 'homeLeft_content']">
                            <img  class="homeLeft_icon" :src="user.headimage ? user.headimage : defultHeadIcon"/>
                            <div class="homeLeft_name">{{user.name}}'s Den</div>
                            <div class="homeLeft_sign">{{user.mark ? user.mark : defultMark}}</div>
                            <div v-bind:class="[screenType == 3 ? 'home_more' : '']">
                                <div class="homeLeft_line"></div>
                                <div class="homeLeft_introduce" v-html="user.personInfo ? user.personInfo : defultInfo">{{}}</div>
                                <div v-bind:class="[screenType == 3 ? 'home_List' : '']">
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
                    <div v-bind:class="[{homeBottom:screenType == 3},{homeRight:screenType == 2},{home_more:screenType == 1}]">
                        <div class="">
                        </div>
                    </div>
                </div>
            </div>
            <div class="left_bottom">
                <div class="right_pattern">
                    <el-radio-group v-model="screenType" text-color="white" fill="darkcyan">
                        <el-radio-button :label="1">首页封面</el-radio-button>
                        <el-radio-button :label="2">网页模式</el-radio-button>
                        <el-radio-button :label="3">手机模式</el-radio-button>
                    </el-radio-group>
                </div>
                <div class="edit_view">

                    <div class="edit">
                        <div class="lineView" style="margin-bottom: 30px">
                            <div  style="width: 120px;height: 80px;line-height: 80px">用 户 头 像 ：</div>
                            <!--<el-upload class="headIcon" action="https://jsonplaceholder.typicode.com/posts/"-->
                                       <!--:show-file-list="false"-->
                                       <!--:on-success="handleAvatarSuccess"-->
                                       <!--:before-upload="beforeAvatarUpload">-->
                                <!--<img v-if="user.headimage" :src="user.headimage" class="avatar"/>-->
                                <!--<i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
                            <!--</el-upload>-->
                            <icon-upload v-model="user.headimage"></icon-upload>
                        </div>
                        <div class="lineView">
                            <div  class="edit_title">用户名/昵称：</div>
                            <div style="width: 300px"><el-input v-model="user.name" placeholder="用户名/昵称"></el-input></div>
                        </div>
                        <div class="lineView">
                            <div class="edit_title">个 性 签 名 ：</div>
                            <div style="width: 300px">
                                <el-input v-model="user.mark" placeholder="请输入个性签名"></el-input>
                            </div>

                        </div>
                        <div class="lineView">
                            <div class="edit_title">个 人 简 介 ：</div>
                            <div style="flex: 1;">
                                <el-input type="textarea" v-model="user.personInfo" :rows="3" placeholder="请输入个人简介"></el-input>
                            </div>

                        </div>
                        <div class="lineView">
                            <!--:on-success="handleAvatarSuccess"-->
                            <!--:before-upload="beforeAvatarUpload"-->
                            <div class="edit_title">首 页 封 面 ：</div>
                            <!--<el-upload class="BgImage" action="https://jsonplaceholder.typicode.com/posts/"-->
                                       <!--:show-file-list="false">-->
                                <!--<img v-if="user.BgUrl" :src="user.BgUrl" class="bg_avatar"/>-->
                                <!--<i v-else class="el-icon-plus bg-uploader-icon"></i>-->
                            <!--</el-upload>-->
                            <div style="height: 300px;width: 100%;margin-left: 15px">
                                <bg-upload v-model="user.BgUrl"></bg-upload>
                            </div>

                        </div>
                        <div style="margin-top: 40px">
                            <div style="display: flex;width: 100%;">
                                <div class="lineView" style="width: 50%">
                                    <img class="contactIcon" src="../assets/weiboResume.png"/>
                                    <el-input placeholder="请输入微博链接" v-model="user.weiboUrl"></el-input>
                                </div>
                                <div class="lineView" style="width: 50%">
                                    <img class="contactIcon" src="../assets/githubResume.png"/>
                                    <el-input placeholder="请输入Git主页链接" v-model="user.gitUrl"></el-input>
                                </div>
                            </div>
                            <div style="display: flex;width: 100%">
                                <div class="lineView" style="width: 50%">
                                    <img class="contactIcon" src="../assets/twtterResume.png"/>
                                    <el-input placeholder="请输入Twitter链接" v-model="user.twitterUrl"></el-input>
                                </div>
                                <div class="lineView" style="width: 50%">
                                    <img class="contactIcon" src="../assets/youxiangResume.png"/>
                                    <el-input placeholder="请输入邮箱地址" v-model="user.emailAddress"></el-input>
                                </div>
                            </div>
                        </div>
                        <div style="margin-top: 50px;display: flex;justify-content: center">
                           <el-button style="background: darkcyan;color: white;width: 50%" @click="submitInfo">提交个人信息</el-button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
         <!--<div class="Right">-->

         </div>
    </div>

</template>

<script>

    import {httpGet,httpPost} from '@/utils/app';
    export default {
        name: "HomePageEdit",
        data() {
            return {
                screenType:1,
                mTabPosition: 0,
                isMenuShow:false,
                list:['博客','项目','简历'],
                contacts:[require('../assets/footer_weibo.png'),require('../../src/assets/github.png'),require('../../src/assets/Group.png'),require('../../src/assets/youxiang.png')],
                PageListPath:'PageList',
                width:document.body.clientWidth,

                normalIcon:require('../assets/menu.png'),
                selectIcon:require('../assets/up.png'),
                BtnIcon:require('../assets/menu.png'),
                defultHeadIcon:require('../assets/defultHeadIcon.jpg'),
                defultBgImag:require('../assets/horse.jpg'),
                defultMark:'例：不忘初心，方得始终',
                defultInfo:'快来简单的介绍一下自己吧（-_-）',
                user:{
                    // id:'',
                    // name:'Juncai',
                    // headimage:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1543816682771&di=f44eee8cfbbfa7405e1b37f93c15d4a8&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201211%2F11%2F20121111152729_vLh8t.thumb.700_0.jpeg',
                    // mark:'浮世万千，吾爱有三',
                    // personInfo:'嗨，我是xxx  (@twjuncai)  一名ios开发者 \n 正在探索创意之源',
                    // BgUrl:'http://www.33lc.com/article/UploadPic/2012-8/201282015245513483.jpg',
                    // weiboUrl:'https://weibo.com/5413187293/profile?topnav=1&wvr=6&is_all=1',
                    // gitUrl:'https://github.com/tengwangjuncai',
                    // twitterUrl:'',
                    // emailAddress:'twjuncai@163.com',
                },

                userid:'',
                isLoading:false,
                BgUrl:'',

            }
        },

        methods:{

            showMenu(){

                if(this.BtnIcon == this.normalIcon){
                    this.BtnIcon = this.selectIcon;
                    this.isMenuShow = true;
                }else {
                    this.BtnIcon = this.normalIcon;
                    this.isMenuShow = false;
                }
            },

            submitInfo(){
                let _this = this
                let param = _this.user
                _this.isLoading = true

              httpPost('/user/updateUserInfo',param).then(response =>{
                  _this.isLoading = false
                  _this.$message({message:'个人信息提交成功',center:true,type:'success'})
              })
            },

            loadData(userid){


                let _this = this

                _this.isLoading = true

                let param = {id:userid}

                httpPost('/user/userInfo',param).then(response => {

                    _this.isLoading = false

                    _this.user = response.data;
                    console.log('====' + JSON.stringify(_this.user))
                });
            },
        },

        mounted(){

            let user = JSON.parse(sessionStorage.getItem("user"));
            this.userid = user.id

            this.loadData(user.id)
        }
    }
</script>

<style scoped>

    .Content{
        display: flex;
        /*position: fixed;*/
        width: 100%;
        height: 100%;
        /*overflow:scroll;*/
    }

    .Left{
        width: 100%;
        height: 100%;
        background: #F7F7F7;
    }
    .Right{
        position: absolute;
        right: 0;
        top: 0;
        width: 0%;
        height: 100%;
        background: white;
    }
    .left_Top{
        width: 100%;
        height: 560px;
        background: darkslategray;
    }
    .left_bottom{
        padding: 40px 0px;
        margin-bottom: 20px;
        /*height: 600px;*/
        background: #F7F7F7;
    }
    .right_pattern{
        /*display: flex;*/
        /*!*align-items: left;*!*/
        /*align-items: center;*/
        /*background: green;*/
    }

    .right_pattern_title{
        margin-right: 30px;
        color: #333333;
        font-size: 16px;
        font-weight: 600;
    }


    .homeView{
        position: relative;
        height: 100%;
        width: 100%;
        overflow: hidden;
    }
    .homeView_s{

        position: relative;
        left: 30%;
        height: 100%;
        width: 40%;
        overflow: hidden;
    }

    .TopButton{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 36px;
        width: 100%;
        z-index: 900;
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
        position: absolute;
        top: 36px;
        right: 0;
        left: 0;
        width: 100%;
        z-index: 900;
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
        /*position: fixed;*/
        height: 100%;
        width: 100%;
        /*z-index: 800;*/
        overflow: hidden;
        /*background: url("http://www.33lc.com/article/UploadPic/2012-8/201282015245513483.jpg") center no-repeat #666666;*/
        /*background-size: cover;*/
        /*background-position: center center;*/
    }

    .homeLeft_row{
        display: table;
        /*position: fixed;*/
        height: 100%;
        width: 30%;
        /*background-position: center center;*/
        /*background: url("http://www.33lc.com/article/UploadPic/2012-8/201282015245513483.jpg") center no-repeat #666666;*/
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
        width: 30%;
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
        overflow: hidden;
        box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.3);
        object-fit: cover;
        object-position: top;
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
        background-color: #575757;
        height: 1px;
        width: 20%;
        margin: 15px auto;

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
        /*position: absolute;*/
        background: white;
        height: 100%;
        /*width: 70%;*/
        left: 30%;
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

        /*height: auto;*/

        width: 100%;
        margin: 0 auto;
        /*background: url("http://www.33lc.com/article/UploadPic/2012-8/201282015245513483.jpg") center no-repeat #666666;*/
        /*background-size: cover;*/
        /*background-position: center center;*/
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
        left:0;
        width: 100%;
        height: 300px;
        background: rgba(47, 32, 77, 0.8);
        /*background: rgba(0, 0, 0, 0.5);*/
        object-fit: cover;
        object-position: center center;

    }

    .homeBottom{
        position: absolute;
        width: 100%;
        top: 300px;
        left: 0;
        flex: 1;
        height: 60%;
        background: white;

    }

    .edit_view{
        /*display: flex;*/
        margin: 20px 15%;
        /*background: red;*/
    }

    .headIcon{

        width: 80px;
        height: 80px;
        margin-top: 3px;
        margin-left: 20px;
        border-radius: 50%;
        border: 2px dashed lightgrey;
        /*box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.3);*/
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader-icon {
        font-size: 20px;
        color: #8c939d;
        width: 70px;
        height: 70px;
        line-height: 70px;
        text-align: center;
    }
    .avatar {
        width: 70px;
        height: 70px;
        display: block;
        border-radius: 50%;
        /*background: darkgreen;*/
    }

    .lineView{
        display: flex;
        margin: 10px 20px;
        /*background:green;*/
    }
    .edit_title{
        width: 120px;
        height: 40px;
        line-height: 40px;
        text-align: left;
    }

    .edit{
        margin-left: 20px;
        /*background: darkgreen;*/
        text-align: left;
        padding-top: 10px;
        flex: 1;
    }

    .BgImage{
        flex: 1;
        display: flex;
        border: 2px dashed darkcyan;
        height: 300px;
        overflow: hidden;
        justify-content: center;
    }


    .bg_avatar {
        width: 100%;
        height: 300px;
        object-fit: cover;
        object-position: center center;
    }

    .bg-uploader-icon {
        font-size: 42px;
        color: darkcyan;
        /*width: 100%;*/
        padding: 0 auto;
        height: 300px;
        line-height: 300px;
        text-align: center;
        /*background: red;*/
    }

    .contactIcon{
        height: 30px;
        width: 30px;
        margin: 5px 15px 5px 0px;
        object-fit: cover;
        object-position: center;
    }
</style>