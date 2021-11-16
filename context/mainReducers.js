import { MainState } from "./MainContext";

const MainAction = {
    type: 'getTodos', payload:'',
    type: 'getFotos', payload:''
};

export const mainReducer = (state, action)=>{

switch (action.type) {
    case 'getTodos':
            return{
                ...state,
                todos: [...action.payload]
            }
    case 'getFotos':
    return{
        ...state,
        fotos: [...action.payload]
    }
    default:
        return state;
}    
}