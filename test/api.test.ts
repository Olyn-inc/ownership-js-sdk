import axios from "axios";
import { OwnershipBox } from "../src";

jest.mock("axios");

describe("API", () => {
  let ownership: OwnershipBox;
  let validateNamePayload = {
    status: 200,
    data: {
      available: true,
      payload: {
        uns_name: "olyn",
        uns_name_id: "did:olyn",
        public_key: "0x123456789",
      },
    },
  };
  let createDigitalTwinPayload = {
    status: 200,
    data: {
      public_key: "Anzq5Bvk3yVCsZNVbdfCWJHzdAJkJ2ctindqQV1YQRFk",
      name_id: "4eae726a:4c4ab367-f922-59c2-b5ea-01f6152ff972",
      title: "Olyn Digital Twin",
      creator: "OLYN",
      description: "First DT from the the SDK",
      quantity: 1,
      price: 100,
      currency: "EUR",
      brand: "My Brand Name",
      categories: ["Category1", "Category2"],
      links: ["https://mylink.com"],
      images: ["https://mylink.com/cdn/shop/files/YSB10XK_LATERALE_6.jpg"],
    },
  };

  beforeEach(() => {
    ownership = new OwnershipBox({ shop: "test", shopType: "custom" });
  });

  describe("validate name", () => {
    it("should return name from the API", async () => {
      axios.get = jest.fn().mockResolvedValue(validateNamePayload);

      return ownership.validateName("olyn").then((data) => {
        expect(data).toEqual(
          expect.objectContaining({
            available: true,
            payload: {
              uns_name: "olyn",
              uns_name_id: "did:olyn",
              public_key: "0x123456789",
            },
          })
        );
      });
    });

    it("should throw an error if status is >200", async () => {
      validateNamePayload["status"] = 400;
      axios.get = jest.fn().mockResolvedValue(validateNamePayload);

      return ownership
        .validateName("olyn")
        .catch((error) => console.log(error));
    });
  });

  describe("post", () => {
    it("should create a digital twin using api skd", async () => {
      axios.post = jest.fn().mockResolvedValue(createDigitalTwinPayload);

      return ownership
        .createDigitalTwin(createDigitalTwinPayload.data)
        .then((data) => {
          expect(data).toEqual(
            expect.objectContaining({
              public_key: "Anzq5Bvk3yVCsZNVbdfCWJHzdAJkJ2ctindqQV1YQRFk",
              name_id: "4eae726a:4c4ab367-f922-59c2-b5ea-01f6152ff972",
              title: "Olyn Digital Twin",
              creator: "OLYN",
              description: "First DT from the the SDK",
              quantity: 1,
              price: 100,
              currency: "EUR",
              brand: "My Brand Name",
              categories: ["Category1", "Category2"],
              links: ["https://mylink.com"],
              images: [
                "https://mylink.com/cdn/shop/files/YSB10XK_LATERALE_6.jpg",
              ],
            })
          );
        });
    });
  });
});
