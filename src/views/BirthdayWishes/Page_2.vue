<template>
    <div class="content-wrapper" :style="bgImg">

        <!--<img class='leaf_5' v-bind:class="{a_leaf_5: isCurrentPage}"-->
             <!--src='@/assets/leaf/leaf_5.png'>-->
        <img class='leaf_7' v-bind:class="{a_leaf_7: isCurrentPage}"
             src='@/assets/leaf/leaf_7.png'>
        <!--<img class='leaf_4' v-bind:class="{a_leaf_4: isCurrentPage}"-->
             <!--src='@/assets/leaf/leaf_4.png'>-->


        <!--<img class='flower_3' v-bind:class="{a_flower_3: isCurrentPage}"-->
             <!--src='@/assets/flower/flower_3.png'>-->
        <!--<img class='flower_10' v-bind:class="{a_flower_10: isCurrentPage}"-->
             <!--src='@/assets/flower/flower_10.png'>-->
        <img class='flower_5' v-bind:class="{a_flower_5: isCurrentPage}"
             src='@/assets/flower/flower_5.png'>
        <img class='flower_6' v-bind:class="{a_flower_6: isCurrentPage}"
             src='@/assets/flower/flower_6.png'>
        <!--<img class='flower_7' v-bind:class="{a_flower_7: isCurrentPage}"-->
             <!--src='@/assets/flower/flower_7.png'>-->

        <img class='photo_bg_11' v-bind:class="{a_photo_bg_11: isCurrentPage}"
             src='@/assets/photo_bg/photo_bg_11.png'>
        <img class='photo_bg_10' v-bind:class="{a_photo_bg_10: isCurrentPage}"
             src='@/assets/photo_bg/photo_bg_10.png'>

        <img class='photo_2' v-bind:class="{a_photo_2: isCurrentPage}"
             src='@/assets/Ying/ying_2.jpeg'>
        <img class='photo_3' v-bind:class="{a_photo_3: isCurrentPage}"
             src='@/assets/Ying/ying_3.jpeg'>

        <img class='word_1' v-bind:class="{a_word_1: isCurrentPage}"
             src='@/assets/word/wpy_8.png'>

        <!--<img class="liwu" v-if="isShowPresent && !isShow" src="@/assets/liwu.png" v-bind:class="{a_liwu: isCurrentPage}" @click="showPresent">-->

        <div v-if="isShow" class="mask">
            <div  v-if="isShow" class="card">
                <img  class="bg" src='@/assets/present.png'/>
                <img  v-if="!isShowLabel" class="circle" src='@/assets/kai.png' @click="open"/>
                <div v-if="isShowLabel" style="font-size: 20px;text-align: center;margin-bottom: 30px;z-index: 100;color: #CB8C45;font-weight: 600">说走就走的旅行</div>
                <div v-if="isShowLabel" style="font-size: 14px;text-align: center;z-index: 100;color:#CB8C45;font-weight: 500">目的地你说了算</div>
                <div v-if="isShowLabel" class="btn" @click="selectThePresent">{{btnTitle}}</div>
            </div>
        </div>
    </div>
</template>

<script>

    import {httpGet,httpPost} from '@/utils/app';
    import bgImage from '@/assets/photo_bg/bg.jpg';

    export default {
        name: 'Page_3',
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
                present:'说走就走的旅行',
                presentDesc:'目的地你说了算',
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

        .flower_3 {
            position: absolute;
            object-fit: contain;
            height: 1.79rem;
            width: 2.78rem;
            left: 4.36rem;
            top: calc(100vh - 1.8rem);
            z-index: 6;
        }
        .a_flower_3 {
            animation: 2000ms ease-in-out 1400ms 1 normal both running fadeInRight;
        }

        .photo_bg_10 {
            position: absolute;
            object-fit: contain;
            height: 4.69rem;
            width: 5.84rem;
            left: 1.07rem;
            top: 6.69rem;
            z-index: 2;
        }
        .a_photo_bg_10 {
            animation: 2000ms ease-in-out 700ms 1 normal both running fadeInLeft;
        }

        .photo_bg_11 {
            position: absolute;
            object-fit: contain;
            height: 4.57rem;
            width: 5.62rem;
            left: 0.6rem;
            top: 0.59rem;
            z-index: 4;
        }
        .a_photo_bg_11 {
            animation: 2000ms ease-in-out 700ms 1 normal both running fadeInRight;
        }

        .leaf_5 {
            position: absolute;
            object-fit: contain;
            height: 1.29rem;
            width: 1.42rem;
            left: 1.77rem;
            top: calc(100vh - 1.29rem);
            z-index: 2;
        }
        .a_leaf_5 {
            animation: 1000ms ease-in-out 500ms 1 normal both running rotateInDownLeft;
        }

        .leaf_7 {
            position: absolute;
            object-fit: contain;
            height: 3.44rem;
            width: 1.16rem;
            left: 5.39rem;
            top: -0.37rem;
            z-index: 6;
        }
        .a_leaf_7 {
            animation: 2000ms ease-in-out 200ms 1 normal both running fadeInDown,
            5000ms ease-in-out 2200ms infinite normal forwards running animate_rightTop;
        }

        .flower_10 {
            position: absolute;
            object-fit: contain;
            height: 0.61rem;
            width: 0.59rem;
            left: 1.93rem;
            top: calc(100vh - 1.5rem);
            z-index: 3;
        }
        .a_flower_10 {
            animation: 1000ms ease-in-out 500ms 1 normal both running zoomIn;
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

        .flower_7 {
            position: absolute;
            object-fit: contain;
            height: 1.29rem;
            width: 0.99rem;
            left: 1.13rem;
            top: calc(100vh - 1rem);
            z-index: 3;
        }
        .a_flower_7 {
            animation: 1000ms ease-in-out 500ms 1 normal both running rotateInDownLeft;
        }

        .leaf_4 {
            position: absolute;
            object-fit: contain;
            height: 1.95rem;
            width: 0.96rem;
            left: 0.28rem;
            top: calc(100vh - 1.95rem);
            z-index: 2;
        }
        .a_leaf_4 {
            animation: 1000ms ease-in-out 500ms 1 normal both running rotateInDownRight;
        }

        .photo_2 {
            position: absolute;
            object-fit: contain;
            height: 4.38rem;
            width: 5.52rem;
            left: 1.23rem;
            top: 6.84rem;
            z-index: 3;
            overflow: hidden;
        }
        .a_photo_2 {
            animation: 2000ms ease-in-out 700ms 1 normal both running fadeInLeft;
        }

        .photo_3 {
            position: absolute;
            object-fit: contain;
            height: 4.3rem;
            width: 5.32rem;
            left: 0.75rem;
            top: 0.73rem;
            z-index: 5;
        }
        .a_photo_3 {
            animation: 2000ms ease-in-out 700ms 1 normal both running fadeInRight;
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


        .word_1 {
            position: absolute;
            object-fit: contain;
            height: 2.93rem;
            width: 4.52rem;
            left: 1.5rem;
            top: 4.59rem;
            z-index: 3;
        }
        .a_word_1 {
            animation: 1000ms ease-in-out 1000ms 1 normal both running fadeInLeft;
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
