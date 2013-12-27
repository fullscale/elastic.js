  /**
    @class
    @suggester
    <p>The completion suggester is a so-called prefix suggester. It does not do spell 
    correction like the term or phrase suggesters but allows basic auto-complete functionality.</p>

    @name ejs.CompletionSuggester
    @ejs suggest
    @borrows ejs.SuggesterMixin.text as text
    @borrows ejs.SuggesterMixin._type as _type
    @borrows ejs.SuggesterMixin.toJSON as toJSON
    @borrows ejs.SuggestContextMixin.analyzer as analyzer
    @borrows ejs.SuggestContextMixin.field as field
    @borrows ejs.SuggestContextMixin.size as size
    @borrows ejs.SuggestContextMixin.shardSize as shardSize
  
    @since elasticsearch 0.90.4
  
    @desc
    <p>A suggester that allows basic auto-complete functionality.</p>

    @param {String} name The name which be used to refer to this suggester.
    */
  ejs.CompletionSuggester = function (name) {

    var
      _context,
      _common = ejs.SuggesterMixin(name),
      suggest = _common.toJSON();
    
    suggest[name].completion = {};
    _context = ejs.SuggestContextMixin(suggest[name].completion);
  
    return extend(_common, _context, {
    
      /**
            <p>Enable fuzzy completions which means a can spell a word
            incorrectly and still get a suggestion.</p>

            @member ejs.CompletionSuggester
            @param {Boolean} trueFalse true to enable fuzzy completions, false to disable.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      fuzzy: function (trueFalse) {
        if (trueFalse == null) {
          return suggest[name].completion.fuzzy;
        }
      
        if (trueFalse && suggest[name].completion.fuzzy == null) {
          suggest[name].completion.fuzzy = {};
        } else if (!trueFalse && suggest[name].completion.fuzzy != null) {
          delete suggest[name].completion.fuzzy;
        }
      
        return this;
      },
    
      /**
            <p>Sets if transpositions should be counted as one or two changes, defaults 
            to true when fuzzy is enabled.  Automatically enables fuzzy suggestions
            when set to any value.</p>

            @member ejs.CompletionSuggester
            @param {Boolean} trueFalse true to enable transpositions.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      transpositions: function (trueFalse) {
        if (suggest[name].completion.fuzzy == null) {
          suggest[name].completion.fuzzy = {};
        }
      
        if (trueFalse == null) {
          return suggest[name].completion.fuzzy.transpositions;
        }
      
        suggest[name].completion.fuzzy.transpositions = trueFalse;
        return this;
      },
    
      /**
            <p>Sets all are measurements (like edit distance, transpositions and lengths) 
            in unicode code points (actual letters) instead of bytes.  Automatically 
            enables fuzzy suggestions when set to any value.</p>

            @member ejs.CompletionSuggester
            @param {Boolean} trueFalse true to set unicode aware, false to disable.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      unicodeAware: function (trueFalse) {
        if (suggest[name].completion.fuzzy == null) {
          suggest[name].completion.fuzzy = {};
        }
      
        if (trueFalse == null) {
          return suggest[name].completion.fuzzy.unicode_aware;
        }
      
        suggest[name].completion.fuzzy.unicode_aware = trueFalse;
        return this;
      },
    
      /**
            <p>Maximum edit distance (fuzziness), defaults to 1.  Automatically 
            enables fuzzy suggestions when set to any value.</p>

            @member ejs.CompletionSuggester
            @param {Integer} d A positive integer value.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      editDistance: function (d) {
        if (suggest[name].completion.fuzzy == null) {
          suggest[name].completion.fuzzy = {};
        }
      
        if (d == null) {
          return suggest[name].completion.fuzzy.edit_distance;
        }
      
        suggest[name].completion.fuzzy.edit_distance = d;
        return this;
      },
    
      /**
            <p>Minimum length of the input before fuzzy suggestions are returned, defaults 
            to 3.  Automatically enables fuzzy suggestions when set to any value.</p>

            @member ejs.CompletionSuggester
            @param {Integer} m A positive integer value.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      minLength: function (m) {
        if (suggest[name].completion.fuzzy == null) {
          suggest[name].completion.fuzzy = {};
        }
      
        if (m == null) {
          return suggest[name].completion.fuzzy.min_length;
        }
      
        suggest[name].completion.fuzzy.min_length = m;
        return this;
      },
    
      /**
            <p>Minimum length of the input, which is not checked for fuzzy alternatives, defaults 
            to 1.  Automatically enables fuzzy suggestions when set to any value.</p>

            @member ejs.CompletionSuggester
            @param {Integer} l A positive integer value.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      prefixLength: function (l) {
        if (suggest[name].completion.fuzzy == null) {
          suggest[name].completion.fuzzy = {};
        }
      
        if (l == null) {
          return suggest[name].completion.fuzzy.prefix_length;
        }
      
        suggest[name].completion.fuzzy.prefix_length = l;
        return this;
      }
    
    });
  };
