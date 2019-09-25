<template>
    <div class="content-wrapper" :style="bgImg">


        <img class='word_5' v-bind:class="{a_word_5: isCurrentPage}"
             src='@/assets/word/word_5.png'>
        <img class='word_4' v-bind:class="{a_word_4: isCurrentPage}"
             src='@/assets/word/wpy_14.png'>
        <img class='word_3' v-bind:class="{a_word_3: isCurrentPage}"
             src='@/assets/word/wpy_15.png'>

        <!--<img class='flower_15' v-bind:class="{a_flower_15: isCurrentPage}"-->
             <!--src='@/assets/flower/flower_15.png'>-->
        <!--<img class='flower_20' v-bind:class="{a_flower_20: isCurrentPage}"-->
             <!--src='@/assets/flower/flower_20.png'>-->
        <!--<img class='flower_2' v-bind:class="{a_flower_2: isCurrentPage}"-->
             <!--src='@/assets/flower/flower_2.png'>-->
        <!--<img class='flower_12' v-bind:class="{a_flower_12: isCurrentPage}"-->
             <!--src='@/assets/flower/flower_12.png'>-->
        <!--<img class='flower_16' v-bind:class="{a_flower_16: isCurrentPage}"-->
             <!--src='@/assets/flower/flower_16.png'>-->
        <img class='flower_5' v-bind:class="{a_flower_5: isCurrentPage}"
             src='@/assets/flower/flower_5.png'>
        <img class='flower_6' v-bind:class="{a_flower_6: isCurrentPage}"
             src='@/assets/flower/flower_6.png'>

        <!--<img class='leaf_15' v-bind:class="{a_leaf_15: isCurrentPage}"-->
             <!--src='@/assets/leaf/leaf_15.png'>-->
        <!--<img class='leaf_16' v-bind:class="{a_leaf_16: isCurrentPage}"-->
             <!--src='@/assets/leaf/leaf_16.png'>-->
        <!--<img class='leaf_17' v-bind:class="{a_leaf_17: isCurrentPage}"-->
             <!--src='@/assets/leaf/leaf_17.png'>-->
        <!--<img class='leaf_18' v-bind:class="{a_leaf_18: isCurrentPage}"-->
             <!--src='@/assets/leaf/leaf_18.png'>-->
        <!--<img class='leaf_16_2' v-bind:class="{a_leaf_16_2: isCurrentPage}"-->
             <!--src='@/assets/leaf/leaf_16.png'>-->


        <img class='photo_4' v-bind:class="{a_photo_4: isCurrentPage}"
             src='@/assets/weiwei/wei_5.jpeg'>
        <img class='photo_5' v-bind:class="{a_photo_5: isCurrentPage}"
             src='@/assets/weiwei/wei_11.jpeg'>
        <img class='photo_11' v-bind:class="{a_photo_11: isCurrentPage}"
             src='@/assets/weiwei/wei_4.jpeg'>

        <img class='photo_bg_9' v-bind:class="{a_photo_bg_9: isCurrentPage}"
             src='@/assets/photo_bg/photo_bg_9.png'>
        <img class='photo_bg_13' v-bind:class="{a_photo_bg_13: isCurrentPage}"
             src='@/assets/photo_bg/photo_bg_13.png'>
        <img class='photo_bg_14' v-bind:class="{a_photo_bg_14: isCurrentPage}"
             src='@/assets/photo_bg/photo_bg_14.png'>

        <div v-if="isShow" class="mask">
            <div  v-if="isShow" class="card">
                <img  class="bg" src='@/assets/present.png'/>
                <img  v-if="!isShowLabel" class="circle" src='@/assets/kai.png' @click="open"/>
                <div v-if="isShowLabel" style="font-size: 20px;text-align: center;margin-bottom: 30px;z-index: 100;color: #CB8C45;font-weight: 600">空白愿望单</div>
                <div v-if="isShowLabel" style="font-size: 14px;text-align: center;z-index: 100;color:#CB8C45;font-weight: 500">我力所能及的合理愿望都可以，比如 把你从你家领走(-_-)</div>
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
            isShowPresent: {type: Boolean, default: false}
        },
        data() {
            return {
                bgImg: {
                    backgroundImage: "url(" + bgImage + ")"
                },
                isShow:false,
                isShowLabel:false,
                btnTitle:sessionStorage.getItem('presentSelected')? '关闭':'就选这个了',
                present:'空白愿望单',
                presentDesc:'我力所能及的合理愿望都可以，比如 把你从你家领走(-_-)',
            }
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


        .word_5 {
            position: absolute;
            object-fit: contain;
            height: 0.99rem;
            width: 2.25rem;
            left: 0.92rem;
            top: calc(100vh - 3rem);
            z-index: 3;
        }
        .a_word_5 {
            animation: 2000ms ease-in-out 700ms 1 normal both running fadeIn;
        }

        .photo_bg_9 {
            position: absolute;
            object-fit: contain;
            height: 4.19rem;
            width: 4.27rem;
            left: 1.11rem;
            top: 0.55rem;
            z-index: 2;
        }
        .a_photo_bg_9 {
            animation: 3000ms ease-in-out 700ms 1 normal both running fadeIn;
        }

        .photo_bg_13 {
            position: absolute;
            object-fit: contain;
            height: 3.7rem;
            width: 4.93rem;
            left: 0.5rem;
            top: 4rem;
            z-index: 4;
        }
        .a_photo_bg_13 {
            animation: 2000ms ease-in-out 500ms 1 normal both running fadeInLeft;
        }

        .photo_bg_14 {
            position: absolute;
            object-fit: contain;
            height: 4.68rem;
            width: 3.85rem;
            left: 3.24rem;
            top: 5.83rem;
            z-index: 2;
        }
        .a_photo_bg_14 {
            animation: 3000ms ease-in-out 700ms 1 normal both running fadeIn;
        }

        .flower_15 {
            position: absolute;
            object-fit: contain;
            height: 1rem;
            width: 1.09rem;
            left: 4.47rem;
            top: calc(100vh - 1.1rem);
            z-index: 3;
        }
        .a_flower_15 {
            animation: 2000ms ease-in-out 1000ms 1 normal both running zoomIn;
        }

        .word_3 {
            position: absolute;
            object-fit: contain;
            height: 3.35rem;
            width: 0.35rem;
            left: 6.66rem;
            top: 2.17rem;
            z-index: 3;
        }
        .a_word_3 {
            animation: 2000ms ease-in-out 700ms 1 normal both running fadeIn;
        }

        .leaf_15 {
            position: absolute;
            object-fit: contain;
            height: 2.12rem;
            width: 3.15rem;
            left: -0.37rem;
            top: calc(100vh - 2.2rem);
            z-index: 2;
        }
        .a_leaf_15 {
            animation: 2000ms ease-in-out 500ms 1 normal both running rotateInDownLeft;
        }

        .leaf_16 {
            position: absolute;
            object-fit: contain;
            height: 1.45rem;
            width: 2.61rem;
            left: 3.23rem;
            top: calc(100vh - 1.5rem);
            z-index: 2;
        }
        .a_leaf_16 {
            animation: 2000ms ease-in-out 500ms 1 normal both running rotateInDownRight;
        }

        .flower_20 {
            position: absolute;
            object-fit: contain;
            height: 0.72rem;
            width: 0.72rem;
            left: 2.88rem;
            top: calc(100vh - 1rem);
            z-index: 3;
        }
        .a_flower_20 {
            animation: 2000ms ease-in-out 1000ms 1 normal both running zoomIn;
        }

        .flower_2 {
            position: absolute;
            object-fit: contain;
            height: 0.55rem;
            width: 0.58rem;
            left: 0.82rem;
            top: 8.43rem;
            z-index: 3;
        }
        .a_flower_2 {
            animation: 500ms ease-in-out 700ms 1 normal both running rollIn;
        }


        .leaf_17 {
            position: absolute;
            object-fit: contain;
            height: 1.33rem;
            width: 0.99rem;
            left: 2.34rem;
            top: calc(100vh - 2rem);
            z-index: 2;
        }
        .a_leaf_17 {
            animation: 2000ms ease-in-out 500ms 1 normal both running rotateInDownLeft;
        }

        .flower_12 {
            position: absolute;
            object-fit: contain;
            height: 0.77rem;
            width: 0.75rem;
            left: 0.66rem;
            top: calc(100vh - 2rem);
            z-index: 3;
        }
        .a_flower_12 {
            animation: 2000ms ease-in-out 1000ms 1 normal both running zoomIn;
        }

        .leaf_18 {
            position: absolute;
            object-fit: contain;
            height: 0.98rem;
            width: 0.94rem;
            left: 4.91rem;
            top: calc(100vh - 1.2rem);
            z-index: 2;
        }
        .a_leaf_18 {
            animation: 2000ms ease-in-out 500ms 1 normal both running rotateInDownRight;
        }

        .flower_16 {
            position: absolute;
            object-fit: contain;
            height: 1.39rem;
            width: 0.32rem;
            left: 6.63rem;
            top: calc(100vh - 1.5rem);
            z-index: 3;
        }
        .a_flower_16 {
            animation: 2000ms ease-in-out 500ms 1 normal both running rotateInDownRight;
        }

        .flower_5 {
            position: absolute;
            object-fit: contain;
            height: 5.41rem;
            width: 4.53rem;
            left: 0rem;
            top: 8.43rem;
            z-index: 1;
        }
        .a_flower_5 {
            animation: 500ms ease-in-out 200ms 1 normal both running fadeIn;
        }

        .flower_6 {
            position: absolute;
            object-fit: contain;
            height: 5.46rem;
            width: 4.73rem;
            left: 2.7rem;
            top: -2.08rem;
            z-index: 1;
        }
        .a_flower_6 {
            animation: 500ms ease-in-out 200ms 1 normal both running fadeIn;
        }

        .word_4 {
            position: absolute;
            object-fit: contain;
            height: 3.35rem;
            width: 0.35rem;
            left: 6.15rem;
            top: 2.17rem;
            z-index: 3;
        }
        .a_word_4 {
            animation: 2000ms ease-in-out 500ms 1 normal both running fadeIn;
        }

        .leaf_16_2 {
            position: absolute;
            object-fit: contain;
            height: 1.08rem;
            width: 2.5rem;
            left: 5.55rem;
            top: calc(100vh - 1rem);
            z-index: 2;
        }
        .a_leaf_16_2 {
            animation: 2000ms ease-in-out 500ms 1 normal both running rotateInDownRight;
        }

        .photo_4 {
            position: absolute;
            object-fit: contain;
            height: 4.02rem;
            width: 3.89rem;
            left: 1.33rem;
            top: 0.67rem;
            z-index: 3;
        }
        .a_photo_4 {
            animation: 3000ms ease-in-out 700ms 1 normal both running fadeIn;
        }

        .photo_5 {
            position: absolute;
            object-fit: contain;
            height: 3.44rem;
            width: 4.75rem;
            left: 0.59rem;
            top: 4.13rem;
            z-index: 5;
        }
        .a_photo_5 {
            animation: 2000ms ease-in-out 500ms 1 normal both running fadeInLeft;
        }

        .photo_11 {
            position: absolute;
            object-fit: contain;
            height: 4.44rem;
            width: 3.56rem;
            left: 3.38rem;
            top: 5.93rem;
            z-index: 3;
        }
        .a_photo_11 {
            animation: 3000ms ease-in-out 700ms 1 normal both running fadeIn;
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
