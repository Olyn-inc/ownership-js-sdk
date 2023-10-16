import OwnershipAPI from "./OwnershipApi";
import {
  OwnershipBoxInterface,
  OwnershipOptions,
  ValidateNameResponse,
  CreateDigitalTwinParams,
  CreateDigitalTwinResponse,
} from "./types";

/**
 * OwnershipBox is the main entry point into the Ownership SDK.
 * It is used to create a new instance of Ownership API.
 *
 * @public
 * @param options OwnershipOptions
 * @param api readonly OwnershipAPI
 */
export class OwnershipBox implements OwnershipBoxInterface {
  public options: OwnershipOptions;
  public readonly api: OwnershipAPI;

  constructor(options: OwnershipOptions) {
    const baseUrl = process.env.OWNERSHIP_API_URL || "http://127.0.0.1:5102/v1";
    this.options = options;
    this.api = new OwnershipAPI(baseUrl, this.options);
  }

  /**
   * Validate a uns name method.
   *
   * @public
   * @see {@link https://docs.olyn.com/reference/validate-name|Api Call}
   * @param name string
   * @returns Promise<ValidateNameResponse> Returns a Promise that, when fulfilled, will either return an Object with the
   * uns name detail or an Error with the problem.
   */
  async validateName(name: string): Promise<ValidateNameResponse> {
    return this.api.get("/validate-name", { name });
  }

  /**
   * Create a digital twin method.
   *
   * @public
   * @param params -CreateDigitalTwinParams
   * @returns Promise<CreateDigitalTwinResponse> Returns a Promise that, when fulfilled, will either return an Object with the
   * issuing information or an Error with the problem.
   */
  async createDigitalTwin(
    params: CreateDigitalTwinParams
  ): Promise<CreateDigitalTwinResponse> {
    return this.api.post("/issue-digital-twin", params);
  }
}
