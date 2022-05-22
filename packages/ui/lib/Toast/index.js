import { createRef } from "react";
import { render } from "react-dom";
import ToastContainer from "./ToastContainer";

let seed = 1;

const toastContainerRef = createRef();

// TODO: refactor this
const prepareToastContainer = (appendTo) => {
  const container = document.querySelector(".osn-toast-container");
  // FIXME: not expected behaviour
  if (container && toastContainerRef.current) {
    return { create };
  }

  function create(option) {
    return toastContainerRef.current?.create(option);
  }

  const div = document.createElement("div");
  div.className = "osn-toast-container";
  appendTo.appendChild(div);
  render(<ToastContainer ref={toastContainerRef} />, div);

  return { create };
};

/**
 * @param {import('./types').ToastOptions} options
 * @returns {import('./types').DestroyCallback}
 */
export function createToast(options = {}) {
  seed += 1;

  const { title, message, type, appendTo = document.body } = options;
  const { create } = prepareToastContainer(appendTo);
  const destroy = create({
    seed,
    title,
    message,
    type,
  });

  return destroy;
}

export function destroyAllToast() {
  toastContainerRef.current?.destroyAll();
}
