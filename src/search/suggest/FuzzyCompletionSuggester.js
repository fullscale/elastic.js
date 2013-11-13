  /**
    @class
    <p>FuzzyCompletionSuggester provides the same functionality
    as <code>CompletionSuggester</code> but allows fuzzy queries.</p>

    @name ejs.FuzzyCompletionSuggester

    @since elasticsearch 0.90.4
    
    @desc
    <p>The completion suggester is a so-called prefix suggester. 
    It does not do spell correction like the <code>TermSuggester</code> 
    and <code>PhraseSuggester</code> but allows basic auto-complete 
    functionality.</p>

    @param {String} name The name which be used to refer to this suggester.
    */
  ejs.FuzzyCompletionSuggester = function (name) {

    /**
        The internal suggest object.
        @member ejs.FuzzyCompletionSuggester
        @property {Object} suggest
        */
    var suggest = {};
    suggest[name] = {completion: { fuzzy : {}}};

    return {

      /**
            <p>Sets the text to get suggestions for.  If not set, the global
            suggestion text will be used.</p>

            @member ejs.FuzzyCompletionSuggester
            @param {String} txt A string to get suggestions for.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      text: function (txt) {
        if (txt == null) {
          return suggest[name].text;
        }
    
        suggest[name].text = txt;
        return this;
      },
      
      /**
            <p>Sets the field used to generate suggestions from.</p>

            @member ejs.FuzzyCompletionSuggester
            @param {String} field A valid field name <b>of type completion</b>.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      field: function (field) {
        if (field == null) {
          return suggest[name].completion.field;
        }
    
        suggest[name].completion.field = field;
        return this;
      },
      
      /**
            <p>The completion suggester also supports fuzzy queries.
            <code>editDistance</code> set the aaximum edit distance, 
            defaults to 1</p>

            @member ejs.FuzzyCompletionSuggester
            @param {Integer} distance A value for maximum edit distance.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      editDistance: function (distance) {
        if (distance == null) {
          return suggest[name].completion.fuzzy.edit_distance;
        }
    
        suggest[name].completion.fuzzy.edit_distance = distance;
        return this;
      },

      /**
            <p>Sets if transpositions should be counted as one or two changes, 
            defaults to true</p>

            @member ejs.FuzzyCompletionSuggester
            @param {Bool} transpositions Specifies if transpositions 
            should be counted as one or two changes
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      transpositions: function (transpositions) {
        if (transpositions == null) {
          return suggest[name].completion.fuzzy.transpositions;
        }
    
        suggest[name].completion.fuzzy.transpositions = transpositions;
        return this;
      },

      /**
            <p>Minimum length of the input before fuzzy suggestions are 
            returned, defaults 3</p>

            @member ejs.FuzzyCompletionSuggester
            @param {Integer} minLength Minimum length of input before fuzzy suggestions
            are returned
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      minLength: function (minLength) {
        if (minLength == null) {
          return suggest[name].completion.fuzzy.min_length;
        }
    
        suggest[name].completion.fuzzy.min_length = minLength;
        return this;
      },

      /**
            <p>Minimum length of the input, which is not checked for 
            fuzzy alternatives, defaults to 1</p>

            @member ejs.FuzzyCompletionSuggester
            @param {Integer} prefLength Minimum length of input not checked for 
            fuzzy alternatives
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      prefixLength: function (prefLength) {
        if (prefLength == null) {
          return suggest[name].completion.fuzzy.prefix_length;
        }
    
        suggest[name].completion.fuzzy.prefix_length = prefLength;
        return this;
      },

      /**
            <p>Allows you to serialize this object into a JSON encoded string.</p>

            @member ejs.FuzzyCompletionSuggester
            @returns {String} returns this object as a serialized JSON string.
            */
      toString: function () {
        return JSON.stringify(suggest);
      },

      /**
            The type of ejs object.  For internal use only.
          
            @member ejs.FuzzyCompletionSuggester
            @returns {String} the type of object
            */
      _type: function () {
        return 'suggest';
      },
    
      /**
            <p>Retrieves the internal <code>suggest</code> object. This is typically used by
               internal API functions so use with caution.</p>

            @member ejs.FuzzyCompletionSuggester
            @returns {String} returns this object's internal <code>suggest</code> property.
            */
      _self: function () {
        return suggest;
      }
    };
  };
