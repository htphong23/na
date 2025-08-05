import React from "react";
import { Container, UncontrolledCarousel } from "reactstrap";
import "../../styles/common-section.css";

const foodBanner = "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1000&q=80";

const CommonSection = ({ title }) => {
  return (
    <>
      <section className="common__section">
        <Container>
          <UncontrolledCarousel
            style={{
              height: "150px",
            }}
            items={[
              {
                key: 1,
                src: foodBanner,
                caption: "Ẩm thực Việt Nam",
              },
              {
                key: 2,
                src: foodBanner,
                caption: "Ẩm thực Việt Nam",
              },
              {
                key: 3,
                src: foodBanner,
                caption: "Ẩm thực Việt Nam",
              },
            ]}
          />
        </Container>
      </section>
    </>
  );
};

export default CommonSection;
