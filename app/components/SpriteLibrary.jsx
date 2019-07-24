import bindAll from 'lodash.bindall';
import React from 'react';

import spriteLibraryContent from '@/lib/sprites.json';

// import LibraryComponent from '../components/library/library.jsx';

class SpriteLibrary extends React.PureComponent {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleItemSelect'
        ]);
    }
    handleItemSelect (index) {
        this.props.vm.addSprite(JSON.stringify(spriteLibraryContent[index].json))
        // .then(() => {
        //     this.props.onActivateBlocksTab();
        // });
    }
    componentDidMount(){
        console.log(JSON.stringify(spriteLibraryContent[1].json))
        this.handleItemSelect(1)
    }
    
    render () {
        return (
    //         {[...spriteLibraryContent].map((dataItem, index) => (
    //             <div
    //                 bluetoothRequired={dataItem.bluetoothRequired}
    //                 collaborator={dataItem.collaborator}
    //                 description={dataItem.description}
    //                 disabled={dataItem.disabled}
    //                 extensionId={dataItem.extensionId}
    //                 featured={dataItem.featured}
    //                 hidden={dataItem.hidden}
    //                 iconMd5={dataItem.md5}
    //                 iconRawURL={dataItem.rawURL}
    //                 icons={dataItem.json && dataItem.json.costumes}
    //                 id={index}
    //                 insetIconURL={dataItem.insetIconURL}
    //                 internetConnectionRequired={dataItem.internetConnectionRequired}
    //                 key={typeof dataItem.name === 'string' ? dataItem.name : dataItem.rawURL}
    //                 name={dataItem.name}
    //                 onSelect={this.handleSelect(index)}
    //             />
    //         ))

    //         }
    <div></div>
        );
    }
}


export default SpriteLibrary;

