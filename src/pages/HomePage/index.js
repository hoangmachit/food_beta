import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./HomePage.css";
import "../../assets/css/styles.css";
import Footer from "../../components/Footer";
import translate_file_vi from "../../languages/vi.json";
import icon_vietnam_lang from "../../assets/img/icon_vietnam_lang.png";
import translate_file_en from "../../languages/en.json";
import icon_english_lang from "../../assets/img/icon_english_lang.png";
import translate_file_ja from "../../languages/ja.json";
import icon_japan_lang from "../../assets/img/icon_japan_lang.png";
// type
import { storedLanguage, VI, EN, JA } from "../../types/language";

// components
import ListFood from "../../components/ListFood";
import Loading from "../../components/Loading";
import { ModalCart, ModalMyOrder } from "../../components/Modal";

function HomePage() {
  const [modal_cart, setModalCart] = useState(false);
  const [modal_order, setModalOrder] = useState(false);
  const [content, setContent] = useState({});
  const [scrolling, setScrolling] = useState(false);
  const [configs, setConfigs] = useState([]);
  const [products, setProducts] = useState({});
  const [orders, setOrders] = useState({});
  const [language, setLanguage] = useState(storedLanguage);
  const scollToRef = useRef(null);
  const [page, setPage] = useState('home');
  const [loading, setLoading] = useState(false);
  const [total_qty, setTotalQty] = useState(localStorage.getItem("total_qty")
    ? localStorage.getItem("total_qty")
    : 0);
  const [cart, setCart] = useState(localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [])
  const [total_price, setTotalPrice] = useState(localStorage.getItem("total_price")
    ? localStorage.getItem("total_price")
    : 0);
  const makeToken = (length) => {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };
  const [token_id, setTokenId] = useState(localStorage.getItem("token_id")
    ? localStorage.getItem("token_id")
    : makeToken(30));
  const [user_name, setUserName] = useState(localStorage.getItem("user_name")
    ? localStorage.getItem("user_name")
    : "");
  const [phone_number, setPhoneNumber] = useState(localStorage.getItem("phone_number")
    ? localStorage.getItem("phone_number")
    : "");
  const [img_momo, setImgMomo] = useState("");
  useEffect(() => {
    const getConfig = async () => {
      await axios
        .post(process.env.REACT_APP_API_ENDPOINT + `/configs`)
        .then((res) => {
          const { data } = res;
          setConfigs(data);
        })
        .catch((error) => console.log(error));
    }
    getConfig();
  }, []);

  useEffect(() => {
    const getProducts = async () => {
      await axios
        .post(process.env.REACT_APP_API_ENDPOINT + `/product_list`)
        .then((res) => {
          const { data } = res;
          setProducts(data.data);
        })
        .catch((error) => console.log(error));
    }
    getProducts();
  }, []);

  useEffect(() => {
    handleLanguage(language);
  }, [language])
  const handleLanguage = language => {
    switch (language) {
      case VI:
        setContent(translate_file_vi);
        break;
      case EN:
        setContent(translate_file_en);
        break;
      case JA:
        setContent(translate_file_ja);
        break;
      default:
        setContent(translate_file_en);
    }
    setLanguage(language);
    localStorage.setItem("language", language);
  }
  const handleModalCart = () => {
    setModalCart(!modal_cart);
  }
  const handleModalMyOrder = () => {
    setModalOrder(!modal_order);
  }
  const handlePage = page_name => {
    setPage(page_name);
  }
  const payBill = () => {
    console.log("payBill");
  }
  const clearCart = () => {
    console.log("clearCart");
  }
  const clearCartItem = () => {
    console.log("clearCartItems");
  }
  const menuActive = "active  text-white";
  const handleLoading = (loading) => {
    setLoading(loading);
  }
  const addCart = (product_id) => {
    // handleLoading(true);
    //this.hideToast();
    var cartCurrent = cart;
    var exist = false;
    if (cartCurrent) {
      cartCurrent.map((item) => {
        if (item) {
          if (parseInt(item.id) === product_id) {
            item.qty++;
            exist = true;
          }
        }
      });
    }
    if (!exist) {
      var item = [{ id: product_id, qty: 1 }];
      cartCurrent = [...cartCurrent, ...item];
    }
    console.log('cartCurrent', cartCurrent);
    // cart = this.renewCart(cart);
    // this.setState({ cart });
    // localStorage.setItem("cart", JSON.stringify(cart));
    // this.setState({ loading: false });
    // this.showToast();
    // this.resetAll();
  }
  return (
    <>
      <div className="HomePage">
        {loading && <Loading loading={loading} />}
        {/* Header menu */}
        <div className="container-fluid p-0" id="style1">
          <p id="style2">
            {content.slogan1}
            <br></br>
            {content.slogan1_1}
            <br></br>
            {content.slogan1_2}
          </p>
          <p id="style3">
            {content.slogan2}
            <br></br>
            {content.slogan2_2}
          </p>
          {products &&
            configs[6] &&
            configs[6].value === "on" && (
              <button
                id="style4"
                onClick={() => {
                  scollToRef.current.scrollIntoView({
                    behavior: "smooth",
                  });
                }}
              >
                {content.order_now}
              </button>
            )}
          <nav
            id="menu"
            className={scrolling ? "scroll_event_Add_class" : ""}
          >
            <input type="checkbox" id="check"></input>
            <label htmlFor="check" className="checkbtn">
              <span className="menu-bar"></span>
            </label>
            <a href="/" className="logo" title="Allgrow Labo">
              {configs[0] && configs[0].value}
            </a>
            <ul>
              <li>
                <a
                  href={"#homepage"}
                  className={
                    page === 'home' ? menuActive : null
                  }
                  onClick={() => handlePage('home')}
                >
                  {content.menu1}
                </a>
              </li>
              <li>
                <a
                  style={{ position: "relative" }}
                  href={"#cart"}
                  className={
                    page === 'cart' ? menuActive : null
                  }
                  onClick={() => {
                    handlePage('cart');
                    handleModalCart();
                  }}
                >
                  {content.menu2}
                  <div id="style5">
                    <p id="order_number">{total_qty}</p>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href={"#myorder"}
                  className={
                    page === 'order' ? menuActive : null
                  }
                  onClick={() => {
                    handlePage('order');
                    handleModalMyOrder();
                  }}
                >
                  {content.menu3}
                </a>
              </li>
              <li>
                <a
                  id="menu_login_button"
                  className={
                    language === JA ? menuActive : null
                  }
                  href={"#ja"}
                >
                  <img
                    src={icon_japan_lang}
                    width={25}
                    height={25}
                    alt="JA"
                    onClick={() => {
                      handleLanguage(JA);
                    }}
                  ></img>
                </a>
                <a
                  id="menu_login_button"
                  className={
                    language === VI ? menuActive : null
                  }
                  href={"#vi"}
                >
                  <img
                    src={icon_vietnam_lang}
                    width={25}
                    height={25}
                    alt="VI"
                    onClick={() => {
                      handleLanguage(VI);
                    }}
                  ></img>
                </a>
                <a
                  id="menu_login_button"
                  className={
                    language === EN ? menuActive : null
                  }
                  href={"#en"}
                >
                  <img
                    src={icon_english_lang}
                    width={25}
                    height={25}
                    alt="EN"
                    onClick={() => {
                      handleLanguage(EN);
                    }}
                  ></img>
                </a>
              </li>
            </ul>
          </nav>
        </div>
        {/* Header menu */}
        {/* My Order */}
        <ModalMyOrder
          content={content}
          orders={orders}
          page={page}
          show={modal_order}
          onHide={() => handleModalMyOrder()}
          img_momo={img_momo}
        ></ModalMyOrder>
        {/* My Order */}

        {/* Modal Cart */}
        <ModalCart
          content={content}
          cart={cart}
          total_price={total_price}
          page={page}
          configs={configs}
          onHide={() => handleModalCart()}
          payBill={payBill}
          clearCart={clearCart}
          clearCartItem={clearCartItem}
          img_momo={img_momo}
          show={modal_cart}
        ></ModalCart>
        {/* Modal Cart */}
        {/* List Food */}
        <div ref={scollToRef}>
          {/* {products &&
            configs[6] &&
            configs[6].value === "on" && (
              <ListFood
                content={content}
                products={products}
              // addCart={this.addCart}
              // loading={this.loading}
              ></ListFood>
            )} */}
          <ListFood
            content={content}
            products={products}
            addCart={addCart}
            loading={loading}
          ></ListFood>
        </div>
        {/* List Food */}
      </div>
      <Footer />
    </>
  );
}
export default HomePage;