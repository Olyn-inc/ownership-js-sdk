/**
 * @public
 */
export type OwnershipOptions = {
  shop?: string;
  shopType: "woocommerce" | "shopify" | "magento" | "custom";
};

/**
 * @public
 */
export type ValidateNameResponse = {
  data: {
    available: boolean;
    payload: {
      uns_name: string;
      uns_name_id: string;
      public_key: string;
    };
  };
};

/**
 * @public
 */
export type CreateDigitalTwinParams = {
  name_id: string;
  public_key: string;
  title: string;
  creator: string;
  description: string;
  quantity: number;
  price: number;
  currency: string;
  brand: string;
  categories: string[];
  links: string[];
  images: string[];
  rules?: string[];
  documents?: string[];
  medatadata?: any;
};

/**
 * @public
 */
export type CreateDigitalTwinResponse = {
  data: {
    issued_at: string;
    issued_by: string;
  };
};

/**
 * @public
 */
export interface OwnershipBoxInterface {
  validateName(name: string): Promise<ValidateNameResponse>;
  createDigitalTwin(params: CreateDigitalTwinParams): Promise<any>;
}
