import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import classNames from "classnames/bind";
import styles from "./Products.module.scss";
import { fetchProducts } from '../../api/products.service';
import { Product } from '../../types/product.types';
import { Button } from '@mui/material';

const cx = classNames.bind(styles);

export const getServerSideProps: GetServerSideProps<{
    products: Product[]
}> = async () =>  {
  const products = await fetchProducts();
  return {
    props: {
        products
    }
  }
}

const Products: NextPage<{products: Product[]}> = (props) => {
  const { products } = props;


  console.log(products);
  const renderContent = () => {
    return <div>
        {
            products.map((product) => <div key={product.id}>{product.name}</div>)
        }
    </div>
  }

  return (
    <div>
      <Head>
        <title>Products</title>
      </Head>

      <main className={cx('body')}>
        <h1 className={cx('heading')}>
          Products
        </h1>

        {renderContent()}
        <Button>+</Button>
      </main>
    </div>
  )
}
 
export default Products
