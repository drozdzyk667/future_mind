type FeedbackProps = { text: string };

export const Feedback = ({ text }: FeedbackProps) => {
  return <p className="text-center mt-10">{text}</p>;
};
