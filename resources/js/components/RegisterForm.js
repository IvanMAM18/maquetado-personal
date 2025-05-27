import React, { useState } from "react";
import "antd/dist/antd.css";
import { Form, Input, Button, Result, Select, Row, Col, Divider } from "antd";
import axios from "axios";
import {
    email_regex,
    giros_comerciales,
    municipios,
    sexos,
    edades,
} from "../utils";

const { TextArea } = Input;
const { Option } = Select;

export default function RegisterForm() {
    const [resultadoRegistro, setResultafoRegistro] = useState(false);

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
                    message: "Por favor ingrese un correo!",
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
                    message: "Por favor ingrese un número de teléfono!",
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
                    message: "Por favor ingrese el giro de la empresa!",
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
                    message: "Por favor ingrese un número de teléfono!",
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
                    message: "Por favor ingrese el municipio!",
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
                    message: "Por favor ingrese el dato!",
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
                    message: "Por favor ingrese el giro de la empresa!",
                },
            ],
        },
    ];

    const onFinish = (values) => {
        console.log("Success:", values);
        axios
            .post("/registro-foro-emprendedores", { //Depende el uso puede ser foro o expo
                ...values,
                año: new Date().getFullYear(),
            })
            .then((result) => {
                if (result.status === 201) {
                    setResultafoRegistro(true);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    return (
        <>
            <Row gutter={[40, { xs: 8, sm: 16, md: 24, lg: 32 }]}>
                <Col
                    className="gutter-row"
                    xs={{ span: 24, offset: 0 }}
                    md={{ span: 24, offset: 1 }}
                    lg={{ span: 24 }}
                >
                    {!resultadoRegistro && (
                        <Form
                            layout="vertical"
                            name="basic"
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                        >
                            {form_items.map((formDataItem) => {
                                if (formDataItem.type === "input") {
                                    return (
                                        <Form.Item
                                            name={formDataItem.name}
                                            label={formDataItem.label}
                                            rules={formDataItem.rules}
                                            key={formDataItem.name}
                                            hidden={formDataItem.hidden}
                                        >
                                            <Input
                                                disabled={formDataItem.disabled}
                                            />
                                        </Form.Item>
                                    );
                                }
                                if (formDataItem.type === "inputpassword") {
                                    return (
                                        <Form.Item
                                            name={formDataItem.name}
                                            label={formDataItem.label}
                                            rules={formDataItem.rules}
                                            key={formDataItem.name}
                                            hasFeedback
                                        >
                                            <Input.Password
                                                placeholder="Ingrese una contraseña, minimo 8 caracteres"
                                                disabled={formDataItem.disabled}
                                            />
                                        </Form.Item>
                                    );
                                }
                                if (
                                    formDataItem.type === "inputpasswordconfirm"
                                ) {
                                    return (
                                        <Form.Item
                                            name={formDataItem.name}
                                            label={formDataItem.label}
                                            rules={formDataItem.rules}
                                            key={formDataItem.name}
                                            hasFeedback
                                            dependencies={["password"]}
                                        >
                                            <Input.Password
                                                placeholder="Ingrese una contraseña, minimo 8 caracteres"
                                                disabled={formDataItem.disabled}
                                            />
                                        </Form.Item>
                                    );
                                }
                                if (formDataItem.type === "date") {
                                    return (
                                        <Form.Item
                                            name={formDataItem.name}
                                            label={formDataItem.label}
                                            rules={formDataItem.rules}
                                            key={formDataItem.name}
                                        >
                                            <DatePicker
                                                format={"YYYY-MM-DD"}
                                                locale={locale}
                                                style={{ width: "100%" }}
                                            />
                                        </Form.Item>
                                    );
                                }
                                if (formDataItem.type === "year") {
                                    return (
                                        <Form.Item
                                            name={formDataItem.name}
                                            label={formDataItem.label}
                                            rules={formDataItem.rules}
                                            key={formDataItem.name}
                                        >
                                            <DatePicker
                                                format={"YYYY-MM-DD"}
                                                locale={locale}
                                                style={{ width: "100%" }}
                                                picker="year"
                                            />
                                        </Form.Item>
                                    );
                                }
                                if (formDataItem.type === "month") {
                                    return (
                                        <Form.Item
                                            name={formDataItem.name}
                                            label={formDataItem.label}
                                            rules={formDataItem.rules}
                                            key={formDataItem.name}
                                        >
                                            <DatePicker
                                                format={"YYYY-MM-DD"}
                                                locale={locale}
                                                style={{ width: "100%" }}
                                                picker="month"
                                            />
                                        </Form.Item>
                                    );
                                }
                                if (formDataItem.type === "textarea") {
                                    return (
                                        <Form.Item
                                            name={formDataItem.name}
                                            label={formDataItem.label}
                                            rules={formDataItem.rules}
                                            key={formDataItem.name}
                                        >
                                            <TextArea
                                                showCount
                                                maxLength={500}
                                                disabled={formDataItem.disabled}
                                            />
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
                                                style={{ width: "100%" }}
                                                placeholder="Selecciona una opción"
                                                optionFilterProp="children"
                                                onChange={() => {}}
                                                filterOption={(input, option) =>
                                                    option.children
                                                        .toLowerCase()
                                                        .indexOf(
                                                            input.toLowerCase()
                                                        ) >= 0
                                                }
                                            >
                                                {formDataItem.options.map(
                                                    (option) => {
                                                        return (
                                                            <Option
                                                                value={
                                                                    option.id
                                                                }
                                                                key={
                                                                    formDataItem.id +
                                                                    "-" +
                                                                    Math.random()
                                                                }
                                                            >
                                                                {option.name}
                                                            </Option>
                                                        );
                                                    }
                                                )}
                                            </Select>
                                        </Form.Item>
                                    );
                                }
                                if (formDataItem.type === "image") {
                                    return (
                                        <Form.Item
                                            name={formDataItem.name}
                                            label={formDataItem.label}
                                            rules={formDataItem.rules}
                                            key={formDataItem.name}
                                            valuePropName="value"
                                            getValueFromEvent={normImage}
                                            extra={formDataItem.extra}
                                        >
                                            <Upload
                                                name={formDataItem.name}
                                                action="/"
                                                listType="picture"
                                                accept="image/*"
                                                multiple={false}
                                                maxCount={1}
                                                beforeUpload={(file) => {
                                                    image_error = false;
                                                    const _URL =
                                                        window.URL ||
                                                        window.webkitURL;
                                                    let img = new Image();
                                                    img.onload = function () {
                                                        if (
                                                            this.width /
                                                                this.height !==
                                                            2
                                                        ) {
                                                            message.error(
                                                                "La imagen debe tener el doble de ancho que de alto!"
                                                            );
                                                            image_error = true;
                                                            return false;
                                                        }
                                                    };
                                                    img.src =
                                                        _URL.createObjectURL(
                                                            file
                                                        );
                                                    const isLt5kb =
                                                        file.size /
                                                            1024 /
                                                            1024 <
                                                        0.5;
                                                    if (!isLt5kb) {
                                                        message.error(
                                                            "La imagen debe pesar menos de 500kb!"
                                                        );
                                                        image_error = true;
                                                        return false;
                                                    }
                                                }}
                                            >
                                                <Button
                                                    icon={<UploadOutlined />}
                                                >
                                                    De click para subir imagen
                                                </Button>
                                            </Upload>
                                        </Form.Item>
                                    );
                                }
                                if (formDataItem.type === "image-cs") {
                                    return (
                                        <Form.Item
                                            name={formDataItem.name}
                                            label={formDataItem.label}
                                            rules={formDataItem.rules}
                                            key={formDataItem.name}
                                            valuePropName="value"
                                            getValueFromEvent={normImage}
                                            extra={formDataItem.extra}
                                        >
                                            <Upload
                                                name={formDataItem.name}
                                                action="/"
                                                listType="picture"
                                                accept="image/*"
                                                multiple={false}
                                                maxCount={1}
                                                beforeUpload={(file) => {
                                                    image_error = false;
                                                    const isLt5kb =
                                                        file.size /
                                                            1024 /
                                                            1024 <
                                                        0.5;
                                                    if (!isLt5kb) {
                                                        message.error(
                                                            "La imagen debe pesar menos de 500kb!"
                                                        );
                                                        image_error = true;
                                                        return false;
                                                    }
                                                }}
                                            >
                                                <Button
                                                    icon={<UploadOutlined />}
                                                >
                                                    De click para subir imagen
                                                </Button>
                                            </Upload>
                                        </Form.Item>
                                    );
                                }
                                if (formDataItem.type === "file") {
                                    return (
                                        <Form.Item
                                            name={formDataItem.name}
                                            label={formDataItem.label}
                                            rules={formDataItem.rules}
                                            key={formDataItem.name}
                                            valuePropName="value"
                                            extra={formDataItem.extra}
                                            getValueFromEvent={normFile}
                                        >
                                            <Upload
                                                name={formDataItem.name}
                                                action="/"
                                                accept=".pdf"
                                                multiple={false}
                                                maxCount={1}
                                                beforeUpload={(file) => {
                                                    file_error = false;
                                                    const isLt10kb =
                                                        file.size /
                                                            1024 /
                                                            1024 <
                                                        10;
                                                    console.log(
                                                        "isLt10kb",
                                                        isLt10kb
                                                    );
                                                    if (!isLt10kb) {
                                                        message.error(
                                                            "El documento debe pesar máximo 10mb!"
                                                        );
                                                        file_error = true;
                                                    }
                                                    return false;
                                                }}
                                            >
                                                <Button
                                                    icon={<UploadOutlined />}
                                                >
                                                    De click para subir un
                                                    documento
                                                </Button>
                                            </Upload>
                                        </Form.Item>
                                    );
                                }
                                return null;
                            })}
                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Registrate
                                </Button>
                            </Form.Item>
                        </Form>
                    )}
                    {resultadoRegistro && (
                        <Result
                            status="success"
                            title="Registro éxitoso!"
                            subTitle="Su registro se ha completado con éxito!"
                            extra={[
                                <Button type="primary" key="go-home" href="/">
                                    Página de inicio
                                </Button>,
                                <Button
                                    key="redo"
                                    href="/registro-foro-emprendedores"//Puede ser foro o expo
                                >
                                    Registrarse nuevamente
                                </Button>,
                            ]}
                        />
                    )}
                </Col>
            </Row>
        </>
    );
}
