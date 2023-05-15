import * as React from "react";
import styles from "./DemoWebpart.module.scss";
import { IDemoWebpartProps } from "./IDemoWebpartProps";
import { SPHttpClient, SPHttpClientResponse } from "@microsoft/sp-http";

// This is for single item
interface IEmployeeListItem {
  Title: string;
  Address: string;
  BirthDate: any;
  ID: number;
  Created: any;
  Technology: string;
}

// Multiple items
interface IAllItems {
  AllEmployees: IEmployeeListItem[];
}

export default class DemoWebpart extends React.Component<
  IDemoWebpartProps,
  IAllItems
> {
  constructor(props: IDemoWebpartProps, state: IAllItems) {
    super(props);
    this.state = {
      AllEmployees: [],
    };
  }

  componentDidMount() {
    this.getAllEmployeeDetails();
  }

  public getAllEmployeeDetails = () => {
    let listURL = `${this.props.siteAbsoluteURL}/_api/web/lists/getbytitle('${this.props.listName}')/items`;
    console.log(listURL);

    this.props.context.spHttpClient
      .get(listURL, SPHttpClient.configurations.v1)
      .then((response: SPHttpClientResponse) => {
        response.json().then((responseJSON: any) => {
          this.setState({
            AllEmployees: responseJSON.value,
          });
        });
      });
  };
  public render(): React.ReactElement<IDemoWebpartProps> {
    return (
      <div className={styles["test-spfx"]}>
        <p>Hello world!</p>
      </div>
    );
  }
}
