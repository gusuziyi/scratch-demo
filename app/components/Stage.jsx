const React = require('react');
const bindAll = require('lodash.bindall');
const Renderer = require('scratch-render');
import { connect } from 'react-redux'
import { EPERM } from 'constants';
class Stage extends React.Component {
    constructor(props){
        super(props)
        bindAll(this, [
            'attachMouseEvents',
            'onMouseUp',
            'onMouseMove',
            'onMouseDown',
        ]);
    }
    componentDidMount () {
        this.renderer = new Renderer(this.canvas);
        this.props.vm.attachRenderer(this.renderer);
        this.attachMouseEvents(this.canvas);
        this.props.vm.renderer.draw();
    }

    attachMouseEvents (canvas) {
        document.addEventListener('mousemove', this.onMouseMove);
        canvas.addEventListener('mouseup', this.onMouseUp);
        canvas.addEventListener('mousedown', this.onMouseDown);
    }
    onMouseMove (e) {
        console.log('onMouseMove')
        const rect = this.canvas.getBoundingClientRect();
        const coordinates = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
            canvasWidth: rect.width,
            canvasHeight: rect.height
        };
        this.props.vm.postIOData('mouse', coordinates);
    }
    onMouseUp (e) {
        const rect = this.canvas.getBoundingClientRect();
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
        console.log('onMouseDown')
        const rect = this.canvas.getBoundingClientRect();
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
    initCanvas (canvas) {
        this.canvas = canvas;
    }
    
    render () {
        return (
            <div>
                <canvas
                    className="scratch-stage"
                    ref={
                     this.initCanvas.bind(this)
                    }
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

const mapStateToProps = state => {
    return {vm: state.vm}
  }
  const ConnectedStage= connect(mapStateToProps)(Stage)

export default ConnectedStage;
