import React from "react";
import { Modal } from "react-bootstrap";
import { SvgTrash } from "../../Svg";
import icon_payCart from "../../../assets/img/paycart.png";
import icon_momo from "../../../assets/img/momo.png";
import noimage from "../../../assets/img/no-image.png";
export default function ModalCart(props) {
  const {
    content,
    cart,
    total_price,
    configs,
    payBill,
    img_momo,
    clearCart,
    removeCartItem,
    show,
    onHide,
    step,
    handleStep,
    handleOrderPayment,
    order_payment,
    paymentMethod,
    user_name,
    handleUserName,
    phone_number,
    handlePhoneNumber,
    goToMyOrder,
  } = props;
  return (
    <Modal
      show={show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      onHide={onHide}
    >
      <div className="modal-content">
        {step && step.one && (
          <div
            id="checkout_form"
            className="cart_box"
            style={{ width: "100%", margin: "auto" }}
          >
            <div className="modal-header">
              <h3 className="modal-title heading-modal">{content.yourcart}</h3>
            </div>
            <div className="modal-body">
              {cart.length > 0 ? (
                <>
                  <div
                    data-spy="scroll"
                    data-target="#myScrollspy"
                    data-offset={10}
                  >
                    <table className="table table-borderless">
                      <thead>
                        <tr>
                          <th
                            scope="col"
                            style={{ width: "40%", fontSize: "115%" }}
                          >
                            {content.product}
                          </th>
                          <th
                            scope="col"
                            style={{ width: "20%", fontSize: "115%" }}
                            className="text-center"
                          >
                            {content.qty}
                          </th>
                          <th
                            scope="col"
                            style={{ width: "20%", fontSize: "115%" }}
                            className="text-center"
                          >
                            {content.price}
                          </th>
                          <th
                            scope="col"
                            style={{ width: "20%", fontSize: "115%" }}
                            className="text-center"
                          ></th>
                        </tr>
                      </thead>
                      {cart ? (
                        <tbody id="prinf_order_cart">
                          {cart.map(
                            (item) =>
                              item && (
                                <tr key={item.id}>
                                  <td>
                                    <div>
                                      <div className="cart_img_box float-left">
                                        <img
                                          src={
                                            item.thumbnail
                                              ? item.thumbnail
                                              : noimage
                                          }
                                          width="100%"
                                          height="100%"
                                          alt=""
                                        />
                                      </div>
                                      <div className="cart_info_box float-left pl-3">
                                        <p
                                          className="mb-1 font-weight-bold"
                                          style={{ fontSize: "115%" }}
                                        >
                                          {item.name}
                                        </p>
                                        <p style={{ fontSize: "85%" }}>
                                          {item.desc}
                                        </p>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="text-center">
                                    <input
                                      id="quality_input_change1"
                                      className="cart_input_quanlity mt-2"
                                      type="number"
                                      defaultValue={item.qty}
                                      name=""
                                      min={1}
                                      max={20}
                                      style={{}}
                                      disabled="disabled"
                                    />
                                  </td>
                                  <td className="text-center">
                                    <p className="mt-2" style={{ padding: 5 }}>
                                      {item.price
                                        .toString()
                                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                      đ
                                    </p>
                                  </td>
                                  <td className="text-center">
                                    <div
                                      className="cart_button_delete"
                                      onClick={() => removeCartItem(item.id)}
                                    >
                                      <span className="svg-delete">
                                        <SvgTrash />
                                      </span>
                                    </div>
                                  </td>
                                </tr>
                              )
                          )}
                        </tbody>
                      ) : (
                        <tbody id="prinf_order_cart">
                          <td>Chưa có sản phẩm nào</td>
                        </tbody>
                      )}
                    </table>
                  </div>
                  <div className="d-flex justify-content-between cart-total">
                    <p
                      className="font-weight-bold mt-2"
                      style={{ fontSize: "115%" }}
                    >
                      {content.total}
                    </p>
                    <p
                      id="total_money"
                      className="font-weight-bold float-right mt-2"
                      style={{ fontSize: "115%" }}
                    >
                      {total_price
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      đ
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="alert alert-danger m-0">
                    <p className="m-0">{content.empty}</p>
                  </div>
                </>
              )}
            </div>
            {cart.length > 0 && (
              <>
                <div className="modal-footer justify-content-between flex-row-reverse">
                  <div
                    className="btn text-white pointer"
                    style={{ background: "#fb9200" }}
                    onClick={() => {
                      handleStep(false, true, false);
                    }}
                  >
                    {content.pay}
                  </div>
                  <div
                    className="btn text-white pointer"
                    style={{ background: "#FF0000" }}
                    onClick={() => clearCart()}
                  >
                    {content.delete_cart}
                  </div>
                </div>
              </>
            )}
          </div>
        )}
        {step && step.two && (
          <>
            <div className="modal-header">
              <h3 className="modal-title heading-modal">{content.pay}</h3>
            </div>
            <div className="modal-body">
              <div
                id="payment_form"
                className="w-clear"
                style={{ width: "100%" }}
              >
                <div className="choose_box">
                  <label
                    htmlFor="exampleInputEmail1"
                    className="font-weight-bold"
                  >
                    {content.name}
                  </label>
                  <input
                    id="name_customer"
                    type="text"
                    className="form-control "
                    aria-describedby="emailHelp"
                    value={user_name}
                    onChange={(evt) => handleUserName(evt)}
                  />
                  <label
                    htmlFor="exampleInputEmail1"
                    className="mt-3 font-weight-bold"
                  >
                    {content.phone_number}
                  </label>
                  <input
                    id="phone_customer"
                    type="text"
                    className="form-control "
                    aria-describedby="emailHelp"
                    placeholder="Nhập Số điện thoại"
                    value={phone_number}
                    onChange={(evt) => handlePhoneNumber(evt)}
                  />
                  <div className="mt-4" style={{ clear: "both" }} />
                  <p className="mb-2 font-weight-bold">
                    {content.choose_payment}
                  </p>
                  <div
                    className="pr-1 pt-2 pb-2 pointer"
                    onClick={() => handleOrderPayment(paymentMethod.MOMO)}
                  >
                    <img
                      className="payment_nama"
                      src={icon_momo}
                      width="15%"
                      height="15%"
                      style={
                        order_payment === paymentMethod.MOMO
                          ? { border: "2px solid rgb(33, 149, 243)" }
                          : { border: "1px solid rgb(215, 215, 215)" }
                      }
                      alt="momo"
                    />
                    {content.pay_by_momo}
                  </div>
                  <div
                    className="pr-1 pt-2 pb-2 pointer"
                    onClick={() => handleOrderPayment(paymentMethod.CASH)}
                  >
                    <img
                      className="payment_sacom"
                      src={icon_payCart}
                      width="15%"
                      height="15%"
                      style={
                        order_payment === paymentMethod.CASH
                          ? { border: "2px solid rgb(33, 149, 243)" }
                          : { border: "1px solid rgb(215, 215, 215)" }
                      }
                      alt="cash"
                    />
                    {content.pay_by_cash}
                  </div>
                </div>
                <div className="choose_box">
                  <div
                    className="payment_choose_box "
                    style={{ width: "100%" }}
                  >
                    {order_payment === paymentMethod.MOMO ? (
                      <div className="text-center" style={{ width: "100%" }}>
                        <img
                          className="payment_momo"
                          src={
                            img_momo +
                            total_price +
                            "|Người đặt: " +
                            user_name +
                            " -- SDT: " +
                            phone_number +
                            "|transfer_myqr"
                          }
                          width="100%"
                          height="100%"
                          style={{ border: "1px solid #d7d7d7" }}
                          alt=""
                        />
                        <p className="text-danger font-weight-bold mb-0">
                          {total_price
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                          VND
                        </p>
                        <p className="text-primary font-italic mb-0">
                          {content.paid}
                        </p>
                      </div>
                    ) : (
                      <div className="text-left" style={{ width: "100%" }}>
                        <p className="font-weight-bold">{content.contact} :</p>
                        <p>
                          {content.name} : {configs[2].value}
                        </p>
                        <p>
                          {content.phone_number} : {configs[1].value}
                        </p>
                        <p>Email : {configs[3].value}</p>
                      </div>
                    )}
                    <div style={{ clear: "both" }} />
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer justify-content-between align-items-center">
              <button
                className="btn btn-secondary"
                onClick={() => {
                  handleStep(true, false, false);
                }}
              >
                {content.back}
              </button>
              <button
                className="btn btn-primary"
                onClick={() => {
                  payBill();
                }}
              >
                {content.confirm}
              </button>
            </div>
          </>
        )}
        {step && step.three && (
          <>
            <div className="jumbotron" style={{ margin: 0 }}>
              <h2 className="text-center thank01">{content.thank.thank01}</h2>
              <h3 className="text-center thank02">{content.thank.thank02}</h3>
              <p className="text-center thank03">{content.thank.thank03}</p>
              <center>
                <div className="btn-group" style={{ marginTop: "50px" }}>
                  <button
                    className="btn btn-lg btn-warning myoder"
                    onClick={(e) => goToMyOrder()}
                  >
                    {content.thank.myorder}
                  </button>
                </div>
              </center>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
}
