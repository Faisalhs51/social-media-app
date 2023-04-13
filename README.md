# Social Media App API
This is a NodeJS backend for a social media app that provides various endpoints to allow users to authenticate, follow/unfollow, create/delete posts, like/unlike posts, and add comments to posts.

## Installation
Clone the repository from GitHub.
Navigate to the project directory and run npm install to install all the dependencies.
## Running the server
Run npm start to start the server. The server will listen on http://localhost:5000.
## API endpoints
The following endpoints are available in this app:

### POST /api/authenticate
This endpoint performs user authentication and returns a JWT token.

Input: Email, Password\
Return: JWT token\
Use [email = "john@gmail.com", password = "password"] as input\
This will return a JWT token(auth-token), save it somewhere for further use.
### POST /api/follow/{id}
This endpoint allows an authenticated user to follow another user with {id}.

### POST /api/unfollow/{id}
This endpoint allows an authenticated user to unfollow another user with {id}.\
Use saved JWT token in the request header as [auth-token = "<JWT_TOKEN>"]

### GET /api/user
This endpoint authenticates the request and returns the respective user profile.

Return: User Name, Number of followers, Number of followings\
Use saved JWT token in the request header as [auth-token = "<JWT_TOKEN>"]

### POST /api/posts
This endpoint allows an authenticated user to add a new post.

Input : Title, Description\
Return : Post-ID, Title, Description, Created Time(UTC)\
Use saved JWT token in the request header as [auth-token = "<JWT_TOKEN>"]\
Use [title = "any titile", desc = "any description"] as input\

### DELETE /api/posts/{id}
This endpoint allows an authenticated user to delete a post with {id}.\
Use saved JWT token in the request header as [auth-token = "<JWT_TOKEN>"]

### POST /api/like/{id}
This endpoint allows an authenticated user to like a post with {id}.\
Use saved JWT token in the request header as [auth-token = "<JWT_TOKEN>"]

### POST /api/unlike/{id}
This endpoint allows an authenticated user to unlike a post with {id}.\
Use saved JWT token in the request header as [auth-token = "<JWT_TOKEN>"]

### POST /api/comment/{id}
This endpoint allows an authenticated user to add a comment to a post with {id}.\

Input : Comment\
Return : Comment-ID\
Use saved JWT token in the request header as [auth-token = "<JWT_TOKEN>"]\
Use [comment = "any comment"] as input\

### GET /api/posts/{id}
This endpoint returns a single post with {id} populated with its number of likes and comments.\
Use saved JWT token in the request header as [auth-token = "<JWT_TOKEN>"]

### GET /api/all_posts
This endpoint returns all posts created by an authenticated user sorted by post time.\
Use saved JWT token in the request header as [auth-token = "<JWT_TOKEN>"]

Return:\
For each post, the following values are returned:\
id: ID of the post\
title: Title of the post\
desc: Description of the post\
created_at: Date and time when the post was created\
comments: Array of comments, for the particular post\
likes: Number of likes for the particular post\
