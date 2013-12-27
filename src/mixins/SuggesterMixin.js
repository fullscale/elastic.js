  /**
    @mixin
    <p>The SuggesterMixin provides support for the base setting of all suggesters. 
    This object should not be used directly.</p>

    @name ejs.SuggesterMixin
  
    @param {String} name The name of the suggester.
    */
  ejs.SuggesterMixin = function (name) {
  
    var suggest = {};
    suggest[name] = {};

    return {
  
      /**
            <p>Sets the text to get suggestions for.  If not set, the global
            suggestion text will be used.</p>

            @member ejs.SuggesterMixin
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
            The type of ejs object.  For internal use only.
        
            @member ejs.SuggesterMixin
            @returns {String} the type of object
            */
      _type: function () {
        return 'suggest';
      },
  
      /**
            <p>Retrieves the internal <code>suggest</code> object. This is typically used by
               internal API functions so use with caution.</p>

            @member ejs.SuggesterMixin
            @returns {String} returns this object's internal <code>suggest</code> property.
            */
      toJSON: function () {
        return suggest;
      }
    
    };
  };
