import React, { Component } from "react";
import Router from "next/router";

export default function Index() {
  React.useEffect(() => {
    Router.push("pages/admin/dashboard");
  });

  return <div />;
}
