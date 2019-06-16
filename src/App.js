import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceDetection from './components/faceDetection/faceDetection';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import AppWriteUp from './components/AppWriteUp/AppWriteUp';




const ParticlesBackground = {
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}
 
const initialState = {
  input: '',
  imageUrl: '',
  box: {},
  route: 'signin',
  isSignedIn: false,
  showModal: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
};


class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    })
  }
  
  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return{
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  faceBox = (box) => {
    this.setState({box: box})
  }
 
  onInputChange = (event) => {
    this.setState({input: event.target.value})
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    fetch('https://pure-dawn-15118.herokuapp.com/imageUrl', {
      method: 'post',
      headers: {"content-type": "application/json"},
      body: JSON.stringify ({
          input: this.state.input
        })
    })
    .then(response => response.json())
    .then(response => {
      if(response.outputs) {
        fetch('https://pure-dawn-15118.herokuapp.com/image', {
        method: 'put',
        headers: {"content-type": "application/json"},
        body: JSON.stringify ({
            id: this.state.user.id
          })
        })
        .then(response => response.json())
        .then(count => {
          this.setState(Object.assign(this.state.user, {entries: count}));
        })
        .catch(err => console.log(err));
      };
      this.faceBox(this.calculateFaceLocation(response))
    }) 
    .catch(err => (alert('It seems you inputed the wrong image format. Make sure your image url link ends with .jpeg or .png')))
  }



  onRouteChange = (route) => {
    if (route === 'signin') {
      this.setState(initialState)
    }
    else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route})
  }


  render() {
    const { box, route, isSignedIn, imageUrl } = this.state;
    const { onInputChange, onButtonSubmit, onRouteChange, loadUser} = this;
    return (  
      <div className="App">
        <Particles className='particle'
        params={ParticlesBackground}          
        />
        <Navigation onRouteChange={onRouteChange} isSignedIn={isSignedIn}/>
        
        { route === 'home' 
          ? <div>
              <AppWriteUp name={this.state.user.name}/>
              <Logo />
              
              <Rank name={this.state.user.name} entries={this.state.user.entries}/>

              <ImageLinkForm onInputChange={onInputChange} onButtonSubmit={onButtonSubmit}/>
              <FaceDetection imageUrl={imageUrl} box={box}/> 
            </div>
          : (
            route === 'signin'
              ? <SignIn loadUser={loadUser} onRouteChange={onRouteChange}/>
              : <Register loadUser={loadUser} onRouteChange={onRouteChange}/>
          )  
        }
      </div>
    );
  };
};




export default App;



