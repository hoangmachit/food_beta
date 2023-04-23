import { SvgClose } from "../Svg";
export default function Toast(props) {
  const { hideToast, header, body, time } = props;
  return (
    <>
      <div className="toast-fixed">
        <div className="toast show">
          <div className="toast-header">
            <strong className="mr-auto">{header ? header : ""}</strong>
            <small>{time ? time : ""}</small>
            <button
              type="button"
              className="ml-2 mb-1 close"
              onClick={() => hideToast()}
            >
              <SvgClose />
            </button>
          </div>
          <div className="toast-body">{body ? body : ""}</div>
        </div>
      </div>
    </>
  );
}
