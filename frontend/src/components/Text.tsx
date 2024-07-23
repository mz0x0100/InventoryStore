export const TextMuted = ({
  className,
  ...props
}: React.HTMLProps<HTMLParagraphElement>) => {
  const defaultClassName = "text-gray-700";
  const pClassName = `${defaultClassName} ${className} || ''`;
  return (
    <p className={pClassName} {...props}>
      {props.children}
    </p>
  );
};

export const TextBolded = ({
  className,
  ...props
}: React.HTMLProps<HTMLParagraphElement>) => {
  const myClassName = `${className} block ''`;

  return (
    <b className={myClassName} {...props}>
      {props.children}
    </b>
  );
};
export const TextBoldedIn = ({
  className,
  ...props
}: React.HTMLProps<HTMLParagraphElement>) => {
  const myClassName = `${className}`;

  return (
    <b className={myClassName} {...props}>
      {props.children}
    </b>
  );
};

export const Text = ({
  className,
  ...props
}: React.HTMLProps<HTMLParagraphElement>) => {
  const myClassName = `${className}`;

  return (
    <p className={myClassName} {...props}>
      {props.children}
    </p>
  );
};

interface FeedbackProps extends React.HTMLProps<HTMLParagraphElement> {
  category: "SUCCESS" | "ERROR" | "INFO";
}
export const FeedbackText = ({
  className,
  category,
  ...props
}: FeedbackProps) => {
  let categoryClass, iconClass;
  switch (category) {
    case "SUCCESS":
      categoryClass = "text-green-500";
      iconClass = "fa-check";
      break;
    case "ERROR":
      categoryClass = "text-red-500";
      iconClass = "fa-remove";
      break;
    default:
      categoryClass = "text-blue-400";
      break;
  }

  const myClassName = `${categoryClass} ${className} text-sm ml-2 || ''`;
  return (
    <p className={myClassName} {...props}>
      <i className={`fa ${iconClass} ${categoryClass} mr-2`}></i>
      {props.children}
    </p>
  );
};

export const AnchorText = ({
  className,
  ...props
}: React.HTMLProps<HTMLSpanElement>) => {
  const myClassName = `text-light-primary underline ${className}`;

  return (
    <span className={myClassName} {...props}>
      {props.children}
    </span>
  );
};
