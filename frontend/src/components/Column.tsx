import { PropsWithChildren } from "react"

const Column = ({ children }: PropsWithChildren) => {
  return (
    <div className="col">
        { children }
    </div>
  );
}

export default Column;