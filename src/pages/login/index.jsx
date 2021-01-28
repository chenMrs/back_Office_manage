import React, { Component } from 'react'
import { Form, Input, Button } from 'antd';
import './login.less';
import logo from './images/LOGO.png'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
export default class  Login extends Component {
  
  formRef = React.createRef()

// // 通过 Form 的 Submit监听 得到字段值
// onFinish = values => {
//   console.log('grt',values)
// }

getValues= () => {
  // 得到 Form 实例
  const form = this.formRef.current
  // 使用 getFieldsValue 获取多个字段值
  const values = form.getFieldsValue(['name','password'])
  console.log('grt',values)
}

getValidateValues= async () => {
  const form = this.formRef.current
  // 使用 validateFields 获取验证后字段值
  try {
    const values = await form.validateFields(['name','password'])
    console.log("提交登录的ajax请求",values)
  } catch (err) {
    console.log("校验失败",err)
  }
}

validator =(rule,value,callback)=>{
  if(!value){
    callback('密码必须输入')
  }else if(value.length<4){
    callback('密码长度不能小于4位')
  }else if(value.length>12){
    callback('密码长度不能大于12位')
  }else if( !/^[a-zA-Z0-9_]+$/.test(value)){
    callback('密码必须使英文、数字、下划线')
  }else{
    callback()
  }
}
  render() {
        return (
      <div className="login">
        <header className='login-header'>
          <img src={logo} alt="logo" />
          <h1>React项目：后台管理系统</h1>
        </header>
        <section className="login-content">
          <h2>用户登录</h2>
          <Form
           ref={this.formRef} 
          >
      <Form.Item name="username" rules={[
         {required: true, whitepace:true, message: '用户名必须输入'},
         {min: 4, message: '用户名至少四位'},
         {max: 12, message: '用户名最大12位'},
         {pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须使英文、数字、下划线'},
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            validator:this.validator
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button" onClick={this.getValidateValues}>
          Log in
        </Button>
      </Form.Item>
    </Form>
        </section>
      </div>
    )  
  }
}

