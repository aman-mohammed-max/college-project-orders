import orders from "./orders";
export default interface TableProps {
  id: string;
  number: string;
  status?: orders["status"];
  QRCode?: string;
}
