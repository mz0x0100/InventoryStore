import { PropsWithChildren } from "react"

const Row = ({ children }: PropsWithChildren) => {
  return (
    <div className="row">
        { children }
    </div>
  );
}

export default Row;