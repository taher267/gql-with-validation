import React from "react";

const Modal = ({ open = true, closeHandler, children, css, fullWidth }) => {
  if (open) {
    return (
      <div id="myModal" className="modal" style={{ ...css.modal }}>
        <div
          className="modal-content"
          style={{
            ...css.modalContent,
            ...(fullWidth ? { width: "100%" } : {}),
          }}
        >
          <span onClick={closeHandler} className="close" style={css.close}>
            &times;
          </span>
          {children}
        </div>
      </div>
    );
  }
  return <></>;
};

Modal.defaultProps = {
  css: {
    modal: {
      //   display: " none",
      display: "flex",
      flexDirection: "column",
      flexGrow: 1,
      flexWrap: "wrap",
      position: "fixed",
      zIndex: " 1",
      left: " 0",
      top: " 0",
      width: " 100%",
      height: " 100%",
      overflow: " auto",
      backgroundColor: " rgb(0,0,0)",
      backgroundColor: " rgba(0,0,0,0.4)",
      flexShrink: 1,
    },
    modalContent: {
      backgroundColor: "#fff",
      margin: "10% auto",
      padding: "20px",
      border: "1px solid #ccc",
      width: "80%",
    },
    close: {
      color: "#000",
      fontSize: "20px",
      float: "right",
      cursor: "pointer",
    },

    //   close:hover {
    //     color: #000;
    //   }
  },
};

export default Modal;
