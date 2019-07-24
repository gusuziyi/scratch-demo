const ScratchStorage = require('scratch-storage')
const VM = require('scratch-vm')
import { SVGRenderer as V2SVGAdapter, BitmapAdapter as V2BitmapAdapter } from 'scratch-svg-renderer'

const storage = new ScratchStorage()
const vm = new VM()
console.log(vm,'....')
vm.attachStorage(storage)
vm.attachV2SVGAdapter(new V2SVGAdapter())
vm.attachV2BitmapAdapter(new V2BitmapAdapter())
vm.setCompatibilityMode(true)

const reducer = function (state, action) {
  if (typeof state === 'undefined') state = vm
  return state
}

export { reducer as default, vm as vmState }
