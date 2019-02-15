import Layout from '../components/MyLayout.js'
import Link from 'next/link'
//获取请求
import fetch from 'isomorphic-unfetch'
const PostLink = (props) => (
    <li>
        <Link href={`/post?title=${props.title}`}>
            <a>{props.title}</a>
        </Link>
    </li>
)

const PostNoLink = (props) => (
    <li>
        <Link as={`/p/${props.id}`} href={`/post?title=${props.title}`}>
            <a>{props.title}</a>
        </Link>
    </li>
)


const Index = (props) => (
    <Layout>
        <h1>My Blog</h1>
        <ul>
            <PostLink title="Hello Next.js"/>
            <PostLink title="Learn Next.js is awesome"/>
            <PostLink title="Deploy apps with Zeit"/>
            <PostNoLink id="hello-nextjs" title="Hello Next.js"></PostNoLink>
            <PostNoLink id="learn-nextjs" title="Learn Next.js is awesome"></PostNoLink>
            <PostNoLink id="deploy-nextjs" title="Deploy apps with Zeit"></PostNoLink>
        </ul>
        <ul style={{"marginTop":'100px'}}>
            {props.shows.map(({show}) => (
                <li key={show.id}>
                    <Link as={`/p/${show.id}`} href={`/post?id=${show.id}`}>
                        <a>{show.name}</a>
                    </Link>
                </li>
            ))}
        </ul>
    </Layout>
)

Index.getInitialProps = async function() {
    const res = await fetch('https://api.tvmaze.com/search/shows?q=batman')
    const data = await res.json()

    console.log(`Show data fetched. Count: ${data.length}`)
    //console.log("data",data);
    return {
        shows: data
    }
}

export default Index
