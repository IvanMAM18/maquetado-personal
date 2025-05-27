import React, { useState } from "react";
import "antd/dist/antd.css";
import { Form, Input, Button, Result, Select, Row, Col, message } from "antd";
import axios from "axios";
import ExpoExplanation from "../../Home/components/ExpoExplanation";
import {
    email_regex,
    giros_comerciales,
    municipios,
    sexos,
    edades,
} from "../../../utils";

const { TextArea } = Input;
const { Option } = Select;

export default function RegisterForm() {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [resultadoRegistro, setResultadoRegistro] = useState(false);

    const form_items = [
        {
            name: "nombre_empresa",
            label: "Nombre",
            value: "",
            type: "input",
            disabled: false,
            rules: [
                {
                    required: true,
                    message: "Por favor ingrese el nombre de la empresa",
                },
            ],
        },
        {
            name: "correo",
            label: "Correo",
            value: "",
            type: "input",
            disabled: false,
            rules: [
                {
                    pattern: email_regex,
                    required: true,
                    message: "Por favor ingrese un correo válido",
                },
            ],
        },
        {
            name: "telefono",
            label: "Teléfono",
            value: "",
            type: "input",
            disabled: false,
            rules: [
                {
                    required: true,
                    message: "Por favor ingrese un número de teléfono",
                },
            ],
        },
        {
            name: "colonia",
            label: "Colonia",
            value: "",
            type: "input",
            disabled: false,
            rules: [
                {
                    required: true,
                    message: "Por favor ingrese su colonia",
                },
            ],
        },
        {
            name: "giro",
            label: "Giro de la empresa",
            value: "",
            options: giros_comerciales,
            type: "select",
            disabled: false,
            rules: [
                {
                    required: true,
                    message: "Por favor seleccione el giro de la empresa",
                },
            ],
        },
        {
            name: "municipio",
            label: "Municipio",
            value: "",
            options: municipios,
            type: "select",
            disabled: false,
            rules: [
                {
                    required: true,
                    message: "Por favor seleccione su municipio",
                },
            ],
        },
        {
            name: "sexo",
            label: "Sexo",
            value: "",
            options: sexos,
            type: "select",
            disabled: false,
            rules: [
                {
                    required: true,
                    message: "Por favor seleccione su sexo",
                },
            ],
        },
        {
            name: "edad",
            label: "Edad",
            value: "",
            options: edades,
            type: "select",
            disabled: false,
            rules: [
                {
                    required: true,
                    message: "Por favor seleccione su edad",
                },
            ],
        },
    ];

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const response = await axios.post("/registro-foro-emprendedores", {
                ...values,
                año: new Date().getFullYear(),
            });
            
            if (response.status === 201) {
                message.success({
                    content: 'Registro completado exitosamente!',
                    icon: <span style={{color: '#52c41a'}}>✓</span>,
                });
                setResultadoRegistro(true);
                form.resetFields();
            }
        } catch (error) {
            setResultadoRegistro(true);
                form.resetFields();
        } finally {
            setLoading(false);
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Error en el formulario:", errorInfo);
        message.warning({
            content: "Por favor complete todos los campos requeridos correctamente.",
            icon: <span style={{color: '#faad14'}}>!</span>,
        });
    };

    return (
        <Row gutter={[40, { xs: 8, sm: 16, md: 24, lg: 32 }]}>
            <Col
                className="gutter-row register-form"
                xs={{ span: 24, offset: 0 }}
                md={{ span: 8 }}
                lg={{ span: 8 }}
            >
                <ExpoExplanation />
            </Col>
            <Col
                className="gutter-row"
                xs={{ span: 24, offset: 0 }}
                md={{ span: 15, offset: 1 }}
                lg={{ span: 15 }}
            >
                {!resultadoRegistro ? (
                    <Form
                        form={form}
                        layout="vertical"
                        name="register-form"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                        scrollToFirstError
                    >
                        {form_items.map((formDataItem) => {
                            if (formDataItem.type === "input") {
                                return (
                                    <Form.Item
                                        name={formDataItem.name}
                                        label={formDataItem.label}
                                        rules={formDataItem.rules}
                                        key={formDataItem.name}
                                    >
                                        <Input disabled={formDataItem.disabled} />
                                    </Form.Item>
                                );
                            }
                            
                            if (formDataItem.type === "select") {
                                return (
                                    <Form.Item
                                        name={formDataItem.name}
                                        label={formDataItem.label}
                                        rules={formDataItem.rules}
                                        key={formDataItem.name}
                                    >
                                        <Select
                                            disabled={formDataItem.disabled}
                                            showSearch
                                            placeholder={`Seleccione ${formDataItem.label.toLowerCase()}`}
                                            optionFilterProp="children"
                                            filterOption={(input, option) =>
                                                option.children.toLowerCase().includes(input.toLowerCase())
                                            }
                                        >
                                            {formDataItem.options.map((option) => (
                                                <Option value={option.id} key={option.id}>
                                                    {option.name}
                                                </Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                );
                            }
                            
                            return null;
                        })}

                        <Form.Item>
                            <Button 
                                type="primary" 
                                htmlType="submit"
                                loading={loading}
                                style={{ 
                                    width: '100%', 
                                    backgroundColor: '#4A2044',
                                    borderColor: '#4A2044',
                                }}
                                size="large"
                            >
                                {loading ? 'Registrando...' : 'Registrarse'}
                            </Button>
                        </Form.Item>
                    </Form>
                ) : (
                    <Result
                        status="success"
                        title="¡Registro Exitoso!"
                        subTitle="Su registro se ha completado correctamente."
                        extra={[
                            <Button 
                                type="primary" 
                                key="home" 
                                href="/"
                                style={{ 
                                    backgroundColor: '#4A2044',
                                    borderColor: '#4A2044',
                                }}
                            >
                                Ir al inicio
                            </Button>,
                            <Button 
                                key="register-again" 
                                onClick={() => setResultadoRegistro(false)}
                                style={{ 
                                    borderColor: '#4A2044',
                                    color: '#4A2044',
                                }}
                            >
                                Hacer otro registro
                            </Button>,
                        ]}
                    />
                )}
            </Col>
        </Row>
    );
}