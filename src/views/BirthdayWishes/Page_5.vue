<template>
    <div class="content-wrapper" :style="bgImg">

        <img class='photo_bg_3' v-bind:class="{a_photo_bg_3: isCurrentPage}"
             src='@/assets/photo_bg/photo_bg_3.png'>
        <img class='photo_bg_11' v-bind:class="{a_photo_bg_11: isCurrentPage}"
             src='@/assets/photo_bg/photo_bg_11.png'>

        <img class='leaf_23' v-bind:class="{a_leaf_23: isCurrentPage}"
             src='@/assets/leaf/leaf_23.png'>
        <!--<img class='leaf_9' v-bind:class="{a_leaf_9: isCurrentPage}"-->
             <!--src='@/assets/leaf/leaf_9.png'>-->
        <!--<img class='leaf_24' v-bind:class="{a_leaf_24: isCurrentPage}"-->
             <!--src='@/assets/leaf/leaf_24.png'>-->

        <!--<img class='flower_17' v-bind:class="{a_flower_17: isCurrentPage}"-->
             <!--src='@/assets/flower/flower_17.png'>-->
        <img class='flower_10' v-bind:class="{a_flower_10: isCurrentPage}"
             src='@/assets/flower/flower_10.png'>
        <img class='flower_5' v-bind:class="{a_flower_5: isCurrentPage}"
             src='@/assets/flower/flower_5.png'>
        <img class='flower_6' v-bind:class="{a_flower_6: isCurrentPage}"
             src='@/assets/flower/flower_6.png'>

        <img class='photo_13' v-bind:class="{a_photo_13: isCurrentPage}"
             src='@/assets/Ying/ying_15.jpeg'>
        <img class='photo_12' v-bind:class="{a_photo_12: isCurrentPage}"
             src='@/assets/Ying/ying_13.jpeg'>

        <img class='word_12' v-bind:class="{a_word_12: isCurrentPage}"
             src='@/assets/word/wpy_5.png'>

        <!--<img class="liwu" v-if="isShowPresent && !isShow" src="@/assets/liwu.png" v-bind:class="{a_liwu: isCurrentPage}" @click="showPresent">-->

        <div v-if="isShow" class="mask">
            <div  v-if="isShow" class="card">
                <img  class="bg" src='@/assets/present.png'/>
                <img  v-if="!isShowLabel" class="circle" src='@/assets/kai.png' @click="open"/>
                <div v-if="isShowLabel" style="font-size: 20px;text-align: center;margin-bottom: 30px;z-index: 100;color: #CB8C45;font-weight: 600">冰雪奇缘</div>
                <div v-if="isShowLabel" style="font-size: 14px;text-align: center;z-index: 100;color:#CB8C45;font-weight: 500">带你感受一下滑雪的乐趣</div>
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
                present:'冰雪奇缘',
                presentDesc:'带你感受一下滑雪的乐趣',
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

        .photo_bg_3 {
            position: absolute;
            object-fit: contain;
            height: 4.46rem;
            width: 5.69rem;
            left: 0.86rem;
            top: 6.95rem;
            z-index: 2;
        }
        .a_photo_bg_3 {
            animation: 2000ms ease-in-out 1000ms 1 normal both running fadeIn;
        }

        .photo_bg_11 {
            position: absolute;
            object-fit: contain;
            height: 4.44rem;
            width: 5.72rem;
            left: 0.92rem;
            top: 0.8rem;
            z-index: 2;
        }
        .a_photo_bg_11 {
            animation: 2000ms ease-in-out 500ms 1 normal both running fadeInDown;
        }

        .flower_17 {
            position: absolute;
            object-fit: contain;
            height: 0.56rem;
            width: 0.61rem;
            left: 6.51rem;
            top: 6.62rem;
            z-index: 3;
        }
        .a_flower_17 {
            animation: 2000ms ease-in-out 1000ms 1 normal both running zoomIn;
        }

        .leaf_23 {
            position: absolute;
            object-fit: contain;
            height: 2.21rem;
            width: 1.16rem;
            left: 6.06rem;
            top: 1.86rem;
            z-index: 1;
        }
        .a_leaf_23 {
            animation: 2000ms ease-in-out 1000ms 1 normal both running zoomIn;
        }

        .leaf_9 {
            position: absolute;
            object-fit: contain;
            height: 0.77rem;
            width: 2.06rem;
            left: 5.42rem;
            top: 6.62rem;
            z-index: 1;
        }
        .a_leaf_9 {
            animation: 2000ms ease-in-out 1000ms 1 normal both running fadeIn;
        }

        .leaf_24 {
            position: absolute;
            object-fit: contain;
            height: 2.82rem;
            width: 2.22rem;
            left: -0.14rem;
            top: -0.45rem;
            z-index: 4;
        }
        .a_leaf_24 {
            animation: 2000ms ease-in-out 1000ms 1 normal both running fadeInDown, 5000ms ease-in-out 3000ms infinite normal forwards running animate_leftTop;
        }

        .flower_10 {
            position: absolute;
            object-fit: contain;
            height: 0.53rem;
            width: 0.54rem;
            left: 6.63rem;
            top: 2.85rem;
            z-index: 3;
        }
        .a_flower_10 {
            animation: 2000ms ease-in-out 1000ms 1 normal both running zoomIn;
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

        .photo_13 {
            position: absolute;
            object-fit: contain;
            height: 4.26rem;
            width: 5.38rem;
            left: 1.08rem;
            top: 7.04rem;
            z-index: 3;
        }
        .a_photo_13 {
            animation: 2000ms ease-in-out 1000ms 1 normal both running fadeIn;
        }

        .photo_12 {
            position: absolute;
            object-fit: contain;
            height: 4.21rem;
            width: 5.52rem;
            left: 1.02rem;
            top: 0.88rem;
            z-index: 3;
        }
        .a_photo_12 {
            animation: 2000ms ease-in-out 500ms 1 normal both running fadeInDown;
        }

        .word_12 {
            position: absolute;
            object-fit: contain;
            height: 2rem;
            width: 5.55rem;
            left: 0.98rem;
            top: 5.1rem;
            z-index: 5;
        }
        .a_word_12 {
            animation: 2000ms ease-in-out 1500ms 1 normal both running fadeIn;
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
