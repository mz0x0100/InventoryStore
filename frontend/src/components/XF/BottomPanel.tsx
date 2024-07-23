import { Text } from "../Text";

interface Props {
  tState: string;
}
const BottomPanel: React.FC<Props> = ({ tState }) => {
  return (
    <div className="fixed bottom-0 bg-secondary w-full h-[20px]">
      <div className="w-[170px] bg-primary border-br-2 rounded-br-3xl">
        <Text className="text-sm text-white font-weight-500 ml-2">
          {tState}
        </Text>
      </div>
    </div>
  );
};

export default BottomPanel;
