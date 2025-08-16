import Carousel from "react-bootstrap/Carousel";

export default function BrandCarousel() {
  return (
    <Carousel fade interval={3000} pause="hover">
      <Carousel.Item>
        <img className="d-block w-100 banner_img" src="/images/banners/banner1.png" alt="First brand" />
      </Carousel.Item>

      <Carousel.Item>
        <img className="d-block w-100 banner_img" src="/images/banners/banner2.png" alt="Second brand" />
      </Carousel.Item>

      <Carousel.Item>
        <img className="d-block w-100 banner_img" src="/images/banners/banner3.png" alt="Third brand" />
      </Carousel.Item>

      <Carousel.Item>
        <img className="d-block w-100 banner_img" src="/images/banners/banner4.png" alt="Fourth brand" />
      </Carousel.Item>

      <Carousel.Item>
        <img className="d-block w-100 banner_img" src="/images/banners/banner5.png" alt="Fifth brand" />
      </Carousel.Item>

      <Carousel.Item>
        <img className="d-block w-100 banner_img" src="/images/banners/banner6.png" alt="sixth brand" />
      </Carousel.Item>
    </Carousel>
  );
}
