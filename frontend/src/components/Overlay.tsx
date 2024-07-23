const Overlay = ({ className, ...props }: React.HTMLProps<HTMLDivElement>) => {
  let cClassName = `${className} my-overlay fixed p-[0] m-[0] w-full h-full top-[0] left-[0]`;
  return <div className={cClassName}>{props.children}</div>;
};

export default Overlay;
