// pages/blog.js

import React, { useState } from 'react';
import Link from 'next/link';
import { Grid, Header, List, Pagination } from 'semantic-ui-react';
import Layout from '../components/Layout';

const itemsPerPage = 5;

const Blog = ({ posts }) => {
  const [activePage, setActivePage] = useState(1);

  const handlePageChange = (e, { activePage }) => {
    setActivePage(activePage);
  };

  const totalPages = Math.ceil(posts.length / itemsPerPage);
  const startIndex = (activePage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const visiblePosts = posts.slice(startIndex, endIndex);

  return (
    <Layout>
      <Grid centered>
        <Grid.Column width={10}>
          <Header as="h1">Blog Posts</Header>
          {visiblePosts.length === 0 ? (
            <p>No blog posts found.</p>
          ) : (
            <List divided relaxed>
              {visiblePosts.map((post) => (
                <List.Item key={post.id}>
                  <Link href={`/blog/${post.id}`}>
                    <a>{post.title}</a>
                  </Link>
                </List.Item>
              ))}
            </List>
          )}

          {totalPages > 1 && (
            <Pagination
              activePage={activePage}
              onPageChange={handlePageChange}
              totalPages={totalPages}
            />
          )}
        </Grid.Column>
      </Grid>
    </Layout>
  );
};

Blog.getInitialProps = async () => {
  try {
    // Import blogData from the correct path
    const blogData = require('../data/blogData').default;

    console.log('Fetched posts:', blogData);

    return {
      posts: blogData,
    };
  } catch (error) {
    console.error('Error fetching posts:', error);
    return {
      posts: [],
    };
  }
};

export default Blog;
