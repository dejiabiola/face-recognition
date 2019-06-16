import React from 'react';




class Register extends React.Component {
    constructor() {
        super()
        this.state = {
            username: '',
            email: '',
            password: ''
        }
    }

    onRegisterUsername = (event) => {
        this.setState({username: event.target.value})
    }

    onRegisterEmail = (event) => {
        this.setState({email: event.target.value})
    }

    onRegisterPassword = (event) => {
        this.setState({password: event.target.value})
    }

    onRegisterSubmit = () => {
        fetch('https://pure-dawn-15118.herokuapp.com/register', {
            method: 'post', 
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: this.state.username,
                email: this.state.email,
                password: this.state.password
            })
        })
        .then(response => response.json())
        .then(user => {
            if(user.id) {
                this.props.loadUser(user);
                this.props.onRouteChange('home');
            }
            else {
                alert('Please register your details before proceding to awesomeness');
            }
        })
        
    }





    render () {
        return (
            <article className="br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw10 center shadow-5">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f1 fw6 ph0 mh0">Register</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="name">Username</label>
                            <input 
                            className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                            type="text" name="name"  id="name" 
                            onChange={this.onRegisterUsername}
                            />
                        </div>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input 
                            className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                            type="email" name="email-address"  id="email-address" 
                            onChange={this.onRegisterEmail}
                            />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input
                            className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                            type="password" name="password"  id="password" 
                            onChange={this.onRegisterPassword}
                            />
                        </div>
                        </fieldset>
                        <div className="">
                        <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Register" onClick={this.onRegisterSubmit}/>
                        </div>
                    </div>
                </main>
            </article>
        );
    }
} 
    





export default Register;