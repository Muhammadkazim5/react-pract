import type { FC } from 'react'
import { useState, useEffect } from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Checkbox, Col, Flex, Form, Input, Row, Spin } from 'antd'
import { useLogin } from '../../../hooks/useAuth'
interface LoginFormValues {
  email: string
  password: string
}

const LoginForm: FC = () => {
  const [form] = Form.useForm()
  const [isChecked, setIsChecked] = useState<boolean>(false)
  
  const loginMutation = useLogin()
  // Load saved credentials on mount
  useEffect(() => {
    const email = localStorage.getItem('email')
    const password = localStorage.getItem('password')
    const checked = localStorage.getItem('isChecked') === 'true'

    setIsChecked(checked)

    if (email && password) {
      form.setFieldsValue({ email, password })
    }
  }, [form])

  const onFinish = (values: LoginFormValues) => {
    // Handle remember me
    if (isChecked) {
      localStorage.setItem('email', values.email)
      localStorage.setItem('password', values.password)
      localStorage.setItem('isChecked', 'true')
    } else {
      localStorage.removeItem('email')
      localStorage.removeItem('password')
      localStorage.removeItem('isChecked')
    }

    // Navigation is handled in useLogin hook's onSuccess callback
    loginMutation.mutate(values)
  }

  return (
    <Flex className="container" style={{ padding: '0px 20px' }} justify="center">
      <Spin spinning={loginMutation.isPending}>
        <Row>
          <Col xl={8} lg={8} md={0} sm={0} xs={0} />

          <Form
            onFinish={onFinish}
            form={form}
            style={{ maxWidth: '500px', width: '100%' }}
            layout="vertical"
          >
            <Row gutter={[8, 0]}>
              <Col lg={24} xl={24} md={24} sm={24} xs={24}>
                <Form.Item
                  name="email"
                  rules={[
                    {
                      type: 'email',
                      message: 'Please enter a valid email!',
                    },
                    { required: true, message: 'Please enter your email!' },
                  ]}
                >
                  <Input
                    size="large"
                    placeholder="Enter your email"
                    prefix={<UserOutlined />}
                    autoComplete="email"
                  />
                </Form.Item>
              </Col>
              
              <Col lg={24} xl={24} md={24} sm={24} xs={24}>
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter your password',
                    },
                  ]}
                >
                  <Input.Password
                    size="large"
                    placeholder="Enter your password"
                    prefix={<LockOutlined />}
                    autoComplete="current-password"
                  />
                </Form.Item>
              </Col>

              <Col lg={24} xl={24} md={24} sm={24} xs={24}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <Checkbox
                    checked={isChecked}
                    onChange={() => setIsChecked(!isChecked)}
                  >
                    Remember me
                  </Checkbox>
                </div>
              </Col>

              <Col lg={24} xl={24} md={24} sm={24} xs={24}>
                <Button
                  type="primary"
                  size="large"
                  htmlType="submit"
                  block
                  loading={loginMutation.isPending}
                >
                  Sign In
                </Button>
              </Col>
            </Row>
          </Form>
        </Row>
      </Spin>
    </Flex>
  )
}

export default LoginForm
