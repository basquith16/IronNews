_.templateSettings = {
  interpolate: /\{\{(.+?)\}\}/g
};

var Article = Backbone.Model.extend({
  url: function() {
    return "https://iron-news.herokuapp.com/articles/" + this.get('id');
  }
});

var Articles = Backbone.Collection.extend({
  url: "https://iron-news.herokuapp.com/articles/",
  model: Article
})

var LineView = Backbone.View.extend({
  tagName: 'li',
  template: _.template($('#lineTemplate').text()),

  render: function() {
    this.$el.html(this.template(this.model.attributes));
    return this.$el;
  }
});

var PageView = Backbone.View.extend({
  tagName: 'ol',

  render: function() {
    var self = this;
    this.collection.each(function(article) {
      var view = new LineView({
        model: article
      });
      self.$el.append(view.render());
    })
    return this.$el;
  }
});

var CommentsView = Backbone.View.extend({
  tagName: 'ul',
  template: _.template($('#commentsTemplate').text()),

  render: function() {
    var self = this;
    _.each(this.model.get('comments'), function(comment) {
      self.$el.append(self.template(comment));
    })
    return self.$el;
  }
});

$('#upvote').click(function() {
  comments_count += 1;

});
