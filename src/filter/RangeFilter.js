  /**
    @class
    <p>Matches documents with fields that have terms within a certain range.</p>

    @name ejs.RangeFilter
    @ejs filter
    @borrows ejs.FilterMixin.name as name
    @borrows ejs.FilterMixin.cache as cache
    @borrows ejs.FilterMixin.cacheKey as cacheKey
    @borrows ejs.FilterMixin._type as _type
    @borrows ejs.FilterMixin.toJSON as toJSON

    @desc
    Filters documents with fields that have terms within a certain range.

    @param {String} field A valid field name.
    */
  ejs.RangeFilter = function (field) {

    var
      _common = ejs.FilterMixin('range'),
      filter = _common.toJSON();

    filter.range[field] = {};

    return extend(_common, {

      /**
             The field to run the filter against.

             @member ejs.RangeFilter
             @param {String} f A single field name.
             @returns {Object} returns <code>this</code> so that calls can be chained.
             */
      field: function (f) {
        var oldValue = filter.range[field];

        if (f == null) {
          return field;
        }

        delete filter.range[field];
        field = f;
        filter.range[f] = oldValue;

        return this;
      },

      /**
            The lower bound. Defaults to start from the first.

            @member ejs.RangeFilter
            @param {*} f the lower bound value, type depends on field type
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      from: function (f) {
        if (f == null) {
          return filter.range[field].from;
        }

        filter.range[field].from = f;
        return this;
      },

      /**
            The upper bound. Defaults to unbounded.

            @member ejs.RangeFilter
            @param {*} t the upper bound value, type depends on field type
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      to: function (t) {
        if (t == null) {
          return filter.range[field].to;
        }

        filter.range[field].to = t;
        return this;
      },

      /**
            Should the first from (if set) be inclusive or not. 
            Defaults to true

            @member ejs.RangeFilter
            @param {Boolean} trueFalse true to include, false to exclude 
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      includeLower: function (trueFalse) {
        if (trueFalse == null) {
          return filter.range[field].include_lower;
        }

        filter.range[field].include_lower = trueFalse;
        return this;
      },

      /**
            Should the last to (if set) be inclusive or not. Defaults to true.

            @member ejs.RangeFilter
            @param {Boolean} trueFalse true to include, false to exclude 
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      includeUpper: function (trueFalse) {
        if (trueFalse == null) {
          return filter.range[field].include_upper;
        }

        filter.range[field].include_upper = trueFalse;
        return this;
      },

      /**
            Greater than value.  Same as setting from to the value, and 
            include_lower to false,

            @member ejs.RangeFilter
            @param {*} val the value, type depends on field type
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      gt: function (val) {
        if (val == null) {
          return filter.range[field].gt;
        }

        filter.range[field].gt = val;
        return this;
      },

      /**
            Greater than or equal to value.  Same as setting from to the value,
            and include_lower to true.

            @member ejs.RangeFilter
            @param {*} val the value, type depends on field type
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      gte: function (val) {
        if (val == null) {
          return filter.range[field].gte;
        }

        filter.range[field].gte = val;
        return this;
      },

      /**
            Less than value.  Same as setting to to the value, and include_upper 
            to false.

            @member ejs.RangeFilter
            @param {*} val the value, type depends on field type
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      lt: function (val) {
        if (val == null) {
          return filter.range[field].lt;
        }

        filter.range[field].lt = val;
        return this;
      },

      /**
            Less than or equal to value.  Same as setting to to the value, 
            and include_upper to true.

            @member ejs.RangeFilter
            @param {*} val the value, type depends on field type
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      lte: function (val) {
        if (val == null) {
          return filter.range[field].lte;
        }

        filter.range[field].lte = val;
        return this;
      }
      
    });
  };
