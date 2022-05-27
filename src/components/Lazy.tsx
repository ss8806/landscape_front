import React, { Component } from "react";

let result:
  | boolean
  | React.ReactChild
  | React.ReactFragment
  | null
  | undefined = null;
const timeout = (msec: number | undefined) =>
  new Promise((resolve) => {
    setTimeout(resolve, msec);
  });

const LazyComponent = () => {
  if (result !== null) {
    return <div>{result}</div>;
  }
  throw new Promise<void>(async (resolve) => {
    await timeout(2000);
    result = "";
    resolve();
  });
};

export default LazyComponent;
