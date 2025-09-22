import { Button, Modal, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";

const ManageCategory = () => {
  //dinh nghia lay du lieu
  //=>api

  //can dinh nghia hai thu
  //1.ten bien
  //2.setter
  const [categories, setCategories] = useState();
  const [open, setOpen] = useState(false);
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
      >
        abc
      </Modal>
    </>
  );
};

export default ManageCategory;
