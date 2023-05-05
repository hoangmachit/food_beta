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
import { storedPayment, MOMO, CASH, TypePayment } from "../../types/payment";

// components
import ListFood from "../../components/ListFood";
import Loading from "../../components/Loading";
import Toast from "../../components/Toast";
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
  const [page, setPage] = useState("home");
  const [loading, setLoading] = useState(false);
  const defaulToast = {
    status: false,
    body: null,
    header: null,
    time: null,
  };
  const [toast, setToast] = useState(defaulToast);
  const [step, setStep] = useState({
    one: true,
    two: false,
    three: false,
  });
  const handleStep = (one, two, three) => {
    setStep({
      one,
      two,
      three,
    });
  };

  const [order_payment, setOrderPayment] = useState(storedPayment);
  const handleOrderPayment = (payment_name) => {
    let real_payment = payment_name;
    if (!(payment_name && TypePayment.includes(payment_name))) {
      real_payment = CASH;
    }
    setOrderPayment(real_payment);
    localStorage.setItem("order_payment", real_payment);
  };
  const [total_qty, setTotalQty] = useState(
    localStorage.getItem("total_qty") ? localStorage.getItem("total_qty") : 0
  );

  const [cart, setCart] = useState(
    localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : []
  );
  const [total_price, setTotalPrice] = useState(
    localStorage.getItem("total_price")
      ? localStorage.getItem("total_price")
      : 0
  );
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
  const [token_id] = useState(
    localStorage.getItem("token_id")
      ? localStorage.getItem("token_id")
      : makeToken(30)
  );
  const [user_name, setUserName] = useState(
    localStorage.getItem("user_name") ? localStorage.getItem("user_name") : ""
  );
  const [phone_number, setPhoneNumber] = useState(
    localStorage.getItem("phone_number")
      ? localStorage.getItem("phone_number")
      : ""
  );
  const handleUserName = (evt) => {
    localStorage.setItem("user_name", evt.target.value);
    setUserName(evt.target.value);
  };
  const handlePhoneNumber = (evt) => {
    localStorage.setItem("phone_number", evt.target.value);
    setPhoneNumber(evt.target.value);
  };
  const [img_momo, setImgMomo] = useState("");

  useEffect(() => {
    const createQrMomo = async (configs) => {
      if (!configs[0]) return;
      const url =
        process.env.REACT_APP_API_QR_ENDPOINT +
        "/?size=348x348&data=2|99|" +
        configs[1].value +
        "|" +
        configs[2].value +
        "|" +
        configs[3].value +
        "|0|0|";
      await setImgMomo(url);
    };
    const getConfig = async () => {
      await axios
        .post(process.env.REACT_APP_API_ENDPOINT + `/configs`)
        .then((res) => {
          const { data } = res;
          if (data.success) {
            setConfigs(data.result);
            createQrMomo(data.result);
          }
        })
        .catch((error) => console.log(error));
    };
    getConfig();
  }, []);
  useEffect(() => {
    const getProducts = async () => {
      await axios
        .post(process.env.REACT_APP_API_ENDPOINT + `/products`)
        .then((res) => {
          const { data } = res;
          setProducts(data);
        })
        .catch((error) => console.log(error));
    };
    getProducts();
  }, []);

  useEffect(() => {
    handleLanguage(language);
  }, [language]);
  const handleLanguage = (language) => {
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
  };
  const getOrder = async () => {
    const data = {
      token_id: token_id,
    };
    await axios
      .post(process.env.REACT_APP_API_ENDPOINT + `/orders/list`, data)
      .then((res) => {
        const { data } = res;
        if (data.success) {
          setOrders(data.result);
        }
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    getOrder();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        setScrolling(false);
      } else if (window.scrollY !== 0) {
        if (!scrolling) setScrolling(true);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleModalCart = () => {
    setModalCart(!modal_cart);
  };
  const handleModalMyOrder = () => {
    setModalOrder(!modal_order);
  };
  const handlePage = (page_name) => {
    setPage(page_name);
  };

  const clearCart = () => {
    localStorage.setItem("cart", []);
    setCart([]);
    localStorage.setItem("total_qty", 0);
    setTotalQty(0);
    localStorage.setItem("total_price", 0);
    setTotalPrice(0);
  };
  const removeCartItem = (product_id) => {
    const itemToRemove = cart.find((item) => item.id === product_id);
    if (itemToRemove) {
      const newCart = cart.filter((item) => item.id !== product_id);
      const newTotalQty = parseInt(total_qty) - itemToRemove.qty;
      const newTotalPrice =
        parseInt(total_price) - itemToRemove.price * itemToRemove.qty;
      setCart(newCart);
      setTotalQty(newTotalQty);
      setTotalPrice(newTotalPrice);
      localStorage.setItem("cart", JSON.stringify(newCart));
      localStorage.setItem("total_qty", newTotalQty);
      localStorage.setItem("total_price", newTotalPrice);
    }
  };
  const menuActive = "active  text-white";
  const handleLoading = (loading) => {
    setLoading(loading);
  };
  const addCart = (product_id) => {
    handleLoading(true);
    const product = products.find((p) => p.id === product_id);
    const existingCartItem = cart.find((item) => item.id === product_id);
    const newCartItem = {
      ...product,
      qty: existingCartItem ? existingCartItem.qty + 1 : 1,
    };
    const newCart = existingCartItem
      ? cart.map((item) => (item.id === product_id ? newCartItem : item))
      : [...cart, newCartItem];
    const newTotalQty = parseInt(total_qty) + 1;
    const newTotalPrice = parseInt(total_price) + parseInt(newCartItem.price);
    setCart(newCart);
    setTotalQty(newTotalQty);
    setTotalPrice(newTotalPrice);
    localStorage.setItem("cart", JSON.stringify(newCart));
    localStorage.setItem("total_qty", newTotalQty);
    localStorage.setItem("total_price", newTotalPrice);
    setTimeout(() => {
      handleLoading(false);
      const newDefault = {
        ...defaulToast,
        status: true,
        body: content.notification?.text,
        time: content.notification?.just_now,
        header: content.notification?.title,
      };
      setToast(newDefault);
    }, 1000);
  };
  const hideToast = () => {
    setToast(defaulToast);
  };
  const payBill = async () => {
    if (!user_name) {
      alert("You need add user_name");
      return false;
    }
    if (!phone_number) {
      alert("You need add phone_number");
      return false;
    }
    if (cart.length > 0) {
      const data = {
        token_id: token_id,
        order_detail: JSON.stringify(cart),
        total_price: total_price,
        user_name: localStorage.getItem("user_name"),
        phone_number: localStorage.getItem("phone_number"),
        order_payment: order_payment,
      };
      handleLoading(true);
      await axios
        .post(process.env.REACT_APP_API_ENDPOINT + `/orders/create`, data)
        .then((res) => {
          const { data } = res;
          if (data.success) {
            localStorage.setItem("token_id", token_id);
            clearCart();
            getOrder();
            handleStep(false, false, true);
            setTimeout(() => {
              setModalCart(false);
              setModalOrder(true);
            }, 3000);
          } else {
            const newDefault = {
              ...defaulToast,
              status: true,
              body: content.order_fail?.body,
              time: content.order_fail?.time,
              header: content.order_fail?.header,
            };
            setToast(newDefault);
          }
        })
        .catch((error) => {
          const newDefault = {
            ...defaulToast,
            status: true,
            body: content.order_fail?.body,
            time: content.order_fail?.time,
            header: content.order_fail?.header,
          };
          setToast(newDefault);
        })
        .then(() => {
          handleLoading(false);
        })
    }
  };
  const goToMyOrder = () => {
    setModalCart(false);
    handleStep(false, false, false);
    handlePage("order");
    handleModalMyOrder();
  };
  return (
    <>
      <div className="HomePage">
        {loading && <Loading loading={loading} />}
        {toast.status && (
          <Toast
            header={toast.header}
            body={toast.body}
            time={toast.time}
            hideToast={hideToast}
          />
        )}
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
          {products && configs[6] && configs[6].value === "on" && (
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
          <nav id="menu" className={scrolling ? "scroll_event_Add_class" : ""}>
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
                  className={page === "home" ? menuActive : null}
                  onClick={() => handlePage("home")}
                >
                  {content.menu1}
                </a>
              </li>
              <li>
                <a
                  style={{ position: "relative" }}
                  href={"#cart"}
                  className={page === "cart" ? menuActive : null}
                  onClick={() => {
                    handlePage("cart");
                    handleStep(true, false, false);
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
                  className={page === "order" ? menuActive : null}
                  onClick={() => {
                    handlePage("order");
                    handleModalMyOrder();
                  }}
                >
                  {content.menu3}
                </a>
              </li>
              <li>
                <a
                  id="menu_login_button"
                  className={language === JA ? menuActive : null}
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
                  className={language === VI ? menuActive : null}
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
                  className={language === EN ? menuActive : null}
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
          order_payment={order_payment}
          paymentMethod={{ MOMO, CASH }}
          handleOrderPayment={handleOrderPayment}
          onHide={() => handleModalCart()}
          payBill={payBill}
          clearCart={clearCart}
          removeCartItem={removeCartItem}
          img_momo={img_momo}
          show={modal_cart}
          handleModalCart={handleModalCart}
          step={step}
          handleStep={handleStep}
          user_name={user_name}
          handleUserName={handleUserName}
          phone_number={phone_number}
          handlePhoneNumber={handlePhoneNumber}
          goToMyOrder={goToMyOrder}
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
      <Footer content={content} />
    </>
  );
}
export default HomePage;
