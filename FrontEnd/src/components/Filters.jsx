import React from "react";
import { Select } from "antd";
import { Button, Checkbox, Form, Input } from "antd";
import { IoBed } from "react-icons/io5";
import { FaBath } from "react-icons/fa";
import { BigRedButton, DarkButton } from "../ui";
import { useDispatch } from "react-redux";
import { fetchFilteredHouses } from "../features/houses/houseSlice";
import { InputNumber } from "antd";
const wilayas = [
  { value: "Adrar", label: "Adrar" },
  { value: "Chlef", label: "Chlef" },
  { value: "Laghouat", label: "Laghouat" },
  { value: "Oum El Bouaghi", label: "Oum El Bouaghi" },
  { value: "Batna", label: "Batna" },
  { value: "Béjaïa", label: "Béjaïa" },
  { value: "Biskra", label: "Biskra" },
  { value: "Béchar", label: "Béchar" },
  { value: "Blida", label: "Blida" },
  { value: "Bouira", label: "Bouira" },
  { value: "Tamanrasset", label: "Tamanrasset" },
  { value: "Tébessa", label: "Tébessa" },
  { value: "Tlemcen", label: "Tlemcen" },
  { value: "Tiaret", label: "Tiaret" },
  { value: "Tizi Ouzou", label: "Tizi Ouzou" },
  { value: "Alger", label: "Alger" },
  { value: "Djelfa", label: "Djelfa" },
  { value: "Jijel", label: "Jijel" },
  { value: "Sétif", label: "Sétif" },
  { value: "Saïda", label: "Saïda" },
  { value: "Skikda", label: "Skikda" },
  { value: "Sidi Bel Abbès", label: "Sidi Bel Abbès" },
  { value: "Annaba", label: "Annaba" },
  { value: "Guelma", label: "Guelma" },
  { value: "Constantine", label: "Constantine" },
  { value: "Médéa", label: "Médéa" },
  { value: "Mostaganem", label: "Mostaganem" },
  { value: "Msila", label: "Msila" },
  { value: "Mascara", label: "Mascara" },
  { value: "Ouargla", label: "Ouargla" },
  { value: "Oran", label: "Oran" },
  { value: "El Bayadh", label: "El Bayadh" },
  { value: "Illizi", label: "Illizi" },
  { value: "Bordj Bou Arréridj", label: "Bordj Bou Arréridj" },
  { value: "Boumerdès", label: "Boumerdès" },
  { value: "El Tarf", label: "El Tarf" },
  { value: "Tindouf", label: "Tindouf" },
  { value: "Tissemsilt", label: "Tissemsilt" },
  { value: "El Oued", label: "El Oued" },
  { value: "Khenchela", label: "Khenchela" },
  { value: "Souk Ahras", label: "Souk Ahras" },
  { value: "Tipaza", label: "Tipaza" },
  { value: "Mila", label: "Mila" },
  { value: "Aïn Defla", label: "Aïn Defla" },
  { value: "Naâma", label: "Naâma" },
  { value: "Aïn Témouchent", label: "Aïn Témouchent" },
  { value: "Ghardaïa", label: "Ghardaïa" },
  { value: "Relizane", label: "Relizane" },
  { value: "Timimoun", label: "Timimoun" },
  { value: "Bordj Badji Mokhtar", label: "Bordj Badji Mokhtar" },
  { value: "Ouled Djellal", label: "Ouled Djellal" },
  { value: "Béni Abbès", label: "Béni Abbès" },
  { value: "In Salah", label: "In Salah" },
  { value: "In Guezzam", label: "In Guezzam" },
  { value: "Touggourt", label: "Touggourt" },
  { value: "Djanet", label: "Djanet" },
  { value: "El M'Ghair", label: "El M'Ghair" },
  { value: "El Meniaa", label: "El Meniaa" },
];

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const Filters = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const handleFilters = async (values) => {
    console.log("values", values);

    try {
      dispatch(fetchFilteredHouses(values));
      // You can then update state or Redux with `data`
    } catch (error) {
      console.error("Error fetching houses:", error);
    }
  };
  return (
    <div className="flex flex-col items-center gap-[20px] w-[320px] ml-[-px] ">
      <div className="flex flex-col gap-[8px]">
        <Form
          name="basic"
          form={form}
          layout="vertical"
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={handleFilters}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          requiredMark={false}
          className="flex flex-col items-start"
        >
          <Form.Item
            className="w-[320px]"
            label={
              <span className="font-inter font-semibold text-[14px] text-textblack ">
                wilaya
              </span>
            }
            name="wilaya"
          >
            <Select
              showSearch
              placeholder="Select a wilaya"
              optionFilterProp="label"
              options={wilayas}
              style={{ width: "100%", height: 45 }}
              className=" h-[45px] border-bggray rounded-[6px]"
            />
          </Form.Item>

          <div className="grid grid-cols-2 gap-x-[22px]">
            <Form.Item
              label={
                <span className="font-inter font-semibold text-[14px] text-textblack ">
                  price
                </span>
              }
              name="minPrice"
            >
              <InputNumber
                min={0}
                placeholder="Min"
                className="h-[45px] w-[150px]"
                suffix={
                  <span className="text-greencol text-[14px] font-medium">
                    DA
                  </span>
                }
              />
            </Form.Item>
            <Form.Item name="maxPrice">
              <InputNumber
                min={0}
                placeholder="Max"
                className="h-[45px] mt-[30px] w-[150px] "
                suffix={
                  <span className="text-greencol text-[14px] font-medium">
                    DA
                  </span>
                }
              />
            </Form.Item>
            <Form.Item
              label={
                <span className="font-inter font-semibold text-[14px] text-textblack ">
                  surface
                </span>
              }
              name="minSurface"
            >
              <InputNumber
                max={1000}
                min={0}
                placeholder="Min"
                className="h-[45px] w-[150px]"
                suffix={
                  <span className="text-greencol text-[14px] font-medium">
                    m²
                  </span>
                }
              />
            </Form.Item>
            <Form.Item name="maxSurface">
              <InputNumber
                max={1000}
                min={0}
                placeholder="Max"
                className="h-[45px] mt-[30px] w-[150px] "
                suffix={
                  <span className="text-greencol text-[14px] font-medium">
                    m²
                  </span>
                }
              />
            </Form.Item>
            <Form.Item
              label={
                <span className="font-inter font-semibold text-[14px] text-textblack ">
                  bedrooms
                </span>
              }
              name="minRooms"
            >
              <InputNumber
                max={10}
                placeholder="Min"
                className="h-[45px] w-[150px]"
                suffix={<IoBed className="w-[20px] h-[20px] text-greencol " />}
              />
            </Form.Item>
            <Form.Item name="maxRooms">
              <InputNumber
                max={10}
                placeholder="Max"
                className="h-[45px] w-[150px] mt-[30px] "
                suffix={<IoBed className="w-[20px] h-[20px] text-greencol " />}
              />
            </Form.Item>
            <Form.Item
              label={
                <span className="font-inter font-semibold text-[14px] text-textblack ">
                  bathrooms
                </span>
              }
              name="minBaths"
            >
              <InputNumber
                max={10}
                min={0}
                placeholder="Min"
                className="w-[150px] h-[45px]"
                suffix={<FaBath className="w-[18px] h-[18px] text-greencol " />}
              />
            </Form.Item>
            <Form.Item name="maxBaths">
              <InputNumber
                max={10}
                min={0}
                placeholder="Max"
                className="w-[150px] h-[45px] mt-[30px] "
                suffix={<FaBath className="w-[18px] h-[18px] text-greencol " />}
              />
            </Form.Item>
          </div>

          <Form.Item label={null}>
            <Button
              variant="solid"
              color="primary"
              className="w-[320px] h-[45px]"
              htmlType="submit"
            >
              apply
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Filters;
