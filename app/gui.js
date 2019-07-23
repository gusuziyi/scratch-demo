import React from 'react'
import { connect } from 'react-redux'

import Blocks from '@/components/Blocks.jsx'
import emptyProject from '@/lib/empty-project.json'

class GUI extends React.Component {
  constructor (props) {
    super(props)
  }
  componentDidMount () {
    let {vm} = this.props
    console.log('11', vm)
    vm.loadProject(emptyProject)
    console.log('22', vm)
    vm.start()
    console.log('33', vm, emptyProject)
  }
  render () {
    console.log(this.props.vm)
    return (
      <div className='Gui'>
        hi
        <Blocks/>
      </div>
    )
  }

}

const mapStateToProps = state => {
  return {vm: state.vm}
}
const ConnectedGUI = connect(mapStateToProps)(GUI)

export default ConnectedGUI
