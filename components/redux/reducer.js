const initialState = {
    cartItems: [],
}

const indexSameProduct = (state, action) => {
    const sameProduct = (item) => (
        item.id === action.id
    );

    return state.cartItems.findIndex(sameProduct)
};

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_PRODUCT':

            // find index of product
            const index = indexSameProduct(state, action);

            if (index !== -1) {
                state.cartItems[index].count += action.count;

                return {
                    ...state,
                    cartItems: state.cartItems
                };
            }

            return {
                ...state,
                cartItems: [...state.cartItems,
                {
                    id: action.id,
                    name: action.name,
                    price: action.price,
                    count: action.count,
                    variant:action.variant,
                    image:action.image
                }
                ]
            };

        case 'REMOVE_PRODUCT':

            // find index of product
            state.cartItems.splice(indexSameProduct(state, action), 1);

            return {
                ...state,
                cartItems: state.cartItems
            };

        case 'SET_COUNT':

            // find index and add new count on product count
            const indexItem = indexSameProduct(state, action);
            state.cartItems[indexItem].count = action.count;

            return {
                ...state,
                cartItems: state.cartItems
            };

        default:
            return state;
    }
}

export default cartReducer;