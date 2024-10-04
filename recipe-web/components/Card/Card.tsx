import {ReactElement} from "react";
import classNames from 'classnames/bind';
import styles from './Card.module.scss';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from "../Button/Button";
import Link from "next/link";

const cx = classNames.bind(styles);

interface CardProps {
  title: string;
  description: string;
  pictureUrl: string;
  deleteRecipe: (id: number) => void;
  id: number;
}

const   Card = (props: CardProps): ReactElement => {
  const { title, description, pictureUrl, deleteRecipe, id } = props;

  return (
      <div className={cx('body')}>
        <Link href={"/recipes/" + id}><div className={cx('image')}>
          <img className={cx('picture')} src={pictureUrl} alt="Recipe" />
        </div>
        <div className={cx('title')}>{title}</div></Link>
        <div className={cx('description')}>{description}</div>
        <div className={cx('controls')}>
          <Button onClick={() => deleteRecipe(id)}><DeleteIcon/></Button>
        </div>
      </div>);
}

export default Card;