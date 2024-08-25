// src/CryptoPortfolio.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { List, Button, Input, Typography, Row, Col, Avatar } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import {
  fetchCryptos,
  addToFavorites,
  removeFromFavorites,
} from "./redux/reducers/cryptoSlice";
import { useSearchParams } from "react-router-dom";

const { Title } = Typography;

const CryptoPortfolio = () => {
  const dispatch = useDispatch();
  const { allCryptos, favorites, status, error } = useSelector(
    (state) => state.crypto
  );
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get("search") || "";

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCryptos());
    }
  }, [status, dispatch]);

  const filteredCryptos = allCryptos.filter((crypto) =>
    crypto.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (e) => {
    const value = e.target.value;
    if (value) {
      setSearchParams({ search: value });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <Title level={1}>Crypto Portfolio</Title>
      <Input
        placeholder="Search"
        prefix={<SearchOutlined />}
        value={searchTerm}
        onChange={handleSearchChange}
        style={{ marginBottom: "20px" }}
      />
      <Row gutter={16}>
        <Col span={12}>
          <Title level={3}>All Cryptocurrencies</Title>
          {status === "loading" ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <List
              dataSource={filteredCryptos}
              renderItem={(item) => (
                <List.Item
                  actions={[
                    <Button
                      type="primary"
                      onClick={() => dispatch(addToFavorites(item))}
                      disabled={favorites.some((fav) => fav.id === item.id)}
                    >
                      Add to Favorites
                    </Button>,
                  ]}
                >
                  <List.Item.Meta
                    avatar={<Avatar src={item.image} />}
                    title={item.name}
                    description={`USD ${item.current_price}`}
                  />
                </List.Item>
              )}
            />
          )}
        </Col>
        <Col span={12}>
          <Title level={3}>Your Favorites</Title>
          <List
            dataSource={favorites}
            renderItem={(item) => (
              <List.Item
                actions={[
                  <Button
                    type="default"
                    danger
                    onClick={() => dispatch(removeFromFavorites(item))}
                  >
                    Remove
                  </Button>,
                ]}
              >
                <List.Item.Meta
                  avatar={<Avatar src={item.image} />}
                  title={item.name}
                  description={`USD ${item.current_price}`}
                />
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </div>
  );
};

export default CryptoPortfolio;
