import { IconType } from "react-icons";

type IconInputProps = {
  Icon: IconType;
} & React.InputHTMLAttributes<HTMLInputElement>;

export function IconInput({ Icon, ...props }: IconInputProps) {
  return (
    <div
      className="
        group flex items-center gap-2
        h-10 w-full
        rounded-md bg-gray-100 px-3
        border border-transparent
        focus-within:border-blue-500
        focus-within:ring-1 focus-within:ring-blue-500
      "
    >
      <Icon className="text-gray-400 group-focus-within:text-blue-500" />
      <input
        className="w-full bg-transparent text-sm outline-none"
        {...props}
      />
    </div>
  );
}
