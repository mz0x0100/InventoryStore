import { useState } from "react";
import { TextMuted } from "../../components/Text";
import StaffsData, { StaffType } from "./StaffsData";

const Mailer: React.FC = () => {
  const [showStaffs, setShowStaffs] = useState(false);
  const [selectedStaffs, setSelectedStaffs] = useState<StaffType[]>([]);
  const [text, setText] = useState("0 selected");

  const handleOnSelect = (staffs: StaffType[]) => {
    setSelectedStaffs(staffs);
    setShowStaffs(false);
    setText(`${staffs.length} staffs selected`);
  };

  const classes =
    "p-2 w-full mb-2 border-[1px] outline-none border-gray-600 focus:border-primary";
  return (
    <div className="p-2">
      {showStaffs ? (
        <>
          <i
            className="fa fa-arrow-left text-xl mb-4 text-gray-500 font-weight-700 cursor-pointer p-4 hover:bg-gray-100"
            onClick={() => setShowStaffs(false)}
          />
          <StaffsData
            selectable
            initialSelection={selectedStaffs}
            setSelectedStaffs={handleOnSelect}
          />
        </>
      ) : (
        <>
          <div className="flex mb-2">
            <TextMuted>Recipients:</TextMuted>
            <TextMuted className="ml-2">{text}</TextMuted>
            <i
              className="fa fa-edit text-lg ml-2 cursor-pointer text-gray-600 hover:opacity-80"
              onClick={() => setShowStaffs(true)}
            ></i>
          </div>

          <input className={classes} type="text" placeholder="Subject" />
          <textarea
            cols={1}
            rows={4}
            className={classes}
            placeholder="Message"
          ></textarea>
          <button className="w-full p-2 bg-primary text-white hover:opacity-80">
            Send <i className="fa fa-send"></i>
          </button>
        </>
      )}
    </div>
  );
};

export default Mailer;
