<template>
    <div class="homeRight_content">
        <div class="" v-for="item in pageList">
            <h2 class="homeRight_title">{{item.title}}</h2>
            <p class="homeRight_desc">{{item.desc}}</p>
            <div class="homeRight_container">
                <div class="homeRight_date">{{item.date}}</div>
                <div class="homeRight_action" @click="goPageDetail(item)"> 继续阅读</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "PageList",
        data() {
            return {
                pageList:[{title:'关于 Swift defer 的正确使用',desc:'其实这篇文章的缘起是由于在对 Kingfisher 做重构的时候，因为自己对 defer 的理解不够准确，导致了一个 bug。所以想藉由这篇文章探索一下 defer 这个关键字的一些 edge case。典型用法Swift 里的 defer 大家应该都很熟悉了，defer 所声明的 block 会在当前代码执行退出后被调用。正因为它提供了一种延时调用的方式，所以一般会被用来做资源释放或者销毁，这在某个函数有多个返回出口的时候特别有用。比如下面的通过 FileHandle 打开文件进行操作的...…',date:'2018-12-02'}, {title:'十年前的日记们',desc:'假如我有时光机最近把工作上的事情忙完了，也把主机从美国换到了日本的机房，解决了国内的访问问题，所以准备开始好好重新拾掇一下，恢复定期更新 blog。其实我从大学时就有开始写 blog 的习惯了。不过不像最近的独立博客，那时候更多地是用新浪或者搜狐这样的平台，所以也就在那些地方也留下了不少“足迹”。既然是自己“存在过的证明”，我想可能还是把它们汇总一下，留个存档为好。于是就有了这篇和“技术”没什么关系的文章。这里面是我从 2006 年底到 2010 年三月期间的一些碎碎念，时间跨越从大二上半...…',date:'2018-12-02'},
                    {title:'开发者所需要知道的 WWDC 2018 新特性',desc:'一直阅读我的博客的朋友可能知道，我在每年 WWDC 之后都会写 (水) 一篇关于新 SDK 和开发工具的文章。之前这个系列叫做《开发者所需要知道的 iOS SDK 新特性》，但是最近虽然 Craig 嘴上说着不要，身体却很诚实地将 iOS 和 macOS 带到一起，所以今年我觉得可以改一改题目，就总览一下作为 Apple 生态圈的开发者，在今年 WWDC 上我个人的一些观察，以及可能应该注意的有趣的地方。在会前，Apple 就已经放出消息要放慢增加新功能的脚步，转而提升软件稳定性和可靠性。...…',date:'2018-12-02'}],

                PageListPath:'PageList',
            }
        },

        methods:{
            goPageDetail(){

                this.$router.push({path: '/home/PageDetail'})
            }
        },


    }
</script>

<style scoped>

    .homeRight_content{
        margin: 50px 10%;
        padding: 0px;
        /*background-color: darkgreen;*/
    }

    .homeRight_title{
        text-align: left;
        font-family: "ff-tisa-web-pro-1", "ff-tisa-web-pro-2", "Lucida Grande", "Hiragino Sans GB", "Hiragino Sans GB W3", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;
        font-weight: lighter;
        color: #333333;
        -webkit-font-smoothing: antialiased;
        margin: 20px 0 10px;
    }

    .homeRight_desc{
        text-align: left;
        margin: 0;
        font-size: .9em;
        color: #999999;
    }

    .homeRight_container{
        display: flex;
        margin-top: 10px;
        /*background-color: darkgreen;*/
    }
    .homeRight_date {
        text-align: left;
        line-height: 20px;
        font-size: 14px;
        color: #c7c7c7;
    }
    .homeRight_action{
        margin-left: 20px;
        line-height: 20px;
        font-size: 14px;
        color: darkred;
    }

</style>