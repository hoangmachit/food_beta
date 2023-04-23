const MOMO = "momo";
const CASH = "cash";
const TypePayment = [MOMO, CASH];
let storedPayment = localStorage.getItem("order_payment");
if (!(storedPayment && TypePayment.includes(storedPayment))) {
  storedPayment = TypePayment[1];
}
export { TypePayment, storedPayment, MOMO, CASH };
