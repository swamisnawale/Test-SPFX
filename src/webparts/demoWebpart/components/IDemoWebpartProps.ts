import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IDemoWebpartProps {
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;

  // GENERAL VARIABLE
  siteAbsoluteURL: string;
  siteTitle: string;

  // PROPERTY PANE
  getUserName: string;
  getUserAge: number;
  getUserCar: any;
  isMarried: boolean;

  //
  listName: string;
  context: WebPartContext;
}
