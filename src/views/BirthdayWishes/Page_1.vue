<template>
    <div class="content-wrapper" :style="bgImg">

        <!--<img class='leaf_1' v-bind:class="{a_leaf_1: isCurrentPage}"-->
             <!--src='@/assets/leaf/leaf_1.png'>-->
        <!--<img class='leaf_2' v-bind:class="{a_leaf_2: isCurrentPage}"-->
             <!--src='@/assets/leaf/leaf_2.png'>-->
        <!--<img class='leaf_3' v-bind:class="{a_leaf_3: isCurrentPage}"-->
             <!--src='@/assets/leaf/leaf_3.png'>-->
        <!--<img class='leaf_4' v-bind:class="{a_leaf_4: isCurrentPage}"-->
             <!--src='@/assets/leaf/leaf_4.png'>-->
        <img class='name_1' v-bind:class="{a_name_1: isCurrentPage}"
             src='@/assets/word/wpy_10.png'>
        <img class='name_2' v-bind:class="{a_name_2: isCurrentPage}"
             src='@/assets/word/wpy_13.png'>

        <img class='flower_14' v-bind:class="{a_flower_14: isCurrentPage}"
             src='@/assets/flower/flower_14.png'>
        <!--<img class='flower_2' v-bind:class="{a_flower_2: isCurrentPage}"-->
                                                      <!--src='@/assets/flower/flower_2.png'>-->
        <img class='flower_13' v-bind:class="{a_flower_13: isCurrentPage}"
             src='@/assets/flower/flower_13.png'>
        <img class='flower_10' v-bind:class="{a_flower_10: isCurrentPage}"
             src='@/assets/flower/flower_10.png'>
        <img class='flower_20' v-bind:class="{a_flower_20: isCurrentPage}"
             src='@/assets/flower/flower_20.png'>

        <!--<img class='word_2' v-bind:class="{a_word_1: isCurrentPage}"-->
             <!--src='@/assets/word/word_2.png'>-->
        <!--<img class='word_1' v-bind:class="{a_word_2: isCurrentPage}"-->
             <!--src='@/assets/word/word_2.png'>-->

        <img class='photo_bg_15' v-bind:class="{a_photo_bg_15: isCurrentPage}"
             src='@/assets/photo_bg/photo_bg_15.png'>

        <img class='photo_10' v-bind:class="{a_photo_10: isCurrentPage}"
             src='@/assets/Ying/ying_1.jpeg'>

        <img  class='jiantou' v-bind:class="{a_jiantou: isCurrentPage}"
             src='@/assets/word/jiantou.png'>

        <!--<img class="liwu" v-if="isShowPresent && !isShow" src="@/assets/liwu.png" v-bind:class="{a_liwu: isCurrentPage}" @click="showPresent">-->

        <div v-if="isShow" class="mask">
            <div  v-if="isShow" class="card">
                <img  class="bg" src='@/assets/present.png'/>
                <img  v-if="!isShowLabel" class="circle" src='@/assets/kai.png' @click="open"/>
                <div v-if="isShowLabel" style="font-size: 20px;text-align: center;margin-bottom: 30px;z-index: 100;color: #CB8C45;font-weight: 600">自由电影</div>
                <div v-if="isShowLabel" style="font-size: 14px;text-align: center;z-index: 100;color:#CB8C45;font-weight: 500">只要我能及时赶到，无论什么时间，看什么</div>
                <div v-if="isShowLabel" class="btn" @click="selectThePresent">{{btnTitle}}</div>
            </div>
        </div>
    </div>
</template>

<script>

    import {httpGet,httpPost} from '@/utils/app';
    import bgImage from '@/assets/photo_bg/bg.jpg';

    export default {
        name: 'Page_2',
        props: {
            isCurrentPage: {type: Boolean, default: false},
            isShowPresent: {type: Boolean, default: false},
        },
        watch:{
            isShowPresent(val){
                this.isShowPresent = val
                this.isShow = val

                let str = sessionStorage.getItem('presentSelected')
                if (str && str.length > 0){
                    this.btnTitle = '关闭'
                } else {
                    this.btnTitle = '就选这个了'
                }
            }
        },
        data() {
            return {
                bgImg: {
                    backgroundImage: "url(" + bgImage + ")"
                },
                isShow:false,
                isShowLabel:false,
                btnTitle:sessionStorage.getItem('presentSelected')? '关闭':'就选这个了',
                present:'自由电影',
                presentDesc:'只要我能及时赶到，无论什么时间，看什么',
            }
        },
        methods:{
            showPresent(){
                this.isShow = true
            },
            open(){
                this.isShowLabel = true
            },
            selectThePresent(){

                let  str =  sessionStorage.getItem('presentSelected')

                if (str && str.length > 0){
                    this.isShow = false
                } else {
                    sessionStorage.setItem('presentSelected',this.present)
                    this.isShow = false
                }
                this.$emit('showChange',this.isShow)
            },
        },
        mounted() {

        },
    }
</script>

<style scoped lang="scss">

    .content-wrapper {
        position: relative;
        width: 100%;
        height: 100%;
        overflow: hidden;


        .flower_13 {
            position: absolute;
            object-fit: contain;
            height: 0.43rem;
            width: 0.46rem;
            left: 4.76rem;
            top: calc(100vh - 2.4rem);
            z-index: 2;
        }
        .a_flower_13 {
            animation: 3000ms ease-in-out 500ms 1 normal both running zoomIn;
        }

        .flower_10 {
            position: absolute;
            object-fit: contain;
            height: 0.61rem;
            width: 0.59rem;
            left: 1.59rem;
            top: calc(100vh - 2.6rem);
            z-index: 2;
        }
        .a_flower_10 {
            animation: 3000ms ease-in-out 500ms 1 normal both running zoomIn;
        }

        .flower_20 {
            position: absolute;
            object-fit: contain;
            height: 1.75rem;
            width: 1.77rem;
            left: 2.84rem;
            top: calc(100vh - 1.9rem);
            z-index: 2;
        }
        .a_flower_20 {
            animation: 3000ms ease-in-out 500ms 1 normal both running zoomIn;
        }

        .leaf_1 {
            position: absolute;
            object-fit: contain;
            height: 2.25rem;
            width: 0.88rem;
            left: 1.87rem;
            top: calc(100vh - 2.25rem);
            z-index: 2;
        }
        .a_leaf_1 {
            animation: 1000ms ease-in-out 500ms 1 normal both running rotateInDownLeft;
        }

        .leaf_2 {
            position: absolute;
            object-fit: contain;
            height: 2.87rem;
            width: 0.71rem;
            left: 0.53rem;
            top: calc(100vh - 2.87rem);
            z-index: 2;
        }
        .a_leaf_2 {
            animation: 1000ms ease-in-out 500ms 1 normal both running rotateInUpLeft;
        }

        .leaf_3 {
            position: absolute;
            object-fit: contain;
            height: 2.19rem;
            width: 1rem;
            left: 1.09rem;
            top: calc(100vh - 2.19rem);
            z-index: 2;
        }
        .a_leaf_3 {
            animation: 1000ms ease-in-out 500ms 1 normal both running rotateInDownLeft;
        }

        .flower_14 {
            position: absolute;
            object-fit: contain;
            height: 3.37rem;
            width: 3.3rem;
            left: 5.6rem;
            top: calc(100vh - 4rem);
            z-index: 5;
        }
        .a_flower_14 {
            animation: 3000ms ease-in-out 500ms 1 normal both running zoomIn;
        }

        .leaf_4 {
            position: absolute;
            object-fit: contain;
            height: 1.95rem;
            width: 0.96rem;
            left: 4.59rem;
            top: calc(100vh - 2rem);
            z-index: 2;
        }
        .a_leaf_4 {
            animation: 1000ms ease-in-out 500ms 1 normal both running rotateInDownRight;
        }

        .name_1 {
            position: absolute;
            object-fit: contain;
            text-align: right;
            height: 2.95rem;
            width: 4.5rem;
            left: 0.5rem;
            top: 8.45rem;
            z-index: 4;
        }
        .a_name_1 {
            animation: 2000ms ease-in-out 1000ms 1 normal both running fadeInLeft30per;
        }

        .name_2 {
            position: absolute;
            object-fit: contain;
            height: 0.65rem;
            width: 1.7rem;
            left: 4.04rem;
            top: 10.75rem;
            z-index: 4;
        }
        .a_name_2 {
            animation: 2000ms ease-in-out 1000ms 1 normal both running fadeInRight30per;
        }

        .word_1 {
            position: absolute;
            object-fit: contain;
            height: 0.93rem;
            width: 1.52rem;
            left: 1.3rem;
            top: 8.29rem;
            z-index: 3;
        }
        .a_word_1 {
            animation: 1000ms ease-in-out 1000ms 1 normal both running fadeInLeft;
        }

        .word_2 {
            position: absolute;
            object-fit: contain;
            height: 0.69rem;
            width: 2.5rem;
            left: 4.6rem;
            top: 0.55rem;
            z-index: 3;
        }
        .a_word_2 {
            animation: 1000ms ease-in-out 1000ms 1 normal both running fadeInRight;
        }

        .flower_2 {
            position: absolute;
            object-fit: contain;
            height: 0.55rem;
            width: 0.58rem;
            left: 4.97rem;
            top: 0.34rem;
            z-index: 3;
        }
        .a_flower_2 {
            animation: 1000ms ease-in-out 1200ms 1 normal both running fadeIn;
        }

        .photo_bg_15 {
            position: absolute;
            object-fit: contain;
            height: 8.35rem;
            width: 6.53rem;
            left: 0.55rem;
            top: 0.67rem;
            z-index: 1;
        }
        .a_photo_bg_15 {
            animation: 2000ms ease-in-out 500ms 1 normal both running zoomIn;
        }

        .photo_10 {
            position: absolute;
            object-fit: contain;
            height: 7.97rem;
            width: 6.35rem;
            left: 0.64rem;
            top: 0.79rem;
            z-index: 2;
        }
        .a_photo_10 {
            animation: 2000ms ease-in-out 500ms 1 normal both running zoomIn;
        }

        .jiantou {
            position: absolute;
            object-fit: contain;
            height: 0.4rem;
            width: 0.7rem;
            left: 3.4rem;
            top: calc(100vh - 0.7rem);
            z-index: 1001;

        }
        .a_jiantou {
            animation: bounce-up 2s linear infinite;
        }

        .liwu {
            position: absolute;
            object-fit: contain;
            height: 2rem;
            width: 2rem;
            left: 2.8rem;
            top: calc(100vh - 4rem);
            z-index: 999;
            /*background: red;*/

        }
        .a_liwu {
            animation: bounce-up 1s linear infinite;
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
            background: rgba(0, 0, 0, 0.8);
            object-fit: cover;
            object-position: center center;
        }

        .card{
            position: relative;
            display:flex;
            width: 4.5rem;
            height: 6.1rem;
            border-radius: 18px;
            background: white;
            opacity: 0.9;
            padding:30px 20px 20px 20px;
            flex-direction:column;
            align-items: center;
            /*background: rgba(0,0,0,0);*/

            .bg{
                position: absolute;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
                width: 100%;
                height: 100%;
                object-fit: cover;
                object-position: center;
            }

            .circle{
                position: absolute;
                width: 1.6rem;
                height: 1.6rem;
                border-radius: 50%;
                bottom: 1.2rem;
                object-fit: cover;
                object-position: center;
                pointer-events: auto;
            }

            .btn{
                position: absolute;
                height: 30px;
                width: 100px;
                border-radius: 15px;
                border: 2px solid #CB8C45;
                line-height: 30px;
                text-align: center;
                bottom: 0.5rem;
                z-index: 101;
                font-size: 14px;
                color: #CB8C45;
            }
        }

    }


</style>
