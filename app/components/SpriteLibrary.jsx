import bindAll from 'lodash.bindall';
import React from 'react';
import spriteLibraryContent from '@/lib/sprites.json';
class SpriteLibrary extends React.PureComponent {
  constructor(props) {
    super(props);
    bindAll(this, ['handleItemSelect']);
  }
  handleItemSelect(index) {
    let {vm} = this.props
    vm.addSprite(JSON.stringify(spriteLibraryContent[index].json))
    vm
      .renderer
      .draw()
  }

  render() {
    let sprites = Array.from(spriteLibraryContent)
    return (
      <div>
        点击图片,新建sprite
        {sprites.map((dataItem, index) => {
          if (index < 5) {
            const iconURL = `https://cdn.assets.scratch.mit.edu/internalapi/asset/${dataItem.md5}/get/`;
            return (< img src = {
              iconURL
            }
            key = {
              index
            }
            style={{height:'100px',width:'60px'}}
            onClick = {
              this
                .handleItemSelect
                .bind(this, index)
            } />)
          }

        })
}
      </div>
    )
  }
}

export default SpriteLibrary