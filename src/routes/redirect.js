const redirect = (from, to) => ({
    path: `${from}`,
    exact: true,
    isRedirect: true,
    component: () => null,
    preload: async({redirect})=>{
        redirect(`${to}`)
    }
})

export default redirect