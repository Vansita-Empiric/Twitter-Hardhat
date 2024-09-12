// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Twitter {
    struct User {
        bytes4 userId;
        address userAddress;
        string username;
        string userDesc;
        string email;
        string password;
        bool isRegistered;
    }

    struct Post {
        bytes4 postId;
        address userAddress;
        string content;
        address[] like;
        address[] dislike;
        Comment[] comment;
    }

    struct Comment {
        bytes4 commentId;
        address userAddress;
        string comment;
    }

    // To manage users with address
    mapping(address => User) users;

    // To manage users with their id
    mapping(bytes4 => User) userById;

    // To manage login - logout with user address
    mapping(address => bool) isLoggedIn;

    // To check username availability
    mapping(string => bool) isNameUnavailable;

    // To check user has liked the particular post or not
    mapping(bytes4 => mapping(address => bool)) isLiked;

    // To check user has disliked the particular post or not
    mapping(bytes4 => mapping(address => bool)) isDisliked;

    // created struct type array
    User[] userArr;
    Post[] postArr;
    // Post[] postByUserArr;
    mapping(address => Post[]) userPosts;

    // created post structure's instance
    Post postInstance;

    modifier loginOnly() {
        require(isLoggedIn[msg.sender], "You have to login first");
        _;
    }

    function registerUser(
        string memory _username,
        string memory _userDesc,
        string memory _email,
        string memory _password
    ) public {
        require(
            !users[msg.sender].isRegistered,
            "You have already registered with this address"
        );
        require(
            !isNameUnavailable[_username],
            "This username is not available"
        );
        bytes4 uid = bytes4(keccak256(abi.encodePacked(block.timestamp)));

        // created user structure's instance for internal use only
        User memory userInstance = User(
            uid,
            msg.sender,
            _username,
            _userDesc,
            _email,
            _password,
            true
        );
        userArr.push(userInstance);
        users[msg.sender] = userInstance;
        userById[uid] = userInstance;

        // Changing state for username availability
        isNameUnavailable[_username] = true;
    }

    function loginUser(string memory _username, string memory _password)
        public
    {
        require(users[msg.sender].isRegistered, "You have to register first");
        require(!isLoggedIn[msg.sender], "You are already logged in");

        // Checking whether the registered username and password associated with this address matches the username and password provided by the user
        require(
            (keccak256(abi.encodePacked(users[msg.sender].username)) ==
                keccak256(abi.encodePacked(_username))) &&
                (keccak256(abi.encodePacked(users[msg.sender].password)) ==
                    keccak256(abi.encodePacked(_password))),
            "Invalid login credential"
        );

        // (keccak256(abi.encodePacked(users[msg.sender].password)) == keccak256(abi.encodePacked(_password)))
        // Changing state for login user with this address
        isLoggedIn[msg.sender] = true;
    }

    function createPost(string memory _content) public {
        bytes4 pid = bytes4(keccak256(abi.encodePacked(block.timestamp)));

        // Addind details in post instance
        postInstance.postId = pid;
        postInstance.userAddress = msg.sender;
        postInstance.content = _content;

        // Adding post instance in post array
        postArr.push(postInstance);

        userPosts[msg.sender].push(postInstance);
    }

    function getAllPosts() public view loginOnly returns (Post[] memory) {
        return postArr;
    }

    // function getPostsByUser() public loginOnly returns (Post[] memory) {
    //     // Deleting array so that array can be empty
    //     delete postByUserArr;

    //     //  Finding post of user and adding it in an array
    //     for (uint256 i = 0; i < postArr.length; i++) {
    //         if (postArr[i].userAddress == msg.sender) {
    //             postByUserArr.push(postArr[i]);
    //         }
    //     }
    //     return postByUserArr;
    // }

    function getPostsByUserFromMapping()
        public
        view
        loginOnly
        returns (Post[] memory)
    {
        return userPosts[msg.sender];
    }

    function likePost(bytes4 _postId) public loginOnly {
        // Checking user has already liked the particular post or not
        require(!isLiked[_postId][msg.sender], "You have already liked");

        address uAddress;

        // Finding post and liking in post array
        for (uint256 i = 0; i < postArr.length; i++) {
            if (postArr[i].postId == _postId) {
                uAddress = postArr[i].userAddress;
                isLiked[_postId][msg.sender] = true;
                postArr[i].like.push(msg.sender);
            }
        }

        // Finding post and liking in user post mapping
        for (uint256 i = 0; i < userPosts[uAddress].length; i++) {
            if (userPosts[uAddress][i].postId == _postId) {
                userPosts[uAddress][i].like.push(msg.sender);
            }
        }
    }

    function dislikePost(bytes4 _postId) public loginOnly {
        // Checking user has already disliked the particular post or not
        require(!isDisliked[_postId][msg.sender], "You have already disliked");

        address uAddress;

        // Finding post and disliking in post array
        for (uint256 i = 0; i < postArr.length; i++) {
            if (postArr[i].postId == _postId) {
                uAddress = postArr[i].userAddress;
                isDisliked[_postId][msg.sender] = true;
                postArr[i].dislike.push(msg.sender);
            }
        }

        // Finding post and disliking in user post mapping
        for (uint256 i = 0; i < userPosts[uAddress].length; i++) {
            if (userPosts[uAddress][i].postId == _postId) {
                userPosts[uAddress][i].dislike.push(msg.sender);
            }
        }
    }

    function commentPost(bytes4 _postId, string memory _comment)
        public
        loginOnly
    {
        bytes4 cid = bytes4(keccak256(abi.encodePacked(block.timestamp)));
        // created comment structure's instance for internal use only
        Comment memory commentInstance = Comment(cid, msg.sender, _comment);

        address uAddress;

        // Finding & updating post in post array
        for (uint256 i = 0; i < postArr.length; i++) {
            if (postArr[i].postId == _postId) {
                uAddress = postArr[i].userAddress;
                postArr[i].comment.push(commentInstance);
            }
        }

        // Finding & updating post in user post mapping
        for (uint256 i = 0; i < userPosts[uAddress].length; i++) {
            if (userPosts[uAddress][i].postId == _postId) {
                userPosts[uAddress][i].comment.push(commentInstance);
            }
        }
    }

    function getAllUsers() public view loginOnly returns (User[] memory) {
        return userArr;
    }

    function getUserByAddress(address _userAdd)
        public
        view
        loginOnly
        returns (User memory)
    {
        return users[_userAdd];
    }

    function getLoggedInUser() public view loginOnly returns (User memory) {
        return users[msg.sender];
    }

    function getUserById(bytes4 _id)
        public
        view
        loginOnly
        returns (User memory)
    {
        return userById[_id];
    }

    function logOutUser() public loginOnly {
        // Changing state for login user with this address
        isLoggedIn[msg.sender] = false;
    }
}
