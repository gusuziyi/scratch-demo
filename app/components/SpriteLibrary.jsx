import React from 'react';
import {connect} from 'react-redux'
import spriteLibraryContent from '@/lib/sprites.json';
import {onStoreSrcSource} from '@/store/srcSource'
class SpriteLibrary extends React.PureComponent {
    constructor(props) {
        super(props);
    }
    handleItemSelect(index) {
        let {vm,storeSrcSource} = this.props;
        //请求远程服务器的资源md5,与costumes重名
        let srcMd5 = spriteLibraryContent[index].md5
        let srcName = spriteLibraryContent[index].name
        let srcSource = {
            srcName,
            srcMd5
        }
        storeSrcSource(srcSource)
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
    return {vm: state.vm, srcSourceList: state.srcSourceList}
}
const mapDispatchToProps = dispatch => ({
    storeSrcSource: (srcSource) => dispatch(onStoreSrcSource(srcSource))
});
const ConnectedSpriteLibrary = connect(mapStateToProps, mapDispatchToProps)(
    SpriteLibrary
)
export default ConnectedSpriteLibrary