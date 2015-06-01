var excel = document.getElementById("excel-input");
var wiki = document.getElementById("wiki-output");
var headerBackgroundColor = document.getElementById('header-background-color');
var highlightRowColor = document.getElementById('highlight-rows-color');
var highlightRows = document.getElementById("highlight-rows");
var formattingFunction = document.getElementById("cell-formatting-function");

function highlight(content) {
}

excel.addEventListener("click", function f(e) {
    // For convenience, select all text on first click. Remove listener for
    // subsequent clicks since it gets annoying if you're trying to edit
    // stuff.
    e.target.select();
    excel.removeEventListener("click", f);
});

excel.addEventListener("blur", update);
headerBackgroundColor.addEventListener("blur", update);
highlightRowColor.addEventListener("blur", update);
highlightRows.addEventListener("blur", update);
        
function update(e) {
    console.log('Updating...');
    var text = excel.value;
    var backgroundColor = headerBackgroundColor.value;
    var highlightColor = highlightRowColor.value;
    var markup = '{| {{table}}';
    var highlightIndices = highlightRows.value.split(',').map(function(s) {
        return parseInt(s, 10);
    });
    var formatter = function(content) { return content; };
    try {
        eval('formatter = ' + formattingFunction.value);
    } catch(e) {
        console.error('Could not eval formatting function. Ignoring.');
    }

    text.split('\n').forEach(function(line, rowIndex) {
        line.split('\t').forEach(function(content, colIndex) {
            markup += '|';
            if (rowIndex === 0) {
                markup += 'align="center" style="background:' + backgroundColor + ';"';
                content = "'''" + content + "'''";
            } else if (highlightIndices.indexOf(rowIndex) >= 0) {
                markup += 'style="background:' + highlightColor + ';"';
            }

            markup += '|';
            markup += formatter(content, line, rowIndex, content, colIndex); // Defaults to a no-op
            markup += '\n';
        });
        markup += '|-\n';
    });
    markup += '|}';

    wiki.innerHTML = markup;
};

wiki.addEventListener("click", function(e) {
    // e.target.select();
});
