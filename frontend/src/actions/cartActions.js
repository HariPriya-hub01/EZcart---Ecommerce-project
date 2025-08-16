import { addCartItemRequest, addCartItemSuccess } from '../slices/cartSlice';
import axios from 'axios'
import { toast } from 'react-toastify';
export const addCartItem = (productId, quantity, userId) => async (dispatch) => {
    try {
        dispatch(addCartItemRequest())
        const { data } = await axios.get(`/api/v1/product/${productId}`)

        const formData = new FormData();
        formData.append("product", data.product._id);
        formData.append("name", data.product.name);
        formData.append("price", data.product.price);
        formData.append("image", data.product.images[0].image); // If this is a file, pass the file object instead of a URL
        formData.append("stock", data.product.stock);
        formData.append("quantity", quantity);

        const response = await axios.post(`/api/v1/addUserCart/${userId}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })

        if (response.data.success) {
            toast("Cart Item Added!", {
                type: "success",
                position: toast.POSITION.BOTTOM_CENTER,
            });
        }

        //console.log(response.data);


        dispatch(addCartItemSuccess(response.data.cart))

    } catch (error) {

    }
}