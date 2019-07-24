import React from 'react'
import { connect } from 'react-redux'

import Blocks from '@/components/Blocks.jsx'
import Stage from '@/components/Stage.jsx'
import SpriteLibrary from '@/components/SpriteLibrary.jsx'

import emptyProject from '@/lib/empty-project.json'

class GUI extends React.Component {
  constructor (props) {
    super(props)
  }
  showNotification () {
    // window.Notification.permission = 'granted'
    alert(window.Notification.permission)
    if (window.Notification) {
      if (window.Notification.permission == 'granted') {
        var notification = new Notification('你有一条新信息', {
          body: '你好我是王小婷',

          icon: 'img/1.jpg'
        })
        setTimeout(function () { notification.close(); }, 5000)
      } else {
        window.Notification.requestPermission()
      }
    } else alert('你的浏览器不支持此消息提示功能，请使用chrome内核的浏览器！')
  }
  componentDidMount () {
    let {vm} = this.props
    console.log('21', vm)
    vm.loadProject(emptyProject)
    console.log('22', vm)
    vm.start()
    console.log('33', vm, emptyProject)
    this.showNotification()
  }
  render () {
    let {vm} = this.props
    return (
      <div className='Gui'>
        hi
        <Blocks/>
        <Stage vm={vm} />
        <SpriteLibrary vm={vm} />
      </div>
    )
  }

}

const mapStateToProps = state => {
  return {vm: state.vm}
}
const ConnectedGUI = connect(mapStateToProps)(GUI)

export default ConnectedGUI
