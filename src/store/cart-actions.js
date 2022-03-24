import { cartActions } from './cart-slice';
import { uiActions } from './ui-slice';

export const sendCartData = (cart) => {
    return async (dispatch) => {

        dispatch(uiActions.setNotification({
            status: 'pending',
            title: 'Sending...',
            message: 'Sending cart data'
        }))

        const sendRequest = async () => {
            const response = await fetch('https://react-http-33401-default-rtdb.firebaseio.com/cart.json', {
                method: 'PUT',
                body: JSON.stringify(cart)
              })
        
            if(!response.ok){
            throw new Error("Error occurred while sending the request")
            }
        }

        try{
            await sendRequest()

            dispatch(uiActions.setNotification({
                status: 'success',
                title: 'Success!',
                message: 'Sent cart data succesfully'
            }))
        }
        catch (error){
            dispatch(uiActions.setNotification({
                status: 'error',
                title: 'Error!',
                message: 'Sending cart data failed'
              }))
        }

    }
}


export const fetchCartData = () => {
    return async (dispatch) => {
        const fetchData = async () => {
            const response = await fetch('https://react-http-33401-default-rtdb.firebaseio.com/cart.json')

            if(!response.ok){
                throw new Error('Could not fetch cart data')
            }

            const data = await response.json()
            return data

        }

        try{
            const cartData = await fetchData()
            dispatch(cartActions.replaceCart(cartData))
        }
        catch (error){
            dispatch(uiActions.setNotification({
                status: 'error',
                title: 'Error!',
                message: 'Fetching cart data failed'
              }))
        }
    }
}