import React from "react";
import UsersTable from "./adminComponents/UsersTable";
import { Input, Form, Select, Button } from "antd";
import AnnTables from "./adminComponents/AnnTables";

const { Search } = Input;

const wilayas = [
  { value: "1", label: "Adrar" },
  { value: "2", label: "Chlef" },
  { value: "3", label: "Laghouat" },
  { value: "4", label: "Oum El Bouaghi" },
  { value: "5", label: "Batna" },
  { value: "6", label: "Béjaïa" },
  { value: "7", label: "Biskra" },
  { value: "8", label: "Béchar" },
  { value: "9", label: "Blida" },
  { value: "10", label: "Bouira" },
  { value: "11", label: "Tamanrasset" },
  { value: "12", label: "Tébessa" },
  { value: "13", label: "Tlemcen" },
  { value: "14", label: "Tiaret" },
  { value: "15", label: "Tizi Ouzou" },
  { value: "16", label: "Alger" },
  { value: "17", label: "Djelfa" },
  { value: "18", label: "Jijel" },
  { value: "19", label: "Sétif" },
  { value: "20", label: "Saïda" },
  { value: "21", label: "Skikda" },
  { value: "22", label: "Sidi Bel Abbès" },
  { value: "23", label: "Annaba" },
  { value: "24", label: "Guelma" },
  { value: "25", label: "Constantine" },
  { value: "26", label: "Médéa" },
  { value: "27", label: "Mostaganem" },
  { value: "28", label: "Msila" },
  { value: "29", label: "Mascara" },
  { value: "30", label: "Ouargla" },
  { value: "31", label: "Oran" },
  { value: "32", label: "El Bayadh" },
  { value: "33", label: "Illizi" },
  { value: "34", label: "Bordj Bou Arréridj" },
  { value: "35", label: "Boumerdès" },
  { value: "36", label: "El Tarf" },
  { value: "37", label: "Tindouf" },
  { value: "38", label: "Tissemsilt" },
  { value: "39", label: "El Oued" },
  { value: "40", label: "Khenchela" },
  { value: "41", label: "Souk Ahras" },
  { value: "42", label: "Tipaza" },
  { value: "43", label: "Mila" },
  { value: "44", label: "Aïn Defla" },
  { value: "45", label: "Naâma" },
  { value: "46", label: "Aïn Témouchent" },
  { value: "47", label: "Ghardaïa" },
  { value: "48", label: "Relizane" },
  { value: "49", label: "Timimoun" },
  { value: "50", label: "Bordj Badji Mokhtar" },
  { value: "51", label: "Ouled Djellal" },
  { value: "52", label: "Béni Abbès" },
  { value: "53", label: "In Salah" },
  { value: "54", label: "In Guezzam" },
  { value: "55", label: "Touggourt" },
  { value: "56", label: "Djanet" },
  { value: "57", label: "El M'Ghair" },
  { value: "58", label: "El Meniaa" },
];

const categories = [
  {
    value: "active",
    label: (
      <div className="flex flex-row items-center gap-[5px]">
        <div className="w-[6px] h-[6px] rounded-full bg-greencol"></div>
        <p>Active</p>
      </div>
    ),
  },
  {
    value: "blocked",
    label: (
      <div className="flex flex-row items-center gap-[5px]">
        <div className="w-[6px] h-[6px] rounded-full bg-redcol"></div>
        <p>Blocked</p>
      </div>
    ),
  },
  {
    value: "default",
    label: "Default",
  },
];

const onFinish = (values) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const Users = () => {
  return (
    <div className="m-[30px]">
      <Form
        name="search-form"
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-[30px]"
      >
        {/* Search */}
        <Form.Item className="col-span-1 sm:col-span-2 ">
          <Search
            placeholder="Search by ID"
            allowClear
            enterButton="Search"
            size="large"
            onSearch={(value) => console.log("search:", value)}
            className="w-full"
          />
        </Form.Item>

        {/* Wilaya Filter */}
        <Form.Item name="wilaya" className="w-full col-span-1 h-[43px]">
          <Select
            showSearch
            placeholder="Select Wilaya"
            optionFilterProp="label"
            options={wilayas}
            onChange={(value) => console.log("Wilaya selected:", value)}
            className=" h-[43px]"
          />
        </Form.Item>

        {/* Category Filter */}
        <Form.Item name="category" className="w-full col-span-1">
          <Select
            showSearch
            placeholder="Select status"
            optionFilterProp="label"
            options={categories}
            onChange={(value) => console.log("Category selected:", value)}
            className="h-[45px]"
          />
        </Form.Item>

        {/* Submit Button */}
        <Form.Item className="w-full flex items-end">
          <Button
            type="primary"
            htmlType="submit"
            className="w-[80px] h-[45px]"
          >
            Apply
          </Button>
        </Form.Item>
      </Form>
      <UsersTable />
    </div>
  );
};

export default Users;
