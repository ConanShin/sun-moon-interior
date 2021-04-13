const persistStore = {
    state: {
        coverHidden: false
    },
    mutations: {
        coverHidden: (state: any, payload: boolean) => state.coverHidden = payload,
    },
    getters: {
        coverHidden: (state: any) => state.coverHidden
    }
}

export default persistStore