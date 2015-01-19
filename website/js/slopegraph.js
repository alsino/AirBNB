(function () {
  d3.slopegraph = function() {

    var margin = { top: 20, right: 0, bottom: 30, left: 0 },
        width = 1000,
        height = 800,
        labelLength = 140,
        valueLength = 40,
        labelDistance = 10;

    var dimensions, dim = 0;
 
    var chartHeight = 0;
    var chartWidth = 0;

    setMeasures();

    var y = d3.scale.log();

    var root, gParent, data;
 
    function slopegraph(opt) {

        root = d3.select(opt.bindto);
        gParent = root.append('svg');
        data = opt.data;

        dimensions = opt.dimensions;
        dim = opt.dim ? opt.dim : dimensions[1];

        chart = gParent
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var group = chart.selectAll(".group")
            .data(data)
            .enter()
            .append("g")
                .attr("class", function(d, i) { return "group " + i })

        var lines = group
            .append('line')
                .attr({
                    class: 'slope-line',
                });

        var leftLabels = group
            .append('text')
                .attr({
                    class: 'left_labels slope-label',
                    dy: '.35em',
                    'text-anchor': 'end'
                });

        var leftValues = group
            .append('text')
                .attr({
                    class: 'left_values slope-label',
                    dy: '.35em',
                    'text-anchor': 'end'
                });

        var rightLabels = group
            .append('text')
                .attr({
                    class: 'right_labels slope-label',
                    dy: '.35em'
                });

        var rightValues = group
            .append('text')
                .attr({
                    class: 'right_values slope-label',
                    dy: '.35em'
                });

    
        slopegraph.refresh();

        return slopegraph;
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
        return [chartHeight, 0];
    }

    function setWidth() {
        width = parseInt(root.style("width")) - margin.left - margin.right; 
        gParent.attr("width", width);
    };

    function setMeasures () {
        chartHeight = height - margin.top - margin.bottom;
        chartWidth = width - margin.right - margin.left;
    }

    slopegraph.dim = function(_dim) {

        dim = _dim;
        slopegraph.refresh();

        return slopegraph;
    };

    slopegraph.refresh = function() {
        setWidth();
        setMeasures();
        y.range(getRange()).domain( getDomain() );

        chart.selectAll(".slope-line")
            .transition()
            .attr({
                x1: margin.left + labelLength,
                x2: width - margin.right - labelLength,
                y1: function(d) { return margin.top + y(d[dimensions[0]]); },
                y2: function(d) { return margin.top + y(d[dim]); },
                class: function(d) { return d[dim] < d[dimensions[0]] ? "slope-line bad" : "slope-line good"; }
            });

        chart.selectAll(".left_labels")
            .transition()
            .attr({
                x: margin.left - valueLength + labelLength - labelDistance,
                y: function(d,i) { return margin.top + y(d[dimensions[0]]); }
            })
            .text(function(d) { return d.label });

        chart.selectAll(".left_values")
            .transition()
            .attr({
                x: margin.left + labelLength - labelDistance,
                y: function(d,i) { return margin.top + y(d[dimensions[0]]); }
            })
            .text(function(d) { return d[dimensions[0]] });

        chart.selectAll(".right_labels")
            .transition()
            .attr({
                x: width - margin.right + valueLength - labelLength + labelDistance,
                y: function(d,i) { return margin.top + y(d[dim]); }
            })
            .text(function(d) { return d.label });

        chart.selectAll(".right_values")
            .transition()
            .attr({
                x: width - margin.right - labelLength + labelDistance,
                y: function(d,i) { return margin.top + y(d[dim]); }
            })
            .text(function(d) { return d[dim] });

        return slopegraph;
    };
 
    return slopegraph;
    };

})();
