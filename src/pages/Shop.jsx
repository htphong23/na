import React, { useEffect, useState } from "react";
import Helmet from "../components/Helmet/Helmet";
import { Container, Row, Col } from "reactstrap";
import "../styles/shop.css";
import products from "../assets/data/products";
import ProductsList from "../components/UI/ProductsList";
import { useDispatch } from "react-redux";
import { fetchAllProduct } from "../redux/slices/managerProductSlice";

const Shop = () => {
  const [productsData, setProductsData] = useState(products);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  
  const dispatch = useDispatch();

  const fetchAllProducts = () => {
    dispatch(fetchAllProduct());
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  // Lọc sản phẩm theo tìm kiếm
  const handleSearch = (e) => {
    const searchText = e.target.value;
    setSearchTerm(searchText);
    
    const filtered = products.filter((item) =>
      item.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  // Lọc theo danh mục
  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
    
    if (category === "Tất cả") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((item) =>
        item.category.includes(category.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  };

  // Lấy danh sách danh mục
  const categories = ["Tất cả", "món chính", "món ăn nhanh", "khai vị", "tráng miệng", "đồ uống", "món truyền thống", "món ăn vặt"];

  return (
    <Helmet title="Thực đơn">
      {/* Simple Header */}
      <section className="shop-header">
        <Container>
          <Row>
            <Col lg="12">
              <div className="header-content">
                <h1 className="header-title">Thực đơn</h1>
                <p className="header-subtitle">20 món ăn Việt Nam truyền thống</p>
                <div className="header-image">
                  <img 
                    src="https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800&h=400&fit=crop" 
                    alt="Món ăn Việt Nam"
                    className="header-img"
                  />
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      
      {/* Filter Section */}
      <section className="filter-section">
        <Container>
          <Row>
            <Col lg="6" md="6">
              <div className="filter-container">
                <div className="category-filter">
                  <label>Danh mục:</label>
                  <select 
                    value={selectedCategory}
                    onChange={(e) => handleCategoryFilter(e.target.value)}
                    className="category-select"
                  >
                    {categories.map((category, index) => (
                      <option key={index} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </Col>
            <Col lg="6" md="12">
              <div className="search-container">
                <input
                  type="text"
                  placeholder="Tìm kiếm món ăn..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="search-input"
                />
                <i className="ri-search-line search-icon"></i>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Products Section */}
      <section className="products-section">
        <Container>
          <Row>
            {filteredProducts.length === 0 ? (
              <Col lg="12">
                <div className="no-products">
                  <h3>Không tìm thấy món ăn!</h3>
                  <p>Vui lòng thử tìm kiếm với từ khóa khác.</p>
                </div>
              </Col>
            ) : (
              <>
                <Col lg="12" className="mb-4">
                  <div className="products-info">
                    <h4>Hiển thị {filteredProducts.length} món ăn</h4>
                  </div>
                </Col>
                <ProductsList data={filteredProducts} />
              </>
            )}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Shop;
