import React, { Component } from 'react';
import { Button, Input, Modal, Header, Icon } from 'semantic-ui-react';
import './App.css';
import SignaturePad from 'react-signature-pad-wrapper'
import ReactSignaturePad from 'react-signature-pad';

class App extends Component {
    constructor(props) {
        super(props);
    }

    resetSignature() {
        this.signaturePad.clear();
    }
    saveSignature() {
        console.log(this.signaturePad.toDataURL());
    }
    render() {
        return (
            <div className="App">
                {/*<SignaturePad
                    options={{ penColor: 'rgb(66, 133, 244)'}} redrawOnResize={true}
                    ref={ref => this.signaturePad = ref}
                />*/}
                {/*<ReactSignaturePad ref={ref => this.signaturePad = ref} />*/}
                <div>
                    <Button onClick={() => {
                        this.saveSignature();
                    }}>Save</Button>
                    <Button onClick={() => {
                        this.resetSignature();
                    }}>Reset</Button>
                </div>
            </div>
        );
    }
}

export default App;
