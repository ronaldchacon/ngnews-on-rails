app.factory('posts', ['$http', function($http) {
  var o = {
    posts: [],
    getAll: function() {
      return $http.get('/posts.json')
      .success(function(data) {
        angular.copy(data, o.posts);
      });
    },
    create: function(post) {
      return $http.post('/posts.json', post)
      .success(function(data) {
        o.posts.push(data);
      });
    },
    upvote: function(post) {
      return $http.put('/posts/' + post.id + '/upvote.json')
      .success(function(data) {
        post.upvotes += 1;
      });
    },
    get: function(id) {
      return $http.get('/posts/' + id + '.json')
      .then(function(response) {
        return response.data;
      });
    },
    addComment: function(id, comment) {
      return $http.post('/posts/' + id + '/comments.json', comment);
    },
    upvoteComment: function(post, comment) {
      return $http.put('/posts/' + post.id + '/comments/' + comment.id + '/upvote.json')
      .success(function(data) {
        comment.upvotes += 1;
      });
    }
  };

  return o;
}]);
