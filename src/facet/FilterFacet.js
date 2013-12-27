  /**
    @class
    <p>The FilterFacet allows you to specify any valid <code>Filter</code> and
    have the number of matching hits returned as the value.</p>

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

    @name ejs.FilterFacet
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
    <p>A facet that return a count of the hits matching the given filter.</p>

    @param {String} name The name which be used to refer to this facet. For instance,
        the facet itself might utilize a field named <code>doc_authors</code>. Setting
        <code>name</code> to <code>Authors</code> would allow you to refer to the
        facet by that name, possibly simplifying some of the display logic.

    */
  ejs.FilterFacet = function (name) {

    var
      _common = ejs.FacetMixin(name),
      facet = _common.toJSON();

    return extend(_common, {

      /**
            <p>Sets the filter to be used for this facet.</p>

            @member ejs.FilterFacet
            @param {Object} oFilter A valid <code>Query</code> object.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      filter: function (oFilter) {
        if (oFilter == null) {
          return facet[name].filter;
        }
      
        if (!isFilter(oFilter)) {
          throw new TypeError('Argument must be a Filter');
        }
        
        facet[name].filter = oFilter.toJSON();
        return this;
      }
      
    });
  };
