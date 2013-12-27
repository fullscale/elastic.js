  /**
    @class
    <p>Wrapper to allow SpanQuery objects participate in composite single-field 
    SpanQueries by 'lying' about their search field. That is, the masked 
    SpanQuery will function as normal, but when asked for the field it 
    queries against, it will return the value specified as the masked field vs.
    the real field used in the wrapped span query.</p>

    @name ejs.FieldMaskingSpanQuery
    @ejs query
    @borrows ejs.QueryMixin.boost as boost
    @borrows ejs.QueryMixin._type as _type
    @borrows ejs.QueryMixin.toJSON as toJSON

    @desc
    Wraps a SpanQuery and hides the real field being searched across.

    @param {Query} spanQry A valid SpanQuery
    @param {Integer} field the maximum field position in a match.
  
    */
  ejs.FieldMaskingSpanQuery = function (spanQry, field) {

    if (!isQuery(spanQry)) {
      throw new TypeError('Argument must be a SpanQuery');
    }
  
    var 
      _common = ejs.QueryMixin('field_masking_span'),
      query = _common.toJSON();
    
    query.field_masking_span.query = spanQry.toJSON();
    query.field_masking_span.field = field;

    return extend(_common, {

      /**
            Sets the span query to wrap.

            @member ejs.FieldMaskingSpanQuery
            @param {Query} spanQuery Any valid span type query.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      query: function (spanQuery) {
        if (spanQuery == null) {
          return query.field_masking_span.query;
        }
    
        if (!isQuery(spanQuery)) {
          throw new TypeError('Argument must be a SpanQuery');
        }
      
        query.field_masking_span.query = spanQuery.toJSON();
        return this;
      },

      /**
            Sets the value of the "masked" field.  

            @member ejs.FieldMaskingSpanQuery
            @param {String} f A field name the wrapped span query should use
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      field: function (f) {
        if (f == null) {
          return query.field_masking_span.field;
        }
    
        query.field_masking_span.field = f;
        return this;
      }
      
    });
  };
