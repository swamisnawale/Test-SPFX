import * as React from "react";
import styles from "./DemoWebpart.module.scss";
import { IDemoWebpartProps } from "./IDemoWebpartProps";

export default class DemoWebpart extends React.Component<
  IDemoWebpartProps,
  {}
> {
  public render(): React.ReactElement<IDemoWebpartProps> {
    return <div className={styles["test-spfx"]}></div>;
  }
}
