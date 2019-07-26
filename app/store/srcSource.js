const initialState = [
  {
    srcName: 'Stage',
    srcMd5: 'cd21514d0531fdffb22204e0ec5ed84a.svg'
  }, {
    srcName: '角色1',
    srcMd5: 'b7853f557e4426412e64bb3da6531a99.svg'
  }
]

const reducer = function (state, action) {
  if (typeof state === 'undefined')
    state = initialState
  switch (action.type) {
    case 'onStoreSrcSource': {
      let hasSrc = false
      state.forEach(element => {
        if (action.srcSource.srcName.startsWith(element.srcName))
          hasSrc = true
      })
      return hasSrc ? state : [...state, action.srcSource]
    }
    default:
      return state
  }
}

const onStoreSrcSource = function (srcSource) {
  return {type: 'onStoreSrcSource', srcSource}
}

export { reducer as default, initialState as srcSourceState, onStoreSrcSource }
