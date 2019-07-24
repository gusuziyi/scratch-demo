import bindAll from 'lodash.bindall';
import React from 'react';

import spriteLibraryContent from '@/lib/sprites.json';

// import LibraryComponent from '../components/library/library.jsx';

class SpriteLibrary extends React.PureComponent {
  constructor(props) {
    super(props);
    bindAll(this, ['handleItemSelect']);
  }
  handleItemSelect(index) {
    this
      .props
      .vm
      .addSprite(JSON.stringify(spriteLibraryContent[index].json))
      .then(() => {
        this
          .props
          .onActivateBlocksTab();
      });
  }
  componentDidMount() {
    console.log(JSON.stringify(spriteLibraryContent[1].json))
    this.handleItemSelect(1)
  }

  render() {
    let sprites=Array.from(spriteLibraryContent)
    console.log(sprites)
    return (
      <div>
        {sprites.map((dataItem, index) => {
            if(index<2){
                const iconURL = `https://cdn.assets.scratch.mit.edu/internalapi/asset/${dataItem.md5}/get/`;
                return (< img src = { iconURL} key={index} />)
            }
          
            })
        }
      </div>
    )
  }
}

export default SpriteLibrary