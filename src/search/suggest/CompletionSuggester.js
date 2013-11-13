  /**
    @class
    <p>CompletionSuggester provides basic, but fast, auto-complete
    functionality.</p>

    @name ejs.CompletionSuggester

    @since elasticsearch 0.90.3
    
    @desc
    <p>The completion suggester is a so-called prefix suggester. 
    It does not do spell correction like the <code>TermSuggester</code> 
    and <code>PhraseSuggester</code> but allows basic auto-complete 
    functionality.</p>

    @param {String} name The name which be used to refer to this suggester.
    */
  ejs.CompletionSuggester = function (name) {

    /**
        The internal suggest object.
        @member ejs.CompletionSuggester
        @property {Object} suggest
        */
    var suggest = {};
    suggest[name] = {completion: {}};

    return {

      /**
            <p>Sets the text to get suggestions for.  If not set, the global
            suggestion text will be used.</p>

            @member ejs.CompletionSuggester
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

            @member ejs.CompletionSuggester
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
            <p>Allows you to serialize this object into a JSON encoded string.</p>

            @member ejs.CompletionSuggester
            @returns {String} returns this object as a serialized JSON string.
            */
      toString: function () {
        return JSON.stringify(suggest);
      },

      /**
            The type of ejs object.  For internal use only.
          
            @member ejs.CompletionSuggester
            @returns {String} the type of object
            */
      _type: function () {
        return 'suggest';
      },
    
      /**
            <p>Retrieves the internal <code>suggest</code> object. This is typically used by
               internal API functions so use with caution.</p>

            @member ejs.CompletionSuggester
            @returns {String} returns this object's internal <code>suggest</code> property.
            */
      _self: function () {
        return suggest;
      }
    };
  };
