<template>
    <div class="content">
      <img class="bgImage" src="@/assets/photo_bg/bg.jpg"/>
        <div class="mask">
            <img class='photo_1' v-bind:class="{a_photo_1: isCurrentPage}"
                 src='@/assets/word/wpy_12.png'>
            <!--<img class="headerIcon" src="@/assets/weiwei/wei_icon.jpeg"/>-->
            <div class="jiantou" @click="goBirthday">
                <img  class="headerIcon" v-bind:class="{a_jiantou: isCurrentPage}"
                      src='@/assets/Ying/ying_icon.jpeg'>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "CoverPage",

        data() {
            return {
                isCurrentPage:true
            }
        },
        methods:{

            goBirthday(){

                console.log('==========')
                this.$router.push({
                    path: '/YingHomePage',
                    // query:{userid:userid},
                });
            }
        },

        mounted(){
            document.title = '影儿生日定制'
        }
    }
</script>

<style lang="scss" scoped>
    .content{
        /*background: lightseagreen;*/
        width: 100%;
        height: 100%;

        .bgImage{
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center;
            /*background: red;*/
        }
        .mask{
            position: absolute;
            display: flex;
            justify-content: center;
            align-items: center;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 1000;
            /*height:  100%;*/
            /*background:rgba(47, 32, 77, 0.1);*/
            object-fit: cover;
            object-position: center center;
            /*pointer-events: none;*/
        }

        .headerIcon{
            width: 65px;
            height: 65px;
            border-radius: 50%;
            border: 3px solid lightblue;
        }

        .btn{
            position: absolute;
            font-size: 16px;
            border-radius: 20px;
            width: 120px;
            height: 40px;
            line-height: 40px;
            text-align: center;
            background: rgba(0,0,0,0.3);
            bottom: 2rem;
            right: 70px;

        }


        .photo_1 {
            position: absolute;
            object-fit: contain;
            height: 4.69rem;
            width: 5.94rem;
            left: 0.78rem;
            top: 2.24rem;
            z-index: 4;
        }
        .a_photo_1 {
            animation: 2500ms ease-in-out 100ms 1 normal both running zoomIn;
        }

        .jiantou {
            position: absolute;
            object-fit: contain;
            height: 1.5rem;
            width: 1.5rem;
            left: 3.4rem;
            /*background: darkred;*/
            top: calc(100vh - 5rem);
            z-index: 1001;
            /*background: red;*/

        }
        .a_jiantou {
            animation: bounce-up 1s linear infinite;
        }

    }

</style>