import React from 'react'
import { Link, graphql } from 'gatsby'
import axios from 'axios'
import DefaultLayout from '../components/layout'
import SEO from '../components/seo'
import Hero from '../components/hero'

class BlogIndex extends React.Component {
  state = {
    data: [],
    currentPage: 1
  };
  async componentDidMount(){
    await this.fetchBoxingArticles();
  }
  async fetchBoxingArticles() {
    const url = `https://api.cognitive.microsoft.com/bing/v7.0/news/search/?q=boxing&count=100&jsonp`;
    const headers = {
      'Ocp-Apim-Subscription-Key':'a894e8ffde684fb7916fd1152b055e2e',
      'data':'jsonp',
      'Access-Control-Allow-Origin': 'localhost:8000'
    };
    const result = await axios.get(url, {
      headers
    })
    .then(res => this.setState({data: res.data.value}))
    // .then(res => console.log('res: ',res))
    .catch(err => console.log('err: ',err));
  }

  render() {
    const articles = this.state.data;
    console.log('articles: ',articles);
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMarkdownRemark.edges
    // const { currentPage } = this.props.pageContext
    console.log('currentpage: ',currentPage)
    const currentPage = this.state.currentPage;
    const numPages = 5;
    const isFirst = currentPage === 1
    const isLast = currentPage === numPages
    const prevPage = currentPage - 1 === 1 ? '/' : (currentPage - 1).toString()
    const nextPage = (currentPage + 1).toString()

    return (
      <DefaultLayout>
        <SEO
          title={siteTitle}
          keywords={[`boxing`,`boxing land`,`boxing report`, `boxing latest news`, `boxing news`]}
        />
        <Hero />
        {articles.map((article,i) => {
          return (
            <article className="post" key={i}>
              <a target="_blank"
                href={article.url}
                className="post-thumbnail"
                style={{
                  backgroundImage: `url(${article.image.thumbnail.contentUrl})`,
                  width: '20%'
                }}
              />
                <div className="post-content">
                {/* <a target="_blank" */}
                {/* href={article.url}> */}
                  <h2 style={{fontSize: '24px', fontWeight:'600'}} className="post-title">
                    {article.name}
                  </h2>
                  <p>{article.description}</p>
                  <span>
                    {article.provider[0].name}
                  </span>
                  <br/>
                  <span className="post-date">
                    {new Date(article.datePublished).toString().slice(0,15)}&nbsp;&nbsp;
                  </span>
                {/* </a> */}
                </div>
            </article>
          )
        })}

        <div className="container">
          <nav className="pagination" role="pagination">
            <ul>
              {!isFirst && (
                <p>
                  <Link to={prevPage} rel="prev" className="newer-posts">
                    ← Previous Page
                  </Link>
                </p>
              )}
              <p>
                <span className="page-number">
                  Page {currentPage} of {numPages}
                </span>
              </p>
              {!isLast && (
                <p>
                  <Link to={nextPage} rel="next" className="older-posts">
                    Next Page →
                  </Link>
                </p>
              )}
            </ul>
          </nav>
        </div>
      </DefaultLayout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query blogPageQuery($skip: Int!, $limit: Int!) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          timeToRead
          frontmatter {
            date(formatString: "YYYY, MMM DD")
            title
            img {
              childImageSharp {
                fluid(maxWidth: 3720) {
                  aspectRatio
                  base64
                  sizes
                  src
                  srcSet
                }
              }
            }
          }
        }
      }
    }
  }
`
