import React, { Component } from 'react';
import { Button, Input, Modal, Header, Icon } from 'semantic-ui-react';
import logo from './logo.svg';
import './App.css';
import Scanner from './scanner';
import ScanImage from './scanImage';

class App extends Component {
    constructor(props) {
        super(props);
        this.receiveCode = this.receiveCode.bind(this);
    }
    state = { modalOpenCamera: false, modalOpenImage: false };
    handleOpen = (e) => {
        if(e.target.id === 'camera')
            this.setState({ modalOpenCamera: true });
        else this.setState({ modalOpenImage: true });
    }
    handleCloseCamera = () => this.setState({ modalOpenCamera: false });
    handleCloseImage = () => this.setState({ modalOpenImage: false });
    receiveCode = (content) => {
        const { modalOpenCamera, modalOpenImage } = this.state;
       this.qrCode.inputRef.value  = content;
       if(modalOpenCamera === true) {
           // this.handleCloseCamera();
       } else if (modalOpenImage === true) {
           // this.handleCloseImage();
       }

    };

  render() {
    return (
      <div className="App">
          <div>
          <Input ref={ input => this.qrCode = input}/>
          </div>
          <Button id="camera" onClick={this.handleOpen}>Open scanner</Button>
          <Modal
              open={this.state.modalOpenCamera}
              onClose={this.handleCloseCamera}
          >
              <Modal.Header>Select a Camera</Modal.Header>
              <Modal.Content>
                <Scanner receiveCode={this.receiveCode} />
              </Modal.Content>
              <Modal.Actions>
                  <Button onClick={this.handleCloseCamera} >
                      Close
                  </Button>
              </Modal.Actions>
          </Modal>
          <Button id="image" onClick={this.handleOpen}>Open Image</Button>
          <Modal
              open={this.state.modalOpenImage}
              onClose={this.handleCloseImage}
          >
              <Modal.Header>Select a Image</Modal.Header>
              <Modal.Content>
                  <ScanImage receiveCode={this.receiveCode} />
              </Modal.Content>
              <Modal.Actions>
                  <Button onClick={this.handleCloseImage} >
                      Close
                  </Button>
              </Modal.Actions>
          </Modal>
      </div>
    );
  }
}

export default App;
