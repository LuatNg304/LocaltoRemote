import { Button, Form, Input, Modal, Popconfirm, Table } from "antd";
import { useForm } from "antd/es/form/Form";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ManageCategory = () => {
  //dinh nghia lay du lieu
  //=>api

  //can dinh nghia hai thu
  //1.ten bien
  //2.setter
  const [categories, setCategories] = useState();
  const [open, setOpen] = useState(false);
  const [form] = useForm();
  //muon hien thi cot columm nao
  const colums = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (id, record) => {
        //render giup tuy bien cai cot nay
        //record :{name,description}
        //cho phep custom cai cot trong columm
        return (
          <>
            <Button
              type="primary"
              onClick={() => {
                setOpen(true);
                //fill cai oldData vao cai form
                form.setFieldsValue(record);
              }}
            >
              Edit
            </Button>
            <Popconfirm
              title="Delete category"
              onConfirm={async () => {
                //cho phep delete
                await axios.delete(
                  `https://68d1635ce6c0cbeb39a4a49e.mockapi.io/categori/${id}`
                );

                fetchCategories(); //cap nhat lai danh sach record
                toast.success("SuccessFully delete!");
                setOpen(false);
              }}
            >
              <Button type="primary" danger>
                Delete
              </Button>
            </Popconfirm>
          </>
        );
      },
    },
  ];
  //khi ma load trang len thi ham fetchCategories chay luon
  const fetchCategories = async () => {
    //goi toi api lay lay di lieu categories
    console.log("fetching data from API...");

    //doi back-end tra ve du lieu
    const response = await axios.get(
      "https://68d1635ce6c0cbeb39a4a49e.mockapi.io/categori"
    );

    console.log(response.data);
    setCategories(response.data);
  };

  const handleSubmitForm = async (values) => {
    const { id } = values;
    let response;

    if (id) {
      // => update
      response = await axios.put(
        `https://68d1635ce6c0cbeb39a4a49e.mockapi.io/categori/${id}`,
        values
      );
    } else {
      response = await axios.post(
        "https://68d1635ce6c0cbeb39a4a49e.mockapi.io/categori",
        values
      );
      
    }
    setOpen(false);
    console.log(response);
    fetchCategories();
    form.resetFields();
    toast.success("Succsesfully!!");
  };
  useEffect(() => {
    //lam gi khi ma load trang len
    fetchCategories();
  }, []);
  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        Add Category
      </Button>
      <Table columns={colums} dataSource={categories} />;
      <Modal
        title="Create new Category"
        open={open}
        onCancel={() => setOpen(false)}
        onOk={() => form.submit()}
      >
        <Form
          labelCol={{
            span: 24,
          }}
          form={form}
          onFinish={handleSubmitForm}
        >
          <Form.Item label="Id" name="id" hidden>
            <Input />
          </Form.Item>
          <Form.Item
            label="Name"
            name="name"
            rules={[
              { required: true, message: "Please enter your name" },
              { min: 3, message: "Name must be at least 3 characters" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[
              { required: true, message: "Please enter a description" },
              {
                min: 10,
                message: "Description must be at least 10 characters",
              },
            ]}
          >
            <Input.TextArea rows={5} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ManageCategory;
