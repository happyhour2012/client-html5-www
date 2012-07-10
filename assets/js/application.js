// app js
const REMOTE_URL = ""

$(document).bind('pageinit', function () {

var GroceryList = Backbone.Model.extend({

});

var GroceryListList = Backbone.Collection.extend({
    model: GroceryList,
    url: REMOTE_URL + '/lists'
});

var GroceryLists = new GroceryListList;

var GroceryListView = Backbone.View.extend({
    tagName: "li",
    template: _.template($('#grocerylist-template').html()),

    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }
});

var AppView = Backbone.View.extend({
    el: $('#grocerylistapp'),

    initialize: function() {

        GroceryLists.bind('add', this.addOne, this);
        GroceryLists.bind('reset', this.addAll, this);
        GroceryLists.bind('all', this.render, this);        


        GroceryLists.fetch();
    },

    render: function() {

    },

    addOne: function(groceryList) {
        var view = new GroceryListView({model: groceryList});
        this.$('#divider_actual_lists').after(view.render().el);
        this.$('#lists').listview('refresh');
    },

    addAll: function() {
        GroceryLists.each(this.addOne);
    }
});

var App = new AppView;

});
