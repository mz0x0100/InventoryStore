import { HTMLProps } from "react";
import { Text } from "../Text";
import { Link } from "react-router-dom";

export type DashboardItemsType = {
  text: string;
  iconclass: string;
  linkTo: string;
  hrBreak?: boolean;
};

interface DashboardItemsProps {
  dashItems: DashboardItemsType[];
  active?: string;
}

const DashboardItems: React.FC<DashboardItemsProps> = ({
  dashItems,
  active,
}) => {
  const activeStyle = "bg-primary text-white";

  return (
    <>
      {dashItems.map((item, key) => (
        <div key={key}>
          {item.hrBreak && (
            <div className="w-full border-b-2 border-gray-300 my-4"></div>
          )}
          <DashboardItem
            text={item.text}
            linkTo={item.linkTo}
            iconclass={item.iconclass}
            className={
              item.text.toLowerCase() == active?.toLowerCase()
                ? activeStyle
                : ""
            }
          />
        </div>
      ))}
    </>
  );
};

interface DashboardItemProps extends HTMLProps<HTMLDivElement> {
  text: string;
  linkTo: string;
  iconclass?: string;
}

const DashboardItem: React.FC<DashboardItemProps> = ({
  text,
  linkTo,
  className,
  iconclass,
  ...props
}) => {
  return (
    <Link to={linkTo}>
      <div
        className={`flex ${className} mt-2 px-4 py-2 md:px-8 md:py-4 cursor-pointer text-gray-900 hover:bg-primary hover:text-white`}
        {...props}
      >
        <i className={`fa ${iconclass} text-xl font-weight-300 font-medium`}>
          <Text className="inline ml-4 text-lg font-weight-300 font-medium">
            {text}
          </Text>
        </i>
      </div>
    </Link>
  );
};

export default DashboardItems;
