import axios, { isAxiosError } from "axios";
import { APP_SETTINGS } from "../libs/config.js";

const API = "https://api.abitmedia.cloud/pagomedios/v2";

export const tokenizateCard = async (document, name, email, phone, address) => {
  try {
    const schema = {
      integration: true,
      third: {
        document: document,
        document_type: "05",
        name: name,
        email: email,
        phones: phone,
        address: address,
        type: "Individual",
      },
      notify_url: APP_SETTINGS.frontend_domain + "/redirect-to-app/card-success",
      custom_value: null,
    };

    const { data } = await axios.post(API + "/cards/register", schema, {
      headers: {
        Authorization: "Bearer " + APP_SETTINGS.payment_token,
      },
    });

    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getTokenizatedCards = async (document) => {
  try {
    const { data } = await axios.get(
      API + "/cards?integration=true&document=" + document,
      {
        headers: {
          Authorization: "Bearer " + APP_SETTINGS.payment_token,
        },
      }
    );
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const chargeCard = async (amount, description, token, document, reference) => {
  try {
    const schema = {
      integration: true,
      document: document,
      token: token,
      reference: reference,
      description: description,
      amount: amount,
      amount_with_tax: amount,
      amount_without_tax: 0,
      tax_value: 0,
      generate_invoice: 0,
    };

    const { data } = await axios.post(API + "/cards/charge", schema, {
      headers: {
        Authorization: "Bearer " + APP_SETTINGS.payment_token,
      },
    });

    return data;
  } catch (error) {
    if(isAxiosError(error)){
      console.log(error.response.data)
    }
    throw new Error(error.message);
  }
};


export const deleteCard = async (token) => {
  try {
    const { data } = await axios.delete(API + "/cards/" + token, {
      headers: {
        Authorization: "Bearer " + APP_SETTINGS.payment_token,
      },
    });

    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};
