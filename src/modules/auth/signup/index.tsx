import type { FC } from 'react'
import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Col, Form, Input, Row, Spin, Flex } from 'antd'
import { useRegister } from '../../../hooks/useAuth'

interface RegisterFormValues {
  name: string
  email: string
  password: string
  confirm_password: string
}

const UserSignUp: FC = () => {
  const [form] = Form.useForm()
  const registerMutation = useRegister()

  const onFinish = (values: RegisterFormValues) => {
    const payload = {
      name: values.name,
      email: values.email,
      password: values.password,
    }

    registerMutation.mutate(payload)
  }

  return (
    <Flex className="container" justify="center" style={{ padding: '0px 20px' }}>
      <Spin spinning={registerMutation.isPending}>
        <Row>
          <Col xl={8} lg={8} md={0} sm={0} xs={0} />

          <Form
            className="signform"
            layout="vertical"
            form={form}
            onFinish={onFinish}
            style={{ maxWidth: '500px', width: '100%' }}
          >
            <Row gutter={[8, 0]}>
              <Col md={24} sm={24} xs={24}>
                <Form.Item
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter your name!',
                    },
                    {
                      pattern: /^[a-zA-Z\s]+$/,
                      message: 'Please enter alphabets only',
                    },
                  ]}
                >
                  <Input
                    size="large"
                    placeholder="Enter your full name"
                    prefix={<UserOutlined />}
                  />
                </Form.Item>
              </Col>

              <Col md={24} sm={24} xs={24}>
                <Form.Item
                  name="email"
                  rules={[
                    { required: true, message: 'Please enter your email!' },
                    { type: 'email', message: 'Please enter a valid email!' },
                  ]}
                  hasFeedback
                >
                  <Input
                    size="large"
                    placeholder="Enter your email"
                    prefix={<MailOutlined />}
                  />
                </Form.Item>
              </Col>

              <Col md={24} sm={24} xs={24}>
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter your password!',
                    },
                    {
                      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
                      message:
                        'Password must be min 8 chars with uppercase, lowercase, number & special character',
                    },
                  ]}
                >
                  <Input.Password
                    size="large"
                    prefix={<LockOutlined />}
                    placeholder="Set password"
                  />
                </Form.Item>
              </Col>

              <Col md={24} sm={24} xs={24}>
                <Form.Item
                  name="confirm_password"
                  dependencies={['password']}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: 'Please confirm your password!',
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve()
                        }
                        return Promise.reject(new Error('Passwords do not match!'))
                      },
                    }),
                  ]}
                >
                  <Input.Password
                    size="large"
                    prefix={<LockOutlined />}
                    placeholder="Confirm password"
                  />
                </Form.Item>
              </Col>

              <Col md={24} sm={24} xs={24}>
                <Button
                  size="large"
                  type="primary"
                  htmlType="submit"
                  block
                  loading={registerMutation.isPending}
                >
                  Create Account
                </Button>
              </Col>
            </Row>
          </Form>
        </Row>
      </Spin>
    </Flex>
  )
}

export default UserSignUp
