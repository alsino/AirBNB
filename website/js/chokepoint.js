(function () {
  d3.chokepoint = function() {

    var margin = { top: 20, right: 0, bottom: 30, left: 20 },
        width = 1000,
        height = 400,
        labelLength = 140,
        valueLength = 40,
        labelDistance = 10;

    var dimensions, dim = 0;
 
    var chartHeight = 0;
    var chartWidth = 0;

    setMeasures();

    var x = d3.scale.linear();

    var root, gParent, data;
 
    function chokepoint(opt) {

        root = d3.select(opt.bindto);
        gParent = root.append('svg');
        data = opt.data;
        distance = chartHeight / data.length;

        var i = data.length;
        var y = new Array(21);

        while(i--) {
            var n = data[i].verlauf.length;

            if(typeof y[20] === 'undefined') y[20] = 0
            y[20] += data[i].pledge;

            while(n--) {
                if(typeof y[n] === 'undefined') y[n] = 0
                y[n] += data[i].verlauf[n];
            }
        }

        data = y;

        dimensions = opt.dimensions;
        dim = opt.dim ? opt.dim : dim;

        chokegraph = gParent
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
                .attr("transform", "translate(" + (margin.left + labelLength) + "," + margin.top + ")");

        var group = chokegraph.selectAll(".group")
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
    
        chokepoint.refresh();

        return chokepoint;
    }

    function getDomain () {
        var max = d3.max(data);

        var min = d3.min(data);

        return [min, max]
    }

    function getRange () {
        return [0, chartWidth];
    }

    function setWidth() {
        width = parseInt(root.style("width")); 
        gParent.attr("width", width);
    };

    function setMeasures () {
        chartHeight = height - margin.top - margin.bottom;
        chartWidth = width - margin.right - margin.left - labelLength;
    }

    chokepoint.dim = function(_dim) {
        dim = parseInt(_dim);

        chokepoint.refresh();

        return chokepoint;
    };

    chokepoint.refresh = function() {

        setWidth();
        setMeasures();
        x.range( getRange() ).domain( getDomain() );

        var maxx = x(getDomain()[1]);

        chokegraph.selectAll(".path_line")
            .transition()
            .attr({
                x1: function(d) { return (maxx - x(d))/2; },
                x2: function(d) { return x(d) + (maxx - x(d))/2; }
            });

        chokegraph.selectAll(".labels")
            .transition()
            .attr({
                x: margin.left - labelLength - labelDistance
            })
            .text(function(d, i) { return 1990-i });

        return chokepoint;
    };
 
    return chokepoint;
    };

})();
