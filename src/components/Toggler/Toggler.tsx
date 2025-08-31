import {
  type ChangeEvent,
  type FC,
  type InputHTMLAttributes,
  useState,
} from 'react';
import s from './Toggler.module.scss';

type TogglerProperties = {
  label: string;
} & InputHTMLAttributes<HTMLInputElement>;

export const Toggler: FC<TogglerProperties> = ({
  name,
  label,
  onInput,
  ...rest
}: TogglerProperties) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setIsChecked(!isChecked);
    if (onInput) {
      onInput(event);
    }
  };

  return (
    <label className={s.toggler}>
      <input
        name={name}
        type="checkbox"
        checked={isChecked}
        onChange={handleChange}
        className={s.input}
        {...rest}
      />
      <div className={s.state}>
        <div className={s.control}>
          <div className={s.switch}></div>
        </div>
        <span className={s.title}>{label}</span>
      </div>
    </label>
  );
};
