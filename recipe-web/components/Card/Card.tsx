import {ReactElement} from "react";
import classNames from 'classnames/bind';
import styles from './Card.module.scss';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from "../Button/Button";

const cx = classNames.bind(styles);

interface CardProps {
  title: string;
  description: string;
  pictureUrl: string;
  deleteRecipe: (id: number) => void;
  id: number;
}

const Card = (props: CardProps): ReactElement => {
  const { title, description, pictureUrl, deleteRecipe, id } = props;

  return (
      <div className={cx('body')}>
        <img className={cx('picture')} src={pictureUrl} alt="Recipe" />
        <div className={cx('title')}>{title}</div>
        <div className={cx('description')}>{description}</div>
        <Button onClick={() => deleteRecipe(id)}><DeleteIcon/></Button>
      </div>);
}

export default Card;