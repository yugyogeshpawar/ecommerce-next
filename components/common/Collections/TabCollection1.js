import React, { useState, useContext } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import ProductItem from "../product-box/ProductBox1";
import CartContext from "../../../helpers/cart/index";
import { Container, Row, Col, Media } from "reactstrap";
import { WishlistContext } from "../../../helpers/wishlist/WishlistContext";
import PostLoader from "../PostLoader";
import { CompareContext } from "../../../helpers/Compare/CompareContext";
import { CurrencyContext } from "../../../helpers/Currency/CurrencyContext";
import emptySearch from "../../../public/assets/images/empty-search.jpg";


const GET_PRODUCTS = gql`
  query products($type: _CategoryType!, $indexFrom: Int!, $limit: Int!) {
    products(type: $type, indexFrom: $indexFrom, limit: $limit) {
      items {
        id
        title
        description
        type
        brand
        category
        price
        new
        stock
        sale
        discount
        variants {
          id
          sku
          size
          color
          image_id
        }
        images {
          image_id
          id
          alt
          src
        }
      }
    }
  }
`;

const TabContent = ({
  data,
  loading,
  startIndex,
  endIndex,
  cartClass,
  backImage,
}) => {
  const context = useContext(CartContext);
  const wishListContext = useContext(WishlistContext);
  const compareContext = useContext(CompareContext);
  const curContext = useContext(CurrencyContext);
  const currency = curContext.state;
  const quantity = context.quantity;

  return (
    <Row className="no-slider">
      {!data ||
      !data.products ||
      !data.products.items ||
      data.products.items.length === 0 ||
      loading ? (
        data &&
        data.products &&
        data.products.items &&
        data.products.items.length === 0 ? (
          <Col xs="12">
            <div>
              <div className="col-sm-12 empty-cart-cls text-center">
                <Media
                  src={emptySearch}
                  className="img-fluid mb-4 mx-auto"
                  alt=""
                />
                <h3>
                  <strong>Your Cart is Empty</strong>
                </h3>
                <h4>Explore more shortlist some items.</h4>
              </div>
            </div>
          </Col>
        ) : (
          <div className="row mx-0 margin-default">
            <div className="col-xl-3 col-lg-4 col-6">
              <PostLoader />
            </div>
            <div className="col-xl-3 col-lg-4 col-6">
              <PostLoader />
            </div>
            <div className="col-xl-3 col-lg-4 col-6">
              <PostLoader />
            </div>
            <div className="col-xl-3 col-lg-4 col-6">
              <PostLoader />
            </div>
          </div>
        )
      ) : (
        data &&
        data.products.items
          .slice(startIndex, endIndex)
          .map((product, i) => (
            <ProductItem
              key={i}
              product={product}
              symbol={currency.symbol}
              addCompare={() => compareContext.addToCompare(product)}
              addCart={() => context.addToCart(product, quantity)}
              addWishlist={() => wishListContext.addToWish(product)}
              cartClass={cartClass}
              backImage={backImage}
            />
          ))
      )}
    </Row>
  );
};


const dummyData = {
  products: {
    items: [
      {
        id: 1,
        title: "Modern Sofa",
        description: "A stylish and modern sofa for your living room.",
        type: "furniture",
        brand: "Furniture Co.",
        category: "Sofas",
        price: 599,
        new: true,
        stock: 15,
        sale: false,
        discount: 0,
        variants: [
          {
            id: 101,
            sku: "MODSOFA101",
            size: "Large",
            color: "Gray",
            image_id: 1001,
          },
          {
            id: 102,
            sku: "MODSOFA102",
            size: "Large",
            color: "Blue",
            image_id: 1002,
          },
        ],
        images: [
          {
            image_id: 1001,
            id: 1,
            alt: "Modern Sofa - Gray",
            src: "/images/modern-sofa-gray.jpg",
          },
          {
            image_id: 1002,
            id: 2,
            alt: "Modern Sofa - Blue",
            src: "/images/modern-sofa-blue.jpg",
          },
        ],
      },
      {
        id: 2,
        title: "Classic Dining Table",
        description: "A timeless dining table with a wooden finish.",
        type: "furniture",
        brand: "Home Essentials",
        category: "Dining Tables",
        price: 399,
        new: false,
        stock: 10,
        sale: true,
        discount: 20,
        variants: [
          {
            id: 201,
            sku: "DININGTABLE201",
            size: "Medium",
            color: "Brown",
            image_id: 2001,
          },
          {
            id: 202,
            sku: "DININGTABLE202",
            size: "Large",
            color: "White",
            image_id: 2002,
          },
        ],
        images: [
          {
            image_id: 2001,
            id: 3,
            alt: "Classic Dining Table - Brown",
            src: "/images/classic-dining-table-brown.jpg",
          },
          {
            image_id: 2002,
            id: 4,
            alt: "Classic Dining Table - White",
            src: "/images/classic-dining-table-white.jpg",
          },
        ],
      },
      {
        id: 3,
        title: "Contemporary Desk",
        description: "A sleek and contemporary desk for your workspace.",
        type: "furniture",
        brand: "Office Innovations",
        category: "Desks",
        price: 299,
        new: true,
        stock: 12,
        sale: false,
        discount: 0,
        variants: [
          {
            id: 301,
            sku: "DESK301",
            size: "Small",
            color: "Black",
            image_id: 3001,
          },
          {
            id: 302,
            sku: "DESK302",
            size: "Medium",
            color: "White",
            image_id: 3002,
          },
        ],
        images: [
          {
            image_id: 3001,
            id: 5,
            alt: "Contemporary Desk - Black",
            src: "/images/contemporary-desk-black.jpg",
          },
          {
            image_id: 3002,
            id: 6,
            alt: "Contemporary Desk - White",
            src: "/images/contemporary-desk-white.jpg",
          },
        ],
      },
      // Add more products if needed
    ],
  },
};

const SpecialProducts = ({
  type,
  fluid,
  designClass,
  cartClass,
  heading,
  noTitle,
  title,
  inner,
  line,
  hrClass,
  backImage,
}) => {
  const [activeTab, setActiveTab] = useState(type);
  const context = useContext(CartContext);
  const wishListContext = useContext(WishlistContext);
  const compareContext = useContext(CompareContext);
  const curContext = useContext(CurrencyContext);
  const currency = curContext.state;
  const quantity = context.quantity;

  var { loading, data } = useQuery(GET_PRODUCTS, {
    variables: {
      type: activeTab,
      indexFrom: 0,
      limit: 8,
    },
    data: dummyData,
  });


  return (
    <div>
      <section className={designClass}>
        <Container fluid={fluid}>
          {noTitle ? (
            ""
          ) : (
            <div className={title}>
              <h4>exclusive products</h4>
              <h2 className={inner}>special products</h2>
              {line ? (
                <div className="line"></div>
              ) : hrClass ? (
                <hr role="tournament6"></hr>
              ) : (
                ""
              )}
            </div>
          )}

          <Tabs className="theme-tab">
            <TabList className="tabs tab-title">
              <Tab
                className={activeTab == type ? "active" : ""}
                onClick={() => setActiveTab(type)}
              >
                NEW ARRIVAL
              </Tab>
              <Tab
                className={activeTab == "furniture" ? "active" : ""}
                onClick={() => setActiveTab("furniture")}
              >
                FEATURED{" "}
              </Tab>
              <Tab
                className={activeTab == "furniture" ? "active" : ""}
                onClick={() => setActiveTab("furniture")}
              >
                SPECIAL
              </Tab>
            </TabList>

            <TabPanel>
              <TabContent
                data={dummyData}
                loading={loading}
                startIndex={0}
                endIndex={8}
                cartClass={cartClass}
                backImage={backImage}
              />
            </TabPanel>
            <TabPanel>
              <TabContent
                data={dummyData}
                loading={loading}
                startIndex={0}
                endIndex={8}
                cartClass={cartClass}
                backImage={backImage}
              />
            </TabPanel>
            <TabPanel>
              <TabContent
                data={dummyData}
                loading={loading}
                startIndex={0}
                endIndex={8}
                cartClass={cartClass}
                backImage={backImage}
              />
            </TabPanel>
          </Tabs>
        </Container>
      </section>
    </div>
  );
};

export default SpecialProducts;
