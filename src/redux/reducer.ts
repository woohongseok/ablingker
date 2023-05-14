import { Provider, useSelector, useDispatch} from "react-redux";

export default function reducer (currentState: any = {}, action:any) {
    if (currentState === undefined ) {
        return null;
    }
    switch(action.type){
        case "clear":
            return null;
        case "add":
            return{
                ...currentState,
                Pos:action.data.Pos
            };
    }
    const newState = {...currentState};
    return newState;
}