import React, { Component } from "react";
import fire from "./config/fire";
import { Form, Input, Button, Checkbox, Row, Col } from 'antd';

const layout = {
    labelCol: {
      span: 0,
      
    },
    wrapperCol: {
      span: 0,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 0,
      span: 0,
    },
  };

class Login extends Component{


constructor(props)
{

    super(props)
    this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.signup = this.signup.bind(this);
    this.state={
        email : "",
        password : ""


    }
}


 onFinish = values => {
    console.log('Success:', values);
  };

   onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

login(e){
    e.preventDefault();
    fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{
        console.log(u)
    }).catch((err)=>{
        console.log(err);
    })
}

signup(e){
    e.preventDefault();
    fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{
        console.log(u);
    }).catch((err)=>{
        console.log(err);
    })

}

handleChange(e){
    this.setState({
        [e.target.name] : e.target.value
    })
}

render(){

    return(
      
        
//         <div className="container h-100" >
//         <div className="row h-100 justify-content-center align-items-center">
//     <form  className="col-md-4 col-md-offset-4 mt-4 pt-50">
//   <div class="form-group">
//     <label for="exampleInputEmail1">Email address</label>
//     <input name="email" type="email" id= "email"  class="form-control" placeholder="enter email address" onChange={this.handleChange} value={this.state.email}/>
   
//   </div>
//   <div class="form-group">
//     <label for="exampleInputPassword1">Password</label>
//     <input name="password" type="password"  class="form-control" id= "password" placeholder="enter password" onChange={this.handleChange}  value={this.state.password}/>
//   </div>
  
//   <button  onClick={this.login} class="btn btn-primary">Login</button> &nbsp; &nbsp;&nbsp;
//   <button  onClick={this.signup} class="btn btn-primary">Signup</button>
// </form>

// </div>
// </div>


<>
<Row>
    <Col  span={24} offset={0}>
 <div className="form-style-6">
<Form 
        {...layout}
     
      name="basic"
      
      initialValues={{
        remember: true,
      }}
      onFinish={this.onFinish}
      onFinishFailed={this.onFinishFailed}
    >
      <Form.Item    
        label="Username"
       
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
          
        ]}
      >
        <Input type="email" name="email" id="email"  value={this.state.email}  onChange={this.handleChange}  />
      </Form.Item>

      <Form.Item 
        label="Password"
       
        rules={[
          {
            required: true,
            message: 'Please input your password!',

          },

        ]}
      >
        <Input.Password type="password" name="password" id="password"  value={this.state.password}onChange={this.handleChange}   />
      </Form.Item>

      <Form.Item {...tailLayout} name="remember" valuePropName="checked">
        <Checkbox>Remember me</Checkbox>
      </Form.Item>
        <br></br>
      <Form.Item {...tailLayout}  >
        <Button type="primary" onClick={this.login} block>
          Login
        </Button>
            
      </Form.Item>
      <Form.Item {...tailLayout}  onClick={this.signup} >
        <Button type="primary" block >
          signup
        </Button>
            
      </Form.Item>
      
    </Form>
    </div>       
    </Col>
    </Row>
       </>
    )
}
}

export default Login;