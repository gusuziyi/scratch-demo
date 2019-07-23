import React from 'react'
const ScratchStorage = require('scratch-storage');
const VM = require('scratch-vm');

const storage = new ScratchStorage();
const vm = new VM()
vm.attachStorage(storage)

// import Blocks from './components/Blocks.jsx'
class GUI extends React.Component {
  constructor (props) {
    super(props)
  }
  render () {
    // let {vm} = this.props
    console.log(vm)

    return (
      <div className='Gui'>
        hi
        {/* <Blocks/> */}
      </div>
    )
  }

}

// const mapStateToProps = state => {
//   return {vm: state.gui.vm}
// }
// const ConnectedGUI = connect(mapStateToProps)(GUI)

export default GUI
