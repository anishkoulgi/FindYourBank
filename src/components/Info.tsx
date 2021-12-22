import React from "react";

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  label: string;
  text: string;
}

const Info: React.FC<Props> = ({
  label,
  text,
  children,
  className,
  ...rest
}) => {
  return (
    <div className={`mt-6 ${className}`} {...rest}>
      <p className="text-sm font-bold text-primary">{label}</p>
      <p className=" text-gray-700">{text}</p>
    </div>
  );
};

export default Info;
