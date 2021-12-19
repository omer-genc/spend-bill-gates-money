import { createSlice } from "@reduxjs/toolkit";


export const walletSlice = createSlice({
    name: 'wallet',
    initialState: {
        balance: 100000000000,
        cart: []
    },
    reducers: {
        handleCart: (state, action) => {
            const { item, quantity } = action.payload;
            const productIndex = state.cart.findIndex(product => product.id === item.id);

            let whatWillDo = "";
            const activeQuantity = productIndex === -1 ? 0 : state.cart[productIndex].quantity;

            if (productIndex === -1)
                whatWillDo = "add";
            else if (quantity === 0)
                whatWillDo = "remove";
            else
                whatWillDo = "update";

            switch (whatWillDo) {
                case "add":
                    state.cart.push({ ...item, quantity });
                    state.balance -= item.price * quantity;
                    break;
                case "remove":
                    state.cart.splice(productIndex, 1);
                    state.balance += item.price * activeQuantity;
                    break;
                case "update":
                    state.cart[productIndex].quantity = quantity;
                    state.balance += item.price * (activeQuantity - quantity);
                    break;
                default:
                    break;
            }
        },

    }
});
// selectors
export const cartSelector = state => state.wallet.cart;
export const balanceSelector = state => state.wallet.balance;
// actions
export const { handleCart } = walletSlice.actions;
export default walletSlice.reducer;