# Social Media App API
This is a NodeJS backend for a social media app that provides various endpoints to allow users to authenticate, follow/unfollow, create/delete posts, like/unlike posts, and add comments to posts.

## Installation
Clone the repository from GitHub.
Navigate to the project directory and run npm install to install all the dependencies.
## Running the server
Run npm start to start the server. The server will listen on http://localhost:5000.
##API endpoints
The following endpoints are available in this app:

### POST /api/authenticate
This endpoint performs user authentication and returns a JWT token.

Input
Email
Password
Return
JWT token
### POST /api/follow/{id}
This endpoint allows an authenticated user to follow another user with {id}.

### POST /api/unfollow/{id}
This endpoint allows an authenticated user to unfollow another user with {id}.

### GET /api/user
This endpoint authenticates the request and returns the respective user profile.

Return
User Name
Number of followers
Number of followings
### POST /api/posts
This endpoint allows an authenticated user to add a new post.

Input
Title
Description
Return
Post-ID
Title
Description
Created Time(UTC)
### DELETE /api/posts/{id}
This endpoint allows an authenticated user to delete a post with {id}.

### POST /api/like/{id}
This endpoint allows an authenticated user to like a post with {id}.

### POST /api/unlike/{id}
This endpoint allows an authenticated user to unlike a post with {id}.

### POST /api/comment/{id}
This endpoint allows an authenticated user to add a comment to a post with {id}.

Input
Comment
Return
Comment-ID
### GET /api/posts/{id}
This endpoint returns a single post with {id} populated with its number of likes and comments.

### GET /api/all_posts
This endpoint returns all posts created by an authenticated user sorted by post time.

Return
For each post, the following values are returned:

id: ID of the post
title: Title of the post
desc: Description of the post
created_at: Date and time when the post was created
comments: Array of comments, for the particular post
likes: Number of likes for the particular post
