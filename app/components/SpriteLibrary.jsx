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
    vm.addSprite(JSON.stringify(spriteLibraryContent[0].json))
    vm
      .renderer
      .draw()
  }

  render() {
    let sprites = Array.from(spriteLibraryContent)
    return (
      <div>
        {sprites.map((dataItem, index) => {
          if (index < 2) {
            const iconURL = `https://cdn.assets.scratch.mit.edu/internalapi/asset/${dataItem.md5}/get/`;
            return (< img src = {
              iconURL
            }
            key = {
              index
            }
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