import React from "react";
import { SvgCartPlus } from "../Svg";
import noimage from "../../assets/img/no-image.png";
export default function ListFood(props) {
  const { products, content, addCart } = props;
  return (
    <div id="list_food_home" className="container">
      <div className="row" id="prinf_food">
        {products &&
          products.length > 0 &&
          products.map((product) => (
            <div key={product.id} className="col-lg-3 col-md-4 col-6 p-2">
              <div className="produre_box bg-white shadow-sm">
                <div className="image_box">
                  <img
                    src={product.image ? product.image : noimage}
                    className="width100 height100"
                    alt=""
                  ></img>
                </div>
                <div className="info_box pt-3 pb-3 bg-white pl-1 pr-1">
                  <div className="product__name mb-2">
                    <h3 className="m-0 p-0 split">{product.name}</h3>
                  </div>
                  <div className="product__price mb-2 d-flex justify-content-end align-items-center">
                    <span>
                      {product.price
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      đ
                    </span>
                  </div>
                  <div className="product__description split mb-2">
                    {product.description}
                  </div>
                  <div className="add-to-cart-">
                    <div className="star_box">
                      <span style={{ color: "#fb9200" }}>
                        {content.num_bought} :{" "}
                      </span>
                      <span style={{ fontWeight: "bold" }}>
                        {product.num_bought}
                      </span>
                    </div>
                    <div
                      className="order_box"
                      onClick={() => {
                        addCart(product.id);
                      }}
                    >
                      <div className="order_button">
                        <button className="btn-addToCart">
                          <span className="svg">
                            <SvgCartPlus />
                          </span>
                          <span className="text">{content.cart.title}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
