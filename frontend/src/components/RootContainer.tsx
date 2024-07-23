import { PropsWithChildren } from "react"

const RootContainer = ({ children }: PropsWithChildren) => {
  return (
    <div className="m-[0] w-full h-full top-[0] left-[0]">
        { children }
    </div>
  );
}

export default RootContainer;