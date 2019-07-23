import React from 'react'
import { connect } from 'react-redux'

import Blocks from '@/components/Blocks.jsx'
class GUI extends React.Component {
  constructor (props) {
    super(props)
  }
  render () {
    console.log(this.props.vm)
    return (
      <div className='Gui'>
        hi
        <Blocks />
      </div>
    )
  }

}

const mapStateToProps = state => {
  return {vm: state.vm}
}
const ConnectedGUI = connect(mapStateToProps)(GUI)

export default ConnectedGUI
