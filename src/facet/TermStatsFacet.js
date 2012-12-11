  /**
    @class
    <p>A termsStatsFacet allows you to compute statistics over an aggregate key (term). Essentially this
    facet provides the functionality of what is often refered to as a <em>pivot table</em>.</p>

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

    <p><strong>Note:</strong> This module contains a related code example.&nbsp;
    <a target="_blank" class="btn c9" href="https://gist.github.com/1895130">View Code Example</a></p>

    @name ejs.TermStatsFacet

    @desc
    <p>A facet which computes statistical data based on an aggregate key.</p>

    @param {String} name The name which be used to refer to this facet. For instance,
        the facet itself might utilize a field named <code>doc_authors</code>. Setting
        <code>name</code> to <code>Authors</code> would allow you to refer to the
        facet by that name, possibly simplifying some of the display logic.

    */
  ejs.TermStatsFacet = function (name) {

    /**
        The internal facet object.
        @member ejs.TermStatsFacet
        @property {Object} facet
        */
    var facet = {};

    facet[name] = {
      terms_stats: {}
    };

    return {

      /**
            Sets the field for which statistical information will be generated.

            @member ejs.TermStatsFacet
            @param {String} fieldName The field name whose data will be used to construct the facet.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      valueField: function (fieldName) {
        if (fieldName == null) {
          return facet[name].terms_stats.value_field;
        }
      
        facet[name].terms_stats.value_field = fieldName;
        return this;
      },

      /**
            Sets the field which will be used to pivot on (group-by).

            @member ejs.TermStatsFacet
            @param {String} fieldName The field name whose data will be used to construct the facet.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      keyField: function (fieldName) {
        if (fieldName == null) {
          return facet[name].terms_stats.key_field;
        }
      
        facet[name].terms_stats.key_field = fieldName;
        return this;
      },

      /**
            Define a script to evaluate of which the result will be used to generate
            the statistical information.

            @member ejs.TermStatsFacet
            @param {String} code The script code to execute.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      valueScript: function (code) {
        if (code == null) {
          return facet[name].terms_stats.value_script;
        }
      
        facet[name].terms_stats.value_script = code;
        return this;
      },

      /**
            The script language being used. Currently supported values are
            <code>javascript</code>, <code>groovy</code>, and <code>mvel</code>.

            @member ejs.TermStatsFacet
            @param {String} language The language of the script.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      lang: function (language) {
        if (language == null) {
          return facet[name].terms_stats.lang;
        }
      
        facet[name].terms_stats.lang = language;
        return this;
      },

      /**
            Allows you to set script parameters to be used during the execution of the script.

            @member ejs.TermStatsFacet
            @param {Object} oParams An object containing key/value pairs representing param name/value.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      params: function (oParams) {
        if (oParams == null) {
          return facet[name].terms_stats.params;
        }
      
        facet[name].terms_stats.params = oParams;
        return this;
      },

      /**
            Sets the number of facet entries that will be returned for this facet. For instance, you
            might ask for only the top 5 aggregate keys although there might be hundreds of
            unique keys. <strong>Higher settings could cause memory strain</strong>.

            @member ejs.TermStatsFacet
            @param {Integer} facetSize The numer of facet entries to be returned.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      size: function (facetSize) {
        if (facetSize == null) {
          return facet[name].terms_stats.size;
        }
      
        facet[name].terms_stats.size = facetSize;
        return this;
      },

      /**
            Sets the order in which facets are returned.

            @member ejs.TermStatsFacet
            @param {String} ordering Valid options are <code>term, reverse_term, count, reverse_count, total, reverse_total, min, reverse_min, max, reverse_max</code>. Defaults to <code>term</code>.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      order: function (ordering) {
        if (ordering == null) {
          return facet[name].terms_stats.order;
        }
      
        facet[name].terms_stats.order = ordering;
        return this;
      },

      /**
            <p>Allows you to reduce the documents used for computing facet results.</p>

            @member ejs.TermStatsFacet
            @param {Object} oFilter A valid <code>Filter</code> object.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      filter: function (oFilter) {
        if (oFilter == null) {
          return facet[name].facet_filter;
        }
      
        facet[name].facet_filter = oFilter._self();
        return this;
      },

      /**
            <p>Allows you to serialize this object into a JSON encoded string.</p>

            @member ejs.TermStatsFacet
            @returns {String} returns this object as a serialized JSON string.
            */
      toString: function () {
        return JSON.stringify(facet);
      },

      /**
            The type of ejs object.  For internal use only.
            
            @member ejs.TermStatsFacet
            @returns {String} the type of object
            */
      _type: function () {
        return 'facet';
      },
      
      /**
            <p>Retrieves the internal <code>facet</code> object. This is typically used by
               internal API functions so use with caution.</p>

            @member ejs.TermStatsFacet
            @returns {String} returns this object's internal <code>facet</code> property.
            */
      _self: function () {
        return facet;
      }
    };
  };
