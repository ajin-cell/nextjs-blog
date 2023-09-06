import utilStyles from '../../styles/utils.module.css';
import Layout from "../../components/layout";
import { getAllPostIds, getPostData } from "../../lib/posts";
import Head from 'next/head';
import Date from '../../components/date';
export async function getStaticPaths() {
  const paths = getAllPostIds();
  console.log( "path",paths);
  return {
    paths,
    fallback: false,
  };
}
export async function getStaticProps({ params }) {
  const postData =await getPostData(params.id);
  console.log("parmas", params);

  return {
    props: {
      postData,
    },
  };
}

export default function Post({ postData }) {
  return (
    <Layout home>
       <Head>
        <title>{postData.title}</title>
      </Head>
      <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </Layout>
  );
}
