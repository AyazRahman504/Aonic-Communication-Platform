import {
  UilEstate,
  //UilCalender,
  //UilAnalytics,
  UilMicrosoft,
  // UilSetting,
  UilSlack,
  //UilCommentMessage,
  //UilCommentAltMessage,
  UilGithub,
} from "@iconscout/react-unicons";

export const SidebarData = [
  {
    icon: UilEstate,
    heading: "Home",
    path: "/home",
  },

  {
    icon: UilSlack,
    heading: "Slack",
    path: "/slack",
    subMenu: [
      {
        heading: "Monthly Tracker",
        path: "/slack/monthly-tracker",
      },
      {
        heading: "Recent Messages",
        path: "/slack/recent-messages",
      },
      {
        heading: "Favourite Channels",
        path: "/slack/favourite-channels",
        subMenu: [
          {
            heading: "Rec Mes",
            path: "/slack/recent-messages",
          },
        ],
      },
      {
        heading: "Favourite Users",
        path: "/slack/favourite-users",
      },
    ],
  },

  {
    icon: UilGithub,
    heading: "Github",
    path: "/github",
    subMenu: [
      {
        heading: "Issues",
        path: "/github/issues",
      },
      {
        heading: "Pull Requests",
        path: "/github/pull-requests",
      },
      {
        heading: "Commits",
        path: "/github/commits",
      },
    ],
  },

  {
    icon: UilMicrosoft,
    heading: "Teams",
    path: "/teams",
  },
  /*{
    icon: UilCalender,
    heading: "Calender",
  },
  {
    icon: UilAnalytics,
    heading: "Analytics",
  },*/
];
