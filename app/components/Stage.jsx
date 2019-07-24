const React = require('react');
const Renderer = require('scratch-render');
const bindAll = require('lodash.bindall');

class Stage extends React.Component {
    constructor(props){
        super(props)
        this.canvas = React.createRef();
        bindAll(this, [
            'attachMouseEvents',
            'onMouseMove',
            'onMouseUp',
            'onMouseDown'
        ]);
    }
    componentDidMount () {
        this.renderer = new Renderer(this.canvas.current);
        this.props.vm.attachRenderer(this.renderer);
        this.attachMouseEvents(this.canvas.current);
    }
    attachMouseEvents (canvas) {
        document.addEventListener('mousemove', this.onMouseMove);
        canvas.addEventListener('mouseup', this.onMouseUp);
        canvas.addEventListener('mousedown', this.onMouseDown);
    }
    onMouseMove (e) {
        const rect = this.canvas.current.getBoundingClientRect();
        const coordinates = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
            canvasWidth: rect.width,
            canvasHeight: rect.height
        };
        this.props.vm.postIOData('mouse', coordinates);
    }
    onMouseUp (e) {
        const rect = this.canvas.current.getBoundingClientRect();
        const data = {
            isDown: false,
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
            canvasWidth: rect.width,
            canvasHeight: rect.height
        };
        this.props.vm.postIOData('mouse', data);
        e.preventDefault();
    }
    onMouseDown (e) {
        console.log(e.clientX)
        const rect = this.canvas.current.getBoundingClientRect();
        const data = {
            isDown: true,
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
            canvasWidth: rect.width,
            canvasHeight: rect.height
        };
        this.props.vm.postIOData('mouse', data);
        e.preventDefault();
    }
    render () {
        const {
            ...props
        } = this.props;
        return (
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
                {...props}
            />
        );
    }
}



module.exports = Stage;
