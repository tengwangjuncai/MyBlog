<template>
    <div class="content">
        <div class="editView">
            <!--<el-upload-->
                    <!--class="headIcon"-->
                    <!--action="https://jsonplaceholder.typicode.com/posts/"-->
                    <!--:show-file-list="false"-->
                    <!--:on-success="handleAvatarSuccess"-->
                    <!--:before-upload="beforeAvatarUpload">-->
                <!--<img v-if="imageUrl" :src="imageUrl" class="avatar">-->
                <!--<i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
            <!--</el-upload>-->
            <div style="display: flex;justify-content: center">
                <icon-upload v-model="imageUrl"></icon-upload>
            </div>
            <div class="descTitle">姓名：</div>
            <el-input class="myName" placeholder="请输入你的 姓名" v-model="resume.userInfor.name"></el-input>
            <div>
                <div class="descTitle">个人职业简介:</div>
                <el-input class="personIntro" rows="6" type="textarea" placeholder="请输入个人职业介绍……" v-model="resume.userInfor.summary"></el-input>
            </div>
            <div>
                <div class="descTitle">兴趣爱好：</div>
                <div style="display: flex">
                    <el-input placeholder="请添加你的兴趣，爱好" v-model="interest"></el-input>
                    <el-button style="background: darkslategrey;margin-left: 10px;color: white" @click="addInterest">添加</el-button>
                </div>
                <div style="padding: 20px 20px;margin:20px 0px;color: white;text-align: left">
                    <div style="display: flex" v-for="(item,index) in resume.userInfor.interests">
                        <li  style="flex: 1;line-height: 30px">{{item}}</li>
                        <div style="width: 50px;text-align: center" @click="deletIntrests(index)">
                            <img class="deleteIcon" src="../assets/lineDelete.png"/>
                        </div>
                    </div>

        </div>
    </div>
           <div>
               <div class="descTitle">教育经历：</div>
               <el-input placeholder="请输入你的学位 如（计算机科学学士学位）" v-model="education.degree"></el-input>
               <div style="display: flex;margin-top: 10px">
                   <el-input placeholder="请输入你的毕业院校  " v-model="education.school"></el-input>
                   <el-button style="background: darkslategrey;margin-left: 10px;color: white" @click="addSchool">添加</el-button>
               </div>
               <div style="padding: 20px 20px;margin:20px 0px;color: white;text-align: left">
                   <div style="display: flex" v-for="(item,index) in resume.userInfor.education">
                       <div style="flex: 1;">
                           <li>{{item.degree}}</li>
                           <div class="summary_introduce_desc" style="color: white">{{item.school}}</div>
                       </div>
                       <div class="deleteBtn" @click="deletSchool(index)">
                           <img class="deleteIcon" src="../assets/lineDelete.png"/>
                       </div>
                   </div>
               </div>
           </div>
           <div style="margin-bottom: 20px">
               <div style="display: flex">
                   <div  class="descTitle"> 精选项目：</div>
                   <div class="addBtn" @click="showAddProject"><img class="Licon" :src="projectIcon"/></div>
               </div>
               <div v-bind:class="[isShowAddProject ? '' : 'hide']">
                   <el-table
                           ref="multipleTable"
                           :data="allProjects"
                           tooltip-effect="dark"
                           style="width: 100%;margin-top: 2px;"
                           @selection-change="handleSelectionChange">
                       <el-table-column
                               type="selection"
                               width="55">
                       </el-table-column>
                       <el-table-column
                               label="日期"
                               width="120">
                           <template slot-scope="scope">{{ scope.row.date }}</template>
                       </el-table-column>
                       <el-table-column
                               prop="projectName"
                               label="项目名称"
                               width="120">
                       </el-table-column>
                       <el-table-column
                               prop="projectUrl"
                               label="项目地址"
                               show-overflow-tooltip>
                       </el-table-column>
                   </el-table>
                   <!--<div style="margin-top: 20px;">-->
                       <!--<el-button style="background: darkslategrey;color: white" @click="toggleSelection([tableData[1], tableData[2]])">确认添加</el-button>-->
                       <!--<el-button style="background: darkslategrey;color: white" @click="toggleSelection()">取消选择</el-button>-->
                   <!--</div>-->
               </div>
               <div style="margin: 20px 20px 40px 0px">
                   <div style="display: flex;width: 100%;margin-bottom: 20px;justify-content: space-between" v-for="(item,index) in resume.projects">
                       <img style="width: 60px;height: 60px;border-radius: 10px;margin-right: 20px" :src="item.iconUrl"/>
                       <div style="text-align: left;width: 70%;color: white;margin-right: 20px">
                           <div class="projectTitle">{{item.projectName}}</div>
                           <div class="projectDesc">{{item.projectDesc}}</div>
                       </div>
                       <div class="deleteBtn" @click="deleteProject(index)">
                           <img class="deleteIcon" src="../assets/lineDelete.png"/>
                       </div>
                   </div>
               </div>

           </div>
            <div>
                <div style="display: flex">
                    <div class="descTitle"> 职业履历：</div>
                    <div class="addBtn" @click="showaddExperence"><img class="Licon" :src="experenceIcon"/></div>
                </div>
                <div v-if="isShowAddExperence">
                    <div style="display: flex">
                        <el-date-picker type="month"  placeholder="选择开始月份" v-model="experience.startTime"></el-date-picker>
                        <div style="background: white;height: 1px;width: 60px;margin: 19px 10px"></div>
                        <el-date-picker type="month" placeholder="选择结束月份" v-model="experience.endTime"></el-date-picker>
                    </div>
                    <el-input style="margin-top: 20px;width: 50%;margin-right: 50%" placeholder="请输入公司名称" v-model="experience.company"></el-input>
                    <el-input style="margin-top: 20px;width: 50%;margin-right: 50%" placeholder="请输入公司网址" v-model="experience.webUrl"></el-input>
                    <el-input style="margin-top: 10px" placeholder="请输入职位名称" v-model="experience.workName"></el-input>

                    <el-input style="margin-top: 10px" type="textarea" rows="6" placeholder="请输入负责内容…………" v-model="experience.workContent"></el-input>
                    <div style="margin: 20px 0;">
                        <el-button style="background: darkslategrey;color: white" @click="addExperence">确认添加</el-button>
                        <el-button style="background: darkslategrey;color: white" @click="clearExperence">一键清空</el-button>
                    </div>
                </div>
                <div>
                    <div style="display: flex;margin-right: 20px;margin-bottom: 20px" v-for="(item,index) in resume.experiences">
                        <div style="color: white;text-align: left;flex: 1;margin-bottom: 20px;font-size: 14px">
                            <div class="experenceDate">{{item.startTime | dateformat('YYYY年MM月')}} ~ {{item.endTime | dateformat('YYYY年MM月')}}</div>
                            <div style="display: flex">
                                <a style="color: yellow;margin-right: 20px">{{item.company}}</a>
                                <div>{{item.workName}}</div>
                            </div>
                            <li>{{item.workContent}}</li>
                        </div>
                        <div class="deleteBtn" @click="deleteExperence(index)">
                            <img class="deleteIcon" src="../assets/lineDelete.png"/>
                        </div>
                    </div>

                </div>
            </div>
            <div>
                <div class="descTitle">联&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp系：</div>
                <div style="display: flex;margin-bottom: 20px">
                    <img class="contactIcon" src="../assets/dianhua.png"/>
                    <el-input placeholder="请输入联系电话" v-model="resume.userInfor.phone"></el-input>
                </div>
                <div style="display: flex;margin-bottom: 20px">
                    <img class="contactIcon" src="../assets/youxiang.png"/>
                    <el-input placeholder="请输入常用邮箱" v-model="resume.userInfor.email"></el-input>
                </div>
                <div style="display: flex;margin-bottom: 20px">
                    <img class="contactIcon" src="../assets/address.png"/>
                    <el-input  placeholder="请输入现居地址" v-model="resume.userInfor.address"></el-input>
                </div>
            </div>

            <el-button style="background: darkslategrey;color: white;width: 50%;margin-top: 50px" @click="submitResume">提交简历</el-button>

        </div>
        <div class="preview">
            <div>
                <div v-bind:class="[isLittleScreen ? 'containerS' : 'container']">
                    <div v-bind:class="[isLittleScreen ? 'container_top' : 'container_left']">
                        <div v-if="resume.userInfor" class="introduce">
                            <img  class="introduce_icon" :src="imageUrl"/>
                            <h2>{{resume.userInfor.name}}</h2>
                            <h3>{{resume.userInfor.identity}}</h3>
                            <div >
                                <a class="introduce_url" :href="resume.userInfor.denUrl" target="_blank">{{resume.userInfor.denName}}</a>
                            </div>
                            <div class="introduce_contactPages">
                                <img class="introduce_page" :src="item" v-for="item in contacts"></img>
                            </div>
                        </div>
                    </div>
                    <div v-bind:class="[isLittleScreen ? 'container_bottom' : 'container_right']">
                        <div v-if="resume.userInfor" class="summary">
                            <h1 class="summary_title">Summary</h1>
                            <p class="summary_content">{{resume.userInfor.summary}}</p>
                            <p class=""></p>
                            <div v-bind:class="[isShowList ? '' : 'summary_my']">
                                <div v-if="resume.userInfor.interests" class="summary_my_interests">
                                    <h3 class="summary_my_title">Interests</h3>
                                    <ul class="summary_introduce">
                                        <li v-for="item in resume.userInfor.interests">{{item}}</li>
                                    </ul>

                                </div>
                                <div v-if="resume.userInfor.interests">
                                    <h3 class="summary_my_title">Education</h3>
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
                <div v-bind:class="[isLittleScreen ? 'containerS' : 'container']" style="background-color: rgb(247, 247, 247)">
                    <div v-bind:class="[isLittleScreen ? 'container_top' : 'container_left']">
                        <div class="container_Title">My Projects</div>
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
                <div v-bind:class="[isLittleScreen ? 'containerS' : 'container']">
                    <div v-bind:class="[isLittleScreen ? 'container_top' : 'container_left']">
                        <div class="container_Title">Professional Experience</div>
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
                <div v-bind:class="[isLittleScreen ? 'containerS' : 'container']" style="background-color: rgb(247, 247, 247)">
                    <div v-bind:class="[isLittleScreen ? 'container_top' : 'container_left']">
                        <div class="container_Title">Contact</div>
                    </div>
                    <div v-bind:class="[isLittleScreen ? 'container_bottom' : 'container_right']">
                        <div style="display: flex;margin-top: 15px;margin-left: 20px">
                            <img class="contactIcon" src="../assets/dianhua_green.png"/>
                            <div class="conatactText">{{resume.userInfor.phone}}</div>
                        </div>
                        <div style="display: flex;margin-top: 15px;margin-left: 20px">
                            <img class="contactIcon" src="../assets/youxiangResume.png"/>
                            <div class="conatactText">{{resume.userInfor.email}}</div>
                        </div>
                        <div style="display: flex;margin-top: 15px;margin-left: 20px">
                            <img class="contactIcon" src="../assets/address_green.png"/>
                            <div class="conatactText">{{resume.userInfor.address}}</div>
                        </div>
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
                isShowAddProject:false,//是否显示添加项目
                isShowAddExperence:false,//是否显示添加履历
                isLittleScreen: false,//小屏模式显示  width < 1500
                isVerticalRow: false,//组间是否竖向排列 width < 900

                contacts: [require('../../src/assets/youxiangResume.png'), require('../../src/assets/twtterResume.png'), require('../../src/assets/weiboResume.png'), require('../../src/assets/githubResume.png')],

                projectIcon:require('../assets/addExperence.png'),
                experenceIcon:require('../assets/addExperence.png'),
                addIcon:require('../assets/addExperence.png'),
                closeIcon:require('../assets/closeBtn.png'),

                imageUrl:'',
                resume: {userInfor:{}},
                usr:{headimage:''},
                uerid:'',

                interest:'',
                education:{
                    degree:'',
                    school:''
                },
                experience:{
                    startTime:'',
                    endTime:'',
                    company:'',
                    webUrl:'',
                    workName:'',
                    workContent:'',
                },
                allProjects:[],
                selectProjects:[],
            }
        },

        methods:{

            handleAvatarSuccess(){

            },
            beforeAvatarUpload(){

            },

            addInterest(){

                if (this.interest.length > 0){
                    this.resume.userInfor.interests.unshift(this.interest)

                    this.interest = ''
                } else {

                }

            },
            deletIntrests(index){

                if (index < this.resume.userInfor.interests.length){

                    this.resume.userInfor.interests.splice(index,1)
                }
            },


            addSchool(){

                let education = {
                    degree:this.education.degree,
                    school:this.education.school
                }

                if (this.education.degree.length > 0 && this.education.school.length > 0){
                    this.resume.userInfor.education.unshift(education)

                }

                this.education.degree = ''
                this.education.school = ''

            },
            deletSchool(index){


                if (index < this.resume.userInfor.education.length){

                    this.resume.userInfor.education.splice(index,1)
                }
            },


            showAddProject(){

                let _this = this
                if (_this.allProjects.length <= 0){

                    httpGet('/projects/' + _this.userid,{}).then(response => {

                        _this.allProjects = response.data;
                        // _this.setupState()

                    });
                }

                this.isShowAddProject = !this.isShowAddProject
                if (this.isShowAddProject) {
                    this.projectIcon = this.closeIcon
                }else {
                    this.projectIcon = this.addIcon
                }
            },
            deleteProject(index){

                if (index < this.resume.projects.length){

                    let row = this.resume.projects[index]

                    let _this = this
                    this.resume.projects.splice(index,1)
                    _this.$refs.multipleTable.toggleRowSelection(row,false);

                    // rows.forEach(row => {
                    //     _this.$refs.multipleTable.toggleRowSelection(row);
                    // });

                    console.log('====' + index)



                }
            },



            showaddExperence(){
                this.isShowAddExperence = !this.isShowAddExperence
                if (this.isShowAddExperence) {
                    this.experenceIcon = this.closeIcon
                }else {
                    this.experenceIcon = this.addIcon
                }
            },
            addExperence(){

                let experence = {
                    startTime : this.experience.startTime,
                    endTime : this.experience.endTime,
                    company : this.experience.company,
                     webUrl : this.experience.webUrl,
                    workName : this.experience.workName,
                    workContent : this.experience.workContent,
                }

                this.resume.experiences.unshift(experence)
            },
            clearExperence(){
                this.experience.startTime = ''
                this.experience.endTime = ''
                this.experience.company = ''
                this.experience.webUrl = ''
                this.experience.workName = ''
                this.experience.workContent = ''

            },
            deleteExperence(index){

                if (index < this.resume.experiences.length){
                    this.resume.experiences.splice(index,1)
                }
            },


            handleSelectionChange(val){

                this.resume.projects = val
            },

            submitResume(){
                this.resume.userInfor.headImage = this.imageUrl
                    // this.resume.userInfor.denUrl = 'http://www.small-strong.wang/wpyblog/#/?Juncai'

                let resume = JSON.stringify(this.resume)
                let param = {
                    id:this.userid,
                    resume:resume
                }

                let _this = this

                httpPost('/user/updateResume',param).then(response =>{

                    _this.tipInfo('success','简历提交成功')

                })
            },

            tipInfo(type,tips){

                this.$message({
                    showColose:true,
                    message: tips,
                    type: type,
                    center: true,
                });

            },

            setupState(){

                let _this = this

                _this.resume.projects.forEach(row => {
                    _this.$refs.multipleTable.toggleRowSelection(row,false);
                });
            },

            setup(){

                let _this = this;
                //
                // this.$nextTick(function () {
                //     window.addEventListener('scroll',this.onScroll)
                // })

                if(document.body.clientWidth < 1560){
                    _this.isLittleScreen = true
                    this.toTopSpace = 50;

                    if(document.body.clientWidth < 1200){
                        _this.isShowList = true
                    }
                }

                window.onresize = function () {

                    let width = document.body.clientWidth;
                    let height = document.body.scrollHeight;

                    console.log('------' + width + '------' + height);

                    if(width < 1560){
                        _this.isLittleScreen = true
                        console.log('改了呀' + _this.isLittleScreen);
                        if(document.body.clientWidth < 1200){
                            _this.isShowList = true
                        }else {
                            _this.isShowList = false
                        }
                    }else {
                        _this.isLittleScreen = false
                    }

                }
            }
        },

        mounted(){

            let user = JSON.parse(sessionStorage.getItem("user"));
            this.userid = user.id

            let _this = this

            console.error('进来了')

            httpPost('/user/userInfo',{id:_this.userid}).then(response => {

                console.log("========" + response.data)

                _this.user = response.data;

                if(_this.user.resume){
                    _this.resume = JSON.parse(_this.user.resume);
                    _this.imageUrl = _this.resume.userInfor.headImage
                }else {

                }


            });

            _this.setup()
        }
    }
</script>

<style scoped>

    .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner{
        background-color: darkslategrey;
        border-color: darkslategrey;
    }

    .content{
        /*position: fixed;*/
        /*width: 100%;*/
        /*height: 100%;*/
        margin-top: 70px;
        padding: 0 0px;
        display: flex;
    }

    .editView{
        width: 40%;
        /*height: 1000px;*/
        /*border-right: 2px darkcyan solid;*/
        padding: 30px 50px;
        background: darkslategray;
        /*align-items: left;*/
    }

    /*.headIcon{*/

        /*width: 80px;*/
        /*height: 80px;*/
        /*margin: 50px auto 30px auto;*/
        /*!*margin-top: 30px;*!*/
        /*border-radius: 50%;*/
        /*border: 2px dashed lightgrey;*/
        /*!*box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.3);*!*/
        /*cursor: pointer;*/
        /*!*position: relative;*!*/
        /*overflow: hidden;*/
    /*}*/
    /*.avatar-uploader-icon {*/
        /*font-size: 20px;*/
        /*color: #8c939d;*/
        /*width: 70px;*/
        /*height: 80px;*/
        /*line-height: 80px;*/
        /*text-align: center;*/
    /*}*/
    /*.avatar {*/
        /*width: 70px;*/
        /*height: 70px;*/
        /*display: block;*/
        /*border-radius: 50%;*/
        /*!*background: darkgreen;*!*/
    /*}*/

    .myName{
        width: 50%;
        margin: 0px 50% 20px 0px;
        text-align: center;

    }
    .personIntro{
        margin: 0px 0px 20px 0px;
        /*width: 600px;*/
    }

    .descTitle{
        color: white;
        font-size: 17px;
        text-align: left;
        margin-bottom: 20px;
        line-height: 25px;
        /*font-weight: 600;*/

    }
    .addBtn{
        width: 60px;
        height: 26px;
    }
    .Licon{
       width: 25px;
        height: 25px;
    }

    .deleteBtn{
        width: 50px;
        display: flex;
        align-items: center;
        justify-content: center
    }

    .deleteIcon{
        width: 30px;
        height: 30px
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

    .projectTitle{
        font-size: 17px;
        font-weight: 500;
        line-height: 30px;
        overflow: hidden;/*超出部分隐藏*/
        white-space: nowrap;/*不换行*/
        text-overflow:ellipsis;/*超出部分文字以...显示*/
    }
    .projectDesc{
        font-size: 14px;
        line-height: 30px;
        /*background: red;*/
        white-space: nowrap;/*不换行*/
        text-overflow:ellipsis;/*超出部分文字以...显示*/
        overflow: hidden;/*超出部分隐藏*/
    }

    .experenceDate{
        font-size: 17px;
        /*font-weight: 600;*/
        line-height: 30px;
    }


    /*/////////////////////////////////////////////////////*/
    .preview{
        width: 60%;
        /*height: 1000px;*/
        /*overflow: scroll;*/
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
        overflow: hidden;
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

        /*background: red;*/
        margin: 0;
        text-align: left;
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

    .proExperenceDate{
        font-size: 22px;
        font-weight: 600;
        line-height: 50px;
    }

    .hide{
        display: none;
    }

</style>