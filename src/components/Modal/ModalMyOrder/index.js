import React from "react";
import noimage from "../../../assets/img/no-image.png";
import { Modal } from "react-bootstrap";

export default function ModalMyOrder(props) {
  const { content, orders, show, onHide, img_momo } = props;
  const [user_name] = localStorage.getItem("user_name")
    ? localStorage.getItem("user_name")
    : "";
  const [phone_number] = localStorage.getItem("phone_number")
    ? localStorage.getItem("phone_number")
    : "";
  return (
    <Modal
      size="lg"
      show={show}
      aria-labelledby="contained-modal-title-vcenter"
      onHide={onHide}
    >
      <div
        className="modal-content p-3"
        style={{ width: "150%", left: "-200px" }}
      >
        <div className="modal-header">
          <h3 className="modal-title heading-modal">{content.order_me}</h3>
        </div>
        <div className="modal-body">
          <div
            data-spy="scroll"
            data-target="#myScrollspy"
            data-offset={10}
            style={{
              maxHeight: 700,
              overflowY: "scroll",
              paddingTop: 5,
              paddingRight: 10,
            }}
          >
            <table className="table table-borderless">
              <thead>
                <tr>
                  <th scope="col" style={{ width: "20%", fontSize: "115%" }}>
                    {content.name}
                  </th>
                  <th
                    scope="col"
                    style={{ width: "44%", fontSize: "115%" }}
                    className="text-center"
                  >
                    {content.food_list}
                  </th>
                  <th
                    scope="col"
                    style={{ width: "18%", fontSize: "115%" }}
                    className="text-center"
                  >
                    {content.total_price}

                  </th>
                  <th
                    scope="col"
                    style={{ width: "18%", fontSize: "115%" }}
                    className="text-center"
                  >
                    {content.status}
                  </th>
                </tr>
              </thead>
              <tbody id="prinfPaymentUser">
                {orders.length > 0 &&
                  orders.map((order) => (
                    <tr
                      key={order.id}
                      style={{ borderBottom: "1px solid #ccc" }}
                    >
                      <td>
                        <p>
                          {content.name}: {order.user_name}
                        </p>
                        <p>
                          {content.phone_number}: {order.phone_number}
                        </p>
                        <p>
                          {content.payment_method}: {order.payment.name}
                        </p>
                        {order.payment.id === 1 && (
                          <img
                            className="payment_momo "
                            src={
                              img_momo +
                              order.total_price +
                              "|Người đặt: " +
                              user_name +
                              " -- SDT: " +
                              phone_number +
                              "|transfer_myqr"
                            }
                            width="100%"
                            height="100%"
                            alt=""
                          />
                        )}
                      </td>
                      <td>
                        {order.order_detail.map((item) => (
                          <div key={item.id}>
                            <div
                              className="cart_img_box float-left mb-2"
                              style={{ width: 80 }}
                            >
                              <img
                                src={item.thumbnail ? item.thumbnail : noimage}
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
                              <p style={{ fontSize: "85%" }}>{item.desc}</p>
                            </div>
                            <div
                              className="quanlity"
                              style={{
                                float: "right",
                                width: 30,
                                height: 30,
                              }}
                            >
                              <p>{item.quantity}</p>
                            </div>
                            <div style={{ clear: "both" }} />
                          </div>
                        ))}
                      </td>
                      <td className="text-center">
                        {order.total
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        đ
                      </td>
                      <td className="text-center">
                        {order.order_status.id === 1 && (
                          <button
                            id="status_prinf0"
                            className="btn btn-danger text-white"
                          >
                            {content.status_wait}
                          </button>
                        )}
                        {order.order_status.id === 2 && (
                          <button
                            id="status_prinf0"
                            className="btn btn-success text-white"
                          >
                            {content.confirmed}
                            <br></br>
                            {content.status_wait_delivery}
                          </button>
                        )}
                        {order.order_status.id === 3 && (
                          <button
                            id="status_prinf0"
                            className="btn btn-success text-white"
                          >
                            {content.status_delivered}
                          </button>
                        )}
                        {order.order_status.id >= 4 && (
                          <button
                            id="status_prinf0"
                            className="btn btn-secondary text-white"
                          >
                            {content.status_completed}
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Modal>
  );
}
