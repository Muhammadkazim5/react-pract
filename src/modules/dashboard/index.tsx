import type { FC } from 'react'
import { Button, Card, Typography, Avatar, Space, Descriptions } from 'antd'
import { UserOutlined, LogoutOutlined } from '@ant-design/icons'
import { useCurrentUser, useLogout } from '../../hooks/useAuth'
import styled from 'styled-components'

const { Title, Text } = Typography

const DashboardPage: FC = () => {
  const user = useCurrentUser()
  const logoutMutation = useLogout()

  const handleLogout = () => {
    logoutMutation.mutate()
  }

  return (
    <DashboardWrapper>
      <div className="dashboard-header">
        <Title level={2} style={{ margin: 0, color: '#fff' }}>
          Dashboard
        </Title>
        <Button
          type="primary"
          danger
          icon={<LogoutOutlined />}
          onClick={handleLogout}
          loading={logoutMutation.isPending}
        >
          Logout
        </Button>
      </div>

      <div className="dashboard-content">
        <Card className="welcome-card">
          <Space direction="vertical" align="center" style={{ width: '100%' }}>
            <Avatar size={80} icon={<UserOutlined />} />
            <Title level={3}>Welcome back, {user?.name || 'User'}!</Title>
            <Text type="secondary">You are successfully logged in</Text>
          </Space>
        </Card>

        <Card title="Profile Information" className="profile-card">
          <Descriptions column={1} bordered>
            <Descriptions.Item label="Name">{user?.name || 'N/A'}</Descriptions.Item>
            <Descriptions.Item label="Email">{user?.email || 'N/A'}</Descriptions.Item>
            <Descriptions.Item label="User ID">{user?.id || 'N/A'}</Descriptions.Item>
          </Descriptions>
          <p>
          Full-Stack Developer specializing in React, Node.js, NestJS and Payload CMS
          </p>
        </Card>
      </div>
    </DashboardWrapper>
  )
}

export default DashboardPage

const DashboardWrapper = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

  .dashboard-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 40px;
    background: rgba(0, 0, 0, 0.1);
  }

  .dashboard-content {
    padding: 40px;
    max-width: 800px;
    margin: 0 auto;
  }

  .welcome-card {
    margin-bottom: 24px;
    text-align: center;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .profile-card {
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`
