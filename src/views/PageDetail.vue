<template>
   <div>

       <div v-bind:class="[isSmallScreen ? 'content_s' : 'content']">
           <div v-bind:class="[isSmallScreen ? 'Title_S' : 'Title']">{{page.pageName}}</div>
           <mavon-editor style="z-index: 800" v-model="page.pageContent" :ishljs="true" :codeStyle="xcode" :subfield="false" :defaultOpen="defaultData" :toolbarsFlag="false" :boxShadow="false"></mavon-editor>
           <!--//-->
       </div>
   </div>

    
</template>

<script>

    import {mavonEditor} from 'mavon-editor'
    export default {
        name: "PageDetail",
        data() {
            return {
               page:{},
                content:'',
                defaultData: "preview",
                isSmallScreen: false
            }
        },

        methods:{



        },


        mounted(){

            if(document.body.clientWidth < 650){
                this.isSmallScreen = true
            }

            // this.page = JSON.parse(sessionStorage.getItem('myPage'));
            //
            // let md =  mavonEditor.getMarkdownIt()
            //
            // this.content = md.render(this.page.pageContent)
            //
            // console.log(this.content)
        },

        activated() {

            this.page = JSON.parse(sessionStorage.getItem('myPage'));

            let md =  mavonEditor.getMarkdownIt()

            this.content = md.render(this.page.pageContent)

            console.log(this.content)
        }

    }
</script>

<style scoped>


     .v-show-content{
         background: white !important;
     }

    .content{
        padding: 30px 8%;
        background: rgb(250,250,250);
        /*width: 84%;*/
        /*font-size: 40px;*/
        /*height: 100vw;*/
        text-align: left;
        overflow: hidden;
    }

    .content_s{
        margin: 30px 0;
        background: rgb(250,250,250);
        /*width: 84%;*/
        /*font-size: 40px;*/
        /*height: 100vw;*/
        text-align: left;
        overflow: hidden;
    }

    /*.content .v-note-wrapper   {*/
        /*border-width: 0px !important;*/
        /*background: red;*/
    /*}*/

    .Title{
        /*font-size: 28px;*/
        font: 38px bold;
        padding-bottom: 20px;
        padding-top: 20px;
        /*text-align: center;*/
        /*border: 1px  lightgrey  solid;*/

    }

    .Title_S{
        font: 32px bold;
        padding: 0px 20px 20px 20px;
        /*text-align: center;*/
        /*border: 1px  lightgrey  solid;*/
    }
</style>