import { Product } from "../../types/product.types";
import classNames from "classnames/bind";
import styles from "./ProductSelectCards.module.scss";
import { ProductSelection } from "../../types/plan.types";
import { useState } from "react";
import { promises } from "dns";
import { Unit } from "../../types/unit.types";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { MenuItem, TextField } from "@mui/material";
import { useForm } from "react-hook-form";

const cx = classNames.bind(styles);

interface ProductSelectCardsProps {
  products: Product[];
  units: Unit[];
  addedProcuts: ProductSelection[];
  onAddProduct: (product: ProductSelection) => void;
}

interface FormData {
  unit: string;
  count: string;
}

const ProductSelectCards: React.FC<ProductSelectCardsProps> = (
  props: ProductSelectCardsProps
) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    if(selectedProductId !== null) {
      props.onAddProduct({
        unitId: parseInt(data.unit),
        count: parseInt(data.count),
        productId: selectedProductId
      })
    }
  }

  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null
  );

  const selectProduct = (product: Product) => {
    const addedProduct = props.addedProcuts.find(
      (x) => x.productId === product.id
    );

    if(addedProduct) {
      setValue("unit", addedProduct.unitId.toString());
      setValue("count", addedProduct.count.toString());
    } else {
      setValue("unit", "");
      setValue("count", "")
    }
    setSelectedProductId(product.id);
  };

  const getSortedProducts = (): Product[] => {
    return props.products.sort((productA, productB) => {
      const AInAddedProducts = !!props.addedProcuts.find(
        (x) => x.productId === productA.id
      );
      const BInAddedProducts = !!props.addedProcuts.find(
        (x) => x.productId === productB.id
      );

      if (AInAddedProducts && BInAddedProducts) return 0;
      if (AInAddedProducts && !BInAddedProducts) return -1;
      if (!AInAddedProducts && BInAddedProducts) return 1;
      return 0;
    });
  };

  const renderProduct = (product: Product) => {
    const addedProduct = props.addedProcuts.find(
      (x) => x.productId === product.id
    );
    const isSelected = product.id === selectedProductId;

    const classes = cx({
      card: !isSelected,
      "card-selected": isSelected,
      "card-product-added": addedProduct !== undefined,
      "card-item-container": true,
    });

    if (isSelected) {
      return (
        <div key={product.id} className={classes}>
          <div className={cx("card-item")}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className={cx("card-name")}>{product.name}</div>
              <div className={cx("card-count")}>
                Count:
                <input type="number" {...register("count", { required: true})} />
              </div>
              <div className={cx("card-unit")}>
                Unit:
                <select {...register("unit", {required: true})}>
                  {
                    props.units.map((unit) => <option key={unit.id} value={unit.id}>{unit.measurement}</option>)
                  }
                </select>
              </div>
              <div className={cx("card-controls")}>
                <button type="submit">Save</button>
              </div>
            </form>
          </div>
        </div>
      );
    } else {
      return (
        <div
          key={product.id}
          className={classes}
          onClick={() => selectProduct(product)}
        >
          {product.name} {addedProduct?.count}
        </div>
      );
    }
  };

  return (
    <div className={cx("cards-container")}>
      {getSortedProducts().map((product) => renderProduct(product))}
    </div>
  );
};

export default ProductSelectCards;
