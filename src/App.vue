<template>
  <div id="app">
    <keep-alive>
    <router-view v-if="$route.meta.keepAlive">
    </router-view>
    </keep-alive>

    <router-view v-if="!$route.meta.keepAlive">
    </router-view>
  </div>
</template>

<style>

  html, body,#app{
    height: 100%;
    margin: 0;

    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    font-size: 14px;
  }

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
