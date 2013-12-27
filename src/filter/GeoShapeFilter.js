  /**
    @class
    <p>Efficient filtering of documents containing shapes indexed using the 
    geo_shape type.</p>

    <p>Much like the geo_shape type, the geo_shape filter uses a grid square 
    representation of the filter shape to find those documents which have shapes 
    that relate to the filter shape in a specified way. In order to do this, the 
    field being queried must be of geo_shape type. The filter will use the same 
    PrefixTree configuration as defined for the field.</p>

    @name ejs.GeoShapeFilter
    @ejs filter
    @borrows ejs.FilterMixin.name as name
    @borrows ejs.FilterMixin.cache as cache
    @borrows ejs.FilterMixin.cacheKey as cacheKey
    @borrows ejs.FilterMixin._type as _type
    @borrows ejs.FilterMixin.toJSON as toJSON

    @desc
    A Filter to find documents with a geo_shapes matching a specific shape.

    */
  ejs.GeoShapeFilter = function (field) {

    var
      _common = ejs.FilterMixin('geo_shape'),
      filter = _common.toJSON();
    
    filter.geo_shape[field] = {};

    return extend(_common, {

      /**
            Sets the field to filter against.

            @member ejs.GeoShapeFilter
            @param {String} f A valid field name.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      field: function (f) {
        var oldValue = filter.geo_shape[field];
  
        if (f == null) {
          return field;
        }

        delete filter.geo_shape[field];
        field = f;
        filter.geo_shape[f] = oldValue;
  
        return this;
      },

      /**
            Sets the shape

            @member ejs.GeoShapeFilter
            @param {String} shape A valid <code>Shape</code> object.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      shape: function (shape) {
        if (shape == null) {
          return filter.geo_shape[field].shape;
        }

        if (filter.geo_shape[field].indexed_shape != null) {
          delete filter.geo_shape[field].indexed_shape;
        }
      
        filter.geo_shape[field].shape = shape.toJSON();
        return this;
      },

      /**
            Sets the indexed shape.  Use this if you already have shape definitions
            already indexed.

            @member ejs.GeoShapeFilter
            @param {String} indexedShape A valid <code>IndexedShape</code> object.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      indexedShape: function (indexedShape) {
        if (indexedShape == null) {
          return filter.geo_shape[field].indexed_shape;
        }

        if (filter.geo_shape[field].shape != null) {
          delete filter.geo_shape[field].shape;
        }
      
        filter.geo_shape[field].indexed_shape = indexedShape.toJSON();
        return this;
      },

      /**
            Sets the shape relation type.  A relationship between a Query Shape 
            and indexed Shapes that will be used to determine if a Document 
            should be matched or not.  Valid values are:  intersects, disjoint,
            and within.

            @member ejs.GeoShapeFilter
            @param {String} indexedShape A valid <code>IndexedShape</code> object.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      relation: function (relation) {
        if (relation == null) {
          return filter.geo_shape[field].relation;
        }

        relation = relation.toLowerCase();
        if (relation === 'intersects' || relation === 'disjoint' || relation === 'within') {
          filter.geo_shape[field].relation = relation;
        }
    
        return this;
      },

      /**
            <p>Sets the spatial strategy.</p>  
            <p>Valid values are:</p>
            
            <dl>
                <dd><code>recursive</code> - default, recursively traverse nodes in
                  the spatial prefix tree.  This strategy has support for 
                  searching non-point shapes.</dd>
                <dd><code>term</code> - uses a large TermsFilter on each node
                  in the spatial prefix tree.  It only supports the search of 
                  indexed Point shapes.</dd>
            </dl>

            <p>This is an advanced setting, use with care.</p>
            
            @since elasticsearch 0.90
            @member ejs.GeoShapeFilter
            @param {String} strategy The strategy as a string.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      strategy: function (strategy) {
        if (strategy == null) {
          return filter.geo_shape[field].strategy;
        }

        strategy = strategy.toLowerCase();
        if (strategy === 'recursive' || strategy === 'term') {
          filter.geo_shape[field].strategy = strategy;
        }
        
        return this;
      }
      
    });
  };
