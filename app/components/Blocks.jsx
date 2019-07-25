import React from 'react';
import ScratchBlocks from 'scratch-blocks';
import makeToolboxXML from '@/lib/make-toolbox-xml';
import { connect } from 'react-redux'
const bindAll = require('lodash.bindall');

/**
 * scratch blocks 的默认配置
 * media: webpack 中通过插件，从 scratch-blocks/media copy 文件
 * @type {{comments: boolean, sounds: boolean, grid: {colour: string, spacing: number, length: number}, zoom: {startScale: number, controls: boolean, wheel: boolean}, media: string, collapse: boolean, colours: {scrollbar: string, workspace: string, dragShadowOpacity: number, flyout: string, insertionMarker: string, toolbox: string, insertionMarkerOpacity: number, scrollbarHover: string, toolboxSelected: string, fieldShadow: string}}}
 */
const BLOCKS_DEFAULT_OPTIONS = {
    media: 'static/blocks-media/',
    zoom: {
        controls: true,
        wheel: true,
        startScale: 0.675
    },
    grid: {
        spacing: 40,
        length: 2,
        colour: '#ddd'
    },
    colours: {
        workspace: '#F9F9F9',
        flyout: '#F9F9F9',
        toolbox: '#FFFFFF',
        toolboxSelected: '#E9EEF2',
        scrollbar: '#CECDCE',
        scrollbarHover: '#CECDCE',
        insertionMarker: '#000000',
        insertionMarkerOpacity: 0.2,
        fieldShadow: 'rgba(255, 255, 255, 0.3)',
        dragShadowOpacity: 0.6
    },
    comments: true,
    collapse: false,
    sounds: false
};

class Blocks extends React.Component {
    constructor (props) {
        super(props);
        this.blocks = React.createRef();
        this.workspace = null;
        bindAll(this, [
            'attachVM',
            'onScriptGlowOn',
            'onScriptGlowOff',
            'onBlockGlowOn',
            'onBlockGlowOff',
            'onVisualReport',
            'onWorkspaceUpdate',
        ]);
    }

    componentDidMount () {
        const toolbox = makeToolboxXML(true);
        const workspaceConfig = Object.assign(
            {},
            BLOCKS_DEFAULT_OPTIONS,
            {toolbox: toolbox}
        );
        this.workspace = ScratchBlocks.inject(this.blocks.current, workspaceConfig);
        this.attachVM()
        console.log(999)
      
    }
    attachVM () {
        this.workspace.addChangeListener(this.props.vm.blockListener);
        this.flyoutWorkspace = this.workspace
            .getFlyout()
            .getWorkspace();
        this.flyoutWorkspace.addChangeListener(this.props.vm.flyoutBlockListener);
        this.props.vm.addListener('SCRIPT_GLOW_ON', this.onScriptGlowOn);
        this.props.vm.addListener('SCRIPT_GLOW_OFF', this.onScriptGlowOff);
        this.props.vm.addListener('BLOCK_GLOW_ON', this.onBlockGlowOn);
        this.props.vm.addListener('BLOCK_GLOW_OFF', this.onBlockGlowOff);
        this.props.vm.addListener('VISUAL_REPORT', this.onVisualReport);
        this.props.vm.addListener('workspaceUpdate', this.onWorkspaceUpdate);
    }
    onScriptGlowOn (data) {
        console.log(1,data)
        this.workspace.glowStack(data.id, true);
    }
    onScriptGlowOff (data) {
        console.log(2,data)
        this.workspace.glowStack(data.id, false);
    }
    onBlockGlowOn (data) {
        console.log(3,data)
        this.workspace.glowBlock(data.id, true);
    }
    onBlockGlowOff (data) {
        console.log(4,data)
        this.workspace.glowBlock(data.id, false);
    }
    onVisualReport (data) {
        console.log(5,data)
        this.workspace.reportValue(data.id, data.value);
    }
    onWorkspaceUpdate (data) {
        console.log('WorkspaceUpdate event')
        ScratchBlocks.Events.disable();
        this.workspace.clear();
        const dom = ScratchBlocks.Xml.textToDom(data.xml);
        ScratchBlocks.Xml.domToWorkspace(dom, this.workspace);
        ScratchBlocks.Events.enable();
    }

    render() {
        return (
            <div style={{height: '700px',width: '600px'}} ref={this.blocks}>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {vm: state.vm}
  }
  const ConnectedBlocks = connect(mapStateToProps)(Blocks)
export default ConnectedBlocks;
