import * as React from "react";
import styles from "./DemoWebpart.module.scss";
import { IDemoWebpartProps } from "./IDemoWebpartProps";
import { SPHttpClient, SPHttpClientResponse } from "@microsoft/sp-http";
import * as moment from "moment";

// This is for single item
interface IEmployeeListItem {
  Title: string;
  Address: string;
  BirthDate: any;
  ID: number;
  Created: any;
  Technology: string;
  Profile: string;
  Manager: {
    Title: string;
    EMail: string;
  };
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
    let selectColumns =
      "ID,Title,BirthDate,Address,Manager/Title,Manager/EMail,Profile";
    let expandColumns = "Manager";

    let listURL = `${this.props.siteAbsoluteURL}/_api/web/lists/getbytitle('${this.props.listName}')/items?$select=${selectColumns}&$expand=${expandColumns}`;
    console.log(listURL);
    this.props.context.spHttpClient
      .get(listURL, SPHttpClient.configurations.v1)
      .then((response: SPHttpClientResponse) => {
        response.json().then((responseJSON: any) => {
          this.setState({
            AllEmployees: responseJSON.value,
          });
          console.log(this.state.AllEmployees);
        });
      });
  };
  public render(): React.ReactElement<IDemoWebpartProps> {
    return (
      <div className={styles["test-spfx"]}>
        <h1>Employee Information</h1>
        {/* Table view */}
        <div style={{ display: this.props.viewType ? "none" : "" }}>
          <table>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Address</th>
              <th>Tech</th>
            </tr>
            {this.state.AllEmployees.map((emp) => {
              return (
                <tr>
                  <td>{emp.ID}</td>
                  <td>{emp.Title}</td>
                  <td>{emp.Address}</td>
                  <td>{emp.Technology}</td>
                </tr>
              );
            })}
          </table>
        </div>

        {/* Card View */}
        <div
          className={styles["card-container"]}
          style={{ display: this.props.viewType ? "" : "none" }}
        >
          {this.state.AllEmployees.map((emp) => {
            return (
              <div className={styles["card-div"]}>
                <p>{emp.ID}</p>
                <p>{emp.Title}</p>
                <p>{emp.Address}</p>
                <p>{moment(emp.BirthDate).format("LL")}</p>
                <p>Manager Name: {emp.Manager.Title}</p>
                <img
                  src={
                    emp.Profile == null
                      ? "https://imgd.aeplcdn.com/0x0/n/cw/ec/144681/virtus-exterior-right-front-three-quarter.jpeg?isig=0"
                      : window.location.origin +
                        JSON.parse(emp.Profile).serverRelativeUrl
                  }
                  alt=""
                  width={50}
                  height={50}
                />
                <img
                  src={`${this.props.context.pageContext.web.serverRelativeUrl}/_layouts/15/userphoto.aspx?accountname=${emp.Manager.Title}`}
                  alt=""
                  width={50}
                  height={50}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
