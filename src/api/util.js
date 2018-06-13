export default{
  // 全屏
  launchFullScreen: (element,that) =>{
    var element = element || document.documentElement
    that.fullScreen = !that.fullScreen
    console.log(that.fullScreen)
    console.log(element)
    if(that.fullScreen){
      console.log(1)
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
        } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
        }
    }else{
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozExitFullScreen) {
            document.mozExitFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    }
  }
}