<template>
<div class="content" v-loading="isLoading">
    <div class="content_left" :style="{height: windowHeight + 'px'}">
        
        <div class="addBtn" @click="newPage">
            <img class="addIcon" src="../assets/addpage.png"/>
            <div style="line-height: 60px">新建文章</div>
        </div>
        <div v-if="pages && pages.length == 0" style="height: 400px;line-height: 400px;color: #b7b7b7">暂无文章哦 (^_^)</div>
        <div v-bind:class="[pageCurrent == index ? 'pageItem_select' : 'pageItem']" v-for="(item,index) in pages" @click="selectThePage(item,index)">
            <div v-bind:class="[pageCurrent == index ? 'pageItem_line' : 'hide']"></div>
            <div class="pageItem_content">
                <div class="pageItem_content_title">{{item.pageName}}</div>
                <div class="pageItem_content_desc">{{item.pageContent | pageDesc}}</div>
            </div>
            <div v-bind:class="[pageCurrent == index ? 'deletBtn' : 'hide']" @click="deleteThePage(item)">
                <img class="deleteIcon" src="../assets/pageDelete.png"/>
            </div>
        </div>
    </div>
    <div class="content_right" :style="{height: windowHeight - 115 + 'px'}">
        <div class="titleView">
            <input class="title"  rows="1" v-model="Title" placeholder="  请输入标题名称"  maxlength="100" style="font-size: 28px;border: 0px;outline:none;cursor: pointer;"></input>
            <div class="submitBtn" @click="submitPage">发布文章</div>
        </div>
        <mavon-editor style="z-index: 800" class="mavonView"  @imgAdd = "$imgAdd" :ishljs = "true"  v-model="content" :subfield="true" :defaultOpen="defaultData" :toolbarsFlag="true" :boxShadow="false"></mavon-editor>
    </div>
</div>

</template>

<script>
    import {httpGet,httpPost} from '@/utils/app';
    import moment from 'moment';
    export default {
        name: "PageDetail",
        data() {
            return {
                content:'',
                Title:'',
                id:'',
                pages:[],
                defaultData: "preview",
                windowHeight:window.document.documentElement.clientHeight - 70,
                pageCurrent:0,
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

            tipInfo(type,tips){

                this.$message({
                    showColose:true,
                    message: tips,
                    type: type,
                    center: true,
                });

            },


            $imgAdd(pos, $file){
               //第一步，将照片上传到服务器
                var formdata = new FormData();
                formdata.append('image',$file);
                axios({
                    url:'server url',
                    method:'post',
                    data:formdata,
                    headers:{'Content-Type': 'multipart/form-data'},
                }).then((url) =>{
                    //第二步，将返回的url替换到文本原位置！
                    $vm.$img2Url(pos,url);
                })
            },

            deleteThePage(item){

                if (item.id && item.id.length > 0){

                    let _this = this
                    let pageName = item.pageName

                    let param = {
                        id:item.id
                    }
                    console.log('======' + item.id)
                    httpPost('/deletePage',param).then(response =>{

                        let tip = pageName + '文章已删除';

                        _this.tipInfo('success',tip)
                        _this.content = ''
                        _this.Title = ''
                        _this.id = ''
                        _this.loadData()
                    })

                } else {

                    this.pages.shift()
                    this.selectThePage(this.pages[0],0)
                }
            },
            selectThePage(item,index){

                this.pageCurrent = index

                this.content = item.pageContent
                this.Title = item.pageName
                this.id = item.id
                this.defaultData = 'edit'
            },
            newPage(){

                let date = new  Date()

                let pageName = moment(Date.parse(date)).format("YYYY-MM-DD")
                this.Title = pageName
                this.content = ''
                this.id = ''

                let page = {
                    id:this.id,
                    pageName:pageName,
                    pageContent:this.content,
                    createTime:date
                }

                this.pages.unshift(page)
                this.selectThePage(this.pages[0],0)
            },
            loadData(){
                let _this = this

                _this.isLoading = true

                httpGet('/pages/' + _this.userid ,{}).then(response => {

                    _this.isLoading = false
                    _this.pages = response.data;
                    if (_this.pages && _this.pages.length > 0 && _this.content.length <= 0){
                        let item = _this.pages[0]
                        _this.selectThePage(item,0)
                    }
                });
            },

            submitPage(){

                let _this = this

                if(this.content.length <= 0){
                    _this.tipInfo('warning','文章不能为空')
                    return;
                }

                let date = new  Date()

                let createTime = moment(Date.parse(date)).format("YYYY-MM-DD HH:mm:ss")
                let param = {
                    id:this.id,
                    userid:this.userid,
                    pageName:this.Title,
                    pageContent:this.content,
                    createTime:createTime,
                }

                if (_this.id && _this.id.length > 0){

                    httpPost('/updatePage',param).then(response =>{

                        console.log(response)
                        if (response.code == 0){
                            let tip = _this.Title + '文章上传成功';

                            _this.tipInfo('success',tip)
                            _this.loadData()
                        }

                    })
                } else {

                    httpPost('/addPage',param).then(response => {

                        console.log(response.data)

                        let tip = _this.Title + '文章上传成功';

                        _this.tipInfo('success',tip)
                        _this.loadData()
                    })
                }
            }
        },


        mounted(){
            document.title = '编辑我的博客'
            let user = JSON.parse(sessionStorage.getItem("user"));
            this.userid = user.id

            this.loadData()
        }
    }
</script>

<style scoped>

    .content{
        display: flex;
        margin-top: 70px;
        /*background: red;*/
    }
    .content_left{
        width: 30%;
        /*height: 100%;*/
        /*background: gray;*/
        box-shadow: 0 0.125rem 0.25rem 0 rgba(0,0,0,.12);
    }

    .content_right{
        width: 70%;
        padding:50px 5%;
        /*background: white;*/
    }

    .titleView{
        display: flex;
    }
    .title{
        flex: 1;
        height: 55px;
        background: #F7F7F7;
        padding-left: 20px;
    }
    .submitBtn{
        /*margin-left: 20px;*/
        /*margin-top: 8px;*/
        width: 120px;
        font-size: 20px;
        background: darkcyan;
        height: 55px;
        line-height: 55px;
        color: white;
        /*border-radius: 5px;*/
        cursor: pointer;
    }

    .mavonView{

        margin-top: 10px;
        width: 100%;
        height: 100%;
    }
    .addBtn{
        display: flex;
        padding-left: 35px;
        padding-top: 2px;
        height: 60px;
        /*color: darkcyan;*/
        color: #34495e;/**/
        font-weight: 500;
        font-size: 18px;

        line-height: 60px;
        border-bottom: 1px solid lightgray;
        cursor: pointer;
    }

    .addIcon{
        height: 20px;
        width: 20px;
        /*background: red;*/
        margin-top: 18px;
        margin-right: 5px;
    }

    .hide{
        display: none;
    }

    .pageItem{
        width: 100%;
        display: flex;
        height: 80px;
        background: white;
        border-bottom: 1px #E5E5EA solid;
        cursor: pointer;
    }
    .pageItem_select{
        position: relative;
        width: 100%;
        display: flex;
        height: 80px;
        background: #e7e7e7;
        border-bottom: 1px #E5E5EA solid;
        cursor: pointer;
    }

    .pageItem_line{
        position: absolute;
        height: 100%;
        background: darkcyan;
        width: 5px;
    }
    .pageItem_content{
        width: 100%;
        margin: 15px 12% 15px 8%;
        text-align: left;
    }
    .deletBtn{
        position: absolute;
        height: 100%;
        right: 0;
        /*background: darkslategray;*/
        width: 12%;
        /*background: red;*/
    }
    .deleteIcon{
        width: 25px;
        height: 25px;
        margin: 27.5px auto;
    }

    .pageItem_content_title{
        width: 80%;
        font-size: 17px;
        color: #222222;
        overflow: hidden;/*超出部分隐藏*/
        white-space: nowrap;/*不换行*/
        text-overflow:ellipsis;/*超出部分文字以...显示*/
    }
    .pageItem_content_desc{
        width: 80%;
        padding-top: 5px;
        font-size: 12px;
        color: #5A5A5A;
        overflow: hidden;/*超出部分隐藏*/
        white-space: nowrap;/*不换行*/
        text-overflow:ellipsis;/*超出部分文字以...显示*/
    }

</style>