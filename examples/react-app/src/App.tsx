import { useState } from "react";
import "./App.css";
/** @ts-ignore */
import { OwnershipBox } from "@olyn-inc/ownership-js-sdk";
import { toast } from "react-toastify";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";

type ValidateName = {
  payload: {
    uns_name: string;
    uns_name_id: string;
    public_key: string;
  };
};

const PRODUCTS = [
  {
    title: "Aprilia Tuono 660 123",
    description:
      "The Aprilia Tuono is a naked motorcycle manufactured by Aprilia from 2002",
    creator: "mycustomshop",
    quantity: 1,
    price: 12350,
    currency: "EUR",
    brand: "Aprilia",
    categories: ["Motorcycles", "Sport bikes"],
    links: [
      "https://www.motorcycle.com/new-model-preview/2022-aprilia-tuono-660-factory-first-look.html",
    ],
    images: [
      "https://cdn-fastly.motorcycle.com/media/2023/02/26/8993992/2022-aprilia-tuono-660-factory-first-look.jpg",
    ],
  },
];

const ownershipBox = new OwnershipBox({
  shop: "https://mycustomshop.com",
  shopType: "custom",
});

function App() {
  const [validUnsName, setValidUnsName] = useState<ValidateName>({} as any);
  const [hasValidName, setHasValidName] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const { width, height } = useWindowSize();

  const product = PRODUCTS[0];

  const validateName = async (unsName: string) => {
    if (!unsName) return;

    try {
      const checkName = await ownershipBox.validateName(unsName);
      setValidUnsName(checkName.data);
      setHasValidName(true);
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  const issueDigitalTwin = async () => {
    try {
      const issueRequest = await ownershipBox.createDigitalTwin({
        name_id: validUnsName.payload.uns_name_id,
        public_key: validUnsName.payload.public_key,
        title: product.title,
        description: product.description,
        creator: product.creator,
        quantity: product.quantity,
        price: product.price,
        currency: product.currency,
        brand: product.brand,
        categories: product.categories,
        links: product.links,
        images: product.images,
      });

      if (issueRequest.data) {
        toast.success("Digital twin issued successfully");
        setShowConfetti(true);
      }
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  return (
    <div className="App">
      <div className="App-header">
        <p>Connect you inventory with UNS name</p>

        {!hasValidName && (
          <OwnershipBoxValidateName onValidateName={validateName} />
        )}

        {hasValidName && (
          <OwnershipBoxComponent
            unsName={validUnsName}
            product={product}
            onCancel={() => {
              setHasValidName(false);
            }}
            onIssueDigitalTwin={issueDigitalTwin}
          />
        )}

        {showConfetti && <Confetti width={width} height={height} />}
      </div>
    </div>
  );
}

type OwnershipBoxValidateNameProps = {
  onValidateName: (unsName: string) => void;
};

function OwnershipBoxValidateName({
  onValidateName,
}: OwnershipBoxValidateNameProps) {
  const [unsName, setUnsName] = useState("");

  return (
    <div className="validate-name">
      <div className="form-input">
        <input
          type="text"
          name="uns_name"
          placeholder="Type your uns name"
          className="olyn-input"
          onChange={(e) => setUnsName(e.target.value)}
        />
      </div>
      <button
        className="olyn-button"
        onClick={() => unsName.length > 2 && onValidateName(unsName)}
      >
        Continue
      </button>
    </div>
  );
}

type ProductProps = {
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
};

type OwnershipBoxComponentProps = {
  unsName: ValidateName;
  product: ProductProps;
  onCancel?: () => void;
  onIssueDigitalTwin: () => void;
};
function OwnershipBoxComponent({
  unsName,
  product,
  onCancel,
  onIssueDigitalTwin,
}: OwnershipBoxComponentProps) {
  return (
    <div className="ownership-box">
      <div className="ownership-box-image">
        <img src={product.images[0]} alt="" />
      </div>
      <div className="ownership-box-content">
        <em>{product.brand}</em>
        <h2>{product.title}</h2>

        <p>
          Price: &nbsp;
          <strong>
            {product.price} {product.currency}
          </strong>
        </p>
        <p>Quantity: {product.quantity}</p>

        <p>
          <strong>Description</strong> <br />
          {product.description}
        </p>

        <div className="actions">
          <button className="olyn-button" onClick={onIssueDigitalTwin}>
            Issue digital twin to <strong>{unsName?.payload?.uns_name}</strong>
            <br />
            <span>{unsName?.payload?.public_key}</span>
          </button>

          <button className="olyn-link" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
