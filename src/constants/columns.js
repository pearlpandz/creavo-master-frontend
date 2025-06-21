import moment from "moment/moment";

export const DISTRIBUTOR_COLUMNS = [
  {
    field: "name",
    headerName: "Name",
    type: "text",
    flex: 1,
  },
  { field: "email", headerName: "Email", type: "text", flex: 1 },
  { field: "mobile_number", headerName: "Mobile", type: "text", flex: 1 },
  {
    field: "created_at",
    headerName: "Created At",
    type: "date",
    flex: 1,
    valueGetter: (params) => {
      return new Date(params);
    },
  },
  { field: "is_verified", headerName: "Status", type: "boolean", flex: 1 },
];

export const RESELLER_COLUMNS = [
  { field: "name", headerName: "Name", type: "text", flex: 1 },
  { field: "email", headerName: "Email", type: "text", flex: 1 },
  { field: "mobile_number", headerName: "Mobile", type: "text", flex: 1 },
  {
    field: "date_joined",
    headerName: "Created At",
    type: "date",
    flex: 1,
    valueGetter: (params) => {
      return new Date(params);
    },
  },
  { field: "downloads", headerName: "Downloads", type: "number", flex: 1 },
  {
    field: "exceeded_downloads",
    headerName: "Subscription Day Limit Exceeded Downloads",
    hide: true,
    type: "number",
    flex: 1,
  },
  {
    field: "no_subscription_downloads",
    headerName: "Without Subscription Downloads",
    hide: true,
    type: "number",
    flex: 1,
  },
  { field: "is_verified", headerName: "Status", type: "boolean", flex: 1 },
];

export const LICENSE_COLUMNS = [
  { field: "code", headerName: "License", type: "text", flex: 1 },
  {
    field: "subscription",
    headerName: "Subscription",
    type: "text",
    flex: 1,
    valueGetter: (params) => {
      return params?.name || "-";
    },
  },
  {
    field: "created_at",
    headerName: "Purchased Date",
    type: "text",
    flex: 1,
    valueGetter: (params) => {
      return params ? moment(new Date(params)).format("DD/MM/YYYY") : "-";
    },
  },
  {
    field: "purchased_at",
    headerName: "Sold Date",
    type: "text",
    flex: 1,
    valueGetter: (params) => {
      return params ? moment(new Date(params)).format("DD/MM/YYYY") : "-";
    },
  },
  {
    field: "purchased_by",
    headerName: "Sold To",
    type: "text",
    flex: 1,
    valueGetter: (params) => {
      return params?.name || "-";
    },
  },
  {
    field: "status",
    headerName: "Status",
    type: "text",
    flex: 1,
  },
];
