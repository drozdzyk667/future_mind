export const ErrorMessage = ({
  message,
  id,
}: {
  message: string;
  id?: string;
}) => {
  return (
    <div aria-live="assertive">
      <p id={id} className="text-red-500 text-sm mt-1">
        {message}
      </p>
    </div>
  );
};
