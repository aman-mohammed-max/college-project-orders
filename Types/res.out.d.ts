export default interface Out {
  error?: object;
  status: "error" | "success" | "warning" | "loading" | "idle";
  data?: any;
  message?: string;
  errorFrom?: string;
  code: number;
}
