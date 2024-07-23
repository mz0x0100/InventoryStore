interface Props {
  feedbackText: string;
}

const Feedback = ({ feedbackText }: Props) => {
  return (
    <div>
      <small className="text-red-500 text-sm ml-2"> {feedbackText} </small>
    </div>
  );
};

export default Feedback;
