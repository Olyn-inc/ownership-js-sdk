 <div align="center">
 <img align="center" width="230" src="https://i.imgur.com/q4ZyhCu.png" />
  <h2>Ownership Box Library</h2>
</div>

## Introduction

The ownership box allows merchants to issue digital twins at the customer’s account page in any e-commerce platform via a Universal Name.

Our SDK is designed to simplify the development of integrations with OwnershipBox using JavaScript. It offers a user-friendly interface for seamless communication with [OwnershipBox's REST API](<(https://docs.olyn.com/reference/getting-started-with-your-api)>).

## Requirements

To use this SDK, you will need:

- Node.js v18.0.0 or later

Node installation will include NPM, which is responsible for dependency management.

## Install

1. `npm install @olyninc/ownership-sdk`
2. `import { OwnershipBox } from "@olyninc/ownership-sdk";`

## Usage

The SDK is designed to simplify handling asynchronous requests made to the API by taking advantage of Promises. With its set of methods, the OwnershipBox object offers access to calls and parameters as described in the [API documentation](https://docs.olyn.com/reference/getting-started-with-your-api).

For more information on specific modules, please take a look at the example folder. To help you get started with the SDK, here's a sample to demonstrate its usage.

```
import { OwnershipBox } from "@olyn-inc/ownership-sdk";
const ownershipBox = new OwnershipBox({
  shop: "https://mycustomshop.com",
  shopType: "custom",
});
```

### Validate a UNS Name

This method checks the validity of a UNS name and provides the public key and name ID that are necessary for creating a digital twin.

```
const checkName = await ownershipBox.validateName("olyn');
```

### Create a Digital Twin

To make a digital asset, you'll need to enter a name ID and public key as the primary inputs, along with supplementary details about the asset.

```
 const issueRequest = await ownershipBox.createDigitalTwin({
  name_id: checkName.payload.uns_name_id,
  public_key: checkName.payload.public_key,
  title: "Aprilia Tuono 660 123",
  description: "The Aprilia Tuono is a naked motorcycle manufactured by Aprilia from 2002",
  creator: "mycustomshop",
  quantity: 1,
  price: 3000,
  currency: 'USD',
  brand: "Aprilia",
  categories: ["Motorcycles", "Sport bikes"],
  links: ['https://mycustomshop.com/products/aprilia-tuono-660-123'],
  images: ['https://mycustomshop.com/products/aprilia-tuono-660-123.jpg'],
});
```

## Available methods

- validateName(name: string): Promise<ValidateNameResponse>
- createDigitalTwin(digitalTwin: DigitalTwin): Promise<CreateDigitalTwinResponse>
