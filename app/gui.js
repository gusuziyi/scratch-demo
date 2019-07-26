import React from 'react'
import { connect } from 'react-redux'

import Blocks from '@/components/Blocks.jsx'
import Stage from '@/components/Stage.jsx'
import SpriteLibrary from '@/components/SpriteLibrary.jsx'
import SpriteSelector from '@/components/SpriteSelector.jsx'
// 虚拟键盘管理
const VMManager = require('@/lib/vm-manager')
import emptyProject from '@/lib/empty-project.json'

class GUI extends React.Component {
  constructor (props) {
    super(props)
  }

  componentWillMount () {
    let {vm} = this.props
    vm.loadProject(emptyProject)
    vm.start()
    this.vmManager = new VMManager(vm)
    this.vmManager.attachKeyboardEvents()
    console.log(vm)
  }
  render () {
    return (
      <div className='Gui'>
        hi scratch
        <Blocks/>
        <Stage />
        <SpriteLibrary />
        <SpriteSelector/>
      </div>
    )
  }

}

const mapStateToProps = state => {
  return {vm: state.vm}
}
const ConnectedGUI = connect(mapStateToProps)(GUI)

export default ConnectedGUI
