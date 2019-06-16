import React from 'react';
import Modal from 'react-modal';
import './AppWriteUp.css';

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
};

Modal.setAppElement('#root')

class AppWriteUp extends React.Component {
    constructor() {
      super();
   
      this.state = {
        modalIsOpen: false
      };
   
      this.openModal = this.openModal.bind(this);
      this.afterOpenModal = this.afterOpenModal.bind(this);
      this.closeModal = this.closeModal.bind(this);
    }
   
    openModal() {
      this.setState({modalIsOpen: true});
    }
   
    afterOpenModal() {
      // references are now sync'd and can be accessed.
      this.subtitle.style.color = '#f00';
    }
   
    closeModal() {
      this.setState({modalIsOpen: false});
    }
   
    render() {
        const { name } = this.props;
      return (
        <div style={{display:'flex', justifyContent: 'center'}} className='mr4'>
          <button onClick={this.openModal} id='btn' className='f2 link dim purple pa3 pointer'>Click Me</button>
          <Modal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >
   
            <h2 ref={subtitle => this.subtitle = subtitle} className='b fw4'>Hello {name}, thanks for signing up</h2>
            <div>
            <p>This app is still in it's developement stage and will be updated with new abilities in the near future.</p>
            <p>For now, this app is smart enough to accept an online hosted image url in either jpeg or png, analyse the image and mark out faces in the image. 
                To try it out, if you have your picture as your linkedin profile photo for example, you can simply do a google search of your name, when the google search result comes up, click on images in the top bar,
                right click on your picture and click on "copy image address". Then paste the address in the imput field on the home page of this app.
                 You can also try any random image as long as it's in a jpeg, jpg or png format.
                Support that enables you upload image directly from your phone or computer will be added soon.
            </p>
            <p>
                Finally the ultimate aim of this app is not just to detect faces. It is intended that in the near future this app will be able to do some pretty
                cool stuff with the your image like tell you which celebrity you look like, guess how you'll look when you're old or even take images of two people and 
                guess what their offspring will look like. Stay tuned for all that update.
            </p>
            <hr></hr>
            <footer className='center'>App is proudly built by Deji Abiola<span role='img' aria-label='smile-emoji'>😄</span></footer>
            </div>
            <button onClick={this.closeModal}>close</button>
          </Modal>
        </div>
      );
    }
  }






export default AppWriteUp;