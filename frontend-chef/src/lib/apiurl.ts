class Url {
  static readonly table = `${import.meta.env.VITE_API_HOST}/table`;
  static readonly foods = `${import.meta.env.VITE_API_HOST}/foods`;
  static readonly orders = `${import.meta.env.VITE_API_HOST}/orders`;
}

export default Url;
