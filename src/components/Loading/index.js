export default function Loading(props) {
    const { loading } = props;
    let active = loading ? "active" : "";
    return (
        <div className={`loading ${active}`}>
            <div className="lds-roller">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
}