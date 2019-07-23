const ScratchStorage = require('scratch-storage')
const VM = require('scratch-vm')

const storage = new ScratchStorage()
const vm = new VM()
vm.attachStorage(storage)

const reducer = function (state, action) {
  if (typeof state === 'undefined') state = vm
  return state
}

export { reducer as default, vm as vmState }
