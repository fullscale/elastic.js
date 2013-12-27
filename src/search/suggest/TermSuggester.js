  /**
    @class
    <p>TermSuggester suggests terms based on edit distance. The provided suggest 
    text is analyzed before terms are suggested. The suggested terms are 
    provided per analyzed suggest text token.  This leaves the suggest-selection 
    to the API consumer.  For a higher level suggester, please use the 
    <code>PhraseSuggester</code>.</p>

    @name ejs.TermSuggester
    @ejs suggest
    @borrows ejs.SuggesterMixin.text as text
    @borrows ejs.SuggesterMixin._type as _type
    @borrows ejs.SuggesterMixin.toJSON as toJSON
    @borrows ejs.DirectSettingsMixin.accuracy as accuracy
    @borrows ejs.DirectSettingsMixin.suggestMode as suggestMode
    @borrows ejs.DirectSettingsMixin.sort as sort
    @borrows ejs.DirectSettingsMixin.stringDistance as stringDistance
    @borrows ejs.DirectSettingsMixin.maxEdits as maxEdits
    @borrows ejs.DirectSettingsMixin.maxInspections as maxInspections
    @borrows ejs.DirectSettingsMixin.maxTermFreq as maxTermFreq
    @borrows ejs.DirectSettingsMixin.prefixLength as prefixLength
    @borrows ejs.DirectSettingsMixin.minWordLen as minWordLen
    @borrows ejs.DirectSettingsMixin.minDocFreq as minDocFreq
    @borrows ejs.SuggestContextMixin.analyzer as analyzer
    @borrows ejs.SuggestContextMixin.field as field
    @borrows ejs.SuggestContextMixin.size as size
    @borrows ejs.SuggestContextMixin.shardSize as shardSize

    @since elasticsearch 0.90
    
    @desc
    <p>A suggester that suggests terms based on edit distance.</p>

    @param {String} name The name which be used to refer to this suggester.
    */
  ejs.TermSuggester = function (name) {

    var
      _direct,
      _context,
      _common = ejs.SuggesterMixin(name),
      suggest = _common.toJSON();  
    
    suggest[name].term = {};
    _direct = ejs.DirectSettingsMixin(suggest[name].term);
    _context = ejs.SuggestContextMixin(suggest[name].term);

    return extend(_common, _direct, _context);
  };
