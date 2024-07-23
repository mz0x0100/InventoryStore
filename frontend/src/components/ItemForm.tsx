import React, { FC, useState, useEffect } from "react";
import { isIn } from "../utils/utils";
import Select from "./form/Select";

interface ItemFormProps<T> {
  item?: T;
  action: "add" | "update";
  onSave: (item: T, action: "add" | "update") => void;
  onCancel: () => void;
  fields: {
    label: string;
    name: keyof T;
    type: string;
    options?: { value: string | number; label: string }[];
  }[];
}

const ItemForm: FC<ItemFormProps<any>> = ({
  item,
  action,
  onSave,
  onCancel,
  fields,
}) => {
  const [formData, setFormData] = useState<any>(item || {});

  useEffect(() => {
    if (item) {
      setFormData(item);
    }
  }, [item]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData, action);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {fields.map(({ label, name, type, options }) => {
          return type === "select" ? (
            <SelectInput
              key={name.toString()}
              label={label}
              name={name.toString()}
              value={formData[name] || ""}
              options={options}
              onChange={handleChange}
              required
            />
          ) : (
            <TextInput
              key={name.toString()}
              label={label}
              type={type}
              name={name.toString()}
              value={formData[name] || ""}
              onChange={handleChange}
              required
            />
          );
        })}
      </div>
      <div className="mt-4 flex justify-end">
        <button
          type="button"
          onClick={onCancel}
          className="mr-2 bg-gray-500 text-white px-4 py-2 rounded"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Save
        </button>
      </div>
    </form>
  );
};

interface TextInputProps {
  label: string;
  type: string;
  name: string;
  value: string | number | undefined;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  required?: boolean;
}

const TextInput: React.FC<TextInputProps> = ({
  className,
  label,
  ...props
}) => {
  useEffect(() => {
    const handleEvents = (e: MouseEvent | KeyboardEvent) => {
      document.querySelectorAll(".input-item").forEach((item) => {
        if (
          e.target === item ||
          isIn(e.target as EventTarget, item.childNodes)
        ) {
          item.classList.add("border-primary");
        } else {
          item.classList.remove("border-primary");
        }
      });
    };
    document.addEventListener("click", handleEvents);
    document.addEventListener("keyup", handleEvents);

    return () => {
      document.removeEventListener("click", handleEvents);
      document.removeEventListener("keyup", handleEvents);
    };
  }, []);

  return (
    <div className="input-item border-2 rounded-lg mt-2 w-full p-4">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        className={`${className} w-full border-b border-gray-400 mt-2 outline-none text-sm text-grey-700`}
        {...props}
      />
    </div>
  );
};

interface SelectInputProps {
  label: string;
  name: string;
  value: string | number | undefined;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  options?: { value: string | number; label: string }[];
  className?: string;
  required?: boolean;
}

const SelectInput: React.FC<SelectInputProps> = ({
  className,
  label,
  options,
  ...props
}) => {
  useEffect(() => {
    const handleEvents = (e: MouseEvent | KeyboardEvent) => {
      document.querySelectorAll(".input-item").forEach((item) => {
        if (
          e.target === item ||
          isIn(e.target as EventTarget, item.childNodes)
        ) {
          item.classList.add("border-primary");
        } else {
          item.classList.remove("border-primary");
        }
      });
    };
    document.addEventListener("click", handleEvents);
    document.addEventListener("keyup", handleEvents);

    return () => {
      document.removeEventListener("click", handleEvents);
      document.removeEventListener("keyup", handleEvents);
    };
  }, []);

  return (
    <div className="input-item border-2 rounded-lg mt-2 w-full p-4">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <Select
        className={`${className} w-full border-b border-gray-400 mt-2 outline-none text-sm text-grey-700`}
        {...props}
      >
        {options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
    </div>
  );
};

export default ItemForm;
