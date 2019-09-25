<template>
    <div>
        <div class="nav">
            <div class="nav_content">
                <div class="nav_TagsView">
                    <div v-bind:class="[tabCurrentIndex == index ? 'nav_TagSelect' : 'nav_Tag']" v-for="(item,index) in tags" @click="tagChange(index)">{{item}}</div>
                </div>
                <div v-bind:class="[isShow ? 'nav_userViewSelect' :'nav_userView']" @click="showView" @mouseenter="showMyView(true)">
                    <img class="nav_icon" :src="user.headimage ? user.headimage : defultHeadIcon"/>
                    <img class="arrow" src="../assets/arrowDown.png"/>
                    <div style="line-height: 36px">{{user.name | subName}}</div>
                </div>
            </div>
        </div>
        <div v-bind:class="[isShow ? 'shareView' :'hide']" @mouseleave="showMyView(false)">
            <div class="qrcode" id="qrcode"></div>
            <div>我的二维码</div>
            <el-button class="homeBtn" @click="goHomePage">我的主页</el-button>
        </div>
        <div class="content">
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </div>

    </div>

</template>

<script>

    import QRCode from 'qrcodejs2'

    export default {
        name: "EditView",
        data() {
            return {
                tabCurrentIndex:0,
                tags:["首页","文章","项目","简历"],
                user:{},
                defultHeadIcon:require('../assets/defultHeadIcon.jpg'),
                isShow:false,
                code:'',
            }
        },
        filters:{

            subName(value){

                if (value == "" || value == null) {
                    return ""
                }

                if (value.length > 10){
                    var str = value.substring(0,10)
                    return str
                } else {
                    return value
                }

            }
        },

        methods:{
            tagChange(index){
                if (index == 0){
                    this.$router.replace({
                        path: '/HomePageEdit',
                    })
                } else if (index == 1){
                    this.$router.replace({
                        path: '/PageEdit',
                    })
                } else if(index == 2){
                    this.$router.replace({
                        path: '/ProjectEdit',
                    })
                }else if(index == 3) {
                    this.$router.replace({
                        path: '/ResumeEdit',
                    })
                }
                this.tabCurrentIndex = index
            },

            goHomePage(){

                let userid = this.user.id
                let name = this.user.name
                let route = this.$router.resolve({
                    path:'/',
                    query:{userid:userid,name:name},
                });
                window.open(route.href,'_blank');
            },

            qrcode( ){

                let userid = this.user.id
                let name = this.user.name
                let route = this.$router.resolve({
                    path:'/',
                    query:{userid:userid,name:name},
                });

                let path = 'http://www.small-strong.wang/wpyblog/' + route.href

                    this.code = new QRCode('qrcode',{
                    width:180,
                    height:180,
                    text:path,
                    colorDark:"#000",
                    colorLight:"#fff"
                })

            },
            showView(){
                this.isShow = !this.isShow
            },

            showMyView(flag){

                this.isShow = flag
            },


        },

        mounted(){

            this.user = JSON.parse(sessionStorage.getItem("user"));
            this.tagChange(this.tabCurrentIndex)

            this.qrcode()
        }
    }
</script>

<style scoped>

    .nav{
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
    .nav_content{
        display: flex;
        height: 70px;
        margin-left: 50px;
        margin-right: 50px;
        justify-content: space-between;
        /*background: red;*/
    }

    .nav_TagsView{
        display: flex;
        width: 300px;
        height: 100%;
        /*background-color: darkgreen;*/
        justify-content: space-around;
        line-height: 70px;
        cursor: pointer;
    }

    .nav_userView{
       display: flex;
        justify-content: flex-end;
        padding: 17px 10px 17px 10px;
        color: #34495e;
        font-weight: 600;
    }
    .nav_userViewSelect{

        display: flex;
        justify-content: flex-end;
        padding: 17px 10px 17px 10px;
        background: #E7E7E7;
        color: #34495e;
        font-weight: 600;
        cursor: pointer;
    }

    .nav_icon{
        width: 36px;
        height: 36px;
        border: 2px darkcyan solid;
        border-radius: 50%;
        /*margin: 0 2px;*/
        overflow: hidden;
        object-fit: cover;
        object-position: center;
    }
    .nav_Tag{
        color: #34495e;/**/
        font-weight: 600;
        font-size: 18px;
        white-space: nowrap;
        /*background: darkgreen;*/
        flex: 1;
    }

    .nav_TagSelect{
        color: darkcyan;/*cadetblue*/
        font-weight: 700;
        font-size: 18px;
        white-space: nowrap;
        flex: 1;
        /*background: darkgreen;*/
    }

    .content{
        width: 100%;
        margin-top: 70px;
        /*height: 500px;*/
        /*background: darkgreen;*/
    }
    .arrow{
        height: 14px;
        width: 14px;
        margin: 14px 9px 15px 1px;
    }

    .shareView{
        position: fixed;
        top: 71px;
        right: 2px;
        height: 340px;
        width: 260px;
        z-index: 1100;
        background: white;
        box-shadow: 0 0.125rem 0.25rem 0 rgba(0,0,0,.2);
    }

    .qrcode{
        margin: 30px 40px 20px 40px;
    }

    .homeBtn{
        height: 40px;
        width: 200px;
        margin: 20px 30px;
        background: darkcyan;
        border-radius: 20px;
        color: white;
    }

    .tap{
        color: darkcyan;
        margin: 0 5px;
    }

    .hide{
        display: none;
    }

</style>