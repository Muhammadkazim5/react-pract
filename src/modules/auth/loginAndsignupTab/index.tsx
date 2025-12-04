import { Tabs } from 'antd'
import LoginForm from '../login'
import UserSignUp from '../signup'
import styled from 'styled-components'

const LoginAndSignupPage = () => {
  const items = [
    {
      key: '1',
      label: 'Sign In',
      children: <LoginForm />,
    },
    {
      key: '2',
      label: 'Sign Up',
      children: <UserSignUp />,
    },
  ]

  return (
    <LoginAndSignUpWrapper>
      <div className="auth-container">
        <header className="header">
          <div className="logo">🔐 AuthApp</div>
        </header>

        <div className="form-container">
          <div className="form-card">
            <Tabs defaultActiveKey="1" items={items} centered />
          </div>
        </div>
      </div>
    </LoginAndSignUpWrapper>
  )
}

export default LoginAndSignupPage

const LoginAndSignUpWrapper = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

  .auth-container {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .header {
    padding: 24px 40px;
    display: flex;
    align-items: center;
  }

  .logo {
    font-size: 24px;
    font-weight: 700;
    color: #fff;
    letter-spacing: -0.5px;
  }

  .form-container {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
  }

  .form-card {
    background: #ffffff;
    border-radius: 16px;
    padding: 40px;
    width: 100%;
    max-width: 480px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  }

  .ant-tabs-nav::before {
    border-bottom: none !important;
  }

  .ant-tabs-tab {
    font-size: 16px;
    font-weight: 500;
  }

  .ant-tabs-tab-active {
    font-weight: 600;
  }
`
