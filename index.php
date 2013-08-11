<!DOCTYPE HTML>
<html>
<head>

	<title>Backbone test</title>
	<link href="http://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">
	<link rel="stylesheet" href="css/global.css?v=2">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">

	<link rel="shortcut icon" href="/favicon.ico">
</head>

<body>


<header class="header">

	<div class="center">

		<div id="filter"></div>

	</div>


</header>


<div class="content">

	<div class="center">

		<h1>Backbone test</h1>

		<div id="portfolio"></div>

	</div>

</div>


<script type="text/template" id="template-filter">

	<div class="filter-block">

		<h3>Filter op service</h3>

		<input type="checkbox" class="filter" value="interactive" id="interactive">
		<label for="interactive">Interactive</label>

		<input type="checkbox" class="filter" value="photography" id="photography">
		<label for="photography">Photography</label>

		<input type="checkbox" class="filter" value="audiovisual" id="audiovisual">
		<label for="audiovisual">Audiovisual</label>

		<input type="checkbox" class="filter" value="3d" id="3d">
		<label for="3d">3D</label>

		<input type="checkbox" class="filter" value="graphic design" id="graphic design">
		<label for="graphic design">Graphic design</label>

	</div>

	<div class="sort-block">

		<h3>Sorteer op:</h3>

		<div class="select-block">

			<select id="sort">
				<option value="order">Volgorde laag-hoog</option>
				<option value="order/desc">Volgorde hoog-laag</option>
				<option value="label">Naam a-z</option>
				<option value="label/desc">Naam z-a</option>
			</select>

		</div>
	</div>

</script>

<script type="text/template" id="template-portfolio">
	<h2><%=label%></h2>

	<div class="services">
		<% _.each(services, function (item, i) { %>
			<%if (i > 0 && services.length > 0) {%>/<% } %>
			<%=item%>
		<% }); %>
	</div>

	<%=description%>
</script>


<script src="//cdnjs.cloudflare.com/ajax/libs/jquery/2.0.3/jquery.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.5.1/underscore-min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.0.0/backbone-min.js"></script>
<script src="scripts/data.js?v=2"></script>
<script src="scripts/functions.js?v=2"></script>

</body>
</html>