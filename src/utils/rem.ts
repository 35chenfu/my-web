// rem等比适配配置文件

setTimeout(() => {
  const baseSize = 16
  // 设置 rem 函数
  function setRem() {
    let width = document.documentElement.clientWidth
    let num = 0
    if (width <= 480) {
      num = 375
    } else if (width <= 980 && width > 480) {
      num = 1220
    } else if (width <= 1300 && width > 980) {
      num = 1320
    } else if (width <= 1600 && width > 1300) {
      num = 1620
    } else {
      num = 1920
    }
    const scale = document.documentElement.clientWidth / num
    // 设置页面根节点字体大小（“Math.min(scale, 2)” 指最高放大比例为2，可根据实际业务需求调整）
    document.documentElement.style.fontSize = baseSize * Math.min(scale, 2) + 'px'

  }
  // 初始化
  setRem()
  // 改变窗口大小时重新设置 rem
  window.onresize = function () {
    setRem()
  }

}, 0);

