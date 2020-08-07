<template>
  <div id="app">
    <router-view />
  </div>
</template>
// <script>
// function loadScript(url, func) {
//   var head = document.head || document.getElementByTagName("head")[0];
//   var script = document.createElement("script");
//   script.src = url;

//   script.onload = script.onreadystatechange = function () {
//     if (
//       !this.readyState ||
//       this.readyState == "loaded" ||
//       this.readyState == "complete"
//     ) {
//       func();
//       script.onload = script.onreadystatechange = null;
//     }
//   };

//   head.insertBefore(script, 0);
// }
// window.baidu = {
//   sug: function (data) {
//     console.log(data);
//   },
// };
// loadScript("http://192.168.0.117:8080", function () {
//   console.log("loaded");
// });
//
</script>
<style lang="stylus"></style>
