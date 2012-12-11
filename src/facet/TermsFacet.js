  /**
    @class
    <p>A facet which returns the N most frequent terms within a collection
       or set of collections. Term facets are useful for building constructs
       which allow users to refine search results by filtering on terms returned
       by the facet.</p>

    <p>Facets are similar to SQL <code>GROUP BY</code> statements but perform much
       better. You can also construct several <em>"groups"</em> at once by simply
       specifying multiple facets.</p>

    <p>For more information on faceted navigation, see this Wikipedia article on
       <a href="http://en.wikipedia.org/wiki/Faceted_classification">Faceted Classification</a></p<

    @name ejs.TermsFacet

    @desc
    <p>A facet which returns the N most frequent terms within a collection
       or set of collections.</p>

    @param {String} name The name which be used to refer to this facet. For instance,
        the facet itself might utilize a field named <code>doc_authors</code>. Setting
        <code>name</code> to <code>Authors</code> would allow you to refer to the
        facet by that name, possibly simplifying some of the display logic.

    */
  ejs.TermsFacet = function (name) {

    /**
        The internal facet object.
        @member ejs.TermsFacet
        @property {Object} facet
        */
    var facet = {};

    facet[name] = {
      terms: {}
    };

    return {

      /**
            Sets the field to be used to construct the this facet.

            @member ejs.TermsFacet
            @param {String} fieldName The field name whose data will be used to construct the facet.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      field: function (fieldName) {
        if (fieldName == null) {
          return facet[name].terms.field;
        }
      
        facet[name].terms.field = fieldName;
        return this;
      },

      /**
            Sets the number of facet entries that will be returned for this facet. For instance, you
            might ask for only the top 5 <code>authors</code> although there might be hundreds of
            unique authors.

            @member ejs.TermsFacet
            @param {Integer} facetSize The numer of facet entries to be returned.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      size: function (facetSize) {
        if (facetSize == null) {
          return facet[name].terms.size;
        }
      
        facet[name].terms.size = facetSize;
        return this;
      },

      /**
            <p>Allows you to define the ordering by which facets are returned. For example, you might
            want facet entries order by their frequency <em>(i.e., count)</em> or you may need them
            ordered alhpabetically.</p>

            <p>Possible ordering is <code>count, term, reverse_count,</code> and <code>reverse_term</code>.
            The default ordering is by <code>count</code>.</p>

            @member ejs.TermsFacet
            @param {String} sortOrder The numer of facet entries to be returned.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      order: function (sortOrder) {
        if (sortOrder == null) {
          return facet[name].terms.order;
        }
      
        facet[name].terms.order = sortOrder;
        return this;
      },

      /**
            <p>Allows you to return all terms, even if the frequency count is 0. This should not be
               used on fields that contain a large number of unique terms because it could cause
               <em>out-of-memory</em> errors.</p>

            @member ejs.TermsFacet
            @param {String} trueFalse <code>true</code> or <code>false</code>
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      allTerms: function (trueFalse) {
        if (trueFalse == null) {
          return facet[name].terms.all_terms;
        }
      
        facet[name].terms.all_terms = trueFalse;
        return this;
      },

      /**
            <p>Allows you to filter out unwanted facet entries.</p>

            @member ejs.TermsFacet
            @param {String ...args} args A variable length ist of terms to exclude.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      exclude: function () {
        if (arguments.length === 0) {
          return facet[name].terms.exclude;
        }
      
        facet[name].terms.exclude = [];
        for (var i = 0; i < arguments.length; i++) {
          facet[name].terms.exclude.push(arguments[i]._self());
        }
        return this;
      },

      /**
            <p>Allows you to only include facet entries matching a specified regular expression.</p>

            @member ejs.TermsFacet
            @param {String} exp A valid regular expression.
            @param {String} flags A valid regex flag - see <a href="http://docs.oracle.com/javase/6/docs/api/java/util/regex/Pattern.html#field_summary">Java Pattern API</a>
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      regex: function (exp, flags) {
        if (arguments.length === 0) {
          return {
            exp: facet[name].terms.regex,
            flags: facet[name].terms.regex_flags
          };
        }
      
        facet[name].terms.regex = exp;
        if (flags != null) {
          facet[name].terms.regex_flags = flags;
        }
      
        return this;
      },

      /**
            <p>Allows you to reduce the documents used for computing facet results.</p>

            @member ejs.TermsFacet
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

            @member ejs.TermsFacet
            @returns {String} returns this object as a serialized JSON string.
            */
      toString: function () {
        return JSON.stringify(facet);
      },

      /**
            The type of ejs object.  For internal use only.
            
            @member ejs.TermsFacet
            @returns {String} the type of object
            */
      _type: function () {
        return 'facet';
      },
      
      /**
            <p>Retrieves the internal <code>facet</code> property. This is typically used by
               internal API functions so use with caution.</p>

            @member ejs.TermsFacet
            @returns {String} returns this object's internal <code>facet</code> property.
            */
      _self: function () {
        return facet;
      }
    };
  };
