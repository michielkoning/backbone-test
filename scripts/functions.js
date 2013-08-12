$(function(){

	var PortfolioItem = Backbone.Model.extend();

	var Portfolio = Backbone.Collection.extend({

		initialize: function() {
			this.sort_key = 'order';
		},
		comparator: function(a, b) {
			a = a.get(this.sort_key);
			b = b.get(this.sort_key);
			return a > b ?  1
				 : a < b ? -1
				 :          0;
		},
		model: PortfolioItem,
		filterBy: function(filter) {

			var filtered;

			//kijken of er gefilterd moet worden op meerdere waarden
			if (filter.indexOf('|') > 0) {

				//array maken van de value
				var arrFilter = filter.split('|');

				filtered = this.filter(function(data) {
					for (var i = 0; i < data.get("services").length; i++) {
						var filterItem = data.get("services")[i].toString();

						if (filterItem) {
							if (arrFilter.indexOf(filterItem.toLowerCase()) > -1) {
							 	return true;
							 }
						}
					}
				});

			} else {

				filtered = this.filter(function(data) {

					for (var i = 0; i < data.get("services").length; i++) {

						var filterItem = data.get("services")[i].toString();

						if (filterItem) {
							if (filterItem.toLowerCase() === filter) {
							 	return true;
							 }
						}
					}

				});

			}

			return new Portfolio(filtered);
		},

		sortBy: function(key, order) {
			this.sort_key = key;
			this.sort();
			if (order == 'desc') {
				this.models = this.models.reverse();
			}
			return this;
		}
	});

	//Views
	var PortfolioView = Backbone.View.extend({
		tagName:'ul',
		render: function() {
			_.each(this.model.models, function(item){
				$(this.el).append(
					new PortfolioItemView({
						model: item
					}).render().el
				);

			}, this);
			return this;
		}
	});

	var PortfolioItemView = Backbone.View.extend({
		tagName:"li",
		template:_.template($('#template-portfolio').html()),
		render: function () {
			$(this.el).html(this.template(this.model.toJSON()));
			return this;
		}
	});

	var FilterView = Backbone.View.extend({

		template:_.template($('#template-filter').html()),

		initialize: function (){
			this.filterValue = '';
			this.sortKey = '';
			this.sortOrder = '';
		},

		render:function () {
			var sortValue = this.sortKey;

			if (this.sortOrder) {
				sortValue += "/" + this.sortOrder;
			}

			$(this.el).html(this.template({
				sortValue: sortValue,
				filterValue: this.filterValue
			}));
			return this;
		},

		events:{
			"change .filter" : "changeList",
			"change #sort": "changeList"
		},

		changeList: function () {

			//opbouwen van de url

			var selectedFilter = this.getFilter(),
				selectedSort = this.getSort(),
				url = "";

			if (selectedFilter) {
				url += "filter/" + selectedFilter;
			}

			if (selectedSort) {
				if (selectedFilter) {
					url += "/";
				}
				url += "sort/" + selectedSort;
			}

			app.navigate(url, true);

		},

		getSort: function(){
			var sort = $('#sort').val();
			return sort;
		},

		getFilter: function(){

			if ($('.filter:checked').size() > 0) {
				var arrFilter = new Array();
				$('.filter:checked').each(function (item) {
					arrFilter.push($(this).val());
				});

				return arrFilter.join('|');

			} else {

				return "";
			}

		}

	});

	// Router
	var AppRouter = Backbone.Router.extend({

		initialize:function () {

			this.portfolio = new Portfolio(portfolioList);
			this.sortKey = "order";
			this.sortOrder = "asc";
		},

		routes:{
			"":"list",
			"filter/:filter(/sort)(/:sortKey)(/:sortOrder)": "filter",
			"sort/:sortBy(/:value)": "sort"
		},

		list: function () {
			this.portfolioView = new PortfolioView({
				model: this.portfolio
			});
			$('#portfolio').html(this.portfolioView.render().el);

			this.filterView = new FilterView();
			$('#filter').html(this.filterView.render().el);
		},

		filter: function (value, sortKey, sortOrder) {

			//sorteren is optioneel
			if (!sortKey) {
				sortKey = this.sortKey;
				if (!sortOrder) {
					sortOrder = this.sortOrder;
				}
			}

			this.portfolioView = new PortfolioView({
				model: this.portfolio.filterBy(value).sortBy(sortKey, sortOrder)
			});
			$('#portfolio').html(this.portfolioView.render().el);

			this.filterView = new FilterView();
			this.filterView.sortOrder = sortOrder;
			this.filterView.sortKey = sortKey;
			this.filterView.filterValue = value;

			$('#filter').html(this.filterView.render().el);
		},

		sort: function (sortKey, sortOrder) {

			if (!sortOrder) {
				sortOrder = "";
			}

			this.portfolioView = new PortfolioView({
				model: this.portfolio.sortBy(sortKey, sortOrder)
			});
			$('#portfolio').html(this.portfolioView.render().el);

			this.filterView = new FilterView();
			this.filterView.sortOrder = sortOrder;
			this.filterView.sortKey = sortKey;

			$('#filter').html(this.filterView.render().el);

		}
	});

	var app = new AppRouter();
	Backbone.history.start();

});