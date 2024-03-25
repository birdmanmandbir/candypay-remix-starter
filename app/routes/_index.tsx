import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";

import { CandyPay } from "@candypay/checkout-sdk";
import { Form, redirect, useNavigation } from "@remix-run/react";
import { Card, CardContent } from "~/components/ui/card";
import { Button } from "~/components/ui/button";

const imgURL = "https://imgur.com/M0l5SDh.png";

const sdk = new CandyPay({
  api_keys: {
    private_api_key: process.env.CANDYPAY_PRIVATE_API_KEY!,
    public_api_key: process.env.CANDYPAY_PUBLIC_API_KEY!,
  },
  network: "devnet", // use 'mainnet' for prod and 'devnet' for dev environment
  config: {
    collect_shipping_address: false,
  },
});

export const action = async (args: LoaderFunctionArgs) => {
  try {
    const response = await sdk.session.create({
      success_url: `${process.env.STATIC_URL}/success`,
      cancel_url: `${process.env.STATIC_URL}/cancel`,
      // additional SPL tokens, SOL and USDC are the supported tokens by default
      tokens: ["dust", "samo"],
      items: [
        {
          name: "Solana Shades",
          // price in USD
          price: 0.1,
          image: imgURL,
          quantity: 1,
          // optional product size parameter
          size: "9",
        },
      ],
      shipping_fees: 0.5,
    });

    return redirect(response.payment_url);
  } catch (error) {
    console.log(error);
    throw new Response("Error creating session", { status: 500 });
  }
};

export const meta: MetaFunction = () => {
  return [
    { title: "CandyPay Remix App" },
    { name: "description", content: "Welcome to Candypay Remix!" },
  ];
};

export default function Index() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <div
      className="grid justify-center w-full gap-4"
      style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}
    >
      <h1>Welcome to CandyPay Remix</h1>
      <Card className="w-[350px]">
        <CardContent>
          <Form id="pay-form" method="post">
            <fieldset disabled={isSubmitting}>
              <div className="grid w-full items-center gap-4">
                <img src={imgURL} alt="solana shades" />
                <Button type="submit">
                  {isSubmitting ? "Loading..." : "Buy your Solana Shades"}
                </Button>
              </div>
            </fieldset>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
