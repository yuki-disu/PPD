import { Select, Form, Button } from "antd";
import React from "react";
import "./RentTAB.css";
import { Slider } from "antd";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
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
const types = [
  { value: "house", label: "House" },
  { value: "apartment", label: "Apartment" },
  { value: "studio", label: "Studio" },
];

const onChange = (value) => {
  console.log(`selected ${value}`);
};

const onSearch = (value) => {
  console.log("search:", value);
};
const onFinish = (values) => {
  console.log("Success:", values);
};
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};
const RentTAb = () => {
  const [sliderValue, setSliderValue] = useState(50000);
  return (
    <>
      <div className="bg-white/60 backdrop-blur-lg p-4 rounded-[25px] shadow-md flex flex-row gap-4 items-center justify-between">
        <Form
          name="basic"
          layout="vertical"
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          requiredMark={false}
          className="grid grid-cols-2 sm:grid-cols-4 items-start gap-[10px] sm:gap-[60px] "
        >
          <div className="flex flex-col gap-[15px] items-start">
            <h1 className="font-semibold text-[16px] text-textblack">
              Location
            </h1>
            <Select
              showSearch
              placeholder=" wilaya"
              optionFilterProp="label"
              onChange={onChange}
              onSearch={onSearch}
              options={wilayas}
              className="custom-select w-[150px] h-[45px] border-bggray rounded-full "
            />
          </div>
          <div className="flex flex-col gap-[15px] items-start">
            <h1 className="font-semibold text-[16px] text-textblack">
              Property Type
            </h1>
            <Select
              showSearch
              placeholder="type"
              optionFilterProp="label"
              onChange={onChange}
              onSearch={onSearch}
              options={types}
              className=" custom-select w-[150px] h-[45px] border-bggray rounded-full "
            />
          </div>
          <div className=" sm:ml-[15px] flex flex-col gap-[15px] items-start">
            <h1 className="font-semibold text-[16px] text-textblack">
              Price Range
            </h1>
            <div className=" flex flex-col gap-[5px] w-[220px]">
              <div className="flex justify-between text-[14px] text-textgray font-medium">
                <span className="text-text font-semibold">20,000 DA</span>
                <span className="text-text font-semibold">
                  {sliderValue.toLocaleString()} DA
                </span>
              </div>
              <Slider
                step={1000}
                min={20000}
                max={120000}
                value={sliderValue}
                tooltip={{ open: false }} // or tooltip={{ open: false }}
                onChange={(val) => setSliderValue(val)}
                className="purple-slider  "
              />
            </div>
          </div>
          <div className="ml-[100px] flex items-end justify-start">
            <Button
              htmlType="submit"
              className=" !h-[40px] w-[50px] !bg-greencol pxy-[10px] mt-[20px] rounded-[10px] transition-colors duration-200 hover:!bg-bggreen2 flex flex-row items-center justify-center"
            >
              <FaSearch className="w-[20px] h-[20px] text-white transition-colors hover:text-textgray" />
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default RentTAb;
