import React, { useState, useEffect } from 'react';
import firebase from '../config/fire';



import { Form, Input, InputNumber, Button,  Row, Col } from 'antd';

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not validate email!',
    number: '${label} is not a validate number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};


const PostForm = (props) => {
    let today = new Date().toLocaleDateString()
    const initialFieldValues = {
        tweetName: '',
        tweetDesc:'',
        deleteDate:'',
        timestamp: today
    }


    var [values, setValues] = useState(initialFieldValues)

    useEffect(()=>{
        if(props.currentId == '')
            setValues({
                ...initialFieldValues
            })
        else
            setValues({
                ...props.productObjects[props.currentId]
            })
        
    },[props.currentId,props.productObjects])

    

    const handleInputChange = e => {
        var { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        })
    }
    
   
    const handleFormSubmit = e => {
        e.preventDefault();
        props.addOrEdit(values)
    }


    const onFinish = values => {
        console.log(values);
      };


    return (
        <div className="form-style-6">
        <form autoComplete="off" onSubmit={handleFormSubmit}>

        <div className="form-group input-group">
                <div className="input-group-prepend">
                    <div className="input-group-text">
                        <i className="fas fa-user"></i>
                    </div>
                </div>
                <input type="text"  className="form-control" name="tweetName" placeholder="Twiit Title"
                        value={values.tweetName}
                        onChange={handleInputChange}
                        required
                    />
            </div>



            <div className="form-group input-group">
                <div className="input-group-prepend">
                    <div className="input-group-text">
                        <i className="fas fa-user"></i>
                    </div>
                </div>
                <textarea type="text" className="form-control" name="tweetDesc" placeholder="Twiit description...."
                    value={values.tweetDesc}
                    onChange={handleInputChange}
                    required
                />
            </div>

            


            
            <div className="form-group input-group">
                <div className="input-group-prepend">
                    <div className="input-group-text">
                        <i className="fas fa-user"></i>
                    </div>
                </div>
                <input type="date"  className="form-control" name="deleteDate" 
                        value={values.deleteDate}
                        onChange={handleInputChange}
                        required
                      
                    />
            </div>
          
            <div className="form-group">
                <input type="submit" value={props.currentId==''?"Save":"Update"} className="btn btn-primary btn-block" />
            </div>
        </form>
</div>
       

    );
}

export default PostForm;