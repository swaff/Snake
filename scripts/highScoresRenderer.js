SNK.highScoresRenderer = (function () {

    /**
    Takes an aray of username/scores and using the specified
    template renders the data in the specified table body

    tableBodyId: The id of the tbody element in the table where the 
    data is to be displayed.

    templateId: The id of the jQuery template that is to be used 
    to dislay the high scores data

    scoresArrary: The array of scores to render
    */
    var render = function (tableBodyId, templateId, scoresArray) {

        // clear out the current contents of the table body
        $("#" + tableBodyId).empty();

        // render the tempalte for the array of scores
        $("#" + templateId).tmpl(scoresArray)
                .appendTo("#"+tableBodyId);
    };

    return {
        render: render
    };
})();