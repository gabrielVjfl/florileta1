import React from 'react'

import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'


import Home from './pages/home/Home'

import Create from './pages/create/Create'

import Maps from './pages/maps/Maps'

const Routes = () => {
    return (
    <BrowserRouter>
    <Switch>
        <Route path="/" exact component={Home}></Route>
        <Route path="/create" exact component={Create}></Route>
        <Route path="/maps" exact component={Maps}></Route>
    </Switch>
    </BrowserRouter>
    )
}
export default Routes

