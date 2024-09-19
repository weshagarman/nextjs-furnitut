interface Price {
  price: number;
  currency: string;
}

export const Price = ({ price }: { price: Price }) => {
  const formatter = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: price.currency,
  });

  return <>{formatter.format(price.price)}</>;
};
