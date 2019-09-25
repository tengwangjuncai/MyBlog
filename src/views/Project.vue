<template>
    <div>

        <div  class="container" v-loading="isLoading">
        <div class="projects_list">
            <div v-bind:class="[isShowList ? 'project_Item_S' : 'project_Item']" v-for="item in projects" @click="goProDetail(item)">
                <div class="">
                    <img v-bind:class="[isShowList ? 'project_Item_icon_S' : 'project_Item_icon']" :src="item.iconUrl"/>
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
                projects:{},
                // isLittleScreen:false,
                isShowList:false,
                isLoading:false,

                imageUrl:'https://upload-images.jianshu.io/upload_images/2605277-d0e0f0aebca7cab3.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240',
                projectname:'',
                projectUrl:'',
                projectDesc:'',
                date:'',

                currentItem:'',

                editDes:'提交项目',
            }
        },

        methods:{
            goProDetail(item){

                window.open(item.projectUrl,'_blank');
            },


            tipInfo(type,tips){

                this.$message({
                    showColose:true,
                    message: tips,
                    type: type,
                    center: true,
                });

            },

            loadData(userid){


                let _this = this

                _this.isLoading = true

                httpGet('/projects/' + userid,{}).then(response => {

                    _this.isLoading = false
                    _this.projects = response.data;

                    if(_this.projects && _this.projects.length > 0){

                        _this.selectItem(_this.projects[0])
                    }
                });
            }

        },

        mounted(){

            let _this = this

            if(document.body.clientWidth < 650){
                 _this.isShowList = true
            }

            let userid =  this.$route.query.userid

            _this.loadData(userid)

        }
    }
</script>

<style scoped>

    .container_s{
        margin: 30px 20px;
        padding: 0px;

        /*background-color: red;*/
    }

    .container{

        margin: 50px 20px;
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

    }

    .project_Item_S{
        position: relative;
        width: 90%;
        height: auto;
        margin: 10px 5%;
        background-color:white;
        font-size: 14px;
        box-shadow: 0 2px 4px 0 rgba(0,0,0,.2);
        min-width: 250px;
        border-radius: 10px;
        /*overflow: hidden;*/
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