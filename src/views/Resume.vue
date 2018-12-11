<template>
    <div>
        <nav v-bind:class="[isLittleScreen ? 'nav' : 'navL']">
            <div v-bind:class="[isLittleScreen ? 'navMenu_container' : 'navL_container']">
                <div v-bind:class="[isLittleScreen ? 'nav_title' : 'navL_title']">
                    <div class="nav_titleView">
                        <div>{{info.resume}} - {{info.name}}</div>
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
                        <div class="introduce">
                        <img class="introduce_icon" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1543816682771&di=f44eee8cfbbfa7405e1b37f93c15d4a8&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201211%2F11%2F20121111152729_vLh8t.thumb.700_0.jpeg"/>
                        <h2>WPY</h2>
                        <h3>iOS Developer</h3>
                        <div >
                            <a class="introduce_url" href="http://localhost:8080/home/PageList" target="_blank">JunCai's Den</a>
                        </div>
                        <div class="introduce_contactPages">
                            <img class="introduce_page" :src="item" v-for="item in contacts"></img>
                        </div>
                    </div>
                </div>
                <div v-bind:class="[isLittleScreen ? 'container_bottom' : 'container_right']">
                    <div class="summary">
                        <h1 class="summary_title">Summary</h1>
                        <p class="summary_content">{{info.summary}}</p>
                        <p class=""></p>
                        <div v-bind:class="[isShowList ? '' : 'summary_my']">
                            <div class="summary_my_interests">
                                <h3 class="summary_my_title">Interests</h3>
                                <ul class="summary_introduce">
                                    <li>Mobile Development</li>
                                    <li>Object-C Programming</li>
                                    <li>Swift Programming</li>
                                    <li>Open Source Software</li>
                                </ul>

                            </div>
                            <div>
                                <h3 class="summary_my_title">Education</h3>
                                <ul>
                                    <li class="summary_introduce">
                                        B.CS in Computer Science and Technology
                                        <div class="summary_introduce_desc">Zhongyuan University of Technology</div>
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
                    <div class="container_Title">My Projects</div>
                </div>
                <div v-bind:class="[isLittleScreen ? 'container_bottom' : 'container_right']">
                    <div class="projects_list">
                        <div v-bind:class="[isShowList ? 'project_Item_S' : 'project_Item']" v-for="item in info.projects">
                            <div class="">
                                <img v-bind:class="[isShowList ? 'project_Item_icon_S' : 'project_Item_icon']" :src="item.icon"/>
                            </div>
                            <h4 class="project_Item_name">{{item.name}}</h4>
                            <div class="project_Item_desc">{{item.desc}}</div>
                        </div>
                    </div>
                </div>
            </div>
            <span class="d_jump"></span>
            <div v-bind:class="[isLittleScreen ? 'containerS' : 'container']">
                <div v-bind:class="[isLittleScreen ? 'container_top' : 'container_left']">
                    <div class="container_Title">Professional Experience</div>
                </div>
                <div v-bind:class="[isLittleScreen ? 'container_bottom' : 'container_right']"></div>
            </div>
            <span class="d_jump"></span>
            <div v-bind:class="[isLittleScreen ? 'containerS' : 'container']" style="background-color: rgb(247, 247, 247)">
                <div v-bind:class="[isLittleScreen ? 'container_top' : 'container_left']">
                    <div class="container_Title">Contact</div>
                </div>
                <div v-bind:class="[isLittleScreen ? 'container_bottom' : 'container_right']"></div>
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        name: "Resume",
        data() {
            return {
                isLittleScreen:false,//小屏模式显示  width < 1500
                isVerticalRow:false,//组间是否竖向排列 width < 900
                infoCN:{resume:'简历',name:'王鹏宇',tag:['主页','项目','经历','联系','English']},
                infoEN:{resume:'RESUME',name:'PENG YU WANG',tag:['Home','Projects','Experience','Contact','中文'],summary:'Peng Yu Wang is a professional developer who focuses on iOS now. He has strong knowledge of Swift, Objective-C . With these skills, he created quite a few widely used applications and frameworks.',
                projects:[{name:'ImGuider',icon:require('../../src/assets/logo.png'),desc:'一款专注于出境游，自由行的语音神器。宝宝再也不用担心，旅游听话不懂，看不懂，找导游贵的尴尬了'},
                    {name:'ImGuider',icon:require('../../src/assets/logo.png'),desc:'一款专注于出境游，自由行的语音神器。宝宝再也不用担心，旅游听话不懂，看不懂，找导游贵的尴尬了'},
                    {name:'ImGuider',icon:require('../../src/assets/logo.png'),desc:'一款专注于出境游，自由行的语音神器。宝宝再也不用担心，旅游听话不懂，看不懂，找导游贵的尴尬了'}]},
                info:{},
                language:'CN',
                isShowList:false,
                isShowMenu:false,
                currentIndex:0,
                jumps:[],
                toTopSpace:70,
                contacts:[require('../../src/assets/youxiangResume.png'),require('../../src/assets/twtterResume.png'),require('../../src/assets/weiboResume.png'),require('../../src/assets/githubResume.png')],
            }
        },
        methods: {

            actionChange(index){

                if (index < 4){

                    this.jump(index);
                }else {
                    this.changeLanguage();
                }

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
            }


        },

        mounted(){

            this.info = this.infoEN;
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
        box-shadow: 0 0.125rem 0.25rem 0 rgba(0,0,0,.11);
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
        box-shadow: 0 0.125rem 0.25rem 0 rgba(0,0,0,.11);
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
    }

    .nav_TagSelect{
        color: darkcyan;/*cadetblue*/
        font-weight: 700;
        font-size: 18px;
        white-space: nowrap;
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
        margin-bottom: 1rem;
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
        padding: 5px 15px;
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
        font-size: 0.75rem;
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






</style>