import React, { useEffect, useState } from "react";

import { Col, Form, Row, Container } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";

import appstyles from "../../App.module.css";
import styles from "../../styles/PostsPage.module.css";
import Post from "./Post";

import noResults from "../../assets/no-results.webp"
import Asset from "../../components/Asset";

const PostsPage = (message, filter = "") => {
  const [posts, setPosts] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const fetchPosts = async () => {
        try {
            const {data} = await axiosReq.get('/posts/?{filter}')
            setPosts(data)
            setHasLoaded(true)
        } catch (error) {
            console.log(error)
        }
    }
    setHasLoaded(false)
    fetchPosts();
  }, [filter, pathname])

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <p>Popular profiles on mobile</p>
        {hasLoaded ? (
            <>
                {posts.results.length ? (
                    posts.results.map((post) => (
                        <Post key={post.id} {...post} setPosts={setPosts} />
                    ))
                ) : (
                    <Container className={appstyles.Content}>
                        <Asset src={noResults} message={message} />
                    </Container>
                )}
            </>
        )
        : (
            <Container className={appstyles.Content}>
                <Asset spinner />
            </Container>
        )}
      </Col>
      <Col md={4} className="d-none d-lg-block p-0 p-lg-2">
        <p>Popular Profiles for desktop</p>
      </Col>
    </Row>
  );
};

export default PostsPage;
