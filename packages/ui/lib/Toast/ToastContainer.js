import React, { forwardRef, useImperativeHandle, useState } from "react";
import styled from "styled-components";
import ToastItem from "./ToastItem";

const ToastWrapper = styled.div`
  position: fixed;
  top: 90px;
  right: 80px;
  z-index: 999;

  @media screen and (max-width: 500px) {
    width: 100%;
    top: 40px;
    right: 0;
    padding: 0 20px;
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
    <ToastWrapper className="osn-toast">
      {toastItems.map((item, index) => (
        <ToastItem
          key={index}
          sortedIndex={toastItems.length - index - 1}
          title={item.title}
          message={item.message}
          type={item.type}
          onClose={() => handleClose(item.seed)}
        />
      ))}
    </ToastWrapper>
  );
}

export default forwardRef(ToastContainer);
