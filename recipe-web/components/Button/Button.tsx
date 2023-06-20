import {ReactElement} from "react";
import classNames from 'classnames/bind';
import styles from './Button.module.scss';

const cx = classNames.bind(styles);

interface ButtonProps {
  type?: 'submit' | 'reset' | 'button' | undefined;
  onClick?: () => void;
  children: ReactElement | string;
}

const Button = ({ type = 'button', onClick, children }: ButtonProps): ReactElement => {
  return (<button className={cx('body')} type={type} onClick={onClick}>{children}</button>);
}

export default Button;
