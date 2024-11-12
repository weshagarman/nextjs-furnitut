type InputFieldProps = {
    type: string;
    name: string;
    label?: string;
    pattern?: string;
    required?: boolean;
    value?: string;
};

export const InputField: React.FC<InputFieldProps> = ({ type, name, label, pattern, required = true, value }) => (
    <div className="relative z-0 w-full flex flex-col  group focus-within:bg-soft/30">
        <label htmlFor={name} className="px-6 text-xs pt-4 group-focus-within:text-dark text-dark/50 font-medium">
            {label}
        </label>
        <input
            type={type}
            name={name}
            id={name}
            pattern={pattern}
            placeholder=""
            className="bg-transparent pb-4 outline-none px-6 font-bold text-dark"
            required={required}
            value={value}
        />
    </div>
);
