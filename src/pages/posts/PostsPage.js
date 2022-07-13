import React, { useEffect, useState } from "react";

import { Col, Form, Row, Container } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";

import appstyles from "../../App.module.css";
import styles from "../../styles/PostsPage.module.css";
import Post from "./Post";

import noResults from "../../assets/no-results.webp";
import Asset from "../../components/Asset";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import PopularProfiles from "../profiles/PopularProfiles";

const PostsPage = ({ message, filter = "" }) => {
  const [posts, setPosts] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();

  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axiosReq.get(`/posts/?${filter}search=${query}`);
        setPosts(data);
        setHasLoaded(true);
      } catch (error) {
        console.log(error);
      }
    };
    setHasLoaded(false);
    const timer = setTimeout(() => {
        fetchPosts();
    }, 1000)

    return () => {
        clearTimeout(timer)
    }
  }, [filter, query, pathname]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <PopularProfiles mobile />
        <i className={`fas fa-search ${styles.SearchIcon}`} />
        <Form
          className={styles.SearchBar}
          onSubmit={(event) => event.preventDefault()}
        >
          <Form.Control
            type="text"
            className="mr-sm-2"
            placeholder="Search Posts"
            onChange={(event) => setQuery(event.target.value)}
            value={query}
          />
        </Form>
        {hasLoaded ? (
          <>
            {posts.results.length ? (
              <InfiniteScroll 
                children={posts.results.map((post) => (
                <Post key={post.id} {...post} setPosts={setPosts} />
                ))}
                dataLength={posts.results.length}
                loader={<Asset  spinner />}
                hasMore={!!posts.next}
                next={() => fetchMoreData(posts, setPosts)}
              />
            ) : (
              <Container className={appstyles.Content}>
                <Asset src={noResults} message={message} />
              </Container>
            )}
          </>
        ) : (
          <Container className={appstyles.Content}>
            <Asset spinner />
          </Container>
        )}
      </Col>
      <Col md={4} className="d-none d-lg-block p-0 p-lg-2">
        <PopularProfiles />
      </Col>
    </Row>
  );
};

export default PostsPage;
