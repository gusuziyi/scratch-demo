const React = require('react');
const Renderer = require('scratch-render');

class Stage extends React.Component {
    constructor(props){
        super(props)
        this.canvas = React.createRef();

    }
    componentDidMount () {
        this.renderer = new Renderer(this.canvas.current);
        this.props.vm.attachRenderer(this.renderer);
        this.props.vm.renderer.draw();
    }
    
    render () {
        return (
            <div>

                <canvas
                    className="scratch-stage"
                    ref={this.canvas}
                    style={{
                        border:'1px solid #000000',
                        position: 'absolute',
                        top: 80,
                        right: 10,
                        width: 480,
                        height: 360,
                        borderRadius: 10
                    }}
                />
            </div>
        );
    }
}



module.exports = Stage;
