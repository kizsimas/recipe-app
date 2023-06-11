import {ReactElement} from "react";
import Link from "next/link";
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import {useRouter} from "next/router";

const cx = classNames.bind(styles);

const Header = (): ReactElement => {
  const { pathname } = useRouter();

  const renderLink = (path: string, title: string) => {
    return (
        <div className={cx('link', { 'active': pathname === path})}><Link href={path}>{title}</Link></div>
    );
  }

  return (<div className={cx('header')}>
    <div className={cx('link', 'logo')}>
      <Link href="/">CoolRecipeApp</Link>
    </div>
    <div className={cx('menu-items')}>
      {renderLink('/', 'Home')}
      {renderLink('/recipes', 'Recipes')}
    </div>
  </div>);
}

export default Header;
