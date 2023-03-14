console.log(Redux);
console.log(ReduxThunk);
// const  action={
//     type:"WITHDROWN_MONY"
// }
const  WITHDROWN_MONY = "WITHDROWN_MONY";
const   DEPOSITE_MONY = "DEPOSITE_MONY";
const ADD_PRODUCT = "ADD_PRODUCT";
const GET_PRODUCT = "GET_PRODUCT";

const withdrow = (amount)=>{
 return{
    type:WITHDROWN_MONY,
    payload:amount
 }
}
 
const deposite = function (amount) {
    return{
         type:DEPOSITE_MONY,
         payload:amount
    }
}
const addproduct = function (product) {
    return{
         type:ADD_PRODUCT,
         payload:product
    }
}
const getproduct = function (product) {
    return{
         type:GET_PRODUCT,
         payload:product
    }
}
const fetchgetproduct = ()=>{
    return async(dispatch) =>
    {
        const res = fetch('https://fakestoreapi.com/products');
        const data =  (await res).json() ;
        console.log(data);
        dispatch(getproduct(data));

    }
   
}

const bankreducer = (state=1000,action)=> {
  switch(action.type){
    case WITHDROWN_MONY:
        return state-action.payload ;
    case DEPOSITE_MONY:
        return  state + action.payload ;    
    default:
        return state ;    
  }
}
const productreducer = (state =[], action) =>{
    switch (action.type) {
     case GET_PRODUCT:
        return [...state , action.payload]   
    case ADD_PRODUCT:
       return  [...state , action.payload] ;   
       default:
        return state;
    }
}
const appreducer = Redux.combineReducers({
    bank:bankreducer,
    products:productreducer,
})
const store = Redux.createStore(appreducer,Redux.applyMiddleware(ReduxThunk)); // single reducer 
// store.dispatch(withdrow(100));
// store.dispatch(withdrow(100));
let amountinput = document.querySelector("#amount")
// store.dispatch(deposite(100));
// store.dispatch(deposite(10));
// store.dispatch(addproduct({id:2,title:"product-1" }));
// store.dispatch(fetchgetproduct());
 console.log(store.getState());
 let amountvalue= document.querySelector("#value")
 amountvalue.innerHTML= store.getState().bank;
 document.querySelector("#withdraw").addEventListener('click',()=>{
  store.dispatch(withdrow(+amountinput.value));
 })
 document.querySelector("#deposite").addEventListener('click',()=>{
    store.dispatch(withdrow(+amountinput.value));
   })
store.subscribe( ()=>{
    console.log("CURANTSTAE",store.getState());
    amountvalue.innerHTML= store.getState().bank;
})