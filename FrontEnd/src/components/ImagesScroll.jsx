import React from "react";
import {
  DownloadOutlined,
  LeftOutlined,
  RightOutlined,
  RotateLeftOutlined,
  RotateRightOutlined,
  SwapOutlined,
  UndoOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
} from "@ant-design/icons";
import { Row, Col, Image, Space } from "antd";
const ImagesScroll = ({ images }) => {
  console.log("images", images);
  const [current, setCurrent] = React.useState(0);

  const onDownload = () => {
    const url = images[current];
    const suffix = url.slice(url.lastIndexOf("."));
    const filename = Date.now() + suffix;
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const blobUrl = URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = blobUrl;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        URL.revokeObjectURL(blobUrl);
        link.remove();
      });
  };
  return (
    <Image.PreviewGroup
      preview={{
        toolbarRender: (
          _,
          {
            transform: { scale },
            actions: {
              onActive,
              onFlipY,
              onFlipX,
              onRotateLeft,
              onRotateRight,
              onZoomOut,
              onZoomIn,
              onReset,
            },
          }
        ) => (
          <Space size={12} className="toolbar-wrapper">
            <LeftOutlined onClick={() => onActive?.(-1)} />
            <RightOutlined onClick={() => onActive?.(1)} />
            <DownloadOutlined onClick={onDownload} />
            <SwapOutlined rotate={90} onClick={onFlipY} />
            <SwapOutlined onClick={onFlipX} />
            <RotateLeftOutlined onClick={onRotateLeft} />
            <RotateRightOutlined onClick={onRotateRight} />
            <ZoomOutOutlined disabled={scale === 1} onClick={onZoomOut} />
            <ZoomInOutlined disabled={scale === 50} onClick={onZoomIn} />
            <UndoOutlined onClick={onReset} />
          </Space>
        ),
        onChange: (index) => {
          setCurrent(index);
        },
      }}
    >
      <Row gutter={[8, 8]}>
        <Col xs={24} md={12}>
          <Image
            src={images[0]}
            width="100%"
            height="100%"
            style={{ borderRadius: "8px" }}
          />
        </Col>
        <Col xs={24} md={12}>
          <Row gutter={[8, 8]}>
            {images.slice(1).map((item, index) => (
              <Col key={index} xs={8} md={12}>
                <Image
                  src={item}
                  width="100%"
                  style={{ borderRadius: "8px" }}
                />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Image.PreviewGroup>
  );
};
export default ImagesScroll;
