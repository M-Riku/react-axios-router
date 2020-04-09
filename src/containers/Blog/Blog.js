import React, { Component } from 'react';

import { Route, Link, Switch, Redirect } from 'react-router-dom';
import Posts from './Posts/Posts';
import asyncComponent from '../../hoc/asyncComponent';
import './Blog.css';

const AsyncNewPost = asyncComponent(() => {
    return import('./NewPost/NewPost');
})

class Blog extends Component {
    render() {
        return (
            <div className='Blog'>
                <header>
                    <nav>
                        <ul>
                            <li><Link to='/posts'>Home</Link></li>
                            <li><Link to={{
                                pathname: '/new-post',
                                hash: 'submit',
                                search: '?quick-submit=true'
                            }}>New Post</Link></li>
                        </ul>
                    </nav>
                </header>
                <Switch>
                    <Route path='/new-post' exact component={AsyncNewPost} />
                    <Route path='/posts' component={Posts} />
                    <Redirect from='/' to='/posts' />
                </Switch>
            </div>
        );
    }
}

export default Blog;