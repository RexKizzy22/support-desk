import { ChangeEvent } from "react"

type Change = ChangeEvent<HTMLInputElement>;

const Input = ({
  type,
  onChange,
  title,
  value,
}: {
  type: string;
  onChange: (event: Change) => void;
  title: string;
  value: string;
}) => {
  return (
    <div className="form-group">
      <input
        type={type}
        className="form-control"
        id={title}
        name={title}
        value={value}
        onChange={onChange}
        placeholder={
          title === "confirmPassword"
            ? "Enter your password again"
            : `Enter your ${title}`
        }
        required
      />
    </div>
  );
};

export default Input;
