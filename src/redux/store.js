import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage";
import orderReducer from "./order/order-reducer";
import productsReducer from './products/products-reducer';

const middleware = [
    ...getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }),
    logger,
];

// Saving items to Local Storage
const itemsPersistConfigProducts = {
    key: 'products',
    storage,
    blacklist: ['filter'],
}

const itemsPersistConfigOrder = {
    key: 'orders',
    storage,
    blacklist: ['filter'],
}

// Configuring store
const store = configureStore({
    reducer: {
        products: persistReducer(itemsPersistConfigProducts, productsReducer),
        orders: persistReducer(itemsPersistConfigOrder, orderReducer),
    },
    middleware,
    // devTools: process.env.NODE_ENV ==='development',
})

const persistor = persistStore(store);

export default {store, persistor};