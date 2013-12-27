  /**
    @mixin
    <p>The SuggestContextMixin provides support for suggest context settings 
    across various <code>Suggester</code> implementations.  This object should not be 
    used directly.</p>

    @name ejs.SuggestContextMixin
  
    @param {String} settings The object to set the options on.
    */
  ejs.SuggestContextMixin = function (settings) {

    return {
    
      /**
            <p>Sets analyzer used to analyze the suggest text.</p>

            @member ejs.SuggestContextMixin
            @param {String} analyzer A valid analyzer name.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      analyzer: function (analyzer) {
        if (analyzer == null) {
          return settings.analyzer;
        }
  
        settings.analyzer = analyzer;
        return this;
      },
    
      /**
            <p>Sets the field used to generate suggestions from.</p>

            @member ejs.SuggestContextMixin
            @param {String} field A valid field name.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      field: function (field) {
        if (field == null) {
          return settings.field;
        }
  
        settings.field = field;
        return this;
      },
    
      /**
            <p>Sets the number of suggestions returned for each token.</p>

            @member ejs.SuggestContextMixin
            @param {Integer} s A positive integer value.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      size: function (s) {
        if (s == null) {
          return settings.size;
        }
  
        settings.size = s;
        return this;
      },
    
      /**
            <p>Sets the maximum number of suggestions to be retrieved from 
            each individual shard.</p>

            @member ejs.SuggestContextMixin
            @param {Integer} s A positive integer value.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      shardSize: function (s) {
        if (s == null) {
          return settings.shard_size;
        }
  
        settings.shard_size = s;
        return this;
      }
      
    };
  };
