const VM = require('scratch-vm')
import { SVGRenderer as V2SVGAdapter, BitmapAdapter as V2BitmapAdapter } from 'scratch-svg-renderer'
import storage from '@/lib/storage'
const vm = new VM()

//在Scratch-render添加远程地址,使vm能够获取mit服务器上的资源文件
storage.addOfficialScratchWebStores()
vm.attachStorage(storage)

// 添加sb2支持
vm.attachV2SVGAdapter(new V2SVGAdapter())
vm.attachV2BitmapAdapter(new V2BitmapAdapter())
vm.setCompatibilityMode(true)

const reducer = function (state, action) {
  if (typeof state === 'undefined') state = vm
  return state
}

export { reducer as default, vm as vmState }
