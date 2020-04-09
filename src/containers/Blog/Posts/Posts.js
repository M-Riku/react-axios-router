import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import axios from '../../../axios';
import Post from '../../../components/Post/Post';
import FullPost from '../FullPost/FullPost';
import './Posts.module.css'

class Posts extends Component {
    state = {
        posts: [],
    }

    componentDidMount() {
        axios.get('/posts').then(
            response => {
                const posts = response.data.slice(0, 4);
                const updatedPosts = posts.map(
                    post => {
                        return {
                            ...post,
                            author: 'LU'
                        };
                    }
                )
                this.setState({ posts: updatedPosts });
            }
        ).catch(error => {
            console.log(error);
            this.setState({ isError: true });
        });
    }

    postSelectedHandler = (id) => {
        this.props.history.push({ pathname: this.props.match.url + '/' + id });
    }

    render() {
        let posts = <p style={{ textAlign: 'center' }}>Something went wrong!</p>
        if (!this.state.isError) {
            posts = this.state.posts.map(
                post => {
                    return (
                        <Post
                            key={post.id}
                            title={post.title}
                            author={post.author}
                            clicked={() => this.postSelectedHandler(post.id)} />
                    )
                }
            );
        }

        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                < Route path={this.props.match.url + '/:id'} exact component={FullPost} />
            </div>
        )
    }
}

export default Posts;