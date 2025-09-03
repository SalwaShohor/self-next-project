import { cn } from "@/lib/utils";
import { useId } from "react";
import { ChevronDown } from "lucide-react";

type SelectGroupProps = {
  className?: string;
  label: string;
  name?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  required?: boolean;
  disabled?: boolean;
  options: { label: string; value: string }[];
};

const SelectGroup: React.FC<SelectGroupProps> = ({
  className,
  label,
  name,
  value,
  onChange,
  required,
  disabled,
  options,
}) => {
  const id = useId();

  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="text-body-sm font-medium text-dark dark:text-white"
      >
        {label}
        {required && <span className="ml-1 select-none text-red">*</span>}
      </label>

      <div className="relative mt-3">
        <select
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          className={cn(
            "w-full appearance-none rounded-lg border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary",
          )}
        >
          {options.map((opt) => (
            <option
              key={opt.value}
              value={opt.value}
              className="text-dark dark:text-white"
            >
              {opt.label}
            </option>
          ))}
        </select>

        {/* Custom arrow */}
        <ChevronDown
          size={20}
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-300"
        />
      </div>
    </div>
  );
};

export default SelectGroup;
