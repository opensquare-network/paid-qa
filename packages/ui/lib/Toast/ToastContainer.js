import React, { forwardRef, useImperativeHandle, useState } from "react";
import styled from "styled-components";
import ToastItem from "./ToastItem";

const ToastContainerWrapper = styled.div`
  position: fixed;
  top: 60px;
  right: 32px;
  z-index: 999;

  display: flex;
  flex-direction: column-reverse;

  @media screen and (max-width: 500px) {
    width: 100%;
    right: 0;
  }
`;

function ToastContainer(_, ref) {
  const [toastItems, setToastItems] = useState([]);

  useImperativeHandle(ref, () => ({
    create(option) {
      setToastItems([...toastItems, option]);
      return () => handleClose(option.seed);
    },
    destroyAll() {
      setToastItems([]);
    },
  }));

  function handleClose(seed) {
    if (!seed) return;

    const clone = toastItems.filter((item) => item.seed !== seed);
    setToastItems(clone);
  }

  return (
    <ToastContainerWrapper>
      {toastItems.map((item, index) => (
        <ToastItem
          key={index}
          title={item.title}
          message={item.message}
          type={item.type}
          onClose={() => handleClose(item.seed)}
        />
      ))}
    </ToastContainerWrapper>
  );
}

export default forwardRef(ToastContainer);
