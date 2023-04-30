import clsx from "clsx";
import { useTranslation } from "next-i18next";
import * as React from "react";

import UserAvatar from "./poll/participant-avatar";

interface NameInputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  value?: string;
  defaultValue?: string;
}

const NameInput: React.ForwardRefRenderFunction<
  HTMLInputElement,
  NameInputProps
> = ({ value, defaultValue, className, ...forwardProps }, ref) => {
  const { t } = useTranslation();
  const [avatarName, setAvatarName] = React.useState(
    value ?? defaultValue ?? "",
  );
  return (
    <div className="relative flex items-center">
      {value ? (
        <UserAvatar name={avatarName} className="absolute left-2" />
      ) : null}
      <input
        ref={ref}
        className={clsx(
          "input",
          {
            "pl-9": value || defaultValue,
          },
          className,
        )}
        placeholder={t("yourName")}
        value={value}
        {...forwardProps}
        onBlur={(e) => {
          setAvatarName(e.target.value);
          forwardProps?.onBlur?.(e);
        }}
      />
    </div>
  );
};

export default React.forwardRef(NameInput);
