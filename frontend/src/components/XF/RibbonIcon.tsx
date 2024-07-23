interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {}

const RibbonIcon: React.FC<ButtonProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <button
      className={`fa ${className} text-sm text-[#eee] cursor-pointer p-2`}
      {...props}
    >
      &nbsp;{children}
    </button>
  );
};

export default RibbonIcon;
