import {ReactElement} from "react";
import classNames from 'classnames/bind';
import styles from './Card.module.scss';

const cx = classNames.bind(styles);

interface CardProps {
  title: string;
  description: string;
  pictureUrl: string;
}

const Card = (props: CardProps): ReactElement => {
  const { title, description, pictureUrl } = props;

  return (
      <div className={cx('body')}>
        <img className={cx('picture')} src={pictureUrl} alt="Recipe" />
        <div className={cx('title')}>{title}</div>
        <div className={cx('description')}>{description}</div>
      </div>);
}

export default Card;