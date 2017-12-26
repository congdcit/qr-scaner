import React, { Component } from 'react';
import { List } from 'semantic-ui-react';
import Instascan from 'instascan';

let scanner = null;
class ScannerComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scanner: null,
            cameras: [],
        }
    }

    openScan = () => {
        scanner = new Instascan.Scanner({ video: document.getElementById('preview') });
        scanner.addListener('scan', (content) => {
            console.log(content);
            this.props.receiveCode(content);
        });
        Instascan.Camera.getCameras()
            .then( cameras => {
                this.setState({ cameras });
                if(cameras.length > 0) {
                    // scanner.start(cameras[0]);
                } else {
                    console.log('No camera found');
                }
            })
            .catch(function (e) {
                console.error(e);
            });
    };



    componentDidMount() {
        this.openScan();
    }
    componentWillUnmount() {
        scanner.stop();
    }

    openCamera(camera) {
        scanner.start(camera)
            .then(respone => {
            })
            .catch(err => {
            })
    }


    renderListCameras(cameras) {
        if(cameras.length > 0)
            return (
                <List link>
                    {cameras.map(camera => (
                        <List.Item onClick={() => this.openCamera(camera)} as='a'>{camera.name || camera.id || 'camera 1'}</List.Item>
                    ))}
                </List>
            )
        else return <h3>No camera</h3>
    }

    render() {
        const { cameras } = this.state;
        return (
            <div>
                {this.renderListCameras(cameras)}
                <video id="preview" playsinline />
            </div>
            )
    }
}

export default ScannerComponent;