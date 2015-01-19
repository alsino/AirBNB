(function () {
  d3.linegraph = function() {

    var margin = { top: 20, right: 30, bottom: 30, left: 40 },
        width = 1000,
        height = 400,
        distance = 10,
        labelLength = 50,
        labelDistance = 10;

    var dimensions, dim = 0;
 
    var chartHeight = 0;
    var chartWidth = 0;

    setMeasures();

    var x = d3.scale.linear();

    var xAxis = d3.svg.axis()
        .orient("bottom")
        .tickSize(6, 0);

    var root, gParent, data;
 
    function linegraph(opt) {

        root = d3.select(opt.bindto);
        gParent = root.append('svg');
        data = opt.data;
        distance = chartHeight / data.length;

        dimensions = opt.dimensions;
        dim = opt.dim ? opt.dim : dimensions[1];

        linechart = gParent
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
                .attr("transform", "translate(" + (margin.left + labelLength) + "," + margin.top + ")");

        var group = linechart.selectAll(".group")
            .data(data)
            .enter()
            .append("g")
                .attr("class", function(d, i) { return "group " + i })

        var lines = group
            .append('line')
                .attr({
                    class: 'path_line',
                    y1: function(d, i) { return i * distance; },
                    y2: function(d, i) { return i * distance; },
                });

        var leftLabels = group
            .append('text')
                .attr({
                    class: 'labels path-label',
                    y: function(d, i) { return i * distance; },
                    dy: '.35em',
                    'text-anchor': 'end'
                });

        var axis = linechart.append("g")
            .attr("transform", "translate(" + 0 + "," + (margin.top + chartHeight) + ")")
            .attr("class", "x axis");
    
        linegraph.refresh();

        return linegraph;
    }

    function getDomain () {
        var max = d3.max(data, function(d) {
            return d3.max([d[dimensions[0]], d[dim]]);
        });

        var min = d3.min(data, function(d) {
            return d3.min([d[dimensions[0]], d[dim]]);
        });

        return [min, max]
    }

    function getRange () {
        return [0, chartWidth];
    }

    function setWidth() {
        width = parseInt(root.style("width")); 
        gParent.attr("width", width);
        console.log(width)
    };

    function setMeasures () {
        chartHeight = height - margin.top - margin.bottom;
        chartWidth = width - margin.right - margin.left - labelLength;
    }

    linegraph.dim = function(_dim) {
        console.log(getRange(), getDomain(), dim);
        dim = _dim;

        linegraph.refresh();

        return linegraph;
    };

    linegraph.refresh = function() {

        setWidth();
        setMeasures();
        x.range( getRange() ).domain( getDomain() );

        console.log(getRange(), getDomain(), dim, x.range(), x.domain(), root[0][0].id);

        xAxis.scale(x);

        linechart.selectAll('.axis').transition().call(xAxis);

        linechart.selectAll(".path_line").each(function(d) {console.log(d)})

        linechart.selectAll(".path_line")
            .transition()
            .attr({
                x1: function(d) { return x(d[dimensions[0]]); },
                x2: function(d) { return x(d[dim]); }
            });

        linechart.selectAll(".labels")
            .transition()
            .attr({
                x: margin.left - labelLength - labelDistance
            })
            .text(function(d) { console.log(d.label); return d.label });

        return linegraph;
    };
 
    return linegraph;
    };

})();
