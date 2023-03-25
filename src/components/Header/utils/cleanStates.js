export default function cleanStates({
    setSentLogin,
    setPosts,
    setUpdatedPosts,
    setPostsToUpdate,
    setMustUpdatePosts,
    setSendPost,
    setGotPosts,
    setMyUser,
    setUserSelected
}) {
    if(!!setSentLogin) setSentLogin(false)
    if(!!setPosts) setPosts([])
    if(!!setUpdatedPosts) setUpdatedPosts([])
    if(!!setPostsToUpdate) setPostsToUpdate(0)
    if(!!setMustUpdatePosts) setMustUpdatePosts(false)
    if(!!setSendPost) setSendPost(false)
    if(!!setGotPosts) setGotPosts(false)
    if(!!setMyUser) setMyUser(false)
    if(!!setUserSelected) setUserSelected(null)
}