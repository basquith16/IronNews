var Router = Backbone.Router.extend({

  routes: {
    "": "index",
    ":id/comments": "comments"
  },

  index: function() {
    var self = this;
    this.articles.fetch().then(function() {
      $('.content').html(self.pageView.render())
    });
  },

  comments: function(articleId) {
    var article = new Article({
      id: articleId
    });

    article.fetch().then(function() {
      var view = new CommentsView({
        model: article
      });
      $('.content').html(view.render());
    })
  },

  initialize: function() {

    this.articles = new Articles();
    this.commentsView = new CommentsView();
    this.pageView = new PageView({
      collection: this.articles
    })
    Backbone.history.start();
  }
});

$(function() {
  var router = new Router();
});
