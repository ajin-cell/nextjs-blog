import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { log } from "console";
const postsDirectory = path.join(process.cwd(), "posts");

export function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, "");

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      id,
      ...matterResult.data,
    };
  });
  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}
// 获取外部api
export async function getSortedPostsData1() {
  // Instead of the file system,
  // fetch post data from an external API endpoint
  const res = await fetch("..");
  return res.json();
}

//   直接查询数据库：
// import someDatabaseSDK from 'someDatabaseSDK'
// const databaseClient = someDatabaseSDK.createClient(...)
import { remark } from 'remark';
import html from 'remark-html';
export async function getSortedPostsData2() {
  // Instead of the file system,
  // fetch post data from a database
  return databaseClient.query("SELECT posts...");
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);
  console.log("fileNames", fileNames);
  // Returns an array that looks like this:
  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'pre-rendering'
  //     }
  //   }
  // ]
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });
}
// export function getPostData(id) {
//   console.log("id", id);
//   const fullPath = path.join(postsDirectory, `${id}.md`);
//   console.log("fullPath",fullPath);
//   const fileContents = fs.readFileSync(fullPath, "utf8");
//   console.log("fileContents",fileContents);

//   // Use gray-matter to parse the post metadata section
//   const matterResult = matter(fileContents);
// console.log("matterResult",matterResult);
//   // Combine the data with the id
//   return {
//     id,
//     ...matterResult.data,
//   };
// }
export async function getPostData(id) {
    const fullPath = path.join(postsDirectory, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
  
    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);
  
    // Use remark to convert markdown into HTML string
    const processedContent = await remark()
      .use(html)
      .process(matterResult.content);
    const contentHtml = processedContent.toString();
  
    // Combine the data with the id and contentHtml
    return {
      id,
      contentHtml,
      ...matterResult.data,
    };
  }