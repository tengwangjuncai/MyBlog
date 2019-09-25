<template>
    <div>
        <div class="nav">
            <div class="nav_Btn"  @click="deleteProject">
                <img class="nav_Btn_img" src="../assets/projectDelete.png"/>
            </div>

            <div class="nav_Btn"  @click="editProject">
                <img class="nav_Btn_img" src="../assets/bianji.png"/>
            </div>
            <div class="nav_Btn"  @click="addProject">
                <img class="nav_Btn_img" src="../assets/tianjia.png"/>
            </div>
        </div>

        <div class="addView">
            <!--<el-upload class="icon" :action="uploadurl"-->
                       <!--:show-file-list="false"-->
                       <!--:on-success="handleAvatarSuccess"-->
                       <!--:before-upload="beforeAvatarUpload">-->
                <!--<img v-if="imageUrl" :src="imageUrl" class="avatar"/>-->
                <!--<i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
            <!--</el-upload>-->
            <div style="width: 250px;height: 250px">
                <bg-upload class="BgImage" v-model="imageUrl"></bg-upload>
            </div>
            <div class="edit">
                <div class="lineView">
                    <div  class="edit_title">项目名称：</div>
                    <div style="width: 250px"><el-input v-model="projectname" placeholder="请输入项目名称"></el-input></div>
                </div>
                <div class="lineView">
                    <div class="edit_title">项目链接：</div>
                    <div style="width: 250px">
                        <el-input v-model="projectUrl" placeholder="请输入项目URL"></el-input>
                    </div>

                </div>
                <div class="lineView">
                    <div >项目描述：</div>
                    <div style="flex: 1;margin-right: 50px">
                        <el-input type="textarea" v-model="projectDesc" :rows="3" placeholder="请输入项目描述"></el-input>
                    </div>

                </div>
                <div style="margin-top: 20px">
                    <el-button  class="editBtn" :loading="isUploading" @click="EditAction">{{editDes}}</el-button>
                    <el-button class="editBtn" @click="editOver">结束操作</el-button>
                </div>

            </div>
        </div>
        <div  class="container" v-loading="isLoading">
            <div v-if="projects && projects.length == 0" style="height: 300px;line-height:300px;color: #b7b7b7">你的世界， 空空如也 !!!</div>
            <div class="projects_list">
                <div v-bind:class="[isShowEdite && currentIndex == index ? 'project_Item_S' : 'project_Item']" v-for="(item,index) in projects" @click="goProDetail(item,index)">
                    <div class="">
                        <!--v-bind:class="[false ? 'project_Item_icon_S' : 'project_Item_icon']"-->
                        <img class="project_Item_icon"  :src="item.iconUrl"/>
                        <div class="item_deletBtn" v-if="isShowDelete" @click.stop="DeleteTheProject(item)">
                            <img style="width: 35px;height: 35px;" src="../assets/shanchu.png"/>
                        </div>
                    </div>

                    <h4  class="project_Item_name">{{item.projectName}}</h4>
                    <div class="project_Item_desc">{{item.projectDesc}}</div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import {httpGet,httpPost} from '@/utils/app';
    export default {
        name: "Project",
        data() {
            return {
                projects:[],

                isShowEdite:false,
                isShowDelete:false,
                isUploading:false,
                isLoading:false,

                imageUrl:'',
                projectname:'',
                projectUrl:'',
                projectDesc:'',
                date:'',

                currentItem:'',
                currentIndex:0,
                editDes:'提交项目',
                uploadurl:'http://domestic.imguider.com/xtrip-api/services/system/fileupload',
            }
        },

        methods:{
            goProDetail(item,index){

                if(!this.isShowEdite && !this.isShowDelete){
                    window.open(item.projectUrl,'_blank');
                }else if(this.isShowEdite){
                    this.selectItem(item,index)
                }
            },
            editOver(){
               this.addProject()
            },

            selectItem(item,index){

                this.currentItem = item
                this.imageUrl = item.iconUrl
                this.projectname = item.projectName
                this.projectUrl = item.projectUrl
                this.projectDesc = item.projectDesc
                this.currentIndex = index
            },

            updateTheProject(){

                this.isUploading = true
                let _this = this

                let param = {
                    id:this.currentItem.id,
                    userid:this.userid,
                    projectName:this.projectname,
                    iconUrl:this.imageUrl,
                    projectDesc:this.projectDesc,
                    projectUrl:this.projectUrl,
                    date:new Date()
                }

                httpPost('/updateproject',param).then( response => {

                    _this.isUploading = false
                    let tip = _this.projectname + '项目修改成功';

                    _this.tipInfo('success',tip)
                    _this.loadData()
                })
            },

            DeleteTheProject(item){

                let _this = this
                let param = {id:item.id}

                httpPost('/deleteproject',param).then( response => {

                    let tip = item.projectname + '项目删除成功';

                    _this.tipInfo('success',tip)

                    _this.loadData()
                })
            },

            uploadProject(){
                this.isUploading = true
                let param = {
                    userid:this.userid,
                    projectName:this.projectname,
                    iconUrl:this.imageUrl,
                    projectDesc:this.projectDesc,
                    projectUrl:this.projectUrl,
                    date:new Date()

                }

                let _this = this

                httpPost('/addproject',param).then(response => {

                    console.log(response.data)
                    _this.isUploading = false;

                    let tip = _this.projectname + '项目上传成功';

                    _this.tipInfo('success',tip)
                    _this.loadData()
                })


            },

            EditAction(){

                if (this.isShowEdite){
                    this.updateTheProject()
                } else {
                    this.uploadProject()
                }
            },

            deleteProject(){

                this.isShowDelete = !this.isShowDelete
                this.isShowEdite = false

                this.editDes = '提交项目'
                this.imageUrl = ''
                this.projectname = ''
                this.projectUrl = ''
                this.projectDesc = ''
            },

            addProject(){

                this.isShowEdite = false
                this.isShowDelete = false

                this.editDes = '提交项目'
                this.imageUrl = ''
                this.projectname = ''
                this.projectUrl = ''
                this.projectDesc = ''
            },

            tipInfo(type,tips){

                this.$message({
                    showColose:true,
                    message: tips,
                    type: type,
                    center: true,
                });

            },
            editProject(){

                if (this.isShowEdite){

                    this.addProject()

                }else {

                    this.isShowEdite = true
                    this.isShowDelete = false
                    this.editDes = '修改项目'
                    this.selectItem(this.currentItem,this.currentIndex)
                }
            },


            loadData(){


                let _this = this

                _this.isLoading = true

                httpGet('/projects/' + _this.userid,{}).then(response => {

                    _this.isLoading = false
                    _this.projects = response.data;

                    if(_this.projects && _this.projects.length > 0){

                        _this.currentItem = _this.projects[0]
                    }
                });
            }

        },

        mounted(){

            let _this = this

            let user = JSON.parse(sessionStorage.getItem("user"));
            this.userid = user.id

            _this.loadData()

        }
    }
</script>

<style scoped>

    .nav{
        display: flex;
        height: 50px;
        line-height: 50px;
        /*flex-direction: row-reverse;*/
        /*background: red;*/
        background: #fff;
        padding: 0 40px;
        /*box-shadow: 0 0.125rem 0.25rem 0 rgba(0,0,0,.11);*/
    }
    .addView{
        display: flex;
        height: 250px;
        padding: 0  40px 20px 40px;
        margin-top: 20px;
        box-shadow: 0 0.125rem 0.25rem 0 rgba(0,0,0,.11);
    }
    .BgImage {
        width: 250px;
        height: 250px;
        /*border: 2px dashed #d9d9d9;*/
        border-radius: 10px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        /*border-color:darkgreen ;*/
    }

    .avatar {
        width: 250px;
        height: 250px;
        display: block;
        border-radius: 6px;
        background: darkgreen;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 250px;
        height: 250px;
        line-height: 250px;
        text-align: center;
    }
    .edit{
        margin-left: 40px;
        /*background: darkgreen;*/
        text-align: left;
        padding-top: 10px;
        flex: 1;
    }

    .edit_title{
        width: 80px;
        line-height: 40px;
        font-family: "PingFang SC";

    }

    .lineView{
        display: flex;
        margin-bottom: 15px;
        /*background: red;*/
    }

    .editBtn{
        margin-right: 30px;
        /*background-image: linear-gradient(to bottom, #A4A4A4, #525252);*/
        color: white;
        /*border-color: gray;*/
        /*border-width: 1px;*/
        background: darkcyan;
    }
    .nav_Btn{
        width: 30px;
        height: 30px;
        /*background-color: darkred;*/
        /*border: 1px solid lightgrey;*/
        margin: 12.5px 5px;
        cursor: pointer;
        /*border-radius: 5px;*/
    }
    .nav_Btn_img{
        padding: 1px;
        width: 25px;

    }

    .container_s{
        margin: 30px 20px;
        padding: 0px;

        /*background-color: red;*/
    }

    .container{

        margin: 30px 20px;
        padding: 0px;

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
        position: relative;
        width: 250px;
        height: auto;
        margin: 10px 20px;
        background-color:white;
        box-shadow: 0 2px 4px 0 rgba(0,0,0,.2);
        border-radius: 10px;
        /*overflow: hidden;*/
        cursor: pointer;

    }

    .project_Item_S{
        position: relative;
        width: 250px;
        height: auto;
        margin: 10px 20px;
        background-color:white;
        box-shadow: 0 2px 4px 0 rgba(0,0,0,.2);
        border-radius: 10px;
        border: 3px darkcyan solid;
        cursor: pointer;
    }

    .project_Item_icon{
        width: 250px;
        height: 250px;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
    }

    .project_Item_icon_S{
        width: 100%;
        /*height: 100%;*/
        /*padding-bottom: 100%;*/
        /*border-radius: 100%;*/
    }

    .item_deletBtn{
        position: absolute;
        top: -10px;
        z-index: 100;
        right: -10px;
        height: 35px;
        width: 35px;
        color: white;
        border-radius: 50%;
        border-width: 1px;
        border-color: white;
        background: white;

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

</style>