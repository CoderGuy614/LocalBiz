import axios from "axios";

export const apiPost = async (fields) => {
  try {
    const status = await checkEmailStatus(fields.email);
    if (status === "OK") {
      const payload = {
        campaignUuid: "46aa3270-d2ee-11ea-a9f0-e9a68ccff42a",
        data: fields,
      };
      const response = await axios({
        method: "post",
        headers: { "Content-Type": "application/json" },
        url: `https://api.raisely.com/v3/signup`,
        data: JSON.stringify(payload),
      });
      return response.data;
    } else if (status === "EXISTS") {
      return { error: "Please Choose A Different Email Address." };
    }
  } catch (err) {
    return { error: "Something went wrong, please try again." };
  }
};

export const checkEmailStatus = async (email) => {
  try {
    const payload = {
      campaignUuid: "46aa3270-d2ee-11ea-a9f0-e9a68ccff42a",
      data: {
        email: email,
      },
    };
    const emailResponse = await axios({
      method: "post",
      headers: { "Content-Type": "application/json" },
      url: `https://api.raisely.com/v3/check-user`,
      data: JSON.stringify(payload),
    });
    return emailResponse.data.data.status;
  } catch (err) {
    return { error: "Something went wrong, please try again." };
  }
};
