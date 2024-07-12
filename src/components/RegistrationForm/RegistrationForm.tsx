import React from 'react';
import type {FormProps} from 'antd';
import {Button, Checkbox, Form, Input} from 'antd';

type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
};
type Props = {
    checkRegistration: (value: any) => void
}

export const regForm: React.FC<Props> = ({checkRegistration}) => {
    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        checkRegistration(values)
        console.log('Success:', values);
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <Form name="basic"
              labelCol={{span: 16}}
              wrapperCol={{span: 16}}
              style={{maxWidth: 600}}
              initialValues={{remember: true}}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
        >
            <Form.Item
                name="username"
                rules={[{required: true, message: 'Введите логин!'}]}
            >
                <Input placeholder="Логин" style={{height: 40}}/>
            </Form.Item>

            <Form.Item
                name="password"
                rules={[{required: true, message: 'Введите пароль!'}]}
            >
                <Input.Password placeholder="Пароль" style={{height: 40}}/>
            </Form.Item>

            <Form.Item
                name="remember"
                valuePropName="checked"
                wrapperCol={{offset: 0, span: 16}}
            >
                <Checkbox>Запомнить меня</Checkbox>
            </Form.Item>

            <Form.Item
                wrapperCol={{offset: 0, span: 16}}
            >
                <Button type="primary" htmlType="submit">
                    Войти
                </Button>
            </Form.Item>
        </Form>
    )
}


export default regForm;