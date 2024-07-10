import Login from "./Login";
import LoadingSpinner from './LoadingSpinner';
import { useStoreState, useStoreActions } from "easy-peasy";
import MainPage from "./MainPage";



export default function Wrapper() {

    const showMainPage = useStoreState(state => state.showMainPage)
    const showLoading = useStoreState(state => state.showLoading);
    const setShowLoading = useStoreActions(action => action.setShowLoading)

    return (
        <>
           {showMainPage ? <MainPage /> : <Login />}
        </>
    )
}