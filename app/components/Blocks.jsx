import React from 'react';
import ScratchBlocks from 'scratch-blocks';
import makeToolboxXML from '../lib/make-toolbox-xml';

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
    }

    componentDidMount () {
        const toolbox = makeToolboxXML(true);
        const workspaceConfig = Object.assign(
            {},
            BLOCKS_DEFAULT_OPTIONS,
            {toolbox: toolbox}
        );
        this.workspace = ScratchBlocks.inject(this.blocks.current, workspaceConfig);
    }

    render() {
        return (
            <div style={{height: '100%', width: '70%'}} ref={this.blocks}>
            </div>
        )
    }
}

export default Blocks;
