import React, { useState, useEffect, useRef, useCallback } from "react";
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
  const [modalCart, setModalCart] = useState(false);
  const [modalOrder, setModalOrder] = useState(false);
  const [content, setContent] = useState({});
  const [scrolling, setScrolling] = useState(false);
  const [configs, setConfigs] = useState([]);
  const [products, setProducts] = useState({});
  const [orders, setOrders] = useState({});
  const [language, setLanguage] = useState(storedLanguage);
  const scrollToRef = useRef(null);
  const [page, setPage] = useState("home");
  const [loading, setLoading] = useState(false);
  const defaultToast = {
    status: false,
    body: null,
    header: null,
    time: null,
  };
  const [toast, setToast] = useState(defaultToast);
  const [step, setStep] = useState({
    one: true,
    two: false,
    three: false,
  });
  const [orderPayment, setOrderPayment] = useState(storedPayment);
  const [totalQty, setTotalQty] = useState(
    localStorage.getItem("total_qty") || 0
  );
  const [cart, setCart] = useState(
    localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : []
  );
  const [totalPrice, setTotalPrice] = useState(
    localStorage.getItem("total_price") || 0
  );

  const makeToken = (length) => {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  const [tokenId] = useState(localStorage.getItem("token_id") || makeToken(30));
  const [userName, setUserName] = useState(
    localStorage.getItem("user_name") || ""
  );
  const [phoneNumber, setPhoneNumber] = useState(
    localStorage.getItem("phone_number") || ""
  );
  const [imgMomo, setImgMomo] = useState("");

  const handleStep = (one, two, three) => {
    setStep({
      one,
      two,
      three,
    });
  };

  const handleOrderPayment = (paymentName) => {
    const realPayment = TypePayment.includes(paymentName) ? paymentName : CASH;
    setOrderPayment(realPayment);
    localStorage.setItem("order_payment", realPayment);
  };

  const handleUserName = (evt) => {
    localStorage.setItem("user_name", evt.target.value);
    setUserName(evt.target.value);
  };

  const handlePhoneNumber = (evt) => {
    localStorage.setItem("phone_number", evt.target.value);
    setPhoneNumber(evt.target.value);
  };

  useEffect(() => {
    const createQrMomo = async (configs) => {
      if (!configs[0]) return;
      const url = `${process.env.REACT_APP_API_QR_ENDPOINT}/?size=348x348&data=2|99|${configs[1].value}|${configs[2].value}|${configs[3].value}|0|0|`;
      await setImgMomo(url);
    };

    const getConfig = async () => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_ENDPOINT}/configs`
        );
        const { data } = response;
        if (data.success) {
          setConfigs(data.result);
          createQrMomo(data.result);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getConfig();
  }, []);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_ENDPOINT}/products`
        );
        const { data } = response;
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };

    getProducts();
  }, []);

  useEffect(() => {
    handleLanguage(language);
  }, [language]);

  const handleLanguage = async (language) => {
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

  const getOrder = useCallback(async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_ENDPOINT}/orders/list`,
        {
          token_id: tokenId,
        }
      );
      const { data } = response;
      if (data.success) {
        setOrders(data.result);
      }
    } catch (error) {
      console.log(error);
    }
  }, [tokenId]);

  useEffect(() => {
    getOrder();
  }, [getOrder]);

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
  }, [scrolling]);

  const handleModalCart = () => {
    setModalCart(!modalCart);
  };

  const handleModalMyOrder = () => {
    setModalOrder(!modalOrder);
  };

  const handlePage = (pageName) => {
    setPage(pageName);
  };

  const clearCart = () => {
    localStorage.setItem("cart", JSON.stringify([]));
    setCart([]);
    localStorage.setItem("total_qty", 0);
    setTotalQty(0);
    localStorage.setItem("total_price", 0);
    setTotalPrice(0);
  };

  const removeCartItem = (productId) => {
    const itemToRemove = cart.find((item) => item.id === productId);
    if (itemToRemove) {
      const newCart = cart.filter((item) => item.id !== productId);
      const newTotalQty = parseInt(totalQty) - itemToRemove.qty;
      const newTotalPrice =
        parseInt(totalPrice) - itemToRemove.price * itemToRemove.qty;
      setCart(newCart);
      setTotalQty(newTotalQty);
      setTotalPrice(newTotalPrice);
      localStorage.setItem("cart", JSON.stringify(newCart));
      localStorage.setItem("total_qty", newTotalQty);
      localStorage.setItem("total_price", newTotalPrice);
    }
  };

  const menuActive = "active text-white";

  const handleLoading = (isLoading) => {
    setLoading(isLoading);
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
    const newTotalQty = parseInt(totalQty) + 1;
    const newTotalPrice = parseInt(totalPrice) + parseInt(newCartItem.price);
    setCart(newCart);
    setTotalQty(newTotalQty);
    setTotalPrice(newTotalPrice);
    localStorage.setItem("cart", JSON.stringify(newCart));
    localStorage.setItem("total_qty", newTotalQty);
    localStorage.setItem("total_price", newTotalPrice);
    setTimeout(() => {
      handleLoading(false);
      const newDefault = {
        ...defaultToast,
        status: true,
        body: content.notification?.text,
        time: content.notification?.just_now,
        header: content.notification?.title,
      };
      setToast(newDefault);
    }, 1000);
  };

  const hideToast = () => {
    setToast(defaultToast);
  };

  const payBill = async () => {
    if (!userName) {
      alert("You need to add a user name");
      return false;
    }
    if (!phoneNumber) {
      alert("You need to add a phone number");
      return false;
    }
    if (cart.length > 0) {
      handleLoading(true);
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_ENDPOINT}/orders/create`,
          {
            token_id: tokenId,
            order_detail: JSON.stringify(cart),
            total_price: totalPrice,
            user_name: userName,
            phone_number: phoneNumber,
            order_payment: orderPayment,
          }
        );
        const { data } = response;
        if (data.success) {
          localStorage.setItem("token_id", tokenId);
          clearCart();
          getOrder();
          handleStep(false, false, true);
          setTimeout(() => {
            setModalCart(false);
            setModalOrder(true);
          }, 3000);
        } else {
          const newDefault = {
            ...defaultToast,
            status: true,
            body: content.order_fail?.body,
            time: content.order_fail?.time,
            header: content.order_fail?.header,
          };
          setToast(newDefault);
        }
      } catch (error) {
        const newDefault = {
          ...defaultToast,
          status: true,
          body: content.order_fail?.body,
          time: content.order_fail?.time,
          header: content.order_fail?.header,
        };
        setToast(newDefault);
      } finally {
        handleLoading(false);
      }
    }
  };

  const goToMyOrder = () => {
    setModalCart(false);
    handleStep(false, false, false);
    handlePage("order");
    handleModalMyOrder();
  };

  const renderSlogan1 = () => {
    return (
      <p id="style2">
        {content.slogan1}
        <br></br>
        {content.slogan1_1}
        <br></br>
        {content.slogan1_2}
      </p>
    );
  };

  const renderSlogan2 = () => {
    return (
      <p id="style3">
        {content.slogan2}
        <br></br>
        {content.slogan2_2}
      </p>
    );
  };

  const renderButtonOrder = () => {
    if (products && configs[6] && configs[6].value === "on") {
      return (
        <button
          id="style4"
          onClick={() => {
            scrollToRef.current.scrollIntoView({
              behavior: "smooth",
            });
          }}
        >
          {content.order_now}
        </button>
      );
    }

    return <></>;
  };

  const renderLanguageButton = () => {
    const languageConfigArr = [
      { id: JA, img: icon_japan_lang },
      { id: VI, img: icon_vietnam_lang },
      { id: EN, img: icon_english_lang },
    ];
    return (
      <li>
        {languageConfigArr.map((languageItem, index) => (
          <a
            key={`${languageItem.id} ${index}`}
            id="menu_login_button"
            className={language === languageItem.id ? menuActive : null}
            href={`#${languageItem.id}`}
            onClick={() => {
              handleLanguage(languageItem.id);
            }}
          >
            <img
              src={languageItem.img}
              width={25}
              height={25}
              alt={languageItem.id}
            ></img>
          </a>
        ))}
      </li>
    );
  };

  const renderHeaderNav = () => {
    return (
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
                <p id="order_number">{totalQty}</p>
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
          {renderLanguageButton()}
        </ul>
      </nav>
    );
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

        <div className="container-fluid p-0" id="style1">
          {renderSlogan1()}
          {renderSlogan2()}
          {renderButtonOrder()}
          {renderHeaderNav()}
        </div>

        <ModalMyOrder
          content={content}
          orders={orders}
          page={page}
          show={modalOrder}
          onHide={() => handleModalMyOrder()}
          imgMomo={imgMomo}
        />

        <ModalCart
          content={content}
          cart={cart}
          totalPrice={totalPrice}
          page={page}
          configs={configs}
          orderPayment={orderPayment}
          paymentMethod={{ MOMO, CASH }}
          handleOrderPayment={handleOrderPayment}
          onHide={() => handleModalCart()}
          payBill={payBill}
          clearCart={clearCart}
          removeCartItem={removeCartItem}
          imgMomo={imgMomo}
          show={modalCart}
          handleModalCart={handleModalCart}
          step={step}
          handleStep={handleStep}
          userName={userName}
          handleUserName={handleUserName}
          phoneNumber={phoneNumber}
          handlePhoneNumber={handlePhoneNumber}
          goToMyOrder={goToMyOrder}
        />

        <div ref={scrollToRef}>
          <ListFood
            content={content}
            products={products}
            addCart={addCart}
            loading={loading}
          />
        </div>
      </div>
      <Footer content={content} />
    </>
  );
}

export default HomePage;
