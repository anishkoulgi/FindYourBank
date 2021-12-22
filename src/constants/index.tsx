export const BASE_URL = "https://vast-shore-74260.herokuapp.com/banks?city=";

export const MINS = 60000;
export const SECONDS = 1000;

export const columns = [
  {
    name: "Bank",
    key: "bank_name",
    style: { flex: "3", fontWeight: 600 },
  },
  {
    name: "IFSC",
    key: "ifsc",
    style: { flex: "3", fontWeight: 600 },
  },
  {
    name: "Branch",
    key: "branch",
    style: { flex: "2" },
  },
  {
    name: "Bank ID",
    key: "bank_id",
    style: { flex: "2" },
  },
  {
    name: "Address",
    key: "address",
    style: { flex: "4" },
  },
];

export const cities = [
  {
    label: "Mumbai",
    value: "MUMBAI",
  },
  {
    label: "Pune",
    value: "PUNE",
  },
  {
    label: "Bangalore",
    value: "BANGALORE",
  },
  {
    label: "Delhi",
    value: "DELHI",
  },
  {
    label: "Chennai",
    value: "CHENNAI",
  },
];

export const filterOptions = [
  { label: "IFSC", value: "ifsc" },
  { label: "Bank Name", value: "bank_name" },
  { label: "Branch", value: "branch" },
];

export const PaginationOptions = [
  { label: "5", value: 5 },
  { label: "10", value: 10 },
  { label: "20", value: 20 },
];
