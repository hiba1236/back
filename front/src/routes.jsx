
import { useRoutes } from "react-router-dom";
import ProductCardList from './components/productCardList';

export default function Routes() {
    const router = useRoutes([
        {
            path: "/",
            element: <ProductCardList />
        },
    ])
    return router;
}