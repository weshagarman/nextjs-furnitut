import { getSession } from '@/core/auth.server';
import LoginForm from '@/components/login-form';
import { createOrderFetcher } from '@crystallize/js-api-client';
import { crystallizeClient } from '@/core/crystallize-client.server';

export default async function OrdersPage({ searchParams }: { searchParams: { error?: string } }) {
    const session = await getSession();
    let orders;
    if (session) {
        orders = await createOrderFetcher(crystallizeClient).byCustomerIdentifier(session.user.email);
    }
    if (!session) {
        return (
            <main className="page">
                <LoginForm error={searchParams.error} />
            </main>
        );
    }

    return (
        <main className="page">
            <h1 className="text-2xl font-bold mb-4">Your Orders</h1>
            <div>
                <p>Welcome, {session.user.email}</p>
                <div>
                    {orders &&
                        orders.orders.map((order: any) => (
                            <div key={order.id} className="border-2 border-grey my-5">
                                <div className="w-full h-30 bg-[#F0F2F2] px-5 py-2 flex flex-wrap justify-between items-center">
                                    <div className="order-item">
                                        <span>Order placed</span>
                                        <p className="text-grey6">{order.createdAt}</p>
                                    </div>
                                    <div className="order-item">
                                        <span>Order ID</span>
                                        <p className="text-grey6">{order.id}</p>
                                    </div>
                                </div>
                                <div className="p-5 flex flex-col gap-5">
                                    {order.cart.map((item: any, index: number) => (
                                        <div key={index} className="flex justify-between items-center order-item">
                                            <div className="flex gap-3 items-center">
                                                <img src={item.imageUrl} width="40px" height="40px" alt="product" />
                                                <p className="w-40">{item.name}</p>
                                            </div>
                                            <p className="w-20">{item.quantity}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </main>
    );
}
