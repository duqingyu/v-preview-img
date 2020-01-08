/**
 * 预览图片自定义指令插件
 * v-preview-img
 * 注意: nuxt框架的id为__nuxt
 */

const createElement = name => document.createElement(name)
const getElementById = name => document.getElementById(name)

let appBox = null
let divBox = null
let imgBox = null

const previewImgPlugin = {
  install: (Vue, id = 'app') => {
    Vue.directive('preview-img', {
      inserted: el => {
        el.style.cursor = 'pointer'
        el.title = '点击可查看大图'
    
        if (!appBox || !divBox || !imgBox) {
          // 创建容器
          appBox = getElementById(id)
          divBox = createElement('div')
          imgBox = createElement('img')
          divBox.appendChild(imgBox)
          divBox.style.display = 'none'
          appBox.appendChild(divBox)
          // 设置样式
          divBox.style.cssText = `position: fixed;
            z-index: 9;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            visibility:hidden;
            display: flex;
            justify-content: center;
            align-items: center;
            background: rgba(0, 0, 0, 0.5);
            opacity: 0;
            transition: opacity 0.5s ease`
          imgBox.style.cssText = `flex: none;
            max-width: 80%;
            max-height: 80%;`
        }
    
        // 添加事件
        el.addEventListener('click', () => {
          imgBox.src = el.src
          divBox.style.opacity = 1
          divBox.style.visibility = 'visible'
        })
        divBox.addEventListener('click', () => {
          divBox.style.opacity = 0
          divBox.style.visibility = 'hidden'
        })
      }
    })
  }
}

export default previewImgPlugin