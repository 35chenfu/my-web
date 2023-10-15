
import userInfoStore from './modules/userInfo';

const useStore = () => {
    return {
        userInfoStore: userInfoStore(),
    };
};

export default useStore;
