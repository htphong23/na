import React from "react";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import "../styles/checkout.css";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../redux/slices/cartSlice";
import { toast } from "react-toastify";
import { useState } from "react";
import { addOrder } from "../redux/slices/purchasedSlice";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { cartItems, totalQuantity, totalAmount } = useSelector(
    (state) => state.cart
  );
  const user = useSelector((state) => state.auth?.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const randomId = () => {
    return (
      Date.now().toString(36) +
      Math.floor(
        Math.pow(10, 12) + Math.random() * 9 * Math.pow(10, 12)
      ).toString(36)
    );
  };

  const idOrder = randomId();

  const createOrder = (cartItems) => {
    const total = cartItems.reduce(
      (accumulateValue, item) => accumulateValue + item.price * item.quantity,
      0
    );
    return {
      order_id: idOrder,
      orderItems: cartItems,
      totalAmount: total,
      isPaid: true,
    };
  };

  const [formEmail, setFormEmail] = useState({
    email: "",
    name: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  const handleChangeFormEmail = (e) => {
    setFormEmail((data) => ({ ...data, [e.target.name]: e.target.value }));
  };

  const checkOut = async () => {
    if (cartItems.length === 0) {
      toast.error("Giỏ hàng trống!");
      return;
    }

    // Kiểm tra thông tin bắt buộc
    if (!formEmail.name || !formEmail.email || !formEmail.phone || !formEmail.address) {
      toast.error("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    // Tạo đơn hàng
    dispatch(clearCart());
    dispatch(addOrder(createOrder(cartItems)));
    
    // Hiển thị thông báo thành công
    toast.success("Đặt hàng thành công! Cảm ơn bạn đã chọn nhà hàng chúng tôi!");
    
    // Reset form
    setFormEmail({
      email: "",
      name: "",
      phone: "",
      address: "",
      city: "",
      postalCode: "",
      country: "",
    });

    // Chuyển về trang chủ sau 2 giây
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  return (
    <Helmet title="Đặt hàng">
      <section>
        <Container className="mt-5">
          <Row>
            <Col lg="8">
              <h6 className="fw-bold mb-4">Thông tin đặt hàng</h6>
              <Form className="billing__form">
                <FormGroup className="form__group">
                  <input
                    type="text"
                    placeholder="Nhập tên của bạn"
                    name="name"
                    value={formEmail.name}
                    onChange={handleChangeFormEmail}
                    required
                  />
                </FormGroup>
                <FormGroup className="form__group">
                  <input
                    type="email"
                    placeholder="Nhập email của bạn"
                    name="email"
                    value={formEmail.email}
                    onChange={handleChangeFormEmail}
                    required
                  />
                </FormGroup>
                <FormGroup className="form__group">
                  <input
                    type="phone"
                    placeholder="Nhập số điện thoại nhận hàng"
                    name="phone"
                    value={formEmail.phone}
                    onChange={handleChangeFormEmail}
                    required
                  />
                </FormGroup>
                <FormGroup className="form__group">
                  <input
                    type="text"
                    placeholder="Nhập địa chỉ giao hàng"
                    name="address"
                    value={formEmail.address}
                    onChange={handleChangeFormEmail}
                    required
                  />
                </FormGroup>
                <FormGroup className="form__group">
                  <input
                    type="text"
                    placeholder="Thành phố"
                    name="city"
                    value={formEmail.city}
                    onChange={handleChangeFormEmail}
                  />
                </FormGroup>

                <FormGroup className="form__group">
                  <input
                    type="text"
                    placeholder="Mã bưu điện"
                    name="postalCode"
                    value={formEmail.postalCode}
                    onChange={handleChangeFormEmail}
                  />
                </FormGroup>
                <FormGroup className="form__group">
                  <input
                    type="text"
                    placeholder="Quốc gia"
                    name="country"
                    value={formEmail.country}
                    onChange={handleChangeFormEmail}
                  />
                </FormGroup>
              </Form>
            </Col>
            <Col lg="4">
              <div className="checkout__cart">
                <h6>
                  Số lượng: <span>{totalQuantity} món ăn</span>
                </h6>
                <h6>
                  Đơn giá:{" "}
                  <span>
                    {totalAmount.toLocaleString("it-IT", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </span>
                </h6>
                <h6>
                  <span>
                    Phí: <br />
                    Miễn phí giao hàng
                  </span>
                  <span>0 đ</span>
                </h6>

                <h4>
                  Thành tiền:{" "}
                  <span>
                    {totalAmount.toLocaleString("it-IT", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </span>
                </h4>
                <button className="buy__btn auth__btn w-100" onClick={checkOut}>
                  Đặt hàng ngay
                </button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Checkout;
