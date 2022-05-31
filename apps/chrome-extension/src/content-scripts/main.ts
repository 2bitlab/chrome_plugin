/* eslint-disable no-restricted-globals */
import { createApp } from 'vue'
import App from './App.vue'
const MOUNT_EL_ID = 'attonex_clipper'

let mountEl = document.getElementById(MOUNT_EL_ID)
if (mountEl) {
  mountEl.innerHTML = ''
}
mountEl = document.createElement('div')
mountEl.setAttribute('id', MOUNT_EL_ID)
document.body.appendChild(mountEl)

const vm = createApp(App).mount(mountEl)

chrome.runtime.onMessage.addListener(message => {
  console.log(`content-scripts chrome.runtime.onMessage`, message)
  if (message.toggleVisible) {
    ;(vm as any).visible = !(vm as any).visible
  }
})
