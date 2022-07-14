import { context, util, u128, logging, storage, Context, PersistentUnorderedMap } from 'near-sdk-as'
import { htmlResponse, preloadUrls, bodyUrl, status, Web4Request, Web4Response, WEB4_STATIC_URL_KEY, assertOwner } from "./web4";

//====================================  POST  ====================================
/**
 *  posts contains all posts of an account, each account have own posts collection
 * @param postId 
 * @param postObject 
 */

export function addPost(postId: string, postObject: string): void {
  const accountId = Context.sender;
  let posts = new PersistentUnorderedMap<string, string>(accountId + "_post");
  posts.set(postId, postObject);
}
/**
 * posts contains all posts of an account, each account have own posts collection  
 * @param accountId 
 * @param postId 
 * @returns 
 */
export function getPost(accountId: string, postId: string): string | null {
  let posts = new PersistentUnorderedMap<string, string>(accountId + "_post");
  return posts.get(postId);
}

/**
 * get posts from author 
 * @param accountId 
 * @param from 
 * @param to 
 * @returns 
 */
export function getPostsFrom(accountId: string, from: i32, to: i32): string[] {
  let posts = new PersistentUnorderedMap<string, string>(accountId + "_post");
  return posts.values(from, to);
}

/**
 * get posts id
 * @param from 
 * @param to 
 * @returns array of postId 
 */
export function getPostsId(from: i32, to: i32): string[] {
  let posts = new PersistentUnorderedMap<string, string>("posts");
  return posts.values(from, to);
}

//save postId to db if its not exist
//key: postId - value: acountId
export function setPostId(postId: string): void {
  let posts = new PersistentUnorderedMap<string, string>("posts");
  if (!posts.get(postId)) {
    posts.set(postId, Context.sender + "|" + postId);
  }
}



// ==================================== COMMENT ==================================== 
export function getComments(postId: string, from: i32, to: i32): string[] {
  let comments = new PersistentUnorderedMap<string, string>(postId);
  return comments.values(from, to);
}


export function setComment(postId: string, commentId: string, commentObject: string): void {
  let comments = new PersistentUnorderedMap<string, string>(postId);
  comments.set(commentId, commentObject);
}

//==================================== USER PROFILE ====================================

/**
 * set user Profile 
 * @param profileObject 
 */
export function setProfile(profileObject: string): void {
  let profiles = new PersistentUnorderedMap<string, string>("uprofile");
  profiles.set(Context.sender, profileObject);
}

/**
 * 
 * @param userId 
 * @returns profileObject
 */
export function getProfile(userId: string): string | null {
  let profiles = new PersistentUnorderedMap<string, string>("uprofile");
  return profiles.get(userId);
}



// ==== WEB 4 HANDLE REQUESTS ===
// Updates current static content URL in smart contract storage
export function web4_setStaticUrl(url: string): void {
  assertOwner();

  storage.set(WEB4_STATIC_URL_KEY, url);
}


//handle request 
export function web4_get(request: Web4Request): Web4Response {

  //  serving content from IPFS
  if (request.path == "/" ||
    request.path == "/upload" ||
    request.path == "/profile" ||
    request.path == "/liked" ||
    request.path == "/comment" ||
    request.path == "/single" ||
    request.path.includes("/@")
  ) {
    return bodyUrl(`${storage.getString(WEB4_STATIC_URL_KEY)!}`);
  }


  if (request.path == '/test') {
    // Render HTML with form to submit a message
    return htmlResponse("this is a test page ");
    // return bodyUrl("../asset/index.html");

  }

  if (request.path == '/messages') {
    const getMessagesUrl = '/web4/contract/guest-book.testnet/getMessages';
    // Request preload of dependency URLs
    if (!request.preloads) {
      return preloadUrls([getMessagesUrl]);
    }

    // Render HTML with messages
    return htmlResponse('messages: ' + util.bytesToString(request.preloads.get(getMessagesUrl).body)!);
  }

  if (request.path == "/test2") {
    // return bodyUrl(`${storage.getString(WEB4_STATIC_URL_KEY)!}${request.path}`);
    return bodyUrl("ipfs://bafybeiblfwnfkna3klact7t6mrd4wfsxznccof4j6tcnq4foovhxtdgpdq/");

  }

  if (request.path == "/test3") {
    return bodyUrl("ipfs://QmNVTiSRJKKqxTc52E92wq9tih8Ff2Hg7c6kUZEf82K34R/");
  }

  if (request.path == "/test4") {
    return bodyUrl("ipfs://QmQUg7TLWutE7GfT3gTwn6P3LGJ2qmgb4oMo7gV2TqvT91/");
  }


  // By default return 404 Not Found
  return status(404);
}