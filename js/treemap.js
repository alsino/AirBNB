(function () {
  d3.treemap = function() {

    var margin = { top: 20, right: 0, bottom: 30, left: 0 },
        width = 1000,
        height = 700;

    var dimensions, dim = 0;
 
    var chartHeight = 0;
    var chartWidth = 0;

    setMeasures();

    var color = d3.scale.category20c();

    var treemapLayout = d3.layout.treemap()
        .sticky(true)
        .value(function(d) { return d.size; });

    var root, gParent, node, data;
 
    function treemap(opt) {

        root = d3.select(opt.bindto);

        var len = opt.data.length;

        var structure = { 'name' : 'countries', 'children' : [] }
        var good = { 'name': 'good', 'children' : [] };
        var bad = { 'name': 'bad', 'children' : [] };

        while(len--) {
            var el = { 'name' : opt.data[len].label, 'size' : opt.data[len].current };
            if(opt.data[len].current < opt.data[len].pledge) {
                good.children.push(el);
            }
            else {
                bad.children.push(el);
            }
        }

        structure.children.push(good);
        structure.children.push(bad);

        console.log(structure)

        dimensions = opt.dimensions;
        dim = opt.dim ? opt.dim : dim;

        gParent = root.append("div")
            .style("position", "relative")
            .style("left", margin.left + "px")
            .style("top", margin.top + "px");

        node = gParent.datum(structure).selectAll(".node")
            .data(treemapLayout.nodes)
        .enter().append("div")
            .attr("class", "node")
            .call(position)
            .style("background", function(d) { return d.children ? color(d.name) : null; })
            .text(function(d) { return d.children ? null : d.name; });

        treemap.refresh();

        return treemap;
    }

    function position() {
        this.style("left", function(d) { return d.x + "px"; })
            .style("top", function(d) { return d.y + "px"; })
            .style("width", function(d) { return Math.max(0, d.dx + 1) + "px"; })
            .style("height", function(d) { return Math.max(0, d.dy + 1) + "px"; });
    }

    function setWidth() {
        width = parseInt(root.style("width")); 
        //gParent.attr("width", width);
        console.log(width)
    };

    function setMeasures () {
        chartHeight = height - margin.top - margin.bottom;
        chartWidth = width - margin.right - margin.left;
    }

    treemap.dim = function(_dim) {
        dim = parseInt(_dim);

        treemap.refresh();

        return treemap;
    };

    treemap.refresh = function() {

        setWidth();
        setMeasures();
        
        gParent.style("width", (width) + "px")
            .style("height", (height) + "px");

        treemapLayout.size([width - margin.left - margin.right, height - margin.top - margin.bottom]);

        var value = dim == 1
            ? function() { return 1; }
            : function(d) { return d.size; };

        node
            .data(treemapLayout.value(value).nodes)
            .transition()
            .call(position);

        return treemap;
    };
 
    return treemap;
    };

})();
