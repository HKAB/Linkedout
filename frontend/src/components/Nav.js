import React from 'react';
import { Route, Switch, Redirect, NavLink, Link } from 'react-router-dom';

import { Login } from '@/account';

import { Layout, Menu, Breadcrumb } from 'antd';
const { Header, Content, Footer } = Layout;


function Nav() {
    return (
    	<Header>
            <NavLink to="/#">Home</NavLink> | 
            <NavLink to="/#">Contributors</NavLink> | 
            <NavLink to="/login">Login</NavLink>
    	</Header>
    );
}

export { Nav };