  /**
    @class
    <p>TermSuggester suggests terms based on edit distance. The provided suggest 
    text is analyzed before terms are suggested. The suggested terms are 
    provided per analyzed suggest text token.  This leaves the suggest-selection 
    to the API consumer.  For a higher level suggester, please use the 
    <code>PhraseSuggester</code>.</p>

    @name ejs.TermSuggester

    @since elasticsearch 0.90
    
    @desc
    <p>A suggester that suggests terms based on edit distance.</p>

    @param {String} name The name which be used to refer to this suggester.
    */
  ejs.TermSuggester = function (name) {

    /**
        The internal suggest object.
        @member ejs.TermSuggester
        @property {Object} suggest
        */
    var suggest = {};
    suggest[name] = {term: {}};

    return {

      /**
            <p>Sets the text to get suggestions for.  If not set, the global
            suggestion text will be used.</p>

            @member ejs.TermSuggester
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
            <p>Allows you to serialize this object into a JSON encoded string.</p>

            @member ejs.TermSuggester
            @returns {String} returns this object as a serialized JSON string.
            */
      toString: function () {
        return JSON.stringify(suggest);
      },

      /**
            The type of ejs object.  For internal use only.
          
            @member ejs.TermSuggester
            @returns {String} the type of object
            */
      _type: function () {
        return 'suggest';
      },
    
      /**
            <p>Retrieves the internal <code>suggest</code> object. This is typically used by
               internal API functions so use with caution.</p>

            @member ejs.TermSuggester
            @returns {String} returns this object's internal <code>suggest</code> property.
            */
      _self: function () {
        return suggest;
      }
    };
  };
