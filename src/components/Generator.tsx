import { generateMessage } from "../features/messageGenerator";
import { useState, useEffect } from "react";
import { Message, Fields } from "../features/messageGenerator";
import { generateRandomSignoff } from "../features/messageGenerator";
import copyButton from "../../assets/copy.svg";

export const Generator = () => {
  const [formData, setFormData] = useState<Fields>({
    messageType: "Greeting - Local",
    userName: "",
    equipment: "",
    trackingNo: "",
    location: "",
    urgency: "one week",
    signoff: generateRandomSignoff(),
    signature: " - Equipment Maintenance Technician",
  });

  const [currentMessage, setCurrentMessage] = useState<Message | null>();

  const handleInput = (
    state: Fields,
    field:
      | "messageType"
      | "userName"
      | "equipment"
      | "trackingNo"
      | "location"
      | "signoff"
      | "urgency"
      | "signature",
    setState: React.Dispatch<React.SetStateAction<Fields>>,
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    if (
      (field === "messageType" && event.target.value === "Greeting - Local") ||
      event.target.value === "Greeting - Remote" ||
      event.target.value === "Delivered - Local" ||
      event.target.value === "Delivered - Remote"
    ) {
      const value = event.target.value;

      const newState = { ...state };

      newState[field] = value;

      setState(newState);
    } else if (field === "signoff") {
      const value = event.target.value;

      const newState = { ...state };

      newState[field] = value;

      setState(newState);
    } else if (field != "messageType") {
      const text: string = event.target.value;

      const newState = { ...state };

      newState[field] = text;

      setState(newState);
    }
  };

  const copyToClipboard = () => {
    const responseElement = document.getElementById("responseMessage");
    if (!responseElement) return;
  
    // Get the inner HTML and replace <br> tags with newline characters
    const htmlContent = responseElement.innerHTML;
    const textWithLineBreaks = htmlContent.replace(/<br\s*\/?>/g, "\n").replace(/<[^>]*>?/gm, ''); // Remove other HTML tags
  
    if (navigator.clipboard) {
      navigator.clipboard.writeText(textWithLineBreaks).then(() => {
        console.log('Text copied to clipboard');
      }).catch(err => {
        console.error('Failed to copy text: ', err);
      });
      return; // Codes below won't be executed
    }
  
    const textArea = document.createElement("textarea");
    textArea.value = textWithLineBreaks;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
  };
  

  useEffect(() => {
    setCurrentMessage(generateMessage(formData) as unknown as Message);
  }, [formData]);

  return (
    <section
      id="Generator"
      className="xl:w-[40%] md:w-[60%] w-[95%] m-auto mt-8 text-white"
    >
      <h1 className="text-2xl font-bold mb-8">Response Generator</h1>
      <form className="m-auto flex flex-col w-fill gap-1 mb-10">
        <h3 className="text-lg">Message type</h3>

        <select
          className="bg-gray-900 text-slate-400 lg:p-1 p-3 mb-3"
          onChange={(event) =>
            handleInput(formData, "messageType", setFormData, event)
          }
        >
          <option value="Greeting - Local">Greeting - Local</option>
          <option value="Greeting - Remote">Greeting - Remote</option>
          <option value="Delivered - Local">Delivered - Local</option>
          <option value="Greeting - Local">Delivered - Remote</option>
        </select>

        <h3 className="text-lg">Urgency</h3>

        <select
          className="bg-gray-900 text-slate-400 lg:p-1 p-3 mb-3"
          onChange={(event) =>
            handleInput(formData, "urgency", setFormData, event)
          }
        >
          <option value="one week">Low</option>
          <option value="three business days">Medium</option>
          <option value="one business day">High</option>
        </select>

        <h3 className="text-lg">Requester name</h3>
        <input
          className="bg-gray-900 text-slate-400 lg:p-1 p-3 mb-3"
          name="userName"
          type="text"
          value={formData?.userName}
          onChange={(event) =>
            handleInput(formData, "userName", setFormData, event)
          }
        ></input>
        <h3 className="text-lg">Equipment</h3>

        <input
          className="bg-gray-900 text-slate-400 lg:p-1 p-3 mb-3"
          name="equipment"
          type="text"
          value={formData?.equipment}
          onChange={(event) =>
            handleInput(formData, "equipment", setFormData, event)
          }
        ></input>
        {formData.messageType === "Delivered - Remote" && (
          <>
            <h3 className="text-lg">Tracking Number</h3>
            <input
              className="bg-gray-900 text-slate-400 lg:p-1 p-3 mb-3"
              name="trackingNo"
              type="text"
              value={formData?.trackingNo}
              onChange={(event) =>
                handleInput(formData, "trackingNo", setFormData, event)
              }
            ></input>
          </>
        )}
        <h3 className="text-lg">Location</h3>

        <input
          className="bg-gray-900 text-slate-400 lg:p-1 p-3 mb-3"
          name="location"
          type="text"
          value={formData?.location}
          onChange={(event) =>
            handleInput(formData, "location", setFormData, event)
          }
        ></input>

        <h3 className="text-lg">Signature</h3>

        <input
          className="bg-gray-900 text-slate-400 lg:p-1 p-3 mb-3"
          name="location"
          type="text"
          value={formData?.signature}
          onChange={(event) =>
            handleInput(formData, "signature", setFormData, event)
          }
        ></input>
      </form>

      <h2 className="mb-4 text-xl">Message:</h2>
      <p id="responseMessage" className="p-2 bg-gray-800 text-white">
        {currentMessage?.greeting && (
          <span>
            {`${currentMessage?.greeting}`} <br />
            <br />
          </span>
        )}
        {currentMessage?.intro && (
          <span>
            {`${currentMessage?.intro}`} <br />
            <br />
          </span>
        )}
        {currentMessage?.body && (
          <span>
            {`${currentMessage?.body}`} <br />
            <br />
          </span>
        )}
        {currentMessage?.tracking && (
          <span>
            {`${currentMessage?.tracking}`} <br />
            <br />
          </span>
        )}
        {currentMessage?.signoff && (
          <span>
            {`${currentMessage?.signoff}`} <br />
          </span>
        )}
        {currentMessage?.signature && (
          <span>{`${currentMessage?.signature}`}</span>
        )}
        <button
          className="fixed left-[90%] md:left-[77.5%] xl:left-[68.5%]"
          onClick={() => copyToClipboard()}
        >
          <img
            className="max-w-10 bg-slate-400 p-1 rounded-md"
            src={copyButton}
          />
        </button>
      </p>
    </section>
  );
};
