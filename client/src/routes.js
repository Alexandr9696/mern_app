import React from 'react'
import {Switch, Route, Redirect} from "react-router-dom";
import {LinksPage} from "./pages/LinksPage";
import {CreatePage} from "./pages/CreatePage";
import {DetailPage} from "./pages/DetailPage";
import {AuthPage} from "./pages/AuthPage";

export const useRoutes = (isAuthenticated) => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path="/link" component={LinksPage} exact />
        <Route path="/create" component={CreatePage} exact />
        <Route path="/default:id" component={DetailPage} />
        <Redirect to="/create" />
      </Switch>
    )
  }

  return (
    <Switch>
      <Route path="/" component={AuthPage} exact />
    </Switch>
  )
}