import {withRouter} from 'next/router'
import Layout from '../components/MyLayout.js'

const Content = withRouter((props)=>(<div>
    <h1>{props.router.query.title}</h1>
    <p>This is the blog post content.</p>
</div>))

const Page = (props) => {
    return (
    <Layout>
        {/*<Content></Content>*/}
        <h1>{props.show.name}</h1>
        <p>{props.show.summary}</p>
        {/*<img src={props.show.image.medium}/>*/}
    </Layout>)
}
Page.getInitialProps =  async function (context){
    const { id } = context.query
    const res = await fetch(`https://api.tvmaze.com/shows/${id}`)
    const show = await res.json()
    return { show }
}

export default Page
