import Login from "./Login";
import LoadingSpinner from './LoadingSpinner';
import { useStoreState, useStoreActions } from "easy-peasy";

export default function Wrapper() {

    const showLoading = useStoreState(state => state.showLoading);
    const setShowLoading = useStoreActions(action => action.setShowLoading)

    return (
        <>
              {/* {showLoading && <LoadingSpinner /> } */}
              {showLoading && <Login />}
        </>
    )
}