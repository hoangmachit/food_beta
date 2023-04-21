import React from "react";
import "./style.css";

import { SvgAddress, SvgFacebook, SvgPhone, SvgGlobal } from "../Svg";

class Footer extends React.Component {
  render() {
    return (
      <>
        <div className="footer">
          <div className="container p-0 d-flex">
            <div className="main-footer">
              <h1>Công ty TNHH Allgrow-labo ALLGROW Inc.</h1>
              <div className="footer-info">
                <div className="items-f">
                  <span className="svg-footer">
                    <SvgAddress />
                  </span>
                  <div className="items-info">
                    4th Floor, An Phu Plaza Building, 117-119 Ly Chinh Thang, Vo
                    Thi Sau Ward, District 3, Ho Chi Minh City, Vietnam
                  </div>
                </div>
                <div className="items-f">
                  <span className="svg-footer">
                    <SvgPhone />
                  </span>
                  <div className="items-info">
                    <a href="tel:0969874264">(+84) 969 874 264</a>
                  </div>
                </div>
                <div className="items-f">
                  <span className="svg-footer">
                    <SvgFacebook />
                  </span>
                  <div className="items-info">
                    <a
                      href="https://www.facebook.com/machvanhoang1507"
                      target="blank"
                    >
                      Contact Support Team
                    </a>
                  </div>
                </div>
                <div className="items-f">
                  <span className="svg-footer">
                    <SvgGlobal />
                  </span>
                  <div className="items-info">
                    <a href="https://allgrow-labo.jp" target="blank">
                      {" "}
                      www.allgrow-labo.jp
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="copyright">
          <p>
            Copyright © 2022 ALLGROW LABO Inc. By design{" "}
            <strong>BE TEAM.</strong>
          </p>
        </div>
      </>
    );
  }
}
export default Footer;
