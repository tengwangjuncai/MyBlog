<template>
    <div class="homeRight_content" v-loading="isLoading">
        <div class="" v-for="item in pageList">
            <h2 class="homeRight_title">{{item.pageName}}</h2>
            <p class="homeRight_desc">{{item.pageContent | pageDesc}}</p>
            <div class="homeRight_container">
                <div class="homeRight_date">{{item.updateTime | dateformat('YYYY-MM-DD') }}</div>
                <div class="homeRight_action" @click="goPageDetail(item)" style="cursor: pointer"> 继续阅读</div>
            </div>
        </div>
    </div>
</template>

<script>
    import {httpGet,httpPost} from '@/utils/app';
    export default {
        name: "PageList",
        data() {
            return {
                pageList:[],

                PageListPath:'PageList',
                isLoading:false,
                userid:'',
            }
        },

        filters:{

            pageDesc(value){

                if (value == "" || value == null) {
                    return ""
                }

                var str = value.substring(0,300)

                str = str.replace(/\n|\r\n|#|\*\*|===| /g, "")


                return str
            }
        },

        methods:{
            goPageDetail(item){

                // this.$router.push({path: '/home/PageDetail'})
                sessionStorage.setItem('myPage',JSON.stringify(item))

                this.$router.push({
                    path: '/PageDetail',
                    // query:{userid:userid},
                });
            },

            loadData(userid){
                let _this = this

                _this.isLoading = true

                httpGet('/pages/' + this.userid,{}).then(response => {

                    _this.isLoading = false
                    _this.pageList = response.data;
                });
            },
        },



        mounted(){

              this.userid =  this.$route.query.userid
              this.loadData()
        },

    }
</script>

<style scoped>

    .homeRight_content{
        margin: 50px 10%;
        padding: 0px;
        /*background-color: darkgreen;*/
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
        height: 20px;
        text-align: left;
        line-height: 20px;
        padding: 2px 8px;
        font-size: 14px;
        color: gray;
        /*background: red;*/
    }
    .homeRight_action{
        height: 20px;
        padding: 2px 8px;
        margin-left: 10px;
        line-height: 20px;
        font-size: 12px;
        color: darkred;
        border-radius: 12px;
        border: 1px darkred solid;
    }

</style>