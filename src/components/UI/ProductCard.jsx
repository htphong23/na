import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Col } from "reactstrap";
import { cartActions } from "../../redux/slices/cartSlice";
import "../../styles/product-card.css";

const ProductCard = ({ item }) => {
  const dispatch = useDispatch();

  // Thêm vào giỏ hàng
  const addToCart = () => {
    dispatch(
      cartActions.addItem({
        id: item.id,
        productName: item.name,
        price: item.retail_price_cents,
        imgUrl: item.grid_picture_url,
        image: item.grid_picture_url, // Thêm key image để đảm bảo tương thích
        quantity: 1,
        size: "M",
      })
    );
    toast.success("Đã thêm vào giỏ hàng!");
  };

  // Format giá tiền
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  return (
    <Col lg="3" md="4" className="mb-3">
      <div className="product-card">
        {/* Hình ảnh món ăn */}
        <div className="product-image">
          <img
            src={item.grid_picture_url}
            alt={item.name}
            className="food-image"
          />
        </div>

        {/* Thông tin món ăn */}
        <div className="product-info">
          <h3 className="product-name">
            <Link to={`/shop/${item.id}`}>{item.name}</Link>
          </h3>
          
          <p className="product-description">
            {item.details}
          </p>

          <div className="product-footer">
            <span className="product-price">
              {formatPrice(item.retail_price_cents)}
            </span>

            <button 
              className="add-to-cart-button"
              onClick={addToCart}
            >
              <i className="ri-add-line"></i>
            </button>
          </div>
        </div>
      </div>
    </Col>
  );
};

export default ProductCard;
