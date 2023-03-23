import { useContext, useEffect } from "react"
import useInterval from 'use-interval'
import Header from "../../components/Header"
import Loader from "../../components/Loader"
import PagePublishPost from "../../components/PublishPost/PagePublishPost"
import TrendingHashtags from "../../components/TrendingHashtags"
import UpdatePostsModal from "../../components/UpdatePostsModal"
import UserPost from "../../components/UserPost"
import { LoginContext } from "../../contexts/LoginProvider"
import { MobileSearchContext } from "../../contexts/MobileProvider"
import { PostsContext } from "../../contexts/PostsProvider"
import { UserContext } from "../../contexts/UserProvider"
import getPosts from "../../utils/getPosts"
import handleMyUser from "../../utils/handleMyUser"
import handlePosts from "../../utils/handlePosts"
import handleUpdatedPosts from "../../utils/handleUpdatedPosts"
import { NoPostText } from "../UserPage/styles"
import { HomeArea, PostsWrapper, Title } from "./styles"

export default function Home() {

    const {
        posts,
        updatedPosts,
        setUpdatedPosts,
        postsToUpdate,
        setPostsToUpdate,
        setPosts,
        gotPosts,
        setGotPosts,
        mustUpdatePosts,
        setMustUpdatePosts,
        setSendPost
    } = useContext(PostsContext)

    const { showMobileSearchInput } = useContext(MobileSearchContext)
    const { setMyUser, setReturnToSignUp } = useContext(UserContext)
    const { sentLogin, setSentLogin } = useContext(LoginContext)

    useEffect(() => {
        handleMyUser(setMyUser, setReturnToSignUp)
        handlePosts(setPosts, setGotPosts)
        // eslint-disable-next-line
    }, [sentLogin, setSentLogin])

    useEffect(() => {
        if (mustUpdatePosts) {
            getPosts(setPosts, setSendPost)
            setMustUpdatePosts(false)
        }
        // eslint-disable-next-line
    }, [mustUpdatePosts])

    useEffect(() => {
        for (let i = 0; i < updatedPosts.length; i++) {
            if (updatedPosts[i].postId === posts[0].postId) {
                setPostsToUpdate(updatedPosts.slice(0, i).length)
            }
        }
        // eslint-disable-next-line
    }, [updatedPosts])

    useInterval(() => {
        handleUpdatedPosts(setGotPosts, setUpdatedPosts)
    }, 15000)

    return (
        <>
            <Header />
            <HomeArea showMobileSearchInput={showMobileSearchInput}>
                <PostsWrapper>
                    <Title>timeline</Title>
                    <PagePublishPost />
                    {postsToUpdate !== 0 && <UpdatePostsModal />}
                    {
                        posts[0] ?
                            posts.map((post, index) =>
                                <UserPost key={index} post={post} />
                            ) :
                            (gotPosts ?
                                <NoPostText data-test="message">There are no posts yet</NoPostText> :
                                <Loader />
                            )
                    }
                    <TrendingHashtags />
                </PostsWrapper>
            </HomeArea>
        </>
    )
}