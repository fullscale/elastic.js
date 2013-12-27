  /**
    @class
    <p>A RangeFacet allows you to specify a set of ranges and get both the number of docs (count) that
       fall within each range, and aggregated data based on the field, or another specified field.</p>

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

    @name ejs.RangeFacet
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
    <p>A facet which provides information over a range of numeric intervals.</p>

    @param {String} name The name which be used to refer to this facet. For instance,
        the facet itself might utilize a field named <code>doc_authors</code>. Setting
        <code>name</code> to <code>Authors</code> would allow you to refer to the
        facet by that name, possibly simplifying some of the display logic.

    */
  ejs.RangeFacet = function (name) {

    var 
      _common = ejs.FacetMixin(name),
      facet = _common.toJSON();

    facet[name].range = {
      ranges: []
    };

    return extend(_common, {

      /**
            Sets the document field to be used for the facet.

            @member ejs.RangeFacet
            @param {String} fieldName The field name whose data will be used to compute the interval.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      field: function (fieldName) {
        if (fieldName == null) {
          return facet[name].range.field;
        }
      
        facet[name].range.field = fieldName;
        return this;
      },

      /**
            Allows you to specify an alternate key field to be used to compute the interval.

            @member ejs.RangeFacet
            @param {String} fieldName The field name whose data will be used to compute the interval.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      keyField: function (fieldName) {
        if (fieldName == null) {
          return facet[name].range.key_field;
        }
      
        facet[name].range.key_field = fieldName;
        return this;
      },

      /**
            Allows you to specify an alternate value field to be used to compute statistical information.

            @member ejs.RangeFacet
            @param {String} fieldName The field name whose data will be used to compute statistics.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      valueField: function (fieldName) {
        if (fieldName == null) {
          return facet[name].range.value_field;
        }
      
        facet[name].range.value_field = fieldName;
        return this;
      },

      /**
            Allows you modify the <code>value</code> field using a script. The modified value
            is then used to compute the statistical data.

            @member ejs.RangeFacet
            @param {String} scriptCode A valid script string to execute.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      valueScript: function (scriptCode) {
        if (scriptCode == null) {
          return facet[name].range.value_script;
        }
      
        facet[name].range.value_script = scriptCode;
        return this;
      },

      /**
            Allows you modify the <code>key</code> field using a script. The modified value
            is then used to generate the interval.

            @member ejs.RangeFacet
            @param {String} scriptCode A valid script string to execute.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      keyScript: function (scriptCode) {
        if (scriptCode == null) {
          return facet[name].range.key_script;
        }
      
        facet[name].range.key_script = scriptCode;
        return this;
      },

      /**
            The script language being used. Currently supported values are
            <code>javascript</code>, <code>groovy</code>, and <code>mvel</code>.

            @member ejs.RangeFacet
            @param {String} language The language of the script.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      lang: function (language) {
        if (language == null) {
          return facet[name].range.lang;
        }
      
        facet[name].range.lang = language;
        return this;
      },

      /**
            Sets parameters that will be applied to the script.  Overwrites 
            any existing params.

            @member ejs.RangeFacet
            @param {Object} p An object where the keys are the parameter name and 
              values are the parameter value.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      params: function (p) {
        if (p == null) {
          return facet[name].range.params;
        }
    
        facet[name].range.params = p;
        return this;
      },
      
      /**
            Adds a new bounded range.

            @member ejs.RangeFacet
            @param {Number} from The lower bound of the range (can also be <code>Date</code>).
            @param {Number} to The upper bound of the range (can also be <code>Date</code>).
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      addRange: function (from, to) {
        if (arguments.length === 0) {
          return facet[name].range.ranges;
        }
      
        facet[name].range.ranges.push({
          from: from,
          to: to
        });
        
        return this;
      },

      /**
            Adds a new unbounded lower limit.

            @member ejs.RangeFacet
            @param {Number} from The lower limit of the unbounded range (can also be <code>Date</code>).
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      addUnboundedFrom: function (from) {
        if (from == null) {
          return facet[name].range.ranges;
        }
      
        facet[name].range.ranges.push({
          from: from
        });
        
        return this;
      },

      /**
            Adds a new unbounded upper limit.

            @member ejs.RangeFacet
            @param {Number} to The upper limit of the unbounded range (can also be <code>Date</code>).
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      addUnboundedTo: function (to) {
        if (to == null) {
          return facet[name].range.ranges;
        }
      
        facet[name].range.ranges.push({
          to: to
        });
        
        return this;
      }
      
    });
  };
