  /**
    @class
    <p>A statistical facet allows you to compute statistical data over a numeric fields. Statistical data includes
    the count, total, sum of squares, mean (average), minimum, maximum, variance, and standard deviation.</p>

    <p>Facets are similar to SQL <code>GROUP BY</code> statements but perform much
       better. You can also construct several <em>"groups"</em> at once by simply
       specifying multiple facets.</p>

    <div class="alert-message block-message info">
        <p>
            <strong>Tip: </strong>
            For more information on faceted navigation, see
            <a href="http://en.wikipedia.org/wiki/Faceted_classification">this</a>
            Wikipedia article on Faceted Classification.
        </p>
    </div>

    @name ejs.StatisticalFacet
    @ejs facet
    @borrows ejs.FacetMixin.facetFilter as facetFilter
    @borrows ejs.FacetMixin.global as global
    @borrows ejs.FacetMixin.mode as mode
    @borrows ejs.FacetMixin.cacheFilter as cacheFilter
    @borrows ejs.FacetMixin.scope as scope
    @borrows ejs.FacetMixin.nested as nested
    @borrows ejs.FacetMixin._type as _type
    @borrows ejs.FacetMixin.toJSON as toJSON

    @desc
    <p>A facet which returns statistical information about a numeric field</p>

    @param {String} name The name which be used to refer to this facet. For instance,
        the facet itself might utilize a field named <code>doc_authors</code>. Setting
        <code>name</code> to <code>Authors</code> would allow you to refer to the
        facet by that name, possibly simplifying some of the display logic.

    */
  ejs.StatisticalFacet = function (name) {

    var 
      _common = ejs.FacetMixin(name),
      facet = _common.toJSON();

    facet[name].statistical = {};

    return extend(_common, {

      /**
            Sets the field to be used to construct the this facet.

            @member ejs.StatisticalFacet
            @param {String} fieldName The field name whose data will be used to construct the facet.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      field: function (fieldName) {
        if (fieldName == null) {
          return facet[name].statistical.field;
        }
      
        facet[name].statistical.field = fieldName;
        return this;
      },

      /**
            Aggregate statistical info across a set of fields.

            @member ejs.StatisticalFacet
            @param {Array} aFieldName An array of field names.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      fields: function (fields) {
        if (fields == null) {
          return facet[name].statistical.fields;
        }
      
        if (!isArray(fields)) {
          throw new TypeError('Argument must be an array');
        }
        
        facet[name].statistical.fields = fields;
        return this;
      },

      /**
            Define a script to evaluate of which the result will be used to generate
            the statistical information.

            @member ejs.StatisticalFacet
            @param {String} code The script code to execute.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      script: function (code) {
        if (code == null) {
          return facet[name].statistical.script;
        }
      
        facet[name].statistical.script = code;
        return this;
      },

      /**
            The script language being used. Currently supported values are
            <code>javascript</code>, <code>groovy</code>, and <code>mvel</code>.

            @member ejs.StatisticalFacet
            @param {String} language The language of the script.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      lang: function (language) {
        if (language == null) {
          return facet[name].statistical.lang;
        }
      
        facet[name].statistical.lang = language;
        return this;
      },

      /**
            Allows you to set script parameters to be used during the execution of the script.

            @member ejs.StatisticalFacet
            @param {Object} oParams An object containing key/value pairs representing param name/value.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      params: function (oParams) {
        if (oParams == null) {
          return facet[name].statistical.params;
        }
      
        facet[name].statistical.params = oParams;
        return this;
      }
      
    });
  };
