import {createSlice} from '@reduxjs/toolkit';
const cartSlice=createSlice({name:'cart',initialState:{items:[]},reducers:{
addToCart(state,action){const p=action.payload;const item=state.items.find(x=>x.id===p.id);if(item)item.quantity+=1;else state.items.push({...p,quantity:1});},
increaseQuantity(state,action){const item=state.items.find(x=>x.id===action.payload);if(item)item.quantity+=1;},
decreaseQuantity(state,action){const item=state.items.find(x=>x.id===action.payload);if(!item)return;if(item.quantity>1)item.quantity-=1;else state.items=state.items.filter(x=>x.id!==action.payload);},
removeFromCart(state,action){state.items=state.items.filter(x=>x.id!==action.payload);},clearCart(state){state.items=[];}
}});
export const {addToCart,increaseQuantity,decreaseQuantity,removeFromCart,clearCart}=cartSlice.actions;
export const selectCartItems=s=>s.cart.items;
export const selectCartCount=s=>s.cart.items.reduce((n,x)=>n+x.quantity,0);
export const selectCartTotal=s=>s.cart.items.reduce((n,x)=>n+x.price*x.quantity,0);
export default cartSlice.reducer;