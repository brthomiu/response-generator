export type Fields = {
  messageType:
    | "Greeting - Local"
    | "Greeting - Remote"
    | "Delivered - Local"
    | "Delivered - Remote";
  userName: string;
  equipment: string;
  trackingNo: string;
  location: string;
  signoff: string;
  signature: string;
  urgency: string;
};

export type Message = {
  greeting: string;
  intro: string | null;
  tracking: string | null;
  body: string;
  footer: string;
  signoff: string;
  signature: string;
};



export const generateRandomSignoff = () => {
  const digit = Date.now().toString().slice(-1);

  if (digit === "0" || digit === "1") {
    return "Best regards,";
  }
  if (digit === "2" || digit === "3") {
    return "Kind regards,";
  }
  if (digit === "4" || digit === "5") {
    return "Many thanks,";
  }
  if (digit === "6" || digit === "7") {
    return "Respectfully,";
  }
  if (digit === "8" || digit === "9") {
    return "Thank you,";
  } else return "Best regards,";
};

export const generateMessage = (payload: Fields) => {
  const {
    messageType,
    userName,
    equipment,
    location,
    trackingNo,
    signature,
    signoff,
    urgency,
  } = payload;

  const intro = "Thank you for contacting EMT!";

  const d = new Date();

  const date = `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;

  if (messageType === "Greeting - Local") {
    return {
      greeting: `Hi, ${userName}`,
      intro,
      body: `Your request for the ${equipment} has been received and is currently being processed. Your order will be delivered to the specified location (${location}) within ${urgency}. You will receive another update when the equipment is delivered.`,
      signoff,
      signature,
    };
  }

  if (messageType === "Greeting - Remote") {
    return {
      greeting: `Hi, ${userName}`,
      intro,
      body: `I have received your request for the ${equipment}. Your order is currently being processed; I will update you here once your equipment has been shipped.`,
      signoff,
      signature,
    };
  }

  if (messageType === "Delivered - Local") {
    return {
      greeting: `Hi, ${userName}`,
      body: `The ${equipment} that you requested has been delivered to ${location} on ${date}.`,
      signoff,
      signature,
    };
  }

  if (messageType === "Delivered - Remote") {
    return {
      greeting: `Hi, ${userName}`,
      body: `The ${equipment} that you requested is being shipped to you via FedEx. Please see the provided tracking number below.`,
      tracking: `FedEx Tracking Number: ${trackingNo}`,
      signoff,
      signature,
    };
  } else return null;
};
