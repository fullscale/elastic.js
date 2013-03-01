  /**
    @class
    <p>PhraseSuggester extends the <code>TermSuggester</code> and suggests
    entire corrected phrases instead of individual tokens.  The individual
    phrase suggestions are weighted based on ngram-langugage models. In practice 
    it will be able to make better decision about which tokens to pick based on 
    co-occurence and frequencies.</p>

    @name ejs.PhraseSuggester

    @since elasticsearch 0.90
    
    @desc
    <p>A suggester that suggests entire corrected phrases.</p>

    @param {String} name The name which be used to refer to this suggester.
    */
  ejs.PhraseSuggester = function (name) {

    /**
        The internal suggest object.
        @member ejs.PhraseSuggester
        @property {Object} suggest
        */
    var suggest = {};
    suggest[name] = {phrase: {}};

    return {

      /**
            <p>Sets the text to get suggestions for.  If not set, the global
            suggestion text will be used.</p>

            @member ejs.PhraseSuggester
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

            @member ejs.PhraseSuggester
            @returns {String} returns this object as a serialized JSON string.
            */
      toString: function () {
        return JSON.stringify(suggest);
      },

      /**
            The type of ejs object.  For internal use only.
          
            @member ejs.PhraseSuggester
            @returns {String} the type of object
            */
      _type: function () {
        return 'suggest';
      },
    
      /**
            <p>Retrieves the internal <code>suggest</code> object. This is typically used by
               internal API functions so use with caution.</p>

            @member ejs.PhraseSuggester
            @returns {String} returns this object's internal <code>suggest</code> property.
            */
      _self: function () {
        return suggest;
      }
    };
  };
