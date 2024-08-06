import { create } from 'zustand'

const useStore = create<any>()((set) => ({
    user: {
        name: 'Kwadwo',
        age: 22
    },
    cart: [],
    addToCart: (item: any) => set((state: any) => {
        const existingItem = state.cart.find((cartItem: any) => cartItem.id === item.id);
        if (existingItem) {
            return {
                cart: state.cart.map((cartItem: any) =>
                    cartItem.id === item.id
                        ? { ...cartItem, quantity: cartItem.quantity + 1 }
                        : cartItem
                )
            };
        } else {
            return {
                cart: [...state.cart, { ...item, quantity: 1 }]
            };
        }
    }),
    removeFromCart: (itemId: any) => set((state: any) => ({
        cart: state.cart.filter((cartItem: any) => cartItem.id !== itemId)
    })),
    clearCart: () => set({ cart: [] }),
    updateUser: (user: any) => set({ user })
}))





export default useStore