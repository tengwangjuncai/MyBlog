<template>
    <div>
        <nav v-bind:class="[isLittleScreen ? 'nav' : 'navL']">
            <div v-bind:class="[isLittleScreen ? 'navMenu_container' : 'navL_container']">
                <div v-bind:class="[isLittleScreen ? 'nav_title' : 'navL_title']">
                    <div class="nav_titleView">
                        <div>{{info.resume}} - {{resume.userInfor.name}}</div>
                        <div v-bind:class="[isLittleScreen ? 'nav_Btn' : 'hide']" @click="showMenu">
                            <img class="nav_Btn_img" src="../../src/assets/caidan-2.png"/>
                        </div>
                    </div>
                    <div v-bind:class="[(isShowMenu && isLittleScreen) ? 'nav_selectView' : 'hide']">
                    <div class="nav_selectView_line"></div>
                    <div v-bind:class="[currentIndex == index ? 'nav_TagSelect' : 'nav_Tag']" v-for="(item,index) in info.tag" @click="actionChange(index)">{{item}}</div>
                </div>
                </div>
                <div v-bind:class="[isLittleScreen ? 'hide' : 'nav_TagsView']">
                    <div v-bind:class="[currentIndex == index ? 'nav_TagSelect' : 'nav_Tag']" v-for="(item,index) in info.tag" @click="actionChange(index)">{{item}}</div>
                </div>
            </div>
        </nav>
        <div class="content">
            <span class="d_jump"></span>
            <div v-bind:class="[isLittleScreen ? 'containerS' : 'container']">
                <div v-bind:class="[isLittleScreen ? 'container_top' : 'container_left']">
                        <div v-if="resume.userInfor" class="introduce">
                        <img  class="introduce_icon" :src="resume.userInfor.headImage"/>
                        <h2>{{resume.userInfor.name}}</h2>
                        <h3>{{resume.userInfor.identity}}</h3>
                        <div >
                            <a class="introduce_url" :href="resume.userInfor.denUrl" target="_blank">{{resume.userInfor.denName}}</a>
                        </div>
                        <div class="introduce_contactPages">
                            <div v-for="(item,index) in contacts" @click="goContact(index)">
                                <img class="introduce_page" :src="item"></img>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-bind:class="[isLittleScreen ? 'container_bottom' : 'container_right']">
                    <div v-if="resume.userInfor" class="summary">
                        <h1 class="summary_title">{{info.summary}}</h1>
                        <p class="summary_content">{{resume.userInfor.summary}}</p>
                        <div v-bind:class="[isShowList ? '' : 'summary_my']">
                            <div v-if="resume.userInfor.interests" class="summary_my_interests">
                                <h3 class="summary_my_title">{{info.interests}}</h3>
                                <ul class="summary_introduce">
                                   <li v-for="item in resume.userInfor.interests">{{item}}</li>
                                </ul>

                            </div>
                            <div v-if="resume.userInfor.interests">
                                <h3 class="summary_my_title">{{info.education}}</h3>
                                <ul>
                                    <li class="summary_introduce" v-for="item in resume.userInfor.education">
                                        <div>{{item.degree}}</div>
                                        <div class="summary_introduce_desc">{{item.school}}</div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <span class="d_jump"></span>
            <div v-bind:class="[isLittleScreen ? 'containerS' : 'container']" style="background-color: rgb(247, 247, 247)">
                <div v-bind:class="[isLittleScreen ? 'container_top' : 'container_left']">
                    <div class="container_Title">{{info.projects}}</div>
                </div>
                <div v-bind:class="[isLittleScreen ? 'container_bottom' : 'container_right']">
                    <div class="projects_list">
                        <div v-bind:class="[isShowList ? 'project_Item_S' : 'project_Item']" v-for="item in resume.projects" @click="goProjectDetail(item.projectUrl)">
                                <div class="">
                                    <img v-bind:class="[isShowList ? 'project_Item_icon_S' : 'project_Item_icon']" :src="item.iconUrl"/>
                                </div>

                            <h4  class="project_Item_name">{{item.projectName}}</h4>
                            <div class="project_Item_desc">{{item.projectDesc}}</div>
                        </div>
                    </div>
                </div>
            </div>
            <span class="d_jump"></span>
            <div v-bind:class="[isLittleScreen ? 'containerS' : 'container']">
                <div v-bind:class="[isLittleScreen ? 'container_top' : 'container_left']">
                    <div class="container_Title">{{info.experience}}</div>
                </div>
                <div v-bind:class="[isLittleScreen ? 'container_bottom' : 'container_right']">
                    <div style="text-align: left;flex: 1;margin:20px;font-size: 17px" v-for="item in resume.experiences">
                        <div class="proExperenceDate">{{item.startTime | dateformat('YYYY年MM月')}} ~ {{item.endTime | dateformat('YYYY年MM月')}}</div>
                        <div style="display: flex">
                            <a href="https://www.imguider.com/#page1"  style="color: darkcyan;margin-right: 20px;font-weight: 600;margin-bottom: 10px;text-decoration:none;">{{item.company}}</a>
                            <div>{{item.workName}}</div>
                        </div>
                        <li>{{item.workContent}}</li>
                    </div>
                </div>
            </div>
            <span class="d_jump"></span>
            <div v-bind:class="[isLittleScreen ? 'containerS' : 'container']" style="background-color: rgb(247, 247, 247)">
                <div v-bind:class="[isLittleScreen ? 'container_top' : 'container_left']">
                    <div class="container_Title">{{info.contact}}</div>
                </div>
                <div v-bind:class="[isLittleScreen ? 'container_bottom' : 'container_right']">
                    <div style="display: flex;margin-top: 15px;margin-left: 20px">
                        <img class="contactIcon" src="../assets/dianhua_green.png"/>
                        <div class="conatactText">{{resume.userInfor.phone}}</div>
                    </div>
                    <div  style="display: flex;margin-top: 15px;margin-left: 20px">
                        <img class="contactIcon" src="../assets/youxiangResume.png"/>
                        <div class="conatactText">{{resume.userInfor.email}}</div>
                    </div>
                    <div v-if="resume.userInfor.address" style="display: flex;margin-top: 15px;margin-left: 20px">
                        <img class="contactIcon" src="../assets/address_green.png"/>
                        <div class="conatactText">{{resume.userInfor.address}}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>

    import {httpGet,httpPost} from '@/utils/app'
    export default {
        name: "Resume",
        data() {
            return {
                isLittleScreen:false,//小屏模式显示  width < 1500
                isVerticalRow:false,//组间是否竖向排列 width < 900
                infoCN:{resume:'简历',name:'王鹏宇',tag:['主页','项目','经历','联系','English'],summary:'概要',interests:'兴趣爱好',education:'教育经历',projects:'精选项目',experience:'职业经历',contact:'联系'},
                infoEN:{resume:'RESUME',name:'PENG YU WANG',tag:['Home','Projects','Experience','Contact','中文'],summary:'Summary',interests:'Interests',education:'Education',projects:'My Projects',experience:'Professional Experience',contact:'Contact'},
                info:{},
                user:{},
                language:'CN',
                isShowList:false,
                isShowMenu:false,
                currentIndex:0,
                jumps:[],
                toTopSpace:70,
                resume:{},
                contacts:[require('../../src/assets/youxiangResume.png'),require('../../src/assets/twtterResume.png'),require('../../src/assets/weiboResume.png'),require('../../src/assets/githubResume.png')],

                // projects:[{name:'Louvre',icon:require('../../src/assets/louvre.png'),url:'https://www.imguider.com/#page1',desc:'ImGuider导游讲解系列的一款专注于罗浮宫讲解的App，有很多罗浮宫官导的精彩解说。'},
                //     {name:'ImGuider-X',icon:require('../../src/assets/imguiderX.png'),url:'https://www.imguider.com/#page1',desc:'一款高端的出游工具，行程内容随时看，精彩讲解随时听，便捷出游的同时记录您的一次次美好。'},
                //     {name:'ImGuider',icon:require('../../src/assets/1024.png'),url:'https://www.imguider.com/#page1',desc:'一款致力于深度自由行的华语导游讲解App，很多深居欧洲多年的殿堂级导游亲自出马，讲解深度历史，奇闻趣事，带你玩懂世界。'},
                //     {name:'WPYPlayer',icon:require('../../src/assets/wpyPlayer.jpg'),url:'https://github.com/tengwangjuncai/WPYPlayer',desc:'基于AVPlayer 自定义的一个高度灵活的音频播放器。是一个在音频播放方面比较全面成熟的播放器有object-C 和 Swift 两个版本'},
                //     {name:'WPYCamera',icon:require('../../src/assets/wpyCamera.jpg'),url:'https://github.com/tengwangjuncai/WPYCamera',desc:'一个高度自定义的照相机和视频拍摄的app，类似于抖音拍摄剪辑功能。'},
                //     {name:'WPYAnimation-swift',icon:require('../../src/assets/wpySwiftAnimation.png'),url:'https://github.com/tengwangjuncai/MyImGuider',desc:'一款专注于动画和特殊效果设计创作，收集，组合的App。把一功能需求赋予了自我的特殊设计思维'}]
            }
        },
        methods: {

            goContact(index){
                if(index == 0){


                }else if(index == 1){

                    let url = this.user.twitterUrl
                    window.open(url,'_blank');
                }else  if(index == 2){

                    let url = this.user.weiboUrl
                    window.open(url,'_blank');

                }else  if(index == 3){
                    let url = this.user.gitUrl
                    window.open(url,'_blank');
                }
            },

            actionChange(index){

                if (index < 4){

                    this.jump(index);
                }else {
                    this.changeLanguage();
                }

            },
            goProjectDetail(url){

                window.open(url,'_blank');
            },
            changeLanguage(){

                if (this.language == 'EN'){
                    this.info = this.infoCN;
                    this.language = 'CN';
                    this.currentIndex = 0;
                }else {
                    this.info = this.infoEN;
                    this.language = 'EN';
                    this.currentIndex = 0;
                }
            },
            showMenu(){

                this.isShowMenu = !this.isShowMenu;
            },

            jump(index){

                this.currentIndex = index;

                let jump = document.querySelectorAll('.d_jump');

                let total = jump[index].offsetTop - this.toTopSpace;
                console.log('^^^^^^^^^^' + total);
                let distance = document.documentElement.scrollTop || window.pageYOffset;

                //平滑滑动，时长500ms，每个10ms一跳  共50跳
                let step = total / 50;

                if (total > distance){
                     smoothDown()
                } else {

                    let newTotal = distance - total
                    step = newTotal / 50

                    smoothUp()
                }
                if (this.isShowMenu){
                    this.isShowMenu = false;
                }

                function smoothDown(){

                    if ( distance < total){
                        distance += step;
                        //chrome
                        document.body.scrollTop = distance;
                        //firefox
                        document.documentElement.scrollTop = distance;
                        //safari
                        window.pageYOffset = distance;

                        setTimeout(smoothDown,10)
                    }else {
                        //chrome
                        document.body.scrollTop = total;
                        //firefox
                        document.documentElement.scrollTop = total;
                        //safari
                        window.pageYOffset = total;
                    }
                }

                function smoothUp(){

                    if (distance > total){
                        distance -= step
                        //chrome
                        document.body.scrollTop = distance;
                        //firefox
                        document.documentElement.scrollTop = distance;
                        //safari
                        window.pageYOffset = distance;

                        setTimeout(smoothUp,10)
                    } else {
                        //chrome
                        document.body.scrollTop = total;
                        //firefox
                        document.documentElement.scrollTop = total;
                        //safari
                        window.pageYOffset = total;
                    }
                }
            },

            onScroll(){


                let scrolled = document.documentElement.scrollTop || window.pageYOffset

                if (scrolled >=(this.jumps[3].offsetTop - this.toTopSpace)){
                    this.currentIndex = 3;
                }else if(scrolled >= (this.jumps[2].offsetTop - this.toTopSpace) && (scrolled < this.jumps[3].offsetTop - this.toTopSpace) ){
                    this.currentIndex = 2;
                }else  if(scrolled >= (this.jumps[1].offsetTop - this.toTopSpace) && (scrolled < this.jumps[2].offsetTop - this.toTopSpace)){
                    this.currentIndex = 1;
                }else if(scrolled < (this.jumps[1].offsetTop - this.toTopSpace)) {
                    this.currentIndex = 0;
                }
            },

            setup(){

                this.info = this.infoCN;
                let _this = this;

                this.$nextTick(function () {
                    window.addEventListener('scroll',this.onScroll)
                })

                if(document.body.clientWidth < 1000){
                    _this.isLittleScreen = true
                    this.toTopSpace = 50;

                    if(document.body.clientWidth < 650){
                        _this.isShowList = true
                    }
                }
                let jump = document.querySelectorAll('.d_jump');
                this.jumps = jump;

                window.onresize = function () {

                    let width = document.body.clientWidth;
                    let height = document.body.scrollHeight;

                    console.log('------' + width + '------' + height);

                    if(width < 1000){
                        _this.isLittleScreen = true
                        console.log('改了呀' + _this.isLittleScreen);
                        this.toTopSpace = 50;
                        if(document.body.clientWidth < 650){
                            _this.isShowList = true
                        }else {
                            _this.isShowList = false
                        }
                    }else {
                        _this.isLittleScreen = false
                        this.toTopSpace = 70;
                    }

                    let jump = document.querySelectorAll('.d_jump');
                    this.jumps = jump;

                }
            }


        },

        mounted(){

            let _this = this;
           this.setup()
            console.error('进来了')
            // httpGet('/resume',{}).then(response => {
            //
            //     _this.resume = response.data;
            //     console.error(JSON.stringify(_this.resume))
            // });

            httpPost('/user/userInfo',{id:this.$route.query.userid}).then(response => {

                console.log("========" + response.data)

                _this.user = response.data;

                _this.resume = JSON.parse(_this.user.resume);
            });
        }
    }
</script>

<style scoped>

    .d_jump{
        height: 0px;
        margin: 0;
        padding: 0;
        visibility: hidden;
    }
    .nav{
        /*height: 50px;*/
        width: 100%;
        z-index: 1000;
        background: #fff;
        position: fixed;
        top: 0px;
        left: 0px;
        right: 0px;
        box-shadow: 0 3px 3px 0 rgba(0,0,0,.11);
    }
    .navL{
        /*height: 70px;*/
        width: 100%;
        position: fixed;
        top: 0px;
        left: 0px;
        right: 0px;
        z-index: 1000;
        background: #fff;
        box-shadow: 0 3px 3px 0 rgba(0,0,0,.11);
    }
    .nav_container{
        padding-right: 15px;
        padding-left: 15px;
        margin-right: auto;
        margin-left: auto;
        height: 50px;
        width: 90%;
        display: flex;
    }
    .navL_container{
        padding-right: 15px;
        padding-left: 15px;
        margin-right: auto;
        margin-left: auto;
        height: 70px;
        width: 90%;
        display: flex;
        justify-content: space-between;
    }
    .navMenu_container{
        padding-right: 15px;
        padding-left: 15px;
        margin-right: auto;
        margin-left: auto;
        /*height: 70px;*/
        width: 90%;
        display: flex;
        justify-content: space-between;
    }
    .nav_title{
         text-transform: uppercase;
         font-weight: bold;
         font-size: 1.2em;
         color: #2b2b2b;
         line-height: 50px;
         font-family: 'Lato', sans-serif;
         float: left;
         width: 100%;
     }
    .nav_titleView{
        display: flex;
        justify-content: space-between;
        width: 100%;
    }
    .navL_title{
        text-transform: uppercase;
        font-weight: bold;
        font-size: 1.2em;
        color: #2b2b2b;
        line-height: 70px;
        font-family: 'Lato', sans-serif;
        float: left;
        display: flex;
        justify-content: space-between;
        padding-right: 50px;
    }

    .nav_Btn{
        width: 50px;
        height: 30px;
        /*background-color: darkred;*/
        border: 1px solid lightgrey;
        margin: 10px;
        border-radius: 5px;
        cursor: pointer;
    }
    .hide{
        display: none;
    }
    .nav_Btn_img{
        padding: 1px;
        width: 30px;

    }
    .nav_TagsView{
        display: flex;
        width: 500px;
        height: 100%;
        /*background-color: darkgreen;*/
        justify-content: space-around;
        line-height: 70px;
    }
    .nav_Tag{
        color: #34495e;/**/
        font-weight: 600;
        font-size: 18px;
        white-space: nowrap;
        cursor: pointer;
    }

    .nav_TagSelect{
        color: darkcyan;/*cadetblue*/
        font-weight: 700;
        font-size: 18px;
        white-space: nowrap;
        cursor: pointer;
    }

    .content{
        margin-top: 70px;
    }

    .container{
       /*margin: 20px auto;*/
        padding: 100px 5%;
        /*height: 600px;*/
        background-color: white;

        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }

    .containerS{
        /*margin: 20px auto;*/
        padding: 50px 5%;
        /*height: 600px;*/
        /*background-color: red;*/
    }


    .container_left{
       width: 33.33%;
        /*background-color: darkgreen;*/
    }
    .container_top{
        width: 100%;
        margin: 0 auto;

        /*background-color: darkgreen;*/

    }

    .container_right{
        width: 66.66%;
        /*background-color: darkgray;*/
    }

    .container_bottom{

        width: 100%;

        /*height: 300px;*/
        /*background-color: darkgray;*/

    }
    .introduce{
        margin: 0 auto;
        padding: 30px 10px;
        font-weight: bold;
        font-size: 1.2em;
        color: #2b2b2b;

    }

    .introduce_icon{
        width: 150px;
        height: 150px;
        border-radius: 50%;
        /*border: 3px solid #FFF;*/
        box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.3);
        object-fit: cover;
        object-position: center;
    }

    .introduce_contactPages{
        display: flex;
        flex-direction:row;
        margin:10px auto;
        margin-top: 30px;
        /*width: 400px;*/
        justify-content: center;
    }

    .introduce_page{
        height: 30px;
        width: 30px;
        margin: 0 8px;
        object-fit: cover;
        object-position: center;
        cursor: pointer;

        /*background-image: url('../../src/assets/youxiang.png'), linear-gradient(#f00, #f00);*/
        /*background-blend-mode: lighten;*/
        /*background-size: cover;*/
    }

    .introduce h2{
        font-size: 2.0em;
        font-weight: 400;
        color: #000000;
        margin: 20px 0 5px 0;
    }

    .introduce h3{
        font-size: 1.13em;
        font-weight: 300;
        color: #AAAAAA;
        margin: 0px 0 5px 0;
    }

    .introduce_url{
        font-family: 'Lato', sans-serif;
        font-size: 1.3em;
        font-weight: 500;
        color: darkcyan;
        margin: 0px 0 10px 0;
        text-rendering: optimizeLegibility;
        text-decoration: none;
    }
    .summary{
        padding: 30px 15px;
    }
    .summary_title{
        /*float: left;*/
        font-family: 'Lato', sans-serif;
        font-size: 2.2em;
        font-weight: 400;
        color: #000000;
        margin: 0;
        text-align: left;

    }
    .container_Title{
        font-family: 'Lato', sans-serif;
        font-size: 2.2em;
        font-weight: 400;
        color: #000000;
        margin: 0;
        text-align: center;
    }

    .summary_content{

        display: block;
        margin-bottom:40px;
        text-align: left;

        font-size: 1.4em;
        font-weight: 400;
        margin-top: 10px;

        font-family: inherit;
        line-height: inherit;
        color: inherit;
    }

    .summary_my{
        display: flex;
    }

    .summary_my_interests{
        margin-right: 40px;
    }

    .summary_my_title{
        text-align: left;
    }

    .summary_introduce{

        text-align: left;

        font-size: 1.2em;
        font-weight: 400;
        margin-top: 10px;

        font-family: inherit;
        line-height: inherit;
        color: inherit;
    }

    .summary_introduce_desc{
        font-size: 0.8em;
        font-weight: 200;
        color: gray;
        margin-left: 28px;
    }

    .projects_list{

        display: flex;
        margin-top: 20px;
        flex-direction: row;
        flex-wrap: wrap;
        /*background-color: darkgreen;*/
        /*justify-content: center;*/
    }

    .project_Item{
        width: 250px;
        height: auto;
        margin: 10px 20px;
        background-color:white;
        box-shadow: 0 2px 4px 0 rgba(0,0,0,.2);
        border-radius: 10px;
        overflow: hidden;
        cursor: pointer;

    }

    .project_Item_S{

        width: 90%;
        height: auto;
        margin: 10px 5%;
        background-color:white;
        font-size: 14px;
        box-shadow: 0 2px 4px 0 rgba(0,0,0,.2);
        min-width: 250px;
        border-radius: 10px;
        overflow: hidden;
        cursor: pointer;
    }

    .project_Item_icon{
        width: 250px;
        height: 250px;
    }

    .project_Item_icon_S{
        width: 100%;
        /*height: 100%;*/
        /*padding-bottom: 100%;*/
        /*border-radius: 100%;*/
    }
    .project_Item_name{
        text-align: left;
        padding: 15px 15px 10px;
        margin: 0px;
        color: #313131;
        text-rendering: optimizeLegibility;
        font-family: 'Lato', sans-serif;
    }
    .project_Item_desc{
        text-align: left;
        padding: 0 15px;
        margin-bottom: 15px;
        color: #999999;
        font-size: 12px;
    }

    .nav_selectView{
        background-color: white;
        text-align: left;
    }

    .nav_selectView_line{
        border: none;
        border-top: 1px solid #313131;
        /*background-color: ;*/
        height: 1px;
        width: 120%;
        opacity: 0.2;
        margin: 0 -50px;
    }


    .contactIcon{
        height: 30px;
        width: 30px;
        margin: 5px 15px 5px 0px;
        object-fit: cover;
        object-position: center;
    }
    .conatactText{
        line-height: 40px;
        font-size: 17px;
        font-weight: 500;
    }



</style>