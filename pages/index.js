import Layout from '../components/MyLayout.js'
import Link from 'next/link'
//获取请求
import fetch from 'isomorphic-unfetch'
import Markdown from 'react-markdown'

const PostLink = (props) => (
    <li>
        <Link href={`/post?title=${props.title}`}>
            <a>{props.title}</a>
        </Link>
        <style jsx>{`
      li {
        list-style: none;
        margin: 5px 0;
      }

      a {
        text-decoration: none;
        color: blue;
        font-family: "Arial";
      }

      a:hover {
        opacity: 0.6;
      }
    `}</style>
    </li>
)

function getPosts () {
    return [
        { id: 'hello-nextjs', title: 'Hello Next.js'},
        { id: 'learn-nextjs', title: 'Learn Next.js is awesome'},
        { id: 'deploy-nextjs', title: 'Deploy apps with ZEIT'},
    ]
}

const PostNoLink = (props) => (
    <li>
        <Link as={`/p/${props.id}`} href={`/post?title=${props.title}`}>
            <a>{props.title}</a>
        </Link>
        <style jsx>{`
      li {
        list-style: none;
        margin: 5px 0;
      }

      a {
        text-decoration: none;
        color: blue;
        font-family: "Arial";
      }

      a:hover {
        opacity: 0.6;
      }
    `}</style>
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
        <div className="markdown">
            <Markdown source={`
                This is our blog post.
                Yes. We can have a [link](/link).
                And we can have a title as well.

                ### This is a title

                And here's the content.
     `}/>
        </div>

        <style jsx global>{`
      h1, a {
        font-family: "Arial";
      }

      ul {
        padding: 0;
      }

      li {
        list-style: none;
        margin: 5px 0;
      }

      a {
        text-decoration: none;
        color: blue;
      }

      a:hover {
        opacity: 0.6;
      }

      .markdown {
       font-family: 'Arial';
     }

     .markdown a {
       text-decoration: none;
       color: blue;
     }

     .markdown a:hover {
       opacity: 0.6;
     }

     .markdown h3 {
       margin: 0;
       padding: 0;
       text-transform: uppercase;
     }
    `}</style>
    </Layout>
)

Index.getInitialProps = async function() {
    const res = await fetch('https://api.tvmaze.com/search/shows?q=batman')
    const data = await res.json()
    /**
     * 由于是服务端渲染机制
     * 1. 如果重新刷新页面
     */
    console.log(`Show data fetched. Count: ${data.length}`)
    //console.log("data",data);
    return {
        shows: data
    }
}

export default Index
