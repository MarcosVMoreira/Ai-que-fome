import React from 'react';

import { Card, Button } from 'antd';
import { FacebookFilled } from '@ant-design/icons';

import logo from '../../assets/icons/logo.png';

import './login.page.scss';

const LoginPage = () => {
  return (
    <div className="container">
      <section className="container_header">
        <div className="container_header--logo">
          <img src={logo} alt="ifood_logo" className="container_header--logo" />
        </div>
      </section>

      <section className="container_body">
        <div className="container_body--image">Image!</div>
        <div className="container_body--card">
          <Card className="container_body--card_container">
            <p className="container_body--card_title">
              Falta pouco para matar sua fome!
            </p>

            <p className="container_body--card_subtitle">
              Como deseja continuar?
            </p>

            <Button
              icon={<FacebookFilled />}
              block
              size="large"
              className="container_body--card_facebook"
            >
              Continuar com Facebook
            </Button>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default LoginPage;
