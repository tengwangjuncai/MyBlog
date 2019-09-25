<template>
    <div class="content">
        <!--:style="{height:height +'px'}"-->
        <div class="headerView" id="header" :style="{height:height +'px'}">
            <div class="tabBar">
                <div class="tabItem" @click="tabAction(0,tabs[0])">
                    <div class="itemIconL">{{tabs[0]}}</div>
                </div>
                <div class="tabItem" @click="tabAction(1,tabs[1])">
                    <div class="itemIcon">{{tabs[1]}}</div>
                </div>
                <div class="tabItem" @click="tabAction(2,tabs[2])">
                    <div class="itemIconM">{{tabs[2]}}</div>
                </div>
                <div class="tabItem" @click="tabAction(3,tabs[3])">
                    <div class="itemIcon">{{tabs[3]}}</div>
                </div>
                <div class="tabItem" @click="tabAction(4,tabs[4])">
                    <div class="itemIconR">{{tabs[4]}}</div>
                </div>
            </div>
        </div>
        <div class="headerViewTop">
            <div class="tabBar">
                <div class="tabItem" @click="tabAction(0,tabs[0])">
                    <div class="itemIconL">{{tabs[0]}}</div>
                </div>
                <div class="tabItem" @click="tabAction(1,tabs[1])">
                    <div class="itemIcon">{{tabs[1]}}</div>
                </div>
                <div class="tabItem" @click="tabAction(2,tabs[2])">
                    <div class="itemIconM">{{tabs[2]}}</div>
                </div>
                <div class="tabItem" @click="tabAction(3,tabs[3])">
                    <div class="itemIcon">{{tabs[3]}}</div>
                </div>
                <div class="tabItem" @click="tabAction(4,tabs[4])">
                    <div class="itemIconR">{{tabs[4]}}</div>
                </div>
            </div>
        </div>

        <!--:style="{height:windowHeight +'px'}"-->

        <scroll-lock :lock="isScroll" :body-lock="!isScroll" class="content_wrap" :style="{height:windowHeight +'px'}">

            <keep-alive>
                <router-view></router-view>
            </keep-alive>

            <!--<div v-bind:class="[(index % 2 == 0) ? 'itemBlock' : 'itemBlockB']" v-for="(item,index) in tabs">{{item}}</div>-->
        </scroll-lock>
    </div>
</template>

<script>

    export default {
        name: "NewTrip",

        data() {
            return {
                windowHeight: window.document.documentElement.clientHeight - 40,
                headerHeight: window.document.documentElement.clientHeight / 3 * 2,
                isShow: true,
                tabs: ["概况", "酒店", "日程", "报表", "其他"],
                tabDict: {
                    "概况": ["报表", "其他", "概况", "酒店", "日程"],
                    "酒店": ["其他", "概况", "酒店", "日程", "报表"],
                    "日程": ["概况", "酒店", "日程", "报表", "其他"],
                    "报表": ["酒店", "日程", "报表", "其他", "概况"],
                    "其他": ["日程", "报表", "其他", "概况", "酒店"]
                },
                height: '',
                tabBar: '',
                scroll: '',
                isScroll:true,

            }
        },

        methods: {

            tabAction(index, item) {

                this.tabs = this.tabDict[item];

                switch (item) {
                    case '概况':
                        this.$router.push({
                            path: '/NewTripSurvey',
                            // query: {viewid:this.$route.query.viewid}
                        })
                        break;
                    case '日程':
                        this.$router.replace({
                            path: '/NewTripArrange',
                            // query: {viewid:this.$route.query.viewid}
                        })
                        break;
                    case '酒店':
                        this.$router.replace({
                            path: '/NewTripHotel',
                            // query: {viewid:this.$route.query.viewid}
                        })
                        break;
                }

                switch (index) {
                    case 0:

                        break;
                    case 1:

                        break;
                    case 2:
                        if (this.isShow) {

                            this.toBottom()
                            // this.height = 40
                            this.isScroll = false
                            this.isShow = false
                        } else {

                            this.toTop()
                            // this.height = this.headerHeight
                            this.isScroll = true
                            this.isShow = true
                        }

                        break;
                    case 3:

                        break;
                    case 4:

                        break;
                }
            },
            getScroll(){
                return {
                          // left: window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0,
                          top: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
                };
    },


            toTop(){

                if (document.documentElement.scrollTop > 0) {

                    document.documentElement.scrollTop = 0
                }

                if (document.body.scrollTop > 0){
                    document.body.scrollTop  = 0
                }
                // if(this.getScroll().top>0){
                //     this.getScroll().top=0;
                // }
            },

            toBottom(){

                document.documentElement.scrollTop = this.windowHeight + this.headerHeight;
                document.body.scrollTop = this.windowHeight + this.headerHeight;
            },
            //
            // noScroll(){
            //     document.body.addEventListener('touchmove', function(e){
            //         e.preventDefault();
            //         e.stopPropagation();
            //     }, { passive: false });
            // }

            onScroll() {
                this.scroll = this.getScroll().top;
                // const _top = document.getElementById("header").offsetTop;

                if (document.getElementById("header").offsetTop - this.scroll < (40 - this.headerHeight)){
                    document.querySelector(".headerViewTop").style.display = 'block';
                    this.isScroll = false
                    this.isShow = false
                } else {
                    document.querySelector(".headerViewTop").style.display = 'none';
                    this.isShow = true
                }
            }

        },

        mounted() {

            this.height = this.headerHeight
            // this.tabAction(2,'概况')\
            document.querySelector(".headerViewTop").style.display = 'none';
            this.isScroll = true
            window.addEventListener('scroll', this.onScroll)
        }
    }
</script>

<style scoped>

    .content {
        /*position: fixed;*/
        /*overflow: hidden;*/
        /*height: 50rem;*/

    }

    .headerView {
        position: relative;
        /*top: 0px;*/
        background: darkgreen;
        width: 100%;
        z-index: 100;
    }

    .headerViewTop {
        position: fixed;
        top: 0px;
        background: darkgreen;
        width: 100%;
        z-index: 100;
        height: 40px;
    }

    .tabBar {
        position: absolute;
        display: flex;
        height: 80px;
        bottom: -40px;
        left: 0px;
        right: 0px;
        /*padding: 10px 0;*/
        justify-content: center;
        align-items: center;

        /*background: darkcyan;*/
    }

    .tabItem {

        width: 45px;
        height: 45px;
        /*background: red;*/
        margin: 0 10px;
    }

    .itemIcon {
        width: 100%;
        height: 100%;
        background: white;
        text-align: center;
        line-height: 45px;
        border-radius: 5px;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .2);
    }

    .itemIconL {
        width: 70%;
        height: 70%;
        margin: 15% 0px 15% 30%;
        background: white;
        text-align: center;
        line-height: 30px;
        border-radius: 5px;
        font-size: 12px;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .2);
        z-index: -10;

    }

    .itemIconM {
        width: 100%;
        height: 100%;
        background: lightseagreen;
        color: white;
        text-align: center;
        line-height: 45px;
        border-radius: 5px;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .2);
    }

    .itemIconR {
        width: 70%;
        height: 70%;
        margin: 15% 30px 15% 0;
        background: white;
        text-align: center;
        line-height: 30px;
        font-size: 12px;
        border-radius: 5px;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .2);
        z-index: -10;
    }

    .content_wrap {
        /*margin-top: 40px;*/
        background: #F2F2F2;
        /*background-color: #F2F2F2;*/
        /*width: 100%;*/
        /*height: 100%;*/
        /*overflow: hidden;*/

        /*display: table;*/
    }

    .itemBlock {
        height: 500px;
        width: 100%;
        background: red;
    }

    .itemBlockB {
        height: 500px;
        width: 100%;
        background: white;
    }
</style>