import nc from "next-connect";
import mongoDBConnect from "../../../config/db";

import { webhookCheckout } from "../../../controllers/paymentController";

import onError from "../../../middlewares/onError";

mongoDBConnect();

//let default bodyparser to not working because of "raw-body"
export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = nc({ onError });

handler.post(webhookCheckout);

export default handler;
