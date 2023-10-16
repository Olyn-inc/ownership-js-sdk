import axios from "axios";
import joinUrl from "proper-url-join";

/**
 * Ownership API Client
 *
 * @internal
 */
export default class OwnershipAPI {
  /** The connection from Ownership API */
  public readonly baseUrl: string;

  /** The options Ownership API */
  public readonly options: Record<string, any>;

  /** The headers */
  public readonly headers: Record<string, string>;

  /**
   * Ownership API constructor client
   *
   * @param baseUrl string - Request base url
   * @param options Record<string, any> - Options
   */
  constructor(baseUrl: string, options: Record<string, any>) {
    if (!baseUrl) {
      throw new Error("Invalid baseUrl");
    }

    this.baseUrl = baseUrl;
    this.options = options;

    this.headers = {
      "Content-Type": "application/json",
      "Olyn-Shop-ID": this.options.shop,
      "Olyn-Shop-Type": this.options.shopType,
    };
  }

  /**
   * API post call
   *
   * @param url string
   * @param data object
   * @returns Promise<any>
   */
  async post(url: string, data: any): Promise<any> {
    const apiUrl = joinUrl(this.baseUrl, url, { trailingSlash: true });

    return axios
      .post(apiUrl, data, { headers: this.headers })
      .then((response) => {
        if (response.status >= 400) {
          return Promise.reject(response);
        }

        return Promise.resolve(response.data);
      });
  }

  /**
   * Api get call
   *
   * @param url string
   * @param data any
   * @returns Promise<Any>
   */
  async get(url: string, data: any): Promise<any> {
    const apiUrl = joinUrl(this.baseUrl, url, {
      trailingSlash: true,
      query: data,
    });

    return axios.get(apiUrl, { headers: this.headers }).then((response) => {
      if (response.status >= 400) {
        return Promise.reject(response);
      }

      return Promise.resolve(response.data);
    });
  }
}
