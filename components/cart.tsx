import { Cart, CartItem } from '@/use-cases/contracts/cart';
import { Price } from './price';

export const CartViewer = ({ cart }: { cart: Cart | null }) => {
    return (
        <>
            {cart && cart.items.length === 0 && <p>Your cart is empty.</p>}
            {cart && cart.items.length > 0 && (
                <ul>
                    {cart.items.map((item: CartItem) => (
                        <li key={`${item.variant.sku}`} className="flex mb-4 justify-between ">
                            <div className="flex w-full">
                                <div className="shrink-0 relative h-24 w-20 aspect-square border border-muted rounded overflow-hidden">
                                    <img
                                        src={item.images[0].url}
                                        alt={item.name}
                                        className="h-full w-full object-cover"
                                        key={`image-${item.variant.sku}`}
                                    />
                                </div>
                                <div className="flex flex-col pl-4 text-dark w-full justify-between">
                                    <div className="flex flex-col">
                                        <span className="text-lg font-bold">{item.name}</span>
                                        <span className="text-sm italic text-dark/70">{item.variant.sku}</span>
                                    </div>
                                    <div className="flex justify-between w-full ">
                                        <div className="flex gap-4">
                                            <button type="button">-</button>
                                            <span>{item.quantity}</span>
                                            <button type="button">+</button>
                                        </div>

                                        <span className="font-bold">
                                            <Price price={{ price: item.price.gross }} />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
};
