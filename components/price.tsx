interface Price {
    price: number;
    currency?: string;
}

export const Price = ({ price }: { price: Price }) => {
    if (!price) return null;
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: price?.currency || 'EUR',
    });
    return <>{formatter.format(price.price)}</>;
};
