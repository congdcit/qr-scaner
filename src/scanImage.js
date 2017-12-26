import React, { Component } from 'react';
import { Input, Icon, Header, Button, Image, Dimmer, Loader } from 'semantic-ui-react';
import jsQR from 'jsqr';
import QrCodeReader from 'qrcode-reader';
// const ZXing = require('./libs/zxing')();

class ScanImage extends Component {
    constructor(props) {
        super(props);
        this.onUpload = this.onUpload.bind(this);
        this.state = {
            error: '',
            imageData: '',
            isProcessing: false,
            decodedTime: 0,
        }
    }
    fileInput = null;
    imageData = '';

    onUpload = () => {

        const file = this.fileInput.inputRef.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            this.imageData = reader.result;
            this.setState({ imageData: reader.result });
        };
        reader.readAsDataURL(file);

     };

    decodeByjsQR = () => {
        const startDate = new Date().getTime();
        this.setState({ error: '' });
        const { receiveCode } = this.props;
        let image = new window.Image();
        image.onload = () => {
            let canvas = document.createElement('canvas');
            canvas.width = image.width;
            canvas.height = image.height;

            let context = canvas.getContext('2d');
            context.drawImage(image, 0, 0);
            let imageData = context.getImageData(0, 0, canvas.width, canvas.height);
            let result = jsQR.decodeQRFromImage(imageData.data, image.width, image.height);
            const endDate = new Date().getTime();
            console.log('Cozmo ', endDate - startDate);
            if(result) {
                receiveCode(result);

            }
            else this.setState({ error: 'Invalid image', isProcessing: true })
        };
        image.src = this.imageData;
    };
    decodeByjsqrCode = () => {
        const startDate = new Date().getTime();
        this.setState({ error: '' });
        const { receiveCode } = this.props;
        let qr = new QrCodeReader();
        qr.callback = (error, result) => {
            const endDate = new Date().getTime();
            console.log('edi ', endDate - startDate);
            if(error) {
                this.setState({ error: 'Invalid Image', isProcessing: true });
                return;
            }
            receiveCode(result.result)
        };
        qr.decode(this.imageData);
    };

    decodeByJsqrCodeLazar = () => {
        const startDate = new Date().getTime();
        this.setState({ error: '' });
        const { receiveCode } = this.props;
        window.qrcode.callback = (data) => {
            const endDate = new Date().getTime();
            console.log('Lazar ', endDate - startDate);
            if(data !== 'error decoding QR Code')
                receiveCode(data);
            else {
                this.setState({ error: 'Invalid Image', isProcessing: true });
            }
        };
        window.qrcode.decode(this.imageData);
    };

    decodeByZXing = () => {

    }

    render() {
        const { imageData, decodedTime } = this.state;
        return (
            <div>
                {/*<Dimmer active>*/}
                    {/*<Loader />*/}
                {/*</Dimmer>*/}
                <div>
                    <Header textAlign="center">
                        <div>
                          <Button htmlFor="file" as="label">
                            <Icon name="upload"></Icon>
                              Upload
                          </Button>
                          <Input type="file" id="file"
                                 accept="image/*"
                                 style={{display: "none"}}
                                 onChange={this.onUpload}
                                 ref={input => {
                                     this.fileInput = input;
                                 }}
                          />
                        </div>
                        <p>{this.state.error}</p>
                        {false && <p>Time: {decodedTime}</p>}
                        <Image  src={imageData} />
                        <div>
                            <Button.Group>
                                <Button onClick={this.decodeByjsQR}>Cozmo</Button>
                                <Button onClick={this.decodeByjsqrCode}>Edi</Button>
                                <Button onClick={this.decodeByJsqrCodeLazar}>Lazar Soft</Button>
                                {/*<Button onClick={this.decodeByZXing}>Zxing</Button>*/}
                            </Button.Group>
                        </div>
                    </Header>
                </div>
            </div>
        )
    }
}

export default ScanImage;


/*
* https://github.com/cozmo/jsQR
* https://github.com/edi9999/jsqrcode
*
*/