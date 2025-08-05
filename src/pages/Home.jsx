import React, { useState, useEffect } from "react";
import Helmet from "../components/Helmet/Helmet";
import { Link } from "react-router-dom";
import "../styles/home.css";
import { Container, Col, Row } from "reactstrap";
import Services from "../services/Services";
import ProductsList from "../components/UI/ProductsList";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProduct } from "../redux/slices/managerProductSlice";
import CountUp from "react-countup";

const Home = () => {
  const products = useSelector((state) => state.managerProduct?.products);
  const trendingProducts = useSelector((state) => state.managerProduct?.trendingProducts);
  const bestSalesProducts = useSelector((state) => state.managerProduct?.bestSalesProducts);
  const popularProducts = useSelector((state) => state.managerProduct?.popularProducts);
  const dispatch = useDispatch();

  const fetchAllProducts = () => {
    dispatch(fetchAllProduct());
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const year = new Date().getFullYear();

  return (
    <Helmet title={"Trang chủ"}>
      {/* Hero Section */}
      <section className="hero-section">
        <Container>
          <Row>
            <Col lg="6" md="6">
              <div className="hero-content">
                <h1 className="hero-title">
                  Nhà hàng Việt Nam
                </h1>
                <p className="hero-subtitle">
                  Món ăn truyền thống Việt Nam
                </p>
                <p className="hero-description">
                  Chúng tôi phục vụ những món ăn truyền thống Việt Nam 
                  với hương vị đậm đà và nguyên liệu tươi ngon nhất.
                </p>
                <Link to="/shop" className="hero-button">
                  Xem thực đơn
                </Link>
              </div>
            </Col>
            <Col lg="6" md="6">
              <div className="hero-image">
                <img 
                  src="https://images.unsplash.com/photo-1563245372-f21724e3856d?w=600&h=400&fit=crop" 
                  alt="Món ăn Việt Nam"
                  className="hero-img"
                />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Services */}
      <Services />

      {/* Stats Section */}
      <section className="stats-section">
        <Container>
          <Row>
            <Col lg="6">
              <div className="stat-item">
                <h3>
                  <CountUp start={0} end={100} duration={5} />
                </h3>
                <p>Món ăn đã phục vụ</p>
              </div>
            </Col>
            <Col lg="6">
              <div className="stat-item">
                <h3>
                  <CountUp start={50} end={200} duration={5} />
                </h3>
                <p>Khách hàng hài lòng</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Vietnamese Food Introduction */}
      <section className="vietnamese-food-intro">
        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <h2 className="intro-title">Ẩm thực Việt Nam</h2>
              <p className="intro-subtitle">Hương vị truyền thống - Chất lượng hiện đại</p>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col lg="4" md="6">
              <div className="intro-card">
                <div className="intro-icon">
                  <i className="ri-restaurant-2-line"></i>
                </div>
                <h4>Món ăn truyền thống</h4>
                <p>Phở, bún chả, cơm tấm và nhiều món ăn đặc trưng của Việt Nam được chế biến theo công thức truyền thống.</p>
              </div>
            </Col>
            <Col lg="4" md="6">
              <div className="intro-card">
                <div className="intro-icon">
                  <i className="ri-leaf-line"></i>
                </div>
                <h4>Nguyên liệu tươi ngon</h4>
                <p>Sử dụng nguyên liệu tươi ngon, rau củ sạch và gia vị tự nhiên để tạo nên hương vị đậm đà.</p>
              </div>
            </Col>
            <Col lg="4" md="6">
              <div className="intro-card">
                <div className="intro-icon">
                  <i className="ri-heart-line"></i>
                </div>
                <h4>Chế biến cẩn thận</h4>
                <p>Mỗi món ăn được chế biến cẩn thận với tình yêu và sự tôn trọng dành cho ẩm thực Việt Nam.</p>
              </div>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col lg="12" className="text-center">
              <div className="intro-highlight">
                <img 
                  src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80" 
                  alt="Chuẩn bị món ăn Việt Nam"
                  className="intro-image"
                />
                <div className="intro-overlay">
                  <h3>Khám phá hương vị Việt Nam</h3>
                  <p>Trải nghiệm ẩm thực đa dạng từ Bắc vào Nam</p>
                  <Link to="/shop" className="intro-button">
                    Đặt món ngay
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Featured Products */}
      <section className="featured-section">
        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <h2 className="section-title">Món ăn nổi bật</h2>
            </Col>
            <ProductsList data={trendingProducts} />
          </Row>
        </Container>
      </section>

      {/* Best Selling */}
      <section className="best-selling-section">
        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <h2 className="section-title">Món ăn bán chạy</h2>
            </Col>
            <ProductsList data={bestSalesProducts} />
          </Row>
        </Container>
      </section>

      {/* Popular Category */}
      <section className="popular-section">
        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <h2 className="section-title">Danh mục phổ biến</h2>
            </Col>
            <ProductsList data={popularProducts} />
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Home;
