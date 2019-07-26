import React from 'react';
import {connect} from 'react-redux'
import spriteLibraryContent from '@/lib/sprites.json';
class SpriteLibrary extends React.PureComponent {
    constructor(props) {
        super(props);
    }
    handleItemSelect(index) {
        let {vm} = this.props;
        let srcMd5=spriteLibraryContent[index].md5
        console.log('srcMd5',srcMd5);
        vm.addSprite(JSON.stringify(spriteLibraryContent[index].json));

        vm
            .renderer
            .draw();
    }

    render() {
        let sprites = Array.from(spriteLibraryContent)
        return (
            <div>
                点击图片,新建sprite {
                    sprites.map((dataItem, index) => {
                        if (index < 5) {
                            const iconURL = `https://cdn.assets.scratch.mit.edu/internalapi/asset/${dataItem.md5}/get/`;
                            return (< img src = {
                                iconURL
                            }
                            key = {
                                index
                            }
                            style = {{height:'100px',width:'60px'}}
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

const mapStateToProps = state => {
    return {vm: state.vm}
}
const ConnectedSpriteLibrary = connect(mapStateToProps)(SpriteLibrary)
export default ConnectedSpriteLibrary